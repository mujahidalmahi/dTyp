import * as vscode from "vscode";
import { AutoTypeEngine } from "./auto-type-engine.js";
import { VSCodeTypingTarget } from "../adapter/vscode-typing-target.js";
import { SessionEngine } from "./session-engine.js";
import { SearchEngine } from "./search-engine.js";
import { SnippetEngine } from "./snippet-engine.js";
import { DefaultLibraryEngine } from "@dtyp/library-engine";
import { defaultLogger } from "@dtyp/utilities";

export class RenewEngine {
  private logger = defaultLogger.child("RenewEngine");

  constructor(
    private autoTypeEngine: AutoTypeEngine,
    private typingTarget: VSCodeTypingTarget,
    private sessionEngine: SessionEngine,
    private libraryEngine: DefaultLibraryEngine,
    private searchEngine: SearchEngine,
    private snippetEngine: SnippetEngine
  ) {}

  /**
   * Resets the typing queue back to character 0 or re-triggers typing of the last component.
   */
  public async renewQueue(onReInsert?: (componentId: string, mode?: "automatic" | "manual", options?: { force?: boolean }) => Promise<void>): Promise<boolean> {
    const queue = this.autoTypeEngine.getActiveQueue();
    if (queue) {
      queue.currentIndex = 0;
      queue.startedAt = Date.now();

      let editor = vscode.window.activeTextEditor;
      if (!editor && this.autoTypeEngine.getLastInsertion()?.editorUri) {
        try {
          const uri = vscode.Uri.parse(this.autoTypeEngine.getLastInsertion()!.editorUri);
          const doc = await vscode.workspace.openTextDocument(uri);
          editor = await vscode.window.showTextDocument(doc);
        } catch {
          // ignore
        }
      }

      if (editor) {
        this.typingTarget.setEditor(editor);
        this.typingTarget.resetHead(editor.selection.active);
      }

      await this.autoTypeEngine.stepNextCharacter(editor);
      this.logger.info(`Renewed typing queue for "${queue.componentName}" back to character 0`);
      vscode.window.showInformationMessage(
        `dTyp: Renewed typing queue for "${queue.componentName}"! Press Ctrl+Shift+D to step.`
      );
      return true;
    }

    // If currently typing in automated mode, cancel and re-trigger from character 0
    if (this.autoTypeEngine.isTyping()) {
      const activeInsertion = this.autoTypeEngine.getLastInsertion();
      this.autoTypeEngine.cancel();
      if (activeInsertion && onReInsert) {
        let editor = vscode.window.activeTextEditor;
        if (!editor && activeInsertion.editorUri) {
          try {
            const uri = vscode.Uri.parse(activeInsertion.editorUri);
            const doc = await vscode.workspace.openTextDocument(uri);
            editor = await vscode.window.showTextDocument(doc);
          } catch {
            // ignore
          }
        }
        if (editor) {
          this.typingTarget.setEditor(editor);
          this.typingTarget.resetHead(editor.selection.active);
        }
        this.logger.info(`Renewing active automated component "${activeInsertion.componentName}"`);
        vscode.window.showInformationMessage(`dTyp: Renewing "${activeInsertion.componentName}" from start!`);
        await onReInsert(activeInsertion.componentId, activeInsertion.mode, { force: true });
        return true;
      }
    }

    // Fallback: Check if there was an automatic or previous insertion
    const lastInsertion = this.autoTypeEngine.getLastInsertion();
    if (lastInsertion && onReInsert) {
      this.autoTypeEngine.cancel();
      let editor = vscode.window.activeTextEditor;
      if (!editor && lastInsertion.editorUri) {
        try {
          const uri = vscode.Uri.parse(lastInsertion.editorUri);
          const doc = await vscode.workspace.openTextDocument(uri);
          editor = await vscode.window.showTextDocument(doc);
        } catch {
          // ignore
        }
      }
      if (editor) {
        this.typingTarget.setEditor(editor);
        this.typingTarget.resetHead(editor.selection.active);
      }
      this.logger.info(`Renewing last inserted component "${lastInsertion.componentName}" in ${lastInsertion.mode} mode`);
      vscode.window.showInformationMessage(`dTyp: Renewing "${lastInsertion.componentName}" from start!`);
      await onReInsert(lastInsertion.componentId, lastInsertion.mode, { force: true });
      return true;
    }

    // Complete fallback: Prompt to select a component to start typing
    if (onReInsert) {
      const allComponents = await this.libraryEngine.getAllComponents(50);
      if (allComponents.length > 0) {
        const picked = await vscode.window.showQuickPick(
          allComponents.map((c) => ({
            label: `${c.name}()`,
            description: `[${c.category}]`,
            detail: c.description,
            componentId: c.id,
          })),
          { placeHolder: "No recent session to renew. Select a component to start typing:" }
        );
        if (picked) {
          await onReInsert(picked.componentId, undefined, { force: true });
          return true;
        }
      }
    }

    vscode.window.showInformationMessage("dTyp: No active or recent typing session to renew.");
    return false;
  }

  /**
   * Rewinds one step in manual mode, deleting the previously typed character.
   */
  public async rewindStep(editor?: vscode.TextEditor): Promise<boolean> {
    const queue = this.autoTypeEngine.getActiveQueue();
    if (!queue || queue.currentIndex <= 0) {
      vscode.window.setStatusBarMessage("dTyp: At beginning of queue, cannot rewind", 2000);
      return false;
    }

    const activeEditor = editor || vscode.window.activeTextEditor;
    if (!activeEditor) return false;

    // Step back index
    queue.currentIndex--;
    const prevAction = queue.actions[queue.currentIndex];

    try {
      if (prevAction.type === "type") {
        await this.typingTarget.deleteBackward();
      } else if (prevAction.type === "cursor_move") {
        // If it was a cursor move, step back one more if possible
        if (queue.currentIndex > 0) {
          queue.currentIndex--;
          await this.typingTarget.deleteBackward();
        }
      }
      vscode.window.setStatusBarMessage(`dTyp: Rewound 1 character (${queue.actions.length - queue.currentIndex} remaining)`, 2000);
      return true;
    } catch (err: any) {
      this.logger.warn(`Rewind failed: ${err.message}`);
      return false;
    }
  }

  /**
   * Renews / updates a previously inserted library component in the active document.
   */
  public async renewComponentInFile(onReInsert: (componentId: string, mode?: "automatic" | "manual", options?: { force?: boolean }) => Promise<void>): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("Open a C/C++ file to renew components.");
      return;
    }

    const docText = editor.document.getText();
    const history = this.sessionEngine.getHistory(50);
    const docUri = editor.document.uri.toString();

    // Find components that were previously inserted into this file
    const matchingEntries = history.filter((h) => h.fileUri === docUri);
    if (matchingEntries.length === 0) {
      vscode.window.showInformationMessage("dTyp: No previously recorded component insertions found for this file.");
      return;
    }

    const uniqueComps = new Map<string, { id: string; name: string }>();
    matchingEntries.forEach((e) => uniqueComps.set(e.componentId, { id: e.componentId, name: e.componentName }));

    const items = Array.from(uniqueComps.values()).map((c) => ({
      label: `$(sync) Renew ${c.name}`,
      description: `Component ID: ${c.id}`,
      componentId: c.id,
      componentName: c.name,
    }));

    const picked = await vscode.window.showQuickPick(items, {
      placeHolder: "Select a previously inserted component to renew/re-type...",
    });

    if (!picked) return;

    // Check if component exists in file
    const comp = await this.libraryEngine.findComponent(picked.componentId);
    if (!comp) {
      vscode.window.showErrorMessage(`Component "${picked.componentId}" not found in library.`);
      return;
    }

    const action = await vscode.window.showQuickPick(
      [
        { label: "$(replace) Replace Existing Definition", detail: "Removes existing code and types fresh implementation", mode: "replace" },
        { label: "$(plus) Append as New Definition", detail: "Leaves existing code and types implementation at cursor", mode: "append" },
      ],
      { placeHolder: `Choose renewal strategy for "${picked.componentName}"` }
    );

    if (!action) return;

    if (action.mode === "replace") {
      // Robust regex matching functions, structs, typedefs, or macros
      let pattern: RegExp;
      if (comp.type === "struct" || comp.name.startsWith("struct ")) {
        const rawName = comp.name.replace(/^struct\s+/, "");
        pattern = new RegExp(`(?:typedef\\s+)?struct\\s+${rawName}\\s*\\{[\\s\\S]*?\\}(?:\\s*${rawName})?\\s*;?`, "m");
      } else {
        pattern = new RegExp(`\\b${comp.name}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n\\}`, "m");
      }

      const match = docText.match(pattern);
      if (match && match.index !== undefined) {
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        await editor.edit((builder) => builder.delete(new vscode.Range(startPos, endPos)));
        editor.selection = new vscode.Selection(startPos, startPos);
      }
    }

    await onReInsert(comp.id, undefined, { force: true });
  }

  /**
   * Refreshes and renews all internal caches, snippet registries, and engine states.
   */
  public async renewAllEngineStates(): Promise<void> {
    this.searchEngine.clearCache();
    await this.snippetEngine.loadSnippets();
    this.logger.info("Renewed all search caches, snippet registries, and engine states");
  }
}
