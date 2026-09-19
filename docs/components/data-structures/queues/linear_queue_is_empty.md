# linear_queue_is_empty
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Checks if linear queue is empty

## Signature
```c
bool linear_queue_is_empty(const LinearQueue* q);
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
bool linear_queue_is_empty(const LinearQueue* q) {
    return q->front == -1 || q->front > q->rear;
}
```

## Aliases & Shorthands
Available via: `linear_queue_is_empty`, `data-structures.separate-components.queues.linear-queue.is-empty`, `data-structures>linear_queue_is_empty()`, `data-structures>separate-components>queues>linear-queue>is-empty>linear_queue_is_empty()`, `isLinearQueueEmpty`

## Dependencies
Requires: `data-structures.separate-components.queues.linear-queue.struct`
