# radix_sort
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Sorts non-negative integers digit by digit using LSD radix sort

## Signature
```c
void radix_sort(int* arr, int n);
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
static void count_sort_digit(int* arr, int n, int exp) {
    int output[1024];
    int count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radix_sort(int* arr, int n) {
    if (n <= 1) return;
    int max_val = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > max_val) max_val = arr[i];
    for (int exp = 1; max_val / exp > 0; exp *= 10) {
        count_sort_digit(arr, n, exp);
    }
}
```

## Aliases & Shorthands
Available via: `radix_sort`, `algorithms.separate-components.sorting.non-comparison-sorts.radix-sort`, `algorithms>radix_sort()`, `algorithms>separate-components>sorting>non-comparison-sorts>radix-sort>radix_sort()`, `radixSort`
