# dTyp Architecture Guide (v2.0)

## Overview

**dTyp (Don't Tell Your Professor)** is a production-grade VS Code extension and offline academic C programming ecosystem designed to provide instant, offline C code insertion, smart context awareness, and character-by-character editor typing simulation.

```
                            dTyp Workspace
                                  │
                             apps/vscode
                         (VS Code Extension)
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
    Command Parser &        6 Core Engines          Library Engine
  Completion Providers    (Cursor, Session,      (WebAssembly sql.js)
  (Completion & Snippet)   Memory, AutoType,              │
          │               Search, Snippets)     SQLite Database (dtyp.db)
          │                       │             24,478 Offline C Components
          └───────────────────────┼───────────────────────┘
                                  │
                             Shared Core
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
    typing-engine             utilities               validation
 (CharacterQueue,        (Logger, Events,        (Component & Syntax
 Scheduler, Target)      File I/O, Jitter)        Balance Validator)
```

---

## 1. The 6 Production Engines (`apps/vscode/src/engine/`)

### 1. `CursorEngine`
- Auto-detects placeholders (such as `/* TODO */`, `/* INSERT */`, `<type>`) in inserted code.
- Automatically jumps the cursor to the first placeholder and selects it so the developer can immediately type.
- Provides placeholder forward/backward navigation.

### 2. `SessionEngine`
- Tracks the developer's insertion history across VS Code sessions (persisted via `context.globalState`).
- Manages recently inserted components with timestamps and typing statistics.
- Manages starred Favorites for rapid re-insertion.

### 3. `MemoryEngine`
- Analyzes the active document context.
- Detects required standard library headers (e.g. `<stdlib.h>` for `malloc`, `<stdbool.h>` for `bool`, `<stdio.h>` for `printf`) and automatically injects missing headers at the top of the file.
- Guards against duplicate definitions.

### 4. `AutoTypeEngine`
- Implements dual typing execution modes:
  1. **Automatic Mode**: Types code continuously at realistic typing speeds (15ms default) with simulated human jitter.
  2. **Stealth Manual Mode**: Queues code into a pending step buffer. Every press of **`Ctrl+D`** types the next character(s) into the active editor for maximum stealth and pacing control.
- Manages queue states, status bar notifications, and safe cancellation via `Escape`.

### 5. `SearchEngine`
- Production-grade ranked fuzzy search engine.
- Calculates relevance scores: exact ID match (1000) > exact name (800) > name prefix (600) > name contains (400) > aliases (350) > category (250) > tags (150).
- Supports category-scoped searches (e.g. `boiler:main`, `ds:stack`, `algo:sort`, `num:root`).
- LRU query caching for sub-millisecond autocomplete responsiveness.

### 6. `SnippetEngine`
- Native VS Code `CompletionItemProvider` integration.
- Expands snippet triggers (`dtyp.main`, `dtyp.header`, `dtyp.for`, `dtyp.malloc`, `dtyp.file.read`, `dtyp.cp.fastio`, `dtyp.test`) into `vscode.SnippetString` with interactive tab stops (`$1`, `$2`, `$0`).

---

## 2. Component Taxonomy & Library

The offline library contains **24,478 compilable C components** organized across 12 primary domains and 65 categories:

1. **Boiler Plate (`boiler-plate`)**: Main entrypoints (standard, CLI args, interactive REPL, benchmarks), header guards, Makefiles, custom memory allocators (arena, pool, bump, stack), testing harnesses, and file I/O starters.
2. **Data Structures (`data-structures`)**: Singly, Doubly, Circular Singly, and Circular Doubly Linked Lists; Array & Linked Stacks; Circular Ring Queues; Binary Trees, BSTs, AVL Trees, Red-Black Trees, Binary Heaps; Tries; Segment Trees, Fenwick Trees; DSU; Hash Tables.
3. **Algorithms (`algorithms`)**: Linear, binary, ternary, jump, interpolation, exponential searches; 10 Sorting algorithms; Graph algorithms (BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim, topological sort, Kosaraju, Tarjan); Dynamic Programming (knapsack, LCS, LIS, edit distance, matrix chain, coin change, rod cutting).
4. **Numerical Methods (`numerical-methods`)**: Root finding (Newton-Raphson, Bisection, Secant, Regula Falsi, Brent); Linear solvers (Gaussian elimination, LU, Cholesky, Gauss-Seidel, SOR); Quadrature & ODE solvers (Euler, Heun, RK4, RK45 adaptive); Interpolation & curve fitting.
5. **Competitive Programming (`competitive-programming`)**: Fast I/O buffers, number theory, prime sieves, LCA binary lifting.
6. **Programming Patterns (`programming-patterns`)**: OOP in C with VTables, State Machines, Observers, Factories, Strategy pattern, Command queue.
7. **Utilities (`utilities`)**: Ring buffers, memory trackers, CSV tokenizers, bit manipulation.
8. **C Basics (`c-basics`)**: Control flow, math formulas, I/O formatting, conversions.
9. **C Intermediate (`c-intermediate`)**: Pointers, dynamic memory, structs, files.
10. **C Advanced (`c-advanced`)**: Function pointers, callbacks, variadics, signals.
11. **Academic Programming (`academic-programming`)**: Coursework algorithms and data structures.
12. **Projects (`projects`)**: Micro systems (mini shell, JSON parser, key-value store).

---

## 3. Storage & Packaging Optimization

- **Bundled Database**: Packed with SQLite WebAssembly (`dtyp.db`), optimized from 178.7 MB down to **47.2 MB** (73% size reduction).
- **VSIX Package**: The entire extension packages into a **5.64 MB** `.vsix` file (down from 20.2 MB).
- **Zero Cloud**: 100% offline, zero network requests, zero telemetry.
