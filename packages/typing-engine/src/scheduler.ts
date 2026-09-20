import { TypingOptions, TypingStatistics, QueuedCharacter } from "@dtyp/types";
import { sleep, calculateDelayWithJitter, defaultLogger } from "@dtyp/utilities";
import { CharacterQueue } from "./character-queue.js";
import { StandardKeyboardMapper } from "./keyboard-mapper.js";

export interface SchedulerCallbacks {
  onProgress?: (stats: TypingStatistics, char: string) => void;
  onComplete?: (stats: TypingStatistics) => void;
  onError?: (err: Error) => void;
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
}

export class TypingScheduler {
  private isPaused = false;
  private isCancelled = false;
  private isRunning = false;
  private pausePromiseResolve: (() => void) | null = null;
  private sleepTimeout: NodeJS.Timeout | null = null;
  private sleepResolve: (() => void) | null = null;
  private speedMultiplier = 1.0;

  public setSpeedMultiplier(mult: number): void {
    this.speedMultiplier = Math.max(0.1, Math.min(10.0, mult));
    this.logger.info(`Typing speed multiplier adjusted to ${this.speedMultiplier.toFixed(2)}x`);
  }

  public getSpeedMultiplier(): number {
    return this.speedMultiplier;
  }
  private logger = defaultLogger.child("Scheduler");

  constructor(
    private queue: CharacterQueue,
    private mapper: StandardKeyboardMapper,
    private callbacks: SchedulerCallbacks = {}
  ) {}

  private interruptibleSleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.sleepResolve = resolve;
      this.sleepTimeout = setTimeout(() => {
        this.sleepTimeout = null;
        this.sleepResolve = null;
        resolve();
      }, ms);
    });
  }

  private interruptSleep(): void {
    if (this.sleepTimeout) {
      clearTimeout(this.sleepTimeout);
      this.sleepTimeout = null;
    }
    if (this.sleepResolve) {
      this.sleepResolve();
      this.sleepResolve = null;
    }
  }

  public async run(options: TypingOptions): Promise<void> {
    if (this.isRunning) {
      throw new Error("Scheduler is already running");
    }

    this.isRunning = true;
    this.isPaused = false;
    this.isCancelled = false;

    const startTime = Date.now();
    const totalChars = this.queue.length;
    let typedChars = 0;

    this.logger.info(`Starting typing scheduler: ${totalChars} characters, delay: ${options.delayMs}ms`);

    try {
      while (!this.queue.isEmpty() || this.isCancelled) {
        if (this.isCancelled) {
          this.logger.warn("Typing cancelled by user");
          await this.mapper.releaseModifiers();
          this.callbacks.onCancel?.();
          return;
        }

        if (this.isPaused) {
          this.logger.info("Typing paused");
          this.callbacks.onPause?.();
          await new Promise<void>((resolve) => {
            this.pausePromiseResolve = resolve;
          });
          this.logger.info("Typing resumed");
          this.callbacks.onResume?.();
        }

        const item = this.queue.dequeue();
        if (!item) break;

        // Perform specific typing action
        if (item.action === "overtype") {
          await this.mapper.overtypeCharacter(item.char);
          typedChars++;
        } else if (item.action === "backspace") {
          await this.mapper.deleteBackward();
        } else if (item.action === "enter_block") {
          if (this.mapper.enterBlock) {
            await this.mapper.enterBlock(item.baseIndent ?? "", item.blockIndent ?? "    ");
          } else {
            await this.mapper.typeCharacter("\n");
          }
          typedChars++;
        } else if (item.action === "pause") {
          // Pure pause action (hesitation or recognition)
        } else if (item.action === "cursor_move") {
          await this.mapper.moveCursor(item.targetLineOffset ?? 0, item.targetColumn, item.targetLandmark);
        } else {
          await this.mapper.typeCharacter(item.char, item.autoClose);
          typedChars++;
        }

        const elapsedMs = Math.max(1, Date.now() - startTime);
        const stats: TypingStatistics = {
          charactersTotal: totalChars,
          charactersTyped: typedChars,
          charactersRemaining: this.queue.length,
          startedAt: startTime,
          elapsedMs,
          averageSpeedCps: Number(((typedChars / elapsedMs) * 1000).toFixed(2)),
        };

        this.callbacks.onProgress?.(stats, item.char);

        // Delay before next character (scaled dynamically by speedMultiplier)
        const baseDelay = item.delayOverrideMs ?? calculateDelayWithJitter(options.delayMs, options.jitterMs);
        const delay = Math.max(1, Math.round(baseDelay / this.speedMultiplier));
        if (delay > 0) {
          await this.interruptibleSleep(delay);
        }
      }

      if (this.isCancelled) {
        this.logger.warn("Typing cancelled by user");
        await this.mapper.releaseModifiers();
        this.callbacks.onCancel?.();
        return;
      }

      const elapsedMs = Math.max(1, Date.now() - startTime);
      const finalStats: TypingStatistics = {
        charactersTotal: totalChars,
        charactersTyped: typedChars,
        charactersRemaining: 0,
        startedAt: startTime,
        elapsedMs,
        averageSpeedCps: Number(((typedChars / elapsedMs) * 1000).toFixed(2)),
      };

      this.logger.info(`Typing completed: ${typedChars} characters in ${elapsedMs}ms`);
      this.callbacks.onComplete?.(finalStats);
    } catch (err: any) {
      this.logger.error(`Scheduler error: ${err.message}`, { error: err });
      await this.mapper.releaseModifiers();
      this.callbacks.onError?.(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      this.isRunning = false;
      this.isPaused = false;
      this.isCancelled = false;
      this.pausePromiseResolve = null;
      this.interruptSleep();
    }
  }

  public pause(): void {
    if (this.isRunning && !this.isPaused) {
      this.isPaused = true;
      this.interruptSleep();
    }
  }

  public resume(): void {
    if (this.isRunning && this.isPaused) {
      this.isPaused = false;
      if (this.pausePromiseResolve) {
        this.pausePromiseResolve();
        this.pausePromiseResolve = null;
      }
    }
  }

  public cancel(): void {
    this.isCancelled = true;
    this.interruptSleep();
    if (this.pausePromiseResolve) {
      this.pausePromiseResolve();
      this.pausePromiseResolve = null;
    }
  }

  public get running(): boolean {
    return this.isRunning;
  }

  public get paused(): boolean {
    return this.isPaused;
  }
}
