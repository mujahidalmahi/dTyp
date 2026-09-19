# proj_library_management
> **Domain:** `projects` | **Subcategory:** `management-systems` | **Type:** `program`
## Overview
Complete interactive library catalog system with checkout, return, and catalog queries

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

#define MAX_BOOKS 50

typedef struct {
    int id;
    char title[48];
    char author[32];
    int available;
} Book;

static Book catalog[MAX_BOOKS];
static int book_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void add_book(void) {
    if (book_count >= MAX_BOOKS) {
        printf("Catalog is full.\n");
        return;
    }
    Book b;
    b.id = book_count + 1;
    b.available = 1;
    printf("Enter Book Title: ");
    if (scanf("%47[^\n]", b.title) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Book Author: ");
    if (scanf("%31[^\n]", b.author) != 1) {
        clear_input();
        return;
    }
    clear_input();
    catalog[book_count++] = b;
    printf("Book added successfully with ID #%d.\n", b.id);
}

static void list_books(void) {
    if (book_count == 0) {
        printf("Library catalog is empty.\n");
        return;
    }
    printf("%-4s | %-24s | %-16s | %-10s\n", "ID", "Title", "Author", "Status");
    printf("---------------------------------------------------------------\n");
    for (int i = 0; i < book_count; i++) {
        printf("%-4d | %-24s | %-16s | %-10s\n",
               catalog[i].id, catalog[i].title, catalog[i].author,
               catalog[i].available ? "AVAILABLE" : "BORROWED");
    }
}

static void borrow_book(void) {
    int id;
    printf("Enter Book ID to borrow: ");
    if (scanf("%d", &id) != 1) {
        clear_input();
        return;
    }
    clear_input();
    for (int i = 0; i < book_count; i++) {
        if (catalog[i].id == id) {
            if (catalog[i].available) {
                catalog[i].available = 0;
                printf("Successfully borrowed '%s'.\n", catalog[i].title);
            } else {
                printf("Book '%s' is already checked out.\n", catalog[i].title);
            }
            return;
        }
    }
    printf("Book ID #%d not found.\n", id);
}

static void return_book(void) {
    int id;
    printf("Enter Book ID to return: ");
    if (scanf("%d", &id) != 1) {
        clear_input();
        return;
    }
    clear_input();
    for (int i = 0; i < book_count; i++) {
        if (catalog[i].id == id) {
            if (!catalog[i].available) {
                catalog[i].available = 1;
                printf("Successfully returned '%s'.\n", catalog[i].title);
            } else {
                printf("Book '%s' was not borrowed.\n", catalog[i].title);
            }
            return;
        }
    }
    printf("Book ID #%d not found.\n", id);
}

int main(void) {
    int choice;
    do {
        printf("=== Library Catalog Management System ===\n");
        printf("1. Add New Book\n");
        printf("2. View All Books in Catalog\n");
        printf("3. Check Out / Borrow Book\n");
        printf("4. Return Book\n");
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
                add_book();
                break;
            case 2:
                list_books();
                break;
            case 3:
                borrow_book();
                break;
            case 4:
                return_book();
                break;
            case 0:
                printf("Exiting library system.\n");
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
Available via: `proj_library_management`, `projects.management-systems.library-catalog.prog-library-management`, `projects>proj_library_management()`, `projects>management-systems>library-catalog>prog-library-management>proj_library_management()`
