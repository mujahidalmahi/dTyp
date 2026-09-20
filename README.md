<p align="center">
  <img src="images/icon.png" width="128" height="128" alt="dTyp Logo" />
</p>

<p align="center">
  <b>Don't Tell Your Professor — Production-Grade Academic C/C++ Engineering Ecosystem &amp; Humanized Stealth Typing Assistant for VS Code</b>
</p>

<p align="center">
  <a href="https://github.com/mujahidalmahi/dTyp/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/mujahidalmahi/dTyp/ci.yml?branch=main&label=CI&logo=github" alt="CI Build Status" /></a>
  <a href="https://github.com/mujahidalmahi/dTyp/releases/latest"><img src="https://img.shields.io/badge/release-v4.0.0-blue?logo=semanticrelease" alt="Release Version" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode"><img src="https://img.shields.io/badge/VS%20Code-Marketplace-007ACC?logo=visualstudiocode&logoColor=white" alt="VS Code Marketplace" /></a>
  <a href="docs/LIBRARY_CATALOG.md"><img src="https://img.shields.io/badge/library-665%20C%20Components-emerald?logo=c" alt="665 C Components" /></a>
  <a href="https://sql.js.org/"><img src="https://img.shields.io/badge/runtime-SQLite%20WASM-blueviolet?logo=sqlite" alt="SQLite WASM" /></a>
  <a href="SECURITY.md"><img src="https://img.shields.io/badge/privacy-100%25%20Offline-orange" alt="100% Offline" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT" /></a>
</p>

---

## ⚡ Executive Summary

**dTyp v4.0** is a zero-cloud, high-performance C/C++ developer companion and **humanized stealth typing assistant** built natively for Visual Studio Code. It packages **665 compilable, bloat-free C components** across 7 primary computer science domains inside an embedded SQLite WebAssembly database, accompanies full support for your **Own Library** of custom components, and features an industry-leading **humanized keystroke simulation engine** featuring **Chameleon Ghost-Typing**, **Smart Block Auto-Expansion**, **Biomechanical Cadence**, and **Universal Non-Sequential Coding**.

Whether practicing complex algorithms, preparing academic lab assignments, or presenting real-world systems, dTyp types flawless, production-ready code directly into your editor—either continuously with muscle-memory bursts, smart block expansion, and non-sequential skeleton-first authoring, or discreetly keystroke-by-keystroke via **`Ctrl+Shift+D`**.

---

## 📑 Table of Contents

- [Why dTyp?](#-why-dtyp)
- [Key Architectural Features](#-key-architectural-features)
  - [1. Humanized Natural Typing Engine & Smart Block Expansion](#1-humanized-natural-typing-engine--smart-block-expansion)
  - [2. Universal Non-Sequential Coding](#2-universal-non-sequential-coding)
  - [3. Own Library Custom Component Creator & Manager](#3-own-library-custom-component-creator--manager)
  - [4. 500 Compilable C Components (Zero Comments)](#4-500-compilable-c-components-zero-comments)
  - [5. Core High-Performance Production Engines](#5-core-high-performance-production-engines)
  - [6. Dedicated Activity Bar & 5 Sidebar TreeViews](#6-dedicated-activity-bar--5-sidebar-treeviews)
  - [7. Interactive Release Notes & Automated Update Engine](#7-interactive-release-notes--automated-update-engine)
  - [8. 100% Offline & Zero-Cloud Privacy Guarantee](#8-100-offline--zero-cloud-privacy-guarantee)
- [Activity Bar Interface](#-activity-bar-interface)
- [Keybindings & Command Palette](#-keybindings--command-palette)
- [Configuration Reference](#-configuration-reference)
- [Component Taxonomy](#-component-taxonomy)
- [VS Code Snippet System](#-vs-code-snippet-system)
- [Quick Start Guide](#-quick-start-guide)
- [Diagnostics & Self-Healing](#-diagnostics--self-healing)
- [Repository & Monorepo Structure](#-repository--monorepo-structure)

---

## ⚖️ Why dTyp?

| Capability | Traditional Snippet Packs | Cloud AI Assistants (Copilot, etc.) | **dTyp v4.0** |
|---|---|---|---|
| **Insertion Mechanism** | Instant bulk clipboard paste | Multi-token streaming / paste | **Humanized natural cadence, Smart Block Auto-Expansion, non-sequential drafting, or stealth `Ctrl+Shift+D` stepping** |
| **Typing Realism** | ❌ None (Paste event) | ❌ Machine-like streaming | **Keyword bursts (35-60% faster), cognitive hesitations, delayed-recognition typo bursts & backspaces, operator rhythms** |
| **Block Expansion** | ❌ None / raw text paste | ❌ Indents block on newline post-facto | **Smart `enter_block` expansion: creates 3-line scaffold with cursor at indented column 4, closing brace on line 3** |
| **Authoring Order** | ❌ Strictly linear | ❌ Strictly sequential | **Universal Non-Sequential Coding: drafts skeletons first (`above_return`), allocation-cleanup pairs (`above_free`), then fills inner logic** |
| **Custom Components** | ⚠️ Snippet JSON files only | ❌ None | **Dedicated Own Library view & native form with 10 fields, full CRUD, export/import, and typing engine support** |
| **Offline Reliability** | ✅ Yes (Static JSON) | ❌ No (Requires internet & active subscription) | **✅ 100% Offline (Embedded SQLite WebAssembly + Local JSON Storage)** |
| **Component Depth** | ~50 basic snippets | Probabilistic / Hallucinatory | **665 verified compilable C components across 7 domains + Unlimited Own Library** |
| **Code Hygiene** | Often contains verbose comments | Unpredictable comments | **Strict Zero-Comments Invariant (100% verified, 0 comments)** |
| **Header Injection** | ❌ None | Partial / Manual | **Automatic header injection without duplicate declarations** |
| **Memory Analysis** | ❌ None | ❌ None | **Real-time dynamic heap allocation & memory leak warnings** |
| **Exam / Lab Discretion** | ❌ Obvious paste events | ❌ Flagged by network proxies & telemetry | **Total stealth with Chameleon Ghost-Typing (`Alt+C`) & status-bar stepping buffer via `Ctrl+Shift+D`** |
| **UI Experience** | Basic autocomplete list | Ghost text inline suggestions | **Activity Bar, 5 TreeViews, Control Center Flight Deck, Recursion Visualizer, Typing Drill Arena, & Interactive Hovers** |

---

## 🌟 Key Architectural Features

### 1. Humanized Natural Typing Engine, Smart Block Expansion & Chameleon Mode
dTyp v4.0 introduces a revolutionary natural typing engine that reproduces the mechanical and cognitive reality of human programming:
- **Smart Block Auto-Expansion (`enter_block`)**: When typing a block opener such as `int main(void) {`, pressing Enter in VS Code naturally expands into a 3-line indented scaffold with the cursor placed at column 4 on line 2, and the closing brace pushed to line 3. dTyp emulates this exact behavior natively, eliminating clumsy manual indentation typing and sideways brace pushing.
- **Delayed-Recognition Typo Bursts**: Real programmers overshoot typos by 1–2 characters before realizing their mistake. dTyp models this realistic human reflex: type wrong char &rarr; overshoot next character &rarr; cognitive realization pause &rarr; double backspace &rarr; correct typing.
- **Intelligent Delimiter Pairing & Overtyping**: Detects editor-inserted closing delimiters (`}`, `)`, `]`, `"`, `'`) and smoothly steps over them (`overtypeCharacter`), completely eliminating syntax errors and duplicate tokens.
- **Muscle Memory Keyword Bursts**: Keystrokes on 55+ common C keywords (`int`, `return`, `printf`, `struct`, `sizeof`, `typedef`, etc.) accelerate by **35% to 60%**.
- **Cognitive Hesitations & Operator Whitespace Rhythm**: Injects natural cognitive pauses before block openers (`{`), after statement terminators (`;`), at line breaks (`\n`), after parameter commas (`comma_parameter`), and between whitespace-separated binary operators.
- **Dual Modality (Auto & Stealth `Ctrl+Shift+D`)**:
  - **Automatic Streaming**: Types continuously with configurable delay (**1ms to 1000ms**) and Gaussian jitter.
  - **Stealth Manual Stepping**: Queues humanized actions into a stepping buffer. Each press of **`Ctrl+Shift+D`** steps through the next action with natural human pacing.
- **Chameleon Ghost-Typing (`Alt+C`)**: Press ANY physical key to emit the exact next character — perfect for live exams and interviews.
- **Biomechanical Cadence & False Starts (`dtyp.enableFalseStarts`)**: Physical finger reach, hand alternation dynamics, and realistic "rethink" sequences (type 2–4 characters → backspace → correct).
- **Real-World Edge Case Guards**:
  - **Granular Undo Chunks**: Groups edits into 2–3 character chunks so pressing `Ctrl+Z` undoes a few characters at a time.
  - **Cursor Relocation Guard**: Pauses typing if the cursor is manually moved and prompts to resume or realign.
  - **Tab-Switch Guard**: Halts typing if you switch editor tabs or files.

### 2. Universal Non-Sequential Coding
Real programmers rarely write code purely sequentially from line 1 to line 100. dTyp v4.0 features an intelligent non-sequential authoring planner:
- **Intra-Function Skeleton-First Drafting**: Writes function signature and block scaffold &rarr; immediately drafts return statement skeleton (`return 0;`) &rarr; jumps back up (`above_return`) to flesh out algorithm logic and variables.
- **Allocation-Cleanup Pairing**: Allocates heap resources (`malloc`) &rarr; immediately generates cleanup code at function exit (`free`, `fclose`) &rarr; navigates upward (`above_free`) to author processing logic, guaranteeing leak-free code drafting.
- **Multi-Function Scaffolding**: Automatically scaffolds helper structs and declarations before jumping back to implement consumer functions.

### 3. Own Library Custom Component Creator & Manager
Manage your private snippets, lab solutions, and custom algorithms with first-class editor integration:
- **Dedicated Activity Bar View (`dtyp.ownLibraryView`)**: Hierarchical tree organized by Domain (`Own Library`) > Sub-domain > Topic > Sub-topic > Component.
- **Native Custom Component Form**: Create or edit components using a 10-field editor form (Name, Sub-domain, Topic, Sub-topic, Description, Signature, Code, Language, Input Type, Output Type). Only Code is mandatory; all metadata fields are optional.
- **Full Production Engine Compatibility**: Insert your custom components with full access to the Humanized Typing Engine, Smart Block Expansion, Non-Sequential Coding, Header Auto-Injection, and Memory Leak Analysis.
- **Zero-Cloud Persistent Storage**: Saved locally in your VS Code global storage directory (`own-library.json`) with one-click JSON export and import capabilities.

### 4. 665 Compilable C Components (Zero Comments)
Curated, bloat-free, standards-compliant C99/C11 code organized into 7 primary domains and 361 categories. Every component follows the strict **Zero-Comments Invariant**:
- **boiler-plates** (103 components): CLI starters, argument parsers, Makefiles, arenas, test harnesses.
- **data-structures** (178 components): Singly/doubly/circular linked lists, stacks, queues, trees, heaps, hash tables.
- **algorithms** (164 components): Sorting, searching, graph traversals, shortest paths, MST, dynamic programming.
- **competitive-programming** (70 components): Fast I/O buffers, modular arithmetic, Fenwick trees, segment trees, DSU.
- **academics-programming** (56 components): Numerical methods (Gauss-Jordan, LU, Runge-Kutta), physics, discrete math.
- **projects** (30 components): Standalone system projects (shell, HTTP server, compiler, allocator, key-value store).
- **detection** (64 components): Algorithmic detectors for cycles, palindromes, bipartiteness, overflow, and leaks.

### 5. Core High-Performance Production Engines
- ⚡ **AutoTypeEngine**: Orchestrates humanized keystrokes, smart block expansion, Chameleon Ghost-Typing, delimiter overtyping, false starts, typo self-correction, and `Ctrl+Shift+D` stepping.
- 🏗️ **NonlinearAuthoringPlanner & CStructuralDecomposer**: Transforms linear code into natural human skeleton-first drafting plans.
- 🩺 **CodeDoctorProvider**: Offline AST linter with 7 C-defect detectors and 1-click QuickFix remediations.
- 🏆 **ContestScaffolder**: Competitive programming workspace generator (Fast I/O, bump arena, stress tester).
- 🌲 **RecursionVisualizerPanel**: Interactive SVG recursion tree with step scrubber and memoization feedback.
- 🎯 **TypingDrillPanel**: Gamified C typing arena with real-time WPM/CPM and high score tracking.
- 📦 **OwnLibraryStorage**: Manages persistent local CRUD storage, indexing, and JSON export/import for user components.
- 🛡️ **HeaderEngine**: Scans code requirements and injects missing standard C headers (`<stdlib.h>`, `<stdbool.h>`, `<stdio.h>`, `<math.h>`) at top of file.
- 🧠 **MemoryEngine**: Scans dynamic heap allocations (`malloc`, `calloc`, `realloc`), checks for matching `free()`, and warns of potential leaks.
- 🎯 **CursorEngine**: Automatically parses inserted code for placeholder tokens (`/* TODO */`, `<type>`) and navigates bidirectionally (`Alt+Down` / `Alt+Up`).
- ⏱️ **SessionEngine**: Persists insertion history, session statistics, and starred favorites across editor reloads.
- 🔍 **SearchEngine**: Production-grade ranked fuzzy search with category scoping (`boiler:main`, `ds:tree`, `algo:sort`, `own:`).
- 📝 **SnippetEngine**: Native completion provider with tab-stops (`$1`, `$2`, `$0`) across 1,492 structured snippets.
- 🔄 **UpdateEngine**: Non-intrusive background check against GitHub releases with direct VSIX download.

### 6. Dedicated Activity Bar, 5 Sidebar TreeViews & New Panels
- 🌲 **Offline C Library (665)**: Hierarchical explorer organized by Domain > Category > Component.
- 📚 **Own Library**: Your private library of custom components with quick actions to Add, Edit, Delete, Insert, and Export/Import.
- ⭐ **Favorites & Pinned**: Keep your most frequently used structs and algorithms pinned for instantaneous access.
- 📜 **Recent Insertions**: Search and re-insert recently used components with one click.
- 🎛️ **Quick Controls**: Switch typing mode, toggle header injection, view diagnostics, and trigger release notes directly from the sidebar.
- 🛸 **Control Center Flight Deck** (`Ctrl+Alt+C`): Full-screen command dashboard with live metrics, mode toggles, and shortcuts cheatsheet.
- 🌲 **Recursion Tree Visualizer**: Interactive SVG call stack visualizer with per-frame state, step scrubber, and memoization detection.
- 🎯 **Typing Drill Arena**: Gamified real-time C typing drills with WPM, accuracy %, and personal records.

### 7. Interactive Release Notes & Automated Update Engine
- **"What's New in v4.0" Webview Panel**: Dark-mode dashboard highlighting all 15 new super-dimensions, Control Center, Code Doctor, Chameleon Mode, and the new visualizers.
- **Background Release Check**: Non-intrusive update notification with one-click direct update.

### 8. 100% Offline & Zero-Cloud Privacy Guarantee
All 665 components reside in `dtyp.db` (WebAssembly `sql.js`), and your custom library resides in local JSON. No external network requests, zero telemetry, zero analytics.

---

## 🧭 Activity Bar Interface

Click the **dTyp** icon in the VS Code Activity Bar (or open the Explorer) to view the integrated panels:

```
┌──────────────────────────────────────────────┐
│ dTyp: Activity Bar Explorer                  │
├──────────────────────────────────────────────┤
│ ▼ OFFLINE C LIBRARY (665)                    │
│   ▶ 📁 Boiler Plates (103)                   │
│   ▶ 📁 Data Structures (178)                 │
│   ▶ 📁 Algorithms (164)                      │
│   ▶ 📁 Competitive Programming (70)          │
│   ▶ 📁 Academics Programming (56)            │
│   ▶ 📁 Projects (30)                         │
│   ▼ 📁 Detection (64)                        │
│       📄 detect_linked_list_cycle_floyd      │
│       📄 detect_graph_cycle_directed_dfs     │
│       📄 detect_bipartite_graph              │
│                                              │
│ ▼ OWN LIBRARY                                │
│   ▶ 📁 Lab Exercises                         │
│   ▼ 📁 Custom Algorithms                     │
│       📄 fast_fourier_transform              │
│                                              │
│ ▼ FAVORITES & PINNED                         │
│   ⭐ bst_insert                              │
│   ⭐ quick_sort_3way                         │
│   ⭐ arena_allocator_create                  │
│                                              │
│ ▼ RECENT INSERTIONS                          │
│   🕒 main_standard (2m ago)                  │
│   🕒 fast_io_scan_int (14m ago)              │
│                                              │
│ ▼ QUICK CONTROLS                             │
│   🛸 Open Control Center (Ctrl+Alt+C)       │
│   ➕ Create Custom Component                 │
│   ⚙️ Mode: Automatic (15ms delay)            │
│   🔄 Check for Updates                       │
│   📋 System Diagnostics                      │
└──────────────────────────────────────────────┘
```

---

## ⌨️ Keybindings & Command Palette

| Shortcut | Command ID | Action / Description |
|---|---|---|
| **`Ctrl+Alt+C`** | `dtyp.openControlCenter` | Opens the Control Center Flight Deck dashboard |
| **`Ctrl+Shift+M`** | `dtyp.openStatusBarMenu` | Opens interactive status bar launcher menu |
| **`Ctrl+Shift+D`** | `dtyp.typeNextCharacter` | Types the next character (or batch) from the manual stepping queue |
| **`Alt+C`** | `dtyp.toggleChameleonMode` | Toggles Chameleon Ghost-Typing (any key → next algorithm character) |
| **`Alt+P`** | `dtyp.togglePauseTyping` | Instantly pauses or resumes ongoing automated or manual typing |
| **`Ctrl+Shift+R`** | `dtyp.renewQueue` | Restarts the current or most recent typing queue from character 0 |
| **`Ctrl+Shift+U`** | `dtyp.rewindStep` | Rewinds one manual character step (backspaces and decrements queue) |
| **`Ctrl+Alt+D`** | `dtyp.browseLibrary` | Opens the themed category and component browser |
| **`Escape`** | `dtyp.cancelTyping` | Instantly halts automatic typing or flushes the manual queue |
| `Ctrl+Shift+P` | `dtyp.createOwnComponent` | Opens the native form to create a new Custom Component |
| `Ctrl+Shift+P` | `dtyp.quickInsert` | Opens ranked fuzzy search QuickPick with item action buttons |
| `Ctrl+Shift+P` | `dtyp.insertSnippet` | Interactively selects and inserts standard C snippets |
| `Ctrl+Shift+P` | `dtyp.showHistory` | Opens history QuickPick to re-insert recently used items |
| `Ctrl+Shift+P` | `dtyp.showReleaseNotes` | Launches the interactive "What's New in v4.0" Webview panel |
| `Ctrl+Shift+P` | `dtyp.exportOwnLibrary` | Exports your Own Library components to a portable JSON file |
| `Ctrl+Shift+P` | `dtyp.importOwnLibrary` | Imports components into your Own Library from a JSON file |
| `Ctrl+Shift+P` | `dtyp.checkForUpdates` | Checks GitHub releases for new dTyp versions |
| `Ctrl+Shift+P` | `dtyp.healthCheck` | Runs an automated health check (WASM, DB, engines, and status) |
| `Ctrl+Shift+P` | `dtyp.viewDocumentation` | Opens full Markdown documentation for any component |

---

## ⚙️ Configuration Reference

Configure dTyp via your VS Code Settings UI (`Ctrl+,`) or `settings.json`:

```json
{
  // Typing simulation mode: "automatic" (continuous stream) or "manual" (stealth Ctrl+Shift+D stepping)
  "dtyp.typingMode": "automatic",

  // Natural typing model: "humanized" (bursts, block auto-expansion, typo self-correction) or "linear"
  "dtyp.naturalTypingModel": "humanized",

  // Enable realistic human typo simulation with delayed recognition & backspace bursts
  "dtyp.enableTypoSimulation": true,

  // Probability of human typo on alphabetic keystrokes (0.015 = 1.5% typo rate)
  "dtyp.typoRate": 0.015,

  // Keystroke latency in milliseconds for automatic mode (1 - 1000 ms)
  "dtyp.typingDelayMs": 15,

  // Randomized human jitter in milliseconds added to typing delays
  "dtyp.typingJitterMs": 5,

  // Number of characters typed per Ctrl+Shift+D press in manual mode (1 - 50)
  "dtyp.stepSize": 1,

  // Number of characters grouped per Ctrl+Z undo chunk (1 - 10, default: 3)
  "dtyp.undoChunkSize": 3,

  // Cursor relocation behavior during typing: "pause", "realign", or "abort"
  "dtyp.onCursorJump": "pause",

  // Automatically pause typing if user switches editor tabs or files
  "dtyp.pauseOnTabSwitch": true,

  // Automatically detect and inject missing standard library headers
  "dtyp.autoIncludeHeaders": true,

  // Prevent inserting duplicate structs or functions into the active file
  "dtyp.checkDuplicates": true,

  // Enable dynamic memory leak warnings and heap allocation checks
  "dtyp.analyzeMemoryAllocations": true,

  // Automatically show the release notes webview after updating to a new version
  "dtyp.showReleaseNotesOnUpdate": true,

  // Periodically check GitHub for extension updates
  "dtyp.checkForUpdates": true
}
```

---

## 📚 Component Taxonomy

The offline database (`dtyp.db`) houses **665 components** across 7 primary domains, plus user-defined components in the **Own Library**:

| Domain | Count | Key Categories & Scope |
|---|---|---|
| **Boiler Plates** | 103 | CLI starters, entry points, argument parsing (`getopt`), REPLs, benchmarks, arena allocators, assertion test runners |
| **Data Structures** | 178 | Singly/doubly/circular linked lists, stacks, queues, deques, BST, AVL, red-black trees, binary heaps, tries, segment trees, Fenwick trees, DSU, hash tables |
| **Algorithms** | 164 | 10 sorting algorithms (3-way QuickSort, Merge, Heap, TimSort), binary search, graph traversals (BFS, DFS), shortest paths (Dijkstra, Bellman-Ford, Floyd-Warshall), MST (Kruskal, Prim), DP (Knapsack, LCS, LIS, Matrix Chain, Coin Change) |
| **Competitive Programming** | 70 | Fast I/O buffers (`getchar_unlocked`), modular arithmetic, prime sieves, LCA binary lifting, string algorithms (KMP, Z-algorithm) |
| **Academics Programming** | 56 | Numerical methods (Gauss-Jordan, LU, Newton-Raphson, Runge-Kutta RK4/RK45), discrete math truth tables, physics simulations |
| **Projects** | 30 | Standalone systems (micro UNIX shell, HTTP parser, event loop, JSON parser, custom allocator, key-value store, chess, snake) |
| **Detection** | 64 | Algorithmic detection primitives (graph cycles, linked-list cycles, palindromes, bipartiteness, integer overflow, memory leaks, endianness) |
| **Own Library** | User-defined | Private algorithms, lab solutions, and templates stored in local JSON with 10 customizable fields |

*For complete component breakdowns, sample signatures, and architectural patterns, see [docs/LIBRARY_CATALOG.md](docs/LIBRARY_CATALOG.md).*

---

## 📝 VS Code Snippet System

In addition to the component database, dTyp provides 1,492 structured snippets with tab stops (`$1`, `$2`, `$0`):
- **Hierarchical Prefixes**: `dtyp.<domain>.<type>.<topic>.<subtopic>.<name>` (e.g. `dtyp.ds.component.separate_components.linked_lists.singly.create_node`)
- **Convenient Aliases**: `dtyp.<name>` (e.g. `dtyp.create_node`, `dtyp.quick_sort`, `dtyp.main`)

---

## 🚀 Quick Start Guide

### Installation
1. **Via VS Code Marketplace**: Search for `dTyp` in the Extensions view (`Ctrl+Shift+X`) and click **Install**.
2. **Via Pre-built VSIX**: Download the latest `.vsix` package from [Releases](https://github.com/mujahidalmahi/dTyp/releases) and run:
   ```bash
   code --install-extension dtyp-vscode-4.0.0.vsix
   ```

### First Run Walkthrough
1. Open any `.c` or `.cpp` file.
2. Press **`Ctrl+Shift+P`** and run **`dTyp: Quick Insert (Fuzzy Search)`**.
3. Type `bst_insert` or `dijkstra` and press `Enter`.
4. Watch as the code is naturally typed character-by-character into your editor with authentic human pauses, operator rhythm, and smart block expansion!
5. Notice that required headers like `<stdlib.h>` are automatically added to the top of your file.
6. Press **`Ctrl+Alt+C`** to open the **Control Center Flight Deck** and explore all tools!

### Switching to Stealth Manual Mode
1. Open settings (`Ctrl+,`) and search for `dtyp.typingMode`.
2. Select **`manual`**.
3. Trigger any component via Quick Insert or the Activity Bar.
4. Notice the status bar indicator: `$(keyboard) dTyp: 184 chars [Ctrl+Shift+D to step]`.
5. Press **`Ctrl+Shift+D`** repeatedly. Each press executes the next humanized keystroke (including delimiter step-over and typo backspacing)!

### Chameleon Ghost-Typing Mode
1. Insert a component (it queues into the buffer).
2. Press **`Alt+C`** to activate Chameleon Mode.
3. Now press ANY physical key — each keystroke emits the next exact character from the queued algorithm.

---

## 🩺 Diagnostics & Self-Healing

1. Open the Command Palette (`Ctrl+Shift+P`).
2. Run **`dTyp: Diagnostics & System Health Check`**.
3. dTyp executes a live self-test verifying:
   - WebAssembly SQLite initialization.
   - Database integrity and component count (`665` components verified).
   - Core engine responsiveness (AutoType, Header, Memory, Cursor, Snippet, Session, Search).
   - Active typing mode, natural model, and keybinding registrations.

---

## 🏗️ Repository & Monorepo Structure

```
dTyp/
├── apps/
│   └── vscode/                   # VS Code Extension (TypeScript)
│       ├── library/              # Embedded SQLite database & WASM binaries
│       ├── src/
│       │   ├── engine/           # 14 Production Engines (AutoType, Header, Memory, ContestScaffolder, etc.)
│       │   ├── view/             # Activity Bar TreeViews, Webview panels & Control Center
│       │   ├── provider/         # Autocomplete, Hover & Code Doctor Providers
│       │   ├── parser/           # Category command parser
│       │   └── extension.ts      # Extension activation lifecycle
│       └── package.json          # Extension manifest, commands & configurations
├── packages/
│   ├── types/                    # Shared TypeScript interfaces
│   ├── utilities/                # Common logging, formatting, and file helpers
│   ├── validation/               # Component & syntax balance validators
│   ├── typing-engine/            # Human cadence, structural tokenizer, scheduler
│   └── library-engine/           # SQLite abstraction layer
├── docs/
│   ├── architecture.md           # End-to-end technical architecture guide
│   ├── LIBRARY_CATALOG.md        # Complete 665 component domain catalog
│   ├── typing-engine.md          # Humanized typing simulation & stealth spec
│   ├── faq.md                    # Frequently Asked Questions
│   └── components/               # 665 Standalone Markdown documentation pages
├── scripts/                      # Database build, generator & bump tools
├── CONTRIBUTING.md               # Contributor guidelines
├── ROADMAP.md                    # Project roadmap & milestones
├── SECURITY.md                   # Security & offline privacy model
└── LICENSE                       # MIT License
```

---

## 🤝 Open Source Community & Governance

- 📖 **[Contributing Guide](CONTRIBUTING.md)**: Setup instructions, coding standards, and C component conventions.
- 🗺️ **[Project Roadmap](ROADMAP.md)**: Current v4.0 status and future milestones.
- 🛡️ **[Security & Privacy Policy](SECURITY.md)**: Our commitment to zero telemetry and local-first computing.
- 📜 **[Code of Conduct](CODE_OF_CONDUCT.md)**: Contributor Covenant v2.1 standards.
- ❓ **[FAQ](docs/faq.md)**: Frequently asked questions about offline mechanics and exam stealth.

---

## 📄 License & Authors

- **Author**: [Mujahid Al Mahi](https://github.com/mujahidalmahi)
- **License**: Released under the open-source [MIT License](LICENSE).
