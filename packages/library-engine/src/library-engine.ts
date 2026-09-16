import { Component, Snippet, Template, LibraryEngine } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";
import { SqliteClient } from "./sqlite-client.js";
import { DependencyResolver } from "./dependency-resolver.js";
import { DuplicateDetector } from "./duplicate-detector.js";

interface ComponentRow {
  id: string;
  name: string;
  language: string;
  category: string;
  subcategory?: string;
  description: string;
  signature: string;
  code: string;
  time_complexity: string;
  space_complexity: string;
  documentation?: string;
  version: string;
}

export class DefaultLibraryEngine implements LibraryEngine {
  private resolver = new DependencyResolver();
  private duplicateDetector = new DuplicateDetector();
  private categoryCache: string[] | null = null;
  private componentCache = new Map<string, Component>();
  private logger = defaultLogger.child("LibraryEngine");

  constructor(private sqlite: SqliteClient) {}

  public getDependencyResolver(): DependencyResolver {
    return this.resolver;
  }

  public getDuplicateDetector(): DuplicateDetector {
    return this.duplicateDetector;
  }

  private mapRowToComponent(row: ComponentRow, dependencies: string[] = [], tags: string[] = []): Component {
    return {
      id: row.id,
      name: row.name,
      language: row.language,
      category: row.category,
      subcategory: row.subcategory,
      description: row.description,
      signature: row.signature,
      code: row.code,
      complexity: {
        time: row.time_complexity,
        space: row.space_complexity,
      },
      documentation: row.documentation,
      version: row.version,
      dependencies,
      tags,
    };
  }

  public async findComponent(id: string): Promise<Component | null> {
    if (this.componentCache.has(id)) {
      return this.componentCache.get(id)!;
    }

    const row = this.sqlite.queryOne<ComponentRow>(
      "SELECT * FROM components WHERE id = ? LIMIT 1",
      [id]
    );

    if (!row) return null;

    // Fetch dependencies
    const depRows = this.sqlite.query<{ dependency_id: string }>(
      "SELECT dependency_id FROM dependencies WHERE component_id = ?",
      [id]
    );
    const dependencies = depRows.map((r) => r.dependency_id);

    // Fetch tags
    const tagRows = this.sqlite.query<{ name: string }>(
      `SELECT t.name FROM tags t
       JOIN component_tags ct ON ct.tag_id = t.id
       WHERE ct.component_id = ?`,
      [id]
    );
    const tags = tagRows.map((r) => r.name);

    const comp = this.mapRowToComponent(row, dependencies, tags);
    this.componentCache.set(id, comp);
    return comp;
  }

  public async search(query: string): Promise<Component[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const pattern = `%${trimmed}%`;
    const rows = this.sqlite.query<ComponentRow>(
      `SELECT * FROM components 
       WHERE id LIKE ? OR name LIKE ? OR category LIKE ? OR subcategory LIKE ? OR description LIKE ?
       ORDER BY 
         CASE WHEN name = ? THEN 1
              WHEN name LIKE ? THEN 2
              ELSE 3 END,
         name ASC
       LIMIT 50`,
      [pattern, pattern, pattern, pattern, pattern, trimmed, `${trimmed}%`]
    );

    return rows.map((row) => this.mapRowToComponent(row));
  }

  public async getByCategory(category: string): Promise<Component[]> {
    const rows = this.sqlite.query<ComponentRow>(
      "SELECT * FROM components WHERE category = ? ORDER BY name ASC",
      [category]
    );
    return rows.map((row) => this.mapRowToComponent(row));
  }

  public async getDependencies(id: string): Promise<Component[]> {
    return this.resolver.resolve(id, (compNodeId) => this.findComponent(compNodeId));
  }

  public async getSnippet(id: string): Promise<Snippet | null> {
    const row = this.sqlite.queryOne<Snippet>(
      "SELECT * FROM snippets WHERE id = ? OR prefix = ? LIMIT 1",
      [id, id]
    );
    return row ?? null;
  }

  public async getTemplate(id: string): Promise<Template | null> {
    const row = this.sqlite.queryOne<Template>(
      "SELECT * FROM templates WHERE id = ? OR name = ? LIMIT 1",
      [id, id]
    );
    return row ?? null;
  }

  public async getCategories(): Promise<string[]> {
    if (this.categoryCache) {
      return this.categoryCache;
    }
    const rows = this.sqlite.query<{ category: string }>(
      "SELECT DISTINCT category FROM components ORDER BY category ASC"
    );
    this.categoryCache = rows.map((r) => r.category);
    return this.categoryCache;
  }

  public async getAllComponents(limit = 100, offset = 0): Promise<Component[]> {
    const rows = this.sqlite.query<ComponentRow>(
      "SELECT * FROM components ORDER BY category, name LIMIT ? OFFSET ?",
      [limit, offset]
    );
    return rows.map((row) => this.mapRowToComponent(row));
  }

  public async count(): Promise<number> {
    const res = this.sqlite.queryOne<{ total: number }>("SELECT COUNT(*) as total FROM components");
    return res ? res.total : 0;
  }
}
