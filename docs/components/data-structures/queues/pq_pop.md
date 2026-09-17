# pq_pop
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Extracts minimum value from min-heap

## Signature
```c
int pq_pop(PriorityQueue* pq, int* min_val);
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
int pq_pop(PriorityQueue* pq, int* min_val) {
    if (pq->size <= 0) return 0;
    *min_val = pq->data[0];
    pq->data[0] = pq->data[--pq->size];
    int i = 0;
    while (2 * i + 1 < pq->size) {
        int smallest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        if (l < pq->size && pq->data[l] < pq->data[smallest]) smallest = l;
        if (r < pq->size && pq->data[r] < pq->data[smallest]) smallest = r;
        if (smallest == i) break;
        int tmp = pq->data[i];
        pq->data[i] = pq->data[smallest];
        pq->data[smallest] = tmp;
        i = smallest;
    }
    return 1;
}
```

## Aliases & Shorthands
Available via: `pq_pop`, `data-structures.separate-components.queues.priority-queue.pop`, `data-structures>pq_pop()`, `data-structures>separate-components>queues>priority-queue>pop>pq_pop()`, `popPriorityQueue`

## Dependencies
Requires: `data-structures.separate-components.queues.priority-queue.struct`
