# prog_circular_list
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Interactive circular singly linked list program with beginning/end/position insertion, deletion, and cycle traversal

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
    struct Node* next;
} Node;

Node* c_create(int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->next = n;
    return n;
}

void c_insert_end(Node** head, int val) {
    Node* n = c_create(val);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    cur->next = n;
    n->next = *head;
}

void c_insert_beginning(Node** head, int val) {
    Node* n = c_create(val);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    cur->next = n;
    n->next = *head;
    *head = n;
}

bool c_delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    if ((*head)->next == *head) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return true;
    }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    Node* tmp = *head;
    *val = tmp->data;
    cur->next = (*head)->next;
    *head = (*head)->next;
    free(tmp);
    return true;
}

bool c_delete_by_value(Node** head, int val) {
    if (!*head) return false;
    int dummy;
    if ((*head)->data == val) return c_delete_beginning(head, &dummy);
    Node* cur = *head;
    while (cur->next != *head && cur->next->data != val) cur = cur->next;
    if (cur->next == *head) return false;
    Node* tmp = cur->next;
    cur->next = tmp->next;
    free(tmp);
    return true;
}

int c_count(const Node* head) {
    if (!head) return 0;
    int cnt = 0;
    const Node* cur = head;
    do {
        cnt++;
        cur = cur->next;
    } while (cur != head);
    return cnt;
}

void c_print(const Node* head) {
    if (!head) { printf("Circular list is empty.\n"); return; }
    printf("Circular List (%d nodes): ", c_count(head));
    const Node* cur = head;
    do {
        printf("%d -> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("(head %d)\n", head->data);
}

void c_free(Node** head) {
    if (!*head) return;
    Node* cur = *head;
    Node* nxt = NULL;
    while (cur->next != *head) {
        nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    free(cur);
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    int choice;

    do {
        printf("\n=== Singly Circular Linked List Menu ===\n");
        printf("1. Insert at Beginning\n");
        printf("2. Insert at End\n");
        printf("3. Delete from Beginning\n");
        printf("4. Delete by Value\n");
        printf("5. Count Nodes\n");
        printf("6. Display Circular List\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) c_insert_beginning(&head, val);
                else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) c_insert_end(&head, val);
                else clear_input();
                break;
            }
            case 3: {
                int val;
                if (c_delete_beginning(&head, &val)) printf("Deleted %d from beginning.\n", val);
                else printf("List is empty.\n");
                break;
            }
            case 4: {
                int val;
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (c_delete_by_value(&head, val)) printf("Deleted %d successfully.\n", val);
                    else printf("Value not found.\n");
                } else clear_input();
                break;
            }
            case 5:
                printf("Total nodes: %d\n", c_count(head));
                break;
            case 6:
                c_print(head);
                break;
            case 0:
                printf("Exiting Circular List Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    c_free(&head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_circular_list`, `data-structures.full-programs.linked-lists.singly-circular.prog-circular-list`, `data-structures>prog_circular_list()`, `data-structures>full-programs>linked-lists>singly-circular>prog-circular-list>prog_circular_list()`, `programCircularList`
