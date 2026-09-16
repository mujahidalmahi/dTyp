import * as path from "node:path";
import * as fs from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { TypingTarget, WindowInfo } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";
import { WindowsAutomationService } from "@dtyp/session-engine";

const execFileAsync = promisify(execFile);

export class WindowsBridgeService implements WindowsAutomationService {
  private bridgeExePath: string;
  private logger = defaultLogger.child("WinBridge");

  constructor(customBridgePath?: string) {
    if (customBridgePath) {
      this.bridgeExePath = customBridgePath;
    } else {
      // Look in apps/desktop/windows/dtyp-bridge.exe or resources
      const devPath = path.resolve(process.cwd(), "apps/desktop/windows/dtyp-bridge.exe");
      const prodPath = path.join(__dirname, "../windows/dtyp-bridge.exe");
      this.bridgeExePath = fs.existsSync(devPath) ? devPath : prodPath;
    }
  }

  public async listWindows(): Promise<WindowInfo[]> {
    if (!fs.existsSync(this.bridgeExePath)) {
      this.logger.warn(`Bridge exe not found at ${this.bridgeExePath}, returning empty list`);
      return [];
    }

    try {
      const { stdout } = await execFileAsync(this.bridgeExePath, ["list-windows"], { timeout: 3000 });
      const raw = stdout.trim();
      return JSON.parse(raw) as WindowInfo[];
    } catch (err: any) {
      this.logger.error(`Failed to list windows: ${err.message}`);
      return [];
    }
  }

  public async focusWindow(handle: string): Promise<boolean> {
    if (!fs.existsSync(this.bridgeExePath)) return false;
    try {
      const { stdout } = await execFileAsync(this.bridgeExePath, ["focus", handle], { timeout: 2000 });
      return stdout.trim() === "true";
    } catch (err: any) {
      this.logger.error(`Failed to focus window ${handle}: ${err.message}`);
      return false;
    }
  }

  public async sendCharacter(c: string): Promise<void> {
    if (!fs.existsSync(this.bridgeExePath)) return;
    try {
      await execFileAsync(this.bridgeExePath, ["send-char", c], { timeout: 1000 });
    } catch (err: any) {
      this.logger.error(`Failed to send char "${c}": ${err.message}`);
    }
  }

  public async releaseModifiers(): Promise<void> {
    if (!fs.existsSync(this.bridgeExePath)) return;
    try {
      await execFileAsync(this.bridgeExePath, ["release-modifiers"], { timeout: 1000 });
    } catch (err: any) {
      this.logger.error(`Failed to release modifiers: ${err.message}`);
    }
  }
}

export class WindowsTypingTarget implements TypingTarget {
  private targetHandle?: string;
  private logger = defaultLogger.child("WindowsTypingTarget");

  constructor(private bridge: WindowsBridgeService, targetHandle?: string) {
    this.targetHandle = targetHandle;
  }

  public setTargetHandle(handle: string): void {
    this.targetHandle = handle;
  }

  public async focus(): Promise<void> {
    if (this.targetHandle) {
      this.logger.info(`Focusing target window: ${this.targetHandle}`);
      await this.bridge.focusWindow(this.targetHandle);
    }
  }

  public async typeCharacter(character: string): Promise<void> {
    await this.bridge.sendCharacter(character);
  }

  public async releaseModifiers(): Promise<void> {
    await this.bridge.releaseModifiers();
  }
}
