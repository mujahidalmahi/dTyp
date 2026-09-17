# Change Log

All notable changes to the "dtyp-vscode" extension will be documented in this file.

## [3.0.0] - 2026-09-17

### Humanized Natural Typing Engine & Production Modernization
- **Humanized Natural Typing Engine**:
  - **Intelligent Delimiter Overtyping**: Detects editor auto-closed delimiters (`)`, `}`, `]`, `"`, `'`) and executes step-over overtyping (`overtypeCharacter`) without inserting duplicate tokens.
  - **Human Cadence & Muscle Memory Bursts**: 35%–60% faster typing speed on 55+ common C keywords (`int`, `return`, `printf`, `struct`, `sizeof`, `typedef`, etc.).
  - **Cognitive Hesitations**: Natural human pauses before block openers (`{`), line breaks (`\n`), statement terminators (`;`), and parameter separators (`,`).
  - **QWERTY Proximity Typos & Self-Correction**: Realistic physical keyboard slip simulation with immediate 4-step self-correction (`type` -> `pause` -> `backspace` -> `correct`).
  - **Dual Mode Support**: Full humanized cadence and typo correction in both Automatic Streaming and Stealth Manual (`Ctrl+D`) stepping modes.
- **New Active Configuration Options**:
  - `dtyp.naturalTypingModel`: Switch between `"humanized"` (default) and `"linear"`.
  - `dtyp.enableTypoSimulation`: Enable/disable physical keyboard typo generation (default: `true`).
  - `dtyp.typoRate`: Probability of typing mistakes per alphabetic stroke (default: `0.015`).
  - `dtyp.typingDelayMs`: Expanded range from 1ms up to **1000ms**.
  - `dtyp.undoChunkSize`: Granular undo stops (1–10 characters, default: `3` characters max per `Ctrl+Z`).
- **UI/UX Modernization**:
  - Preloaded QuickPick with inline item action buttons (`$(book)` View Docs, `$(star)` Favorite, `$(copy)` Copy Code).
  - Themed domain browser with custom icons and component action triggers.
  - Interactive hover tooltips with complexity metadata and clickable command links.
  - Complete removal of legacy templates.

## [2.0.0] - 2026-09-17

### Major Architecture & Production Overhaul
- **Dual Typing Modes & Edge-Case Guards**:
  - Configurable typing delay from 1ms up to **1000ms** (`dtyp.typingDelayMs`) with realistic Gaussian jitter.
  - **Granular 2–3 Character Undo Chunks**: Pressing `Ctrl+Z` steps back 2–3 characters at a time (`dtyp.undoChunkSize`).
  - **Cursor Relocation Guard**: Pauses typing if the cursor is manually moved, offering interactive resume options.
  - **Tab-Switch Guard**: Automatically halts typing when switching editor tabs or files.
  - **Stealth Manual Mode (`Ctrl+D`)**: Queues code into a stepping buffer with instant flush (`dtyp.flushRemaining`).
- **8 Production Engines**:
  - **HeaderEngine**: Analyzes required C headers (`<stdlib.h>`, `<stdbool.h>`, `<stdio.h>`, etc.) and injects them without duplicates.
  - **MemoryEngine**: Scans dynamic heap allocations (`malloc`, `calloc`, `realloc`), checks for matching `free()`, and warns of leaks.
  - **AutoTypeEngine**: Orchestrates character queues, typing schedulers, cursor jump policies, and tab-switch guards.
  - **CursorEngine**: Placeholder detection and bi-directional navigation (`Alt+Down` / `Alt+Up`).
  - **SessionEngine**: Insertion history tracking, favorites list, and session statistics.
  - **SearchEngine**: Fuzzy trigram search with relevance score ranking and category scoping.
  - **SnippetEngine**: Live snippet provider with tab-stops (`$1`, `$2`, `$0`) across 1,492 structured snippets.
  - **UpdateEngine**: Automatic background check against GitHub releases with direct VSIX download.
- **500 Compilable C Components (Zero-Comments Invariant)**:
  - 100% verified zero-comments C implementations across 7 canonical domains: `boiler-plates` (64), `data-structures` (126), `algorithms` (120), `competitive-programming` (50), `academics-programming` (46), `projects` (30), `detection` (64).
- **1,492 Structured Snippets & 500 Markdown Documentation Pages**:
  - Hierarchical and alias snippet prefixes (`dtyp.<domain>.<type>.<topic>.<subtopic>.<name>`).
  - Full standalone Markdown documentation for every component viewable inside VS Code (`dtyp.viewDocumentation`).
- **Interactive QuickPick with Item Action Buttons**:
  - Instant preloaded component list with action buttons to View Docs, Toggle Favorites, and Copy Code.

## [1.0.0] - 2026-09-16

- Initial production release.
- Added 1,090 validated academic C programming components across 24 categories.
- Offline SQLite database integration (`dtyp.db`).
- Character-by-character editor insertion via queue scheduler.
- Autocomplete provider with `category>component()` syntax.
- DAG dependency resolver with cycle detection.
- Duplicate detection preventing re-insertion of existing functions and structs.
