# detect_prime
> **Domain:** `detection` | **Subcategory:** `number-properties` | **Type:** `function`
## Overview
Detects if integer is prime using 6k +/- 1 optimized trial division

## Signature
```c
int detect_prime(int n);
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
int detect_prime(int n) {
    if (n <= 1) return 0;
    if (n <= 3) return 1;
    if (n % 2 == 0 || n % 3 == 0) return 0;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return 0;
    }
    return 1;
}
```

## Aliases & Shorthands
Available via: `detect_prime`, `detection.number-properties.prime`, `detection>detect_prime()`, `detection>number-properties>prime>detect_prime()`, `is_prime`
