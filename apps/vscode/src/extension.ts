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

const logger = defaultLogger.child("VSCodeExtension");

let sqlite: SqliteClient | null = null;
let libraryEngine: DefaultLibraryEngine | null = null;
let typingEngine: DefaultTypingEngine | null = null;
let typingTarget: VSCodeTypingTarget | null = null;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  logger.info("Activating dTyp VS Code Extension");

  // Locate bundled SQLite database
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

  // Status Bar Item
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = "$(keyboard) dTyp: Ready";
  statusBarItem.tooltip = "dTyp Academic C Library (1,000+ components)";
  statusBarItem.command = "dtyp.browseLibrary";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  typingEngine.on("start", (stats) => {
    statusBarItem.text = `$(sync~spin) dTyp: Typing (0/${stats.charactersTotal})`;
  });

  typingEngine.on("progress", (data) => {
    statusBarItem.text = `$(sync~spin) dTyp: ${data.stats.charactersTyped}/${data.stats.charactersTotal} (${data.stats.averageSpeedCps} cps)`;
  });

  typingEngine.on("complete", () => {
    statusBarItem.text = "$(keyboard) dTyp: Completed";
    setTimeout(() => {
      statusBarItem.text = "$(keyboard) dTyp: Ready";
    }, 3000);
  });

  typingEngine.on("cancel", () => {
    statusBarItem.text = "$(keyboard) dTyp: Cancelled";
    setTimeout(() => {
      statusBarItem.text = "$(keyboard) dTyp: Ready";
    }, 3000);
  });

  // Register Completion Provider
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    ["c", "cpp"],
    new DTypCompletionProvider(libraryEngine),
    ">"
  );
  context.subscriptions.push(completionProvider);

  // Register Hover Provider
  const hoverProvider = vscode.languages.registerHoverProvider(
    ["c", "cpp"],
    new DTypHoverProvider(libraryEngine)
  );
  context.subscriptions.push(hoverProvider);

  // Helper for character-by-character insertion with dependency resolution
  const insertComponentPipeline = async (componentId: string) => {
    if (!libraryEngine || !typingEngine || !typingTarget) return;

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("Open a C/C++ file to insert component.");
      return;
    }

    typingTarget.setEditor(editor);

    const comp = await libraryEngine.findComponent(componentId);
    if (!comp) {
      vscode.window.showErrorMessage(`Component "${componentId}" not found in dTyp library.`);
      return;
    }

    // Resolve dependencies topologically
    let componentsToInsert: Component[] = [];
    try {
      componentsToInsert = await libraryEngine.getDependencies(componentId);
    } catch (err: any) {
      vscode.window.showErrorMessage(`Dependency resolution error: ${err.message}`);
      return;
    }

    // Check duplicate definitions against current editor document
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

    // Assemble text to type
    const fullText = componentsToInsert.map((c) => c.code).join("\n\n") + "\n";
    const delayMs = config.get<number>("typingDelayMs", 15);

    // Character-by-character typing execution
    try {
      await typingEngine.start(fullText, {
        delayMs,
        mode: "character",
        preserveNewlines: true,
        preserveTabs: true,
      });
    } catch (err: any) {
      logger.error(`Typing error: ${err.message}`);
    }
  };

  // Command: Insert Component
  const insertCmd = vscode.commands.registerCommand("dtyp.insertComponent", async (idArg?: string) => {
    if (idArg) {
      await insertComponentPipeline(idArg);
      return;
    }

    if (!libraryEngine) return;

    // QuickPick searching all components
    const all = await libraryEngine.getAllComponents(500);
    const items: vscode.QuickPickItem[] = all.map((c) => ({
      label: `${c.name}()`,
      description: `[${c.category}] ${c.complexity.time}`,
      detail: `${c.description} — ${c.signature}`,
      id: c.id,
    } as any));

    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: "Search 1,000+ academic C components...",
      matchOnDescription: true,
      matchOnDetail: true,
    });

    if (selected && (selected as any).id) {
      await insertComponentPipeline((selected as any).id);
    }
  });
  context.subscriptions.push(insertCmd);

  // Command: Browse Library
  const browseCmd = vscode.commands.registerCommand("dtyp.browseLibrary", async () => {
    if (!libraryEngine) return;

    const categories = await libraryEngine.getCategories();
    const catItems = categories.map((cat) => ({
      label: cat.toUpperCase(),
      description: `Browse ${cat} components`,
      category: cat,
    }));

    const selectedCat = await vscode.window.showQuickPick(catItems, {
      placeHolder: "Select a Category to browse components...",
    });

    if (!selectedCat) return;

    const components = await libraryEngine.getByCategory(selectedCat.category);
    const compItems = components.map((c) => ({
      label: `${c.name}()`,
      description: c.complexity.time,
      detail: c.signature,
      id: c.id,
    }));

    const selectedComp = await vscode.window.showQuickPick(compItems, {
      placeHolder: `Components in ${selectedCat.category}...`,
    });

    if (selectedComp) {
      await insertComponentPipeline(selectedComp.id);
    }
  });
  context.subscriptions.push(browseCmd);

  // Command: Cancel Typing
  const cancelCmd = vscode.commands.registerCommand("dtyp.cancelTyping", () => {
    if (typingEngine?.isTyping()) {
      typingEngine.cancel();
      vscode.window.showInformationMessage("dTyp character typing cancelled.");
    }
  });
  context.subscriptions.push(cancelCmd);

  logger.info("dTyp Extension activated successfully");
}

export function deactivate(): void {
  if (typingEngine?.isTyping()) {
    typingEngine.cancel();
  }
  sqlite?.close();
  logger.info("dTyp Extension deactivated");
}
