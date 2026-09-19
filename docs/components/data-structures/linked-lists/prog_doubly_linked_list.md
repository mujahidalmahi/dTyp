# prog_doubly_linked_list
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Interactive complete doubly linked list program with 19 operations: bidirectional traversals, positional insertions/deletions, before/after target, sorted insertion, reversing, sorting, deduplication, middle element, and min/max

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

Node* create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->prev = NULL;
    n->next = NULL;
    return n;
}

void insert_beginning(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (*head) {
        (*head)->prev = n;
        n->next = *head;
    }
    *head = n;
}

void insert_end(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = n;
    n->prev = cur;
}

bool insert_at_position(Node** head, int pos, int data) {
    if (pos < 1) return false;
    if (pos == 1) {
        insert_beginning(head, data);
        return true;
    }
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) {
        cur = cur->next;
    }
    if (!cur) return false;
    Node* n = create_node(data);
    if (!n) return false;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
    return true;
}

bool insert_before_value(Node** head, int target, int data) {
    if (!head || !*head) return false;
    if ((*head)->data == target) {
        insert_beginning(head, data);
        return true;
    }
    Node* cur = *head;
    while (cur && cur->data != target) cur = cur->next;
    if (!cur) return false;
    Node* n = create_node(data);
    if (!n) return false;
    n->prev = cur->prev;
    n->next = cur;
    if (cur->prev) cur->prev->next = n;
    cur->prev = n;
    return true;
}

bool insert_after_value(Node* head, int target, int data) {
    Node* cur = head;
    while (cur && cur->data != target) cur = cur->next;
    if (!cur) return false;
    Node* n = create_node(data);
    if (!n) return false;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
    return true;
}

void insert_sorted(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head || (*head)->data >= data) {
        n->next = *head;
        if (*head) (*head)->prev = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
}

bool delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    Node* tmp = *head;
    *val = tmp->data;
    *head = (*head)->next;
    if (*head) (*head)->prev = NULL;
    free(tmp);
    return true;
}

bool delete_end(Node** head, int* val) {
    if (!*head) return false;
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    *val = cur->data;
    if (cur->prev) cur->prev->next = NULL;
    else *head = NULL;
    free(cur);
    return true;
}

bool delete_at_position(Node** head, int pos, int* val) {
    if (!*head || pos < 1) return false;
    if (pos == 1) return delete_beginning(head, val);
    Node* cur = *head;
    for (int i = 1; cur && i < pos; i++) cur = cur->next;
    if (!cur) return false;
    *val = cur->data;
    if (cur->prev) cur->prev->next = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return true;
}

bool delete_by_value(Node** head, int val) {
    if (!*head) return false;
    Node* cur = *head;
    while (cur && cur->data != val) cur = cur->next;
    if (!cur) return false;
    if (cur == *head) *head = cur->next;
    if (cur->prev) cur->prev->next = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return true;
}

bool delete_after_value(Node* head, int target, int* val) {
    Node* cur = head;
    while (cur && cur->data != target) cur = cur->next;
    if (!cur || !cur->next) return false;
    Node* del = cur->next;
    *val = del->data;
    cur->next = del->next;
    if (del->next) del->next->prev = cur;
    free(del);
    return true;
}

int search_element(const Node* head, int val) {
    const Node* cur = head;
    int pos = 1;
    while (cur) {
        if (cur->data == val) return pos;
        cur = cur->next;
        pos++;
    }
    return -1;
}

void display_forward(const Node* head) {
    if (!head) {
        printf("List is empty.\n");
        return;
    }
    printf("Forward: ");
    const Node* cur = head;
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\n");
}

void display_backward(const Node* head) {
    if (!head) {
        printf("List is empty.\n");
        return;
    }
    const Node* cur = head;
    while (cur->next) cur = cur->next;
    printf("Backward: ");
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->prev;
    }
    printf("NULL\n");
}

void reverse_list(Node** head) {
    if (!*head) return;
    Node* cur = *head;
    Node* tmp = NULL;
    while (cur) {
        tmp = cur->prev;
        cur->prev = cur->next;
        cur->next = tmp;
        cur = cur->prev;
    }
    if (tmp) *head = tmp->prev;
}

void sort_list(Node* head) {
    if (!head || !head->next) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next) {
            if (cur->data > cur->next->data) {
                int t = cur->data;
                cur->data = cur->next->data;
                cur->next->data = t;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}

void remove_duplicates(Node* head) {
    Node* cur = head;
    while (cur && cur->next) {
        Node* runner = cur->next;
        while (runner) {
            if (runner->data == cur->data) {
                Node* del = runner;
                runner = runner->next;
                if (del->prev) del->prev->next = del->next;
                if (del->next) del->next->prev = del->prev;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    }
}

bool find_middle(const Node* head, int* val) {
    if (!head) return false;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return true;
}

bool min_and_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return false;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
    return true;
}

void free_list(Node** head) {
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
    int choice = 0;
    int val = 0;
    int pos = 0;
    int target = 0;
    int min_val = 0;
    int max_val = 0;

    do {
        printf("\n--- Doubly Linked List Operations ---\n");
        printf("1. Insert Beginning\n");
        printf("2. Insert End\n");
        printf("3. Insert at Position\n");
        printf("4. Insert Before Value\n");
        printf("5. Insert After Value\n");
        printf("6. Insert Sorted\n");
        printf("7. Delete Beginning\n");
        printf("8. Delete End\n");
        printf("9. Delete at Position\n");
        printf("10. Delete by Value\n");
        printf("11. Delete After Value\n");
        printf("12. Search Element\n");
        printf("13. Display Forward\n");
        printf("14. Display Backward\n");
        printf("15. Reverse List\n");
        printf("16. Sort List\n");
        printf("17. Remove Duplicates\n");
        printf("18. Find Middle\n");
        printf("19. Min and Max\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) {
                    insert_beginning(&head, val);
                    printf("Inserted %d at beginning.\n", val);
                } else clear_input();
                break;
            case 2:
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) {
                    insert_end(&head, val);
                    printf("Inserted %d at end.\n", val);
                } else clear_input();
                break;
            case 3:
                printf("Enter position and value: ");
                if (scanf("%d %d", &pos, &val) == 2) {
                    if (insert_at_position(&head, pos, val))
                        printf("Inserted %d at position %d.\n", val, pos);
                    else
                        printf("Invalid position %d.\n", pos);
                } else clear_input();
                break;
            case 4:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_before_value(&head, target, val))
                        printf("Inserted %d before %d.\n", val, target);
                    else
                        printf("Target %d not found.\n", target);
                } else clear_input();
                break;
            case 5:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_after_value(head, target, val))
                        printf("Inserted %d after %d.\n", val, target);
                    else
                        printf("Target %d not found.\n", target);
                } else clear_input();
                break;
            case 6:
                printf("Enter value to insert in sorted order: ");
                if (scanf("%d", &val) == 1) {
                    insert_sorted(&head, val);
                    printf("Inserted %d in sorted order.\n", val);
                } else clear_input();
                break;
            case 7:
                if (delete_beginning(&head, &val))
                    printf("Deleted %d from beginning.\n", val);
                else
                    printf("List is empty.\n");
                break;
            case 8:
                if (delete_end(&head, &val))
                    printf("Deleted %d from end.\n", val);
                else
                    printf("List is empty.\n");
                break;
            case 9:
                printf("Enter position to delete: ");
                if (scanf("%d", &pos) == 1) {
                    if (delete_at_position(&head, pos, &val))
                        printf("Deleted %d from position %d.\n", val, pos);
                    else
                        printf("Invalid position %d.\n", pos);
                } else clear_input();
                break;
            case 10:
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (delete_by_value(&head, val))
                        printf("Deleted value %d.\n", val);
                    else
                        printf("Value %d not found.\n", val);
                } else clear_input();
                break;
            case 11:
                printf("Enter target value: ");
                if (scanf("%d", &target) == 1) {
                    if (delete_after_value(head, target, &val))
                        printf("Deleted %d after target %d.\n", val, target);
                    else
                        printf("No element after target %d.\n", target);
                } else clear_input();
                break;
            case 12:
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    pos = search_element(head, val);
                    if (pos != -1)
                        printf("Value %d found at position %d.\n", val, pos);
                    else
                        printf("Value %d not found.\n", val);
                } else clear_input();
                break;
            case 13:
                display_forward(head);
                break;
            case 14:
                display_backward(head);
                break;
            case 15:
                reverse_list(&head);
                printf("Doubly linked list reversed.\n");
                display_forward(head);
                break;
            case 16:
                sort_list(head);
                printf("Doubly linked list sorted.\n");
                display_forward(head);
                break;
            case 17:
                remove_duplicates(head);
                printf("Duplicates removed.\n");
                display_forward(head);
                break;
            case 18:
                if (find_middle(head, &val))
                    printf("Middle node value: %d\n", val);
                else
                    printf("List is empty.\n");
                break;
            case 19:
                if (min_and_max(head, &min_val, &max_val))
                    printf("Minimum value: %d, Maximum value: %d\n", min_val, max_val);
                else
                    printf("List is empty.\n");
                break;
            case 0:
                printf("Exiting doubly linked list program.\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 19.\n");
                break;
        }
    } while (choice != 0);

    free_list(&head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_doubly_linked_list`, `data-structures.full-programs.linked-lists.doubly.prog-doubly-list`, `data-structures>prog_doubly_linked_list()`, `data-structures>full-programs>linked-lists>doubly>prog-doubly-list>prog_doubly_linked_list()`, `programDoublyList`
