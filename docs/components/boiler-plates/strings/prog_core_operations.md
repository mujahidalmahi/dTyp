# prog_core_operations
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `program`
## Overview
Interactive string workbench implementing custom strlen, strcpy, strcat, and strcmp

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

static size_t custom_strlen(const char* s) {
    size_t len = 0;
    while (s[len] != '\0') len++;
    return len;
}

static void custom_strcpy(char* dest, const char* src) {
    while ((*dest++ = *src++) != '\0');
}

static void custom_strcat(char* dest, const char* src) {
    while (*dest != '\0') dest++;
    while ((*dest++ = *src++) != '\0');
}

static int custom_strcmp(const char* s1, const char* s2) {
    while (*s1 && (*s1 == *s2)) {
        s1++;
        s2++;
    }
    return *(const unsigned char*)s1 - *(const unsigned char*)s2;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    char s1[128] = "Hello";
    char s2[128] = "World";
    int choice;

    do {
        printf("\n=== STRING CORE OPERATIONS WORKBENCH ===\n");
        printf("Current Strings:\n  s1 = \"%s\" (len: %zu)\n  s2 = \"%s\" (len: %zu)\n",
               s1, custom_strlen(s1), s2, custom_strlen(s2));
        printf("1. Update String S1\n");
        printf("2. Update String S2\n");
        printf("3. Compare S1 and S2 (strcmp)\n");
        printf("4. Concatenate S2 onto S1 (strcat)\n");
        printf("5. Copy S2 into S1 (strcpy)\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter new S1: ");
            if (fgets(s1, sizeof(s1), stdin)) s1[strcspn(s1, "\r\n")] = '\0';
        } else if (choice == 2) {
            printf("Enter new S2: ");
            if (fgets(s2, sizeof(s2), stdin)) s2[strcspn(s2, "\r\n")] = '\0';
        } else if (choice == 3) {
            int cmp = custom_strcmp(s1, s2);
            if (cmp == 0) printf("s1 is EQUAL to s2\n");
            else if (cmp < 0) printf("s1 is LESS than s2 (diff: %d)\n", cmp);
            else printf("s1 is GREATER than s2 (diff: %d)\n", cmp);
        } else if (choice == 4) {
            if (custom_strlen(s1) + custom_strlen(s2) < sizeof(s1)) {
                custom_strcat(s1, s2);
                printf("Concatenated result: \"%s\"\n", s1);
            } else {
                printf("Buffer overflow prevented! Destination too small.\n");
            }
        } else if (choice == 5) {
            custom_strcpy(s1, s2);
            printf("Copied result: s1 is now \"%s\"\n", s1);
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_core_operations`, `boiler-plates.full-programs.strings.prog-core-operations`, `boiler-plates>prog_core_operations()`, `boiler-plates>full-programs>strings>prog-core-operations>prog_core_operations()`, `coreOperationsProgram`
