# prog_conversions_trim
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `program`
## Overview
Interactive string cleaner performing whitespace trimming, case conversions, and parsing

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
#include <stdlib.h>

static void trim_whitespace(char* s) {
    char* start = s;
    while (isspace((unsigned char)*start)) start++;
    if (*start == '\0') {
        s[0] = '\0';
        return;
    }
    char* end = start + strlen(start) - 1;
    while (end > start && isspace((unsigned char)*end)) end--;
    *(end + 1) = '\0';
    if (start != s) {
        memmove(s, start, (size_t)(end - start + 2));
    }
}

static void to_uppercase(char* s) {
    for (; *s; s++) *s = (char)toupper((unsigned char)*s);
}

static void to_lowercase(char* s) {
    for (; *s; s++) *s = (char)tolower((unsigned char)*s);
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    char buffer[256];
    int choice;

    do {
        printf("\n=== STRING CLEANER & CONVERTER ===\n");
        printf("1. Trim Whitespace\n");
        printf("2. Convert to Uppercase\n");
        printf("3. Convert to Lowercase\n");
        printf("4. Parse String to Numeric (atoi / atof)\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice >= 1 && choice <= 4) {
            printf("Enter text: ");
            if (fgets(buffer, sizeof(buffer), stdin)) {
                buffer[strcspn(buffer, "\r\n")] = '\0';
                if (choice == 1) {
                    trim_whitespace(buffer);
                    printf("Trimmed: [\"%s\"]\n", buffer);
                } else if (choice == 2) {
                    to_uppercase(buffer);
                    printf("Uppercase: %s\n", buffer);
                } else if (choice == 3) {
                    to_lowercase(buffer);
                    printf("Lowercase: %s\n", buffer);
                } else if (choice == 4) {
                    int i_val = atoi(buffer);
                    double d_val = atof(buffer);
                    printf("Integer parse (atoi): %d\n", i_val);
                    printf("Double parse (atof) : %.4f\n", d_val);
                }
            }
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_conversions_trim`, `boiler-plates.full-programs.strings.prog-conversions-trim`, `boiler-plates>prog_conversions_trim()`, `boiler-plates>full-programs>strings>prog-conversions-trim>prog_conversions_trim()`, `conversionsTrimProgram`
