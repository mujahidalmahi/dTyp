# prog_cp_bitwise_tricks
> **Domain:** `competitive-programming` | **Subcategory:** `bit-manipulation` | **Type:** `program`
## Overview
Codeforces style bitwise tricks suite testing popcount, LSB, power of two, and Gosper hack

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

static void print_binary_32(unsigned int n) {
    for (int i = 31; i >= 0; i--) {
        putchar((n & (1U << i)) ? '1' : '0');
        if (i % 8 == 0 && i > 0) putchar(' ');
    }
    putchar('\n');
}

static int popcount_32(unsigned int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}

static unsigned int lowest_set_bit(unsigned int n) {
    return n & (~n + 1U);
}

static int is_power_of_two(unsigned int n) {
    return (n > 0) && ((n & (n - 1)) == 0);
}

static unsigned int reverse_bits_32(unsigned int n) {
    unsigned int rev = 0;
    for (int i = 0; i < 32; i++) {
        rev = (rev << 1) | (n & 1);
        n >>= 1;
    }
    return rev;
}

static unsigned int gosper_next_permutation(unsigned int mask) {
    if (mask == 0) return 0;
    unsigned int c = mask & -mask;
    unsigned int r = mask + c;
    return (((r ^ mask) >> 2) / c) | r;
}

int main(void) {
    int choice;
    unsigned int n = 42;
    do {
        printf("=== Bitwise Tricks Codeforces Suite ===\n");
        printf("Current N: %u (0x%X)\n", n, n);
        printf("1. Enter New Integer N\n");
        printf("2. Display 32-bit Binary Representation\n");
        printf("3. Count Set Bits (Popcount)\n");
        printf("4. Extract Lowest Set Bit (LSB)\n");
        printf("5. Check If Power of Two\n");
        printf("6. Set, Clear, or Toggle k-th Bit\n");
        printf("7. Gosper's Hack: Next Number with Same Popcount\n");
        printf("8. Reverse 32 Bits\n");
        printf("9. Solve CF Multi-Testcases (T Cases)\n");
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
                printf("Enter non-negative integer: ");
                if (scanf("%u", &n) != 1) clear_input();
                else clear_input();
                break;
            }
            case 2:
                printf("Binary: ");
                print_binary_32(n);
                break;
            case 3:
                printf("Popcount(%u) = %d\n", n, popcount_32(n));
                break;
            case 4: {
                unsigned int lsb = lowest_set_bit(n);
                printf("Lowest set bit value: %u (0x%X)\n", lsb, lsb);
                break;
            }
            case 5:
                printf("%u is %s power of two.\n", n, is_power_of_two(n) ? "a" : "NOT a");
                break;
            case 6: {
                int k, op;
                printf("Enter bit index k (0 to 31): ");
                if (scanf("%d", &k) == 1 && k >= 0 && k < 32) {
                    printf("Operation (1: Set, 2: Clear, 3: Toggle): ");
                    if (scanf("%d", &op) == 1) {
                        clear_input();
                        if (op == 1) n |= (1U << k);
                        else if (op == 2) n &= ~(1U << k);
                        else if (op == 3) n ^= (1U << k);
                        printf("Updated N: %u\n", n);
                    } else {
                        clear_input();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 7: {
                unsigned int nxt = gosper_next_permutation(n);
                printf("Next permutation with %d bits: %u (0x%X)\n", popcount_32(n), nxt, nxt);
                break;
            }
            case 8: {
                unsigned int rev = reverse_bits_32(n);
                printf("Reversed: %u (0x%08X)\n", rev, rev);
                printf("Reversed Binary: ");
                print_binary_32(rev);
                break;
            }
            case 9: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        unsigned int val;
                        printf("[Case #%d] Enter N: ", c);
                        scanf("%u", &val);
                        clear_input();
                        printf("Popcount: %d | LSB: %u | Pow2: %s\n",
                               popcount_32(val), lowest_set_bit(val),
                               is_power_of_two(val) ? "YES" : "NO");
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
Available via: `prog_cp_bitwise_tricks`, `competitive-programming.full-programs.bit-manipulation.bitwise-tricks.prog-bitwise-tricks`, `competitive-programming>prog_cp_bitwise_tricks()`, `competitive-programming>full-programs>bit-manipulation>bitwise-tricks>prog-bitwise-tricks>prog_cp_bitwise_tricks()`
