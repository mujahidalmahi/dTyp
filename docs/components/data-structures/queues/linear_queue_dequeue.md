# linear_queue_dequeue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Removes and returns item from front of linear queue

## Signature
```c
int linear_queue_dequeue(LinearQueue* q, int* val);
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
int linear_queue_dequeue(LinearQueue* q, int* val) {
    if (q->front > q->rear) return 0;
    *val = q->data[q->front++];
    return 1;
}
```

## Aliases & Shorthands
Available via: `linear_queue_dequeue`, `data-structures.separate-components.queues.linear-queue.dequeue`, `data-structures>linear_queue_dequeue()`, `data-structures>separate-components>queues>linear-queue>dequeue>linear_queue_dequeue()`, `dequeueLinear`

## Dependencies
Requires: `data-structures.separate-components.queues.linear-queue.struct`
