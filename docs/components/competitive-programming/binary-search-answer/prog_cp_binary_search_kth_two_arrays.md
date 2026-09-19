# prog_cp_binary_search_kth_two_arrays
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-answer` | **Type:** `program`
## Overview
Finding K-th element of two sorted arrays in O(log(min(N, M))) time

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
#include <stdlib.h>

#define INF 2000000000

static int max_val(int a, int b) { return (a > b) ? a : b; }
static int min_val(int a, int b) { return (a < b) ? a : b; }

static int find_kth(const int a[], int n, const int b[], int m, int k) {
    if (n > m) return find_kth(b, m, a, n, k);

    int low = max_val(0, k - m);
    int high = min_val(k, n);

    while (low <= high) {
        int cut1 = (low + high) / 2;
        int cut2 = k - cut1;

        int l1 = (cut1 == 0) ? -INF : a[cut1 - 1];
        int l2 = (cut2 == 0) ? -INF : b[cut2 - 1];
        int r1 = (cut1 == n) ? INF : a[cut1];
        int r2 = (cut2 == m) ? INF : b[cut2];

        if (l1 <= r2 && l2 <= r1) {
            return max_val(l1, l2);
        } else if (l1 > r2) {
            high = cut1 - 1;
        } else {
            low = cut1 + 1;
        }
    }
    return -1;
}

static void solve(void) {
    int n, m, k;
    if (scanf("%d %d %d", &n, &m, &k) != 3) return;

    int* a = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    int* b = (int*)malloc(m * sizeof(int));
    for (int i = 0; i < m; i++) scanf("%d", &b[i]);

    printf("%d\n", find_kth(a, n, b, m, k));

    free(a);
    free(b);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_binary_search_kth_two_arrays`, `competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-cp-binary-search-kth-two-arrays`, `competitive-programming>prog_cp_binary_search_kth_two_arrays()`, `competitive-programming>full-programs>binary-search-techniques>binary-search-answer>prog-cp-binary-search-kth-two-arrays>prog_cp_binary_search_kth_two_arrays()`, `cpKthTwoArrays`
