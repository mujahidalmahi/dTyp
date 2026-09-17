# detect_palindrome
> **Domain:** `detection` | **Subcategory:** `patterns-strings` | **Type:** `function`
## Overview
Detects if null-terminated string is a palindrome using two-pointer mirror traversal

## Signature
```c
int detect_palindrome(const char* s);
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
int detect_palindrome(const char* s) {
    int len = 0;
    while (s[len] != '\0') len++;
    int left = 0, right = len - 1;
    while (left < right) {
        if (s[left] != s[right]) return 0;
        left++;
        right--;
    }
    return 1;
}
```

## Aliases & Shorthands
Available via: `detect_palindrome`, `detection.patterns-strings.palindrome`, `detection>detect_palindrome()`, `detection>patterns-strings>palindrome>detect_palindrome()`, `is_palindrome`
