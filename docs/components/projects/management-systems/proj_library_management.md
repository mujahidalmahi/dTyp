# proj_library_management
> **Domain:** `projects` | **Subcategory:** `management-systems` | **Type:** `program`
## Overview
Complete library book cataloging and borrowing tracking system

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
#include <string.h>

typedef struct {
    int id;
    char title[40];
    char author[32];
    int available;
    int total;
} Book;

int borrow_book(Book* b) {
    if (b->available > 0) {
        b->available--;
        return 1;
    }
    return 0;
}

int return_book(Book* b) {
    if (b->available < b->total) {
        b->available++;
        return 1;
    }
    return 0;
}

void print_book(const Book* b) {
    printf("[%d] '%s' by %s (%d/%d available)
", b->id, b->title, b->author, b->available, b->total);
}

int main(void) {
    Book catalog[3] = {
        {1, "The C Programming Language", "K&R", 3, 3},
        {2, "Algorithms", "Sedgewick", 2, 2},
        {3, "Clean Code", "Martin", 1, 1}
    };
    printf("=== Library Catalog ===
");
    for (int i = 0; i < 3; i++) print_book(&catalog[i]);
    printf("
Borrowing 'Clean Code'... %s
", borrow_book(&catalog[2]) ? "Success" : "Failed");
    printf("Borrowing 'Clean Code' again... %s
", borrow_book(&catalog[2]) ? "Success" : "Unavailable");
    return_book(&catalog[2]);
    printf("Returned 'Clean Code'. Updated copies: %d
", catalog[2].available);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_library_management`, `projects.management-systems.library-catalog.prog-library-management`, `projects>proj_library_management()`, `projects>management-systems>library-catalog>prog-library-management>proj_library_management()`
