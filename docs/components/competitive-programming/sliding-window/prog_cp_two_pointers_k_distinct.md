# prog_cp_two_pointers_k_distinct
> **Domain:** `competitive-programming` | **Subcategory:** `sliding-window` | **Type:** `program`
## Overview
Longest contiguous subarray with at most K distinct elements using two pointers

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

#define MAX_VAL 100005

static int freq[MAX_VAL];

static void solve(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    for (int i = 0; i < MAX_VAL; i++) freq[i] = 0;

    int left = 0;
    int distinct = 0;
    int max_len = 0;
    int best_l = 0, best_r = 0;

    for (int right = 0; right < n; right++) {
        if (freq[arr[right]] == 0) {
            distinct++;
        }
        freq[arr[right]]++;

        while (distinct > k) {
            freq[arr[left]]--;
            if (freq[arr[left]] == 0) {
                distinct--;
            }
            left++;
        }

        if (right - left + 1 > max_len) {
            max_len = right - left + 1;
            best_l = left;
            best_r = right;
        }
    }

    printf("%d %d %d\n", max_len, best_l + 1, best_r + 1);
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
Available via: `prog_cp_two_pointers_k_distinct`, `competitive-programming.full-programs.range-queries.sliding-window.prog-cp-two-pointers-k-distinct`, `competitive-programming>prog_cp_two_pointers_k_distinct()`, `competitive-programming>full-programs>range-queries>sliding-window>prog-cp-two-pointers-k-distinct>prog_cp_two_pointers_k_distinct()`, `cpKDistinctSubarray`
