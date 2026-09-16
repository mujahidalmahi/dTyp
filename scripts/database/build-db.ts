import * as path from "node:path";
import * as fs from "node:fs";
import { Component, Category, Snippet, Template } from "@dtyp/types";
import { safeReadJsonFile, ensureDirectoryExists, defaultLogger } from "@dtyp/utilities";
import { SqliteClient } from "@dtyp/library-engine";

const logger = defaultLogger.child("DatabaseBuilder");

export const buildDatabase = async (): Promise<void> => {
  const startTime = Date.now();
  logger.info("Starting optimized SQLite database build for dTyp...");

  const baseSourceDir = path.resolve(process.cwd(), "library-source");
  const taxonomyDir = path.resolve(process.cwd(), "taxonomy");
  const schemaFile = path.resolve(process.cwd(), "database", "schema", "schema.sql");
  const targetDbFile = path.resolve(process.cwd(), "database", "dtyp.db");
  const vscodeDbDir = path.resolve(process.cwd(), "apps", "vscode", "library");
  const vscodeDbFile = path.join(vscodeDbDir, "dtyp.db");

  ensureDirectoryExists(path.dirname(targetDbFile));
  ensureDirectoryExists(vscodeDbDir);

  const categories = safeReadJsonFile<Category[]>(
    path.join(taxonomyDir, "all-categories.json"),
    []
  );
  let allComponents: Component[] = [];
  const componentsDir = path.join(baseSourceDir, "components");
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const list = safeReadJsonFile<Component[]>(path.join(componentsDir, file), []);
      allComponents.push(...list);
    }
  }
  if (allComponents.length === 0) {
    allComponents = safeReadJsonFile<Component[]>(
      path.join(baseSourceDir, "all-components.json"),
      []
    );
  }

  const baselineComponents: Component[] = [
    {
      id: "linkedList.node",
      name: "Node",
      language: "c",
      type: "struct",
      categoryId: "data-structures.linked-lists.singly.node",
      category: "linked-list",
      subcategory: "node",
      path: "data-structures/linked-lists/singly/node",
      description: "Node struct for singly linked list",
      signature: "typedef struct Node { int data; struct Node* next; } Node;",
      code: "typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;",
      complexity: { time: "O(1)", space: "O(1)" },
      dependencies: [],
      tags: ["linked-list", "node", "struct"],
      aliases: ["Node", "linkedList.node", "linkedList>Node()"],
      version: "1.0.0",
    },
    {
      id: "linkedList.createNode",
      name: "createNode",
      language: "c",
      type: "function",
      categoryId: "data-structures.linked-lists.singly.node",
      category: "linked-list",
      subcategory: "node",
      path: "data-structures/linked-lists/singly/node",
      description: "Allocates a new linked list node",
      signature: "Node* createNode(int data);",
      code: "Node* createNode(int data) {\n    Node* n = (Node*)malloc(sizeof(Node));\n    if (!n) return NULL;\n    n->data = data;\n    n->next = NULL;\n    return n;\n}",
      complexity: { time: "O(1)", space: "O(1)" },
      dependencies: ["linkedList.node"],
      tags: ["linked-list", "node", "creation"],
      aliases: ["createNode", "linkedList.createNode", "linkedList>createNode()"],
      version: "1.0.0",
    },
  ];

  for (const b of baselineComponents) {
    if (!allComponents.some((c) => c.id === b.id)) {
      allComponents.push(b);
    }
  }
  const snippets = safeReadJsonFile<Snippet[]>(
    path.join(baseSourceDir, "snippets", "snippets.json"),
    []
  );
  const templates = safeReadJsonFile<Template[]>(
    path.join(baseSourceDir, "templates", "templates.json"),
    []
  );

  logger.info(`Loaded: ${categories.length} categories, ${allComponents.length} components`);

  const sqlite = new SqliteClient();
  await sqlite.initialize(); // in-memory build
  const db = sqlite.getDatabase();

  // Execute schema DDL
  const schemaSql = fs.readFileSync(schemaFile, "utf-8");
  sqlite.exec(schemaSql);
  logger.info("Executed database schema DDL");

  // Begin single massive transaction for fast insertion
  db.exec("BEGIN TRANSACTION;");

  // 1. Insert metadata
  const metaStmt = db.prepare("INSERT OR REPLACE INTO metadata (key, value) VALUES (?, ?)");
  const nowStr = new Date().toISOString();
  metaStmt.run(["schema_version", "2.0.0"]);
  metaStmt.run(["library_version", "1.0.0"]);
  metaStmt.run(["component_count", String(allComponents.length)]);
  metaStmt.run(["category_count", String(categories.length)]);
  metaStmt.run(["build_timestamp", nowStr]);
  metaStmt.free();

  // 2. Insert categories
  const catStmt = db.prepare(`INSERT OR REPLACE INTO categories (
    id, parent_id, name, slug, path, depth, type, description, sort_order
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  for (const cat of categories) {
    catStmt.run([
      cat.id,
      cat.parentId ?? null,
      cat.name,
      cat.slug,
      cat.path,
      cat.depth,
      cat.type,
      cat.description ?? null,
      cat.sortOrder ?? 0,
    ]);
  }
  catStmt.free();
  logger.info(`Inserted ${categories.length} categories into SQLite`);

  // 3. Insert components, aliases, dependencies, tags
  const compStmt = db.prepare(`INSERT INTO components (
    id, name, language, type, category_id, category, subcategory, path,
    description, signature, code, input_type, output_type, data_type,
    representation, implementation_type, difficulty, time_complexity,
    space_complexity, documentation, version, created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  const aliasStmt = db.prepare(`INSERT INTO aliases (component_id, alias) VALUES (?, ?)`);
  const depStmt = db.prepare(`INSERT OR IGNORE INTO dependencies (source_id, target_id, relationship_type) VALUES (?, ?, ?)`);
  const tagStmt = db.prepare(`INSERT OR IGNORE INTO tags (name) VALUES (?)`);
  const compTagStmt = db.prepare(`INSERT OR IGNORE INTO component_tags (component_id, tag_id) VALUES (?, (SELECT id FROM tags WHERE name = ?))`);

  const seenTags = new Set<string>();

  for (const comp of allComponents) {
    compStmt.run([
      comp.id,
      comp.name,
      comp.language || "c",
      comp.type || "function",
      comp.categoryId,
      comp.category,
      comp.subcategory ?? comp.category,
      comp.path,
      comp.description,
      comp.signature,
      comp.code,
      comp.inputType ?? null,
      comp.outputType ?? null,
      comp.dataType ?? null,
      comp.representation ?? null,
      comp.implementationType ?? null,
      comp.difficulty ?? "intermediate",
      comp.complexity.time,
      comp.complexity.space,
      comp.documentation ?? comp.description,
      comp.version || "1.0.0",
      nowStr,
      nowStr,
    ]);

    // Aliases
    if (comp.aliases) {
      for (const al of comp.aliases) {
        aliasStmt.run([comp.id, al]);
      }
    }

    // Dependencies
    if (comp.dependencies) {
      for (const dep of comp.dependencies) {
        depStmt.run([comp.id, dep, "depends_on"]);
      }
    }

    // Tags
    if (comp.tags) {
      for (const t of comp.tags) {
        if (!seenTags.has(t)) {
          tagStmt.run([t]);
          seenTags.add(t);
        }
        compTagStmt.run([comp.id, t]);
      }
    }
  }

  compStmt.free();
  aliasStmt.free();
  depStmt.free();
  tagStmt.free();
  compTagStmt.free();
  logger.info(`Inserted ${allComponents.length} components, aliases, and tags into SQLite`);

  // 4. Insert snippets
  const snipStmt = db.prepare(`INSERT INTO snippets (id, component_id, prefix, body, description, category, tab_stops, scope) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const s of snippets) {
    snipStmt.run([
      s.id,
      s.component_id ?? null,
      s.prefix,
      s.body,
      s.description ?? null,
      s.category ?? null,
      s.tabStops ? JSON.stringify(s.tabStops) : null,
      s.scope ?? "c,cpp",
    ]);
  }
  snipStmt.free();

  // 5. Insert templates
  const tmplStmt = db.prepare(`INSERT INTO templates (id, name, category, body, description) VALUES (?, ?, ?, ?, ?)`);
  for (const t of templates) {
    tmplStmt.run([t.id, t.name, t.category, t.body, t.description ?? null]);
  }
  tmplStmt.free();

  // Commit transaction
  db.exec("COMMIT;");
  logger.info("Committed transaction successfully");

  // Save to disk
  sqlite.saveToFile(targetDbFile);
  fs.copyFileSync(targetDbFile, vscodeDbFile);

  const stats = fs.statSync(targetDbFile);
  const totalDuration = Date.now() - startTime;
  logger.info(`SQLite build complete in ${totalDuration}ms:`);
  logger.info(`- Output DB: ${targetDbFile} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
  logger.info(`- VS Code copy: ${vscodeDbFile}`);
  logger.info(`- Total components: ${allComponents.length.toLocaleString()}`);
  logger.info(`- Total categories: ${categories.length.toLocaleString()}`);

  sqlite.close();
};

if (process.argv[1] && process.argv[1].includes("build-db")) {
  buildDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Database build failed:", err);
      process.exit(1);
    });
}
