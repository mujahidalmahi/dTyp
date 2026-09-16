import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as path from "node:path";
import { SqliteClient, DefaultLibraryEngine } from "@dtyp/library-engine";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { TypingTarget } from "@dtyp/types";
import { CommandParser } from "../../apps/vscode/src/parser/command-parser.js";

class MockEditorBuffer implements TypingTarget {
  public content = "";

  constructor(initialContent = "") {
    this.content = initialContent;
  }

  public async focus(): Promise<void> {}

  public async typeCharacter(c: string): Promise<void> {
    this.content += c;
  }

  public async releaseModifiers(): Promise<void> {}
}

describe("Integration Test 3 & 4: VS Code Extension Insertion & Duplicate Detection", () => {
  let sqlite: SqliteClient;
  let libraryEngine: DefaultLibraryEngine;
  const dbPath = path.resolve(process.cwd(), "database", "dtyp.db");

  beforeEach(async () => {
    sqlite = new SqliteClient();
    await sqlite.initialize(dbPath);
    libraryEngine = new DefaultLibraryEngine(sqlite);
  });

  afterEach(() => {
    sqlite.close();
  });

  it("Test 3: linkedList>createNode() -> dependency resolution -> character-by-character insertion", async () => {
    const parsed = CommandParser.parse("linkedList>createNode()");
    expect(parsed).not.toBeNull();
    expect(parsed?.category).toBe("data-structures");

    const comp = await libraryEngine.findComponent("linkedList.createNode");
    expect(comp).not.toBeNull();

    // Resolve dependencies topologically
    const deps = await libraryEngine.getDependencies(comp!.id);
    expect(deps.length).toBeGreaterThanOrEqual(1);

    // Prerequisite Node struct should come before createNode function
    const names = deps.map((d) => d.name);
    expect(names).toContain("Node");
    expect(names).toContain("createNode");
    expect(names.indexOf("Node")).toBeLessThan(names.indexOf("createNode"));

    // Type into mock editor buffer character-by-character
    const editorBuffer = new MockEditorBuffer();
    const typingEngine = new DefaultTypingEngine(editorBuffer);

    const fullCode = deps.map((d) => d.code).join("\n\n");
    await typingEngine.start(fullCode, {
      delayMs: 1,
      mode: "character",
      preserveNewlines: true,
      preserveTabs: true,
    });

    expect(editorBuffer.content).toContain("typedef struct Node");
    expect(editorBuffer.content).toContain("Node* createNode(int data)");
  });

  it("Test 4: Existing Node definition -> insert dependent function -> skips duplicate Node definition", async () => {
    const existingCode = `
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;
    `;

    const editorBuffer = new MockEditorBuffer(existingCode);
    const typingEngine = new DefaultTypingEngine(editorBuffer);

    const comp = await libraryEngine.findComponent("linkedList.createNode");
    const deps = await libraryEngine.getDependencies(comp!.id);

    // Filter duplicates
    const duplicateDetector = libraryEngine.getDuplicateDetector();
    const filterResult = duplicateDetector.filterNonDuplicates(editorBuffer.content, deps);

    expect(filterResult.skipped.map((s) => s.component.name)).toContain("Node");
    expect(filterResult.toInsert.map((c) => c.name)).toEqual(["createNode"]);

    // Insert remaining non-duplicates character-by-character
    const toTypeCode = filterResult.toInsert.map((c) => c.code).join("\n\n");
    await typingEngine.start(toTypeCode, {
      delayMs: 1,
      mode: "character",
      preserveNewlines: true,
      preserveTabs: true,
    });

    // Verify: Node struct exists exactly once in buffer, and createNode exists
    const matches = editorBuffer.content.match(/typedef struct Node/g);
    expect(matches?.length).toBe(1);
    expect(editorBuffer.content).toContain("Node* createNode(int data)");
  });
});
