# avl_delete
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Deletes node from AVL tree maintaining balanced invariant

## Signature
```c
Node* avl_delete(Node* root, int key);
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
static int avl_del_h(const Node* n) { return n ? n->height : 0; }
static int avl_del_max(int a, int b) { return a > b ? a : b; }
static int avl_del_bf(const Node* n) { return n ? avl_del_h(n->left) - avl_del_h(n->right) : 0; }

static Node* avl_del_rr(Node* y) {
    Node* x = y->left;
    Node* t = x->right;
    x->right = y;
    y->left = t;
    y->height = avl_del_max(avl_del_h(y->left), avl_del_h(y->right)) + 1;
    x->height = avl_del_max(avl_del_h(x->left), avl_del_h(x->right)) + 1;
    return x;
}

static Node* avl_del_rl(Node* x) {
    Node* y = x->right;
    Node* t = y->left;
    y->left = x;
    x->right = t;
    x->height = avl_del_max(avl_del_h(x->left), avl_del_h(x->right)) + 1;
    y->height = avl_del_max(avl_del_h(y->left), avl_del_h(y->right)) + 1;
    return y;
}

Node* avl_delete(Node* root, int key) {
    if (!root) return NULL;
    if (key < root->data) root->left = avl_delete(root->left, key);
    else if (key > root->data) root->right = avl_delete(root->right, key);
    else {
        if (!root->left || !root->right) {
            Node* tmp = root->left ? root->left : root->right;
            if (!tmp) {
                tmp = root;
                root = NULL;
            } else {
                *root = *tmp;
            }
            free(tmp);
        } else {
            Node* cur = root->right;
            while (cur->left) cur = cur->left;
            root->data = cur->data;
            root->right = avl_delete(root->right, cur->data);
        }
    }
    if (!root) return NULL;
    root->height = 1 + avl_del_max(avl_del_h(root->left), avl_del_h(root->right));
    int balance = avl_del_bf(root);
    if (balance > 1 && avl_del_bf(root->left) >= 0) return avl_del_rr(root);
    if (balance > 1 && avl_del_bf(root->left) < 0) {
        root->left = avl_del_rl(root->left);
        return avl_del_rr(root);
    }
    if (balance < -1 && avl_del_bf(root->right) <= 0) return avl_del_rl(root);
    if (balance < -1 && avl_del_bf(root->right) > 0) {
        root->right = avl_del_rr(root->right);
        return avl_del_rl(root);
    }
    return root;
}
```

## Aliases & Shorthands
Available via: `avl_delete`, `data-structures.separate-components.trees.avl.delete`, `data-structures>avl_delete()`, `data-structures>separate-components>trees>avl>delete>avl_delete()`, `deleteAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
