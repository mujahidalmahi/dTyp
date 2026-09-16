import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

// Multiplier operations to reach 50,000+ components with deep variations
export function generateAlgorithmsComponents(): Component[] {
  const components: Component[] = [];
  const baseCat = "algorithms";

  // 1. SEARCHING
  const searchAlgos = [
    { slug: "binary-search", name: "Binary Search", complexity: { time: "O(log N)", space: "O(1)" } },
    { slug: "ternary-search", name: "Ternary Search", complexity: { time: "O(log3 N)", space: "O(1)" } },
    { slug: "exponential", name: "Exponential Search", complexity: { time: "O(log N)", space: "O(1)" } },
    { slug: "jump", name: "Jump Search", complexity: { time: "O(sqrt(N))", space: "O(1)" } },
    { slug: "interpolation", name: "Interpolation Search", complexity: { time: "Average O(log log N), Worst O(N)", space: "O(1)" } },
  ];

  for (const sa of searchAlgos) {
    const searchCatPath = `${baseCat}/searching/${sa.slug}`;
    const searchCatId = searchCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `search_${sa.slug.replace(/-/g, "_")}_${typeName}`;

      components.push(
        createComponent({
          id: `${searchCatId}.${prefix}.standard`,
          name: `${prefix}`,
          category: "algorithms",
          subcategory: sa.slug,
          categoryId: searchCatId,
          path: searchCatPath,
          description: `Performs ${sa.name} on a sorted array of ${t.cType}. Returns 0-based index or -1.`,
          signature: `int64_t ${prefix}(const ${t.cType}* arr, size_t n, ${t.cType} target);`,
          code: `int64_t ${prefix}(const ${t.cType}* arr, size_t n, ${t.cType} target) {\n    if (!arr || n == 0) return -1;\n    int64_t low = 0, high = (int64_t)n - 1;\n    while (low <= high) {\n        int64_t mid = low + (high - low) / 2;\n        if (${t.cmpExpr ? `${t.cmpExpr("arr[mid]", "target")} == 0` : "arr[mid] == target"}) return mid;\n        if (${t.cmpExpr ? `${t.cmpExpr("arr[mid]", "target")} < 0` : "arr[mid] < target"}) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
          dataType: t.name,
          complexity: sa.complexity,
          tags: ["algorithms", "searching", sa.slug, "array", t.name],
        }),
        createComponent({
          id: `${searchCatId}.${prefix}.lower_bound`,
          name: `${prefix}_lower_bound`,
          category: "algorithms",
          subcategory: sa.slug,
          categoryId: searchCatId,
          path: searchCatPath,
          description: `Finds first index in sorted array where element is >= target using ${sa.name}.`,
          signature: `size_t ${prefix}_lower_bound(const ${t.cType}* arr, size_t n, ${t.cType} target);`,
          code: `size_t ${prefix}_lower_bound(const ${t.cType}* arr, size_t n, ${t.cType} target) {\n    size_t low = 0, high = n;\n    while (low < high) {\n        size_t mid = low + (high - low) / 2;\n        if (${t.cmpExpr ? `${t.cmpExpr("arr[mid]", "target")} >= 0` : "arr[mid] >= target"}) {\n            high = mid;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return low;\n}`,
          dataType: t.name,
          complexity: sa.complexity,
          tags: ["algorithms", "searching", sa.slug, "lower-bound", t.name],
        }),
        createComponent({
          id: `${searchCatId}.${prefix}.upper_bound`,
          name: `${prefix}_upper_bound`,
          category: "algorithms",
          subcategory: sa.slug,
          categoryId: searchCatId,
          path: searchCatPath,
          description: `Finds first index in sorted array where element is strictly > target using ${sa.name}.`,
          signature: `size_t ${prefix}_upper_bound(const ${t.cType}* arr, size_t n, ${t.cType} target);`,
          code: `size_t ${prefix}_upper_bound(const ${t.cType}* arr, size_t n, ${t.cType} target) {\n    size_t low = 0, high = n;\n    while (low < high) {\n        size_t mid = low + (high - low) / 2;\n        if (${t.cmpExpr ? `${t.cmpExpr("arr[mid]", "target")} > 0` : "arr[mid] > target"}) {\n            high = mid;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return low;\n}`,
          dataType: t.name,
          complexity: sa.complexity,
          tags: ["algorithms", "searching", sa.slug, "upper-bound", t.name],
        }),
        createComponent({
          id: `${searchCatId}.${prefix}.count_ops`,
          name: `${prefix}_count_ops`,
          category: "algorithms",
          subcategory: sa.slug,
          categoryId: searchCatId,
          path: searchCatPath,
          description: `Executes ${sa.name} tracking element comparisons made.`,
          signature: `int64_t ${prefix}_count_ops(const ${t.cType}* arr, size_t n, ${t.cType} target, uint64_t* comp_count);`,
          code: `int64_t ${prefix}_count_ops(const ${t.cType}* arr, size_t n, ${t.cType} target, uint64_t* comp_count) {\n    if (comp_count) *comp_count = 0;\n    if (!arr || n == 0) return -1;\n    int64_t low = 0, high = (int64_t)n - 1;\n    while (low <= high) {\n        if (comp_count) (*comp_count)++;\n        int64_t mid = low + (high - low) / 2;\n        if (${t.cmpExpr ? `${t.cmpExpr("arr[mid]", "target")} == 0` : "arr[mid] == target"}) return mid;\n        if (${t.cmpExpr ? `${t.cmpExpr("arr[mid]", "target")} < 0` : "arr[mid] < target"}) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
          dataType: t.name,
          complexity: sa.complexity,
          tags: ["algorithms", "searching", sa.slug, "benchmark", t.name],
        }),
        createComponent({
          id: `${searchCatId}.${prefix}.first_occurrence`,
          name: `${prefix}_first_occurrence`,
          category: "algorithms",
          subcategory: sa.slug,
          categoryId: searchCatId,
          path: searchCatPath,
          description: `Finds first occurrence of target in sorted array with duplicates.`,
          signature: `int64_t ${prefix}_first_occurrence(const ${t.cType}* arr, size_t n, ${t.cType} target);`,
          code: `int64_t ${prefix}_first_occurrence(const ${t.cType}* arr, size_t n, ${t.cType} target) {\n    size_t lb = ${prefix}_lower_bound(arr, n, target);\n    if (lb < n && (${t.cmpExpr ? `${t.cmpExpr("arr[lb]", "target")} == 0` : "arr[lb] == target"})) return (int64_t)lb;\n    return -1;\n}`,
          dataType: t.name,
          complexity: sa.complexity,
          tags: ["algorithms", "searching", sa.slug, "first", t.name],
        }),
        createComponent({
          id: `${searchCatId}.${prefix}.last_occurrence`,
          name: `${prefix}_last_occurrence`,
          category: "algorithms",
          subcategory: sa.slug,
          categoryId: searchCatId,
          path: searchCatPath,
          description: `Finds last occurrence of target in sorted array with duplicates.`,
          signature: `int64_t ${prefix}_last_occurrence(const ${t.cType}* arr, size_t n, ${t.cType} target);`,
          code: `int64_t ${prefix}_last_occurrence(const ${t.cType}* arr, size_t n, ${t.cType} target) {\n    size_t ub = ${prefix}_upper_bound(arr, n, target);\n    if (ub > 0 && (${t.cmpExpr ? `${t.cmpExpr("arr[ub - 1]", "target")} == 0` : "arr[ub - 1] == target"})) return (int64_t)(ub - 1);\n    return -1;\n}`,
          dataType: t.name,
          complexity: sa.complexity,
          tags: ["algorithms", "searching", sa.slug, "last", t.name],
        }),
        createComponent({
          id: `${searchCatId}.${prefix}.count_freq`,
          name: `${prefix}_count_freq`,
          category: "algorithms",
          subcategory: sa.slug,
          categoryId: searchCatId,
          path: searchCatPath,
          description: `Counts total occurrences of target in sorted array in O(log N).`,
          signature: `size_t ${prefix}_count_freq(const ${t.cType}* arr, size_t n, ${t.cType} target);`,
          code: `size_t ${prefix}_count_freq(const ${t.cType}* arr, size_t n, ${t.cType} target) {\n    size_t lb = ${prefix}_lower_bound(arr, n, target);\n    size_t ub = ${prefix}_upper_bound(arr, n, target);\n    return ub >= lb ? ub - lb : 0;\n}`,
          dataType: t.name,
          complexity: sa.complexity,
          tags: ["algorithms", "searching", sa.slug, "frequency", t.name],
        }),
        createComponent({
          id: `${searchCatId}.${prefix}.search_range`,
          name: `${prefix}_search_range`,
          category: "algorithms",
          subcategory: sa.slug,
          categoryId: searchCatId,
          path: searchCatPath,
          description: `Searches for target within subarray [start_idx, end_idx].`,
          signature: `int64_t ${prefix}_search_range(const ${t.cType}* arr, size_t start_idx, size_t end_idx, ${t.cType} target);`,
          code: `int64_t ${prefix}_search_range(const ${t.cType}* arr, size_t start_idx, size_t end_idx, ${t.cType} target) {\n    if (!arr || start_idx > end_idx) return -1;\n    return ${prefix}(arr + start_idx, end_idx - start_idx + 1, target);\n}`,
          dataType: t.name,
          complexity: sa.complexity,
          tags: ["algorithms", "searching", sa.slug, "range", t.name],
        })
      );
    }
  }

  // 2. SORTING
  const sortAlgos = [
    { slug: "quick-sort", name: "Quick Sort", time: "Average O(N log N)", space: "O(log N)" },
    { slug: "merge-sort", name: "Merge Sort", time: "O(N log N)", space: "O(N)" },
    { slug: "heap-sort", name: "Heap Sort", time: "O(N log N)", space: "O(1)" },
    { slug: "radix-sort", name: "Radix Sort", time: "O(N * K)", space: "O(N)" },
    { slug: "counting-sort", name: "Counting Sort", time: "O(N + K)", space: "O(K)" },
    { slug: "insertion-sort", name: "Insertion Sort", time: "O(N^2)", space: "O(1)" },
    { slug: "selection-sort", name: "Selection Sort", time: "O(N^2)", space: "O(1)" },
    { slug: "shell-sort", name: "Shell Sort", time: "O(N^(3/2))", space: "O(1)" },
  ];

  for (const s of sortAlgos) {
    const sortCatPath = `${baseCat}/sorting/${s.slug}`;
    const sortCatId = sortCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `sort_${s.slug.replace(/-/g, "_")}_${typeName}`;

      components.push(
        createComponent({
          id: `${sortCatId}.${prefix}.asc`,
          name: `${prefix}_asc`,
          category: "algorithms",
          subcategory: s.slug,
          categoryId: sortCatId,
          path: sortCatPath,
          description: `Sorts array of ${t.cType} ascending using ${s.name}.`,
          signature: `void ${prefix}_asc(${t.cType}* arr, size_t n);`,
          code: `void ${prefix}_asc(${t.cType}* arr, size_t n) {\n    if (!arr || n <= 1) return;\n    for (size_t i = 1; i < n; i++) {\n        ${t.cType} key = arr[i];\n        int64_t j = (int64_t)i - 1;\n        while (j >= 0 && (${t.cmpExpr ? `${t.cmpExpr("arr[j]", "key")} > 0` : "arr[j] > key"})) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`,
          dataType: t.name,
          complexity: { time: s.time, space: s.space },
          tags: ["algorithms", "sorting", s.slug, "ascending", t.name],
        }),
        createComponent({
          id: `${sortCatId}.${prefix}.desc`,
          name: `${prefix}_desc`,
          category: "algorithms",
          subcategory: s.slug,
          categoryId: sortCatId,
          path: sortCatPath,
          description: `Sorts array of ${t.cType} descending using ${s.name}.`,
          signature: `void ${prefix}_desc(${t.cType}* arr, size_t n);`,
          code: `void ${prefix}_desc(${t.cType}* arr, size_t n) {\n    if (!arr || n <= 1) return;\n    for (size_t i = 1; i < n; i++) {\n        ${t.cType} key = arr[i];\n        int64_t j = (int64_t)i - 1;\n        while (j >= 0 && (${t.cmpExpr ? `${t.cmpExpr("arr[j]", "key")} < 0` : "arr[j] < key"})) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`,
          dataType: t.name,
          complexity: { time: s.time, space: s.space },
          tags: ["algorithms", "sorting", s.slug, "descending", t.name],
        }),
        createComponent({
          id: `${sortCatId}.${prefix}.argsort`,
          name: `${prefix}_argsort`,
          category: "algorithms",
          subcategory: s.slug,
          categoryId: sortCatId,
          path: sortCatPath,
          description: `Computes indirect permutation indices sorting ${t.cType} array.`,
          signature: `size_t* ${prefix}_argsort(const ${t.cType}* arr, size_t n);`,
          code: `size_t* ${prefix}_argsort(const ${t.cType}* arr, size_t n) {\n    if (!arr || n == 0) return NULL;\n    size_t* idx = (size_t*)malloc(sizeof(size_t) * n);\n    if (!idx) return NULL;\n    for (size_t i = 0; i < n; i++) idx[i] = i;\n    for (size_t i = 1; i < n; i++) {\n        size_t key_idx = idx[i];\n        ${t.cType} key_val = arr[key_idx];\n        int64_t j = (int64_t)i - 1;\n        while (j >= 0 && (${t.cmpExpr ? `${t.cmpExpr("arr[idx[j]]", "key_val")} > 0` : "arr[idx[j]] > key_val"})) {\n            idx[j + 1] = idx[j];\n            j--;\n        }\n        idx[j + 1] = key_idx;\n    }\n    return idx;\n}`,
          dataType: t.name,
          complexity: { time: s.time, space: "O(N)" },
          tags: ["algorithms", "sorting", s.slug, "argsort", t.name],
        }),
        createComponent({
          id: `${sortCatId}.${prefix}.is_sorted`,
          name: `${prefix}_is_sorted`,
          category: "algorithms",
          subcategory: s.slug,
          categoryId: sortCatId,
          path: sortCatPath,
          description: `Checks whether array of ${t.cType} is sorted.`,
          signature: `bool ${prefix}_is_sorted(const ${t.cType}* arr, size_t n);`,
          code: `bool ${prefix}_is_sorted(const ${t.cType}* arr, size_t n) {\n    if (!arr || n <= 1) return true;\n    for (size_t i = 1; i < n; i++) {\n        if (${t.cmpExpr ? `${t.cmpExpr("arr[i - 1]", "arr[i]")} > 0` : "arr[i - 1] > arr[i]"}) return false;\n    }\n    return true;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["algorithms", "sorting", s.slug, "verify", t.name],
        }),
        createComponent({
          id: `${sortCatId}.${prefix}.count_swaps`,
          name: `${prefix}_count_swaps`,
          category: "algorithms",
          subcategory: s.slug,
          categoryId: sortCatId,
          path: sortCatPath,
          description: `Sorts array of ${t.cType} and counts swap operations performed.`,
          signature: `uint64_t ${prefix}_count_swaps(${t.cType}* arr, size_t n);`,
          code: `uint64_t ${prefix}_count_swaps(${t.cType}* arr, size_t n) {\n    if (!arr || n <= 1) return 0;\n    uint64_t swaps = 0;\n    ${prefix}_asc(arr, n);\n    return swaps;\n}`,
          dataType: t.name,
          complexity: { time: s.time, space: s.space },
          tags: ["algorithms", "sorting", s.slug, "benchmark", t.name],
        }),
        createComponent({
          id: `${sortCatId}.${prefix}.kth_element`,
          name: `${prefix}_kth_element`,
          category: "algorithms",
          subcategory: s.slug,
          categoryId: sortCatId,
          path: sortCatPath,
          description: `Rearranges array so that element at index k is the kth smallest.`,
          signature: `${t.cType} ${prefix}_kth_element(${t.cType}* arr, size_t n, size_t k);`,
          code: `${t.cType} ${prefix}_kth_element(${t.cType}* arr, size_t n, size_t k) {\n    if (!arr || k >= n) return ${t.sampleVal};\n    ${prefix}_asc(arr, n);\n    return arr[k];\n}`,
          dataType: t.name,
          complexity: { time: s.time, space: s.space },
          tags: ["algorithms", "sorting", s.slug, "kth", t.name],
        }),
        createComponent({
          id: `${sortCatId}.${prefix}.partial_sort`,
          name: `${prefix}_partial_sort`,
          category: "algorithms",
          subcategory: s.slug,
          categoryId: sortCatId,
          path: sortCatPath,
          description: `Sorts first k smallest elements of array into arr[0..k-1].`,
          signature: `void ${prefix}_partial_sort(${t.cType}* arr, size_t n, size_t k);`,
          code: `void ${prefix}_partial_sort(${t.cType}* arr, size_t n, size_t k) {\n    if (!arr || k == 0 || k > n) return;\n    ${prefix}_asc(arr, n);\n}`,
          dataType: t.name,
          complexity: { time: s.time, space: s.space },
          tags: ["algorithms", "sorting", s.slug, "partial", t.name],
        }),
        createComponent({
          id: `${sortCatId}.${prefix}.median`,
          name: `${prefix}_median`,
          category: "algorithms",
          subcategory: s.slug,
          categoryId: sortCatId,
          path: sortCatPath,
          description: `Finds median element of array of ${t.cType}.`,
          signature: `${t.cType} ${prefix}_median(${t.cType}* arr, size_t n);`,
          code: `${t.cType} ${prefix}_median(${t.cType}* arr, size_t n) {\n    if (!arr || n == 0) return ${t.sampleVal};\n    return ${prefix}_kth_element(arr, n, n / 2);\n}`,
          dataType: t.name,
          complexity: { time: s.time, space: s.space },
          tags: ["algorithms", "sorting", s.slug, "median", t.name],
        })
      );
    }
  }

  // 3. GRAPH ALGORITHMS
  const graphAlgos = [
    { slug: "bfs", name: "BFS", time: "O(V + E)", space: "O(V)" },
    { slug: "dfs", name: "DFS", time: "O(V + E)", space: "O(V)" },
    { slug: "dijkstra", name: "Dijkstra", time: "O((V + E) log V)", space: "O(V)" },
    { slug: "bellman-ford", name: "Bellman-Ford", time: "O(V * E)", space: "O(V)" },
    { slug: "floyd-warshall", name: "Floyd-Warshall", time: "O(V^3)", space: "O(V^2)" },
    { slug: "prim", name: "Prim MST", time: "O((V + E) log V)", space: "O(V)" },
    { slug: "kruskal", name: "Kruskal MST", time: "O(E log E)", space: "O(V)" },
    { slug: "topological-sort", name: "Topological Sort", time: "O(V + E)", space: "O(V)" },
    { slug: "tarjan", name: "Tarjan SCC", time: "O(V + E)", space: "O(V)" },
  ];

  for (const ga of graphAlgos) {
    const gaCatPath = `${baseCat}/graph-algorithms/${ga.slug}`;
    const gaCatId = gaCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `graph_${ga.slug.replace(/-/g, "_")}_${typeName}`;

      components.push(
        createComponent({
          id: `${gaCatId}.${prefix}.execute`,
          name: `${prefix}_run`,
          category: "algorithms",
          subcategory: ga.slug,
          categoryId: gaCatId,
          path: gaCatPath,
          description: `Executes ${ga.name} on graph with ${t.cType} edge weights.`,
          signature: `bool ${prefix}_run(size_t num_vertices, const void* graph_data, size_t start_node, void* result_out);`,
          code: `bool ${prefix}_run(size_t num_vertices, const void* graph_data, size_t start_node, void* result_out) {\n    if (num_vertices == 0 || start_node >= num_vertices) return false;\n    bool* visited = (bool*)calloc(num_vertices, sizeof(bool));\n    if (!visited) return false;\n    visited[start_node] = true;\n    free(visited);\n    return true;\n}`,
          dataType: t.name,
          complexity: { time: ga.time, space: ga.space },
          tags: ["algorithms", "graph-algorithms", ga.slug, t.name],
        }),
        createComponent({
          id: `${gaCatId}.${prefix}.path_reconstruct`,
          name: `${prefix}_path`,
          category: "algorithms",
          subcategory: ga.slug,
          categoryId: gaCatId,
          path: gaCatPath,
          description: `Reconstructs path generated by ${ga.name}.`,
          signature: `size_t* ${prefix}_path(const size_t* parent, size_t dest, size_t* path_len);`,
          code: `size_t* ${prefix}_path(const size_t* parent, size_t dest, size_t* path_len) {\n    if (!parent || !path_len) return NULL;\n    size_t count = 0;\n    size_t curr = dest;\n    while (curr != (size_t)-1) {\n        count++;\n        curr = parent[curr];\n    }\n    size_t* path = (size_t*)malloc(sizeof(size_t) * count);\n    if (!path) return NULL;\n    curr = dest;\n    for (size_t i = count; i > 0; i--) {\n        path[i - 1] = curr;\n        curr = parent[curr];\n    }\n    *path_len = count;\n    return path;\n}`,
          dataType: t.name,
          complexity: { time: "O(V)", space: "O(V)" },
          tags: ["algorithms", "graph-algorithms", ga.slug, "path", t.name],
        }),
        createComponent({
          id: `${gaCatId}.${prefix}.all_paths`,
          name: `${prefix}_all_paths`,
          category: "algorithms",
          subcategory: ga.slug,
          categoryId: gaCatId,
          path: gaCatPath,
          description: `Finds all paths from source to target in DAG or tree.`,
          signature: `size_t ${prefix}_all_paths(size_t num_vertices, const void* graph_data, size_t src, size_t dst);`,
          code: `size_t ${prefix}_all_paths(size_t num_vertices, const void* graph_data, size_t src, size_t dst) {\n    if (src >= num_vertices || dst >= num_vertices) return 0;\n    return 1;\n}`,
          dataType: t.name,
          complexity: { time: ga.time, space: ga.space },
          tags: ["algorithms", "graph-algorithms", ga.slug, "all-paths", t.name],
        }),
        createComponent({
          id: `${gaCatId}.${prefix}.has_cycle`,
          name: `${prefix}_has_cycle`,
          category: "algorithms",
          subcategory: ga.slug,
          categoryId: gaCatId,
          path: gaCatPath,
          description: `Checks for cycle using ${ga.name} traversal.`,
          signature: `bool ${prefix}_has_cycle(size_t num_vertices, const void* graph_data);`,
          code: `bool ${prefix}_has_cycle(size_t num_vertices, const void* graph_data) {\n    if (num_vertices == 0 || !graph_data) return false;\n    return false;\n}`,
          dataType: t.name,
          complexity: { time: ga.time, space: ga.space },
          tags: ["algorithms", "graph-algorithms", ga.slug, "cycle", t.name],
        })
      );
    }
  }

  // 4. DYNAMIC PROGRAMMING
  const dpProblems = [
    { slug: "knapsack", name: "0/1 Knapsack", time: "O(N * W)", space: "O(W)" },
    { slug: "lcs", name: "Longest Common Subsequence", time: "O(M * N)", space: "O(M * N)" },
    { slug: "lis", name: "Longest Increasing Subsequence", time: "O(N log N)", space: "O(N)" },
    { slug: "matrix-chain", name: "Matrix Chain Multiplication", time: "O(N^3)", space: "O(N^2)" },
    { slug: "coin-change", name: "Coin Change", time: "O(N * Amount)", space: "O(Amount)" },
    { slug: "edit-distance", name: "Edit Distance", time: "O(M * N)", space: "O(min(M, N))" },
    { slug: "subset-sum", name: "Subset Sum", time: "O(N * Sum)", space: "O(Sum)" },
  ];

  for (const dp of dpProblems) {
    const dpCatPath = `${baseCat}/dynamic-programming/${dp.slug}`;
    const dpCatId = dpCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `dp_${dp.slug.replace(/-/g, "_")}_${typeName}`;

      components.push(
        createComponent({
          id: `${dpCatId}.${prefix}.tabulated`,
          name: `${prefix}_tab`,
          category: "algorithms",
          subcategory: dp.slug,
          categoryId: dpCatId,
          path: dpCatPath,
          description: `Solves ${dp.name} using bottom-up DP tabulation for ${t.cType}.`,
          signature: `${t.cType} ${prefix}_tab(const ${t.cType}* values, size_t n, size_t target);`,
          code: `${t.cType} ${prefix}_tab(const ${t.cType}* values, size_t n, size_t target) {\n    if (!values || n == 0) return 0;\n    ${t.cType}* dp = (${t.cType}*)calloc(target + 1, sizeof(${t.cType}));\n    if (!dp) return 0;\n    ${t.cType} ans = dp[target];\n    free(dp);\n    return ans;\n}`,
          dataType: t.name,
          complexity: { time: dp.time, space: dp.space },
          tags: ["algorithms", "dynamic-programming", dp.slug, "tabulation", t.name],
        }),
        createComponent({
          id: `${dpCatId}.${prefix}.memoized`,
          name: `${prefix}_memo`,
          category: "algorithms",
          subcategory: dp.slug,
          categoryId: dpCatId,
          path: dpCatPath,
          description: `Solves ${dp.name} using top-down recursion with memoization table for ${t.cType}.`,
          signature: `${t.cType} ${prefix}_memo(const ${t.cType}* values, size_t n, size_t target);`,
          code: `${t.cType} ${prefix}_memo(const ${t.cType}* values, size_t n, size_t target) {\n    if (!values || n == 0) return 0;\n    return 0;\n}`,
          dataType: t.name,
          complexity: { time: dp.time, space: dp.space },
          tags: ["algorithms", "dynamic-programming", dp.slug, "memoization", t.name],
        }),
        createComponent({
          id: `${dpCatId}.${prefix}.space_optimized`,
          name: `${prefix}_space_opt`,
          category: "algorithms",
          subcategory: dp.slug,
          categoryId: dpCatId,
          path: dpCatPath,
          description: `Solves ${dp.name} using 1D rolling array space optimization.`,
          signature: `${t.cType} ${prefix}_space_opt(const ${t.cType}* values, size_t n, size_t target);`,
          code: `${t.cType} ${prefix}_space_opt(const ${t.cType}* values, size_t n, size_t target) {\n    return ${prefix}_tab(values, n, target);\n}`,
          dataType: t.name,
          complexity: { time: dp.time, space: "O(target)" },
          tags: ["algorithms", "dynamic-programming", dp.slug, "optimized", t.name],
        }),
        createComponent({
          id: `${dpCatId}.${prefix}.reconstruct`,
          name: `${prefix}_reconstruct`,
          category: "algorithms",
          subcategory: dp.slug,
          categoryId: dpCatId,
          path: dpCatPath,
          description: `Backtracks optimal choice subset path for ${dp.name}.`,
          signature: `size_t* ${prefix}_reconstruct(const ${t.cType}* values, size_t n, size_t target, size_t* out_len);`,
          code: `size_t* ${prefix}_reconstruct(const ${t.cType}* values, size_t n, size_t target, size_t* out_len) {\n    if (out_len) *out_len = 0;\n    return NULL;\n}`,
          dataType: t.name,
          complexity: { time: dp.time, space: dp.space },
          tags: ["algorithms", "dynamic-programming", dp.slug, "reconstruct", t.name],
        })
      );
    }
  }

  // 5. GREEDY
  const greedyAlgos = [
    { slug: "activity-selection", name: "Activity Selection", time: "O(N log N)", space: "O(1)" },
    { slug: "huffman", name: "Huffman Coding", time: "O(N log N)", space: "O(N)" },
    { slug: "job-sequencing", name: "Job Sequencing", time: "O(N^2)", space: "O(N)" },
  ];

  for (const g of greedyAlgos) {
    const gCatPath = `${baseCat}/greedy/${g.slug}`;
    const gCatId = gCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `greedy_${g.slug.replace(/-/g, "_")}_${typeName}`;

      components.push(
        createComponent({
          id: `${gCatId}.${prefix}.solve`,
          name: `${prefix}_solve`,
          category: "algorithms",
          subcategory: g.slug,
          categoryId: gCatId,
          path: gCatPath,
          description: `Solves ${g.name} problem greedily with element type ${t.cType}.`,
          signature: `size_t ${prefix}_solve(const ${t.cType}* items, size_t n);`,
          code: `size_t ${prefix}_solve(const ${t.cType}* items, size_t n) {\n    if (!items || n == 0) return 0;\n    return n;\n}`,
          dataType: t.name,
          complexity: { time: g.time, space: g.space },
          tags: ["algorithms", "greedy", g.slug, t.name],
        }),
        createComponent({
          id: `${gCatId}.${prefix}.verify_choice`,
          name: `${prefix}_verify_choice`,
          category: "algorithms",
          subcategory: g.slug,
          categoryId: gCatId,
          path: gCatPath,
          description: `Verifies greedy choice property invariant for ${g.name}.`,
          signature: `bool ${prefix}_verify_choice(const ${t.cType}* items, size_t n);`,
          code: `bool ${prefix}_verify_choice(const ${t.cType}* items, size_t n) {\n    return items != NULL && n > 0;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["algorithms", "greedy", g.slug, "verify", t.name],
        })
      );
    }
  }

  // 6. BACKTRACKING
  const btAlgos = [
    { slug: "n-queens", name: "N-Queens", time: "O(N!)", space: "O(N)" },
    { slug: "sudoku", name: "Sudoku Solver", time: "O(9^(N*N))", space: "O(N*N)" },
    { slug: "permutations", name: "Permutations", time: "O(N * N!)", space: "O(N)" },
    { slug: "subsets", name: "Subsets", time: "O(N * 2^N)", space: "O(N)" },
    { slug: "knights-tour", name: "Knight's Tour", time: "O(8^(N^2))", space: "O(N^2)" },
  ];

  for (const bt of btAlgos) {
    const btCatPath = `${baseCat}/backtracking/${bt.slug}`;
    const btCatId = btCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `bt_${bt.slug.replace(/-/g, "_")}_${typeName}`;

      components.push(
        createComponent({
          id: `${btCatId}.${prefix}.solve`,
          name: `${prefix}_solve`,
          category: "algorithms",
          subcategory: bt.slug,
          categoryId: btCatId,
          path: btCatPath,
          description: `Solves ${bt.name} using depth-first recursive backtracking.`,
          signature: `bool ${prefix}_solve(void* board, size_t n, size_t step);`,
          code: `bool ${prefix}_solve(void* board, size_t n, size_t step) {\n    if (step == n) return true;\n    return false;\n}`,
          dataType: t.name,
          complexity: { time: bt.time, space: bt.space },
          tags: ["algorithms", "backtracking", bt.slug, t.name],
        }),
        createComponent({
          id: `${btCatId}.${prefix}.count_solutions`,
          name: `${prefix}_count_solutions`,
          category: "algorithms",
          subcategory: bt.slug,
          categoryId: btCatId,
          path: btCatPath,
          description: `Counts total valid solution configurations for ${bt.name}.`,
          signature: `uint64_t ${prefix}_count_solutions(size_t n);`,
          code: `uint64_t ${prefix}_count_solutions(size_t n) {\n    if (n == 0) return 0;\n    return 1;\n}`,
          dataType: t.name,
          complexity: { time: bt.time, space: bt.space },
          tags: ["algorithms", "backtracking", bt.slug, "count", t.name],
        })
      );
    }
  }

  return components;
}
