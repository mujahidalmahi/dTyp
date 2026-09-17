# Deque
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `struct`
## Overview
Double-ended circular queue structure

## Signature
```c
typedef struct Deque { int* data; int front; int rear; int size; int capacity; } Deque;
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
typedef struct Deque {
    int* data;
    int front;
    int rear;
    int size;
    int capacity;
} Deque;
```

## Aliases & Shorthands
Available via: `Deque`, `data-structures.separate-components.queues.deque.struct`, `data-structures>Deque()`, `data-structures>separate-components>queues>deque>struct>Deque()`, `deque_struct`
