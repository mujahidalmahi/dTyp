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
  HeaderEngine,
  RenewEngine,
} from "./engine/index.js";
import {
  LibraryTreeProvider,
  FavoritesTreeProvider,
  HistoryTreeProvider,
  QuickActionsTreeProvider,
  ReleaseNotesPanel,
  HierarchicalQuickPickBrowser,
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
let memoryEngine: MemoryEngine | null = null;
let updateEngine: UpdateEngine | null = null;
let renewEngine: RenewEngine | null = null;

let libraryTreeProvider: LibraryTreeProvider | null = null;
let favoritesTreeProvider: FavoritesTreeProvider | null = null;
let historyTreeProvider: HistoryTreeProvider | null = null;
let quickActionsTreeProvider: QuickActionsTreeProvider | null = null;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const version = context.extension.packageJSON.version || "3.0.0";
  logger.info(`Activating dTyp VS Code Extension v${version}`);

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

  memoryEngine = new MemoryEngine();
  context.subscriptions.push(memoryEngine);

  updateEngine = new UpdateEngine(context);

  renewEngine = new RenewEngine(
    autoTypeEngine,
    typingTarget,
    sessionEngine,
    libraryEngine,
    searchEngine,
    snippetEngine
  );

  // Register Memory Code Actions Provider
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(["c", "cpp"], memoryEngine, {
      providedCodeActionKinds: [vscode.CodeActionKind.QuickFix],
    })
  );

  // Initialize diagnostics and placeholder decorations for active text editor
  if (vscode.window.activeTextEditor) {
    memoryEngine.updateDiagnostics(vscode.window.activeTextEditor.document);
    CursorEngine.updateDecorations(vscode.window.activeTextEditor);
  }

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor && memoryEngine) {
        memoryEngine.updateDiagnostics(editor.document);
        CursorEngine.updateDecorations(editor);
      }
    }),
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (vscode.window.activeTextEditor && e.document === vscode.window.activeTextEditor.document) {
        memoryEngine?.updateDiagnostics(e.document);
        CursorEngine.updateDecorations(vscode.window.activeTextEditor);
      }
    })
  );

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
      statusBarItem.text = `$(keyboard) dTyp: ${remaining} chars [Ctrl+Shift+D to step]`;
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
      const addedHeaders = await HeaderEngine.ensureHeaders(editor, fullText);
      if (addedHeaders.length > 0) {
        vscode.window.setStatusBarMessage(`dTyp: Added header(s): ${addedHeaders.join(", ")}`, 3000);
      }
    }

    const checkMemory = config.get<boolean>("analyzeMemoryAllocations", true);
    if (checkMemory) {
      const allocations = MemoryEngine.analyzeAllocations(fullText);
      const unmanaged = allocations.filter((a) => !a.hasMatchingFree);
      if (unmanaged.length > 0) {
        const names = unmanaged.map((u) => u.variableName).join(", ");
        vscode.window.setStatusBarMessage(`dTyp: Note - dynamic allocation(s) without free(): ${names}`, 5000);
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
        vscode.window.showInformationMessage(`dTyp: ${comp.name} queued! Press Ctrl+Shift+D to step type characters.`);
      }
    } catch (err: any) {
      logger.error(`Typing execution error: ${err.message}`);
    }
  };

  // Commands Registration
  const insertCmd = vscode.commands.registerCommand("dtyp.insertComponent", async () => {
    if (!libraryEngine) return;
    const browser = new HierarchicalQuickPickBrowser({
      libraryEngine,
      sessionEngine: sessionEngine ?? undefined,
      onInsert: insertComponentPipeline,
      onFavoriteChanged: () => favoritesTreeProvider?.refresh(),
    });
    await browser.show();
  });
  context.subscriptions.push(insertCmd);

  const quickInsertCmd = vscode.commands.registerCommand("dtyp.quickInsert", async () => {
    if (!searchEngine || !libraryEngine) return;
    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = "Type to search 500 components (e.g. 'quickSort', 'boiler:main', 'ds:tree', 'malloc')...";

    const buildItem = (comp: Component, score?: number) => {
      const isFav = sessionEngine?.isFavorite(comp.id) ?? false;
      const scoreStr = score !== undefined ? ` (match: ${score})` : "";
      return {
        label: `$(symbol-method) ${comp.name}()`,
        description: `[${comp.category}] • ${comp.complexity.time}${comp.difficulty ? ' • ' + comp.difficulty : ''}${scoreStr}`,
        detail: `${comp.description} — ${comp.signature}`,
        componentId: comp.id,
        component: comp,
        buttons: [
          {
            iconPath: new vscode.ThemeIcon("book"),
            tooltip: "View Documentation",
          },
          {
            iconPath: new vscode.ThemeIcon(isFav ? "star-full" : "star"),
            tooltip: isFav ? "Remove Favorite" : "Add to Favorites",
          },
          {
            iconPath: new vscode.ThemeIcon("copy"),
            tooltip: "Copy Code",
          },
        ],
      } as vscode.QuickPickItem & { componentId: string; component: Component };
    };

    // Preload top components so user doesn't see a blank list
    const initialComps = await libraryEngine.getAllComponents(35);
    quickPick.items = initialComps.map((c) => buildItem(c));

    quickPick.onDidChangeValue(async (value) => {
      if (!value.trim()) {
        quickPick.items = initialComps.map((c) => buildItem(c));
        return;
      }
      quickPick.busy = true;
      const scored = await searchEngine!.search(value, 35);
      quickPick.items = scored.map((s) => buildItem(s.component, s.score));
      quickPick.busy = false;
    });

    quickPick.onDidTriggerItemButton(async (e) => {
      const item = e.item as any;
      if (!item || !item.component) return;
      const comp: Component = item.component;

      if (e.button.tooltip === "View Documentation") {
        const docContent = comp.documentation || `# ${comp.name}\n\n${comp.description}\n\n\`\`\`c\n${comp.code}\n\`\`\``;
        const doc = await vscode.workspace.openTextDocument({
          content: docContent,
          language: "markdown",
        });
        await vscode.window.showTextDocument(doc, { preview: true, viewColumn: vscode.ViewColumn.Beside });
      } else if (e.button.tooltip?.includes("Favorite")) {
        if (sessionEngine) {
          sessionEngine.toggleFavorite(comp.id, comp.name, comp.category);
          favoritesTreeProvider?.refresh();
          const isNowFav = sessionEngine.isFavorite(comp.id);
          vscode.window.setStatusBarMessage(
            isNowFav ? `dTyp: Starred "${comp.name}" ★` : `dTyp: Removed "${comp.name}" from favorites`,
            2500
          );
          // Refresh item in list
          quickPick.items = quickPick.items.map((it: any) =>
            it.componentId === comp.id ? buildItem(comp) : it
          );
        }
      } else if (e.button.tooltip === "Copy Code") {
        await vscode.env.clipboard.writeText(comp.code);
        vscode.window.setStatusBarMessage(`dTyp: Copied "${comp.name}" code to clipboard!`, 2500);
      }
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
    const modeDesc = next === "manual" ? "Manual Stealth Mode (Ctrl+Shift+D)" : "Automatic Simulated Delay";
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
    const browser = new HierarchicalQuickPickBrowser({
      libraryEngine,
      sessionEngine: sessionEngine ?? undefined,
      onInsert: insertComponentPipeline,
      onFavoriteChanged: () => favoritesTreeProvider?.refresh(),
    });
    await browser.show();
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

  const renewQueueCmd = vscode.commands.registerCommand("dtyp.renewQueue", async () => {
    if (renewEngine) {
      await renewEngine.renewQueue();
    }
  });
  context.subscriptions.push(renewQueueCmd);

  const rewindStepCmd = vscode.commands.registerCommand("dtyp.rewindStep", async () => {
    if (renewEngine) {
      await renewEngine.rewindStep();
    }
  });
  context.subscriptions.push(rewindStepCmd);

  const renewCompCmd = vscode.commands.registerCommand("dtyp.renewComponent", async () => {
    if (renewEngine) {
      await renewEngine.renewComponentInFile(insertComponentPipeline);
    }
  });
  context.subscriptions.push(renewCompCmd);

  const viewDocCmd = vscode.commands.registerCommand("dtyp.viewDocumentation", async (node?: any) => {
    if (!libraryEngine) return;
    let componentId: string | undefined;

    if (node && node.component) {
      componentId = node.component.id;
    } else if (typeof node === "string") {
      componentId = node;
    } else {
      const allComponents = await libraryEngine.getAllComponents(1000);
      const items: (vscode.QuickPickItem & { componentId: string })[] = allComponents.map((c) => ({
        label: `${c.name}()`,
        description: `[${c.category}] ${c.signature}`,
        detail: c.description,
        componentId: c.id,
      }));
      const picked = await vscode.window.showQuickPick(items, {
        placeHolder: "Select a component to view comprehensive documentation...",
        matchOnDescription: true,
        matchOnDetail: true,
      });
      if (picked) {
        componentId = picked.componentId;
      }
    }

    if (componentId) {
      const comp = await libraryEngine.findComponent(componentId);
      if (!comp) {
        vscode.window.showErrorMessage(`Component "${componentId}" not found.`);
        return;
      }

      const docContent = comp.documentation || `# ${comp.name}\n\n${comp.description}\n\n\`\`\`c\n${comp.code}\n\`\`\``;
      const doc = await vscode.workspace.openTextDocument({
        content: docContent,
        language: "markdown",
      });
      await vscode.window.showTextDocument(doc, { preview: true, viewColumn: vscode.ViewColumn.Beside });
    }
  });
  context.subscriptions.push(viewDocCmd);

  const analyzeMemoryCmd = vscode.commands.registerCommand("dtyp.analyzeMemory", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("Open a C/C++ file to analyze dynamic memory allocations.");
      return;
    }
    const code = editor.document.getText();
    const allocations = MemoryEngine.analyzeAllocations(code);
    if (allocations.length === 0) {
      vscode.window.showInformationMessage("dTyp Memory Engine: No dynamic heap allocations (malloc/calloc/realloc) found in active file.");
      return;
    }
    const unmanaged = allocations.filter((a) => !a.hasMatchingFree);
    if (unmanaged.length === 0) {
      vscode.window.showInformationMessage(`dTyp Memory Engine: All ${allocations.length} dynamic heap allocation(s) have matching free() calls. Clean!`);
    } else {
      const list = unmanaged.map((a) => `'${a.variableName}' (line ${a.line})`).join(", ");
      vscode.window.showWarningMessage(`dTyp Memory Engine: Potential memory leak detected! No matching free() found for: ${list}`);
    }
  });
  context.subscriptions.push(analyzeMemoryCmd);

  const jumpNextCmd = vscode.commands.registerCommand("dtyp.jumpToNextPlaceholder", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const found = CursorEngine.jumpToNextPlaceholder(editor);
    if (!found) {
      vscode.window.setStatusBarMessage("dTyp: No placeholders found in document", 2000);
    }
  });
  context.subscriptions.push(jumpNextCmd);

  const jumpPrevCmd = vscode.commands.registerCommand("dtyp.jumpToPrevPlaceholder", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const found = CursorEngine.jumpToPrevPlaceholder(editor);
    if (!found) {
      vscode.window.setStatusBarMessage("dTyp: No placeholders found in document", 2000);
    }
  });
  context.subscriptions.push(jumpPrevCmd);

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

  logger.info("dTyp Extension v3.0.0 activated successfully with all production engines & views");
}

export function deactivate(): void {
  if (typingEngine?.isTyping()) {
    typingEngine.cancel();
  }
  if (autoTypeEngine?.isManualQueueActive()) {
    autoTypeEngine.cancelManualQueue();
  }
  memoryEngine?.dispose();
  sqlite?.close();
  logger.info("dTyp Extension deactivated");
}
