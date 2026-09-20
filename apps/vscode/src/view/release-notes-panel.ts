import * as vscode from "vscode";

export class ReleaseNotesPanel {
  public static currentPanel: ReleaseNotesPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  public static show(context: vscode.ExtensionContext, force = false): void {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (ReleaseNotesPanel.currentPanel) {
      ReleaseNotesPanel.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "dtyp.releaseNotes",
      "What's New in dTyp v4.0",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    ReleaseNotesPanel.currentPanel = new ReleaseNotesPanel(panel, context);
  }

  private constructor(panel: vscode.WebviewPanel, private readonly context: vscode.ExtensionContext) {
    this._panel = panel;
    this._panel.iconPath = vscode.Uri.joinPath(this.context.extensionUri, "images", "icon.png");
    this._panel.webview.html = this._getHtmlContent();

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case "browseLibrary":
            vscode.commands.executeCommand("dtyp.browseLibrary");
            break;
          case "openWalkthrough":
            vscode.commands.executeCommand(
              "workbench.action.openWalkthrough",
              "1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode#dtyp.gettingStarted"
            );
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
          case "openGitHub":
            vscode.env.openExternal(vscode.Uri.parse("https://github.com/mujahidalmahi/dTyp"));
            break;
          case "toggleShowOnUpdate":
            const config = vscode.workspace.getConfiguration("dtyp");
            await config.update("showReleaseNotesOnUpdate", message.value, vscode.ConfigurationTarget.Global);
            break;
        }
      },
      null,
      this._disposables
    );
  }

  public dispose(): void {
    ReleaseNotesPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) x.dispose();
    }
  }

  private _getHtmlContent(): string {
    const config = vscode.workspace.getConfiguration("dtyp");
    const showOnUpdate = config.get<boolean>("showReleaseNotesOnUpdate", true);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>What's New in dTyp v4.0</title>
  <style>
    :root {
      --bg: var(--vscode-editor-background);
      --fg: var(--vscode-editor-foreground);
      --card-bg: var(--vscode-editorWidget-background, #1e1e1e);
      --card-border: var(--vscode-widget-border, #333333);
      --accent: var(--vscode-button-background, #007acc);
      --accent-fg: var(--vscode-button-foreground, #ffffff);
      --accent-hover: var(--vscode-button-hoverBackground, #0062a3);
      --code-bg: var(--vscode-textCodeBlock-background, #2d2d2d);
      --muted: var(--vscode-descriptionForeground, #888888);
    }
    body {
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      background-color: var(--bg);
      color: var(--fg);
      margin: 0;
      padding: 32px 40px;
      line-height: 1.6;
      max-width: 960px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .brand-badge {
      background: var(--accent);
      color: var(--accent-fg);
      font-weight: 700;
      font-size: 20px;
      padding: 6px 14px;
      border-radius: 8px;
      font-family: monospace;
      letter-spacing: -0.5px;
    }
    .title-group h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .title-group p {
      margin: 4px 0 0;
      color: var(--muted);
      font-size: 13px;
    }
    .version-tag {
      background: rgba(0, 122, 204, 0.15);
      color: #388bfd;
      border: 1px solid rgba(56, 139, 253, 0.4);
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: border-color 0.2s ease, transform 0.15s ease;
    }
    .card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    .card-icon {
      font-size: 28px;
      margin-bottom: 12px;
      line-height: 1;
    }
    .card h3 {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 600;
      color: var(--fg);
    }
    .card p {
      margin: 0;
      font-size: 13px;
      color: var(--muted);
      line-height: 1.5;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin: 32px 0 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 32px;
      background: var(--card-bg);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--card-border);
    }
    th, td {
      padding: 12px 16px;
      text-align: left;
      font-size: 13px;
    }
    th {
      background: rgba(255, 255, 255, 0.04);
      color: var(--muted);
      font-weight: 600;
      border-bottom: 1px solid var(--card-border);
    }
    td {
      border-bottom: 1px solid var(--card-border);
    }
    tr:last-child td {
      border-bottom: none;
    }
    kbd {
      background: var(--code-bg);
      border: 1px solid var(--card-border);
      border-radius: 4px;
      padding: 2px 6px;
      font-family: monospace;
      font-size: 12px;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 32px;
    }
    button.btn-primary {
      background: var(--accent);
      color: var(--accent-fg);
      border: none;
      padding: 10px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.15s ease;
    }
    button.btn-primary:hover {
      background: var(--accent-hover);
    }
    button.btn-secondary {
      background: transparent;
      color: var(--fg);
      border: 1px solid var(--card-border);
      padding: 10px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.15s ease;
    }
    button.btn-secondary:hover {
      background: rgba(255, 255, 255, 0.05);
    }
    .footer {
      border-top: 1px solid var(--card-border);
      padding-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--muted);
      font-size: 12px;
    }
    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-badge">dTyp_</div>
      <div class="title-group">
        <h1>Welcome to dTyp v4.0</h1>
        <p>Offline Academic C Library &amp; World-Class Development Ecosystem</p>
      </div>
    </div>
    <span class="version-tag">v4.0.0 Flagship Release</span>
  </div>

  <div class="actions">
    <button class="btn-primary" onclick="sendMessage('browseLibrary')">
      <span>📚</span> Browse Library (665)
    </button>
    <button class="btn-secondary" onclick="sendMessage('openWalkthrough')">
      <span>🎓</span> Open Interactive Walkthrough
    </button>
    <button class="btn-secondary" onclick="sendMessage('openSettings')">
      <span>⚙️</span> Configure Settings
    </button>
    <button class="btn-secondary" onclick="sendMessage('healthCheck')">
      <span>🩺</span> Run Health Check
    </button>
    <button class="btn-secondary" onclick="sendMessage('openGitHub')">
      <span>⭐</span> GitHub Repository
    </button>
  </div>

  <div class="section-title">🌟 What's New in Version 4.0.0</div>

  <div class="grid">
    <div class="card">
      <div class="card-icon">🎛️</div>
      <h3>Unified Control Center &amp; Master Hub</h3>
      <p>A mission control cockpit bringing all 15 super-dimensions, live status gauges, interactive cheatsheet, and quick action controls into one unified dashboard.</p>
    </div>

    <div class="card">
      <div class="card-icon">🩺</div>
      <h3>Academic Code Doctor &amp; Pure Tab Formatter</h3>
      <p>Strict university indentation with pure tabs (<kbd>\t</kbd>), clean binary operator spacing, and AST auditing for missing returns, wild pointers, and dead code.</p>
    </div>

    <div class="card">
      <div class="card-icon">🏆</div>
      <h3>CP Contest Arena &amp; Stress Tester</h3>
      <p>Competition-ready boilerplate with <code>getchar_unlocked</code> fast I/O (~5x faster), 64MB bump arena allocator, and automated differential stress testing.</p>
    </div>

    <div class="card">
      <div class="card-icon">🌳</div>
      <h3>Live Recursion Tree Visualizer</h3>
      <p>Interactive SVG recursion tree with call stack frames, step scrubbers, and duplicate subproblem highlights for Fibonacci, Hanoi, MergeSort, and Trees.</p>
    </div>

    <div class="card">
      <div class="card-icon">🔬</div>
      <h3>Integrated Valgrind Deep Leak Profiler</h3>
      <p>Native Linux &amp; WSL Valgrind integration compiling with debug symbols to parse definitely/indirectly lost bytes and map allocation stack traces.</p>
    </div>

    <div class="card">
      <div class="card-icon">⚡</div>
      <h3>C Typing Speed Drill Arena ("TypeRacer for C")</h3>
      <p>Gamified drill arena with 5 classic C algorithmic challenges, real-time keystroke accuracy, WPM/CPM gauges, and high score tracking.</p>
    </div>

    <div class="card">
      <div class="card-icon">🦎</div>
      <h3>Chameleon Ghost-Typing Mode (Alt+C)</h3>
      <p>Press any physical key on your keyboard to advance the queued algorithm character-by-character with realistic cadence and zero machine artifacts.</p>
    </div>

    <div class="card">
      <div class="card-icon">🛡️</div>
      <h3>AddressSanitizer &amp; Undefined Behavior Guard</h3>
      <p>Compile with <code>-fsanitize=address,undefined</code> and translate cryptic ASan traces into plain-English student explanations and inline editor squiggles.</p>
    </div>

    <div class="card">
      <div class="card-icon">🧪</div>
      <h3>Multi-Test Case Sandbox Runner (Ctrl+F6)</h3>
      <p>Side-by-side stdin/stdout diff tester with timeout guard, pre-loaded algorithmic suites, and pass/fail/TLE status indicators.</p>
    </div>
  </div>

  <div class="section-title">⌨️ Essential Keyboard Shortcuts</div>

  <table>
    <thead>
      <tr>
        <th>Command</th>
        <th>Shortcut</th>
        <th>When / Context</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><b>Step Next Character</b> (Stealth Typing)</td>
        <td><kbd>Ctrl+Shift+D</kbd></td>
        <td>Editor has queued characters in Manual mode</td>
      </tr>
      <tr>
        <td><b>Pause / Resume Typing</b></td>
        <td><kbd>Alt+P</kbd></td>
        <td>While typing is active or queue is non-empty</td>
      </tr>
      <tr>
        <td><b>Renew Typing Queue</b></td>
        <td><kbd>Ctrl+Shift+R</kbd></td>
        <td>While typing is active or recent insertion exists</td>
      </tr>
      <tr>
        <td><b>Rewind Step (Undo Character)</b></td>
        <td><kbd>Ctrl+Shift+U</kbd></td>
        <td>Manual stepping mode with active queue</td>
      </tr>
      <tr>
        <td><b>Browse Offline Library</b></td>
        <td><kbd>Ctrl+Alt+D</kbd></td>
        <td>Anywhere in editor</td>
      </tr>
      <tr>
        <td><b>Cancel Typing / Clear Queue</b></td>
        <td><kbd>Escape</kbd></td>
        <td>While typing is active or queue is non-empty</td>
      </tr>
      <tr>
        <td><b>Quick Insert (Fuzzy)</b></td>
        <td><kbd>Ctrl+Shift+P</kbd> &rarr; <code>dTyp: Quick Insert</code></td>
        <td>Editor focus</td>
      </tr>
      <tr>
        <td><b>Insert Snippet with Tab Stops</b></td>
        <td>Type <code>dtyp.</code> or <kbd>Ctrl+Shift+P</kbd> &rarr; <code>dTyp: Insert Snippet</code></td>
        <td>C / C++ files</td>
      </tr>
      <tr>
        <td><b>Create Custom Component</b></td>
        <td><kbd>Ctrl+Shift+P</kbd> &rarr; <code>dTyp: Create Custom Component</code></td>
        <td>Opens Own Library form</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    <label class="checkbox-container">
      <input type="checkbox" id="showOnUpdateCheckbox" ${showOnUpdate ? "checked" : ""} onchange="toggleShowOnUpdate(this.checked)">
      <span>Show Release Notes automatically after updates</span>
    </label>
    <span>dTyp Ecosystem &bull; MIT License</span>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    function sendMessage(command) {
      vscode.postMessage({ command });
    }
    function toggleShowOnUpdate(value) {
      vscode.postMessage({ command: 'toggleShowOnUpdate', value });
    }
  </script>
</body>
</html>`;
  }
}
