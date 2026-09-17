# cp_binary_search_answer_max
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-techniques` | **Type:** `function`
## Overview
Finds maximum integer value in [low, high] satisfying monotonic predicate

## Signature
```c
long long cp_binary_search_answer_max(long long low, long long high, int (*predicate)(long long, void*), void* context);
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
long long cp_binary_search_answer_max(long long low, long long high, int (*predicate)(long long, void*), void* context) {
    long long ans = low;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (predicate(mid, context)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}
```

## Aliases & Shorthands
Available via: `cp_binary_search_answer_max`, `competitive-programming.programming-technics.binary-search-techniques.binary-search-answer.max`, `competitive-programming>cp_binary_search_answer_max()`, `competitive-programming>programming-technics>binary-search-techniques>binary-search-answer>max>cp_binary_search_answer_max()`, `bsAnswerMax`
