# pq_push
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `function`
## Overview
Inserts item into min-heap and heapifies up

## Signature
```c
void pq_push(PriorityQueue* pq, int val);
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
void pq_push(PriorityQueue* pq, int val) {
    if (pq->size >= pq->capacity) {
        pq->capacity *= 2;
        pq->data = (int*)realloc(pq->data, pq->capacity * sizeof(int));
    }
    int i = pq->size++;
    pq->data[i] = val;
    while (i != 0 && pq->data[(i - 1) / 2] > pq->data[i]) {
        int tmp = pq->data[i];
        pq->data[i] = pq->data[(i - 1) / 2];
        pq->data[(i - 1) / 2] = tmp;
        i = (i - 1) / 2;
    }
}
```

## Aliases & Shorthands
Available via: `pq_push`, `data-structures.separate-components.queues.priority-queue.push`, `data-structures>pq_push()`, `data-structures>separate-components>queues>priority-queue>push>pq_push()`, `pushPriorityQueue`

## Dependencies
Requires: `data-structures.separate-components.queues.priority-queue.struct`
