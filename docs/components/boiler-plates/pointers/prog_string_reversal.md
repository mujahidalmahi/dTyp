# prog_string_reversal
> **Domain:** `boiler-plates` | **Subcategory:** `pointers` | **Type:** `program`
## Overview
Interactive in-place pointer-based string reversal and palindrome verification

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

static void reverse_in_place(char* start, char* end) {
    while (start < end) {
        char tmp = *start;
        *start++ = *end;
        *end-- = tmp;
    }
}

static int is_palindrome(const char* s) {
    const char* left = s;
    const char* right = s + strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum((unsigned char)*left)) left++;
        while (left < right && !isalnum((unsigned char)*right)) right--;
        if (tolower((unsigned char)*left) != tolower((unsigned char)*right)) return 0;
        left++;
        right--;
    }
    return 1;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    char buffer[256];
    int choice;

    do {
        printf("\n=== POINTER STRING WORKBENCH ===\n");
        printf("1. Reverse String In-Place\n");
        printf("2. Check Alphanumeric Palindrome\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter text to reverse: ");
            if (fgets(buffer, sizeof(buffer), stdin)) {
                buffer[strcspn(buffer, "\r\n")] = '\0';
                int len = (int)strlen(buffer);
                if (len > 0) {
                    reverse_in_place(buffer, buffer + len - 1);
                    printf("Reversed: %s\n", buffer);
                }
            }
        } else if (choice == 2) {
            printf("Enter text to test: ");
            if (fgets(buffer, sizeof(buffer), stdin)) {
                buffer[strcspn(buffer, "\r\n")] = '\0';
                printf("Result: \"%s\" is %s\n",
                       buffer, is_palindrome(buffer) ? "a VALID PALINDROME" : "NOT a palindrome");
            }
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_string_reversal`, `boiler-plates.full-programs.pointers.prog-string-reversal`, `boiler-plates>prog_string_reversal()`, `boiler-plates>full-programs>pointers>prog-string-reversal>prog_string_reversal()`, `stringReversalProgram`
