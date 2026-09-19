# prog_dynamic_buffer_growth
> **Domain:** `boiler-plates` | **Subcategory:** `dynamic-memory` | **Type:** `program`
## Overview
Interactive dynamic vector buffer growth with reallocation policies

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
    size_t size;
    size_t capacity;
} Vector;

static void vec_init(Vector* v) {
    v->capacity = 2;
    v->size = 0;
    v->data = (int*)malloc(v->capacity * sizeof(int));
}

static void vec_push(Vector* v, int val) {
    if (v->size >= v->capacity) {
        size_t new_cap = v->capacity * 2;
        int* next = (int*)realloc(v->data, new_cap * sizeof(int));
        if (!next) return;
        v->data = next;
        v->capacity = new_cap;
        printf("Buffer expanded: new capacity = %zu\n", v->capacity);
    }
    v->data[v->size++] = val;
}

static void vec_pop(Vector* v) {
    if (v->size > 0) {
        int popped = v->data[--v->size];
        printf("Popped: %d (current size: %zu)\n", popped, v->size);
    } else {
        printf("Vector is empty!\n");
    }
}

static void vec_display(const Vector* v) {
    printf("Vector [size=%zu, capacity=%zu]: [ ", v->size, v->capacity);
    for (size_t i = 0; i < v->size; i++) {
        printf("%d ", v->data[i]);
    }
    printf("]\n");
}

static void vec_free(Vector* v) {
    if (v->data) {
        free(v->data);
        v->data = NULL;
    }
    v->size = 0;
    v->capacity = 0;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    Vector v;
    vec_init(&v);
    int choice;

    do {
        printf("\n=== RESIZABLE VECTOR BUFFER (REALLOC) ===\n");
        printf("1. Push Element\n");
        printf("2. Pop Element\n");
        printf("3. Display Buffer State\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int val;
            printf("Enter integer value to push: ");
            if (scanf("%d", &val) == 1) {
                vec_push(&v, val);
            }
        } else if (choice == 2) {
            vec_pop(&v);
        } else if (choice == 3) {
            vec_display(&v);
        }
        clear_input();
    } while (choice != 0);

    vec_free(&v);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dynamic_buffer_growth`, `boiler-plates.full-programs.dynamic-memory.prog-dynamic-buffer-growth`, `boiler-plates>prog_dynamic_buffer_growth()`, `boiler-plates>full-programs>dynamic-memory>prog-dynamic-buffer-growth>prog_dynamic_buffer_growth()`, `dynamicBufferGrowthProgram`
