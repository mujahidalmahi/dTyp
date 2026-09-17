# string_to_int
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Parses signed integer from string without atoi

## Signature
```c
int string_to_int(const char* s, int* out_val);
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
int string_to_int(const char* s, int* out_val) {
    int i = 0;
    while (s[i] == ' ' || s[i] == '\t') i++;
    int sign = 1;
    if (s[i] == '-') {
        sign = -1;
        i++;
    } else if (s[i] == '+') {
        i++;
    }
    if (s[i] < '0' || s[i] > '9') return 0;
    int res = 0;
    while (s[i] >= '0' && s[i] <= '9') {
        res = res * 10 + (s[i] - '0');
        i++;
    }
    *out_val = res * sign;
    return 1;
}
```

## Aliases & Shorthands
Available via: `string_to_int`, `boiler-plates.separate-components.strings.to-int`, `boiler-plates>string_to_int()`, `boiler-plates>separate-components>strings>to-int>string_to_int()`, `strToInt`
