# complex_multilevel_logger
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
Interactive structured circular ring buffer logger with level filters and telemetry

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

#define RING_BUFFER_SIZE 16

typedef enum {
    LVL_TRACE = 0,
    LVL_DEBUG,
    LVL_INFO,
    LVL_WARN,
    LVL_ERROR
} Severity;

typedef struct {
    int seq;
    Severity level;
    char message[64];
} LogEntry;

static LogEntry ring[RING_BUFFER_SIZE];
static int head = 0;
static int entry_count = 0;
static int global_seq = 1;

static const char* severity_tag(Severity s) {
    switch (s) {
        case LVL_TRACE: return "TRACE";
        case LVL_DEBUG: return "DEBUG";
        case LVL_INFO:  return "INFO ";
        case LVL_WARN:  return "WARN ";
        case LVL_ERROR: return "ERROR";
        default:        return "UNKNOWN";
    }
}

static void log_append(Severity level, const char* msg) {
    int idx = head;
    ring[idx].seq = global_seq++;
    ring[idx].level = level;
    strncpy(ring[idx].message, msg, sizeof(ring[idx].message) - 1);
    ring[idx].message[sizeof(ring[idx].message) - 1] = '\0';
    head = (head + 1) % RING_BUFFER_SIZE;
    if (entry_count < RING_BUFFER_SIZE) entry_count++;
}

static void dump_logs(Severity min_lvl) {
    printf("\n=== SYSTEM LOG AUDIT (Min Severity: %s) ===\n", severity_tag(min_lvl));
    int start = (entry_count == RING_BUFFER_SIZE) ? head : 0;
    for (int i = 0; i < entry_count; i++) {
        int idx = (start + i) % RING_BUFFER_SIZE;
        if (ring[idx].level >= min_lvl) {
            printf("  [%04d] [%s] %s\n",
                   ring[idx].seq, severity_tag(ring[idx].level), ring[idx].message);
        }
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    log_append(LVL_INFO, "Subsystem initialized");
    log_append(LVL_DEBUG, "Memory mapped at default offset");
    int choice;

    do {
        printf("\n=== MULTILEVEL RING LOGGER ===\n");
        printf("Entries in ring: %d / %d\n", entry_count, RING_BUFFER_SIZE);
        printf("1. Write Log Message\n");
        printf("2. Dump All Logs\n");
        printf("3. Dump Logs with Filter\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            int lvl;
            char msg[64];
            printf("Select level (0: TRACE, 1: DEBUG, 2: INFO, 3: WARN, 4: ERROR): ");
            if (scanf("%d", &lvl) != 1 || lvl < 0 || lvl > 4) lvl = 2;
            clear_input();
            printf("Enter log message: ");
            if (fgets(msg, sizeof(msg), stdin)) {
                msg[strcspn(msg, "\r\n")] = '\0';
                log_append((Severity)lvl, msg);
                printf("Log entry recorded.\n");
            }
        } else if (choice == 2) {
            dump_logs(LVL_TRACE);
        } else if (choice == 3) {
            int filter;
            printf("Select filter cutoff level (0-4): ");
            if (scanf("%d", &filter) == 1 && filter >= 0 && filter <= 4) {
                dump_logs((Severity)filter);
            }
            clear_input();
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_multilevel_logger`, `boiler-plates.full-programs.complex-programs.complex-multilevel-logger`, `boiler-plates>complex_multilevel_logger()`, `boiler-plates>full-programs>complex-programs>complex-multilevel-logger>complex_multilevel_logger()`, `multilevelLoggerProgram`
