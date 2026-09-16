<p align="center">
  <img src="images/icon.png" width="128" height="128" alt="dTyp Logo" />
</p>

<p align="center">
  <b>Don't Tell Your Professor — Production-Grade Academic C/C++ Engineering Ecosystem & Stealth Typing Assistant for VS Code</b>
</p>

<p align="center">
  <a href="https://github.com/mujahidalmahi/dTyp/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/mujahidalmahi/dTyp/ci.yml?branch=main&label=CI&logo=github" alt="CI Build Status" /></a>
  <a href="https://github.com/mujahidalmahi/dTyp/releases/latest"><img src="https://img.shields.io/github/v/release/mujahidalmahi/dTyp?color=blue&label=version&logo=semanticrelease" alt="Release Version" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode"><img src="https://img.shields.io/badge/VS%20Code-Marketplace-007ACC?logo=visualstudiocode&logoColor=white" alt="VS Code Marketplace" /></a>
  <a href="docs/LIBRARY_CATALOG.md"><img src="https://img.shields.io/badge/library-24%2C478%20C%20Components-emerald?logo=c" alt="24,478 C Components" /></a>
  <a href="#"><img src="https://img.shields.io/badge/runtime-SQLite%20WASM-blueviolet?logo=sqlite" alt="SQLite WASM" /></a>
  <a href="SECURITY.md"><img src="https://img.shields.io/badge/privacy-100%25%20Offline-orange" alt="100% Offline" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT" /></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
</p>

---

## ⚡ Executive Summary

**dTyp** is a zero-cloud, high-performance C/C++ developer companion and stealth typing simulator built natively for Visual Studio Code. It packages **24,478 compilable, bloat-free C components** across 12 primary computer science domains inside an embedded SQLite WebAssembly database, accompanied by a realistic **character-by-character typing engine**.

Whether practicing complex algorithms, preparing academic lab assignments, or debugging real-world systems, dTyp types flawless, production-ready code directly into your editor—either continuously with human-like jitter or discreetly keystroke-by-keystroke via **`Ctrl+D`**.

---

## 📑 Table of Contents

- [Why dTyp?](#-why-dtyp)
- [Key Architectural Features](#-key-architectural-features)
  - [1. Dual Typing Simulation Modes](#1-dual-typing-simulation-modes)
  - [2. 24,478 Compilable C Components](#2-24478-compilable-c-components)
  - [3. Six High-Performance Production Engines](#3-six-high-performance-production-engines)
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
- [Open Source Community & Governance](#-open-source-community--governance)
- [License & Authors](#-license--authors)

---

## ⚖️ Why dTyp?

| Capability | Traditional Snippet Packs | Cloud AI Assistants (Copilot, etc.) | **dTyp v2.0** |
|---|---|---|---|
| **Insertion Mechanism** | Instant bulk clipboard paste | Multi-token streaming / paste | **Realistic character typing or stealth `Ctrl+D` stepping** |
| **Offline Reliability** | ✅ Yes (Static JSON) | ❌ No (Requires internet & active subscription) | **✅ 100% Offline (Embedded SQLite WebAssembly)** |
| **Component Depth** | ~50 basic templates | Probabilistic / Hallucinatory | **24,478 verified compilable C components** |
| **Parameter Variations** | ❌ None | Unpredictable variations | **Structured algorithmic & pointer variations** |
| **AST / Header Injection** | ❌ None | Partial / Manual | **Automatic missing header detection & insertion** |
| **Exam / Lab Discretion** | ❌ Obvious paste events | ❌ Flagged by network proxies & telemetry | **Total stealth with status-bar stepping buffer** |
| **UI Experience** | Basic autocomplete list | Ghost text inline suggestions | **Dedicated Activity Bar, TreeViews, & Webviews** |

---

## 🌟 Key Architectural Features

### 1. Dual Typing Simulation Modes
dTyp never forces a sudden clipboard paste. Instead, choose your typing modality in settings:
- **Automatic Streaming (`"automatic"`)**: The engine simulates human keystrokes with configurable character latency (`15ms` default) and randomized Gaussian jitter. Complete with realistic newline pauses and indentation awareness.
- **Stealth Manual Stepping (`"manual"`)**: Queues the selected component or snippet into an in-memory stepping buffer. Every time you press **`Ctrl+D`**, dTyp types the next character (or batch of characters) into your active editor. To an observer or screen recorder, you are typing every character yourself with natural human timing.

### 2. 24,478 Compilable C Components
Curated, bloat-free, standards-compliant C99/C11 code organized into 12 primary domains and 65 categories. Every component features rich parameter variations:
- **Function pointer abstractions** vs **direct pointer operations**.
- **Error status codes (`int` returning error enums)** vs **direct return value types**.
- **Iterative implementations** vs **recursive implementations**.
- **Contiguous arena/buffer allocations** vs **dynamic heap allocations**.

*Explore the full catalog breakdown in [docs/LIBRARY_CATALOG.md](docs/LIBRARY_CATALOG.md).*

### 3. Six High-Performance Production Engines
- 🎯 **CursorEngine**: Automatically parses inserted code for placeholder tokens (e.g. `/* TODO */`, `/* INSERT */`, `<type>`) and places your cursor exactly at the first editable target.
- 🧠 **MemoryEngine**: Scans the active C document and automatically injects any missing standard headers (e.g. `<stdlib.h>`, `<stdbool.h>`, `<stdio.h>`, `<math.h>`) at the top of the file without creating duplicate includes.
- ⏱️ **SessionEngine**: Persists your insertion history, session statistics, and starred favorites across editor reloads.
- ⚡ **AutoTypeEngine**: Orchestrates the character queue, keystroke scheduler, and `Ctrl+D` manual step buffer.
- 🔍 **SearchEngine**: Production-grade ranked fuzzy search with category scoping (`boiler:main`, `ds:tree`, `algo:sort`) and sub-millisecond LRU caching.
- 📝 **SnippetEngine**: Native VS Code `CompletionItemProvider` with tab-stops (`$1`, `$2`, `$0`) for everyday C boilerplate.

### 4. Dedicated Activity Bar & 4 Sidebar TreeViews
Access the entire ecosystem without touching the keyboard:
- 🌲 **Offline C Library (24,478)**: Hierarchical explorer organized by Domain > Category > Component. Click any item to preview and insert.
- ⭐ **Favorites & Pinned**: Keep your most frequently used structs, algorithms, and templates pinned for instantaneous access.
- 📜 **Recent Insertions**: Search and re-insert recently used components with one click.
- 🎛️ **Quick Controls**: Switch typing mode, toggle auto-header injection, view diagnostics, and trigger release notes directly from the sidebar.

### 5. Interactive Release Notes & Automated Update Engine
- **"What's New" Webview Panel**: Beautiful visual release notes rendered inside VS Code whenever a new version is installed.
- **GitHub Releases Update Engine**: Non-intrusive background check against `mujahidalmahi/dTyp` releases with one-click direct download.

### 6. 100% Offline & Zero-Cloud Privacy Guarantee
All 24,478 components and search indexes reside in `dtyp.db`, accessed in-memory via pure WebAssembly (`sql.js`). No external network requests, zero telemetry, zero analytics, zero cloud reliance.

---

## 🧭 Activity Bar Interface

Click the **dTyp** icon in the VS Code Activity Bar (or press `Ctrl+Shift+D`) to open the explorer:

```
┌──────────────────────────────────────────────┐
│ dTyp: Activity Bar Explorer                  │
├──────────────────────────────────────────────┤
│ ▼ OFFLINE C LIBRARY (24,478)                 │
│   ▶ 📁 Boiler Plate (2,050)                  │
│   ▼ 📁 Data Structures (4,320)               │
│     ▶ 📁 Linked Lists (1,080)                │
│     ▼ 📁 Binary Search Trees (850)           │
│       📄 bst_insert_iterative                │
│       📄 bst_insert_recursive                │
│       📄 bst_delete_with_status              │
│   ▶ 📁 Algorithms (5,120)                    │
│   ▶ 📁 Numerical Methods (2,240)             │
│   ▶ 📁 Competitive Programming (1,850)       │
│                                              │
│ ▼ FAVORITES & PINNED                         │
│   ⭐ bst_insert_recursive                    │
│   ⭐ quick_sort_3way_dijkstra                │
│   ⭐ arena_allocator_create                  │
│                                              │
│ ▼ RECENT INSERTIONS                          │
│   🕒 boiler_main_repl (2m ago)               │
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
| **`Ctrl+Shift+D`** | `dtyp.browseLibrary` | Opens the hierarchical category and component browser |
| **`Escape`** | `dtyp.cancelTyping` | Instantly halts automatic typing or flushes the manual queue |
| `Ctrl+Shift+P` | `dtyp.quickInsert` | Opens ranked fuzzy search QuickPick across all 24,478 components |
| `Ctrl+Shift+P` | `dtyp.insertSnippet` | Interactively selects and inserts standard C boilerplate snippets |
| `Ctrl+Shift+P` | `dtyp.showHistory` | Opens history QuickPick to re-insert recently used items |
| `Ctrl+Shift+P` | `dtyp.showReleaseNotes` | Launches the interactive "What's New in v2.0" Webview panel |
| `Ctrl+Shift+P` | `dtyp.checkForUpdates` | Checks GitHub releases for new dTyp versions |
| `Ctrl+Shift+P` | `dtyp.diagnostics` | Runs an automated health check (WASM, DB, engines, and status) |

---

## ⚙️ Configuration Reference

Configure dTyp via your VS Code Settings UI or `settings.json`:

```json
{
  // Typing simulation mode: "automatic" (continuous stream) or "manual" (stealth Ctrl+D stepping)
  "dtyp.typingMode": "automatic",

  // Number of characters typed per Ctrl+D press in manual mode (1 - 50)
  "dtyp.stepSize": 1,

  // Keystroke latency in milliseconds for automatic mode (1 - 200 ms)
  "dtyp.typingDelayMs": 15,

  // Automatically detect and inject missing standard library headers (<stdlib.h>, <stdbool.h>, etc.)
  "dtyp.autoIncludeHeaders": true,

  // Prevent inserting duplicate structs or functions into the active file
  "dtyp.checkDuplicates": true,

  // Automatically show the release notes webview after updating to a new version
  "dtyp.showReleaseNotesOnUpdate": true,

  // Periodically check GitHub for extension updates
  "dtyp.checkForUpdates": true
}
```

---

## 📚 Component Taxonomy

The offline database (`dtyp.db`) houses **24,478 components** structured across 12 primary domains:

| Domain | Categories | Parameter Variations & Scope |
|---|---|---|
| **Boiler Plate** | Standard main, CLI args (`getopt`), REPLs, benchmarks, Makefiles, arena/pool allocators, assertion test runners | Status codes, allocation arenas, debug log levels |
| **Data Structures** | Singly, Doubly, Circular Linked Lists; Stacks; Queues; Deques; Binary Trees, BSTs, AVL, Red-Black Trees; Binary Heaps; Tries; Segment Trees, Fenwick Trees; DSU; Hash Tables | Custom node structs, return error codes, recursive vs iterative |
| **Algorithms** | 6 Searching algorithms; 10 Sorting algorithms (3-way QuickSort, Merge, Heap, TimSort); Graph traversals (BFS, DFS), Shortest Paths (Dijkstra, Bellman-Ford, Floyd-Warshall), MST (Kruskal, Prim); DP (Knapsack, LCS, LIS, Matrix Chain, Coin Change) | Function pointer comparators, adjacency matrix vs list representations |
| **Numerical Methods** | Root finding (Newton-Raphson, Bisection, Secant, Regula Falsi, Brent); Linear systems (Gauss, LU, Cholesky, SOR); Quadrature & ODE solvers (Euler, Heun, RK4, RK45 adaptive) | Analytical vs numerical derivatives, tolerance thresholds, iteration trackers |
| **Competitive Programming** | Fast I/O buffers (`getchar_unlocked`), modular arithmetic, prime sieves, LCA binary lifting | Buffer sizes, 64-bit integer fast scanners, testcase loops |
| **Programming Patterns** | Object-oriented C (VTables), Finite State Machines, Observers, Abstract Factories, Strategy, Command Queues | Static dispatch vs dynamic function pointers |
| **Utilities** | Ring buffers, memory leak trackers, CSV parsers, bit manipulation bitsets | Static stack buffers vs heap dynamic resizing |
| **C Basics** | Control flow, mathematical utilities, terminal I/O formatting, conversions | Type safety, boundary validations |
| **C Intermediate** | Dynamic memory wrappers, pointer arithmetic, structures, file I/O | Deep vs shallow copying, file buffering |
| **C Advanced** | Generic callbacks, variadic arguments, UNIX signals, POSIX threads | Thread safety, reentrant callbacks |
| **Academic Programming** | Coursework assignments, theoretical proofs, algorithm verifications | Educational commentary, step-by-step state printing |
| **Projects** | Micro UNIX shell, recursive-descent JSON parser, embedded key-value database | Standalone compilable mini-systems |

*For complete domain breakdowns, sample signatures, and architectural patterns, see [docs/LIBRARY_CATALOG.md](docs/LIBRARY_CATALOG.md).*

---

## 📝 VS Code Snippet System

In addition to the component database, dTyp provides native interactive snippets with tab stops (`$1`, `$2`, `$0`):

| Prefix | Snippet Description |
|---|---|
| `dtyp.main` | Standard C main template with clean return code |
| `dtyp.main.args` | C main template with argc/argv argument parsing |
| `dtyp.main.interactive` | Interactive terminal menu loop with switch-case |
| `dtyp.header` | Safe header guard with `#ifndef` / `#define` |
| `dtyp.for` | Standard index-based `for` loop |
| `dtyp.malloc` | Safe dynamic allocation with `NULL` check and error reporting |
| `dtyp.struct` | `typedef struct` definition with clean identifier |
| `dtyp.file.read` | Safe line-by-line file reading template using `fgets` |
| `dtyp.cp.fastio` | Competitive programming fast I/O scaffold |
| `dtyp.benchmark` | High-precision execution timer using `clock_gettime` |
| `dtyp.test` | Lightweight assertion unit testing harness |

---

## 🚀 Quick Start Guide

### Installation
1. **Via VS Code Marketplace**: Search for `dTyp` in the Extensions view (`Ctrl+Shift+X`) and click **Install**.
2. **Via Pre-built VSIX**: Download the latest `.vsix` package from [Releases](https://github.com/mujahidalmahi/dTyp/releases) and run:
   ```bash
   code --install-extension dtyp-vscode-2.0.0.vsix
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
5. Press **`Ctrl+D`** repeatedly. Each press types the next character directly into your file!

---

## 🩺 Diagnostics & Self-Healing

If you ever encounter an issue or want to verify your installation:
1. Open the Command Palette (`Ctrl+Shift+P`).
2. Run **`dTyp: Diagnostics & System Health`**.
3. dTyp executes a live self-test verifying:
   - WebAssembly SQLite initialization.
   - Database integrity and component count (`24,478` rows verified).
   - Core engine responsiveness (Cursor, Memory, Session, AutoType, Search).
   - Active typing mode and keybinding registrations.
4. Results are presented in an interactive VS Code notification with an option to view full telemetry logs.

---

## 🏗️ Repository & Monorepo Structure

```
dTyp/
├── apps/
│   └── vscode/                   # VS Code Extension (TypeScript)
│       ├── library/              # Embedded SQLite database & WASM binaries
│       ├── src/
│       │   ├── engine/           # 6 Production Engines (Cursor, Memory, etc.)
│       │   ├── providers/        # Activity Bar TreeViews & Webview panels
│       │   ├── parser/           # Category command parser
│       │   └── extension.ts      # Extension activation lifecycle
│       └── package.json          # Extension manifest, commands & configurations
├── packages/
│   ├── types/                    # Shared TypeScript interfaces
│   ├── utilities/                # Common logging, formatting, and file helpers
│   ├── validation/               # Component & syntax balance validators
│   ├── typing-engine/            # Platform-agnostic keystroke scheduler
│   └── library-engine/           # SQLite abstraction layer
├── docs/
│   ├── architecture.md           # End-to-end technical architecture guide
│   ├── LIBRARY_CATALOG.md        # Complete 24,478 component domain catalog
│   ├── typing-engine.md          # Typing simulation & stealth stepping spec
│   └── faq.md                    # Frequently Asked Questions
├── .github/
│   ├── workflows/                # CI & Release automated pipelines
│   └── ISSUE_TEMPLATE/           # Structured bug, feature & component templates
├── scripts/                      # Database build, generator & bump tools
├── CONTRIBUTING.md               # Contributor guidelines
├── ROADMAP.md                    # Project roadmap & milestones
├── SECURITY.md                   # Security & offline privacy model
└── LICENSE                       # MIT License
```

---

## 🤝 Open Source Community & Governance

We welcome contributions from developers, researchers, and students worldwide!

- 📖 **[Contributing Guide](CONTRIBUTING.md)**: Setup instructions, coding standards, and C component conventions.
- 🗺️ **[Project Roadmap](ROADMAP.md)**: Current v2.0 status, upcoming v2.1 milestones, and v3.0 vision.
- 🛡️ **[Security & Privacy Policy](SECURITY.md)**: Our commitment to zero telemetry and local-first computing.
- 📜 **[Code of Conduct](CODE_OF_CONDUCT.md)**: Contributor Covenant v2.1 standards.
- ❓ **[FAQ](docs/faq.md)**: Frequently asked questions about offline mechanics and exam stealth.

---

## 📄 License & Authors

- **Author**: [Mujahid Al Mahi](https://github.com/mujahidalmahi)
- **License**: Released under the open-source [MIT License](LICENSE).
