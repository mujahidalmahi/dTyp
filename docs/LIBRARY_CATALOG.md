# dTyp Offline C Component Library Catalog

The **dTyp** offline library contains **2,500 carefully curated, compilable C components** designed specifically for academic computer science courses, competitive programming, and systems engineering.

Every component is self-contained, adheres to the C11 standard, requires zero third-party dependencies, and is indexed within an embedded SQLite WebAssembly database for sub-millisecond querying.

---

## 🏛️ Domain Breakdown (12 Primary Domains)

| Domain | Key Categories | Exact Components | Description |
|---|---|---|---|
| **1. Data Structures** | `linked-lists`, `stacks`, `queues`, `trees`, `heaps`, `trie`, `hash-tables`, `vector` | 700 | Complete node definitions, traversals, insertions, deletions, rebalancing, and circular variants. |
| **2. Algorithms** | `sorting`, `searching`, `graphs`, `dynamic-programming`, `backtracking` | 550 | 10 sorting algorithms, searching algorithms, graph traversals (Dijkstra, Prim), and dynamic programming. |
| **3. Competitive Programming** | `fast-io`, `number-theory`, `advanced-trees`, `strings` | 250 | Ultra-fast `getchar_unlocked` I/O buffers, modular inverse, prime factorizations, Fenwick trees (BIT), and KMP. |
| **4. Numerical Methods** | `root-finding`, `linear-systems`, `quadrature`, `ode-solvers`, `interpolation` | 250 | Newton-Raphson, Bisection, Secant, Brent; Gaussian elimination, LU, Cholesky; RK4 and RK45 adaptive ODE solvers. |
| **5. Boiler Plate** | `main`, `loops`, `conditionals`, `types`, `memory`, `file`, `headers` | 205 | C syntax templates for loops, conditionals, entry points, structs, allocators, and safe file I/O. |
| **6. Programming Patterns** | `oop-c`, `behavioral`, `algorithmic` | 140 | Object-oriented C (VTables), Finite State Machines, Observers, Sliding Window, and Monotonic Stacks. |
| **7. Utilities & Templates** | `string-builder`, `bitset`, `memory-tracker`, `logger` | 140 | Dynamic resizing string builders, dynamic bitset, memory leak trackers, and leveled loggers. |
| **8. C Basics** | `io-math`, `arrays`, `strings` | 70 | Validated terminal I/O, array rotations/min/max/average, custom string algorithms without string.h. |
| **9. C Intermediate** | `struct-serialization`, `dynamic-2d`, `callbacks`, `recursion` | 60 | Struct binary/text serialization, dynamic 2D arrays, function pointer callbacks, and recursive division. |
| **10. C Advanced** | `c11-generic`, `variadic`, `alignment`, `posix` | 60 | C11 _Generic macros, variadic <stdarg.h>, cache alignment utilities, POSIX signals, sockets. |
| **11. Academic Programming** | `signals-fft`, `circuits`, `physics`, `discrete-math` | 50 | Cooley-Tukey FFT/IFFT, RLC circuits, 2D projectile & orbital simulation, discrete math truth tables. |
| **12. C Projects** | `academic`, `finance`, `enterprise`, `systems`, `games`, `database` | 25 | 25 Complete standalone compilable C project files from beginning to end with main(). |

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
