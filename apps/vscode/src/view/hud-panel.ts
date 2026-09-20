import * as vscode from "vscode";
import { AutoTypeEngine } from "../engine/auto-type-engine.js";
import { DefaultTypingEngine } from "@dtyp/typing-engine";

export class HudPanel {
	public static currentPanel: HudPanel | null = null;
	private readonly panel: vscode.WebviewPanel;
	private disposables: vscode.Disposable[] = [];

	private constructor(
		panel: vscode.WebviewPanel,
		private autoTypeEngine: AutoTypeEngine,
		private typingEngine: DefaultTypingEngine
	) {
		this.panel = panel;
		this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

		this.panel.webview.onDidReceiveMessage(
			async (message) => {
				switch (message.command) {
					case "step":
						await vscode.commands.executeCommand("dtyp.typeNextCharacter");
						this.syncState();
						break;
					case "rewind":
						await vscode.commands.executeCommand("dtyp.rewindStep");
						this.syncState();
						break;
					case "togglePause":
						await vscode.commands.executeCommand("dtyp.togglePauseTyping");
						this.syncState();
						break;
					case "toggleChameleon":
						await vscode.commands.executeCommand("dtyp.toggleChameleonMode");
						this.syncState();
						break;
					case "speedUp":
						await vscode.commands.executeCommand("dtyp.speedUpTyping");
						this.syncState();
						break;
					case "slowDown":
						await vscode.commands.executeCommand("dtyp.slowDownTyping");
						this.syncState();
						break;
					case "cancel":
						await vscode.commands.executeCommand("dtyp.cancelTyping");
						this.syncState();
						break;
				}
			},
			null,
			this.disposables
		);

		this.autoTypeEngine.onQueueChange(() => this.syncState());
		this.typingEngine.on("progress", () => this.syncState());
		this.typingEngine.on("complete", () => this.syncState());

		this.updateWebview();
	}

	public static show(autoTypeEngine: AutoTypeEngine, typingEngine: DefaultTypingEngine): HudPanel {
		if (HudPanel.currentPanel) {
			HudPanel.currentPanel.panel.reveal(vscode.ViewColumn.Beside);
			HudPanel.currentPanel.syncState();
			return HudPanel.currentPanel;
		}

		const panel = vscode.window.createWebviewPanel(
			"dtypSteppingHud",
			"dTyp HUD",
			vscode.ViewColumn.Beside,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
			}
		);

		HudPanel.currentPanel = new HudPanel(panel, autoTypeEngine, typingEngine);
		return HudPanel.currentPanel;
	}

	public syncState(): void {
		const q = this.autoTypeEngine.getActiveQueue();
		const isTyping = this.typingEngine.isTyping() || this.autoTypeEngine.isManualQueueActive();
		const isPaused = this.autoTypeEngine.isPaused();
		const isChameleon = this.autoTypeEngine.isChameleonActive();
		const speed = this.autoTypeEngine.getSpeedMultiplier();

		let total = 0;
		let current = 0;
		let compName = "Ready";

		if (q) {
			total = q.actions.length;
			current = q.currentIndex;
			compName = q.componentName;
		}

		this.panel.webview.postMessage({
			command: "stateUpdate",
			state: {
				isTyping,
				isPaused,
				isChameleon,
				speed,
				total,
				current,
				compName,
				remaining: total - current,
			},
		});
	}

	private updateWebview(): void {
		const config = vscode.workspace.getConfiguration("dtyp");
		const soundEnabledConfig = config.get<boolean>("soundFeedback", true);
		const switchProfileConfig = config.get<string>("switchProfile", "blue");

		this.panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>dTyp HUD</title>
	<style>
		body {
			background: #181a1f;
			color: #abb2bf;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
			padding: 12px;
			margin: 0;
			user-select: none;
		}
		.hud-container {
			background: #21252b;
			border: 1px solid #2c313a;
			border-radius: 8px;
			padding: 14px;
			box-shadow: 0 4px 12px rgba(0,0,0,0.4);
		}
		.hud-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12px;
		}
		.hud-title {
			font-weight: 700;
			color: #61afef;
			font-size: 0.95rem;
			display: flex;
			align-items: center;
			gap: 6px;
		}
		.badge {
			font-size: 0.7rem;
			padding: 2px 6px;
			border-radius: 4px;
			background: #282c34;
			border: 1px solid #3e4451;
		}
		.badge.chameleon {
			background: #98c379;
			color: #1e1e1e;
			font-weight: bold;
		}
		.progress-bar {
			background: #282c34;
			border-radius: 6px;
			height: 8px;
			overflow: hidden;
			margin-bottom: 8px;
		}
		.progress-fill {
			background: linear-gradient(90deg, #61afef, #98c379);
			height: 100%;
			width: 0%;
			transition: width 0.15s ease;
		}
		.stats-row {
			display: flex;
			justify-content: space-between;
			font-size: 0.8rem;
			color: #7f848e;
			margin-bottom: 14px;
		}
		.controls-grid {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 6px;
			margin-bottom: 12px;
		}
		button.hud-btn {
			background: #2c313a;
			color: #d19a66;
			border: 1px solid #3e4451;
			border-radius: 4px;
			padding: 8px 4px;
			font-size: 0.8rem;
			font-weight: 600;
			cursor: pointer;
			text-align: center;
		}
		button.hud-btn:hover { background: #353b45; }
		button.hud-btn.primary {
			background: #98c379;
			color: #1e1e1e;
			border: none;
		}
		button.hud-btn.primary:hover { background: #a6d189; }
		button.hud-btn.active {
			background: #e5c07b;
			color: #1e1e1e;
		}
		.audio-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 0.75rem;
			border-top: 1px solid #2c313a;
			padding-top: 8px;
		}
		select {
			background: #181a1f;
			color: #abb2bf;
			border: 1px solid #3e4451;
			border-radius: 4px;
			padding: 3px 6px;
			font-size: 0.75rem;
		}
	</style>
</head>
<body>
	<div class="hud-container">
		<div class="hud-header">
			<div class="hud-title">
				<span>⚡ dTyp Live Stepper</span>
				<span id="chameleonBadge" class="badge" style="display:none;">🦎 Chameleon Active</span>
			</div>
			<span id="speedBadge" class="badge">1.0x</span>
		</div>

		<div class="progress-bar">
			<div id="progressFill" class="progress-fill"></div>
		</div>

		<div class="stats-row">
			<span id="compName">No active queue</span>
			<span id="charCount">0 / 0 chars</span>
		</div>

		<div class="controls-grid">
			<button class="hud-btn" onclick="postCmd('rewind')">◀◀ Rewind</button>
			<button id="pauseBtn" class="hud-btn" onclick="postCmd('togglePause')">⏸ Pause</button>
			<button class="hud-btn primary" onclick="postCmd('step')">⏭ Step (Ctrl+D)</button>
			<button id="chamBtn" class="hud-btn" onclick="postCmd('toggleChameleon')">🦎 Chameleon</button>
			<button class="hud-btn" onclick="postCmd('slowDown')">🐌 Slow (-20%)</button>
			<button class="hud-btn" onclick="postCmd('speedUp')">⚡ Fast (+25%)</button>
			<button class="hud-btn" onclick="postCmd('cancel')" style="grid-column: span 2; color:#e06c75;">⏹ Stop (Esc)</button>
		</div>

		<div class="audio-bar">
			<label>
				<input type="checkbox" id="soundToggle" ${soundEnabledConfig ? "checked" : ""} onchange="toggleSound(this.checked)">
				<span>Audio Synthesizer</span>
			</label>
			<select id="switchProfile" onchange="setSwitchProfile(this.value)">
				<option value="blue" ${switchProfileConfig === "blue" ? "selected" : ""}>Cherry MX Blue (Clicky)</option>
				<option value="brown" ${switchProfileConfig === "brown" ? "selected" : ""}>Cherry MX Brown (Tactile)</option>
				<option value="thock" ${switchProfileConfig === "thock" ? "selected" : ""}>Gateron Black (Thock)</option>
				<option value="muted" ${switchProfileConfig === "muted" ? "selected" : ""}>Muted Linear</option>
			</select>
		</div>
	</div>

	<script>
		const vscode = acquireVsCodeApi();

		// WebAudio Mechanical Keyboard Synthesizer
		let audioCtx = null;
		let soundEnabled = ${soundEnabledConfig};
		let currentProfile = "${switchProfileConfig}";

		function initAudio() {
			if (!audioCtx) {
				audioCtx = new (window.AudioContext || window.webkitAudioContext)();
			}
		}

		function playKeySound() {
			if (!soundEnabled) return;
			try {
				initAudio();
				if (audioCtx.state === "suspended") audioCtx.resume();

				const t = audioCtx.currentTime;

				if (currentProfile === "blue") {
					// High frequency click burst + body resonance
					const osc = audioCtx.createOscillator();
					const gain = audioCtx.createGain();
					osc.type = "sine";
					osc.frequency.setValueAtTime(3200, t);
					osc.frequency.exponentialRampToValueAtTime(800, t + 0.025);
					gain.gain.setValueAtTime(0.18, t);
					gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
					osc.connect(gain);
					gain.connect(audioCtx.destination);
					osc.start(t);
					osc.stop(t + 0.035);
				} else if (currentProfile === "thock") {
					// Low pitched resonant thock
					const osc = audioCtx.createOscillator();
					const gain = audioCtx.createGain();
					osc.type = "sine";
					osc.frequency.setValueAtTime(140, t);
					osc.frequency.exponentialRampToValueAtTime(65, t + 0.06);
					gain.gain.setValueAtTime(0.3, t);
					gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
					osc.connect(gain);
					gain.connect(audioCtx.destination);
					osc.start(t);
					osc.stop(t + 0.08);
				} else if (currentProfile === "brown") {
					// Tactile bump pop
					const osc = audioCtx.createOscillator();
					const gain = audioCtx.createGain();
					osc.type = "triangle";
					osc.frequency.setValueAtTime(450, t);
					osc.frequency.exponentialRampToValueAtTime(180, t + 0.03);
					gain.gain.setValueAtTime(0.15, t);
					gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
					osc.connect(gain);
					gain.connect(audioCtx.destination);
					osc.start(t);
					osc.stop(t + 0.045);
				} else {
					// Muted
					const osc = audioCtx.createOscillator();
					const gain = audioCtx.createGain();
					osc.type = "sine";
					osc.frequency.setValueAtTime(200, t);
					gain.gain.setValueAtTime(0.05, t);
					gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
					osc.connect(gain);
					gain.connect(audioCtx.destination);
					osc.start(t);
					osc.stop(t + 0.025);
				}
			} catch (e) {}
		}

		function postCmd(command) {
			playKeySound();
			vscode.postMessage({ command });
		}

		function toggleSound(enabled) {
			soundEnabled = enabled;
		}

		function setSwitchProfile(profile) {
			currentProfile = profile;
			playKeySound();
		}

		window.addEventListener("message", (event) => {
			const msg = event.data;
			if (msg.command === "stateUpdate") {
				const s = msg.state;
				document.getElementById("compName").innerText = s.compName || "Ready";
				document.getElementById("charCount").innerText = s.total > 0 ? (s.current + " / " + s.total + " chars") : "0 / 0 chars";
				document.getElementById("speedBadge").innerText = s.speed + "x";

				const pct = s.total > 0 ? Math.round((s.current / s.total) * 100) : 0;
				document.getElementById("progressFill").style.width = pct + "%";

				const chamBadge = document.getElementById("chameleonBadge");
				chamBadge.style.display = s.isChameleon ? "inline-block" : "none";
				chamBadge.className = "badge chameleon";

				const chamBtn = document.getElementById("chamBtn");
				if (s.isChameleon) {
					chamBtn.classList.add("active");
				} else {
					chamBtn.classList.remove("active");
				}

				const pauseBtn = document.getElementById("pauseBtn");
				pauseBtn.innerText = s.isPaused ? "▶ Resume" : "⏸ Pause";

				playKeySound();
			}
		});
	</script>
</body>
</html>`;
	}

	public dispose(): void {
		HudPanel.currentPanel = null;
		this.panel.dispose();
		while (this.disposables.length) {
			const d = this.disposables.pop();
			if (d) d.dispose();
		}
	}
}
