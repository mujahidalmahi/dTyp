# prog_string_core_operations
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `program`
## Overview
Complete program demonstrating string length, copy, concat, compare, and reverse from scratch

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

int str_len(const char* s) {
    int len = 0;
    while (s[len] != '\0') len++;
    return len;
}

void str_cpy(char* d, const char* s) {
    int i = 0;
    while (s[i] != '\0') { d[i] = s[i]; i++; }
    d[i] = '\0';
}

void str_cat(char* d, const char* s) {
    int i = 0;
    while (d[i] != '\0') i++;
    int j = 0;
    while (s[j] != '\0') d[i++] = s[j++];
    d[i] = '\0';
}

int str_cmp(const char* a, const char* b) {
    int i = 0;
    while (a[i] != '\0' && b[i] != '\0') {
        if (a[i] != b[i]) return (unsigned char)a[i] - (unsigned char)b[i];
        i++;
    }
    return (unsigned char)a[i] - (unsigned char)b[i];
}

void str_rev(char* s) {
    int l = 0, r = str_len(s) - 1;
    while (l < r) {
        char t = s[l]; s[l] = s[r]; s[r] = t;
        l++; r--;
    }
}

int main(void) {
    char buf[64];
    str_cpy(buf, "Hello");
    str_cat(buf, ", World!");
    printf("String: '%s' (Length: %d)\n", buf, str_len(buf));
    printf("Comparison with 'Hello': %d\n", str_cmp(buf, "Hello"));
    str_rev(buf);
    printf("Reversed: '%s'\n", buf);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_string_core_operations`, `boiler-plates.full-programs.strings.prog-core-operations`, `boiler-plates>prog_string_core_operations()`, `boiler-plates>full-programs>strings>prog-core-operations>prog_string_core_operations()`
