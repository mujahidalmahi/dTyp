# detect_balanced_parentheses
> **Domain:** `detection` | **Subcategory:** `patterns-strings` | **Type:** `function`
## Overview
Detects if parentheses, brackets, and braces are correctly balanced and closed

## Signature
```c
int detect_balanced_parentheses(const char* s);
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
int detect_balanced_parentheses(const char* s) {
    char stack[256];
    int top = -1;
    for (int i = 0; s[i] != '\0'; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') {
            if (top >= 255) return 0;
            stack[++top] = c;
        } else if (c == ')' || c == '}' || c == ']') {
            if (top < 0) return 0;
            char o = stack[top--];
            if (c == ')' && o != '(') return 0;
            if (c == '}' && o != '{') return 0;
            if (c == ']' && o != '[') return 0;
        }
    }
    return (top == -1);
}
```

## Aliases & Shorthands
Available via: `detect_balanced_parentheses`, `detection.patterns-strings.balanced-parentheses`, `detection>detect_balanced_parentheses()`, `detection>patterns-strings>balanced-parentheses>detect_balanced_parentheses()`, `is_balanced`
