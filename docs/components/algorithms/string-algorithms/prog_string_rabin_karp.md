# prog_string_rabin_karp
> **Domain:** `algorithms` | **Subcategory:** `string-algorithms` | **Type:** `program`
## Overview
Complete interactive program running Rabin-Karp rolling hash substring search

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
#include <string.h>

#define MAX_TEXT 1000
#define MAX_PAT 200
#define PRIME_MOD 1000000007LL
#define BASE 256

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void rabin_karp_search(const char* text, const char* pat) {
    int n = (int)strlen(text);
    int m = (int)strlen(pat);
    if (m > n) {
        printf("Pattern is longer than text.\n");
        return;
    }
    long long h = 1;
    for (int i = 0; i < m - 1; i++) {
        h = (h * BASE) % PRIME_MOD;
    }
    long long p_hash = 0, t_hash = 0;
    for (int i = 0; i < m; i++) {
        p_hash = (BASE * p_hash + (unsigned char)pat[i]) % PRIME_MOD;
        t_hash = (BASE * t_hash + (unsigned char)text[i]) % PRIME_MOD;
    }
    int matches = 0, collisions = 0;
    printf("Pattern found at indices: ");
    for (int i = 0; i <= n - m; i++) {
        if (p_hash == t_hash) {
            int match = 1;
            for (int j = 0; j < m; j++) {
                if (text[i + j] != pat[j]) {
                    match = 0;
                    break;
                }
            }
            if (match) {
                printf("%d ", i);
                matches++;
            } else {
                collisions++;
            }
        }
        if (i < n - m) {
            t_hash = (BASE * (t_hash - (unsigned char)text[i] * h) + (unsigned char)text[i + m]) % PRIME_MOD;
            if (t_hash < 0) t_hash += PRIME_MOD;
        }
    }
    if (matches == 0) printf("None");
    printf("\nTotal Matches: %d | Hash Collisions: %d\n", matches, collisions);
}

int main(void) {
    int choice;
    do {
        printf("=== Rabin-Karp Rolling Hash Workbench ===\n");
        printf("1. Search Pattern in Text using Rabin-Karp\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char text[MAX_TEXT], pat[MAX_PAT];
                printf("Enter text: ");
                if (scanf("%999s", text) == 1) {
                    printf("Enter pattern: ");
                    if (scanf("%199s", pat) == 1) {
                        clear_input();
                        rabin_karp_search(text, pat);
                    } else {
                        clear_input();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_string_rabin_karp`, `algorithms.full-programs.string-algorithms.rabin-karp.prog-rabin-karp`, `algorithms>prog_string_rabin_karp()`, `algorithms>full-programs>string-algorithms>rabin-karp>prog-rabin-karp>prog_string_rabin_karp()`, `programRabinKarpSearch`
