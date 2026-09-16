export interface TypingOptions {
  delayMs: number;
  mode: "character";
  preserveNewlines: boolean;
  preserveTabs: boolean;
  jitterMs?: number;
}

export type TypingState = "idle" | "typing" | "paused" | "cancelled" | "completed" | "error";

export interface TypingStatistics {
  charactersTotal: number;
  charactersTyped: number;
  charactersRemaining: number;
  startedAt?: number;
  elapsedMs: number;
  averageSpeedCps: number;
}

export interface QueuedCharacter {
  id: number;
  char: string;
  isNewline: boolean;
  isTab: boolean;
  delayOverrideMs?: number;
}

export interface TypingTarget {
  focus(): Promise<void>;
  typeCharacter(character: string): Promise<void>;
  releaseModifiers(): Promise<void>;
}

export interface KeyboardMapper {
  typeCharacter(character: string): Promise<void>;
  releaseModifiers?(): Promise<void>;
}

export interface TypingProgressEvent {
  stats: TypingStatistics;
  char: string;
}

export interface TypingEngineEvents {
  start: TypingStatistics;
  progress: TypingProgressEvent;
  pause: void;
  resume: void;
  cancel: void;
  complete: TypingStatistics;
  error: Error;
}

export interface TypingEngine {
  start(text: string, options: TypingOptions): Promise<void>;
  pause(): void;
  resume(): void;
  cancel(): void;
  isTyping(): boolean;
  getState(): TypingState;
  getStatistics(): TypingStatistics;
}
