# dTyp Offline C Component Library Catalog

The **dTyp** offline library contains **10,000 carefully curated, compilable C components** designed specifically for academic computer science courses, competitive programming, and systems engineering.

Every component is self-contained, adheres to the C11 standard, requires zero third-party dependencies, and is indexed within an embedded SQLite WebAssembly database for sub-millisecond querying.

---

## 🏛️ Domain Breakdown (12 Primary Domains)

| Domain | Key Categories | Exact Components | Description |
|---|---|---|---|
| **1. Data Structures** | `linked-lists`, `stacks`, `queues`, `trees`, `heaps`, `trie`, `hash-tables` | 2,800 | Complete node definitions, traversals, insertions, deletions, rebalancing, and circular variants. |
| **2. Algorithms** | `sorting`, `searching`, `divide-and-conquer`, `greedy`, `backtracking`, `graphs`, `dynamic-programming` | 2,500 | 10 sorting algorithms (quick, merge, heap, tim, radix), searching algorithms, graph traversals, and dynamic programming. |
| **3. Numerical Methods** | `root-finding`, `linear-systems`, `interpolation`, `integration`, `ode-solvers`, `curve-fitting` | 1,300 | Newton-Raphson, Bisection, Secant, Brent's method; Gaussian elimination, LU, Cholesky; RK4 and RK45 adaptive ODE solvers. |
| **4. Competitive Programming** | `fast-io`, `modular-arithmetic`, `primes-sieve`, `combinatorics`, `segment-tree`, `fenwick`, `dsu` | 900 | Ultra-fast `getchar_unlocked` I/O buffers, modular inverse, prime factorizations, Fenwick trees (BIT), and DSU. |
| **5. Boiler Plate** | `main`, `memory`, `file`, `testing`, `headers` | 600 | Compilable entry points, argument parsers (`getopt`), custom arena/pool allocators, and test assertion runners. |
| **6. Utilities & Templates** | `memory-tracker`, `timer`, `string-builder`, `arg-parser`, `csv-tokenizer`, `bit-array` | 500 | Leak-detecting allocators, dynamic resizing string builders, lock-free circular queues, and high-res timers. |
| **7. Programming Patterns** | `two-pointers`, `sliding-window`, `fast-slow`, `prefix-sum`, `monotonic`, `state-machine` | 500 | Two Pointers, Sliding Window, Monotonic Stacks, Coordinate Compression, and Finite State Machines. |
| **8. C Basics** | `syntax`, `variables`, `data-types`, `operators`, `control-flow`, `loops`, `arrays`, `pointers-intro` | 200 | Fundamental university coursework exercises: pointer arithmetic, array manipulation, and condition checks. |
| **9. C Intermediate** | `file-io`, `structs-unions`, `function-pointers`, `preprocessor`, `recursion`, `memory-allocation` | 200 | Dynamic memory allocation patterns, file serializations, callbacks, and recursive mathematical models. |
| **10. C Advanced** | `advanced-pointers`, `generic-programming`, `variadic`, `bit-manipulation`, `safety-portability` | 200 | Memory-mapped I/O, bitwise hacks (Hamming weight, CLZ/CTZ), alignment utilities, and thread-safe abstractions. |
| **11. Academic Programming** | `signals-fft`, `circuits`, `physics`, `discrete-math`, `statistics`, `lab-tasks` | 150 | Signals, FFT, circuit analysis, physics models, discrete mathematics, and university coursework lab tasks. |
| **12. C Projects** | `student-management`, `banking-system`, `library-system`, `cli-shell`, `file-database`, `calculator` | 150 | Complete terminal micro applications: mini UNIX shell, embedded database, expression parser, and banking systems. |

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
