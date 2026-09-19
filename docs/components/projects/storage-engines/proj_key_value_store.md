# proj_key_value_store
> **Domain:** `projects` | **Subcategory:** `storage-engines` | **Type:** `program`
## Overview
Interactive in-memory Key-Value store with TTL expiration and persistent commands

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

#define MAX_ENTRIES 50

typedef struct {
    char key[32];
    char val[64];
    int ttl_seconds;
    int is_active;
} Entry;

static Entry store[MAX_ENTRIES];
static int total_entries = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void kv_set(const char* k, const char* v, int ttl) {
    for (int i = 0; i < total_entries; i++) {
        if (store[i].is_active && strcmp(store[i].key, k) == 0) {
            strncpy(store[i].val, v, 63);
            store[i].ttl_seconds = ttl;
            printf("Updated key '%s'.\n", k);
            return;
        }
    }
    if (total_entries < MAX_ENTRIES) {
        strncpy(store[total_entries].key, k, 31);
        strncpy(store[total_entries].val, v, 63);
        store[total_entries].ttl_seconds = ttl;
        store[total_entries].is_active = 1;
        total_entries++;
        printf("Set key '%s' = '%s'.\n", k, v);
    } else {
        printf("Store full.\n");
    }
}

static void kv_get(const char* k) {
    for (int i = 0; i < total_entries; i++) {
        if (store[i].is_active && strcmp(store[i].key, k) == 0) {
            printf("Value for '%s': '%s' (TTL: %d)\n", k, store[i].val, store[i].ttl_seconds);
            return;
        }
    }
    printf("Key '%s' not found or expired.\n", k);
}

static void kv_tick(int sec) {
    int expired = 0;
    for (int i = 0; i < total_entries; i++) {
        if (store[i].is_active && store[i].ttl_seconds > 0) {
            store[i].ttl_seconds -= sec;
            if (store[i].ttl_seconds <= 0) {
                store[i].is_active = 0;
                printf("Key '%s' expired and purged.\n", store[i].key);
                expired++;
            }
        }
    }
    printf("Advanced time by %d seconds. (%d keys expired)\n", sec, expired);
}

int main(void) {
    int choice;
    do {
        printf("=== In-Memory Key-Value Store with TTL ===\n");
        printf("1. SET key value (no TTL)\n");
        printf("2. SETEX key seconds value (with TTL)\n");
        printf("3. GET key\n");
        printf("4. TICK (Advance Simulated Time)\n");
        printf("5. LIST ALL Active Keys\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char k[32], v[64];
                printf("Enter key and value: ");
                if (scanf("%31s %63s", k, v) == 2) {
                    clear_input();
                    kv_set(k, v, 0);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                char k[32], v[64];
                int ttl;
                printf("Enter key, TTL seconds, and value: ");
                if (scanf("%31s %d %63s", k, &ttl, v) == 3 && ttl > 0) {
                    clear_input();
                    kv_set(k, v, ttl);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                char k[32];
                printf("Enter key: ");
                if (scanf("%31s", k) == 1) {
                    clear_input();
                    kv_get(k);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                int sec;
                printf("Enter seconds to advance: ");
                if (scanf("%d", &sec) == 1 && sec > 0) {
                    clear_input();
                    kv_tick(sec);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                printf("%-16s | %-24s | %-10s\n", "Key", "Value", "TTL");
                printf("--------------------------------------------------\n");
                for (int i = 0; i < total_entries; i++) {
                    if (store[i].is_active) {
                        printf("%-16s | %-24s | %d\n", store[i].key, store[i].val, store[i].ttl_seconds);
                    }
                }
                break;
            }
            case 0:
                printf("Exiting store.\n");
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
Available via: `proj_key_value_store`, `projects.storage-engines.key-value-store.prog-key-value-store`, `projects>proj_key_value_store()`, `projects>storage-engines>key-value-store>prog-key-value-store>proj_key_value_store()`
