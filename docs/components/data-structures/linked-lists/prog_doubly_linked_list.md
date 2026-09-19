# prog_doubly_linked_list
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Interactive doubly linked list program with bidirectional traversals, positional insertions/deletions, reversing, and node counting

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

Node* d_create(int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->prev = NULL;
    n->next = NULL;
    return n;
}

void d_insert_beginning(Node** head, int val) {
    Node* n = d_create(val);
    if (*head) (*head)->prev = n;
    n->next = *head;
    *head = n;
}

void d_insert_end(Node** head, int val) {
    Node* n = d_create(val);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = n;
    n->prev = cur;
}

bool d_insert_at_position(Node** head, int pos, int val) {
    if (pos < 1) return false;
    if (pos == 1) {
        d_insert_beginning(head, val);
        return true;
    }
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) cur = cur->next;
    if (!cur) return false;
    Node* n = d_create(val);
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
    return true;
}

bool d_delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    Node* tmp = *head;
    *val = tmp->data;
    *head = (*head)->next;
    if (*head) (*head)->prev = NULL;
    free(tmp);
    return true;
}

bool d_delete_end(Node** head, int* val) {
    if (!*head) return false;
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    *val = cur->data;
    if (cur->prev) cur->prev->next = NULL;
    else *head = NULL;
    free(cur);
    return true;
}

bool d_delete_by_value(Node** head, int val) {
    if (!*head) return false;
    Node* cur = *head;
    while (cur && cur->data != val) cur = cur->next;
    if (!cur) return false;
    if (cur->prev) cur->prev->next = cur->next;
    else *head = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return true;
}

void d_reverse(Node** head) {
    Node* temp = NULL;
    Node* current = *head;
    while (current) {
        temp = current->prev;
        current->prev = current->next;
        current->next = temp;
        current = current->prev;
    }
    if (temp) *head = temp->prev;
}

int d_count(const Node* head) {
    int cnt = 0;
    const Node* cur = head;
    while (cur) { cnt++; cur = cur->next; }
    return cnt;
}

void d_print_forward(const Node* head) {
    if (!head) { printf("Doubly list is empty.\n"); return; }
    printf("Forward  (%d nodes): ", d_count(head));
    const Node* cur = head;
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\n");
}

void d_print_backward(const Node* head) {
    if (!head) { printf("Doubly list is empty.\n"); return; }
    const Node* cur = head;
    while (cur->next) cur = cur->next;
    printf("Backward (%d nodes): ", d_count(head));
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->prev;
    }
    printf("NULL\n");
}

void d_free(Node** head) {
    Node* cur = *head;
    while (cur) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    int choice;

    do {
        printf("\n=== Doubly Linked List Operations Menu ===\n");
        printf("1.  Insert at Beginning\n");
        printf("2.  Insert at End\n");
        printf("3.  Insert at Position (1-based)\n");
        printf("4.  Delete from Beginning\n");
        printf("5.  Delete from End\n");
        printf("6.  Delete by Value\n");
        printf("7.  Display Forward\n");
        printf("8.  Display Backward\n");
        printf("9.  Reverse Doubly List\n");
        printf("10. Count Nodes\n");
        printf("0.  Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) d_insert_beginning(&head, val);
                else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) d_insert_end(&head, val);
                else clear_input();
                break;
            }
            case 3: {
                int pos, val;
                printf("Enter position and value: ");
                if (scanf("%d %d", &pos, &val) == 2) {
                    if (!d_insert_at_position(&head, pos, val)) printf("Invalid position.\n");
                } else clear_input();
                break;
            }
            case 4: {
                int val;
                if (d_delete_beginning(&head, &val)) printf("Deleted %d from beginning.\n", val);
                else printf("List is empty.\n");
                break;
            }
            case 5: {
                int val;
                if (d_delete_end(&head, &val)) printf("Deleted %d from end.\n", val);
                else printf("List is empty.\n");
                break;
            }
            case 6: {
                int val;
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (d_delete_by_value(&head, val)) printf("Deleted %d.\n", val);
                    else printf("Value not found.\n");
                } else clear_input();
                break;
            }
            case 7:
                d_print_forward(head);
                break;
            case 8:
                d_print_backward(head);
                break;
            case 9:
                d_reverse(&head);
                printf("Reversed list successfully.\n");
                d_print_forward(head);
                break;
            case 10:
                printf("Count: %d nodes\n", d_count(head));
                break;
            case 0:
                printf("Exiting Doubly Linked List Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    d_free(&head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_doubly_linked_list`, `data-structures.full-programs.linked-lists.doubly.prog-doubly-list`, `data-structures>prog_doubly_linked_list()`, `data-structures>full-programs>linked-lists>doubly>prog-doubly-list>prog_doubly_linked_list()`, `programDoublyList`
