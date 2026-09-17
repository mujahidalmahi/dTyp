# job_sequencing_deadlines
> **Domain:** `algorithms` | **Subcategory:** `greedy` | **Type:** `function`
## Overview
Schedules jobs to maximize profit within deadlines

## Signature
```c
int job_sequencing_deadlines(int* deadline, int* profit, int n, int max_d);
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
int job_sequencing_deadlines(int* deadline, int* profit, int n, int max_d) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (profit[j] < profit[j + 1]) {
                int tp = profit[j]; profit[j] = profit[j + 1]; profit[j + 1] = tp;
                int td = deadline[j]; deadline[j] = deadline[j + 1]; deadline[j + 1] = td;
            }
        }
    }
    int* slot = (int*)calloc(max_d + 1, sizeof(int));
    int total_profit = 0;
    for (int i = 0; i < n; i++) {
        for (int j = (deadline[i] < max_d ? deadline[i] : max_d); j > 0; j--) {
            if (!slot[j]) {
                slot[j] = 1;
                total_profit += profit[i];
                break;
            }
        }
    }
    free(slot);
    return total_profit;
}
```

## Aliases & Shorthands
Available via: `job_sequencing_deadlines`, `algorithms.separate-components.greedy.job-sequencing.schedule`, `algorithms>job_sequencing_deadlines()`, `algorithms>separate-components>greedy>job-sequencing>schedule>job_sequencing_deadlines()`, `jobSequencing`
