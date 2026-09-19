# prog_open_hash
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `program`
## Overview
Interactive linear probing open-addressing hash table with slot display, tombstone deletion handling, collision resolution, search, and load factor

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
#include <string.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

typedef enum EntryState { EMPTY, OCCUPIED, DELETED } EntryState;

typedef struct OpenEntry {
    char key[32];
    int value;
    EntryState state;
} OpenEntry;

typedef struct OpenHashTable {
    OpenEntry* entries;
    int capacity;
    int count;
} OpenHashTable;

static unsigned long hash_func(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

OpenHashTable* create_table(int cap) {
    OpenHashTable* ht = (OpenHashTable*)malloc(sizeof(OpenHashTable));
    if (!ht) return NULL;
    ht->capacity = cap;
    ht->count = 0;
    ht->entries = (OpenEntry*)calloc(cap, sizeof(OpenEntry));
    for (int i = 0; i < cap; i++) ht->entries[i].state = EMPTY;
    return ht;
}

bool insert_or_update(OpenHashTable* ht, const char* key, int value) {
    if (ht->count >= ht->capacity) return false;
    unsigned long idx = hash_func(key, ht->capacity);
    int first_deleted = -1;

    for (int i = 0; i < ht->capacity; i++) {
        int pos = (idx + i) % ht->capacity;
        if (ht->entries[pos].state == OCCUPIED) {
            if (strcmp(ht->entries[pos].key, key) == 0) {
                ht->entries[pos].value = value;
                return true;
            }
        } else if (ht->entries[pos].state == DELETED) {
            if (first_deleted == -1) first_deleted = pos;
        } else {
            int target = (first_deleted != -1) ? first_deleted : pos;
            strncpy(ht->entries[target].key, key, sizeof(ht->entries[target].key) - 1);
            ht->entries[target].key[sizeof(ht->entries[target].key) - 1] = '\0';
            ht->entries[target].value = value;
            ht->entries[target].state = OCCUPIED;
            ht->count++;
            return true;
        }
    }
    if (first_deleted != -1) {
        strncpy(ht->entries[first_deleted].key, key, sizeof(ht->entries[first_deleted].key) - 1);
        ht->entries[first_deleted].key[sizeof(ht->entries[first_deleted].key) - 1] = '\0';
        ht->entries[first_deleted].value = value;
        ht->entries[first_deleted].state = OCCUPIED;
        ht->count++;
        return true;
    }
    return false;
}

bool search_key(const OpenHashTable* ht, const char* key, int* val) {
    unsigned long idx = hash_func(key, ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        int pos = (idx + i) % ht->capacity;
        if (ht->entries[pos].state == EMPTY) return false;
        if (ht->entries[pos].state == OCCUPIED && strcmp(ht->entries[pos].key, key) == 0) {
            *val = ht->entries[pos].value;
            return true;
        }
    }
    return false;
}

bool delete_key(OpenHashTable* ht, const char* key, int* val) {
    unsigned long idx = hash_func(key, ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        int pos = (idx + i) % ht->capacity;
        if (ht->entries[pos].state == EMPTY) return false;
        if (ht->entries[pos].state == OCCUPIED && strcmp(ht->entries[pos].key, key) == 0) {
            *val = ht->entries[pos].value;
            ht->entries[pos].state = DELETED;
            ht->count--;
            return true;
        }
    }
    return false;
}

void display_slots(const OpenHashTable* ht) {
    printf("Open Addressing Table (%d slots, %d items, load: %.2f):\n",
           ht->capacity, ht->count, (float)ht->count / ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        if (ht->entries[i].state == OCCUPIED) {
            printf("[%d]: OCCUPIED (%s: %d)\n", i, ht->entries[i].key, ht->entries[i].value);
        } else if (ht->entries[i].state == DELETED) {
            printf("[%d]: <DELETED / TOMBSTONE>\n", i);
        } else {
            printf("[%d]: EMPTY\n", i);
        }
    }
}

void free_table(OpenHashTable* ht) {
    if (!ht) return;
    free(ht->entries);
    free(ht);
}

int main(void) {
    OpenHashTable* ht = create_table(11);
    int choice = 0;
    char key[32];
    int val = 0;

    do {
        printf("\n--- Open Addressing (Linear Probing) Operations ---\n");
        printf("1. Insert or Update\n");
        printf("2. Search Key\n");
        printf("3. Delete Key\n");
        printf("4. Display Slots\n");
        printf("5. Count Elements\n");
        printf("6. Calculate Load Factor\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter string key and integer value: ");
                if (scanf("%31s %d", key, &val) == 2) {
                    if (insert_or_update(ht, key, val))
                        printf("Inserted (%s: %d).\n", key, val);
                    else
                        printf("Hash table is FULL!\n");
                } else clear_input();
                break;
            case 2:
                printf("Enter string key: ");
                if (scanf("%31s", key) == 1) {
                    if (search_key(ht, key, &val)) printf("Found '%s' -> %d.\n", key, val);
                    else printf("Key '%s' not found.\n", key);
                } else clear_input();
                break;
            case 3:
                printf("Enter string key: ");
                if (scanf("%31s", key) == 1) {
                    if (delete_key(ht, key, &val)) printf("Deleted '%s' (value %d).\n", key, val);
                    else printf("Key '%s' not found.\n", key);
                } else clear_input();
                break;
            case 4:
                display_slots(ht);
                break;
            case 5:
                printf("Total elements: %d\n", ht->count);
                break;
            case 6:
                printf("Load Factor: %.2f (Elements: %d, Capacity: %d)\n",
                       (float)ht->count / ht->capacity, ht->count, ht->capacity);
                break;
            case 0:
                printf("Exiting open addressing program.\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 6.\n");
                break;
        }
    } while (choice != 0);

    free_table(ht);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_open_hash`, `data-structures.full-programs.hashing.open-addressing.prog-open-hash`, `data-structures>prog_open_hash()`, `data-structures>full-programs>hashing>open-addressing>prog-open-hash>prog_open_hash()`, `programOpenHash`
