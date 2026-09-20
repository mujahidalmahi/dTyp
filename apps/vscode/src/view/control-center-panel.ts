import * as vscode from "vscode";

export class ControlCenterPanel {
	public static currentPanel: ControlCenterPanel | undefined;
	private readonly _panel: vscode.WebviewPanel;
	private _disposables: vscode.Disposable[] = [];

	public static show(context: vscode.ExtensionContext): void {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		if (ControlCenterPanel.currentPanel) {
			ControlCenterPanel.currentPanel._panel.reveal(column);
			ControlCenterPanel.currentPanel.refresh();
			return;
		}

		const panel = vscode.window.createWebviewPanel(
			"dtyp.controlCenter",
			"dTyp: Control Center & Master Hub",
			column || vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
			}
		);

		ControlCenterPanel.currentPanel = new ControlCenterPanel(panel, context);
	}

	private constructor(
		panel: vscode.WebviewPanel,
		private readonly context: vscode.ExtensionContext
	) {
		this._panel = panel;
		try {
			this._panel.iconPath = vscode.Uri.joinPath(this.context.extensionUri, "images", "icon.png");
		} catch {
			// Fallback if image path differs
		}
		this._panel.webview.html = this._getHtmlContent();

		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		this._panel.webview.onDidReceiveMessage(
			async (message) => {
				switch (message.command) {
					case "browseLibrary":
						vscode.commands.executeCommand("dtyp.browseLibrary");
						break;
					case "quickInsert":
						vscode.commands.executeCommand("dtyp.quickInsert");
						break;
					case "insertSnippet":
						vscode.commands.executeCommand("dtyp.insertSnippet");
						break;
					case "toggleTypingMode":
						await vscode.commands.executeCommand("dtyp.toggleTypingMode");
						this.refresh();
						break;
					case "toggleChameleon":
						await vscode.commands.executeCommand("dtyp.toggleChameleonMode");
						this.refresh();
						break;
					case "openHud":
						vscode.commands.executeCommand("dtyp.toggleSteppingHud");
						break;
					case "formatAcademic":
						vscode.commands.executeCommand("dtyp.formatAcademic");
						break;
					case "auditCode":
						vscode.commands.executeCommand("dtyp.auditCode");
						break;
					case "scaffoldContest":
						vscode.commands.executeCommand("dtyp.scaffoldContest");
						break;
					case "compileAndRun":
						vscode.commands.executeCommand("dtyp.compileAndRun");
						break;
					case "runTestCases":
						vscode.commands.executeCommand("dtyp.runTestCases");
						break;
					case "runSanitizer":
						vscode.commands.executeCommand("dtyp.runSanitizer");
						break;
					case "runValgrind":
						vscode.commands.executeCommand("dtyp.runValgrind");
						break;
					case "visualizeRecursion":
						vscode.commands.executeCommand("dtyp.visualizeRecursion");
						break;
					case "openTypingDrill":
						vscode.commands.executeCommand("dtyp.openTypingDrill");
						break;
					case "openFlashcards":
						vscode.commands.executeCommand("dtyp.openFlashcards");
						break;
					case "visualizeDS":
						vscode.commands.executeCommand("dtyp.visualizeComponent");
						break;
					case "modularize":
						vscode.commands.executeCommand("dtyp.modularize");
						break;
					case "benchmark":
						vscode.commands.executeCommand("dtyp.benchmarkComponent");
						break;
					case "showShortcuts":
						vscode.commands.executeCommand("dtyp.showShortcuts");
						break;
					case "openSettings":
						vscode.commands.executeCommand(
							"workbench.action.openSettings",
							"@ext:1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode"
						);
						break;
					case "healthCheck":
						vscode.commands.executeCommand("dtyp.healthCheck");
						break;
					case "openWalkthrough":
						vscode.commands.executeCommand(
							"workbench.action.openWalkthrough",
							"1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode#dtyp.gettingStarted"
						);
						break;
					case "createOwnComponent":
						vscode.commands.executeCommand("dtyp.createOwnComponent");
						break;
					case "showReleaseNotes":
						vscode.commands.executeCommand("dtyp.showReleaseNotes");
						break;
				}
			},
			null,
			this._disposables
		);
	}

	public refresh(): void {
		if (this._panel) {
			this._panel.webview.html = this._getHtmlContent();
		}
	}

	public dispose(): void {
		ControlCenterPanel.currentPanel = undefined;
		this._panel.dispose();
		while (this._disposables.length) {
			const d = this._disposables.pop();
			if (d) d.dispose();
		}
	}

	private _getHtmlContent(): string {
		const config = vscode.workspace.getConfiguration("dtyp");
		const typingMode = config.get<string>("typingMode", "automatic");
		const delayMs = config.get<number>("typingDelayMs", 15);
		const stepSize = config.get<number>("stepSize", 1);
		const chameleonEnabled = config.get<boolean>("enableChameleonMode", false);
		const braceStyle = config.get<string>("academicBraceStyle", "kr");

		return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>dTyp: Control Center & Master Hub</title>
	<style>
		:root {
			--bg-primary: #1e1e24;
			--bg-secondary: #252830;
			--bg-card: #2b2f3a;
			--bg-card-hover: #323744;
			--accent: #61afef;
			--accent-hover: #4ca3ea;
			--accent-green: #98c379;
			--accent-amber: #e5c07b;
			--accent-purple: #c678dd;
			--accent-coral: #e06c75;
			--accent-cyan: #56b6c2;
			--text-primary: #e6edf3;
			--text-secondary: #abb2bf;
			--text-muted: #6e7681;
			--border: #383e4a;
			--radius-lg: 12px;
			--radius-md: 8px;
			--radius-sm: 6px;
		}

		* {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}

		body {
			background-color: var(--bg-primary);
			color: var(--text-primary);
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
			line-height: 1.5;
			padding: 24px;
			max-width: 1200px;
			margin: 0 auto;
		}

		/* Header & Hero */
		.hero-banner {
			background: linear-gradient(135deg, #1f232b 0%, #282c34 50%, #21252b 100%);
			border: 1px solid var(--border);
			border-radius: var(--radius-lg);
			padding: 28px;
			margin-bottom: 24px;
			position: relative;
			overflow: hidden;
			box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
		}

		.hero-banner::before {
			content: "";
			position: absolute;
			top: -40px;
			right: -40px;
			width: 200px;
			height: 200px;
			background: radial-gradient(circle, rgba(97, 175, 239, 0.15) 0%, rgba(97, 175, 239, 0) 70%);
			pointer-events: none;
		}

		.hero-top {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: wrap;
			gap: 16px;
			margin-bottom: 20px;
		}

		.hero-brand {
			display: flex;
			align-items: center;
			gap: 14px;
		}

		.logo-badge {
			width: 44px;
			height: 44px;
			background: linear-gradient(135deg, #61afef, #98c379);
			border-radius: var(--radius-md);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 22px;
			font-weight: 900;
			color: #181a1f;
			box-shadow: 0 4px 12px rgba(97, 175, 239, 0.4);
		}

		.hero-title {
			font-size: 1.6rem;
			font-weight: 800;
			letter-spacing: -0.5px;
			color: #ffffff;
		}

		.hero-subtitle {
			font-size: 0.9rem;
			color: var(--text-secondary);
		}

		.status-pills {
			display: flex;
			gap: 10px;
			flex-wrap: wrap;
		}

		.pill {
			display: inline-flex;
			align-items: center;
			gap: 6px;
			background: var(--bg-card);
			border: 1px solid var(--border);
			border-radius: 20px;
			padding: 6px 14px;
			font-size: 0.8rem;
			font-weight: 600;
			color: var(--text-primary);
			cursor: pointer;
			transition: all 0.2s ease;
		}

		.pill:hover {
			border-color: var(--accent);
			transform: translateY(-1px);
		}

		.pill.active {
			background: rgba(97, 175, 239, 0.15);
			border-color: var(--accent);
			color: var(--accent);
		}

		.pill.green {
			background: rgba(152, 195, 121, 0.15);
			border-color: var(--accent-green);
			color: var(--accent-green);
		}

		.pill-dot {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: currentColor;
		}

		/* Stats Bar */
		.stats-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
			gap: 12px;
			margin-top: 16px;
		}

		.stat-box {
			background: rgba(0, 0, 0, 0.25);
			border: 1px solid rgba(255, 255, 255, 0.06);
			border-radius: var(--radius-md);
			padding: 12px 16px;
		}

		.stat-number {
			font-size: 1.4rem;
			font-weight: 800;
			color: #ffffff;
		}

		.stat-label {
			font-size: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: var(--text-muted);
		}

		/* Bento Grid */
		.section-heading {
			font-size: 1.15rem;
			font-weight: 700;
			color: var(--text-primary);
			margin: 28px 0 16px 0;
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.bento-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
			gap: 16px;
		}

		.card {
			background: var(--bg-secondary);
			border: 1px solid var(--border);
			border-radius: var(--radius-lg);
			padding: 20px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
		}

		.card:hover {
			border-color: var(--accent);
			transform: translateY(-2px);
			box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
		}

		.card-header {
			display: flex;
			align-items: center;
			gap: 12px;
			margin-bottom: 10px;
		}

		.card-icon {
			width: 36px;
			height: 36px;
			border-radius: var(--radius-sm);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 18px;
			flex-shrink: 0;
		}

		.card-icon.blue { background: rgba(97, 175, 239, 0.15); color: var(--accent); }
		.card-icon.green { background: rgba(152, 195, 121, 0.15); color: var(--accent-green); }
		.card-icon.amber { background: rgba(229, 192, 123, 0.15); color: var(--accent-amber); }
		.card-icon.purple { background: rgba(198, 120, 221, 0.15); color: var(--accent-purple); }
		.card-icon.coral { background: rgba(224, 108, 117, 0.15); color: var(--accent-coral); }
		.card-icon.cyan { background: rgba(86, 182, 194, 0.15); color: var(--accent-cyan); }

		.card-title {
			font-size: 1.05rem;
			font-weight: 700;
			color: #ffffff;
		}

		.card-tag {
			margin-left: auto;
			font-size: 0.7rem;
			font-weight: 600;
			padding: 2px 8px;
			border-radius: 4px;
			background: rgba(255, 255, 255, 0.08);
			color: var(--text-secondary);
		}

		.card-desc {
			font-size: 0.85rem;
			color: var(--text-secondary);
			margin-bottom: 16px;
			line-height: 1.45;
			flex-grow: 1;
		}

		.card-actions {
			display: flex;
			gap: 8px;
			flex-wrap: wrap;
		}

		button.btn {
			background: var(--bg-card);
			border: 1px solid var(--border);
			color: var(--text-primary);
			border-radius: var(--radius-sm);
			padding: 7px 12px;
			font-size: 0.8rem;
			font-weight: 600;
			cursor: pointer;
			display: inline-flex;
			align-items: center;
			gap: 6px;
			transition: all 0.15s ease;
		}

		button.btn:hover {
			background: var(--bg-card-hover);
			border-color: var(--accent);
			color: #ffffff;
		}

		button.btn.primary {
			background: var(--accent);
			border-color: var(--accent);
			color: #181a1f;
			font-weight: 700;
		}

		button.btn.primary:hover {
			background: var(--accent-hover);
		}

		/* Keyboard Cheatsheet Table */
		.table-container {
			background: var(--bg-secondary);
			border: 1px solid var(--border);
			border-radius: var(--radius-lg);
			overflow: hidden;
			margin-top: 16px;
		}

		table {
			width: 100%;
			border-collapse: collapse;
			text-align: left;
			font-size: 0.85rem;
		}

		th, td {
			padding: 12px 16px;
			border-bottom: 1px solid var(--border);
		}

		th {
			background: rgba(0, 0, 0, 0.2);
			color: var(--text-secondary);
			font-weight: 600;
			text-transform: uppercase;
			font-size: 0.75rem;
			letter-spacing: 0.5px;
		}

		tr:last-child td {
			border-bottom: none;
		}

		tr:hover td {
			background: rgba(255, 255, 255, 0.02);
		}

		kbd {
			background: #181a1f;
			border: 1px solid #383e4a;
			border-bottom-width: 2px;
			border-radius: 4px;
			padding: 3px 6px;
			font-size: 0.75rem;
			font-family: monospace;
			font-weight: 700;
			color: #abb2bf;
			white-space: nowrap;
		}

		/* Footer */
		.footer {
			margin-top: 40px;
			padding-top: 20px;
			border-top: 1px solid var(--border);
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: var(--text-muted);
			font-size: 0.8rem;
			flex-wrap: wrap;
			gap: 12px;
		}

		.footer-links {
			display: flex;
			gap: 16px;
		}

		.footer-link {
			color: var(--text-secondary);
			text-decoration: none;
			cursor: pointer;
		}

		.footer-link:hover {
			color: var(--accent);
		}
	</style>
</head>
<body>

	<!-- Hero & Status Flight Deck -->
	<div class="hero-banner">
		<div class="hero-top">
			<div class="hero-brand">
				<div class="logo-badge">d</div>
				<div>
					<div class="hero-title">dTyp Control Center & Master Hub</div>
					<div class="hero-subtitle">The World's Premier Offline C Algorithm Library & Natural Writing Engine</div>
				</div>
			</div>

			<div class="status-pills">
				<div class="pill ${typingMode === "automatic" ? "active" : ""}" onclick="sendCmd('toggleTypingMode')">
					<span class="pill-dot"></span>
					Mode: ${typingMode === "automatic" ? `Automatic (${delayMs}ms)` : `Stealth Manual (${stepSize} char)`}
				</div>
				<div class="pill ${chameleonEnabled ? "green" : ""}" onclick="sendCmd('toggleChameleon')">
					<span class="pill-dot"></span>
					Chameleon: ${chameleonEnabled ? "ACTIVE (Alt+C)" : "OFF"}
				</div>
				<div class="pill" onclick="sendCmd('openHud')">
					<span>🎛️ Live Stepping HUD</span>
				</div>
			</div>
		</div>

		<div class="stats-grid">
			<div class="stat-box">
				<div class="stat-number">665</div>
				<div class="stat-label">Verified C Components</div>
			</div>
			<div class="stat-box">
				<div class="stat-number">7</div>
				<div class="stat-label">Structured Domains</div>
			</div>
			<div class="stat-box">
				<div class="stat-number">1,492</div>
				<div class="stat-label">Interactive Snippets</div>
			</div>
			<div class="stat-box">
				<div class="stat-number">${braceStyle.toUpperCase()}</div>
				<div class="stat-label">Pure Tab Brace Style</div>
			</div>
		</div>
	</div>

	<!-- Core Capabilities Bento -->
	<div class="section-heading">
		<span>⚡ Core Engines & Workspaces</span>
	</div>

	<div class="bento-grid">

		<!-- 1. Offline Library & Search -->
		<div class="card">
			<div>
				<div class="card-header">
					<div class="card-icon blue">📚</div>
					<div class="card-title">Offline C Library</div>
					<div class="card-tag">665 Algorithms</div>
				</div>
				<div class="card-desc">
					Completely offline SQLite embedded database with zero latency. Includes data structures, classic algorithms, POSIX routines, and academic driver programs.
				</div>
			</div>
			<div class="card-actions">
				<button class="btn primary" onclick="sendCmd('browseLibrary')">Browse Library (Ctrl+Alt+D)</button>
				<button class="btn" onclick="sendCmd('quickInsert')">Fuzzy Insert</button>
				<button class="btn" onclick="sendCmd('insertSnippet')">Snippets</button>
			</div>
		</div>

		<!-- 2. Stealth Typing & Chameleon -->
		<div class="card">
			<div>
				<div class="card-header">
					<div class="card-icon green">🦎</div>
					<div class="card-title">Stealth Typing & Chameleon</div>
					<div class="card-tag">Biomechanical QWERTY</div>
				</div>
				<div class="card-desc">
					Human-indistinguishable typing simulation with alternating-hand reflex bursts, deliberate false starts, typo self-correction, and full Chameleon key-mash forwarding.
				</div>
			</div>
			<div class="card-actions">
				<button class="btn primary" onclick="sendCmd('toggleChameleon')">Toggle Chameleon (Alt+C)</button>
				<button class="btn" onclick="sendCmd('toggleTypingMode')">Switch Mode</button>
				<button class="btn" onclick="sendCmd('openHud')">Stepping HUD</button>
			</div>
		</div>

		<!-- 3. Academic Code Doctor -->
		<div class="card">
			<div>
				<div class="card-header">
					<div class="card-icon amber">🩺</div>
					<div class="card-title">Academic Code Doctor</div>
					<div class="card-tag">Pure Tabs ('\\t')</div>
				</div>
				<div class="card-desc">
					Enforces strict university formatting with pure tabs, clean operator spacing, and AST auditing for missing returns, uninitialized wild pointers, and dead code.
				</div>
			</div>
			<div class="card-actions">
				<button class="btn primary" onclick="sendCmd('formatAcademic')">Format Code (Shift+Alt+F)</button>
				<button class="btn" onclick="sendCmd('auditCode')">Audit Defects (Ctrl+F8)</button>
			</div>
		</div>

		<!-- 4. Competitive Programming Arena -->
		<div class="card">
			<div>
				<div class="card-header">
					<div class="card-icon coral">🏆</div>
					<div class="card-title">CP Contest Arena</div>
					<div class="card-tag">Fast I/O & Arena</div>
				</div>
				<div class="card-desc">
					Scaffold competition-ready C boilerplate with getchar_unlocked (~5x faster), 64MB static memory bump arena, and automated differential stress testing.
				</div>
			</div>
			<div class="card-actions">
				<button class="btn primary" onclick="sendCmd('scaffoldContest')">Scaffold Contest Arena (Ctrl+F9)</button>
			</div>
		</div>

		<!-- 5. Memory Profiler & Undefined Behavior Guard -->
		<div class="card">
			<div>
				<div class="card-header">
					<div class="card-icon purple">🛡️</div>
					<div class="card-title">Memory & Safety Guards</div>
					<div class="card-tag">ASan & Valgrind</div>
				</div>
				<div class="card-desc">
					AddressSanitizer and Undefined Behavior guard with student-friendly diagnostics, plus deep Valgrind memory leak profiling with parsed byte frame traces.
				</div>
			</div>
			<div class="card-actions">
				<button class="btn primary" onclick="sendCmd('runSanitizer')">AddressSanitizer (Ctrl+F7)</button>
				<button class="btn" onclick="sendCmd('runValgrind')">Run Valgrind Profiler</button>
			</div>
		</div>

		<!-- 6. Interactive Visualizers & Arenas -->
		<div class="card">
			<div>
				<div class="card-header">
					<div class="card-icon cyan">🎨</div>
					<div class="card-title">Interactive Visualizers</div>
					<div class="card-tag">Live Call Stack</div>
				</div>
				<div class="card-desc">
					Live SVG recursion tree visualizer with activation frame scrubber, gamified C typing speed drill arena ("TypeRacer for C"), 3D flashcards, and pointer topology.
				</div>
			</div>
			<div class="card-actions">
				<button class="btn primary" onclick="sendCmd('visualizeRecursion')">Recursion Tree</button>
				<button class="btn" onclick="sendCmd('openTypingDrill')">Typing Drill Arena</button>
				<button class="btn" onclick="sendCmd('openFlashcards')">Flashcards</button>
				<button class="btn" onclick="sendCmd('visualizeDS')">Data Structure</button>
			</div>
		</div>

		<!-- 7. Compiler & Sandboxing -->
		<div class="card">
			<div>
				<div class="card-header">
					<div class="card-icon blue">🧪</div>
					<div class="card-title">Compiler & Multi-Test Sandbox</div>
					<div class="card-tag">GCC / Clang</div>
				</div>
				<div class="card-desc">
					1-click GCC compiler with terminal runner, side-by-side multi-case stdin/stdout diff testing with timeout guard, and header/Makefile modularization.
				</div>
			</div>
			<div class="card-actions">
				<button class="btn primary" onclick="sendCmd('compileAndRun')">Compile & Run (Ctrl+F5)</button>
				<button class="btn" onclick="sendCmd('runTestCases')">Test Sandbox (Ctrl+F6)</button>
				<button class="btn" onclick="sendCmd('modularize')">Modularize</button>
				<button class="btn" onclick="sendCmd('benchmark')">Benchmark</button>
			</div>
		</div>

		<!-- 8. Own Library & Custom Scaffolding -->
		<div class="card">
			<div>
				<div class="card-header">
					<div class="card-icon green">📁</div>
					<div class="card-title">Own Library Storage</div>
					<div class="card-tag">JSON Persistence</div>
				</div>
				<div class="card-desc">
					Author, edit, tag, export, and import your own private C snippets and algorithms with full auto-typing, header injection, and duplicate checking support.
				</div>
			</div>
			<div class="card-actions">
				<button class="btn primary" onclick="sendCmd('createOwnComponent')">Create Custom Component</button>
				<button class="btn" onclick="sendCmd('openSettings')">Configure Settings</button>
			</div>
		</div>

	</div>

	<!-- Master Keyboard Cheatsheet -->
	<div class="section-heading">
		<span>⌨️ Master Keyboard Shortcuts Reference</span>
	</div>

	<div class="table-container">
		<table>
			<thead>
				<tr>
					<th>Shortcut</th>
					<th>Action</th>
					<th>Feature & Behavior</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd></td>
					<td>Step Next Character</td>
					<td>Steps queued code by 1 char (or <code>dtyp.stepSize</code>) in manual mode</td>
					<td><button class="btn" onclick="sendCmd('openHud')">Open HUD</button></td>
				</tr>
				<tr>
					<td><kbd>Alt</kbd> + <kbd>C</kbd></td>
					<td>Toggle Chameleon Mode</td>
					<td>Any physical key mash outputs the next character from the queued algorithm</td>
					<td><button class="btn" onclick="sendCmd('toggleChameleon')">Toggle</button></td>
				</tr>
				<tr>
					<td><kbd>Alt</kbd> + <kbd>P</kbd></td>
					<td>Pause / Resume</td>
					<td>Freezes or unfreezes automatic typing without losing head memory</td>
					<td><button class="btn" onclick="sendCmd('toggleTypingMode')">Toggle</button></td>
				</tr>
				<tr>
					<td><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd></td>
					<td>Academic Formatter</td>
					<td>Enforces strict university pure tabs (<code>\\t</code>) and operator spacing</td>
					<td><button class="btn" onclick="sendCmd('formatAcademic')">Format</button></td>
				</tr>
				<tr>
					<td><kbd>Ctrl</kbd> + <kbd>F8</kbd></td>
					<td>Academic Code Audit</td>
					<td>Audits AST for missing returns, wild pointers, and unreachable dead code</td>
					<td><button class="btn" onclick="sendCmd('auditCode')">Audit</button></td>
				</tr>
				<tr>
					<td><kbd>Ctrl</kbd> + <kbd>F9</kbd></td>
					<td>CP Contest Arena</td>
					<td>Fast I/O, 64MB static bump arena, and automated differential stress tester</td>
					<td><button class="btn" onclick="sendCmd('scaffoldContest')">Scaffold</button></td>
				</tr>
				<tr>
					<td><kbd>Ctrl</kbd> + <kbd>F5</kbd></td>
					<td>Compile & Run</td>
					<td>1-Click GCC compilation with -Wall -Wextra and integrated terminal run</td>
					<td><button class="btn" onclick="sendCmd('compileAndRun')">Compile</button></td>
				</tr>
				<tr>
					<td><kbd>Ctrl</kbd> + <kbd>F6</kbd></td>
					<td>Multi-Test Sandbox</td>
					<td>Side-by-side stdin/stdout diff sandbox with timeout guard</td>
					<td><button class="btn" onclick="sendCmd('runTestCases')">Run Sandbox</button></td>
				</tr>
				<tr>
					<td><kbd>Ctrl</kbd> + <kbd>F7</kbd></td>
					<td>AddressSanitizer Guard</td>
					<td>Translates cryptic heap/stack overflow traces into human explanations</td>
					<td><button class="btn" onclick="sendCmd('runSanitizer')">Run ASan</button></td>
				</tr>
				<tr>
					<td><kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>D</kbd></td>
					<td>Browse Offline Library</td>
					<td>Hierarchical quickpick of 665 algorithms and driver programs</td>
					<td><button class="btn" onclick="sendCmd('browseLibrary')">Browse</button></td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- Footer -->
	<div class="footer">
		<div>dTyp v4.0.0 &bull; 100% Offline C Super-Extension</div>
		<div class="footer-links">
			<span class="footer-link" onclick="sendCmd('showShortcuts')">Shortcuts Docs</span>
			<span class="footer-link" onclick="sendCmd('healthCheck')">Diagnostics Check</span>
			<span class="footer-link" onclick="sendCmd('openWalkthrough')">Walkthrough Guide</span>
			<span class="footer-link" onclick="sendCmd('showReleaseNotes')">Release Notes</span>
			<span class="footer-link" onclick="sendCmd('openSettings')">Settings</span>
		</div>
	</div>

	<script>
		const vscode = acquireVsCodeApi();

		function sendCmd(command) {
			vscode.postMessage({ command });
		}
	</script>
</body>
</html>`;
	}
}
