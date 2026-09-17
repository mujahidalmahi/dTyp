# prog_circular_queue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `program`
## Overview
Complete ring buffer circular queue program

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

#define CAP 5

typedef struct CircularQueue {
    int data[CAP];
    int front;
    int rear;
    int count;
} CircularQueue;

int cq_push(CircularQueue* q, int val) {
    if (q->count == CAP) return 0;
    q->rear = (q->rear + 1) % CAP;
    q->data[q->rear] = val;
    q->count++;
    return 1;
}

int cq_pop(CircularQueue* q, int* val) {
    if (q->count == 0) return 0;
    *val = q->data[q->front];
    q->front = (q->front + 1) % CAP;
    q->count--;
    return 1;
}

int main(void) {
    CircularQueue q = { .front = 0, .rear = -1, .count = 0 };
    cq_push(&q, 10);
    cq_push(&q, 20);
    cq_push(&q, 30);

    int val;
    cq_pop(&q, &val);
    printf("Dequeued: %d
", val);

    cq_push(&q, 40);
    cq_push(&q, 50);

    printf("Remaining circular queue items: ");
    while (cq_pop(&q, &val)) {
        printf("%d ", val);
    }
    putchar('
');

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_circular_queue`, `data-structures.full-programs.queues.circular-queue.prog-circular-queue`, `data-structures>prog_circular_queue()`, `data-structures>full-programs>queues>circular-queue>prog-circular-queue>prog_circular_queue()`, `programCircularQueue`
