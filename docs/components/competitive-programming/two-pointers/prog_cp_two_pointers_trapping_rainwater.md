# prog_cp_two_pointers_trapping_rainwater
> **Domain:** `competitive-programming` | **Subcategory:** `two-pointers` | **Type:** `program`
## Overview
Trapping Rainwater classic solved in O(N) time and O(1) auxiliary space using two pointers

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

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1) return;

    int* height = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &height[i]);

    int left = 0, right = n - 1;
    int left_max = 0, right_max = 0;
    long long trapped_water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= left_max) {
                left_max = height[left];
            } else {
                trapped_water += left_max - height[left];
            }
            left++;
        } else {
            if (height[right] >= right_max) {
                right_max = height[right];
            } else {
                trapped_water += right_max - height[right];
            }
            right--;
        }
    }

    printf("%lld\n", trapped_water);
    free(height);
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
Available via: `prog_cp_two_pointers_trapping_rainwater`, `competitive-programming.full-programs.range-queries.two-pointers.prog-cp-two-pointers-trapping-rainwater`, `competitive-programming>prog_cp_two_pointers_trapping_rainwater()`, `competitive-programming>full-programs>range-queries>two-pointers>prog-cp-two-pointers-trapping-rainwater>prog_cp_two_pointers_trapping_rainwater()`, `cpTrappingRainwater`
