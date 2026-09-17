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
   * Resets the manual typing queue back to character 0 so the user can re-type the component.
   */
  public async renewQueue(): Promise<boolean> {
    const queue = this.autoTypeEngine.getActiveQueue();
    if (!queue) {
      vscode.window.showInformationMessage("dTyp: No active typing queue to renew.");
      return false;
    }

    queue.currentIndex = 0;
    queue.startedAt = Date.now();

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      this.typingTarget.resetHead(editor.selection.active);
    }

    this.autoTypeEngine.stepNextCharacter(editor);
    this.logger.info(`Renewed typing queue for "${queue.componentName}" back to character 0`);
    vscode.window.showInformationMessage(
      `dTyp: Renewed typing queue for "${queue.componentName}"! Press Ctrl+Shift+D to step.`
    );
    return true;
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
  public async renewComponentInFile(onReInsert: (componentId: string) => Promise<void>): Promise<void> {
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
      // Find where function or struct starts
      const fnRegex = new RegExp(`\\b${comp.name}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n\\}`, "m");
      const match = docText.match(fnRegex);
      if (match && match.index !== undefined) {
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        await editor.edit((builder) => builder.delete(new vscode.Range(startPos, endPos)));
        editor.selection = new vscode.Selection(startPos, startPos);
      }
    }

    await onReInsert(comp.id);
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
