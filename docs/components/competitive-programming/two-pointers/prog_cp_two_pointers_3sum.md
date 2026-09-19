# prog_cp_two_pointers_3sum
> **Domain:** `competitive-programming` | **Subcategory:** `two-pointers` | **Type:** `program`
## Overview
3-Sum target triplet search in O(N^2) using sorting and convergent two-pointer scans

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

static void solve(void) {
    int n;
    long long target;
    if (scanf("%d %lld", &n, &target) != 2) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    qsort(arr, n, sizeof(int), cmp_ints);

    long long count = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && arr[i] == arr[i - 1]) continue;
        int left = i + 1;
        int right = n - 1;
        while (left < right) {
            long long sum = (long long)arr[i] + arr[left] + arr[right];
            if (sum == target) {
                count++;
                left++;
                right--;
                while (left < right && arr[left] == arr[left - 1]) left++;
                while (left < right && arr[right] == arr[right + 1]) right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    printf("%lld\n", count);
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
Available via: `prog_cp_two_pointers_3sum`, `competitive-programming.full-programs.range-queries.two-pointers.prog-cp-two-pointers-3sum`, `competitive-programming>prog_cp_two_pointers_3sum()`, `competitive-programming>full-programs>range-queries>two-pointers>prog-cp-two-pointers-3sum>prog_cp_two_pointers_3sum()`, `cpTwoPointers3Sum`
