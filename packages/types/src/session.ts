import { TypingOptions } from "./typing.js";

export type SessionState = "created" | "inactive" | "active" | "typing" | "terminated";

export interface FileInputSource {
  type: "file";
  path: string;
  encoding?: string;
}

export interface TextInputSource {
  type: "text";
  content: string;
}

export type InputSource = FileInputSource | TextInputSource;

export interface OutputTarget {
  processName?: string;
  executablePath?: string;
  windowTitle?: string;
  windowHandle?: string;
  applicationName?: string;
}

export interface WindowInfo {
  handle: string;
  title: string;
  processName: string;
  executablePath?: string;
}

export interface Mapping {
  id: string;
  name?: string;
  input: InputSource;
  output: OutputTarget;
  active?: boolean;
}

export interface TypingConfiguration extends TypingOptions {
  jitterMs?: number;
}

export interface Session {
  id: string;
  name: string;
  state: SessionState;
  mappings: Mapping[];
  activeMappingId?: string;
  typing: TypingConfiguration;
  createdAt: string;
  updatedAt: string;
}

export interface SessionCreateInput {
  name: string;
  mappings?: Mapping[];
  activeMappingId?: string;
  typing?: Partial<TypingConfiguration>;
}

export interface SessionUpdateInput {
  name?: string;
  mappings?: Mapping[];
  activeMappingId?: string;
  typing?: Partial<TypingConfiguration>;
  state?: SessionState;
}

export interface AppConfig {
  defaultTypingDelayMs: number;
  minimizeToTray: boolean;
  startWithWindows: boolean;
  showNotifications: boolean;
  logLevel: "debug" | "info" | "warn" | "error";
  globalShortcut: string;
}
