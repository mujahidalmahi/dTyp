import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { SessionManager, GlobalHotkeyManager, WindowsAutomationService } from "@dtyp/session-engine";
import { FileStorageService } from "@dtyp/storage";
import { SqliteClient, DefaultLibraryEngine } from "@dtyp/library-engine";
import { defaultLogger } from "@dtyp/utilities";

export interface DTypCoreOptions {
  storageDir?: string;
  hotkeyManager: GlobalHotkeyManager;
  windowsService?: WindowsAutomationService;
  dbFilePath?: string;
}

export class DTypCore {
  public readonly typingEngine: DefaultTypingEngine;
  public readonly storage: FileStorageService;
  public readonly sessionManager: SessionManager;
  public readonly sqlite: SqliteClient;
  public readonly libraryEngine: DefaultLibraryEngine;
  private logger = defaultLogger.child("Core");

  constructor(options: DTypCoreOptions) {
    this.typingEngine = new DefaultTypingEngine();
    this.storage = new FileStorageService(options.storageDir);
    this.sessionManager = new SessionManager({
      storage: this.storage,
      hotkeyManager: options.hotkeyManager,
      typingEngine: this.typingEngine,
      windowsService: options.windowsService,
    });
    this.sqlite = new SqliteClient();
    this.libraryEngine = new DefaultLibraryEngine(this.sqlite);
  }

  public async initialize(dbFilePath?: string): Promise<void> {
    this.logger.info("Initializing dTyp core system");
    await this.storage.initialize();
    await this.sqlite.initialize(dbFilePath);
  }

  public async shutdown(): Promise<void> {
    this.logger.info("Shutting down dTyp core system");
    await this.sessionManager.shutdown();
    await this.storage.close();
    this.sqlite.close();
  }
}
