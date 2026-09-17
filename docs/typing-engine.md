# dTyp Humanized Typing Engine Specification (v3.0)

The dTyp typing engine is a dual-mode, humanized keystroke simulation engine designed for Visual Studio Code. It eliminates abrupt clipboard pasting in favor of realistic, organic character generation that simulates how real programmers type in modern IDEs.

---

## 1. Architectural Pipeline

```
   Source Component Code
            │
            ▼
┌───────────────────────┐
│     HeaderEngine      │  ── Analyzes and injects missing standard C headers
└───────────────────────┘
            │
            ▼
┌───────────────────────┐
│  StructuralTokenizer  │  ── Identifies keywords, hesitations, closing delimiters, and typos
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
TypingScheduler               Pending Action Queue
(Cadence + Jitter + Typos)           │
   │                                 ▼
   ▼                          User presses [Ctrl+D]
VSCodeTypingTarget                   │
(Type / Overtype / Backspace)        ▼
   │                          VSCodeTypingTarget
   │                          (Type / Overtype / Backspace)
   │                                 │
   └────────┬────────────────────────┘
            │
            ▼
┌───────────────────────┐
│     CursorEngine      │  ── Scans for /* TODO */ and positions cursor
└───────────────────────┘
```

---

## 2. Core Capabilities

### A. Intelligent Delimiter Pairing & Overtyping
When a human types `{` or `(`, modern editors like VS Code auto-insert the closing partner `}` or `)`. The typing engine marks closing delimiters as `overtype` actions. The target checks if the character at the active cursor position already matches the closing delimiter:
- If it matches: smoothly steps the cursor over by 1 character without inserting a duplicate.
- If it does not match: safely inserts the character.

### B. Muscle Memory Keyword Bursts
Programmers type familiar keywords much faster. Keystrokes on 55+ common C keywords accelerate by **35% to 60%**.

### C. Cognitive Hesitations
Realistic pauses are injected at structural boundaries:
- Before block openers (`{`)
- After statement terminators (`;`)
- At line breaks (`\n`)
- After parameter commas (`,`)

### D. Physical QWERTY Typo Simulation & Self-Correction
Keystrokes occasionally slip to physically adjacent keys based on a QWERTY proximity map. The engine simulates a 4-step correction sequence:
1. Typo stroke (`type`)
2. Visual recognition pause (`pause`)
3. Deletion (`backspace` via `deleteBackward`)
4. Correct stroke (`type`)

### E. Real-World Edge Case Guards
1. **Configurable Delay**: 1ms up to **1000ms** per character (`dtyp.typingDelayMs`).
2. **Granular Undo**: Groups edits into 2–3 character chunks so pressing `Ctrl+Z` undoes a few characters at a time (`dtyp.undoChunkSize`).
3. **Cursor Relocation Guard**: If the user moves the cursor manually while typing, the engine immediately pauses and offers a prompt to resume or realign.
4. **Tab-Switch Guard**: If the user switches editor tabs while typing, the engine pauses immediately to prevent code corruption in other files.
