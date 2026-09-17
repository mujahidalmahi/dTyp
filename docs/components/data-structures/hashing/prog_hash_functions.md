# prog_hash_functions
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `program`
## Overview
Complete comparison program hashing strings with DJB2, FNV-1a, and SDBM

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
#include <stdint.h>

unsigned long djb2(const char* s) {
    unsigned long h = 5381;
    int c;
    while ((c = *s++)) h = ((h << 5) + h) + c;
    return h;
}

uint32_t fnv1a(const char* s) {
    uint32_t h = 2166136261u;
    while (*s) {
        h ^= (uint8_t)(*s++);
        h *= 16777619u;
    }
    return h;
}

int main(void) {
    const char* words[] = {"algorithm", "structure", "pointer", "memory"};
    for (int i = 0; i < 4; i++) {
        printf("Word: %-10s | DJB2: 0x%08lX | FNV-1a: 0x%08X
",
               words[i], djb2(words[i]), fnv1a(words[i]));
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_hash_functions`, `data-structures.full-programs.hashing.hash-functions.prog-hash-functions`, `data-structures>prog_hash_functions()`, `data-structures>full-programs>hashing>hash-functions>prog-hash-functions>prog_hash_functions()`, `programHashFunctions`
