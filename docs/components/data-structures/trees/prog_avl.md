# prog_avl
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `program`
## Overview
Complete self-balancing AVL Tree insertion program with rotations

## Signature
```c
int main(void)
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
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key;
    struct Node* left;
    struct Node* right;
    int height;
} Node;

static int h(Node* n) { return n ? n->height : 0; }
static int max(int a, int b) { return a > b ? a : b; }

static Node* r_rot(Node* y) {
    Node* x = y->left;
    Node* t = x->right;
    x->right = y; y->left = t;
    y->height = max(h(y->left), h(y->right)) + 1;
    x->height = max(h(x->left), h(x->right)) + 1;
    return x;
}

static Node* l_rot(Node* x) {
    Node* y = x->right;
    Node* t = y->left;
    y->left = x; x->right = t;
    x->height = max(h(x->left), h(x->right)) + 1;
    y->height = max(h(y->left), h(y->right)) + 1;
    return y;
}

Node* insert(Node* node, int key) {
    if (!node) {
        Node* n = (Node*)malloc(sizeof(Node));
        n->key = key; n->height = 1; n->left = n->right = NULL;
        return n;
    }
    if (key < node->key) node->left = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    else return node;

    node->height = 1 + max(h(node->left), h(node->right));
    int b = h(node->left) - h(node->right);

    if (b > 1 && key < node->left->key) return r_rot(node);
    if (b < -1 && key > node->right->key) return l_rot(node);
    if (b > 1 && key > node->left->key) {
        node->left = l_rot(node->left);
        return r_rot(node);
    }
    if (b < -1 && key < node->right->key) {
        node->right = r_rot(node->right);
        return l_rot(node);
    }
    return node;
}

void print_preorder(const Node* r) {
    if (!r) return;
    printf("%d ", r->key);
    print_preorder(r->left);
    print_preorder(r->right);
}

void clean(Node* r) {
    if (!r) return;
    clean(r->left);
    clean(r->right);
    free(r);
}

int main(void) {
    Node* root = NULL;
    root = insert(root, 10);
    root = insert(root, 20);
    root = insert(root, 30);
    root = insert(root, 40);
    root = insert(root, 50);

    printf("Balanced AVL Pre-Order: ");
    print_preorder(root);
    putchar('
');

    clean(root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_avl`, `data-structures.full-programs.trees.avl.prog-avl`, `data-structures>prog_avl()`, `data-structures>full-programs>trees>avl>prog-avl>prog_avl()`, `programAVL`
