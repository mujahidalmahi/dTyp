import * as vscode from "vscode";
import * as path from "node:path";
import * as fs from "node:fs";
import { SqliteClient, DefaultLibraryEngine } from "@dtyp/library-engine";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { defaultLogger } from "@dtyp/utilities";
import { Component } from "@dtyp/types";
import { VSCodeTypingTarget } from "./adapter/vscode-typing-target.js";
import { DTypCompletionProvider } from "./provider/completion-provider.js";
import { DTypHoverProvider } from "./provider/hover-provider.js";
import {
  CursorEngine,
  SessionEngine,
  MemoryEngine,
  SearchEngine,
  AutoTypeEngine,
  SnippetEngine,
} from "./engine/index.js";

const logger = defaultLogger.child("VSCodeExtension");

let sqlite: SqliteClient | null = null;
let libraryEngine: DefaultLibraryEngine | null = null;
let typingEngine: DefaultTypingEngine | null = null;
let typingTarget: VSCodeTypingTarget | null = null;
let sessionEngine: SessionEngine | null = null;
let searchEngine: SearchEngine | null = null;
let autoTypeEngine: AutoTypeEngine | null = null;
let snippetEngine: SnippetEngine | null = null;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  logger.info("Activating dTyp VS Code Extension v2.0.0");

  const dbPath = path.join(context.extensionPath, "library", "dtyp.db");
  sqlite = new SqliteClient();

  try {
    if (fs.existsSync(dbPath)) {
      await sqlite.initialize(dbPath);
      logger.info(`Loaded bundled database from ${dbPath}`);
    } else {
      logger.warn(`Database not found at ${dbPath}, initializing in-memory fallback`);
      await sqlite.initialize();
    }
  } catch (err: any) {
    vscode.window.showErrorMessage(`dTyp failed to load library database: ${err.message}`);
    return;
  }

  libraryEngine = new DefaultLibraryEngine(sqlite);
  typingTarget = new VSCodeTypingTarget();
  typingEngine = new DefaultTypingEngine(typingTarget);

  sessionEngine = new SessionEngine(context);
  searchEngine = new SearchEngine(libraryEngine);
  autoTypeEngine = new AutoTypeEngine(typingEngine, typingTarget);
  snippetEngine = new SnippetEngine(libraryEngine);
  await snippetEngine.loadSnippets();

  const totalCount = await libraryEngine.count();

  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = `$(keyboard) dTyp: ${totalCount.toLocaleString()} Ready`;
  statusBarItem.tooltip = `dTyp Offline C Library (${totalCount.toLocaleString()} components) - Click to Browse`;
  statusBarItem.command = "dtyp.browseLibrary";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  typingEngine.on("start", (stats) => {
    vscode.commands.executeCommand("setContext", "dtyp.isTyping", true);
    statusBarItem.text = `$(sync~spin) dTyp: 0/${stats.charactersTotal}`;
  });

  typingEngine.on("progress", (data) => {
    statusBarItem.text = `$(sync~spin) dTyp: ${data.stats.charactersTyped}/${data.stats.charactersTotal} (${data.stats.averageSpeedCps} cps)`;
  });

  typingEngine.on("complete", () => {
    vscode.commands.executeCommand("setContext", "dtyp.isTyping", false);
    statusBarItem.text = "$(check) dTyp: Completed";
    setTimeout(() => {
      statusBarItem.text = `$(keyboard) dTyp: ${totalCount.toLocaleString()} Ready`;
    }, 3000);
  });

  typingEngine.on("cancel", () => {
    vscode.commands.executeCommand("setContext", "dtyp.isTyping", false);
    statusBarItem.text = "$(x) dTyp: Cancelled";
    setTimeout(() => {
      statusBarItem.text = `$(keyboard) dTyp: ${totalCount.toLocaleString()} Ready`;
    }, 3000);
  });

  autoTypeEngine.onQueueChange((hasQueue, remaining) => {
    if (hasQueue) {
      statusBarItem.text = `$(keyboard) dTyp: ${remaining} chars [Ctrl+D to step]`;
      statusBarItem.tooltip = "Press Ctrl+D to step through characters one-by-one";
    } else if (!typingEngine?.isTyping()) {
      statusBarItem.text = `$(keyboard) dTyp: ${totalCount.toLocaleString()} Ready`;
      statusBarItem.tooltip = `dTyp Offline C Library (${totalCount.toLocaleString()} components) - Click to Browse`;
    }
  });

  const completionProvider = vscode.languages.registerCompletionItemProvider(
    ["c", "cpp"],
    new DTypCompletionProvider(libraryEngine),
    ">"
  );
  context.subscriptions.push(completionProvider);

  const snippetProvider = vscode.languages.registerCompletionItemProvider(
    ["c", "cpp"],
    snippetEngine,
    "."
  );
  context.subscriptions.push(snippetProvider);

  const hoverProvider = vscode.languages.registerHoverProvider(
    ["c", "cpp"],
    new DTypHoverProvider(libraryEngine)
  );
  context.subscriptions.push(hoverProvider);

  const insertComponentPipeline = async (componentId: string, modeOverride?: "automatic" | "manual") => {
    if (!libraryEngine || !typingEngine || !typingTarget || !autoTypeEngine || !sessionEngine) return;

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("Open a C/C++ file to insert component.");
      return;
    }

    const comp = await libraryEngine.findComponent(componentId);
    if (!comp) {
      vscode.window.showErrorMessage(`Component "${componentId}" not found in dTyp library.`);
      return;
    }

    let componentsToInsert: Component[] = [];
    try {
      componentsToInsert = await libraryEngine.getDependencies(componentId);
    } catch (err: any) {
      vscode.window.showErrorMessage(`Dependency resolution error: ${err.message}`);
      return;
    }

    const config = vscode.workspace.getConfiguration("dtyp");
    const checkDuplicates = config.get<boolean>("checkDuplicates", true);

    if (checkDuplicates) {
      const currentDocText = editor.document.getText();
      const duplicateDetector = libraryEngine.getDuplicateDetector();
      const filterResult = duplicateDetector.filterNonDuplicates(currentDocText, componentsToInsert);

      if (filterResult.skipped.length > 0) {
        const skippedNames = filterResult.skipped.map((s) => s.component.name).join(", ");
        vscode.window.setStatusBarMessage(`dTyp: Skipped existing definition(s): ${skippedNames}`, 4000);
      }

      componentsToInsert = filterResult.toInsert;
    }

    if (componentsToInsert.length === 0) {
      vscode.window.showInformationMessage(`All components in "${comp.name}" are already present in file.`);
      return;
    }

    const fullText = componentsToInsert.map((c) => c.code).join("\n\n") + "\n";

    const autoIncludeHeaders = config.get<boolean>("autoIncludeHeaders", true);
    if (autoIncludeHeaders) {
      const addedHeaders = await MemoryEngine.ensureHeaders(editor, fullText);
      if (addedHeaders.length > 0) {
        vscode.window.setStatusBarMessage(`dTyp: Added header(s): ${addedHeaders.join(", ")}`, 3000);
      }
    }

    const insertionMode = modeOverride || config.get<"automatic" | "manual">("typingMode", "automatic");

    try {
      const insertPos = editor.selection.active;
      await autoTypeEngine.startInsertion(comp.id, comp.name, fullText, editor, insertionMode);

      sessionEngine.recordInsertion({
        componentId: comp.id,
        componentName: comp.name,
        fileUri: editor.document.uri.toString(),
        charactersTyped: fullText.length,
        mode: insertionMode,
      });

      if (insertionMode === "automatic") {
        const endPos = editor.document.positionAt(editor.document.offsetAt(insertPos) + fullText.length);
        CursorEngine.jumpToFirstPlaceholder(editor, new vscode.Range(insertPos, endPos));
      } else {
        vscode.window.showInformationMessage(`dTyp: ${comp.name} queued! Press Ctrl+D to step type characters.`);
      }
    } catch (err: any) {
      logger.error(`Typing execution error: ${err.message}`);
    }
  };

  const quickInsertCmd = vscode.commands.registerCommand("dtyp.quickInsert", async () => {
    if (!libraryEngine || !searchEngine) return;

    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = "Search 24,000+ offline components (e.g. quick sort, boiler:main, ds:stack)...";
    quickPick.matchOnDescription = true;
    quickPick.matchOnDetail = true;

    const updateItems = async (query: string) => {
      quickPick.busy = true;
      if (!query.trim()) {
        const top = await libraryEngine!.getAllComponents(50);
        quickPick.items = top.map((c) => ({
          label: `${c.name}()`,
          description: `[${c.category}] ${c.complexity.time}`,
          detail: `${c.description} — ${c.signature}`,
          componentId: c.id,
        } as any));
      } else {
        const scored = await searchEngine!.search(query, 50);
        quickPick.items = scored.map((s) => ({
          label: `${s.component.name}()`,
          description: `[${s.component.category}] score:${s.score}`,
          detail: `${s.component.description} — ${s.component.signature}`,
          componentId: s.component.id,
        } as any));
      }
      quickPick.busy = false;
    };

    quickPick.onDidChangeValue((val) => updateItems(val));
    quickPick.onDidAccept(async () => {
      const selected = quickPick.selectedItems[0] as any;
      if (selected && selected.componentId) {
        quickPick.hide();
        await insertComponentPipeline(selected.componentId);
      }
    });

    quickPick.show();
    await updateItems("");
  });
  context.subscriptions.push(quickInsertCmd);

  const insertCmd = vscode.commands.registerCommand("dtyp.insertComponent", async (idArg?: string) => {
    if (idArg) {
      await insertComponentPipeline(idArg);
      return;
    }
    await vscode.commands.executeCommand("dtyp.quickInsert");
  });
  context.subscriptions.push(insertCmd);

  const stepCharCmd = vscode.commands.registerCommand("dtyp.typeNextCharacter", async () => {
    if (autoTypeEngine?.isManualQueueActive()) {
      await autoTypeEngine.stepNextCharacter();
    }
  });
  context.subscriptions.push(stepCharCmd);

  const flushCmd = vscode.commands.registerCommand("dtyp.flushRemaining", async () => {
    if (autoTypeEngine?.isManualQueueActive()) {
      await autoTypeEngine.flushRemaining();
      vscode.window.showInformationMessage("dTyp: Flushed all remaining queued characters.");
    }
  });
  context.subscriptions.push(flushCmd);

  const browseCmd = vscode.commands.registerCommand("dtyp.browseLibrary", async () => {
    if (!libraryEngine) return;

    const categories = await libraryEngine.getCategories();
    const catItems = categories.map((cat) => ({
      label: cat.toUpperCase(),
      description: `Browse components in ${cat}`,
      category: cat,
    }));

    const selectedCat = await vscode.window.showQuickPick(catItems, {
      placeHolder: "Select a Category to browse components...",
    });

    if (!selectedCat) return;

    const components = await libraryEngine.getByCategory(selectedCat.category);
    const compItems = components.map((c) => ({
      label: `${c.name}()`,
      description: `[${c.complexity.time}] ${c.subcategory || ""}`,
      detail: c.signature,
      componentId: c.id,
    }));

    const selectedComp = await vscode.window.showQuickPick(compItems, {
      placeHolder: `${selectedCat.category} components (${components.length} available)...`,
    });

    if (selectedComp && (selectedComp as any).componentId) {
      await insertComponentPipeline((selectedComp as any).componentId);
    }
  });
  context.subscriptions.push(browseCmd);

  const insertSnippetCmd = vscode.commands.registerCommand("dtyp.insertSnippet", async () => {
    if (!snippetEngine) return;
    const snippets = snippetEngine.getSnippets();
    const items = snippets.map((s) => ({
      label: s.prefix,
      description: s.description || "",
      detail: s.category || "",
      body: s.body,
    }));

    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: "Select a dTyp Snippet to insert...",
    });

    if (selected) {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.insertSnippet(new vscode.SnippetString(selected.body));
      }
    }
  });
  context.subscriptions.push(insertSnippetCmd);

  const historyCmd = vscode.commands.registerCommand("dtyp.showHistory", async () => {
    if (!sessionEngine) return;
    const history = sessionEngine.getHistory(30);
    if (history.length === 0) {
      vscode.window.showInformationMessage("dTyp: No insertion history recorded yet.");
      return;
    }

    const items = history.map((h) => ({
      label: h.componentName,
      description: `[${h.mode}] ${new Date(h.timestamp).toLocaleTimeString()}`,
      detail: `${h.charactersTyped} chars — ${h.componentId}`,
      componentId: h.componentId,
    }));

    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: "Recent insertions (select to re-insert)...",
    });

    if (selected) {
      await insertComponentPipeline(selected.componentId);
    }
  });
  context.subscriptions.push(historyCmd);

  const cancelCmd = vscode.commands.registerCommand("dtyp.cancelTyping", () => {
    if (autoTypeEngine?.isManualQueueActive()) {
      autoTypeEngine.cancelManualQueue();
      vscode.window.showInformationMessage("dTyp: Manual typing queue cleared.");
    }
    if (typingEngine?.isTyping()) {
      typingEngine.cancel();
      vscode.window.showInformationMessage("dTyp: Automated character typing cancelled.");
    }
  });
  context.subscriptions.push(cancelCmd);

  logger.info("dTyp Extension v2.0.0 activated successfully");
}

export function deactivate(): void {
  if (typingEngine?.isTyping()) {
    typingEngine.cancel();
  }
  if (autoTypeEngine?.isManualQueueActive()) {
    autoTypeEngine.cancelManualQueue();
  }
  sqlite?.close();
  logger.info("dTyp Extension deactivated");
}