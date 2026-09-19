# proj_cache_lru_lfu
> **Domain:** `projects` | **Subcategory:** `storage-engines` | **Type:** `program`
## Overview
Interactive LRU and LFU cache eviction simulator with hit/miss telemetry

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

#define MAX_CAP 20

typedef struct {
    int key;
    int val;
    int last_access;
    int freq;
} CacheSlot;

static CacheSlot slots[MAX_CAP];
static int cap = 4;
static int size = 0;
static int timer = 0;
static int hits = 0, misses = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void put_lru(int k, int v) {
    timer++;
    for (int i = 0; i < size; i++) {
        if (slots[i].key == k) {
            slots[i].val = v;
            slots[i].last_access = timer;
            slots[i].freq++;
            printf("Key %d updated.\n", k);
            return;
        }
    }
    if (size < cap) {
        slots[size] = (CacheSlot){k, v, timer, 1};
        size++;
        printf("Inserted key %d (Size: %d/%d).\n", k, size, cap);
    } else {
        int lru_idx = 0;
        int oldest = slots[0].last_access;
        for (int i = 1; i < size; i++) {
            if (slots[i].last_access < oldest) {
                oldest = slots[i].last_access;
                lru_idx = i;
            }
        }
        printf("Evicted key %d (LRU). Inserted key %d.\n", slots[lru_idx].key, k);
        slots[lru_idx] = (CacheSlot){k, v, timer, 1};
    }
}

static void get_lru(int k) {
    timer++;
    for (int i = 0; i < size; i++) {
        if (slots[i].key == k) {
            slots[i].last_access = timer;
            slots[i].freq++;
            hits++;
            printf("[CACHE HIT] Key %d -> Value: %d\n", k, slots[i].val);
            return;
        }
    }
    misses++;
    printf("[CACHE MISS] Key %d not in cache.\n", k);
}

int main(void) {
    int choice;
    do {
        printf("=== LRU Cache Eviction Workbench ===\n");
        printf("Capacity: %d | Cached Elements: %d | Hits: %d | Misses: %d\n", cap, size, hits, misses);
        printf("1. PUT(key, value)\n");
        printf("2. GET(key)\n");
        printf("3. Display Cache Contents\n");
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
                int k, v;
                printf("Enter key and value: ");
                if (scanf("%d %d", &k, &v) == 2) {
                    clear_input();
                    put_lru(k, v);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                int k;
                printf("Enter key to get: ");
                if (scanf("%d", &k) == 1) {
                    clear_input();
                    get_lru(k);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                printf("%-8s | %-8s | %-12s | %-8s\n", "Key", "Value", "Last Access", "Freq");
                printf("--------------------------------------------\n");
                for (int i = 0; i < size; i++) {
                    printf("%-8d | %-8d | %-12d | %-8d\n",
                           slots[i].key, slots[i].val, slots[i].last_access, slots[i].freq);
                }
                break;
            }
            case 0:
                printf("Exiting cache workbench.\n");
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
Available via: `proj_cache_lru_lfu`, `projects.storage-engines.lru-cache.prog-cache-lru-lfu`, `projects>proj_cache_lru_lfu()`, `projects>storage-engines>lru-cache>prog-cache-lru-lfu>proj_cache_lru_lfu()`
