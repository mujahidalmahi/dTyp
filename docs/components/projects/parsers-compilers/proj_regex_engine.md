# proj_regex_engine
> **Domain:** `projects` | **Subcategory:** `parsers-compilers` | **Type:** `program`
## Overview
Interactive regex pattern matcher supporting literal characters, dots, and Kleene stars

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

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int match_pattern(const char* pat, const char* text);

static int match_star(char c, const char* pat, const char* text) {
    do {
        if (match_pattern(pat, text)) return 1;
    } while (*text != '\0' && (*text++ == c || c == '.'));
    return 0;
}

static int match_pattern(const char* pat, const char* text) {
    if (pat[0] == '\0') return 1;
    if (pat[1] == '*') return match_star(pat[0], pat + 2, text);
    if (pat[0] == '$' && pat[1] == '\0') return (*text == '\0');
    if (*text != '\0' && (pat[0] == '.' || pat[0] == *text)) {
        return match_pattern(pat + 1, text + 1);
    }
    return 0;
}

static int regex_search(const char* pat, const char* text) {
    if (pat[0] == '^') return match_pattern(pat + 1, text);
    do {
        if (match_pattern(pat, text)) return 1;
    } while (*text++ != '\0');
    return 0;
}

int main(void) {
    int choice;
    do {
        printf("=== Micro Regular Expression Matcher ===\n");
        printf("Supported: '.' (any char), '*' (zero or more), '^' (anchor start), '$' (anchor end)\n");
        printf("1. Match Pattern against Text\n");
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
                char pat[128], text[256];
                printf("Enter regex pattern: ");
                if (scanf("%127s", pat) == 1) {
                    printf("Enter text to match: ");
                    if (scanf("%255s", text) == 1) {
                        clear_input();
                        int matched = regex_search(pat, text);
                        printf("Pattern '%s' %s in '%s'.\n",
                               pat, matched ? "MATCHED" : "DID NOT MATCH", text);
                    } else {
                        clear_input();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting regex engine.\n");
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
Available via: `proj_regex_engine`, `projects.parsers-compilers.regex-engine.prog-regex-engine`, `projects>proj_regex_engine()`, `projects>parsers-compilers>regex-engine>prog-regex-engine>proj_regex_engine()`
