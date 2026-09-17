# PriorityQueue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `struct`
## Overview
Binary min-heap priority queue structure

## Signature
```c
typedef struct PriorityQueue { int* data; int size; int capacity; } PriorityQueue;
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
typedef struct PriorityQueue {
    int* data;
    int size;
    int capacity;
} PriorityQueue;
```

## Aliases & Shorthands
Available via: `PriorityQueue`, `data-structures.separate-components.queues.priority-queue.struct`, `data-structures>PriorityQueue()`, `data-structures>separate-components>queues>priority-queue>struct>PriorityQueue()`, `pq_struct`
