import * as vscode from "vscode";

export interface DrillChallenge {
	id: string;
	title: string;
	category: string;
	difficulty: "Easy" | "Medium" | "Hard";
	code: string;
}

export const DRILL_CHALLENGES: DrillChallenge[] = [
	{
		id: "drill-1",
		title: "Pointer Swap Function",
		category: "Pointers & Memory",
		difficulty: "Easy",
		code: "void swap(int* a, int* b) {\n\tint temp = *a;\n\t*a = *b;\n\t*b = temp;\n}",
	},
	{
		id: "drill-2",
		title: "Safe Heap Allocation with NULL Check",
		category: "Memory Management",
		difficulty: "Easy",
		code: "int* arr = (int*)malloc(n * sizeof(int));\nif (arr == NULL) {\n\tperror(\"Allocation failed\");\n\treturn -1;\n}",
	},
	{
		id: "drill-3",
		title: "Singly Linked List Prepend",
		category: "Data Structures",
		difficulty: "Medium",
		code: "Node* n = (Node*)malloc(sizeof(Node));\nn->data = val;\nn->next = head;\nhead = n;",
	},
	{
		id: "drill-4",
		title: "Binary Search Middle Formula",
		category: "Algorithms",
		difficulty: "Medium",
		code: "while (low <= high) {\n\tint mid = low + (high - low) / 2;\n\tif (arr[mid] == target) return mid;\n\tif (arr[mid] < target) low = mid + 1;\n\telse high = mid - 1;\n}",
	},
	{
		id: "drill-5",
		title: "Struct Typedef with Pointer Member",
		category: "Types & Structs",
		difficulty: "Hard",
		code: "typedef struct GraphNode {\n\tint id;\n\tdouble weight;\n\tstruct GraphNode* next;\n} GraphNode;",
	},
];

export class TypingDrillPanel {
	public static currentPanel: TypingDrillPanel | null = null;
	private readonly panel: vscode.WebviewPanel;
	private disposables: vscode.Disposable[] = [];
	private currentChallengeIdx = 0;

	private constructor(panel: vscode.WebviewPanel, private extensionUri: vscode.Uri) {
		this.panel = panel;
		this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

		this.panel.webview.onDidReceiveMessage(
			(message) => {
				switch (message.command) {
					case "setChallenge":
						this.currentChallengeIdx = message.index;
						this.updateWebview();
						break;
					case "recordScore":
						vscode.window.showInformationMessage(
							`🏆 dTyp Speed Drill: Finished with ${message.wpm} WPM and ${message.accuracy}% Accuracy! ★`
						);
						break;
				}
			},
			null,
			this.disposables
		);

		this.updateWebview();
	}

	public static show(extensionUri: vscode.Uri): TypingDrillPanel {
		const column = vscode.window.activeTextEditor ? vscode.ViewColumn.Beside : vscode.ViewColumn.One;

		if (TypingDrillPanel.currentPanel) {
			TypingDrillPanel.currentPanel.panel.reveal(column);
			TypingDrillPanel.currentPanel.updateWebview();
			return TypingDrillPanel.currentPanel;
		}

		const panel = vscode.window.createWebviewPanel(
			"dtypTypingDrill",
			"dTyp C Typing Arena",
			column,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
			}
		);

		TypingDrillPanel.currentPanel = new TypingDrillPanel(panel, extensionUri);
		return TypingDrillPanel.currentPanel;
	}

	private updateWebview(): void {
		const challenge = DRILL_CHALLENGES[this.currentChallengeIdx];
		const escapedCode = JSON.stringify(challenge.code);

		this.panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>dTyp C Typing Arena</title>
	<style>
		body {
			background: #181a1f;
			color: #abb2bf;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
			padding: 20px;
			margin: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.container {
			max-width: 720px;
			width: 100%;
		}
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 16px;
			border-bottom: 1px solid #282c34;
			padding-bottom: 12px;
		}
		.title { font-size: 1.3rem; font-weight: 700; color: #61afef; display: flex; align-items: center; gap: 8px; }
		.tabs { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
		.tab-btn {
			background: #21252b;
			color: #abb2bf;
			border: 1px solid #3e4451;
			border-radius: 4px;
			padding: 4px 10px;
			font-size: 0.8rem;
			cursor: pointer;
		}
		.tab-btn.active {
			background: #61afef;
			color: #181a1f;
			font-weight: bold;
		}
		.stats-card {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 12px;
			margin-bottom: 16px;
		}
		.stat-box {
			background: #21252b;
			border: 1px solid #282c34;
			border-radius: 6px;
			padding: 10px;
			text-align: center;
		}
		.stat-val { font-size: 1.5rem; font-weight: 700; color: #98c379; }
		.stat-lbl { font-size: 0.75rem; color: #7f848e; text-transform: uppercase; }
		.code-display {
			background: #1e2227;
			border: 1px solid #3e4451;
			border-radius: 8px;
			padding: 16px;
			font-family: "Cascadia Code", Consolas, monospace;
			font-size: 0.95rem;
			line-height: 1.6;
			white-space: pre-wrap;
			min-height: 120px;
			margin-bottom: 16px;
			user-select: none;
		}
		.char-correct { color: #98c379; }
		.char-wrong { background: #e06c75; color: #ffffff; border-radius: 2px; }
		.char-pending { color: #5c6370; }
		.char-current { border-left: 2px solid #61afef; animation: blink 1s infinite; }
		@keyframes blink { 0%, 100% { border-color: #61afef; } 50% { border-color: transparent; } }
		textarea.typing-input {
			width: 100%;
			box-sizing: border-box;
			background: #21252b;
			color: #abb2bf;
			border: 2px solid #61afef;
			border-radius: 6px;
			padding: 12px;
			font-family: "Cascadia Code", Consolas, monospace;
			font-size: 0.95rem;
			resize: vertical;
			min-height: 80px;
			outline: none;
		}
		.result-banner {
			margin-top: 14px;
			background: rgba(152, 195, 121, 0.15);
			border: 1px solid #98c379;
			border-radius: 6px;
			padding: 12px;
			text-align: center;
			color: #98c379;
			font-weight: bold;
			display: none;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<div class="title">🏎️ dTyp C Typing Arena</div>
			<div style="font-size:0.85rem; color:#d19a66;">${challenge.title} (${challenge.difficulty})</div>
		</div>

		<div class="tabs">
			${DRILL_CHALLENGES.map(
				(c, idx) =>
					`<button class="tab-btn ${idx === this.currentChallengeIdx ? "active" : ""}" onclick="switchChallenge(${idx})">#${idx + 1}: ${c.title}</button>`
			).join("")}
		</div>

		<div class="stats-card">
			<div class="stat-box">
				<div class="stat-val" id="wpmVal">0</div>
				<div class="stat-lbl">Speed (WPM)</div>
			</div>
			<div class="stat-box">
				<div class="stat-val" id="cpmVal">0</div>
				<div class="stat-lbl">Chars / Min</div>
			</div>
			<div class="stat-box">
				<div class="stat-val" id="accVal">100%</div>
				<div class="stat-lbl">Accuracy</div>
			</div>
			<div class="stat-box">
				<div class="stat-val" id="timeVal">0s</div>
				<div class="stat-lbl">Elapsed Time</div>
			</div>
		</div>

		<div class="code-display" id="codeDisplay"></div>

		<textarea id="typingInput" class="typing-input" placeholder="Start typing the code above to test your tactile C muscle memory..." autofocus></textarea>

		<div id="resultBanner" class="result-banner">
			🎉 Challenge Complete! Excellent muscle memory!
		</div>
	</div>

	<script>
		const vscode = acquireVsCodeApi();
		const targetText = ${escapedCode};
		const displayEl = document.getElementById("codeDisplay");
		const inputEl = document.getElementById("typingInput");
		const resultBanner = document.getElementById("resultBanner");

		let startTime = null;
		let timerInterval = null;
		let totalKeystrokes = 0;
		let errorsCount = 0;
		let isCompleted = false;

		function renderDisplay(typed) {
			let html = "";
			for (let i = 0; i < targetText.length; i++) {
				const targetChar = targetText[i];
				const displayChar = targetChar === "\\n" ? "↵\\n" : targetChar === "\\t" ? "⇥\\t" : targetChar;

				if (i < typed.length) {
					if (typed[i] === targetChar) {
						html += '<span class="char-correct">' + escapeHtml(displayChar) + '</span>';
					} else {
						html += '<span class="char-wrong">' + escapeHtml(displayChar) + '</span>';
					}
				} else if (i === typed.length) {
					html += '<span class="char-current char-pending">' + escapeHtml(displayChar) + '</span>';
				} else {
					html += '<span class="char-pending">' + escapeHtml(displayChar) + '</span>';
				}
			}
			displayEl.innerHTML = html;
		}

		function escapeHtml(text) {
			return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}

		inputEl.addEventListener("input", (e) => {
			if (isCompleted) return;

			if (!startTime) {
				startTime = Date.now();
				timerInterval = setInterval(updateStats, 200);
			}

			totalKeystrokes++;
			const val = inputEl.value;
			renderDisplay(val);

			if (val === targetText) {
				clearInterval(timerInterval);
				isCompleted = true;
				resultBanner.style.display = "block";
				const elapsedMinutes = (Date.now() - startTime) / 60000;
				const wpm = Math.round((targetText.length / 5) / elapsedMinutes);
				const accuracy = Math.max(0, Math.round(((targetText.length - errorsCount) / totalKeystrokes) * 100));
				vscode.postMessage({ command: "recordScore", wpm, accuracy });
			}
		});

		function updateStats() {
			if (!startTime || isCompleted) return;
			const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
			document.getElementById("timeVal").innerText = elapsedSec + "s";

			const val = inputEl.value;
			let errors = 0;
			for (let i = 0; i < val.length; i++) {
				if (val[i] !== targetText[i]) errors++;
			}
			errorsCount = errors;

			const elapsedMinutes = (Date.now() - startTime) / 60000;
			if (elapsedMinutes > 0) {
				const wpm = Math.round((val.length / 5) / elapsedMinutes);
				const cpm = Math.round(val.length / elapsedMinutes);
				document.getElementById("wpmVal").innerText = wpm;
				document.getElementById("cpmVal").innerText = cpm;
			}

			if (totalKeystrokes > 0) {
				const acc = Math.max(0, Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100));
				document.getElementById("accVal").innerText = acc + "%";
			}
		}

		function switchChallenge(index) {
			vscode.postMessage({ command: "setChallenge", index });
		}

		// Initial display
		renderDisplay("");
	</script>
</body>
</html>`;
	}

	public dispose(): void {
		TypingDrillPanel.currentPanel = null;
		this.panel.dispose();
		while (this.disposables.length) {
			const d = this.disposables.pop();
			if (d) d.dispose();
		}
	}
}
