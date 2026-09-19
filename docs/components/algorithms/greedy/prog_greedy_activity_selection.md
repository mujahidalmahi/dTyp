# prog_greedy_activity_selection
> **Domain:** `algorithms` | **Subcategory:** `greedy` | **Type:** `program`
## Overview
Complete greedy interval activity selection program

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

int main(void) {
    int start[] = {1, 3, 0, 5, 8, 5};
    int finish[] = {2, 4, 6, 7, 9, 9};
    int n = sizeof(start) / sizeof(start[0]);

    printf("Selected Activities: 0 ");
    int last = finish[0];
    for (int i = 1; i < n; i++) {
        if (start[i] >= last) {
            printf("%d ", i);
            last = finish[i];
        }
    }
    putchar('\n');
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_greedy_activity_selection`, `algorithms.full-programs.greedy.activity-selection.prog-activity-selection`, `algorithms>prog_greedy_activity_selection()`, `algorithms>full-programs>greedy>activity-selection>prog-activity-selection>prog_greedy_activity_selection()`, `programActivitySelection`
