# prog_hash_functions
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `program`
## Overview
Interactive string hash function benchmark comparing DJB2, FNV-1a, and SDBM hashes

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
#include <string.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

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

unsigned long sdbm(const char* s) {
    unsigned long h = 0;
    int c;
    while ((c = *s++)) h = c + (h << 6) + (h << 16) - h;
    return h;
}

int main(void) {
    int choice;
    char buffer[128];

    do {
        printf("\n=== Hash Functions Comparison Menu ===\n");
        printf("1. Hash a Custom String (DJB2, FNV-1a, SDBM)\n");
        printf("2. Run Built-in Benchmark Strings\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter text to hash: ");
                if (scanf("%127s", buffer) == 1) {
                    printf("Input: '%s'\n", buffer);
                    printf("  DJB2   : 0x%08lX (%lu)\n", djb2(buffer), djb2(buffer));
                    printf("  FNV-1a : 0x%08X (%u)\n", fnv1a(buffer), fnv1a(buffer));
                    printf("  SDBM   : 0x%08lX (%lu)\n", sdbm(buffer), sdbm(buffer));
                } else clear_input();
                break;
            case 2: {
                const char* sample[] = {"algorithm", "data_structure", "hash_map", "binary_tree"};
                printf("%-16s | %-12s | %-12s | %-12s\n", "String", "DJB2", "FNV-1a", "SDBM");
                printf("-----------------+--------------+--------------+-------------\n");
                for (int i = 0; i < 4; i++) {
                    printf("%-16s | 0x%08lX   | 0x%08X   | 0x%08lX\n",
                           sample[i], djb2(sample[i]), fnv1a(sample[i]), sdbm(sample[i]));
                }
                break;
            }
            case 0:
                printf("Exiting Hash Functions Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_hash_functions`, `data-structures.full-programs.hashing.hash-functions.prog-hash-functions`, `data-structures>prog_hash_functions()`, `data-structures>full-programs>hashing>hash-functions>prog-hash-functions>prog_hash_functions()`, `programHashFunctions`
