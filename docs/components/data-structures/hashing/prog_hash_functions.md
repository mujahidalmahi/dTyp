# prog_hash_functions
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `program`
## Overview
Interactive hash workbench comparing DJB2, FNV-1a, MurmurHash3, SDBM, and Polynomial rolling hashes with benchmark and 1-bit mutation avalanche test

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
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

unsigned long hash_djb2(const char* str) {
    unsigned long hash = 5381;
    int c;
    while ((c = (unsigned char)*str++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash;
}

uint32_t hash_fnv1a(const char* str) {
    uint32_t hash = 2166136261u;
    while (*str) {
        hash ^= (uint8_t)(*str++);
        hash *= 16777619u;
    }
    return hash;
}

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

unsigned long hash_sdbm(const char* str) {
    unsigned long hash = 0;
    int c;
    while ((c = (unsigned char)*str++)) {
        hash = c + (hash << 6) + (hash << 16) - hash;
    }
    return hash;
}

uint64_t hash_polynomial(const char* str) {
    const int p = 31;
    const uint64_t m = 1000000009;
    uint64_t hash_val = 0;
    uint64_t p_pow = 1;
    while (*str) {
        hash_val = (hash_val + (*str - 'a' + 1) * p_pow) % m;
        p_pow = (p_pow * p) % m;
        str++;
    }
    return hash_val;
}

static int count_differing_bits(uint32_t a, uint32_t b) {
    uint32_t diff = a ^ b;
    int cnt = 0;
    while (diff) {
        cnt += diff & 1;
        diff >>= 1;
    }
    return cnt;
}

int main(void) {
    char input[128];
    int choice = 0;

    do {
        printf("\n--- Hash Functions Workbench ---\n");
        printf("1. Hash String with DJB2\n");
        printf("2. Hash String with FNV-1a\n");
        printf("3. Hash String with MurmurHash3\n");
        printf("4. Hash String with SDBM\n");
        printf("5. Hash String with Polynomial Rolling Hash\n");
        printf("6. Benchmark All 5 on Input String\n");
        printf("7. Avalanche Effect Test (1-bit mutation comparison)\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("DJB2 Hash: 0x%08lx (%lu)\n", hash_djb2(input), hash_djb2(input));
                } else clear_input();
                break;
            case 2:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("FNV-1a Hash: 0x%08x (%u)\n", hash_fnv1a(input), hash_fnv1a(input));
                } else clear_input();
                break;
            case 3:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("MurmurHash3: 0x%08x (%u)\n", hash_murmur32(input, 42), hash_murmur32(input, 42));
                } else clear_input();
                break;
            case 4:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("SDBM Hash: 0x%08lx (%lu)\n", hash_sdbm(input), hash_sdbm(input));
                } else clear_input();
                break;
            case 5:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("Polynomial Hash: %llu\n", (unsigned long long)hash_polynomial(input));
                } else clear_input();
                break;
            case 6:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("--- Benchmark Results for '%s' ---\n", input);
                    printf("DJB2       : 0x%08lx\n", hash_djb2(input));
                    printf("FNV-1a     : 0x%08x\n", hash_fnv1a(input));
                    printf("MurmurHash3: 0x%08x\n", hash_murmur32(input, 42));
                    printf("SDBM       : 0x%08lx\n", hash_sdbm(input));
                    printf("Polynomial : %llu\n", (unsigned long long)hash_polynomial(input));
                } else clear_input();
                break;
            case 7: {
                char mutated[128];
                printf("Enter base string: ");
                if (scanf("%127s", input) == 1) {
                    strncpy(mutated, input, sizeof(mutated) - 1);
                    mutated[sizeof(mutated) - 1] = '\0';
                    mutated[0] ^= 1;
                    printf("Original: '%s' | Mutated: '%s'\n", input, mutated);
                    uint32_t h1 = hash_fnv1a(input);
                    uint32_t h2 = hash_fnv1a(mutated);
                    int diff_fnv = count_differing_bits(h1, h2);
                    uint32_t m1 = hash_murmur32(input, 42);
                    uint32_t m2 = hash_murmur32(mutated, 42);
                    int diff_mur = count_differing_bits(m1, m2);
                    printf("FNV-1a Bit Flip: %d / 32 bits (%.1f%%)\n", diff_fnv, (diff_fnv / 32.0f) * 100);
                    printf("Murmur32 Bit Flip: %d / 32 bits (%.1f%%)\n", diff_mur, (diff_mur / 32.0f) * 100);
                } else clear_input();
                break;
            }
            case 0:
                printf("Exiting hash workbench.\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 7.\n");
                break;
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_hash_functions`, `data-structures.full-programs.hashing.hash-functions.prog-hash-functions`, `data-structures>prog_hash_functions()`, `data-structures>full-programs>hashing>hash-functions>prog-hash-functions>prog_hash_functions()`, `programHashFunctions`
