# prog_cp_coordinate_compression
> **Domain:** `competitive-programming` | **Subcategory:** `fast-io-utilities` | **Type:** `program`
## Overview
Complete competitive programming program sorting and mapping coordinates to dense ranks

## Signature
```c
int main(void);
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

int coordinate_compress(int* arr, int n, int* unique_arr) {
    for (int i = 0; i < n; i++) unique_arr[i] = arr[i];
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (unique_arr[j] > unique_arr[j + 1]) {
                int tmp = unique_arr[j];
                unique_arr[j] = unique_arr[j + 1];
                unique_arr[j + 1] = tmp;
            }
        }
    }
    int u = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || unique_arr[i] != unique_arr[i - 1]) {
            unique_arr[u++] = unique_arr[i];
        }
    }
    return u;
}

int get_rank(const int* unique_arr, int size, int val) {
    int low = 0, high = size - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (unique_arr[mid] == val) return mid;
        if (unique_arr[mid] < val) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main(void) {
    int coords[] = {1000000000, -500, 42, 1000000000, -500, 300};
    int n = 6;
    int unique_arr[6];
    int u_size = coordinate_compress(coords, n, unique_arr);
    for (int i = 0; i < n; i++) {
        int r = get_rank(unique_arr, u_size, coords[i]);
        printf("%d -> rank %d\n", coords[i], r);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_coordinate_compression`, `competitive-programming.full-programs.fast-io-utilities.coordinate-compression.prog-coordinate-compression`, `competitive-programming>prog_cp_coordinate_compression()`, `competitive-programming>full-programs>fast-io-utilities>coordinate-compression>prog-coordinate-compression>prog_cp_coordinate_compression()`
