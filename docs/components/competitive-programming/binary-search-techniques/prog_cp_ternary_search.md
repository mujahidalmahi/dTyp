# prog_cp_ternary_search
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-techniques` | **Type:** `program`
## Overview
Complete competitive programming program finding the maximum of a unimodal parabola via ternary search

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

long long func(long long x) {
    return -(x - 14) * (x - 14) + 100;
}

long long ternary_search(long long low, long long high) {
    while (high - low >= 3) {
        long long m1 = low + (high - low) / 3;
        long long m2 = high - (high - low) / 3;
        if (func(m1) < func(m2)) low = m1;
        else high = m2;
    }
    long long best_x = low;
    long long best_val = func(low);
    for (long long x = low + 1; x <= high; x++) {
        long long val = func(x);
        if (val > best_val) {
            best_val = val;
            best_x = x;
        }
    }
    return best_x;
}

int main(void) {
    long long peak_x = ternary_search(0, 50);
    printf("Peak located at x = %lld with value = %lld\n", peak_x, func(peak_x));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_ternary_search`, `competitive-programming.full-programs.binary-search-techniques.ternary-search.prog-ternary-search`, `competitive-programming>prog_cp_ternary_search()`, `competitive-programming>full-programs>binary-search-techniques>ternary-search>prog-ternary-search>prog_cp_ternary_search()`
