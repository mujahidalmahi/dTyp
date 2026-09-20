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
  OwnLibraryStorage,
  GhostPreviewEngine,
} from "./engine/index.js";
import {
  LibraryTreeProvider,
  FavoritesTreeProvider,
  HistoryTreeProvider,
  QuickActionsTreeProvider,
  ReleaseNotesPanel,
  HierarchicalQuickPickBrowser,
  OwnLibraryPanel,
  OwnLibraryTreeProvider,
  VisualizerPanel,
  TestRunnerPanel,
  FlashcardsPanel,
  HudPanel,
  RecursionVisualizerPanel,
  TypingDrillPanel,
  ControlCenterPanel,
} from "./view/index.js";
import { UpdateEngine } from "./engine/update-engine.js";
import {
  DiagnosticsManager,
  CompilerRunner,
  SanitizerRunner,
  AcademicModularizer,
  BenchmarkRunner,
  AcademicFormatter,
  CodeDoctorAnalyzer,
  CodeDoctorProvider,
  ContestScaffolder,
  ValgrindRunner,
} from "./command/index.js";

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
let ownLibraryStorage: OwnLibraryStorage | null = null;
let ghostPreviewEngine: GhostPreviewEngine | null = null;

let libraryTreeProvider: LibraryTreeProvider | null = null;
let ownLibraryTreeProvider: OwnLibraryTreeProvider | null = null;
let favoritesTreeProvider: FavoritesTreeProvider | null = null;
let historyTreeProvider: HistoryTreeProvider | null = null;
let quickActionsTreeProvider: QuickActionsTreeProvider | null = null;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const version = context.extension.packageJSON.version || "4.0.0";
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
  ownLibraryStorage = new OwnLibraryStorage(context);
  searchEngine = new SearchEngine(libraryEngine, ownLibraryStorage);
  autoTypeEngine = new AutoTypeEngine(typingEngine, typingTarget);
  snippetEngine = new SnippetEngine(libraryEngine);
  await snippetEngine.loadSnippets();

  memoryEngine = new MemoryEngine();
  context.subscriptions.push(memoryEngine);
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(["c", "cpp"], memoryEngine, {
      providedCodeActionKinds: [vscode.CodeActionKind.QuickFix],
    })
  );

  ghostPreviewEngine = new GhostPreviewEngine();
  context.subscriptions.push(ghostPreviewEngine);

  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(["c", "cpp"], new CompilerRunner())
  );

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

  // Initialize Code Doctor Provider (Academic Formatter & QuickFixes)
  CodeDoctorProvider.init(context);
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(["c", "cpp"], new CodeDoctorProvider(), {
      providedCodeActionKinds: [vscode.CodeActionKind.QuickFix],
    }),
    vscode.languages.registerDocumentFormattingEditProvider(["c", "cpp"], {
      provideDocumentFormattingEdits(doc: vscode.TextDocument): vscode.TextEdit[] {
        const config = vscode.workspace.getConfiguration("dtyp");
        const style = config.get<"kr" | "allman">("academicBraceStyle", "kr");
        const formatted = AcademicFormatter.format(doc.getText(), style);
        const fullRange = new vscode.Range(doc.positionAt(0), doc.positionAt(doc.getText().length));
        return [vscode.TextEdit.replace(fullRange, formatted)];
      },
    })
  );

  // Initialize diagnostics and placeholder decorations for active text editor
  if (vscode.window.activeTextEditor) {
    memoryEngine.updateDiagnostics(vscode.window.activeTextEditor.document);
    CodeDoctorProvider.updateDiagnostics(vscode.window.activeTextEditor.document);
    CursorEngine.updateDecorations(vscode.window.activeTextEditor);
  }

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        memoryEngine?.updateDiagnostics(editor.document);
        CodeDoctorProvider.updateDiagnostics(editor.document);
        CursorEngine.updateDecorations(editor);
      }
    }),
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (vscode.window.activeTextEditor && e.document === vscode.window.activeTextEditor.document) {
        memoryEngine?.updateDiagnostics(e.document);
        CodeDoctorProvider.updateDiagnostics(e.document);
        CursorEngine.updateDecorations(vscode.window.activeTextEditor);
      }
    })
  );

  // Register Activity Bar TreeView Providers
  libraryTreeProvider = new LibraryTreeProvider(libraryEngine);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("dtyp.libraryView", libraryTreeProvider)
  );

  ownLibraryTreeProvider = new OwnLibraryTreeProvider(ownLibraryStorage);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("dtyp.ownLibraryView", ownLibraryTreeProvider)
  );

  favoritesTreeProvider = new FavoritesTreeProvider(sessionEngine, libraryEngine);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("dtyp.favoritesView", favoritesTreeProvider)
  );

  historyTreeProvider = new HistoryTreeProvider(sessionEngine, libraryEngine);
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
  statusBarItem.tooltip = `dTyp Master Hub (${totalCount.toLocaleString()} components) - Click for Tools & Controls`;
  statusBarItem.command = "dtyp.openStatusBarMenu";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Engine Event Listeners
  typingEngine.on("start", (stats) => {
    vscode.commands.executeCommand("setContext", "dtyp.isTyping", true);
    vscode.commands.executeCommand("setContext", "dtyp.isPaused", false);
    statusBarItem.command = "dtyp.togglePauseTyping";
    statusBarItem.tooltip = "dTyp is typing... Click or press Alt+P to pause";
    statusBarItem.text = `$(sync~spin) dTyp: 0/${stats.charactersTotal}`;
  });

  typingEngine.on("progress", (data) => {
    if (typingEngine?.isPaused()) {
      statusBarItem.text = `$(debug-pause) dTyp: Paused (${data.stats.charactersTyped}/${data.stats.charactersTotal})`;
      statusBarItem.tooltip = "dTyp is paused. Click or press Alt+P to resume";
    } else {
      statusBarItem.text = `$(sync~spin) dTyp: ${data.stats.charactersTyped}/${data.stats.charactersTotal} (${data.stats.averageSpeedCps} cps)`;
      statusBarItem.tooltip = "dTyp is typing... Click or press Alt+P to pause";
    }
  });

  typingEngine.on("pause", () => {
    vscode.commands.executeCommand("setContext", "dtyp.isPaused", true);
    statusBarItem.text = "$(debug-pause) dTyp: Paused [Click to resume]";
    statusBarItem.tooltip = "dTyp is paused. Click or press Alt+P to resume";
  });

  typingEngine.on("resume", () => {
    vscode.commands.executeCommand("setContext", "dtyp.isPaused", false);
    statusBarItem.tooltip = "dTyp is typing... Click or press Alt+P to pause";
  });

  typingEngine.on("complete", () => {
    vscode.commands.executeCommand("setContext", "dtyp.isTyping", false);
    vscode.commands.executeCommand("setContext", "dtyp.isPaused", false);
    statusBarItem.command = "dtyp.openStatusBarMenu";
    statusBarItem.tooltip = `dTyp Master Hub (${totalCount.toLocaleString()} components) - Click for Tools & Controls`;
    statusBarItem.text = "$(check) dTyp: Completed";
    setTimeout(() => {
      statusBarItem.text = `$(keyboard) dTyp: ${totalCount.toLocaleString()} Ready`;
    }, 3000);
  });

  typingEngine.on("cancel", () => {
    vscode.commands.executeCommand("setContext", "dtyp.isTyping", false);
    vscode.commands.executeCommand("setContext", "dtyp.isPaused", false);
    statusBarItem.command = "dtyp.openStatusBarMenu";
    statusBarItem.tooltip = `dTyp Master Hub (${totalCount.toLocaleString()} components) - Click for Tools & Controls`;
    statusBarItem.text = "$(x) dTyp: Cancelled";
    setTimeout(() => {
      statusBarItem.text = `$(keyboard) dTyp: ${totalCount.toLocaleString()} Ready`;
    }, 3000);
  });
  autoTypeEngine.onQueueChange((hasQueue, remaining) => {
    if (hasQueue) {
      statusBarItem.text = `$(keyboard) dTyp: ${remaining} chars [Ctrl+Shift+D to step]`;
    } else if (!typingEngine?.isTyping()) {
      statusBarItem.command = "dtyp.browseLibrary";
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
    new DTypHoverProvider(libraryEngine, ownLibraryStorage ?? undefined)
  );
  context.subscriptions.push(hoverProvider);

  // Reusable Insertion Pipeline
  const insertComponentPipeline = async (
    componentId: string,
    modeOverride?: "automatic" | "manual",
    options?: { force?: boolean }
  ) => {
    if (!libraryEngine || !typingEngine || !typingTarget || !autoTypeEngine || !sessionEngine) return;

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("Open a C/C++ file to insert component.");
      return;
    }

    ghostPreviewEngine?.clearPreview();

    let comp = await libraryEngine.findComponent(componentId);
    let componentsToInsert: Component[] = [];

    if (!comp && ownLibraryStorage) {
      const ownComp = ownLibraryStorage.getById(componentId);
      if (ownComp) {
        comp = ownLibraryStorage.toComponent(ownComp);
        componentsToInsert = [comp];
      }
    } else if (comp) {
      try {
        componentsToInsert = await libraryEngine.getDependencies(componentId);
      } catch (err: any) {
        vscode.window.showErrorMessage(`Dependency resolution error: ${err.message}`);
        return;
      }
    }

    if (!comp) {
      vscode.window.showErrorMessage(`Component "${componentId}" not found in dTyp library.`);
      return;
    }

    const config = vscode.workspace.getConfiguration("dtyp");
    const checkDuplicates = !options?.force && config.get<boolean>("checkDuplicates", true);

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
      ownLibraryStorage: ownLibraryStorage ?? undefined,
      onInsert: insertComponentPipeline,
      onFavoriteChanged: () => favoritesTreeProvider?.refresh(),
    });
    await browser.show();
  });
  context.subscriptions.push(insertCmd);

  const quickInsertCmd = vscode.commands.registerCommand("dtyp.quickInsert", async () => {
    if (!searchEngine || !libraryEngine) return;
    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = "Type to search components across all domains + Own Library (e.g. 'quickSort', 'tcp', 'tree', 'malloc')...";

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
      let comp = await libraryEngine?.findComponent(componentId);
      if (!comp && ownLibraryStorage) {
        const ownComp = ownLibraryStorage.getById(componentId);
        if (ownComp) comp = ownLibraryStorage.toComponent(ownComp);
      }
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
    ownLibraryTreeProvider?.refresh();
    favoritesTreeProvider?.refresh();
    historyTreeProvider?.refresh();
    quickActionsTreeProvider?.refresh();
    vscode.window.setStatusBarMessage("dTyp: Views refreshed", 2000);
  });
  context.subscriptions.push(refreshViewsCmd);

  // Own Library Commands
  const createOwnCompCmd = vscode.commands.registerCommand("dtyp.createOwnComponent", () => {
    if (!ownLibraryStorage) return;
    OwnLibraryPanel.show(context, ownLibraryStorage, undefined, async (comp, autoInsert) => {
      ownLibraryTreeProvider?.refresh();
      if (autoInsert) {
        await insertComponentPipeline(comp.id);
      }
    });
  });
  context.subscriptions.push(createOwnCompCmd);

  const editOwnCompCmd = vscode.commands.registerCommand("dtyp.editOwnComponent", (node: any) => {
    if (!ownLibraryStorage) return;
    let compId: string | undefined;
    if (node && node.component && node.component.id) {
      compId = node.component.id;
    } else if (typeof node === "string") {
      compId = node;
    }
    if (compId) {
      OwnLibraryPanel.show(context, ownLibraryStorage, compId, async (comp, autoInsert) => {
        ownLibraryTreeProvider?.refresh();
        if (autoInsert) {
          await insertComponentPipeline(comp.id);
        }
      });
    }
  });
  context.subscriptions.push(editOwnCompCmd);

  const deleteOwnCompCmd = vscode.commands.registerCommand("dtyp.deleteOwnComponent", async (node: any) => {
    if (!ownLibraryStorage) return;
    let compId: string | undefined;
    let compName = "this component";
    if (node && node.component) {
      compId = node.component.id;
      compName = `"${node.component.name}"`;
    } else if (typeof node === "string") {
      compId = node;
      const c = ownLibraryStorage.getById(node);
      if (c) compName = `"${c.name}"`;
    }
    if (!compId) return;

    const confirm = await vscode.window.showWarningMessage(
      `Are you sure you want to delete ${compName} from your Own Library?`,
      { modal: true },
      "Delete"
    );
    if (confirm === "Delete") {
      await ownLibraryStorage.delete(compId);
      ownLibraryTreeProvider?.refresh();
      vscode.window.showInformationMessage(`dTyp: Deleted ${compName} from Own Library.`);
    }
  });
  context.subscriptions.push(deleteOwnCompCmd);

  const insertOwnCompCmd = vscode.commands.registerCommand("dtyp.insertOwnComponent", async (arg: any) => {
    let compId: string | undefined;
    if (typeof arg === "string") {
      compId = arg;
    } else if (arg && arg.component && arg.component.id) {
      compId = arg.component.id;
    }
    if (compId) {
      await insertComponentPipeline(compId);
    }
  });
  context.subscriptions.push(insertOwnCompCmd);

  const copyOwnCodeCmd = vscode.commands.registerCommand("dtyp.copyOwnComponentCode", async (node: any) => {
    let code: string | undefined;
    let name = "Component";
    if (node && node.component) {
      code = node.component.code;
      name = node.component.name;
    } else if (typeof node === "string" && ownLibraryStorage) {
      const comp = ownLibraryStorage.getById(node);
      if (comp) {
        code = comp.code;
        name = comp.name;
      }
    }
    if (code) {
      await vscode.env.clipboard.writeText(code);
      vscode.window.setStatusBarMessage(`dTyp: Copied code for "${name}" to clipboard!`, 2500);
    }
  });
  context.subscriptions.push(copyOwnCodeCmd);

  const refreshOwnLibCmd = vscode.commands.registerCommand("dtyp.refreshOwnLibrary", () => {
    ownLibraryStorage?.load();
    ownLibraryTreeProvider?.refresh();
    vscode.window.setStatusBarMessage("dTyp: Own Library refreshed", 2000);
  });
  context.subscriptions.push(refreshOwnLibCmd);

  const exportOwnLibCmd = vscode.commands.registerCommand("dtyp.exportOwnLibrary", async () => {
    if (!ownLibraryStorage) return;
    const json = ownLibraryStorage.exportToJson();
    const uri = await vscode.window.showSaveDialog({
      defaultUri: vscode.Uri.file("dtyp-own-library.json"),
      filters: { "JSON Files": ["json"] },
      title: "Export Own Library to JSON",
    });
    if (uri) {
      await vscode.workspace.fs.writeFile(uri, Buffer.from(json, "utf-8"));
      vscode.window.showInformationMessage(
        `dTyp: Exported ${ownLibraryStorage.getCount()} components to ${path.basename(uri.fsPath)}`
      );
    }
  });
  context.subscriptions.push(exportOwnLibCmd);

  const importOwnLibCmd = vscode.commands.registerCommand("dtyp.importOwnLibrary", async () => {
    if (!ownLibraryStorage) return;
    const uris = await vscode.window.showOpenDialog({
      canSelectMany: false,
      filters: { "JSON Files": ["json"] },
      title: "Import Own Library from JSON",
    });
    if (uris && uris[0]) {
      try {
        const fileBytes = await vscode.workspace.fs.readFile(uris[0]);
        const content = Buffer.from(fileBytes).toString("utf-8");
        const result = await ownLibraryStorage.importFromJson(content);
        ownLibraryTreeProvider?.refresh();
        vscode.window.showInformationMessage(
          `dTyp: Imported ${result.imported} new, updated ${result.updated} components (${result.failed} skipped).`
        );
      } catch (err: any) {
        vscode.window.showErrorMessage(`dTyp Import Failed: ${err.message}`);
      }
    }
  });
  context.subscriptions.push(importOwnLibCmd);

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
      ownLibraryStorage: ownLibraryStorage ?? undefined,
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
    ghostPreviewEngine?.clearPreview();
    if (autoTypeEngine?.isTyping() || autoTypeEngine?.isManualQueueActive()) {
      autoTypeEngine.cancel();
      vscode.window.showInformationMessage("dTyp: Typing cancelled and queue cleared.");
    } else if (typingEngine?.isTyping()) {
      typingEngine.cancel();
      vscode.window.showInformationMessage("dTyp: Automated character typing cancelled.");
    }
  });
  context.subscriptions.push(cancelCmd);

  const togglePauseCmd = vscode.commands.registerCommand("dtyp.togglePauseTyping", () => {
    if (autoTypeEngine?.isTyping()) {
      const paused = autoTypeEngine.togglePause();
      if (paused) {
        vscode.window.showInformationMessage("dTyp: Typing paused (Alt+P to resume).");
      } else {
        vscode.window.showInformationMessage("dTyp: Typing resumed.");
      }
    } else if (typingEngine?.isTyping()) {
      const paused = typingEngine.togglePause();
      if (paused) {
        vscode.window.showInformationMessage("dTyp: Typing paused (Alt+P to resume).");
      } else {
        vscode.window.showInformationMessage("dTyp: Typing resumed.");
      }
    }
  });
  context.subscriptions.push(togglePauseCmd);

  const pauseCmd = vscode.commands.registerCommand("dtyp.pauseTyping", () => {
    if (autoTypeEngine?.isTyping() && !autoTypeEngine.isPaused()) {
      autoTypeEngine.pause();
      vscode.window.showInformationMessage("dTyp: Typing paused (Alt+P to resume).");
    } else if (typingEngine?.isTyping() && !typingEngine.isPaused()) {
      typingEngine.pause();
      vscode.window.showInformationMessage("dTyp: Typing paused (Alt+P to resume).");
    }
  });
  context.subscriptions.push(pauseCmd);

  const resumeCmd = vscode.commands.registerCommand("dtyp.resumeTyping", () => {
    if (autoTypeEngine?.isPaused()) {
      autoTypeEngine.resume();
      vscode.window.showInformationMessage("dTyp: Typing resumed.");
    } else if (typingEngine?.isPaused()) {
      typingEngine.resume();
      vscode.window.showInformationMessage("dTyp: Typing resumed.");
    }
  });
  context.subscriptions.push(resumeCmd);

  const renewQueueCmd = vscode.commands.registerCommand("dtyp.renewQueue", async () => {
    if (renewEngine) {
      await renewEngine.renewQueue(insertComponentPipeline);
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

  // 1-Click Compile & Run
  const compileAndRunCmd = vscode.commands.registerCommand("dtyp.compileAndRun", async (doc?: vscode.TextDocument) => {
    await CompilerRunner.compileAndRun(doc);
  });
  context.subscriptions.push(compileAndRunCmd);

  // Interactive Pointer & Data Structure Visualizer
  const visualizeCmd = vscode.commands.registerCommand("dtyp.visualizeComponent", async (node: any) => {
    let comp: Component | null = null;
    if (node && node.component) {
      comp = node.component;
    } else if (typeof node === "string") {
      comp = await libraryEngine?.findComponent(node) ?? null;
      if (!comp && ownLibraryStorage) {
        const ownComp = ownLibraryStorage.getById(node);
        if (ownComp) comp = ownLibraryStorage.toComponent(ownComp);
      }
    } else {
      const components = await libraryEngine?.getAllComponents(80) ?? [];
      const items = components.map((c) => ({
        label: `${c.name}()`,
        description: `[${c.category}] ${c.complexity.time}`,
        detail: c.description,
        component: c,
      }));
      const picked = await vscode.window.showQuickPick(items, {
        placeHolder: "Select a component to inspect memory & pointer architecture...",
      });
      if (picked) comp = picked.component;
    }
    if (comp) {
      VisualizerPanel.show(context.extensionUri, comp, insertComponentPipeline);
    }
  });
  context.subscriptions.push(visualizeCmd);

  // Ghost Code Preview
  const previewCmd = vscode.commands.registerCommand("dtyp.previewComponent", async (node: any) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("dTyp: Open a C/C++ editor to preview component code.");
      return;
    }
    let comp: Component | null = null;
    if (node && node.component) {
      comp = node.component;
    } else if (typeof node === "string") {
      comp = await libraryEngine?.findComponent(node) ?? null;
    }
    if (comp && ghostPreviewEngine) {
      ghostPreviewEngine.showPreview(editor, comp.code);
      vscode.window.setStatusBarMessage(`$(preview) dTyp: Showing ghost preview for "${comp.name}". Press Escape to clear.`, 4000);
    }
  });
  context.subscriptions.push(previewCmd);

  // In-Flight Typing Speed Controls
  const speedUpCmd = vscode.commands.registerCommand("dtyp.speedUpTyping", () => {
    autoTypeEngine?.speedUp();
  });
  context.subscriptions.push(speedUpCmd);

  const slowDownCmd = vscode.commands.registerCommand("dtyp.slowDownTyping", () => {
    autoTypeEngine?.slowDown();
  });
  context.subscriptions.push(slowDownCmd);

  // Initialize Sanitizer diagnostics collection
  SanitizerRunner.init(context);

  // 1. Intercept physical typing for Chameleon Ghost-Typing Mode
  context.subscriptions.push(
    vscode.commands.registerCommand("type", async (args: { text: string }) => {
      if (autoTypeEngine?.isChameleonActive() && vscode.window.activeTextEditor) {
        await autoTypeEngine.stepNextCharacter(vscode.window.activeTextEditor);
        return;
      }
      await vscode.commands.executeCommand("default:type", args);
    })
  );

  // 2. Toggle Chameleon Ghost-Typing Mode (Alt+C)
  const toggleChameleonCmd = vscode.commands.registerCommand("dtyp.toggleChameleonMode", () => {
    if (!autoTypeEngine) return;
    const isEnabled = autoTypeEngine.toggleChameleonMode();
    quickActionsTreeProvider?.refresh();
    if (isEnabled) {
      vscode.window.setStatusBarMessage("$(eye) dTyp: Chameleon Ghost-Typing ON (Any key typed advances algorithm)", 4000);
      vscode.window.showInformationMessage("dTyp: Chameleon Ghost-Typing Mode ON. Mash any keys on your keyboard to type the algorithm!");
    } else {
      vscode.window.setStatusBarMessage("$(eye-closed) dTyp: Chameleon Ghost-Typing OFF", 3000);
      vscode.window.showInformationMessage("dTyp: Chameleon Ghost-Typing Mode OFF");
    }
  });
  context.subscriptions.push(toggleChameleonCmd);

  // 3. Multi-Test Case Sandbox Runner (Ctrl+F6)
  const runTestCasesCmd = vscode.commands.registerCommand("dtyp.runTestCases", (uri?: vscode.Uri) => {
    const filePath = uri ? uri.fsPath : vscode.window.activeTextEditor?.document.uri.fsPath;
    TestRunnerPanel.show(context.extensionUri, filePath);
  });
  context.subscriptions.push(runTestCasesCmd);

  // 4. AddressSanitizer & Undefined Behavior Guard (Ctrl+F7)
  const runSanitizerCmd = vscode.commands.registerCommand("dtyp.runSanitizer", async (doc?: vscode.TextDocument) => {
    await SanitizerRunner.runSanitizer(doc);
  });
  context.subscriptions.push(runSanitizerCmd);

  // 5. 1-Click Academic Modularize & Makefile (dtyp.modularize)
  const modularizeCmd = vscode.commands.registerCommand("dtyp.modularize", async () => {
    await AcademicModularizer.execute(vscode.window.activeTextEditor);
  });
  context.subscriptions.push(modularizeCmd);

  // 6. Empirical Complexity Benchmarker (dtyp.benchmarkComponent)
  const benchmarkCmd = vscode.commands.registerCommand("dtyp.benchmarkComponent", async () => {
    const editor = vscode.window.activeTextEditor;
    const algoName = editor ? path.basename(editor.document.uri.fsPath, ".c") : "Algorithm";
    const res = await BenchmarkRunner.benchmark(algoName);
    vscode.window.showInformationMessage(
      `⚡ dTyp Benchmark (${res.algorithmName}): Asymptotic Fit: ${res.asymptoticFit} - ${res.fitExplanation}`
    );
  });
  context.subscriptions.push(benchmarkCmd);

  // 7. Interactive Exam Flashcards (dtyp.openFlashcards)
  const flashcardsCmd = vscode.commands.registerCommand("dtyp.openFlashcards", () => {
    FlashcardsPanel.show(context.extensionUri);
  });
  context.subscriptions.push(flashcardsCmd);

  // 8. Floating On-Screen Stepping HUD (dtyp.toggleSteppingHud)
  const toggleHudCmd = vscode.commands.registerCommand("dtyp.toggleSteppingHud", () => {
    if (autoTypeEngine && typingEngine) {
      HudPanel.show(autoTypeEngine, typingEngine);
    }
  });
  context.subscriptions.push(toggleHudCmd);

  // 9. Inside-VS Code Shortcuts Documentation (dtyp.showShortcuts)
  const showShortcutsCmd = vscode.commands.registerCommand("dtyp.showShortcuts", async () => {
    const shortcutsPath = path.join(context.extensionPath, "walkthroughs", "shortcuts.md");
    if (fs.existsSync(shortcutsPath)) {
      const uri = vscode.Uri.file(shortcutsPath);
      await vscode.commands.executeCommand("markdown.showPreview", uri);
    } else {
      vscode.window.showInformationMessage(
        "dTyp Shortcuts: Ctrl+Shift+D (Step) | Alt+C (Chameleon) | Alt+P (Pause/Resume) | Ctrl+Shift+R (Renew) | Ctrl+F5 (Compile & Run) | Ctrl+F6 (Test Sandbox) | Ctrl+F7 (ASan Guard) | Shift+Alt+F (Academic Format) | Ctrl+F8 (Audit) | Ctrl+F9 (Contest Arena)"
      );
    }
  });
  context.subscriptions.push(showShortcutsCmd);

  // 10. Academic Code Doctor & Formatter (Shift+Alt+F / dtyp.formatAcademic)
  const formatAcademicCmd = vscode.commands.registerCommand("dtyp.formatAcademic", async () => {
    await CodeDoctorProvider.formatActiveDocument();
  });
  context.subscriptions.push(formatAcademicCmd);

  // 11. Academic Code Doctor Audit (Ctrl+F8 / dtyp.auditCode)
  const auditCodeCmd = vscode.commands.registerCommand("dtyp.auditCode", () => {
    if (vscode.window.activeTextEditor) {
      const issues = CodeDoctorProvider.updateDiagnostics(vscode.window.activeTextEditor.document);
      if (issues.length === 0) {
        vscode.window.showInformationMessage("dTyp Code Doctor: No defects detected! Clean academic C code.");
      } else {
        vscode.window.showWarningMessage(
          `dTyp Code Doctor: Found ${issues.length} potential academic defect(s). Check Problems panel.`
        );
      }
    } else {
      vscode.window.showWarningMessage("dTyp: Open a C/C++ file to audit.");
    }
  });
  context.subscriptions.push(auditCodeCmd);

  // 12. Competitive Programming Contest Scaffolder (Ctrl+F9 / dtyp.scaffoldContest)
  const scaffoldContestCmd = vscode.commands.registerCommand("dtyp.scaffoldContest", async () => {
    await ContestScaffolder.scaffold();
  });
  context.subscriptions.push(scaffoldContestCmd);

  // 13. Interactive Recursion Tree Visualizer (dtyp.visualizeRecursion)
  const visualizeRecursionCmd = vscode.commands.registerCommand("dtyp.visualizeRecursion", () => {
    RecursionVisualizerPanel.show(context.extensionUri);
  });
  context.subscriptions.push(visualizeRecursionCmd);

  // 14. Valgrind Deep Leak Profiler (dtyp.runValgrind)
  const runValgrindCmd = vscode.commands.registerCommand("dtyp.runValgrind", async () => {
    await ValgrindRunner.run();
  });
  context.subscriptions.push(runValgrindCmd);

  // 15. C Typing Speed Drill Arena (dtyp.openTypingDrill)
  const openTypingDrillCmd = vscode.commands.registerCommand("dtyp.openTypingDrill", () => {
    TypingDrillPanel.show(context.extensionUri);
  });
  context.subscriptions.push(openTypingDrillCmd);

  // 16. Unified Control Center & Master Hub (dtyp.openControlCenter)
  const openControlCenterCmd = vscode.commands.registerCommand("dtyp.openControlCenter", () => {
    ControlCenterPanel.show(context);
  });
  context.subscriptions.push(openControlCenterCmd);

  // 17. Unified Status Bar Hub Menu (dtyp.openStatusBarMenu)
  const openStatusBarMenuCmd = vscode.commands.registerCommand("dtyp.openStatusBarMenu", async () => {
    const config = vscode.workspace.getConfiguration("dtyp");
    const currentMode = config.get<string>("typingMode", "automatic");
    const isChameleon = autoTypeEngine?.isChameleonEnabled() ?? false;

    const items = [
      {
        label: "$(dashboard) Open Control Center & Master Hub",
        description: "Full visual flight deck & cheatsheet",
        command: "dtyp.openControlCenter",
      },
      {
        label: "$(library) Browse Offline C Library (665 Algorithms)",
        description: "Ctrl+Alt+D",
        detail: "Hierarchical category tree of all data structures and algorithms",
        command: "dtyp.browseLibrary",
      },
      {
        label: "$(search) Quick Insert Component (Fuzzy Search)",
        description: "Ranked search",
        detail: "Fuzzy search with preview across all 665 components",
        command: "dtyp.quickInsert",
      },
      {
        label: `$(eye) ${isChameleon ? "Disable" : "Enable"} Chameleon Ghost-Typing Mode`,
        description: "Alt+C",
        detail: "Mash any physical keys to advance the queued C algorithm character-by-character",
        command: "dtyp.toggleChameleonMode",
      },
      {
        label: `$(keyboard) Toggle Typing Mode (Current: ${currentMode})`,
        description: currentMode === "automatic" ? "Switch to Stealth Manual" : "Switch to Automatic",
        detail: "Switch between auto humanized typing and stealth step-by-step (Ctrl+Shift+D)",
        command: "dtyp.toggleTypingMode",
      },
      {
        label: "$(wand) Format Code with Academic Pure Tabs",
        description: "Shift+Alt+F",
        detail: "Enforce university standards with pure tabs ('\\t'), operator spacing, and clean braces",
        command: "dtyp.formatAcademic",
      },
      {
        label: "$(checklist) Audit C Code for Academic Defects",
        description: "Ctrl+F8",
        detail: "Check for missing returns in non-void functions, uninitialized pointers, and dead code",
        command: "dtyp.auditCode",
      },
      {
        label: "$(flame) Scaffold Competitive Programming Arena",
        description: "Ctrl+F9",
        detail: "Fast I/O (getchar_unlocked), 64MB bump arena, and automated stress tester",
        command: "dtyp.scaffoldContest",
      },
      {
        label: "$(play) 1-Click Compile & Run in Terminal",
        description: "Ctrl+F5 (GCC)",
        detail: "Compile active file with -Wall -Wextra -std=c11 -O2 and run in terminal",
        command: "dtyp.compileAndRun",
      },
      {
        label: "$(beaker) Run Multi-Test Case Sandbox",
        description: "Ctrl+F6",
        detail: "Multi-case stdin/stdout diff testing with timeout guard",
        command: "dtyp.runTestCases",
      },
      {
        label: "$(shield) Run AddressSanitizer & UB Guard",
        description: "Ctrl+F7",
        detail: "Detect memory corruptions, stack/heap overflows, and undefined behavior",
        command: "dtyp.runSanitizer",
      },
      {
        label: "$(microscope) Run Valgrind Deep Leak Profiler",
        description: "Heap leak analyzer",
        detail: "Compile with -g -O0 and run full Valgrind memory leak check",
        command: "dtyp.runValgrind",
      },
      {
        label: "$(type-hierarchy-sub) Open Live Recursion Tree Visualizer",
        description: "Call stack & SVG tree",
        detail: "Interactive step-by-step recursion tree with activation frame indicators",
        command: "dtyp.visualizeRecursion",
      },
      {
        label: "$(zap) Open C Typing Speed Drill Arena",
        description: "TypeRacer for C",
        detail: "Gamified speed typing challenges with live WPM, CPM, and accuracy gauges",
        command: "dtyp.openTypingDrill",
      },
      {
        label: "$(mortar-board) Open Exam Flashcards & Cheat Sheet",
        description: "Recurrences & pointers",
        detail: "Interactive 3D flippable flashcards for computer science exams",
        command: "dtyp.openFlashcards",
      },
      {
        label: "$(dashboard) Toggle Live Stepping HUD & WebAudio",
        description: "Cherry MX Synthesizer",
        detail: "Floating mini-player with progress scrubber and mechanical keyboard sounds",
        command: "dtyp.toggleSteppingHud",
      },
      {
        label: "$(package) Modularize into Header, Impl & Makefile",
        description: "Split .c file",
        detail: "Decompose into module.h, module.c, main.c, and tab-indented Makefile",
        command: "dtyp.modularize",
      },
      {
        label: "$(graph) Benchmark Empirical Complexity",
        description: "Big-O fitting",
        detail: "Measure empirical runtime across N inputs and fit asymptotic curve",
        command: "dtyp.benchmarkComponent",
      },
      {
        label: "$(book) Keyboard Shortcuts & Documentation",
        description: "Master Cheatsheet",
        detail: "Complete reference table for all dTyp shortcuts and commands",
        command: "dtyp.showShortcuts",
      },
      {
        label: "$(gear) Configure dTyp Settings...",
        description: "Extension Preferences",
        detail: "Speed, jitter, natural model, typo simulation, acoustic switch profile",
        command: "workbench.action.openSettings",
        args: ["@ext:1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode"],
      },
      {
        label: "$(pulse) Diagnostics & System Health Check",
        description: "Verify SQLite/WASM",
        detail: "Run database integrity check and verify WASM engine",
        command: "dtyp.healthCheck",
      },
    ];

    const picked = await vscode.window.showQuickPick(items, {
      placeHolder: "dTyp Master Hub: Select an action, tool, or workspace...",
      matchOnDescription: true,
      matchOnDetail: true,
    });

    if (picked) {
      if ((picked as any).args) {
        vscode.commands.executeCommand(picked.command, ...(picked as any).args);
      } else {
        vscode.commands.executeCommand(picked.command);
      }
    }
  });
  context.subscriptions.push(openStatusBarMenuCmd);

  // Configuration change listener for real-time reactivity
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("dtyp.enableChameleonMode")) {
        const enabled = vscode.workspace.getConfiguration("dtyp").get<boolean>("enableChameleonMode", false);
        autoTypeEngine?.setChameleonMode(enabled);
        quickActionsTreeProvider?.refresh();
      }
    })
  );

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

  logger.info("dTyp Extension v4.0.0 activated successfully with all production engines & views");
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
