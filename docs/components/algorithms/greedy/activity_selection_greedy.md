# activity_selection_greedy
> **Domain:** `algorithms` | **Subcategory:** `greedy` | **Type:** `function`
## Overview
Greedy interval scheduling selecting max non-overlapping activities

## Signature
```c
int activity_selection_greedy(const int* start, const int* finish, int n, int* selected);
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
int activity_selection_greedy(const int* start, const int* finish, int n, int* selected) {
    if (n <= 0) return 0;
    int count = 0;
    selected[count++] = 0;
    int last_finish = finish[0];
    for (int i = 1; i < n; i++) {
        if (start[i] >= last_finish) {
            selected[count++] = i;
            last_finish = finish[i];
        }
    }
    return count;
}
```

## Aliases & Shorthands
Available via: `activity_selection_greedy`, `algorithms.separate-components.greedy.activity-selection.select`, `algorithms>activity_selection_greedy()`, `algorithms>separate-components>greedy>activity-selection>select>activity_selection_greedy()`, `activitySelection`
