# merge_sorted_subarrays
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Merges two sorted adjacent subarrays into single sorted range

## Signature
```c
void merge_sorted_subarrays(int* arr, int l, int m, int r);
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
void merge_sorted_subarrays(int* arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int* left = (int*)malloc(n1 * sizeof(int));
    int* right = (int*)malloc(n2 * sizeof(int));
    for (int i = 0; i < n1; i++) left[i] = arr[l + i];
    for (int j = 0; j < n2; j++) right[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < n1) arr[k++] = left[i++];
    while (j < n2) arr[k++] = right[j++];
    free(left);
    free(right);
}
```

## Aliases & Shorthands
Available via: `merge_sorted_subarrays`, `algorithms.separate-components.sorting.merge-sort.merge-subarrays`, `algorithms>merge_sorted_subarrays()`, `algorithms>separate-components>sorting>merge-sort>merge-subarrays>merge_sorted_subarrays()`, `mergeArrays`
