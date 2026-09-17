import { describe, it, expect, vi } from "vitest";
import { DefaultTypingEngine, CharacterQueue } from "@dtyp/typing-engine";
import { TypingTarget, TypingStatistics } from "@dtyp/types";

class MockTypingTarget implements TypingTarget {
  public typedCharacters: string[] = [];
  public focusCallCount = 0;
  public releaseModifiersCallCount = 0;

  public async focus(): Promise<void> {
    this.focusCallCount++;
  }

  public async typeCharacter(character: string): Promise<void> {
    this.typedCharacters.push(character);
  }

  public async releaseModifiers(): Promise<void> {
    this.releaseModifiersCallCount++;
  }
}

describe("CharacterQueue", () => {
  it("enqueues and dequeues characters sequentially", () => {
    const queue = new CharacterQueue("abc");
    expect(queue.length).toBe(3);
    expect(queue.dequeue()?.char).toBe("a");
    expect(queue.dequeue()?.char).toBe("b");
    expect(queue.dequeue()?.char).toBe("c");
    expect(queue.isEmpty()).toBe(true);
  });

  it("handles newlines and CRLF normalization", () => {
    const queue = new CharacterQueue("hello\r\nworld\n!", true);
    const chars = queue.toArray().map((q) => q.char);
    expect(chars).toEqual(["h", "e", "l", "l", "o", "\n", "w", "o", "r", "l", "d", "\n", "!"]);
  });

  it("handles tab preservation vs expansion", () => {
    const queuePreserved = new CharacterQueue("a\tb", true, true);
    expect(queuePreserved.toArray().map((q) => q.char)).toEqual(["a", "\t", "b"]);

    const queueExpanded = new CharacterQueue("a\tb", true, false);
    expect(queueExpanded.toArray().map((q) => q.char)).toEqual(["a", " ", " ", " ", " ", "b"]);
  });
});

describe("DefaultTypingEngine", () => {
  it("types text character-by-character into target", async () => {
    const target = new MockTypingTarget();
    const engine = new DefaultTypingEngine(target);

    const progressChars: string[] = [];
    engine.on("progress", (data) => {
      if (data.char) {
        progressChars.push(data.char);
      }
    });

    await engine.start("Hello", {
      delayMs: 1,
      mode: "character",
      preserveNewlines: true,
      preserveTabs: true,
    });

    expect(target.typedCharacters).toEqual(["H", "e", "l", "l", "o"]);
    expect(progressChars).toEqual(["H", "e", "l", "l", "o"]);
    expect(engine.getState()).toBe("completed");
    expect(engine.getStatistics().charactersTyped).toBe(5);
  });

  it("handles cancellation safely: clears queue and releases modifiers", async () => {
    const target = new MockTypingTarget();
    const engine = new DefaultTypingEngine(target);

    let cancelledEmitted = false;
    engine.on("cancel", () => {
      cancelledEmitted = true;
    });

    // Start long typing with delay, cancel after 2nd char
    engine.on("progress", (data) => {
      if (data.stats.charactersTyped === 2) {
        engine.cancel();
      }
    });

    await engine.start("LongTextToType", {
      delayMs: 10,
      mode: "character",
      preserveNewlines: true,
      preserveTabs: true,
    });

    expect(cancelledEmitted).toBe(true);
    expect(engine.getState()).toBe("cancelled");
    expect(target.releaseModifiersCallCount).toBeGreaterThanOrEqual(1);
    expect(target.typedCharacters.length).toBeLessThan(14);
  });

  it("supports pause and resume", async () => {
    const target = new MockTypingTarget();
    const engine = new DefaultTypingEngine(target);

    let pausedEmitted = false;
    let resumedEmitted = false;

    engine.on("pause", () => {
      pausedEmitted = true;
      // Resume shortly after
      setTimeout(() => {
        engine.resume();
      }, 20);
    });

    engine.on("resume", () => {
      resumedEmitted = true;
    });

    engine.on("progress", (data) => {
      if (data.stats.charactersTyped === 2 && !pausedEmitted) {
        engine.pause();
      }
    });

    await engine.start("ResumeMe", {
      delayMs: 5,
      mode: "character",
      preserveNewlines: true,
      preserveTabs: true,
    });

    expect(pausedEmitted).toBe(true);
    expect(resumedEmitted).toBe(true);
    expect(target.typedCharacters.join("")).toBe("ResumeMe");
    expect(engine.getState()).toBe("completed");
  });
});
