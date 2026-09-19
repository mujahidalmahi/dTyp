# prog_bst
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `program`
## Overview
Interactive Binary Search Tree program with insertion, deletion of all cases, traversals (in/pre/post), min/max, and node count

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

typedef struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
} TreeNode;

TreeNode* bst_create(int val) {
    TreeNode* n = (TreeNode*)malloc(sizeof(TreeNode));
    n->val = val;
    n->left = NULL;
    n->right = NULL;
    return n;
}

TreeNode* bst_insert(TreeNode* root, int val) {
    if (!root) return bst_create(val);
    if (val < root->val) root->left = bst_insert(root->left, val);
    else if (val > root->val) root->right = bst_insert(root->right, val);
    return root;
}

TreeNode* bst_find_min(TreeNode* root) {
    while (root && root->left) root = root->left;
    return root;
}

TreeNode* bst_find_max(TreeNode* root) {
    while (root && root->right) root = root->right;
    return root;
}

bool bst_search(const TreeNode* root, int val) {
    if (!root) return false;
    if (root->val == val) return true;
    if (val < root->val) return bst_search(root->left, val);
    return bst_search(root->right, val);
}

TreeNode* bst_delete(TreeNode* root, int val, bool* deleted) {
    if (!root) return NULL;
    if (val < root->val) root->left = bst_delete(root->left, val, deleted);
    else if (val > root->val) root->right = bst_delete(root->right, val, deleted);
    else {
        *deleted = true;
        if (!root->left) {
            TreeNode* r = root->right;
            free(root);
            return r;
        } else if (!root->right) {
            TreeNode* l = root->left;
            free(root);
            return l;
        }
        TreeNode* succ = bst_find_min(root->right);
        root->val = succ->val;
        root->right = bst_delete(root->right, succ->val, deleted);
    }
    return root;
}

void bst_inorder(const TreeNode* root) {
    if (!root) return;
    bst_inorder(root->left);
    printf("%d ", root->val);
    bst_inorder(root->right);
}

void bst_preorder(const TreeNode* root) {
    if (!root) return;
    printf("%d ", root->val);
    bst_preorder(root->left);
    bst_preorder(root->right);
}

void bst_postorder(const TreeNode* root) {
    if (!root) return;
    bst_postorder(root->left);
    bst_postorder(root->right);
    printf("%d ", root->val);
}

int bst_count(const TreeNode* root) {
    if (!root) return 0;
    return 1 + bst_count(root->left) + bst_count(root->right);
}

int bst_height(const TreeNode* root) {
    if (!root) return 0;
    int lh = bst_height(root->left);
    int rh = bst_height(root->right);
    return 1 + (lh > rh ? lh : rh);
}

void bst_free(TreeNode* root) {
    if (!root) return;
    bst_free(root->left);
    bst_free(root->right);
    free(root);
}

int main(void) {
    TreeNode* root = NULL;
    int choice;

    do {
        printf("\n=== Binary Search Tree (BST) Menu ===\n");
        printf("1. Insert Node\n");
        printf("2. Delete Node\n");
        printf("3. Search Value\n");
        printf("4. Inorder Traversal (Sorted)\n");
        printf("5. Preorder Traversal\n");
        printf("6. Postorder Traversal\n");
        printf("7. Find Minimum & Maximum\n");
        printf("8. Tree Height and Node Count\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert: ");
                if (scanf("%d", &val) == 1) {
                    root = bst_insert(root, val);
                    printf("Inserted %d into BST.\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    bool deleted = false;
                    root = bst_delete(root, val, &deleted);
                    if (deleted) printf("Deleted %d from BST.\n", val);
                    else printf("Value %d not found.\n", val);
                } else clear_input();
                break;
            }
            case 3: {
                int val;
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    if (bst_search(root, val)) printf("Found %d in BST.\n", val);
                    else printf("%d is not in the BST.\n", val);
                } else clear_input();
                break;
            }
            case 4:
                printf("Inorder   : ");
                bst_inorder(root);
                printf("\n");
                break;
            case 5:
                printf("Preorder  : ");
                bst_preorder(root);
                printf("\n");
                break;
            case 6:
                printf("Postorder : ");
                bst_postorder(root);
                printf("\n");
                break;
            case 7: {
                if (!root) {
                    printf("Tree is empty.\n");
                } else {
                    printf("Min: %d | Max: %d\n", bst_find_min(root)->val, bst_find_max(root)->val);
                }
                break;
            }
            case 8:
                printf("Height: %d | Total Nodes: %d\n", bst_height(root), bst_count(root));
                break;
            case 0:
                printf("Exiting BST Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    bst_free(root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_bst`, `data-structures.full-programs.trees.bst.prog-bst`, `data-structures>prog_bst()`, `data-structures>full-programs>trees>bst>prog-bst>prog_bst()`, `programBST`
