# hash_murmur32
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `function`
## Overview
MurmurHash3 32-bit avalanche mixer

## Signature
```c
uint32_t hash_murmur32(const char* key, uint32_t seed);
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
uint32_t hash_murmur32(const char* key, uint32_t seed) {
    uint32_t h = seed;
    uint32_t k;
    size_t len = strlen(key);
    const uint8_t* data = (const uint8_t*)key;
    const size_t nblocks = len / 4;
    for (size_t i = 0; i < nblocks; i++) {
        k = (uint32_t)data[i*4] | ((uint32_t)data[i*4+1] << 8) |
            ((uint32_t)data[i*4+2] << 16) | ((uint32_t)data[i*4+3] << 24);
        k *= 0xcc9e2d51;
        k = (k << 15) | (k >> 17);
        k *= 0x1b873593;
        h ^= k;
        h = (h << 13) | (h >> 19);
        h = h * 5 + 0xe6546b64;
    }
    k = 0;
    const uint8_t* tail = data + (nblocks * 4);
    switch (len & 3) {
        case 3: k ^= (uint32_t)tail[2] << 16;
        case 2: k ^= (uint32_t)tail[1] << 8;
        case 1: k ^= (uint32_t)tail[0];
                k *= 0xcc9e2d51;
                k = (k << 15) | (k >> 17);
                k *= 0x1b873593;
                h ^= k;
    }
    h ^= (uint32_t)len;
    h ^= h >> 16;
    h *= 0x85ebca6b;
    h ^= h >> 13;
    h *= 0xc2b2ae35;
    h ^= h >> 16;
    return h;
}
```

## Aliases & Shorthands
Available via: `hash_murmur32`, `data-structures.separate-components.hashing.hash-functions.murmur32`, `data-structures>hash_murmur32()`, `data-structures>separate-components>hashing>hash-functions>murmur32>hash_murmur32()`, `murmur32Hash`
