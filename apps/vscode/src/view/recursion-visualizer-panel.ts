import * as vscode from "vscode";

export interface RecursionNode {
	id: string;
	label: string;
	x: number;
	y: number;
	parentId?: string;
	state: "active" | "completed" | "pending";
	returnValue?: string;
}

export interface RecursionStep {
	stepIndex: number;
	activeNodeId: string;
	callStack: string[];
	description: string;
	nodes: RecursionNode[];
}

export interface RecursionAlgorithmPreset {
	name: string;
	description: string;
	timeComplexity: string;
	spaceComplexity: string;
	steps: RecursionStep[];
}

export const RECURSION_PRESETS: Record<string, RecursionAlgorithmPreset> = {
	"Fibonacci (N = 4)": {
		name: "Fibonacci Recursion Tree: fib(4)",
		description:
			"Demonstrates naive exponential O(2^N) recursion and shows why memoization/DP is essential by highlighting duplicate subproblems.",
		timeComplexity: "O(2^N) Naive / O(N) DP",
		spaceComplexity: "O(N) Call Stack Depth",
		steps: [
			{
				stepIndex: 1,
				activeNodeId: "f4",
				callStack: ["fib(4)"],
				description: "Initial call: fib(4) invoked. Evaluates fib(3) + fib(2).",
				nodes: [
					{ id: "f4", label: "fib(4)", x: 300, y: 40, state: "active" },
				],
			},
			{
				stepIndex: 2,
				activeNodeId: "f3",
				callStack: ["fib(4)", "fib(3)"],
				description: "fib(4) calls left child fib(3). Pushes fib(3) onto the call stack.",
				nodes: [
					{ id: "f4", label: "fib(4)", x: 300, y: 40, state: "active" },
					{ id: "f3", label: "fib(3)", x: 170, y: 110, parentId: "f4", state: "active" },
				],
			},
			{
				stepIndex: 3,
				activeNodeId: "f2_left",
				callStack: ["fib(4)", "fib(3)", "fib(2)"],
				description: "fib(3) calls left child fib(2).",
				nodes: [
					{ id: "f4", label: "fib(4)", x: 300, y: 40, state: "active" },
					{ id: "f3", label: "fib(3)", x: 170, y: 110, parentId: "f4", state: "active" },
					{ id: "f2_left", label: "fib(2)", x: 100, y: 180, parentId: "f3", state: "active" },
				],
			},
			{
				stepIndex: 4,
				activeNodeId: "f1_left",
				callStack: ["fib(4)", "fib(3)", "fib(2)", "fib(1)"],
				description: "fib(2) calls fib(1). Base case reached! Returns 1.",
				nodes: [
					{ id: "f4", label: "fib(4)", x: 300, y: 40, state: "active" },
					{ id: "f3", label: "fib(3)", x: 170, y: 110, parentId: "f4", state: "active" },
					{ id: "f2_left", label: "fib(2)", x: 100, y: 180, parentId: "f3", state: "active" },
					{ id: "f1_left", label: "fib(1)", x: 60, y: 250, parentId: "f2_left", state: "completed", returnValue: "1" },
				],
			},
			{
				stepIndex: 5,
				activeNodeId: "f0_left",
				callStack: ["fib(4)", "fib(3)", "fib(2)", "fib(0)"],
				description: "fib(2) calls fib(0). Base case reached! Returns 0.",
				nodes: [
					{ id: "f4", label: "fib(4)", x: 300, y: 40, state: "active" },
					{ id: "f3", label: "fib(3)", x: 170, y: 110, parentId: "f4", state: "active" },
					{ id: "f2_left", label: "fib(2)", x: 100, y: 180, parentId: "f3", state: "completed", returnValue: "1" },
					{ id: "f1_left", label: "fib(1)", x: 60, y: 250, parentId: "f2_left", state: "completed", returnValue: "1" },
					{ id: "f0_left", label: "fib(0)", x: 130, y: 250, parentId: "f2_left", state: "completed", returnValue: "0" },
				],
			},
			{
				stepIndex: 6,
				activeNodeId: "f1_mid",
				callStack: ["fib(4)", "fib(3)", "fib(1)"],
				description: "fib(3) calls right child fib(1). Base case returns 1. Therefore fib(3) = 1 + 1 = 2.",
				nodes: [
					{ id: "f4", label: "fib(4)", x: 300, y: 40, state: "active" },
					{ id: "f3", label: "fib(3)", x: 170, y: 110, parentId: "f4", state: "completed", returnValue: "2" },
					{ id: "f2_left", label: "fib(2)", x: 100, y: 180, parentId: "f3", state: "completed", returnValue: "1" },
					{ id: "f1_left", label: "fib(1)", x: 60, y: 250, parentId: "f2_left", state: "completed", returnValue: "1" },
					{ id: "f0_left", label: "fib(0)", x: 130, y: 250, parentId: "f2_left", state: "completed", returnValue: "0" },
					{ id: "f1_mid", label: "fib(1)", x: 220, y: 180, parentId: "f3", state: "completed", returnValue: "1" },
				],
			},
			{
				stepIndex: 7,
				activeNodeId: "f2_right",
				callStack: ["fib(4)", "fib(2)"],
				description: "fib(4) calls right child fib(2). Notice this is an exact DUPLICATE subproblem of the left fib(2)!",
				nodes: [
					{ id: "f4", label: "fib(4)", x: 300, y: 40, state: "active" },
					{ id: "f3", label: "fib(3)", x: 170, y: 110, parentId: "f4", state: "completed", returnValue: "2" },
					{ id: "f2_left", label: "fib(2)", x: 100, y: 180, parentId: "f3", state: "completed", returnValue: "1" },
					{ id: "f1_left", label: "fib(1)", x: 60, y: 250, parentId: "f2_left", state: "completed", returnValue: "1" },
					{ id: "f0_left", label: "fib(0)", x: 130, y: 250, parentId: "f2_left", state: "completed", returnValue: "0" },
					{ id: "f1_mid", label: "fib(1)", x: 220, y: 180, parentId: "f3", state: "completed", returnValue: "1" },
					{ id: "f2_right", label: "fib(2) [DUPLICATE]", x: 420, y: 110, parentId: "f4", state: "completed", returnValue: "1" },
				],
			},
			{
				stepIndex: 8,
				activeNodeId: "f4",
				callStack: ["fib(4)"],
				description: "fib(4) resolves left (2) + right (1) = 3! Final result returned: 3.",
				nodes: [
					{ id: "f4", label: "fib(4) = 3", x: 300, y: 40, state: "completed", returnValue: "3" },
					{ id: "f3", label: "fib(3)", x: 170, y: 110, parentId: "f4", state: "completed", returnValue: "2" },
					{ id: "f2_left", label: "fib(2)", x: 100, y: 180, parentId: "f3", state: "completed", returnValue: "1" },
					{ id: "f1_left", label: "fib(1)", x: 60, y: 250, parentId: "f2_left", state: "completed", returnValue: "1" },
					{ id: "f0_left", label: "fib(0)", x: 130, y: 250, parentId: "f2_left", state: "completed", returnValue: "0" },
					{ id: "f1_mid", label: "fib(1)", x: 220, y: 180, parentId: "f3", state: "completed", returnValue: "1" },
					{ id: "f2_right", label: "fib(2) [DUPLICATE]", x: 420, y: 110, parentId: "f4", state: "completed", returnValue: "1" },
				],
			},
		],
	},
};

export class RecursionVisualizerPanel {
	public static currentPanel: RecursionVisualizerPanel | null = null;
	private readonly panel: vscode.WebviewPanel;
	private disposables: vscode.Disposable[] = [];
	private currentPresetName = "Fibonacci (N = 4)";
	private currentStepIdx = 0;

	private constructor(panel: vscode.WebviewPanel, private extensionUri: vscode.Uri) {
		this.panel = panel;
		this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

		this.panel.webview.onDidReceiveMessage(
			(message) => {
				switch (message.command) {
					case "next":
						this.step(1);
						break;
					case "prev":
						this.step(-1);
						break;
					case "reset":
						this.currentStepIdx = 0;
						this.updateWebview();
						break;
					case "setPreset":
						if (RECURSION_PRESETS[message.preset]) {
							this.currentPresetName = message.preset;
							this.currentStepIdx = 0;
							this.updateWebview();
						}
						break;
				}
			},
			null,
			this.disposables
		);

		this.updateWebview();
	}

	public static show(extensionUri: vscode.Uri): RecursionVisualizerPanel {
		const column = vscode.window.activeTextEditor ? vscode.ViewColumn.Beside : vscode.ViewColumn.One;

		if (RecursionVisualizerPanel.currentPanel) {
			RecursionVisualizerPanel.currentPanel.panel.reveal(column);
			RecursionVisualizerPanel.currentPanel.updateWebview();
			return RecursionVisualizerPanel.currentPanel;
		}

		const panel = vscode.window.createWebviewPanel(
			"dtypRecursionVisualizer",
			"dTyp Recursion Tree",
			column,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
			}
		);

		RecursionVisualizerPanel.currentPanel = new RecursionVisualizerPanel(panel, extensionUri);
		return RecursionVisualizerPanel.currentPanel;
	}

	private step(delta: number): void {
		const preset = RECURSION_PRESETS[this.currentPresetName];
		if (!preset) return;
		this.currentStepIdx = Math.max(0, Math.min(preset.steps.length - 1, this.currentStepIdx + delta));
		this.updateWebview();
	}

	private updateWebview(): void {
		const preset = RECURSION_PRESETS[this.currentPresetName];
		const currentStep = preset.steps[this.currentStepIdx];

		// Render SVG lines connecting child to parent
		const lines: string[] = [];
		for (const node of currentStep.nodes) {
			if (node.parentId) {
				const parent = currentStep.nodes.find((n) => n.id === node.parentId);
				if (parent) {
					lines.push(`
						<line x1="${parent.x}" y1="${parent.y + 15}" x2="${node.x}" y2="${node.y - 15}" stroke="#444c56" stroke-width="2" stroke-dasharray="4 2"/>
					`);
				}
			}
		}

		// Render SVG nodes
		const nodesSvg = currentStep.nodes
			.map((node) => {
				const isCurrent = node.id === currentStep.activeNodeId;
				let fill = "#21262d";
				let stroke = "#30363d";
				let textColor = "#c9d1d9";

				if (isCurrent) {
					fill = "#d29922";
					stroke = "#f0883e";
					textColor = "#181a1f";
				} else if (node.state === "completed") {
					fill = "#238636";
					stroke = "#3fb950";
					textColor = "#ffffff";
				}

				return `
					<g transform="translate(${node.x}, ${node.y})">
						<rect x="-65" y="-18" width="130" height="36" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
						<text x="0" y="4" font-size="11" font-weight="bold" fill="${textColor}" text-anchor="middle">${node.label}</text>
						${
							node.returnValue
								? `<text x="0" y="30" font-size="10" font-weight="bold" fill="#7ee787" text-anchor="middle">ret: ${node.returnValue}</text>`
								: ""
						}
					</g>
				`;
			})
			.join("\n");

		this.panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Recursion Tree Visualizer</title>
	<style>
		body {
			background: #181a1f;
			color: #abb2bf;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
			padding: 16px;
			margin: 0;
			user-select: none;
		}
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #282c34;
			padding-bottom: 10px;
			margin-bottom: 12px;
		}
		.title { font-size: 1.15rem; font-weight: 700; color: #61afef; }
		.sub { font-size: 0.8rem; color: #7f848e; }
		.layout-grid {
			display: grid;
			grid-template-columns: 1fr 220px;
			gap: 12px;
		}
		.tree-card {
			background: #21252b;
			border: 1px solid #282c34;
			border-radius: 8px;
			padding: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.side-panel {
			background: #21252b;
			border: 1px solid #282c34;
			border-radius: 8px;
			padding: 12px;
			display: flex;
			flex-direction: column;
			gap: 12px;
		}
		.stack-box {
			background: #181a1f;
			border: 1px solid #282c34;
			border-radius: 6px;
			padding: 8px;
			min-height: 120px;
			display: flex;
			flex-direction: column-reverse;
			gap: 4px;
		}
		.stack-frame {
			background: #3e4451;
			color: #e5c07b;
			border-radius: 4px;
			padding: 4px 8px;
			font-family: monospace;
			font-size: 0.8rem;
			text-align: center;
			animation: slideIn 0.2s ease;
		}
		.stack-frame.top {
			background: #d19a66;
			color: #1e1e1e;
			font-weight: bold;
		}
		.explanation-card {
			background: rgba(97, 175, 239, 0.1);
			border-left: 3px solid #61afef;
			border-radius: 0 4px 4px 0;
			padding: 8px 12px;
			font-size: 0.85rem;
			line-height: 1.4;
			color: #dcdfe4;
			width: 100%;
			box-sizing: border-box;
			margin-top: 10px;
		}
		.controls {
			display: flex;
			gap: 8px;
			margin-top: 12px;
		}
		button {
			background: #2c313a;
			color: #abb2bf;
			border: 1px solid #3e4451;
			border-radius: 4px;
			padding: 6px 14px;
			font-size: 0.8rem;
			font-weight: 600;
			cursor: pointer;
		}
		button:hover { background: #353b45; }
		button.primary {
			background: #98c379;
			color: #1e1e1e;
			border: none;
		}
		button.primary:hover { background: #a6d189; }
	</style>
</head>
<body>
	<div class="header">
		<div>
			<div class="title">🌿 dTyp Live Recursion Tree</div>
			<div class="sub">${preset.name} &bull; Time: <strong>${preset.timeComplexity}</strong> &bull; Space: <strong>${preset.spaceComplexity}</strong></div>
		</div>
		<div>
			<button onclick="reset()">Reset</button>
		</div>
	</div>

	<div class="layout-grid">
		<div class="tree-card">
			<svg width="600" height="320" viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
				${lines.join("\n")}
				${nodesSvg}
			</svg>

			<div class="explanation-card">
				<strong>Step ${currentStep.stepIndex} of ${preset.steps.length}:</strong> ${currentStep.description}
			</div>

			<div class="controls">
				<button onclick="prev()" ${this.currentStepIdx === 0 ? "disabled" : ""}>◀ Previous</button>
				<button class="primary" onclick="next()" ${this.currentStepIdx === preset.steps.length - 1 ? "disabled" : ""}>Next Step ▶</button>
			</div>
		</div>

		<div class="side-panel">
			<div>
				<label style="font-size:0.75rem; color:#7f848e; font-weight:bold;">CALL STACK (DEPTH: ${currentStep.callStack.length})</label>
				<div class="stack-box">
					${currentStep.callStack
						.map(
							(frame, idx) =>
								`<div class="stack-frame ${idx === currentStep.callStack.length - 1 ? "top" : ""}">${frame}</div>`
						)
						.join("")}
				</div>
			</div>

			<div style="font-size:0.8rem; color:#7f848e; line-height:1.4;">
				<div><strong>Legend:</strong></div>
				<div style="color:#d29922;">● Active Call Frame</div>
				<div style="color:#238636;">● Base Case / Returned</div>
			</div>
		</div>
	</div>

	<script>
		const vscode = acquireVsCodeApi();

		function next() {
			vscode.postMessage({ command: "next" });
		}
		function prev() {
			vscode.postMessage({ command: "prev" });
		}
		function reset() {
			vscode.postMessage({ command: "reset" });
		}
	</script>
</body>
</html>`;
	}

	public dispose(): void {
		RecursionVisualizerPanel.currentPanel = null;
		this.panel.dispose();
		while (this.disposables.length) {
			const d = this.disposables.pop();
			if (d) d.dispose();
		}
	}
}
