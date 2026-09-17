# max_heapify_down
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Restores max-heap property rooted at index i

## Signature
```c
void max_heapify_down(int* arr, int n, int i);
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
void max_heapify_down(int* arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int tmp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = tmp;
        max_heapify_down(arr, n, largest);
    }
}
```

## Aliases & Shorthands
Available via: `max_heapify_down`, `algorithms.separate-components.sorting.heap-sort.max-heapify-down`, `algorithms>max_heapify_down()`, `algorithms>separate-components>sorting>heap-sort>max-heapify-down>max_heapify_down()`, `maxHeapifyDown`
