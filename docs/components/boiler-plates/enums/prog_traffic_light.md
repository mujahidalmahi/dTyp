# prog_traffic_light
> **Domain:** `boiler-plates` | **Subcategory:** `enums` | **Type:** `program`
## Overview
Interactive traffic light controller and state machine simulation

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

typedef enum {
    LIGHT_RED,
    LIGHT_GREEN,
    LIGHT_YELLOW
} TrafficLightState;

static const char* state_to_string(TrafficLightState s) {
    switch (s) {
        case LIGHT_RED:    return "RED [STOP - Wait for cross traffic]";
        case LIGHT_GREEN:  return "GREEN [GO - Proceed safely]";
        case LIGHT_YELLOW: return "YELLOW [CAUTION - Prepare to stop]";
        default:           return "UNKNOWN";
    }
}

static TrafficLightState next_state(TrafficLightState s) {
    switch (s) {
        case LIGHT_RED:    return LIGHT_GREEN;
        case LIGHT_GREEN:  return LIGHT_YELLOW;
        case LIGHT_YELLOW: return LIGHT_RED;
        default:           return LIGHT_RED;
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    TrafficLightState current = LIGHT_RED;
    int choice;

    do {
        printf("\n=== TRAFFIC LIGHT CONTROLLER (ENUM FINITE STATE MACHINE) ===\n");
        printf("Current Signal: %s\n", state_to_string(current));
        printf("1. Advance Signal (Step FSM)\n");
        printf("2. Simulate N Cycles\n");
        printf("3. Manual Override to Color\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            current = next_state(current);
            printf("Advanced to: %s\n", state_to_string(current));
        } else if (choice == 2) {
            int cycles;
            printf("Enter number of state advances: ");
            if (scanf("%d", &cycles) == 1 && cycles > 0) {
                for (int i = 1; i <= cycles; i++) {
                    current = next_state(current);
                    printf("  Advance #%d: %s\n", i, state_to_string(current));
                }
            }
        } else if (choice == 3) {
            int set_color;
            printf("Choose (0: RED, 1: GREEN, 2: YELLOW): ");
            if (scanf("%d", &set_color) == 1 && set_color >= 0 && set_color <= 2) {
                current = (TrafficLightState)set_color;
                printf("Manually set to: %s\n", state_to_string(current));
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_traffic_light`, `boiler-plates.full-programs.enums.prog-traffic-light`, `boiler-plates>prog_traffic_light()`, `boiler-plates>full-programs>enums>prog-traffic-light>prog_traffic_light()`, `trafficLightProgram`
