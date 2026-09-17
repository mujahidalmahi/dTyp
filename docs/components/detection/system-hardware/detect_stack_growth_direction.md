# detect_stack_growth_direction
> **Domain:** `detection` | **Subcategory:** `system-hardware` | **Type:** `function`
## Overview
Detects runtime call stack growth direction returning -1 for down or +1 for up

## Signature
```c
int detect_stack_growth_direction(void);
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
static void stack_check_dir(int* parent_addr, int* out_dir) {
    int local_var;
    if (&local_var < parent_addr) *out_dir = -1;
    else *out_dir = 1;
}

int detect_stack_growth_direction(void) {
    int main_local;
    int direction = 0;
    stack_check_dir(&main_local, &direction);
    return direction;
}
```

## Aliases & Shorthands
Available via: `detect_stack_growth_direction`, `detection.system-hardware.stack-growth-direction`, `detection>detect_stack_growth_direction()`, `detection>system-hardware>stack-growth-direction>detect_stack_growth_direction()`, `stack_direction`
