export type TypingExecutionMode = "automatic" | "manual";
export type TypingModel = "humanized" | "linear";

export type TypingActionType = "type" | "overtype" | "backspace" | "pause";

export interface TypingAction {
  type: TypingActionType;
  char?: string;
  delayMs?: number;
  description?: string;
  autoClose?: string;
}

export interface TypingOptions {
  delayMs: number;
  mode: "character";
  executionMode?: TypingExecutionMode;
  stepSize?: number;
  preserveNewlines: boolean;
  preserveTabs: boolean;
  jitterMs?: number;
  naturalTypingModel?: TypingModel;
  enableTypoSimulation?: boolean;
  typoRate?: number;
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
  action?: TypingActionType;
  description?: string;
  autoClose?: string;
}

export interface TypingTarget {
  focus(): Promise<void>;
  typeCharacter(character: string, autoClose?: string): Promise<void>;
  releaseModifiers(): Promise<void>;
  overtypeCharacter?(character: string): Promise<void>;
  deleteBackward?(): Promise<void>;
}

export interface KeyboardMapper {
  typeCharacter(character: string, autoClose?: string): Promise<void>;
  releaseModifiers?(): Promise<void>;
  overtypeCharacter?(character: string): Promise<void>;
  deleteBackward?(): Promise<void>;
}

export interface TypingProgressEvent {
  stats: TypingStatistics;
  char?: string;
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

export interface LogEntry {
  timestamp: string;
  level: "debug" | "info" | "warn" | "error";
  message: string;
  context?: Record<string, unknown>;
}
