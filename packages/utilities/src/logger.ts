import { LogEntry } from "@dtyp/types";

export type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class Logger {
  private level: LogLevel = "info";
  private history: LogEntry[] = [];
  private maxHistory = 1000;
  private listeners: Array<(entry: LogEntry) => void> = [];

  constructor(private context: string = "dTyp") {}

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  public getLevel(): LogLevel {
    return this.level;
  }

  public subscribe(callback: (entry: LogEntry) => void): () => void {
    this.listeners.push(callback);
    return () => {
      const idx = this.listeners.indexOf(callback);
      if (idx !== -1) this.listeners.splice(idx, 1);
    };
  }

  public getHistory(): LogEntry[] {
    return [...this.history];
  }

  public clearHistory(): void {
    this.history = [];
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (LEVEL_PRIORITY[level] < LEVEL_PRIORITY[this.level]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message: `[${this.context}] ${message}`,
      context,
    };

    this.history.push(entry);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    const formatted = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
    if (level === "error") {
      console.error(formatted, context ?? "");
    } else if (level === "warn") {
      console.warn(formatted, context ?? "");
    } else if (level === "debug") {
      console.debug(formatted, context ?? "");
    } else {
      console.log(formatted, context ?? "");
    }

    for (const listener of this.listeners) {
      try {
        listener(entry);
      } catch (err) {
        console.error("Error in logger listener", err);
      }
    }
  }

  public debug(message: string, context?: Record<string, unknown>): void {
    this.log("debug", message, context);
  }

  public info(message: string, context?: Record<string, unknown>): void {
    this.log("info", message, context);
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    this.log("warn", message, context);
  }

  public error(message: string, context?: Record<string, unknown>): void {
    this.log("error", message, context);
  }

  public child(subContext: string): Logger {
    const childLogger = new Logger(`${this.context}:${subContext}`);
    childLogger.setLevel(this.level);
    childLogger.subscribe((entry) => {
      for (const listener of this.listeners) {
        listener(entry);
      }
    });
    return childLogger;
  }
}

export const defaultLogger = new Logger("dTyp");
