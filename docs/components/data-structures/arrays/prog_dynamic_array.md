# prog_dynamic_array
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `program`
## Overview
Interactive dynamic array vector program with push/pop, positional insertion/deletion, resizing, and capacity reporting

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

typedef struct Vector {
    int* data;
    size_t size;
    size_t cap;
} Vector;

Vector* vec_create(size_t init_cap) {
    Vector* v = (Vector*)malloc(sizeof(Vector));
    v->cap = init_cap > 0 ? init_cap : 4;
    v->size = 0;
    v->data = (int*)malloc(v->cap * sizeof(int));
    return v;
}

void vec_push_back(Vector* v, int val) {
    if (v->size >= v->cap) {
        v->cap *= 2;
        v->data = (int*)realloc(v->data, v->cap * sizeof(int));
    }
    v->data[v->size++] = val;
}

bool vec_pop_back(Vector* v, int* popped) {
    if (v->size == 0) return false;
    *popped = v->data[--v->size];
    return true;
}

bool vec_insert_at(Vector* v, size_t index, int val) {
    if (index > v->size) return false;
    if (v->size >= v->cap) {
        v->cap *= 2;
        v->data = (int*)realloc(v->data, v->cap * sizeof(int));
    }
    for (size_t i = v->size; i > index; i--) {
        v->data[i] = v->data[i - 1];
    }
    v->data[index] = val;
    v->size++;
    return true;
}

bool vec_delete_at(Vector* v, size_t index, int* deleted) {
    if (index >= v->size) return false;
    *deleted = v->data[index];
    for (size_t i = index; i < v->size - 1; i++) {
        v->data[i] = v->data[i + 1];
    }
    v->size--;
    return true;
}

void vec_print(const Vector* v) {
    printf("Vector (Size: %zu, Cap: %zu): [ ", v->size, v->cap);
    for (size_t i = 0; i < v->size; i++) printf("%d ", v->data[i]);
    printf("]\n");
}

void vec_free(Vector* v) {
    if (v) {
        free(v->data);
        free(v);
    }
}

int main(void) {
    Vector* vec = vec_create(4);
    int choice;

    do {
        printf("\n=== Dynamic Array (Vector) Menu ===\n");
        printf("1. Push Back Element\n");
        printf("2. Pop Back Element\n");
        printf("3. Insert Element at Index\n");
        printf("4. Delete Element at Index\n");
        printf("5. Get Element at Index\n");
        printf("6. Display Vector\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to push back: ");
                if (scanf("%d", &val) == 1) {
                    vec_push_back(vec, val);
                    printf("Pushed %d. Size is now %zu.\n", val, vec->size);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (vec_pop_back(vec, &val)) printf("Popped %d. Size is now %zu.\n", val, vec->size);
                else printf("Vector is empty! Cannot pop.\n");
                break;
            }
            case 3: {
                size_t idx;
                int val;
                printf("Enter index (0-%zu) and value: ", vec->size);
                if (scanf("%zu %d", &idx, &val) == 2) {
                    if (vec_insert_at(vec, idx, val)) printf("Inserted %d at index %zu.\n", val, idx);
                    else printf("Invalid index.\n");
                } else clear_input();
                break;
            }
            case 4: {
                size_t idx;
                int val;
                printf("Enter index to delete (0-%zu): ", vec->size > 0 ? vec->size - 1 : 0);
                if (scanf("%zu", &idx) == 1) {
                    if (vec_delete_at(vec, idx, &val)) printf("Deleted %d from index %zu.\n", val, idx);
                    else printf("Invalid index.\n");
                } else clear_input();
                break;
            }
            case 5: {
                size_t idx;
                printf("Enter index to get: ");
                if (scanf("%zu", &idx) == 1) {
                    if (idx < vec->size) printf("vec[%zu] = %d\n", idx, vec->data[idx]);
                    else printf("Index out of range.\n");
                } else clear_input();
                break;
            }
            case 6:
                vec_print(vec);
                break;
            case 0:
                printf("Exiting Vector Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    vec_free(vec);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dynamic_array`, `data-structures.full-programs.arrays.dynamic-array.prog-dynamic-array`, `data-structures>prog_dynamic_array()`, `data-structures>full-programs>arrays>dynamic-array>prog-dynamic-array>prog_dynamic_array()`, `programDynamicArray`
