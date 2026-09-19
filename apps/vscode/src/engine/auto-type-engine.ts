import * as vscode from "vscode";
import { DefaultTypingEngine, StructuralTokenizer } from "@dtyp/typing-engine";
import { TypingAction, TypingModel } from "@dtyp/types";
import { VSCodeTypingTarget, CursorJumpAction } from "../adapter/vscode-typing-target.js";
import { defaultLogger } from "@dtyp/utilities";

export type TypingMode = "automatic" | "manual";

export interface PendingTypingQueue {
  componentId: string;
  componentName: string;
  fullText: string;
  actions: TypingAction[];
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
  ) {
    this.typingTarget.onCursorJump((expected, actual) => {
      this.logger.warn(`Cursor relocated: expected ${expected.line}:${expected.character}, actual ${actual.line}:${actual.character}`);
    });
  }

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
    return this.pendingQueue.actions.length - this.pendingQueue.currentIndex;
  }

  public getActiveQueue(): PendingTypingQueue | null {
    return this.pendingQueue;
  }

  public cancelManualQueue(): void {
    if (this.pendingQueue) {
      this.pendingQueue = null;
      this.notifyQueueChange();
    }
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
    const jitterMs = config.get<number>("typingJitterMs", 5);
    const cursorPolicy = config.get<CursorJumpAction>("onCursorJump", "pause");
    const pauseOnTabSwitch = config.get<boolean>("pauseOnTabSwitch", true);
    const undoChunkSize = config.get<number>("undoChunkSize", 3);
    const naturalTypingModel = config.get<TypingModel>("naturalTypingModel", "nonlinear");
    const enableTypoSimulation = config.get<boolean>("enableTypoSimulation", true);
    const typoRate = config.get<number>("typoRate", 0.015);
    const cognitivePauseIntensity = config.get<"subtle" | "natural" | "deliberate">("cognitivePauseIntensity", "natural");
    const enableFatigueRenewal = config.get<boolean>("enableFatigueRenewal", true);

    this.typingTarget.setEditor(editor);
    this.typingTarget.setCursorJumpPolicy(cursorPolicy);
    this.typingTarget.setPauseOnTabSwitch(pauseOnTabSwitch);
    this.typingTarget.setUndoChunkSize(undoChunkSize);
    this.typingTarget.resetHead(editor.selection.active);

    if (mode === "automatic") {
      this.cancelManualQueue();
      try {
        await this.typingEngine.start(text, {
          delayMs,
          jitterMs,
          mode: "character",
          executionMode: "automatic",
          preserveNewlines: true,
          preserveTabs: true,
          naturalTypingModel,
          enableTypoSimulation,
          typoRate,
          cognitivePauseIntensity,
          enableFatigueRenewal,
        });
      } catch (err: any) {
        if (err.message === "TYPING_PAUSED_CURSOR_MOVED") {
          vscode.window.showWarningMessage(
            `dTyp: Typing paused because the cursor was moved. Use Ctrl+Shift+D or click Resume.`,
            "Resume at original position",
            "Resume at current cursor",
            "Cancel"
          ).then(async (action) => {
            if (action === "Resume at original position") {
              const head = this.typingTarget.getExpectedHead();
              if (head && vscode.window.activeTextEditor) {
                vscode.window.activeTextEditor.selection = new vscode.Selection(head, head);
                this.typingTarget.resetHead(head);
                await this.typingEngine.resume();
              }
            } else if (action === "Resume at current cursor") {
              if (vscode.window.activeTextEditor) {
                this.typingTarget.resetHead(vscode.window.activeTextEditor.selection.active);
                await this.typingEngine.resume();
              }
            } else if (action === "Cancel") {
              this.typingEngine.cancel();
            }
          });
        } else if (err.message === "TYPING_PAUSED_TAB_SWITCHED") {
          vscode.window.showInformationMessage("dTyp: Typing paused because you switched editor tabs.");
          this.typingEngine.pause();
        } else if (err.message === "TYPING_ABORTED_CURSOR_MOVED") {
          vscode.window.showWarningMessage("dTyp: Typing aborted because the cursor was moved.");
          this.typingEngine.cancel();
        } else {
          throw err;
        }
      }
    } else {
      // Manual Mode: Queue actions for Ctrl+Shift+D manual stepping
      this.typingEngine.cancel();

      let actions: TypingAction[];
      if (naturalTypingModel !== "linear") {
        const tokenizer = new StructuralTokenizer({
          model: naturalTypingModel,
          baseDelayMs: delayMs,
          jitterMs,
          enableTypoSimulation,
          typoRate,
          preserveNewlines: true,
          preserveTabs: true,
          cognitivePauseIntensity,
          enableFatigueRenewal,
        });
        actions = tokenizer.tokenize(text);
      } else {
        actions = text.split("").map((char) => ({
          type: "type" as const,
          char,
        }));
      }

      this.pendingQueue = {
        componentId,
        componentName,
        fullText: text,
        actions,
        currentIndex: 0,
        startedAt: Date.now(),
      };
      this.logger.info(`Queued ${this.pendingQueue.actions.length} actions for manual stepping (Ctrl+Shift+D) [model: ${naturalTypingModel}]`);
      this.notifyQueueChange();
    }
  }

  public async stepNextCharacter(editor?: vscode.TextEditor): Promise<number> {
    if (!this.pendingQueue || this.getRemainingCount() <= 0) {
      return 0;
    }

    const activeEditor = editor || vscode.window.activeTextEditor;
    if (!activeEditor) return 0;
    this.typingTarget.setEditor(activeEditor);

    const config = vscode.workspace.getConfiguration("dtyp");
    const stepSize = Math.max(1, config.get<number>("stepSize", 1));

    let stepsExecuted = 0;
    while (stepsExecuted < stepSize && this.pendingQueue.currentIndex < this.pendingQueue.actions.length) {
      const action = this.pendingQueue.actions[this.pendingQueue.currentIndex];
      this.pendingQueue.currentIndex++;
      stepsExecuted++;

      try {
        if (action.type === "overtype") {
          await this.typingTarget.overtypeCharacter(action.char || "");
        } else if (action.type === "backspace") {
          await this.typingTarget.deleteBackward();
        } else if (action.type === "enter_block") {
          if (this.typingTarget.enterBlock) {
            await this.typingTarget.enterBlock(action.baseIndent ?? "", action.blockIndent ?? "    ");
          } else {
            await this.typingTarget.typeCharacter("\n");
          }
        } else if (action.type === "cursor_move") {
          await this.typingTarget.moveCursor(
            action.targetLineOffset ?? 0,
            action.targetColumn,
            action.targetLandmark
          );
          stepsExecuted--;
        } else if (action.type === "pause") {
          // Pause action - don't consume user's keystroke on a pure pause
          stepsExecuted--;
        } else {
          await this.typingTarget.typeCharacter(action.char || "", action.autoClose);
        }
      } catch (err: any) {
        if (
          err.message === "TYPING_PAUSED_CURSOR_MOVED" ||
          err.message === "TYPING_PAUSED_TAB_SWITCHED" ||
          err.message === "TYPING_ABORTED_CURSOR_MOVED"
        ) {
          vscode.window.showWarningMessage(`dTyp: Manual typing halted: ${err.message}`);
          break;
        }
        throw err;
      }
    }

    if (this.getRemainingCount() <= 0) {
      this.logger.info(`Manual typing finished for component: ${this.pendingQueue.componentName}`);
      vscode.window.setStatusBarMessage(`$(check) dTyp: Finished typing ${this.pendingQueue.componentName}`, 3000);
      this.pendingQueue = null;
    }

    this.notifyQueueChange();
    return stepsExecuted;
  }

  public async flushRemaining(editor?: vscode.TextEditor): Promise<number> {
    if (!this.pendingQueue || this.getRemainingCount() <= 0) {
      return 0;
    }

    const activeEditor = editor || vscode.window.activeTextEditor;
    if (!activeEditor) return 0;
    this.typingTarget.setEditor(activeEditor);

    const remainingActions = this.pendingQueue.actions.slice(this.pendingQueue.currentIndex);
    const remainingCount = remainingActions.length;

    for (const action of remainingActions) {
      if (action.type === "overtype") {
        await this.typingTarget.overtypeCharacter(action.char || "");
      } else if (action.type === "backspace") {
        await this.typingTarget.deleteBackward();
      } else if (action.type === "enter_block") {
        if (this.typingTarget.enterBlock) {
          await this.typingTarget.enterBlock(action.baseIndent ?? "", action.blockIndent ?? "    ");
        } else {
          await this.typingTarget.typeCharacter("\n");
        }
      } else if (action.type === "cursor_move") {
        await this.typingTarget.moveCursor(
          action.targetLineOffset ?? 0,
          action.targetColumn,
          action.targetLandmark
        );
      } else if (action.type === "type") {
        await this.typingTarget.typeCharacter(action.char || "", action.autoClose);
      }
    }

    this.logger.info(`Flushed remaining ${remainingCount} actions for ${this.pendingQueue.componentName}`);
    this.pendingQueue = null;
    this.notifyQueueChange();
    return remainingCount;
  }
}
