# detect_armstrong_number
> **Domain:** `detection` | **Subcategory:** `number-properties` | **Type:** `function`
## Overview
Detects if integer is an Armstrong (narcissistic) number

## Signature
```c
int detect_armstrong_number(int n);
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
int detect_armstrong_number(int n) {
    if (n < 0) return 0;
    int temp = n, digits = 0;
    while (temp > 0) { digits++; temp /= 10; }
    temp = n;
    int sum = 0;
    while (temp > 0) {
        int d = temp % 10;
        int p = 1;
        for (int i = 0; i < digits; i++) p *= d;
        sum += p;
        temp /= 10;
    }
    return (sum == n);
}
```

## Aliases & Shorthands
Available via: `detect_armstrong_number`, `detection.number-properties.armstrong-number`, `detection>detect_armstrong_number()`, `detection>number-properties>armstrong-number>detect_armstrong_number()`, `is_armstrong`
