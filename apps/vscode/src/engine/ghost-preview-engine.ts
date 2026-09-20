import * as vscode from "vscode";

export class GhostPreviewEngine implements vscode.Disposable {
  private decorationType: vscode.TextEditorDecorationType;
  private activeEditor: vscode.TextEditor | null = null;
  private isShowing = false;

  constructor() {
    this.decorationType = vscode.window.createTextEditorDecorationType({
      after: {
        color: new vscode.ThemeColor("editorGhostText.foreground"),
        fontStyle: "italic",
      },
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    });
  }

  /**
   * Shows a dimmed ghost preview of code at target position.
   */
  public showPreview(editor: vscode.TextEditor, text: string, pos?: vscode.Position): void {
    this.clearPreview();
    this.activeEditor = editor;

    const position = pos ?? editor.selection.active;
    const lines = text.split("\n");
    const previewLines = lines.slice(0, 15); // Show first 15 lines max as ghost preview
    const truncatedText = previewLines.join("\n") + (lines.length > 15 ? "\n... (remaining lines)" : "");

    // Create single range at current cursor
    const range = new vscode.Range(position, position);

    const decoration: vscode.DecorationOptions = {
      range,
      renderOptions: {
        after: {
          contentText: `\n[dTyp Ghost Preview - Press Enter or Ctrl+D to start]\n${truncatedText}`,
        },
      },
    };

    editor.setDecorations(this.decorationType, [decoration]);
    this.isShowing = true;
  }

  /**
   * Clears any active ghost preview decoration.
   */
  public clearPreview(): void {
    if (this.activeEditor && this.isShowing) {
      this.activeEditor.setDecorations(this.decorationType, []);
    }
    this.isShowing = false;
    this.activeEditor = null;
  }

  public isPreviewActive(): boolean {
    return this.isShowing;
  }

  public dispose(): void {
    this.clearPreview();
    this.decorationType.dispose();
  }
}
