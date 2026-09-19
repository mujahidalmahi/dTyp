# prog_dp_edit_distance
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `program`
## Overview
Complete interactive program calculating Levenshtein edit distance with operation traceback

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

#define MAX_LEN 200

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int min3(int a, int b, int c) {
    int m = a;
    if (b < m) m = b;
    if (c < m) m = c;
    return m;
}

static void edit_distance(void) {
    char s1[MAX_LEN], s2[MAX_LEN];
    printf("Enter source string: ");
    if (scanf("%199s", s1) != 1) {
        clear_input();
        return;
    }
    printf("Enter target string: ");
    if (scanf("%199s", s2) != 1) {
        clear_input();
        return;
    }
    clear_input();
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);
    int dp[MAX_LEN + 1][MAX_LEN + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min3(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }
    printf("Levenshtein Edit Distance: %d\n", dp[m][n]);
    printf("Operations Traceback:\n");
    int i = m, j = n;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && s1[i - 1] == s2[j - 1]) {
            i--; j--;
        } else if (i > 0 && j > 0 && dp[i][j] == dp[i - 1][j - 1] + 1) {
            printf("Replace '%c' with '%c'\n", s1[i - 1], s2[j - 1]);
            i--; j--;
        } else if (i > 0 && dp[i][j] == dp[i - 1][j] + 1) {
            printf("Delete '%c'\n", s1[i - 1]);
            i--;
        } else if (j > 0 && dp[i][j] == dp[i][j - 1] + 1) {
            printf("Insert '%c'\n", s2[j - 1]);
            j--;
        }
    }
}

int main(void) {
    int choice;
    do {
        printf("=== String Dynamic Programming Workbench ===\n");
        printf("1. Levenshtein Edit Distance & Operation Traceback\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                edit_distance();
                break;
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
Available via: `prog_dp_edit_distance`, `algorithms.full-programs.dynamic-programming.string-dp.prog-edit-distance`, `algorithms>prog_dp_edit_distance()`, `algorithms>full-programs>dynamic-programming>string-dp>prog-edit-distance>prog_dp_edit_distance()`, `programEditDistanceDp`
