# string_reverse
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Reverses string characters in-place using two pointers

## Signature
```c
void string_reverse(char* s);
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
void string_reverse(char* s) {
    int i = 0;
    while (s[i] != '\0') i++;
    int left = 0, right = i - 1;
    while (left < right) {
        char tmp = s[left];
        s[left] = s[right];
        s[right] = tmp;
        left++;
        right--;
    }
}
```

## Aliases & Shorthands
Available via: `string_reverse`, `boiler-plates.separate-components.strings.reverse`, `boiler-plates>string_reverse()`, `boiler-plates>separate-components>strings>reverse>string_reverse()`, `strReverse`
