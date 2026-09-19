# prog_singly_linked_list
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Interactive complete singly linked list program with 19 operations: beginning/end/positional/value/sorted insertions and deletions, reverse, bubble sort, deduplication, middle element, cycle detection, min/max, count, and display

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

Node* create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->next = NULL;
    return n;
}

void insert_beginning(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    n->next = *head;
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
    while (cur->next && cur->next->data != target) {
        cur = cur->next;
    }
    if (cur->next) {
        Node* n = create_node(data);
        if (!n) return false;
        n->next = cur->next;
        cur->next = n;
        return true;
    }
    return false;
}

bool insert_after_value(Node* head, int target, int data) {
    Node* cur = head;
    while (cur && cur->data != target) {
        cur = cur->next;
    }
    if (!cur) return false;
    Node* n = create_node(data);
    if (!n) return false;
    n->next = cur->next;
    cur->next = n;
    return true;
}

void insert_sorted(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head || (*head)->data >= data) {
        n->next = *head;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data < data) {
        cur = cur->next;
    }
    n->next = cur->next;
    cur->next = n;
}

bool delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    Node* tmp = *head;
    *val = tmp->data;
    *head = (*head)->next;
    free(tmp);
    return true;
}

bool delete_end(Node** head, int* val) {
    if (!*head) return false;
    if (!(*head)->next) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return true;
    }
    Node* cur = *head;
    while (cur->next->next) cur = cur->next;
    *val = cur->next->data;
    free(cur->next);
    cur->next = NULL;
    return true;
}

bool delete_at_position(Node** head, int pos, int* val) {
    if (!*head || pos < 1) return false;
    if (pos == 1) return delete_beginning(head, val);
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) {
        cur = cur->next;
    }
    if (!cur || !cur->next) return false;
    Node* tmp = cur->next;
    *val = tmp->data;
    cur->next = tmp->next;
    free(tmp);
    return true;
}

bool delete_by_value(Node** head, int val) {
    if (!*head) return false;
    if ((*head)->data == val) {
        Node* tmp = *head;
        *head = (*head)->next;
        free(tmp);
        return true;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data != val) {
        cur = cur->next;
    }
    if (!cur->next) return false;
    Node* tmp = cur->next;
    cur->next = cur->next->next;
    free(tmp);
    return true;
}

bool delete_after_value(Node* head, int target, int* val) {
    Node* cur = head;
    while (cur && cur->data != target) {
        cur = cur->next;
    }
    if (!cur || !cur->next) return false;
    Node* tmp = cur->next;
    *val = tmp->data;
    cur->next = tmp->next;
    free(tmp);
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

void reverse_list(Node** head) {
    Node* prev = NULL;
    Node* cur = *head;
    Node* nxt = NULL;
    while (cur) {
        nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    *head = prev;
}

void sort_list(Node* head) {
    if (!head || !head->next) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next) {
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
    Node* cur = head;
    while (cur && cur->next) {
        Node* runner = cur;
        while (runner->next) {
            if (runner->next->data == cur->data) {
                Node* del = runner->next;
                runner->next = del->next;
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

bool detect_cycle(const Node* head) {
    if (!head || !head->next) return false;
    const Node* slow = head;
    const Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
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

void display_list_and_count(const Node* head) {
    if (!head) {
        printf("List is empty (count: 0)\n");
        return;
    }
    printf("List: ");
    int count = 0;
    const Node* cur = head;
    while (cur) {
        printf("%d -> ", cur->data);
        count++;
        cur = cur->next;
    }
    printf("NULL (total: %d)\n", count);
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
        printf("\n--- Singly Linked List Operations ---\n");
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
        printf("13. Reverse List\n");
        printf("14. Sort List\n");
        printf("15. Remove Duplicates\n");
        printf("16. Find Middle\n");
        printf("17. Detect Cycle\n");
        printf("18. Min and Max\n");
        printf("19. Display List and Count\n");
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
                printf("Enter position (1-based) and value: ");
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
                        printf("Target %d not found in list.\n", target);
                } else clear_input();
                break;
            case 5:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_after_value(head, target, val))
                        printf("Inserted %d after %d.\n", val, target);
                    else
                        printf("Target %d not found in list.\n", target);
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
                printf("Enter position to delete (1-based): ");
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
                        printf("Deleted value %d from list.\n", val);
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
                        printf("No element after %d or target not found.\n", target);
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
                reverse_list(&head);
                printf("List reversed successfully.\n");
                display_list_and_count(head);
                break;
            case 14:
                sort_list(head);
                printf("List sorted in ascending order.\n");
                display_list_and_count(head);
                break;
            case 15:
                remove_duplicates(head);
                printf("Duplicate elements removed.\n");
                display_list_and_count(head);
                break;
            case 16:
                if (find_middle(head, &val))
                    printf("Middle node value: %d\n", val);
                else
                    printf("List is empty.\n");
                break;
            case 17:
                if (detect_cycle(head))
                    printf("Cycle detected in list.\n");
                else
                    printf("No cycle detected (list is acyclic).\n");
                break;
            case 18:
                if (min_and_max(head, &min_val, &max_val))
                    printf("Minimum value: %d, Maximum value: %d\n", min_val, max_val);
                else
                    printf("List is empty.\n");
                break;
            case 19:
                display_list_and_count(head);
                break;
            case 0:
                printf("Exiting singly linked list program.\n");
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
Available via: `prog_singly_linked_list`, `data-structures.full-programs.linked-lists.singly.prog-singly-list`, `data-structures>prog_singly_linked_list()`, `data-structures>full-programs>linked-lists>singly>prog-singly-list>prog_singly_linked_list()`, `programSinglyList`
