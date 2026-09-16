import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import {
  SessionManager,
  GlobalHotkeyManager,
} from "@dtyp/session-engine";
import { FileStorageService } from "@dtyp/storage";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { TypingTarget } from "@dtyp/types";

class MockHotkeyManager implements GlobalHotkeyManager {
  public registered = false;
  public async register(): Promise<void> { this.registered = true; }
  public async unregister(): Promise<void> { this.registered = false; }
  public isRegistered(): boolean { return this.registered; }
}

class MockTypingTarget implements TypingTarget {
  public typedString = "";
  public async focus(): Promise<void> {}
  public async typeCharacter(c: string): Promise<void> {
    this.typedString += c;
  }
  public async releaseModifiers(): Promise<void> {}
}

describe("Integration Test 1 & 2: Desktop Session Flow & Hotkey Lifecycle", () => {
  let tempDir: string;
  let storage: FileStorageService;
  let hotkey: MockHotkeyManager;
  let target: MockTypingTarget;
  let engine: DefaultTypingEngine;
  let manager: SessionManager;

  beforeEach(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "dtyp-integration-"));
    storage = new FileStorageService(tempDir);
    await storage.initialize();

    hotkey = new MockHotkeyManager();
    target = new MockTypingTarget();
    engine = new DefaultTypingEngine(target);

    manager = new SessionManager({
      storage,
      hotkeyManager: hotkey,
      typingEngine: engine,
    });
  });

  afterEach(async () => {
    await manager.shutdown();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("Test 1: Create session -> activate -> Ctrl+D -> target receives text character-by-character", async () => {
    const codeSnippet = "int main() {\n    return 0;\n}";
    const session = await manager.createSession({
      name: "Desktop Flow Test",
      mappings: [
        {
          id: "m1",
          input: { type: "text", content: codeSnippet },
          output: { windowTitle: "Notepad" },
        },
      ],
      typing: { delayMs: 1 },
    });

    expect(hotkey.isRegistered()).toBe(false);

    // Activate session
    await manager.activateSession(session.id);
    expect(hotkey.isRegistered()).toBe(true);

    // Simulate Ctrl+D trigger
    await manager.handleGlobalShortcut();

    // Verify target received exact character-by-character content
    expect(target.typedString).toBe(codeSnippet);
  });

  it("Test 2: Terminate -> Ctrl+D released and subsequent hotkey presses do not type", async () => {
    const session = await manager.createSession({
      name: "Termination Flow Test",
      mappings: [
        {
          id: "m1",
          input: { type: "text", content: "printf('terminated');" },
          output: { windowTitle: "Notepad" },
        },
      ],
      typing: { delayMs: 1 },
    });

    await manager.activateSession(session.id);
    expect(hotkey.isRegistered()).toBe(true);

    // Terminate session
    await manager.terminateSession(session.id);
    expect(hotkey.isRegistered()).toBe(false);

    // Trigger Ctrl+D again
    await manager.handleGlobalShortcut();

    // Verify nothing typed because session terminated
    expect(target.typedString).toBe("");
  });
});
