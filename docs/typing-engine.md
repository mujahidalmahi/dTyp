# dTyp Typing Engine Specification

The dTyp typing engine is a dual-mode, human-like keystroke simulation engine designed for Visual Studio Code and standalone desktop environments. It eliminates abrupt clipboard pasting in favor of realistic, organic character generation.

---

## 1. Architectural Pipeline

```
   Source Component Code
            │
            ▼
┌───────────────────────┐
│     MemoryEngine      │  ── Detects and injects missing #include headers
└───────────────────────┘
            │
            ▼
┌───────────────────────┐
│     AutoTypeEngine    │
└───────────────────────┘
            │
   ┌────────┴────────────────────────┐
   ▼                                 ▼
[AUTOMATIC MODE]              [MANUAL STEALTH MODE]
   │                                 │
CharacterQueue                Pending Step Buffer
   │                                 │
TypingScheduler                      ▼
(Delay + Gaussian Jitter)     User presses [Ctrl+D]
   │                                 │
   ▼                                 ▼
Editor Transaction            Editor Transaction
(Character-by-character)      (Batch / Character step)
   │                                 │
   └────────┬────────────────────────┘
            │
            ▼
┌───────────────────────┐
│     CursorEngine      │  ── Scans for /* TODO */ and positions cursor
└───────────────────────┘
```

---

## 2. Dual Typing Modes

### Mode 1: Automatic Streaming (`"automatic"`)
- **Continuous Keystroke Emulation**: The engine iterates through characters sequentially, inserting each character into the active `vscode.TextEditor` via an edit transaction.
- **Latency & Jitter Simulation**:
  - Base delay: Configured via `dtyp.typingDelayMs` (default `15ms`).
  - Human Jitter: Uses a randomized Gaussian variance (`± jitterMs`) to simulate human rhythm.
  - Punctuation Pauses: Slight micro-pauses after semicolons (`;`), braces (`{`, `}`), and newlines (`\n`) mimic natural pauses when writing code.
- **Indentation Preservation**: Honors existing tab and space indentations without double-spacing.

### Mode 2: Stealth Manual Stepping (`"manual"`)
- **The `Ctrl+D` Stepping Queue**: Designed specifically for high-stress scenarios, live technical interviews, lab evaluations, and demonstrations.
- **Queue Mechanics**:
  1. When a component or snippet is selected, its text is loaded into an in-memory queue.
  2. The VS Code context key `dtyp.hasQueuedCharacters` is set to `true`.
  3. A status bar indicator appears: `$(keyboard) dTyp: <N> chars [Ctrl+D to step]`.
  4. Each time the user presses **`Ctrl+D`**, the engine consumes `stepSize` characters (default `1`) from the queue and writes them directly at the active cursor position.
  5. The status bar count updates dynamically.
  6. When the queue reaches `0`, the stepping session concludes, and the context key is cleared.
- **Complete Stealth**: The user has full control over when each character appears. Keystrokes appear indistinguishable from manual typing.

---

## 3. Safety, Concurrency & Cancellation Protocol

### Cancellation (`Escape`)
- If automatic typing is active or manual characters are queued, pressing **`Escape`** invokes `dtyp.cancelTyping`.
- The scheduler loop terminates instantly.
- The manual queue buffer is discarded.
- Status bar items are removed.
- Context keys `dtyp.isTyping` and `dtyp.hasQueuedCharacters` are reset to `false`.

### Modifier Key Handling
- In standalone environments (e.g. desktop Electron), native modifier keys (`Shift`, `Ctrl`, `Alt`) are explicitly released via `KEYEVENTF_KEYUP` to prevent keyboard lockup.

### Concurrency Protection
- If a typing session is already underway, initiating a new insertion will cleanly cancel the ongoing session before starting the new one, preventing race conditions or interleaved characters.
