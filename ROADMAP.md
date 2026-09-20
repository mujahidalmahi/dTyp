# dTyp Roadmap & Vision

This document outlines the strategic roadmap for the **dTyp** developer ecosystem.

---

## 🚀 Released: Version 4.0.0 (Current Production Release)

- [x] **Control Center Flight Deck (`dtyp.openControlCenter`, `Ctrl+Alt+C`)**:
  - Fullscreen dark-mode flight deck with bento grid layout, live telemetry, and instant mode switching.
  - Searchable interactive shortcuts cheatsheet with one-click command execution.
- [x] **Academic Code Doctor & Auto-Fixer (`dtyp.diagnoseCode`, `Ctrl+Shift+L`)**:
  - Offline AST linter identifying 7 classic C bugs (uninitialized pointers, buffer overflows, format mismatches, memory leaks, missing returns).
  - 1-click QuickFix actions directly in the editor.
- [x] **CP Contest Arena & Scaffolder (`dtyp.scaffoldContest`)**:
  - Automated scaffolding for Fast I/O (`getchar_unlocked`), 64MB Static Bump Arena, and randomized differential stress testing.
- [x] **Interactive Recursion Tree Visualizer (`dtyp.visualizeRecursion`, `Ctrl+Shift+K`)**:
  - Interactive SVG call stack visualizer with step scrubber, call depth tracking, and duplicate subproblem detection.
- [x] **Valgrind & AddressSanitizer Memory Profiler (`dtyp.runValgrind`, `Ctrl+Shift+V`)**:
  - Automated Valgrind leak detection with stack trace parser and AddressSanitizer runtime UB guards.
- [x] **Interactive C Typing Drill Arena (`dtyp.startTypingDrill`, `Ctrl+Shift+T`)**:
  - Gamified touch-typing practice arena with real-time WPM, accuracy %, and C syntax drills.
- [x] **Chameleon Ghost-Typing Mode (`dtyp.enableChameleonMode`, `Alt+C`)**:
  - Type ANY key on physical keyboard to emit the exact next character from the queued algorithm.
- [x] **Biomechanical Cadence & False Starts Engine (`dtyp.enableFalseStarts`)**:
  - Hand alternation, finger reach dynamics, QWERTY physical key distance modeling, and realistic rethink/false start pauses.
- [x] **Interactive Status Bar Quick Menu (`dtyp.openStatusBarMenu`, `Ctrl+Shift+M`)**:
  - Comprehensive launcher providing 1-click access to all 20+ commands, visualizers, and tools.
- [x] **665 Compilable C Components (Zero Comments)**:
  - Library expanded to 665 components across 7 canonical domains with 1,492 snippets.
- [x] **Settings Overhaul & Zero-Conflict Configuration**:
  - 22 cleanly mapped settings covering cadence, formatting, sounds, and UI options.

---

## 🚀 Released: Version 3.2.0

- [x] **Smart Block Auto-Expansion (`enter_block`)**:
  - Emulates VS Code native `onEnterRules` block indentation.
  - Automatically creates a 3-line scaffold when opening braces are typed (`{\n    \n}`), placing cursor at column 4 on line 2.
  - Pushes closing brace to line 3 with 0-column indent, eliminating sideways brace sliding and duplicate manual indenting.
- [x] **Universal Non-Sequential Coding**:
  - `CStructuralDecomposer` and `NonlinearAuthoringPlanner` for non-linear code authoring.
  - Intra-function skeleton-first drafting: drafts function header &rarr; skeleton return (`return 0;`) &rarr; jumps back (`above_return`) to author logic and local variables.
  - Allocation-cleanup pairing: writes resource allocation (`malloc`) &rarr; exit cleanup (`free`) &rarr; navigates upward (`above_free`) to fill operational code.
  - Multi-function scaffolding: emits helper structs and signatures first before authoring implementation bodies.
- [x] **Own Library Custom Component Creator & Manager**:
  - Dedicated Activity Bar View (`dtyp.ownLibraryView`) with hierarchical domain navigation (`Own Library` > Sub-domain > Topic > Sub-topic > Component).
  - Native 10-field editor form (Name, Sub-domain, Topic, Sub-topic, Description, Signature, Code, Language, Input Type, Output Type).
  - Fully integrated with all 8 core engines (AutoType, Header, Memory, Cursor, Snippet, Session, Search).
  - Local JSON persistent storage (`globalStorageUri/own-library.json`) with one-click export and import.
- [x] **Natural Typing Kinetics & Cadence**:
  - Delayed-recognition typo bursts: models 1–2 character overshoots before human realization, followed by double backspace and correction.
  - Operator rhythm: cadence acceleration and realistic whitespace hesitation around binary operators (`+`, `-`, `=`, `==`, `!=`, etc.).
  - Parameter comma pauses (`comma_parameter`) and post-statement breathing breaks (`post_statement`).
  - Stealth stepping via **`Ctrl+Shift+D`**.

---

## 🚀 Released: Version 3.0.0

- [x] **Humanized Natural Typing Engine**:
  - Intelligent auto-closing delimiter step-over (`overtypeCharacter`).
  - Muscle-memory keyword burst acceleration (35%–60% faster on 55+ C keywords).
  - Cognitive hesitations at structural junctions (`{`, `\n`, `;`, `,`).
  - Physical QWERTY layout proximity typo simulation with immediate 4-step self-correction.
  - Seamless dual-mode: humanized actions in both Automatic Streaming and Stealth Manual stepping.
- [x] **500 Compilable C Components across 7 Ordered Domains**:
  - `boiler-plates` (64), `data-structures` (126), `algorithms` (120), `competitive-programming` (50), `academics-programming` (46), `projects` (30), `detection` (64).
  - **Strict Zero-Comments Invariant**: 100% verified across all 500 components.
- [x] **8 Specialized Production Engines**:
  - `AutoTypeEngine`, `HeaderEngine`, `MemoryEngine`, `CursorEngine`, `SnippetEngine`, `SessionEngine`, `SearchEngine`, `UpdateEngine`.
- [x] **Real-World Edge Case Guards**:
  - 1ms to 1000ms delay range (`dtyp.typingDelayMs`).
  - Granular undo chunking (default: 3 chars per `Ctrl+Z`).
  - Cursor relocation detection & tab-switch guard.
- [x] **Modernized UI/UX**:
  - Preloaded QuickPick with action buttons (View Docs, Favorite, Copy Code).
  - Themed domain browser with custom icons and component action buttons.
  - Interactive hover tooltips with complexity metrics and clickable command links.
  - 1,492 structured snippets & 500 Markdown documentation pages.
- [x] **Templates Completely Eradicated**: Full removal of legacy templates per requirements.

---

## 🚀 Released: Version 2.0.0

- [x] Multi-engine modularization.
- [x] SQLite WebAssembly optimization with `sql.js`.
- [x] Activity Bar & 4 Sidebar TreeViews.
- [x] Interactive release notes webview dashboard.
- [x] Automated background GitHub release update checker.

---

## 🚀 Released: Version 1.0.0

- [x] Initial core architecture and offline database prototype.

---

## 🎯 Upcoming: Version 4.1.0 & Beyond

- [ ] **Multi-File Academic Project Scaffolding**: One-click generation of complete multi-file academic C projects with Makefiles, headers, and test harnesses.
- [ ] **Interactive Visual Debugger Stepping**: Stepping through component execution with visual pointers in an interactive webview.
- [ ] **Custom Cadence Profiler**: Fine-grained biomechanical profile tuning with live recording of user typing speeds.
