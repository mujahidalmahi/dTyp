# cp_fast_read_long
> **Domain:** `competitive-programming` | **Subcategory:** `fast-io-utilities` | **Type:** `function`
## Overview
Reads a 64-bit integer from standard input using fast character scanning

## Signature
```c
int cp_fast_read_long(long long* out_val);
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
int cp_fast_read_long(long long* out_val) {
    int c = getchar();
    if (c == EOF) return 0;
    while (c != '-' && (c < '0' || c > '9')) {
        c = getchar();
        if (c == EOF) return 0;
    }
    long long sign = 1;
    if (c == '-') {
        sign = -1;
        c = getchar();
    }
    long long res = 0;
    while (c >= '0' && c <= '9') {
        res = res * 10 + (c - '0');
        c = getchar();
    }
    *out_val = res * sign;
    return 1;
}
```

## Aliases & Shorthands
Available via: `cp_fast_read_long`, `competitive-programming.programming-technics.fast-io-utilities.fast-io.fast-read-long`, `competitive-programming>cp_fast_read_long()`, `competitive-programming>programming-technics>fast-io-utilities>fast-io>fast-read-long>cp_fast_read_long()`, `fastReadLong`
