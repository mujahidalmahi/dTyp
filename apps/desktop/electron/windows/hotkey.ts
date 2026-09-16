import { globalShortcut } from "electron";
import { GlobalHotkeyManager } from "@dtyp/session-engine";
import { defaultLogger } from "@dtyp/utilities";

export class ElectronHotkeyManager implements GlobalHotkeyManager {
  private registered = false;
  private keyCombo = "CommandOrControl+D";
  private onTriggerCallback: () => void;
  private logger = defaultLogger.child("HotkeyManager");

  constructor(onTrigger: () => void, customCombo?: string) {
    this.onTriggerCallback = onTrigger;
    if (customCombo) this.keyCombo = customCombo;
  }

  public setShortcut(combo: string): void {
    const wasRegistered = this.registered;
    if (wasRegistered) {
      this.unregister();
    }
    this.keyCombo = combo;
    if (wasRegistered) {
      this.register();
    }
  }

  public async register(): Promise<void> {
    if (this.registered) {
      this.logger.debug(`Hotkey "${this.keyCombo}" is already registered`);
      return;
    }

    const success = globalShortcut.register(this.keyCombo, () => {
      this.logger.info(`Global hotkey "${this.keyCombo}" triggered`);
      try {
        this.onTriggerCallback();
      } catch (err: any) {
        this.logger.error(`Error in hotkey callback: ${err.message}`);
      }
    });

    if (!success) {
      this.logger.error(`Failed to register global hotkey "${this.keyCombo}"`);
      throw new Error(`Failed to register global shortcut "${this.keyCombo}". It may be in use by another application.`);
    }

    this.registered = true;
    this.logger.info(`Successfully registered global hotkey "${this.keyCombo}"`);
  }

  public async unregister(): Promise<void> {
    if (!this.registered) return;

    try {
      globalShortcut.unregister(this.keyCombo);
      this.registered = false;
      this.logger.info(`Unregistered global hotkey "${this.keyCombo}"`);
    } catch (err: any) {
      this.logger.error(`Error unregistering hotkey: ${err.message}`);
    }
  }

  public isRegistered(): boolean {
    return this.registered && globalShortcut.isRegistered(this.keyCombo);
  }

  public cleanup(): void {
    this.unregister();
    globalShortcut.unregisterAll();
  }
}
