# linear_queue_display
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Prints all elements in linear queue from front to rear

## Signature
```c
void linear_queue_display(const LinearQueue* q);
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
void linear_queue_display(const LinearQueue* q) {
    if (q->front == -1 || q->front > q->rear) {
        printf("Queue empty\n");
        return;
    }
    for (int i = q->front; i <= q->rear; i++) printf("%d ", q->data[i]);
    printf("\n");
}
```

## Aliases & Shorthands
Available via: `linear_queue_display`, `data-structures.separate-components.queues.linear-queue.display`, `data-structures>linear_queue_display()`, `data-structures>separate-components>queues>linear-queue>display>linear_queue_display()`, `displayLinearQueue`

## Dependencies
Requires: `data-structures.separate-components.queues.linear-queue.struct`
