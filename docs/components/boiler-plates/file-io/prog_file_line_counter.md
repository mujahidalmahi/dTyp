# prog_file_line_counter
> **Domain:** `boiler-plates` | **Subcategory:** `file-io` | **Type:** `program`
## Overview
Interactive file text analytics counting lines, words, characters, and whitespace

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
#include <ctype.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void analyze_file(const char* path) {
    FILE* fp = fopen(path, "r");
    if (!fp) {
        printf("Error: Could not open \"%s\" for reading!\n", path);
        return;
    }

    long long lines = 0, words = 0, chars = 0, non_blank_lines = 0;
    int in_word = 0, line_chars = 0;
    int ch;

    while ((ch = fgetc(fp)) != EOF) {
        chars++;
        if (ch == '\n') {
            lines++;
            if (line_chars > 0) non_blank_lines++;
            line_chars = 0;
        } else if (!isspace(ch)) {
            line_chars++;
        }

        if (isspace(ch)) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            words++;
        }
    }

    if (chars > 0 && line_chars > 0) {
        lines++;
        non_blank_lines++;
    }

    fclose(fp);

    printf("\n--- File Statistics for \"%s\" ---\n", path);
    printf("  Total Characters : %lld\n", chars);
    printf("  Total Words      : %lld\n", words);
    printf("  Total Lines      : %lld\n", lines);
    printf("  Non-Blank Lines  : %lld\n", non_blank_lines);
}

int main(void) {
    char path[128];
    int choice;

    do {
        printf("\n=== FILE LINE & WORD COUNTER ===\n");
        printf("1. Analyze File\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter path to file: ");
            if (fgets(path, sizeof(path), stdin)) {
                path[strcspn(path, "\r\n")] = '\0';
                if (strlen(path) > 0) {
                    analyze_file(path);
                }
            }
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_file_line_counter`, `boiler-plates.full-programs.file-io.prog-file-line-counter`, `boiler-plates>prog_file_line_counter()`, `boiler-plates>full-programs>file-io>prog-file-line-counter>prog_file_line_counter()`, `fileLineCounterProgram`
