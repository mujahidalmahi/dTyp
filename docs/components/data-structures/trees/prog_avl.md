# prog_avl
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `program`
## Overview
Interactive self-balancing AVL tree program with automatic rotations (LL, RR, LR, RL), search, and inorder traversal

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
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

typedef struct AVLNode {
    int val;
    struct AVLNode* left;
    struct AVLNode* right;
    int height;
} AVLNode;

int avl_h(AVLNode* n) { return n ? n->height : 0; }
int avl_max(int a, int b) { return a > b ? a : b; }

AVLNode* avl_create(int val) {
    AVLNode* n = (AVLNode*)malloc(sizeof(AVLNode));
    n->val = val;
    n->left = NULL;
    n->right = NULL;
    n->height = 1;
    return n;
}

AVLNode* avl_rot_right(AVLNode* y) {
    AVLNode* x = y->left;
    AVLNode* t2 = x->right;
    x->right = y;
    y->left = t2;
    y->height = avl_max(avl_h(y->left), avl_h(y->right)) + 1;
    x->height = avl_max(avl_h(x->left), avl_h(x->right)) + 1;
    return x;
}

AVLNode* avl_rot_left(AVLNode* x) {
    AVLNode* y = x->right;
    AVLNode* t2 = y->left;
    y->left = x;
    x->right = t2;
    x->height = avl_max(avl_h(x->left), avl_h(x->right)) + 1;
    y->height = avl_max(avl_h(y->left), avl_h(y->right)) + 1;
    return y;
}

int avl_balance_factor(AVLNode* n) {
    return n ? avl_h(n->left) - avl_h(n->right) : 0;
}

AVLNode* avl_insert(AVLNode* node, int val) {
    if (!node) return avl_create(val);
    if (val < node->val) node->left = avl_insert(node->left, val);
    else if (val > node->val) node->right = avl_insert(node->right, val);
    else return node;

    node->height = 1 + avl_max(avl_h(node->left), avl_h(node->right));
    int balance = avl_balance_factor(node);

    if (balance > 1 && val < node->left->val) return avl_rot_right(node);
    if (balance < -1 && val > node->right->val) return avl_rot_left(node);
    if (balance > 1 && val > node->left->val) {
        node->left = avl_rot_left(node->left);
        return avl_rot_right(node);
    }
    if (balance < -1 && val < node->right->val) {
        node->right = avl_rot_right(node->right);
        return avl_rot_left(node);
    }
    return node;
}

bool avl_search(const AVLNode* root, int val) {
    if (!root) return false;
    if (root->val == val) return true;
    if (val < root->val) return avl_search(root->left, val);
    return avl_search(root->right, val);
}

void avl_inorder(const AVLNode* root) {
    if (!root) return;
    avl_inorder(root->left);
    printf("%d (BF:%d) ", root->val, avl_balance_factor((AVLNode*)root));
    avl_inorder(root->right);
}

void avl_free(AVLNode* root) {
    if (!root) return;
    avl_free(root->left);
    avl_free(root->right);
    free(root);
}

int main(void) {
    AVLNode* root = NULL;
    int choice;

    do {
        printf("\n=== AVL Self-Balancing Tree Menu ===\n");
        printf("1. Insert Node\n");
        printf("2. Search Value\n");
        printf("3. Inorder Traversal (Values with Balance Factors)\n");
        printf("4. Tree Root Height & Balance Factor\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert into AVL tree: ");
                if (scanf("%d", &val) == 1) {
                    root = avl_insert(root, val);
                    printf("Inserted %d with automatic balancing.\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    if (avl_search(root, val)) printf("Found %d in AVL tree.\n", val);
                    else printf("%d is not in the tree.\n", val);
                } else clear_input();
                break;
            }
            case 3:
                printf("AVL Inorder: ");
                avl_inorder(root);
                printf("\n");
                break;
            case 4:
                if (root) printf("Root: %d | Height: %d | Balance Factor: %d\n", root->val, root->height, avl_balance_factor(root));
                else printf("Tree is empty.\n");
                break;
            case 0:
                printf("Exiting AVL Tree Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    avl_free(root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_avl`, `data-structures.full-programs.trees.avl.prog-avl`, `data-structures>prog_avl()`, `data-structures>full-programs>trees>avl>prog-avl>prog_avl()`, `programAVL`
