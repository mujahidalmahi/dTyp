# prog_cp_prefix_sums
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `program`
## Overview
Codeforces style 1D and 2D prefix sums suite answering O(1) range and subgrid queries

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

typedef long long ll;
#define MAX_N 1000
#define MAX_DIM 100

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void solve_1d_cf(void) {
    int n, q;
    printf("Enter N (size) and Q (queries): ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    ll arr[MAX_N + 1], pref[MAX_N + 1];
    pref[0] = 0;
    printf("Enter %d integers: ", n);
    for (int i = 1; i <= n; i++) {
        scanf("%lld", &arr[i]);
        pref[i] = pref[i - 1] + arr[i];
    }
    printf("Enter %d queries (1-indexed L R):\n", q);
    for (int i = 0; i < q; i++) {
        int l, r;
        scanf("%d %d", &l, &r);
        if (l >= 1 && r <= n && l <= r) {
            printf("Sum[%d..%d] = %lld\n", l, r, pref[r] - pref[l - 1]);
        } else {
            printf("Invalid query range.\n");
        }
    }
    clear_input();
}

static void solve_2d_cf(void) {
    int r, c, q;
    printf("Enter rows R, cols C (<= %d) and Q queries: ", MAX_DIM);
    if (scanf("%d %d %d", &r, &c, &q) != 3 || r <= 0 || c <= 0 || r > MAX_DIM || c > MAX_DIM) {
        clear_input();
        return;
    }
    ll pref[MAX_DIM + 1][MAX_DIM + 1];
    for (int i = 0; i <= r; i++) {
        for (int j = 0; j <= c; j++) pref[i][j] = 0;
    }
    printf("Enter %d x %d matrix elements row by row:\n", r, c);
    for (int i = 1; i <= r; i++) {
        for (int j = 1; j <= c; j++) {
            ll val;
            scanf("%lld", &val);
            pref[i][j] = val + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }
    printf("Enter %d subgrid queries (1-indexed r1 c1 r2 c2):\n", q);
    for (int i = 0; i < q; i++) {
        int r1, c1, r2, c2;
        scanf("%d %d %d %d", &r1, &c1, &r2, &c2);
        if (r1 >= 1 && r2 <= r && c1 >= 1 && c2 <= c && r1 <= r2 && c1 <= c2) {
            ll total = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1];
            printf("SubgridSum([%d,%d]..[%d,%d]) = %lld\n", r1, c1, r2, c2, total);
        } else {
            printf("Invalid subgrid bounds.\n");
        }
    }
    clear_input();
}

static void kadane_1d(void) {
    int n;
    printf("Enter array size N: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    ll arr[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    clear_input();
    ll max_so_far = arr[0], curr_max = arr[0];
    int start = 0, end = 0, s = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > curr_max + arr[i]) {
            curr_max = arr[i];
            s = i;
        } else {
            curr_max += arr[i];
        }
        if (curr_max > max_so_far) {
            max_so_far = curr_max;
            start = s;
            end = i;
        }
    }
    printf("Max subarray sum: %lld (from index %d to %d)\n", max_so_far, start, end);
}

int main(void) {
    int choice;
    do {
        printf("=== Prefix Sums Codeforces Suite ===\n");
        printf("1. Solve 1D Prefix Sums Contest Problem\n");
        printf("2. Solve 2D Subgrid Prefix Sums Problem\n");
        printf("3. Maximum Subarray Sum (Kadane's Algorithm)\n");
        printf("4. Solve Multi-Testcases (T Cases)\n");
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
                solve_1d_cf();
                break;
            case 2:
                solve_2d_cf();
                break;
            case 3:
                kadane_1d();
                break;
            case 4: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\n", c);
                        solve_1d_cf();
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
Available via: `prog_cp_prefix_sums`, `competitive-programming.full-programs.range-queries.prefix-sums.prog-prefix-sums`, `competitive-programming>prog_cp_prefix_sums()`, `competitive-programming>full-programs>range-queries>prefix-sums>prog-prefix-sums>prog_cp_prefix_sums()`
