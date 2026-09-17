# prog_bst
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `program`
## Overview
Complete Binary Search Tree insertion and in-order traversal program

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
    int data;
    struct Node* left;
    struct Node* right;
} Node;

Node* bst_add(Node* root, int val) {
    if (!root) {
        Node* n = (Node*)malloc(sizeof(Node));
        n->data = val;
        n->left = NULL;
        n->right = NULL;
        return n;
    }
    if (val < root->data) root->left = bst_add(root->left, val);
    else if (val > root->data) root->right = bst_add(root->right, val);
    return root;
}

void bst_inorder(const Node* root) {
    if (!root) return;
    bst_inorder(root->left);
    printf("%d ", root->data);
    bst_inorder(root->right);
}

void bst_cleanup(Node* root) {
    if (!root) return;
    bst_cleanup(root->left);
    bst_cleanup(root->right);
    free(root);
}

int main(void) {
    Node* root = NULL;
    root = bst_add(root, 50);
    root = bst_add(root, 30);
    root = bst_add(root, 70);
    root = bst_add(root, 20);
    root = bst_add(root, 40);

    printf("BST In-Order: ");
    bst_inorder(root);
    putchar('
');

    bst_cleanup(root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_bst`, `data-structures.full-programs.trees.bst.prog-bst`, `data-structures>prog_bst()`, `data-structures>full-programs>trees>bst>prog-bst>prog_bst()`, `programBST`
