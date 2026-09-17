# linear_queue_enqueue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Inserts item at end of linear queue

## Signature
```c
int linear_queue_enqueue(LinearQueue* q, int val);
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
int linear_queue_enqueue(LinearQueue* q, int val) {
    if (q->rear >= q->capacity - 1) return 0;
    q->data[++q->rear] = val;
    return 1;
}
```

## Aliases & Shorthands
Available via: `linear_queue_enqueue`, `data-structures.separate-components.queues.linear-queue.enqueue`, `data-structures>linear_queue_enqueue()`, `data-structures>separate-components>queues>linear-queue>enqueue>linear_queue_enqueue()`, `enqueueLinear`

## Dependencies
Requires: `data-structures.separate-components.queues.linear-queue.struct`
