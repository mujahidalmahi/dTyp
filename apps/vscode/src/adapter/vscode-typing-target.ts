import * as vscode from "vscode";
import { TypingTarget } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";

export class VSCodeTypingTarget implements TypingTarget {
  private editor: vscode.TextEditor | null = null;
  private logger = defaultLogger.child("VSCodeTarget");

  constructor(editor?: vscode.TextEditor) {
    this.editor = editor ?? vscode.window.activeTextEditor ?? null;
  }

  public setEditor(editor: vscode.TextEditor): void {
    this.editor = editor;
  }

  public async focus(): Promise<void> {
    if (this.editor) {
      await vscode.window.showTextDocument(this.editor.document, this.editor.viewColumn);
    }
  }

  public async typeCharacter(character: string): Promise<void> {
    const activeEditor = this.editor ?? vscode.window.activeTextEditor;
    if (!activeEditor) {
      throw new Error("No active text editor in VS Code to type character");
    }

    const currentPos = activeEditor.selection.active;

    await activeEditor.edit(
      (editBuilder) => {
        editBuilder.insert(currentPos, character);
      },
      {
        undoStopBefore: false,
        undoStopAfter: false,
      }
    );
  }

  public async releaseModifiers(): Promise<void> {
    // In VS Code editor context, no OS modifier keys are held down by default
    this.logger.debug("VS Code typing target modifier release requested");
  }
}
