# Shared Typing Engine Specification

The shared typing engine (`@dtyp/typing-engine`) is responsible for delivering character-by-character typing across both the Electron Desktop Application and the VS Code Extension.

---

## Architecture Flow

```
Input Text
   │
   ▼
CharacterQueue (Normalizes CRLF, handles tabs, creates QueuedCharacters)
   │
   ▼
TypingScheduler (Controls delayMs, jitter, pause, resume, cancel)
   │
   ▼
KeyboardMapper (StandardKeyboardMapper)
   │
   ▼
TypingTarget (WindowsTypingTarget | VSCodeTypingTarget)
```

---

## Core Interfaces

```typescript
export interface TypingOptions {
  delayMs: number;
  mode: "character";
  preserveNewlines: boolean;
  preserveTabs: boolean;
  jitterMs?: number;
}

export interface TypingTarget {
  focus(): Promise<void>;
  typeCharacter(character: string): Promise<void>;
  releaseModifiers(): Promise<void>;
}

export interface TypingEngine {
  start(text: string, options: TypingOptions): Promise<void>;
  pause(): void;
  resume(): void;
  cancel(): void;
  isTyping(): boolean;
  getState(): TypingState;
  getStatistics(): TypingStatistics;
}
```

---

## Safety & Cancellation Protocol

When `cancel()` is triggered:
1. The scheduler halts the queue loop immediately.
2. The remaining character queue is cleared.
3. `target.releaseModifiers()` is invoked:
   - On Windows: Sends `KEYEVENTF_KEYUP` for `VK_SHIFT`, `VK_CONTROL`, and `VK_MENU`.
   - Prevents keyboard modifier locking.
4. The state transitions to `"cancelled"`.
5. Event listeners receive cancellation notifications.
