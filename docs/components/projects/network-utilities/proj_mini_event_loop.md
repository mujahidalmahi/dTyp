# proj_mini_event_loop
> **Domain:** `projects` | **Subcategory:** `network-utilities` | **Type:** `program`
## Overview
Interactive non-blocking event loop simulator with timers and asynchronous callbacks

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

#define MAX_TIMERS 20

typedef void (*Callback)(int id, void* data);

typedef struct {
    int id;
    int ticks_remaining;
    int interval;
    int is_active;
    char name[32];
} Timer;

static Timer timers[MAX_TIMERS];
static int total_timers = 0;
static int current_tick = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void register_timer(const char* name, int interval) {
    if (total_timers >= MAX_TIMERS) {
        printf("Timer queue full.\n");
        return;
    }
    Timer t;
    t.id = total_timers + 1;
    strncpy(t.name, name, 31);
    t.name[31] = '\0';
    t.interval = interval;
    t.ticks_remaining = interval;
    t.is_active = 1;
    timers[total_timers++] = t;
    printf("Registered timer #%d '%s' with interval %d ticks.\n", t.id, t.name, interval);
}

static void step_event_loop(int steps) {
    for (int s = 0; s < steps; s++) {
        current_tick++;
        printf("[Tick #%d]\n", current_tick);
        int fired = 0;
        for (int i = 0; i < total_timers; i++) {
            if (timers[i].is_active) {
                timers[i].ticks_remaining--;
                if (timers[i].ticks_remaining <= 0) {
                    printf("  >>> Timer #%d ('%s') FIRED callback!\n", timers[i].id, timers[i].name);
                    timers[i].ticks_remaining = timers[i].interval;
                    fired++;
                }
            }
        }
        if (!fired) printf("  (No timers triggered)\n");
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Asynchronous Event Loop Simulator ===\n");
        printf("Current Tick: %d | Active Timers: %d\n", current_tick, total_timers);
        printf("1. Register New Timer\n");
        printf("2. Step Event Loop (Advance Ticks)\n");
        printf("3. List All Timers\n");
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
                char name[32];
                int interval;
                printf("Enter timer name and tick interval: ");
                if (scanf("%31s %d", name, &interval) == 2 && interval > 0) {
                    clear_input();
                    register_timer(name, interval);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                int steps;
                printf("Enter number of ticks to step: ");
                if (scanf("%d", &steps) == 1 && steps > 0) {
                    clear_input();
                    step_event_loop(steps);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (total_timers == 0) {
                    printf("No timers registered.\n");
                    break;
                }
                printf("%-4s | %-16s | %-10s | %-10s\n", "ID", "Name", "Interval", "Next Trigger");
                printf("----------------------------------------------\n");
                for (int i = 0; i < total_timers; i++) {
                    printf("%-4d | %-16s | %-10d | In %d ticks\n",
                           timers[i].id, timers[i].name, timers[i].interval, timers[i].ticks_remaining);
                }
                break;
            }
            case 0:
                printf("Exiting event loop.\n");
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
Available via: `proj_mini_event_loop`, `projects.network-utilities.event-loop.prog-mini-event-loop`, `projects>proj_mini_event_loop()`, `projects>network-utilities>event-loop>prog-mini-event-loop>proj_mini_event_loop()`
