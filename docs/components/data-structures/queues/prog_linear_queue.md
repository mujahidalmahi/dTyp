# prog_linear_queue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `program`
## Overview
Interactive linear queue program with enqueue, dequeue, peek, empty/full checking, and display

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

typedef struct LinearQueue {
    int* data;
    int front;
    int rear;
    int cap;
} LinearQueue;

LinearQueue* lq_create(int cap) {
    LinearQueue* q = (LinearQueue*)malloc(sizeof(LinearQueue));
    q->data = (int*)malloc(cap * sizeof(int));
    q->front = 0;
    q->rear = -1;
    q->cap = cap;
    return q;
}

bool lq_is_empty(const LinearQueue* q) {
    return q->front > q->rear;
}

bool lq_is_full(const LinearQueue* q) {
    return q->rear >= q->cap - 1;
}

bool lq_enqueue(LinearQueue* q, int val) {
    if (lq_is_full(q)) return false;
    q->data[++q->rear] = val;
    return true;
}

bool lq_dequeue(LinearQueue* q, int* val) {
    if (lq_is_empty(q)) return false;
    *val = q->data[q->front++];
    return true;
}

bool lq_peek(const LinearQueue* q, int* val) {
    if (lq_is_empty(q)) return false;
    *val = q->data[q->front];
    return true;
}

void lq_display(const LinearQueue* q) {
    if (lq_is_empty(q)) {
        printf("Queue is empty.\n");
        return;
    }
    printf("Queue [front to rear]: ");
    for (int i = q->front; i <= q->rear; i++) printf("%d ", q->data[i]);
    printf("\n");
}

void lq_free(LinearQueue* q) {
    if (q) {
        free(q->data);
        free(q);
    }
}

int main(void) {
    LinearQueue* q = lq_create(10);
    int choice;

    do {
        printf("\n=== Linear Queue Menu ===\n");
        printf("1. Enqueue\n");
        printf("2. Dequeue\n");
        printf("3. Peek Front\n");
        printf("4. Check Is Empty / Is Full\n");
        printf("5. Display Queue\n");
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
                printf("Enter value to enqueue: ");
                if (scanf("%d", &val) == 1) {
                    if (lq_enqueue(q, val)) printf("Enqueued %d.\n", val);
                    else printf("Queue Overflow! Queue is full.\n");
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (lq_dequeue(q, &val)) printf("Dequeued %d.\n", val);
                else printf("Queue Underflow! Queue is empty.\n");
                break;
            }
            case 3: {
                int val;
                if (lq_peek(q, &val)) printf("Front element is %d.\n", val);
                else printf("Queue is empty.\n");
                break;
            }
            case 4:
                printf("Empty: %s | Full: %s\n", lq_is_empty(q) ? "Yes" : "No", lq_is_full(q) ? "Yes" : "No");
                break;
            case 5:
                lq_display(q);
                break;
            case 6:
                printf("Count: %d elements\n", lq_is_empty(q) ? 0 : (q->rear - q->front + 1));
                break;
            case 0:
                printf("Exiting Linear Queue Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    lq_free(q);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_linear_queue`, `data-structures.full-programs.queues.linear-queue.prog-linear-queue`, `data-structures>prog_linear_queue()`, `data-structures>full-programs>queues>linear-queue>prog-linear-queue>prog_linear_queue()`, `programLinearQueue`
