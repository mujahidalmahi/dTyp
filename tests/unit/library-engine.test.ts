import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { SqliteClient, DefaultLibraryEngine } from "@dtyp/library-engine";

describe("LibraryEngine & SqliteClient", () => {
  let sqlite: SqliteClient;
  let engine: DefaultLibraryEngine;

  beforeEach(async () => {
    sqlite = new SqliteClient();
    await sqlite.initialize(); // in-memory
    engine = new DefaultLibraryEngine(sqlite);

    // Run baseline schema
    sqlite.exec(`
      CREATE TABLE components (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        language TEXT NOT NULL,
        category_id TEXT,
        category TEXT NOT NULL,
        subcategory TEXT,
        description TEXT,
        signature TEXT,
        code TEXT NOT NULL,
        time_complexity TEXT,
        space_complexity TEXT,
        documentation TEXT,
        version TEXT NOT NULL
      );
      CREATE TABLE dependencies (
        source_id TEXT NOT NULL,
        target_id TEXT NOT NULL,
        PRIMARY KEY(source_id, target_id)
      );
      CREATE TABLE aliases (
        component_id TEXT NOT NULL,
        alias TEXT NOT NULL
      );
      CREATE TABLE snippets (
        id TEXT PRIMARY KEY,
        component_id TEXT,
        prefix TEXT NOT NULL,
        body TEXT NOT NULL,
        description TEXT
      );
      CREATE TABLE tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
      );
      CREATE TABLE component_tags (
        component_id TEXT NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY(component_id, tag_id)
      );
    `);

    // Insert sample components
    sqlite.query(
      `INSERT INTO components (id, name, language, category_id, category, subcategory, description, signature, code, time_complexity, space_complexity, documentation, version)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "linkedList.createNode",
        "createNode",
        "c",
        "cat.linked-list.singly",
        "linked-list",
        "singly",
        "Creates a new node",
        "Node* createNode(int data)",
        "Node* createNode(int data) { Node* n = malloc(sizeof(Node)); n->data = data; n->next = NULL; return n; }",
        "O(1)",
        "O(1)",
        "Allocates node on heap",
        "1.0.0",
      ]
    );

    sqlite.query(
      `INSERT INTO components (id, name, language, category_id, category, subcategory, description, signature, code, time_complexity, space_complexity, documentation, version)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "sorting.quickSort",
        "quickSort",
        "c",
        "cat.sorting.divide-and-conquer",
        "sorting",
        "divide-and-conquer",
        "Quick sort algorithm",
        "void quickSort(int arr[], int low, int high)",
        "void quickSort(int arr[], int low, int high) { /* ... */ }",
        "O(n log n)",
        "O(log n)",
        "Standard Lomuto partition quicksort",
        "1.0.0",
      ]
    );

    // Insert tags
    sqlite.query("INSERT INTO tags (id, name) VALUES (1, 'linked-list'), (2, 'memory')");
    sqlite.query("INSERT INTO component_tags (component_id, tag_id) VALUES ('linkedList.createNode', 1), ('linkedList.createNode', 2)");

    // Insert snippet
    sqlite.query(
      "INSERT INTO snippets (id, component_id, prefix, body, description) VALUES (?, ?, ?, ?, ?)",
      ["snip_node", "linkedList.createNode", "dtyp.ll.node", "Node* n = createNode(${1:0});", "Node creation snippet"]
    );
  });

  afterEach(() => {
    sqlite.close();
  });

  it("finds component by id with tags and dependencies", async () => {
    const comp = await engine.findComponent("linkedList.createNode");
    expect(comp).not.toBeNull();
    expect(comp?.name).toBe("createNode");
    expect(comp?.tags).toContain("linked-list");
    expect(comp?.tags).toContain("memory");
  });

  it("searches components by query", async () => {
    const results = await engine.search("quick");
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("sorting.quickSort");
  });

  it("filters components by category", async () => {
    const results = await engine.getByCategory("linked-list");
    expect(results.length).toBe(1);
    expect(results[0].name).toBe("createNode");
  });

  it("retrieves components by exact category_id", async () => {
    const results = await engine.getByCategoryId("cat.linked-list.singly");
    expect(results.length).toBe(1);
    expect(results[0].name).toBe("createNode");

    // Parent/unmatched category returns empty, preventing leaks to upper categories
    const emptyResults = await engine.getByCategoryId("cat.linked-list");
    expect(emptyResults.length).toBe(0);
  });

  it("retrieves components by category branch recursively", async () => {
    // Exact match or parent prefix matches children
    const branchResults = await engine.getByCategoryBranch("cat.linked-list");
    expect(branchResults.length).toBe(1);
    expect(branchResults[0].name).toBe("createNode");

    const rootBranch = await engine.getByCategoryBranch("linked-list");
    expect(rootBranch.length).toBe(1);

    const count = await engine.getCategoryBranchCount("cat.linked-list");
    expect(count).toBe(1);

    const zeroCount = await engine.getCategoryBranchCount("non-existent");
    expect(zeroCount).toBe(0);
  });

  it("retrieves snippets by prefix", async () => {
    const snippet = await engine.getSnippet("dtyp.ll.node");
    expect(snippet).not.toBeNull();
    expect(snippet?.body).toContain("createNode");
  });

  it("counts components", async () => {
    const count = await engine.count();
    expect(count).toBe(2);
  });

  it("retrieves dynamic category counts", async () => {
    const counts = await engine.getCategoryCounts();
    expect(counts["linked-list"]).toBe(1);
    expect(counts["sorting"]).toBe(1);
  });
});
