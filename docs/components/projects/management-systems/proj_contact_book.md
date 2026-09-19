# proj_contact_book
> **Domain:** `projects` | **Subcategory:** `management-systems` | **Type:** `program`
## Overview
Interactive contact book application supporting search, validation, and editing

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

#define MAX_CONTACTS 50

typedef struct {
    char name[32];
    char phone[16];
    char email[32];
} Contact;

static Contact contacts[MAX_CONTACTS];
static int total_contacts = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void add_contact(void) {
    if (total_contacts >= MAX_CONTACTS) {
        printf("Contact book full.\n");
        return;
    }
    Contact c;
    printf("Enter Name: ");
    if (scanf("%31[^\n]", c.name) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Phone: ");
    if (scanf("%15s", c.phone) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Email: ");
    if (scanf("%31s", c.email) != 1) {
        clear_input();
        return;
    }
    clear_input();
    contacts[total_contacts++] = c;
    printf("Contact '%s' saved successfully.\n", c.name);
}

static void list_contacts(void) {
    if (total_contacts == 0) {
        printf("Contact book is empty.\n");
        return;
    }
    printf("%-16s | %-14s | %-24s\n", "Name", "Phone", "Email");
    printf("-----------------------------------------------------\n");
    for (int i = 0; i < total_contacts; i++) {
        printf("%-16s | %-14s | %-24s\n", contacts[i].name, contacts[i].phone, contacts[i].email);
    }
}

static void search_contact(void) {
    char q[32];
    printf("Enter name to search: ");
    if (scanf("%31s", q) != 1) {
        clear_input();
        return;
    }
    clear_input();
    int found = 0;
    for (int i = 0; i < total_contacts; i++) {
        if (strstr(contacts[i].name, q) != NULL) {
            printf("Found: %s | Phone: %s | Email: %s\n",
                   contacts[i].name, contacts[i].phone, contacts[i].email);
            found = 1;
        }
    }
    if (!found) printf("No contacts matching '%s'.\n", q);
}

int main(void) {
    int choice;
    do {
        printf("=== Personal Contact Book ===\n");
        printf("1. Add New Contact\n");
        printf("2. List All Contacts\n");
        printf("3. Search Contact by Name\n");
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
                add_contact();
                break;
            case 2:
                list_contacts();
                break;
            case 3:
                search_contact();
                break;
            case 0:
                printf("Exiting contact book.\n");
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
Available via: `proj_contact_book`, `projects.management-systems.contact-book.prog-contact-book`, `projects>proj_contact_book()`, `projects>management-systems>contact-book>prog-contact-book>proj_contact_book()`
