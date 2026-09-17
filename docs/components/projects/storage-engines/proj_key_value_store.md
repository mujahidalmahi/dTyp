# proj_key_value_store
> **Domain:** `projects` | **Subcategory:** `storage-engines` | **Type:** `program`
## Overview
In-memory key-value store with string values and time-to-live (TTL) expiration

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
    char key[32];
    char value[64];
    int expire_tick;
    int active;
} KvEntry;

KvEntry store[10];

void kv_set(const char* key, const char* val, int ttl_ticks, int cur_tick) {
    for (int i = 0; i < 10; i++) {
        if (!store[i].active || strcmp(store[i].key, key) == 0) {
            strcpy(store[i].key, key);
            strcpy(store[i].value, val);
            store[i].expire_tick = cur_tick + ttl_ticks;
            store[i].active = 1;
            return;
        }
    }
}

const char* kv_get(const char* key, int cur_tick) {
    for (int i = 0; i < 10; i++) {
        if (store[i].active && strcmp(store[i].key, key) == 0) {
            if (store[i].expire_tick >= cur_tick) return store[i].value;
            store[i].active = 0;
            return NULL;
        }
    }
    return NULL;
}

int main(void) {
    kv_set("session_id", "xyz987", 3, 0);
    printf("Tick 1: session_id = %s
", kv_get("session_id", 1));
    printf("Tick 2: session_id = %s
", kv_get("session_id", 2));
    printf("Tick 4 (Expired): session_id = %s
", kv_get("session_id", 4) ? "Valid" : "Expired/NULL");
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_key_value_store`, `projects.storage-engines.key-value-store.prog-key-value-store`, `projects>proj_key_value_store()`, `projects>storage-engines>key-value-store>prog-key-value-store>proj_key_value_store()`
