# dTyp Offline C Component Library Catalog

The **dTyp** offline library contains **24,478 carefully curated, compilable C components** designed specifically for academic computer science courses, competitive programming, and systems engineering.

Every component is self-contained, adheres to the C11 standard, requires zero third-party dependencies, and is indexed within an embedded SQLite WebAssembly database for sub-millisecond querying.

---

## 🏛️ Domain Breakdown (12 Primary Domains)

| Domain | Key Categories | Approx. Components | Description |
|---|---|---|---|
| **1. Boiler Plate** | `main`, `cli-args`, `makefiles`, `allocators`, `test-harness` | 498 | Compilable entry points, argument parsers (`getopt`), custom arena/pool allocators, and test assertion runners. |
| **2. Data Structures** | `linked-list`, `stack`, `queue`, `tree`, `hash-table`, `heap`, `trie`, `segment-tree` | 1,840 | Complete node definitions, traversals, insertions, deletions, rebalancing, and circular variants. |
| **3. Algorithms** | `sorting`, `searching`, `divide-and-conquer`, `greedy`, `backtracking` | 1,500 | 10 sorting algorithms (quick, merge, heap, tim, radix), 6 searching algorithms with lower/upper bound helpers. |
| **4. Graph Theory** | `traversal`, `shortest-path`, `minimum-spanning-tree`, `flow`, `components` | 1,100 | Adjacency list/matrix graphs, BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim, Tarjan, Kosaraju. |
| **5. Dynamic Programming** | `knapsack`, `lcs`, `lis`, `matrix-chain`, `edit-distance`, `grid-paths` | 1,000 | Memoized recursive top-down and tabulated bottom-up solutions with space-optimized rolling arrays. |
| **6. Numerical Methods** | `root-finding`, `linear-systems`, `interpolation`, `integration`, `ode-solvers` | 1,200 | Newton-Raphson, Bisection, Secant, Brent's method; Gaussian elimination, LU, Cholesky; RK4 and RK45 adaptive ODE solvers. |
| **7. Competitive Programming** | `fast-io`, `modular-arithmetic`, `bitmask`, `combinatorics`, `geometry` | 1,400 | Ultra-fast `getchar_unlocked` I/O buffers, modular inverse, prime factorizations, Fenwick trees (BIT). |
| **8. Programming Patterns** | `oop-c`, `state-machine`, `observer`, `factory`, `strategy`, `command-queue` | 1,100 | Object-oriented C with VTables, finite state machines, event dispatchers, and opaque pointer encapsulation. |
| **9. Utilities & Memory** | `ring-buffer`, `string-builder`, `memory-tracker`, `bitset`, `timer` | 1,500 | Leak-detecting allocators, dynamic resizing string builders, lock-free circular queues, and high-res timers. |
| **10. C Basics** | `variables`, `control-flow`, `loops`, `arrays`, `pointers-intro` | 2,000 | Fundamental university coursework exercises: pointer arithmetic, array manipulation, and condition checks. |
| **11. C Intermediate** | `file-io`, `structs-unions`, `function-pointers`, `preprocessor`, `recursion` | 4,000 | Dynamic memory allocation patterns, file serializations, callbacks, and recursive mathematical models. |
| **12. C Advanced & Systems** | `bit-manipulation`, `low-level-memory`, `concurrency-patterns`, `posix-wrappers` | 5,000 | Memory-mapped I/O, bitwise hacks (Hamming weight, CLZ/CTZ), alignment utilities, and thread-safe abstractions. |
| **13. Academic Semester Projects**| `micro-shell`, `json-parser`, `kv-store`, `virtual-vm`, `compression` | 2,440 | Micro applications: recursive descent JSON parser, LZW compression, mini UNIX shell, and embedded database. |

---

## 🔬 Parametric Variations Design

Unlike naive snippet collections that duplicate identical code, dTyp components are distinguished by **real-world algorithmic and signature variations**:

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

### 3. Execution Strategy
- **Recursive**: Clean, intuitive base-case and recursive-step semantics.
- **Iterative (Optimized)**: Non-recursive implementations using explicit loops and auxiliary stacks for maximum performance and recursion-depth safety.

### 4. Numerical Differentiation Variations
- **Analytical Derivative**: Function accepts explicit mathematical derivative callback:
  ```c
  double newtonRaphson(double (*f)(double), double (*df)(double), double x0, double tol, int maxIter);
  ```
- **Numerical Finite-Difference**: Evaluates derivative automatically using central difference formula:
  ```c
  double newtonRaphsonAuto(double (*f)(double), double x0, double tol, int maxIter);
  ```

---

## 💻 Sample Component Implementations

### Example 1: Robust Standard Main Boilerplate
```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char* argv[]) {
    (void)argc;
    (void)argv;

    /* TODO: Application logic */

    return EXIT_SUCCESS;
}
```

### Example 2: Generic Arena Allocator
```c
#include <stdlib.h>
#include <stddef.h>
#include <stdint.h>

typedef struct {
    uint8_t* buffer;
    size_t capacity;
    size_t offset;
} Arena;

Arena arenaCreate(size_t capacity) {
    Arena a;
    a.buffer = (uint8_t*)malloc(capacity);
    a.capacity = capacity;
    a.offset = 0;
    return a;
}

void* arenaAlloc(Arena* a, size_t size, size_t align) {
    uintptr_t curr = (uintptr_t)(a->buffer + a->offset);
    uintptr_t aligned = (curr + (align - 1)) & ~(uintptr_t)(align - 1);
    size_t newOffset = (aligned - (uintptr_t)a->buffer) + size;
    if (newOffset > a->capacity) return NULL;
    a->offset = newOffset;
    return (void*)aligned;
}

void arenaReset(Arena* a) {
    a->offset = 0;
}

void arenaFree(Arena* a) {
    free(a->buffer);
    a->buffer = NULL;
    a->capacity = 0;
    a->offset = 0;
}
```

### Example 3: 3-Way Dijkstra Quicksort
```c
static void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void quickSort3Way(int arr[], int low, int high) {
    if (low >= high) return;

    int lt = low, gt = high;
    int pivot = arr[low];
    int i = low + 1;

    while (i <= gt) {
        if (arr[i] < pivot) {
            swap(&arr[lt++], &arr[i++]);
        } else if (arr[i] > pivot) {
            swap(&arr[i], &arr[gt--]);
        } else {
            i++;
        }
    }

    quickSort3Way(arr, low, lt - 1);
    quickSort3Way(arr, gt + 1, high);
}
```
