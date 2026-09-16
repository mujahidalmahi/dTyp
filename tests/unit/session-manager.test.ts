import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import {
  SessionManager,
  GlobalHotkeyManager,
  TargetRecovery,
} from "@dtyp/session-engine";
import { FileStorageService } from "@dtyp/storage";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { WindowInfo, TypingTarget } from "@dtyp/types";

class MockHotkeyManager implements GlobalHotkeyManager {
  public registered = false;
  public registerCallCount = 0;
  public unregisterCallCount = 0;

  public async register(): Promise<void> {
    this.registered = true;
    this.registerCallCount++;
  }

  public async unregister(): Promise<void> {
    this.registered = false;
    this.unregisterCallCount++;
  }

  public isRegistered(): boolean {
    return this.registered;
  }
}

class MockTypingTarget implements TypingTarget {
  public typed: string[] = [];
  public async focus(): Promise<void> {}
  public async typeCharacter(c: string): Promise<void> {
    this.typed.push(c);
  }
  public async releaseModifiers(): Promise<void> {}
}

describe("SessionManager Lifecycle & Invariants", () => {
  let tempDir: string;
  let storage: FileStorageService;
  let hotkey: MockHotkeyManager;
  let typingEngine: DefaultTypingEngine;
  let manager: SessionManager;

  beforeEach(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "dtyp-test-"));
    storage = new FileStorageService(tempDir);
    await storage.initialize();

    hotkey = new MockHotkeyManager();
    typingEngine = new DefaultTypingEngine(new MockTypingTarget());

    manager = new SessionManager({
      storage,
      hotkeyManager: hotkey,
      typingEngine,
    });
  });

  afterEach(async () => {
    await manager.shutdown();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("creates and retrieves a session", async () => {
    const session = await manager.createSession({
      name: "C Lab Session",
      mappings: [
        {
          id: "m1",
          input: { type: "text", content: "printf(\"test\");" },
          output: { windowTitle: "Notepad" },
        },
      ],
    });

    expect(session.id).toBeDefined();
    expect(session.state).toBe("inactive");
    expect(session.name).toBe("C Lab Session");

    const fetched = await storage.getSession(session.id);
    expect(fetched?.name).toBe("C Lab Session");
  });

  it("registers Ctrl+D on session activation and unregisters on deactivation", async () => {
    const session = await manager.createSession({
      name: "Active Session",
      mappings: [],
    });

    expect(hotkey.isRegistered()).toBe(false);

    await manager.activateSession(session.id);
    expect(hotkey.isRegistered()).toBe(true);
    expect(manager.getActiveSessionId()).toBe(session.id);

    await manager.deactivateSession(session.id);
    expect(hotkey.isRegistered()).toBe(false);
    expect(manager.getActiveSessionId()).toBeNull();
  });

  it("Invariant 2: Ctrl+D must be released when a session terminates", async () => {
    const session = await manager.createSession({
      name: "Termination Session",
      mappings: [],
    });

    await manager.activateSession(session.id);
    expect(hotkey.isRegistered()).toBe(true);

    await manager.terminateSession(session.id);
    expect(hotkey.isRegistered()).toBe(false);

    const termSession = await storage.getSession(session.id);
    expect(termSession?.state).toBe("terminated");
  });

  it("Invariant 2: Ctrl+D released on manager shutdown", async () => {
    const session = await manager.createSession({
      name: "Shutdown Session",
      mappings: [],
    });

    await manager.activateSession(session.id);
    expect(hotkey.isRegistered()).toBe(true);

    await manager.shutdown();
    expect(hotkey.isRegistered()).toBe(false);
  });
});

describe("TargetRecovery", () => {
  const recovery = new TargetRecovery();
  const windows: WindowInfo[] = [
    { handle: "0x100A", title: "Untitled - Notepad", processName: "notepad.exe", executablePath: "C:\\Windows\\notepad.exe" },
    { handle: "0x200B", title: "Visual Studio Code", processName: "code.exe", executablePath: "C:\\VSCode\\code.exe" },
    { handle: "0x300C", title: "Document1 - Word", processName: "winword.exe" },
  ];

  it("recovers target by exact handle", async () => {
    const res = await recovery.resolveTarget({ windowHandle: "0x100A" }, windows);
    expect(res.resolved?.processName).toBe("notepad.exe");
    expect(res.strategy).toBe("exact_handle");
  });

  it("recovers target by process name when handle is stale", async () => {
    const res = await recovery.resolveTarget({ windowHandle: "0x9999", processName: "code.exe" }, windows);
    expect(res.resolved?.handle).toBe("0x200B");
    expect(res.strategy).toBe("process_name");
  });

  it("recovers target by window title matching", async () => {
    const res = await recovery.resolveTarget({ windowTitle: "Notepad" }, windows);
    expect(res.resolved?.handle).toBe("0x100A");
    expect(res.strategy).toBe("window_title");
  });

  it("returns unresolved gracefully when no target matches", async () => {
    const res = await recovery.resolveTarget({ windowTitle: "NonExistentApp" }, windows);
    expect(res.resolved).toBeNull();
    expect(res.strategy).toBe("unresolved");
  });
});
