# cp_binary_search_answer_min
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-techniques` | **Type:** `function`
## Overview
Finds minimum integer value in [low, high] satisfying monotonic predicate

## Signature
```c
long long cp_binary_search_answer_min(long long low, long long high, int (*predicate)(long long, void*), void* context);
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
long long cp_binary_search_answer_min(long long low, long long high, int (*predicate)(long long, void*), void* context) {
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (predicate(mid, context)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}
```

## Aliases & Shorthands
Available via: `cp_binary_search_answer_min`, `competitive-programming.programming-technics.binary-search-techniques.binary-search-answer.min`, `competitive-programming>cp_binary_search_answer_min()`, `competitive-programming>programming-technics>binary-search-techniques>binary-search-answer>min>cp_binary_search_answer_min()`, `bsAnswerMin`
