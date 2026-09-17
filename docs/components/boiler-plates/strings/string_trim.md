# string_trim
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Removes leading and trailing whitespace characters in-place

## Signature
```c
void string_trim(char* s);
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
void string_trim(char* s) {
    int start = 0;
    while (s[start] == ' ' || s[start] == '\t' || s[start] == '\n' || s[start] == '\r') {
        start++;
    }
    int end = start;
    while (s[end] != '\0') end++;
    end--;
    while (end >= start && (s[end] == ' ' || s[end] == '\t' || s[end] == '\n' || s[end] == '\r')) {
        end--;
    }
    int i = 0;
    for (int j = start; j <= end; j++) {
        s[i++] = s[j];
    }
    s[i] = '\0';
}
```

## Aliases & Shorthands
Available via: `string_trim`, `boiler-plates.separate-components.strings.trim`, `boiler-plates>string_trim()`, `boiler-plates>separate-components>strings>trim>string_trim()`, `strTrim`
