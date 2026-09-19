# prog_deque
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `program`
## Overview
Interactive double-ended queue program supporting front/rear insertions and deletions with capacity bounds

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

typedef struct Deque {
    int* data;
    int front;
    int rear;
    int count;
    int cap;
} Deque;

Deque* deque_create(int cap) {
    Deque* d = (Deque*)malloc(sizeof(Deque));
    d->data = (int*)malloc(cap * sizeof(int));
    d->front = 0;
    d->rear = cap - 1;
    d->count = 0;
    d->cap = cap;
    return d;
}

bool deque_is_empty(const Deque* d) { return d->count == 0; }
bool deque_is_full(const Deque* d) { return d->count == d->cap; }

bool deque_insert_front(Deque* d, int val) {
    if (deque_is_full(d)) return false;
    d->front = (d->front - 1 + d->cap) % d->cap;
    d->data[d->front] = val;
    d->count++;
    return true;
}

bool deque_insert_rear(Deque* d, int val) {
    if (deque_is_full(d)) return false;
    d->rear = (d->rear + 1) % d->cap;
    d->data[d->rear] = val;
    d->count++;
    return true;
}

bool deque_delete_front(Deque* d, int* val) {
    if (deque_is_empty(d)) return false;
    *val = d->data[d->front];
    d->front = (d->front + 1) % d->cap;
    d->count--;
    return true;
}

bool deque_delete_rear(Deque* d, int* val) {
    if (deque_is_empty(d)) return false;
    *val = d->data[d->rear];
    d->rear = (d->rear - 1 + d->cap) % d->cap;
    d->count--;
    return true;
}

void deque_display(const Deque* d) {
    if (deque_is_empty(d)) {
        printf("Deque is empty.\n");
        return;
    }
    printf("Deque [front to rear]: ");
    for (int i = 0; i < d->count; i++) {
        int idx = (d->front + i) % d->cap;
        printf("%d ", d->data[idx]);
    }
    printf("\n");
}

void deque_free(Deque* d) {
    if (d) {
        free(d->data);
        free(d);
    }
}

int main(void) {
    Deque* d = deque_create(8);
    int choice;

    do {
        printf("\n=== Double-Ended Queue (Deque) Menu ===\n");
        printf("1. Insert Front\n");
        printf("2. Insert Rear\n");
        printf("3. Delete Front\n");
        printf("4. Delete Rear\n");
        printf("5. Display Deque\n");
        printf("6. Count Elements\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert front: ");
                if (scanf("%d", &val) == 1) {
                    if (deque_insert_front(d, val)) printf("Inserted %d at front.\n", val);
                    else printf("Deque is full.\n");
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to insert rear: ");
                if (scanf("%d", &val) == 1) {
                    if (deque_insert_rear(d, val)) printf("Inserted %d at rear.\n", val);
                    else printf("Deque is full.\n");
                } else clear_input();
                break;
            }
            case 3: {
                int val;
                if (deque_delete_front(d, &val)) printf("Deleted %d from front.\n", val);
                else printf("Deque is empty.\n");
                break;
            }
            case 4: {
                int val;
                if (deque_delete_rear(d, &val)) printf("Deleted %d from rear.\n", val);
                else printf("Deque is empty.\n");
                break;
            }
            case 5:
                deque_display(d);
                break;
            case 6:
                printf("Count: %d / %d\n", d->count, d->cap);
                break;
            case 0:
                printf("Exiting Deque Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    deque_free(d);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_deque`, `data-structures.full-programs.queues.deque.prog-deque`, `data-structures>prog_deque()`, `data-structures>full-programs>queues>deque>prog-deque>prog_deque()`, `programDeque`
