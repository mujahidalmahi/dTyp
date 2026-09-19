# linear_queue_is_full
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Checks if linear queue is full

## Signature
```c
bool linear_queue_is_full(const LinearQueue* q);
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
bool linear_queue_is_full(const LinearQueue* q) {
    return q->rear >= q->capacity - 1;
}
```

## Aliases & Shorthands
Available via: `linear_queue_is_full`, `data-structures.separate-components.queues.linear-queue.is-full`, `data-structures>linear_queue_is_full()`, `data-structures>separate-components>queues>linear-queue>is-full>linear_queue_is_full()`, `isLinearQueueFull`

## Dependencies
Requires: `data-structures.separate-components.queues.linear-queue.struct`
