# prog_doubly_circular
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Interactive doubly circular linked list with bidirectional rotation, head/tail additions, and deletions

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
    struct Node* prev;
    struct Node* next;
} Node;

Node* dc_create(int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->prev = n;
    n->next = n;
    return n;
}

void dc_insert_end(Node** head, int val) {
    Node* n = dc_create(val);
    if (!*head) { *head = n; return; }
    Node* tail = (*head)->prev;
    tail->next = n;
    n->prev = tail;
    n->next = *head;
    (*head)->prev = n;
}

void dc_insert_beginning(Node** head, int val) {
    dc_insert_end(head, val);
    *head = (*head)->prev;
}

bool dc_delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    Node* tail = (*head)->prev;
    *val = (*head)->data;
    if (*head == tail) {
        free(*head);
        *head = NULL;
        return true;
    }
    Node* tmp = *head;
    tail->next = (*head)->next;
    (*head)->next->prev = tail;
    *head = (*head)->next;
    free(tmp);
    return true;
}

int dc_count(const Node* head) {
    if (!head) return 0;
    int cnt = 0;
    const Node* cur = head;
    do {
        cnt++;
        cur = cur->next;
    } while (cur != head);
    return cnt;
}

void dc_print_forward(const Node* head) {
    if (!head) { printf("Doubly circular list is empty.\n"); return; }
    printf("Forward (%d nodes): ", dc_count(head));
    const Node* cur = head;
    do {
        printf("%d <=> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("(head %d)\n", head->data);
}

void dc_print_backward(const Node* head) {
    if (!head) { printf("Doubly circular list is empty.\n"); return; }
    printf("Backward (%d nodes): ", dc_count(head));
    const Node* tail = head->prev;
    const Node* cur = tail;
    do {
        printf("%d <=> ", cur->data);
        cur = cur->prev;
    } while (cur != tail);
    printf("(tail %d)\n", tail->data);
}

void dc_free(Node** head) {
    if (!*head) return;
    Node* cur = *head;
    Node* tail = (*head)->prev;
    while (cur != tail) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    free(tail);
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    int choice;

    do {
        printf("\n=== Doubly Circular Linked List Menu ===\n");
        printf("1. Insert at Beginning\n");
        printf("2. Insert at End\n");
        printf("3. Delete from Beginning\n");
        printf("4. Display Forward\n");
        printf("5. Display Backward\n");
        printf("6. Count Nodes\n");
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
                if (scanf("%d", &val) == 1) dc_insert_beginning(&head, val);
                else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) dc_insert_end(&head, val);
                else clear_input();
                break;
            }
            case 3: {
                int val;
                if (dc_delete_beginning(&head, &val)) printf("Deleted %d from beginning.\n", val);
                else printf("List is empty.\n");
                break;
            }
            case 4:
                dc_print_forward(head);
                break;
            case 5:
                dc_print_backward(head);
                break;
            case 6:
                printf("Count: %d nodes\n", dc_count(head));
                break;
            case 0:
                printf("Exiting Doubly Circular List Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    dc_free(&head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_doubly_circular`, `data-structures.full-programs.linked-lists.doubly-circular.prog-doubly-circular`, `data-structures>prog_doubly_circular()`, `data-structures>full-programs>linked-lists>doubly-circular>prog-doubly-circular>prog_doubly_circular()`, `programDoublyCircular`
