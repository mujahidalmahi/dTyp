import { app, BrowserWindow } from "electron";
import * as path from "node:path";
import * as fs from "node:fs";
import { FileStorageService } from "@dtyp/storage";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { SessionManager } from "@dtyp/session-engine";
import { defaultLogger } from "@dtyp/utilities";
import { WindowsBridgeService, WindowsTypingTarget } from "./windows/windows-typing-target.js";
import { ElectronHotkeyManager } from "./windows/hotkey.js";
import { registerIpcHandlers } from "./ipc.js";
import { DTypTray } from "./tray.js";

const logger = defaultLogger.child("MainProcess");

let mainWindow: BrowserWindow | null = null;
let storage: FileStorageService;
let bridge: WindowsBridgeService;
let typingTarget: WindowsTypingTarget;
let typingEngine: DefaultTypingEngine;
let hotkeyManager: ElectronHotkeyManager;
let sessionManager: SessionManager;
let tray: DTypTray;
let isQuitting = false;

async function createWindow(): Promise<BrowserWindow> {
  const preloadPath = path.join(__dirname, "preload.js");

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 800,
    minHeight: 600,
    title: "dTyp — Don't Tell Your Professor",
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    autoHideMenuBar: true,
  });

  const config = await storage.getConfig();

  mainWindow.on("close", (event) => {
    if (!isQuitting && config.minimizeToTray) {
      event.preventDefault();
      mainWindow?.hide();
      return false;
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Load UI: Check Vite dev server or production index.html
  const devServerUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";
  const distHtml = path.join(__dirname, "../renderer/dist/index.html");

  if (process.env.NODE_ENV === "development" || !fs.existsSync(distHtml)) {
    mainWindow.loadURL(devServerUrl).catch(() => {
      if (fs.existsSync(distHtml)) {
        mainWindow?.loadFile(distHtml);
      }
    });
  } else {
    mainWindow.loadFile(distHtml);
  }

  return mainWindow;
}

async function initializeApp(): Promise<void> {
  logger.info("Initializing dTyp Application...");

  storage = new FileStorageService();
  await storage.initialize();

  bridge = new WindowsBridgeService();
  typingTarget = new WindowsTypingTarget(bridge);
  typingEngine = new DefaultTypingEngine(typingTarget);

  hotkeyManager = new ElectronHotkeyManager(() => {
    sessionManager.handleGlobalShortcut().catch((err) => {
      logger.error(`Error handling global shortcut: ${err.message}`);
    });
  });

  sessionManager = new SessionManager({
    storage,
    hotkeyManager,
    typingEngine,
    windowsService: bridge,
  });

  // When mapping output changes, update target window handle
  sessionManager.on("sessionChanged", (session) => {
    const activeMapping =
      session.mappings.find((m) => m.id === session.activeMappingId) ??
      session.mappings[0];
    if (activeMapping?.output.windowHandle) {
      typingTarget.setTargetHandle(activeMapping.output.windowHandle);
    }
  });

  // Register IPC
  registerIpcHandlers(
    () => mainWindow,
    sessionManager,
    typingEngine,
    storage,
    bridge,
    hotkeyManager
  );

  // Setup System Tray
  tray = new DTypTray(
    () => mainWindow,
    sessionManager,
    () => {
      isQuitting = true;
      app.quit();
    }
  );
  tray.initialize();

  await createWindow();
  logger.info("dTyp Application initialized successfully");
}

app.whenReady().then(initializeApp);

app.on("before-quit", () => {
  isQuitting = true;
});

app.on("will-quit", async (event) => {
  logger.info("Application will quit: starting graceful shutdown");
  event.preventDefault();

  try {
    if (typingEngine?.isTyping()) {
      typingEngine.cancel();
    }
    await bridge?.releaseModifiers();
    hotkeyManager?.cleanup();
    await sessionManager?.shutdown();
    await storage?.close();
    tray?.destroy();
  } catch (err: any) {
    logger.error(`Error during shutdown cleanup: ${err.message}`);
  } finally {
    process.exit(0);
  }
});

app.on("window-all-closed", async () => {
  const config = await storage?.getConfig();
  if (!config?.minimizeToTray) {
    app.quit();
  }
});
