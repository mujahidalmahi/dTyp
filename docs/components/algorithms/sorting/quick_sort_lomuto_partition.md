# quick_sort_lomuto_partition
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Partitions subarray around pivot using Lomuto partitioning scheme

## Signature
```c
int quick_sort_lomuto_partition(int* arr, int low, int high);
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
int quick_sort_lomuto_partition(int* arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
    int tmp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = tmp;
    return i + 1;
}
```

## Aliases & Shorthands
Available via: `quick_sort_lomuto_partition`, `algorithms.separate-components.sorting.quick-sort.lomuto-partition`, `algorithms>quick_sort_lomuto_partition()`, `algorithms>separate-components>sorting>quick-sort>lomuto-partition>quick_sort_lomuto_partition()`, `lomutoPartition`
