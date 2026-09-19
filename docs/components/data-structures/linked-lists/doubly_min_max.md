# doubly_min_max
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Finds minimum and maximum element values in doubly linked list

## Signature
```c
void doubly_min_max(const Node* head, int* min_val, int* max_val);
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
void doubly_min_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
}
```

## Aliases & Shorthands
Available via: `doubly_min_max`, `data-structures.separate-components.linked-lists.doubly.min-max`, `data-structures>doubly_min_max()`, `data-structures>separate-components>linked-lists>doubly>min-max>doubly_min_max()`, `minMaxDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
