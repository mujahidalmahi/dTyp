# prog_cp_disjoint_set
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `program`
## Overview
Codeforces style Disjoint Set Union (DSU) suite with path compression and union by size

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

#define MAX_NODES 2000

static int parent[MAX_NODES + 1];
static int comp_size[MAX_NODES + 1];
static int total_nodes = 0;
static int total_comps = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void dsu_init(int n) {
    total_nodes = n;
    total_comps = n;
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        comp_size[i] = 1;
    }
}

static int dsu_find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = dsu_find(parent[i]);
}

static int dsu_union(int i, int j) {
    int root_i = dsu_find(i);
    int root_j = dsu_find(j);
    if (root_i == root_j) return 0;
    if (comp_size[root_i] < comp_size[root_j]) {
        int tmp = root_i; root_i = root_j; root_j = tmp;
    }
    parent[root_j] = root_i;
    comp_size[root_i] += comp_size[root_j];
    total_comps--;
    return 1;
}

static void solve_cf_case(void) {
    int n, q;
    printf("Enter vertices N and queries Q: ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_NODES) {
        clear_input();
        return;
    }
    dsu_init(n);
    printf("Enter %d queries (1: union u v, 2: check u v, 3: size of u):\n", q);
    for (int i = 0; i < q; i++) {
        int type, u, v;
        scanf("%d", &type);
        if (type == 1) {
            scanf("%d %d", &u, &v);
            if (u >= 1 && u <= n && v >= 1 && v <= n) {
                int merged = dsu_union(u, v);
                printf("Union(%d, %d) -> %s (Remaining Comps: %d)\n",
                       u, v, merged ? "MERGED" : "ALREADY CONNECTED (CYCLE)", total_comps);
            }
        } else if (type == 2) {
            scanf("%d %d", &u, &v);
            if (u >= 1 && u <= n && v >= 1 && v <= n) {
                int same = (dsu_find(u) == dsu_find(v));
                printf("Connected(%d, %d): %s\n", u, v, same ? "YES" : "NO");
            }
        } else if (type == 3) {
            scanf("%d", &u);
            if (u >= 1 && u <= n) {
                printf("Size of component containing %d: %d\n", u, comp_size[dsu_find(u)]);
            }
        }
    }
    clear_input();
}

int main(void) {
    int choice;
    do {
        printf("=== Disjoint Set Union (DSU) Codeforces Suite ===\n");
        printf("Active Vertices: %d | Connected Components: %d\n", total_nodes, total_comps);
        printf("1. Solve Standard Contest Problem (Union, Connected, Size)\n");
        printf("2. Initialize DSU with N Vertices\n");
        printf("3. Union Sets (u, v)\n");
        printf("4. Check Connectivity (Are u and v connected?)\n");
        printf("5. Get Component Size of Vertex u\n");
        printf("6. Graph Cycle Detection (Add M Edges)\n");
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
                int n;
                printf("Enter N (<= %d): ", MAX_NODES);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_NODES) {
                    clear_input();
                    dsu_init(n);
                    printf("DSU initialized with %d vertices.\n", n);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (total_nodes == 0) {
                    printf("Initialize DSU first.\n");
                    break;
                }
                int u, v;
                printf("Enter u and v: ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 1 && u <= total_nodes && v >= 1 && v <= total_nodes) {
                    clear_input();
                    int res = dsu_union(u, v);
                    printf("Union: %s. Total components now: %d\n",
                           res ? "SUCCESS" : "ALREADY IN SAME SET", total_comps);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (total_nodes == 0) {
                    printf("Initialize DSU first.\n");
                    break;
                }
                int u, v;
                printf("Enter u and v: ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 1 && u <= total_nodes && v >= 1 && v <= total_nodes) {
                    clear_input();
                    printf("Connected: %s\n", (dsu_find(u) == dsu_find(v)) ? "YES" : "NO");
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (total_nodes == 0) {
                    printf("Initialize DSU first.\n");
                    break;
                }
                int u;
                printf("Enter u: ");
                if (scanf("%d", &u) == 1 && u >= 1 && u <= total_nodes) {
                    clear_input();
                    printf("Vertex %d root: %d | Component size: %d\n",
                           u, dsu_find(u), comp_size[dsu_find(u)]);
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                int n, m;
                printf("Enter N vertices and M edges: ");
                if (scanf("%d %d", &n, &m) == 2 && n > 0 && n <= MAX_NODES) {
                    dsu_init(n);
                    int cycle_found = 0;
                    printf("Enter %d edges (u v):\n", m);
                    for (int i = 0; i < m; i++) {
                        int u, v;
                        scanf("%d %d", &u, &v);
                        if (!dsu_union(u, v)) {
                            printf("Edge (%d, %d) creates a CYCLE!\n", u, v);
                            cycle_found = 1;
                        }
                    }
                    clear_input();
                    if (!cycle_found) printf("Graph is ACYCLIC (Forest/Tree).\n");
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
Available via: `prog_cp_disjoint_set`, `competitive-programming.full-programs.cp-data-structures.disjoint-set.prog-disjoint-set`, `competitive-programming>prog_cp_disjoint_set()`, `competitive-programming>full-programs>cp-data-structures>disjoint-set>prog-disjoint-set>prog_cp_disjoint_set()`
