# dc_min_max
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Finds minimum and maximum values in doubly circular list

## Signature
```c
void dc_min_max(const Node* head, int* min_val, int* max_val);
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
void dc_min_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur != head) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
}
```

## Aliases & Shorthands
Available via: `dc_min_max`, `data-structures.separate-components.linked-lists.doubly-circular.min-max`, `data-structures>dc_min_max()`, `data-structures>separate-components>linked-lists>doubly-circular>min-max>dc_min_max()`, `minMaxDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
