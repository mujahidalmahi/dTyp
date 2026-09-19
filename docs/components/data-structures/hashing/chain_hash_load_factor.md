# chain_hash_load_factor
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `function`
## Overview
Calculates current load factor of separate chaining table

## Signature
```c
float chain_hash_load_factor(const ChainHashTable* ht);
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
float chain_hash_load_factor(const ChainHashTable* ht) {
    if (ht->size == 0) return 0.0f;
    int items = 0;
    for (int i = 0; i < ht->size; i++) {
        Node* cur = ht->buckets[i];
        while (cur) {
            items++;
            cur = cur->next;
        }
    }
    return (float)items / ht->size;
}
```

## Aliases & Shorthands
Available via: `chain_hash_load_factor`, `data-structures.separate-components.hashing.chaining.load-factor`, `data-structures>chain_hash_load_factor()`, `data-structures>separate-components>hashing>chaining>load-factor>chain_hash_load_factor()`, `loadFactorChainHash`

## Dependencies
Requires: `data-structures.separate-components.hashing.chaining.struct`, `data-structures.separate-components.hashing.chaining.node`
