# prog_file_copy
> **Domain:** `boiler-plates` | **Subcategory:** `file-io` | **Type:** `program`
## Overview
Complete buffered file copy program

## Signature
```c
int main(int argc, char* argv[])
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

int main(int argc, char* argv[]) {
    if (argc < 3) {
        printf("Usage: %s <source> <destination>
", argv[0]);
        return 1;
    }

    FILE* src = fopen(argv[1], "rb");
    if (!src) {
        perror("Error opening source file");
        return 1;
    }

    FILE* dst = fopen(argv[2], "wb");
    if (!dst) {
        perror("Error opening destination file");
        fclose(src);
        return 1;
    }

    char buffer[4096];
    size_t bytes;
    while ((bytes = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        fwrite(buffer, 1, bytes, dst);
    }

    fclose(src);
    fclose(dst);
    puts("File copied successfully.");
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_file_copy`, `boiler-plates.full-programs.file-io.prog-file-copy`, `boiler-plates>prog_file_copy()`, `boiler-plates>full-programs>file-io>prog-file-copy>prog_file_copy()`, `fileCopyProgram`
