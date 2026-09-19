import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("vscode", () => {
  class EventEmitter {
    public event = vi.fn();
    public fire = vi.fn();
  }
  return {
    EventEmitter,
  };
});

import { OwnLibraryStorage } from "../../apps/vscode/src/engine/own-library-storage.js";

describe("OwnLibraryStorage Engine", () => {
  let mockState: Map<string, any>;
  let mockContext: any;
  let storage: OwnLibraryStorage;

  beforeEach(() => {
    mockState = new Map();
    mockContext = {
      globalStorageUri: undefined, // test in-memory/globalState fallback
      globalState: {
        get: vi.fn((key: string, def: any) => mockState.get(key) ?? def),
        update: vi.fn((key: string, val: any) => {
          mockState.set(key, val);
          return Promise.resolve();
        }),
      },
    };
    storage = new OwnLibraryStorage(mockContext);
  });

  it("creates a component with only required code field", async () => {
    const comp = await storage.create({
      code: "int add(int a, int b) { return a + b; }",
    });

    expect(comp.id).toBeDefined();
    expect(comp.category).toBe("Own Library");
    expect(comp.subDomain).toBe("General");
    expect(comp.subTopic).toBe("Custom");
    expect(comp.name).toBe("add"); // inferred from function definition
    expect(comp.type).toBe("snippet");
    expect(comp.code).toContain("return a + b;");
    expect(comp.isCustom).toBe(true);
    expect(storage.getCount()).toBe(1);
  });

  it("creates a component with all optional fields provided", async () => {
    const comp = await storage.create({
      subDomain: "Networking",
      subTopic: "TCP Sockets",
      name: "tcp_connect",
      type: "function",
      signature: "int tcp_connect(const char *ip, int port);",
      description: "Connects to a remote TCP socket",
      tags: ["network", "tcp", "socket"],
      aliases: "connect_tcp, tcp_client",
      code: "int tcp_connect(const char *ip, int port) { return 0; }",
    });

    expect(comp.subDomain).toBe("Networking");
    expect(comp.subTopic).toBe("TCP Sockets");
    expect(comp.name).toBe("tcp_connect");
    expect(comp.type).toBe("function");
    expect(comp.signature).toBe("int tcp_connect(const char *ip, int port);");
    expect(comp.description).toBe("Connects to a remote TCP socket");
    expect(comp.tags).toEqual(["network", "tcp", "socket"]);
    expect(comp.aliases).toEqual(["connect_tcp", "tcp_client"]);
  });

  it("throws error if code content is missing or empty", async () => {
    await expect(storage.create({ code: "" })).rejects.toThrow("Code content is required");
    await expect(storage.create({ code: "   " })).rejects.toThrow("Code content is required");
  });

  it("updates existing component", async () => {
    const comp = await storage.create({
      name: "orig_name",
      code: "void test(void) {}",
    });

    const updated = await storage.update(comp.id, {
      name: "new_name",
      subDomain: "NewDomain",
    });

    expect(updated).not.toBeNull();
    expect(updated!.name).toBe("new_name");
    expect(updated!.subDomain).toBe("NewDomain");
    expect(storage.getById(comp.id)!.name).toBe("new_name");
  });

  it("deletes existing component", async () => {
    const comp = await storage.create({ code: "void foo(void) {}" });
    expect(storage.getCount()).toBe(1);

    const deleted = await storage.delete(comp.id);
    expect(deleted).toBe(true);
    expect(storage.getCount()).toBe(0);
    expect(storage.getById(comp.id)).toBeUndefined();
  });

  it("queries subdomains and subtopics correctly", async () => {
    await storage.create({ subDomain: "Math", subTopic: "Matrix", code: "void mat(void) {}" });
    await storage.create({ subDomain: "Math", subTopic: "Primes", code: "void prime(void) {}" });
    await storage.create({ subDomain: "Trees", subTopic: "Binary", code: "void tree(void) {}" });

    const subDomains = storage.getSubDomains();
    expect(subDomains).toEqual(["Math", "Trees"]);

    const mathTopics = storage.getSubTopics("Math");
    expect(mathTopics).toEqual(["Matrix", "Primes"]);

    const treesTopics = storage.getSubTopics("Trees");
    expect(treesTopics).toEqual(["Binary"]);
  });

  it("exports to JSON and imports back correctly", async () => {
    await storage.create({ name: "C1", code: "int c1(void) { return 1; }" });
    await storage.create({ name: "C2", code: "int c2(void) { return 2; }" });

    const json = storage.exportToJson();
    expect(json).toContain("C1");
    expect(json).toContain("C2");

    // New storage instance
    const freshStorage = new OwnLibraryStorage(mockContext);
    freshStorage["items"].clear();

    const result = await freshStorage.importFromJson(json);
    expect(result.imported).toBe(2);
    expect(result.failed).toBe(0);
    expect(freshStorage.getCount()).toBe(2);
  });

  it("converts to standard dTyp Component interface", async () => {
    const comp = await storage.create({
      subDomain: "Algorithms",
      subTopic: "Sorting",
      name: "bubble_sort",
      code: "void bubble_sort(int *a, int n) {}",
    });

    const dtypComp = storage.toComponent(comp);
    expect(dtypComp.id).toBe(comp.id);
    expect(dtypComp.name).toBe("bubble_sort");
    expect(dtypComp.category).toBe("Own Library");
    expect(dtypComp.subcategory).toBe("Algorithms");
    expect(dtypComp.path).toBe("Own Library / Algorithms / Sorting / bubble_sort");
    expect(dtypComp.isCustom).toBe(true);
    expect(dtypComp.language).toBe("c");
  });
});
