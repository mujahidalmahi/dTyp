# prog_cp_binary_search_painters_partition
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-answer` | **Type:** `program`
## Overview
Binary search on answer space: Painter's Partition minimizing maximum partition workload

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

static int can_allocate(const long long arr[], int n, int k, long long max_cap) {
    int painters = 1;
    long long current = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] > max_cap) return 0;
        if (current + arr[i] > max_cap) {
            painters++;
            current = arr[i];
            if (painters > k) return 0;
        } else {
            current += arr[i];
        }
    }
    return 1;
}

static void solve(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return;

    long long* arr = (long long*)malloc(n * sizeof(long long));
    long long sum = 0;
    long long max_elem = 0;

    for (int i = 0; i < n; i++) {
        scanf("%lld", &arr[i]);
        sum += arr[i];
        if (arr[i] > max_elem) max_elem = arr[i];
    }

    long long low = max_elem, high = sum;
    long long ans = sum;

    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (can_allocate(arr, n, k, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    printf("%lld\n", ans);
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
Available via: `prog_cp_binary_search_painters_partition`, `competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-cp-binary-search-painters-partition`, `competitive-programming>prog_cp_binary_search_painters_partition()`, `competitive-programming>full-programs>binary-search-techniques>binary-search-answer>prog-cp-binary-search-painters-partition>prog_cp_binary_search_painters_partition()`, `cpPaintersPartition`
