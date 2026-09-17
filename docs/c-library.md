# dTyp Academic C Library & Database Guide (v2.0)

## 1. Overview

The dTyp C Library is an offline-first collection of **10,000 production-grade academic C components**, snippets, and architectural templates spanning 12 foundational computer science domains and 303 categories.

The library is compiled into an indexed SQLite WebAssembly database (`dtyp.db`) located in:
- `database/dtyp.db`
- `apps/vscode/library/dtyp.db`

For an exhaustive architectural catalog with sample signatures, parameter variation matrices, and complexity tables, see **[docs/LIBRARY_CATALOG.md](LIBRARY_CATALOG.md)**.

---

## 2. Primary Domains

| Domain | Category Code | Component Count | Highlights |
|---|---|---|---|
| **Data Structures** | `data-structures` | 2,800 | Singly, Doubly, Circular Linked Lists; Stacks; Queues; Trees (Binary, BST, AVL, RB); Binary Heaps; Tries; Hash Tables |
| **Algorithms** | `algorithms` | 2,500 | Sorting (Quick, Merge, Heap, Tim, Radix), Searching (Binary, Exponential), Graph (BFS, DFS, Dijkstra, Prim), DP (Knapsack, LCS, LIS) |
| **Numerical Methods** | `numerical-methods` | 1,300 | Root finding (Newton-Raphson, Bisection), Linear systems (Gaussian, LU), Quadrature, Runge-Kutta ODE solvers |
| **Competitive Programming** | `competitive-programming` | 900 | Fast I/O buffers (`getchar_unlocked`), Modular arithmetic, Prime sieve, Fenwick, DSU |
| **Boiler Plate** | `boiler-plate` | 600 | Main entry points, CLI args (`getopt`), arena/pool allocators, file streams, test assertion runners |
| **Utilities & Templates** | `utilities` | 500 | Memory leak trackers, high-res timers, string builders, CSV tokenizers, bit arrays |
| **Programming Patterns** | `programming-patterns` | 500 | Two Pointers, Sliding Window, Monotonic Stacks, Coordinate Compression, State Machines |
| **C Basics** | `c-basics` | 200 | Syntax declarations, loops, conditionals, array fundamentals, standard conversions |
| **C Intermediate** | `c-intermediate` | 200 | Structs & unions, dynamic memory allocations, file I/O operations, preprocessor macros |
| **C Advanced** | `c-advanced` | 200 | Function pointers, dispatch tables, bitwise hacks, memory alignments, UB guards |
| **Academic Programming** | `academic-programming` | 150 | Signals & FFT, circuit analysis, physics simulation, discrete mathematics, university lab tasks |
| **C Projects** | `projects` | 150 | Student management, banking system, library system, CLI shell, file database, calculator |

---

## 3. Parameter Variation Design

Unlike static snippet packages that provide only one fixed implementation per concept, dTyp components feature structured parameter variations:
1. **Pointers & Callbacks**: Function pointer comparators vs inline operations.
2. **Status Codes & Error Handling**: Return code error patterns (`int status`) vs direct return values with `errno`.
3. **Recursion vs Iteration**: Both recursive and explicit stack-based iterative versions for all tree and graph algorithms.
4. **Memory Strategy**: Heap allocation (`malloc`) vs contiguous buffer/arena allocation.

---

## 4. SQLite Schema Reference

```sql
CREATE TABLE components (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    language TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    description TEXT,
    signature TEXT NOT NULL,
    code TEXT NOT NULL,
    time_complexity TEXT NOT NULL,
    space_complexity TEXT NOT NULL,
    documentation TEXT,
    version TEXT NOT NULL
);

CREATE TABLE dependencies (
    component_id TEXT NOT NULL,
    dependency_id TEXT NOT NULL,
    PRIMARY KEY(component_id, dependency_id)
);

CREATE TABLE snippets (
    id TEXT PRIMARY KEY,
    component_id TEXT,
    prefix TEXT NOT NULL,
    body TEXT NOT NULL,
    description TEXT,
    category TEXT
);

CREATE TABLE templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    body TEXT NOT NULL,
    description TEXT
);

CREATE INDEX idx_components_category ON components(category);
CREATE INDEX idx_components_name ON components(name);
```
