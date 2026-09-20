# Change Log

All notable changes to the "dtyp-vscode" extension will be documented in this file.

## [4.0.0] - 2026-09-20

### World-Class Flagship Release — 15 Super-Dimensions of Academic C Excellence

- **Control Center Flight Deck (`dtyp.openControlCenter`, `Ctrl+Alt+C`)**:
  - Full-screen dark-mode bento grid command center with live telemetry, typing mode toggle cards, and all tool launchers.
  - Searchable interactive keyboard shortcuts cheatsheet covering every dTyp command.
- **Academic Code Doctor & Auto-Fixer (`dtyp.diagnoseCode`, `Ctrl+Shift+L`)**:
  - Offline AST-level C linter identifying 7 critical academic bugs: uninitialized wild pointers, buffer overflows, format string mismatches, malloc-without-null-check, memory leaks, missing return statements in non-void functions, and unreachable dead code.
  - `CodeActionProvider` delivering 1-click diagnostic QuickFixes (e.g. auto-initialize pointer to `NULL`, add `if (!ptr) return NULL;`).
- **CP Contest Arena & Stress Tester (`dtyp.scaffoldContest`, `Ctrl+F9`)**:
  - 1-click competitive scaffold picker: Fast I/O (`getchar_unlocked`, ~5x faster than `scanf`), 64MB Static Bump Arena (`arena_alloc()`), and Automated Differential Stress Tester (thousands of randomized trials comparing `solve_brute()` vs `solve_optimized()`).
- **Interactive Recursion Tree Visualizer (`dtyp.visualizeRecursion`)**:
  - Live SVG recursion tree showing call stack frames, per-frame variable state, execution step scrubber, and duplicate subproblem highlighting (memoization feedback).
- **Valgrind & AddressSanitizer Memory Profiler (`dtyp.runValgrind`)**:
  - Runs `valgrind --leak-check=full` with debug symbols and parses "definitely lost" / "indirectly lost" bytes into human-friendly summaries with allocation stack traces.
  - AddressSanitizer: compiles with `-fsanitize=address,undefined` and translates cryptic ASan traces into plain English diagnostics.
- **C Typing Speed Drill Arena (`dtyp.openTypingDrill`)**:
  - Gamified TypeRacer-style drill specifically for C syntax: real-time WPM/CPM gauges, color-coded accuracy feedback, and personal high score tracking.
- **Chameleon Ghost-Typing Mode (`dtyp.toggleChameleonMode`, `Alt+C`)**:
  - Intercepts any physical keystroke and emits the exact next character, block expansion, or delimiter step-over from the queued algorithm. Eliminates any chance of accidental typos during live exams or interviews.
  - `dtyp.enableChameleonMode`: Persist Chameleon state across sessions.
- **Biomechanical Cadence & False Starts Engine**:
  - `dtyp.enableFalseStarts`: Simulates real programmer rethinking — types 2–4 characters of an alternative approach, hesitates, backspaces, then proceeds with the correct implementation.
  - Physical QWERTY key distance, hand alternation, and finger reach dynamics modulate per-character latency for ultra-realistic simulation.
- **Interactive Status Bar Quick Menu (`dtyp.openStatusBarMenu`, `Ctrl+Shift+M`)**:
  - Full-featured in-editor launcher covering all 20+ commands and visualizers with descriptive labels and keyboard hint overlays.
- **Inline Code Hover Preview (Scrollable Full Source)**:
  - Hovering over any component in the Activity Bar or QuickPick triggers a scrollable, syntax-highlighted preview of its full source code.
- **In-Flight Speed Scrubbing (`Ctrl+]` / `Ctrl+[`)**:
  - Dynamically accelerate (+25%) or decelerate (-20%) typing speed multiplier mid-flight (0.25x to 5.0x) without restarting.
- **Academic Pure Tab Formatter (`dtyp.formatAcademic`, `Shift+Alt+F`)**:
  - Enforces pure `\t` indentation, spaces around binary operators, and configurable K&R, Allman, or GNU brace styles via `dtyp.academicBraceStyle`.
- **Multi-Test Sandbox Runner (`dtyp.runTestCases`, `Ctrl+F6`)**:
  - Zero-configuration 1-click compile, run, and test suite comparing stdin/stdout with expected outputs. Includes timeout guard and preset algorithm suites.
- **Library Expanded to 665 Components**:
  - Boiler Plates: 103, Data Structures: 178, Algorithms: 164, Competitive Programming: 70, Academics Programming: 56, Projects: 30, Detection: 64.
- **Settings Overhaul (22 Clean Properties)**:
  - All 22 settings cleanly mapped to engine logic. Zero dummy/redundant settings. New properties: `enableFalseStarts`, `falseStartRate`, `enableChameleonMode`, `soundFeedback`, `switchProfile`, `academicBraceStyle`.
- **Test Suite: 146 tests across 29 suites — 100% green**.

## [3.2.0] - 2026-09-20

### Instant Pause/Resume, Renew Engine Overhaul, 4-Level Own Library, & Indentation Stability
- **Instant Pause & Resume (`Alt+P`, `dtyp.togglePauseTyping`)**:
  - Implemented interruptible sleep timer (`interruptibleSleep()`) so pause events instantly halt sleep delays, including long cognitive micro-pauses (400–1500ms).
  - Status bar updates dynamically to show `$(debug-pause) dTyp: Paused [Click to resume]` with character counts.
  - Full support across both automated continuous typing and stealth manual stepping queues.
  - Commands added: `dtyp.togglePauseTyping`, `dtyp.pauseTyping`, `dtyp.resumeTyping`.
- **Renew Engine & Rewind Upgrades (`Ctrl+Shift+R`, `dtyp.renewQueue`)**:
  - Upgraded queue renewal to support both automated mode and manual mode: cancels active session and re-initiates insertion from character 0.
  - Integrated duplicate detector bypass (`force: true`) so renewed components are never skipped as duplicates.
  - Rewind step (`Ctrl+Shift+U`, `dtyp.rewindStep`) accurately deletes backward and rewinds queue state.
  - In-file renewal (`dtyp.renewComponent`) with robust regex matching for structs, typedefs, macros, and function bodies.
- **4-Level Own Library Hierarchy**:
  - Expanded custom library hierarchy to 4 structured tiers: **Sub Domain &rarr; Topic &rarr; Sub Topic &rarr; Component**.
  - Added dedicated `topic` field across `OwnComponent`, form inputs, tree nodes (`TopicNode`), and path builders.
  - Fixed Webview focus loss: Save & Auto-Type automatically restores active document and editor focus before insertion.
- **Indentation & Formatting Stability**:
  - Added clean double-newline (`\n\n`) separation after `#include` header injections to prevent headers from fusing to structs and helper functions.
  - Added `normalizeBodyIndentation()` to prevent driver statement trimming from stripping leading 4-space indentation.
  - Corrected cursor placement landmarks to prevent indentation doubling (`targetCol = 0` for pre-indented lines).
  - Enhanced closing brace overtype matching to scan across multi-line whitespace and cleanly step over indented braces.
- **Smart Block Auto-Expansion (`enter_block`)**:
  - Implemented exact VS Code native `onEnterRules` emulation.
  - When `{` is typed followed by a line break, pairs `{}` on the same line and creates the 3-line scaffold with cursor placed at column 4.
  - Eradicates the machine artifact of spaces pushing `}` sideways across the line.
- **Universal Non-Sequential Coding**:
  - Intra-function skeleton-first drafting (`landmark: "above_return"`).
  - Resource-cleanup pairing (`landmark: "above_free"`).
  - Multi-function scaffolding with primary entry point drafted first.
- **Test Suite Expansion**:
  - 89 automated tests passing with 100% success rate across 14 test suites covering the entire engine.

## [3.1.0] - 2026-09-17

### Nonlinear Humanized C Authoring, Cognitive Pauses & Renew Engine Overhaul
- **Nonlinear C Authoring Engine**:
  - Implemented human programmer authoring flow: types scaffold (`#include` and `int main() { return 0; }`) first, jumps cursor above `main()` to declare structs, types, and helper functions, and navigates inside `main()` to complete driver logic.
  - Added structural decomposition (`CStructuralDecomposer`) and landmark-aware cursor navigation (`NonlinearAuthoringPlanner`).
  - Added `"nonlinear"` typing model setting (`dtyp.naturalTypingModel: "nonlinear"`).
- **Cognitive Pauses Engine**:
  - Multi-tier psychological hesitation modeling (`CognitivePauseModel`): control-flow formulation pauses on `if/while/for/switch` (400–800ms), syntax statement completion pauses on `;` (120–280ms), block closure review pauses on `}` (300–650ms), pointer navigation hesitation on `->` (150–320ms), argument deliberation pauses on `,` (80–180ms).
  - Micro-rest pauses sampled from a log-normal distribution every 80–130 keystrokes.
  - Dynamic stamina decay and renewal model (`StaminaRenewal`).
- **Renew Engine**:
  - Added Queue Renewal (`dtyp.renewQueue`, shortcut `Ctrl+Shift+R`) to reset active typing queue back to character 0.
  - Added Step Rewinding (`dtyp.rewindStep`, shortcut `Ctrl+Shift+U`) to undo last typed character and decrement queue index.
  - Added in-file component renewal (`dtyp.renewComponent`) and engine state cache renewal.
- **Production Engine Overhaul**:
  - `HeaderEngine`: Added detection for full C99/C11/POSIX/Windows headers (`assert.h`, `errno.h`, `stddef.h`, `float.h`, `unistd.h`, `pthread.h`, `fcntl.h`, `windows.h`).
  - `MemoryEngine`: Integrated real-time VS Code `DiagnosticCollection` squiggly warnings for unmanaged heap allocations, QuickFix `CodeActionProvider` (`free(var); var = NULL;`), and unsafe direct `realloc` reassignment checks.
  - `DuplicateDetector`: Support for distinguishing prototypes from full definitions, plus `#define` macro and `enum` collision checks.
  - `SnippetEngine`: Dynamic conversion to interactive VS Code `SnippetString` with indexed tab stops (`${1:type}`, `${2:name}`).
  - `SessionEngine`: Telemetry calculation (characters, estimated words, minutes saved) and JSON export/import.
  - `CursorEngine`: Visual editor placeholder decorations and `dtyp.hasPlaceholders` context management.
  - `UpdateEngine`: Background update check with context key `dtyp.updateAvailable`.

## [3.0.1] - 2026-09-17

### Hierarchical QuickPick Browser, Division Navigation & TreeView Alignment
- **Hierarchical QuickPick Division Browser**:
  - Rebuilt QuickPick browser (`dtyp.browseLibrary` from status bar and `dtyp.insertComponent`) with multi-step recursive taxonomy navigation.
  - Aligned root domain titles, icons, descriptions, and ordering with the sidebar TreeView (`Boiler Plates`, `Data Structures`, `Algorithms`, `Competitive Programming`, `Academics Programming`, `Projects`, `Detection`).
  - Added recursive division browsing (e.g. `Data Structures` → `Separate Components` → `Linked Lists` → `Singly Linked List`, `Doubly Linked List`, `Singly Circular Linked List`, `Doubly Circular Linked List`).
  - Integrated native VS Code Back button (`QuickInputButtons.Back`) and dynamic breadcrumb paths.
  - Added "View All" branch search option to filter across entire division subtrees.
  - Interactive action buttons for `View Documentation` (`$(book)`), `Favorite` (`$(star)`), and `Copy Code` (`$(copy)`).
- **TreeView Hierarchy & Isolation**:
  - Resolved domain-wide component spills in `getByCategoryId`. Parent category nodes strictly render sub-division folders; components only display within leaf divisions.
- **Humanized Typing & Safety Enhancements**:
  - HeaderEngine double-typing prevention for full programs containing existing `#include` statements.
  - Auto-closing bracket simulation with stack-based delimiter tracking and step-over overtyping.
  - Real-time auto-indent column tracking to eliminate false-positive cursor relocation pauses on newline inserts.
  - Manual stepping shortcut updated to `Ctrl+Shift+D` to prevent collision with VS Code multi-cursor matching.

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
