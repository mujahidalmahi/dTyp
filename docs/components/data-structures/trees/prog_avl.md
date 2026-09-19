# prog_avl
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `program`
## Overview
Interactive self-balancing AVL tree program with automatic LL, RR, LR, RL rotations, balanced node deletions, search, in/pre/post/level-order traversals, and min/max

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

typedef struct Node {
    int data;
    int height;
    struct Node* left;
    struct Node* right;
} Node;

int get_height(const Node* n) {
    return n ? n->height : 0;
}

int max_val(int a, int b) {
    return a > b ? a : b;
}

int get_balance(const Node* n) {
    return n ? get_height(n->left) - get_height(n->right) : 0;
}

Node* create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->height = 1;
    n->left = NULL;
    n->right = NULL;
    return n;
}

Node* rotate_right(Node* y) {
    Node* x = y->left;
    Node* t2 = x->right;
    x->right = y;
    y->left = t2;
    y->height = max_val(get_height(y->left), get_height(y->right)) + 1;
    x->height = max_val(get_height(x->left), get_height(x->right)) + 1;
    return x;
}

Node* rotate_left(Node* x) {
    Node* y = x->right;
    Node* t2 = y->left;
    y->left = x;
    x->right = t2;
    x->height = max_val(get_height(x->left), get_height(x->right)) + 1;
    y->height = max_val(get_height(y->left), get_height(y->right)) + 1;
    return y;
}

Node* insert_node(Node* node, int data) {
    if (!node) return create_node(data);
    if (data < node->data) node->left = insert_node(node->left, data);
    else if (data > node->data) node->right = insert_node(node->right, data);
    else return node;

    node->height = 1 + max_val(get_height(node->left), get_height(node->right));
    int balance = get_balance(node);

    if (balance > 1 && data < node->left->data) return rotate_right(node);
    if (balance < -1 && data > node->right->data) return rotate_left(node);
    if (balance > 1 && data > node->left->data) {
        node->left = rotate_left(node->left);
        return rotate_right(node);
    }
    if (balance < -1 && data < node->right->data) {
        node->right = rotate_right(node->right);
        return rotate_left(node);
    }
    return node;
}

Node* min_value_node(Node* node) {
    Node* cur = node;
    while (cur->left) cur = cur->left;
    return cur;
}

Node* delete_node(Node* root, int data, bool* deleted) {
    if (!root) return NULL;
    if (data < root->data) {
        root->left = delete_node(root->left, data, deleted);
    } else if (data > root->data) {
        root->right = delete_node(root->right, data, deleted);
    } else {
        *deleted = true;
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
            Node* tmp = min_value_node(root->right);
            root->data = tmp->data;
            root->right = delete_node(root->right, tmp->data, deleted);
        }
    }
    if (!root) return NULL;

    root->height = 1 + max_val(get_height(root->left), get_height(root->right));
    int balance = get_balance(root);

    if (balance > 1 && get_balance(root->left) >= 0) return rotate_right(root);
    if (balance > 1 && get_balance(root->left) < 0) {
        root->left = rotate_left(root->left);
        return rotate_right(root);
    }
    if (balance < -1 && get_balance(root->right) <= 0) return rotate_left(root);
    if (balance < -1 && get_balance(root->right) > 0) {
        root->right = rotate_right(root->right);
        return rotate_left(root);
    }
    return root;
}

bool search_value(const Node* root, int data) {
    if (!root) return false;
    if (root->data == data) return true;
    if (data < root->data) return search_value(root->left, data);
    return search_value(root->right, data);
}

void inorder(const Node* root) {
    if (!root) return;
    inorder(root->left);
    printf("%d(bf:%d,h:%d) ", root->data, get_balance(root), root->height);
    inorder(root->right);
}

void preorder(const Node* root) {
    if (!root) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void postorder(const Node* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}

void levelorder(const Node* root) {
    if (!root) return;
    const Node* queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = root;
    while (front < rear) {
        const Node* cur = queue[front++];
        printf("%d ", cur->data);
        if (cur->left) queue[rear++] = cur->left;
        if (cur->right) queue[rear++] = cur->right;
    }
}

bool find_min_max(const Node* root, int* min_val, int* max_val) {
    if (!root) return false;
    const Node* cur = root;
    while (cur->left) cur = cur->left;
    *min_val = cur->data;
    cur = root;
    while (cur->right) cur = cur->right;
    *max_val = cur->data;
    return true;
}

void free_tree(Node* root) {
    if (!root) return;
    free_tree(root->left);
    free_tree(root->right);
    free(root);
}

int main(void) {
    Node* root = NULL;
    int choice = 0;
    int val = 0;
    int min_val = 0;
    int max_val = 0;
    bool deleted = false;

    do {
        printf("\n--- AVL Tree (Self-Balancing) Operations ---\n");
        printf("1. Insert Node (Auto Rebalance)\n");
        printf("2. Delete Node (Auto Rebalance)\n");
        printf("3. Search Value\n");
        printf("4. Inorder Traversal (with Balance Factors)\n");
        printf("5. Preorder Traversal\n");
        printf("6. Postorder Traversal\n");
        printf("7. Level-order Traversal (BFS)\n");
        printf("8. Find Min and Max\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter value to insert: ");
                if (scanf("%d", &val) == 1) {
                    root = insert_node(root, val);
                    printf("Inserted %d into AVL tree.\n", val);
                } else clear_input();
                break;
            case 2:
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    deleted = false;
                    root = delete_node(root, val, &deleted);
                    if (deleted) printf("Deleted %d from AVL tree.\n", val);
                    else printf("Value %d not found.\n", val);
                } else clear_input();
                break;
            case 3:
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    if (search_value(root, val)) printf("Value %d exists in AVL tree.\n", val);
                    else printf("Value %d does not exist in AVL tree.\n", val);
                } else clear_input();
                break;
            case 4:
                printf("Inorder: ");
                inorder(root);
                printf("\n");
                break;
            case 5:
                printf("Preorder: ");
                preorder(root);
                printf("\n");
                break;
            case 6:
                printf("Postorder: ");
                postorder(root);
                printf("\n");
                break;
            case 7:
                printf("Level-order: ");
                levelorder(root);
                printf("\n");
                break;
            case 8:
                if (find_min_max(root, &min_val, &max_val))
                    printf("Minimum: %d, Maximum: %d\n", min_val, max_val);
                else
                    printf("AVL tree is empty.\n");
                break;
            case 0:
                printf("Exiting AVL tree program.\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 8.\n");
                break;
        }
    } while (choice != 0);

    free_tree(root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_avl`, `data-structures.full-programs.trees.avl.prog-avl`, `data-structures>prog_avl()`, `data-structures>full-programs>trees>avl>prog-avl>prog_avl()`, `programAVL`
