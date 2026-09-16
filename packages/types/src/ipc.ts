import { Session, SessionCreateInput, SessionUpdateInput, WindowInfo, AppConfig } from "./session.js";
import { TypingOptions, TypingStatistics, TypingState } from "./typing.js";

export interface LogEntry {
  timestamp: string;
  level: "debug" | "info" | "warn" | "error";
  message: string;
  context?: Record<string, unknown>;
}

export interface AppStatus {
  activeSessionId?: string;
  isHotkeyRegistered: boolean;
  typingState: TypingState;
  activeTargetWindow?: string;
  uptimeSeconds: number;
}

export interface ElectronAPI {
  // Session
  createSession(input: SessionCreateInput): Promise<Session>;
  updateSession(id: string, input: SessionUpdateInput): Promise<Session>;
  activateSession(id: string): Promise<Session>;
  deactivateSession(id: string): Promise<Session>;
  terminateSession(id: string): Promise<Session>;
  listSessions(): Promise<Session[]>;
  getSession(id: string): Promise<Session | null>;
  deleteSession(id: string): Promise<boolean>;
  renewSession(id: string): Promise<Session>;

  // Typing
  startTyping(text: string, options?: Partial<TypingOptions>): Promise<void>;
  pauseTyping(): Promise<void>;
  resumeTyping(): Promise<void>;
  cancelTyping(): Promise<void>;
  getTypingStatus(): Promise<{ state: TypingState; statistics: TypingStatistics }>;

  // Targets
  listTargets(): Promise<WindowInfo[]>;
  testTargetFocus(handle: string): Promise<boolean>;

  // App & Settings
  getStatus(): Promise<AppStatus>;
  getConfig(): Promise<AppConfig>;
  updateConfig(config: Partial<AppConfig>): Promise<AppConfig>;
  getLogs(): Promise<LogEntry[]>;

  // Event Listeners
  onSessionStateChanged(callback: (session: Session) => void): () => void;
  onTypingProgress(callback: (stats: TypingStatistics, char: string) => void): () => void;
  onTypingCompleted(callback: (stats: TypingStatistics) => void): () => void;
  onTypingError(callback: (error: string) => void): () => void;
  onLogEntry(callback: (entry: LogEntry) => void): () => void;
}

declare global {
  interface Window {
    dtyp?: ElectronAPI;
  }
}
