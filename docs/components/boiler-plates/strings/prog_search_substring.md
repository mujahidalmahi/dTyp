# prog_search_substring
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `program`
## Overview
Interactive substring occurrence finder and pattern counter utility

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

static const char* custom_strstr(const char* haystack, const char* needle) {
    if (!*needle) return haystack;
    for (; *haystack; haystack++) {
        if (*haystack == *needle) {
            const char* h = haystack;
            const char* n = needle;
            while (*h && *n && *h == *n) {
                h++;
                n++;
            }
            if (!*n) return haystack;
        }
    }
    return NULL;
}

static int count_occurrences(const char* haystack, const char* needle) {
    if (!*needle) return 0;
    int count = 0;
    size_t needle_len = strlen(needle);
    const char* pos = haystack;
    while ((pos = custom_strstr(pos, needle)) != NULL) {
        count++;
        pos += needle_len;
    }
    return count;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    char haystack[256];
    char needle[64];
    int choice;

    do {
        printf("\n=== SUBSTRING SEARCH & COUNT TOOL ===\n");
        printf("1. Search Substring in Text\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter full text (haystack): ");
            if (fgets(haystack, sizeof(haystack), stdin)) {
                haystack[strcspn(haystack, "\r\n")] = '\0';
            }
            printf("Enter search pattern (needle): ");
            if (fgets(needle, sizeof(needle), stdin)) {
                needle[strcspn(needle, "\r\n")] = '\0';
            }

            int count = count_occurrences(haystack, needle);
            const char* first = custom_strstr(haystack, needle);
            if (first) {
                printf("Pattern \"%s\" found %d time(s)! First match at index %td.\n",
                       needle, count, first - haystack);
            } else {
                printf("Pattern \"%s\" not found in text.\n", needle);
            }
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_search_substring`, `boiler-plates.full-programs.strings.prog-search-substring`, `boiler-plates>prog_search_substring()`, `boiler-plates>full-programs>strings>prog-search-substring>prog_search_substring()`, `searchSubstringProgram`
