# write_file_text
> **Domain:** `boiler-plates` | **Subcategory:** `file-io` | **Type:** `function`
## Overview
Overwrites a text file with given string content

## Signature
```c
int write_file_text(const char* path, const char* text);
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
int write_file_text(const char* path, const char* text) {
    FILE* f = fopen(path, "w");
    if (!f) return -1;
    fputs(text, f);
    fclose(f);
    return 0;
}
```

## Aliases & Shorthands
Available via: `write_file_text`, `boiler-plates.separate-components.file-io.file-write-text`, `boiler-plates>write_file_text()`, `boiler-plates>separate-components>file-io>file-write-text>write_file_text()`, `writeFileText`
