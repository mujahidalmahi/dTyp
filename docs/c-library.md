# dTyp Academic C Library & Database Guide (v2.0)

## 1. Overview

The dTyp C Library is an offline-first collection of **2,500 production-grade academic C components**, snippets, and architectural templates spanning 12 foundational computer science domains and 306 categories.

The library is compiled into an indexed SQLite WebAssembly database (`dtyp.db`) located in:
- `database/dtyp.db`
- `apps/vscode/library/dtyp.db`

For an exhaustive architectural catalog with sample signatures, parameter variation matrices, and complexity tables, see **[docs/LIBRARY_CATALOG.md](LIBRARY_CATALOG.md)**.

---

## 2. Primary Domains

| Domain | Category Code | Component Count | Highlights |
|---|---|---|---|
| **Data Structures** | `data-structures` | 700 | Singly, Doubly, Circular Linked Lists; Stacks; Queues; Deques; Trees (Binary, BST, AVL, RB); Binary Heaps; Tries; Hash Tables; Vectors; Ring Buffers; Matrices |
| **Algorithms** | `algorithms` | 550 | Sorting (Quick, Merge, Heap, Tim, Radix), Searching (Binary, Exponential), Graph (BFS, DFS, Dijkstra, Prim), DP (Knapsack, LCS, LIS), Backtracking |
| **Competitive Programming** | `competitive-programming` | 250 | Fast I/O buffers (`getchar_unlocked`), Modular arithmetic, Prime sieve, Fenwick (BIT), LCA binary lifting, Strings (KMP, Z) |
| **Numerical Methods** | `numerical-methods` | 250 | Root finding (Newton-Raphson, Bisection), Linear systems (Gaussian, LU), Quadrature, Runge-Kutta ODE solvers (RK4, RK45) |
| **Boiler Plate** | `boiler-plate` | 205 | C language syntax templates: loops, conditionals, main starters, structs/unions, memory allocation, file I/O, preprocessor |
| **Programming Patterns** | `programming-patterns` | 140 | OOP in C with VTables, State Machines, Observers, Sliding Window, Two Pointers, Monotonic Stacks |
| **Utilities & Templates** | `utilities` | 140 | Dynamic string builder, dynamic bitset, memory leak tracker, leveled logger, high-res timers |
| **C Basics** | `c-basics` | 70 | Validated terminal I/O, array rotations/min/max/average, custom string algorithms without string.h |
| **C Intermediate** | `c-intermediate` | 60 | Binary/text struct serialization, dynamic 2D memory layouts, function pointer callbacks, preprocessor macros |
| **C Advanced** | `c-advanced` | 60 | C11 _Generic macros, variadic <stdarg.h>, cache-line alignment utilities, POSIX signals, sockets |
| **Academic Programming** | `academic-programming` | 50 | Cooley-Tukey FFT/IFFT, RLC circuit solver, 2D physics & orbital simulation, discrete math truth tables |
| **C Projects** | `projects` | 25 | 25 Complete standalone runnable project files from beginning to end with main() |

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
