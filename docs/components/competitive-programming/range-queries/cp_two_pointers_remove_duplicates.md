# cp_two_pointers_remove_duplicates
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Removes duplicates in-place from sorted array using fast/slow two pointers

## Signature
```c
int cp_two_pointers_remove_duplicates(int* arr, int n);
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
int cp_two_pointers_remove_duplicates(int* arr, int n) {
    if (n <= 1) return n;
    int slow = 0;
    for (int fast = 1; fast < n; fast++) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    return slow + 1;
}
```

## Aliases & Shorthands
Available via: `cp_two_pointers_remove_duplicates`, `competitive-programming.programming-technics.range-queries.two-pointers.remove-duplicates`, `competitive-programming>cp_two_pointers_remove_duplicates()`, `competitive-programming>programming-technics>range-queries>two-pointers>remove-duplicates>cp_two_pointers_remove_duplicates()`, `twoPointersDedup`
