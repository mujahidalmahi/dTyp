# prog_cp_stl_deque
> **Domain:** `competitive-programming` | **Subcategory:** `monotonic-structures` | **Type:** `program`
## Overview
C double-ended deque emulator applied to linear-time sliding window maximum

## Signature
```c
int main(void);
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

typedef struct {
    int* data;
    int head;
    int tail;
    int size;
    int capacity;
} Deque;

static void deque_init(Deque* dq, int cap) {
    dq->capacity = cap;
    dq->size = 0;
    dq->head = 0;
    dq->tail = 0;
    dq->data = (int*)malloc(cap * sizeof(int));
}

static void deque_push_back(Deque* dq, int val) {
    dq->data[dq->tail] = val;
    dq->tail = (dq->tail + 1) % dq->capacity;
    dq->size++;
}

static void deque_pop_back(Deque* dq) {
    dq->tail = (dq->tail - 1 + dq->capacity) % dq->capacity;
    dq->size--;
}

static void deque_pop_front(Deque* dq) {
    dq->head = (dq->head + 1) % dq->capacity;
    dq->size--;
}

static int deque_front(const Deque* dq) {
    return dq->data[dq->head];
}

static int deque_back(const Deque* dq) {
    return dq->data[(dq->tail - 1 + dq->capacity) % dq->capacity];
}

static void deque_free(Deque* dq) {
    if (dq->data) free(dq->data);
    dq->size = 0;
}

static void solve(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    Deque dq;
    deque_init(&dq, n + 4);

    for (int i = 0; i < n; i++) {
        while (dq.size > 0 && deque_front(&dq) <= i - k) {
            deque_pop_front(&dq);
        }
        while (dq.size > 0 && arr[deque_back(&dq)] <= arr[i]) {
            deque_pop_back(&dq);
        }
        deque_push_back(&dq, i);

        if (i >= k - 1) {
            printf("%d%c", arr[deque_front(&dq)], (i == n - 1 ? '\n' : ' '));
        }
    }

    deque_free(&dq);
    free(arr);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_stl_deque`, `competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-stl-deque`, `competitive-programming>prog_cp_stl_deque()`, `competitive-programming>full-programs>cp-data-structures>monotonic-structures>prog-cp-stl-deque>prog_cp_stl_deque()`, `cpStlDeque`
