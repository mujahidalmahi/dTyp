import {
  Session,
  SessionState,
  SessionCreateInput,
  SessionUpdateInput,
  Mapping,
  WindowInfo,
  TypingEngine,
} from "@dtyp/types";
import { defaultLogger, EventEmitter, safeReadTextFile } from "@dtyp/utilities";
import { StorageService } from "@dtyp/storage";
import { TargetRecovery } from "./target-recovery.js";

export interface GlobalHotkeyManager {
  register(): Promise<void>;
  unregister(): Promise<void>;
  isRegistered(): boolean;
}

export interface WindowsAutomationService {
  listWindows(): Promise<WindowInfo[]>;
  focusWindow(handle: string): Promise<boolean>;
}

export interface SessionManagerEvents {
  sessionChanged: Session;
  sessionTerminated: string;
  hotkeyStateChanged: boolean;
  error: Error;
}

export class SessionManager {
  private activeSessionId: string | null = null;
  private hotkeyManager: GlobalHotkeyManager;
  private storage: StorageService;
  private typingEngine: TypingEngine;
  private windowsService?: WindowsAutomationService;
  private targetRecovery = new TargetRecovery();
  private events = new EventEmitter<SessionManagerEvents>();
  private logger = defaultLogger.child("SessionManager");

  constructor(options: {
    storage: StorageService;
    hotkeyManager: GlobalHotkeyManager;
    typingEngine: TypingEngine;
    windowsService?: WindowsAutomationService;
  }) {
    this.storage = options.storage;
    this.hotkeyManager = options.hotkeyManager;
    this.typingEngine = options.typingEngine;
    this.windowsService = options.windowsService;
  }

  public on<K extends keyof SessionManagerEvents>(
    event: K,
    listener: (data: SessionManagerEvents[K]) => void
  ): () => void {
    return this.events.on(event, listener);
  }

  public async createSession(input: SessionCreateInput): Promise<Session> {
    const config = await this.storage.getConfig();
    const id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const session: Session = {
      id,
      name: input.name,
      state: "inactive",
      mappings: input.mappings ?? [],
      activeMappingId: input.activeMappingId ?? input.mappings?.[0]?.id,
      typing: {
        delayMs: input.typing?.delayMs ?? config.defaultTypingDelayMs,
        mode: "character",
        preserveNewlines: input.typing?.preserveNewlines ?? true,
        preserveTabs: input.typing?.preserveTabs ?? true,
        jitterMs: input.typing?.jitterMs ?? 0,
      },
      createdAt: now,
      updatedAt: now,
    };

    await this.storage.saveSession(session);
    this.logger.info(`Created session "${session.name}" [${session.id}]`);
    return session;
  }

  public async activateSession(id: string): Promise<Session> {
    const session = await this.storage.getSession(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }

    if (this.activeSessionId && this.activeSessionId !== id) {
      // Deactivate previously active session
      await this.deactivateSession(this.activeSessionId);
    }

    session.state = "active";
    await this.storage.saveSession(session);
    this.activeSessionId = id;

    // Register global hotkey
    try {
      await this.hotkeyManager.register();
      this.logger.info(`Session "${session.name}" activated, Ctrl+D registered`);
      this.events.emit("hotkeyStateChanged", true);
    } catch (err: any) {
      this.logger.error(`Failed to register global hotkey: ${err.message}`);
      session.state = "inactive";
      await this.storage.saveSession(session);
      this.activeSessionId = null;
      throw err;
    }

    this.events.emit("sessionChanged", session);
    return session;
  }

  public async deactivateSession(id: string): Promise<Session> {
    const session = await this.storage.getSession(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }

    if (this.activeSessionId === id) {
      this.activeSessionId = null;
      await this.hotkeyManager.unregister();
      this.logger.info(`Session "${session.name}" deactivated, Ctrl+D unregistered`);
      this.events.emit("hotkeyStateChanged", false);
    }

    if (this.typingEngine.isTyping()) {
      this.typingEngine.cancel();
    }

    session.state = "inactive";
    await this.storage.saveSession(session);
    this.events.emit("sessionChanged", session);
    return session;
  }

  public async terminateSession(id: string): Promise<Session> {
    const session = await this.storage.getSession(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }

    if (this.typingEngine.isTyping()) {
      this.typingEngine.cancel();
    }

    if (this.activeSessionId === id) {
      this.activeSessionId = null;
      await this.hotkeyManager.unregister();
      this.logger.info(`Session "${session.name}" terminated, Ctrl+D released`);
      this.events.emit("hotkeyStateChanged", false);
    }

    session.state = "terminated";
    await this.storage.saveSession(session);
    this.events.emit("sessionTerminated", id);
    this.events.emit("sessionChanged", session);
    return session;
  }

  public async renewSession(id: string): Promise<Session> {
    const session = await this.storage.getSession(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }

    if (this.windowsService && session.mappings.length > 0) {
      const windows = await this.windowsService.listWindows();
      for (const mapping of session.mappings) {
        const res = await this.targetRecovery.resolveTarget(mapping.output, windows);
        if (res.resolved) {
          mapping.output.windowHandle = res.resolved.handle;
          mapping.output.windowTitle = res.resolved.title;
          mapping.output.processName = res.resolved.processName;
          mapping.output.executablePath = res.resolved.executablePath;
          this.logger.info(`Target recovered for mapping ${mapping.id} using strategy: ${res.strategy}`);
        } else {
          this.logger.warn(`Could not automatically recover target for mapping ${mapping.id}`);
        }
      }
    }

    return this.activateSession(id);
  }

  public async handleGlobalShortcut(): Promise<void> {
    this.logger.info("Global shortcut Ctrl+D triggered");
    if (!this.activeSessionId) {
      this.logger.warn("Ctrl+D received but no session is active");
      return;
    }

    const session = await this.storage.getSession(this.activeSessionId);
    if (!session || session.state !== "active") {
      this.logger.warn("Active session invalid or not in active state");
      return;
    }

    // Determine mapping to run
    const mapping: Mapping | undefined =
      session.mappings.find((m: Mapping) => m.id === session.activeMappingId) ??
      session.mappings[0];

    if (!mapping) {
      const err = new Error("Active session has no configured mappings");
      this.logger.error(err.message);
      this.events.emit("error", err);
      return;
    }

    // Retrieve content
    let contentToType = "";
    try {
      if (mapping.input.type === "file") {
        contentToType = safeReadTextFile(mapping.input.path);
      } else {
        contentToType = mapping.input.content;
      }
    } catch (err: any) {
      const readErr = new Error(`Failed to read input source: ${err.message}`);
      this.logger.error(readErr.message);
      this.events.emit("error", readErr);
      return;
    }

    // Focus target window if handle exists
    if (mapping.output.windowHandle && this.windowsService) {
      const focused = await this.windowsService.focusWindow(mapping.output.windowHandle);
      if (!focused) {
        this.logger.warn(`Failed to focus target window ${mapping.output.windowHandle}`);
      }
    }

    // Start typing
    session.state = "typing";
    await this.storage.saveSession(session);
    this.events.emit("sessionChanged", session);

    try {
      await this.typingEngine.start(contentToType, session.typing);
    } catch (err: any) {
      this.logger.error(`Typing failed: ${err.message}`);
    } finally {
      // Revert state back to active
      const refreshed = await this.storage.getSession(session.id);
      if (refreshed && refreshed.state === "typing") {
        refreshed.state = "active";
        await this.storage.saveSession(refreshed);
        this.events.emit("sessionChanged", refreshed);
      }
    }
  }

  public getActiveSessionId(): string | null {
    return this.activeSessionId;
  }

  public async getActiveSession(): Promise<Session | null> {
    if (!this.activeSessionId) return null;
    return this.storage.getSession(this.activeSessionId);
  }

  public async updateSession(id: string, input: SessionUpdateInput): Promise<Session> {
    const session = await this.storage.getSession(id);
    if (!session) throw new Error(`Session ${id} not found`);

    if (input.name !== undefined) session.name = input.name;
    if (input.mappings !== undefined) session.mappings = input.mappings;
    if (input.activeMappingId !== undefined) session.activeMappingId = input.activeMappingId;
    if (input.typing !== undefined) {
      session.typing = { ...session.typing, ...input.typing };
    }
    if (input.state !== undefined) session.state = input.state;

    await this.storage.saveSession(session);
    this.events.emit("sessionChanged", session);
    return session;
  }

  public async listSessions(): Promise<Session[]> {
    return this.storage.getAllSessions();
  }

  public async deleteSession(id: string): Promise<boolean> {
    if (this.activeSessionId === id) {
      await this.deactivateSession(id);
    }
    const res = await this.storage.deleteSession(id);
    return res;
  }

  public async shutdown(): Promise<void> {
    this.logger.info("Session manager shutting down");
    if (this.typingEngine.isTyping()) {
      this.typingEngine.cancel();
    }
    if (this.hotkeyManager.isRegistered()) {
      await this.hotkeyManager.unregister();
    }
    this.activeSessionId = null;
  }
}
