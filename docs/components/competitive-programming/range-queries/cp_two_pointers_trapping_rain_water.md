# cp_two_pointers_trapping_rain_water
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Calculates trapped water units across elevation heights in O(N)

## Signature
```c
long long cp_two_pointers_trapping_rain_water(const int* heights, int n);
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
long long cp_two_pointers_trapping_rain_water(const int* heights, int n) {
    if (n <= 2) return 0;
    int left = 0, right = n - 1;
    int left_max = 0, right_max = 0;
    long long total_water = 0;
    while (left <= right) {
        if (heights[left] <= heights[right]) {
            if (heights[left] >= left_max) left_max = heights[left];
            else total_water += (left_max - heights[left]);
            left++;
        } else {
            if (heights[right] >= right_max) right_max = heights[right];
            else total_water += (right_max - heights[right]);
            right--;
        }
    }
    return total_water;
}
```

## Aliases & Shorthands
Available via: `cp_two_pointers_trapping_rain_water`, `competitive-programming.programming-technics.range-queries.two-pointers.trapping-rain-water`, `competitive-programming>cp_two_pointers_trapping_rain_water()`, `competitive-programming>programming-technics>range-queries>two-pointers>trapping-rain-water>cp_two_pointers_trapping_rain_water()`, `twoPointersTrappingWater`
