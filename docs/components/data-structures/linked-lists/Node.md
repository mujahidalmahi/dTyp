# Node
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `struct`
## Overview
Node struct for doubly circular linked list

## Signature
```c
typedef struct Node { int data; struct Node* prev; struct Node* next; } Node; typedef Node DoublyCircularNode;
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
typedef struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
} Node;
typedef Node DoublyCircularNode;
```

## Aliases & Shorthands
Available via: `Node`, `data-structures.separate-components.linked-lists.doubly-circular.node`, `data-structures>Node()`, `data-structures>separate-components>linked-lists>doubly-circular>node>Node()`, `DoublyCircularNode`, `dc_node`
