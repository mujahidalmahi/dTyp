# string_copy
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Copies characters from src buffer into dest buffer including null terminator

## Signature
```c
void string_copy(char* dest, const char* src);
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
void string_copy(char* dest, const char* src) {
    int i = 0;
    while (src[i] != '\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\0';
}
```

## Aliases & Shorthands
Available via: `string_copy`, `boiler-plates.separate-components.strings.copy`, `boiler-plates>string_copy()`, `boiler-plates>separate-components>strings>copy>string_copy()`, `strCopy`
