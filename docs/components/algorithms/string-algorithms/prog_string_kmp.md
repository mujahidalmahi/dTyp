# prog_string_kmp
> **Domain:** `algorithms` | **Subcategory:** `string-algorithms` | **Type:** `program`
## Overview
Complete interactive program running Knuth-Morris-Pratt (KMP) pattern matching

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

#define MAX_TEXT 1000
#define MAX_PAT 200

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void compute_lps(const char* pat, int m, int* lps) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

static void kmp_search(const char* text, const char* pat) {
    int n = (int)strlen(text);
    int m = (int)strlen(pat);
    int lps[MAX_PAT];
    compute_lps(pat, m, lps);
    printf("LPS Array: ");
    for (int i = 0; i < m; i++) printf("%d ", lps[i]);
    putchar('\n');
    int i = 0, j = 0, count = 0;
    printf("Pattern found at indices: ");
    while (i < n) {
        if (pat[j] == text[i]) {
            i++; j++;
        }
        if (j == m) {
            printf("%d ", i - j);
            count++;
            j = lps[j - 1];
        } else if (i < n && pat[j] != text[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    if (count == 0) printf("None");
    printf("\nTotal Matches: %d\n", count);
}

int main(void) {
    int choice;
    do {
        printf("=== KMP Pattern Matching Workbench ===\n");
        printf("1. Search Pattern in Text using KMP Algorithm\n");
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
                char text[MAX_TEXT], pat[MAX_PAT];
                printf("Enter text: ");
                if (scanf("%999s", text) == 1) {
                    printf("Enter pattern: ");
                    if (scanf("%199s", pat) == 1) {
                        clear_input();
                        kmp_search(text, pat);
                    } else {
                        clear_input();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\n");
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
Available via: `prog_string_kmp`, `algorithms.full-programs.string-algorithms.kmp.prog-kmp`, `algorithms>prog_string_kmp()`, `algorithms>full-programs>string-algorithms>kmp>prog-kmp>prog_string_kmp()`, `programKmpSearch`
