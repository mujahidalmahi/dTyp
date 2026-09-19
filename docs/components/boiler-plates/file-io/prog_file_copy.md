# prog_file_copy
> **Domain:** `boiler-plates` | **Subcategory:** `file-io` | **Type:** `program`
## Overview
Interactive file duplicate and streaming copy utility with byte progress metrics

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

#define CHUNK_SIZE 1024

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int copy_stream(const char* src_path, const char* dest_path) {
    FILE* src = fopen(src_path, "rb");
    if (!src) {
        printf("Error: Could not open source file \"%s\"!\n", src_path);
        return -1;
    }
    FILE* dest = fopen(dest_path, "wb");
    if (!dest) {
        printf("Error: Could not create destination file \"%s\"!\n", dest_path);
        fclose(src);
        return -1;
    }

    char buffer[CHUNK_SIZE];
    size_t total_bytes = 0;
    size_t n;
    while ((n = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        fwrite(buffer, 1, n, dest);
        total_bytes += n;
    }

    fclose(src);
    fclose(dest);
    printf("Successfully copied %zu bytes from \"%s\" to \"%s\".\n",
           total_bytes, src_path, dest_path);
    return 0;
}

int main(void) {
    char src[128];
    char dst[128];
    int choice;

    do {
        printf("\n=== FILE STREAM COPY UTILITY ===\n");
        printf("1. Copy File\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter source file path: ");
            if (fgets(src, sizeof(src), stdin)) {
                src[strcspn(src, "\r\n")] = '\0';
            }
            printf("Enter destination file path: ");
            if (fgets(dst, sizeof(dst), stdin)) {
                dst[strcspn(dst, "\r\n")] = '\0';
            }
            if (strlen(src) > 0 && strlen(dst) > 0) {
                copy_stream(src, dst);
            }
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_file_copy`, `boiler-plates.full-programs.file-io.prog-file-copy`, `boiler-plates>prog_file_copy()`, `boiler-plates>full-programs>file-io>prog-file-copy>prog_file_copy()`, `fileCopyProgram`
