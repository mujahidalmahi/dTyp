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
   ▼                          User presses [Ctrl+Shift+D]
   │                                 │
VSCodeTypingTarget                   ▼
(Type / Overtype / Backspace) VSCodeTypingTarget
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
When typing opening delimiters (`(`, `[`, `{`, `"`, `'`), the engine automatically simulates VS Code's native auto-closing behavior by inserting closing pairs and positioning the cursor between them. When the token stream reaches matching closing delimiters, it smoothly steps over them via `overtypeCharacter` without creating duplicate brackets.

### B. Muscle Memory Keyword Bursts & Compound Operators
Programmers type familiar keywords and operator reflexes much faster:
- Keystrokes on 55+ common C keywords accelerate by **40% to 65%**.
- Compound operators (`->`, `==`, `!=`, `&&`, `||`, `++`, `--`) are typed as fast physical reflex pairs.

### C. Shift Key Dynamics & Cognitive Hesitations
- **Shift Key Latency**: Models the mechanical time needed to depress Shift for capital letters and shifted symbols.
- Realistic cognitive pauses are injected at structural boundaries:
  - At block openers (`{`)
  - After statement terminators (`;`)
  - At line breaks (`\n`)
  - After parameter commas (`,`)
  - At spacebar transitions between distinct words

### D. Physical QWERTY Typo Simulation & Self-Correction
Keystrokes occasionally slip to physically adjacent keys based on a QWERTY proximity map. The engine simulates a 4-step correction sequence:
1. Typo stroke (`type`)
2. Visual recognition pause (`pause`)
3. Deletion (`backspace` via `deleteBackward`)
4. Correct stroke (`type`)

### E. TypingScheduler
The `TypingScheduler` drives automatic typing by executing the queued `TypingAction` sequence. It applies dynamic per-character delays with Gaussian jitter, handles pause and resume signals seamlessly, and computes real-time typing speed metrics (characters per second and words per minute).

### F. Real-World Edge Case Guards
1. **Configurable Delay**: 1ms up to **1000ms** per character (`dtyp.typingDelayMs`).
2. **Granular Undo**: Groups edits into 2–3 character chunks so pressing `Ctrl+Z` undoes a few characters at a time (`dtyp.undoChunkSize`), with the first character opening a fresh undo stop.
3. **Cursor Relocation Guard**: If the user moves the cursor manually while typing, the engine immediately pauses and offers a prompt to resume or realign.
4. **Tab-Switch Guard**: If the user switches editor tabs while typing, the engine pauses immediately to prevent code corruption in other files.
