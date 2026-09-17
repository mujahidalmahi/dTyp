import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateDetectionComponents(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "detection.error-integrity.parity-even",
      name: "detect_parity_even",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/parity-even",
      description: "Detects if byte has even parity",
      signature: "int detect_parity_even(unsigned char byte);",
      code: "int detect_parity_even(unsigned char byte) {\n    int count = 0;\n    while (byte) {\n        count += (byte & 1);\n        byte >>= 1;\n    }\n    return (count % 2 == 0);\n}",
      tags: ["detection","parity","even","integrity"],
      aliases: ["detect_parity_even","parity_even"],
    })
  );

  components.push(
    createComponent({
      id: "detection.error-integrity.parity-odd",
      name: "detect_parity_odd",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/parity-odd",
      description: "Detects if byte has odd parity",
      signature: "int detect_parity_odd(unsigned char byte);",
      code: "int detect_parity_odd(unsigned char byte) {\n    int count = 0;\n    while (byte) {\n        count += (byte & 1);\n        byte >>= 1;\n    }\n    return (count % 2 != 0);\n}",
      tags: ["detection","parity","odd","integrity"],
      aliases: ["detect_parity_odd","parity_odd"],
    })
  );

  components.push(
    createComponent({
      id: "detection.error-integrity.crc8",
      name: "detect_crc8",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/crc8",
      description: "Calculates CRC-8 and verifies against expected checksum",
      signature: "int detect_crc8(const unsigned char* data, int len, unsigned char expected);",
      code: "int detect_crc8(const unsigned char* data, int len, unsigned char expected) {\n    unsigned char crc = 0x00;\n    for (int i = 0; i < len; i++) {\n        crc ^= data[i];\n        for (int j = 0; j < 8; j++) {\n            if (crc & 0x80) {\n                crc = (crc << 1) ^ 0x07;\n            } else {\n                crc <<= 1;\n            }\n        }\n    }\n    return (crc == expected);\n}",
      tags: ["detection","crc","crc8","checksum"],
      aliases: ["detect_crc8","verify_crc8"],
    })
  );

  components.push(
    createComponent({
      id: "detection.error-integrity.crc16",
      name: "detect_crc16",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/crc16",
      description: "Calculates CRC-16-CCITT and verifies against expected checksum",
      signature: "int detect_crc16(const unsigned char* data, int len, unsigned short expected);",
      code: "int detect_crc16(const unsigned char* data, int len, unsigned short expected) {\n    unsigned short crc = 0xFFFF;\n    for (int i = 0; i < len; i++) {\n        crc ^= (unsigned short)(data[i] << 8);\n        for (int j = 0; j < 8; j++) {\n            if (crc & 0x8000) {\n                crc = (crc << 1) ^ 0x1021;\n            } else {\n                crc <<= 1;\n            }\n        }\n    }\n    return (crc == expected);\n}",
      tags: ["detection","crc","crc16","checksum"],
      aliases: ["detect_crc16","verify_crc16"],
    })
  );

  components.push(
    createComponent({
      id: "detection.error-integrity.crc32",
      name: "detect_crc32",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/crc32",
      description: "Calculates IEEE 802.3 CRC-32 and verifies against expected checksum",
      signature: "int detect_crc32(const unsigned char* data, int len, unsigned int expected);",
      code: "int detect_crc32(const unsigned char* data, int len, unsigned int expected) {\n    unsigned int crc = 0xFFFFFFFF;\n    for (int i = 0; i < len; i++) {\n        crc ^= data[i];\n        for (int j = 0; j < 8; j++) {\n            if (crc & 1) {\n                crc = (crc >> 1) ^ 0xEDB88320;\n            } else {\n                crc >>= 1;\n            }\n        }\n    }\n    return ((crc ^ 0xFFFFFFFF) == expected);\n}",
      tags: ["detection","crc","crc32","checksum"],
      aliases: ["detect_crc32","verify_crc32"],
    })
  );

  components.push(
    createComponent({
      id: "detection.error-integrity.checksum-internet",
      name: "detect_checksum_internet",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/checksum-internet",
      description: "RFC 1071 16-bit one's complement Internet checksum validation",
      signature: "int detect_checksum_internet(const unsigned short* buf, int count);",
      code: "int detect_checksum_internet(const unsigned short* buf, int count) {\n    unsigned long sum = 0;\n    while (count > 1) {\n        sum += *buf++;\n        count -= 2;\n    }\n    if (count > 0) {\n        sum += *(const unsigned char*)buf;\n    }\n    while (sum >> 16) {\n        sum = (sum & 0xFFFF) + (sum >> 16);\n    }\n    return ((unsigned short)(~sum) == 0);\n}",
      tags: ["detection","checksum","internet","rfc1071"],
      aliases: ["detect_checksum_internet","verify_ip_checksum"],
    })
  );

  components.push(
    createComponent({
      id: "detection.error-integrity.adler32",
      name: "detect_adler32",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/adler32",
      description: "Verifies data buffer against expected Adler-32 rolling checksum",
      signature: "int detect_adler32(const unsigned char* data, int len, unsigned int expected);",
      code: "int detect_adler32(const unsigned char* data, int len, unsigned int expected) {\n    unsigned int a = 1, b = 0;\n    for (int i = 0; i < len; i++) {\n        a = (a + data[i]) % 65521;\n        b = (b + a) % 65521;\n    }\n    return (((b << 16) | a) == expected);\n}",
      tags: ["detection","adler32","checksum","rolling"],
      aliases: ["detect_adler32","verify_adler32"],
    })
  );

  components.push(
    createComponent({
      id: "detection.error-integrity.fletcher16",
      name: "detect_fletcher16",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/fletcher16",
      description: "Verifies buffer against expected Fletcher-16 modular checksum",
      signature: "int detect_fletcher16(const unsigned char* data, int len, unsigned short expected);",
      code: "int detect_fletcher16(const unsigned char* data, int len, unsigned short expected) {\n    unsigned short sum1 = 0, sum2 = 0;\n    for (int i = 0; i < len; i++) {\n        sum1 = (sum1 + data[i]) % 255;\n        sum2 = (sum2 + sum1) % 255;\n    }\n    return (((sum2 << 8) | sum1) == expected);\n}",
      tags: ["detection","fletcher16","checksum"],
      aliases: ["detect_fletcher16","verify_fletcher16"],
    })
  );

  components.push(
    createComponent({
      id: "detection.error-integrity.hamming-single-error",
      name: "detect_hamming_single_error",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/hamming-single-error",
      description: "Detects single-bit error and computes bit syndrome position in (7,4) Hamming code",
      signature: "int detect_hamming_single_error(unsigned int codeword, int* error_pos);",
      code: "int detect_hamming_single_error(unsigned int codeword, int* error_pos) {\n    unsigned int p1 = 0, p2 = 0, p4 = 0;\n    for (int i = 1; i <= 7; i++) {\n        unsigned int bit = (codeword >> (7 - i)) & 1;\n        if (i & 1) p1 ^= bit;\n        if (i & 2) p2 ^= bit;\n        if (i & 4) p4 ^= bit;\n    }\n    int syndrome = (p4 << 2) | (p2 << 1) | p1;\n    if (error_pos) *error_pos = syndrome;\n    return (syndrome != 0);\n}",
      tags: ["detection","hamming","syndrome","bit-error"],
      aliases: ["detect_hamming_single_error","hamming_error"],
    })
  );

  components.push(
    createComponent({
      id: "detection.error-integrity.luhn-checksum",
      name: "detect_luhn_checksum",
      type: "function",
      category: "detection",
      subcategory: "error-integrity",
      categoryId: "detection.error-integrity",
      path: "detection/error-integrity/luhn-checksum",
      description: "Validates identification number string using Luhn mod-10 formula",
      signature: "int detect_luhn_checksum(const char* num_str);",
      code: "int detect_luhn_checksum(const char* num_str) {\n    int len = 0;\n    while (num_str[len] != '\\0') len++;\n    int sum = 0, alternate = 0;\n    for (int i = len - 1; i >= 0; i--) {\n        if (num_str[i] < '0' || num_str[i] > '9') continue;\n        int d = num_str[i] - '0';\n        if (alternate) {\n            d *= 2;\n            if (d > 9) d -= 9;\n        }\n        sum += d;\n        alternate = !alternate;\n    }\n    return (sum % 10 == 0);\n}",
      tags: ["detection","luhn","checksum","credit-card"],
      aliases: ["detect_luhn_checksum","luhn_validate"],
    })
  );

  components.push(
    createComponent({
      id: "detection.cycles-loops.cycle-floyd",
      name: "detect_linked_list_cycle_floyd",
      type: "function",
      category: "detection",
      subcategory: "cycles-loops",
      categoryId: "detection.cycles-loops",
      path: "detection/cycles-loops/cycle-floyd",
      description: "Detects loop in singly linked list using Floyd tortoise and hare algorithm",
      signature: "int detect_linked_list_cycle_floyd(const struct DetectNode* head);",
      code: "typedef struct DetectNode {\n    int data;\n    struct DetectNode* next;\n} DetectNode;\n\nint detect_linked_list_cycle_floyd(const DetectNode* head) {\n    if (!head || !head->next) return 0;\n    const DetectNode* slow = head;\n    const DetectNode* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return 1;\n    }\n    return 0;\n}",
      tags: ["detection","cycle","linked-list","floyd"],
      aliases: ["detect_linked_list_cycle_floyd","has_cycle_floyd"],
    })
  );

  components.push(
    createComponent({
      id: "detection.cycles-loops.cycle-brent",
      name: "detect_linked_list_cycle_brent",
      type: "function",
      category: "detection",
      subcategory: "cycles-loops",
      categoryId: "detection.cycles-loops",
      path: "detection/cycles-loops/cycle-brent",
      description: "Detects loop in singly linked list using Brent teleporting pointer algorithm",
      signature: "int detect_linked_list_cycle_brent(const struct DetectNode* head);",
      code: "typedef struct DetectNode {\n    int data;\n    struct DetectNode* next;\n} DetectNode;\n\nint detect_linked_list_cycle_brent(const DetectNode* head) {\n    if (!head) return 0;\n    const DetectNode* slow = head;\n    const DetectNode* fast = head->next;\n    int power = 1, len = 1;\n    while (fast) {\n        if (slow == fast) return 1;\n        if (power == len) {\n            slow = fast;\n            power *= 2;\n            len = 0;\n        }\n        fast = fast->next;\n        len++;\n    }\n    return 0;\n}",
      tags: ["detection","cycle","linked-list","brent"],
      aliases: ["detect_linked_list_cycle_brent","has_cycle_brent"],
    })
  );

  components.push(
    createComponent({
      id: "detection.cycles-loops.cycle-directed-dfs",
      name: "detect_graph_cycle_directed_dfs",
      type: "function",
      category: "detection",
      subcategory: "cycles-loops",
      categoryId: "detection.cycles-loops",
      path: "detection/cycles-loops/cycle-directed-dfs",
      description: "Detects cycle in directed graph using DFS with recursion stack tracking",
      signature: "int detect_graph_cycle_directed_dfs(int n, const int adj[64][64]);",
      code: "static int dfs_dir_cycle(int u, int n, const int adj[64][64], int vis[64], int rec[64]) {\n    vis[u] = 1;\n    rec[u] = 1;\n    for (int v = 0; v < n; v++) {\n        if (adj[u][v]) {\n            if (!vis[v] && dfs_dir_cycle(v, n, adj, vis, rec)) return 1;\n            else if (rec[v]) return 1;\n        }\n    }\n    rec[u] = 0;\n    return 0;\n}\n\nint detect_graph_cycle_directed_dfs(int n, const int adj[64][64]) {\n    int vis[64] = {0};\n    int rec[64] = {0};\n    for (int i = 0; i < n; i++) {\n        if (!vis[i]) {\n            if (dfs_dir_cycle(i, n, adj, vis, rec)) return 1;\n        }\n    }\n    return 0;\n}",
      tags: ["detection","graph","cycle","dfs","directed"],
      aliases: ["detect_graph_cycle_directed_dfs","directed_has_cycle"],
    })
  );

  components.push(
    createComponent({
      id: "detection.cycles-loops.cycle-directed-kahn",
      name: "detect_graph_cycle_directed_kahn",
      type: "function",
      category: "detection",
      subcategory: "cycles-loops",
      categoryId: "detection.cycles-loops",
      path: "detection/cycles-loops/cycle-directed-kahn",
      description: "Detects cycle in directed graph using Kahn topological sorting in-degree elimination",
      signature: "int detect_graph_cycle_directed_kahn(int n, const int adj[64][64]);",
      code: "int detect_graph_cycle_directed_kahn(int n, const int adj[64][64]) {\n    int in_degree[64] = {0};\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            if (adj[i][j]) in_degree[j]++;\n        }\n    }\n    int queue[64], front = 0, rear = 0;\n    for (int i = 0; i < n; i++) {\n        if (in_degree[i] == 0) queue[rear++] = i;\n    }\n    int visited_count = 0;\n    while (front < rear) {\n        int u = queue[front++];\n        visited_count++;\n        for (int v = 0; v < n; v++) {\n            if (adj[u][v]) {\n                in_degree[v]--;\n                if (in_degree[v] == 0) queue[rear++] = v;\n            }\n        }\n    }\n    return (visited_count != n);\n}",
      tags: ["detection","graph","cycle","kahn","topological"],
      aliases: ["detect_graph_cycle_directed_kahn","kahn_cycle_detect"],
    })
  );

  components.push(
    createComponent({
      id: "detection.cycles-loops.cycle-undirected-dfs",
      name: "detect_graph_cycle_undirected_dfs",
      type: "function",
      category: "detection",
      subcategory: "cycles-loops",
      categoryId: "detection.cycles-loops",
      path: "detection/cycles-loops/cycle-undirected-dfs",
      description: "Detects cycle in undirected graph using DFS with parent node tracking",
      signature: "int detect_graph_cycle_undirected_dfs(int n, const int adj[64][64]);",
      code: "static int dfs_undir_cycle(int u, int p, int n, const int adj[64][64], int vis[64]) {\n    vis[u] = 1;\n    for (int v = 0; v < n; v++) {\n        if (adj[u][v]) {\n            if (!vis[v]) {\n                if (dfs_undir_cycle(v, u, n, adj, vis)) return 1;\n            } else if (v != p) {\n                return 1;\n            }\n        }\n    }\n    return 0;\n}\n\nint detect_graph_cycle_undirected_dfs(int n, const int adj[64][64]) {\n    int vis[64] = {0};\n    for (int i = 0; i < n; i++) {\n        if (!vis[i]) {\n            if (dfs_undir_cycle(i, -1, n, adj, vis)) return 1;\n        }\n    }\n    return 0;\n}",
      tags: ["detection","graph","cycle","dfs","undirected"],
      aliases: ["detect_graph_cycle_undirected_dfs","undirected_has_cycle"],
    })
  );

  components.push(
    createComponent({
      id: "detection.cycles-loops.cycle-disjoint-set",
      name: "detect_graph_cycle_disjoint_set",
      type: "function",
      category: "detection",
      subcategory: "cycles-loops",
      categoryId: "detection.cycles-loops",
      path: "detection/cycles-loops/cycle-disjoint-set",
      description: "Detects cycle in undirected edge list using Union-Find disjoint set data structure",
      signature: "int detect_graph_cycle_disjoint_set(int n, const int edges[][2], int edge_count);",
      code: "static int find_ds_root(int parent[], int i) {\n    if (parent[i] == -1) return i;\n    return parent[i] = find_ds_root(parent, parent[i]);\n}\n\nint detect_graph_cycle_disjoint_set(int n, const int edges[][2], int edge_count) {\n    int parent[64];\n    for (int i = 0; i < n; i++) parent[i] = -1;\n    for (int i = 0; i < edge_count; i++) {\n        int x = find_ds_root(parent, edges[i][0]);\n        int y = find_ds_root(parent, edges[i][1]);\n        if (x == y) return 1;\n        parent[x] = y;\n    }\n    return 0;\n}",
      tags: ["detection","graph","cycle","union-find","disjoint-set"],
      aliases: ["detect_graph_cycle_disjoint_set","union_find_cycle"],
    })
  );

  components.push(
    createComponent({
      id: "detection.cycles-loops.deadlock-rag",
      name: "detect_deadlock_rag",
      type: "function",
      category: "detection",
      subcategory: "cycles-loops",
      categoryId: "detection.cycles-loops",
      path: "detection/cycles-loops/deadlock-rag",
      description: "Detects system deadlock condition in Resource Allocation Graph using Banker-style reduction",
      signature: "int detect_deadlock_rag(int p, int r, const int alloc[16][16], const int req[16][16], const int avail[16]);",
      code: "int detect_deadlock_rag(int p, int r, const int alloc[16][16], const int req[16][16], const int avail[16]) {\n    int work[16];\n    int finish[16] = {0};\n    for (int j = 0; j < r; j++) work[j] = avail[j];\n    int count = 0;\n    while (count < p) {\n        int found = 0;\n        for (int i = 0; i < p; i++) {\n            if (!finish[i]) {\n                int can_proceed = 1;\n                for (int j = 0; j < r; j++) {\n                    if (req[i][j] > work[j]) { can_proceed = 0; break; }\n                }\n                if (can_proceed) {\n                    for (int j = 0; j < r; j++) work[j] += alloc[i][j];\n                    finish[i] = 1;\n                    found = 1;\n                    count++;\n                }\n            }\n        }\n        if (!found) break;\n    }\n    return (count < p);\n}",
      tags: ["detection","deadlock","rag","resources","concurrency"],
      aliases: ["detect_deadlock_rag","detect_deadlock"],
    })
  );

  components.push(
    createComponent({
      id: "detection.graph-structural.bipartite-graph",
      name: "detect_bipartite_graph",
      type: "function",
      category: "detection",
      subcategory: "graph-structural",
      categoryId: "detection.graph-structural",
      path: "detection/graph-structural/bipartite-graph",
      description: "Detects if graph is bipartite (2-colorable) using BFS vertex queue",
      signature: "int detect_bipartite_graph(int n, const int adj[64][64]);",
      code: "int detect_bipartite_graph(int n, const int adj[64][64]) {\n    int color[64];\n    for (int i = 0; i < n; i++) color[i] = -1;\n    for (int start = 0; start < n; start++) {\n        if (color[start] == -1) {\n            int queue[64], front = 0, rear = 0;\n            queue[rear++] = start;\n            color[start] = 0;\n            while (front < rear) {\n                int u = queue[front++];\n                for (int v = 0; v < n; v++) {\n                    if (adj[u][v]) {\n                        if (color[v] == -1) {\n                            color[v] = 1 - color[u];\n                            queue[rear++] = v;\n                        } else if (color[v] == color[u]) {\n                            return 0;\n                        }\n                    }\n                }\n            }\n        }\n    }\n    return 1;\n}",
      tags: ["detection","graph","bipartite","2-colorable"],
      aliases: ["detect_bipartite_graph","is_bipartite"],
    })
  );

  components.push(
    createComponent({
      id: "detection.graph-structural.eulerian-circuit",
      name: "detect_eulerian_circuit",
      type: "function",
      category: "detection",
      subcategory: "graph-structural",
      categoryId: "detection.graph-structural",
      path: "detection/graph-structural/eulerian-circuit",
      description: "Detects if connected undirected graph has an Eulerian circuit via even degree parity",
      signature: "int detect_eulerian_circuit(int n, const int adj[64][64]);",
      code: "int detect_eulerian_circuit(int n, const int adj[64][64]) {\n    for (int i = 0; i < n; i++) {\n        int degree = 0;\n        for (int j = 0; j < n; j++) {\n            if (adj[i][j]) degree++;\n        }\n        if (degree % 2 != 0) return 0;\n    }\n    return 1;\n}",
      tags: ["detection","graph","eulerian","circuit"],
      aliases: ["detect_eulerian_circuit","is_eulerian_circuit"],
    })
  );

  components.push(
    createComponent({
      id: "detection.graph-structural.eulerian-path",
      name: "detect_eulerian_path",
      type: "function",
      category: "detection",
      subcategory: "graph-structural",
      categoryId: "detection.graph-structural",
      path: "detection/graph-structural/eulerian-path",
      description: "Detects if connected undirected graph has an Eulerian path via odd degree count",
      signature: "int detect_eulerian_path(int n, const int adj[64][64]);",
      code: "int detect_eulerian_path(int n, const int adj[64][64]) {\n    int odd_degrees = 0;\n    for (int i = 0; i < n; i++) {\n        int degree = 0;\n        for (int j = 0; j < n; j++) {\n            if (adj[i][j]) degree++;\n        }\n        if (degree % 2 != 0) odd_degrees++;\n    }\n    return (odd_degrees == 0 || odd_degrees == 2);\n}",
      tags: ["detection","graph","eulerian","path"],
      aliases: ["detect_eulerian_path","is_eulerian_path"],
    })
  );

  components.push(
    createComponent({
      id: "detection.graph-structural.bridge-edges",
      name: "detect_bridge_edges",
      type: "function",
      category: "detection",
      subcategory: "graph-structural",
      categoryId: "detection.graph-structural",
      path: "detection/graph-structural/bridge-edges",
      description: "Counts critical bridge edges in connected graph using Tarjan DFS discovery and low-links",
      signature: "int detect_bridge_edges(int n, const int adj[64][64]);",
      code: "static void bridge_dfs(int u, int p, int n, const int adj[64][64], int disc[64], int low[64], int* time_step, int* count) {\n    disc[u] = low[u] = ++(*time_step);\n    for (int v = 0; v < n; v++) {\n        if (adj[u][v]) {\n            if (v == p) continue;\n            if (disc[v]) {\n                if (disc[v] < low[u]) low[u] = disc[v];\n            } else {\n                bridge_dfs(v, u, n, adj, disc, low, time_step, count);\n                if (low[v] < low[u]) low[u] = low[v];\n                if (low[v] > disc[u]) (*count)++;\n            }\n        }\n    }\n}\n\nint detect_bridge_edges(int n, const int adj[64][64]) {\n    int disc[64] = {0}, low[64] = {0}, time_step = 0, count = 0;\n    for (int i = 0; i < n; i++) {\n        if (!disc[i]) bridge_dfs(i, -1, n, adj, disc, low, &time_step, &count);\n    }\n    return count;\n}",
      tags: ["detection","graph","bridges","tarjan","cut-edge"],
      aliases: ["detect_bridge_edges","count_bridges"],
    })
  );

  components.push(
    createComponent({
      id: "detection.graph-structural.articulation-points",
      name: "detect_articulation_points",
      type: "function",
      category: "detection",
      subcategory: "graph-structural",
      categoryId: "detection.graph-structural",
      path: "detection/graph-structural/articulation-points",
      description: "Counts cut-vertices (articulation points) in connected graph using DFS discovery trees",
      signature: "int detect_articulation_points(int n, const int adj[64][64]);",
      code: "static void ap_dfs(int u, int p, int n, const int adj[64][64], int disc[64], int low[64], int is_ap[64], int* time_step) {\n    disc[u] = low[u] = ++(*time_step);\n    int children = 0;\n    for (int v = 0; v < n; v++) {\n        if (adj[u][v]) {\n            if (v == p) continue;\n            if (disc[v]) {\n                if (disc[v] < low[u]) low[u] = disc[v];\n            } else {\n                children++;\n                ap_dfs(v, u, n, adj, disc, low, is_ap, time_step);\n                if (low[v] < low[u]) low[u] = low[v];\n                if (p != -1 && low[v] >= disc[u]) is_ap[u] = 1;\n            }\n        }\n    }\n    if (p == -1 && children > 1) is_ap[u] = 1;\n}\n\nint detect_articulation_points(int n, const int adj[64][64]) {\n    int disc[64] = {0}, low[64] = {0}, is_ap[64] = {0}, time_step = 0;\n    for (int i = 0; i < n; i++) {\n        if (!disc[i]) ap_dfs(i, -1, n, adj, disc, low, is_ap, &time_step);\n    }\n    int total = 0;\n    for (int i = 0; i < n; i++) {\n        if (is_ap[i]) total++;\n    }\n    return total;\n}",
      tags: ["detection","graph","articulation-points","cut-vertex"],
      aliases: ["detect_articulation_points","count_articulation_points"],
    })
  );

  components.push(
    createComponent({
      id: "detection.graph-structural.connected-components",
      name: "detect_connected_components",
      type: "function",
      category: "detection",
      subcategory: "graph-structural",
      categoryId: "detection.graph-structural",
      path: "detection/graph-structural/connected-components",
      description: "Counts total connected components in undirected graph via DFS flood scan",
      signature: "int detect_connected_components(int n, const int adj[64][64]);",
      code: "static void cc_dfs(int u, int n, const int adj[64][64], int visited[64]) {\n    visited[u] = 1;\n    for (int v = 0; v < n; v++) {\n        if (adj[u][v] && !visited[v]) cc_dfs(v, n, adj, visited);\n    }\n}\n\nint detect_connected_components(int n, const int adj[64][64]) {\n    int visited[64] = {0}, count = 0;\n    for (int i = 0; i < n; i++) {\n        if (!visited[i]) {\n            count++;\n            cc_dfs(i, n, adj, visited);\n        }\n    }\n    return count;\n}",
      tags: ["detection","graph","connected-components","cluster"],
      aliases: ["detect_connected_components","count_components"],
    })
  );

  components.push(
    createComponent({
      id: "detection.graph-structural.dag-property",
      name: "detect_dag_property",
      type: "function",
      category: "detection",
      subcategory: "graph-structural",
      categoryId: "detection.graph-structural",
      path: "detection/graph-structural/dag-property",
      description: "Validates if directed graph satisfies Directed Acyclic Graph (DAG) property",
      signature: "int detect_dag_property(int n, const int adj[64][64]);",
      code: "int detect_dag_property(int n, const int adj[64][64]) {\n    int in_degree[64] = {0};\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            if (adj[i][j]) in_degree[j]++;\n        }\n    }\n    int queue[64], front = 0, rear = 0;\n    for (int i = 0; i < n; i++) {\n        if (in_degree[i] == 0) queue[rear++] = i;\n    }\n    int visited = 0;\n    while (front < rear) {\n        int u = queue[front++];\n        visited++;\n        for (int v = 0; v < n; v++) {\n            if (adj[u][v]) {\n                in_degree[v]--;\n                if (in_degree[v] == 0) queue[rear++] = v;\n            }\n        }\n    }\n    return (visited == n);\n}",
      tags: ["detection","graph","dag","acyclic"],
      aliases: ["detect_dag_property","is_dag"],
    })
  );

  components.push(
    createComponent({
      id: "detection.patterns-strings.palindrome",
      name: "detect_palindrome",
      type: "function",
      category: "detection",
      subcategory: "patterns-strings",
      categoryId: "detection.patterns-strings",
      path: "detection/patterns-strings/palindrome",
      description: "Detects if null-terminated string is a palindrome using two-pointer mirror traversal",
      signature: "int detect_palindrome(const char* s);",
      code: "int detect_palindrome(const char* s) {\n    int len = 0;\n    while (s[len] != '\\0') len++;\n    int left = 0, right = len - 1;\n    while (left < right) {\n        if (s[left] != s[right]) return 0;\n        left++;\n        right--;\n    }\n    return 1;\n}",
      tags: ["detection","palindrome","string","two-pointers"],
      aliases: ["detect_palindrome","is_palindrome"],
    })
  );

  components.push(
    createComponent({
      id: "detection.patterns-strings.anagram",
      name: "detect_anagram",
      type: "function",
      category: "detection",
      subcategory: "patterns-strings",
      categoryId: "detection.patterns-strings",
      path: "detection/patterns-strings/anagram",
      description: "Detects if two strings are anagrams using character frequency histogram",
      signature: "int detect_anagram(const char* s1, const char* s2);",
      code: "int detect_anagram(const char* s1, const char* s2) {\n    int count[256] = {0};\n    int i = 0;\n    while (s1[i] != '\\0') { count[(unsigned char)s1[i]]++; i++; }\n    int j = 0;\n    while (s2[j] != '\\0') { count[(unsigned char)s2[j]]--; j++; }\n    if (i != j) return 0;\n    for (int k = 0; k < 256; k++) {\n        if (count[k] != 0) return 0;\n    }\n    return 1;\n}",
      tags: ["detection","anagram","string","frequency"],
      aliases: ["detect_anagram","is_anagram"],
    })
  );

  components.push(
    createComponent({
      id: "detection.patterns-strings.pangram",
      name: "detect_pangram",
      type: "function",
      category: "detection",
      subcategory: "patterns-strings",
      categoryId: "detection.patterns-strings",
      path: "detection/patterns-strings/pangram",
      description: "Detects if string contains all 26 English letters using bitmask accumulator",
      signature: "int detect_pangram(const char* s);",
      code: "int detect_pangram(const char* s) {\n    int mask = 0;\n    for (int i = 0; s[i] != '\\0'; i++) {\n        char c = s[i];\n        if (c >= 'A' && c <= 'Z') mask |= (1 << (c - 'A'));\n        else if (c >= 'a' && c <= 'z') mask |= (1 << (c - 'a'));\n    }\n    return (mask == 0x3FFFFFF);\n}",
      tags: ["detection","pangram","string","bitmask"],
      aliases: ["detect_pangram","is_pangram"],
    })
  );

  components.push(
    createComponent({
      id: "detection.patterns-strings.isogram",
      name: "detect_isogram",
      type: "function",
      category: "detection",
      subcategory: "patterns-strings",
      categoryId: "detection.patterns-strings",
      path: "detection/patterns-strings/isogram",
      description: "Detects if string has no repeating characters",
      signature: "int detect_isogram(const char* s);",
      code: "int detect_isogram(const char* s) {\n    int seen[256] = {0};\n    for (int i = 0; s[i] != '\\0'; i++) {\n        unsigned char c = (unsigned char)s[i];\n        if (seen[c]) return 0;\n        seen[c] = 1;\n    }\n    return 1;\n}",
      tags: ["detection","isogram","string","unique"],
      aliases: ["detect_isogram","is_isogram"],
    })
  );

  components.push(
    createComponent({
      id: "detection.patterns-strings.subsequence",
      name: "detect_subsequence",
      type: "function",
      category: "detection",
      subcategory: "patterns-strings",
      categoryId: "detection.patterns-strings",
      path: "detection/patterns-strings/subsequence",
      description: "Detects if pattern exists as a subsequence within text string",
      signature: "int detect_subsequence(const char* pattern, const char* text);",
      code: "int detect_subsequence(const char* pattern, const char* text) {\n    int i = 0, j = 0;\n    while (pattern[i] != '\\0' && text[j] != '\\0') {\n        if (pattern[i] == text[j]) i++;\n        j++;\n    }\n    return (pattern[i] == '\\0');\n}",
      tags: ["detection","subsequence","string","greedy"],
      aliases: ["detect_subsequence","is_subsequence"],
    })
  );

  components.push(
    createComponent({
      id: "detection.patterns-strings.pattern-kmp",
      name: "detect_pattern_kmp",
      type: "function",
      category: "detection",
      subcategory: "patterns-strings",
      categoryId: "detection.patterns-strings",
      path: "detection/patterns-strings/pattern-kmp",
      description: "Finds first matching index of pattern in text using Knuth-Morris-Pratt table",
      signature: "int detect_pattern_kmp(const char* text, const char* pattern);",
      code: "int detect_pattern_kmp(const char* text, const char* pattern) {\n    int m = 0;\n    while (pattern[m] != '\\0') m++;\n    if (m == 0) return 0;\n    int lps[128] = {0};\n    int len = 0, i = 1;\n    while (i < m) {\n        if (pattern[i] == pattern[len]) {\n            len++;\n            lps[i] = len;\n            i++;\n        } else {\n            if (len != 0) len = lps[len - 1];\n            else { lps[i] = 0; i++; }\n        }\n    }\n    int t_idx = 0, p_idx = 0;\n    while (text[t_idx] != '\\0') {\n        if (pattern[p_idx] == text[t_idx]) {\n            p_idx++;\n            t_idx++;\n        }\n        if (p_idx == m) return (t_idx - p_idx);\n        else if (text[t_idx] != '\\0' && pattern[p_idx] != text[t_idx]) {\n            if (p_idx != 0) p_idx = lps[p_idx - 1];\n            else t_idx++;\n        }\n    }\n    return -1;\n}",
      tags: ["detection","pattern-match","kmp","string"],
      aliases: ["detect_pattern_kmp","kmp_find"],
    })
  );

  components.push(
    createComponent({
      id: "detection.patterns-strings.pattern-rabin-karp",
      name: "detect_pattern_rabin_karp",
      type: "function",
      category: "detection",
      subcategory: "patterns-strings",
      categoryId: "detection.patterns-strings",
      path: "detection/patterns-strings/pattern-rabin-karp",
      description: "Finds first matching index of pattern in text using Rabin-Karp rolling hash",
      signature: "int detect_pattern_rabin_karp(const char* text, const char* pattern);",
      code: "int detect_pattern_rabin_karp(const char* text, const char* pattern) {\n    int m = 0, n = 0;\n    while (pattern[m] != '\\0') m++;\n    while (text[n] != '\\0') n++;\n    if (m == 0) return 0;\n    if (m > n) return -1;\n    const int d = 256, q = 101;\n    int p_hash = 0, t_hash = 0, h = 1;\n    for (int i = 0; i < m - 1; i++) h = (h * d) % q;\n    for (int i = 0; i < m; i++) {\n        p_hash = (d * p_hash + pattern[i]) % q;\n        t_hash = (d * t_hash + text[i]) % q;\n    }\n    for (int i = 0; i <= n - m; i++) {\n        if (p_hash == t_hash) {\n            int match = 1;\n            for (int j = 0; j < m; j++) {\n                if (text[i + j] != pattern[j]) { match = 0; break; }\n            }\n            if (match) return i;\n        }\n        if (i < n - m) {\n            t_hash = (d * (t_hash - text[i] * h) + text[i + m]) % q;\n            if (t_hash < 0) t_hash += q;\n        }\n    }\n    return -1;\n}",
      tags: ["detection","pattern-match","rabin-karp","hash"],
      aliases: ["detect_pattern_rabin_karp","rabin_karp_find"],
    })
  );

  components.push(
    createComponent({
      id: "detection.patterns-strings.balanced-parentheses",
      name: "detect_balanced_parentheses",
      type: "function",
      category: "detection",
      subcategory: "patterns-strings",
      categoryId: "detection.patterns-strings",
      path: "detection/patterns-strings/balanced-parentheses",
      description: "Detects if parentheses, brackets, and braces are correctly balanced and closed",
      signature: "int detect_balanced_parentheses(const char* s);",
      code: "int detect_balanced_parentheses(const char* s) {\n    char stack[256];\n    int top = -1;\n    for (int i = 0; s[i] != '\\0'; i++) {\n        char c = s[i];\n        if (c == '(' || c == '{' || c == '[') {\n            if (top >= 255) return 0;\n            stack[++top] = c;\n        } else if (c == ')' || c == '}' || c == ']') {\n            if (top < 0) return 0;\n            char o = stack[top--];\n            if (c == ')' && o != '(') return 0;\n            if (c == '}' && o != '{') return 0;\n            if (c == ']' && o != '[') return 0;\n        }\n    }\n    return (top == -1);\n}",
      tags: ["detection","parentheses","balanced","stack"],
      aliases: ["detect_balanced_parentheses","is_balanced"],
    })
  );

  components.push(
    createComponent({
      id: "detection.patterns-strings.repeated-character",
      name: "detect_repeated_character",
      type: "function",
      category: "detection",
      subcategory: "patterns-strings",
      categoryId: "detection.patterns-strings",
      path: "detection/patterns-strings/repeated-character",
      description: "Detects first repeated character in string returning character or null byte",
      signature: "char detect_repeated_character(const char* s);",
      code: "char detect_repeated_character(const char* s) {\n    int seen[256] = {0};\n    for (int i = 0; s[i] != '\\0'; i++) {\n        unsigned char c = (unsigned char)s[i];\n        if (seen[c]) return (char)c;\n        seen[c] = 1;\n    }\n    return '\\0';\n}",
      tags: ["detection","repeated-char","string","lookup"],
      aliases: ["detect_repeated_character","first_repeated_char"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.prime",
      name: "detect_prime",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/prime",
      description: "Detects if integer is prime using 6k +/- 1 optimized trial division",
      signature: "int detect_prime(int n);",
      code: "int detect_prime(int n) {\n    if (n <= 1) return 0;\n    if (n <= 3) return 1;\n    if (n % 2 == 0 || n % 3 == 0) return 0;\n    for (int i = 5; i * i <= n; i += 6) {\n        if (n % i == 0 || n % (i + 2) == 0) return 0;\n    }\n    return 1;\n}",
      tags: ["detection","prime","number-theory","math"],
      aliases: ["detect_prime","is_prime"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.power-of-two",
      name: "detect_power_of_two",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/power-of-two",
      description: "Detects if unsigned integer is an exact power of two via bitwise trick",
      signature: "int detect_power_of_two(unsigned int n);",
      code: "int detect_power_of_two(unsigned int n) {\n    return (n > 0) && ((n & (n - 1)) == 0);\n}",
      tags: ["detection","power-of-two","bitwise","math"],
      aliases: ["detect_power_of_two","is_power_of_two"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.armstrong-number",
      name: "detect_armstrong_number",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/armstrong-number",
      description: "Detects if integer is an Armstrong (narcissistic) number",
      signature: "int detect_armstrong_number(int n);",
      code: "int detect_armstrong_number(int n) {\n    if (n < 0) return 0;\n    int temp = n, digits = 0;\n    while (temp > 0) { digits++; temp /= 10; }\n    temp = n;\n    int sum = 0;\n    while (temp > 0) {\n        int d = temp % 10;\n        int p = 1;\n        for (int i = 0; i < digits; i++) p *= d;\n        sum += p;\n        temp /= 10;\n    }\n    return (sum == n);\n}",
      tags: ["detection","armstrong","narcissistic","math"],
      aliases: ["detect_armstrong_number","is_armstrong"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.perfect-number",
      name: "detect_perfect_number",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/perfect-number",
      description: "Detects if integer equals the sum of its proper positive divisors",
      signature: "int detect_perfect_number(int n);",
      code: "int detect_perfect_number(int n) {\n    if (n <= 1) return 0;\n    int sum = 1;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) {\n            sum += i;\n            if (i * i != n) sum += (n / i);\n        }\n    }\n    return (sum == n);\n}",
      tags: ["detection","perfect-number","divisors","math"],
      aliases: ["detect_perfect_number","is_perfect_number"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.happy-number",
      name: "detect_happy_number",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/happy-number",
      description: "Detects if integer is a happy number using cycle-detection on digit squares",
      signature: "int detect_happy_number(int n);",
      code: "static int digit_square_sum(int n) {\n    int sum = 0;\n    while (n > 0) {\n        int d = n % 10;\n        sum += d * d;\n        n /= 10;\n    }\n    return sum;\n}\n\nint detect_happy_number(int n) {\n    int slow = n, fast = digit_square_sum(n);\n    while (fast != 1 && slow != fast) {\n        slow = digit_square_sum(slow);\n        fast = digit_square_sum(digit_square_sum(fast));\n    }\n    return (fast == 1);\n}",
      tags: ["detection","happy-number","cycle","math"],
      aliases: ["detect_happy_number","is_happy_number"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.overflow-add",
      name: "detect_overflow_add",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/overflow-add",
      description: "Detects signed 32-bit addition overflow without invoking undefined behavior",
      signature: "int detect_overflow_add(int a, int b, int* result);",
      code: "int detect_overflow_add(int a, int b, int* result) {\n    if ((b > 0 && a > 2147483647 - b) || (b < 0 && a < (-2147483647 - 1) - b)) {\n        return 1;\n    }\n    if (result) *result = a + b;\n    return 0;\n}",
      tags: ["detection","overflow","addition","arithmetic"],
      aliases: ["detect_overflow_add","check_add_overflow"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.overflow-sub",
      name: "detect_overflow_sub",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/overflow-sub",
      description: "Detects signed 32-bit subtraction overflow without invoking undefined behavior",
      signature: "int detect_overflow_sub(int a, int b, int* result);",
      code: "int detect_overflow_sub(int a, int b, int* result) {\n    if ((b < 0 && a > 2147483647 + b) || (b > 0 && a < (-2147483647 - 1) + b)) {\n        return 1;\n    }\n    if (result) *result = a - b;\n    return 0;\n}",
      tags: ["detection","overflow","subtraction","arithmetic"],
      aliases: ["detect_overflow_sub","check_sub_overflow"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.overflow-mul",
      name: "detect_overflow_mul",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/overflow-mul",
      description: "Detects signed 32-bit multiplication overflow without invoking undefined behavior",
      signature: "int detect_overflow_mul(int a, int b, int* result);",
      code: "int detect_overflow_mul(int a, int b, int* result) {\n    if (a > 0 && b > 0 && a > 2147483647 / b) return 1;\n    if (a > 0 && b < 0 && b < (-2147483647 - 1) / a) return 1;\n    if (a < 0 && b > 0 && a < (-2147483647 - 1) / b) return 1;\n    if (a < 0 && b < 0 && b < 2147483647 / a) return 1;\n    if (result) *result = a * b;\n    return 0;\n}",
      tags: ["detection","overflow","multiplication","arithmetic"],
      aliases: ["detect_overflow_mul","check_mul_overflow"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.palindrome-number",
      name: "detect_palindrome_number",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/palindrome-number",
      description: "Detects if integer digits read the same backwards using integer arithmetic",
      signature: "int detect_palindrome_number(int n);",
      code: "int detect_palindrome_number(int n) {\n    if (n < 0) return 0;\n    int original = n;\n    long long rev = 0;\n    while (n > 0) {\n        rev = rev * 10 + (n % 10);\n        n /= 10;\n    }\n    return (rev == (long long)original);\n}",
      tags: ["detection","palindrome","integer","math"],
      aliases: ["detect_palindrome_number","is_numeric_palindrome"],
    })
  );

  components.push(
    createComponent({
      id: "detection.number-properties.float-nan",
      name: "detect_float_nan",
      type: "function",
      category: "detection",
      subcategory: "number-properties",
      categoryId: "detection.number-properties",
      path: "detection/number-properties/float-nan",
      description: "Detects if 32-bit IEEE 754 float is Not-A-Number (NaN) via bit pattern inspection",
      signature: "int detect_float_nan(float val);",
      code: "int detect_float_nan(float val) {\n    union { float f; unsigned int u; } conv;\n    conv.f = val;\n    return ((conv.u & 0x7F800000) == 0x7F800000) && ((conv.u & 0x007FFFFF) != 0);\n}",
      tags: ["detection","float","nan","ieee754"],
      aliases: ["detect_float_nan","is_nan_float"],
    })
  );

  components.push(
    createComponent({
      id: "detection.array-anomalies.array-sorted-ascending",
      name: "detect_array_sorted_ascending",
      type: "function",
      category: "detection",
      subcategory: "array-anomalies",
      categoryId: "detection.array-anomalies",
      path: "detection/array-anomalies/array-sorted-ascending",
      description: "Detects if integer array is sorted in ascending order",
      signature: "int detect_array_sorted_ascending(const int* arr, int n);",
      code: "int detect_array_sorted_ascending(const int* arr, int n) {\n    for (int i = 0; i < n - 1; i++) {\n        if (arr[i] > arr[i + 1]) return 0;\n    }\n    return 1;\n}",
      tags: ["detection","array","sorted","ascending"],
      aliases: ["detect_array_sorted_ascending","is_sorted_asc"],
    })
  );

  components.push(
    createComponent({
      id: "detection.array-anomalies.array-sorted-descending",
      name: "detect_array_sorted_descending",
      type: "function",
      category: "detection",
      subcategory: "array-anomalies",
      categoryId: "detection.array-anomalies",
      path: "detection/array-anomalies/array-sorted-descending",
      description: "Detects if integer array is sorted in descending order",
      signature: "int detect_array_sorted_descending(const int* arr, int n);",
      code: "int detect_array_sorted_descending(const int* arr, int n) {\n    for (int i = 0; i < n - 1; i++) {\n        if (arr[i] < arr[i + 1]) return 0;\n    }\n    return 1;\n}",
      tags: ["detection","array","sorted","descending"],
      aliases: ["detect_array_sorted_descending","is_sorted_desc"],
    })
  );

  components.push(
    createComponent({
      id: "detection.array-anomalies.array-monotonic",
      name: "detect_array_monotonic",
      type: "function",
      category: "detection",
      subcategory: "array-anomalies",
      categoryId: "detection.array-anomalies",
      path: "detection/array-anomalies/array-monotonic",
      description: "Detects if integer array is entirely non-decreasing or entirely non-increasing",
      signature: "int detect_array_monotonic(const int* arr, int n);",
      code: "int detect_array_monotonic(const int* arr, int n) {\n    if (n <= 2) return 1;\n    int inc = 1, dec = 1;\n    for (int i = 0; i < n - 1; i++) {\n        if (arr[i] > arr[i + 1]) inc = 0;\n        if (arr[i] < arr[i + 1]) dec = 0;\n    }\n    return (inc || dec);\n}",
      tags: ["detection","array","monotonic","sequence"],
      aliases: ["detect_array_monotonic","is_monotonic"],
    })
  );

  components.push(
    createComponent({
      id: "detection.array-anomalies.array-duplicate",
      name: "detect_array_duplicate",
      type: "function",
      category: "detection",
      subcategory: "array-anomalies",
      categoryId: "detection.array-anomalies",
      path: "detection/array-anomalies/array-duplicate",
      description: "Detects if integer array contains any duplicate values",
      signature: "int detect_array_duplicate(const int* arr, int n);",
      code: "int detect_array_duplicate(const int* arr, int n) {\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            if (arr[i] == arr[j]) return 1;\n        }\n    }\n    return 0;\n}",
      tags: ["detection","array","duplicates","unique"],
      aliases: ["detect_array_duplicate","has_duplicate"],
    })
  );

  components.push(
    createComponent({
      id: "detection.array-anomalies.array-majority-element",
      name: "detect_array_majority_element",
      type: "function",
      category: "detection",
      subcategory: "array-anomalies",
      categoryId: "detection.array-anomalies",
      path: "detection/array-anomalies/array-majority-element",
      description: "Detects element appearing strictly more than n/2 times via Boyer-Moore voting algorithm",
      signature: "int detect_array_majority_element(const int* arr, int n, int* majority);",
      code: "int detect_array_majority_element(const int* arr, int n, int* majority) {\n    int candidate = 0, count = 0;\n    for (int i = 0; i < n; i++) {\n        if (count == 0) {\n            candidate = arr[i];\n            count = 1;\n        } else if (arr[i] == candidate) {\n            count++;\n        } else {\n            count--;\n        }\n    }\n    int verify = 0;\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == candidate) verify++;\n    }\n    if (verify > n / 2) {\n        if (majority) *majority = candidate;\n        return 1;\n    }\n    return 0;\n}",
      tags: ["detection","array","majority","boyer-moore"],
      aliases: ["detect_array_majority_element","majority_element"],
    })
  );

  components.push(
    createComponent({
      id: "detection.array-anomalies.array-peak-element",
      name: "detect_array_peak_element",
      type: "function",
      category: "detection",
      subcategory: "array-anomalies",
      categoryId: "detection.array-anomalies",
      path: "detection/array-anomalies/array-peak-element",
      description: "Detects index of a peak element not smaller than its neighbors returning -1 on empty",
      signature: "int detect_array_peak_element(const int* arr, int n);",
      code: "int detect_array_peak_element(const int* arr, int n) {\n    if (n <= 0) return -1;\n    if (n == 1) return 0;\n    if (arr[0] >= arr[1]) return 0;\n    for (int i = 1; i < n - 1; i++) {\n        if (arr[i] >= arr[i - 1] && arr[i] >= arr[i + 1]) return i;\n    }\n    if (arr[n - 1] >= arr[n - 2]) return (n - 1);\n    return -1;\n}",
      tags: ["detection","array","peak","local-maxima"],
      aliases: ["detect_array_peak_element","find_peak_element"],
    })
  );

  components.push(
    createComponent({
      id: "detection.array-anomalies.array-missing-number",
      name: "detect_array_missing_number",
      type: "function",
      category: "detection",
      subcategory: "array-anomalies",
      categoryId: "detection.array-anomalies",
      path: "detection/array-anomalies/array-missing-number",
      description: "Detects single missing number from range [0..n] using bitwise XOR cancellation",
      signature: "int detect_array_missing_number(const int* arr, int n);",
      code: "int detect_array_missing_number(const int* arr, int n) {\n    int total_xor = 0;\n    for (int i = 0; i <= n; i++) total_xor ^= i;\n    int arr_xor = 0;\n    for (int i = 0; i < n; i++) arr_xor ^= arr[i];\n    return (total_xor ^ arr_xor);\n}",
      tags: ["detection","array","missing-number","xor"],
      aliases: ["detect_array_missing_number","find_missing_number"],
    })
  );

  components.push(
    createComponent({
      id: "detection.array-anomalies.array-two-sum-target",
      name: "detect_array_two_sum_target",
      type: "function",
      category: "detection",
      subcategory: "array-anomalies",
      categoryId: "detection.array-anomalies",
      path: "detection/array-anomalies/array-two-sum-target",
      description: "Detects if any two array elements sum to target storing their indices",
      signature: "int detect_array_two_sum_target(const int* arr, int n, int target, int* idx1, int* idx2);",
      code: "int detect_array_two_sum_target(const int* arr, int n, int target, int* idx1, int* idx2) {\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            if (arr[i] + arr[j] == target) {\n                if (idx1) *idx1 = i;\n                if (idx2) *idx2 = j;\n                return 1;\n            }\n        }\n    }\n    return 0;\n}",
      tags: ["detection","array","two-sum","target"],
      aliases: ["detect_array_two_sum_target","has_two_sum"],
    })
  );

  components.push(
    createComponent({
      id: "detection.geometry-collisions.aabb-collision-2d",
      name: "detect_aabb_collision_2d",
      type: "function",
      category: "detection",
      subcategory: "geometry-collisions",
      categoryId: "detection.geometry-collisions",
      path: "detection/geometry-collisions/aabb-collision-2d",
      description: "Detects overlap between two 2D Axis-Aligned Bounding Boxes",
      signature: "int detect_aabb_collision_2d(float x1, float y1, float w1, float h1, float x2, float y2, float w2, float h2);",
      code: "int detect_aabb_collision_2d(float x1, float y1, float w1, float h1, float x2, float y2, float w2, float h2) {\n    return (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2);\n}",
      tags: ["detection","geometry","collision","aabb","2d"],
      aliases: ["detect_aabb_collision_2d","aabb_overlap"],
    })
  );

  components.push(
    createComponent({
      id: "detection.geometry-collisions.circle-collision",
      name: "detect_circle_collision",
      type: "function",
      category: "detection",
      subcategory: "geometry-collisions",
      categoryId: "detection.geometry-collisions",
      path: "detection/geometry-collisions/circle-collision",
      description: "Detects collision/overlap between two 2D circles using squared Euclidean distance",
      signature: "int detect_circle_collision(float x1, float y1, float r1, float x2, float y2, float r2);",
      code: "int detect_circle_collision(float x1, float y1, float r1, float x2, float y2, float r2) {\n    float dx = x1 - x2;\n    float dy = y1 - y2;\n    float dist_sq = dx * dx + dy * dy;\n    float rad_sum = r1 + r2;\n    return (dist_sq <= rad_sum * rad_sum);\n}",
      tags: ["detection","geometry","collision","circle"],
      aliases: ["detect_circle_collision","circle_overlap"],
    })
  );

  components.push(
    createComponent({
      id: "detection.geometry-collisions.point-in-circle",
      name: "detect_point_in_circle",
      type: "function",
      category: "detection",
      subcategory: "geometry-collisions",
      categoryId: "detection.geometry-collisions",
      path: "detection/geometry-collisions/point-in-circle",
      description: "Detects if 2D coordinate point lies inside or on circle perimeter",
      signature: "int detect_point_in_circle(float px, float py, float cx, float cy, float r);",
      code: "int detect_point_in_circle(float px, float py, float cx, float cy, float r) {\n    float dx = px - cx;\n    float dy = py - cy;\n    return (dx * dx + dy * dy <= r * r);\n}",
      tags: ["detection","geometry","point-in-circle"],
      aliases: ["detect_point_in_circle","is_point_in_circle"],
    })
  );

  components.push(
    createComponent({
      id: "detection.geometry-collisions.point-in-rect",
      name: "detect_point_in_rect",
      type: "function",
      category: "detection",
      subcategory: "geometry-collisions",
      categoryId: "detection.geometry-collisions",
      path: "detection/geometry-collisions/point-in-rect",
      description: "Detects if 2D coordinate point lies inside axis-aligned rectangle boundary",
      signature: "int detect_point_in_rect(float px, float py, float rx, float ry, float rw, float rh);",
      code: "int detect_point_in_rect(float px, float py, float rx, float ry, float rw, float rh) {\n    return (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh);\n}",
      tags: ["detection","geometry","point-in-rect"],
      aliases: ["detect_point_in_rect","is_point_in_rect"],
    })
  );

  components.push(
    createComponent({
      id: "detection.geometry-collisions.line-segment-intersection",
      name: "detect_line_segment_intersection",
      type: "function",
      category: "detection",
      subcategory: "geometry-collisions",
      categoryId: "detection.geometry-collisions",
      path: "detection/geometry-collisions/line-segment-intersection",
      description: "Detects if two 2D line segments intersect using cross product counter-clockwise orientation",
      signature: "int detect_line_segment_intersection(float x1, float y1, float x2, float y2, float x3, float y3, float x4, float y4);",
      code: "static int ccw_check(float ax, float ay, float bx, float by, float cx, float cy) {\n    return ((cy - ay) * (bx - ax) > (by - ay) * (cx - ax));\n}\n\nint detect_line_segment_intersection(float x1, float y1, float x2, float y2, float x3, float y3, float x4, float y4) {\n    return (ccw_check(x1, y1, x3, y3, x4, y4) != ccw_check(x2, y2, x3, y3, x4, y4)) &&\n           (ccw_check(x1, y1, x2, y2, x3, y3) != ccw_check(x1, y1, x2, y2, x4, y4));\n}",
      tags: ["detection","geometry","line-intersection","orientation"],
      aliases: ["detect_line_segment_intersection","lines_intersect"],
    })
  );

  components.push(
    createComponent({
      id: "detection.geometry-collisions.point-in-polygon",
      name: "detect_point_in_polygon",
      type: "function",
      category: "detection",
      subcategory: "geometry-collisions",
      categoryId: "detection.geometry-collisions",
      path: "detection/geometry-collisions/point-in-polygon",
      description: "Detects if point is inside arbitrary polygon using ray-casting parity rule",
      signature: "int detect_point_in_polygon(float px, float py, const float* poly_x, const float* poly_y, int n);",
      code: "int detect_point_in_polygon(float px, float py, const float* poly_x, const float* poly_y, int n) {\n    int inside = 0;\n    for (int i = 0, j = n - 1; i < n; j = i++) {\n        if (((poly_y[i] > py) != (poly_y[j] > py)) &&\n            (px < (poly_y[j] - poly_x[i]) * (py - poly_y[i]) / (poly_y[j] - poly_y[i]) + poly_x[i])) {\n            inside = !inside;\n        }\n    }\n    return inside;\n}",
      tags: ["detection","geometry","point-in-polygon","ray-casting"],
      aliases: ["detect_point_in_polygon","is_point_in_polygon"],
    })
  );

  components.push(
    createComponent({
      id: "detection.geometry-collisions.sphere-collision-3d",
      name: "detect_sphere_collision_3d",
      type: "function",
      category: "detection",
      subcategory: "geometry-collisions",
      categoryId: "detection.geometry-collisions",
      path: "detection/geometry-collisions/sphere-collision-3d",
      description: "Detects collision/overlap between two 3D spheres using 3D Euclidean distance",
      signature: "int detect_sphere_collision_3d(float x1, float y1, float z1, float r1, float x2, float y2, float z2, float r2);",
      code: "int detect_sphere_collision_3d(float x1, float y1, float z1, float r1, float x2, float y2, float z2, float r2) {\n    float dx = x1 - x2, dy = y1 - y2, dz = z1 - z2;\n    float dist_sq = dx * dx + dy * dy + dz * dz;\n    float rad_sum = r1 + r2;\n    return (dist_sq <= rad_sum * rad_sum);\n}",
      tags: ["detection","geometry","collision","sphere","3d"],
      aliases: ["detect_sphere_collision_3d","sphere_overlap_3d"],
    })
  );

  components.push(
    createComponent({
      id: "detection.geometry-collisions.ray-box-intersection",
      name: "detect_ray_box_intersection",
      type: "function",
      category: "detection",
      subcategory: "geometry-collisions",
      categoryId: "detection.geometry-collisions",
      path: "detection/geometry-collisions/ray-box-intersection",
      description: "Detects 2D ray intersection against Axis-Aligned Bounding Box using slab method",
      signature: "int detect_ray_box_intersection(float ox, float oy, float dx, float dy, float min_x, float min_y, float max_x, float max_y);",
      code: "int detect_ray_box_intersection(float ox, float oy, float dx, float dy, float min_x, float min_y, float max_x, float max_y) {\n    float tmin = (min_x - ox) / dx;\n    float tmax = (max_x - ox) / dx;\n    if (tmin > tmax) { float tmp = tmin; tmin = tmax; tmax = tmp; }\n    float tymin = (min_y - oy) / dy;\n    float tymax = (max_y - oy) / dy;\n    if (tymin > tymax) { float tmp = tymin; tymin = tymax; tymax = tmp; }\n    if ((tmin > tymax) || (tymin > tmax)) return 0;\n    return 1;\n}",
      tags: ["detection","geometry","ray-tracing","slab-method"],
      aliases: ["detect_ray_box_intersection","ray_intersects_box"],
    })
  );

  components.push(
    createComponent({
      id: "detection.system-hardware.endianness",
      name: "detect_endianness",
      type: "function",
      category: "detection",
      subcategory: "system-hardware",
      categoryId: "detection.system-hardware",
      path: "detection/system-hardware/endianness",
      description: "Detects runtime byte order returning 1 for little-endian or 0 for big-endian",
      signature: "int detect_endianness(void);",
      code: "int detect_endianness(void) {\n    unsigned int x = 0x1;\n    char* c = (char*)&x;\n    return (int)(*c);\n}",
      tags: ["detection","system","endianness","hardware"],
      aliases: ["detect_endianness","is_little_endian"],
    })
  );

  components.push(
    createComponent({
      id: "detection.system-hardware.pointer-alignment",
      name: "detect_pointer_alignment",
      type: "function",
      category: "detection",
      subcategory: "system-hardware",
      categoryId: "detection.system-hardware",
      path: "detection/system-hardware/pointer-alignment",
      description: "Detects if pointer address is aligned to specified byte boundary power",
      signature: "int detect_pointer_alignment(const void* ptr, int alignment_bytes);",
      code: "int detect_pointer_alignment(const void* ptr, int alignment_bytes) {\n    if (alignment_bytes <= 0) return 0;\n    return (((unsigned long long)ptr) % (unsigned long long)alignment_bytes == 0);\n}",
      tags: ["detection","system","alignment","pointer"],
      aliases: ["detect_pointer_alignment","is_aligned"],
    })
  );

  components.push(
    createComponent({
      id: "detection.system-hardware.architecture-bits",
      name: "detect_architecture_bits",
      type: "function",
      category: "detection",
      subcategory: "system-hardware",
      categoryId: "detection.system-hardware",
      path: "detection/system-hardware/architecture-bits",
      description: "Detects target CPU pointer width in bits (32 vs 64 bit architecture)",
      signature: "int detect_architecture_bits(void);",
      code: "int detect_architecture_bits(void) {\n    return (int)(sizeof(void*) * 8);\n}",
      tags: ["detection","system","architecture","bits"],
      aliases: ["detect_architecture_bits","cpu_pointer_bits"],
    })
  );

  components.push(
    createComponent({
      id: "detection.system-hardware.null-terminator",
      name: "detect_null_terminator",
      type: "function",
      category: "detection",
      subcategory: "system-hardware",
      categoryId: "detection.system-hardware",
      path: "detection/system-hardware/null-terminator",
      description: "Safely detects if buffer contains null terminator byte within max search limit",
      signature: "int detect_null_terminator(const char* buf, int max_len);",
      code: "int detect_null_terminator(const char* buf, int max_len) {\n    for (int i = 0; i < max_len; i++) {\n        if (buf[i] == '\\0') return 1;\n    }\n    return 0;\n}",
      tags: ["detection","system","security","null-terminator"],
      aliases: ["detect_null_terminator","has_null_terminator"],
    })
  );

  components.push(
    createComponent({
      id: "detection.system-hardware.stack-growth-direction",
      name: "detect_stack_growth_direction",
      type: "function",
      category: "detection",
      subcategory: "system-hardware",
      categoryId: "detection.system-hardware",
      path: "detection/system-hardware/stack-growth-direction",
      description: "Detects runtime call stack growth direction returning -1 for down or +1 for up",
      signature: "int detect_stack_growth_direction(void);",
      code: "static void stack_check_dir(int* parent_addr, int* out_dir) {\n    int local_var;\n    if (&local_var < parent_addr) *out_dir = -1;\n    else *out_dir = 1;\n}\n\nint detect_stack_growth_direction(void) {\n    int main_local;\n    int direction = 0;\n    stack_check_dir(&main_local, &direction);\n    return direction;\n}",
      tags: ["detection","system","stack","hardware"],
      aliases: ["detect_stack_growth_direction","stack_direction"],
    })
  );

  return components;
}
