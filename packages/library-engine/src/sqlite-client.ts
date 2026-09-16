import initSqlJs, { Database, SqlJsStatic } from "sql.js";
import * as fs from "node:fs";
import { defaultLogger } from "@dtyp/utilities";

export class SqliteClient {
  private db: Database | null = null;
  private SQL: SqlJsStatic | null = null;
  private logger = defaultLogger.child("SqliteClient");

  public async initialize(dbFilePath?: string): Promise<void> {
    if (this.db) return;

    this.SQL = await initSqlJs();
    if (dbFilePath && fs.existsSync(dbFilePath)) {
      const fileBuffer = fs.readFileSync(dbFilePath);
      this.db = new this.SQL.Database(fileBuffer);
      this.logger.info(`Loaded SQLite database from ${dbFilePath} (${fileBuffer.length} bytes)`);
    } else {
      this.db = new this.SQL.Database();
      this.logger.info("Initialized in-memory SQLite database");
    }
  }

  public getDatabase(): Database {
    if (!this.db) {
      throw new Error("Database has not been initialized. Call initialize() first.");
    }
    return this.db;
  }

  public exec(sql: string): any[] {
    const db = this.getDatabase();
    return db.exec(sql);
  }

  public query<T = any>(sql: string, params: any[] = []): T[] {
    const db = this.getDatabase();
    const stmt = db.prepare(sql);
    const results: T[] = [];

    try {
      stmt.bind(params);
      while (stmt.step()) {
        const row = stmt.getAsObject() as T;
        results.push(row);
      }
    } finally {
      stmt.free();
    }

    return results;
  }

  public queryOne<T = any>(sql: string, params: any[] = []): T | null {
    const rows = this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  public saveToFile(filePath: string): void {
    const db = this.getDatabase();
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(filePath, buffer);
    this.logger.info(`Saved SQLite database to ${filePath} (${buffer.length} bytes)`);
  }

  public close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.logger.info("SQLite database connection closed");
    }
  }
}
