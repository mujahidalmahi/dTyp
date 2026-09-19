import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCpProgramsGraphsStringsMath(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.graph-techniques.lowest-common-ancestor.prog-cp-tree-diameter",
      name: "prog_cp_tree_diameter",
      type: "program",
      category: "competitive-programming",
      subcategory: "lowest-common-ancestor",
      categoryId: "competitive-programming.full-programs.graph-techniques.lowest-common-ancestor",
      path: "competitive-programming/full-programs/graph-techniques/lowest-common-ancestor/prog-cp-tree-diameter",
      description: "Finding tree diameter and center nodes via two BFS passes",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Edge {
    int to;
    struct Edge* next;
} Edge;

static int bfs_farthest(int start, int n, Edge** head, int* parent, int* dist) {
    for (int i = 1; i <= n; i++) {
        dist[i] = -1;
        parent[i] = 0;
    }

    int* queue = (int*)malloc((n + 1) * sizeof(int));
    int h = 0, t = 0;

    dist[start] = 0;
    queue[t++] = start;

    int farthest = start;
    int max_dist = 0;

    while (h < t) {
        int u = queue[h++];
        if (dist[u] > max_dist) {
            max_dist = dist[u];
            farthest = u;
        }

        for (Edge* e = head[u]; e != NULL; e = e->next) {
            int v = e->to;
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                parent[v] = u;
                queue[t++] = v;
            }
        }
    }

    free(queue);
    return farthest;
}

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1) return;

    Edge** head = (Edge**)calloc(n + 1, sizeof(Edge*));
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        if (scanf("%d %d", &u, &v) == 2) {
            Edge* e1 = (Edge*)malloc(sizeof(Edge));
            e1->to = v; e1->next = head[u]; head[u] = e1;
            Edge* e2 = (Edge*)malloc(sizeof(Edge));
            e2->to = u; e2->next = head[v]; head[v] = e2;
        }
    }

    int* parent = (int*)malloc((n + 1) * sizeof(int));
    int* dist = (int*)malloc((n + 1) * sizeof(int));

    int u = bfs_farthest(1, n, head, parent, dist);
    int v = bfs_farthest(u, n, head, parent, dist);

    int diameter = dist[v];
    printf("Diameter: %d (Endpoints: %d -> %d)\\n", diameter, u, v);

    int curr = v;
    for (int step = 0; step < diameter / 2; step++) {
        curr = parent[curr];
    }
    printf("Center node: %d\\n", curr);

    for (int i = 1; i <= n; i++) {
        Edge* curr_e = head[i];
        while (curr_e) {
            Edge* tmp = curr_e;
            curr_e = curr_e->next;
            free(tmp);
        }
    }
    free(head);
    free(parent);
    free(dist);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "tree", "diameter", "bfs", "center"],
      aliases: ["prog_cp_tree_diameter", "cpTreeDiameter"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.graph-techniques.lowest-common-ancestor.prog-cp-euler-tour-subtree",
      name: "prog_cp_euler_tour_subtree",
      type: "program",
      category: "competitive-programming",
      subcategory: "lowest-common-ancestor",
      categoryId: "competitive-programming.full-programs.graph-techniques.lowest-common-ancestor",
      path: "competitive-programming/full-programs/graph-techniques/lowest-common-ancestor/prog-cp-euler-tour-subtree",
      description: "Euler Tour tree flattening for O(log N) subtree updates and queries via Fenwick tree",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Edge {
    int to;
    struct Edge* next;
} Edge;

static int timer = 0;
static int tin[100005];
static int tout[100005];
static long long bit[200005];
static int bit_size = 0;

static void bit_add(int idx, long long val) {
    for (; idx <= bit_size; idx += (idx & -idx)) bit[idx] += val;
}

static long long bit_query(int idx) {
    long long sum = 0;
    for (; idx > 0; idx -= (idx & -idx)) sum += bit[idx];
    return sum;
}

static void dfs_euler(int u, int p, Edge** head) {
    tin[u] = ++timer;
    for (Edge* e = head[u]; e != NULL; e = e->next) {
        if (e->to != p) dfs_euler(e->to, u, head);
    }
    tout[u] = timer;
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    long long* vals = (long long*)malloc((n + 1) * sizeof(long long));
    for (int i = 1; i <= n; i++) scanf("%lld", &vals[i]);

    Edge** head = (Edge**)calloc(n + 1, sizeof(Edge*));
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        if (scanf("%d %d", &u, &v) == 2) {
            Edge* e1 = (Edge*)malloc(sizeof(Edge));
            e1->to = v; e1->next = head[u]; head[u] = e1;
            Edge* e2 = (Edge*)malloc(sizeof(Edge));
            e2->to = u; e2->next = head[v]; head[v] = e2;
        }
    }

    timer = 0;
    dfs_euler(1, 0, head);

    bit_size = timer;
    for (int i = 1; i <= bit_size; i++) bit[i] = 0;

    for (int i = 1; i <= n; i++) {
        bit_add(tin[i], vals[i]);
    }

    for (int i = 0; i < q; i++) {
        int type;
        if (scanf("%d", &type) != 1) continue;
        if (type == 1) {
            int node;
            long long delta;
            if (scanf("%d %lld", &node, &delta) == 2) {
                bit_add(tin[node], delta);
            }
        } else {
            int node;
            if (scanf("%d", &node) == 1) {
                long long subtree_sum = bit_query(tout[node]) - bit_query(tin[node] - 1);
                printf("%lld\\n", subtree_sum);
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        Edge* curr = head[i];
        while (curr) {
            Edge* tmp = curr;
            curr = curr->next;
            free(tmp);
        }
    }
    free(head);
    free(vals);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "euler-tour", "subtree-queries", "fenwick-tree"],
      aliases: ["prog_cp_euler_tour_subtree", "cpEulerTourSubtree"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.graph-techniques.zero-one-bfs.prog-cp-floyd-warshall",
      name: "prog_cp_floyd_warshall",
      type: "program",
      category: "competitive-programming",
      subcategory: "zero-one-bfs",
      categoryId: "competitive-programming.full-programs.graph-techniques.zero-one-bfs",
      path: "competitive-programming/full-programs/graph-techniques/zero-one-bfs/prog-cp-floyd-warshall",
      description: "Floyd-Warshall All-Pairs Shortest Path with intermediate path reconstruction and negative cycle check",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define INF 1000000000LL

static long long dist[405][405];
static int next_node[405][405];

static void print_path(int u, int v) {
    if (dist[u][v] >= INF) {
        printf("NO PATH\\n");
        return;
    }
    printf("Path: %d", u);
    while (u != v) {
        u = next_node[u][v];
        printf(" -> %d", u);
    }
    printf("\\n");
}

static void solve(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            dist[i][j] = (i == j) ? 0 : INF;
            next_node[i][j] = (i == j) ? j : -1;
        }
    }

    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        if (scanf("%d %d %lld", &u, &v, &w) == 3) {
            if (w < dist[u][v]) {
                dist[u][v] = w;
                next_node[u][v] = v;
            }
        }
    }

    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (dist[i][k] < INF && dist[k][j] < INF) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        next_node[i][j] = next_node[i][k];
                    }
                }
            }
        }
    }

    int has_neg_cycle = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i][i] < 0) {
            has_neg_cycle = 1;
            break;
        }
    }

    if (has_neg_cycle) {
        printf("NEGATIVE CYCLE DETECTED\\n");
    } else {
        printf("All-pairs shortest paths computed.\\n");
        if (n >= 2) {
            printf("Distance 1 to %d: %lld\\n", n, dist[1][n]);
            print_path(1, n);
        }
    }
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "floyd-warshall", "all-pairs", "path-reconstruction"],
      aliases: ["prog_cp_floyd_warshall", "cpFloydWarshall"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.graph-techniques.strongly-connected.prog-cp-topological-kahn-cycle",
      name: "prog_cp_topological_kahn_cycle",
      type: "program",
      category: "competitive-programming",
      subcategory: "strongly-connected",
      categoryId: "competitive-programming.full-programs.graph-techniques.strongly-connected",
      path: "competitive-programming/full-programs/graph-techniques/strongly-connected/prog-cp-topological-kahn-cycle",
      description: "Kahn's topological sort producing lexicographically smallest order via Min-Heap and cycle detection",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* data;
    int size;
    int capacity;
} MinHeap;

static void heap_init(MinHeap* h, int cap) {
    h->size = 0;
    h->capacity = cap;
    h->data = (int*)malloc(cap * sizeof(int));
}

static void heap_push(MinHeap* h, int val) {
    int idx = h->size++;
    while (idx > 0) {
        int p = (idx - 1) / 2;
        if (h->data[p] <= val) break;
        h->data[idx] = h->data[p];
        idx = p;
    }
    h->data[idx] = val;
}

static int heap_pop(MinHeap* h) {
    int top = h->data[0];
    int last = h->data[--h->size];
    if (h->size == 0) return top;
    int idx = 0;
    while (idx * 2 + 1 < h->size) {
        int l = idx * 2 + 1;
        int r = idx * 2 + 2;
        int smallest = l;
        if (r < h->size && h->data[r] < h->data[l]) smallest = r;
        if (last <= h->data[smallest]) break;
        h->data[idx] = h->data[smallest];
        idx = smallest;
    }
    h->data[idx] = last;
    return top;
}

typedef struct Edge {
    int to;
    struct Edge* next;
} Edge;

static void solve(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return;

    Edge** head = (Edge**)calloc(n + 1, sizeof(Edge*));
    int* indegree = (int*)calloc(n + 1, sizeof(int));

    for (int i = 0; i < m; i++) {
        int u, v;
        if (scanf("%d %d", &u, &v) == 2) {
            Edge* e = (Edge*)malloc(sizeof(Edge));
            e->to = v; e->next = head[u]; head[u] = e;
            indegree[v]++;
        }
    }

    MinHeap heap;
    heap_init(&heap, n + 2);

    for (int i = 1; i <= n; i++) {
        if (indegree[i] == 0) heap_push(&heap, i);
    }

    int* order = (int*)malloc(n * sizeof(int));
    int order_cnt = 0;

    while (heap.size > 0) {
        int u = heap_pop(&heap);
        order[order_cnt++] = u;

        for (Edge* e = head[u]; e != NULL; e = e->next) {
            indegree[e->to]--;
            if (indegree[e->to] == 0) {
                heap_push(&heap, e->to);
            }
        }
    }

    if (order_cnt < n) {
        printf("-1\\n");
    } else {
        for (int i = 0; i < n; i++) {
            printf("%d%c", order[i], (i == n - 1 ? '\\n' : ' '));
        }
    }

    for (int i = 1; i <= n; i++) {
        Edge* curr = head[i];
        while (curr) {
            Edge* tmp = curr;
            curr = curr->next;
            free(tmp);
        }
    }
    free(head);
    free(indegree);
    free(order);
    free(heap.data);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "topological-sort", "kahns", "min-heap", "cycle-detection"],
      aliases: ["prog_cp_topological_kahn_cycle", "cpTopologicalKahn"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.number-theory.combinatorics.prog-cp-dp-digit",
      name: "prog_cp_dp_digit",
      type: "program",
      category: "competitive-programming",
      subcategory: "combinatorics",
      categoryId: "competitive-programming.full-programs.number-theory.combinatorics",
      path: "competitive-programming/full-programs/number-theory/combinatorics/prog-cp-dp-digit",
      description: "Digit DP counting integers in range [L, R] with target digit sum constraints",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

static long long memo[20][180][2];
static int digits[20];
static int num_len = 0;

static long long count_valid(int idx, int sum, int tight) {
    if (idx == num_len) return (sum == 0) ? 1 : 0;
    if (memo[idx][sum][tight] != -1) return memo[idx][sum][tight];

    int limit = tight ? digits[idx] : 9;
    long long total = 0;

    for (int d = 0; d <= limit; d++) {
        if (d <= sum) {
            total += count_valid(idx + 1, sum - d, tight && (d == limit));
        }
    }

    return memo[idx][sum][tight] = total;
}

static long long solve_range(long long val, int target_sum) {
    if (val < 0) return 0;
    if (val == 0) return (target_sum == 0) ? 1 : 0;

    char buf[32];
    snprintf(buf, sizeof(buf), "%lld", val);
    num_len = (int)strlen(buf);
    for (int i = 0; i < num_len; i++) digits[i] = buf[i] - '0';

    memset(memo, -1, sizeof(memo));
    return count_valid(0, target_sum, 1);
}

static void solve(void) {
    long long l, r;
    int target_sum;
    if (scanf("%lld %lld %d", &l, &r, &target_sum) != 3) return;

    long long ans = solve_range(r, target_sum) - solve_range(l - 1, target_sum);
    printf("%lld\\n", ans);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "digit-dp", "dynamic-programming", "counting"],
      aliases: ["prog_cp_dp_digit", "cpDigitDp"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.bit-manipulation.bitmasking.prog-cp-dp-bitmask-tsp",
      name: "prog_cp_dp_bitmask_tsp",
      type: "program",
      category: "competitive-programming",
      subcategory: "bitmasking",
      categoryId: "competitive-programming.full-programs.bit-manipulation.bitmasking",
      path: "competitive-programming/full-programs/bit-manipulation/bitmasking/prog-cp-dp-bitmask-tsp",
      description: "Bitmask DP solving Traveling Salesperson Problem in O(N^2 2^N) with tour reconstruction",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define INF 1000000000

static int dist[16][16];
static int dp[1 << 16][16];
static int parent[1 << 16][16];

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1 || n > 16) return;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &dist[i][j]);
        }
    }

    int full_mask = (1 << n);
    for (int mask = 0; mask < full_mask; mask++) {
        for (int u = 0; u < n; u++) {
            dp[mask][u] = INF;
            parent[mask][u] = -1;
        }
    }

    dp[1][0] = 0;

    for (int mask = 1; mask < full_mask; mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask & (1 << u)) || dp[mask][u] == INF) continue;

            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                int next_mask = mask | (1 << v);
                int cost = dp[mask][u] + dist[u][v];
                if (cost < dp[next_mask][v]) {
                    dp[next_mask][v] = cost;
                    parent[next_mask][v] = u;
                }
            }
        }
    }

    int best_cost = INF;
    int best_last = -1;
    for (int u = 1; u < n; u++) {
        if (dp[full_mask - 1][u] + dist[u][0] < best_cost) {
            best_cost = dp[full_mask - 1][u] + dist[u][0];
            best_last = u;
        }
    }

    printf("Minimum Tour Cost: %d\\n", best_cost);

    int tour[18];
    int tour_cnt = 0;
    int curr_mask = full_mask - 1;
    int curr_node = best_last;

    while (curr_node != -1) {
        tour[tour_cnt++] = curr_node;
        int p = parent[curr_mask][curr_node];
        curr_mask ^= (1 << curr_node);
        curr_node = p;
    }

    printf("Tour: ");
    for (int i = tour_cnt - 1; i >= 0; i--) printf("%d -> ", tour[i]);
    printf("0\\n");
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "bitmask-dp", "tsp", "hamiltonian-cycle"],
      aliases: ["prog_cp_dp_bitmask_tsp", "cpBitmaskTsp"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.number-theory.modular-arithmetic.prog-cp-string-double-hash",
      name: "prog_cp_string_double_hash",
      type: "program",
      category: "competitive-programming",
      subcategory: "modular-arithmetic",
      categoryId: "competitive-programming.full-programs.number-theory.modular-arithmetic",
      path: "competitive-programming/full-programs/number-theory/modular-arithmetic/prog-cp-string-double-hash",
      description: "Double polynomial rolling string hashing with O(1) substring queries and collision immunity",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_LEN 100005
#define MOD1 1000000007LL
#define MOD2 1000000009LL
#define BASE1 31LL
#define BASE2 37LL

static long long pow1[MAX_LEN];
static long long pow2[MAX_LEN];
static long long h1[MAX_LEN];
static long long h2[MAX_LEN];

static void init_powers(int n) {
    pow1[0] = 1; pow2[0] = 1;
    for (int i = 1; i <= n; i++) {
        pow1[i] = (pow1[i - 1] * BASE1) % MOD1;
        pow2[i] = (pow2[i - 1] * BASE2) % MOD2;
    }
}

static void compute_prefix_hashes(const char* s, int n) {
    h1[0] = 0; h2[0] = 0;
    for (int i = 0; i < n; i++) {
        long long val = s[i] - 'a' + 1;
        h1[i + 1] = (h1[i] * BASE1 + val) % MOD1;
        h2[i + 1] = (h2[i] * BASE2 + val) % MOD2;
    }
}

static long long get_hash1(int l, int r) {
    long long res = (h1[r] - h1[l - 1] * pow1[r - l + 1]) % MOD1;
    return (res + MOD1) % MOD1;
}

static long long get_hash2(int l, int r) {
    long long res = (h2[r] - h2[l - 1] * pow2[r - l + 1]) % MOD2;
    return (res + MOD2) % MOD2;
}

static int are_substrings_equal(int l1, int r1, int l2, int r2) {
    if ((r1 - l1) != (r2 - l2)) return 0;
    return (get_hash1(l1, r1) == get_hash1(l2, r2)) &&
           (get_hash2(l1, r2) == get_hash2(l2, r2));
}

static void solve(void) {
    char s[MAX_LEN];
    int q;
    if (scanf("%s %d", s, &q) != 2) return;

    int n = (int)strlen(s);
    init_powers(n);
    compute_prefix_hashes(s, n);

    for (int i = 0; i < q; i++) {
        int l1, r1, l2, r2;
        if (scanf("%d %d %d %d", &l1, &r1, &l2, &r2) == 4) {
            printf("%s\\n", are_substrings_equal(l1, r1, l2, r2) ? "EQUAL" : "DIFFERENT");
        }
    }
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "string-hashing", "double-hash", "substring-equality"],
      aliases: ["prog_cp_string_double_hash", "cpStringDoubleHash"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.fast-io-utilities.fast-io.prog-cp-string-z-algorithm",
      name: "prog_cp_string_z_algorithm",
      type: "program",
      category: "competitive-programming",
      subcategory: "fast-io",
      categoryId: "competitive-programming.full-programs.fast-io-utilities.fast-io",
      path: "competitive-programming/full-programs/fast-io-utilities/fast-io/prog-cp-string-z-algorithm",
      description: "Linear-time Z-Algorithm computing longest common prefix array for exact string matching",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

static void compute_z(const char* s, int n, int* z) {
    int l = 0, r = 0;
    z[0] = n;
    for (int i = 1; i < n; i++) {
        if (i <= r) {
            z[i] = (r - i + 1 < z[i - l]) ? (r - i + 1) : z[i - l];
        } else {
            z[i] = 0;
        }
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
}

static void solve(void) {
    char pat[100005];
    char text[100005];
    if (scanf("%s %s", pat, text) != 2) return;

    int p_len = (int)strlen(pat);
    int t_len = (int)strlen(text);
    int total_len = p_len + 1 + t_len;

    char* concat = (char*)malloc(total_len + 1);
    memcpy(concat, pat, p_len);
    concat[p_len] = '$';
    memcpy(concat + p_len + 1, text, t_len);
    concat[total_len] = '\\0';

    int* z = (int*)malloc(total_len * sizeof(int));
    compute_z(concat, total_len, z);

    int matches = 0;
    for (int i = p_len + 1; i < total_len; i++) {
        if (z[i] == p_len) {
            matches++;
        }
    }

    printf("Occurrences: %d\\n", matches);
    for (int i = p_len + 1; i < total_len; i++) {
        if (z[i] == p_len) {
            printf("%d ", i - (p_len + 1) + 1);
        }
    }
    printf("\\n");

    free(concat);
    free(z);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "z-algorithm", "string-matching", "linear-time"],
      aliases: ["prog_cp_string_z_algorithm", "cpStringZAlgorithm"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.bit-manipulation.bitwise-tricks.prog-cp-trie-xor-max",
      name: "prog_cp_trie_xor_max",
      type: "program",
      category: "competitive-programming",
      subcategory: "bitwise-tricks",
      categoryId: "competitive-programming.full-programs.bit-manipulation.bitwise-tricks",
      path: "competitive-programming/full-programs/bit-manipulation/bitwise-tricks/prog-cp-trie-xor-max",
      description: "Binary bitwise Trie inserting integers and querying Maximum XOR Pair in O(31) time",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct TrieNode {
    int next[2];
} TrieNode;

static TrieNode nodes[3100005];
static int node_count = 0;

static int new_node(void) {
    nodes[node_count].next[0] = -1;
    nodes[node_count].next[1] = -1;
    return node_count++;
}

static void trie_insert(int val) {
    int curr = 0;
    for (int i = 30; i >= 0; i--) {
        int bit = (val >> i) & 1;
        if (nodes[curr].next[bit] == -1) {
            nodes[curr].next[bit] = new_node();
        }
        curr = nodes[curr].next[bit];
    }
}

static int query_max_xor(int val) {
    int curr = 0;
    int max_xor = 0;
    for (int i = 30; i >= 0; i--) {
        int bit = (val >> i) & 1;
        int opp_bit = 1 - bit;
        if (nodes[curr].next[opp_bit] != -1) {
            max_xor |= (1 << i);
            curr = nodes[curr].next[opp_bit];
        } else {
            curr = nodes[curr].next[bit];
        }
    }
    return max_xor;
}

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1) return;

    node_count = 0;
    new_node();

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        trie_insert(arr[i]);
    }

    int best_xor = 0;
    for (int i = 0; i < n; i++) {
        int candidate = query_max_xor(arr[i]);
        if (candidate > best_xor) best_xor = candidate;
    }

    printf("%d\\n", best_xor);
    free(arr);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "bitwise-trie", "maximum-xor", "trie"],
      aliases: ["prog_cp_trie_xor_max", "cpTrieXorMax"],
    })
  );

  return components;
}
