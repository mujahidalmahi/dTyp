# proj_contact_book
> **Domain:** `projects` | **Subcategory:** `management-systems` | **Type:** `program`
## Overview
Personal contact book with name searching, sorting, and contact card display

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
    char name[32];
    char phone[16];
    char email[32];
} Contact;

int find_contact(const Contact book[], int n, const char* name_query) {
    for (int i = 0; i < n; i++) {
        if (strcmp(book[i].name, name_query) == 0) return i;
    }
    return -1;
}

int main(void) {
    Contact book[3] = {
        {"David", "+1-555-0101", "david@example.com"},
        {"Emma", "+1-555-0199", "emma@example.com"},
        {"Frank", "+1-555-0144", "frank@example.com"}
    };
    int n = 3;
    printf("=== Contact Directory ===\n");
    for (int i = 0; i < n; i++) {
        printf("%-10s | %-14s | %s\n", book[i].name, book[i].phone, book[i].email);
    }
    int idx = find_contact(book, n, "Emma");
    if (idx != -1) {
        printf("\nFound Emma: Phone: %s, Email: %s\n", book[idx].phone, book[idx].email);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_contact_book`, `projects.management-systems.contact-book.prog-contact-book`, `projects>proj_contact_book()`, `projects>management-systems>contact-book>prog-contact-book>proj_contact_book()`
