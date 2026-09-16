import * as vscode from "vscode";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { VSCodeTypingTarget } from "../adapter/vscode-typing-target.js";
import { defaultLogger } from "@dtyp/utilities";

export type TypingMode = "automatic" | "manual";

export interface PendingTypingQueue {
  componentId: string;
  componentName: string;
  fullText: string;
  characters: string[];
  currentIndex: number;
  startedAt: number;
}

export class AutoTypeEngine {
  private logger = defaultLogger.child("AutoTypeEngine");
  private pendingQueue: PendingTypingQueue | null = null;
  private onQueueChangeListeners: Array<(hasQueue: boolean, remaining: number) => void> = [];

  constructor(
    private typingEngine: DefaultTypingEngine,
    private typingTarget: VSCodeTypingTarget
  ) {}

  public onQueueChange(cb: (hasQueue: boolean, remaining: number) => void): () => void {
    this.onQueueChangeListeners.push(cb);
    return () => {
      this.onQueueChangeListeners = this.onQueueChangeListeners.filter((l) => l !== cb);
    };
  }

  private notifyQueueChange(): void {
    const hasQueue = this.pendingQueue !== null && this.getRemainingCount() > 0;
    const remaining = this.getRemainingCount();
    vscode.commands.executeCommand("setContext", "dtyp.hasQueuedCharacters", hasQueue);
    this.onQueueChangeListeners.forEach((cb) => cb(hasQueue, remaining));
  }

  public isManualQueueActive(): boolean {
    return this.pendingQueue !== null && this.getRemainingCount() > 0;
  }

  public getRemainingCount(): number {
    if (!this.pendingQueue) return 0;
    return this.pendingQueue.characters.length - this.pendingQueue.currentIndex;
  }

  public getActiveQueue(): PendingTypingQueue | null {
    return this.pendingQueue;
  }

  public async startInsertion(
    componentId: string,
    componentName: string,
    text: string,
    editor: vscode.TextEditor,
    modeOverride?: TypingMode
  ): Promise<void> {
    const config = vscode.workspace.getConfiguration("dtyp");
    const mode = modeOverride || config.get<TypingMode>("typingMode", "automatic");
    const delayMs = config.get<number>("typingDelayMs", 15);

    if (this.typingTarget && typeof (this.typingTarget as any).setEditor === "function") {
      (this.typingTarget as any).setEditor(editor);
    }

    if (mode === "automatic") {
      this.cancelManualQueue();
      await this.typingEngine.start(text, {
        delayMs,
        mode: "character",
        executionMode: "automatic",
        preserveNewlines: true,
        preserveTabs: true,
      });
    } else {
      // Manual Mode: Queue characters for Ctrl+D manual stepping
      this.typingEngine.cancel();
      this.pendingQueue = {
        componentId,
        componentName,
        fullText: text,
        characters: text.split(""),
        currentIndex: 0,
        startedAt: Date.now(),
      };
      this.logger.info(`Queued ${this.pendingQueue.characters.length} characters for manual stepping (Ctrl+D)`);
      this.notifyQueueChange();
    }
  }

  /**
   * Called when user presses Ctrl+D in manual mode.
   * Types the next character(s) at cursor position!
   */
  public async stepNextCharacter(editor?: vscode.TextEditor): Promise<number> {
    if (!this.pendingQueue || this.getRemainingCount() <= 0) {
      return 0;
    }

    const activeEditor = editor || vscode.window.activeTextEditor;
    if (!activeEditor) return 0;

    const config = vscode.workspace.getConfiguration("dtyp");
    const stepSize = Math.max(1, config.get<number>("stepSize", 1));

    const endIndex = Math.min(this.pendingQueue.currentIndex + stepSize, this.pendingQueue.characters.length);
    const charsToType = this.pendingQueue.characters.slice(this.pendingQueue.currentIndex, endIndex).join("");
    this.pendingQueue.currentIndex = endIndex;

    await activeEditor.edit(
      (builder) => {
        builder.insert(activeEditor.selection.active, charsToType);
      },
      { undoStopBefore: false, undoStopAfter: false }
    );

    const remaining = this.getRemainingCount();
    if (remaining === 0) {
      this.logger.info(`Completed manual typing for ${this.pendingQueue.componentName}`);
      this.pendingQueue = null;
    }

    this.notifyQueueChange();
    return charsToType.length;
  }

  /**
   * Flushes all remaining characters immediately.
   */
  public async flushRemaining(editor?: vscode.TextEditor): Promise<void> {
    if (!this.pendingQueue || this.getRemainingCount() <= 0) return;

    const activeEditor = editor || vscode.window.activeTextEditor;
    if (!activeEditor) return;

    const remainingText = this.pendingQueue.characters.slice(this.pendingQueue.currentIndex).join("");
    this.pendingQueue = null;

    await activeEditor.edit((builder) => {
      builder.insert(activeEditor.selection.active, remainingText);
    });

    this.notifyQueueChange();
  }

  public cancelManualQueue(): void {
    if (this.pendingQueue) {
      this.pendingQueue = null;
      this.notifyQueueChange();
    }
  }
}
