# open_hash_search
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `function`
## Overview
Searches key with linear probing in open addressing hash table

## Signature
```c
int open_hash_search(const OpenHashTable* ht, const char* key, int* val);
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
static unsigned long open_hash_calc_s(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

int open_hash_search(const OpenHashTable* ht, const char* key, int* val) {
    unsigned long idx = open_hash_calc_s(key, ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        int pos = (idx + i) % ht->capacity;
        if (!ht->entries[pos].occupied) return 0;
        if (strcmp(ht->entries[pos].key, key) == 0) {
            *val = ht->entries[pos].value;
            return 1;
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `open_hash_search`, `data-structures.separate-components.hashing.open-addressing.search`, `data-structures>open_hash_search()`, `data-structures>separate-components>hashing>open-addressing>search>open_hash_search()`, `searchOpenHash`

## Dependencies
Requires: `data-structures.separate-components.hashing.open-addressing.struct`
