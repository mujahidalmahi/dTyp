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
        id: "open_control_center",
        label: "🌟 Control Center & Master Hub",
        description: "Visual Dashboard",
        tooltip: "Open the comprehensive visual control flight deck, feature bento, and master cheatsheet",
        icon: "dashboard",
        command: "dtyp.openControlCenter",
      },
      {
        id: "toggle_mode",
        label: modeLabel,
        description: modeDesc,
        tooltip: "Click to toggle between Automatic and Stealth Manual (Ctrl+D) typing mode",
        icon: modeIcon,
        command: "dtyp.toggleTypingMode",
      },
      {
        id: "toggle_chameleon",
        label: "Chameleon Mode",
        description: "Alt+C",
        tooltip: "Random key mashing types the exact queued C code character-by-character",
        icon: "eye",
        command: "dtyp.toggleChameleonMode",
      },
      {
        id: "test_sandbox",
        label: "Multi-Test Sandbox",
        description: "Ctrl+F6",
        tooltip: "Run multi-case stdin/stdout test runner with diff viewer and timeout guard",
        icon: "beaker",
        command: "dtyp.runTestCases",
      },
      {
        id: "asan_guard",
        label: "AddressSanitizer & UB Guard",
        description: "Ctrl+F7",
        tooltip: "Compile with -fsanitize=address,undefined and inspect friendly memory diagnostics",
        icon: "shield",
        command: "dtyp.runSanitizer",
      },
      {
        id: "format_academic",
        label: "Academic Code Formatter",
        description: "Shift+Alt+F (Pure Tabs)",
        tooltip: "Format C code with strict university pure tabs ('\\t'), operator spacing, and clean braces",
        icon: "wand",
        command: "dtyp.formatAcademic",
      },
      {
        id: "audit_code",
        label: "Academic Code Doctor",
        description: "Ctrl+F8 (Defect Audit)",
        tooltip: "Audit AST for missing return statements, uninitialized wild pointers, and unreachable dead code",
        icon: "checklist",
        command: "dtyp.auditCode",
      },
      {
        id: "scaffold_contest",
        label: "CP Contest Arena Scaffolder",
        description: "Ctrl+F9 (Fast I/O & Arena)",
        tooltip: "Scaffold competition-ready C boilerplate with getchar_unlocked fast I/O, 64MB bump arena, and stress tester",
        icon: "flame",
        command: "dtyp.scaffoldContest",
      },
      {
        id: "visualize_recursion",
        label: "Live Recursion Tree Visualizer",
        description: "Call Stack & Tree SVG",
        tooltip: "Interactive recursion tree visualizer with call stack scrubber and activation frame indicators",
        icon: "type-hierarchy-sub",
        command: "dtyp.visualizeRecursion",
      },
      {
        id: "run_valgrind",
        label: "Valgrind Memory Leak Profiler",
        description: "Deep Heap Profiling",
        tooltip: "Compile with -g -O0 and run Valgrind --leak-check=full with parsed frame diagnostics",
        icon: "microscope",
        command: "dtyp.runValgrind",
      },
      {
        id: "typing_drill",
        label: "C Typing Speed Drill Arena",
        description: "TypeRacer for C",
        tooltip: "Gamified C typing speed and muscle memory arena with real-time WPM, CPM, and error feedback",
        icon: "zap",
        command: "dtyp.openTypingDrill",
      },
      {
        id: "modularize_code",
        label: "Academic Modularize & Makefile",
        description: "Split .h, .c, Makefile",
        tooltip: "Decompose single-file C code into module.h, module.c, main.c, and tab-indented Makefile",
        icon: "package",
        command: "dtyp.modularize",
      },
      {
        id: "flashcards",
        label: "Exam Flashcards & Cheat Sheet",
        description: "Recurrences, Pointers",
        tooltip: "Interactive 3D flippable flashcards covering Master Theorem, pointers, bitwise hacks",
        icon: "mortar-board",
        command: "dtyp.openFlashcards",
      },
      {
        id: "stepping_hud",
        label: "Live Stepping HUD & WebAudio",
        description: "Mini-player overlay",
        tooltip: "Floating scrubber with CPS meter and synthesized Cherry MX Blue/Brown/Thock sound effects",
        icon: "dashboard",
        command: "dtyp.toggleSteppingHud",
      },
      {
        id: "show_shortcuts",
        label: "Shortcuts & Cheatsheet",
        description: "Reference doc",
        tooltip: "View full table of keyboard shortcuts inside VS Code",
        icon: "keyboard",
        command: "dtyp.showShortcuts",
      },
      {
        id: "compile_run",
        label: "Compile & Run in Terminal",
        description: "Ctrl+F5 (GCC)",
        tooltip: "1-Click compile with -Wall -Wextra and execute in integrated terminal",
        icon: "play",
        command: "dtyp.compileAndRun",
      },
      {
        id: "visualize_structure",
        label: "Data Structure Visualizer",
        description: "Memory & pointers",
        tooltip: "Interactive SVG diagrams of linked lists, trees, stacks, and heaps",
        icon: "eye",
        command: "dtyp.visualizeComponent",
      },
      {
        id: "toggle_pause",
        label: "Pause / Resume Typing",
        description: "Alt+P",
        tooltip: "Pause or resume ongoing automated or manual typing session",
        icon: "debug-pause",
        command: "dtyp.togglePauseTyping",
      },
      {
        id: "renew_queue",
        label: "Renew Typing Queue",
        description: "Ctrl+Shift+R",
        tooltip: "Renew current or last typed component from character 0",
        icon: "debug-restart",
        command: "dtyp.renewQueue",
      },
      {
        id: "browse_library",
        label: "Browse Library (665)",
        description: "Ctrl+Shift+D",
        tooltip: "Search and browse 665 components across 7 domains + Own Library",
        icon: "library",
        command: "dtyp.browseLibrary",
      },
      {
        id: "create_own_component",
        label: "Create Own Component",
        description: "Own Library",
        tooltip: "Create custom C component with dedicated fields and save to Own Library",
        icon: "plus",
        command: "dtyp.createOwnComponent",
      },
      {
        id: "quick_insert",
        label: "Quick Insert (Fuzzy)",
        description: "Ranked search",
        tooltip: "Fuzzy search with relevance scoring across all components",
        icon: "search",
        command: "dtyp.quickInsert",
      },
      {
        id: "insert_snippet",
        label: "Insert Snippet (1,492)",
        description: "Tab stops ($1, $0)",
        tooltip: "Insert structured C snippets with tab stops",
        icon: "symbol-snippet",
        command: "dtyp.insertSnippet",
      },
      {
        id: "view_docs",
        label: "Component Documentation",
        description: "Markdown docs",
        tooltip: "View comprehensive documentation for any component",
        icon: "book",
        command: "dtyp.viewDocumentation",
      },
      {
        id: "analyze_memory",
        label: "Memory & Leak Analysis",
        description: "Heap inspection",
        tooltip: "Analyze active file for unmanaged malloc/calloc allocations",
        icon: "search",
        command: "dtyp.analyzeMemory",
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
        label: "What's New in dTyp v4.0.0",
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
