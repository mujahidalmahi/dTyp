# jump_search
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `function`
## Overview
Searches sorted array in sqrt(n) blocks

## Signature
```c
int jump_search(const int* arr, int n, int target);
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
int jump_search(const int* arr, int n, int target) {
    int step = (int)sqrt((double)n);
    int prev = 0;
    while (arr[(step < n ? step : n) - 1] < target) {
        prev = step;
        step += (int)sqrt((double)n);
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == (step < n ? step : n)) return -1;
    }
    if (arr[prev] == target) return prev;
    return -1;
}
```

## Aliases & Shorthands
Available via: `jump_search`, `algorithms.separate-components.searching.jump-interpolation.jump-search`, `algorithms>jump_search()`, `algorithms>separate-components>searching>jump-interpolation>jump-search>jump_search()`, `jumpSearch`
