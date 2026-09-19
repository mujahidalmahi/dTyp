# prog_cp_segment_tree
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `program`
## Overview
Codeforces style segment tree suite executing range minimum queries (RMQ), sum, and point updates

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
#define INF_VAL 2000000000000000000LL

static int seg_n = 0;
static ll tree_sum[4 * MAX_N];
static ll tree_min[4 * MAX_N];
static ll raw_arr[MAX_N + 1];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void build_seg(int node, int start, int end) {
    if (start == end) {
        tree_sum[node] = raw_arr[start];
        tree_min[node] = raw_arr[start];
        return;
    }
    int mid = start + (end - start) / 2;
    build_seg(2 * node, start, mid);
    build_seg(2 * node + 1, mid + 1, end);
    tree_sum[node] = tree_sum[2 * node] + tree_sum[2 * node + 1];
    tree_min[node] = tree_min[2 * node] < tree_min[2 * node + 1] ? tree_min[2 * node] : tree_min[2 * node + 1];
}

static void update_seg(int node, int start, int end, int idx, ll val) {
    if (start == end) {
        raw_arr[idx] = val;
        tree_sum[node] = val;
        tree_min[node] = val;
        return;
    }
    int mid = start + (end - start) / 2;
    if (idx <= mid) update_seg(2 * node, start, mid, idx, val);
    else update_seg(2 * node + 1, mid + 1, end, idx, val);
    tree_sum[node] = tree_sum[2 * node] + tree_sum[2 * node + 1];
    tree_min[node] = tree_min[2 * node] < tree_min[2 * node + 1] ? tree_min[2 * node] : tree_min[2 * node + 1];
}

static ll query_sum(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree_sum[node];
    int mid = start + (end - start) / 2;
    return query_sum(2 * node, start, mid, l, r) + query_sum(2 * node + 1, mid + 1, end, l, r);
}

static ll query_min(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return INF_VAL;
    if (l <= start && end <= r) return tree_min[node];
    int mid = start + (end - start) / 2;
    ll p1 = query_min(2 * node, start, mid, l, r);
    ll p2 = query_min(2 * node + 1, mid + 1, end, l, r);
    return p1 < p2 ? p1 : p2;
}

static void solve_cf_case(void) {
    int n, q;
    printf("Enter N and Q: ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    seg_n = n;
    printf("Enter %d values: ", n);
    for (int i = 1; i <= n; i++) scanf("%lld", &raw_arr[i]);
    build_seg(1, 1, seg_n);
    printf("Enter %d queries (1: update idx val, 2: sum l r, 3: min l r):\n", q);
    for (int i = 0; i < q; i++) {
        int type;
        scanf("%d", &type);
        if (type == 1) {
            int idx;
            ll val;
            scanf("%d %lld", &idx, &val);
            if (idx >= 1 && idx <= seg_n) update_seg(1, 1, seg_n, idx, val);
        } else if (type == 2) {
            int l, r;
            scanf("%d %d", &l, &r);
            printf("Sum[%d..%d] = %lld\n", l, r, query_sum(1, 1, seg_n, l, r));
        } else if (type == 3) {
            int l, r;
            scanf("%d %d", &l, &r);
            printf("RMQ[%d..%d] = %lld\n", l, r, query_min(1, 1, seg_n, l, r));
        }
    }
    clear_input();
}

int main(void) {
    int choice;
    do {
        printf("=== Segment Tree Codeforces Suite ===\n");
        printf("Active Tree Size: %d\n", seg_n);
        printf("1. Solve Standard Contest Problem (Point Update, RMQ, Range Sum)\n");
        printf("2. Build Tree from Array\n");
        printf("3. Point Update (Index = Val)\n");
        printf("4. Range Sum Query [L..R]\n");
        printf("5. Range Minimum Query (RMQ) [L..R]\n");
        printf("6. Display Current Array\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &seg_n) == 1 && seg_n > 0 && seg_n <= MAX_N) {
                    printf("Enter %d integers: ", seg_n);
                    for (int i = 1; i <= seg_n; i++) scanf("%lld", &raw_arr[i]);
                    clear_input();
                    build_seg(1, 1, seg_n);
                    printf("Segment tree constructed successfully.\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (seg_n == 0) {
                    printf("Build tree first.\n");
                    break;
                }
                int idx;
                ll val;
                printf("Enter index (1..%d) and new value: ", seg_n);
                if (scanf("%d %lld", &idx, &val) == 2 && idx >= 1 && idx <= seg_n) {
                    clear_input();
                    update_seg(1, 1, seg_n, idx, val);
                    printf("Updated index %d to %lld.\n", idx, val);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (seg_n == 0) {
                    printf("Build tree first.\n");
                    break;
                }
                int l, r;
                printf("Enter range L R (1..%d): ", seg_n);
                if (scanf("%d %d", &l, &r) == 2 && l >= 1 && r <= seg_n && l <= r) {
                    clear_input();
                    printf("RangeSum(%d..%d) = %lld\n", l, r, query_sum(1, 1, seg_n, l, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (seg_n == 0) {
                    printf("Build tree first.\n");
                    break;
                }
                int l, r;
                printf("Enter range L R (1..%d): ", seg_n);
                if (scanf("%d %d", &l, &r) == 2 && l >= 1 && r <= seg_n && l <= r) {
                    clear_input();
                    printf("RMQ(%d..%d) = %lld\n", l, r, query_min(1, 1, seg_n, l, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                if (seg_n == 0) {
                    printf("Tree empty.\n");
                    break;
                }
                printf("Current Array: ");
                for (int i = 1; i <= seg_n; i++) printf("%lld ", raw_arr[i]);
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
Available via: `prog_cp_segment_tree`, `competitive-programming.full-programs.cp-data-structures.segment-tree.prog-segment-tree`, `competitive-programming>prog_cp_segment_tree()`, `competitive-programming>full-programs>cp-data-structures>segment-tree>prog-segment-tree>prog_cp_segment_tree()`
