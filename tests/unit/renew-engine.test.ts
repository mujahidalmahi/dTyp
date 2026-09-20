import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => {
  class Position {
    constructor(public line: number, public character: number) {}
  }
  class Selection {
    constructor(public anchor: Position, public active: Position) {}
  }
  class Range {
    constructor(public start: Position, public end: Position) {}
  }

  return {
    Position,
    Selection,
    Range,
    window: {
      activeTextEditor: null,
      showInformationMessage: vi.fn(),
      showWarningMessage: vi.fn(),
      showErrorMessage: vi.fn(),
      setStatusBarMessage: vi.fn(),
      showQuickPick: vi.fn(),
    },
    workspace: {
      getConfiguration: vi.fn().mockReturnValue({
        get: (_key: string, def: any) => def,
      }),
    },
    commands: {
      executeCommand: vi.fn(),
    },
  };
});

import { RenewEngine } from "../../apps/vscode/src/engine/renew-engine.js";
import { AutoTypeEngine } from "../../apps/vscode/src/engine/auto-type-engine.js";
import { VSCodeTypingTarget } from "../../apps/vscode/src/adapter/vscode-typing-target.js";
import { SessionEngine } from "../../apps/vscode/src/engine/session-engine.js";
import { SearchEngine } from "../../apps/vscode/src/engine/search-engine.js";
import { SnippetEngine } from "../../apps/vscode/src/engine/snippet-engine.js";
import { DefaultTypingEngine } from "@dtyp/typing-engine";

describe("RenewEngine (Session & Queue Renewal)", () => {
  it("renews manual typing queue back to character 0", async () => {
    const target = new VSCodeTypingTarget();
    const typingEngine = new DefaultTypingEngine(target);
    const autoTypeEngine = new AutoTypeEngine(typingEngine, target);

    const mockContext: any = {
      globalState: {
        get: vi.fn().mockReturnValue([]),
        update: vi.fn(),
      },
    };
    const sessionEngine = new SessionEngine(mockContext);
    const mockLibraryEngine: any = {
      search: vi.fn().mockResolvedValue([]),
      getSnippets: vi.fn().mockResolvedValue([]),
      findComponent: vi.fn(),
    };
    const searchEngine = new SearchEngine(mockLibraryEngine);
    const snippetEngine = new SnippetEngine(mockLibraryEngine);

    const renewEngine = new RenewEngine(
      autoTypeEngine,
      target,
      sessionEngine,
      mockLibraryEngine,
      searchEngine,
      snippetEngine
    );

    // With no active queue, renew returns false
    expect(await renewEngine.renewQueue()).toBe(false);

    // Start manual queue
    const mockEditor: any = {
      document: {
        uri: { toString: () => "file:///test.c" },
        getText: () => "",
      },
      selection: {
        active: { line: 0, character: 0 },
      },
    };
    await autoTypeEngine.startInsertion("test.comp", "testComp", "int a = 10;", mockEditor, "manual");

    const queue = autoTypeEngine.getActiveQueue();
    expect(queue).toBeDefined();
    expect(autoTypeEngine.isManualQueueActive()).toBe(true);

    // Step 5 characters
    queue!.currentIndex = 5;
    expect(autoTypeEngine.getRemainingCount()).toBeLessThan(queue!.actions.length);

    // Renew queue
    const renewed = await renewEngine.renewQueue();
    expect(renewed).toBe(true);
    expect(queue!.currentIndex).toBe(0);
    expect(autoTypeEngine.getRemainingCount()).toBe(queue!.actions.length);
  });

  it("rewinds one step by deleting backward and decrementing queue index", async () => {
    const target = new VSCodeTypingTarget();
    const deleteBackwardSpy = vi.spyOn(target, "deleteBackward").mockResolvedValue();
    const typingEngine = new DefaultTypingEngine(target);
    const autoTypeEngine = new AutoTypeEngine(typingEngine, target);

    const mockContext: any = {
      globalState: { get: vi.fn().mockReturnValue([]), update: vi.fn() },
    };
    const sessionEngine = new SessionEngine(mockContext);
    const mockLibraryEngine: any = {
      search: vi.fn().mockResolvedValue([]),
      getSnippets: vi.fn().mockResolvedValue([]),
      findComponent: vi.fn(),
    };
    const searchEngine = new SearchEngine(mockLibraryEngine);
    const snippetEngine = new SnippetEngine(mockLibraryEngine);

    const renewEngine = new RenewEngine(
      autoTypeEngine,
      target,
      sessionEngine,
      mockLibraryEngine,
      searchEngine,
      snippetEngine
    );

    const mockEditor: any = {
      document: { uri: { toString: () => "file:///test.c" }, getText: () => "" },
      selection: { active: { line: 0, character: 0 } },
    };
    await autoTypeEngine.startInsertion("test.comp", "testComp", "int a = 10;", mockEditor, "manual");

    const queue = autoTypeEngine.getActiveQueue();
    queue!.currentIndex = 3;

    const rewound = await renewEngine.rewindStep(mockEditor);
    expect(rewound).toBe(true);
    expect(queue!.currentIndex).toBe(2);
    expect(deleteBackwardSpy).toHaveBeenCalled();
  });

  it("renews last inserted component in automatic mode via reInsert callback", async () => {
    const target = new VSCodeTypingTarget();
    const typingEngine = new DefaultTypingEngine(target);
    const autoTypeEngine = new AutoTypeEngine(typingEngine, target);

    const mockContext: any = {
      globalState: { get: vi.fn().mockReturnValue([]), update: vi.fn() },
    };
    const sessionEngine = new SessionEngine(mockContext);
    const mockLibraryEngine: any = {
      search: vi.fn().mockResolvedValue([]),
      getSnippets: vi.fn().mockResolvedValue([]),
      findComponent: vi.fn(),
    };
    const searchEngine = new SearchEngine(mockLibraryEngine);
    const snippetEngine = new SnippetEngine(mockLibraryEngine);

    const renewEngine = new RenewEngine(
      autoTypeEngine,
      target,
      sessionEngine,
      mockLibraryEngine,
      searchEngine,
      snippetEngine
    );

    const mockEditor: any = {
      document: { uri: { toString: () => "file:///test.c" }, getText: () => "" },
      selection: { active: { line: 0, character: 0 } },
    };

    // Simulate startInsertion record
    await autoTypeEngine.startInsertion("c_bubble_sort", "bubble_sort", "void bubble_sort() {}", mockEditor, "manual");
    autoTypeEngine.cancelManualQueue(); // complete manual session

    const reInsertSpy = vi.fn().mockResolvedValue(undefined);
    const renewed = await renewEngine.renewQueue(reInsertSpy);

    expect(renewed).toBe(true);
    expect(reInsertSpy).toHaveBeenCalledWith("c_bubble_sort", "manual", { force: true });
  });

  it("toggles pause and resume on AutoTypeEngine", () => {
    const target = new VSCodeTypingTarget();
    const typingEngine = new DefaultTypingEngine(target);
    const autoTypeEngine = new AutoTypeEngine(typingEngine, target);

    expect(autoTypeEngine.isPaused()).toBe(false);

    autoTypeEngine.pause();
    expect(autoTypeEngine.isPaused()).toBe(true);

    autoTypeEngine.resume();
    expect(autoTypeEngine.isPaused()).toBe(false);

    const paused = autoTypeEngine.togglePause();
    expect(paused).toBe(true);
    expect(autoTypeEngine.isPaused()).toBe(true);

    const resumed = autoTypeEngine.togglePause();
    expect(resumed).toBe(false);
    expect(autoTypeEngine.isPaused()).toBe(false);
  });
});
