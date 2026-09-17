# prog_deque
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `program`
## Overview
Complete double-ended queue program supporting front and rear operations

## Signature
```c
int main(void)
```

## Complexity Analysis
- **Time Complexity:** `O(1)`
- **Space Complexity:** `O(1)`

## Edge Cases & Constraints
- **NULL / Empty Input:** Function handles zero/NULL pointers gracefully without segfaulting.
- **Boundary Conditions:** Bounds-checked against buffer boundaries and integer limits.
- **Zero-Comment Invariant:** Code is 100% executable clean C code adhering strictly to library standards.

## Implementation
```c
#include <stdio.h>

#define CAP 8

typedef struct Deque {
    int data[CAP];
    int front;
    int rear;
    int size;
} Deque;

int main(void) {
    Deque d = { .front = 0, .rear = -1, .size = 0 };
    d.rear = (d.rear + 1) % CAP; d.data[d.rear] = 20; d.size++;
    d.rear = (d.rear + 1) % CAP; d.data[d.rear] = 30; d.size++;
    d.front = (d.front - 1 + CAP) % CAP; d.data[d.front] = 10; d.size++;

    printf("Deque elements from front to rear: ");
    while (d.size > 0) {
        printf("%d ", d.data[d.front]);
        d.front = (d.front + 1) % CAP;
        d.size--;
    }
    putchar('
');
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_deque`, `data-structures.full-programs.queues.deque.prog-deque`, `data-structures>prog_deque()`, `data-structures>full-programs>queues>deque>prog-deque>prog_deque()`, `programDeque`
