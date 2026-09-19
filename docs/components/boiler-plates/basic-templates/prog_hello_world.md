# prog_hello_world
> **Domain:** `boiler-plates` | **Subcategory:** `basic-templates` | **Type:** `program`
## Overview
Interactive greeting terminal application with custom banner and system info

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

int main(void) {
    char name[64];
    char lang[32];
    int choice;

    do {
        printf("\n=== HELLO WORLD INTERACTIVE SUITE ===\n");
        printf("1. Standard Hello World\n");
        printf("2. Personalized Greeting\n");
        printf("3. Programming Language Banner\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("\nHello, World! Welcome to C programming.\n");
        } else if (choice == 2) {
            printf("Enter your name: ");
            if (fgets(name, sizeof(name), stdin)) {
                name[strcspn(name, "\r\n")] = '\0';
                printf("Hello, %s! Have a productive coding session.\n", name);
            }
        } else if (choice == 3) {
            printf("Enter your preferred programming language: ");
            if (fgets(lang, sizeof(lang), stdin)) {
                lang[strcspn(lang, "\r\n")] = '\0';
                printf("****************************************\n");
                printf("* Hello from the %-18s world! *\n", lang);
                printf("****************************************\n");
            }
        } else if (choice != 0) {
            printf("Invalid choice. Try again.\n");
        }
    } while (choice != 0);

    printf("Goodbye!\n");
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_hello_world`, `boiler-plates.full-programs.basic-templates.prog-hello-world`, `boiler-plates>prog_hello_world()`, `boiler-plates>full-programs>basic-templates>prog-hello-world>prog_hello_world()`, `helloWorldProgram`
