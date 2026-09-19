import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCpTechniquesFullPrograms(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.fast-io-utilities.fast-io.prog-fast-io",
      name: "prog_cp_fast_io",
      type: "program",
      category: "competitive-programming",
      subcategory: "fast-io-utilities",
      categoryId: "competitive-programming.full-programs.fast-io-utilities.fast-io",
      path: "competitive-programming/full-programs/fast-io-utilities/fast-io/prog-fast-io",
      description: "Codeforces style fast I/O suite with buffered integer scanning and multi-testcase solver",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef long long ll;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int fast_read_int(int* out_val) {
    int c = getchar();
    if (c == EOF) return 0;
    while (c != '-' && (c < '0' || c > '9')) {
        c = getchar();
        if (c == EOF) return 0;
    }
    int sign = 1;
    if (c == '-') {
        sign = -1;
        c = getchar();
    }
    int res = 0;
    while (c >= '0' && c <= '9') {
        res = res * 10 + (c - '0');
        c = getchar();
    }
    *out_val = res * sign;
    return 1;
}

static int fast_read_ll(ll* out_val) {
    int c = getchar();
    if (c == EOF) return 0;
    while (c != '-' && (c < '0' || c > '9')) {
        c = getchar();
        if (c == EOF) return 0;
    }
    ll sign = 1;
    if (c == '-') {
        sign = -1;
        c = getchar();
    }
    ll res = 0;
    while (c >= '0' && c <= '9') {
        res = res * 10 + (c - '0');
        c = getchar();
    }
    *out_val = res * sign;
    return 1;
}

static void fast_write_int(int n) {
    if (n == 0) {
        putchar('0');
        return;
    }
    if (n < 0) {
        putchar('-');
        n = -n;
    }
    char buf[16];
    int idx = 0;
    while (n > 0) {
        buf[idx++] = (char)('0' + (n % 10));
        n /= 10;
    }
    while (idx > 0) {
        putchar(buf[--idx]);
    }
}

static void fast_write_ll(ll n) {
    if (n == 0) {
        putchar('0');
        return;
    }
    if (n < 0) {
        putchar('-');
        n = -n;
    }
    char buf[32];
    int idx = 0;
    while (n > 0) {
        buf[idx++] = (char)('0' + (n % 10));
        n /= 10;
    }
    while (idx > 0) {
        putchar(buf[--idx]);
    }
}

static void solve_cf_case(void) {
    int n;
    printf("Enter number of elements (N): ");
    if (!fast_read_int(&n) || n <= 0) return;
    printf("Enter %d integers: ", n);
    ll sum = 0;
    int min_val = 2147483647;
    int max_val = -2147483648;
    for (int i = 0; i < n; i++) {
        int x;
        fast_read_int(&x);
        sum += x;
        if (x < min_val) min_val = x;
        if (x > max_val) max_val = x;
    }
    printf("Sum: ");
    fast_write_ll(sum);
    printf(" | Min: ");
    fast_write_int(min_val);
    printf(" | Max: ");
    fast_write_int(max_val);
    putchar('\\n');
}

int main(void) {
    int choice;
    do {
        printf("=== Fast I/O Codeforces Suite ===\\n");
        printf("1. Solve Single Contest Case (Fast I/O)\\n");
        printf("2. Solve Multi-Testcases (T Cases)\\n");
        printf("3. Interactive Fast Integer Read/Write\\n");
        printf("4. Interactive Fast Long Long Read/Write\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                solve_cf_case();
                break;
            case 2: {
                int t;
                printf("Enter number of test cases (T): ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\\n", c);
                        solve_cf_case();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                int val;
                printf("Enter an integer: ");
                if (fast_read_int(&val)) {
                    printf("Fast written output: ");
                    fast_write_int(val);
                    putchar('\\n');
                }
                break;
            }
            case 4: {
                ll val;
                printf("Enter a 64-bit integer: ");
                if (fast_read_ll(&val)) {
                    printf("Fast written output: ");
                    fast_write_ll(val);
                    putchar('\\n');
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "fast-io", "full-program"],
      aliases: ["prog_cp_fast_io"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.fast-io-utilities.coordinate-compression.prog-coordinate-compression",
      name: "prog_cp_coordinate_compression",
      type: "program",
      category: "competitive-programming",
      subcategory: "fast-io-utilities",
      categoryId: "competitive-programming.full-programs.fast-io-utilities.coordinate-compression",
      path: "competitive-programming/full-programs/fast-io-utilities/coordinate-compression/prog-coordinate-compression",
      description: "Codeforces style coordinate compression suite mapping sparse coordinates to dense ranks",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_N 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int compare_ints(const void* a, const void* b) {
    int x = *(const int*)a;
    int y = *(const int*)b;
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}

static int compress_coords(const int* orig, int n, int* unique_arr, int* compressed) {
    int temp[MAX_N];
    for (int i = 0; i < n; i++) temp[i] = orig[i];
    qsort(temp, (size_t)n, sizeof(int), compare_ints);
    int u_len = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || temp[i] != temp[i - 1]) {
            unique_arr[u_len++] = temp[i];
        }
    }
    for (int i = 0; i < n; i++) {
        int low = 0, high = u_len - 1, rank = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (unique_arr[mid] == orig[i]) {
                rank = mid;
                break;
            }
            if (unique_arr[mid] < orig[i]) low = mid + 1;
            else high = mid - 1;
        }
        compressed[i] = rank;
    }
    return u_len;
}

static int query_rank(const int* unique_arr, int u_len, int val) {
    int low = 0, high = u_len - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (unique_arr[mid] == val) return mid;
        if (unique_arr[mid] < val) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

static void solve_cf_case(void) {
    int n;
    printf("Enter number of coordinates N (<= %d): ", MAX_N);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    int orig[MAX_N], unique_arr[MAX_N], compressed[MAX_N];
    printf("Enter %d coordinates: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &orig[i]);
    clear_input();
    int u_len = compress_coords(orig, n, unique_arr, compressed);
    printf("Distinct count: %d\\n", u_len);
    printf("Original:   ");
    for (int i = 0; i < n; i++) printf("%d ", orig[i]);
    printf("\\nCompressed: ");
    for (int i = 0; i < n; i++) printf("%d ", compressed[i]);
    printf("\\nUnique sorted: ");
    for (int i = 0; i < u_len; i++) printf("%d ", unique_arr[i]);
    printf("\\n");
}

int main(void) {
    int choice;
    int n = 0, u_len = 0;
    int orig[MAX_N], unique_arr[MAX_N], compressed[MAX_N];
    do {
        printf("=== Coordinate Compression Codeforces Suite ===\\n");
        printf("1. Solve Single Contest Case\\n");
        printf("2. Solve Multi-Testcases (T Cases)\\n");
        printf("3. Set Custom Dataset\\n");
        printf("4. Query Rank of Value\\n");
        printf("5. Query Original Coordinate by Rank\\n");
        printf("6. Display Current Mapping\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                solve_cf_case();
                break;
            case 2: {
                int t;
                printf("Enter number of test cases (T): ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\\n", c);
                        solve_cf_case();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                printf("Enter N: ");
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &orig[i]);
                    clear_input();
                    u_len = compress_coords(orig, n, unique_arr, compressed);
                    printf("Compressed %d values into %d distinct ranks.\\n", n, u_len);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (u_len == 0) {
                    printf("Dataset empty.\\n");
                    break;
                }
                int val;
                printf("Enter value to query: ");
                if (scanf("%d", &val) == 1) {
                    clear_input();
                    int r = query_rank(unique_arr, u_len, val);
                    if (r >= 0) printf("Value %d has rank %d (0-indexed)\\n", val, r);
                    else printf("Value %d not in dataset.\\n", val);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (u_len == 0) {
                    printf("Dataset empty.\\n");
                    break;
                }
                int r;
                printf("Enter rank (0 to %d): ", u_len - 1);
                if (scanf("%d", &r) == 1) {
                    clear_input();
                    if (r >= 0 && r < u_len) {
                        printf("Rank %d corresponds to coordinate %d\\n", r, unique_arr[r]);
                    } else {
                        printf("Rank out of bounds.\\n");
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                if (n == 0) {
                    printf("Dataset empty.\\n");
                    break;
                }
                printf("Original -> Compressed Rank:\\n");
                for (int i = 0; i < n; i++) {
                    printf("arr[%d] = %-8d -> rank %d\\n", i, orig[i], compressed[i]);
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "coordinate-compression", "full-program"],
      aliases: ["prog_cp_coordinate_compression"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.bit-manipulation.bitwise-tricks.prog-bitwise-tricks",
      name: "prog_cp_bitwise_tricks",
      type: "program",
      category: "competitive-programming",
      subcategory: "bit-manipulation",
      categoryId: "competitive-programming.full-programs.bit-manipulation.bitwise-tricks",
      path: "competitive-programming/full-programs/bit-manipulation/bitwise-tricks/prog-bitwise-tricks",
      description: "Codeforces style bitwise tricks suite testing popcount, LSB, power of two, and Gosper hack",
      signature: "int main(void);",
      code: `#include <stdio.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_binary_32(unsigned int n) {
    for (int i = 31; i >= 0; i--) {
        putchar((n & (1U << i)) ? '1' : '0');
        if (i % 8 == 0 && i > 0) putchar(' ');
    }
    putchar('\\n');
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
        printf("=== Bitwise Tricks Codeforces Suite ===\\n");
        printf("Current N: %u (0x%X)\\n", n, n);
        printf("1. Enter New Integer N\\n");
        printf("2. Display 32-bit Binary Representation\\n");
        printf("3. Count Set Bits (Popcount)\\n");
        printf("4. Extract Lowest Set Bit (LSB)\\n");
        printf("5. Check If Power of Two\\n");
        printf("6. Set, Clear, or Toggle k-th Bit\\n");
        printf("7. Gosper's Hack: Next Number with Same Popcount\\n");
        printf("8. Reverse 32 Bits\\n");
        printf("9. Solve CF Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
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
                printf("Popcount(%u) = %d\\n", n, popcount_32(n));
                break;
            case 4: {
                unsigned int lsb = lowest_set_bit(n);
                printf("Lowest set bit value: %u (0x%X)\\n", lsb, lsb);
                break;
            }
            case 5:
                printf("%u is %s power of two.\\n", n, is_power_of_two(n) ? "a" : "NOT a");
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
                        printf("Updated N: %u\\n", n);
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
                printf("Next permutation with %d bits: %u (0x%X)\\n", popcount_32(n), nxt, nxt);
                break;
            }
            case 8: {
                unsigned int rev = reverse_bits_32(n);
                printf("Reversed: %u (0x%08X)\\n", rev, rev);
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
                        printf("Popcount: %d | LSB: %u | Pow2: %s\\n",
                               popcount_32(val), lowest_set_bit(val),
                               is_power_of_two(val) ? "YES" : "NO");
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "bitwise-tricks", "full-program"],
      aliases: ["prog_cp_bitwise_tricks"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.bit-manipulation.bitmasking.prog-bitmasking",
      name: "prog_cp_bitmasking",
      type: "program",
      category: "competitive-programming",
      subcategory: "bit-manipulation",
      categoryId: "competitive-programming.full-programs.bit-manipulation.bitmasking",
      path: "competitive-programming/full-programs/bit-manipulation/bitmasking/prog-bitmasking",
      description: "Codeforces style state bitmasking suite enumerating submasks and subset operations",
      signature: "int main(void);",
      code: `#include <stdio.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
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
    printf(" }\\n");
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
    printf("Total submasks: %d\\n", count);
}

static int is_subset(unsigned int a, unsigned int b) {
    return (a & b) == a;
}

int main(void) {
    int choice;
    unsigned int mask = 13;
    do {
        printf("=== State Bitmasking Codeforces Suite ===\\n");
        printf("Current Mask: %u (0x%X) -> ", mask, mask);
        print_set_elements(mask);
        printf("1. Enter Base Mask\\n");
        printf("2. Enumerate All Submasks (s = (s - 1) & mask)\\n");
        printf("3. Check Subset Relation (A is subset of B)\\n");
        printf("4. Bitmask Set Operations (Union, Intersection, Diff)\\n");
        printf("5. Enumerate All Subsets of Size K from N Items\\n");
        printf("6. Solve CF Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
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
                    printf("A is %ssubset of B\\n", is_subset(a, b) ? "a " : "NOT a ");
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
                    printf("Total combinations: %d\\n", total);
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
                        printf("Mask %u has %d set bits and %d submasks.\\n", cur, sub_count, 1 << sub_count);
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "bitmasking", "full-program"],
      aliases: ["prog_cp_bitmasking"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.number-theory.prime-sieve.prog-sieve-primes",
      name: "prog_cp_sieve_primes",
      type: "program",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.full-programs.number-theory.prime-sieve",
      path: "competitive-programming/full-programs/number-theory/prime-sieve/prog-sieve-primes",
      description: "Codeforces style prime sieve and O(log N) smallest prime factor (SPF) factorization engine",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_SIEVE 1000000

static int spf[MAX_SIEVE + 1];
static int is_prime[MAX_SIEVE + 1];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void build_sieve(int limit) {
    if (limit > MAX_SIEVE) limit = MAX_SIEVE;
    for (int i = 0; i <= limit; i++) {
        is_prime[i] = 1;
        spf[i] = i;
    }
    is_prime[0] = is_prime[1] = 0;
    spf[0] = spf[1] = 0;
    for (int i = 2; (long long)i * i <= limit; i++) {
        if (is_prime[i]) {
            for (int j = i * i; j <= limit; j += i) {
                if (is_prime[j]) {
                    is_prime[j] = 0;
                    spf[j] = i;
                }
            }
        }
    }
}

static void factorize_spf(int n) {
    if (n <= 1) {
        printf("%d has no prime factors.\\n", n);
        return;
    }
    printf("%d = ", n);
    int first = 1;
    while (n > 1) {
        int p = spf[n];
        int count = 0;
        while (n % p == 0) {
            count++;
            n /= p;
        }
        if (!first) printf(" * ");
        if (count > 1) printf("%d^%d", p, count);
        else printf("%d", p);
        first = 0;
    }
    putchar('\\n');
}

static int count_primes_range(int l, int r) {
    if (l < 2) l = 2;
    int count = 0;
    for (int i = l; i <= r; i++) {
        if (is_prime[i]) count++;
    }
    return count;
}

static int euler_totient(int n) {
    int res = n;
    while (n > 1) {
        int p = spf[n];
        while (n % p == 0) n /= p;
        res -= res / p;
    }
    return res;
}

int main(void) {
    int limit = 100000;
    build_sieve(limit);
    int choice;
    do {
        printf("=== Prime Sieve & Factors Codeforces Suite ===\\n");
        printf("Sieve Precomputed up to: %d\\n", limit);
        printf("1. Check Primality in O(1)\\n");
        printf("2. Fast Prime Factorization in O(log N)\\n");
        printf("3. Count Primes in Range [L, R]\\n");
        printf("4. List Primes in Range [L, R]\\n");
        printf("5. Euler's Totient Function phi(N)\\n");
        printf("6. Rebuild Sieve with New Limit (<= %d)\\n", MAX_SIEVE);
        printf("7. Solve CF Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                int val;
                printf("Enter number: ");
                if (scanf("%d", &val) == 1 && val >= 0 && val <= limit) {
                    clear_input();
                    printf("%d is %s.\\n", val, is_prime[val] ? "PRIME" : "COMPOSITE");
                } else {
                    clear_input();
                    printf("Value out of sieve range.\\n");
                }
                break;
            }
            case 2: {
                int val;
                printf("Enter number: ");
                if (scanf("%d", &val) == 1 && val >= 1 && val <= limit) {
                    clear_input();
                    factorize_spf(val);
                } else {
                    clear_input();
                    printf("Value out of sieve range.\\n");
                }
                break;
            }
            case 3: {
                int l, r;
                printf("Enter range L R: ");
                if (scanf("%d %d", &l, &r) == 2 && l <= r && r <= limit) {
                    clear_input();
                    printf("Total primes in [%d, %d]: %d\\n", l, r, count_primes_range(l, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                int l, r;
                printf("Enter range L R: ");
                if (scanf("%d %d", &l, &r) == 2 && l <= r && r <= limit) {
                    clear_input();
                    printf("Primes in [%d, %d]: ", l, r);
                    int printed = 0;
                    for (int i = l > 2 ? l : 2; i <= r; i++) {
                        if (is_prime[i]) {
                            printf("%d ", i);
                            printed++;
                            if (printed >= 50) {
                                printf("... (truncated)");
                                break;
                            }
                        }
                    }
                    putchar('\\n');
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                int val;
                printf("Enter N: ");
                if (scanf("%d", &val) == 1 && val >= 1 && val <= limit) {
                    clear_input();
                    printf("phi(%d) = %d\\n", val, euler_totient(val));
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                int new_lim;
                printf("Enter new limit (<= %d): ", MAX_SIEVE);
                if (scanf("%d", &new_lim) == 1 && new_lim >= 10 && new_lim <= MAX_SIEVE) {
                    clear_input();
                    limit = new_lim;
                    build_sieve(limit);
                    printf("Sieve rebuilt up to %d.\\n", limit);
                } else {
                    clear_input();
                }
                break;
            }
            case 7: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        int num;
                        printf("[Case #%d] Enter N: ", c);
                        scanf("%d", &num);
                        clear_input();
                        if (num >= 1 && num <= limit) {
                            printf("Primality: %s | ", is_prime[num] ? "PRIME" : "COMPOSITE");
                            factorize_spf(num);
                        }
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "prime-sieve", "full-program"],
      aliases: ["prog_cp_sieve_primes"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.number-theory.modular-arithmetic.prog-modular-arithmetic",
      name: "prog_cp_modular_arithmetic",
      type: "program",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.full-programs.number-theory.modular-arithmetic",
      path: "competitive-programming/full-programs/number-theory/modular-arithmetic/prog-modular-arithmetic",
      description: "Codeforces style modular arithmetic suite with fast exponentiation, extended GCD, and inverse",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef long long ll;
#define DEFAULT_MOD 1000000007LL

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static ll mod_pow(ll base, ll exp, ll mod) {
    ll res = 1 % mod;
    base %= mod;
    if (base < 0) base += mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

static ll ext_gcd(ll a, ll b, ll* x, ll* y) {
    if (b == 0) {
        *x = 1;
        *y = 0;
        return a;
    }
    ll x1, y1;
    ll g = ext_gcd(b, a % b, &x1, &y1);
    *x = y1;
    *y = x1 - (a / b) * y1;
    return g;
}

static ll mod_inv(ll a, ll mod) {
    ll x, y;
    ll g = ext_gcd(a, mod, &x, &y);
    if (g != 1) return -1;
    return (x % mod + mod) % mod;
}

int main(void) {
    int choice;
    ll mod = DEFAULT_MOD;
    do {
        printf("=== Modular Arithmetic Codeforces Suite ===\\n");
        printf("Current Modulus: %lld\\n", mod);
        printf("1. Modular Exponentiation (A^B mod M)\\n");
        printf("2. Modular Multiplicative Inverse (A^-1 mod M)\\n");
        printf("3. Extended Euclidean Algorithm (Ax + By = gcd(A, B))\\n");
        printf("4. Solve Linear Congruence (Ax = B mod M)\\n");
        printf("5. Change Modulus\\n");
        printf("6. Solve CF Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                ll a, b;
                printf("Enter base A and exponent B: ");
                if (scanf("%lld %lld", &a, &b) == 2 && b >= 0) {
                    clear_input();
                    printf("(%lld ^ %lld) mod %lld = %lld\\n", a, b, mod, mod_pow(a, b, mod));
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                ll a;
                printf("Enter integer A: ");
                if (scanf("%lld", &a) == 1) {
                    clear_input();
                    ll inv = mod_inv(a, mod);
                    if (inv != -1) printf("(%lld ^ -1) mod %lld = %lld\\n", a, mod, inv);
                    else printf("Inverse does not exist (gcd(%lld, %lld) != 1)\\n", a, mod);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                ll a, b;
                printf("Enter integers A and B: ");
                if (scanf("%lld %lld", &a, &b) == 2) {
                    clear_input();
                    ll x, y;
                    ll g = ext_gcd(a, b, &x, &y);
                    printf("gcd(%lld, %lld) = %lld\\n", a, b, g);
                    printf("Bézout identity: %lld * (%lld) + %lld * (%lld) = %lld\\n", a, x, b, y, g);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                ll a, b;
                printf("Enter A and B for (Ax = B mod %lld): ", mod);
                if (scanf("%lld %lld", &a, &b) == 2) {
                    clear_input();
                    ll x, y;
                    ll g = ext_gcd(a, mod, &x, &y);
                    if (b % g != 0) {
                        printf("No solution exists (gcd does not divide B).\\n");
                    } else {
                        ll x0 = (x * (b / g)) % (mod / g);
                        if (x0 < 0) x0 += (mod / g);
                        printf("Base solution: x = %lld (mod %lld)\\n", x0, mod / g);
                        printf("All %lld solutions modulo %lld:\\n", g, mod);
                        for (ll i = 0; i < g && i < 10; i++) {
                            printf("x = %lld\\n", (x0 + i * (mod / g)) % mod);
                        }
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                ll new_m;
                printf("Enter new positive modulus: ");
                if (scanf("%lld", &new_m) == 1 && new_m > 1) {
                    clear_input();
                    mod = new_m;
                    printf("Modulus set to %lld\\n", mod);
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
                        ll base, exp;
                        printf("[Case #%d] Enter A and B: ", c);
                        scanf("%lld %lld", &base, &exp);
                        clear_input();
                        printf("Result: %lld\\n", mod_pow(base, exp, mod));
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "modular-arithmetic", "full-program"],
      aliases: ["prog_cp_modular_arithmetic"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.number-theory.combinatorics.prog-combinatorics",
      name: "prog_cp_combinatorics",
      type: "program",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.full-programs.number-theory.combinatorics",
      path: "competitive-programming/full-programs/number-theory/combinatorics/prog-combinatorics",
      description: "Codeforces style combinatorics suite precomputing factorials and nCr queries modulo 10^9+7",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef long long ll;
#define MOD 1000000007LL
#define MAX_FACT 200000

static ll fact[MAX_FACT + 1];
static ll inv_fact[MAX_FACT + 1];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static ll mod_pow(ll base, ll exp) {
    ll res = 1;
    base %= MOD;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % MOD;
        base = (base * base) % MOD;
        exp >>= 1;
    }
    return res;
}

static ll mod_inv(ll n) {
    return mod_pow(n, MOD - 2);
}

static void precompute_factorials(int n) {
    if (n > MAX_FACT) n = MAX_FACT;
    fact[0] = 1;
    inv_fact[0] = 1;
    for (int i = 1; i <= n; i++) {
        fact[i] = (fact[i - 1] * i) % MOD;
    }
    inv_fact[n] = mod_inv(fact[n]);
    for (int i = n - 1; i >= 1; i--) {
        inv_fact[i] = (inv_fact[i + 1] * (i + 1)) % MOD;
    }
}

static ll query_ncr(int n, int r) {
    if (r < 0 || r > n) return 0;
    ll num = fact[n];
    ll den = (inv_fact[r] * inv_fact[n - r]) % MOD;
    return (num * den) % MOD;
}

static ll query_npr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return (fact[n] * inv_fact[n - r]) % MOD;
}

static ll catalan_number(int n) {
    ll c = query_ncr(2 * n, n);
    return (c * mod_inv(n + 1)) % MOD;
}

int main(void) {
    precompute_factorials(MAX_FACT);
    int choice;
    do {
        printf("=== Combinatorics Codeforces Suite ===\\n");
        printf("Modulo: %lld | Precomputed up to: %d\\n", MOD, MAX_FACT);
        printf("1. Query nCr (Combinations) in O(1)\\n");
        printf("2. Query nPr (Permutations) in O(1)\\n");
        printf("3. Query Combinations with Repetition nCr(n+r-1, r)\\n");
        printf("4. Query Catalan Number C(N)\\n");
        printf("5. Display Pascal Triangle Rows\\n");
        printf("6. Solve CF Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                int n, r;
                printf("Enter N and R: ");
                if (scanf("%d %d", &n, &r) == 2) {
                    clear_input();
                    printf("nCr(%d, %d) mod %lld = %lld\\n", n, r, MOD, query_ncr(n, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                int n, r;
                printf("Enter N and R: ");
                if (scanf("%d %d", &n, &r) == 2) {
                    clear_input();
                    printf("nPr(%d, %d) mod %lld = %lld\\n", n, r, MOD, query_npr(n, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                int n, r;
                printf("Enter N and R: ");
                if (scanf("%d %d", &n, &r) == 2 && n + r - 1 <= MAX_FACT) {
                    clear_input();
                    printf("Multi-choose(%d, %d) = nCr(%d, %d) = %lld\\n",
                           n, r, n + r - 1, r, query_ncr(n + r - 1, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                int n;
                printf("Enter N (<= %d): ", MAX_FACT / 2);
                if (scanf("%d", &n) == 1 && n >= 0 && 2 * n <= MAX_FACT) {
                    clear_input();
                    printf("Catalan(%d) = %lld\\n", n, catalan_number(n));
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                int rows;
                printf("Enter number of rows (<= 15): ");
                if (scanf("%d", &rows) == 1 && rows >= 1 && rows <= 15) {
                    clear_input();
                    for (int i = 0; i < rows; i++) {
                        for (int s = 0; s < rows - i - 1; s++) printf("  ");
                        for (int j = 0; j <= i; j++) {
                            printf("%4lld", query_ncr(i, j));
                        }
                        putchar('\\n');
                    }
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
                        int n, r;
                        printf("[Case #%d] Enter N R: ", c);
                        scanf("%d %d", &n, &r);
                        clear_input();
                        printf("nCr(%d, %d) = %lld\\n", n, r, query_ncr(n, r));
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "combinatorics", "full-program"],
      aliases: ["prog_cp_combinatorics"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.number-theory.matrix-exponentiation.prog-matrix-exponentiation",
      name: "prog_cp_matrix_exponentiation",
      type: "program",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.full-programs.number-theory.matrix-exponentiation",
      path: "competitive-programming/full-programs/number-theory/matrix-exponentiation/prog-matrix-exponentiation",
      description: "Codeforces style fast matrix exponentiation suite calculating N-th Fibonacci and 2x2 powers",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef long long ll;
#define MOD 1000000007LL

typedef struct {
    ll mat[2][2];
} Matrix2x2;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static Matrix2x2 multiply_2x2(Matrix2x2 a, Matrix2x2 b) {
    Matrix2x2 res;
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            res.mat[i][j] = 0;
            for (int k = 0; k < 2; k++) {
                res.mat[i][j] = (res.mat[i][j] + (a.mat[i][k] * b.mat[k][j]) % MOD) % MOD;
            }
        }
    }
    return res;
}

static Matrix2x2 power_2x2(Matrix2x2 base, ll exp) {
    Matrix2x2 res;
    res.mat[0][0] = 1; res.mat[0][1] = 0;
    res.mat[1][0] = 0; res.mat[1][1] = 1;
    while (exp > 0) {
        if (exp & 1) res = multiply_2x2(res, base);
        base = multiply_2x2(base, base);
        exp >>= 1;
    }
    return res;
}

static ll fibonacci(ll n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    Matrix2x2 t;
    t.mat[0][0] = 1; t.mat[0][1] = 1;
    t.mat[1][0] = 1; t.mat[1][1] = 0;
    Matrix2x2 tn = power_2x2(t, n - 1);
    return tn.mat[0][0];
}

int main(void) {
    int choice;
    do {
        printf("=== Matrix Fast Exponentiation Codeforces Suite ===\\n");
        printf("Modulo: %lld\\n", MOD);
        printf("1. Compute N-th Fibonacci Number in O(log N)\\n");
        printf("2. Compute Custom 2x2 Matrix Power (M^K)\\n");
        printf("3. Solve General 2nd Order Linear Recurrence\\n");
        printf("4. Solve CF Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                ll n;
                printf("Enter N (up to 10^18): ");
                if (scanf("%lld", &n) == 1) {
                    clear_input();
                    printf("Fibonacci(%lld) mod %lld = %lld\\n", n, MOD, fibonacci(n));
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                Matrix2x2 m;
                ll exp;
                printf("Enter 2x2 matrix elements (m00 m01 m10 m11): ");
                if (scanf("%lld %lld %lld %lld", &m.mat[0][0], &m.mat[0][1], &m.mat[1][0], &m.mat[1][1]) == 4) {
                    printf("Enter exponent K: ");
                    if (scanf("%lld", &exp) == 1 && exp >= 0) {
                        clear_input();
                        Matrix2x2 res = power_2x2(m, exp);
                        printf("M^%lld =\\n[ %lld %lld ]\\n[ %lld %lld ]\\n",
                               exp, res.mat[0][0], res.mat[0][1], res.mat[1][0], res.mat[1][1]);
                    } else {
                        clear_input();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                ll a, b, f1, f0, n;
                printf("For recurrence f(n) = a*f(n-1) + b*f(n-2):\\n");
                printf("Enter coefficients a b: ");
                scanf("%lld %lld", &a, &b);
                printf("Enter base values f(1) f(0): ");
                scanf("%lld %lld", &f1, &f0);
                printf("Enter query index N (>= 2): ");
                scanf("%lld", &n);
                clear_input();
                if (n == 0) printf("f(0) = %lld\\n", f0 % MOD);
                else if (n == 1) printf("f(1) = %lld\\n", f1 % MOD);
                else {
                    Matrix2x2 t;
                    t.mat[0][0] = a % MOD; t.mat[0][1] = b % MOD;
                    t.mat[1][0] = 1;       t.mat[1][1] = 0;
                    Matrix2x2 tn = power_2x2(t, n - 1);
                    ll ans = (tn.mat[0][0] * (f1 % MOD) + tn.mat[0][1] * (f0 % MOD)) % MOD;
                    printf("f(%lld) = %lld\\n", n, ans);
                }
                break;
            }
            case 4: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        ll n;
                        printf("[Case #%d] Enter N: ", c);
                        scanf("%lld", &n);
                        clear_input();
                        printf("Fibonacci(%lld) = %lld\\n", n, fibonacci(n));
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "matrix-exponentiation", "full-program"],
      aliases: ["prog_cp_matrix_exponentiation"],
    })
  );

  return components;
}
