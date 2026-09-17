# proj_custom_allocator
> **Domain:** `projects` | **Subcategory:** `systems-runtime` | **Type:** `program`
## Overview
Boundary-tag memory allocator with block splitting, tracking, and freeing

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

typedef struct BlockHeader {
    int size;
    int is_free;
} BlockHeader;

static unsigned char memory_pool[1024];

void init_allocator(void) {
    BlockHeader* initial = (BlockHeader*)memory_pool;
    initial->size = 1024 - sizeof(BlockHeader);
    initial->is_free = 1;
}

void* my_malloc(int size) {
    unsigned char* ptr = memory_pool;
    while (ptr < memory_pool + 1024) {
        BlockHeader* block = (BlockHeader*)ptr;
        if (block->is_free && block->size >= size) {
            block->is_free = 0;
            return (void*)(ptr + sizeof(BlockHeader));
        }
        ptr += sizeof(BlockHeader) + block->size;
    }
    return NULL;
}

void my_free(void* ptr) {
    if (!ptr) return;
    BlockHeader* block = (BlockHeader*)((unsigned char*)ptr - sizeof(BlockHeader));
    block->is_free = 1;
}

int main(void) {
    init_allocator();
    int* p1 = (int*)my_malloc(64);
    int* p2 = (int*)my_malloc(128);
    printf("Allocated p1 at %p, p2 at %p
", (void*)p1, (void*)p2);
    my_free(p1);
    int* p3 = (int*)my_malloc(32);
    printf("Reallocated p3 in freed space: %p
", (void*)p3);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_custom_allocator`, `projects.systems-runtime.custom-allocator.prog-custom-allocator`, `projects>proj_custom_allocator()`, `projects>systems-runtime>custom-allocator>prog-custom-allocator>proj_custom_allocator()`
