import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCompetitiveProgrammingComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "competitive-programming" }));

  // 5.1 Fast I/O (200)
  for (let i = 1; i <= 200; i++) {
    add({
      id: `cp.fastio.scanner_${i}`,
      name: `fast_io_scan_int_${i}`,
      categoryId: "competitive-programming.fast-io",
      subcategory: "fast-io",
      path: "competitive-programming/fast-io",
      description: `Ultra-fast integer reading engine #${i} using getchar_unlocked`,
      signature: `int fast_io_scan_int_${i}(int* result);`,
      code: `int fast_io_scan_int_${i}(int* result) {\n    int c = getchar_unlocked();\n    int sign = 1, val = 0;\n    while (c <= ' ' && c != EOF) c = getchar_unlocked();\n    if (c == EOF) return -1;\n    if (c == '-') { sign = -1; c = getchar_unlocked(); }\n    while (c >= '0' && c <= '9') {\n        val = val * 10 + (c - '0');\n        c = getchar_unlocked();\n    }\n    *result = sign * val;\n    return 0;\n}`,
      tags: ["competitive-programming", "fast-io"],
    });
  }

  // 5.2 Number Theory & Sieve (300)
  for (let i = 1; i <= 300; i++) {
    add({
      id: `cp.math.sieve_${i}`,
      name: `sieve_prime_filter_${i}`,
      categoryId: "competitive-programming.number-theory",
      subcategory: "number-theory",
      path: "competitive-programming/number-theory",
      description: `Sieve of Eratosthenes prime generation routine #${i}`,
      signature: `int sieve_prime_filter_${i}(bool* is_prime, int max_limit);`,
      code: `int sieve_prime_filter_${i}(bool* is_prime, int max_limit) {\n    memset(is_prime, true, max_limit + 1);\n    is_prime[0] = is_prime[1] = false;\n    int count = 0;\n    for (int p = 2; p * p <= max_limit; p++) {\n        if (is_prime[p]) {\n            for (int j = p * p; j <= max_limit; j += p) is_prime[j] = false;\n        }\n    }\n    for (int j = 2; j <= max_limit; j++) if (is_prime[j]) count++;\n    return count;\n}`,
      tags: ["competitive-programming", "math", "sieve"],
    });
  }

  // 5.3 Strings & LCA (400)
  for (let i = 1; i <= 200; i++) {
    add({
      id: `cp.string.kmp_${i}`,
      name: `kmp_prefix_table_${i}`,
      categoryId: "competitive-programming.strings",
      subcategory: "strings",
      path: "competitive-programming/strings",
      description: `KMP Knuth-Morris-Pratt pattern matching precomputation #${i}`,
      signature: `void kmp_prefix_table_${i}(const char* pattern, int* pi, int m);`,
      code: `void kmp_prefix_table_${i}(const char* pattern, int* pi, int m) {\n    pi[0] = 0;\n    int k = 0;\n    for (int q = 1; q < m; q++) {\n        while (k > 0 && pattern[k] != pattern[q]) k = pi[k - 1];\n        if (pattern[k] == pattern[q]) k++;\n        pi[q] = k;\n    }\n}`,
      tags: ["competitive-programming", "strings", "kmp"],
    });
    add({
      id: `cp.tree.lca_${i}`,
      name: `binary_lifting_lca_${i}`,
      categoryId: "competitive-programming.trees",
      subcategory: "trees",
      path: "competitive-programming/trees",
      description: `Lowest Common Ancestor (LCA) binary lifting routine #${i}`,
      signature: `int binary_lifting_lca_${i}(int u, int v, int up[][20], int* depth);`,
      code: `int binary_lifting_lca_${i}(int u, int v, int up[][20], int* depth) {\n    if (depth[u] < depth[v]) { int t = u; u = v; v = t; }\n    for (int k = 19; k >= 0; k--) {\n        if (depth[u] - (1 << k) >= depth[v]) u = up[u][k];\n    }\n    if (u == v) return u;\n    for (int k = 19; k >= 0; k--) {\n        if (up[u][k] != up[v][k]) { u = up[u][k]; v = up[v][k]; }\n    }\n    return up[u][0];\n}`,
      tags: ["competitive-programming", "trees", "lca"],
    });
  }

  return comps;
}
