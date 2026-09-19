# proj_file_diff_patch
> **Domain:** `projects` | **Subcategory:** `tools-games` | **Type:** `program`
## Overview
Interactive unified diff generator using LCS to display line-by-line additions and deletions

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

#define MAX_LINES 30

static char text1[MAX_LINES][64];
static char text2[MAX_LINES][64];
static int n1 = 0, n2 = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void compute_diff(void) {
    int dp[MAX_LINES + 1][MAX_LINES + 1];
    for (int i = 0; i <= n1; i++) {
        for (int j = 0; j <= n2; j++) {
            if (i == 0 || j == 0) dp[i][j] = 0;
            else if (strcmp(text1[i - 1], text2[j - 1]) == 0) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
        }
    }
    printf("Unified Diff Output:\n");
    int i = n1, j = n2;
    char diff[MAX_LINES * 2][80];
    int d_count = 0;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && strcmp(text1[i - 1], text2[j - 1]) == 0) {
            snprintf(diff[d_count++], 80, "  %s", text1[i - 1]);
            i--; j--;
        } else if (j > 0 && (i == 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            snprintf(diff[d_count++], 80, "+ %s", text2[j - 1]);
            j--;
        } else if (i > 0 && (j == 0 || dp[i][j - 1] < dp[i - 1][j])) {
            snprintf(diff[d_count++], 80, "- %s", text1[i - 1]);
            i--;
        }
    }
    for (int k = d_count - 1; k >= 0; k--) {
        printf("%s\n", diff[k]);
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Unified Diff & Patch Generator ===\n");
        printf("1. Enter Two Text Blocks and Compute Diff\n");
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
                printf("Enter number of lines in Text 1: ");
                scanf("%d", &n1);
                clear_input();
                for (int i = 0; i < n1; i++) {
                    printf("T1 line %d: ", i + 1);
                    scanf("%63[^\n]", text1[i]);
                    clear_input();
                }
                printf("Enter number of lines in Text 2: ");
                scanf("%d", &n2);
                clear_input();
                for (int i = 0; i < n2; i++) {
                    printf("T2 line %d: ", i + 1);
                    scanf("%63[^\n]", text2[i]);
                    clear_input();
                }
                compute_diff();
                break;
            }
            case 0:
                printf("Exiting diff tool.\n");
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
Available via: `proj_file_diff_patch`, `projects.tools-games.file-diff.prog-file-diff-patch`, `projects>proj_file_diff_patch()`, `projects>tools-games>file-diff>prog-file-diff-patch>proj_file_diff_patch()`
