# prog_dynamic_buffer_growth
> **Domain:** `boiler-plates` | **Subcategory:** `dynamic-memory` | **Type:** `program`
## Overview
Complete dynamic buffer expansion program using realloc

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
#include <stdlib.h>

int main(void) {
    size_t cap = 2;
    size_t count = 0;
    int* buffer = (int*)malloc(cap * sizeof(int));
    if (!buffer) return 1;

    for (int val = 10; val <= 60; val += 10) {
        if (count >= cap) {
            cap *= 2;
            int* next = (int*)realloc(buffer, cap * sizeof(int));
            if (!next) {
                free(buffer);
                return 1;
            }
            buffer = next;
        }
        buffer[count++] = val;
    }

    printf("Dynamic buffer (capacity %zu, count %zu):\n", cap, count);
    for (size_t i = 0; i < count; i++) {
        printf("%d ", buffer[i]);
    }
    putchar('\n');

    free(buffer);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dynamic_buffer_growth`, `boiler-plates.full-programs.dynamic-memory.prog-dynamic-buffer-growth`, `boiler-plates>prog_dynamic_buffer_growth()`, `boiler-plates>full-programs>dynamic-memory>prog-dynamic-buffer-growth>prog_dynamic_buffer_growth()`, `bufferGrowthProgram`
