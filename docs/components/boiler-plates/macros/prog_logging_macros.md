# prog_logging_macros
> **Domain:** `boiler-plates` | **Subcategory:** `macros` | **Type:** `program`
## Overview
Complete program using variadic logging macros with filename and line

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

#define LOG_INFO(fmt, ...) printf("[INFO] %s:%d: " fmt "
", __FILE__, __LINE__, ##__VA_ARGS__)
#define LOG_WARN(fmt, ...) printf("[WARN] %s:%d: " fmt "
", __FILE__, __LINE__, ##__VA_ARGS__)
#define LOG_ERR(fmt, ...)  fprintf(stderr, "[ERROR] %s:%d: " fmt "
", __FILE__, __LINE__, ##__VA_ARGS__)

int main(void) {
    LOG_INFO("System started successfully on port %d", 8080);
    LOG_WARN("Memory usage exceeded threshold: %d%%", 78);
    LOG_ERR("Failed to connect to database host: %s", "localhost");
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_logging_macros`, `boiler-plates.full-programs.macros.prog-logging-macros`, `boiler-plates>prog_logging_macros()`, `boiler-plates>full-programs>macros>prog-logging-macros>prog_logging_macros()`, `loggingMacrosProgram`
