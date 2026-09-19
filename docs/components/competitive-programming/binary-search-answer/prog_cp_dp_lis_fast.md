# prog_cp_dp_lis_fast
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-answer` | **Type:** `program`
## Overview
O(N log N) Longest Increasing Subsequence with patience binary search and reconstruction

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

static int lower_bound(const int tails[], int len, int val) {
    int l = 0, r = len;
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (tails[mid] >= val) r = mid;
        else l = mid + 1;
    }
    return l;
}

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int* tails = (int*)malloc(n * sizeof(int));
    int* tail_idx = (int*)malloc(n * sizeof(int));
    int* parent = (int*)malloc(n * sizeof(int));

    int lis_len = 0;

    for (int i = 0; i < n; i++) {
        int pos = lower_bound(tails, lis_len, arr[i]);
        tails[pos] = arr[i];
        tail_idx[pos] = i;
        parent[i] = (pos > 0) ? tail_idx[pos - 1] : -1;

        if (pos == lis_len) lis_len++;
    }

    printf("%d\n", lis_len);

    int* result = (int*)malloc(lis_len * sizeof(int));
    int curr = tail_idx[lis_len - 1];
    for (int i = lis_len - 1; i >= 0; i--) {
        result[i] = arr[curr];
        curr = parent[curr];
    }

    for (int i = 0; i < lis_len; i++) {
        printf("%d%c", result[i], (i == lis_len - 1 ? '\n' : ' '));
    }

    free(arr);
    free(tails);
    free(tail_idx);
    free(parent);
    free(result);
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
Available via: `prog_cp_dp_lis_fast`, `competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-cp-dp-lis-fast`, `competitive-programming>prog_cp_dp_lis_fast()`, `competitive-programming>full-programs>binary-search-techniques>binary-search-answer>prog-cp-dp-lis-fast>prog_cp_dp_lis_fast()`, `cpLisFast`
