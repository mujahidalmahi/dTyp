import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAlgoGraphsDpFullPrograms(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "algorithms.full-programs.graph-algorithms.graph-traversals.prog-graph-traversals",
      name: "prog_graph_traversals",
      type: "program",
      category: "algorithms",
      subcategory: "graph-algorithms",
      categoryId: "algorithms.full-programs.graph-algorithms.graph-traversals",
      path: "algorithms/full-programs/graph-algorithms/graph-traversals/prog-graph-traversals",
      description: "Complete interactive program executing BFS and DFS graph traversals",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_V 50

static int adj[MAX_V][MAX_V];
static int visited[MAX_V];
static int num_v = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void bfs(int start) {
    int queue[MAX_V];
    int front = 0, rear = 0;
    for (int i = 0; i < num_v; i++) visited[i] = 0;
    visited[start] = 1;
    queue[rear++] = start;
    printf("BFS Order: ");
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < num_v; v++) {
            if (adj[u][v] && !visited[v]) {
                visited[v] = 1;
                queue[rear++] = v;
            }
        }
    }
    putchar('\\n');
}

static void dfs_rec(int u) {
    visited[u] = 1;
    printf("%d ", u);
    for (int v = 0; v < num_v; v++) {
        if (adj[u][v] && !visited[v]) dfs_rec(v);
    }
}

static void dfs(int start) {
    for (int i = 0; i < num_v; i++) visited[i] = 0;
    printf("DFS Order: ");
    dfs_rec(start);
    putchar('\\n');
}

int main(void) {
    int choice;
    do {
        printf("=== Graph Traversals Workbench ===\\n");
        printf("Active Vertices: %d\\n", num_v);
        printf("1. Create Graph (Vertices & Edges)\\n");
        printf("2. Run Breadth-First Search (BFS)\\n");
        printf("3. Run Depth-First Search (DFS)\\n");
        printf("4. Display Adjacency Matrix\\n");
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
                int v, e;
                printf("Enter number of vertices V (<= %d) and edges E: ", MAX_V);
                if (scanf("%d %d", &v, &e) == 2 && v > 0 && v <= MAX_V) {
                    num_v = v;
                    for (int i = 0; i < num_v; i++) {
                        for (int j = 0; j < num_v; j++) adj[i][j] = 0;
                    }
                    printf("Enter %d edges (0-indexed u v):\\n", e);
                    for (int i = 0; i < e; i++) {
                        int u1, v1;
                        scanf("%d %d", &u1, &v1);
                        if (u1 >= 0 && u1 < num_v && v1 >= 0 && v1 < num_v) {
                            adj[u1][v1] = 1;
                            adj[v1][u1] = 1;
                        }
                    }
                    clear_input();
                    printf("Graph configured successfully.\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (num_v == 0) {
                    printf("Create graph first.\\n");
                    break;
                }
                int s;
                printf("Enter start vertex (0..%d): ", num_v - 1);
                if (scanf("%d", &s) == 1 && s >= 0 && s < num_v) {
                    clear_input();
                    bfs(s);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (num_v == 0) {
                    printf("Create graph first.\\n");
                    break;
                }
                int s;
                printf("Enter start vertex (0..%d): ", num_v - 1);
                if (scanf("%d", &s) == 1 && s >= 0 && s < num_v) {
                    clear_input();
                    dfs(s);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (num_v == 0) {
                    printf("Graph empty.\\n");
                    break;
                }
                printf("Adjacency Matrix:\\n   ");
                for (int i = 0; i < num_v; i++) printf("%2d ", i);
                printf("\\n");
                for (int i = 0; i < num_v; i++) {
                    printf("%2d ", i);
                    for (int j = 0; j < num_v; j++) printf("%2d ", adj[i][j]);
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
      tags: ["program", "graph", "bfs", "dfs", "traversals"],
      aliases: ["prog_graph_traversals", "programGraphTraversals"],
    }),

    createComponent({
      id: "algorithms.full-programs.graph-algorithms.shortest-paths.prog-dijkstra",
      name: "prog_graph_dijkstra",
      type: "program",
      category: "algorithms",
      subcategory: "graph-algorithms",
      categoryId: "algorithms.full-programs.graph-algorithms.shortest-paths",
      path: "algorithms/full-programs/graph-algorithms/shortest-paths/prog-dijkstra",
      description: "Complete interactive program executing Dijkstra's single-source shortest path algorithm",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_V 50
#define INF_DIST 1000000000

static int adj_w[MAX_V][MAX_V];
static int dist[MAX_V];
static int prev_node[MAX_V];
static int visited[MAX_V];
static int num_v = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void dijkstra(int src) {
    for (int i = 0; i < num_v; i++) {
        dist[i] = INF_DIST;
        visited[i] = 0;
        prev_node[i] = -1;
    }
    dist[src] = 0;
    for (int count = 0; count < num_v - 1; count++) {
        int min_d = INF_DIST, u = -1;
        for (int v = 0; v < num_v; v++) {
            if (!visited[v] && dist[v] <= min_d) {
                min_d = dist[v];
                u = v;
            }
        }
        if (u == -1) break;
        visited[u] = 1;
        for (int v = 0; v < num_v; v++) {
            if (!visited[v] && adj_w[u][v] > 0 && dist[u] != INF_DIST && dist[u] + adj_w[u][v] < dist[v]) {
                dist[v] = dist[u] + adj_w[u][v];
                prev_node[v] = u;
            }
        }
    }
}

static void print_shortest_path(int src, int dest) {
    if (dist[dest] == INF_DIST) {
        printf("Vertex %d is unreachable from %d.\\n", dest, src);
        return;
    }
    int path[MAX_V];
    int len = 0;
    for (int at = dest; at != -1; at = prev_node[at]) {
        path[len++] = at;
    }
    printf("Shortest Path (%d -> %d): ", src, dest);
    for (int i = len - 1; i >= 0; i--) {
        printf("%d%s", path[i], (i == 0) ? "" : " -> ");
    }
    printf(" | Total Cost: %d\\n", dist[dest]);
}

int main(void) {
    int choice;
    do {
        printf("=== Dijkstra's Shortest Path Workbench ===\\n");
        printf("Active Vertices: %d\\n", num_v);
        printf("1. Create Weighted Graph (V & E)\\n");
        printf("2. Run Dijkstra from Source\\n");
        printf("3. Print Shortest Path to Destination\\n");
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
                int v, e;
                printf("Enter vertices V (<= %d) and edges E: ", MAX_V);
                if (scanf("%d %d", &v, &e) == 2 && v > 0 && v <= MAX_V) {
                    num_v = v;
                    for (int i = 0; i < num_v; i++) {
                        for (int j = 0; j < num_v; j++) adj_w[i][j] = 0;
                    }
                    printf("Enter %d edges (u v weight):\\n", e);
                    for (int i = 0; i < e; i++) {
                        int u, v1, w;
                        scanf("%d %d %d", &u, &v1, &w);
                        if (u >= 0 && u < num_v && v1 >= 0 && v1 < num_v && w >= 0) {
                            adj_w[u][v1] = w;
                            adj_w[v1][u] = w;
                        }
                    }
                    clear_input();
                    printf("Weighted graph created.\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (num_v == 0) {
                    printf("Create graph first.\\n");
                    break;
                }
                int s;
                printf("Enter source vertex (0..%d): ", num_v - 1);
                if (scanf("%d", &s) == 1 && s >= 0 && s < num_v) {
                    clear_input();
                    dijkstra(s);
                    printf("Distances from source %d:\\n", s);
                    for (int i = 0; i < num_v; i++) {
                        if (dist[i] == INF_DIST) printf("Vertex %d: INF\\n", i);
                        else printf("Vertex %d: %d\\n", i, dist[i]);
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (num_v == 0) {
                    printf("Create graph first.\\n");
                    break;
                }
                int s, d;
                printf("Enter source and destination: ");
                if (scanf("%d %d", &s, &d) == 2 && s >= 0 && s < num_v && d >= 0 && d < num_v) {
                    clear_input();
                    dijkstra(s);
                    print_shortest_path(s, d);
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
      tags: ["program", "graph", "dijkstra", "shortest-path"],
      aliases: ["prog_graph_dijkstra", "programGraphDijkstra"],
    }),

    createComponent({
      id: "algorithms.full-programs.graph-algorithms.minimum-spanning-tree.prog-kruskal",
      name: "prog_graph_mst",
      type: "program",
      category: "algorithms",
      subcategory: "graph-algorithms",
      categoryId: "algorithms.full-programs.graph-algorithms.minimum-spanning-tree",
      path: "algorithms/full-programs/graph-algorithms/minimum-spanning-tree/prog-kruskal",
      description: "Complete interactive program finding Minimum Spanning Tree using Kruskal's algorithm with DSU",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_V 50
#define MAX_E 200

typedef struct {
    int u;
    int v;
    int weight;
} Edge;

static Edge edge_list[MAX_E];
static int total_v = 0;
static int total_e = 0;
static int parent[MAX_V];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int cmp_edges(const void* a, const void* b) {
    return (((const Edge*)a)->weight - ((const Edge*)b)->weight);
}

static int dsu_find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = dsu_find(parent[i]);
}

static void run_kruskal(void) {
    qsort(edge_list, (size_t)total_e, sizeof(Edge), cmp_edges);
    for (int i = 0; i < total_v; i++) parent[i] = i;
    Edge mst[MAX_V];
    int mst_edges = 0;
    long long total_weight = 0;
    for (int i = 0; i < total_e; i++) {
        int root_u = dsu_find(edge_list[i].u);
        int root_v = dsu_find(edge_list[i].v);
        if (root_u != root_v) {
            mst[mst_edges++] = edge_list[i];
            total_weight += edge_list[i].weight;
            parent[root_u] = root_v;
            if (mst_edges == total_v - 1) break;
        }
    }
    if (mst_edges != total_v - 1) {
        printf("Graph is disconnected! Spanning forest found with %d edges.\\n", mst_edges);
    } else {
        printf("Minimum Spanning Tree found with %d edges:\\n", mst_edges);
    }
    for (int i = 0; i < mst_edges; i++) {
        printf("Edge (%d, %d) weight %d\\n", mst[i].u, mst[i].v, mst[i].weight);
    }
    printf("Total MST Weight: %lld\\n", total_weight);
}

int main(void) {
    int choice;
    do {
        printf("=== Minimum Spanning Tree (Kruskal) Workbench ===\\n");
        printf("Active: %d Vertices, %d Edges\\n", total_v, total_e);
        printf("1. Enter Graph Edges (V & E)\\n");
        printf("2. Compute MST via Kruskal's Algorithm\\n");
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
                int v, e;
                printf("Enter V (<= %d) and E (<= %d): ", MAX_V, MAX_E);
                if (scanf("%d %d", &v, &e) == 2 && v > 0 && v <= MAX_V && e > 0 && e <= MAX_E) {
                    total_v = v;
                    total_e = e;
                    printf("Enter %d edges (u v weight):\\n", e);
                    for (int i = 0; i < e; i++) {
                        scanf("%d %d %d", &edge_list[i].u, &edge_list[i].v, &edge_list[i].weight);
                    }
                    clear_input();
                    printf("Edges registered.\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (total_v == 0 || total_e == 0) {
                    printf("Enter graph edges first.\\n");
                    break;
                }
                run_kruskal();
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
      tags: ["program", "graph", "mst", "kruskal"],
      aliases: ["prog_graph_mst", "programGraphMst"],
    }),

    createComponent({
      id: "algorithms.full-programs.graph-algorithms.topological-sort.prog-topological-sort",
      name: "prog_graph_topological_sort",
      type: "program",
      category: "algorithms",
      subcategory: "graph-algorithms",
      categoryId: "algorithms.full-programs.graph-algorithms.topological-sort",
      path: "algorithms/full-programs/graph-algorithms/topological-sort/prog-topological-sort",
      description: "Complete interactive program executing Kahn's in-degree topological sort and cycle detection",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_V 50

static int adj[MAX_V][MAX_V];
static int in_degree[MAX_V];
static int total_v = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void kahn_topological_sort(void) {
    int in_deg[MAX_V];
    for (int i = 0; i < total_v; i++) in_deg[i] = 0;
    for (int i = 0; i < total_v; i++) {
        for (int j = 0; j < total_v; j++) {
            if (adj[i][j]) in_deg[j]++;
        }
    }
    int queue[MAX_V];
    int front = 0, rear = 0;
    for (int i = 0; i < total_v; i++) {
        if (in_deg[i] == 0) queue[rear++] = i;
    }
    int topo_order[MAX_V];
    int count = 0;
    while (front < rear) {
        int u = queue[front++];
        topo_order[count++] = u;
        for (int v = 0; v < total_v; v++) {
            if (adj[u][v]) {
                in_deg[v]--;
                if (in_deg[v] == 0) queue[rear++] = v;
            }
        }
    }
    if (count != total_v) {
        printf("Graph contains a directed CYCLE! Topological ordering is impossible.\\n");
    } else {
        printf("Topological Ordering (Kahn's): ");
        for (int i = 0; i < count; i++) printf("%d ", topo_order[i]);
        putchar('\\n');
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Topological Sort Workbench ===\\n");
        printf("Active Directed Vertices: %d\\n", total_v);
        printf("1. Enter Directed Acyclic Graph (DAG)\\n");
        printf("2. Compute Topological Ordering\\n");
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
                int v, e;
                printf("Enter V (<= %d) and directed edges E: ", MAX_V);
                if (scanf("%d %d", &v, &e) == 2 && v > 0 && v <= MAX_V) {
                    total_v = v;
                    for (int i = 0; i < total_v; i++) {
                        for (int j = 0; j < total_v; j++) adj[i][j] = 0;
                    }
                    printf("Enter %d directed edges (u -> v):\\n", e);
                    for (int i = 0; i < e; i++) {
                        int u, v1;
                        scanf("%d %d", &u, &v1);
                        if (u >= 0 && u < total_v && v1 >= 0 && v1 < total_v) {
                            adj[u][v1] = 1;
                        }
                    }
                    clear_input();
                    printf("DAG stored.\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (total_v == 0) {
                    printf("Enter graph first.\\n");
                    break;
                }
                kahn_topological_sort();
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
      tags: ["program", "graph", "topological-sort", "kahn"],
      aliases: ["prog_graph_topological_sort", "programGraphTopologicalSort"],
    }),

    createComponent({
      id: "algorithms.full-programs.dynamic-programming.1d-dp.prog-kadane",
      name: "prog_dp_1d_kadane",
      type: "program",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.full-programs.dynamic-programming.1d-dp",
      path: "algorithms/full-programs/dynamic-programming/1d-dp/prog-kadane",
      description: "Complete interactive program running 1D Dynamic Programming: Kadane and Climbing Stairs",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void run_kadane(void) {
    int n;
    printf("Enter array size N: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    long long arr[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    clear_input();
    long long max_so_far = arr[0], curr_max = arr[0];
    int start = 0, end = 0, s = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > curr_max + arr[i]) {
            curr_max = arr[i];
            s = i;
        } else {
            curr_max += arr[i];
        }
        if (curr_max > max_so_far) {
            max_so_far = curr_max;
            start = s;
            end = i;
        }
    }
    printf("Maximum Contiguous Subarray Sum: %lld\\n", max_so_far);
    printf("Subarray elements [indices %d..%d]: ", start, end);
    for (int i = start; i <= end; i++) printf("%lld ", arr[i]);
    putchar('\\n');
}

static void climbing_stairs(void) {
    int n;
    printf("Enter number of stairs N (1 to 45): ");
    if (scanf("%d", &n) != 1 || n < 1 || n > 45) {
        clear_input();
        return;
    }
    clear_input();
    long long dp[46];
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    printf("Distinct ways to climb %d stairs (1 or 2 steps): %lld\\n", n, dp[n]);
}

int main(void) {
    int choice;
    do {
        printf("=== 1D Dynamic Programming Workbench ===\\n");
        printf("1. Kadane's Algorithm (Max Subarray Sum with Indices)\\n");
        printf("2. Climbing Stairs Problem (1 or 2 steps)\\n");
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
                run_kadane();
                break;
            case 2:
                climbing_stairs();
                break;
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
      tags: ["program", "dynamic-programming", "kadane"],
      aliases: ["prog_dp_1d_kadane", "programKadaneDp"],
    }),

    createComponent({
      id: "algorithms.full-programs.dynamic-programming.knapsack.prog-knapsack",
      name: "prog_dp_knapsack",
      type: "program",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.full-programs.dynamic-programming.knapsack",
      path: "algorithms/full-programs/dynamic-programming/knapsack/prog-knapsack",
      description: "Complete interactive program solving 0/1 Knapsack with item traceback and Coin Change",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_ITEMS 100
#define MAX_CAP 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void knapsack_01(void) {
    int n, W;
    printf("Enter number of items N (<= %d) and capacity W (<= %d): ", MAX_ITEMS, MAX_CAP);
    if (scanf("%d %d", &n, &W) != 2 || n <= 0 || W <= 0 || n > MAX_ITEMS || W > MAX_CAP) {
        clear_input();
        return;
    }
    int weights[MAX_ITEMS + 1], values[MAX_ITEMS + 1];
    printf("Enter weight and value for each item (w v):\\n");
    for (int i = 1; i <= n; i++) {
        scanf("%d %d", &weights[i], &values[i]);
    }
    clear_input();
    int dp[MAX_ITEMS + 1][MAX_CAP + 1];
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) dp[i][w] = 0;
            else if (weights[i] <= w) {
                int take = values[i] + dp[i - 1][w - weights[i]];
                int skip = dp[i - 1][w];
                dp[i][w] = (take > skip) ? take : skip;
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    printf("Maximum Knapsack Value: %d\\n", dp[n][W]);
    printf("Selected Items: ");
    int cur_w = W;
    for (int i = n; i > 0 && cur_w > 0; i--) {
        if (dp[i][cur_w] != dp[i - 1][cur_w]) {
            printf("[Item %d: w=%d, v=%d] ", i, weights[i], values[i]);
            cur_w -= weights[i];
        }
    }
    putchar('\\n');
}

static void coin_change_min(void) {
    int n, amount;
    printf("Enter number of coin denominations N and target amount: ");
    if (scanf("%d %d", &n, &amount) != 2 || n <= 0 || amount <= 0 || amount > MAX_CAP) {
        clear_input();
        return;
    }
    int coins[50];
    printf("Enter %d coin denominations: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &coins[i]);
    clear_input();
    int dp[MAX_CAP + 1];
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) dp[i] = 1000000;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < n; j++) {
            if (coins[j] <= i && dp[i - coins[j]] + 1 < dp[i]) {
                dp[i] = dp[i - coins[j]] + 1;
            }
        }
    }
    if (dp[amount] >= 1000000) printf("Amount %d cannot be formed with given coins.\\n", amount);
    else printf("Minimum coins needed to make %d: %d\\n", amount, dp[amount]);
}

int main(void) {
    int choice;
    do {
        printf("=== Knapsack & Coin Change DP Workbench ===\\n");
        printf("1. 0/1 Knapsack with Item Traceback\\n");
        printf("2. Minimum Coins for Change\\n");
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
                knapsack_01();
                break;
            case 2:
                coin_change_min();
                break;
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
      tags: ["program", "dynamic-programming", "knapsack"],
      aliases: ["prog_dp_knapsack", "programKnapsackDp"],
    }),

    createComponent({
      id: "algorithms.full-programs.dynamic-programming.subsequences.prog-lcs",
      name: "prog_dp_lcs",
      type: "program",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.full-programs.dynamic-programming.subsequences",
      path: "algorithms/full-programs/dynamic-programming/subsequences/prog-lcs",
      description: "Complete interactive program computing Longest Common Subsequence (LCS) and LIS",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_LEN 200

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void run_lcs(void) {
    char s1[MAX_LEN], s2[MAX_LEN];
    printf("Enter first string: ");
    if (scanf("%199s", s1) != 1) {
        clear_input();
        return;
    }
    printf("Enter second string: ");
    if (scanf("%199s", s2) != 1) {
        clear_input();
        return;
    }
    clear_input();
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);
    int dp[MAX_LEN + 1][MAX_LEN + 1];
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) dp[i][j] = 0;
            else if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
        }
    }
    int lcs_len = dp[m][n];
    printf("LCS Length: %d\\n", lcs_len);
    char lcs_str[MAX_LEN + 1];
    lcs_str[lcs_len] = '\\0';
    int i = m, j = n, idx = lcs_len - 1;
    while (i > 0 && j > 0) {
        if (s1[i - 1] == s2[j - 1]) {
            lcs_str[idx--] = s1[i - 1];
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    printf("LCS String: %s\\n", lcs_str);
}

static void run_lis(void) {
    int n;
    printf("Enter array size N (<= %d): ", MAX_LEN);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_LEN) {
        clear_input();
        return;
    }
    int arr[MAX_LEN], dp[MAX_LEN];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        dp[i] = 1;
    }
    clear_input();
    int max_lis = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
        if (dp[i] > max_lis) max_lis = dp[i];
    }
    printf("Longest Increasing Subsequence (LIS) Length: %d\\n", max_lis);
}

int main(void) {
    int choice;
    do {
        printf("=== Subsequence DP Workbench ===\\n");
        printf("1. Longest Common Subsequence (LCS Length & String)\\n");
        printf("2. Longest Increasing Subsequence (LIS)\\n");
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
                run_lcs();
                break;
            case 2:
                run_lis();
                break;
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
      tags: ["program", "dynamic-programming", "lcs", "lis"],
      aliases: ["prog_dp_lcs", "programLcsDp"],
    }),

    createComponent({
      id: "algorithms.full-programs.dynamic-programming.string-dp.prog-edit-distance",
      name: "prog_dp_edit_distance",
      type: "program",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.full-programs.dynamic-programming.string-dp",
      path: "algorithms/full-programs/dynamic-programming/string-dp/prog-edit-distance",
      description: "Complete interactive program calculating Levenshtein edit distance with operation traceback",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_LEN 200

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int min3(int a, int b, int c) {
    int m = a;
    if (b < m) m = b;
    if (c < m) m = c;
    return m;
}

static void edit_distance(void) {
    char s1[MAX_LEN], s2[MAX_LEN];
    printf("Enter source string: ");
    if (scanf("%199s", s1) != 1) {
        clear_input();
        return;
    }
    printf("Enter target string: ");
    if (scanf("%199s", s2) != 1) {
        clear_input();
        return;
    }
    clear_input();
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);
    int dp[MAX_LEN + 1][MAX_LEN + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min3(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }
    printf("Levenshtein Edit Distance: %d\\n", dp[m][n]);
    printf("Operations Traceback:\\n");
    int i = m, j = n;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && s1[i - 1] == s2[j - 1]) {
            i--; j--;
        } else if (i > 0 && j > 0 && dp[i][j] == dp[i - 1][j - 1] + 1) {
            printf("Replace '%c' with '%c'\\n", s1[i - 1], s2[j - 1]);
            i--; j--;
        } else if (i > 0 && dp[i][j] == dp[i - 1][j] + 1) {
            printf("Delete '%c'\\n", s1[i - 1]);
            i--;
        } else if (j > 0 && dp[i][j] == dp[i][j - 1] + 1) {
            printf("Insert '%c'\\n", s2[j - 1]);
            j--;
        }
    }
}

int main(void) {
    int choice;
    do {
        printf("=== String Dynamic Programming Workbench ===\\n");
        printf("1. Levenshtein Edit Distance & Operation Traceback\\n");
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
                edit_distance();
                break;
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
      tags: ["program", "dynamic-programming", "edit-distance"],
      aliases: ["prog_dp_edit_distance", "programEditDistanceDp"],
    })
  );

  return components;
}
