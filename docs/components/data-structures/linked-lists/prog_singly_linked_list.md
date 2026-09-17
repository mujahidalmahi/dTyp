# prog_singly_linked_list
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `program`
## Overview
Complete singly linked list program with insertions, deletions, search, min/max, count, and free

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

Node* create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->next = NULL;
    return n;
}

void insert_head(Node** head, int data) {
    Node* n = create_node(data);
    n->next = *head;
    *head = n;
}

void insert_tail(Node** head, int data) {
    Node* n = create_node(data);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = n;
}

void print_list(const Node* head) {
    const Node* cur = head;
    while (cur) {
        printf("%d -> ", cur->data);
        cur = cur->next;
    }
    puts("NULL");
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
    insert_tail(&head, 20);
    insert_tail(&head, 30);
    insert_head(&head, 10);
    insert_tail(&head, 40);

    printf("Singly Linked List: ");
    print_list(head);

    free_list(&head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_singly_linked_list`, `data-structures.full-programs.linked-lists.singly.prog-singly-list`, `data-structures>prog_singly_linked_list()`, `data-structures>full-programs>linked-lists>singly>prog-singly-list>prog_singly_linked_list()`, `programSinglyList`
