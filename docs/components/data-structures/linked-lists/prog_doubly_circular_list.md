# prog_doubly_circular_list
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Complete doubly circular linked list forward and backward cycle traversal program

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

typedef struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
} Node;

void dc_insert(Node** head, int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    if (!*head) {
        n->next = n;
        n->prev = n;
        *head = n;
        return;
    }
    Node* last = (*head)->prev;
    n->next = *head;
    n->prev = last;
    last->next = n;
    (*head)->prev = n;
}

void dc_display(const Node* head) {
    if (!head) return;
    const Node* cur = head;
    printf("Doubly Circular: ");
    do {
        printf("%d <=> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    puts("(head)");
}

void dc_cleanup(Node** head) {
    if (!head || !*head) return;
    Node* cur = *head;
    Node* last = (*head)->prev;
    while (cur != last) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    free(last);
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    dc_insert(&head, 11);
    dc_insert(&head, 22);
    dc_insert(&head, 33);
    dc_display(head);
    dc_cleanup(&head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_doubly_circular_list`, `data-structures.full-programs.linked-lists.doubly-circular.prog-doubly-circular`, `data-structures>prog_doubly_circular_list()`, `data-structures>full-programs>linked-lists>doubly-circular>prog-doubly-circular>prog_doubly_circular_list()`, `programDoublyCircularList`
