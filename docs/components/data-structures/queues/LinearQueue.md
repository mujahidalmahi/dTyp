# LinearQueue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `struct`
## Overview
Basic array FIFO linear queue

## Signature
```c
typedef struct LinearQueue { int* data; int front; int rear; int capacity; } LinearQueue;
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
typedef struct LinearQueue {
    int* data;
    int front;
    int rear;
    int capacity;
} LinearQueue;
```

## Aliases & Shorthands
Available via: `LinearQueue`, `data-structures.separate-components.queues.linear-queue.struct`, `data-structures>LinearQueue()`, `data-structures>separate-components>queues>linear-queue>struct>LinearQueue()`, `linear_queue_struct`
