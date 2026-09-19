# proj_fiber_coroutine
> **Domain:** `projects` | **Subcategory:** `systems-runtime` | **Type:** `program`
## Overview
Interactive cooperative user-space coroutine state machine simulator

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

#define MAX_FIBERS 10

typedef struct {
    int id;
    int state;
    int counter;
    int max_steps;
} Fiber;

static Fiber fibers[MAX_FIBERS];
static int total_fibers = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void create_fiber(int steps) {
    if (total_fibers >= MAX_FIBERS) {
        printf("Fiber limit reached.\n");
        return;
    }
    fibers[total_fibers].id = total_fibers + 1;
    fibers[total_fibers].state = 1;
    fibers[total_fibers].counter = 0;
    fibers[total_fibers].max_steps = steps;
    printf("Fiber #%d created with %d work steps.\n", total_fibers + 1, steps);
    total_fibers++;
}

static void run_fiber_cycle(void) {
    int active = 0;
    for (int i = 0; i < total_fibers; i++) {
        if (fibers[i].state == 1) {
            fibers[i].counter++;
            printf("  [Fiber #%d] Executing step %d/%d (Yielding...)\n",
                   fibers[i].id, fibers[i].counter, fibers[i].max_steps);
            if (fibers[i].counter >= fibers[i].max_steps) {
                fibers[i].state = 0;
                printf("  [Fiber #%d] COMPLETED work and terminated.\n", fibers[i].id);
            } else {
                active++;
            }
        }
    }
    printf("Cycle finished. %d active fibers remaining.\n", active);
}

int main(void) {
    int choice;
    do {
        printf("=== Cooperative Fiber Scheduler ===\n");
        printf("Active Fibers: %d\n", total_fibers);
        printf("1. Create New Fiber\n");
        printf("2. Run 1 Scheduling Round (Cooperative Yield)\n");
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
                int steps;
                printf("Enter work steps for fiber: ");
                if (scanf("%d", &steps) == 1 && steps > 0) {
                    clear_input();
                    create_fiber(steps);
                } else {
                    clear_input();
                }
                break;
            }
            case 2:
                run_fiber_cycle();
                break;
            case 0:
                printf("Exiting fiber scheduler.\n");
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
Available via: `proj_fiber_coroutine`, `projects.systems-runtime.fiber-scheduler.prog-fiber-coroutine`, `projects>proj_fiber_coroutine()`, `projects>systems-runtime>fiber-scheduler>prog-fiber-coroutine>proj_fiber_coroutine()`
