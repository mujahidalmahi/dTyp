import * as vscode from "vscode";

export interface QuickActionItem {
  id: string;
  label: string;
  description?: string;
  tooltip: string;
  icon: string;
  command: string;
  arguments?: any[];
}

export class QuickActionsTreeProvider implements vscode.TreeDataProvider<QuickActionItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<QuickActionItem | undefined | void> = new vscode.EventEmitter<QuickActionItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<QuickActionItem | undefined | void> = this._onDidChangeTreeData.event;

  public refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  public getTreeItem(element: QuickActionItem): vscode.TreeItem {
    const item = new vscode.TreeItem(element.label, vscode.TreeItemCollapsibleState.None);
    item.id = element.id;
    item.description = element.description;
    item.tooltip = element.tooltip;
    item.iconPath = new vscode.ThemeIcon(element.icon);
    item.contextValue = "quickAction";
    item.command = {
      command: element.command,
      title: element.label,
      arguments: element.arguments,
    };
    return item;
  }

  public async getChildren(element?: QuickActionItem): Promise<QuickActionItem[]> {
    if (element) return [];

    const config = vscode.workspace.getConfiguration("dtyp");
    const mode = config.get<string>("typingMode", "automatic");
    const stepSize = config.get<number>("stepSize", 1);
    const delay = config.get<number>("typingDelayMs", 15);
    const headers = config.get<boolean>("autoIncludeHeaders", true);

    const modeLabel = mode === "manual" ? "Mode: Manual (Ctrl+D)" : `Mode: Automatic (${delay}ms)`;
    const modeDesc = mode === "manual" ? `Step: ${stepSize} char(s)` : "Continuous typing";
    const modeIcon = mode === "manual" ? "keyboard" : "sync";

    return [
      {
        id: "toggle_mode",
        label: modeLabel,
        description: modeDesc,
        tooltip: "Click to toggle between Automatic and Stealth Manual (Ctrl+D) typing mode",
        icon: modeIcon,
        command: "dtyp.toggleTypingMode",
      },
      {
        id: "browse_library",
        label: "Browse Library (24,478)",
        description: "Ctrl+Shift+D",
        tooltip: "Search and browse all components and templates",
        icon: "library",
        command: "dtyp.browseLibrary",
      },
      {
        id: "quick_insert",
        label: "Quick Insert (Fuzzy)",
        description: "Ranked search",
        tooltip: "Fuzzy search with relevance scoring across 24,000+ components",
        icon: "search",
        command: "dtyp.quickInsert",
      },
      {
        id: "insert_snippet",
        label: "Insert Snippet",
        description: "Tab stops ($1, $0)",
        tooltip: "Insert interactive C snippets with tab stops",
        icon: "symbol-snippet",
        command: "dtyp.insertSnippet",
      },
      {
        id: "walkthrough",
        label: "Getting Started Guide",
        description: "Walkthrough",
        tooltip: "Open interactive native onboarding walkthrough",
        icon: "mortar-board",
        command: "workbench.action.openWalkthrough",
        arguments: ["1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode#dtyp.gettingStarted"],
      },
      {
        id: "release_notes",
        label: "What's New in dTyp v2.0",
        description: "Release Notes",
        tooltip: "View features, architecture overhaul, and keyboard cheat-sheet",
        icon: "megaphone",
        command: "dtyp.showReleaseNotes",
      },
      {
        id: "health_check",
        label: "Diagnostics & Health Check",
        description: "Verify DB/WASM",
        tooltip: "Run SQLite database integrity check and verify WASM engine",
        icon: "pulse",
        command: "dtyp.healthCheck",
      },
      {
        id: "open_settings",
        label: "Configure dTyp Settings",
        description: "speed, mode, headers",
        tooltip: "Open VS Code settings for dTyp",
        icon: "gear",
        command: "workbench.action.openSettings",
        arguments: ["@ext:1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode"],
      },
    ];
  }
}
