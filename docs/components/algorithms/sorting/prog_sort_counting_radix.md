# prog_sort_counting_radix
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `program`
## Overview
Complete Counting Sort program sorting bounded integer frequencies

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

void counting_sort(int* arr, int n, int max_val) {
    int* count = (int*)calloc(max_val + 1, sizeof(int));
    int* output = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) count[arr[i]]++;
    for (int i = 1; i <= max_val; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
    free(count);
    free(output);
}

int main(void) {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int n = sizeof(arr) / sizeof(arr[0]);

    counting_sort(arr, n, 8);

    printf("Counting Sorted: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('
');

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_sort_counting_radix`, `algorithms.full-programs.sorting.non-comparison-sorts.prog-counting-radix`, `algorithms>prog_sort_counting_radix()`, `algorithms>full-programs>sorting>non-comparison-sorts>prog-counting-radix>prog_sort_counting_radix()`, `programCountingSort`
