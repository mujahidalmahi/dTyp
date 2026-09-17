# circular_queue_enqueue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Enqueues item into circular ring queue

## Signature
```c
int circular_queue_enqueue(CircularQueue* q, int val);
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
int circular_queue_enqueue(CircularQueue* q, int val) {
    if (q->size == q->capacity) return 0;
    q->rear = (q->rear + 1) % q->capacity;
    q->data[q->rear] = val;
    q->size++;
    return 1;
}
```

## Aliases & Shorthands
Available via: `circular_queue_enqueue`, `data-structures.separate-components.queues.circular-queue.enqueue`, `data-structures>circular_queue_enqueue()`, `data-structures>separate-components>queues>circular-queue>enqueue>circular_queue_enqueue()`, `enqueueCircular`

## Dependencies
Requires: `data-structures.separate-components.queues.circular-queue.struct`
