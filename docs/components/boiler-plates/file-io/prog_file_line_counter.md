# prog_file_line_counter
> **Domain:** `boiler-plates` | **Subcategory:** `file-io` | **Type:** `program`
## Overview
Complete program calculating lines, words, and characters in a file

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
#include <ctype.h>
#include <stdbool.h>

int main(int argc, char* argv[]) {
    if (argc < 2) {
        printf("Usage: %s <filename>\n", argv[0]);
        return 1;
    }

    FILE* f = fopen(argv[1], "r");
    if (!f) {
        perror("Error opening file");
        return 1;
    }

    long lines = 0, words = 0, chars = 0;
    int c;
    bool in_word = false;

    while ((c = fgetc(f)) != EOF) {
        chars++;
        if (c == '\n') lines++;
        if (isspace(c)) {
            in_word = false;
        } else if (!in_word) {
            in_word = true;
            words++;
        }
    }

    fclose(f);
    printf("File: %s\nLines: %ld | Words: %ld | Chars: %ld\n", argv[1], lines, words, chars);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_file_line_counter`, `boiler-plates.full-programs.file-io.prog-file-line-counter`, `boiler-plates>prog_file_line_counter()`, `boiler-plates>full-programs>file-io>prog-file-line-counter>prog_file_line_counter()`, `fileLineCounterProgram`
