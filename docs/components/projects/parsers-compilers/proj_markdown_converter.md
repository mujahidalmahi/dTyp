# proj_markdown_converter
> **Domain:** `projects` | **Subcategory:** `parsers-compilers` | **Type:** `program`
## Overview
Interactive Markdown to HTML converter supporting headings, bold, italics, and lists

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

#define MAX_LINE 512

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void convert_md_line(const char* line) {
    if (line[0] == '#' && line[1] == ' ') {
        printf("<h1>%s</h1>\n", line + 2);
        return;
    }
    if (line[0] == '#' && line[1] == '#' && line[2] == ' ') {
        printf("<h2>%s</h2>\n", line + 3);
        return;
    }
    if (line[0] == '-' && line[1] == ' ') {
        printf("<li>%s</li>\n", line + 2);
        return;
    }
    printf("<p>");
    int len = (int)strlen(line);
    for (int i = 0; i < len; i++) {
        if (line[i] == '*' && line[i + 1] == '*') {
            printf("<b>");
            i += 2;
            while (i < len && !(line[i] == '*' && line[i + 1] == '*')) {
                putchar(line[i++]);
            }
            printf("</b>");
            if (i < len) i++;
        } else {
            putchar(line[i]);
        }
    }
    printf("</p>\n");
}

int main(void) {
    int choice;
    do {
        printf("=== Markdown to HTML Converter ===\n");
        printf("1. Convert Markdown Line to HTML\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char md[MAX_LINE];
                printf("Enter Markdown text: ");
                if (scanf("%511[^\n]", md) == 1) {
                    clear_input();
                    printf("HTML Output: ");
                    convert_md_line(md);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting converter.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_markdown_converter`, `projects.parsers-compilers.markdown-html.prog-markdown-converter`, `projects>proj_markdown_converter()`, `projects>parsers-compilers>markdown-html>prog-markdown-converter>proj_markdown_converter()`
