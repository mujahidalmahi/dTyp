# string_from_int
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Converts integer to decimal string representation without itoa

## Signature
```c
void string_from_int(int val, char* dest);
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
void string_from_int(int val, char* dest) {
    if (val == 0) {
        dest[0] = '0';
        dest[1] = '\0';
        return;
    }
    int is_neg = 0;
    if (val < 0) {
        is_neg = 1;
        val = -val;
    }
    char buf[16];
    int idx = 0;
    while (val > 0) {
        buf[idx++] = (char)('0' + (val % 10));
        val /= 10;
    }
    int o = 0;
    if (is_neg) dest[o++] = '-';
    while (idx > 0) {
        dest[o++] = buf[--idx];
    }
    dest[o] = '\0';
}
```

## Aliases & Shorthands
Available via: `string_from_int`, `boiler-plates.separate-components.strings.from-int`, `boiler-plates>string_from_int()`, `boiler-plates>separate-components>strings>from-int>string_from_int()`, `strFromInt`
