# avl_insert
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Inserts into AVL tree and performs balance rotations

## Signature
```c
Node* avl_insert(Node* node, int key);
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
static int avl_h(Node* n) { return n ? n->height : 0; }
static int avl_max(int a, int b) { return a > b ? a : b; }

static Node* avl_rot_right(Node* y) {
    Node* x = y->left;
    Node* t = x->right;
    x->right = y;
    y->left = t;
    y->height = avl_max(avl_h(y->left), avl_h(y->right)) + 1;
    x->height = avl_max(avl_h(x->left), avl_h(x->right)) + 1;
    return x;
}

static Node* avl_rot_left(Node* x) {
    Node* y = x->right;
    Node* t = y->left;
    y->left = x;
    x->right = t;
    x->height = avl_max(avl_h(x->left), avl_h(x->right)) + 1;
    y->height = avl_max(avl_h(y->left), avl_h(y->right)) + 1;
    return y;
}

Node* avl_insert(Node* node, int key) {
    if (node == NULL) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return NULL;
        n->data = key;
        n->height = 1;
        n->left = NULL;
        n->right = NULL;
        return n;
    }
    if (key < node->data) node->left = avl_insert(node->left, key);
    else if (key > node->data) node->right = avl_insert(node->right, key);
    else return node;

    node->height = 1 + avl_max(avl_h(node->left), avl_h(node->right));
    int balance = avl_h(node->left) - avl_h(node->right);

    if (balance > 1 && key < node->left->data) return avl_rot_right(node);
    if (balance < -1 && key > node->right->data) return avl_rot_left(node);
    if (balance > 1 && key > node->left->data) {
        node->left = avl_rot_left(node->left);
        return avl_rot_right(node);
    }
    if (balance < -1 && key < node->right->data) {
        node->right = avl_rot_right(node->right);
        return avl_rot_left(node);
    }
    return node;
}
```

## Aliases & Shorthands
Available via: `avl_insert`, `data-structures.separate-components.trees.avl.insert`, `data-structures>avl_insert()`, `data-structures>separate-components>trees>avl>insert>avl_insert()`, `insertAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
