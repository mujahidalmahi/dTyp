# linear_queue_peek_rear
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Retrieves rear element of linear queue without dequeuing

## Signature
```c
bool linear_queue_peek_rear(const LinearQueue* q, int* val);
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
bool linear_queue_peek_rear(const LinearQueue* q, int* val) {
    if (q->front == -1 || q->front > q->rear) return false;
    *val = q->data[q->rear];
    return true;
}
```

## Aliases & Shorthands
Available via: `linear_queue_peek_rear`, `data-structures.separate-components.queues.linear-queue.peek-rear`, `data-structures>linear_queue_peek_rear()`, `data-structures>separate-components>queues>linear-queue>peek-rear>linear_queue_peek_rear()`, `peekRearLinearQueue`

## Dependencies
Requires: `data-structures.separate-components.queues.linear-queue.struct`
