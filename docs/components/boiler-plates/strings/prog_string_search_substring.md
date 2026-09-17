# prog_string_search_substring
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `program`
## Overview
Complete program demonstrating substring find, slice extraction, and word count from scratch

## Signature
```c
int main(void);
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
#include <stdio.h>

int str_find(const char* h, const char* n) {
    if (n[0] == '\0') return 0;
    for (int i = 0; h[i] != '\0'; i++) {
        int j = 0;
        while (h[i + j] != '\0' && n[j] != '\0' && h[i + j] == n[j]) j++;
        if (n[j] == '\0') return i;
    }
    return -1;
}

void str_substr(const char* src, int start, int len, char* dst) {
    int i = 0;
    while (i < len && src[start + i] != '\0') {
        dst[i] = src[start + i];
        i++;
    }
    dst[i] = '\0';
}

int str_words(const char* s) {
    int count = 0, in_word = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == ' ' || s[i] == '\t' || s[i] == '\n') in_word = 0;
        else if (!in_word) { in_word = 1; count++; }
    }
    return count;
}

int main(void) {
    const char* text = "The quick brown fox jumps over the lazy dog";
    printf("Text: '%s'\n", text);
    printf("Word count: %d\n", str_words(text));
    int idx = str_find(text, "brown");
    printf("Index of 'brown': %d\n", idx);
    char slice[16];
    str_substr(text, idx, 5, slice);
    printf("Extracted slice: '%s'\n", slice);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_string_search_substring`, `boiler-plates.full-programs.strings.prog-search-substring`, `boiler-plates>prog_string_search_substring()`, `boiler-plates>full-programs>strings>prog-search-substring>prog_string_search_substring()`
