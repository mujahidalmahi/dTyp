import {
  TypingEngine,
  TypingOptions,
  TypingState,
  TypingStatistics,
  TypingTarget,
  TypingEngineEvents,
} from "@dtyp/types";
import { EventEmitter, defaultLogger } from "@dtyp/utilities";
import { CharacterQueue } from "./character-queue.js";
import { StandardKeyboardMapper } from "./keyboard-mapper.js";
import { TypingScheduler } from "./scheduler.js";
import { StructuralTokenizer } from "./structural-tokenizer.js";

export class DefaultTypingEngine implements TypingEngine {
  private queue: CharacterQueue;
  private mapper: StandardKeyboardMapper;
  private scheduler: TypingScheduler | null = null;
  private state: TypingState = "idle";
  private stats: TypingStatistics = {
    charactersTotal: 0,
    charactersTyped: 0,
    charactersRemaining: 0,
    elapsedMs: 0,
    averageSpeedCps: 0,
  };
  private events = new EventEmitter<TypingEngineEvents>();
  private logger = defaultLogger.child("TypingEngine");

  constructor(target?: TypingTarget) {
    this.queue = new CharacterQueue();
    this.mapper = new StandardKeyboardMapper(target as TypingTarget);
  }

  public setTarget(target: TypingTarget): void {
    this.mapper.setTarget(target);
  }

  public on<K extends keyof TypingEngineEvents>(
    event: K,
    listener: (data: TypingEngineEvents[K]) => void
  ): () => void {
    return this.events.on(event, listener);
  }

  public async start(text: string, options: TypingOptions): Promise<void> {
    if (this.state === "typing" || this.state === "paused") {
      throw new Error("Cannot start typing: a typing session is already active");
    }

    if (!text || text.length === 0) {
      this.logger.warn("Empty text provided to typing engine, skipping");
      return;
    }

    if (options.naturalTypingModel === "humanized" || options.naturalTypingModel === "nonlinear") {
      const tokenizer = new StructuralTokenizer({
        model: options.naturalTypingModel,
        baseDelayMs: options.delayMs,
        jitterMs: options.jitterMs,
        enableTypoSimulation: options.enableTypoSimulation ?? true,
        typoRate: options.typoRate ?? 0.015,
        preserveNewlines: options.preserveNewlines,
        preserveTabs: options.preserveTabs,
        cognitivePauseIntensity: options.cognitivePauseIntensity,
        enableFatigueRenewal: options.enableFatigueRenewal,
      });
      const actions = tokenizer.tokenize(text);
      this.queue.loadActions(actions);
    } else {
      this.queue.loadText(text, options.preserveNewlines, options.preserveTabs);
    }
    this.state = "typing";

    const totalChars = text.length;

    this.stats = {
      charactersTotal: totalChars,
      charactersTyped: 0,
      charactersRemaining: totalChars,
      startedAt: Date.now(),
      elapsedMs: 0,
      averageSpeedCps: 0,
    };

    this.events.emit("start", this.stats);

    this.scheduler = new TypingScheduler(this.queue, this.mapper, {
      onProgress: (currentStats, char) => {
        this.stats = currentStats;
        this.events.emit("progress", { stats: currentStats, char });
      },
      onPause: () => {
        this.state = "paused";
        this.events.emit("pause", undefined);
      },
      onResume: () => {
        this.state = "typing";
        this.events.emit("resume", undefined);
      },
      onCancel: () => {
        this.state = "cancelled";
        this.queue.clear();
        this.events.emit("cancel", undefined);
      },
      onComplete: (finalStats) => {
        this.state = "completed";
        this.stats = finalStats;
        this.events.emit("complete", finalStats);
      },
      onError: (err) => {
        this.state = "error";
        this.queue.clear();
        this.events.emit("error", err);
      },
    });

    try {
      await this.scheduler.run(options);
    } finally {
      if (this.state === "typing") {
        this.state = "idle";
      }
    }
  }

  public pause(): void {
    if (this.state === "typing" && this.scheduler) {
      this.scheduler.pause();
    }
  }

  public resume(): void {
    if (this.state === "paused" && this.scheduler) {
      this.scheduler.resume();
    }
  }

  public cancel(): void {
    if ((this.state === "typing" || this.state === "paused") && this.scheduler) {
      this.scheduler.cancel();
      this.queue.clear();
      this.state = "cancelled";
    }
  }

  public isTyping(): boolean {
    return this.state === "typing" || this.state === "paused";
  }

  public getState(): TypingState {
    return this.state;
  }

  public getStatistics(): TypingStatistics {
    return { ...this.stats };
  }
}
