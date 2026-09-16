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
import {
  LibraryTreeProvider,
  FavoritesTreeProvider,
  HistoryTreeProvider,
  QuickActionsTreeProvider,
  ReleaseNotesPanel,
} from "./view/index.js";
import { UpdateEngine } from "./engine/update-engine.js";
import { DiagnosticsManager } from "./command/diagnostics-command.js";

const logger = defaultLogger.child("VSCodeExtension");

let sqlite: SqliteClient | null = null;
let libraryEngine: DefaultLibraryEngine | null = null;
let typingEngine: DefaultTypingEngine | null = null;
let typingTarget: VSCodeTypingTarget | null = null;
let sessionEngine: SessionEngine | null = null;
let searchEngine: SearchEngine | null = null;
let autoTypeEngine: AutoTypeEngine | null = null;
let snippetEngine: SnippetEngine | null = null;
let updateEngine: UpdateEngine | null = null;

let libraryTreeProvider: LibraryTreeProvider | null = null;
let favoritesTreeProvider: FavoritesTreeProvider | null = null;
let historyTreeProvider: HistoryTreeProvider | null = null;
let quickActionsTreeProvider: QuickActionsTreeProvider | null = null;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  logger.info("Activating dTyp VS Code Extension v2.0.0");

  const dbPath = path.join(context.extensionPath, "library", "dtyp.db");
  const locateWasm = (file: string): string => {
    // 1. First check dist/ directory (where extension.js runs from)
    const distWasm = path.join(context.extensionPath, "dist", file);
    if (fs.existsSync(distWasm)) return distWasm;
    // 2. Check library/ directory (alongside dtyp.db)
    const libWasm = path.join(context.extensionPath, "library", file);
    if (fs.existsSync(libWasm)) return libWasm;
    // 3. Check __dirname (local bundle directory)
    const localWasm = path.join(__dirname, file);
    if (fs.existsSync(localWasm)) return localWasm;
    // 4. Fallback to node_modules if in development
    try {
      return require.resolve(`sql.js/dist/${file}`);
    } catch {
      return distWasm;
    }
  };

  sqlite = new SqliteClient();

  try {
    if (fs.existsSync(dbPath)) {
      await sqlite.initialize({ dbFilePath: dbPath, locateFile: locateWasm });
      logger.info(`Loaded bundled database from ${dbPath}`);
    } else {
      logger.warn(`Database not found at ${dbPath}, initializing in-memory fallback`);
      await sqlite.initialize({ locateFile: locateWasm });
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

  updateEngine = new UpdateEngine(context);

  // Register Activity Bar TreeView Providers
  libraryTreeProvider = new LibraryTreeProvider(libraryEngine);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("dtyp.libraryView", libraryTreeProvider)
  );

  favoritesTreeProvider = new FavoritesTreeProvider(sessionEngine);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("dtyp.favoritesView", favoritesTreeProvider)
  );

  historyTreeProvider = new HistoryTreeProvider(sessionEngine);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("dtyp.historyView", historyTreeProvider)
  );

  quickActionsTreeProvider = new QuickActionsTreeProvider();
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("dtyp.quickActionsView", quickActionsTreeProvider)
  );

  const totalCount = await libraryEngine.count();

  // Status Bar Item
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = `$(keyboard) dTyp: ${totalCount.toLocaleString()} Ready`;
  statusBarItem.tooltip = `dTyp Offline C Library (${totalCount.toLocaleString()} components) - Click to Browse`;
  statusBarItem.command = "dtyp.browseLibrary";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Engine Event Listeners
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
    } else {
      statusBarItem.text = `$(keyboard) dTyp: ${totalCount.toLocaleString()} Ready`;
    }
  });

  // Providers
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

  // Reusable Insertion Pipeline
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

      historyTreeProvider?.refresh();

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

  // Commands Registration
  const insertCmd = vscode.commands.registerCommand("dtyp.insertComponent", async () => {
    if (!libraryEngine) return;
    const categories = await libraryEngine.getCategories();
    const selectedCategory = await vscode.window.showQuickPick(categories, {
      placeHolder: "Select a Category (e.g. boiler-plate, linked-list, sorting)...",
    });
    if (!selectedCategory) return;

    const components = await libraryEngine.getByCategory(selectedCategory);
    const compItems = components.map((c) => ({
      label: `${c.name}()`,
      description: `[${c.complexity.time}] ${c.subcategory || ""}`,
      detail: c.signature,
      componentId: c.id,
    }));

    const selected = await vscode.window.showQuickPick(compItems, {
      placeHolder: `Select component in ${selectedCategory} (${components.length} available)...`,
    });

    if (selected) {
      await insertComponentPipeline(selected.componentId);
    }
  });
  context.subscriptions.push(insertCmd);

  const quickInsertCmd = vscode.commands.registerCommand("dtyp.quickInsert", async () => {
    if (!searchEngine) return;
    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = "Type to fuzzy search components (e.g. 'quickSort', 'boiler:main', 'ds:stack')...";

    quickPick.onDidChangeValue(async (value) => {
      if (!value.trim()) {
        quickPick.items = [];
        return;
      }
      quickPick.busy = true;
      const scored = await searchEngine!.search(value, 30);
      quickPick.items = scored.map((s) => ({
        label: `${s.component.name}()`,
        description: `[${s.component.category}] ${s.component.complexity.time} (match: ${s.score})`,
        detail: s.component.signature,
        componentId: s.component.id,
      } as any));
      quickPick.busy = false;
    });

    quickPick.onDidAccept(async () => {
      const selectedItem = quickPick.selectedItems[0] as any;
      quickPick.hide();
      if (selectedItem && selectedItem.componentId) {
        await insertComponentPipeline(selectedItem.componentId);
      }
    });

    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
  });
  context.subscriptions.push(quickInsertCmd);

  const insertByIdCmd = vscode.commands.registerCommand("dtyp.insertComponentById", async (componentId: string) => {
    if (componentId) {
      await insertComponentPipeline(componentId);
    }
  });
  context.subscriptions.push(insertByIdCmd);

  const toggleFavoriteCmd = vscode.commands.registerCommand("dtyp.toggleFavorite", async (node: any) => {
    let componentId: string | undefined;
    let componentName: string | undefined;
    let category: string | undefined;

    if (node && node.component) {
      componentId = node.component.id;
      componentName = node.component.name;
      category = node.component.category;
    } else if (typeof node === "string") {
      componentId = node;
      const comp = await libraryEngine?.findComponent(componentId);
      componentName = comp?.name;
      category = comp?.category;
    }

    if (componentId && componentName && category && sessionEngine) {
      const isFav = sessionEngine.isFavorite(componentId);
      sessionEngine.toggleFavorite(componentId, componentName, category);
      favoritesTreeProvider?.refresh();
      if (isFav) {
        vscode.window.setStatusBarMessage(`dTyp: Removed "${componentName}" from favorites`, 3000);
      } else {
        vscode.window.setStatusBarMessage(`dTyp: Added "${componentName}" to favorites ★`, 3000);
      }
    }
  });
  context.subscriptions.push(toggleFavoriteCmd);

  const copyCodeCmd = vscode.commands.registerCommand("dtyp.copyComponentCode", async (node: any) => {
    if (node && node.component) {
      await vscode.env.clipboard.writeText(node.component.code);
      vscode.window.showInformationMessage(`dTyp: Copied code for "${node.component.name}" to clipboard!`);
    }
  });
  context.subscriptions.push(copyCodeCmd);

  const toggleModeCmd = vscode.commands.registerCommand("dtyp.toggleTypingMode", async () => {
    const config = vscode.workspace.getConfiguration("dtyp");
    const current = config.get<string>("typingMode", "automatic");
    const next = current === "manual" ? "automatic" : "manual";
    await config.update("typingMode", next, vscode.ConfigurationTarget.Global);
    quickActionsTreeProvider?.refresh();
    const modeDesc = next === "manual" ? "Manual Stealth Mode (Ctrl+D)" : "Automatic Simulated Delay";
    vscode.window.showInformationMessage(`dTyp: Switched to ${modeDesc}`);
  });
  context.subscriptions.push(toggleModeCmd);

  const showReleaseNotesCmd = vscode.commands.registerCommand("dtyp.showReleaseNotes", () => {
    ReleaseNotesPanel.show(context, true);
  });
  context.subscriptions.push(showReleaseNotesCmd);

  const checkUpdatesCmd = vscode.commands.registerCommand("dtyp.checkForUpdates", async () => {
    if (updateEngine) {
      await updateEngine.checkForUpdates(true);
    }
  });
  context.subscriptions.push(checkUpdatesCmd);

  const healthCheckCmd = vscode.commands.registerCommand("dtyp.healthCheck", async () => {
    if (libraryEngine) {
      await DiagnosticsManager.runHealthCheck(libraryEngine, context);
    }
  });
  context.subscriptions.push(healthCheckCmd);

  const refreshViewsCmd = vscode.commands.registerCommand("dtyp.refreshViews", () => {
    libraryTreeProvider?.refresh();
    favoritesTreeProvider?.refresh();
    historyTreeProvider?.refresh();
    quickActionsTreeProvider?.refresh();
    vscode.window.setStatusBarMessage("dTyp: Views refreshed", 2000);
  });
  context.subscriptions.push(refreshViewsCmd);

  const typeNextCmd = vscode.commands.registerCommand("dtyp.typeNextCharacter", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !autoTypeEngine?.isManualQueueActive()) return;
    await autoTypeEngine.stepNextCharacter(editor);
  });
  context.subscriptions.push(typeNextCmd);

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

  // Check whether to show Release Notes on version upgrade/install
  const lastVersion = context.globalState.get<string>("dtyp.lastVersion");
  const currentVersion = context.extension.packageJSON.version;
  if (!lastVersion || lastVersion !== currentVersion) {
    context.globalState.update("dtyp.lastVersion", currentVersion);
    const config = vscode.workspace.getConfiguration("dtyp");
    if (config.get<boolean>("showReleaseNotesOnUpdate", true)) {
      ReleaseNotesPanel.show(context);
    }
  }

  // Check for updates in the background after 5 seconds
  setTimeout(() => {
    updateEngine?.checkForUpdates(false).catch(() => {});
  }, 5000);

  logger.info("dTyp Extension v2.0.0 activated successfully with all production engines & views");
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
