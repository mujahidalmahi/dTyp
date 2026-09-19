import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { generateAlgorithmsFullProgramsComponents } from "./algo-full-programs-generator.js";

export function generateAlgorithmsComponents(): Component[] {
  const components: Component[] = [];

  // =========================================================================
  // SUBDOMAIN 1: SEPARATE COMPONENTS (algorithms.separate-components)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TOPIC 1: SORTING
  // -------------------------------------------------------------------------

  // Elementary Sorts
  components.push(
    createComponent({
      id: "algorithms.separate-components.sorting.elementary-sorts.bubble-sort",
      name: "bubble_sort",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.elementary-sorts",
      path: "algorithms/separate-components/sorting/elementary-sorts/bubble-sort",
      description: "Sorts an integer array using optimized bubble sort with early exit",
      signature: "void bubble_sort(int* arr, int n);",
      code: `void bubble_sort(int* arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}`,
      tags: ["sorting", "bubble-sort"],
      aliases: ["bubble_sort", "bubbleSort"],
    }),
    createComponent({
      id: "algorithms.separate-components.sorting.elementary-sorts.selection-sort",
      name: "selection_sort",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.elementary-sorts",
      path: "algorithms/separate-components/sorting/elementary-sorts/selection-sort",
      description: "Sorts an integer array using selection sort",
      signature: "void selection_sort(int* arr, int n);",
      code: `void selection_sort(int* arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx != i) {
            int tmp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = tmp;
        }
    }
}`,
      tags: ["sorting", "selection-sort"],
      aliases: ["selection_sort", "selectionSort"],
    }),
    createComponent({
      id: "algorithms.separate-components.sorting.elementary-sorts.insertion-sort",
      name: "insertion_sort",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.elementary-sorts",
      path: "algorithms/separate-components/sorting/elementary-sorts/insertion-sort",
      description: "Sorts an integer array in-place using insertion sort",
      signature: "void insertion_sort(int* arr, int n);",
      code: `void insertion_sort(int* arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      tags: ["sorting", "insertion-sort"],
      aliases: ["insertion_sort", "insertionSort"],
    })
  );

  // Quick Sort
  const lomutoPartitionId = "algorithms.separate-components.sorting.quick-sort.lomuto-partition";
  components.push(
    createComponent({
      id: lomutoPartitionId,
      name: "quick_sort_lomuto_partition",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.quick-sort",
      path: "algorithms/separate-components/sorting/quick-sort/lomuto-partition",
      description: "Partitions subarray around pivot using Lomuto partitioning scheme",
      signature: "int quick_sort_lomuto_partition(int* arr, int low, int high);",
      code: `int quick_sort_lomuto_partition(int* arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
    int tmp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = tmp;
    return i + 1;
}`,
      tags: ["sorting", "quick-sort", "lomuto", "partition"],
      aliases: ["quick_sort_lomuto_partition", "lomutoPartition"],
    }),
    createComponent({
      id: "algorithms.separate-components.sorting.quick-sort.sort",
      name: "quick_sort",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.quick-sort",
      path: "algorithms/separate-components/sorting/quick-sort/sort",
      description: "Sorts subarray recursively using quick sort",
      signature: "void quick_sort(int* arr, int low, int high);",
      code: `void quick_sort(int* arr, int low, int high) {
    if (low < high) {
        int pi = quick_sort_lomuto_partition(arr, low, high);
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}`,
      dependencies: [lomutoPartitionId],
      tags: ["sorting", "quick-sort"],
      aliases: ["quick_sort", "quickSort"],
    })
  );

  // Merge Sort
  const mergeSubarraysId = "algorithms.separate-components.sorting.merge-sort.merge-subarrays";
  components.push(
    createComponent({
      id: mergeSubarraysId,
      name: "merge_sorted_subarrays",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.merge-sort",
      path: "algorithms/separate-components/sorting/merge-sort/merge-subarrays",
      description: "Merges two sorted adjacent subarrays into single sorted range",
      signature: "void merge_sorted_subarrays(int* arr, int l, int m, int r);",
      code: `void merge_sorted_subarrays(int* arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int* left = (int*)malloc(n1 * sizeof(int));
    int* right = (int*)malloc(n2 * sizeof(int));
    for (int i = 0; i < n1; i++) left[i] = arr[l + i];
    for (int j = 0; j < n2; j++) right[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < n1) arr[k++] = left[i++];
    while (j < n2) arr[k++] = right[j++];
    free(left);
    free(right);
}`,
      tags: ["sorting", "merge-sort", "merge"],
      aliases: ["merge_sorted_subarrays", "mergeArrays"],
    }),
    createComponent({
      id: "algorithms.separate-components.sorting.merge-sort.sort",
      name: "merge_sort",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.merge-sort",
      path: "algorithms/separate-components/sorting/merge-sort/sort",
      description: "Sorts an array recursively using merge sort",
      signature: "void merge_sort(int* arr, int l, int r);",
      code: `void merge_sort(int* arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        merge_sort(arr, l, m);
        merge_sort(arr, m + 1, r);
        merge_sorted_subarrays(arr, l, m, r);
    }
}`,
      dependencies: [mergeSubarraysId],
      tags: ["sorting", "merge-sort"],
      aliases: ["merge_sort", "mergeSort"],
    })
  );

  // Heap Sort
  const heapifyDownId = "algorithms.separate-components.sorting.heap-sort.max-heapify-down";
  components.push(
    createComponent({
      id: heapifyDownId,
      name: "max_heapify_down",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.heap-sort",
      path: "algorithms/separate-components/sorting/heap-sort/max-heapify-down",
      description: "Restores max-heap property rooted at index i",
      signature: "void max_heapify_down(int* arr, int n, int i);",
      code: `void max_heapify_down(int* arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int tmp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = tmp;
        max_heapify_down(arr, n, largest);
    }
}`,
      tags: ["sorting", "heap-sort", "heapify"],
      aliases: ["max_heapify_down", "maxHeapifyDown"],
    }),
    createComponent({
      id: "algorithms.separate-components.sorting.heap-sort.sort",
      name: "heap_sort",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.heap-sort",
      path: "algorithms/separate-components/sorting/heap-sort/sort",
      description: "Sorts an array in-place using binary max heap",
      signature: "void heap_sort(int* arr, int n);",
      code: `void heap_sort(int* arr, int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        max_heapify_down(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        int tmp = arr[0];
        arr[0] = arr[i];
        arr[i] = tmp;
        max_heapify_down(arr, i, 0);
    }
}`,
      dependencies: [heapifyDownId],
      tags: ["sorting", "heap-sort"],
      aliases: ["heap_sort", "heapSort"],
    })
  );

  // Non-Comparison Sorts
  components.push(
    createComponent({
      id: "algorithms.separate-components.sorting.non-comparison-sorts.counting-sort",
      name: "counting_sort",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.non-comparison-sorts",
      path: "algorithms/separate-components/sorting/non-comparison-sorts/counting-sort",
      description: "Sorts non-negative integers using counting sort",
      signature: "void counting_sort(int* arr, int n, int max_val);",
      code: `void counting_sort(int* arr, int n, int max_val) {
    int* count = (int*)calloc(max_val + 1, sizeof(int));
    int* output = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) count[arr[i]]++;
    for (int i = 1; i <= max_val; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
    free(count);
    free(output);
}`,
      tags: ["sorting", "counting-sort"],
      aliases: ["counting_sort", "countingSort"],
    }),
    createComponent({
      id: "algorithms.separate-components.sorting.non-comparison-sorts.radix-sort",
      name: "radix_sort",
      type: "function",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.separate-components.sorting.non-comparison-sorts",
      path: "algorithms/separate-components/sorting/non-comparison-sorts/radix-sort",
      description: "Sorts non-negative integers digit by digit using LSD radix sort",
      signature: "void radix_sort(int* arr, int n);",
      code: `static void count_sort_digit(int* arr, int n, int exp) {
    int output[1024];
    int count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radix_sort(int* arr, int n) {
    if (n <= 1) return;
    int max_val = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > max_val) max_val = arr[i];
    for (int exp = 1; max_val / exp > 0; exp *= 10) {
        count_sort_digit(arr, n, exp);
    }
}`,
      tags: ["sorting", "radix-sort"],
      aliases: ["radix_sort", "radixSort"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 2: SEARCHING
  // -------------------------------------------------------------------------

  // Linear Search
  components.push(
    createComponent({
      id: "algorithms.separate-components.searching.linear-search.standard",
      name: "linear_search",
      type: "function",
      category: "algorithms",
      subcategory: "searching",
      categoryId: "algorithms.separate-components.searching.linear-search",
      path: "algorithms/separate-components/searching/linear-search/standard",
      description: "Sequential search for target in integer array",
      signature: "int linear_search(const int* arr, int n, int target);",
      code: `int linear_search(const int* arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      tags: ["searching", "linear-search"],
      aliases: ["linear_search", "linearSearch"],
    })
  );

  // Binary Search
  components.push(
    createComponent({
      id: "algorithms.separate-components.searching.binary-search.lower-bound",
      name: "binary_search_lower_bound",
      type: "function",
      category: "algorithms",
      subcategory: "searching",
      categoryId: "algorithms.separate-components.searching.binary-search",
      path: "algorithms/separate-components/searching/binary-search/lower-bound",
      description: "Returns index of first element >= target in sorted array",
      signature: "int binary_search_lower_bound(const int* arr, int n, int target);",
      code: `int binary_search_lower_bound(const int* arr, int n, int target) {
    int low = 0, high = n;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) high = mid;
        else low = mid + 1;
    }
    return low;
}`,
      tags: ["searching", "binary-search", "lower-bound"],
      aliases: ["binary_search_lower_bound", "lowerBound"],
    }),
    createComponent({
      id: "algorithms.separate-components.searching.binary-search.upper-bound",
      name: "binary_search_upper_bound",
      type: "function",
      category: "algorithms",
      subcategory: "searching",
      categoryId: "algorithms.separate-components.searching.binary-search",
      path: "algorithms/separate-components/searching/binary-search/upper-bound",
      description: "Returns index of first element > target in sorted array",
      signature: "int binary_search_upper_bound(const int* arr, int n, int target);",
      code: `int binary_search_upper_bound(const int* arr, int n, int target) {
    int low = 0, high = n;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] > target) high = mid;
        else low = mid + 1;
    }
    return low;
}`,
      tags: ["searching", "binary-search", "upper-bound"],
      aliases: ["binary_search_upper_bound", "upperBound"],
    })
  );

  // Jump & Interpolation Search
  components.push(
    createComponent({
      id: "algorithms.separate-components.searching.jump-interpolation.jump-search",
      name: "jump_search",
      type: "function",
      category: "algorithms",
      subcategory: "searching",
      categoryId: "algorithms.separate-components.searching.jump-interpolation",
      path: "algorithms/separate-components/searching/jump-interpolation/jump-search",
      description: "Searches sorted array in sqrt(n) blocks",
      signature: "int jump_search(const int* arr, int n, int target);",
      code: `int jump_search(const int* arr, int n, int target) {
    int step = (int)sqrt((double)n);
    int prev = 0;
    while (arr[(step < n ? step : n) - 1] < target) {
        prev = step;
        step += (int)sqrt((double)n);
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == (step < n ? step : n)) return -1;
    }
    if (arr[prev] == target) return prev;
    return -1;
}`,
      tags: ["searching", "jump-search"],
      aliases: ["jump_search", "jumpSearch"],
    })
  );

  // Two Pointers Search
  components.push(
    createComponent({
      id: "algorithms.separate-components.searching.two-pointers.two-sum",
      name: "two_sum_sorted",
      type: "function",
      category: "algorithms",
      subcategory: "searching",
      categoryId: "algorithms.separate-components.searching.two-pointers",
      path: "algorithms/separate-components/searching/two-pointers/two-sum",
      description: "Finds two indices in sorted array summing to target",
      signature: "int two_sum_sorted(const int* arr, int n, int target, int* idx1, int* idx2);",
      code: `int two_sum_sorted(const int* arr, int n, int target, int* idx1, int* idx2) {
    int l = 0, r = n - 1;
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) {
            *idx1 = l;
            *idx2 = r;
            return 1;
        }
        if (sum < target) l++;
        else r--;
    }
    return 0;
}`,
      tags: ["searching", "two-pointers", "two-sum"],
      aliases: ["two_sum_sorted", "twoSumSorted"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 3: GRAPH ALGORITHMS
  // -------------------------------------------------------------------------

  // Graph Traversals (BFS & DFS)
  components.push(
    createComponent({
      id: "algorithms.separate-components.graph-algorithms.graph-traversals.bfs",
      name: "graph_bfs_traversal",
      type: "function",
      category: "algorithms",
      subcategory: "graph-algorithms",
      categoryId: "algorithms.separate-components.graph-algorithms.graph-traversals",
      path: "algorithms/separate-components/graph-algorithms/graph-traversals/bfs",
      description: "Performs Breadth-First Search on adjacency matrix starting at source",
      signature: "void graph_bfs_traversal(const int* matrix, int v, int start, int* visited);",
      code: `void graph_bfs_traversal(const int* matrix, int v, int start, int* visited) {
    int* queue = (int*)malloc(v * sizeof(int));
    int front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;
    while (front < rear) {
        int u = queue[front++];
        for (int i = 0; i < v; i++) {
            if (matrix[u * v + i] && !visited[i]) {
                visited[i] = 1;
                queue[rear++] = i;
            }
        }
    }
    free(queue);
}`,
      tags: ["graphs", "bfs", "traversal"],
      aliases: ["graph_bfs_traversal", "graphBFS"],
    }),
    createComponent({
      id: "algorithms.separate-components.graph-algorithms.graph-traversals.dfs",
      name: "graph_dfs_traversal",
      type: "function",
      category: "algorithms",
      subcategory: "graph-algorithms",
      categoryId: "algorithms.separate-components.graph-algorithms.graph-traversals",
      path: "algorithms/separate-components/graph-algorithms/graph-traversals/dfs",
      description: "Performs Depth-First Search on adjacency matrix recursively",
      signature: "void graph_dfs_traversal(const int* matrix, int v, int u, int* visited);",
      code: `void graph_dfs_traversal(const int* matrix, int v, int u, int* visited) {
    visited[u] = 1;
    for (int i = 0; i < v; i++) {
        if (matrix[u * v + i] && !visited[i]) {
            graph_dfs_traversal(matrix, v, i, visited);
        }
    }
}`,
      tags: ["graphs", "dfs", "traversal"],
      aliases: ["graph_dfs_traversal", "graphDFS"],
    })
  );

  // Shortest Paths (Dijkstra)
  components.push(
    createComponent({
      id: "algorithms.separate-components.graph-algorithms.shortest-paths.dijkstra",
      name: "dijkstra_shortest_path",
      type: "function",
      category: "algorithms",
      subcategory: "graph-algorithms",
      categoryId: "algorithms.separate-components.graph-algorithms.shortest-paths",
      path: "algorithms/separate-components/graph-algorithms/shortest-paths/dijkstra",
      description: "Computes single-source shortest path distances using Dijkstra algorithm",
      signature: "void dijkstra_shortest_path(const int* weight_matrix, int v, int src, int* dist);",
      code: `void dijkstra_shortest_path(const int* weight_matrix, int v, int src, int* dist) {
    int* visited = (int*)calloc(v, sizeof(int));
    for (int i = 0; i < v; i++) dist[i] = 1000000000;
    dist[src] = 0;
    for (int count = 0; count < v - 1; count++) {
        int min_d = 1000000000, u = -1;
        for (int i = 0; i < v; i++) {
            if (!visited[i] && dist[i] < min_d) {
                min_d = dist[i];
                u = i;
            }
        }
        if (u == -1) break;
        visited[u] = 1;
        for (int i = 0; i < v; i++) {
            int w = weight_matrix[u * v + i];
            if (!visited[i] && w > 0 && dist[u] + w < dist[i]) {
                dist[i] = dist[u] + w;
            }
        }
    }
    free(visited);
}`,
      tags: ["graphs", "dijkstra", "shortest-path"],
      aliases: ["dijkstra_shortest_path", "dijkstra"],
    })
  );

  // Minimum Spanning Tree (Kruskal)
  components.push(
    createComponent({
      id: "algorithms.separate-components.graph-algorithms.minimum-spanning-tree.kruskal",
      name: "kruskal_mst",
      type: "function",
      category: "algorithms",
      subcategory: "graph-algorithms",
      categoryId: "algorithms.separate-components.graph-algorithms.minimum-spanning-tree",
      path: "algorithms/separate-components/graph-algorithms/minimum-spanning-tree/kruskal",
      description: "Computes Minimum Spanning Tree weight using Kruskal algorithm and DSU",
      signature: "int kruskal_mst(int edge_u[], int edge_v[], int edge_w[], int e, int v);",
      code: `static int dsu_root(int* parent, int i) {
    if (parent[i] == i) return i;
    return parent[i] = dsu_root(parent, parent[i]);
}

int kruskal_mst(int edge_u[], int edge_v[], int edge_w[], int e, int v) {
    for (int i = 0; i < e - 1; i++) {
        for (int j = 0; j < e - i - 1; j++) {
            if (edge_w[j] > edge_w[j + 1]) {
                int tw = edge_w[j]; edge_w[j] = edge_w[j + 1]; edge_w[j + 1] = tw;
                int tu = edge_u[j]; edge_u[j] = edge_u[j + 1]; edge_u[j + 1] = tu;
                int tv = edge_v[j]; edge_v[j] = edge_v[j + 1]; edge_v[j + 1] = tv;
            }
        }
    }
    int* parent = (int*)malloc(v * sizeof(int));
    for (int i = 0; i < v; i++) parent[i] = i;
    int total_weight = 0, count = 0;
    for (int i = 0; i < e && count < v - 1; i++) {
        int ru = dsu_root(parent, edge_u[i]);
        int rv = dsu_root(parent, edge_v[i]);
        if (ru != rv) {
            parent[ru] = rv;
            total_weight += edge_w[i];
            count++;
        }
    }
    free(parent);
    return total_weight;
}`,
      tags: ["graphs", "kruskal", "mst"],
      aliases: ["kruskal_mst", "kruskalMST"],
    })
  );

  // Topological Sort (Kahn's)
  components.push(
    createComponent({
      id: "algorithms.separate-components.graph-algorithms.topological-sort.kahn",
      name: "topological_sort_kahn",
      type: "function",
      category: "algorithms",
      subcategory: "graph-algorithms",
      categoryId: "algorithms.separate-components.graph-algorithms.topological-sort",
      path: "algorithms/separate-components/graph-algorithms/topological-sort/kahn",
      description: "Computes DAG topological ordering using Kahn in-degree algorithm",
      signature: "int topological_sort_kahn(const int* adj_matrix, int v, int* order);",
      code: `int topological_sort_kahn(const int* adj_matrix, int v, int* order) {
    int* in_degree = (int*)calloc(v, sizeof(int));
    for (int i = 0; i < v; i++) {
        for (int j = 0; j < v; j++) {
            if (adj_matrix[i * v + j]) in_degree[j]++;
        }
    }
    int* queue = (int*)malloc(v * sizeof(int));
    int front = 0, rear = 0;
    for (int i = 0; i < v; i++) {
        if (in_degree[i] == 0) queue[rear++] = i;
    }
    int count = 0;
    while (front < rear) {
        int u = queue[front++];
        order[count++] = u;
        for (int i = 0; i < v; i++) {
            if (adj_matrix[u * v + i]) {
                if (--in_degree[i] == 0) queue[rear++] = i;
            }
        }
    }
    free(in_degree);
    free(queue);
    return (count == v);
}`,
      tags: ["graphs", "topological-sort", "kahn"],
      aliases: ["topological_sort_kahn", "kahnTopologicalSort"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 4: DYNAMIC PROGRAMMING
  // -------------------------------------------------------------------------

  // 1D DP (Kadane)
  components.push(
    createComponent({
      id: "algorithms.separate-components.dynamic-programming.1d-dp.kadane",
      name: "kadane_max_subarray",
      type: "function",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.separate-components.dynamic-programming.1d-dp",
      path: "algorithms/separate-components/dynamic-programming/1d-dp/kadane",
      description: "Computes maximum subarray sum in O(n) using Kadane algorithm",
      signature: "int kadane_max_subarray(const int* arr, int n);",
      code: `int kadane_max_subarray(const int* arr, int n) {
    int max_so_far = arr[0];
    int curr_max = arr[0];
    for (int i = 1; i < n; i++) {
        curr_max = (arr[i] > curr_max + arr[i]) ? arr[i] : (curr_max + arr[i]);
        if (curr_max > max_so_far) max_so_far = curr_max;
    }
    return max_so_far;
}`,
      tags: ["dp", "kadane", "max-subarray"],
      aliases: ["kadane_max_subarray", "kadane"],
    }),
    createComponent({
      id: "algorithms.separate-components.dynamic-programming.1d-dp.climb-stairs",
      name: "climb_stairs_dp",
      type: "function",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.separate-components.dynamic-programming.1d-dp",
      path: "algorithms/separate-components/dynamic-programming/1d-dp/climb-stairs",
      description: "Computes distinct ways to climb n stairs taking 1 or 2 steps",
      signature: "int climb_stairs_dp(int n);",
      code: `int climb_stairs_dp(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}`,
      tags: ["dp", "climbing-stairs", "1d-dp"],
      aliases: ["climb_stairs_dp", "climbStairs"],
    })
  );

  // Knapsack
  components.push(
    createComponent({
      id: "algorithms.separate-components.dynamic-programming.knapsack.knapsack-01",
      name: "knapsack_01_tabulated",
      type: "function",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.separate-components.dynamic-programming.knapsack",
      path: "algorithms/separate-components/dynamic-programming/knapsack/knapsack-01",
      description: "Computes maximum value for 0/1 knapsack using 2D DP table",
      signature: "int knapsack_01_tabulated(int W, const int* wt, const int* val, int n);",
      code: `int knapsack_01_tabulated(int W, const int* wt, const int* val, int n) {
    int dp[128][128] = {0};
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i - 1] <= w) {
                int take = val[i - 1] + dp[i - 1][w - wt[i - 1]];
                int skip = dp[i - 1][w];
                dp[i][w] = (take > skip) ? take : skip;
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`,
      tags: ["dp", "knapsack", "0-1-knapsack"],
      aliases: ["knapsack_01_tabulated", "knapsack01"],
    }),
    createComponent({
      id: "algorithms.separate-components.dynamic-programming.knapsack.coin-change",
      name: "coin_change_min_coins",
      type: "function",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.separate-components.dynamic-programming.knapsack",
      path: "algorithms/separate-components/dynamic-programming/knapsack/coin-change",
      description: "Computes minimum coins needed to make amount using DP",
      signature: "int coin_change_min_coins(const int* coins, int n, int amount);",
      code: `int coin_change_min_coins(const int* coins, int n, int amount) {
    int* dp = (int*)malloc((amount + 1) * sizeof(int));
    for (int i = 1; i <= amount; i++) dp[i] = 1000000;
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < n; j++) {
            if (coins[j] <= i && dp[i - coins[j]] + 1 < dp[i]) {
                dp[i] = dp[i - coins[j]] + 1;
            }
        }
    }
    int res = (dp[amount] >= 1000000) ? -1 : dp[amount];
    free(dp);
    return res;
}`,
      tags: ["dp", "coin-change"],
      aliases: ["coin_change_min_coins", "coinChangeMin"],
    })
  );

  // Subsequences (LCS & LIS)
  components.push(
    createComponent({
      id: "algorithms.separate-components.dynamic-programming.subsequences.lcs",
      name: "lcs_length",
      type: "function",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.separate-components.dynamic-programming.subsequences",
      path: "algorithms/separate-components/dynamic-programming/subsequences/lcs",
      description: "Computes Longest Common Subsequence length of two strings",
      signature: "int lcs_length(const char* s1, const char* s2);",
      code: `int lcs_length(const char* s1, const char* s2) {
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);
    int dp[128][128] = {0};
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                int top = dp[i - 1][j];
                int left = dp[i][j - 1];
                dp[i][j] = (top > left) ? top : left;
            }
        }
    }
    return dp[m][n];
}`,
      tags: ["dp", "lcs", "subsequence"],
      aliases: ["lcs_length", "lcsLength"],
    }),
    createComponent({
      id: "algorithms.separate-components.dynamic-programming.subsequences.lis",
      name: "lis_length",
      type: "function",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.separate-components.dynamic-programming.subsequences",
      path: "algorithms/separate-components/dynamic-programming/subsequences/lis",
      description: "Computes Longest Increasing Subsequence length using O(n^2) DP",
      signature: "int lis_length(const int* arr, int n);",
      code: `int lis_length(const int* arr, int n) {
    if (n <= 0) return 0;
    int* dp = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) dp[i] = 1;
    int max_len = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[i] > arr[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
        if (dp[i] > max_len) max_len = dp[i];
    }
    free(dp);
    return max_len;
}`,
      tags: ["dp", "lis", "subsequence"],
      aliases: ["lis_length", "lisLength"],
    })
  );

  // String DP (Edit Distance)
  components.push(
    createComponent({
      id: "algorithms.separate-components.dynamic-programming.string-dp.edit-distance",
      name: "edit_distance_levenshtein",
      type: "function",
      category: "algorithms",
      subcategory: "dynamic-programming",
      categoryId: "algorithms.separate-components.dynamic-programming.string-dp",
      path: "algorithms/separate-components/dynamic-programming/string-dp/edit-distance",
      description: "Computes Levenshtein minimum edit distance between two strings",
      signature: "int edit_distance_levenshtein(const char* s1, const char* s2);",
      code: `static int min3(int a, int b, int c) {
    int m = a < b ? a : b;
    return m < c ? m : c;
}

int edit_distance_levenshtein(const char* s1, const char* s2) {
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);
    int dp[128][128];
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
    return dp[m][n];
}`,
      tags: ["dp", "edit-distance", "levenshtein"],
      aliases: ["edit_distance_levenshtein", "editDistance"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 5: GREEDY ALGORITHMS
  // -------------------------------------------------------------------------

  // Activity Selection
  components.push(
    createComponent({
      id: "algorithms.separate-components.greedy.activity-selection.select",
      name: "activity_selection_greedy",
      type: "function",
      category: "algorithms",
      subcategory: "greedy",
      categoryId: "algorithms.separate-components.greedy.activity-selection",
      path: "algorithms/separate-components/greedy/activity-selection/select",
      description: "Greedy interval scheduling selecting max non-overlapping activities",
      signature: "int activity_selection_greedy(const int* start, const int* finish, int n, int* selected);",
      code: `int activity_selection_greedy(const int* start, const int* finish, int n, int* selected) {
    if (n <= 0) return 0;
    int count = 0;
    selected[count++] = 0;
    int last_finish = finish[0];
    for (int i = 1; i < n; i++) {
        if (start[i] >= last_finish) {
            selected[count++] = i;
            last_finish = finish[i];
        }
    }
    return count;
}`,
      tags: ["greedy", "activity-selection", "intervals"],
      aliases: ["activity_selection_greedy", "activitySelection"],
    })
  );

  // Fractional Knapsack
  components.push(
    createComponent({
      id: "algorithms.separate-components.greedy.fractional-knapsack.greedy",
      name: "fractional_knapsack_greedy",
      type: "function",
      category: "algorithms",
      subcategory: "greedy",
      categoryId: "algorithms.separate-components.greedy.fractional-knapsack",
      path: "algorithms/separate-components/greedy/fractional-knapsack/greedy",
      description: "Maximizes fractional knapsack value using greedy ratio sorting",
      signature: "double fractional_knapsack_greedy(int capacity, double* wt, double* val, int n);",
      code: `double fractional_knapsack_greedy(int capacity, double* wt, double* val, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            double r1 = val[j] / wt[j];
            double r2 = val[j + 1] / wt[j + 1];
            if (r1 < r2) {
                double tv = val[j]; val[j] = val[j + 1]; val[j + 1] = tv;
                double tw = wt[j]; wt[j] = wt[j + 1]; wt[j + 1] = tw;
            }
        }
    }
    double total_value = 0.0;
    double rem_cap = capacity;
    for (int i = 0; i < n; i++) {
        if (wt[i] <= rem_cap) {
            rem_cap -= wt[i];
            total_value += val[i];
        } else {
            total_value += val[i] * (rem_cap / wt[i]);
            break;
        }
    }
    return total_value;
}`,
      tags: ["greedy", "fractional-knapsack"],
      aliases: ["fractional_knapsack_greedy", "fractionalKnapsack"],
    })
  );

  // Job Sequencing
  components.push(
    createComponent({
      id: "algorithms.separate-components.greedy.job-sequencing.schedule",
      name: "job_sequencing_deadlines",
      type: "function",
      category: "algorithms",
      subcategory: "greedy",
      categoryId: "algorithms.separate-components.greedy.job-sequencing",
      path: "algorithms/separate-components/greedy/job-sequencing/schedule",
      description: "Schedules jobs to maximize profit within deadlines",
      signature: "int job_sequencing_deadlines(int* deadline, int* profit, int n, int max_d);",
      code: `int job_sequencing_deadlines(int* deadline, int* profit, int n, int max_d) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (profit[j] < profit[j + 1]) {
                int tp = profit[j]; profit[j] = profit[j + 1]; profit[j + 1] = tp;
                int td = deadline[j]; deadline[j] = deadline[j + 1]; deadline[j + 1] = td;
            }
        }
    }
    int* slot = (int*)calloc(max_d + 1, sizeof(int));
    int total_profit = 0;
    for (int i = 0; i < n; i++) {
        for (int j = (deadline[i] < max_d ? deadline[i] : max_d); j > 0; j--) {
            if (!slot[j]) {
                slot[j] = 1;
                total_profit += profit[i];
                break;
            }
        }
    }
    free(slot);
    return total_profit;
}`,
      tags: ["greedy", "job-sequencing", "deadlines"],
      aliases: ["job_sequencing_deadlines", "jobSequencing"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 6: BACKTRACKING
  // -------------------------------------------------------------------------

  // N-Queens
  components.push(
    createComponent({
      id: "algorithms.separate-components.backtracking.n-queens.solve",
      name: "n_queens_solve",
      type: "function",
      category: "algorithms",
      subcategory: "backtracking",
      categoryId: "algorithms.separate-components.backtracking.n-queens",
      path: "algorithms/separate-components/backtracking/n-queens/solve",
      description: "Solves N-Queens problem on board using recursive backtracking",
      signature: "int n_queens_solve(int board[][16], int col, int n);",
      code: `static int is_safe(int board[][16], int row, int col, int n) {
    for (int i = 0; i < col; i++) if (board[row][i]) return 0;
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return 0;
    for (int i = row, j = col; j >= 0 && i < n; i++, j--) if (board[i][j]) return 0;
    return 1;
}

int n_queens_solve(int board[][16], int col, int n) {
    if (col >= n) return 1;
    for (int i = 0; i < n; i++) {
        if (is_safe(board, i, col, n)) {
            board[i][col] = 1;
            if (n_queens_solve(board, col + 1, n)) return 1;
            board[i][col] = 0;
        }
    }
    return 0;
}`,
      tags: ["backtracking", "n-queens"],
      aliases: ["n_queens_solve", "nQueensSolve"],
    })
  );

  // Maze Solver
  components.push(
    createComponent({
      id: "algorithms.separate-components.backtracking.maze-solver.solve",
      name: "rat_in_maze_solve",
      type: "function",
      category: "algorithms",
      subcategory: "backtracking",
      categoryId: "algorithms.separate-components.backtracking.maze-solver",
      path: "algorithms/separate-components/backtracking/maze-solver/solve",
      description: "Finds path through 2D obstacle grid using backtracking",
      signature: "int rat_in_maze_solve(int maze[][8], int x, int y, int sol[][8], int n);",
      code: `int rat_in_maze_solve(int maze[][8], int x, int y, int sol[][8], int n) {
    if (x == n - 1 && y == n - 1 && maze[x][y] == 1) {
        sol[x][y] = 1;
        return 1;
    }
    if (x >= 0 && x < n && y >= 0 && y < n && maze[x][y] == 1) {
        if (sol[x][y] == 1) return 0;
        sol[x][y] = 1;
        if (rat_in_maze_solve(maze, x + 1, y, sol, n)) return 1;
        if (rat_in_maze_solve(maze, x, y + 1, sol, n)) return 1;
        sol[x][y] = 0;
        return 0;
    }
    return 0;
}`,
      tags: ["backtracking", "maze-solver"],
      aliases: ["rat_in_maze_solve", "ratInMaze"],
    })
  );

  // Combinatorial Generation
  components.push(
    createComponent({
      id: "algorithms.separate-components.backtracking.combinatorial.permutations",
      name: "generate_permutations",
      type: "function",
      category: "algorithms",
      subcategory: "backtracking",
      categoryId: "algorithms.separate-components.backtracking.combinatorial",
      path: "algorithms/separate-components/backtracking/combinatorial/permutations",
      description: "Generates all permutations of an array recursively",
      signature: "void generate_permutations(int* arr, int l, int r, void (*callback)(const int*, int));",
      code: `static void swap_val(int* a, int* b) { int t = *a; *a = *b; *b = t; }

void generate_permutations(int* arr, int l, int r, void (*callback)(const int*, int)) {
    if (l == r) {
        callback(arr, r + 1);
    } else {
        for (int i = l; i <= r; i++) {
            swap_val(&arr[l], &arr[i]);
            generate_permutations(arr, l + 1, r, callback);
            swap_val(&arr[l], &arr[i]);
        }
    }
}`,
      tags: ["backtracking", "permutations", "combinatorial"],
      aliases: ["generate_permutations", "permutations"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 7: STRING ALGORITHMS
  // -------------------------------------------------------------------------

  // KMP Search
  const kmpLpsId = "algorithms.separate-components.string-algorithms.kmp.compute-lps";
  components.push(
    createComponent({
      id: kmpLpsId,
      name: "kmp_compute_lps",
      type: "function",
      category: "algorithms",
      subcategory: "string-algorithms",
      categoryId: "algorithms.separate-components.string-algorithms.kmp",
      path: "algorithms/separate-components/string-algorithms/kmp/compute-lps",
      description: "Computes Longest Prefix Suffix (LPS) lookup array for KMP",
      signature: "void kmp_compute_lps(const char* pat, int m, int* lps);",
      code: `void kmp_compute_lps(const char* pat, int m, int* lps) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}`,
      tags: ["string", "kmp", "lps"],
      aliases: ["kmp_compute_lps", "kmpLPS"],
    }),
    createComponent({
      id: "algorithms.separate-components.string-algorithms.kmp.search",
      name: "kmp_search_pattern",
      type: "function",
      category: "algorithms",
      subcategory: "string-algorithms",
      categoryId: "algorithms.separate-components.string-algorithms.kmp",
      path: "algorithms/separate-components/string-algorithms/kmp/search",
      description: "Finds first pattern match index in text in O(n + m)",
      signature: "int kmp_search_pattern(const char* text, const char* pat);",
      code: `int kmp_search_pattern(const char* text, const char* pat) {
    int n = (int)strlen(text);
    int m = (int)strlen(pat);
    if (m == 0) return 0;
    int* lps = (int*)malloc(m * sizeof(int));
    kmp_compute_lps(pat, m, lps);
    int i = 0, j = 0;
    int match_idx = -1;
    while (i < n) {
        if (pat[j] == text[i]) {
            i++;
            j++;
        }
        if (j == m) {
            match_idx = i - j;
            break;
        } else if (i < n && pat[j] != text[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    free(lps);
    return match_idx;
}`,
      dependencies: [kmpLpsId],
      tags: ["string", "kmp", "search"],
      aliases: ["kmp_search_pattern", "kmpSearch"],
    })
  );

  // Rabin-Karp
  components.push(
    createComponent({
      id: "algorithms.separate-components.string-algorithms.rabin-karp.search",
      name: "rabin_karp_search",
      type: "function",
      category: "algorithms",
      subcategory: "string-algorithms",
      categoryId: "algorithms.separate-components.string-algorithms.rabin-karp",
      path: "algorithms/separate-components/string-algorithms/rabin-karp/search",
      description: "Finds pattern in text using rolling hash function",
      signature: "int rabin_karp_search(const char* text, const char* pat, int q);",
      code: `int rabin_karp_search(const char* text, const char* pat, int q) {
    int n = (int)strlen(text);
    int m = (int)strlen(pat);
    int d = 256;
    int p = 0, t = 0, h = 1;
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;
    for (int i = 0; i < m; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + text[i]) % q;
    }
    for (int i = 0; i <= n - m; i++) {
        if (p == t) {
            int match = 1;
            for (int j = 0; j < m; j++) {
                if (text[i + j] != pat[j]) { match = 0; break; }
            }
            if (match) return i;
        }
        if (i < n - m) {
            t = (d * (t - text[i] * h) + text[i + m]) % q;
            if (t < 0) t = t + q;
        }
    }
    return -1;
}`,
      tags: ["string", "rabin-karp", "rolling-hash"],
      aliases: ["rabin_karp_search", "rabinKarp"],
    })
  );

  // Palindromes
  components.push(
    createComponent({
      id: "algorithms.separate-components.string-algorithms.palindromes.longest",
      name: "longest_palindromic_substring",
      type: "function",
      category: "algorithms",
      subcategory: "string-algorithms",
      categoryId: "algorithms.separate-components.string-algorithms.palindromes",
      path: "algorithms/separate-components/string-algorithms/palindromes/longest",
      description: "Finds longest palindromic substring by expanding around centers",
      signature: "void longest_palindromic_substring(const char* str, char* dest);",
      code: `static int expand_center(const char* s, int len, int left, int right) {
    while (left >= 0 && right < len && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

void longest_palindromic_substring(const char* str, char* dest) {
    int n = (int)strlen(str);
    if (n <= 0) { dest[0] = '\0'; return; }
    int start = 0, max_len = 1;
    for (int i = 0; i < n; i++) {
        int len1 = expand_center(str, n, i, i);
        int len2 = expand_center(str, n, i, i + 1);
        int len = len1 > len2 ? len1 : len2;
        if (len > max_len) {
            max_len = len;
            start = i - (len - 1) / 2;
        }
    }
    strncpy(dest, str + start, max_len);
    dest[max_len] = '\0';
}`,
      tags: ["string", "palindromes"],
      aliases: ["longest_palindromic_substring", "longestPalindrome"],
    })
  );

  // =========================================================================
  // SUBDOMAIN 2: FULL PROGRAMS (algorithms.full-programs)
  // Exactly 1 complete interactive suite per subtopic (26 programs)
  // =========================================================================
  components.push(...generateAlgorithmsFullProgramsComponents());

  return components;
}
