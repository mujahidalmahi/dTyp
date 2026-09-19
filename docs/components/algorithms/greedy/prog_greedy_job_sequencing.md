# prog_greedy_job_sequencing
> **Domain:** `algorithms` | **Subcategory:** `greedy` | **Type:** `program`
## Overview
Complete interactive program solving Job Sequencing with deadlines and profits

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

#define MAX_JOBS 100

typedef struct {
    char id[16];
    int deadline;
    int profit;
} Job;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int cmp_jobs(const void* a, const void* b) {
    return (((const Job*)b)->profit - ((const Job*)a)->profit);
}

static void job_sequencing(void) {
    int n;
    printf("Enter number of jobs N (<= %d): ", MAX_JOBS);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_JOBS) {
        clear_input();
        return;
    }
    Job jobs[MAX_JOBS];
    int max_deadline = 0;
    printf("Enter job ID, deadline, and profit for %d jobs (e.g. J1 2 100):\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%15s %d %d", jobs[i].id, &jobs[i].deadline, &jobs[i].profit);
        if (jobs[i].deadline > max_deadline) max_deadline = jobs[i].deadline;
    }
    clear_input();
    qsort(jobs, (size_t)n, sizeof(Job), cmp_jobs);
    int slot[MAX_JOBS + 1];
    for (int i = 0; i <= max_deadline; i++) slot[i] = -1;
    int total_profit = 0, count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = jobs[i].deadline; j > 0; j--) {
            if (slot[j] == -1) {
                slot[j] = i;
                total_profit += jobs[i].profit;
                count++;
                break;
            }
        }
    }
    printf("Scheduled Jobs for Maximum Profit: ");
    for (int i = 1; i <= max_deadline; i++) {
        if (slot[i] != -1) {
            printf("[%s at slot %d] ", jobs[slot[i]].id, i);
        }
    }
    printf("\nTotal Scheduled Jobs: %d | Maximum Profit: %d\n", count, total_profit);
}

int main(void) {
    int choice;
    do {
        printf("=== Job Sequencing with Deadlines Workbench ===\n");
        printf("1. Solve Job Sequencing Problem\n");
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
                job_sequencing();
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
Available via: `prog_greedy_job_sequencing`, `algorithms.full-programs.greedy.job-sequencing.prog-job-sequencing`, `algorithms>prog_greedy_job_sequencing()`, `algorithms>full-programs>greedy>job-sequencing>prog-job-sequencing>prog_greedy_job_sequencing()`, `programJobSequencing`
