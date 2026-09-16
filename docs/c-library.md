# dTyp Academic C Library & Database Guide (v2.0)

## 1. Overview

The dTyp C Library is an offline-first collection of **24,478 production-grade academic C components**, snippets, and architectural templates spanning 12 foundational computer science domains and 65 categories.

The library is compiled into an indexed SQLite WebAssembly database (`dtyp.db`) located in:
- `database/dtyp.db`
- `apps/vscode/library/dtyp.db`

For an exhaustive architectural catalog with sample signatures, parameter variation matrices, and complexity tables, see **[docs/LIBRARY_CATALOG.md](LIBRARY_CATALOG.md)**.

---

## 2. Primary Domains

| Domain | Category Code | Component Count | Highlights |
|---|---|---|---|
| **Boiler Plate** | `boiler-plate` | 2,050 | CLI args (`getopt`), REPL loops, Makefiles, arena/pool allocators, assertion test runners |
| **Data Structures** | `data-structures` | 4,320 | Singly, Doubly, Circular Linked Lists; Stacks; Queues; Deques; Binary Trees, BSTs, AVL, Red-Black Trees; Binary Heaps; Tries; Segment Trees, Fenwick Trees; DSU; Hash Tables |
| **Algorithms** | `algorithms` | 5,120 | Linear, Binary, Ternary, Jump, Interpolation, Exponential searches; 10 Sorting algorithms; Graph algorithms (BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim); Dynamic Programming (Knapsack, LCS, LIS, Matrix Chain, Coin Change) |
| **Numerical Methods** | `numerical-methods` | 2,240 | Root finding (Newton-Raphson, Bisection, Secant, Regula Falsi, Brent); Linear solvers (Gaussian, LU, Cholesky, SOR); Quadrature & ODE solvers (Euler, Heun, RK4, RK45 adaptive) |
| **Competitive Programming** | `competitive-programming` | 1,850 | Fast I/O buffers (`getchar_unlocked`), modular arithmetic, prime sieves, LCA binary lifting |
| **Programming Patterns** | `programming-patterns` | 1,560 | OOP in C with VTables, State Machines, Observers, Factories, Strategy, Command queues |
| **Utilities** | `utilities` | 1,420 | Ring buffers, memory trackers, CSV tokenizers, bit manipulation |
| **C Basics** | `c-basics` | 1,280 | Control flow, math helpers, I/O formatting, conversions |
| **C Intermediate** | `c-intermediate` | 1,450 | Pointer arithmetic, dynamic memory, structs, files |
| **C Advanced** | `c-advanced` | 1,320 | Function pointers, callbacks, variadics, UNIX signals |
| **Academic Programming** | `academic-programming` | 1,180 | Coursework algorithms, formal data structures, invariants |
| **Projects** | `projects` | 688 | Micro UNIX shell, recursive-descent JSON parser, key-value store |

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
