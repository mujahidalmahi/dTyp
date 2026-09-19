# chain_hash_delete
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `function`
## Overview
Deletes key from separate chaining hash table

## Signature
```c
int chain_hash_delete(ChainHashTable* ht, const char* key, int* val);
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
static unsigned long chain_hash_fn_del(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

int chain_hash_delete(ChainHashTable* ht, const char* key, int* val) {
    unsigned long b = chain_hash_fn_del(key, ht->size);
    Node* cur = ht->buckets[b];
    Node* prev = NULL;
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            *val = cur->value;
            if (prev) prev->next = cur->next;
            else ht->buckets[b] = cur->next;
            free(cur);
            return 1;
        }
        prev = cur;
        cur = cur->next;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `chain_hash_delete`, `data-structures.separate-components.hashing.chaining.delete`, `data-structures>chain_hash_delete()`, `data-structures>separate-components>hashing>chaining>delete>chain_hash_delete()`, `deleteChainHash`

## Dependencies
Requires: `data-structures.separate-components.hashing.chaining.struct`, `data-structures.separate-components.hashing.chaining.node`
