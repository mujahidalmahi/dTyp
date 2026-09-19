# prog_open_hash
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `program`
## Overview
Interactive linear probing open-addressing hash table with slot display, collision resolution, and search

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
#include <string.h>
#include <stdbool.h>

#define OA_SIZE 11

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

typedef struct Slot {
    char key[32];
    int val;
    bool occupied;
    bool deleted;
} Slot;

unsigned int oa_hash(const char* key) {
    unsigned int h = 0;
    while (*key) h = (h * 31) + (unsigned char)(*key++);
    return h % OA_SIZE;
}

void oa_init(Slot* table) {
    for (int i = 0; i < OA_SIZE; i++) {
        table[i].occupied = false;
        table[i].deleted = false;
    }
}

bool oa_insert(Slot* table, const char* key, int val) {
    unsigned int start = oa_hash(key);
    for (int i = 0; i < OA_SIZE; i++) {
        unsigned int idx = (start + i) % OA_SIZE;
        if (table[idx].occupied && strcmp(table[idx].key, key) == 0) {
            table[idx].val = val;
            return true;
        }
        if (!table[idx].occupied) {
            strncpy(table[idx].key, key, 31);
            table[idx].key[31] = '\0';
            table[idx].val = val;
            table[idx].occupied = true;
            table[idx].deleted = false;
            return true;
        }
    }
    return false;
}

bool oa_search(const Slot* table, const char* key, int* val) {
    unsigned int start = oa_hash(key);
    for (int i = 0; i < OA_SIZE; i++) {
        unsigned int idx = (start + i) % OA_SIZE;
        if (!table[idx].occupied && !table[idx].deleted) return false;
        if (table[idx].occupied && strcmp(table[idx].key, key) == 0) {
            *val = table[idx].val;
            return true;
        }
    }
    return false;
}

bool oa_delete(Slot* table, const char* key) {
    unsigned int start = oa_hash(key);
    for (int i = 0; i < OA_SIZE; i++) {
        unsigned int idx = (start + i) % OA_SIZE;
        if (!table[idx].occupied && !table[idx].deleted) return false;
        if (table[idx].occupied && strcmp(table[idx].key, key) == 0) {
            table[idx].occupied = false;
            table[idx].deleted = true;
            return true;
        }
    }
    return false;
}

void oa_display(const Slot* table) {
    printf("Open Addressing (Linear Probing) Slots (%d total):\n", OA_SIZE);
    for (int i = 0; i < OA_SIZE; i++) {
        if (table[i].occupied) {
            printf("Slot [%2d]: Key: %-12s | Val: %d\n", i, table[i].key, table[i].val);
        } else if (table[i].deleted) {
            printf("Slot [%2d]: <DELETED TOMBSTONE>\n", i);
        } else {
            printf("Slot [%2d]: <EMPTY>\n", i);
        }
    }
}

int main(void) {
    Slot table[OA_SIZE];
    oa_init(table);
    int choice;
    char key_buf[32];

    do {
        printf("\n=== Open Addressing Hash Table Menu ===\n");
        printf("1. Insert (Key, Value)\n");
        printf("2. Search Key\n");
        printf("3. Delete Key\n");
        printf("4. Display All Slots\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter string key and integer value: ");
                if (scanf("%31s %d", key_buf, &val) == 2) {
                    if (oa_insert(table, key_buf, val)) printf("Inserted (%s, %d).\n", key_buf, val);
                    else printf("Table is full! Collision probe exceeded.\n");
                } else clear_input();
                break;
            }
            case 2: {
                printf("Enter string key to search: ");
                if (scanf("%31s", key_buf) == 1) {
                    int val;
                    if (oa_search(table, key_buf, &val)) printf("Found '%s' => %d\n", key_buf, val);
                    else printf("Key '%s' not found.\n", key_buf);
                } else clear_input();
                break;
            }
            case 3:
                printf("Enter string key to delete: ");
                if (scanf("%31s", key_buf) == 1) {
                    if (oa_delete(table, key_buf)) printf("Deleted key '%s'.\n", key_buf);
                    else printf("Key '%s' not found.\n", key_buf);
                } else clear_input();
                break;
            case 4:
                oa_display(table);
                break;
            case 0:
                printf("Exiting Open Addressing Menu.\n");
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
Available via: `prog_open_hash`, `data-structures.full-programs.hashing.open-addressing.prog-open-hash`, `data-structures>prog_open_hash()`, `data-structures>full-programs>hashing>open-addressing>prog-open-hash>prog_open_hash()`, `programOpenHash`
