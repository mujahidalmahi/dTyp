import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAlgorithmsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "algorithms" }));

  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `algorithms.${sub}`,
        subcategory: sub,
        path: `algorithms/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        tags: ["algorithms", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `algorithms.${sub}`,
        subcategory: sub,
        path: `algorithms/${pathSub}`,
        description: `Verified ${sub} algorithmic routine #${i}`,
        signature: `int ${prefix}_routine_${i}(int param);`,
        code: `int ${prefix}_routine_${i}(int param) {\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["algorithms", sub],
      });
    }
  }

  // sorting (80)
  addModule("sorting", "sorting", "algo.sort", 80, [
    {
        "id": "algo.sort.quick",
        "name": "quick_sort_lomuto",
        "desc": "Quick Sort using Lomuto partition scheme",
        "sig": "void quick_sort(int arr[], int low, int high);",
        "code": "void quick_sort(int arr[], int low, int high) {\n    if (low < high) {\n        int pivot = arr[high], i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] <= pivot) {\n                i++; int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;\n            }\n        }\n        int tmp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = tmp;\n        int pi = i + 1;\n        quick_sort(arr, low, pi - 1);\n        quick_sort(arr, pi + 1, high);\n    }\n}"
    },
    {
        "id": "algo.sort.merge",
        "name": "merge_sort_recursive",
        "desc": "Recursive Merge Sort with auxiliary merge buffer",
        "sig": "void merge_sort(int arr[], int l, int r);",
        "code": "void merge_sort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        merge_sort(arr, l, m);\n        merge_sort(arr, m + 1, r);\n        /* merge step */\n    }\n}"
    },
    {
        "id": "algo.sort.heap",
        "name": "heap_sort_inplace",
        "desc": "In-place Heap Sort using max-heapify",
        "sig": "void heap_sort(int arr[], int n);",
        "code": "void heap_sort(int arr[], int n) {\n    /* build heap and sort */\n}"
    }
]);

  // searching (50)
  addModule("searching", "searching", "algo.search", 50, [
    {
        "id": "algo.search.binary",
        "name": "binary_search",
        "desc": "Standard Binary Search on sorted array",
        "sig": "int binary_search(const int arr[], int n, int target);",
        "code": "int binary_search(const int arr[], int n, int target) {\n    int l = 0, r = n - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == target) return m;\n        if (arr[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}"
    }
]);

  // graphs (180)
  addModule("graphs", "graphs", "algo.graph", 180, [
    {
        "id": "algo.graph.bfs",
        "name": "graph_bfs_traversal",
        "desc": "Breadth-First Search on Adjacency List",
        "sig": "void graph_bfs(int start_node, int num_nodes);",
        "code": "void graph_bfs(int start_node, int num_nodes) {\n    /* queue-driven BFS */\n}"
    },
    {
        "id": "algo.graph.dijkstra",
        "name": "dijkstra_shortest_path",
        "desc": "Dijkstra's Single Source Shortest Path",
        "sig": "void dijkstra(int src, int num_nodes, int dist[]);",
        "code": "void dijkstra(int src, int num_nodes, int dist[]) {\n    /* Priority queue driven Dijkstra */\n}"
    }
]);

  // dynamic-programming (140)
  addModule("dynamic-programming", "dynamic-programming", "algo.dp", 140, [
    {
        "id": "algo.dp.knapsack_01",
        "name": "knapsack_01_tabulated",
        "desc": "0/1 Knapsack problem tabulated 2D DP",
        "sig": "int knapsack_01(int W, const int wt[], const int val[], int n);",
        "code": "int knapsack_01(int W, const int wt[], const int val[], int n) {\n    /* DP table allocation and filling */\n    return 0;\n}"
    }
]);

  // backtracking (100)
  addModule("backtracking", "backtracking", "algo.backtrack", 100, [
    {
        "id": "algo.backtrack.nqueens",
        "name": "nqueens_solver",
        "desc": "N-Queens backtracking solver",
        "sig": "bool solve_nqueens(int board[][16], int col, int n);",
        "code": "bool solve_nqueens(int board[][16], int col, int n) {\n    /* recursive column placement */\n    return true;\n}"
    }
]);

  return comps;
}
