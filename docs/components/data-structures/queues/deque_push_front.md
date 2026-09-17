# deque_push_front
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Pushes element to front of deque

## Signature
```c
int deque_push_front(Deque* d, int val);
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
int deque_push_front(Deque* d, int val) {
    if (d->size == d->capacity) return 0;
    d->front = (d->front - 1 + d->capacity) % d->capacity;
    d->data[d->front] = val;
    d->size++;
    return 1;
}
```

## Aliases & Shorthands
Available via: `deque_push_front`, `data-structures.separate-components.queues.deque.push-front`, `data-structures>deque_push_front()`, `data-structures>separate-components>queues>deque>push-front>deque_push_front()`, `pushFrontDeque`

## Dependencies
Requires: `data-structures.separate-components.queues.deque.struct`
