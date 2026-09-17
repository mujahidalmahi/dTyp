<p align="center">
  <img src="images/icon.png" width="128" height="128" alt="dTyp Logo" />
</p>

<p align="center">
  <b>Don't Tell Your Professor — Production-Grade Academic C/C++ Engineering Ecosystem & Humanized Stealth Typing Assistant for VS Code</b>
</p>

<p align="center">
  <a href="https://github.com/mujahidalmahi/dTyp/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/mujahidalmahi/dTyp/ci.yml?branch=main&label=CI&logo=github" alt="CI Build Status" /></a>
  <a href="https://github.com/mujahidalmahi/dTyp/releases/latest"><img src="https://img.shields.io/badge/release-v3.0.0-blue?logo=semanticrelease" alt="Release Version" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode"><img src="https://img.shields.io/badge/VS%20Code-Marketplace-007ACC?logo=visualstudiocode&logoColor=white" alt="VS Code Marketplace" /></a>
  <a href="docs/LIBRARY_CATALOG.md"><img src="https://img.shields.io/badge/library-500%20C%20Components-emerald?logo=c" alt="500 C Components" /></a>
  <a href="#"><img src="https://img.shields.io/badge/runtime-SQLite%20WASM-blueviolet?logo=sqlite" alt="SQLite WASM" /></a>
  <a href="SECURITY.md"><img src="https://img.shields.io/badge/privacy-100%25%20Offline-orange" alt="100% Offline" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT" /></a>
</p>

---

## ⚡ Executive Summary

**dTyp v3.0** is a zero-cloud, high-performance C/C++ developer companion and **humanized stealth typing assistant** built natively for Visual Studio Code. It packages **500 compilable, bloat-free C components** across 7 primary computer science domains inside an embedded SQLite WebAssembly database, accompanied by an advanced **humanized keystroke simulation engine**.

Whether practicing complex algorithms, preparing academic lab assignments, or presenting real-world systems, dTyp types flawless, production-ready code directly into your editor—either continuously with muscle-memory bursts and intelligent auto-closing delimiter handling, or discreetly keystroke-by-keystroke via **`Ctrl+D`**.

---

## 📑 Table of Contents

- [Why dTyp?](#-why-dtyp)
- [Key Architectural Features](#-key-architectural-features)
  - [1. Humanized Natural Typing Engine](#1-humanized-natural-typing-engine)
  - [2. 500 Compilable C Components (Zero Comments)](#2-500-compilable-c-components-zero-comments)
  - [3. Eight High-Performance Production Engines](#3-eight-high-performance-production-engines)
  - [4. Dedicated Activity Bar & 4 Sidebar TreeViews](#4-dedicated-activity-bar--4-sidebar-treeviews)
  - [5. Interactive Release Notes & Automated Update Engine](#5-interactive-release-notes--automated-update-engine)
  - [6. 100% Offline & Zero-Cloud Privacy Guarantee](#6-100-offline--zero-cloud-privacy-guarantee)
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

| Capability | Traditional Snippet Packs | Cloud AI Assistants (Copilot, etc.) | **dTyp v3.0** |
|---|---|---|---|
| **Insertion Mechanism** | Instant bulk clipboard paste | Multi-token streaming / paste | **Humanized natural cadence, auto-closing delimiter step-over, or stealth `Ctrl+D` stepping** |
| **Typing Realism** | ❌ None (Paste event) | ❌ Machine-like streaming | **Keyword bursts (35-60% faster), cognitive hesitations, QWERTY physical typos & backspaces** |
| **Offline Reliability** | ✅ Yes (Static JSON) | ❌ No (Requires internet & active subscription) | **✅ 100% Offline (Embedded SQLite WebAssembly)** |
| **Component Depth** | ~50 basic snippets | Probabilistic / Hallucinatory | **500 verified compilable C components across 7 domains** |
| **Code Hygiene** | Often contains verbose comments | Unpredictable comments | **Strict Zero-Comments Invariant (100% verified, 0 comments)** |
| **Header Injection** | ❌ None | Partial / Manual | **Automatic header injection without duplicate declarations** |
| **Memory Analysis** | ❌ None | ❌ None | **Real-time dynamic heap allocation & memory leak warnings** |
| **Exam / Lab Discretion** | ❌ Obvious paste events | ❌ Flagged by network proxies & telemetry | **Total stealth with status-bar stepping buffer** |
| **UI Experience** | Basic autocomplete list | Ghost text inline suggestions | **Activity Bar, QuickPick with item action buttons, & Interactive Hovers** |

---

## 🌟 Key Architectural Features

### 1. Humanized Natural Typing Engine
dTyp v3.0 introduces a state-of-the-art natural typing engine that simulates how real human programmers type in modern IDEs:
- **Intelligent Delimiter Pairing & Overtyping**: When you type `{` or `(`, VS Code auto-inserts the closing partner `}` or `)`. dTyp detects editor-inserted closing delimiters and smoothly steps over them (`overtypeCharacter`), completely eliminating syntax errors and duplicate tokens.
- **Muscle Memory Keyword Bursts**: Programmers type familiar keywords much faster. Keystrokes on 55+ common C keywords (`int`, `return`, `printf`, `struct`, `sizeof`, `typedef`, etc.) accelerate by **35% to 60%**.
- **Cognitive Hesitations**: Injects natural cognitive pauses before block openers (`{`), after statement terminators (`;`), at line breaks (`\n`), and after parameter commas (`,`).
- **Physical QWERTY Typo Simulation & Self-Correction**: When enabled, strokes occasionally slip to adjacent physical keys, recognized with a brief hesitation, backspaced, and cleanly re-typed.
- **Dual Modality (Auto & Stealth `Ctrl+D`)**:
  - **Automatic Streaming**: Types continuously with configurable delay (**1ms to 1000ms**) and Gaussian jitter.
  - **Stealth Manual Stepping**: Queues humanized actions into a stepping buffer. Each press of **`Ctrl+D`** steps through the next action with natural human pacing.
- **Real-World Edge Case Guards**:
  - **Granular Undo Chunks**: Groups edits into 2–3 character chunks so pressing `Ctrl+Z` undoes a few characters at a time.
  - **Cursor Relocation Guard**: Pauses typing if the cursor is manually moved and prompts to resume or realign.
  - **Tab-Switch Guard**: Halts typing if you switch editor tabs or files.

### 2. 500 Compilable C Components (Zero Comments)
Curated, bloat-free, standards-compliant C99/C11 code organized into 7 primary domains and 361 categories. Every component follows the strict **Zero-Comments Invariant**:
- **boiler-plates** (64 components): CLI starters, argument parsers, Makefiles, arenas, test harnesses.
- **data-structures** (126 components): Singly/doubly/circular linked lists, stacks, queues, trees, heaps, hash tables.
- **algorithms** (120 components): Sorting, searching, graph traversals, shortest paths, MST, dynamic programming.
- **competitive-programming** (50 components): Fast I/O buffers, modular arithmetic, Fenwick trees, segment trees, DSU.
- **academics-programming** (46 components): Numerical methods (Gauss-Jordan, LU, Runge-Kutta), physics, discrete math.
- **projects** (30 components): Standalone system projects (shell, HTTP server, compiler, allocator, key-value store).
- **detection** (64 components): Algorithmic detectors for cycles, palindromes, bipartiteness, overflow, and leaks.

### 3. Eight High-Performance Production Engines
- ⚡ **AutoTypeEngine**: Orchestrates humanized keystrokes, delimiter overtyping, typo self-correction, and `Ctrl+D` stepping.
- 🛡️ **HeaderEngine**: Scans code requirements and injects missing standard C headers (`<stdlib.h>`, `<stdbool.h>`, `<stdio.h>`, `<math.h>`) at top of file.
- 🧠 **MemoryEngine**: Scans dynamic heap allocations (`malloc`, `calloc`, `realloc`), checks for matching `free()`, and warns of potential leaks.
- 🎯 **CursorEngine**: Automatically parses inserted code for placeholder tokens (`/* TODO */`, `<type>`) and navigates bidirectionally (`Alt+Down` / `Alt+Up`).
- ⏱️ **SessionEngine**: Persists insertion history, session statistics, and starred favorites across editor reloads.
- 🔍 **SearchEngine**: Production-grade ranked fuzzy search with category scoping (`boiler:main`, `ds:tree`, `algo:sort`).
- 📝 **SnippetEngine**: Native completion provider with tab-stops (`$1`, `$2`, `$0`) across 1,492 structured snippets.
- 🔄 **UpdateEngine**: Non-intrusive background check against GitHub releases with direct VSIX download.

### 4. Dedicated Activity Bar & 4 Sidebar TreeViews
- 🌲 **Offline C Library (500)**: Hierarchical explorer organized by Domain > Category > Component.
- ⭐ **Favorites & Pinned**: Keep your most frequently used structs and algorithms pinned for instantaneous access.
- 📜 **Recent Insertions**: Search and re-insert recently used components with one click.
- 🎛️ **Quick Controls**: Switch typing mode, toggle header injection, view diagnostics, and trigger release notes directly from the sidebar.

### 5. Interactive Release Notes & Automated Update Engine
- **"What's New in v3.0" Webview Panel**: Dark-mode dashboard with quick action triggers and shortcuts cheat-sheet.
- **Background Release Check**: Non-intrusive update notification with one-click direct update.

### 6. 100% Offline & Zero-Cloud Privacy Guarantee
All 500 components and search indexes reside in `dtyp.db`, accessed in-memory via pure WebAssembly (`sql.js`). No external network requests, zero telemetry, zero analytics.

---

## 🧭 Activity Bar Interface

Click the **dTyp** icon in the VS Code Activity Bar (or press `Ctrl+Shift+D`) to open the explorer:

```
┌──────────────────────────────────────────────┐
│ dTyp: Activity Bar Explorer                  │
├──────────────────────────────────────────────┤
│ ▼ OFFLINE C LIBRARY (500)                    │
│   ▶ 📁 Boiler Plates (64)                    │
│   ▶ 📁 Data Structures (126)                 │
│   ▶ 📁 Algorithms (120)                      │
│   ▶ 📁 Competitive Programming (50)          │
│   ▶ 📁 Academics Programming (46)            │
│   ▶ 📁 Projects (30)                         │
│   ▼ 📁 Detection (64)                        │
│       📄 detect_linked_list_cycle_floyd      │
│       📄 detect_graph_cycle_directed_dfs     │
│       📄 detect_bipartite_graph              │
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
│   ⚙️ Mode: Automatic (15ms delay)            │
│   🔄 Check for Updates                       │
│   📋 System Diagnostics                      │
└──────────────────────────────────────────────┘
```

---

## ⌨️ Keybindings & Command Palette

| Shortcut | Command ID | Action / Description |
|---|---|---|
| **`Ctrl+D`** | `dtyp.typeNextCharacter` | Types the next character (or batch) from the manual stepping queue |
| **`Ctrl+Shift+D`** | `dtyp.browseLibrary` | Opens the themed category and component browser |
| **`Escape`** | `dtyp.cancelTyping` | Instantly halts automatic typing or flushes the manual queue |
| `Ctrl+Shift+P` | `dtyp.quickInsert` | Opens ranked fuzzy search QuickPick with item action buttons |
| `Ctrl+Shift+P` | `dtyp.insertSnippet` | Interactively selects and inserts standard C snippets |
| `Ctrl+Shift+P` | `dtyp.showHistory` | Opens history QuickPick to re-insert recently used items |
| `Ctrl+Shift+P` | `dtyp.showReleaseNotes` | Launches the interactive "What's New in v3.0" Webview panel |
| `Ctrl+Shift+P` | `dtyp.checkForUpdates` | Checks GitHub releases for new dTyp versions |
| `Ctrl+Shift+P` | `dtyp.healthCheck` | Runs an automated health check (WASM, DB, engines, and status) |
| `Ctrl+Shift+P` | `dtyp.viewDocumentation` | Opens full Markdown documentation for any component |

---

## ⚙️ Configuration Reference

Configure dTyp via your VS Code Settings UI (`Ctrl+,`) or `settings.json`:

```json
{
  // Typing simulation mode: "automatic" (continuous stream) or "manual" (stealth Ctrl+D stepping)
  "dtyp.typingMode": "automatic",

  // Natural typing model: "humanized" (bursts, overtyping, typo self-correction) or "linear"
  "dtyp.naturalTypingModel": "humanized",

  // Enable realistic human typo simulation with automatic backspace correction
  "dtyp.enableTypoSimulation": true,

  // Probability of human typo on alphabetic keystrokes (0.015 = 1.5% typo rate)
  "dtyp.typoRate": 0.015,

  // Keystroke latency in milliseconds for automatic mode (1 - 1000 ms)
  "dtyp.typingDelayMs": 15,

  // Randomized human jitter in milliseconds added to typing delays
  "dtyp.typingJitterMs": 5,

  // Number of characters typed per Ctrl+D press in manual mode (1 - 50)
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

The offline database (`dtyp.db`) houses **500 components** across 7 primary domains:

| Domain | Count | Key Categories & Scope |
|---|---|---|
| **Boiler Plates** | 64 | CLI starters, entry points, argument parsing (`getopt`), REPLs, benchmarks, arena allocators, assertion test runners |
| **Data Structures** | 126 | Singly/doubly/circular linked lists, stacks, queues, deques, BST, AVL, red-black trees, binary heaps, tries, segment trees, Fenwick trees, DSU, hash tables |
| **Algorithms** | 120 | 10 sorting algorithms (3-way QuickSort, Merge, Heap, TimSort), binary search, graph traversals (BFS, DFS), shortest paths (Dijkstra, Bellman-Ford, Floyd-Warshall), MST (Kruskal, Prim), DP (Knapsack, LCS, LIS, Matrix Chain, Coin Change) |
| **Competitive Programming** | 50 | Fast I/O buffers (`getchar_unlocked`), modular arithmetic, prime sieves, LCA binary lifting, string algorithms (KMP, Z-algorithm) |
| **Academics Programming** | 46 | Numerical methods (Gauss-Jordan, LU, Newton-Raphson, Runge-Kutta RK4/RK45), discrete math truth tables, physics simulations |
| **Projects** | 30 | Standalone systems (micro UNIX shell, HTTP parser, event loop, JSON parser, custom allocator, key-value store, chess, snake) |
| **Detection** | 64 | Algorithmic detection primitives (graph cycles, linked-list cycles, palindromes, bipartiteness, integer overflow, memory leaks, endianness) |

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
   code --install-extension dtyp-vscode-3.0.0.vsix
   ```

### First Run Walkthrough
1. Open any `.c` or `.cpp` file.
2. Press **`Ctrl+Shift+P`** and run **`dTyp: Quick Insert (Fuzzy Search)`**.
3. Type `bst_insert` or `dijkstra` and press `Enter`.
4. Watch as the code is naturally typed character-by-character into your editor!
5. Notice that required headers like `<stdlib.h>` are automatically added to the top of your file.

### Switching to Stealth Manual Mode
1. Open settings (`Ctrl+,`) and search for `dtyp.typingMode`.
2. Select **`manual`**.
3. Trigger any component via Quick Insert or the Activity Bar.
4. Notice the status bar indicator: `$(keyboard) dTyp: 184 chars [Ctrl+D to step]`.
5. Press **`Ctrl+D`** repeatedly. Each press executes the next humanized keystroke (including delimiter step-over and typo backspacing)!

---

## 🩺 Diagnostics & Self-Healing

1. Open the Command Palette (`Ctrl+Shift+P`).
2. Run **`dTyp: Diagnostics & System Health Check`**.
3. dTyp executes a live self-test verifying:
   - WebAssembly SQLite initialization.
   - Database integrity and component count (`500` components verified).
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
│       │   ├── engine/           # 8 Production Engines (AutoType, Header, Memory, etc.)
│       │   ├── view/             # Activity Bar TreeViews & Webview panels
│       │   ├── provider/         # Autocomplete & Hover Providers
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
│   ├── LIBRARY_CATALOG.md        # Complete 500 component domain catalog
│   ├── typing-engine.md          # Humanized typing simulation & stealth spec
│   ├── faq.md                    # Frequently Asked Questions
│   └── components/               # 500 Standalone Markdown documentation pages
├── scripts/                      # Database build, generator & bump tools
├── CONTRIBUTING.md               # Contributor guidelines
├── ROADMAP.md                    # Project roadmap & milestones
├── SECURITY.md                   # Security & offline privacy model
└── LICENSE                       # MIT License
```

---

## 🤝 Open Source Community & Governance

- 📖 **[Contributing Guide](CONTRIBUTING.md)**: Setup instructions, coding standards, and C component conventions.
- 🗺️ **[Project Roadmap](ROADMAP.md)**: Current v3.0 status and future milestones.
- 🛡️ **[Security & Privacy Policy](SECURITY.md)**: Our commitment to zero telemetry and local-first computing.
- 📜 **[Code of Conduct](CODE_OF_CONDUCT.md)**: Contributor Covenant v2.1 standards.
- ❓ **[FAQ](docs/faq.md)**: Frequently asked questions about offline mechanics and exam stealth.

---

## 📄 License & Authors

- **Author**: [Mujahid Al Mahi](https://github.com/mujahidalmahi)
- **License**: Released under the open-source [MIT License](LICENSE).
