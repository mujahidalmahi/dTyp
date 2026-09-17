import * as vscode from "vscode";
import { TypingTarget } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";

export type CursorJumpAction = "pause" | "realign" | "abort";

export class VSCodeTypingTarget implements TypingTarget {
  private editor: vscode.TextEditor | null = null;
  private logger = defaultLogger.child("VSCodeTarget");
  private charCount = 0;
  private expectedHead: vscode.Position | null = null;
  private activeDocUri: string | null = null;
  private cursorJumpPolicy: CursorJumpAction = "pause";
  private pauseOnTabSwitch = true;
  private undoChunkSize = 3;
  private isSessionStart = true;
  private onCursorJumpCallback: ((expected: vscode.Position, actual: vscode.Position) => void) | null = null;

  constructor(editor?: vscode.TextEditor) {
    this.editor = editor ?? vscode.window.activeTextEditor ?? null;
    if (this.editor) {
      this.activeDocUri = this.editor.document.uri.toString();
    }
  }

  public setEditor(editor: vscode.TextEditor): void {
    this.editor = editor;
    this.activeDocUri = editor.document.uri.toString();
  }

  public setCursorJumpPolicy(policy: CursorJumpAction): void {
    this.cursorJumpPolicy = policy;
  }

  public setPauseOnTabSwitch(enabled: boolean): void {
    this.pauseOnTabSwitch = enabled;
  }

  public setUndoChunkSize(size: number): void {
    this.undoChunkSize = Math.max(1, Math.min(10, size));
  }

  public onCursorJump(cb: (expected: vscode.Position, actual: vscode.Position) => void): void {
    this.onCursorJumpCallback = cb;
  }

  public resetHead(pos?: vscode.Position): void {
    this.charCount = 0;
    this.isSessionStart = true;
    const activeEditor = this.editor ?? vscode.window.activeTextEditor;
    if (activeEditor) {
      this.expectedHead = pos ?? activeEditor.selection.active;
      this.activeDocUri = activeEditor.document.uri.toString();
    }
  }

  public getExpectedHead(): vscode.Position | null {
    return this.expectedHead;
  }

  public async focus(): Promise<void> {
    if (this.editor) {
      await vscode.window.showTextDocument(this.editor.document, this.editor.viewColumn);
    }
  }

  public async typeCharacter(character: string, autoClose?: string): Promise<void> {
    const activeEditor = this.editor ?? vscode.window.activeTextEditor;
    if (!activeEditor) {
      throw new Error("No active text editor in VS Code to type character");
    }

    // 1. Tab-Switch Guard: Prevent typing into wrong document if user switched tabs
    if (this.pauseOnTabSwitch && this.activeDocUri && activeEditor.document.uri.toString() !== this.activeDocUri) {
      this.logger.warn("Active document changed during typing, halting typing session");
      throw new Error("TYPING_PAUSED_TAB_SWITCHED");
    }

    // 2. Cursor Relocation Detection
    let targetPos = activeEditor.selection.active;
    if (this.expectedHead && !targetPos.isEqual(this.expectedHead)) {
      this.logger.warn(`Cursor manually jumped from ${this.expectedHead.line}:${this.expectedHead.character} to ${targetPos.line}:${targetPos.character}`);
      this.onCursorJumpCallback?.(this.expectedHead, targetPos);

      if (this.cursorJumpPolicy === "pause") {
        throw new Error("TYPING_PAUSED_CURSOR_MOVED");
      } else if (this.cursorJumpPolicy === "realign") {
        targetPos = this.expectedHead;
      } else if (this.cursorJumpPolicy === "abort") {
        throw new Error("TYPING_ABORTED_CURSOR_MOVED");
      }
    }

    this.charCount++;
    const isUndoStop = this.charCount % this.undoChunkSize === 0;
    const undoBefore = this.isSessionStart;
    this.isSessionStart = false;

    const textToInsert = autoClose ? character + autoClose : character;

    await activeEditor.edit(
      (editBuilder) => {
        editBuilder.insert(targetPos, textToInsert);
      },
      {
        undoStopBefore: undoBefore,
        undoStopAfter: isUndoStop,
      }
    );

    // Calculate expected next position after insertion
    if (character === "\n") {
      const postPos = activeEditor.selection.active;
      if (postPos.line === targetPos.line + 1) {
        this.expectedHead = postPos;
      } else {
        const nextPos = new vscode.Position(targetPos.line + 1, 0);
        activeEditor.selection = new vscode.Selection(nextPos, nextPos);
        this.expectedHead = nextPos;
      }
    } else if (autoClose) {
      // Place cursor between character and autoClose
      const nextPos = new vscode.Position(targetPos.line, targetPos.character + character.length);
      activeEditor.selection = new vscode.Selection(nextPos, nextPos);
      this.expectedHead = nextPos;
    } else {
      const nextPos = new vscode.Position(targetPos.line, targetPos.character + character.length);
      this.expectedHead = nextPos;
    }
  }

  public async overtypeCharacter(character: string): Promise<void> {
    const activeEditor = this.editor ?? vscode.window.activeTextEditor;
    if (!activeEditor) {
      throw new Error("No active text editor in VS Code to overtype character");
    }

    // Tab-Switch Guard
    if (this.pauseOnTabSwitch && this.activeDocUri && activeEditor.document.uri.toString() !== this.activeDocUri) {
      this.logger.warn("Active document changed during typing, halting typing session");
      throw new Error("TYPING_PAUSED_TAB_SWITCHED");
    }

    // Cursor Relocation Detection
    let targetPos = activeEditor.selection.active;
    if (this.expectedHead && !targetPos.isEqual(this.expectedHead)) {
      this.logger.warn(`Cursor manually jumped from ${this.expectedHead.line}:${this.expectedHead.character} to ${targetPos.line}:${targetPos.character}`);
      this.onCursorJumpCallback?.(this.expectedHead, targetPos);

      if (this.cursorJumpPolicy === "pause") {
        throw new Error("TYPING_PAUSED_CURSOR_MOVED");
      } else if (this.cursorJumpPolicy === "realign") {
        targetPos = this.expectedHead;
      } else if (this.cursorJumpPolicy === "abort") {
        throw new Error("TYPING_ABORTED_CURSOR_MOVED");
      }
    }

    const lineText = activeEditor.document.lineAt(targetPos.line).text;
    const charAtCursor = lineText.charAt(targetPos.character);

    if (charAtCursor === character) {
      // Step over without inserting duplicate delimiter
      const nextPos = new vscode.Position(targetPos.line, targetPos.character + 1);
      activeEditor.selection = new vscode.Selection(nextPos, nextPos);
      this.expectedHead = nextPos;
      this.charCount++;
      return;
    }

    // Special handling for closing brace '}' that may be after indentation or on next line
    if (character === "}") {
      const remainingOnLine = lineText.slice(targetPos.character);
      const idxOnLine = remainingOnLine.indexOf("}");
      if (idxOnLine !== -1 && remainingOnLine.slice(0, idxOnLine).trim() === "") {
        const nextPos = new vscode.Position(targetPos.line, targetPos.character + idxOnLine + 1);
        activeEditor.selection = new vscode.Selection(nextPos, nextPos);
        this.expectedHead = nextPos;
        this.charCount++;
        return;
      }
      if (targetPos.line + 1 < activeEditor.document.lineCount) {
        const nextLineText = activeEditor.document.lineAt(targetPos.line + 1).text;
        const idxNextLine = nextLineText.indexOf("}");
        if (idxNextLine !== -1 && nextLineText.slice(0, idxNextLine).trim() === "") {
          const nextPos = new vscode.Position(targetPos.line + 1, idxNextLine + 1);
          activeEditor.selection = new vscode.Selection(nextPos, nextPos);
          this.expectedHead = nextPos;
          this.charCount++;
          return;
        }
      }
    }

    // If delimiter is not already at cursor position, type it normally
    await this.typeCharacter(character);
  }

  public async deleteBackward(): Promise<void> {
    const activeEditor = this.editor ?? vscode.window.activeTextEditor;
    if (!activeEditor) {
      throw new Error("No active text editor in VS Code to backspace");
    }

    if (this.pauseOnTabSwitch && this.activeDocUri && activeEditor.document.uri.toString() !== this.activeDocUri) {
      throw new Error("TYPING_PAUSED_TAB_SWITCHED");
    }

    const targetPos = activeEditor.selection.active;
    if (targetPos.character > 0) {
      const prevPos = new vscode.Position(targetPos.line, targetPos.character - 1);
      await activeEditor.edit(
        (editBuilder) => {
          editBuilder.delete(new vscode.Range(prevPos, targetPos));
        },
        {
          undoStopBefore: false,
          undoStopAfter: false,
        }
      );
      this.expectedHead = prevPos;
    } else if (targetPos.line > 0) {
      const prevLineLength = activeEditor.document.lineAt(targetPos.line - 1).text.length;
      const prevPos = new vscode.Position(targetPos.line - 1, prevLineLength);
      await activeEditor.edit(
        (editBuilder) => {
          editBuilder.delete(new vscode.Range(prevPos, targetPos));
        },
        {
          undoStopBefore: false,
          undoStopAfter: false,
        }
      );
      this.expectedHead = prevPos;
    }
  }

  public async releaseModifiers(): Promise<void> {
    this.logger.debug("VS Code typing target modifier release requested");
  }
}
