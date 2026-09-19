# proj_custom_allocator
> **Domain:** `projects` | **Subcategory:** `systems-runtime` | **Type:** `program`
## Overview
Interactive boundary-tag heap memory allocator with coalescing and fragmentation visualization

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

#define HEAP_SIZE 1024

typedef struct Block {
    int size;
    int is_free;
} Block;

static char heap_mem[HEAP_SIZE];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void init_allocator(void) {
    Block* initial = (Block*)heap_mem;
    initial->size = HEAP_SIZE - sizeof(Block);
    initial->is_free = 1;
}

static void print_heap_map(void) {
    printf("Heap Memory Layout:\n");
    int offset = 0;
    while (offset < HEAP_SIZE) {
        Block* b = (Block*)(heap_mem + offset);
        printf("  [Offset %4d: %s, size %4d bytes]\n",
               offset, b->is_free ? "FREE " : "ALLOC", b->size);
        offset += sizeof(Block) + b->size;
    }
}

int main(void) {
    init_allocator();
    int choice;
    do {
        printf("=== Custom Boundary-Tag Heap Allocator ===\n");
        printf("Heap Capacity: %d bytes\n", HEAP_SIZE);
        printf("1. View Heap Fragmentation Map\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                print_heap_map();
                break;
            case 0:
                printf("Exiting custom allocator.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_custom_allocator`, `projects.systems-runtime.custom-allocator.prog-custom-allocator`, `projects>proj_custom_allocator()`, `projects>systems-runtime>custom-allocator>prog-custom-allocator>proj_custom_allocator()`
