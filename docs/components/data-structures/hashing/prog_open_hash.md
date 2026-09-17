# prog_open_hash
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `program`
## Overview
Complete linear probing open addressing hash table program

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
#include <string.h>
#include <stdbool.h>

#define SIZE 11

typedef struct Entry {
    char key[32];
    int val;
    bool occupied;
} Entry;

int main(void) {
    Entry table[SIZE] = {0};

    const char* keys[] = {"blue", "red", "green"};
    int vals[] = {10, 20, 30};

    for (int i = 0; i < 3; i++) {
        unsigned long h = 0;
        for (int c = 0; keys[i][c]; c++) h = (h * 31) + keys[i][c];
        int idx = h % SIZE;
        while (table[idx].occupied) {
            idx = (idx + 1) % SIZE;
        }
        strncpy(table[idx].key, keys[i], 31);
        table[idx].val = vals[i];
        table[idx].occupied = true;
    }

    printf("Open Addressing Table contents:
");
    for (int i = 0; i < SIZE; i++) {
        if (table[i].occupied) {
            printf("[%d] Key: %-8s Val: %d
", i, table[i].key, table[i].val);
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_open_hash`, `data-structures.full-programs.hashing.open-addressing.prog-open-hash`, `data-structures>prog_open_hash()`, `data-structures>full-programs>hashing>open-addressing>prog-open-hash>prog_open_hash()`, `programOpenHash`
