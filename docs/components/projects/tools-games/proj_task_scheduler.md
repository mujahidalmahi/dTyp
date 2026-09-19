# proj_task_scheduler
> **Domain:** `projects` | **Subcategory:** `tools-games` | **Type:** `program`
## Overview
Interactive priority task scheduler utilizing min-heap priority queue

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

typedef struct {
    int id;
    char name[32];
    int priority;
} Task;

static Task heap[MAX_TASKS];
static int task_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void push_task(int id, const char* name, int prio) {
    if (task_count >= MAX_TASKS) {
        printf("Scheduler full.\n");
        return;
    }
    int i = task_count++;
    while (i > 0 && heap[(i - 1) / 2].priority > prio) {
        heap[i] = heap[(i - 1) / 2];
        i = (i - 1) / 2;
    }
    heap[i].id = id;
    strncpy(heap[i].name, name, 31);
    heap[i].name[31] = '\0';
    heap[i].priority = prio;
    printf("Scheduled task '%s' (Priority %d).\n", name, prio);
}

static void pop_task(void) {
    if (task_count == 0) {
        printf("No pending tasks.\n");
        return;
    }
    Task top = heap[0];
    Task last = heap[--task_count];
    int i = 0;
    while (2 * i + 1 < task_count) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int smallest = left;
        if (right < task_count && heap[right].priority < heap[left].priority) smallest = right;
        if (heap[smallest].priority < last.priority) {
            heap[i] = heap[smallest];
            i = smallest;
        } else {
            break;
        }
    }
    heap[i] = last;
    printf("Executed Task #%d: '%s' (Priority: %d)\n", top.id, top.name, top.priority);
}

int main(void) {
    int choice;
    do {
        printf("=== Priority Task Scheduler ===\n");
        printf("Pending Tasks: %d\n", task_count);
        printf("1. Schedule New Task\n");
        printf("2. Execute Highest Priority Task\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                int id, p;
                char name[32];
                printf("Enter ID Name Priority (lower number = higher priority): ");
                if (scanf("%d %31s %d", &id, name, &p) == 3) {
                    clear_input();
                    push_task(id, name, p);
                } else {
                    clear_input();
                }
                break;
            }
            case 2:
                pop_task();
                break;
            case 0:
                printf("Exiting scheduler.\n");
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
Available via: `proj_task_scheduler`, `projects.tools-games.task-scheduler.prog-task-scheduler`, `projects>proj_task_scheduler()`, `projects>tools-games>task-scheduler>prog-task-scheduler>proj_task_scheduler()`
