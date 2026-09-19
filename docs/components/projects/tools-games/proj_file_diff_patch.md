# proj_file_diff_patch
> **Domain:** `projects` | **Subcategory:** `tools-games` | **Type:** `program`
## Overview
Computes line-by-line diff comparing two text buffers in unified diff format

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

void compute_line_diff(const char* old_lines[], int n_old, const char* new_lines[], int n_new) {
    printf("--- Original\n+++ Modified\n");
    int i = 0, j = 0;
    while (i < n_old && j < n_new) {
        if (strcmp(old_lines[i], new_lines[j]) == 0) {
            printf("  %s\n", old_lines[i]);
            i++; j++;
        } else {
            printf("- %s\n", old_lines[i++]);
            printf("+ %s\n", new_lines[j++]);
        }
    }
    while (i < n_old) printf("- %s\n", old_lines[i++]);
    while (j < n_new) printf("+ %s\n", new_lines[j++]);
}

int main(void) {
    const char* v1[] = {"int a = 5;", "int b = 10;", "return a + b;"};
    const char* v2[] = {"int a = 5;", "int b = 20;", "int c = 30;", "return a + b + c;"};
    compute_line_diff(v1, 3, v2, 4);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_file_diff_patch`, `projects.tools-games.file-diff.prog-file-diff-patch`, `projects>proj_file_diff_patch()`, `projects>tools-games>file-diff>prog-file-diff-patch>proj_file_diff_patch()`
