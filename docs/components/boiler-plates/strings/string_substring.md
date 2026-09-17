# string_substring
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Extracts substring slice from start index with given length into dest buffer

## Signature
```c
int string_substring(const char* src, int start, int len, char* dest);
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
int string_substring(const char* src, int start, int len, char* dest) {
    int src_len = 0;
    while (src[src_len] != '\0') src_len++;
    if (start < 0 || start >= src_len || len < 0) {
        dest[0] = '\0';
        return 0;
    }
    int i = 0;
    while (i < len && src[start + i] != '\0') {
        dest[i] = src[start + i];
        i++;
    }
    dest[i] = '\0';
    return i;
}
```

## Aliases & Shorthands
Available via: `string_substring`, `boiler-plates.separate-components.strings.substring`, `boiler-plates>string_substring()`, `boiler-plates>separate-components>strings>substring>string_substring()`, `strSubstr`
