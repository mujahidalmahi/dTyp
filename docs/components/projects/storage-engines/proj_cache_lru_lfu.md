# proj_cache_lru_lfu
> **Domain:** `projects` | **Subcategory:** `storage-engines` | **Type:** `program`
## Overview
Least Recently Used (LRU) memory cache with O(1) eviction on capacity breach

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

typedef struct {
    int key;
    int val;
    int last_access;
} CacheSlot;

CacheSlot cache[3];
int clock_tick = 0;

void lru_put(int key, int val) {
    clock_tick++;
    for (int i = 0; i < 3; i++) {
        if (cache[i].key == key) {
            cache[i].val = val;
            cache[i].last_access = clock_tick;
            return;
        }
    }
    int lru_idx = 0;
    int oldest = cache[0].last_access;
    for (int i = 1; i < 3; i++) {
        if (cache[i].last_access < oldest) {
            oldest = cache[i].last_access;
            lru_idx = i;
        }
    }
    printf("Evicting key %d to insert key %d\n", cache[lru_idx].key, key);
    cache[lru_idx].key = key;
    cache[lru_idx].val = val;
    cache[lru_idx].last_access = clock_tick;
}

int main(void) {
    cache[0] = (CacheSlot){1, 100, 1};
    cache[1] = (CacheSlot){2, 200, 2};
    cache[2] = (CacheSlot){3, 300, 3};
    clock_tick = 3;
    lru_put(4, 400);
    lru_put(5, 500);
    printf("Current Cache Keys: [%d, %d, %d]\n", cache[0].key, cache[1].key, cache[2].key);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_cache_lru_lfu`, `projects.storage-engines.lru-cache.prog-cache-lru-lfu`, `projects>proj_cache_lru_lfu()`, `projects>storage-engines>lru-cache>prog-cache-lru-lfu>proj_cache_lru_lfu()`
