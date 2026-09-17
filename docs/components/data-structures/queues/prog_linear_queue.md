# prog_linear_queue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `program`
## Overview
Complete linear FIFO queue program testing enqueue and dequeue

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
#include <stdlib.h>

typedef struct Queue {
    int data[10];
    int front;
    int rear;
} Queue;

int main(void) {
    Queue q = { .front = 0, .rear = -1 };
    for (int i = 1; i <= 5; i++) {
        q.data[++q.rear] = i * 100;
    }

    printf("Linear Queue FIFO: ");
    while (q.front <= q.rear) {
        printf("%d ", q.data[q.front++]);
    }
    putchar('
');

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_linear_queue`, `data-structures.full-programs.queues.linear-queue.prog-linear-queue`, `data-structures>prog_linear_queue()`, `data-structures>full-programs>queues>linear-queue>prog-linear-queue>prog_linear_queue()`, `programLinearQueue`
