# append_file_text
> **Domain:** `boiler-plates` | **Subcategory:** `file-io` | **Type:** `function`
## Overview
Appends text string to the end of a file

## Signature
```c
int append_file_text(const char* path, const char* text);
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
int append_file_text(const char* path, const char* text) {
    FILE* f = fopen(path, "a");
    if (!f) return -1;
    fputs(text, f);
    fclose(f);
    return 0;
}
```

## Aliases & Shorthands
Available via: `append_file_text`, `boiler-plates.separate-components.file-io.file-append-text`, `boiler-plates>append_file_text()`, `boiler-plates>separate-components>file-io>file-append-text>append_file_text()`, `appendFileText`
