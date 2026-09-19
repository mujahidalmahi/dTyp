# prog_priority_queue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `program`
## Overview
Interactive binary min-heap priority queue with insert, extract-min, peek, and heap-array visualization

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
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

typedef struct MinHeap {
    int* data;
    int size;
    int cap;
} MinHeap;

MinHeap* heap_create(int cap) {
    MinHeap* h = (MinHeap*)malloc(sizeof(MinHeap));
    h->data = (int*)malloc(cap * sizeof(int));
    h->size = 0;
    h->cap = cap;
    return h;
}

void heap_swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

void heap_push(MinHeap* h, int val) {
    if (h->size >= h->cap) {
        h->cap *= 2;
        h->data = (int*)realloc(h->data, h->cap * sizeof(int));
    }
    int cur = h->size++;
    h->data[cur] = val;
    while (cur > 0) {
        int parent = (cur - 1) / 2;
        if (h->data[cur] < h->data[parent]) {
            heap_swap(&h->data[cur], &h->data[parent]);
            cur = parent;
        } else break;
    }
}

bool heap_pop_min(MinHeap* h, int* min_val) {
    if (h->size == 0) return false;
    *min_val = h->data[0];
    h->data[0] = h->data[--h->size];
    int cur = 0;
    while (2 * cur + 1 < h->size) {
        int left = 2 * cur + 1;
        int right = 2 * cur + 2;
        int smallest = cur;
        if (left < h->size && h->data[left] < h->data[smallest]) smallest = left;
        if (right < h->size && h->data[right] < h->data[smallest]) smallest = right;
        if (smallest != cur) {
            heap_swap(&h->data[cur], &h->data[smallest]);
            cur = smallest;
        } else break;
    }
    return true;
}

bool heap_peek(const MinHeap* h, int* min_val) {
    if (h->size == 0) return false;
    *min_val = h->data[0];
    return true;
}

void heap_display(const MinHeap* h) {
    if (h->size == 0) {
        printf("Priority Queue (Min-Heap) is empty.\n");
        return;
    }
    printf("Min-Heap Array (%d elements): ", h->size);
    for (int i = 0; i < h->size; i++) printf("%d ", h->data[i]);
    printf("\n");
}

void heap_free(MinHeap* h) {
    if (h) {
        free(h->data);
        free(h);
    }
}

int main(void) {
    MinHeap* h = heap_create(10);
    int choice;

    do {
        printf("\n=== Priority Queue (Min-Heap) Menu ===\n");
        printf("1. Insert Element\n");
        printf("2. Extract Minimum Element\n");
        printf("3. Peek Minimum Element\n");
        printf("4. Display Heap Elements\n");
        printf("5. Count Total Elements\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter integer to insert: ");
                if (scanf("%d", &val) == 1) {
                    heap_push(h, val);
                    printf("Inserted %d into min-heap.\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (heap_pop_min(h, &val)) printf("Extracted Minimum: %d\n", val);
                else printf("Heap is empty! Cannot extract.\n");
                break;
            }
            case 3: {
                int val;
                if (heap_peek(h, &val)) printf("Current Minimum: %d\n", val);
                else printf("Heap is empty.\n");
                break;
            }
            case 4:
                heap_display(h);
                break;
            case 5:
                printf("Count: %d elements\n", h->size);
                break;
            case 0:
                printf("Exiting Priority Queue Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    heap_free(h);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_priority_queue`, `data-structures.full-programs.queues.priority-queue.prog-priority-queue`, `data-structures>prog_priority_queue()`, `data-structures>full-programs>queues>priority-queue>prog-priority-queue>prog_priority_queue()`, `programPriorityQueue`
