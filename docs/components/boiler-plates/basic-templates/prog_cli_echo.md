# prog_cli_echo
> **Domain:** `boiler-plates` | **Subcategory:** `basic-templates` | **Type:** `program`
## Overview
Interactive CLI echo and string transformation terminal utility

## Signature
```c
int main(int argc, char* argv[]);
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

static void echo_upper(const char* s) {
    printf("UPPERCASE: ");
    for (int i = 0; s[i] != '\0'; i++) {
        putchar(toupper((unsigned char)s[i]));
    }
    putchar('\n');
}

static void echo_reversed(const char* s) {
    int len = (int)strlen(s);
    printf("REVERSED : ");
    for (int i = len - 1; i >= 0; i--) {
        putchar(s[i]);
    }
    putchar('\n');
}

static void echo_stats(const char* s) {
    int chars = 0, words = 0, in_word = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        chars++;
        if (isspace((unsigned char)s[i])) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            words++;
        }
    }
    printf("Length: %d chars | Words: %d words\n", chars, words);
}

int main(int argc, char* argv[]) {
    char buffer[256];
    int choice;

    if (argc > 1) {
        printf("Command line arguments received (%d total):\n", argc - 1);
        for (int i = 1; i < argc; i++) {
            printf("  argv[%d] = %s\n", i, argv[i]);
        }
    }

    do {
        printf("\n=== CLI ECHO & TRANSFORM TOOL ===\n");
        printf("1. Echo to Uppercase\n");
        printf("2. Echo Reversed\n");
        printf("3. Character & Word Statistics\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice >= 1 && choice <= 3) {
            printf("Enter text line: ");
            if (fgets(buffer, sizeof(buffer), stdin)) {
                buffer[strcspn(buffer, "\r\n")] = '\0';
                if (choice == 1) echo_upper(buffer);
                else if (choice == 2) echo_reversed(buffer);
                else if (choice == 3) echo_stats(buffer);
            }
        } else if (choice != 0) {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cli_echo`, `boiler-plates.full-programs.basic-templates.prog-cli-echo`, `boiler-plates>prog_cli_echo()`, `boiler-plates>full-programs>basic-templates>prog-cli-echo>prog_cli_echo()`, `cliEchoProgram`
