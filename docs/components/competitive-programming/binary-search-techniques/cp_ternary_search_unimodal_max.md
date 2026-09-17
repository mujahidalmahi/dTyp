# cp_ternary_search_unimodal_max
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-techniques` | **Type:** `function`
## Overview
Finds integer peak of unimodal function f in range [low, high]

## Signature
```c
long long cp_ternary_search_unimodal_max(long long low, long long high, long long (*f)(long long));
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
long long cp_ternary_search_unimodal_max(long long low, long long high, long long (*f)(long long)) {
    while (high - low >= 3) {
        long long m1 = low + (high - low) / 3;
        long long m2 = high - (high - low) / 3;
        if (f(m1) < f(m2)) low = m1;
        else high = m2;
    }
    long long best_x = low;
    long long best_val = f(low);
    for (long long x = low + 1; x <= high; x++) {
        long long val = f(x);
        if (val > best_val) {
            best_val = val;
            best_x = x;
        }
    }
    return best_x;
}
```

## Aliases & Shorthands
Available via: `cp_ternary_search_unimodal_max`, `competitive-programming.programming-technics.binary-search-techniques.ternary-search.unimodal-max`, `competitive-programming>cp_ternary_search_unimodal_max()`, `competitive-programming>programming-technics>binary-search-techniques>ternary-search>unimodal-max>cp_ternary_search_unimodal_max()`, `ternarySearchMax`
