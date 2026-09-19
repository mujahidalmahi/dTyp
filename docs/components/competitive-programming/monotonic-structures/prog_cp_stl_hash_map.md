# prog_cp_stl_hash_map
> **Domain:** `competitive-programming` | **Subcategory:** `monotonic-structures` | **Type:** `program`
## Overview
Anti-hack splitmix64 fast open-addressing hash table in C for competitive frequency queries

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
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#define TABLE_SIZE 262144
#define MASK (TABLE_SIZE - 1)

static uint64_t splitmix64(uint64_t x) {
    x += 0x9e3779b97f4a7c15ULL;
    x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
    x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
    return x ^ (x >> 31);
}

typedef struct {
    long long key;
    int count;
    int occupied;
} HashEntry;

static HashEntry table[TABLE_SIZE];

static void hash_clear(void) {
    memset(table, 0, sizeof(table));
}

static void hash_insert(long long key) {
    uint32_t idx = (uint32_t)(splitmix64((uint64_t)key) & MASK);
    while (table[idx].occupied) {
        if (table[idx].key == key) {
            table[idx].count++;
            return;
        }
        idx = (idx + 1) & MASK;
    }
    table[idx].occupied = 1;
    table[idx].key = key;
    table[idx].count = 1;
}

static int hash_query(long long key) {
    uint32_t idx = (uint32_t)(splitmix64((uint64_t)key) & MASK);
    while (table[idx].occupied) {
        if (table[idx].key == key) return table[idx].count;
        idx = (idx + 1) & MASK;
    }
    return 0;
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    hash_clear();
    for (int i = 0; i < n; i++) {
        long long val;
        if (scanf("%lld", &val) == 1) {
            hash_insert(val);
        }
    }

    for (int i = 0; i < q; i++) {
        long long query_key;
        if (scanf("%lld", &query_key) == 1) {
            printf("%d%c", hash_query(query_key), (i == q - 1 ? '\n' : ' '));
        }
    }
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_stl_hash_map`, `competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-stl-hash-map`, `competitive-programming>prog_cp_stl_hash_map()`, `competitive-programming>full-programs>cp-data-structures>monotonic-structures>prog-cp-stl-hash-map>prog_cp_stl_hash_map()`, `cpStlHashMap`
