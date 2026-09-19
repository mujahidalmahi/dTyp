import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCpProgramsStlStructures(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-stl-vector",
      name: "prog_cp_stl_vector",
      type: "program",
      category: "competitive-programming",
      subcategory: "monotonic-structures",
      categoryId: "competitive-programming.full-programs.cp-data-structures.monotonic-structures",
      path: "competitive-programming/full-programs/cp-data-structures/monotonic-structures/prog-cp-stl-vector",
      description: "C dynamic vector container emulator applied to competitive graph adjacency lists and BFS",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* data;
    int size;
    int capacity;
} Vector;

static void vec_init(Vector* v) {
    v->size = 0;
    v->capacity = 4;
    v->data = (int*)malloc(v->capacity * sizeof(int));
}

static void vec_push(Vector* v, int val) {
    if (v->size >= v->capacity) {
        v->capacity *= 2;
        v->data = (int*)realloc(v->data, v->capacity * sizeof(int));
    }
    v->data[v->size++] = val;
}

static void vec_free(Vector* v) {
    if (v->data) {
        free(v->data);
        v->data = NULL;
    }
    v->size = 0;
    v->capacity = 0;
}

static void solve(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return;

    Vector* adj = (Vector*)malloc((n + 1) * sizeof(Vector));
    for (int i = 1; i <= n; i++) vec_init(&adj[i]);

    for (int i = 0; i < m; i++) {
        int u, v;
        if (scanf("%d %d", &u, &v) == 2) {
            vec_push(&adj[u], v);
            vec_push(&adj[v], u);
        }
    }

    int* dist = (int*)malloc((n + 1) * sizeof(int));
    int* queue = (int*)malloc((n + 1) * sizeof(int));
    for (int i = 1; i <= n; i++) dist[i] = -1;

    int head = 0, tail = 0;
    dist[1] = 0;
    queue[tail++] = 1;

    while (head < tail) {
        int curr = queue[head++];
        for (int i = 0; i < adj[curr].size; i++) {
            int nxt = adj[curr].data[i];
            if (dist[nxt] == -1) {
                dist[nxt] = dist[curr] + 1;
                queue[tail++] = nxt;
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        printf("%d%c", dist[i], (i == n ? '\\n' : ' '));
    }

    for (int i = 1; i <= n; i++) vec_free(&adj[i]);
    free(adj);
    free(dist);
    free(queue);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "stl", "vector", "graph", "bfs"],
      aliases: ["prog_cp_stl_vector", "cpStlVector"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-stl-priority-queue",
      name: "prog_cp_stl_priority_queue",
      type: "program",
      category: "competitive-programming",
      subcategory: "monotonic-structures",
      categoryId: "competitive-programming.full-programs.cp-data-structures.monotonic-structures",
      path: "competitive-programming/full-programs/cp-data-structures/monotonic-structures/prog-cp-stl-priority-queue",
      description: "C binary min-heap priority queue emulator applied to Dijkstra shortest paths",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define INF 1000000000000000LL

typedef struct {
    long long dist;
    int u;
} HeapNode;

typedef struct {
    HeapNode* data;
    int size;
    int capacity;
} PriorityQueue;

static void pq_init(PriorityQueue* pq, int cap) {
    pq->size = 0;
    pq->capacity = cap;
    pq->data = (HeapNode*)malloc(cap * sizeof(HeapNode));
}

static void pq_push(PriorityQueue* pq, long long dist, int u) {
    if (pq->size >= pq->capacity) {
        pq->capacity *= 2;
        pq->data = (HeapNode*)realloc(pq->data, pq->capacity * sizeof(HeapNode));
    }
    int idx = pq->size++;
    while (idx > 0) {
        int parent = (idx - 1) / 2;
        if (pq->data[parent].dist <= dist) break;
        pq->data[idx] = pq->data[parent];
        idx = parent;
    }
    pq->data[idx].dist = dist;
    pq->data[idx].u = u;
}

static HeapNode pq_pop(PriorityQueue* pq) {
    HeapNode top = pq->data[0];
    HeapNode last = pq->data[--pq->size];
    if (pq->size == 0) return top;
    int idx = 0;
    while (idx * 2 + 1 < pq->size) {
        int left = idx * 2 + 1;
        int right = idx * 2 + 2;
        int smallest = left;
        if (right < pq->size && pq->data[right].dist < pq->data[left].dist) smallest = right;
        if (last.dist <= pq->data[smallest].dist) break;
        pq->data[idx] = pq->data[smallest];
        idx = smallest;
    }
    pq->data[idx] = last;
    return top;
}

static void pq_free(PriorityQueue* pq) {
    if (pq->data) free(pq->data);
    pq->size = 0;
    pq->capacity = 0;
}

typedef struct Edge {
    int to;
    long long weight;
    struct Edge* next;
} Edge;

static void solve(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return;

    Edge** head = (Edge**)calloc(n + 1, sizeof(Edge*));
    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        if (scanf("%d %d %lld", &u, &v, &w) == 3) {
            Edge* e1 = (Edge*)malloc(sizeof(Edge));
            e1->to = v; e1->weight = w; e1->next = head[u]; head[u] = e1;
            Edge* e2 = (Edge*)malloc(sizeof(Edge));
            e2->to = u; e2->weight = w; e2->next = head[v]; head[v] = e2;
        }
    }

    long long* dist = (long long*)malloc((n + 1) * sizeof(long long));
    for (int i = 1; i <= n; i++) dist[i] = INF;

    PriorityQueue pq;
    pq_init(&pq, 16);

    dist[1] = 0;
    pq_push(&pq, 0, 1);

    while (pq.size > 0) {
        HeapNode top = pq_pop(&pq);
        long long d = top.dist;
        int u = top.u;
        if (d > dist[u]) continue;

        for (Edge* e = head[u]; e != NULL; e = e->next) {
            if (dist[u] + e->weight < dist[e->to]) {
                dist[e->to] = dist[u] + e->weight;
                pq_push(&pq, dist[e->to], e->to);
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        long long ans = (dist[i] == INF) ? -1 : dist[i];
        printf("%lld%c", ans, (i == n ? '\\n' : ' '));
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
    free(dist);
    pq_free(&pq);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "stl", "priority-queue", "dijkstra"],
      aliases: ["prog_cp_stl_priority_queue", "cpStlPriorityQueue"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-stl-deque",
      name: "prog_cp_stl_deque",
      type: "program",
      category: "competitive-programming",
      subcategory: "monotonic-structures",
      categoryId: "competitive-programming.full-programs.cp-data-structures.monotonic-structures",
      path: "competitive-programming/full-programs/cp-data-structures/monotonic-structures/prog-cp-stl-deque",
      description: "C double-ended deque emulator applied to linear-time sliding window maximum",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* data;
    int head;
    int tail;
    int size;
    int capacity;
} Deque;

static void deque_init(Deque* dq, int cap) {
    dq->capacity = cap;
    dq->size = 0;
    dq->head = 0;
    dq->tail = 0;
    dq->data = (int*)malloc(cap * sizeof(int));
}

static void deque_push_back(Deque* dq, int val) {
    dq->data[dq->tail] = val;
    dq->tail = (dq->tail + 1) % dq->capacity;
    dq->size++;
}

static void deque_pop_back(Deque* dq) {
    dq->tail = (dq->tail - 1 + dq->capacity) % dq->capacity;
    dq->size--;
}

static void deque_pop_front(Deque* dq) {
    dq->head = (dq->head + 1) % dq->capacity;
    dq->size--;
}

static int deque_front(const Deque* dq) {
    return dq->data[dq->head];
}

static int deque_back(const Deque* dq) {
    return dq->data[(dq->tail - 1 + dq->capacity) % dq->capacity];
}

static void deque_free(Deque* dq) {
    if (dq->data) free(dq->data);
    dq->size = 0;
}

static void solve(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    Deque dq;
    deque_init(&dq, n + 4);

    for (int i = 0; i < n; i++) {
        while (dq.size > 0 && deque_front(&dq) <= i - k) {
            deque_pop_front(&dq);
        }
        while (dq.size > 0 && arr[deque_back(&dq)] <= arr[i]) {
            deque_pop_back(&dq);
        }
        deque_push_back(&dq, i);

        if (i >= k - 1) {
            printf("%d%c", arr[deque_front(&dq)], (i == n - 1 ? '\\n' : ' '));
        }
    }

    deque_free(&dq);
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
      tags: ["competitive-programming", "stl", "deque", "sliding-window"],
      aliases: ["prog_cp_stl_deque", "cpStlDeque"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-stl-hash-map",
      name: "prog_cp_stl_hash_map",
      type: "program",
      category: "competitive-programming",
      subcategory: "monotonic-structures",
      categoryId: "competitive-programming.full-programs.cp-data-structures.monotonic-structures",
      path: "competitive-programming/full-programs/cp-data-structures/monotonic-structures/prog-cp-stl-hash-map",
      description: "Anti-hack splitmix64 fast open-addressing hash table in C for competitive frequency queries",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#define TABLE_SIZE 262144
#define MASK (TABLE_SIZE - 1)

static uint64_t splitmix64(uint64_t x) {
    x += 0x9e3779b97f4a7c15ULL;
    x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
    x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
    return x ^ (x >> 31);
}

typedef struct {
    long long key;
    int count;
    int occupied;
} HashEntry;

static HashEntry table[TABLE_SIZE];

static void hash_clear(void) {
    memset(table, 0, sizeof(table));
}

static void hash_insert(long long key) {
    uint32_t idx = (uint32_t)(splitmix64((uint64_t)key) & MASK);
    while (table[idx].occupied) {
        if (table[idx].key == key) {
            table[idx].count++;
            return;
        }
        idx = (idx + 1) & MASK;
    }
    table[idx].occupied = 1;
    table[idx].key = key;
    table[idx].count = 1;
}

static int hash_query(long long key) {
    uint32_t idx = (uint32_t)(splitmix64((uint64_t)key) & MASK);
    while (table[idx].occupied) {
        if (table[idx].key == key) return table[idx].count;
        idx = (idx + 1) & MASK;
    }
    return 0;
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    hash_clear();
    for (int i = 0; i < n; i++) {
        long long val;
        if (scanf("%lld", &val) == 1) {
            hash_insert(val);
        }
    }

    for (int i = 0; i < q; i++) {
        long long query_key;
        if (scanf("%lld", &query_key) == 1) {
            printf("%d%c", hash_query(query_key), (i == q - 1 ? '\\n' : ' '));
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
      tags: ["competitive-programming", "stl", "hash-map", "splitmix64", "anti-hack"],
      aliases: ["prog_cp_stl_hash_map", "cpStlHashMap"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.segment-tree.prog-cp-lazy-segment-tree",
      name: "prog_cp_lazy_segment_tree",
      type: "program",
      category: "competitive-programming",
      subcategory: "segment-tree",
      categoryId: "competitive-programming.full-programs.cp-data-structures.segment-tree",
      path: "competitive-programming/full-programs/cp-data-structures/segment-tree/prog-cp-lazy-segment-tree",
      description: "Segment Tree with Lazy Propagation supporting range addition and range sum queries",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    long long sum;
    long long lazy;
} SegNode;

static SegNode tree[400005];
static long long arr[100005];

static void push(int node, int start, int end) {
    if (tree[node].lazy != 0) {
        long long val = tree[node].lazy;
        int mid = (start + end) / 2;
        tree[2 * node].sum += (mid - start + 1) * val;
        tree[2 * node].lazy += val;
        tree[2 * node + 1].sum += (end - mid) * val;
        tree[2 * node + 1].lazy += val;
        tree[node].lazy = 0;
    }
}

static void build(int node, int start, int end) {
    tree[node].lazy = 0;
    if (start == end) {
        tree[node].sum = arr[start];
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node].sum = tree[2 * node].sum + tree[2 * node + 1].sum;
}

static void update_range(int node, int start, int end, int l, int r, long long val) {
    if (r < start || end < l) return;
    if (l <= start && end <= r) {
        tree[node].sum += (end - start + 1) * val;
        tree[node].lazy += val;
        return;
    }
    push(node, start, end);
    int mid = (start + end) / 2;
    update_range(2 * node, start, mid, l, r, val);
    update_range(2 * node + 1, mid + 1, end, l, r, val);
    tree[node].sum = tree[2 * node].sum + tree[2 * node + 1].sum;
}

static long long query_range(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree[node].sum;
    push(node, start, end);
    int mid = (start + end) / 2;
    return query_range(2 * node, start, mid, l, r) +
           query_range(2 * node + 1, mid + 1, end, l, r);
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    for (int i = 1; i <= n; i++) scanf("%lld", &arr[i]);
    build(1, 1, n);

    for (int i = 0; i < q; i++) {
        int type;
        if (scanf("%d", &type) != 1) continue;
        if (type == 1) {
            int l, r;
            long long v;
            if (scanf("%d %d %lld", &l, &r, &v) == 3) {
                update_range(1, 1, n, l, r, v);
            }
        } else {
            int l, r;
            if (scanf("%d %d", &l, &r) == 2) {
                printf("%lld\\n", query_range(1, 1, n, l, r));
            }
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
      tags: ["competitive-programming", "segment-tree", "lazy-propagation", "range-queries"],
      aliases: ["prog_cp_lazy_segment_tree", "cpLazySegmentTree"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.disjoint-set.prog-cp-dsu-rollback",
      name: "prog_cp_dsu_rollback",
      type: "program",
      category: "competitive-programming",
      subcategory: "disjoint-set",
      categoryId: "competitive-programming.full-programs.cp-data-structures.disjoint-set",
      path: "competitive-programming/full-programs/cp-data-structures/disjoint-set/prog-cp-dsu-rollback",
      description: "Disjoint Set Union with stack-based rollback operations for offline dynamic connectivity",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int u;
    int v;
    int rank_increased;
} RollbackEntry;

static int parent[100005];
static int rank_arr[100005];
static RollbackEntry history[100005];
static int history_top = 0;
static int component_count = 0;

static void dsu_init(int n) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        rank_arr[i] = 0;
    }
    history_top = 0;
    component_count = n;
}

static int dsu_find(int i) {
    while (i != parent[i]) i = parent[i];
    return i;
}

static int dsu_union(int u, int v) {
    int root_u = dsu_find(u);
    int root_v = dsu_find(v);
    if (root_u == root_v) return 0;

    if (rank_arr[root_u] < rank_arr[root_v]) {
        int tmp = root_u; root_u = root_v; root_v = tmp;
    }

    history[history_top].u = root_u;
    history[history_top].v = root_v;
    history[history_top].rank_increased = 0;

    parent[root_v] = root_u;
    if (rank_arr[root_u] == rank_arr[root_v]) {
        rank_arr[root_u]++;
        history[history_top].rank_increased = 1;
    }
    history_top++;
    component_count--;
    return 1;
}

static void dsu_rollback(int target_size) {
    while (history_top > target_size) {
        history_top--;
        int root_u = history[history_top].u;
        int root_v = history[history_top].v;
        if (history[history_top].rank_increased) {
            rank_arr[root_u]--;
        }
        parent[root_v] = root_v;
        component_count++;
    }
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    dsu_init(n);

    for (int i = 0; i < q; i++) {
        int op;
        if (scanf("%d", &op) != 1) continue;
        if (op == 1) {
            int u, v;
            if (scanf("%d %d", &u, &v) == 2) {
                dsu_union(u, v);
                printf("Components: %d\\n", component_count);
            }
        } else if (op == 2) {
            int target;
            if (scanf("%d", &target) == 1) {
                dsu_rollback(target);
                printf("Rollback to snapshot %d -> Components: %d\\n", target, component_count);
            }
        } else if (op == 3) {
            int u, v;
            if (scanf("%d %d", &u, &v) == 2) {
                printf("%s\\n", (dsu_find(u) == dsu_find(v)) ? "YES" : "NO");
            }
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
      tags: ["competitive-programming", "dsu", "rollback", "dynamic-connectivity"],
      aliases: ["prog_cp_dsu_rollback", "cpDsuRollback"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.fenwick-tree.prog-cp-fenwick-2d",
      name: "prog_cp_fenwick_2d",
      type: "program",
      category: "competitive-programming",
      subcategory: "fenwick-tree",
      categoryId: "competitive-programming.full-programs.cp-data-structures.fenwick-tree",
      path: "competitive-programming/full-programs/cp-data-structures/fenwick-tree/prog-cp-fenwick-2d",
      description: "2D Binary Indexed Tree for submatrix point updates and subgrid range queries",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_DIM 1024

static long long bit[MAX_DIM][MAX_DIM];
static int n_rows = 0, n_cols = 0;

static void bit2d_add(int r, int c, long long val) {
    for (int i = r; i <= n_rows; i += (i & -i)) {
        for (int j = c; j <= n_cols; j += (j & -j)) {
            bit[i][j] += val;
        }
    }
}

static long long bit2d_query(int r, int c) {
    long long sum = 0;
    for (int i = r; i > 0; i -= (i & -i)) {
        for (int j = c; j > 0; j -= (j & -j)) {
            sum += bit[i][j];
        }
    }
    return sum;
}

static long long bit2d_range(int r1, int c1, int r2, int c2) {
    return bit2d_query(r2, c2)
         - bit2d_query(r1 - 1, c2)
         - bit2d_query(r2, c1 - 1)
         + bit2d_query(r1 - 1, c1 - 1);
}

static void solve(void) {
    int q;
    if (scanf("%d %d %d", &n_rows, &n_cols, &q) != 3) return;

    memset(bit, 0, sizeof(bit));

    for (int i = 0; i < q; i++) {
        int type;
        if (scanf("%d", &type) != 1) continue;
        if (type == 1) {
            int r, c;
            long long v;
            if (scanf("%d %d %lld", &r, &c, &v) == 3) {
                bit2d_add(r, c, v);
            }
        } else {
            int r1, c1, r2, c2;
            if (scanf("%d %d %d %d", &r1, &c1, &r2, &c2) == 4) {
                printf("%lld\\n", bit2d_range(r1, c1, r2, c2));
            }
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
      tags: ["competitive-programming", "fenwick-tree", "2d", "matrix-queries"],
      aliases: ["prog_cp_fenwick_2d", "cpFenwick2d"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.segment-tree.prog-cp-segment-tree-beats",
      name: "prog_cp_segment_tree_beats",
      type: "program",
      category: "competitive-programming",
      subcategory: "segment-tree",
      categoryId: "competitive-programming.full-programs.cp-data-structures.segment-tree",
      path: "competitive-programming/full-programs/cp-data-structures/segment-tree/prog-cp-segment-tree-beats",
      description: "Segment Tree Beats algorithm for range min updates and range sum queries",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define INF 2000000000

typedef struct {
    long long sum;
    int max1;
    int max2;
    int max_cnt;
} BeatsNode;

static BeatsNode tree[400005];
static int arr[100005];

static void merge_nodes(int node) {
    int lc = 2 * node, rc = 2 * node + 1;
    tree[node].sum = tree[lc].sum + tree[rc].sum;

    if (tree[lc].max1 == tree[rc].max1) {
        tree[node].max1 = tree[lc].max1;
        tree[node].max_cnt = tree[lc].max_cnt + tree[rc].max_cnt;
        tree[node].max2 = (tree[lc].max2 > tree[rc].max2) ? tree[lc].max2 : tree[rc].max2;
    } else if (tree[lc].max1 > tree[rc].max1) {
        tree[node].max1 = tree[lc].max1;
        tree[node].max_cnt = tree[lc].max_cnt;
        tree[node].max2 = (tree[lc].max2 > tree[rc].max1) ? tree[lc].max2 : tree[rc].max1;
    } else {
        tree[node].max1 = tree[rc].max1;
        tree[node].max_cnt = tree[rc].max_cnt;
        tree[node].max2 = (tree[lc].max1 > tree[rc].max2) ? tree[lc].max1 : tree[rc].max2;
    }
}

static void apply_chmin(int node, int limit) {
    if (limit >= tree[node].max1) return;
    tree[node].sum -= (long long)(tree[node].max1 - limit) * tree[node].max_cnt;
    tree[node].max1 = limit;
}

static void push_down(int node) {
    apply_chmin(2 * node, tree[node].max1);
    apply_chmin(2 * node + 1, tree[node].max1);
}

static void build(int node, int start, int end) {
    if (start == end) {
        tree[node].sum = arr[start];
        tree[node].max1 = arr[start];
        tree[node].max2 = -INF;
        tree[node].max_cnt = 1;
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    merge_nodes(node);
}

static void update_chmin(int node, int start, int end, int l, int r, int val) {
    if (r < start || end < l || val >= tree[node].max1) return;
    if (l <= start && end <= r && val > tree[node].max2) {
        apply_chmin(node, val);
        return;
    }
    push_down(node);
    int mid = (start + end) / 2;
    update_chmin(2 * node, start, mid, l, r, val);
    update_chmin(2 * node + 1, mid + 1, end, l, r, val);
    merge_nodes(node);
}

static long long query_sum(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree[node].sum;
    push_down(node);
    int mid = (start + end) / 2;
    return query_sum(2 * node, start, mid, l, r) + query_sum(2 * node + 1, mid + 1, end, l, r);
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    for (int i = 1; i <= n; i++) scanf("%d", &arr[i]);
    build(1, 1, n);

    for (int i = 0; i < q; i++) {
        int type;
        if (scanf("%d", &type) != 1) continue;
        if (type == 1) {
            int l, r, x;
            if (scanf("%d %d %d", &l, &r, &x) == 3) {
                update_chmin(1, 1, n, l, r, x);
            }
        } else {
            int l, r;
            if (scanf("%d %d", &l, &r) == 2) {
                printf("%lld\\n", query_sum(1, 1, n, l, r));
            }
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
      tags: ["competitive-programming", "segment-tree", "beats", "chmin"],
      aliases: ["prog_cp_segment_tree_beats", "cpSegmentTreeBeats"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.range-queries.prefix-sums.prog-cp-sparse-table-rmq",
      name: "prog_cp_sparse_table_rmq",
      type: "program",
      category: "competitive-programming",
      subcategory: "prefix-sums",
      categoryId: "competitive-programming.full-programs.range-queries.prefix-sums",
      path: "competitive-programming/full-programs/range-queries/prefix-sums/prog-cp-sparse-table-rmq",
      description: "Static Range Minimum Query Sparse Table answering static range queries in O(1)",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAXN 100005
#define LOGN 18

static int st[MAXN][LOGN];
static int log_table[MAXN];

static int min_val(int a, int b) {
    return (a < b) ? a : b;
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    for (int i = 0; i < n; i++) {
        scanf("%d", &st[i][0]);
    }

    log_table[1] = 0;
    for (int i = 2; i <= n; i++) {
        log_table[i] = log_table[i / 2] + 1;
    }

    for (int j = 1; j < LOGN; j++) {
        for (int i = 0; i + (1 << j) <= n; i++) {
            st[i][j] = min_val(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
        }
    }

    for (int k = 0; k < q; k++) {
        int l, r;
        if (scanf("%d %d", &l, &r) == 2) {
            int j = log_table[r - l + 1];
            int ans = min_val(st[l][j], st[r - (1 << j) + 1][j]);
            printf("%d%c", ans, (k == q - 1 ? '\\n' : ' '));
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
      tags: ["competitive-programming", "sparse-table", "rmq", "range-queries"],
      aliases: ["prog_cp_sparse_table_rmq", "cpSparseTableRmq"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-monotonic-queue-dp",
      name: "prog_cp_monotonic_queue_dp",
      type: "program",
      category: "competitive-programming",
      subcategory: "monotonic-structures",
      categoryId: "competitive-programming.full-programs.cp-data-structures.monotonic-structures",
      path: "competitive-programming/full-programs/cp-data-structures/monotonic-structures/prog-cp-monotonic-queue-dp",
      description: "Linear-time dynamic programming optimization using a monotonic minimum queue",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define INF 1000000000000000LL

static void solve(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return;

    long long* cost = (long long*)malloc((n + 1) * sizeof(long long));
    for (int i = 1; i <= n; i++) scanf("%lld", &cost[i]);

    long long* dp = (long long*)malloc((n + 1) * sizeof(long long));
    int* dq = (int*)malloc((n + 1) * sizeof(int));
    int head = 0, tail = 0;

    dp[0] = 0;
    dq[tail++] = 0;

    for (int i = 1; i <= n; i++) {
        while (head < tail && dq[head] < i - k) {
            head++;
        }
        dp[i] = dp[dq[head]] + cost[i];

        while (head < tail && dp[dq[tail - 1]] >= dp[i]) {
            tail--;
        }
        dq[tail++] = i;
    }

    printf("%lld\\n", dp[n]);

    free(cost);
    free(dp);
    free(dq);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "monotonic-queue", "dp-optimization", "sliding-window"],
      aliases: ["prog_cp_monotonic_queue_dp", "cpMonotonicQueueDp"],
    })
  );

  return components;
}
