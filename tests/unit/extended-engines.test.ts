import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => {
  class Position {
    constructor(public line: number, public character: number) {}
  }
  class Range {
    constructor(public start: Position, public end: Position) {}
  }
  class SnippetString {
    constructor(public value: string) {}
  }
  class Diagnostic {
    public source?: string;
    public code?: string;
    constructor(public range: Range, public message: string, public severity: any) {}
  }

  return {
    Position,
    Range,
    SnippetString,
    Diagnostic,
    DiagnosticSeverity: { Warning: 1, Information: 2 },
    languages: {
      createDiagnosticCollection: vi.fn().mockReturnValue({
        set: vi.fn(),
        delete: vi.fn(),
        clear: vi.fn(),
      }),
    },
    workspace: {
      getConfiguration: vi.fn().mockReturnValue({
        get: (_key: string, def: any) => def,
      }),
    },
  };
});

import { HeaderEngine } from "../../apps/vscode/src/engine/header-engine.js";
import { DuplicateDetector } from "@dtyp/library-engine";
import { MemoryEngine } from "../../apps/vscode/src/engine/memory-engine.js";
import { SnippetEngine } from "../../apps/vscode/src/engine/snippet-engine.js";
import { SessionEngine } from "../../apps/vscode/src/engine/session-engine.js";

describe("Production Engines Extended Capabilities", () => {
  describe("HeaderEngine (C99/C11/POSIX/Windows)", () => {
    it("detects assert.h, errno.h, unistd.h, and pthread.h", () => {
      const doc = "";
      const code1 = `assert(x > 0);`;
      expect(HeaderEngine.getMissingHeaders(doc, code1)).toContain("assert.h");

      const code2 = `if (errno == ENOMEM) return NULL;`;
      expect(HeaderEngine.getMissingHeaders(doc, code2)).toContain("errno.h");

      const code3 = `pid_t pid = fork(); usleep(1000);`;
      expect(HeaderEngine.getMissingHeaders(doc, code3)).toContain("unistd.h");

      const code4 = `pthread_t tid; pthread_create(&tid, NULL, worker, NULL);`;
      expect(HeaderEngine.getMissingHeaders(doc, code4)).toContain("pthread.h");
    });
  });

  describe("DuplicateDetector (Prototypes vs Implementations, Macros, Enums)", () => {
    const detector = new DuplicateDetector();

    it("allows inserting function definition when only prototype declaration exists", () => {
      const source = `void calculateSum(int a, int b);\n`;
      const comp: any = {
        name: "calculateSum",
        signature: "void calculateSum(int a, int b)",
        code: "void calculateSum(int a, int b) {\n    printf(\"%d\\n\", a + b);\n}",
      };

      // hasFunction is true (prototype exists)
      expect(detector.hasFunction(source, "calculateSum")).toBe(true);
      // but hasFunctionDefinition is false
      expect(detector.hasFunctionDefinition(source, "calculateSum")).toBe(false);

      // checkComponent should NOT block insertion of full definition!
      const result = detector.checkComponent(source, comp);
      expect(result.isDuplicate).toBe(false);
    });

    it("detects duplicate macro definitions", () => {
      const source = `#define BUFFER_SIZE 1024\n`;
      expect(detector.hasMacro(source, "BUFFER_SIZE")).toBe(true);
      expect(detector.hasMacro(source, "MAX_VAL")).toBe(false);
    });

    it("detects duplicate enum definitions", () => {
      const source = `enum Status { OK, ERROR };\n`;
      expect(detector.hasEnum(source, "Status")).toBe(true);
      expect(detector.hasEnum(source, "Color")).toBe(false);
    });
  });

  describe("MemoryEngine (Unsafe realloc & Leak Analysis)", () => {
    it("detects unsafe direct realloc reassignment", () => {
      const code = `
int* p = malloc(10 * sizeof(int));
p = realloc(p, 20 * sizeof(int));
`;
      const allocs = MemoryEngine.analyzeAllocations(code);
      const reallocEntry = allocs.find((a) => a.allocationType === "realloc");
      expect(reallocEntry).toBeDefined();
      expect(reallocEntry?.isUnsafeRealloc).toBe(true);
    });
  });

  describe("SnippetEngine (Dynamic Tab Stops Transformation)", () => {
    it("converts <placeholders> and /* TODO */ into indexed VS Code snippet tab stops", () => {
      const raw = `<type> <name> = malloc(sizeof(/* TODO struct */));`;
      const snippetString = SnippetEngine.toSnippetString(raw);
      expect(snippetString.value).toContain("${1:type}");
      expect(snippetString.value).toContain("${2:name}");
      expect(snippetString.value).toContain("${3:TODO struct}");
    });
  });

  describe("SessionEngine Telemetry", () => {
    it("calculates estimated words and minutes saved based on typed characters", () => {
      const mockContext: any = {
        globalState: {
          get: vi.fn().mockReturnValue([]),
          update: vi.fn(),
        },
      };
      const session = new SessionEngine(mockContext);
      session.recordInsertion({
        componentId: "test.sum",
        componentName: "sum",
        fileUri: "file:///test.c",
        charactersTyped: 200,
        mode: "automatic",
      });

      const telemetry = session.getTelemetry();
      expect(telemetry.totalCharactersTyped).toBe(200);
      expect(telemetry.estimatedWordsTyped).toBe(40);
      expect(telemetry.estimatedMinutesSaved).toBe(1.0);
    });
  });
});
