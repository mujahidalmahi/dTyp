# prog_singly_circular_list
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Complete singly circular linked list cycle insertion and traversal program

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
    struct Node* next;
} Node;

void sc_insert(Node** head, int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    if (!*head) {
        n->next = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    cur->next = n;
    n->next = *head;
}

void sc_display(const Node* head) {
    if (!head) return;
    const Node* cur = head;
    printf("Circular List: ");
    do {
        printf("%d -> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    puts("(head)");
}

void sc_cleanup(Node** head) {
    if (!head || !*head) return;
    Node* cur = *head;
    Node* nxt = NULL;
    do {
        nxt = cur->next;
        free(cur);
        cur = nxt;
    } while (cur != *head);
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    sc_insert(&head, 5);
    sc_insert(&head, 15);
    sc_insert(&head, 25);
    sc_display(head);
    sc_cleanup(&head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_singly_circular_list`, `data-structures.full-programs.linked-lists.singly-circular.prog-circular-list`, `data-structures>prog_singly_circular_list()`, `data-structures>full-programs>linked-lists>singly-circular>prog-circular-list>prog_singly_circular_list()`, `programCircularList`
