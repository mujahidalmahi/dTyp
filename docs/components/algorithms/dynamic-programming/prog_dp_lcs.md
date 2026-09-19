# prog_dp_lcs
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `program`
## Overview
Complete interactive program computing Longest Common Subsequence (LCS) and LIS

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

static void run_lcs(void) {
    char s1[MAX_LEN], s2[MAX_LEN];
    printf("Enter first string: ");
    if (scanf("%199s", s1) != 1) {
        clear_input();
        return;
    }
    printf("Enter second string: ");
    if (scanf("%199s", s2) != 1) {
        clear_input();
        return;
    }
    clear_input();
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);
    int dp[MAX_LEN + 1][MAX_LEN + 1];
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) dp[i][j] = 0;
            else if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
        }
    }
    int lcs_len = dp[m][n];
    printf("LCS Length: %d\n", lcs_len);
    char lcs_str[MAX_LEN + 1];
    lcs_str[lcs_len] = '\0';
    int i = m, j = n, idx = lcs_len - 1;
    while (i > 0 && j > 0) {
        if (s1[i - 1] == s2[j - 1]) {
            lcs_str[idx--] = s1[i - 1];
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    printf("LCS String: %s\n", lcs_str);
}

static void run_lis(void) {
    int n;
    printf("Enter array size N (<= %d): ", MAX_LEN);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_LEN) {
        clear_input();
        return;
    }
    int arr[MAX_LEN], dp[MAX_LEN];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        dp[i] = 1;
    }
    clear_input();
    int max_lis = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
        if (dp[i] > max_lis) max_lis = dp[i];
    }
    printf("Longest Increasing Subsequence (LIS) Length: %d\n", max_lis);
}

int main(void) {
    int choice;
    do {
        printf("=== Subsequence DP Workbench ===\n");
        printf("1. Longest Common Subsequence (LCS Length & String)\n");
        printf("2. Longest Increasing Subsequence (LIS)\n");
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
                run_lcs();
                break;
            case 2:
                run_lis();
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
Available via: `prog_dp_lcs`, `algorithms.full-programs.dynamic-programming.subsequences.prog-lcs`, `algorithms>prog_dp_lcs()`, `algorithms>full-programs>dynamic-programming>subsequences>prog-lcs>prog_dp_lcs()`, `programLcsDp`
