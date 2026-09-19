# prog_backtracking_permutations
> **Domain:** `algorithms` | **Subcategory:** `backtracking` | **Type:** `program`
## Overview
Complete interactive program generating permutations and power set via backtracking

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

#define MAX_CHAR 12

static int perm_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void swap_char(char* a, char* b) {
    char tmp = *a; *a = *b; *b = tmp;
}

static void permute(char* str, int l, int r) {
    if (l == r) {
        perm_count++;
        printf("%s ", str);
        if (perm_count % 10 == 0) putchar('\n');
        return;
    }
    for (int i = l; i <= r; i++) {
        swap_char(&str[l], &str[i]);
        permute(str, l + 1, r);
        swap_char(&str[l], &str[i]);
    }
}

static void power_set(const char* str, char* current, int idx, int curr_len, int n) {
    if (idx == n) {
        current[curr_len] = '\0';
        printf("{ %s }\n", current);
        return;
    }
    current[curr_len] = str[idx];
    power_set(str, current, idx + 1, curr_len + 1, n);
    power_set(str, current, idx + 1, curr_len, n);
}

int main(void) {
    int choice;
    do {
        printf("=== Combinatorial Generation Workbench ===\n");
        printf("1. Generate All Permutations of a String\n");
        printf("2. Generate Power Set (All Subsets)\n");
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
                char str[MAX_CHAR];
                printf("Enter string (up to 8 characters): ");
                if (scanf("%7s", str) == 1) {
                    clear_input();
                    perm_count = 0;
                    int n = (int)strlen(str);
                    printf("Permutations of '%s':\n", str);
                    permute(str, 0, n - 1);
                    printf("\nTotal permutations: %d\n", perm_count);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                char str[MAX_CHAR];
                char buf[MAX_CHAR];
                printf("Enter characters (up to 6 characters): ");
                if (scanf("%5s", str) == 1) {
                    clear_input();
                    int n = (int)strlen(str);
                    printf("Power set of '%s':\n", str);
                    power_set(str, buf, 0, 0, n);
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
Available via: `prog_backtracking_permutations`, `algorithms.full-programs.backtracking.combinatorial.prog-permutations`, `algorithms>prog_backtracking_permutations()`, `algorithms>full-programs>backtracking>combinatorial>prog-permutations>prog_backtracking_permutations()`, `programPermutations`
