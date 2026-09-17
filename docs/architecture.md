# dTyp Architecture Guide (v3.0)

## Overview

**dTyp (Don't Tell Your Professor)** is a production-grade VS Code extension and offline academic C programming ecosystem providing instant offline C code insertion, smart context awareness, and humanized character-by-character editor typing simulation.

```
                                dTyp Workspace
                                      │
                                 apps/vscode
                             (VS Code Extension)
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
   Activity Bar & Views         8 Core Engines               Database & Query
  (Library Explorer,         (AutoType, Header,            (WebAssembly sql.js)
   Favorites, History,        Memory, Cursor,                      │
   Quick Controls,            Snippet, Session,         SQLite Database (dtyp.db)
    Release Notes Webview)    Search, Update)            500 Offline C Components
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
 Scheduler, Target)
```

---

## 1. Extension Lifecycle & Initialization

When Visual Studio Code activates `dtyp-vscode`:
1. **Database & WASM Bootstrap**: `LibraryEngine` loads `sql-wasm.wasm` and opens `library/dtyp.db` via `sql.js` purely in memory. No native C++ addons are loaded, guaranteeing cross-platform compatibility across Windows, macOS, and Linux.
2. **8 Production Engines**:
   - `AutoTypeEngine`: Dual-mode orchestrator supporting humanized cadence across both automatic streaming and `Ctrl+Shift+D` manual stepping.
   - `HeaderEngine`: Scans code requirements and safely injects missing standard headers (`<stdlib.h>`, `<stdbool.h>`, `<stdio.h>`, `<math.h>`) at top of file.
   - `MemoryEngine`: Scans dynamic heap allocations (`malloc`, `calloc`, `realloc`), checks for matching `free()`, and warns of leaks.
   - `CursorEngine`: Placeholder token detection and bidirectional navigation (`Alt+Down` / `Alt+Up`).
   - `SnippetEngine`: Completion item provider serving 1,492 tab-stop snippets.
   - `SessionEngine`: Restores and persists insertion history and starred favorites.
   - `SearchEngine`: Sub-millisecond scored fuzzy search with category prefixes (`boiler:`, `ds:`, `algo:`).
   - `UpdateEngine`: Non-intrusive background check against GitHub releases.
3. **Activity Bar TreeView Registration**:
   - `LibraryTreeProvider` -> `dtyp.libraryView` (500 components across 7 themed domains)
   - `FavoritesTreeProvider` -> `dtyp.favoritesView`
   - `HistoryTreeProvider` -> `dtyp.historyView`
   - `QuickActionsProvider` -> `dtyp.quickActionsView`
4. **Lifecycle Hooks**:
   - Check if an extension version upgrade occurred. If so, display the interactive "What's New in v3.0" Release Notes Webview.
   - If `dtyp.checkForUpdates` is true, schedule an asynchronous non-blocking GitHub release check.

---

## 2. Humanized Natural Typing Architecture

dTyp v3.0 introduces a dedicated natural typing pipeline in `packages/typing-engine`:

### 1. `HumanCadence`
- **QWERTY Physical Proximity Map**: Maps adjacent keys on physical QWERTY layout for realistic human typo simulation.
- **Keyword Burst Acceleration**: Muscle-memory speedup (40%–65% faster) on 55+ common C keywords (`int`, `return`, `printf`, `struct`, `typedef`, etc.).
- **Compound Operators**: Fast reflex strokes for C operators (`->`, `==`, `!=`, `&&`, `||`, `++`, `--`, etc.).
- **Shift Dynamics & Hesitations**: Models Shift-key preparation latency and natural cognitive pauses at block openers (`{`), statement ends (`;`), line breaks (`\n`), and parameter commas (`,`).

### 2. `StructuralTokenizer`
- Parses C source into an executable stream of `TypingAction` objects (`type`, `overtype`, `backspace`, `pause`).
- Tracks delimiter nesting stacks to tag opening brackets (`(`, `[`, `{`, `"`, `'`) with matching `autoClose` metadata.
- Emits `overtype` step-overs for matching closing delimiters to mirror VS Code's native auto-closing behavior.
- Injects 4-step typo correction sequences: `type` (typo) &rarr; `pause` (recognition) &rarr; `backspace` (delete) &rarr; `type` (correct).

### 3. `TypingScheduler`
- Manages action execution timing with millisecond jitter and pause/resume lifecycle.
- Dispatches character insertions, delimiter overtypes, backward deletions, and cognitive pauses to the keyboard mapper.
- Emits real-time typing progress events and calculates words-per-minute / characters-per-second statistics.

### 4. `VSCodeTypingTarget`
- Implements `typeCharacter` with auto-closing pair simulation.
- Implements `overtypeCharacter`: steps over matching delimiters already inserted by auto-closing pairs.
- Implements `deleteBackward`: deletes preceding characters for typo self-correction.
- Implements **Cursor Relocation Guard** and **Tab-Switch Guard**.
- Implements **Granular Undo Chunks** (2–3 characters per `Ctrl+Z`).
