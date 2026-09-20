import * as vscode from "vscode";
import { Component } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";

export class VisualizerPanel {
  public static currentPanel: VisualizerPanel | undefined;
  public static readonly viewType = "dtyp.visualizer";

  private readonly panel: vscode.WebviewPanel;
  private readonly extensionUri: vscode.Uri;
  private currentComponent: Component | null = null;
  private disposables: vscode.Disposable[] = [];
  private logger = defaultLogger.child("VisualizerPanel");

  public static show(
    extensionUri: vscode.Uri,
    component: Component,
    onInsert?: (compId: string) => void
  ): VisualizerPanel {
    const column = vscode.ViewColumn.Beside;

    if (VisualizerPanel.currentPanel) {
      VisualizerPanel.currentPanel.panel.reveal(column);
      VisualizerPanel.currentPanel.update(component);
      return VisualizerPanel.currentPanel;
    }

    const panel = vscode.window.createWebviewPanel(
      VisualizerPanel.viewType,
      `dTyp Visualizer: ${component.name}()`,
      column,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [extensionUri],
      }
    );

    VisualizerPanel.currentPanel = new VisualizerPanel(panel, extensionUri, component, onInsert);
    return VisualizerPanel.currentPanel;
  }

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    component: Component,
    private onInsert?: (compId: string) => void
  ) {
    this.panel = panel;
    this.extensionUri = extensionUri;
    this.currentComponent = component;

    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    this.panel.webview.onDidReceiveMessage(
      (message) => {
        if (message.command === "insert") {
          if (this.currentComponent) {
            this.onInsert?.(this.currentComponent.id);
            vscode.commands.executeCommand("dtyp.insertComponentById", this.currentComponent.id);
          }
        }
      },
      null,
      this.disposables
    );

    this.update(component);
  }

  public update(component: Component): void {
    this.currentComponent = component;
    this.panel.title = `Visualizer: ${component.name}()`;
    this.panel.webview.html = this.getHtmlForWebview(component);
  }

  public dispose(): void {
    VisualizerPanel.currentPanel = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) x.dispose();
    }
  }

  private getHtmlForWebview(comp: Component): string {
    const isLinkedList = /list|node|queue|stack/i.test(comp.name) || /list|queue|stack/i.test(comp.category);
    const isTree = /tree|bst|avl|heap|trie/i.test(comp.name) || /tree/i.test(comp.category);
    const isSort = /sort/i.test(comp.name) || /sort/i.test(comp.category);

    let diagramSvg = "";

    if (isTree) {
      diagramSvg = `
        <svg viewBox="0 0 500 240" class="diagram-svg">
          <!-- Root -->
          <circle cx="250" cy="40" r="22" class="node-circle" />
          <text x="250" y="45" class="node-text">Root</text>
          <text x="250" y="12" class="addr-text">0x1000</text>
          <!-- Branches -->
          <line x1="235" y1="58" x2="145" y2="105" class="branch-line" />
          <line x1="265" y1="58" x2="355" y2="105" class="branch-line" />
          <!-- Left Child -->
          <circle cx="135" cy="120" r="20" class="node-circle" />
          <text x="135" y="125" class="node-text">Left</text>
          <text x="135" y="93" class="addr-text">0x1020</text>
          <!-- Right Child -->
          <circle cx="365" cy="120" r="20" class="node-circle" />
          <text x="365" y="125" class="node-text">Right</text>
          <text x="365" y="93" class="addr-text">0x1040</text>
          <!-- Sub-branches -->
          <line x1="125" y1="138" x2="80" y2="182" class="branch-line" />
          <line x1="145" y1="138" x2="190" y2="182" class="branch-line" />
          <circle cx="70" cy="195" r="16" class="node-circle leaf" />
          <text x="70" y="200" class="node-text leaf-text">L.L</text>
          <circle cx="200" cy="195" r="16" class="node-circle leaf" />
          <text x="200" y="200" class="node-text leaf-text">L.R</text>
          <!-- Right sub-branches -->
          <line x1="355" y1="138" x2="310" y2="182" class="branch-line" />
          <line x1="375" y1="138" x2="420" y2="182" class="branch-line" />
          <circle cx="300" cy="195" r="16" class="node-circle leaf" />
          <text x="300" y="200" class="node-text leaf-text">R.L</text>
          <circle cx="430" cy="195" r="16" class="node-circle leaf" />
          <text x="430" y="200" class="node-text leaf-text">R.R</text>
        </svg>
      `;
    } else if (isSort) {
      diagramSvg = `
        <svg viewBox="0 0 520 180" class="diagram-svg">
          <text x="20" y="30" class="label-text">Array Elements & Partitioning Indices:</text>
          <!-- Array Cells -->
          <g transform="translate(30, 50)">
            <rect x="0" y="0" width="55" height="55" class="array-cell active" />
            <text x="27" y="35" class="cell-val">12</text>
            <text x="27" y="75" class="index-text">[0]</text>

            <rect x="65" y="0" width="55" height="55" class="array-cell" />
            <text x="92" y="35" class="cell-val">24</text>
            <text x="92" y="75" class="index-text">[1]</text>

            <rect x="130" y="0" width="55" height="55" class="array-cell pivot" />
            <text x="157" y="35" class="cell-val">37</text>
            <text x="157" y="75" class="index-text">[2] Pivot</text>

            <rect x="195" y="0" width="55" height="55" class="array-cell" />
            <text x="222" y="35" class="cell-val">49</text>
            <text x="222" y="75" class="index-text">[3]</text>

            <rect x="260" y="0" width="55" height="55" class="array-cell" />
            <text x="287" y="35" class="cell-val">68</text>
            <text x="287" y="75" class="index-text">[4]</text>

            <rect x="325" y="0" width="55" height="55" class="array-cell" />
            <text x="352" y="35" class="cell-val">91</text>
            <text x="352" y="75" class="index-text">[5]</text>
          </g>
          <text x="30" y="160" class="sub-text">In-place partition: elements &le; Pivot on left, elements &gt; Pivot on right.</text>
        </svg>
      `;
    } else {
      // Default: Linked List / Pointer Chain
      diagramSvg = `
        <svg viewBox="0 0 540 180" class="diagram-svg">
          <!-- HEAD pointer -->
          <text x="30" y="35" class="label-text">HEAD (0x2000)</text>
          <path d="M 60 45 L 60 85 L 85 85" class="pointer-arrow" marker-end="url(#arrow)" />
          
          <!-- Node 1 -->
          <g transform="translate(90, 60)">
            <rect x="0" y="0" width="60" height="50" class="node-box" />
            <rect x="60" y="0" width="30" height="50" class="node-ptr" />
            <text x="30" y="32" class="node-val">data</text>
            <circle cx="75" cy="25" r="4" class="ptr-bullet" />
            <text x="45" y="-8" class="addr-text">0x2000</text>
            <!-- arrow to node 2 -->
            <line x1="75" y1="25" x2="135" y2="25" class="pointer-line" marker-end="url(#arrow)" />
          </g>

          <!-- Node 2 -->
          <g transform="translate(230, 60)">
            <rect x="0" y="0" width="60" height="50" class="node-box" />
            <rect x="60" y="0" width="30" height="50" class="node-ptr" />
            <text x="30" y="32" class="node-val">data</text>
            <circle cx="75" cy="25" r="4" class="ptr-bullet" />
            <text x="45" y="-8" class="addr-text">0x2040</text>
            <!-- arrow to node 3 -->
            <line x1="75" y1="25" x2="135" y2="25" class="pointer-line" marker-end="url(#arrow)" />
          </g>

          <!-- Node 3 / Tail -->
          <g transform="translate(370, 60)">
            <rect x="0" y="0" width="60" height="50" class="node-box" />
            <rect x="60" y="0" width="30" height="50" class="node-ptr" />
            <text x="30" y="32" class="node-val">data</text>
            <text x="75" y="30" class="null-text">&empty;</text>
            <text x="45" y="-8" class="addr-text">0x2080</text>
          </g>

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#4ec9b0" />
            </marker>
          </defs>
        </svg>
      `;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>dTyp Visualizer</title>
  <style>
    body {
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      background-color: var(--vscode-editor-background);
      color: var(--vscode-editor-foreground);
      padding: 20px;
      line-height: 1.5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--vscode-panel-border);
      padding-bottom: 12px;
      margin-bottom: 18px;
    }
    .comp-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--vscode-symbolIcon-functionForeground, #dcdcaa);
      margin: 0;
    }
    .btn-insert {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      padding: 7px 14px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.85rem;
    }
    .btn-insert:hover {
      background: var(--vscode-button-hoverBackground);
    }
    .card {
      background: var(--vscode-editorWidget-background, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--vscode-widget-border, rgba(255, 255, 255, 0.1));
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .diagram-svg {
      width: 100%;
      height: 220px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      margin-top: 10px;
    }
    .node-circle { fill: #1e3a5f; stroke: #4ec9b0; stroke-width: 2.5; }
    .node-circle.leaf { fill: #1f3b34; stroke: #6a9955; stroke-width: 2; }
    .node-text { fill: #ffffff; font-size: 11px; text-anchor: middle; font-weight: 600; }
    .leaf-text { font-size: 10px; fill: #d4d4d4; }
    .branch-line { stroke: #569cd6; stroke-width: 2; stroke-linecap: round; }
    .addr-text { fill: #808080; font-size: 9px; text-anchor: middle; font-family: monospace; }
    .label-text { fill: #4ec9b0; font-size: 12px; font-weight: 600; }
    .sub-text { fill: #858585; font-size: 11px; }
    .pointer-arrow, .pointer-line { stroke: #4ec9b0; stroke-width: 2; fill: none; }
    .node-box { fill: #252526; stroke: #569cd6; stroke-width: 2; }
    .node-ptr { fill: #1e293b; stroke: #569cd6; stroke-width: 2; }
    .node-val { fill: #9cdcfe; font-size: 12px; text-anchor: middle; font-family: monospace; }
    .ptr-bullet { fill: #4ec9b0; }
    .null-text { fill: #f48771; font-size: 14px; text-anchor: middle; font-weight: bold; }
    .array-cell { fill: #2d2d30; stroke: #3e3e42; stroke-width: 2; }
    .array-cell.active { fill: #0e639c; stroke: #1177bb; }
    .array-cell.pivot { fill: #6a9955; stroke: #89d185; }
    .cell-val { fill: #ffffff; font-size: 16px; text-anchor: middle; font-weight: bold; font-family: monospace; }
    .index-text { fill: #808080; font-size: 11px; text-anchor: middle; font-family: monospace; }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }
    .meta-item {
      background: rgba(0, 0, 0, 0.15);
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 0.85rem;
    }
    .meta-label { color: #808080; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 2px; }
    .meta-val { font-weight: 600; color: #4ec9b0; font-family: monospace; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h2 class="comp-title">${comp.name}()</h2>
      <div style="font-size: 0.85rem; color: #808080; margin-top: 4px;">${comp.description}</div>
    </div>
    <button class="btn-insert" onclick="insertCode()">Auto-Type Component</button>
  </div>

  <div class="card">
    <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 6px;">Memory & Pointer Architecture</div>
    <div style="font-size: 0.8rem; color: #858585;">Real-time layout of pointers, links, and heap memory allocations.</div>
    ${diagramSvg}
  </div>

  <div class="card">
    <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 6px;">Complexity & Academic Profile</div>
    <div class="meta-grid">
      <div class="meta-item">
        <div class="meta-label">Time Complexity</div>
        <div class="meta-val">${comp.complexity.time}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Space Complexity</div>
        <div class="meta-val">${comp.complexity.space}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Category</div>
        <div class="meta-val" style="color: #9cdcfe;">${comp.category}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Subcategory</div>
        <div class="meta-val" style="color: #ce9178;">${comp.subcategory || "Standard"}</div>
      </div>
    </div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    function insertCode() {
      vscode.postMessage({ command: 'insert' });
    }
  </script>
</body>
</html>`;
  }
}
