import { ipcMain, BrowserWindow } from "electron";
import {
  SessionCreateInput,
  SessionUpdateInput,
  TypingOptions,
  AppConfig,
  AppStatus,
} from "@dtyp/types";
import { SessionManager } from "@dtyp/session-engine";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { FileStorageService } from "@dtyp/storage";
import { defaultLogger } from "@dtyp/utilities";
import { WindowsBridgeService } from "./windows/windows-typing-target.js";
import { ElectronHotkeyManager } from "./windows/hotkey.js";

export function registerIpcHandlers(
  getMainWindow: () => BrowserWindow | null,
  sessionManager: SessionManager,
  typingEngine: DefaultTypingEngine,
  storage: FileStorageService,
  bridge: WindowsBridgeService,
  hotkey: ElectronHotkeyManager
): void {
  const logger = defaultLogger.child("IPC");

  // Helper to send events to renderer
  const sendToWindow = (channel: string, data: any) => {
    const win = getMainWindow();
    if (win && !win.isDestroyed()) {
      win.webContents.send(channel, data);
    }
  };

  // Wire core events to IPC renderer
  sessionManager.on("sessionChanged", (session) => {
    sendToWindow("session:stateChanged", session);
  });

  typingEngine.on("progress", (data) => {
    sendToWindow("typing:progress", data);
  });

  typingEngine.on("complete", (stats) => {
    sendToWindow("typing:completed", stats);
  });

  typingEngine.on("error", (err) => {
    sendToWindow("typing:error", err.message);
  });

  defaultLogger.subscribe((entry) => {
    sendToWindow("log:entry", entry);
  });

  // Sessions
  ipcMain.handle("session:create", async (_, input: SessionCreateInput) => {
    logger.info(`IPC: session:create "${input.name}"`);
    return sessionManager.createSession(input);
  });

  ipcMain.handle("session:update", async (_, id: string, input: SessionUpdateInput) => {
    logger.info(`IPC: session:update "${id}"`);
    return sessionManager.updateSession(id, input);
  });

  ipcMain.handle("session:activate", async (_, id: string) => {
    logger.info(`IPC: session:activate "${id}"`);
    return sessionManager.activateSession(id);
  });

  ipcMain.handle("session:deactivate", async (_, id: string) => {
    logger.info(`IPC: session:deactivate "${id}"`);
    return sessionManager.deactivateSession(id);
  });

  ipcMain.handle("session:terminate", async (_, id: string) => {
    logger.info(`IPC: session:terminate "${id}"`);
    return sessionManager.terminateSession(id);
  });

  ipcMain.handle("session:list", async () => {
    return sessionManager.listSessions();
  });

  ipcMain.handle("session:get", async (_, id: string) => {
    return storage.getSession(id);
  });

  ipcMain.handle("session:delete", async (_, id: string) => {
    logger.info(`IPC: session:delete "${id}"`);
    return sessionManager.deleteSession(id);
  });

  ipcMain.handle("session:renew", async (_, id: string) => {
    logger.info(`IPC: session:renew "${id}"`);
    return sessionManager.renewSession(id);
  });

  // Typing
  ipcMain.handle("typing:start", async (_, text: string, options?: Partial<TypingOptions>) => {
    logger.info(`IPC: typing:start (${text.length} chars)`);
    const config = await storage.getConfig();
    const opts: TypingOptions = {
      delayMs: options?.delayMs ?? config.defaultTypingDelayMs,
      mode: "character",
      preserveNewlines: options?.preserveNewlines ?? true,
      preserveTabs: options?.preserveTabs ?? true,
    };
    // Non-blocking start
    typingEngine.start(text, opts).catch((err) => {
      logger.error(`Typing error: ${err.message}`);
    });
  });

  ipcMain.handle("typing:pause", async () => {
    logger.info("IPC: typing:pause");
    typingEngine.pause();
  });

  ipcMain.handle("typing:resume", async () => {
    logger.info("IPC: typing:resume");
    typingEngine.resume();
  });

  ipcMain.handle("typing:cancel", async () => {
    logger.info("IPC: typing:cancel");
    typingEngine.cancel();
  });

  ipcMain.handle("typing:status", async () => {
    return {
      state: typingEngine.getState(),
      statistics: typingEngine.getStatistics(),
    };
  });

  // Targets
  ipcMain.handle("target:list", async () => {
    return bridge.listWindows();
  });

  ipcMain.handle("target:test-focus", async (_, handle: string) => {
    return bridge.focusWindow(handle);
  });

  // App & Config
  ipcMain.handle("app:getStatus", async (): Promise<AppStatus> => {
    const activeSess = await sessionManager.getActiveSession();
    return {
      activeSessionId: activeSess?.id,
      isHotkeyRegistered: hotkey.isRegistered(),
      typingState: typingEngine.getState(),
      activeTargetWindow: activeSess?.mappings[0]?.output.windowTitle,
      uptimeSeconds: Math.floor(process.uptime()),
    };
  });

  ipcMain.handle("app:getConfig", async () => {
    return storage.getConfig();
  });

  ipcMain.handle("app:updateConfig", async (_, update: Partial<AppConfig>) => {
    logger.info("IPC: app:updateConfig");
    const updated = await storage.saveConfig(update);
    if (update.globalShortcut) {
      hotkey.setShortcut(update.globalShortcut);
    }
    return updated;
  });

  ipcMain.handle("app:getLogs", async () => {
    return defaultLogger.getHistory();
  });
}
