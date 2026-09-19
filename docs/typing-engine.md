# dTyp Humanized Typing Engine Specification (v3.2)

The dTyp typing engine is a dual-mode, humanized keystroke simulation engine designed for Visual Studio Code. It eliminates abrupt clipboard pasting in favor of realistic, organic character generation that simulates how real programmers type in modern IDEs.

---

## 1. Architectural Pipeline

```
          Source Component Code (Built-in or Own Library)
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │                 HeaderEngine                 │  ── Injects missing headers
         └──────────────────────────────────────────────┘
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │ NonlinearAuthoringPlanner / Decomposer       │  ── Plans skeleton-first drafting
         └──────────────────────────────────────────────┘
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │              StructuralTokenizer             │  ── Tokenizes into TypingActions
         │  (Keywords, Delimiters, enter_block, Typos)  │
         └──────────────────────────────────────────────┘
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │                AutoTypeEngine                │
         └──────────────────────────────────────────────┘
                                │
         ┌──────────────────────┴───────────────────────┐
         ▼                                              ▼
  [AUTOMATIC MODE]                             [MANUAL STEALTH MODE]
         │                                              │
  TypingScheduler                              Pending Action Queue
  (Cadence + Jitter + Typos)                            │
         │                                              ▼
         ▼                                     User presses [Ctrl+Shift+D]
  VSCodeTypingTarget                                    │
  (Type / EnterBlock / Overtype / Backspace)            ▼
         │                                     VSCodeTypingTarget
         │                                     (Type / EnterBlock / Overtype / Backspace)
         └──────────────────────┬───────────────────────┘
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │                 CursorEngine                 │  ── Navigates placeholders / TODOs
         └──────────────────────────────────────────────┘
```

---

## 2. Core Capabilities

### A. Smart Block Auto-Expansion (`enter_block`)
When opening a block (e.g. `int main(void) {`), pressing Enter in VS Code triggers native `onEnterRules`, creating a 3-line scaffold:
```c
int main(void) {
    |
}
```
dTyp executes this through an atomic `enter_block` action:
1. Emits the block header and opening brace (`{`).
2. Dispatches an enter-block event that creates 3 lines: line 1 keeps the opening brace, line 2 is indented with 4 spaces with the cursor placed at column 4, and line 3 holds the closing brace `}` at column 0.
3. Completely avoids manual indentation typing and eliminates sideways brace shifting.

### B. Universal Non-Sequential Authoring
Real programmers construct code non-linearly:
- **Intra-Function Skeleton-First Drafting**: Writes the function header and block scaffold &rarr; immediately drafts exit points (`return 0;`) &rarr; jumps cursor back up (`landmark: "above_return"`) to author statements and business logic.
- **Allocation-Cleanup Pairing**: When dynamic heap memory is allocated (`malloc`), the planner immediately writes cleanup code at function exit (`free`) &rarr; navigates upward (`above_free`) to author processing logic.
- **Multi-Function Scaffolding**: Emits declarations and helper signatures before authoring implementation bodies.

### C. Delayed-Recognition Typo Bursts
Real humans overshoot typos before recognizing them:
1. Typo stroke (`type`)
2. 1–2 character overshoot stroke (`type`)
3. Cognitive realization pause (`pause`)
4. Double backspace (`backspace` x 2)
5. Correct keystroke sequence (`type`)

### D. Muscle Memory Keyword Bursts & Compound Operators
Programmers type familiar keywords and operator reflexes much faster:
- Keystrokes on 55+ common C keywords accelerate by **40% to 65%**.
- Compound operators (`->`, `==`, `!=`, `&&`, `||`, `++`, `--`) are typed as fast physical reflex pairs.
- Natural cognitive pauses occur around binary operators (`+`, `-`, `=`, `==`), parameter commas (`comma_parameter`), and statement ends (`post_statement`).

### E. Shift Key Dynamics & Cognitive Hesitations
- **Shift Key Latency**: Models the mechanical time needed to depress Shift for capital letters and shifted symbols.
- Realistic cognitive pauses are injected at structural boundaries:
  - At block openers (`{`)
  - After statement terminators (`;`)
  - At line breaks (`\n`)
  - After parameter commas (`,`)
  - At spacebar transitions between distinct words

### F. TypingScheduler
The `TypingScheduler` drives automatic typing by executing the queued `TypingAction` sequence. It applies dynamic per-character delays with Gaussian jitter, handles pause and resume signals seamlessly, and computes real-time typing speed metrics (characters per second and words per minute).

### G. Real-World Edge Case Guards
1. **Configurable Delay**: 1ms up to **1000ms** per character (`dtyp.typingDelayMs`).
2. **Granular Undo**: Groups edits into 2–3 character chunks so pressing `Ctrl+Z` undoes a few characters at a time (`dtyp.undoChunkSize`), with the first character opening a fresh undo stop.
3. **Cursor Relocation Guard**: If the user moves the cursor manually while typing, the engine immediately pauses and offers a prompt to resume or realign.
4. **Tab-Switch Guard**: If the user switches editor tabs while typing, the engine pauses immediately to prevent code corruption in other files.
