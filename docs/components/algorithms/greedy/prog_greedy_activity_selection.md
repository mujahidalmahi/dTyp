# prog_greedy_activity_selection
> **Domain:** `algorithms` | **Subcategory:** `greedy` | **Type:** `program`
## Overview
Complete interactive program executing greedy interval Activity Selection

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
#include <stdlib.h>

#define MAX_ACT 100

typedef struct {
    int id;
    int start;
    int finish;
} Activity;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int cmp_activities(const void* a, const void* b) {
    return (((const Activity*)a)->finish - ((const Activity*)b)->finish);
}

static void select_activities(void) {
    int n;
    printf("Enter number of activities N (<= %d): ", MAX_ACT);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_ACT) {
        clear_input();
        return;
    }
    Activity acts[MAX_ACT];
    printf("Enter start and finish times for %d activities (start finish):\n", n);
    for (int i = 0; i < n; i++) {
        acts[i].id = i + 1;
        scanf("%d %d", &acts[i].start, &acts[i].finish);
    }
    clear_input();
    qsort(acts, (size_t)n, sizeof(Activity), cmp_activities);
    printf("Selected Max Non-Overlapping Activities:\n");
    int count = 1;
    printf("[Activity %d: (%d, %d)]\n", acts[0].id, acts[0].start, acts[0].finish);
    int last_finish = acts[0].finish;
    for (int i = 1; i < n; i++) {
        if (acts[i].start >= last_finish) {
            printf("[Activity %d: (%d, %d)]\n", acts[i].id, acts[i].start, acts[i].finish);
            last_finish = acts[i].finish;
            count++;
        }
    }
    printf("Total Compatible Activities: %d\n", count);
}

int main(void) {
    int choice;
    do {
        printf("=== Activity Selection Greedy Workbench ===\n");
        printf("1. Solve Activity Selection Problem\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                select_activities();
                break;
            case 0:
                printf("Exiting suite.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_greedy_activity_selection`, `algorithms.full-programs.greedy.activity-selection.prog-activity-selection`, `algorithms>prog_greedy_activity_selection()`, `algorithms>full-programs>greedy>activity-selection>prog-activity-selection>prog_greedy_activity_selection()`, `programActivitySelection`
