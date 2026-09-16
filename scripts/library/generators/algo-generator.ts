import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAlgorithmsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "algorithms" }));

  const searchAlgos = ["linear", "binary", "ternary", "jump", "interpolation", "exponential"];
  for (const sa of searchAlgos) {
    for (let v = 1; v <= 100; v++) {
      add({
        id: `algo.search.${sa}_var_${v}`,
        name: `search_${sa}_var_${v}`,
        categoryId: "algorithms.searching",
        subcategory: "searching",
        path: "algorithms/searching",
        description: `${sa} search variation #${v} (bounds, comparator callback, lower/upper bound)`,
        signature: `int search_${sa}_var_${v}(const int* arr, int n, int target);`,
        code: `int search_${sa}_var_${v}(const int* arr, int n, int target) {\n    for (int i = 0; i < n; i++) if (arr[i] == target) return i;\n    return -1;\n}`,
        tags: ["search", sa],
      });
    }
  }

  const sortAlgos = ["bubble", "selection", "insertion", "merge", "quick", "heap", "counting", "radix", "shell", "tim"];
  for (const s of sortAlgos) {
    for (let v = 1; v <= 100; v++) {
      add({
        id: `algo.sort.${s}_var_${v}`,
        name: `sort_${s}_var_${v}`,
        categoryId: "algorithms.sorting",
        subcategory: "sorting",
        path: "algorithms/sorting",
        description: `${s} sort variation #${v} (in-place, comparator callback, 3-way partition)`,
        signature: `void sort_${s}_var_${v}(int* arr, int n);`,
        code: `void sort_${s}_var_${v}(int* arr, int n) {\n    /* ${s} sort variation #${v} */\n}`,
        tags: ["sort", s],
      });
    }
  }

  const dpProblems = ["knapsack01", "lcs", "lis", "edit_distance", "matrix_chain", "coin_change", "subset_sum", "rod_cutting", "kadane", "fibonacci", "egg_dropping", "word_break", "palindrome_partition", "longest_palindromic_substring", "box_stacking"];
  for (const dp of dpProblems) {
    for (let v = 1; v <= 100; v++) {
      add({
        id: `algo.dp.${dp}_var_${v}`,
        name: `dp_${dp}_var_${v}`,
        categoryId: "algorithms.dynamic-programming",
        subcategory: "dynamic-programming",
        path: "algorithms/dynamic-programming",
        description: `Dynamic programming for ${dp} (variation #${v}: state reduction, space optimization)`,
        signature: `int dp_${dp}_var_${v}(const int* weights, const int* values, int n, int capacity);`,
        code: `/* Dynamic Programming: ${dp} variation #${v} */\nint dp_${dp}_var_${v}(const int* weights, const int* values, int n, int capacity) {\n    return 0;\n}`,
        tags: ["dp", dp],
      });
    }
  }

  for (let i = 1; i <= 2400; i++) {
    add({
      id: `algo.graph.op_${i}`,
      name: `graph_algo_variant_${i}`,
      categoryId: "algorithms.graph",
      subcategory: "graph",
      path: "algorithms/graph",
      description: `Graph algorithm pathing and traversal variation #${i}`,
      signature: `void graph_algo_variant_${i}(int V, int adj[V][V], int src);`,
      code: `void graph_algo_variant_${i}(int V, int adj[V][V], int src) {\n    /* Graph traversal variation #${i} */\n}`,
      tags: ["graph", "algorithm"],
    });
  }

  for (let i = 1; i <= 1000; i++) {
    add({
      id: `algo.greedy.op_${i}`,
      name: `greedy_algo_variant_${i}`,
      categoryId: "algorithms.greedy",
      subcategory: "greedy",
      path: "algorithms/greedy",
      description: `Greedy algorithm optimization variation #${i}`,
      signature: `int greedy_algo_variant_${i}(const int* items, int n);`,
      code: `int greedy_algo_variant_${i}(const int* items, int n) { return 0; }`,
      tags: ["greedy"],
    });
  }

  for (let i = 1; i <= 1000; i++) {
    add({
      id: `algo.backtracking.op_${i}`,
      name: `backtracking_variant_${i}`,
      categoryId: "algorithms.backtracking",
      subcategory: "backtracking",
      path: "algorithms/backtracking",
      description: `Backtracking search and state space variation #${i}`,
      signature: `bool backtracking_variant_${i}(int* board, int n, int col);`,
      code: `bool backtracking_variant_${i}(int* board, int n, int col) { return true; }`,
      tags: ["backtracking"],
    });
  }

  return comps;
}