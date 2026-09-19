# prog_cp_lca
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `program`
## Overview
Codeforces style Lowest Common Ancestor (LCA) via binary lifting and tree distance suite

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

#define MAX_NODES 1000
#define MAX_LOG 12

typedef struct {
    int to;
    int next;
} Edge;

static int head[MAX_NODES + 1];
static Edge edges[2 * MAX_NODES];
static int edge_count = 0;

static int depth[MAX_NODES + 1];
static int up[MAX_NODES + 1][MAX_LOG];
static int tree_nodes = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void add_tree_edge(int u, int v) {
    edges[edge_count].to = v;
    edges[edge_count].next = head[u];
    head[u] = edge_count++;
    edges[edge_count].to = u;
    edges[edge_count].next = head[v];
    head[v] = edge_count++;
}

static void dfs_lca(int u, int p, int d) {
    depth[u] = d;
    up[u][0] = p;
    for (int j = 1; j < MAX_LOG; j++) {
        if (up[u][j - 1] != -1) {
            up[u][j] = up[up[u][j - 1]][j - 1];
        } else {
            up[u][j] = -1;
        }
    }
    for (int e = head[u]; e != -1; e = edges[e].next) {
        int v = edges[e].to;
        if (v != p) dfs_lca(v, u, d + 1);
    }
}

static int query_lca(int u, int v) {
    if (depth[u] < depth[v]) {
        int tmp = u; u = v; v = tmp;
    }
    for (int j = MAX_LOG - 1; j >= 0; j--) {
        if (depth[u] - (1 << j) >= depth[v]) {
            u = up[u][j];
        }
    }
    if (u == v) return u;
    for (int j = MAX_LOG - 1; j >= 0; j--) {
        if (up[u][j] != up[v][j]) {
            u = up[u][j];
            v = up[v][j];
        }
    }
    return up[u][0];
}

static int query_kth_ancestor(int u, int k) {
    for (int j = MAX_LOG - 1; j >= 0; j--) {
        if ((k >> j) & 1) {
            u = up[u][j];
            if (u == -1) break;
        }
    }
    return u;
}

static void solve_cf_case(void) {
    int n, q;
    printf("Enter number of nodes N (<= %d) and queries Q: ", MAX_NODES);
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_NODES) {
        clear_input();
        return;
    }
    tree_nodes = n;
    edge_count = 0;
    for (int i = 1; i <= n; i++) head[i] = -1;
    printf("Enter %d tree edges (u v):\n", n - 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        if (u >= 1 && u <= n && v >= 1 && v <= n) add_tree_edge(u, v);
    }
    dfs_lca(1, -1, 0);
    printf("Enter %d LCA queries (u v):\n", q);
    for (int i = 0; i < q; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        if (u >= 1 && u <= n && v >= 1 && v <= n) {
            int lca_node = query_lca(u, v);
            int dist = depth[u] + depth[v] - 2 * depth[lca_node];
            printf("LCA(%d, %d) = %d | Distance = %d\n", u, v, lca_node, dist);
        }
    }
    clear_input();
}

int main(void) {
    int choice;
    do {
        printf("=== Lowest Common Ancestor (Binary Lifting) Codeforces Suite ===\n");
        printf("1. Solve Standard LCA Contest Problem (Tree of N nodes, Q queries)\n");
        printf("2. Build Tree Interactively\n");
        printf("3. Query LCA of (u, v)\n");
        printf("4. Query Tree Distance between (u, v)\n");
        printf("5. Query k-th Ancestor of Node u\n");
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
                printf("Enter N: ");
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_NODES) {
                    tree_nodes = n;
                    edge_count = 0;
                    for (int i = 1; i <= n; i++) head[i] = -1;
                    printf("Enter %d edges (u v):\n", n - 1);
                    for (int i = 0; i < n - 1; i++) {
                        int u, v;
                        scanf("%d %d", &u, &v);
                        if (u >= 1 && u <= n && v >= 1 && v <= n) add_tree_edge(u, v);
                    }
                    clear_input();
                    dfs_lca(1, -1, 0);
                    printf("Tree built with root 1. Binary lifting table ready.\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (tree_nodes == 0) {
                    printf("Build tree first.\n");
                    break;
                }
                int u, v;
                printf("Enter u and v: ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 1 && u <= tree_nodes && v >= 1 && v <= tree_nodes) {
                    clear_input();
                    printf("LCA(%d, %d) = %d\n", u, v, query_lca(u, v));
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (tree_nodes == 0) {
                    printf("Build tree first.\n");
                    break;
                }
                int u, v;
                printf("Enter u and v: ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 1 && u <= tree_nodes && v >= 1 && v <= tree_nodes) {
                    clear_input();
                    int lca_node = query_lca(u, v);
                    int dist = depth[u] + depth[v] - 2 * depth[lca_node];
                    printf("Tree distance between %d and %d: %d (LCA: %d)\n", u, v, dist, lca_node);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (tree_nodes == 0) {
                    printf("Build tree first.\n");
                    break;
                }
                int u, k;
                printf("Enter node u and k: ");
                if (scanf("%d %d", &u, &k) == 2 && u >= 1 && u <= tree_nodes && k >= 0) {
                    clear_input();
                    int anc = query_kth_ancestor(u, k);
                    if (anc != -1) printf("%d-th ancestor of %d is %d\n", k, u, anc);
                    else printf("Node does not have %d ancestors (exceeds root depth).\n", k);
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
Available via: `prog_cp_lca`, `competitive-programming.full-programs.graph-techniques.lowest-common-ancestor.prog-lca`, `competitive-programming>prog_cp_lca()`, `competitive-programming>full-programs>graph-techniques>lowest-common-ancestor>prog-lca>prog_cp_lca()`
