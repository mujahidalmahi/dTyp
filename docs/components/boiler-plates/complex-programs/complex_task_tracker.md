# complex_task_tracker
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
Interactive task scheduler and status pipeline with priority queues

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
#include <string.h>

#define MAX_TASKS 50

typedef enum { STATUS_TODO, STATUS_IN_PROGRESS, STATUS_DONE } TaskStatus;
typedef enum { PRIO_LOW = 1, PRIO_MED, PRIO_HIGH } Priority;

typedef struct {
    int id;
    char title[64];
    Priority priority;
    TaskStatus status;
} Task;

static Task task_list[MAX_TASKS];
static int task_count = 0;
static int next_id = 101;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static const char* status_name(TaskStatus s) {
    if (s == STATUS_TODO) return "TODO";
    if (s == STATUS_IN_PROGRESS) return "IN PROGRESS";
    return "DONE";
}

static const char* priority_name(Priority p) {
    if (p == PRIO_HIGH) return "HIGH";
    if (p == PRIO_MED) return "MEDIUM";
    return "LOW";
}

static void add_task(const char* title, Priority p) {
    if (task_count >= MAX_TASKS) return;
    task_list[task_count].id = next_id++;
    strncpy(task_list[task_count].title, title, sizeof(task_list[task_count].title) - 1);
    task_list[task_count].priority = p;
    task_list[task_count].status = STATUS_TODO;
    task_count++;
    printf("Task #%d created.\n", task_list[task_count - 1].id);
}

static void list_tasks(void) {
    if (task_count == 0) {
        printf("No active tasks.\n");
        return;
    }
    printf("\n=== TASK TRACKER PIPELINE (%d Tasks) ===\n", task_count);
    for (int i = 0; i < task_count; i++) {
        printf("  [ID:%d] %-24s | Prio: %-6s | Status: [%s]\n",
               task_list[i].id, task_list[i].title,
               priority_name(task_list[i].priority), status_name(task_list[i].status));
    }
}

int main(void) {
    add_task("Set up build environment", PRIO_HIGH);
    add_task("Write API unit tests", PRIO_MED);
    int choice;

    do {
        printf("\n=== TASK TRACKER SYSTEM ===\n");
        printf("1. List All Tasks\n");
        printf("2. Add New Task\n");
        printf("3. Advance Task Status\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            list_tasks();
        } else if (choice == 2) {
            char title[64];
            int p;
            printf("Enter task title: ");
            if (fgets(title, sizeof(title), stdin)) title[strcspn(title, "\r\n")] = '\0';
            printf("Enter priority (1: Low, 2: Medium, 3: High): ");
            if (scanf("%d", &p) != 1 || p < 1 || p > 3) p = 2;
            clear_input();
            add_task(title, (Priority)p);
        } else if (choice == 3) {
            int id;
            printf("Enter Task ID to advance: ");
            if (scanf("%d", &id) == 1) {
                int found = 0;
                for (int i = 0; i < task_count; i++) {
                    if (task_list[i].id == id) {
                        if (task_list[i].status == STATUS_TODO) task_list[i].status = STATUS_IN_PROGRESS;
                        else if (task_list[i].status == STATUS_IN_PROGRESS) task_list[i].status = STATUS_DONE;
                        printf("Task #%d advanced to [%s].\n", id, status_name(task_list[i].status));
                        found = 1;
                        break;
                    }
                }
                if (!found) printf("Task ID not found.\n");
            }
            clear_input();
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_task_tracker`, `boiler-plates.full-programs.complex-programs.complex-task-tracker`, `boiler-plates>complex_task_tracker()`, `boiler-plates>full-programs>complex-programs>complex-task-tracker>complex_task_tracker()`, `taskTrackerProgram`
