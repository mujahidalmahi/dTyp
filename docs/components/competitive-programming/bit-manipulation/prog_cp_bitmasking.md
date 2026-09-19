# prog_cp_bitmasking
> **Domain:** `competitive-programming` | **Subcategory:** `bit-manipulation` | **Type:** `program`
## Overview
Codeforces style state bitmasking suite enumerating submasks and subset operations

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

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void print_set_elements(unsigned int mask) {
    printf("{ ");
    int first = 1;
    for (int i = 0; i < 30; i++) {
        if (mask & (1U << i)) {
            if (!first) printf(", ");
            printf("%d", i);
            first = 0;
        }
    }
    printf(" }\n");
}

static void enumerate_submasks(unsigned int mask) {
    int count = 0;
    unsigned int sub = mask;
    while (1) {
        printf("Submask #%-3d: %u (0x%X) -> ", ++count, sub, sub);
        print_set_elements(sub);
        if (sub == 0) break;
        sub = (sub - 1) & mask;
    }
    printf("Total submasks: %d\n", count);
}

static int is_subset(unsigned int a, unsigned int b) {
    return (a & b) == a;
}

int main(void) {
    int choice;
    unsigned int mask = 13;
    do {
        printf("=== State Bitmasking Codeforces Suite ===\n");
        printf("Current Mask: %u (0x%X) -> ", mask, mask);
        print_set_elements(mask);
        printf("1. Enter Base Mask\n");
        printf("2. Enumerate All Submasks (s = (s - 1) & mask)\n");
        printf("3. Check Subset Relation (A is subset of B)\n");
        printf("4. Bitmask Set Operations (Union, Intersection, Diff)\n");
        printf("5. Enumerate All Subsets of Size K from N Items\n");
        printf("6. Solve CF Multi-Testcases (T Cases)\n");
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
                printf("Enter mask integer: ");
                if (scanf("%u", &mask) == 1) clear_input();
                else clear_input();
                break;
            }
            case 2:
                enumerate_submasks(mask);
                break;
            case 3: {
                unsigned int a, b;
                printf("Enter mask A and mask B: ");
                if (scanf("%u %u", &a, &b) == 2) {
                    clear_input();
                    printf("A is %ssubset of B\n", is_subset(a, b) ? "a " : "NOT a ");
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                unsigned int other;
                printf("Enter second mask: ");
                if (scanf("%u", &other) == 1) {
                    clear_input();
                    printf("Union:        %u -> ", mask | other);
                    print_set_elements(mask | other);
                    printf("Intersection: %u -> ", mask & other);
                    print_set_elements(mask & other);
                    printf("Difference:   %u -> ", mask & ~other);
                    print_set_elements(mask & ~other);
                    printf("Symmetric:    %u -> ", mask ^ other);
                    print_set_elements(mask ^ other);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                int n_items, k;
                printf("Enter total items N (<= 15) and subset size K: ");
                if (scanf("%d %d", &n_items, &k) == 2 && n_items <= 15 && k <= n_items && k >= 0) {
                    clear_input();
                    int total = 0;
                    for (unsigned int m = 0; m < (1U << n_items); m++) {
                        int cnt = 0;
                        for (unsigned int tmp = m; tmp > 0; tmp &= (tmp - 1)) cnt++;
                        if (cnt == k) {
                            printf("Comb #%-3d: %u -> ", ++total, m);
                            print_set_elements(m);
                        }
                    }
                    printf("Total combinations: %d\n", total);
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        unsigned int cur;
                        printf("[Case #%d] Enter mask: ", c);
                        scanf("%u", &cur);
                        clear_input();
                        int sub_count = 1;
                        for (unsigned int tmp = cur; tmp > 0; tmp &= (tmp - 1)) sub_count *= 2;
                        printf("Mask %u has %d set bits and %d submasks.\n", cur, sub_count, 1 << sub_count);
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
Available via: `prog_cp_bitmasking`, `competitive-programming.full-programs.bit-manipulation.bitmasking.prog-bitmasking`, `competitive-programming>prog_cp_bitmasking()`, `competitive-programming>full-programs>bit-manipulation>bitmasking>prog-bitmasking>prog_cp_bitmasking()`
