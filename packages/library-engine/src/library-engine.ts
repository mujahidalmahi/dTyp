import { Component, Category, Snippet, Template, LibraryEngine } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";
import { SqliteClient } from "./sqlite-client.js";
import { DependencyResolver } from "./dependency-resolver.js";
import { DuplicateDetector } from "./duplicate-detector.js";

interface CategoryRow {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  path: string;
  depth: number;
  type: string;
  description?: string;
  sort_order?: number;
}

interface ComponentRow {
  id: string;
  name: string;
  language: string;
  type?: any;
  category_id?: string;
  category: string;
  subcategory?: string;
  path?: string;
  description: string;
  signature: string;
  code: string;
  input_type?: string;
  output_type?: string;
  data_type?: string;
  representation?: string;
  implementation_type?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  time_complexity: string;
  space_complexity: string;
  documentation?: string;
  version: string;
  created_at?: string;
  updated_at?: string;
}

export class DefaultLibraryEngine implements LibraryEngine {
  private resolver = new DependencyResolver();
  private duplicateDetector = new DuplicateDetector();
  private categoryCache: string[] | null = null;
  private categoryTreeCache = new Map<string, Category[]>();
  private componentCache = new Map<string, Component>();
  private logger = defaultLogger.child("LibraryEngine");

  constructor(private sqlite: SqliteClient) {}

  public getDependencyResolver(): DependencyResolver {
    return this.resolver;
  }

  public getDuplicateDetector(): DuplicateDetector {
    return this.duplicateDetector;
  }

  private mapRowToCategory(row: CategoryRow): Category {
    return {
      id: row.id,
      parentId: row.parent_id,
      name: row.name,
      slug: row.slug,
      path: row.path,
      depth: row.depth,
      type: row.type,
      description: row.description,
      sortOrder: row.sort_order,
    };
  }

  private mapRowToComponent(row: ComponentRow, dependencies: string[] = [], tags: string[] = [], aliases: string[] = []): Component {
    return {
      id: row.id,
      name: row.name,
      language: row.language || "c",
      type: row.type || "function",
      categoryId: row.category_id || row.category,
      category: row.category,
      subcategory: row.subcategory,
      path: row.path || row.category,
      description: row.description,
      signature: row.signature,
      code: row.code,
      complexity: {
        time: row.time_complexity,
        space: row.space_complexity,
      },
      inputType: row.input_type,
      outputType: row.output_type,
      dataType: row.data_type,
      representation: row.representation,
      implementationType: row.implementation_type,
      difficulty: row.difficulty,
      documentation: row.documentation,
      version: row.version,
      dependencies,
      tags,
      aliases,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
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

    if (!row) {
      // Check if `id` is an alias
      return this.resolveAlias(id);
    }

    // Fetch dependencies
    let dependencies: string[] = [];
    try {
      const depRows = this.sqlite.query<{ target_id: string }>(
        "SELECT target_id FROM dependencies WHERE source_id = ?",
        [id]
      );
      dependencies = Array.from(new Set(depRows.map((r) => r.target_id)));
    } catch {
      try {
        const depRows = this.sqlite.query<{ dependency_id: string }>(
          "SELECT dependency_id FROM dependencies WHERE component_id = ?",
          [id]
        );
        dependencies = Array.from(new Set(depRows.map((r) => r.dependency_id)));
      } catch {
        // ignore
      }
    }

    // Fetch tags
    let tags: string[] = [];
    try {
      const tagRows = this.sqlite.query<{ name: string }>(
        `SELECT t.name FROM tags t
         JOIN component_tags ct ON ct.tag_id = t.id
         WHERE ct.component_id = ?`,
        [id]
      );
      tags = tagRows.map((r) => r.name);
    } catch {
      // ignore
    }

    // Fetch aliases
    let aliases: string[] = [];
    try {
      const aliasRows = this.sqlite.query<{ alias: string }>(
        "SELECT alias FROM aliases WHERE component_id = ?",
        [id]
      );
      aliases = aliasRows.map((r) => r.alias);
    } catch {
      // ignore
    }

    const comp = this.mapRowToComponent(row, dependencies, tags, aliases);
    this.componentCache.set(id, comp);
    return comp;
  }

  public async resolveAlias(alias: string): Promise<Component | null> {
    const trimmed = alias.trim();
    if (!trimmed) return null;

    try {
      const row = this.sqlite.queryOne<{ component_id: string }>(
        "SELECT component_id FROM aliases WHERE alias = ? LIMIT 1",
        [trimmed]
      );
      if (row && row.component_id) {
        return this.findComponent(row.component_id);
      }
    } catch {
      // aliases table may not exist
    }
    return null;
  }

  public async getChildren(parentId?: string | null): Promise<Category[]> {
    const cacheKey = parentId ?? "__root__";
    if (this.categoryTreeCache.has(cacheKey)) {
      return this.categoryTreeCache.get(cacheKey)!;
    }

    const sql = parentId
      ? "SELECT * FROM categories WHERE parent_id = ? ORDER BY sort_order ASC, name ASC"
      : "SELECT * FROM categories WHERE parent_id IS NULL ORDER BY sort_order ASC, name ASC";
    const params = parentId ? [parentId] : [];
    const rows = this.sqlite.query<CategoryRow>(sql, params);
    const categories = rows.map((r) => this.mapRowToCategory(r));
    this.categoryTreeCache.set(cacheKey, categories);
    return categories;
  }

  public async findCategoryByPath(path: string): Promise<Category | null> {
    const normalized = path.trim().replace(/>/g, "/").toLowerCase();
    const row = this.sqlite.queryOne<CategoryRow>(
      "SELECT * FROM categories WHERE lower(path) = ? OR lower(slug) = ? OR id = ? LIMIT 1",
      [normalized, normalized, normalized]
    );
    return row ? this.mapRowToCategory(row) : null;
  }

  public async getByCategoryId(categoryId: string): Promise<Component[]> {
    const rows = this.sqlite.query<ComponentRow>(
      "SELECT * FROM components WHERE category_id = ? OR category = ? ORDER BY name ASC",
      [categoryId, categoryId]
    );
    return rows.map((row) => this.mapRowToComponent(row));
  }

  public async search(query: string, limit = 50): Promise<Component[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];

    // Check exact alias or exact ID first
    const exact = await this.findComponent(trimmed);
    if (exact) {
      return [exact];
    }

    const pattern = `%${trimmed}%`;
    const rows = this.sqlite.query<ComponentRow>(
      `SELECT * FROM components 
       WHERE id LIKE ? OR name LIKE ? OR category LIKE ? OR subcategory LIKE ? OR description LIKE ?
       ORDER BY 
         CASE WHEN name = ? THEN 1
              WHEN name LIKE ? THEN 2
              ELSE 3 END,
         name ASC
       LIMIT ?`,
      [pattern, pattern, pattern, pattern, pattern, trimmed, `${trimmed}%`, limit]
    );

    return rows.map((row) => this.mapRowToComponent(row));
  }

  public async getByCategory(category: string): Promise<Component[]> {
    try {
      const rows = this.sqlite.query<ComponentRow>(
        "SELECT * FROM components WHERE category = ? OR category_id = ? ORDER BY name ASC",
        [category, category]
      );
      return rows.map((row) => this.mapRowToComponent(row));
    } catch {
      try {
        const rows = this.sqlite.query<ComponentRow>(
          "SELECT * FROM components WHERE category = ? ORDER BY name ASC",
          [category]
        );
        return rows.map((row) => this.mapRowToComponent(row));
      } catch {
        return [];
      }
    }
  }

  public async getDependencies(id: string): Promise<Component[]> {
    return this.resolver.resolve(id, (compNodeId) => this.findComponent(compNodeId));
  }

  public async getSnippet(id: string): Promise<Snippet | null> {
    const row = this.sqlite.queryOne<any>(
      "SELECT * FROM snippets WHERE id = ? OR prefix = ? LIMIT 1",
      [id, id]
    );
    if (!row) return null;
    return {
      ...row,
      tabStops: row.tab_stops ? (typeof row.tab_stops === "string" ? JSON.parse(row.tab_stops) : row.tab_stops) : undefined,
    };
  }

  public async getSnippets(): Promise<Snippet[]> {
    try {
      const rows = this.sqlite.query<any>("SELECT * FROM snippets ORDER BY prefix ASC");
      return rows.map((r) => ({
        ...r,
        tabStops: r.tab_stops ? (typeof r.tab_stops === "string" ? JSON.parse(r.tab_stops) : r.tab_stops) : undefined,
      }));
    } catch {
      return [];
    }
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
