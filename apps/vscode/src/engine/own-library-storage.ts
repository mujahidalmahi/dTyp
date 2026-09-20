import * as vscode from "vscode";
import * as fs from "node:fs";
import * as path from "node:path";
import { Component, ComponentType } from "@dtyp/types";

export interface OwnComponentInput {
  subDomain?: string;
  topic?: string;
  subTopic?: string;
  name?: string;
  type?: ComponentType;
  signature?: string;
  description?: string;
  tags?: string[] | string;
  aliases?: string[] | string;
  code: string; // Only code is required
}

export interface OwnComponent {
  id: string;
  category: "Own Library";
  subDomain: string;
  topic: string;
  subTopic: string;
  name: string;
  type: ComponentType;
  signature: string;
  description: string;
  tags: string[];
  aliases: string[];
  code: string;
  createdAt: number;
  updatedAt: number;
  isCustom: true;
}

export class OwnLibraryStorage {
  private static readonly STORAGE_FILENAME = "own-library.json";
  private static readonly GLOBAL_STATE_BACKUP_KEY = "dtyp.ownLibrary.backup";

  private items: Map<string, OwnComponent> = new Map();
  private filePath: string | null = null;
  private readonly _onDidChange = new vscode.EventEmitter<void>();
  public readonly onDidChange: vscode.Event<void> = this._onDidChange.event;

  constructor(private readonly context: vscode.ExtensionContext) {
    this.initFilePath();
    this.load();
  }

  private initFilePath(): void {
    try {
      const storageDir = this.context.globalStorageUri?.fsPath;
      if (storageDir) {
        if (!fs.existsSync(storageDir)) {
          fs.mkdirSync(storageDir, { recursive: true });
        }
        this.filePath = path.join(storageDir, OwnLibraryStorage.STORAGE_FILENAME);
      }
    } catch {
      this.filePath = null;
    }
  }

  public load(): void {
    this.items.clear();

    // 1. Try loading from file
    if (this.filePath && fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        const list: OwnComponent[] = JSON.parse(raw);
        if (Array.isArray(list)) {
          for (const item of list) {
            if (item && item.id && item.code) {
              if (!item.topic) item.topic = "General";
              this.items.set(item.id, item);
            }
          }
          return;
        }
      } catch {
        // Fallback to globalState backup
      }
    }

    // 2. Fallback to globalState
    try {
      const backup = this.context.globalState.get<OwnComponent[]>(
        OwnLibraryStorage.GLOBAL_STATE_BACKUP_KEY,
        []
      );
      if (Array.isArray(backup)) {
        for (const item of backup) {
          if (item && item.id && item.code) {
            if (!item.topic) item.topic = "General";
            this.items.set(item.id, item);
          }
        }
      }
    } catch {
      // Empty
    }
  }

  public async save(): Promise<void> {
    const list = Array.from(this.items.values());

    // 1. Save to globalState
    try {
      await this.context.globalState.update(OwnLibraryStorage.GLOBAL_STATE_BACKUP_KEY, list);
    } catch {
      // Ignore
    }

    // 2. Save to file
    if (this.filePath) {
      try {
        fs.writeFileSync(this.filePath, JSON.stringify(list, null, 2), "utf-8");
      } catch {
        // Ignore
      }
    }

    this._onDidChange.fire();
  }

  /**
   * Automatically infer a component name from C code if not provided
   */
  public inferNameFromCode(code: string): string {
    const trimmed = code.trim();
    // Check function definition: e.g. int solve(void) or void *my_alloc(...)
    const fnMatch = trimmed.match(/(?:[a-zA-Z_][a-zA-Z0-9_*]*\s+)+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\)\s*\{/);
    if (fnMatch && fnMatch[1]) {
      return fnMatch[1];
    }
    // Check struct definition: e.g. struct Node or typedef struct ... MyStruct;
    const structMatch = trimmed.match(/(?:typedef\s+)?struct\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
    if (structMatch && structMatch[1]) {
      return structMatch[1];
    }
    // Check #define MACRO
    const macroMatch = trimmed.match(/#define\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
    if (macroMatch && macroMatch[1]) {
      return macroMatch[1];
    }
    return `Custom Component #${this.items.size + 1}`;
  }

  private normalizeArray(val?: string[] | string): string[] {
    if (!val) return [];
    if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
    return val.split(",").map((s) => s.trim()).filter(Boolean);
  }

  public async create(input: OwnComponentInput): Promise<OwnComponent> {
    if (!input.code || typeof input.code !== "string" || !input.code.trim()) {
      throw new Error("Code content is required for custom components.");
    }

    const now = Date.now();
    const id = `own_${now}_${Math.random().toString(36).substring(2, 7)}`;
    const subDomain = (input.subDomain && input.subDomain.trim()) ? input.subDomain.trim() : "General";
    const topic = (input.topic && input.topic.trim()) ? input.topic.trim() : "Algorithms";
    const subTopic = (input.subTopic && input.subTopic.trim()) ? input.subTopic.trim() : "Custom";
    const name = (input.name && input.name.trim()) ? input.name.trim() : this.inferNameFromCode(input.code);
    const type: ComponentType = input.type || "snippet";
    const signature = (input.signature && input.signature.trim()) ? input.signature.trim() : `${type} ${name}`;
    const description = (input.description && input.description.trim()) ? input.description.trim() : `User custom component: ${name}`;

    const component: OwnComponent = {
      id,
      category: "Own Library",
      subDomain,
      topic,
      subTopic,
      name,
      type,
      signature,
      description,
      tags: this.normalizeArray(input.tags),
      aliases: this.normalizeArray(input.aliases),
      code: input.code,
      createdAt: now,
      updatedAt: now,
      isCustom: true,
    };

    this.items.set(id, component);
    await this.save();
    return component;
  }

  public async update(id: string, input: Partial<OwnComponentInput>): Promise<OwnComponent | null> {
    const existing = this.items.get(id);
    if (!existing) return null;

    if (input.code !== undefined && (!input.code || !input.code.trim())) {
      throw new Error("Code content cannot be empty.");
    }

    const updated: OwnComponent = {
      ...existing,
      subDomain: input.subDomain !== undefined && input.subDomain.trim() ? input.subDomain.trim() : existing.subDomain,
      topic: input.topic !== undefined && input.topic.trim() ? input.topic.trim() : existing.topic,
      subTopic: input.subTopic !== undefined && input.subTopic.trim() ? input.subTopic.trim() : existing.subTopic,
      name: input.name !== undefined && input.name.trim() ? input.name.trim() : existing.name,
      type: input.type !== undefined ? input.type : existing.type,
      signature: input.signature !== undefined ? input.signature.trim() : existing.signature,
      description: input.description !== undefined ? input.description.trim() : existing.description,
      tags: input.tags !== undefined ? this.normalizeArray(input.tags) : existing.tags,
      aliases: input.aliases !== undefined ? this.normalizeArray(input.aliases) : existing.aliases,
      code: input.code !== undefined ? input.code : existing.code,
      updatedAt: Date.now(),
    };

    this.items.set(id, updated);
    await this.save();
    return updated;
  }

  public async delete(id: string): Promise<boolean> {
    const existed = this.items.delete(id);
    if (existed) {
      await this.save();
      return true;
    }
    return false;
  }

  public getById(id: string): OwnComponent | undefined {
    return this.items.get(id);
  }

  public getAll(): OwnComponent[] {
    return Array.from(this.items.values());
  }

  public getCount(): number {
    return this.items.size;
  }

  public getSubDomains(): string[] {
    const set = new Set<string>();
    for (const item of this.items.values()) {
      set.add(item.subDomain);
    }
    return Array.from(set).sort();
  }

  public getTopics(subDomain?: string): string[] {
    const set = new Set<string>();
    for (const item of this.items.values()) {
      if (!subDomain || item.subDomain.toLowerCase() === subDomain.toLowerCase()) {
        set.add(item.topic || "General");
      }
    }
    return Array.from(set).sort();
  }

  public getSubTopics(subDomain?: string, topic?: string): string[] {
    const set = new Set<string>();
    for (const item of this.items.values()) {
      const matchDomain = !subDomain || item.subDomain.toLowerCase() === subDomain.toLowerCase();
      const matchTopic = !topic || (item.topic || "General").toLowerCase() === topic.toLowerCase();
      if (matchDomain && matchTopic) {
        set.add(item.subTopic);
      }
    }
    return Array.from(set).sort();
  }

  public getByHierarchy(subDomain: string, topic: string, subTopic: string): OwnComponent[] {
    return this.getAll().filter(
      (c) =>
        c.subDomain.toLowerCase() === subDomain.toLowerCase() &&
        (c.topic || "General").toLowerCase() === topic.toLowerCase() &&
        c.subTopic.toLowerCase() === subTopic.toLowerCase()
    );
  }

  public getBySubDomainAndTopic(subDomain: string, subTopic: string): OwnComponent[] {
    return this.getAll().filter(
      (c) =>
        c.subDomain.toLowerCase() === subDomain.toLowerCase() &&
        (c.subTopic.toLowerCase() === subTopic.toLowerCase() || (c.topic || "").toLowerCase() === subTopic.toLowerCase())
    );
  }

  public exportToJson(): string {
    return JSON.stringify(this.getAll(), null, 2);
  }

  public async importFromJson(jsonStr: string): Promise<{ imported: number; updated: number; failed: number }> {
    let list: any[];
    try {
      list = JSON.parse(jsonStr);
      if (!Array.isArray(list)) {
        throw new Error("Invalid format: expected array of components.");
      }
    } catch (e: any) {
      throw new Error(`JSON parsing failed: ${e.message}`);
    }

    let imported = 0;
    let updated = 0;
    let failed = 0;

    for (const raw of list) {
      if (!raw || typeof raw !== "object" || !raw.code || typeof raw.code !== "string") {
        failed++;
        continue;
      }

      const id = typeof raw.id === "string" && raw.id.trim() ? raw.id.trim() : `own_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const subDomain = typeof raw.subDomain === "string" && raw.subDomain.trim() ? raw.subDomain.trim() : "General";
      const topic = typeof raw.topic === "string" && raw.topic.trim() ? raw.topic.trim() : "Algorithms";
      const subTopic = typeof raw.subTopic === "string" && raw.subTopic.trim() ? raw.subTopic.trim() : "Custom";
      const name = typeof raw.name === "string" && raw.name.trim() ? raw.name.trim() : this.inferNameFromCode(raw.code);
      const type: ComponentType = raw.type || "snippet";
      const signature = typeof raw.signature === "string" && raw.signature.trim() ? raw.signature.trim() : `${type} ${name}`;
      const description = typeof raw.description === "string" && raw.description.trim() ? raw.description.trim() : `User custom component: ${name}`;

      const item: OwnComponent = {
        id,
        category: "Own Library",
        subDomain,
        topic,
        subTopic,
        name,
        type,
        signature,
        description,
        tags: this.normalizeArray(raw.tags),
        aliases: this.normalizeArray(raw.aliases),
        code: raw.code,
        createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
        updatedAt: Date.now(),
        isCustom: true,
      };

      if (this.items.has(id)) {
        updated++;
      } else {
        imported++;
      }
      this.items.set(id, item);
    }

    await this.save();
    return { imported, updated, failed };
  }

  /**
   * Find an own component by exact name match (case-insensitive)
   */
  public findByName(name: string): OwnComponent | undefined {
    const lowerName = name.toLowerCase();
    for (const item of this.items.values()) {
      if (item.name.toLowerCase() === lowerName) {
        return item;
      }
    }
    return undefined;
  }

  /**
   * Convert OwnComponent to standard dTyp Component interface
   */
  public toComponent(own: OwnComponent): Component {
    return {
      id: own.id,
      name: own.name,
      language: "c",
      type: own.type,
      categoryId: `own-${own.subDomain.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      category: "Own Library",
      subcategory: own.subDomain,
      path: `Own Library / ${own.subDomain} / ${own.topic || "General"} / ${own.subTopic} / ${own.name}`,
      description: own.description,
      signature: own.signature,
      code: own.code,
      complexity: { time: "User defined", space: "User defined" },
      dependencies: [],
      tags: own.tags,
      aliases: own.aliases,
      version: "1.0.0",
      isCustom: true,
    };
  }

  public getAllAsComponents(): Component[] {
    return this.getAll().map((c) => this.toComponent(c));
  }
}
