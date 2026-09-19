# deque_get_rear
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Returns rear element of double-ended queue

## Signature
```c
bool deque_get_rear(const Deque* dq, int* val);
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
bool deque_get_rear(const Deque* dq, int* val) {
    if (dq->size == 0) return false;
    *val = dq->data[dq->rear];
    return true;
}
```

## Aliases & Shorthands
Available via: `deque_get_rear`, `data-structures.separate-components.queues.deque.get-rear`, `data-structures>deque_get_rear()`, `data-structures>separate-components>queues>deque>get-rear>deque_get_rear()`, `getRearDeque`

## Dependencies
Requires: `data-structures.separate-components.queues.deque.struct`
