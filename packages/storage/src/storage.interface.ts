import { Session, AppConfig } from "@dtyp/types";

export interface StorageService {
  // Sessions
  saveSession(session: Session): Promise<void>;
  getSession(id: string): Promise<Session | null>;
  getAllSessions(): Promise<Session[]>;
  deleteSession(id: string): Promise<boolean>;

  // App Config
  getConfig(): Promise<AppConfig>;
  saveConfig(config: Partial<AppConfig>): Promise<AppConfig>;

  // Lifecycle
  initialize(): Promise<void>;
  close(): Promise<void>;
}
