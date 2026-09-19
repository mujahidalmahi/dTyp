import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCpGraphsFullPrograms(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.graph-techniques.zero-one-bfs.prog-zero-one-bfs",
      name: "prog_cp_01_bfs",
      type: "program",
      category: "competitive-programming",
      subcategory: "graph-techniques",
      categoryId: "competitive-programming.full-programs.graph-techniques.zero-one-bfs",
      path: "competitive-programming/full-programs/graph-techniques/zero-one-bfs/prog-zero-one-bfs",
      description: "Codeforces style 0-1 BFS shortest path solver using double-ended queue",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_V 1000
#define MAX_E 4000
#define INF_DIST 1000000000

typedef struct {
    int to;
    int weight;
    int next;
} Edge;

static int head[MAX_V + 1];
static Edge edges[MAX_E];
static int edge_count = 0;
static int dist[MAX_V + 1];
static int parent[MAX_V + 1];

static int deque[2 * MAX_V + 5];
static int dq_head = MAX_V, dq_tail = MAX_V - 1;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void add_edge(int u, int v, int w) {
    edges[edge_count].to = v;
    edges[edge_count].weight = w;
    edges[edge_count].next = head[u];
    head[u] = edge_count++;
}

static void zero_one_bfs(int src, int n) {
    for (int i = 1; i <= n; i++) {
        dist[i] = INF_DIST;
        parent[i] = -1;
    }
    dq_head = MAX_V;
    dq_tail = MAX_V - 1;

    dist[src] = 0;
    deque[++dq_tail] = src;

    while (dq_head <= dq_tail) {
        int u = deque[dq_head++];
        for (int e = head[u]; e != -1; e = edges[e].next) {
            int v = edges[e].to;
            int w = edges[e].weight;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                if (w == 0) {
                    deque[--dq_head] = v;
                } else {
                    deque[++dq_tail] = v;
                }
            }
        }
    }
}

static void print_path(int target) {
    if (dist[target] == INF_DIST) {
        printf("Unreachable.\\n");
        return;
    }
    int path[MAX_V];
    int len = 0;
    for (int cur = target; cur != -1; cur = parent[cur]) {
        path[len++] = cur;
    }
    printf("Path (distance %d): ", dist[target]);
    for (int i = len - 1; i >= 0; i--) {
        printf("%d%s", path[i], (i == 0) ? "" : " -> ");
    }
    putchar('\\n');
}

static void solve_cf_case(void) {
    int n, m, src, dest;
    printf("Enter vertices N, edges M, source, destination: ");
    if (scanf("%d %d %d %d", &n, &m, &src, &dest) != 4 || n <= 0 || n > MAX_V) {
        clear_input();
        return;
    }
    edge_count = 0;
    for (int i = 1; i <= n; i++) head[i] = -1;
    printf("Enter %d directed edges (u v weight 0 or 1):\\n", m);
    for (int i = 0; i < m; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        if (u >= 1 && u <= n && v >= 1 && v <= n && (w == 0 || w == 1)) {
            add_edge(u, v, w);
        }
    }
    clear_input();
    zero_one_bfs(src, n);
    print_path(dest);
}

int main(void) {
    int choice;
    do {
        printf("=== 0-1 BFS Shortest Path Codeforces Suite ===\\n");
        printf("1. Solve Standard 0-1 BFS Contest Problem\\n");
        printf("2. Shortest Path on 2D Grid with Obstacle Removal (0 or 1 cost)\\n");
        printf("3. Solve Multi-Testcases (T Cases)\\n");
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
                int r, c;
                printf("Enter grid rows R and cols C (<= 30): ");
                if (scanf("%d %d", &r, &c) == 2 && r > 0 && c > 0 && r <= 30 && c <= 30) {
                    int grid[30][30];
                    printf("Enter %d rows of grid (0: empty, 1: obstacle):\\n", r);
                    for (int i = 0; i < r; i++) {
                        for (int j = 0; j < c; j++) scanf("%d", &grid[i][j]);
                    }
                    clear_input();
                    int total_nodes = r * c;
                    edge_count = 0;
                    for (int i = 1; i <= total_nodes; i++) head[i] = -1;
                    int dr[] = {-1, 1, 0, 0};
                    int dc[] = {0, 0, -1, 1};
                    for (int i = 0; i < r; i++) {
                        for (int j = 0; j < c; j++) {
                            int u = i * c + j + 1;
                            for (int k = 0; k < 4; k++) {
                                int ni = i + dr[k];
                                int nj = j + dc[k];
                                if (ni >= 0 && ni < r && nj >= 0 && nj < c) {
                                    int v = ni * c + nj + 1;
                                    int cost = (grid[ni][nj] == 1) ? 1 : 0;
                                    add_edge(u, v, cost);
                                }
                            }
                        }
                    }
                    zero_one_bfs(1, total_nodes);
                    printf("Minimum obstacles to eliminate from top-left to bottom-right: %d\\n", dist[total_nodes]);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                int t;
                printf("Enter T test cases: ");
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
      tags: ["competitive-programming", "zero-one-bfs", "full-program"],
      aliases: ["prog_cp_01_bfs"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.graph-techniques.lowest-common-ancestor.prog-lca",
      name: "prog_cp_lca",
      type: "program",
      category: "competitive-programming",
      subcategory: "graph-techniques",
      categoryId: "competitive-programming.full-programs.graph-techniques.lowest-common-ancestor",
      path: "competitive-programming/full-programs/graph-techniques/lowest-common-ancestor/prog-lca",
      description: "Codeforces style Lowest Common Ancestor (LCA) via binary lifting and tree distance suite",
      signature: "int main(void);",
      code: `#include <stdio.h>

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
    while ((c = getchar()) != '\\n' && c != EOF);
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
    printf("Enter %d tree edges (u v):\\n", n - 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        if (u >= 1 && u <= n && v >= 1 && v <= n) add_tree_edge(u, v);
    }
    dfs_lca(1, -1, 0);
    printf("Enter %d LCA queries (u v):\\n", q);
    for (int i = 0; i < q; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        if (u >= 1 && u <= n && v >= 1 && v <= n) {
            int lca_node = query_lca(u, v);
            int dist = depth[u] + depth[v] - 2 * depth[lca_node];
            printf("LCA(%d, %d) = %d | Distance = %d\\n", u, v, lca_node, dist);
        }
    }
    clear_input();
}

int main(void) {
    int choice;
    do {
        printf("=== Lowest Common Ancestor (Binary Lifting) Codeforces Suite ===\\n");
        printf("1. Solve Standard LCA Contest Problem (Tree of N nodes, Q queries)\\n");
        printf("2. Build Tree Interactively\\n");
        printf("3. Query LCA of (u, v)\\n");
        printf("4. Query Tree Distance between (u, v)\\n");
        printf("5. Query k-th Ancestor of Node u\\n");
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
                int n;
                printf("Enter N: ");
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_NODES) {
                    tree_nodes = n;
                    edge_count = 0;
                    for (int i = 1; i <= n; i++) head[i] = -1;
                    printf("Enter %d edges (u v):\\n", n - 1);
                    for (int i = 0; i < n - 1; i++) {
                        int u, v;
                        scanf("%d %d", &u, &v);
                        if (u >= 1 && u <= n && v >= 1 && v <= n) add_tree_edge(u, v);
                    }
                    clear_input();
                    dfs_lca(1, -1, 0);
                    printf("Tree built with root 1. Binary lifting table ready.\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (tree_nodes == 0) {
                    printf("Build tree first.\\n");
                    break;
                }
                int u, v;
                printf("Enter u and v: ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 1 && u <= tree_nodes && v >= 1 && v <= tree_nodes) {
                    clear_input();
                    printf("LCA(%d, %d) = %d\\n", u, v, query_lca(u, v));
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (tree_nodes == 0) {
                    printf("Build tree first.\\n");
                    break;
                }
                int u, v;
                printf("Enter u and v: ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 1 && u <= tree_nodes && v >= 1 && v <= tree_nodes) {
                    clear_input();
                    int lca_node = query_lca(u, v);
                    int dist = depth[u] + depth[v] - 2 * depth[lca_node];
                    printf("Tree distance between %d and %d: %d (LCA: %d)\\n", u, v, dist, lca_node);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (tree_nodes == 0) {
                    printf("Build tree first.\\n");
                    break;
                }
                int u, k;
                printf("Enter node u and k: ");
                if (scanf("%d %d", &u, &k) == 2 && u >= 1 && u <= tree_nodes && k >= 0) {
                    clear_input();
                    int anc = query_kth_ancestor(u, k);
                    if (anc != -1) printf("%d-th ancestor of %d is %d\\n", k, u, anc);
                    else printf("Node does not have %d ancestors (exceeds root depth).\\n", k);
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
      tags: ["competitive-programming", "lca", "full-program"],
      aliases: ["prog_cp_lca"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.graph-techniques.strongly-connected.prog-tarjan-scc",
      name: "prog_cp_tarjan_scc",
      type: "program",
      category: "competitive-programming",
      subcategory: "graph-techniques",
      categoryId: "competitive-programming.full-programs.graph-techniques.strongly-connected",
      path: "competitive-programming/full-programs/graph-techniques/strongly-connected/prog-tarjan-scc",
      description: "Codeforces style Tarjan strongly connected components (SCC) suite and condensation DAG",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_V 1000
#define MAX_E 4000

typedef struct {
    int to;
    int next;
} Edge;

static int head[MAX_V + 1];
static Edge edges[MAX_E];
static int edge_count = 0;

static int disc[MAX_V + 1];
static int low[MAX_V + 1];
static int in_stack[MAX_V + 1];
static int stack[MAX_V + 1];
static int top_idx = -1;
static int timer = 0;
static int scc_id[MAX_V + 1];
static int scc_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void add_directed_edge(int u, int v) {
    edges[edge_count].to = v;
    edges[edge_count].next = head[u];
    head[u] = edge_count++;
}

static void tarjan_dfs(int u) {
    disc[u] = low[u] = ++timer;
    stack[++top_idx] = u;
    in_stack[u] = 1;
    for (int e = head[u]; e != -1; e = edges[e].next) {
        int v = edges[e].to;
        if (disc[v] == 0) {
            tarjan_dfs(v);
            if (low[v] < low[u]) low[u] = low[v];
        } else if (in_stack[v]) {
            if (disc[v] < low[u]) low[u] = disc[v];
        }
    }
    if (low[u] == disc[u]) {
        scc_count++;
        while (1) {
            int node = stack[top_idx--];
            in_stack[node] = 0;
            scc_id[node] = scc_count;
            if (node == u) break;
        }
    }
}

static void solve_cf_case(void) {
    int n, m;
    printf("Enter vertices N and directed edges M: ");
    if (scanf("%d %d", &n, &m) != 2 || n <= 0 || n > MAX_V) {
        clear_input();
        return;
    }
    edge_count = 0;
    timer = 0;
    top_idx = -1;
    scc_count = 0;
    for (int i = 1; i <= n; i++) {
        head[i] = -1;
        disc[i] = low[i] = in_stack[i] = scc_id[i] = 0;
    }
    printf("Enter %d directed edges (u v):\\n", m);
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        if (u >= 1 && u <= n && v >= 1 && v <= n) add_directed_edge(u, v);
    }
    clear_input();
    for (int i = 1; i <= n; i++) {
        if (disc[i] == 0) tarjan_dfs(i);
    }
    printf("Total Strongly Connected Components: %d\\n", scc_count);
    for (int c = 1; c <= scc_count; c++) {
        printf("SCC #%d: { ", c);
        for (int i = 1; i <= n; i++) {
            if (scc_id[i] == c) printf("%d ", i);
        }
        printf("}\\n");
    }
    printf("Is Strongly Connected: %s\\n", (scc_count == 1) ? "YES" : "NO");
}

int main(void) {
    int choice;
    do {
        printf("=== Tarjan's Strongly Connected Components Codeforces Suite ===\\n");
        printf("1. Solve Standard SCC Contest Problem\\n");
        printf("2. Solve Multi-Testcases (T Cases)\\n");
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
                printf("Enter T test cases: ");
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
      tags: ["competitive-programming", "tarjan-scc", "full-program"],
      aliases: ["prog_cp_tarjan_scc"],
    })
  );

  return components;
}
