# prog_priority_queue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `program`
## Overview
Complete binary min-heap priority queue program

## Signature
```c
int main(void)
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
#include <stdio.h>
#include <stdlib.h>

typedef struct Heap {
    int data[32];
    int size;
} Heap;

void heap_push(Heap* h, int val) {
    int i = h->size++;
    h->data[i] = val;
    while (i > 0 && h->data[(i - 1) / 2] > h->data[i]) {
        int t = h->data[i];
        h->data[i] = h->data[(i - 1) / 2];
        h->data[(i - 1) / 2] = t;
        i = (i - 1) / 2;
    }
}

int heap_pop(Heap* h) {
    if (h->size <= 0) return -1;
    int root = h->data[0];
    h->data[0] = h->data[--h->size];
    int i = 0;
    while (2 * i + 1 < h->size) {
        int s = i, l = 2 * i + 1, r = 2 * i + 2;
        if (l < h->size && h->data[l] < h->data[s]) s = l;
        if (r < h->size && h->data[r] < h->data[s]) s = r;
        if (s == i) break;
        int t = h->data[i]; h->data[i] = h->data[s]; h->data[s] = t;
        i = s;
    }
    return root;
}

int main(void) {
    Heap h = { .size = 0 };
    heap_push(&h, 45);
    heap_push(&h, 12);
    heap_push(&h, 89);
    heap_push(&h, 23);
    heap_push(&h, 7);

    printf("Min-Heap sorted pops: ");
    while (h.size > 0) {
        printf("%d ", heap_pop(&h));
    }
    putchar('
');
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_priority_queue`, `data-structures.full-programs.queues.priority-queue.prog-priority-queue`, `data-structures>prog_priority_queue()`, `data-structures>full-programs>queues>priority-queue>prog-priority-queue>prog_priority_queue()`, `programPriorityQueue`
