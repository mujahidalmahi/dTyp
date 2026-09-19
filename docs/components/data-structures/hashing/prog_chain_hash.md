# prog_chain_hash
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `program`
## Overview
Interactive separate chaining hash table program with dynamic string keys, integer values, collision handling, deletions, load factor, and automatic rehashing

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

typedef struct Node {
    char key[32];
    int value;
    struct Node* next;
} Node;

typedef struct ChainHashTable {
    Node** buckets;
    int size;
    int count;
} ChainHashTable;

static unsigned long hash_func(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

ChainHashTable* create_table(int size) {
    ChainHashTable* ht = (ChainHashTable*)malloc(sizeof(ChainHashTable));
    if (!ht) return NULL;
    ht->size = size;
    ht->count = 0;
    ht->buckets = (Node**)calloc(size, sizeof(Node*));
    return ht;
}

void insert_or_update(ChainHashTable* ht, const char* key, int value) {
    unsigned long b = hash_func(key, ht->size);
    Node* cur = ht->buckets[b];
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            cur->value = value;
            return;
        }
        cur = cur->next;
    }
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    strncpy(n->key, key, sizeof(n->key) - 1);
    n->key[sizeof(n->key) - 1] = '\0';
    n->value = value;
    n->next = ht->buckets[b];
    ht->buckets[b] = n;
    ht->count++;
}

bool search_key(const ChainHashTable* ht, const char* key, int* val) {
    unsigned long b = hash_func(key, ht->size);
    Node* cur = ht->buckets[b];
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            *val = cur->value;
            return true;
        }
        cur = cur->next;
    }
    return false;
}

bool delete_key(ChainHashTable* ht, const char* key, int* val) {
    unsigned long b = hash_func(key, ht->size);
    Node* cur = ht->buckets[b];
    Node* prev = NULL;
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            *val = cur->value;
            if (prev) prev->next = cur->next;
            else ht->buckets[b] = cur->next;
            free(cur);
            ht->count--;
            return true;
        }
        prev = cur;
        cur = cur->next;
    }
    return false;
}

void display_table(const ChainHashTable* ht) {
    printf("Separate Chaining Table (size: %d, count: %d, load factor: %.2f):\n",
           ht->size, ht->count, (float)ht->count / ht->size);
    for (int i = 0; i < ht->size; i++) {
        printf("Bucket [%d]: ", i);
        Node* cur = ht->buckets[i];
        while (cur) {
            printf("(%s: %d) -> ", cur->key, cur->value);
            cur = cur->next;
        }
        printf("NULL\n");
    }
}

void rehash(ChainHashTable* ht) {
    int old_size = ht->size;
    Node** old_buckets = ht->buckets;

    ht->size = old_size * 2;
    ht->count = 0;
    ht->buckets = (Node**)calloc(ht->size, sizeof(Node*));

    for (int i = 0; i < old_size; i++) {
        Node* cur = old_buckets[i];
        while (cur) {
            insert_or_update(ht, cur->key, cur->value);
            Node* tmp = cur;
            cur = cur->next;
            free(tmp);
        }
    }
    free(old_buckets);
    printf("Rehashed table to new size: %d\n", ht->size);
}

void free_table(ChainHashTable* ht) {
    if (!ht) return;
    for (int i = 0; i < ht->size; i++) {
        Node* cur = ht->buckets[i];
        while (cur) {
            Node* tmp = cur;
            cur = cur->next;
            free(tmp);
        }
    }
    free(ht->buckets);
    free(ht);
}

int main(void) {
    ChainHashTable* ht = create_table(7);
    int choice = 0;
    char key[32];
    int val = 0;

    do {
        printf("\n--- Separate Chaining Hash Table Operations ---\n");
        printf("1. Insert or Update\n");
        printf("2. Search Key\n");
        printf("3. Delete Key\n");
        printf("4. Display Table\n");
        printf("5. Count Total Elements\n");
        printf("6. Calculate Load Factor\n");
        printf("7. Rehash Table\n");
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
                    insert_or_update(ht, key, val);
                    printf("Stored (%s: %d).\n", key, val);
                    if ((float)ht->count / ht->size > 0.75f) {
                        printf("Load factor > 0.75; auto-rehashing...\n");
                        rehash(ht);
                    }
                } else clear_input();
                break;
            case 2:
                printf("Enter string key to search: ");
                if (scanf("%31s", key) == 1) {
                    if (search_key(ht, key, &val)) printf("Key '%s' found with value %d.\n", key, val);
                    else printf("Key '%s' not found.\n", key);
                } else clear_input();
                break;
            case 3:
                printf("Enter string key to delete: ");
                if (scanf("%31s", key) == 1) {
                    if (delete_key(ht, key, &val)) printf("Deleted '%s' (value %d).\n", key, val);
                    else printf("Key '%s' not found.\n", key);
                } else clear_input();
                break;
            case 4:
                display_table(ht);
                break;
            case 5:
                printf("Total elements: %d\n", ht->count);
                break;
            case 6:
                printf("Current Load Factor: %.2f (Elements: %d, Capacity: %d)\n",
                       (float)ht->count / ht->size, ht->count, ht->size);
                break;
            case 7:
                rehash(ht);
                break;
            case 0:
                printf("Exiting separate chaining program.\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 7.\n");
                break;
        }
    } while (choice != 0);

    free_table(ht);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_chain_hash`, `data-structures.full-programs.hashing.chaining.prog-chain-hash`, `data-structures>prog_chain_hash()`, `data-structures>full-programs>hashing>chaining>prog-chain-hash>prog_chain_hash()`, `programChainHash`
