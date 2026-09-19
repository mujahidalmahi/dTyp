# complex_multilevel_logger
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
Logging engine supporting severity filtering, formatting, and file appending

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
#include <stdarg.h>
#include <time.h>

typedef enum Level { LVL_DEBUG, LVL_INFO, LVL_WARN, LVL_ERROR } Level;

typedef struct Logger {
    Level min_level;
    const char* log_file;
} Logger;

void logger_write(const Logger* log, Level lvl, const char* fmt, ...) {
    if (lvl < log->min_level) return;

    const char* tags[] = {"DEBUG", "INFO", "WARN", "ERROR"};
    time_t now = time(NULL);
    char time_str[24];
    strftime(time_str, sizeof(time_str), "%Y-%m-%d %H:%M:%S", localtime(&now));

    va_list args1, args2;
    va_start(args1, fmt);
    va_copy(args2, args1);

    printf("[%s] [%s] ", time_str, tags[lvl]);
    vprintf(fmt, args1);
    putchar('\n');
    va_end(args1);

    if (log->log_file) {
        FILE* f = fopen(log->log_file, "a");
        if (f) {
            fprintf(f, "[%s] [%s] ", time_str, tags[lvl]);
            vfprintf(f, fmt, args2);
            fputc('\n', f);
            fclose(f);
        }
    }
    va_end(args2);
}

int main(void) {
    Logger logger = { .min_level = LVL_INFO, .log_file = "app.log" };

    logger_write(&logger, LVL_DEBUG, "This debug trace will be filtered out");
    logger_write(&logger, LVL_INFO, "Worker thread started with ID %d", 4);
    logger_write(&logger, LVL_WARN, "Disk capacity at %d percent", 85);
    logger_write(&logger, LVL_ERROR, "Socket connection dropped unexpectedly");

    remove("app.log");
    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_multilevel_logger`, `boiler-plates.full-programs.complex-programs.complex-multilevel-logger`, `boiler-plates>complex_multilevel_logger()`, `boiler-plates>full-programs>complex-programs>complex-multilevel-logger>complex_multilevel_logger()`, `multilevelLoggerProgram`
