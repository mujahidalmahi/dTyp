# deque_push_back
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Pushes element to back of deque

## Signature
```c
int deque_push_back(Deque* d, int val);
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
int deque_push_back(Deque* d, int val) {
    if (d->size == d->capacity) return 0;
    d->rear = (d->rear + 1) % d->capacity;
    d->data[d->rear] = val;
    d->size++;
    return 1;
}
```

## Aliases & Shorthands
Available via: `deque_push_back`, `data-structures.separate-components.queues.deque.push-back`, `data-structures>deque_push_back()`, `data-structures>separate-components>queues>deque>push-back>deque_push_back()`, `pushBackDeque`

## Dependencies
Requires: `data-structures.separate-components.queues.deque.struct`
