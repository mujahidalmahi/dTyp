# dTyp Offline C Component Library Catalog (v3.0)

The **dTyp** offline library contains **500 carefully curated, compilable C components** designed specifically for academic computer science courses, competitive programming, and systems engineering.

Every component is self-contained, adheres strictly to the C11 standard, requires zero third-party dependencies, strictly enforces the **Zero-Comments Invariant** (100% verified, 0 comments), and is indexed within an embedded SQLite WebAssembly database for sub-millisecond querying.

---

## 🏛️ Domain Breakdown (7 Canonical Domains)

| Domain | Key Categories | Exact Components | Description |
|---|---|---|---|
| **1. Boiler Plates** | `basic-templates`, `cli-arguments`, `error-handling`, `file-io`, `repl-shells`, `testing-benchmarks`, `memory-arenas`, `strings` | 64 | Compilable entry points, argument parsers (`getopt`), REPL shells, file I/O scaffolding, custom arena allocators, assertion test runners. |
| **2. Data Structures** | `linked-lists`, `stacks`, `queues`, `trees`, `heaps`, `hash-tables`, `graphs`, `disjoint-set` | 126 | Singly, doubly, circular linked lists; linear, circular, priority queues; BST, AVL, segment trees, tries, red-black trees; binary heaps; hash tables with chaining and probing. |
| **3. Algorithms** | `sorting`, `searching`, `graph-algorithms`, `dynamic-programming`, `greedy`, `backtracking`, `string-algorithms`, `math-numerical` | 120 | 10 sorting algorithms (3-way QuickSort, Merge, Heap, TimSort, Radix), binary search, Dijkstra, Prim, Kruskal, Bellman-Ford, Knapsack, LCS, LIS, N-Queens. |
| **4. Competitive Programming** | `fast-io`, `number-theory`, `range-queries`, `graph-advanced`, `combinatorics` | 50 | Ultra-fast `getchar_unlocked` I/O buffers, modular arithmetic, prime factorizations, Fenwick trees (BIT), LCA binary lifting, string hashing, and flow networks. |
| **5. Academics Programming** | `discrete-mathematics`, `numerical-methods`, `physics-mechanics`, `statistics-probability` | 46 | Discrete truth tables, numerical systems (Gauss-Jordan, LU, Newton-Raphson, Runge-Kutta RK4/RK45), orbital/projectile physics, probability distributions. |
| **6. Projects** | `systems-runtime`, `parsers-compilers`, `storage-engines`, `network-utilities`, `management-systems`, `tools-games` | 30 | Complete standalone compilable systems: micro UNIX shell, HTTP parser, mini event loop, JSON parser, custom allocator, key-value store, terminal chess, console snake. |
| **7. Detection** | `cycles-loops`, `patterns-strings`, `graph-structural`, `number-properties`, `array-anomalies`, `system-hardware`, `error-integrity` | 64 | Algorithmic detection primitives: Floyd's/Brent's cycle detection, graph cycles, palindromes, anagrams, bipartiteness, overflow checks, endianness detection, CRC32. |

---

## 🔬 Zero-Comments Invariant

Every component in dTyp is authored with 100% clean, self-documenting C code with **zero comment tokens**:
- No single-line comments (`//`)
- No multi-line comment blocks (`/* ... */`)
- Clean, readable variable and function names
- Adheres directly to academic requirements where extraneous comments are forbidden or penalize grading

---

## 🧬 Parametric Variations Design

dTyp components are distinguished by **real-world algorithmic and signature variations**:

### 1. Pointer & Signature Semantics
- **Head Return**: Returns the new head pointer:
  ```c
  Node* insertAtBeginning(Node* head, int value);
  ```
- **Double Pointer (In-Place Mutation)**: Updates the head pointer directly:
  ```c
  void insertAtBeginning(Node** headRef, int value);
  ```
- **Container Structure**: Encapsulates head, tail, and size:
  ```c
  typedef struct {
      Node* head;
      Node* tail;
      size_t size;
  } LinkedList;
  bool listInsertHead(LinkedList* list, int value);
  ```

### 2. Error Reporting Mechanisms
- **Status Code Return**: Returns `0` on success, negative error codes on failure:
  ```c
  int pop(Stack* s, int* outValue);
  ```
- **Boolean Flag**: Returns `true` on success, `false` on underflow/overflow:
  ```c
  bool pop(Stack* s, int* outValue);
  ```

---

## 📊 Database Indexing

All 500 components are indexed in SQLite with:
- Sub-millisecond full-text trigram searching
- Foreign key dependencies mapped for topological sorting
- Pre-computed header dependencies for automatic header injection
