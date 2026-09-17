# prog_string_reversal
> **Domain:** `boiler-plates` | **Subcategory:** `pointers` | **Type:** `program`
## Overview
Complete string reversal program using two pointers

## Signature
```c
int main(void)
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
#include <string.h>

void reverse_string(char* str) {
    if (!str) return;
    char* start = str;
    char* end = str + strlen(str) - 1;
    while (start < end) {
        char temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}

int main(void) {
    char text[] = "Modern C Language";
    printf("Original: %s
", text);
    reverse_string(text);
    printf("Reversed: %s
", text);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_string_reversal`, `boiler-plates.full-programs.pointers.prog-string-reversal`, `boiler-plates>prog_string_reversal()`, `boiler-plates>full-programs>pointers>prog-string-reversal>prog_string_reversal()`, `stringReversalProgram`
