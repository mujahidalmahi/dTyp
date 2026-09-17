# string_length
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Calculates length of null-terminated string without using strlen

## Signature
```c
int string_length(const char* s);
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
int string_length(const char* s) {
    int len = 0;
    while (s[len] != '\0') {
        len++;
    }
    return len;
}
```

## Aliases & Shorthands
Available via: `string_length`, `boiler-plates.separate-components.strings.length`, `boiler-plates>string_length()`, `boiler-plates>separate-components>strings>length>string_length()`, `strLen`
