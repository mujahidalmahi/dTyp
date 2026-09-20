# dTyp Architecture Guide (v4.0)

## Overview

**dTyp (Don't Tell Your Professor)** is a production-grade VS Code extension and offline academic C programming ecosystem providing instant offline C code insertion, smart context awareness, customizable Own Library authoring, interactive visualizers, automated diagnostics, and humanized character-by-character editor typing simulation.

```
                                dTyp Workspace
                                      │
                                 apps/vscode
                             (VS Code Extension)
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
   Activity Bar & Views         Core Engines                Data & Storage
  (Library Explorer,         (AutoType, Header,          (WebAssembly sql.js +
   Own Library Explorer,      Memory, Cursor,             Local JSON Storage)
   Favorites, History,        Snippet, Session,                    │
   Quick Controls,            Search, Update,           ┌──────────┴──────────┐
   Control Center Flight Deck, Code Doctor,             │                     │
   Recursion Visualizer,      Contest Scaffolder,      SQLite (dtyp.db)     own-library.json
   Typing Drill Arena,        Valgrind Runner,         665 C Components     Custom Library
   Release Notes Webview)     Sandbox Compiler)
         │                            │                            │
         └────────────────────────────┼────────────────────────────┘
                                      │
                                 Shared Core
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
   typing-engine                  utilities                    validation
(HumanCadence,               (Logger, Events,             (Component Validator,
 StructuralTokenizer,         File I/O, Jitter)            Zero-Comments Invariant)
 Non-Linear Planner,
 Decomposer, Target)
```

---

## 1. Extension Lifecycle & Initialization

When Visual Studio Code activates `dtyp-vscode`:
1. **Database & WASM Bootstrap**: `LibraryEngine` loads `sql-wasm.wasm` and opens `library/dtyp.db` via `sql.js` purely in memory. No native C++ addons are loaded, guaranteeing cross-platform compatibility across Windows, macOS, and Linux.
2. **Own Library Storage**: `OwnLibraryStorage` initializes and reads user components from `globalStorageUri/own-library.json`, enabling offline custom component persistence, CRUD operations, and JSON export/import.
3. **Core Production Engines**:
   - `AutoTypeEngine`: Dual-mode orchestrator supporting humanized cadence across both automatic streaming and `Ctrl+Shift+D` manual stepping, plus Chameleon Ghost-Typing and false start simulations.
   - `NonlinearAuthoringPlanner` & `CStructuralDecomposer`: Transforms linear code into realistic human drafting sequences (drafting skeletons first, pairing resource allocations with cleanups).
   - `CodeDoctorProvider`: AST-based defect analyzer inspecting active C files for 7 classic bugs (uninitialized pointers, buffer overflows, format mismatches, memory leaks, missing returns) with instant 1-click QuickFixes.
   - `ContestScaffolder`: 1-click competitive programming workspace generator with fast I/O, 64MB bump arena, and differential randomized stress testing.
   - `ValgrindRunner`: Memory leak profiling and AddressSanitizer runtime diagnostics engine.
   - `SandboxCompiler`: Zero-configuration multi-test runner and terminal executor with GCC/Clang autodetect.
   - `HeaderEngine`: Scans code requirements and safely injects missing standard headers (`<stdlib.h>`, `<stdbool.h>`, `<stdio.h>`, `<math.h>`) at top of file.
   - `MemoryEngine`: Scans dynamic heap allocations (`malloc`, `calloc`, `realloc`), checks for matching `free()`, and warns of leaks.
   - `CursorEngine`: Placeholder token detection and bidirectional navigation (`Alt+Down` / `Alt+Up`).
   - `SnippetEngine`: Completion item provider serving 1,492 tab-stop snippets.
   - `SessionEngine`: Restores and persists insertion history and starred favorites.
   - `SearchEngine`: Sub-millisecond scored fuzzy search with category prefixes (`boiler:`, `ds:`, `algo:`, `own:`).
   - `UpdateEngine`: Non-intrusive background check against GitHub releases.
4. **Activity Bar & Webview Registration**:
   - `LibraryTreeProvider` -> `dtyp.libraryView` (665 components across 7 themed domains)
   - `OwnLibraryTreeProvider` -> `dtyp.ownLibraryView` (custom user components organized hierarchically)
   - `FavoritesTreeProvider` -> `dtyp.favoritesView`
   - `HistoryTreeProvider` -> `dtyp.historyView`
   - `QuickActionsProvider` -> `dtyp.quickActionsView`
   - `ControlCenterPanel` -> `dtyp.openControlCenter` (`Ctrl+Alt+C`)
   - `RecursionVisualizerPanel` -> `dtyp.visualizeRecursion` (`Ctrl+Shift+K`)
   - `TypingDrillPanel` -> `dtyp.startTypingDrill` (`Ctrl+Shift+T`)
   - `ReleaseNotesPanel` -> `dtyp.showReleaseNotes`
5. **Lifecycle Hooks**:
   - Check if an extension version upgrade occurred. If so, display the interactive "What's New in v4.0" Release Notes Webview.
   - If `dtyp.checkForUpdates` is true, schedule an asynchronous non-blocking GitHub release check.

---

## 2. Humanized Natural Typing Architecture

dTyp v3.2 features an industry-leading natural typing pipeline in `packages/typing-engine`:

### 1. `HumanCadence`
- **QWERTY Physical Proximity Map**: Maps adjacent keys on physical QWERTY layout for realistic human typo simulation.
- **Delayed Typo Bursts**: Models real human overshoot &rarr; cognitive realization pause &rarr; double backspace &rarr; correct typing.
- **Keyword Burst Acceleration**: Muscle-memory speedup (40%–65% faster) on 55+ common C keywords (`int`, `return`, `printf`, `struct`, `typedef`, etc.).
- **Operator Whitespace Rhythm & Compound Reflexes**: Fast reflex strokes for C operators (`->`, `==`, `!=`, `&&`, `||`, `++`, `--`), with natural hesitation before and after binary operators.
- **Shift Dynamics & Hesitations**: Models Shift-key preparation latency and natural cognitive pauses at block openers (`{`), statement ends (`;`), line breaks (`\n`), and parameter commas (`comma_parameter`).

### 2. `StructuralTokenizer` & Smart Block Auto-Expansion
- Parses C source into an executable stream of `TypingAction` objects (`type`, `enter_block`, `overtype`, `backspace`, `pause`).
- Emits `enter_block` actions on opening braces that insert a 3-line indented scaffold with the cursor positioned at column 4 on line 2 and the closing brace on line 3, emulating VS Code's native `onEnterRules`.
- Tracks delimiter nesting stacks to tag opening brackets (`(`, `[`, `{`, `"`, `'`) with matching `autoClose` metadata.
- Emits `overtype` step-overs for matching closing delimiters to mirror VS Code's native auto-closing behavior.
- Injects delayed-recognition typo sequences: typo &rarr; overshoot &rarr; hesitation &rarr; 2x backspace &rarr; correct token.

### 3. `NonlinearAuthoringPlanner` & `CStructuralDecomposer`
- Deconstructs complete C code into logical landmarks: function signatures, skeleton returns, resource allocations, cleanups, and inner statement bodies.
- Generates non-sequential authoring steps:
  - Writes function signature and block scaffold.
  - Drafts exit point first (e.g. `return 0;`).
  - Navigates cursor back up (`landmark: "above_return"`) to author processing logic.
  - Pairs heap allocations with immediate cleanups before filling intermediate logic.

### 4. `TypingScheduler`
- Manages action execution timing with millisecond jitter and pause/resume lifecycle.
- Dispatches character insertions, block expansions, delimiter overtypes, backward deletions, and cognitive pauses.
- Emits real-time typing progress events and calculates words-per-minute / characters-per-second statistics.

### 5. `VSCodeTypingTarget`
- Implements `typeCharacter` with auto-closing pair simulation.
- Implements `enterBlock`: expands 3-line scaffold with cursor at column 4 on line 2.
- Implements `overtypeCharacter`: steps over matching delimiters already inserted by auto-closing pairs.
- Implements `deleteBackward`: deletes preceding characters for typo self-correction.
- Implements **Cursor Relocation Guard** and **Tab-Switch Guard**.
- Implements **Granular Undo Chunks** (2–3 characters per `Ctrl+Z`).
- Implements stealth stepping via `Ctrl+Shift+D`.
