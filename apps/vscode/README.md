<p align="center">
  <img src="images/icon.png" width="128" height="128" alt="dTyp Logo" />
</p>

<h1 align="center">dTyp — Don't Tell Your Professor</h1>

<p align="center">
  <b>Offline Academic C Programming Library & Automated Stealth Typing Assistant for VS Code</b>
</p>

<p align="center">
  <a href="https://github.com/mujahidalmahi/dTyp"><img src="https://img.shields.io/badge/GitHub-mujahidalmahi%2FdTyp-blue.svg" alt="GitHub" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=1da7b1e6-01f1-6f58-9ef3-d95516c5e875.dtyp-vscode"><img src="https://img.shields.io/badge/VS%20Code-Marketplace-green.svg" alt="VS Code Marketplace" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-purple.svg" alt="License: MIT" /></a>
  <a href="#"><img src="https://img.shields.io/badge/offline-100%25-orange.svg" alt="100% Offline" /></a>
</p>

---

## ⚡ What is dTyp?

**dTyp** is a local-first, zero-cloud development extension for C/C++ developers and computer science students. It bundles **24,000+ production-grade, compilable C components** across 65 hierarchical categories and provides realistic **character-by-character typing** directly into your active editor.

Whether you need a complete linked list, an AVL tree, a fast I/O setup, or an interactive CLI menu, dTyp types it naturally as if you wrote every keystroke yourself.

---

## 🚀 Key Features

### 1. Dual Typing Modes (Automatic & Stealth Manual `Ctrl+D`)
- **Automatic Mode (`"automatic"`)**: Code is automatically typed character-by-character with realistic human latency (15ms default) and optional jitter. Never bulk clipboard-pastes!
- **Stealth Manual Mode (`"manual"`)**: Queues the selected component or snippet into a step buffer. Every time you press **`Ctrl+D`**, dTyp types the next character (or configurable token batch) directly into your editor! You have total stealth and tempo control during live coding sessions or lab examinations.

### 2. Over 24,000 Bloat-Free C Components
A clean, curated offline C library with rich functional and algorithmic parameter variations:
- **Boiler Plate**: C main entrypoints (standard, CLI arguments with `getopt`, interactive REPLs, benchmark harnesses), Makefile templates, header guards, arena/pool allocators, assertion test runners.
- **Data Structures**: Singly, Doubly, Circular Singly, and Circular Doubly Linked Lists; Array & Linked Stacks; Circular Ring Queues; Binary Trees, BSTs, AVL Trees, Red-Black Trees, Binary Heaps; Tries; Segment Trees, Fenwick Trees (BIT); Disjoint Set Union (DSU); Hash Tables with open addressing and chaining.
- **Algorithms**: 6 Searching algorithms (linear, binary, ternary, jump, interpolation, exponential with upper/lower bounds); 10 Sorting algorithms (quick sort with 3-way Dijkstra partition, merge sort, heap sort, tim sort); Graph algorithms (BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim, topological sort, Kosaraju, Tarjan); Dynamic Programming (knapsack, LCS, LIS, edit distance, matrix chain, coin change, rod cutting).
- **Numerical Methods**: Newton-Raphson (with automated numerical derivative callback, analytical derivative, status codes, iteration histories), Bisection, Secant, Regula Falsi, Brent's method; Gaussian elimination with partial pivoting, LU decomposition, Cholesky, Gauss-Seidel, SOR; Quadrature & ODE solvers (Euler, Heun, RK4, RK45 adaptive).
- **Competitive Programming**: Fast I/O buffers (`getchar_unlocked`), number theory (GCD, LCM, modular exponentiation), Sieve of Eratosthenes, LCA with binary lifting.
- **Programming Patterns**: Object-Oriented C with VTables, State Machines, Observers, Abstract Factories, Strategy pattern, Command queue.
- **Utilities & Projects**: Ring buffers, memory leak trackers, CSV tokenizers, micro UNIX shell, recursive-descent JSON parser, embedded key-value store.

### 3. Production Engines
- **Cursor Engine**: Auto-detects placeholders (such as `/* TODO */`, `<type>`) in inserted code and automatically positions your cursor at the first placeholder for instant editing.
- **Memory Engine**: Inspects the active document and automatically adds missing standard headers (`<stdlib.h>`, `<stdbool.h>`, `<stdio.h>`, `<math.h>`, etc.) needed by inserted components.
- **Session Engine**: Tracks your insertion history and favorites across VS Code sessions. Re-insert recent components in one keystroke!
- **Search Engine**: Ranked fuzzy search with category scoping (e.g. `boiler:main`, `ds:stack`, `algo:sort`).
- **Snippet Engine**: Real VS Code snippet integration with interactive tab-stops (`$1`, `$2`, `$0`). Trigger directly with `dtyp.main`, `dtyp.header`, `dtyp.for`, `dtyp.malloc`, `dtyp.file.read`, `dtyp.cp.fastio`, `dtyp.test`.

### 4. 100% Offline Runtime
Everything is bundled inside a high-performance SQLite WebAssembly database (`dtyp.db`). Zero network requests, zero telemetry, zero dependencies on external servers.

---

## ⌨️ Commands & Shortcuts

| Shortcut | Command | Action |
|---|---|---|
| `Ctrl+D` | `dTyp: Step Next Character` | Types next character(s) in Manual Stepping Mode |
| `Ctrl+Shift+D` | `dTyp: Browse Offline Library` | Hierarchical category & component browser |
| `Ctrl+Shift+P` -> `dtyp.quickInsert` | `dTyp: Quick Insert (Fuzzy Search)` | Interactive fuzzy search QuickPick with ranking |
| `Ctrl+Shift+P` -> `dtyp.insertSnippet` | `dTyp: Insert Snippet` | Select and insert standard boilerplate snippets |
| `Ctrl+Shift+P` -> `dtyp.showHistory` | `dTyp: Show Insertion History` | View recently inserted components |
| `Escape` | `dTyp: Cancel Typing / Clear Queue` | Cancels ongoing automatic typing or clears manual queue |

---

## ⚙️ Configuration Settings

Customize dTyp behavior in your VS Code `settings.json`:

```json
{
  // Typing mode: "automatic" (continuous with delay) or "manual" (step per Ctrl+D press)
  "dtyp.typingMode": "automatic",

  // Number of characters typed per Ctrl+D press in manual mode
  "dtyp.stepSize": 1,

  // Milliseconds delay per character in automatic mode
  "dtyp.typingDelayMs": 15,

  // Automatically check and inject missing headers (e.g. <stdlib.h>, <stdbool.h>)
  "dtyp.autoIncludeHeaders": true,

  // Prevent duplicate struct or function definitions from being inserted
  "dtyp.checkDuplicates": true
}
```

---

## 💡 Usage Examples

### 1. Fuzzy Search & Insert
1. Open any `.c` or `.cpp` file.
2. Run `dTyp: Quick Insert` from the Command Palette.
3. Type `quick sort` or `boiler:main` or `ds:stack`.
4. Press `Enter`. The code types character-by-character into your editor!

### 2. Manual Stealth Step Mode
1. Set `"dtyp.typingMode": "manual"` in settings.
2. Select any component or snippet via QuickPick.
3. You will see `$(keyboard) dTyp: 184 chars [Ctrl+D to step]` in your Status Bar.
4. Press `Ctrl+D` repeatedly to type the code character-by-character as if you are actively typing!

### 3. Quick Inline Snippets
Type any snippet prefix and press `Tab` or `Enter`:
- `dtyp.main` — Standard C main function
- `dtyp.main.interactive` — Interactive menu loop
- `dtyp.header` — C/C++ header guard
- `dtyp.for` — Index-based for loop
- `dtyp.malloc` — Safe dynamic memory allocation with error check
- `dtyp.struct` — Typedef struct definition
- `dtyp.file.read` — Safe line-by-line file reading template
- `dtyp.cp.fastio` — Fast I/O testcase runner
- `dtyp.benchmark` — High-precision timer benchmark
- `dtyp.test` — Assertion test harness

---

## 📄 License

MIT License. Designed & Developed by [Mujahid Al Mahi](https://github.com/mujahidalmahi).
