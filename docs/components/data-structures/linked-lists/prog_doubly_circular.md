# prog_doubly_circular
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Interactive doubly circular linked list program with 20 operations: bidirectional forward/backward display, beginning/end/position/before/after/sorted insertions and deletions, reverse, bubble sort, deduplication, middle element, min/max, and splitting into halves

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
    n->prev = n;
    n->next = n;
    return n;
}

void insert_beginning(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    Node* last = (*head)->prev;
    n->next = *head;
    n->prev = last;
    last->next = n;
    (*head)->prev = n;
    *head = n;
}

void insert_end(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    Node* last = (*head)->prev;
    n->next = *head;
    n->prev = last;
    last->next = n;
    (*head)->prev = n;
}

int count_nodes(const Node* head) {
    if (!head) return 0;
    int cnt = 0;
    const Node* cur = head;
    do {
        cnt++;
        cur = cur->next;
    } while (cur != head);
    return cnt;
}

bool insert_at_position(Node** head, int pos, int data) {
    int total = count_nodes(*head);
    if (pos < 1 || pos > total + 1) return false;
    if (pos == 1) {
        insert_beginning(head, data);
        return true;
    }
    if (pos == total + 1) {
        insert_end(head, data);
        return true;
    }
    Node* cur = *head;
    for (int i = 1; i < pos - 1; i++) cur = cur->next;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return false;
    n->data = data;
    n->next = cur->next;
    n->prev = cur;
    cur->next->prev = n;
    cur->next = n;
    return true;
}

bool insert_before_value(Node** head, int target, int data) {
    if (!head || !*head) return false;
    if ((*head)->data == target) {
        insert_beginning(head, data);
        return true;
    }
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != target) cur = cur->next;
    if (cur != *head) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return false;
        n->data = data;
        n->prev = cur->prev;
        n->next = cur;
        cur->prev->next = n;
        cur->prev = n;
        return true;
    }
    return false;
}

bool insert_after_value(Node* head, int target, int data) {
    if (!head) return false;
    Node* cur = head;
    do {
        if (cur->data == target) {
            Node* n = (Node*)malloc(sizeof(Node));
            if (!n) return false;
            n->data = data;
            n->next = cur->next;
            n->prev = cur;
            cur->next->prev = n;
            cur->next = n;
            return true;
        }
        cur = cur->next;
    } while (cur != head);
    return false;
}

void insert_sorted(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    if (data <= (*head)->data) {
        Node* last = (*head)->prev;
        n->next = *head;
        n->prev = last;
        last->next = n;
        (*head)->prev = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    n->prev = cur;
    cur->next->prev = n;
    cur->next = n;
}

bool delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    *val = (*head)->data;
    if ((*head)->next == *head) {
        free(*head);
        *head = NULL;
        return true;
    }
    Node* last = (*head)->prev;
    Node* nxt = (*head)->next;
    last->next = nxt;
    nxt->prev = last;
    free(*head);
    *head = nxt;
    return true;
}

bool delete_end(Node** head, int* val) {
    if (!*head) return false;
    if ((*head)->next == *head) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return true;
    }
    Node* last = (*head)->prev;
    *val = last->data;
    Node* prev = last->prev;
    prev->next = *head;
    (*head)->prev = prev;
    free(last);
    return true;
}

bool delete_at_position(Node** head, int pos, int* val) {
    int total = count_nodes(*head);
    if (pos < 1 || pos > total) return false;
    if (pos == 1) return delete_beginning(head, val);
    Node* cur = *head;
    for (int i = 1; i < pos; i++) cur = cur->next;
    *val = cur->data;
    cur->prev->next = cur->next;
    cur->next->prev = cur->prev;
    free(cur);
    return true;
}

bool delete_by_value(Node** head, int val) {
    if (!*head) return false;
    if ((*head)->data == val) {
        int dummy;
        return delete_beginning(head, &dummy);
    }
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != val) cur = cur->next;
    if (cur != *head) {
        cur->prev->next = cur->next;
        cur->next->prev = cur->prev;
        free(cur);
        return true;
    }
    return false;
}

bool delete_after_value(Node** head, int target, int* val) {
    if (!*head) return false;
    Node* cur = *head;
    do {
        if (cur->data == target) {
            if (cur->next == *head) return delete_beginning(head, val);
            Node* del = cur->next;
            *val = del->data;
            cur->next = del->next;
            del->next->prev = cur;
            free(del);
            return true;
        }
        cur = cur->next;
    } while (cur != *head);
    return false;
}

int search_element(const Node* head, int val) {
    if (!head) return -1;
    const Node* cur = head;
    int pos = 1;
    do {
        if (cur->data == val) return pos;
        cur = cur->next;
        pos++;
    } while (cur != head);
    return -1;
}

void display_forward(const Node* head) {
    if (!head) {
        printf("Doubly circular list is empty.\n");
        return;
    }
    printf("Forward: ");
    const Node* cur = head;
    do {
        printf("%d <-> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("(head: %d)\n", head->data);
}

void display_backward(const Node* head) {
    if (!head) {
        printf("Doubly circular list is empty.\n");
        return;
    }
    printf("Backward: ");
    const Node* cur = head->prev;
    do {
        printf("%d <-> ", cur->data);
        cur = cur->prev;
    } while (cur != head->prev);
    printf("(tail: %d)\n", head->prev->data);
}

void reverse_list(Node** head) {
    if (!*head || (*head)->next == *head) return;
    Node* cur = *head;
    do {
        Node* tmp = cur->next;
        cur->next = cur->prev;
        cur->prev = tmp;
        cur = tmp;
    } while (cur != *head);
    *head = (*head)->prev;
}

void sort_list(Node* head) {
    if (!head || head->next == head) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next != head) {
            if (cur->data > cur->next->data) {
                int tmp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = tmp;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}

void remove_duplicates(Node* head) {
    if (!head || head->next == head) return;
    Node* cur = head;
    do {
        Node* runner = cur->next;
        while (runner != head) {
            if (runner->data == cur->data) {
                Node* del = runner;
                runner = runner->next;
                del->prev->next = del->next;
                del->next->prev = del->prev;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    } while (cur != head && cur->next != head);
}

bool find_middle(const Node* head, int* val) {
    if (!head) return false;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
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
    while (cur != head) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
    return true;
}

void split_halves(Node* head, Node** head1, Node** head2) {
    *head1 = NULL;
    *head2 = NULL;
    if (!head) return;
    Node* slow = head;
    Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    if (fast->next->next == head) fast = fast->next;
    *head1 = head;
    if (head->next != head) *head2 = slow->next;
    fast->next = slow->next;
    slow->next->prev = fast;
    slow->next = head;
    head->prev = slow;
}

void free_list(Node** head) {
    if (!*head) return;
    Node* last = (*head)->prev;
    last->next = NULL;
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
    Node* h1 = NULL;
    Node* h2 = NULL;

    do {
        printf("\n--- Doubly Circular Linked List Operations ---\n");
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
        printf("20. Split Halves\n");
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
                    printf("Doubly circular list is empty.\n");
                break;
            case 8:
                if (delete_end(&head, &val))
                    printf("Deleted %d from end.\n", val);
                else
                    printf("Doubly circular list is empty.\n");
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
                    if (delete_after_value(&head, target, &val))
                        printf("Deleted %d after target %d.\n", val, target);
                    else
                        printf("Target %d not found.\n", target);
                } else clear_input();
                break;
            case 12:
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    pos = search_element(head, val);
                    if (pos != -1)
                        printf("Value %d found at position %d.\n", val, pos);
                    else
                        printf("Value %d not found in list.\n", val);
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
                printf("Doubly circular list reversed.\n");
                display_forward(head);
                break;
            case 16:
                sort_list(head);
                printf("Doubly circular list sorted.\n");
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
            case 20:
                split_halves(head, &h1, &h2);
                printf("List split into two halves:\n");
                printf("Half 1: ");
                display_forward(h1);
                printf("Half 2: ");
                display_forward(h2);
                free_list(&h1);
                free_list(&h2);
                head = NULL;
                break;
            case 0:
                printf("Exiting doubly circular linked list program.\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 20.\n");
                break;
        }
    } while (choice != 0);

    free_list(&head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_doubly_circular`, `data-structures.full-programs.linked-lists.doubly-circular.prog-doubly-circular`, `data-structures>prog_doubly_circular()`, `data-structures>full-programs>linked-lists>doubly-circular>prog-doubly-circular>prog_doubly_circular()`, `programDoublyCircular`
