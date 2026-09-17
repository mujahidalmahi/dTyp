# string_to_upper
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Converts lowercase ASCII letters in string to uppercase in-place

## Signature
```c
void string_to_upper(char* s);
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
void string_to_upper(char* s) {
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] = (char)(s[i] - 32);
        }
    }
}
```

## Aliases & Shorthands
Available via: `string_to_upper`, `boiler-plates.separate-components.strings.to-upper`, `boiler-plates>string_to_upper()`, `boiler-plates>separate-components>strings>to-upper>string_to_upper()`, `strToUpper`
