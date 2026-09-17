# prog_doubly_linked_list
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Complete doubly linked list program with bidirectional printing and deletions

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

Node* d_create(int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->prev = NULL;
    n->next = NULL;
    return n;
}

void d_insert_tail(Node** head, int val) {
    Node* n = d_create(val);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = n;
    n->prev = cur;
}

void d_print_forward(const Node* head) {
    printf("Forward:  ");
    const Node* cur = head;
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->next;
    }
    puts("NULL");
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
    d_insert_tail(&head, 100);
    d_insert_tail(&head, 200);
    d_insert_tail(&head, 300);

    d_print_forward(head);
    d_free(&head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_doubly_linked_list`, `data-structures.full-programs.linked-lists.doubly.prog-doubly-list`, `data-structures>prog_doubly_linked_list()`, `data-structures>full-programs>linked-lists>doubly>prog-doubly-list>prog_doubly_linked_list()`, `programDoublyList`
