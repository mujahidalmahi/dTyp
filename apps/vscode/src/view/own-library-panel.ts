import * as vscode from "vscode";
import { OwnLibraryStorage, OwnComponent, OwnComponentInput } from "../engine/own-library-storage.js";

export class OwnLibraryPanel {
  public static currentPanel: OwnLibraryPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private editComponentId: string | undefined;
  private targetDocUri?: vscode.Uri;
  private targetViewColumn?: vscode.ViewColumn;

  public static show(
    context: vscode.ExtensionContext,
    storage: OwnLibraryStorage,
    editComponentId?: string,
    onSaved?: (comp: OwnComponent, autoInsert: boolean) => void
  ): void {
    const activeEditor = vscode.window.activeTextEditor;
    const column = activeEditor ? activeEditor.viewColumn : undefined;
    const targetDocUri = activeEditor ? activeEditor.document.uri : undefined;

    if (OwnLibraryPanel.currentPanel) {
      OwnLibraryPanel.currentPanel.editComponentId = editComponentId;
      if (targetDocUri) {
        OwnLibraryPanel.currentPanel.targetDocUri = targetDocUri;
        OwnLibraryPanel.currentPanel.targetViewColumn = column;
      }
      OwnLibraryPanel.currentPanel._panel.reveal(column);
      OwnLibraryPanel.currentPanel.updateHtml();
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "dtyp.ownLibraryPanel",
      editComponentId ? "dTyp: Edit Custom Component" : "dTyp: Create Custom Component",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    OwnLibraryPanel.currentPanel = new OwnLibraryPanel(
      panel,
      context,
      storage,
      editComponentId,
      onSaved,
      targetDocUri,
      column
    );
  }

  private constructor(
    panel: vscode.WebviewPanel,
    private readonly context: vscode.ExtensionContext,
    private readonly storage: OwnLibraryStorage,
    editComponentId?: string,
    private readonly onSaved?: (comp: OwnComponent, autoInsert: boolean) => void,
    targetDocUri?: vscode.Uri,
    targetViewColumn?: vscode.ViewColumn
  ) {
    this._panel = panel;
    this.editComponentId = editComponentId;
    this.targetDocUri = targetDocUri;
    this.targetViewColumn = targetViewColumn;
    this._panel.iconPath = vscode.Uri.joinPath(this.context.extensionUri, "images", "icon.png");
    this.updateHtml();

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case "save":
            await this.handleSave(message.data, false);
            break;
          case "saveAndInsert":
            await this.handleSave(message.data, true);
            break;
          case "cancel":
            this.dispose();
            break;
        }
      },
      null,
      this._disposables
    );
  }

  private async handleSave(data: OwnComponentInput & { id?: string }, autoInsert: boolean): Promise<void> {
    if (!data.code || !data.code.trim()) {
      vscode.window.showErrorMessage("dTyp: Code content is required to create a library component.");
      this._panel.webview.postMessage({ command: "error", message: "Code content is required." });
      return;
    }

    try {
      let savedComp: OwnComponent;
      if (this.editComponentId) {
        const updated = await this.storage.update(this.editComponentId, data);
        if (!updated) {
          throw new Error("Component not found for update.");
        }
        savedComp = updated;
        vscode.window.showInformationMessage(`dTyp: Updated "${savedComp.name}" in Own Library!`);
      } else {
        savedComp = await this.storage.create(data);
        vscode.window.showInformationMessage(`dTyp: Saved "${savedComp.name}" to Own Library!`);
      }

      this._panel.webview.postMessage({ command: "saved", component: savedComp });

      if (autoInsert && this.targetDocUri) {
        try {
          const doc = await vscode.workspace.openTextDocument(this.targetDocUri);
          await vscode.window.showTextDocument(doc, this.targetViewColumn || vscode.ViewColumn.One);
        } catch {
          // ignore
        }
      }

      this.dispose();

      if (this.onSaved) {
        this.onSaved(savedComp, autoInsert);
      }
    } catch (err: any) {
      vscode.window.showErrorMessage(`dTyp Save Error: ${err.message}`);
      this._panel.webview.postMessage({ command: "error", message: err.message });
    }
  }

  private updateHtml(): void {
    const existing = this.editComponentId ? this.storage.getById(this.editComponentId) : undefined;
    const subDomains = this.storage.getSubDomains();
    const topics = this.storage.getTopics();
    const subTopics = this.storage.getSubTopics();
    this._panel.title = existing ? `dTyp: Edit "${existing.name}"` : "dTyp: Create Custom Component";
    this._panel.webview.html = this.getHtmlContent(existing, subDomains, topics, subTopics);
  }

  public dispose(): void {
    OwnLibraryPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) x.dispose();
    }
  }

  private getHtmlContent(
    existing?: OwnComponent,
    subDomains: string[] = [],
    topics: string[] = [],
    subTopics: string[] = []
  ): string {
    const subDomainOptions = subDomains.map((d) => `<option value="${this.escapeAttr(d)}">`).join("");
    const topicOptions = topics.map((t) => `<option value="${this.escapeAttr(t)}">`).join("");
    const subTopicOptions = subTopics.map((t) => `<option value="${this.escapeAttr(t)}">`).join("");

    const isEdit = !!existing;
    const initialSubDomain = existing ? existing.subDomain : "";
    const initialTopic = existing ? (existing.topic || "") : "";
    const initialSubTopic = existing ? existing.subTopic : "";
    const initialName = existing ? existing.name : "";
    const initialType = existing ? existing.type : "snippet";
    const initialSignature = existing ? existing.signature : "";
    const initialDescription = existing ? existing.description : "";
    const initialTags = existing ? existing.tags.join(", ") : "";
    const initialAliases = existing ? existing.aliases.join(", ") : "";
    const initialCode = existing ? existing.code : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isEdit ? "Edit Custom Component" : "Create Custom Component"}</title>
  <style>
    :root {
      --bg: var(--vscode-editor-background);
      --fg: var(--vscode-editor-foreground);
      --input-bg: var(--vscode-input-background);
      --input-fg: var(--vscode-input-foreground);
      --input-border: var(--vscode-input-border, #3c3c3c);
      --btn-bg: var(--vscode-button-background);
      --btn-fg: var(--vscode-button-foreground);
      --btn-hover: var(--vscode-button-hoverBackground);
      --btn-sec-bg: var(--vscode-button-secondaryBackground, #3a3d41);
      --btn-sec-fg: var(--vscode-button-secondaryForeground, #ffffff);
      --badge-bg: var(--vscode-badge-background, #4d4d4d);
      --badge-fg: var(--vscode-badge-foreground, #ffffff);
      --focus-border: var(--vscode-focusBorder);
      --font-mono: var(--vscode-editor-font-family, Consolas, "Courier New", monospace);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg);
      color: var(--fg);
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
      padding: 24px 32px;
      line-height: 1.5;
    }
    .container {
      max-width: 860px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--vscode-panel-border, #3c3c3c);
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .title {
      font-size: 1.4rem;
      font-weight: 600;
    }
    .domain-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--badge-bg);
      color: var(--badge-fg);
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 14px;
    }
    .form-group.full-width {
      grid-column: 1 / -1;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--fg);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .optional-hint {
      font-size: 0.75rem;
      font-weight: normal;
      opacity: 0.65;
    }
    .required-star {
      color: var(--vscode-errorForeground, #f48771);
      font-weight: bold;
    }
    input[type="text"], select, textarea {
      background: var(--input-bg);
      color: var(--input-fg);
      border: 1px solid var(--input-border);
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 0.9rem;
      outline: none;
      font-family: inherit;
      transition: border-color 0.15s ease;
    }
    input[type="text"]:focus, select:focus, textarea:focus {
      border-color: var(--focus-border);
    }
    textarea#code {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      height: 280px;
      resize: vertical;
      line-height: 1.45;
      tab-size: 4;
      white-space: pre;
    }
    .code-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      opacity: 0.7;
      margin-top: 4px;
    }
    .actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid var(--vscode-panel-border, #3c3c3c);
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 9px 18px;
      font-size: 0.9rem;
      font-weight: 500;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    button.primary {
      background-color: var(--btn-bg);
      color: var(--btn-fg);
    }
    button.primary:hover {
      background-color: var(--btn-hover);
    }
    button.secondary {
      background-color: var(--btn-sec-bg);
      color: var(--btn-sec-fg);
    }
    button.secondary:hover {
      opacity: 0.85;
    }
    .error-banner {
      display: none;
      background-color: var(--vscode-inputValidation-errorBackground, rgba(255, 0, 0, 0.15));
      border: 1px solid var(--vscode-inputValidation-errorBorder, #f48771);
      color: var(--vscode-errorForeground, #f48771);
      padding: 10px 14px;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 0.88rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <span class="domain-badge">★ Domain: Own Library (Fixed)</span>
        <h2 class="title">${isEdit ? "Edit Custom Component" : "Create Custom Component"}</h2>
      </div>
    </div>

    <div id="errorBanner" class="error-banner"></div>

    <form id="componentForm">
      <div class="grid">
        <div class="form-group">
          <label for="subDomain">Sub Domain <span class="optional-hint">Optional (e.g. Algorithms, Network)</span></label>
          <input type="text" id="subDomain" list="subDomainList" placeholder="Defaults to 'General'" value="${this.escapeAttr(initialSubDomain)}">
          <datalist id="subDomainList">${subDomainOptions}</datalist>
        </div>

        <div class="form-group">
          <label for="topic">Topic <span class="optional-hint">Optional (e.g. Sorting, Sockets)</span></label>
          <input type="text" id="topic" list="topicList" placeholder="Defaults to 'Algorithms'" value="${this.escapeAttr(initialTopic)}">
          <datalist id="topicList">${topicOptions}</datalist>
        </div>

        <div class="form-group">
          <label for="subTopic">Sub Topic <span class="optional-hint">Optional (e.g. Helpers, Custom)</span></label>
          <input type="text" id="subTopic" list="subTopicList" placeholder="Defaults to 'Custom'" value="${this.escapeAttr(initialSubTopic)}">
          <datalist id="subTopicList">${subTopicOptions}</datalist>
        </div>

        <div class="form-group">
          <label for="name">Component Name <span class="optional-hint">Optional (Auto-detected from code)</span></label>
          <input type="text" id="name" placeholder="e.g. tcp_connect, solve" value="${this.escapeAttr(initialName)}">
        </div>

        <div class="form-group">
          <label for="type">Component Type <span class="optional-hint">Optional</span></label>
          <select id="type">
            <option value="snippet" ${initialType === "snippet" ? "selected" : ""}>snippet</option>
            <option value="function" ${initialType === "function" ? "selected" : ""}>function</option>
            <option value="struct" ${initialType === "struct" ? "selected" : ""}>struct</option>
            <option value="program" ${initialType === "program" ? "selected" : ""}>program</option>
            <option value="header" ${initialType === "header" ? "selected" : ""}>header</option>
          </select>
        </div>

        <div class="form-group">
          <label for="signature">Signature <span class="optional-hint">Optional</span></label>
          <input type="text" id="signature" placeholder="e.g. int tcp_connect(const char *ip, int port);" value="${this.escapeAttr(initialSignature)}">
        </div>

        <div class="form-group">
          <label for="tags">Tags <span class="optional-hint">Optional (Comma separated)</span></label>
          <input type="text" id="tags" placeholder="e.g. network, tcp, socket" value="${this.escapeAttr(initialTags)}">
        </div>

        <div class="form-group full-width">
          <label for="description">Description <span class="optional-hint">Optional</span></label>
          <input type="text" id="description" placeholder="Brief usage or purpose of this component" value="${this.escapeAttr(initialDescription)}">
        </div>

        <div class="form-group full-width">
          <label for="aliases">Aliases <span class="optional-hint">Optional (Comma separated)</span></label>
          <input type="text" id="aliases" placeholder="e.g. tcp_client, connect_socket" value="${this.escapeAttr(initialAliases)}">
        </div>

        <div class="form-group full-width">
          <label for="code">
            <span>Library Inputs / Code Content <span class="required-star">* (REQUIRED)</span></span>
            <span class="optional-hint">Full C code • Supports Tab key indentation</span>
          </label>
          <textarea id="code" required spellcheck="false" placeholder="/* Enter or paste C function, struct, snippet or tournament program */
void my_component(void) {
    // Code here
}">${this.escapeHtml(initialCode)}</textarea>
          <div class="code-meta">
            <span id="charCount">0 characters</span>
            <span id="lineCount">1 lines</span>
          </div>
        </div>
      </div>

      <div class="actions">
        <button type="submit" class="primary" id="btnSave">
          ${isEdit ? "Update Component" : "Save to Own Library"}
        </button>
        <button type="button" class="secondary" id="btnSaveAndInsert">
          Save & Auto-Type into Active File
        </button>
        <button type="button" class="secondary" id="btnCancel">
          Cancel
        </button>
      </div>
    </form>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    const codeArea = document.getElementById("code");
    const charCount = document.getElementById("charCount");
    const lineCount = document.getElementById("lineCount");
    const errorBanner = document.getElementById("errorBanner");

    function updateCounts() {
      const text = codeArea.value;
      charCount.textContent = text.length + " characters";
      lineCount.textContent = (text.split("\n").length) + " lines";
    }

    codeArea.addEventListener("input", updateCounts);
    updateCounts();

    codeArea.addEventListener("keydown", function(e) {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
        updateCounts();
      }
    });

    function getFormData() {
      return {
        subDomain: document.getElementById("subDomain").value,
        topic: document.getElementById("topic").value,
        subTopic: document.getElementById("subTopic").value,
        name: document.getElementById("name").value,
        type: document.getElementById("type").value,
        signature: document.getElementById("signature").value,
        description: document.getElementById("description").value,
        tags: document.getElementById("tags").value,
        aliases: document.getElementById("aliases").value,
        code: codeArea.value,
      };
    }

    document.getElementById("componentForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const data = getFormData();
      if (!data.code || !data.code.trim()) {
        showError("Code content is required.");
        codeArea.focus();
        return;
      }
      vscode.postMessage({ command: "save", data: data });
    });

    document.getElementById("btnSaveAndInsert").addEventListener("click", function() {
      const data = getFormData();
      if (!data.code || !data.code.trim()) {
        showError("Code content is required.");
        codeArea.focus();
        return;
      }
      vscode.postMessage({ command: "saveAndInsert", data: data });
    });

    document.getElementById("btnCancel").addEventListener("click", function() {
      vscode.postMessage({ command: "cancel" });
    });

    function showError(msg) {
      errorBanner.textContent = msg;
      errorBanner.style.display = "block";
    }

    window.addEventListener("message", function(event) {
      const msg = event.data;
      if (msg.command === "error") {
        showError(msg.message);
      }
    });
  </script>
</body>
</html>`;
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  private escapeAttr(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
