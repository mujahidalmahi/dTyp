# deque_display
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Prints all elements in double-ended queue

## Signature
```c
void deque_display(const Deque* dq);
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
void deque_display(const Deque* dq) {
    if (dq->size == 0) {
        printf("Deque empty\n");
        return;
    }
    for (int i = 0; i < dq->size; i++) {
        int idx = (dq->front + i) % dq->capacity;
        printf("%d ", dq->data[idx]);
    }
    printf("\n");
}
```

## Aliases & Shorthands
Available via: `deque_display`, `data-structures.separate-components.queues.deque.display`, `data-structures>deque_display()`, `data-structures>separate-components>queues>deque>display>deque_display()`, `displayDeque`

## Dependencies
Requires: `data-structures.separate-components.queues.deque.struct`
