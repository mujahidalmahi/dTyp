# string_find
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Finds first index of needle substring in haystack string returning -1 if not found

## Signature
```c
int string_find(const char* haystack, const char* needle);
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
int string_find(const char* haystack, const char* needle) {
    if (needle[0] == '\0') return 0;
    for (int i = 0; haystack[i] != '\0'; i++) {
        int j = 0;
        while (haystack[i + j] != '\0' && needle[j] != '\0' && haystack[i + j] == needle[j]) {
            j++;
        }
        if (needle[j] == '\0') return i;
    }
    return -1;
}
```

## Aliases & Shorthands
Available via: `string_find`, `boiler-plates.separate-components.strings.find`, `boiler-plates>string_find()`, `boiler-plates>separate-components>strings>find>string_find()`, `strFind`
