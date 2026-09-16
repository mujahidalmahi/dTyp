import * as path from "node:path";
import * as fs from "node:fs";
import { Component, Snippet, Template } from "@dtyp/types";
import { safeReadJsonFile, ensureDirectoryExists, defaultLogger } from "@dtyp/utilities";
import { SqliteClient } from "@dtyp/library-engine";

const logger = defaultLogger.child("DatabaseBuilder");

export const buildDatabase = async (): Promise<void> => {
  logger.info("Starting SQLite database build for dTyp...");

  const baseSourceDir = path.resolve(process.cwd(), "library-source");
  const schemaFile = path.resolve(process.cwd(), "database", "schema", "schema.sql");
  const targetDbFile = path.resolve(process.cwd(), "database", "dtyp.db");
  const vscodeDbDir = path.resolve(process.cwd(), "apps", "vscode", "library");
  const vscodeDbFile = path.join(vscodeDbDir, "dtyp.db");

  ensureDirectoryExists(path.dirname(targetDbFile));
  ensureDirectoryExists(vscodeDbDir);

  const allComponents = safeReadJsonFile<Component[]>(
    path.join(baseSourceDir, "all-components.json"),
    []
  );
  const snippets = safeReadJsonFile<Snippet[]>(
    path.join(baseSourceDir, "snippets", "snippets.json"),
    []
  );
  const templates = safeReadJsonFile<Template[]>(
    path.join(baseSourceDir, "templates", "templates.json"),
    []
  );

  const sqlite = new SqliteClient();
  await sqlite.initialize(); // in-memory first

  // Execute schema
  const schemaSql = fs.readFileSync(schemaFile, "utf-8");
  sqlite.exec(schemaSql);
  logger.info("Executed database schema DDL");

  // Insert metadata
  sqlite.query(
    "INSERT OR REPLACE INTO metadata (key, value) VALUES (?, ?), (?, ?), (?, ?), (?, ?)",
    [
      "schema_version", "1",
      "library_version", "1.0.0",
      "component_count", String(allComponents.length),
      "build_timestamp", new Date().toISOString(),
    ]
  );

  // Tags collection
  const tagMap = new Map<string, number>();
  let currentTagId = 1;

  for (const comp of allComponents) {
    if (comp.tags) {
      for (const t of comp.tags) {
        if (!tagMap.has(t)) {
          tagMap.set(t, currentTagId);
          sqlite.query("INSERT INTO tags (id, name) VALUES (?, ?)", [currentTagId, t]);
          currentTagId++;
        }
      }
    }
  }

  // Insert components, dependencies, component_tags
  for (const comp of allComponents) {
    sqlite.query(
      `INSERT INTO components (
        id, name, language, category, subcategory, description, signature, code, 
        time_complexity, space_complexity, documentation, version
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        comp.id,
        comp.name,
        comp.language,
        comp.category,
        comp.subcategory ?? comp.category,
        comp.description,
        comp.signature,
        comp.code,
        comp.complexity.time,
        comp.complexity.space,
        comp.documentation ?? comp.description,
        comp.version,
      ]
    );

    if (comp.dependencies) {
      for (const dep of comp.dependencies) {
        sqlite.query(
          "INSERT OR IGNORE INTO dependencies (component_id, dependency_id) VALUES (?, ?)",
          [comp.id, dep]
        );
      }
    }

    if (comp.tags) {
      for (const t of comp.tags) {
        const tagId = tagMap.get(t);
        if (tagId) {
          sqlite.query(
            "INSERT OR IGNORE INTO component_tags (component_id, tag_id) VALUES (?, ?)",
            [comp.id, tagId]
          );
        }
      }
    }
  }

  // Insert snippets
  for (const s of snippets) {
    sqlite.query(
      "INSERT INTO snippets (id, component_id, prefix, body, description, category) VALUES (?, ?, ?, ?, ?, ?)",
      [s.id, s.component_id ?? null, s.prefix, s.body, s.description ?? null, s.category ?? null]
    );
  }

  // Insert templates
  for (const t of templates) {
    sqlite.query(
      "INSERT INTO templates (id, name, category, body, description) VALUES (?, ?, ?, ?, ?)",
      [t.id, t.name, t.category, t.body, t.description ?? null]
    );
  }

  // Save to disk
  sqlite.saveToFile(targetDbFile);
  fs.copyFileSync(targetDbFile, vscodeDbFile);

  const stats = fs.statSync(targetDbFile);
  logger.info(`Successfully generated SQLite database:`);
  logger.info(`- Path: ${targetDbFile}`);
  logger.info(`- VS Code copy: ${vscodeDbFile}`);
  logger.info(`- File size: ${(stats.size / 1024).toFixed(1)} KB`);
  logger.info(`- Total components indexed: ${allComponents.length}`);

  sqlite.close();
};

// Execute if run directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  buildDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Database build failed:", err);
      process.exit(1);
    });
}
