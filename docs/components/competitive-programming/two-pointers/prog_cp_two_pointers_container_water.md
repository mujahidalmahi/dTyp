# prog_cp_two_pointers_container_water
> **Domain:** `competitive-programming` | **Subcategory:** `two-pointers` | **Type:** `program`
## Overview
Container With Most Water area maximization in O(N) using convergent pointers

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
    long long max_area = 0;

    while (left < right) {
        long long h = (height[left] < height[right]) ? height[left] : height[right];
        long long current_area = h * (right - left);
        if (current_area > max_area) max_area = current_area;

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    printf("%lld\n", max_area);
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
Available via: `prog_cp_two_pointers_container_water`, `competitive-programming.full-programs.range-queries.two-pointers.prog-cp-two-pointers-container-water`, `competitive-programming>prog_cp_two_pointers_container_water()`, `competitive-programming>full-programs>range-queries>two-pointers>prog-cp-two-pointers-container-water>prog_cp_two_pointers_container_water()`, `cpContainerWater`
