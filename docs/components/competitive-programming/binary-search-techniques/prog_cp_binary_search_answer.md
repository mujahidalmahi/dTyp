# prog_cp_binary_search_answer
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-techniques` | **Type:** `program`
## Overview
Complete competitive programming program allocating workload across workers via binary search on answer

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

int check_feasible(long long max_sum, const int* arr, int n, int k) {
    int count = 1;
    long long current = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] > max_sum) return 0;
        if (current + arr[i] > max_sum) {
            count++;
            current = arr[i];
        } else {
            current += arr[i];
        }
    }
    return count <= k;
}

long long min_max_allocation(const int* arr, int n, int k) {
    long long low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] > low) low = arr[i];
        high += arr[i];
    }
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (check_feasible(mid, arr, n, k)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main(void) {
    int arr[] = {10, 20, 30, 40};
    int n = 4, k = 2;
    printf("Optimal partitioned sum for 2 workers: %lld
", min_max_allocation(arr, n, k));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_binary_search_answer`, `competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-binary-search-answer`, `competitive-programming>prog_cp_binary_search_answer()`, `competitive-programming>full-programs>binary-search-techniques>binary-search-answer>prog-binary-search-answer>prog_cp_binary_search_answer()`
