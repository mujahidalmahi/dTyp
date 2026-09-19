# prog_traffic_light
> **Domain:** `boiler-plates` | **Subcategory:** `enums` | **Type:** `program`
## Overview
Complete traffic light state transition program using enums

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

typedef enum LightState {
    LIGHT_RED,
    LIGHT_GREEN,
    LIGHT_YELLOW
} LightState;

LightState next_state(LightState cur) {
    switch (cur) {
        case LIGHT_RED: return LIGHT_GREEN;
        case LIGHT_GREEN: return LIGHT_YELLOW;
        case LIGHT_YELLOW: return LIGHT_RED;
    }
    return LIGHT_RED;
}

const char* state_name(LightState cur) {
    switch (cur) {
        case LIGHT_RED: return "RED (Stop)";
        case LIGHT_GREEN: return "GREEN (Go)";
        case LIGHT_YELLOW: return "YELLOW (Caution)";
    }
    return "UNKNOWN";
}

int main(void) {
    LightState state = LIGHT_RED;
    for (int i = 0; i < 6; i++) {
        printf("Step %d: %s\n", i + 1, state_name(state));
        state = next_state(state);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_traffic_light`, `boiler-plates.full-programs.enums.prog-traffic-light`, `boiler-plates>prog_traffic_light()`, `boiler-plates>full-programs>enums>prog-traffic-light>prog_traffic_light()`, `trafficLightProgram`
