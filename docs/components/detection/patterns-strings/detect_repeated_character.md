# detect_repeated_character
> **Domain:** `detection` | **Subcategory:** `patterns-strings` | **Type:** `function`
## Overview
Detects first repeated character in string returning character or null byte

## Signature
```c
char detect_repeated_character(const char* s);
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
char detect_repeated_character(const char* s) {
    int seen[256] = {0};
    for (int i = 0; s[i] != '\0'; i++) {
        unsigned char c = (unsigned char)s[i];
        if (seen[c]) return (char)c;
        seen[c] = 1;
    }
    return '\0';
}
```

## Aliases & Shorthands
Available via: `detect_repeated_character`, `detection.patterns-strings.repeated-character`, `detection>detect_repeated_character()`, `detection>patterns-strings>repeated-character>detect_repeated_character()`, `first_repeated_char`
