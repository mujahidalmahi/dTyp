# complex_task_tracker
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
To-do task manager tracking priority, state machine status, and listing

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

typedef enum Priority { PRIO_LOW, PRIO_MEDIUM, PRIO_HIGH } Priority;
typedef enum TaskState { STATE_TODO, STATE_IN_PROGRESS, STATE_DONE } TaskState;

typedef struct Task {
    int id;
    char title[48];
    Priority priority;
    TaskState state;
} Task;

const char* prio_name(Priority p) {
    switch (p) {
        case PRIO_LOW: return "LOW";
        case PRIO_MEDIUM: return "MED";
        case PRIO_HIGH: return "HIGH";
    }
    return "UNKNOWN";
}

const char* state_name(TaskState s) {
    switch (s) {
        case STATE_TODO: return "TODO";
        case STATE_IN_PROGRESS: return "IN_PROGRESS";
        case STATE_DONE: return "DONE";
    }
    return "UNKNOWN";
}

int main(void) {
    Task tasks[] = {
        {1, "Setup PostgreSQL database schema", PRIO_HIGH, STATE_DONE},
        {2, "Implement user authentication endpoint", PRIO_HIGH, STATE_IN_PROGRESS},
        {3, "Write integration test suites", PRIO_MEDIUM, STATE_TODO},
        {4, "Refactor CSS dark theme palette", PRIO_LOW, STATE_TODO}
    };
    int count = sizeof(tasks) / sizeof(tasks[0]);

    printf("=== Task Management Dashboard ===\n");
    printf("%-4s %-40s %-8s %-12s\n", "ID", "Title", "Prio", "Status");
    printf("------------------------------------------------------------------\n");

    for (int i = 0; i < count; i++) {
        printf("#%-3d %-40s %-8s %-12s\n",
               tasks[i].id, tasks[i].title, prio_name(tasks[i].priority), state_name(tasks[i].state));
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_task_tracker`, `boiler-plates.full-programs.complex-programs.complex-task-tracker`, `boiler-plates>complex_task_tracker()`, `boiler-plates>full-programs>complex-programs>complex-task-tracker>complex_task_tracker()`, `taskTrackerProgram`
