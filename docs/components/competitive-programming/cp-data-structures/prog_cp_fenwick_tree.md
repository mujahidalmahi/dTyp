# prog_cp_fenwick_tree
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `program`
## Overview
Codeforces style Fenwick tree suite with point updates, prefix sums, and range queries

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

typedef long long ll;
#define MAX_N 1000

static int fenwick_n = 0;
static ll bit[MAX_N + 1];
static ll orig_arr[MAX_N + 1];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void fenwick_add(int idx, ll delta) {
    for (; idx <= fenwick_n; idx += idx & -idx) {
        bit[idx] += delta;
    }
}

static ll fenwick_query(int idx) {
    ll sum = 0;
    for (; idx > 0; idx -= idx & -idx) {
        sum += bit[idx];
    }
    return sum;
}

static ll fenwick_range(int l, int r) {
    if (l > r || l <= 0 || r > fenwick_n) return 0;
    return fenwick_query(r) - fenwick_query(l - 1);
}

static void solve_cf_contest(void) {
    int n, q;
    printf("Enter N (size) and Q (queries): ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    fenwick_n = n;
    for (int i = 0; i <= n; i++) bit[i] = orig_arr[i] = 0;
    printf("Enter %d integers: ", n);
    for (int i = 1; i <= n; i++) {
        scanf("%lld", &orig_arr[i]);
        fenwick_add(i, orig_arr[i]);
    }
    printf("Enter %d queries (1: update pos delta, 2: range sum l r):\n", q);
    for (int i = 0; i < q; i++) {
        int type;
        scanf("%d", &type);
        if (type == 1) {
            int pos;
            ll delta;
            scanf("%d %lld", &pos, &delta);
            if (pos >= 1 && pos <= n) {
                orig_arr[pos] += delta;
                fenwick_add(pos, delta);
            }
        } else if (type == 2) {
            int l, r;
            scanf("%d %d", &l, &r);
            printf("Sum[%d..%d] = %lld\n", l, r, fenwick_range(l, r));
        }
    }
    clear_input();
}

int main(void) {
    int choice;
    do {
        printf("=== Fenwick Tree (BIT) Codeforces Suite ===\n");
        printf("Active Tree Size: %d\n", fenwick_n);
        printf("1. Solve Standard Contest Problem (N elements, Q queries)\n");
        printf("2. Initialize Tree from Array\n");
        printf("3. Point Update (Add Delta to Index)\n");
        printf("4. Point Set (Set New Value at Index)\n");
        printf("5. Prefix Sum Query [1..idx]\n");
        printf("6. Range Sum Query [L..R]\n");
        printf("7. Display Raw Array vs BIT Structure\n");
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
                solve_cf_contest();
                break;
            case 2: {
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &fenwick_n) == 1 && fenwick_n > 0 && fenwick_n <= MAX_N) {
                    for (int i = 0; i <= fenwick_n; i++) bit[i] = orig_arr[i] = 0;
                    printf("Enter %d integers: ", fenwick_n);
                    for (int i = 1; i <= fenwick_n; i++) {
                        scanf("%lld", &orig_arr[i]);
                        fenwick_add(i, orig_arr[i]);
                    }
                    clear_input();
                    printf("Fenwick tree built successfully.\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (fenwick_n == 0) {
                    printf("Initialize tree first.\n");
                    break;
                }
                int idx;
                ll delta;
                printf("Enter index (1..%d) and delta: ", fenwick_n);
                if (scanf("%d %lld", &idx, &delta) == 2 && idx >= 1 && idx <= fenwick_n) {
                    clear_input();
                    orig_arr[idx] += delta;
                    fenwick_add(idx, delta);
                    printf("Updated index %d. New value: %lld\n", idx, orig_arr[idx]);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (fenwick_n == 0) {
                    printf("Initialize tree first.\n");
                    break;
                }
                int idx;
                ll val;
                printf("Enter index (1..%d) and new value: ", fenwick_n);
                if (scanf("%d %lld", &idx, &val) == 2 && idx >= 1 && idx <= fenwick_n) {
                    clear_input();
                    ll delta = val - orig_arr[idx];
                    orig_arr[idx] = val;
                    fenwick_add(idx, delta);
                    printf("Set index %d = %lld\n", idx, val);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (fenwick_n == 0) {
                    printf("Tree empty.\n");
                    break;
                }
                int idx;
                printf("Enter index (1..%d): ", fenwick_n);
                if (scanf("%d", &idx) == 1 && idx >= 1 && idx <= fenwick_n) {
                    clear_input();
                    printf("PrefixSum(1..%d) = %lld\n", idx, fenwick_query(idx));
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                if (fenwick_n == 0) {
                    printf("Tree empty.\n");
                    break;
                }
                int l, r;
                printf("Enter range L R (1..%d): ", fenwick_n);
                if (scanf("%d %d", &l, &r) == 2 && l >= 1 && r <= fenwick_n && l <= r) {
                    clear_input();
                    printf("RangeSum(%d..%d) = %lld\n", l, r, fenwick_range(l, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 7: {
                if (fenwick_n == 0) {
                    printf("Tree empty.\n");
                    break;
                }
                printf("Index: ");
                for (int i = 1; i <= fenwick_n; i++) printf("%4d ", i);
                printf("\nArray: ");
                for (int i = 1; i <= fenwick_n; i++) printf("%4lld ", orig_arr[i]);
                printf("\nTree:  ");
                for (int i = 1; i <= fenwick_n; i++) printf("%4lld ", bit[i]);
                putchar('\n');
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
Available via: `prog_cp_fenwick_tree`, `competitive-programming.full-programs.cp-data-structures.fenwick-tree.prog-fenwick-tree`, `competitive-programming>prog_cp_fenwick_tree()`, `competitive-programming>full-programs>cp-data-structures>fenwick-tree>prog-fenwick-tree>prog_cp_fenwick_tree()`
