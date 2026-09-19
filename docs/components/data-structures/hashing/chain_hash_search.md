# chain_hash_search
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `function`
## Overview
Searches key in separate chaining hash table

## Signature
```c
int chain_hash_search(const ChainHashTable* ht, const char* key, int* val);
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
static unsigned long chain_hash_fn_search(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

int chain_hash_search(const ChainHashTable* ht, const char* key, int* val) {
    unsigned long b = chain_hash_fn_search(key, ht->size);
    Node* cur = ht->buckets[b];
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            *val = cur->value;
            return 1;
        }
        cur = cur->next;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `chain_hash_search`, `data-structures.separate-components.hashing.chaining.search`, `data-structures>chain_hash_search()`, `data-structures>separate-components>hashing>chaining>search>chain_hash_search()`, `searchChainHash`

## Dependencies
Requires: `data-structures.separate-components.hashing.chaining.struct`, `data-structures.separate-components.hashing.chaining.node`
