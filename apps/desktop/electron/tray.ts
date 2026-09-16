import { Tray, Menu, nativeImage, BrowserWindow, app } from "electron";
import * as path from "node:path";
import { SessionManager } from "@dtyp/session-engine";
import { defaultLogger } from "@dtyp/utilities";

export class DTypTray {
  private tray: Tray | null = null;
  private logger = defaultLogger.child("Tray");

  constructor(
    private getMainWindow: () => BrowserWindow | null,
    private sessionManager: SessionManager,
    private onQuit: () => void
  ) {}

  public initialize(): void {
    if (this.tray) return;

    // Create 16x16 fallback icon if file doesn't exist
    const icon = nativeImage.createEmpty();
    try {
      this.tray = new Tray(icon);
      this.tray.setToolTip("dTyp — Don't Tell Your Professor");
      this.updateMenu();

      this.tray.on("double-click", () => {
        this.restoreWindow();
      });

      this.sessionManager.on("sessionChanged", () => {
        this.updateMenu();
      });

      this.logger.info("System tray initialized");
    } catch (err: any) {
      this.logger.warn(`Could not initialize system tray: ${err.message}`);
    }
  }

  public async updateMenu(): Promise<void> {
    if (!this.tray) return;

    const activeSession = await this.sessionManager.getActiveSession();
    const sessionLabel = activeSession
      ? `Active: ${activeSession.name}`
      : "No Active Session";

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Open dTyp",
        click: () => this.restoreWindow(),
      },
      { type: "separator" },
      {
        label: sessionLabel,
        enabled: false,
      },
      {
        label: "Terminate Session",
        enabled: Boolean(activeSession),
        click: async () => {
          if (activeSession) {
            await this.sessionManager.terminateSession(activeSession.id);
          }
        },
      },
      { type: "separator" },
      {
        label: "Exit dTyp",
        click: () => this.onQuit(),
      },
    ]);

    this.tray.setContextMenu(contextMenu);
  }

  private restoreWindow(): void {
    const win = this.getMainWindow();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
  }

  public destroy(): void {
    if (this.tray) {
      this.tray.destroy();
      this.tray = null;
    }
  }
}
