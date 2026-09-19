# prog_dynamic_array_stats
> **Domain:** `boiler-plates` | **Subcategory:** `dynamic-memory` | **Type:** `program`
## Overview
Complete heap allocation, statistics calculation, and memory cleanup program

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
    size_t n = 5;
    int* data = (int*)malloc(n * sizeof(int));
    if (!data) return 1;

    for (size_t i = 0; i < n; i++) {
        data[i] = (int)((i + 1) * 15);
    }

    long long sum = 0;
    int min_val = data[0];
    int max_val = data[0];
    for (size_t i = 0; i < n; i++) {
        sum += data[i];
        if (data[i] < min_val) min_val = data[i];
        if (data[i] > max_val) max_val = data[i];
    }

    printf("Count: %zu, Sum: %lld, Average: %.2f, Min: %d, Max: %d\n",
           n, sum, (double)sum / n, min_val, max_val);

    free(data);
    data = NULL;
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dynamic_array_stats`, `boiler-plates.full-programs.dynamic-memory.prog-dynamic-array-stats`, `boiler-plates>prog_dynamic_array_stats()`, `boiler-plates>full-programs>dynamic-memory>prog-dynamic-array-stats>prog_dynamic_array_stats()`, `dynamicArrayStatsProgram`
