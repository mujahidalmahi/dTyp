import { contextBridge, ipcRenderer } from "electron";
import {
  ElectronAPI,
  SessionCreateInput,
  SessionUpdateInput,
  TypingOptions,
  AppConfig,
  Session,
  TypingStatistics,
  LogEntry,
} from "@dtyp/types";

const api: ElectronAPI = {
  // Session
  createSession: (input: SessionCreateInput) => ipcRenderer.invoke("session:create", input),
  updateSession: (id: string, input: SessionUpdateInput) => ipcRenderer.invoke("session:update", id, input),
  activateSession: (id: string) => ipcRenderer.invoke("session:activate", id),
  deactivateSession: (id: string) => ipcRenderer.invoke("session:deactivate", id),
  terminateSession: (id: string) => ipcRenderer.invoke("session:terminate", id),
  listSessions: () => ipcRenderer.invoke("session:list"),
  getSession: (id: string) => ipcRenderer.invoke("session:get", id),
  deleteSession: (id: string) => ipcRenderer.invoke("session:delete", id),
  renewSession: (id: string) => ipcRenderer.invoke("session:renew", id),

  // Typing
  startTyping: (text: string, options?: Partial<TypingOptions>) => ipcRenderer.invoke("typing:start", text, options),
  pauseTyping: () => ipcRenderer.invoke("typing:pause"),
  resumeTyping: () => ipcRenderer.invoke("typing:resume"),
  cancelTyping: () => ipcRenderer.invoke("typing:cancel"),
  getTypingStatus: () => ipcRenderer.invoke("typing:status"),

  // Targets
  listTargets: () => ipcRenderer.invoke("target:list"),
  testTargetFocus: (handle: string) => ipcRenderer.invoke("target:test-focus", handle),

  // App & Settings
  getStatus: () => ipcRenderer.invoke("app:getStatus"),
  getConfig: () => ipcRenderer.invoke("app:getConfig"),
  updateConfig: (config: Partial<AppConfig>) => ipcRenderer.invoke("app:updateConfig", config),
  getLogs: () => ipcRenderer.invoke("app:getLogs"),

  // Event Listeners
  onSessionStateChanged: (callback: (session: Session) => void) => {
    const handler = (_: any, session: Session) => callback(session);
    ipcRenderer.on("session:stateChanged", handler);
    return () => ipcRenderer.removeListener("session:stateChanged", handler);
  },
  onTypingProgress: (callback: (stats: TypingStatistics, char: string) => void) => {
    const handler = (_: any, data: { stats: TypingStatistics; char: string }) => callback(data.stats, data.char);
    ipcRenderer.on("typing:progress", handler);
    return () => ipcRenderer.removeListener("typing:progress", handler);
  },
  onTypingCompleted: (callback: (stats: TypingStatistics) => void) => {
    const handler = (_: any, stats: TypingStatistics) => callback(stats);
    ipcRenderer.on("typing:completed", handler);
    return () => ipcRenderer.removeListener("typing:completed", handler);
  },
  onTypingError: (callback: (error: string) => void) => {
    const handler = (_: any, error: string) => callback(error);
    ipcRenderer.on("typing:error", handler);
    return () => ipcRenderer.removeListener("typing:error", handler);
  },
  onLogEntry: (callback: (entry: LogEntry) => void) => {
    const handler = (_: any, entry: LogEntry) => callback(entry);
    ipcRenderer.on("log:entry", handler);
    return () => ipcRenderer.removeListener("log:entry", handler);
  },
};

contextBridge.exposeInMainWorld("dtyp", api);
