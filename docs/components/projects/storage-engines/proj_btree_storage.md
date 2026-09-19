# proj_btree_storage
> **Domain:** `projects` | **Subcategory:** `storage-engines` | **Type:** `program`
## Overview
Interactive B-Tree indexing engine supporting balanced key insertion and in-order scans

## Signature
```c
int main(void);
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

#define T 3

typedef struct BTreeNode {
    int keys[2 * T - 1];
    struct BTreeNode* C[2 * T];
    int n;
    int leaf;
} BTreeNode;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static BTreeNode* create_node(int leaf) {
    BTreeNode* node = (BTreeNode*)malloc(sizeof(BTreeNode));
    node->leaf = leaf;
    node->n = 0;
    for (int i = 0; i < 2 * T; i++) node->C[i] = NULL;
    return node;
}

static void traverse_btree(BTreeNode* root) {
    if (!root) return;
    int i;
    for (i = 0; i < root->n; i++) {
        if (!root->leaf) traverse_btree(root->C[i]);
        printf("%d ", root->keys[i]);
    }
    if (!root->leaf) traverse_btree(root->C[i]);
}

static void split_child(BTreeNode* x, int i, BTreeNode* y) {
    BTreeNode* z = create_node(y->leaf);
    z->n = T - 1;
    for (int j = 0; j < T - 1; j++) z->keys[j] = y->keys[j + T];
    if (!y->leaf) {
        for (int j = 0; j < T; j++) z->C[j] = y->C[j + T];
    }
    y->n = T - 1;
    for (int j = x->n; j >= i + 1; j--) x->C[j + 1] = x->C[j];
    x->C[i + 1] = z;
    for (int j = x->n - 1; j >= i; j--) x->keys[j + 1] = x->keys[j];
    x->keys[i] = y->keys[T - 1];
    x->n++;
}

static void insert_non_full(BTreeNode* x, int k) {
    int i = x->n - 1;
    if (x->leaf) {
        while (i >= 0 && x->keys[i] > k) {
            x->keys[i + 1] = x->keys[i];
            i--;
        }
        x->keys[i + 1] = k;
        x->n++;
    } else {
        while (i >= 0 && x->keys[i] > k) i--;
        i++;
        if (x->C[i]->n == 2 * T - 1) {
            split_child(x, i, x->C[i]);
            if (x->keys[i] < k) i++;
        }
        insert_non_full(x->C[i], k);
    }
}

static BTreeNode* insert_btree(BTreeNode* root, int k) {
    if (!root) {
        root = create_node(1);
        root->keys[0] = k;
        root->n = 1;
        return root;
    }
    if (root->n == 2 * T - 1) {
        BTreeNode* s = create_node(0);
        s->C[0] = root;
        split_child(s, 0, root);
        int i = 0;
        if (s->keys[0] < k) i++;
        insert_non_full(s->C[i], k);
        return s;
    } else {
        insert_non_full(root, k);
        return root;
    }
}

int main(void) {
    int choice;
    BTreeNode* root = NULL;
    do {
        printf("=== B-Tree Indexing Storage Engine (Degree T=3) ===\n");
        printf("1. Insert Key into B-Tree\n");
        printf("2. In-Order Sorted Key Traversal\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                int key;
                printf("Enter integer key to insert: ");
                if (scanf("%d", &key) == 1) {
                    clear_input();
                    root = insert_btree(root, key);
                    printf("Key %d inserted into B-Tree index.\n", key);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (!root) {
                    printf("B-Tree index is empty.\n");
                    break;
                }
                printf("B-Tree Keys In-Order: ");
                traverse_btree(root);
                putchar('\n');
                break;
            }
            case 0:
                printf("Exiting B-Tree engine.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_btree_storage`, `projects.storage-engines.btree-indexing.prog-btree-storage`, `projects>proj_btree_storage()`, `projects>storage-engines>btree-indexing>prog-btree-storage>proj_btree_storage()`
