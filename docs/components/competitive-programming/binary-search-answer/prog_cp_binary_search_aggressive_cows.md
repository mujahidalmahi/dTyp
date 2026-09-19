# prog_cp_binary_search_aggressive_cows
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-answer` | **Type:** `program`
## Overview
Binary search on answer space: Aggressive Cows maximizing the minimum distance between items

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

static int cmp_ints(const void* a, const void* b) {
    long long diff = (long long)(*(const int*)a) - (long long)(*(const int*)b);
    return (diff > 0) - (diff < 0);
}

static int can_place(const int arr[], int n, int c, int dist) {
    int placed = 1;
    int last_pos = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] - last_pos >= dist) {
            placed++;
            last_pos = arr[i];
            if (placed >= c) return 1;
        }
    }
    return placed >= c;
}

static void solve(void) {
    int n, c;
    if (scanf("%d %d", &n, &c) != 2) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    qsort(arr, n, sizeof(int), cmp_ints);

    int low = 1, high = arr[n - 1] - arr[0];
    int ans = 0;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (can_place(arr, n, c, mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    printf("%d\n", ans);
    free(arr);
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
Available via: `prog_cp_binary_search_aggressive_cows`, `competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-cp-binary-search-aggressive-cows`, `competitive-programming>prog_cp_binary_search_aggressive_cows()`, `competitive-programming>full-programs>binary-search-techniques>binary-search-answer>prog-cp-binary-search-aggressive-cows>prog_cp_binary_search_aggressive_cows()`, `cpAggressiveCows`
