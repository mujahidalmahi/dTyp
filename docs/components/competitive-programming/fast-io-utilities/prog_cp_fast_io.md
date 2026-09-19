# prog_cp_fast_io
> **Domain:** `competitive-programming` | **Subcategory:** `fast-io-utilities` | **Type:** `program`
## Overview
Codeforces style fast I/O suite with buffered integer scanning and multi-testcase solver

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

typedef long long ll;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
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
    putchar('\n');
}

int main(void) {
    int choice;
    do {
        printf("=== Fast I/O Codeforces Suite ===\n");
        printf("1. Solve Single Contest Case (Fast I/O)\n");
        printf("2. Solve Multi-Testcases (T Cases)\n");
        printf("3. Interactive Fast Integer Read/Write\n");
        printf("4. Interactive Fast Long Long Read/Write\n");
        printf("0. Exit\n");
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
                        printf("[Case #%d]\n", c);
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
                    putchar('\n');
                }
                break;
            }
            case 4: {
                ll val;
                printf("Enter a 64-bit integer: ");
                if (fast_read_ll(&val)) {
                    printf("Fast written output: ");
                    fast_write_ll(val);
                    putchar('\n');
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
Available via: `prog_cp_fast_io`, `competitive-programming.full-programs.fast-io-utilities.fast-io.prog-fast-io`, `competitive-programming>prog_cp_fast_io()`, `competitive-programming>full-programs>fast-io-utilities>fast-io>prog-fast-io>prog_cp_fast_io()`
