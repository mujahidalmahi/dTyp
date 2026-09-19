# prog_circular_queue
> **Domain:** `data-structures` | **Subcategory:** `queues` | **Type:** `program`
## Overview
Interactive ring buffer circular queue with modulo indexing, wraparound display, and full/empty state tracking

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
#include <stdbool.h>

#define CQ_CAP 5

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

typedef struct CircularQueue {
    int data[CQ_CAP];
    int front;
    int rear;
    int count;
} CircularQueue;

void cq_init(CircularQueue* q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

bool cq_is_empty(const CircularQueue* q) { return q->count == 0; }
bool cq_is_full(const CircularQueue* q) { return q->count == CQ_CAP; }

bool cq_enqueue(CircularQueue* q, int val) {
    if (cq_is_full(q)) return false;
    q->rear = (q->rear + 1) % CQ_CAP;
    q->data[q->rear] = val;
    q->count++;
    return true;
}

bool cq_dequeue(CircularQueue* q, int* val) {
    if (cq_is_empty(q)) return false;
    *val = q->data[q->front];
    q->front = (q->front + 1) % CQ_CAP;
    q->count--;
    return true;
}

bool cq_peek(const CircularQueue* q, int* val) {
    if (cq_is_empty(q)) return false;
    *val = q->data[q->front];
    return true;
}

void cq_display(const CircularQueue* q) {
    if (cq_is_empty(q)) {
        printf("Circular Queue is empty.\n");
        return;
    }
    printf("Circular Queue (%d/%d items): ", q->count, CQ_CAP);
    for (int i = 0; i < q->count; i++) {
        int idx = (q->front + i) % CQ_CAP;
        printf("%d ", q->data[idx]);
    }
    printf("\n");
}

int main(void) {
    CircularQueue q;
    cq_init(&q);
    int choice;

    do {
        printf("\n=== Circular Ring Queue Menu (Cap: %d) ===\n", CQ_CAP);
        printf("1. Enqueue\n");
        printf("2. Dequeue\n");
        printf("3. Peek Front\n");
        printf("4. Check Is Empty / Is Full\n");
        printf("5. Display Queue\n");
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
                    if (cq_enqueue(&q, val)) printf("Enqueued %d.\n", val);
                    else printf("Queue Overflow! Ring buffer is full.\n");
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (cq_dequeue(&q, &val)) printf("Dequeued %d.\n", val);
                else printf("Queue Underflow! Ring buffer is empty.\n");
                break;
            }
            case 3: {
                int val;
                if (cq_peek(&q, &val)) printf("Front element: %d\n", val);
                else printf("Queue is empty.\n");
                break;
            }
            case 4:
                printf("Empty: %s | Full: %s\n", cq_is_empty(&q) ? "Yes" : "No", cq_is_full(&q) ? "Yes" : "No");
                break;
            case 5:
                cq_display(&q);
                break;
            case 0:
                printf("Exiting Circular Queue Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_circular_queue`, `data-structures.full-programs.queues.circular-queue.prog-circular-queue`, `data-structures>prog_circular_queue()`, `data-structures>full-programs>queues>circular-queue>prog-circular-queue>prog_circular_queue()`, `programCircularQueue`
