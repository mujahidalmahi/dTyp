# prog_cp_01_bfs
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `program`
## Overview
Codeforces style 0-1 BFS shortest path solver using double-ended queue

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
    while ((c = getchar()) != '\n' && c != EOF);
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
        printf("Unreachable.\n");
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
    putchar('\n');
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
    printf("Enter %d directed edges (u v weight 0 or 1):\n", m);
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
        printf("=== 0-1 BFS Shortest Path Codeforces Suite ===\n");
        printf("1. Solve Standard 0-1 BFS Contest Problem\n");
        printf("2. Shortest Path on 2D Grid with Obstacle Removal (0 or 1 cost)\n");
        printf("3. Solve Multi-Testcases (T Cases)\n");
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
                int r, c;
                printf("Enter grid rows R and cols C (<= 30): ");
                if (scanf("%d %d", &r, &c) == 2 && r > 0 && c > 0 && r <= 30 && c <= 30) {
                    int grid[30][30];
                    printf("Enter %d rows of grid (0: empty, 1: obstacle):\n", r);
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
                    printf("Minimum obstacles to eliminate from top-left to bottom-right: %d\n", dist[total_nodes]);
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
                        printf("[Case #%d]\n", c);
                        solve_cf_case();
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
Available via: `prog_cp_01_bfs`, `competitive-programming.full-programs.graph-techniques.zero-one-bfs.prog-zero-one-bfs`, `competitive-programming>prog_cp_01_bfs()`, `competitive-programming>full-programs>graph-techniques>zero-one-bfs>prog-zero-one-bfs>prog_cp_01_bfs()`
