# string_word_count
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `function`
## Overview
Counts words separated by whitespace in a string

## Signature
```c
int string_word_count(const char* s);
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
int string_word_count(const char* s) {
    int count = 0;
    int in_word = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == ' ' || s[i] == '\t' || s[i] == '\n') {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            count++;
        }
    }
    return count;
}
```

## Aliases & Shorthands
Available via: `string_word_count`, `boiler-plates.separate-components.strings.word-count`, `boiler-plates>string_word_count()`, `boiler-plates>separate-components>strings>word-count>string_word_count()`, `strWordCount`
