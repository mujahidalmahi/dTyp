import * as path from "node:path";
import * as os from "node:os";
import { Session, AppConfig } from "@dtyp/types";
import { ensureDirectoryExists, safeReadJsonFile, safeWriteJsonFile, defaultLogger } from "@dtyp/utilities";
import { validateSession } from "@dtyp/validation";
import { StorageService } from "./storage.interface.js";

const DEFAULT_CONFIG: AppConfig = {
  defaultTypingDelayMs: 20,
  minimizeToTray: true,
  startWithWindows: false,
  showNotifications: true,
  logLevel: "info",
  globalShortcut: "Ctrl+D",
};

export class FileStorageService implements StorageService {
  private baseDir: string;
  private sessionsFile: string;
  private configFile: string;
  private logger = defaultLogger.child("FileStorage");

  constructor(customBaseDir?: string) {
    if (customBaseDir) {
      this.baseDir = customBaseDir;
    } else {
      const appData = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
      this.baseDir = path.join(appData, "dTyp");
    }
    this.sessionsFile = path.join(this.baseDir, "sessions.json");
    this.configFile = path.join(this.baseDir, "config.json");
  }

  public async initialize(): Promise<void> {
    ensureDirectoryExists(this.baseDir);
    ensureDirectoryExists(path.join(this.baseDir, "logs"));

    if (!safeReadJsonFile<Session[] | null>(this.sessionsFile, null)) {
      safeWriteJsonFile<Session[]>(this.sessionsFile, []);
    }
    if (!safeReadJsonFile<AppConfig | null>(this.configFile, null)) {
      safeWriteJsonFile<AppConfig>(this.configFile, DEFAULT_CONFIG);
    }
    this.logger.info(`Storage initialized at ${this.baseDir}`);
  }

  public async close(): Promise<void> {
    this.logger.info("Storage service closed");
  }

  public async saveSession(session: Session): Promise<void> {
    const validation = validateSession(session);
    if (!validation.valid) {
      throw new Error(`Cannot save invalid session: ${validation.errors.join(", ")}`);
    }

    const sessions = await this.getAllSessions();
    const index = sessions.findIndex((s) => s.id === session.id);
    if (index >= 0) {
      sessions[index] = { ...session, updatedAt: new Date().toISOString() };
    } else {
      sessions.push(session);
    }

    safeWriteJsonFile<Session[]>(this.sessionsFile, sessions);
    this.logger.debug(`Saved session ${session.id} (${session.name})`);
  }

  public async getSession(id: string): Promise<Session | null> {
    const sessions = await this.getAllSessions();
    return sessions.find((s) => s.id === id) ?? null;
  }

  public async getAllSessions(): Promise<Session[]> {
    return safeReadJsonFile<Session[]>(this.sessionsFile, []);
  }

  public async deleteSession(id: string): Promise<boolean> {
    const sessions = await this.getAllSessions();
    const filtered = sessions.filter((s) => s.id !== id);
    if (filtered.length !== sessions.length) {
      safeWriteJsonFile<Session[]>(this.sessionsFile, filtered);
      this.logger.info(`Deleted session ${id}`);
      return true;
    }
    return false;
  }

  public async getConfig(): Promise<AppConfig> {
    const saved = safeReadJsonFile<Partial<AppConfig>>(this.configFile, {});
    return { ...DEFAULT_CONFIG, ...saved };
  }

  public async saveConfig(config: Partial<AppConfig>): Promise<AppConfig> {
    const current = await this.getConfig();
    const updated: AppConfig = { ...current, ...config };
    safeWriteJsonFile<AppConfig>(this.configFile, updated);
    this.logger.info("Updated app configuration");
    return updated;
  }
}
