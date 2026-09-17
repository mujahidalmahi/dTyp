# string_concat
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Appends src characters onto end of dest buffer

## Signature
```c
void string_concat(char* dest, const char* src);
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
void string_concat(char* dest, const char* src) {
    int i = 0;
    while (dest[i] != '\0') i++;
    int j = 0;
    while (src[j] != '\0') {
        dest[i++] = src[j++];
    }
    dest[i] = '\0';
}
```

## Aliases & Shorthands
Available via: `string_concat`, `boiler-plates.separate-components.strings.concat`, `boiler-plates>string_concat()`, `boiler-plates>separate-components>strings>concat>string_concat()`, `strConcat`
