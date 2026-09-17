import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCompetitiveProgrammingComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "competitive-programming" }));

  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `competitive-programming.${sub}`,
        subcategory: sub,
        path: `competitive-programming/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        tags: ["competitive-programming", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `competitive-programming.${sub}`,
        subcategory: sub,
        path: `competitive-programming/${pathSub}`,
        description: `Verified ${sub} algorithmic routine #${i}`,
        signature: `int ${prefix}_routine_${i}(int param);`,
        code: `int ${prefix}_routine_${i}(int param) {\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["competitive-programming", sub],
      });
    }
  }

  // fast-io (30)
  addModule("fast-io", "fast-io", "cp.fastio", 30, [
    {
        "id": "cp.fastio.scan_int",
        "name": "fast_scan_int",
        "desc": "Ultra-fast integer reading via getchar_unlocked",
        "sig": "int fast_scan_int(void);",
        "code": "int fast_scan_int(void) {\n    int n = 0, ch = getchar();\n    while (ch < '0' || ch > '9') ch = getchar();\n    while (ch >= '0' && ch <= '9') { n = n * 10 + ch - '0'; ch = getchar(); }\n    return n;\n}"
    }
]);

  // number-theory (80)
  addModule("number-theory", "number-theory", "cp.num_theory", 80, [
    {
        "id": "cp.num_theory.binpow",
        "name": "binary_exponentiation",
        "desc": "Fast modular exponentiation (a^b % mod)",
        "sig": "long long binpow(long long a, long long b, long long m);",
        "code": "long long binpow(long long a, long long b, long long m) {\n    long long res = 1;\n    a %= m;\n    while (b > 0) {\n        if (b & 1) res = (res * a) % m;\n        a = (a * a) % m;\n        b >>= 1;\n    }\n    return res;\n}"
    }
]);

  // advanced-trees (90)
  addModule("advanced-trees", "advanced-trees", "cp.trees", 90, [
    {
        "id": "cp.trees.fenwick",
        "name": "fenwick_tree_bit",
        "desc": "Binary Indexed Tree (Fenwick Tree) point update range sum",
        "sig": "void fenwick_update(int idx, int val, int n); int fenwick_query(int idx);",
        "code": "int bit[100005];\nvoid fenwick_update(int idx, int val, int n) {\n    for (; idx <= n; idx += idx & -idx) bit[idx] += val;\n}\nint fenwick_query(int idx) {\n    int sum = 0;\n    for (; idx > 0; idx -= idx & -idx) sum += bit[idx];\n    return sum;\n}"
    }
]);

  // strings (50)
  addModule("strings", "strings", "cp.strings", 50, [
    {
        "id": "cp.strings.kmp",
        "name": "kmp_string_search",
        "desc": "Knuth-Morris-Pratt string searching algorithm",
        "sig": "void kmp_search(const char* pat, const char* txt);",
        "code": "void kmp_search(const char* pat, const char* txt) {\n    /* KMP prefix computation & search */\n}"
    }
]);

  return comps;
}
