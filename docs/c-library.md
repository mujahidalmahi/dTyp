# dTyp Academic C Library & Database Guide

## 1. Overview

The dTyp C Library is a comprehensive, offline-first collection of **1,090 production-grade academic C components**, 10 snippets, and 4 templates spanning 24 foundational computer science categories.

The library is compiled into an indexed SQLite database (`dtyp.db`) located in:
- `database/dtyp.db`
- `apps/vscode/library/dtyp.db`

---

## 2. Categories

| Category | Component Count | Focus Areas |
|---|---|---|
| `fundamentals` | 45 | Bitwise ops, math helpers, Euclidean GCD, fast exponentiation |
| `stdlib` | 45 | Safe string copies, boundary checks, parsing, memory ops |
| `arrays` | 50 | Rotations, Kadane's algorithm, sliding window, 2D matrices |
| `strings` | 50 | Pattern matching, KMP, Rabin-Karp, palindrome, anagrams |
| `pointers` | 45 | Double pointers, pointer arithmetic, generic callbacks |
| `memory` | 45 | Safe malloc/calloc/free, contiguous 2D allocation, arenas |
| `structures` | 45 | Records, geometric coordinates, comparators |
| `unions` | 35 | Tagged unions, endianness detection, byte inspection |
| `files` | 45 | Binary I/O, buffered readers, CSV parsers, file checksums |
| `linked-list` | 55 | Singly, doubly, circular, Floyd's cycle detection, reverse |
| `stack` | 45 | Array stack, linked stack, min-stack, postfix evaluator |
| `queue` | 45 | Circular queue, priority queue, double-ended queue |
| `deque` | 35 | Double ended queue operations, sliding window maximum |
| `tree` | 50 | Binary trees, traversals, depth, LCA, diameter, mirroring |
| `bst` | 45 | Binary search tree insert, delete, search, range queries |
| `avl` | 40 | Self-balancing tree rotations (LL, RR, LR, RL), rebalancing |
| `heap` | 45 | Min-heap, max-heap, heapify, extract-min, priority queues |
| `trie` | 35 | Prefix tree, autocomplete, startsWith, dictionary search |
| `graph` | 55 | Adjacency list, BFS, DFS, Dijkstra, Bellman-Ford, Prim |
| `sorting` | 50 | QuickSort, MergeSort, HeapSort, Bubble, Insertion, Radix |
| `searching` | 40 | Binary search, exponential, jump, interpolation search |
| `recursion-backtracking` | 40 | N-Queens, Sudoku, permutations, subsets, Knight's tour |
| `dynamic-programming` | 50 | 0/1 Knapsack, LCS, LIS, Matrix Chain, Coin Change |
| `numerical-methods` | 55 | Bisection, Newton-Raphson, Simpson's rule, Runge-Kutta |

---

## 3. Command Syntax

```text
category>component()
```

Examples:
- `linkedList>createNode()`
- `sorting>quickSort()`
- `stack>push()`
- `graph>dijkstra()`
- `numerical>bisectionMethod()`
- `dp>knapsack01()`

---

## 4. SQLite Schema

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
```
