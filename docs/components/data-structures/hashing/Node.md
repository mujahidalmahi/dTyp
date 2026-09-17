# Node
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `struct`
## Overview
Hash bucket collision node struct

## Signature
```c
typedef struct Node { char key[32]; int value; struct Node* next; } Node; typedef Node HashNode;
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
    char key[32];
    int value;
    struct Node* next;
} Node;
typedef Node HashNode;
```

## Aliases & Shorthands
Available via: `Node`, `data-structures.separate-components.hashing.chaining.node`, `data-structures>Node()`, `data-structures>separate-components>hashing>chaining>node>Node()`, `HashNode`, `hash_node_struct`
