import * as vscode from "vscode";
import * as path from "node:path";
import { TestCase, TestRunner, PRESET_TEST_CASES } from "../command/test-runner.js";

export class TestRunnerPanel {
	public static currentPanel: TestRunnerPanel | null = null;
	private readonly panel: vscode.WebviewPanel;
	private disposables: vscode.Disposable[] = [];
	private currentCases: TestCase[] = [];
	private activeFilePath: string | null = null;

	private constructor(panel: vscode.WebviewPanel, private extensionUri: vscode.Uri, initialFilePath?: string) {
		this.panel = panel;
		this.activeFilePath = initialFilePath ?? vscode.window.activeTextEditor?.document.uri.fsPath ?? null;
		this.currentCases = [...PRESET_TEST_CASES["Sorting & Arrays"]];

		this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
		this.panel.webview.onDidReceiveMessage(
			async (message) => {
				switch (message.command) {
					case "runAll":
						await this.runAllTests();
						break;
					case "loadPreset":
						if (PRESET_TEST_CASES[message.preset]) {
							this.currentCases = JSON.parse(JSON.stringify(PRESET_TEST_CASES[message.preset]));
							this.updateWebview();
						}
						break;
					case "addCase":
						this.currentCases.push({
							id: `case-${Date.now()}`,
							name: `Test Case ${this.currentCases.length + 1}`,
							input: "",
							expectedOutput: "",
							status: "pending",
						});
						this.updateWebview();
						break;
					case "deleteCase":
						this.currentCases = this.currentCases.filter((c) => c.id !== message.id);
						this.updateWebview();
						break;
					case "updateCase":
						const target = this.currentCases.find((c) => c.id === message.id);
						if (target) {
							target.input = message.input;
							target.expectedOutput = message.expectedOutput;
						}
						break;
				}
			},
			null,
			this.disposables
		);

		this.updateWebview();
	}

	public static show(extensionUri: vscode.Uri, filePath?: string): TestRunnerPanel {
		const column = vscode.window.activeTextEditor ? vscode.ViewColumn.Beside : vscode.ViewColumn.One;

		if (TestRunnerPanel.currentPanel) {
			if (filePath) {
				TestRunnerPanel.currentPanel.activeFilePath = filePath;
			}
			TestRunnerPanel.currentPanel.panel.reveal(column);
			TestRunnerPanel.currentPanel.updateWebview();
			return TestRunnerPanel.currentPanel;
		}

		const panel = vscode.window.createWebviewPanel(
			"dtypTestRunner",
			"dTyp Test Sandbox",
			column,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
			}
		);

		TestRunnerPanel.currentPanel = new TestRunnerPanel(panel, extensionUri, filePath);
		return TestRunnerPanel.currentPanel;
	}

	private async runAllTests(): Promise<void> {
		const filePath = this.activeFilePath ?? vscode.window.activeTextEditor?.document.uri.fsPath;
		if (!filePath) {
			vscode.window.showWarningMessage("dTyp: Open a C/C++ file to run test cases against.");
			return;
		}

		const isCpp = filePath.endsWith(".cpp") || filePath.endsWith(".cc");
		this.panel.webview.postMessage({ command: "setRunning", isRunning: true });

		let binaryPath: string | null = null;
		try {
			binaryPath = await TestRunner.compile(filePath, isCpp);
		} catch (err: any) {
			vscode.window.showErrorMessage(`dTyp: Compilation failed: ${err.message}`);
			this.panel.webview.postMessage({ command: "setRunning", isRunning: false });
			return;
		}

		for (let i = 0; i < this.currentCases.length; i++) {
			this.currentCases[i].status = "pending";
		}
		this.updateWebview();

		let passedCount = 0;
		for (let i = 0; i < this.currentCases.length; i++) {
			const res = await TestRunner.executeTestCase(binaryPath, this.currentCases[i]);
			this.currentCases[i] = res;
			if (res.status === "passed") passedCount++;
			this.updateWebview();
		}

		TestRunner.cleanupBinary(binaryPath);
		this.panel.webview.postMessage({ command: "setRunning", isRunning: false });

		const allPassed = passedCount === this.currentCases.length;
		if (allPassed) {
			vscode.window.showInformationMessage(`dTyp: All ${passedCount}/${this.currentCases.length} test cases passed! ★`);
		} else {
			vscode.window.showWarningMessage(`dTyp: ${passedCount}/${this.currentCases.length} test cases passed.`);
		}
	}

	private updateWebview(): void {
		const fileName = this.activeFilePath ? path.basename(this.activeFilePath) : "No file active";
		const passedCount = this.currentCases.filter((c) => c.status === "passed").length;
		const totalCount = this.currentCases.length;

		this.panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>dTyp Multi-Test Sandbox</title>
	<style>
		body {
			background: #1e1e1e;
			color: #cccccc;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
			padding: 16px;
			margin: 0;
		}
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #333333;
			padding-bottom: 12px;
			margin-bottom: 16px;
		}
		.title { font-size: 1.25rem; font-weight: 600; color: #58a6ff; }
		.subtitle { font-size: 0.85rem; color: #888888; }
		.actions { display: flex; gap: 8px; align-items: center; }
		button {
			background: #238636;
			color: #ffffff;
			border: none;
			border-radius: 4px;
			padding: 6px 14px;
			font-weight: 600;
			cursor: pointer;
			display: inline-flex;
			align-items: center;
			gap: 6px;
		}
		button:hover { background: #2ea043; }
		button.secondary {
			background: #2d333b;
			color: #cdd9e5;
			border: 1px solid #444c56;
		}
		button.secondary:hover { background: #373e47; }
		button.danger {
			background: #da3633;
			padding: 4px 8px;
			font-size: 0.8rem;
		}
		select {
			background: #2d333b;
			color: #cdd9e5;
			border: 1px solid #444c56;
			border-radius: 4px;
			padding: 6px 10px;
		}
		.case-card {
			background: #252526;
			border: 1px solid #3c3c3c;
			border-radius: 6px;
			margin-bottom: 12px;
			padding: 12px;
		}
		.case-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 8px;
		}
		.badge {
			padding: 2px 8px;
			border-radius: 10px;
			font-size: 0.75rem;
			font-weight: 700;
			text-transform: uppercase;
		}
		.badge.passed { background: #238636; color: white; }
		.badge.failed { background: #da3633; color: white; }
		.badge.tle { background: #d29922; color: black; }
		.badge.pending { background: #444c56; color: white; }
		.badge.error { background: #f85149; color: white; }
		.grid {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 8px;
		}
		label { font-size: 0.75rem; color: #888888; display: block; margin-bottom: 4px; }
		textarea {
			width: 100%;
			box-sizing: border-box;
			background: #1e1e1e;
			color: #e6edf3;
			border: 1px solid #3c3c3c;
			border-radius: 4px;
			padding: 6px;
			font-family: monospace;
			font-size: 0.85rem;
			resize: vertical;
			min-height: 55px;
		}
		.duration { font-size: 0.8rem; color: #888888; }
	</style>
</head>
<body>
	<div class="header">
		<div>
			<div class="title">🧪 dTyp Multi-Test Sandbox</div>
			<div class="subtitle">Active File: <strong>${fileName}</strong> &bull; ${passedCount}/${totalCount} Passed</div>
		</div>
		<div class="actions">
			<select id="presetSelect" onchange="loadPreset(this.value)">
				<option value="">Load Preset Test Cases...</option>
				${Object.keys(PRESET_TEST_CASES).map((p) => `<option value="${p}">${p}</option>`).join("")}
			</select>
			<button class="secondary" onclick="addTestCase()">+ Add Case</button>
			<button id="runBtn" onclick="runAll()">▶ Run All Tests (Ctrl+F6)</button>
		</div>
	</div>

	<div id="casesList">
		${this.currentCases
			.map(
				(tc, idx) => `
			<div class="case-card">
				<div class="case-header">
					<div>
						<strong>#${idx + 1}: ${tc.name}</strong>
						${tc.durationMs !== undefined ? `<span class="duration">(${tc.durationMs}ms)</span>` : ""}
					</div>
					<div>
						<span class="badge ${tc.status || "pending"}">${tc.status || "ready"}</span>
						<button class="danger" onclick="deleteCase('${tc.id}')" style="margin-left:8px;">✕</button>
					</div>
				</div>
				<div class="grid">
					<div>
						<label>Standard Input (stdin):</label>
						<textarea onchange="updateCase('${tc.id}', this.value, null)">${tc.input || ""}</textarea>
					</div>
					<div>
						<label>Expected Output (stdout):</label>
						<textarea onchange="updateCase('${tc.id}', null, this.value)">${tc.expectedOutput || ""}</textarea>
					</div>
					<div>
						<label>Actual Output:</label>
						<textarea readonly style="color:${tc.status === "passed" ? "#3fb950" : tc.status === "failed" ? "#f85149" : "#8b949e"}">${tc.actualOutput || (tc.error ? tc.error : "-")}</textarea>
					</div>
				</div>
			</div>
		`
			)
			.join("")}
	</div>

	<script>
		const vscode = acquireVsCodeApi();

		function runAll() {
			document.getElementById("runBtn").innerText = "Running...";
			document.getElementById("runBtn").disabled = true;
			vscode.postMessage({ command: "runAll" });
		}

		function loadPreset(preset) {
			if (!preset) return;
			vscode.postMessage({ command: "loadPreset", preset });
		}

		function addTestCase() {
			vscode.postMessage({ command: "addCase" });
		}

		function deleteCase(id) {
			vscode.postMessage({ command: "deleteCase", id });
		}

		function updateCase(id, input, expectedOutput) {
			vscode.postMessage({ command: "updateCase", id, input, expectedOutput });
		}

		window.addEventListener("message", (event) => {
			const msg = event.data;
			if (msg.command === "setRunning") {
				const btn = document.getElementById("runBtn");
				if (msg.isRunning) {
					btn.innerText = "Running...";
					btn.disabled = true;
				} else {
					btn.innerText = "▶ Run All Tests (Ctrl+F6)";
					btn.disabled = false;
				}
			}
		});
	</script>
</body>
</html>`;
	}

	public dispose(): void {
		TestRunnerPanel.currentPanel = null;
		this.panel.dispose();
		while (this.disposables.length) {
			const d = this.disposables.pop();
			if (d) d.dispose();
		}
	}
}
