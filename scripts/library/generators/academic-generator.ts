import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAcademicProgrammingComponents(): Component[] {
  const components: Component[] = [];

  // =========================================================================
  // TOPIC 1: DISCRETE MATHEMATICS
  // =========================================================================

  // 1. Truth Table Generator
  components.push(
    createComponent({
      id: "academics-programming.discrete-mathematics.logic-set-theory.truth-tables.prog-truth-tables",
      name: "prog_acad_truth_tables",
      type: "program",
      category: "academics-programming",
      subcategory: "discrete-mathematics",
      categoryId: "academics-programming.discrete-mathematics.logic-set-theory.truth-tables",
      path: "academics-programming/discrete-mathematics/logic-set-theory/truth-tables/prog-truth-tables",
      description: "Evaluates and prints complete truth tables for basic and compound logical operations",
      signature: "int main(void);",
      code: `#include <stdio.h>

int op_and(int a, int b) { return a && b; }
int op_or(int a, int b) { return a || b; }
int op_xor(int a, int b) { return a ^ b; }
int op_implies(int a, int b) { return (!a) || b; }
int op_bicond(int a, int b) { return a == b; }

void print_truth_table(int (*op)(int, int), const char* op_name) {
    printf("--- %s ---\n", op_name);
    printf("A | B | Result\n");
    printf("--+---+-------\n");
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            printf("%d | %d |   %d\n", a, b, op(a, b));
        }
    }
}

int main(void) {
    print_truth_table(op_and, "A AND B");
    print_truth_table(op_or, "A OR B");
    print_truth_table(op_xor, "A XOR B");
    print_truth_table(op_implies, "A -> B");
    print_truth_table(op_bicond, "A <-> B");
    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "logic", "truth-tables"],
      aliases: ["prog_acad_truth_tables"],
    })
  );

  // 2. Set Operations
  components.push(
    createComponent({
      id: "academics-programming.discrete-mathematics.logic-set-theory.set-operations.prog-set-operations",
      name: "prog_acad_set_operations",
      type: "program",
      category: "academics-programming",
      subcategory: "discrete-mathematics",
      categoryId: "academics-programming.discrete-mathematics.logic-set-theory.set-operations",
      path: "academics-programming/discrete-mathematics/logic-set-theory/set-operations/prog-set-operations",
      description: "Computes set union, intersection, and set difference on user-specified sets",
      signature: "int main(void);",
      code: `#include <stdio.h>

int set_contains(const int* set, int size, int val) {
    for (int i = 0; i < size; i++) {
        if (set[i] == val) return 1;
    }
    return 0;
}

int set_union(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) out[count++] = A[i];
    for (int i = 0; i < sizeB; i++) {
        if (!set_contains(A, sizeA, B[i])) out[count++] = B[i];
    }
    return count;
}

int set_intersection(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    return count;
}

int set_difference(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (!set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    return count;
}

void print_set(const char* label, const int* set, int size) {
    printf("%s: { ", label);
    for (int i = 0; i < size; i++) {
        printf("%d%s", set[i], (i < size - 1) ? ", " : " ");
    }
    printf("}\n");
}

int main(void) {
    int A[] = {1, 2, 3, 4, 5};
    int B[] = {3, 4, 5, 6, 7};
    int sizeA = 5, sizeB = 5;
    int res[15];

    print_set("Set A", A, sizeA);
    print_set("Set B", B, sizeB);

    int u_len = set_union(A, sizeA, B, sizeB, res);
    print_set("A Union B", res, u_len);

    int i_len = set_intersection(A, sizeA, B, sizeB, res);
    print_set("A Intersect B", res, i_len);

    int d_len = set_difference(A, sizeA, B, sizeB, res);
    print_set("A Difference B", res, d_len);

    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "sets"],
      aliases: ["prog_acad_set_operations"],
    })
  );

  // 3. Equivalence Relations
  components.push(
    createComponent({
      id: "academics-programming.discrete-mathematics.relations-combinatorics.equivalence-relations.prog-equivalence-relations",
      name: "prog_acad_equivalence_relations",
      type: "program",
      category: "academics-programming",
      subcategory: "discrete-mathematics",
      categoryId: "academics-programming.discrete-mathematics.relations-combinatorics.equivalence-relations",
      path: "academics-programming/discrete-mathematics/relations-combinatorics/equivalence-relations/prog-equivalence-relations",
      description: "Verifies reflexivity, symmetry, and transitivity of a relation and prints equivalence classes",
      signature: "int main(void);",
      code: `#include <stdio.h>

int check_reflexive(int n, const int rel[n][n]) {
    for (int i = 0; i < n; i++) {
        if (!rel[i][i]) return 0;
    }
    return 1;
}

int check_symmetric(int n, const int rel[n][n]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (rel[i][j] != rel[j][i]) return 0;
        }
    }
    return 1;
}

int check_transitive(int n, const int rel[n][n]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (rel[i][j]) {
                for (int k = 0; k < n; k++) {
                    if (rel[j][k] && !rel[i][k]) return 0;
                }
            }
        }
    }
    return 1;
}

void print_equivalence_classes(int n, const int rel[n][n]) {
    int visited[n];
    for (int i = 0; i < n; i++) visited[i] = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            printf("[Class]: { ");
            for (int j = 0; j < n; j++) {
                if (rel[i][j]) {
                    visited[j] = 1;
                    printf("%d ", j);
                }
            }
            printf("}\n");
        }
    }
}

int main(void) {
    int n = 4;
    int rel[4][4] = {
        {1, 1, 0, 0},
        {1, 1, 0, 0},
        {0, 0, 1, 1},
        {0, 0, 1, 1}
    };
    int r = check_reflexive(n, rel);
    int s = check_symmetric(n, rel);
    int t = check_transitive(n, rel);
    printf("Reflexive: %s\n", r ? "Yes" : "No");
    printf("Symmetric: %s\n", s ? "Yes" : "No");
    printf("Transitive: %s\n", t ? "Yes" : "No");
    if (r && s && t) {
        printf("Equivalence Relation: Yes\n");
        print_equivalence_classes(n, rel);
    } else {
        printf("Equivalence Relation: No\n");
    }
    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "relations"],
      aliases: ["prog_acad_equivalence_relations"],
    })
  );

  // 4. Permutations & Combinations
  components.push(
    createComponent({
      id: "academics-programming.discrete-mathematics.relations-combinatorics.permutations-combinations.prog-permutations-combinations",
      name: "prog_acad_permutations_combinations",
      type: "program",
      category: "academics-programming",
      subcategory: "discrete-mathematics",
      categoryId: "academics-programming.discrete-mathematics.relations-combinatorics.permutations-combinations",
      path: "academics-programming/discrete-mathematics/relations-combinatorics/permutations-combinations/prog-permutations-combinations",
      description: "Calculates P(n, r) permutations and C(n, r) combinations",
      signature: "int main(void);",
      code: `#include <stdio.h>

long long compute_permutation(int n, int r) {
    if (r < 0 || r > n) return 0;
    long long res = 1;
    for (int i = 0; i < r; i++) {
        res *= (n - i);
    }
    return res;
}

long long compute_combination(int n, int r) {
    if (r < 0 || r > n) return 0;
    if (r > n - r) r = n - r;
    long long res = 1;
    for (int i = 1; i <= r; i++) {
        res = res * (n - i + 1) / i;
    }
    return res;
}

int main(void) {
    int n = 8, r = 3;
    printf("P(%d, %d) = %lld\n", n, r, compute_permutation(n, r));
    printf("C(%d, %d) = %lld\n", n, r, compute_combination(n, r));
    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "combinatorics"],
      aliases: ["prog_acad_permutations_combinations"],
    })
  );

  // 5. Vertex Degrees & Handshaking
  components.push(
    createComponent({
      id: "academics-programming.discrete-mathematics.graph-theory.vertex-degrees.prog-vertex-degrees",
      name: "prog_acad_vertex_degrees",
      type: "program",
      category: "academics-programming",
      subcategory: "discrete-mathematics",
      categoryId: "academics-programming.discrete-mathematics.graph-theory.vertex-degrees",
      path: "academics-programming/discrete-mathematics/graph-theory/vertex-degrees/prog-vertex-degrees",
      description: "Computes vertex degrees, verifies Handshaking Lemma, and evaluates Eulerian path feasibility",
      signature: "int main(void);",
      code: `#include <stdio.h>

void analyze_graph(int v, int e, const int edges[][2]) {
    int deg[v];
    for (int i = 0; i < v; i++) deg[i] = 0;
    for (int i = 0; i < e; i++) {
        deg[edges[i][0]]++;
        deg[edges[i][1]]++;
    }
    int sum_deg = 0;
    int odd_count = 0;
    printf("Vertex Degrees:\n");
    for (int i = 0; i < v; i++) {
        printf("Vertex %d: %d\n", i, deg[i]);
        sum_deg += deg[i];
        if (deg[i] % 2 != 0) odd_count++;
    }
    printf("Sum of Degrees: %d (Expected 2 * E = %d)\n", sum_deg, 2 * e);
    printf("Handshaking Lemma Verified: %s\n", (sum_deg == 2 * e) ? "Yes" : "No");
    if (odd_count == 0) printf("Eulerian Circuit: Yes\n");
    else if (odd_count == 2) printf("Eulerian Path: Yes (No Circuit)\n");
    else printf("Eulerian: No (Odd degree count = %d)\n", odd_count);
}

int main(void) {
    int v = 5, e = 6;
    int edges[6][2] = {
        {0, 1}, {0, 2}, {1, 2}, {1, 3}, {2, 4}, {3, 4}
    };
    analyze_graph(v, e, edges);
    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "graph-theory"],
      aliases: ["prog_acad_vertex_degrees"],
    })
  );

  // 6. Planar Graph Euler Formula
  components.push(
    createComponent({
      id: "academics-programming.discrete-mathematics.graph-theory.planar-euler.prog-planar-euler",
      name: "prog_acad_planar_euler",
      type: "program",
      category: "academics-programming",
      subcategory: "discrete-mathematics",
      categoryId: "academics-programming.discrete-mathematics.graph-theory.planar-euler",
      path: "academics-programming/discrete-mathematics/graph-theory/planar-euler/prog-planar-euler",
      description: "Verifies planar graph Euler formula F = E - V + 2 and planarity edge bound",
      signature: "int main(void);",
      code: `#include <stdio.h>

void verify_planarity(int V, int E) {
    int F = E - V + 2;
    printf("Vertices (V): %d\n", V);
    printf("Edges (E): %d\n", E);
    printf("Calculated Faces (F = E - V + 2): %d\n", F);
    if (V >= 3) {
        int max_edges = 3 * V - 6;
        printf("Planar Maximum Edge Bound (3V - 6): %d\n", max_edges);
        if (E <= max_edges) {
            printf("Planarity Edge Condition: Satisfied\n");
        } else {
            printf("Planarity Edge Condition: Violates Bound (Non-planar)\n");
        }
    }
}

int main(void) {
    int V = 6, E = 9;
    verify_planarity(V, E);
    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "planar-graphs"],
      aliases: ["prog_acad_planar_euler"],
    })
  );

  // =========================================================================
  // TOPIC 2: NUMERICAL METHODS
  // =========================================================================

  // 7. Bisection Method
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.bisection-method.prog-bisection",
      name: "prog_acad_bisection",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.bisection-method",
      path: "academics-programming/numerical-methods/root-finding/bisection-method/prog-bisection",
      description: "Finds polynomial roots using bisection method with bracket updates",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x * x - 4 * x - 9;
}

double solve_bisection(double a, double b, double tol, int max_iter) {
    if (f(a) * f(b) >= 0) {
        printf("Invalid bracket: f(a) and f(b) must have opposite signs\n");
        return a;
    }
    double c = a;
    for (int i = 0; i < max_iter; i++) {
        c = (a + b) / 2.0;
        if (fabs(f(c)) < tol || (b - a) / 2.0 < tol) break;
        if (f(c) * f(a) < 0) b = c;
        else a = c;
    }
    return c;
}

int main(void) {
    double a = 2.0, b = 3.0, tol = 1e-6;
    double root = solve_bisection(a, b, tol, 100);
    printf("Bisection Root of x^3 - 4x - 9: %.6f\n", root);
    printf("f(root) = %.6e\n", f(root));
    return 0;
}`,
      tags: ["academics", "numerical-methods", "root-finding", "bisection"],
      aliases: ["prog_acad_bisection"],
    })
  );

  // 8. False Position Method
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.false-position.prog-false-position",
      name: "prog_acad_false_position",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.false-position",
      path: "academics-programming/numerical-methods/root-finding/false-position/prog-false-position",
      description: "Solves root of function using Regula Falsi secant interpolation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x * x - 2 * x - 5;
}

double solve_false_position(double a, double b, double tol, int max_iter) {
    if (f(a) * f(b) >= 0) return a;
    double c = a;
    for (int i = 0; i < max_iter; i++) {
        c = (a * f(b) - b * f(a)) / (f(b) - f(a));
        if (fabs(f(c)) < tol) break;
        if (f(c) * f(a) < 0) b = c;
        else a = c;
    }
    return c;
}

int main(void) {
    double a = 2.0, b = 3.0, tol = 1e-6;
    double root = solve_false_position(a, b, tol, 100);
    printf("False Position Root of x^3 - 2x - 5: %.6f\n", root);
    return 0;
}`,
      tags: ["academics", "numerical-methods", "false-position"],
      aliases: ["prog_acad_false_position"],
    })
  );

  // 9. Fixed Point Iteration
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.fixed-point.prog-fixed-point",
      name: "prog_acad_fixed_point",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.fixed-point",
      path: "academics-programming/numerical-methods/root-finding/fixed-point/prog-fixed-point",
      description: "Finds roots using fixed-point iteration x = g(x) with convergence check",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double g(double x) {
    return cbrt(4 * x + 9);
}

double solve_fixed_point(double x0, double tol, int max_iter) {
    double x = x0;
    for (int i = 0; i < max_iter; i++) {
        double next_x = g(x);
        if (fabs(next_x - x) < tol) return next_x;
        x = next_x;
    }
    return x;
}

int main(void) {
    double x0 = 2.5, tol = 1e-6;
    double root = solve_fixed_point(x0, tol, 100);
    printf("Fixed Point Root: %.6f\n", root);
    return 0;
}`,
      tags: ["academics", "numerical-methods", "fixed-point"],
      aliases: ["prog_acad_fixed_point"],
    })
  );

  // 10. Newton Raphson Method
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.newton-raphson.prog-newton-raphson",
      name: "prog_acad_newton_raphson",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.newton-raphson",
      path: "academics-programming/numerical-methods/root-finding/newton-raphson/prog-newton-raphson",
      description: "Solves roots via Newton-Raphson with internally computed central difference derivative",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x - 5.0;
}

double df_central(double x, double h) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

double solve_newton_raphson(double x0, double tol, int max_iter) {
    double x = x0;
    double h = 1e-5;
    for (int i = 0; i < max_iter; i++) {
        double fx = f(x);
        double fpx = df_central(x, h);
        if (fabs(fpx) < 1e-12) break;
        double step = fx / fpx;
        x -= step;
        if (fabs(step) < tol) break;
    }
    return x;
}

int main(void) {
    double x0 = 2.0, tol = 1e-6;
    double root = solve_newton_raphson(x0, tol, 100);
    printf("Newton-Raphson Root (sqrt(5)): %.6f\n", root);
    return 0;
}`,
      tags: ["academics", "numerical-methods", "newton-raphson"],
      aliases: ["prog_acad_newton_raphson"],
    })
  );

  // 11. Secant Method
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.secant-method.prog-secant",
      name: "prog_acad_secant",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.secant-method",
      path: "academics-programming/numerical-methods/root-finding/secant-method/prog-secant",
      description: "Solves root using secant method from two initial points without analytical derivative",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x * x - x - 1;
}

double solve_secant(double x0, double x1, double tol, int max_iter) {
    for (int i = 0; i < max_iter; i++) {
        double f0 = f(x0);
        double f1 = f(x1);
        if (fabs(f1 - f0) < 1e-12) break;
        double x2 = x1 - f1 * (x1 - x0) / (f1 - f0);
        if (fabs(x2 - x1) < tol) return x2;
        x0 = x1;
        x1 = x2;
    }
    return x1;
}

int main(void) {
    double x0 = 1.0, x1 = 2.0, tol = 1e-6;
    double root = solve_secant(x0, x1, tol, 100);
    printf("Secant Method Root: %.6f\n", root);
    return 0;
}`,
      tags: ["academics", "numerical-methods", "secant"],
      aliases: ["prog_acad_secant"],
    })
  );

  // 12. Naive Gauss Elimination
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.naive-gauss.prog-naive-gauss",
      name: "prog_acad_naive_gauss",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.naive-gauss",
      path: "academics-programming/numerical-methods/elimination-methods/naive-gauss/prog-naive-gauss",
      description: "Solves linear system Ax = b using naive Gaussian elimination and back substitution",
      signature: "int main(void);",
      code: `#include <stdio.h>

void solve_naive_gauss(int n, double a[n][n + 1], double x[n]) {
    for (int i = 0; i < n - 1; i++) {
        for (int k = i + 1; k < n; k++) {
            double factor = a[k][i] / a[i][i];
            for (int j = i; j <= n; j++) {
                a[k][j] -= factor * a[i][j];
            }
        }
    }
    for (int i = n - 1; i >= 0; i--) {
        double sum = a[i][n];
        for (int j = i + 1; j < n; j++) {
            sum -= a[i][j] * x[j];
        }
        x[i] = sum / a[i][i];
    }
}

int main(void) {
    int n = 3;
    double a[3][4] = {
        {2, 1, -1, 8},
        {-3, -1, 2, -11},
        {-2, 1, 2, -3}
    };
    double x[3];
    solve_naive_gauss(n, a, x);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f\n", i, x[i]);
    }
    return 0;
}`,
      tags: ["academics", "numerical-methods", "naive-gauss"],
      aliases: ["prog_acad_naive_gauss"],
    })
  );

  // 13. Gauss Elimination with Partial Pivoting
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.gauss-pivoting.prog-gauss-pivoting",
      name: "prog_acad_gauss_pivoting",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.gauss-pivoting",
      path: "academics-programming/numerical-methods/elimination-methods/gauss-pivoting/prog-gauss-pivoting",
      description: "Solves Ax = b via Gaussian elimination with row partial pivoting for numerical stability",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void solve_gauss_pivoting(int n, double a[n][n + 1], double x[n]) {
    for (int i = 0; i < n; i++) {
        int max_row = i;
        double max_val = fabs(a[i][i]);
        for (int k = i + 1; k < n; k++) {
            if (fabs(a[k][i]) > max_val) {
                max_val = fabs(a[k][i]);
                max_row = k;
            }
        }
        if (max_row != i) {
            for (int j = i; j <= n; j++) {
                double tmp = a[i][j];
                a[i][j] = a[max_row][j];
                a[max_row][j] = tmp;
            }
        }
        for (int k = i + 1; k < n; k++) {
            double factor = a[k][i] / a[i][i];
            for (int j = i; j <= n; j++) {
                a[k][j] -= factor * a[i][j];
            }
        }
    }
    for (int i = n - 1; i >= 0; i--) {
        double sum = a[i][n];
        for (int j = i + 1; j < n; j++) {
            sum -= a[i][j] * x[j];
        }
        x[i] = sum / a[i][i];
    }
}

int main(void) {
    int n = 3;
    double a[3][4] = {
        {0.001, 1.0, 1.0, 2.0},
        {1.0, 1.0, 2.0, 4.0},
        {2.0, 1.0, 1.0, 4.0}
    };
    double x[3];
    solve_gauss_pivoting(n, a, x);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f\n", i, x[i]);
    }
    return 0;
}`,
      tags: ["academics", "numerical-methods", "gauss-pivoting"],
      aliases: ["prog_acad_gauss_pivoting"],
    })
  );

  // 14. Gauss-Jordan Elimination
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.gauss-jordan.prog-gauss-jordan",
      name: "prog_acad_gauss_jordan",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.gauss-jordan",
      path: "academics-programming/numerical-methods/elimination-methods/gauss-jordan/prog-gauss-jordan",
      description: "Solves Ax = b by reducing augmented matrix to reduced row echelon form (diagonal matrix)",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void solve_gauss_jordan(int n, double a[n][n + 1], double x[n]) {
    for (int i = 0; i < n; i++) {
        int max_row = i;
        double max_val = fabs(a[i][i]);
        for (int k = i + 1; k < n; k++) {
            if (fabs(a[k][i]) > max_val) {
                max_val = fabs(a[k][i]);
                max_row = k;
            }
        }
        for (int j = 0; j <= n; j++) {
            double tmp = a[i][j];
            a[i][j] = a[max_row][j];
            a[max_row][j] = tmp;
        }
        double pivot = a[i][i];
        for (int j = 0; j <= n; j++) {
            a[i][j] /= pivot;
        }
        for (int k = 0; k < n; k++) {
            if (k != i) {
                double factor = a[k][i];
                for (int j = 0; j <= n; j++) {
                    a[k][j] -= factor * a[i][j];
                }
            }
        }
    }
    for (int i = 0; i < n; i++) {
        x[i] = a[i][n];
    }
}

int main(void) {
    int n = 3;
    double a[3][4] = {
        {2, 1, 1, 10},
        {3, 2, 3, 18},
        {1, 4, 9, 16}
    };
    double x[3];
    solve_gauss_jordan(n, a, x);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f\n", i, x[i]);
    }
    return 0;
}`,
      tags: ["academics", "numerical-methods", "gauss-jordan"],
      aliases: ["prog_acad_gauss_jordan"],
    })
  );

  // 15. LU Decomposition
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.lu-decomposition.prog-lu-decomposition",
      name: "prog_acad_lu_decomposition",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.lu-decomposition",
      path: "academics-programming/numerical-methods/elimination-methods/lu-decomposition/prog-lu-decomposition",
      description: "Doolittle LU decomposition solving Ax = b via forward and backward substitution",
      signature: "int main(void);",
      code: `#include <stdio.h>

void solve_lud(int n, const double A[n][n], const double b[n], double x[n]) {
    double L[n][n], U[n][n], y[n];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            L[i][j] = (i == j) ? 1.0 : 0.0;
            U[i][j] = 0.0;
        }
    }
    for (int i = 0; i < n; i++) {
        for (int k = i; k < n; k++) {
            double sum = 0;
            for (int j = 0; j < i; j++) sum += (L[i][j] * U[j][k]);
            U[i][k] = A[i][k] - sum;
        }
        for (int k = i + 1; k < n; k++) {
            double sum = 0;
            for (int j = 0; j < i; j++) sum += (L[k][j] * U[j][i]);
            L[k][i] = (A[k][i] - sum) / U[i][i];
        }
    }
    for (int i = 0; i < n; i++) {
        double sum = b[i];
        for (int j = 0; j < i; j++) sum -= L[i][j] * y[j];
        y[i] = sum;
    }
    for (int i = n - 1; i >= 0; i--) {
        double sum = y[i];
        for (int j = i + 1; j < n; j++) sum -= U[i][j] * x[j];
        x[i] = sum / U[i][i];
    }
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {2, -1, -2},
        {-4, 6, 3},
        {-4, -2, 8}
    };
    double b[3] = {-1, 13, -6};
    double x[3];
    solve_lud(n, A, b, x);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f\n", i, x[i]);
    }
    return 0;
}`,
      tags: ["academics", "numerical-methods", "lu-decomposition"],
      aliases: ["prog_acad_lu_decomposition"],
    })
  );

  // 16. Jacobi Iteration Method
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.jacobi-iteration.prog-jacobi-iteration",
      name: "prog_acad_jacobi_iteration",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.jacobi-iteration",
      path: "academics-programming/numerical-methods/elimination-methods/jacobi-iteration/prog-jacobi-iteration",
      description: "Solves diagonally dominant linear systems using Jacobi iterative method",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void solve_jacobi(int n, const double A[n][n], const double b[n], double x[n], double tol, int max_iter) {
    double next_x[n];
    for (int iter = 0; iter < max_iter; iter++) {
        double max_err = 0.0;
        for (int i = 0; i < n; i++) {
            double sum = b[i];
            for (int j = 0; j < n; j++) {
                if (j != i) sum -= A[i][j] * x[j];
            }
            next_x[i] = sum / A[i][i];
            double err = fabs(next_x[i] - x[i]);
            if (err > max_err) max_err = err;
        }
        for (int i = 0; i < n; i++) x[i] = next_x[i];
        if (max_err < tol) break;
    }
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {10, 1, 1},
        {2, 10, 1},
        {2, 2, 10}
    };
    double b[3] = {12, 13, 14};
    double x[3] = {0, 0, 0};
    solve_jacobi(n, A, b, x, 1e-6, 100);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f\n", i, x[i]);
    }
    return 0;
}`,
      tags: ["academics", "numerical-methods", "jacobi"],
      aliases: ["prog_acad_jacobi_iteration"],
    })
  );

  // 17. Gauss-Seidel Iteration Method
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.gauss-seidel.prog-gauss-seidel",
      name: "prog_acad_gauss_seidel",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.gauss-seidel",
      path: "academics-programming/numerical-methods/elimination-methods/gauss-seidel/prog-gauss-seidel",
      description: "Solves linear systems using Gauss-Seidel successive over-relaxation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void solve_gauss_seidel(int n, const double A[n][n], const double b[n], double x[n], double tol, int max_iter) {
    for (int iter = 0; iter < max_iter; iter++) {
        double max_err = 0.0;
        for (int i = 0; i < n; i++) {
            double sum = b[i];
            for (int j = 0; j < n; j++) {
                if (j != i) sum -= A[i][j] * x[j];
            }
            double new_val = sum / A[i][i];
            double err = fabs(new_val - x[i]);
            if (err > max_err) max_err = err;
            x[i] = new_val;
        }
        if (max_err < tol) break;
    }
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {4, 1, 2},
        {1, 5, 1},
        {2, 1, 5}
    };
    double b[3] = {16, 19, 23};
    double x[3] = {0, 0, 0};
    solve_gauss_seidel(n, A, b, x, 1e-6, 100);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f\n", i, x[i]);
    }
    return 0;
}`,
      tags: ["academics", "numerical-methods", "gauss-seidel"],
      aliases: ["prog_acad_gauss_seidel"],
    })
  );

  // 18. Elimination Pitfalls & Ill-Conditioning
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.elimination-pitfalls.prog-elimination-pitfalls",
      name: "prog_acad_elimination_pitfalls",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.elimination-pitfalls",
      path: "academics-programming/numerical-methods/elimination-methods/elimination-pitfalls/prog-elimination-pitfalls",
      description: "Detects near-zero pivots, determinant scale, and demonstrates sensitivity to roundoff errors",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void analyze_system_pitfalls(int n, const double A[n][n]) {
    double det = 0;
    if (n == 2) {
        det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
        printf("Matrix Determinant: %.6e\n", det);
        if (fabs(det) < 1e-9) {
            printf("Pitfall Detected: Matrix is singular or near-singular (ill-conditioned)\n");
        } else {
            printf("System Condition: Well-behaved for direct elimination\n");
        }
        for (int i = 0; i < n; i++) {
            if (fabs(A[i][i]) < 1e-12) {
                printf("Pitfall Detected: Zero pivot at row %d requires pivoting\n", i);
            }
        }
    }
}

int main(void) {
    double ill_A[2][2] = {
        {1.000, 1.000},
        {1.000, 1.001}
    };
    analyze_system_pitfalls(2, ill_A);
    return 0;
}`,
      tags: ["academics", "numerical-methods", "pitfalls"],
      aliases: ["prog_acad_elimination_pitfalls"],
    })
  );

  // 19. Lagrange Interpolation
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.interpolation.lagrange-interpolation.prog-lagrange-interpolation",
      name: "prog_acad_lagrange_interpolation",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.interpolation.lagrange-interpolation",
      path: "academics-programming/numerical-methods/interpolation/lagrange-interpolation/prog-lagrange-interpolation",
      description: "Evaluates interpolated values using Lagrange basis polynomials",
      signature: "int main(void);",
      code: `#include <stdio.h>

double interpolate_lagrange(int n, const double x_pts[], const double y_pts[], double x_target) {
    double result = 0.0;
    for (int i = 0; i < n; i++) {
        double term = y_pts[i];
        for (int j = 0; j < n; j++) {
            if (j != i) {
                term *= (x_target - x_pts[j]) / (x_pts[i] - x_pts[j]);
            }
        }
        result += term;
    }
    return result;
}

int main(void) {
    int n = 4;
    double x_pts[] = {0, 1, 2, 3};
    double y_pts[] = {1, 2, 9, 28};
    double query = 2.5;
    double y_val = interpolate_lagrange(n, x_pts, y_pts, query);
    printf("Lagrange Interpolation at x = %.2f: %.4f\n", query, y_val);
    return 0;
}`,
      tags: ["academics", "numerical-methods", "interpolation", "lagrange"],
      aliases: ["prog_acad_lagrange_interpolation"],
    })
  );

  // 20. Newton Forward Difference
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.interpolation.newton-forward.prog-newton-forward",
      name: "prog_acad_newton_forward",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.interpolation.newton-forward",
      path: "academics-programming/numerical-methods/interpolation/newton-forward/prog-newton-forward",
      description: "Builds forward difference table and computes interpolated value",
      signature: "int main(void);",
      code: `#include <stdio.h>

double interpolate_newton_forward(int n, const double x[], const double y[], double target) {
    double diff[n][n];
    for (int i = 0; i < n; i++) diff[i][0] = y[i];
    for (int j = 1; j < n; j++) {
        for (int i = 0; i < n - j; i++) {
            diff[i][j] = diff[i + 1][j - 1] - diff[i][j - 1];
        }
    }
    double h = x[1] - x[0];
    double u = (target - x[0]) / h;
    double sum = diff[0][0];
    double u_term = 1.0;
    double fact = 1.0;
    for (int j = 1; j < n; j++) {
        u_term *= (u - (j - 1));
        fact *= j;
        sum += (u_term * diff[0][j]) / fact;
    }
    return sum;
}

int main(void) {
    int n = 5;
    double x[] = {10, 20, 30, 40, 50};
    double y[] = {0.1736, 0.3420, 0.5000, 0.6428, 0.7660};
    double target = 25;
    printf("Newton Forward Interpolation at %.1f: %.4f\n", target, interpolate_newton_forward(n, x, y, target));
    return 0;
}`,
      tags: ["academics", "numerical-methods", "interpolation", "newton-forward"],
      aliases: ["prog_acad_newton_forward"],
    })
  );

  // 21. Trapezoidal Rule
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.numerical-integration.trapezoidal-rule.prog-trapezoidal-rule",
      name: "prog_acad_trapezoidal_rule",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.numerical-integration.trapezoidal-rule",
      path: "academics-programming/numerical-methods/numerical-integration/trapezoidal-rule/prog-trapezoidal-rule",
      description: "Computes definite integral using composite Trapezoidal quadrature",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x) {
    return 1.0 / (1.0 + x * x);
}

double integrate_trapezoidal(double a, double b, int n) {
    double h = (b - a) / n;
    double sum = 0.5 * (f(a) + f(b));
    for (int i = 1; i < n; i++) {
        sum += f(a + i * h);
    }
    return sum * h;
}

int main(void) {
    double a = 0.0, b = 1.0;
    int n = 100;
    double area = integrate_trapezoidal(a, b, n);
    printf("Trapezoidal Integral of 1/(1+x^2): %.6f (True pi/4 = %.6f)\n", area, atan(1.0));
    return 0;
}`,
      tags: ["academics", "numerical-methods", "integration", "trapezoidal"],
      aliases: ["prog_acad_trapezoidal_rule"],
    })
  );

  // 22. Simpson's Rules (1/3 and 3/8)
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.numerical-integration.simpsons-rules.prog-simpsons-rules",
      name: "prog_acad_simpsons_rules",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.numerical-integration.simpsons-rules",
      path: "academics-programming/numerical-methods/numerical-integration/simpsons-rules/prog-simpsons-rules",
      description: "Evaluates numerical integrals using Simpson's 1/3 and 3/8 rules",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x) {
    return exp(x);
}

double simpson_one_third(double a, double b, int n) {
    if (n % 2 != 0) n++;
    double h = (b - a) / n;
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 2 != 0) ? 4.0 * f(x) : 2.0 * f(x);
    }
    return (sum * h) / 3.0;
}

double simpson_three_eighth(double a, double b, int n) {
    while (n % 3 != 0) n++;
    double h = (b - a) / n;
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 3 == 0) ? 2.0 * f(x) : 3.0 * f(x);
    }
    return (3.0 * h * sum) / 8.0;
}

int main(void) {
    double a = 0.0, b = 2.0;
    printf("Simpson 1/3 Integral of e^x: %.6f\n", simpson_one_third(a, b, 10));
    printf("Simpson 3/8 Integral of e^x: %.6f\n", simpson_three_eighth(a, b, 12));
    printf("Analytical (e^2 - 1):        %.6f\n", exp(2.0) - 1.0);
    return 0;
}`,
      tags: ["academics", "numerical-methods", "integration", "simpsons"],
      aliases: ["prog_acad_simpsons_rules"],
    })
  );

  // =========================================================================
  // TOPIC 3: CALCULUS
  // =========================================================================

  // 23. Numerical Derivative
  components.push(
    createComponent({
      id: "academics-programming.calculus.differential-calculus.numerical-derivative.prog-numerical-derivative",
      name: "prog_acad_numerical_derivative",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.differential-calculus.numerical-derivative",
      path: "academics-programming/calculus/differential-calculus/numerical-derivative/prog-numerical-derivative",
      description: "Computes 1st and 2nd central difference numerical derivatives",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x) {
    return sin(x);
}

double first_derivative(double x, double h) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

double second_derivative(double x, double h) {
    return (f(x + h) - 2.0 * f(x) + f(x - h)) / (h * h);
}

int main(void) {
    double x = 1.04719755;
    double h = 1e-5;
    printf("f(x) = sin(x) at pi/3:\n");
    printf("f'(x)  = %.6f (Expected cos(pi/3) = 0.500000)\n", first_derivative(x, h));
    printf("f''(x) = %.6f (Expected -sin(pi/3) = -0.866025)\n", second_derivative(x, h));
    return 0;
}`,
      tags: ["academics", "calculus", "derivatives"],
      aliases: ["prog_acad_numerical_derivative"],
    })
  );

  // 24. Extrema Finder
  components.push(
    createComponent({
      id: "academics-programming.calculus.differential-calculus.extrema-finder.prog-extrema-finder",
      name: "prog_acad_extrema_finder",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.differential-calculus.extrema-finder",
      path: "academics-programming/calculus/differential-calculus/extrema-finder/prog-extrema-finder",
      description: "Discovers local minima and maxima via numerical derivative sign-transition analysis",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x) {
    return 2 * x * x * x - 9 * x * x + 12 * x + 1;
}

double df(double x, double h) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

double d2f(double x, double h) {
    return (f(x + h) - 2.0 * f(x) + f(x - h)) / (h * h);
}

void find_extrema(double a, double b, int n) {
    double dx = (b - a) / n;
    double h = 1e-4;
    for (int i = 0; i < n; i++) {
        double x1 = a + i * dx;
        double x2 = x1 + dx;
        if (df(x1, h) * df(x2, h) <= 0) {
            double root = (x1 + x2) / 2.0;
            double concavity = d2f(root, h);
            if (concavity < 0) {
                printf("Local Maximum at x = %.4f, f(x) = %.4f\n", root, f(root));
            } else if (concavity > 0) {
                printf("Local Minimum at x = %.4f, f(x) = %.4f\n", root, f(root));
            }
        }
    }
}

int main(void) {
    printf("Finding extrema for 2x^3 - 9x^2 + 12x + 1 in [0, 4]:\n");
    find_extrema(0.0, 4.0, 100);
    return 0;
}`,
      tags: ["academics", "calculus", "extrema"],
      aliases: ["prog_acad_extrema_finder"],
    })
  );

  // 25. Riemann Sums
  components.push(
    createComponent({
      id: "academics-programming.calculus.integral-calculus.riemann-sums.prog-riemann-sums",
      name: "prog_acad_riemann_sums",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.integral-calculus.riemann-sums",
      path: "academics-programming/calculus/integral-calculus/riemann-sums/prog-riemann-sums",
      description: "Computes Left, Right, and Midpoint Riemann sums for numerical quadrature",
      signature: "int main(void);",
      code: `#include <stdio.h>

double f(double x) {
    return x * x;
}

void compute_riemann_sums(double a, double b, int n) {
    double dx = (b - a) / n;
    double left_sum = 0, right_sum = 0, mid_sum = 0;
    for (int i = 0; i < n; i++) {
        double x_left = a + i * dx;
        double x_right = x_left + dx;
        double x_mid = (x_left + x_right) / 2.0;
        left_sum += f(x_left) * dx;
        right_sum += f(x_right) * dx;
        mid_sum += f(x_mid) * dx;
    }
    printf("Left Riemann Sum:     %.6f\n", left_sum);
    printf("Right Riemann Sum:    %.6f\n", right_sum);
    printf("Midpoint Riemann Sum: %.6f\n", mid_sum);
}

int main(void) {
    compute_riemann_sums(0.0, 3.0, 1000);
    return 0;
}`,
      tags: ["academics", "calculus", "riemann-sums"],
      aliases: ["prog_acad_riemann_sums"],
    })
  );

  // 26. Arc Length of Plane Curve
  components.push(
    createComponent({
      id: "academics-programming.calculus.integral-calculus.arc-length.prog-arc-length",
      name: "prog_acad_arc_length",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.integral-calculus.arc-length",
      path: "academics-programming/calculus/integral-calculus/arc-length/prog-arc-length",
      description: "Integrates sqrt(1 + (f'(x))^2) to compute arc length of a plane curve",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x;
}

double df(double x, double h) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

double compute_arc_length(double a, double b, int n) {
    double dx = (b - a) / n;
    double h = 1e-5;
    double length = 0.0;
    for (int i = 0; i < n; i++) {
        double x = a + (i + 0.5) * dx;
        double deriv = df(x, h);
        length += sqrt(1.0 + deriv * deriv) * dx;
    }
    return length;
}

int main(void) {
    double len = compute_arc_length(0.0, 1.0, 1000);
    printf("Arc length of y = x^2 from x = 0 to 1: %.6f\n", len);
    return 0;
}`,
      tags: ["academics", "calculus", "arc-length"],
      aliases: ["prog_acad_arc_length"],
    })
  );

  // 27. Gradient Vector
  components.push(
    createComponent({
      id: "academics-programming.calculus.multivariable-calculus.gradient-vector.prog-gradient-vector",
      name: "prog_acad_gradient_vector",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.multivariable-calculus.gradient-vector",
      path: "academics-programming/calculus/multivariable-calculus/gradient-vector/prog-gradient-vector",
      description: "Computes partial derivatives and gradient vector for 2D scalar fields",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double f(double x, double y) {
    return x * x * y + 3 * y * y;
}

void compute_gradient(double x, double y, double h, double* grad_x, double* grad_y) {
    *grad_x = (f(x + h, y) - f(x - h, y)) / (2.0 * h);
    *grad_y = (f(x, y + h) - f(x, y - h)) / (2.0 * h);
}

int main(void) {
    double x = 2.0, y = 3.0, h = 1e-5;
    double gx, gy;
    compute_gradient(x, y, h, &gx, &gy);
    double magnitude = sqrt(gx * gx + gy * gy);
    printf("At (%.1f, %.1f):\n", x, y);
    printf("grad f = (%.4f, %.4f)\n", gx, gy);
    printf("|grad f| = %.4f\n", magnitude);
    return 0;
}`,
      tags: ["academics", "calculus", "multivariable", "gradient"],
      aliases: ["prog_acad_gradient_vector"],
    })
  );

  // 28. Double Integral
  components.push(
    createComponent({
      id: "academics-programming.calculus.multivariable-calculus.double-integral.prog-double-integral",
      name: "prog_acad_double_integral",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.multivariable-calculus.double-integral",
      path: "academics-programming/calculus/multivariable-calculus/double-integral/prog-double-integral",
      description: "Integrates surface function over a 2D rectangular grid using midpoint Riemann sum",
      signature: "int main(void);",
      code: `#include <stdio.h>

double f(double x, double y) {
    return x * y + x * x;
}

double compute_double_integral(double x1, double x2, double y1, double y2, int nx, int ny) {
    double dx = (x2 - x1) / nx;
    double dy = (y2 - y1) / ny;
    double vol = 0.0;
    for (int i = 0; i < nx; i++) {
        double mx = x1 + (i + 0.5) * dx;
        for (int j = 0; j < ny; j++) {
            double my = y1 + (j + 0.5) * dy;
            vol += f(mx, my) * dx * dy;
        }
    }
    return vol;
}

int main(void) {
    double vol = compute_double_integral(0.0, 2.0, 0.0, 1.0, 200, 200);
    printf("Double integral volume over [0,2] x [0,1]: %.6f\n", vol);
    return 0;
}`,
      tags: ["academics", "calculus", "multivariable", "double-integral"],
      aliases: ["prog_acad_double_integral"],
    })
  );

  // =========================================================================
  // TOPIC 4: COORDINATE GEOMETRY AND LINEAR ALGEBRA
  // =========================================================================

  // 29. Line Intersection & Distance
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.coordinate-geometry.line-intersection.prog-line-intersection",
      name: "prog_acad_line_intersection",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.coordinate-geometry.line-intersection",
      path: "academics-programming/geometry-linear-algebra/coordinate-geometry/line-intersection/prog-line-intersection",
      description: "Finds intersection point of two 2D lines and perpendicular distance from a point",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

int find_intersection(double a1, double b1, double c1,
                      double a2, double b2, double c2,
                      double* ix, double* iy) {
    double det = a1 * b2 - a2 * b1;
    if (fabs(det) < 1e-9) return 0;
    *ix = (c1 * b2 - c2 * b1) / det;
    *iy = (a1 * c2 - a2 * c1) / det;
    return 1;
}

double point_to_line_dist(double a, double b, double c, double px, double py) {
    return fabs(a * px + b * py - c) / sqrt(a * a + b * b);
}

int main(void) {
    double a1 = 2, b1 = 3, c1 = 6;
    double a2 = 1, b2 = -1, c2 = 1;
    double ix, iy;
    if (find_intersection(a1, b1, c1, a2, b2, c2, &ix, &iy)) {
        printf("Intersection: (%.4f, %.4f)\n", ix, iy);
    }
    double dist = point_to_line_dist(a1, b1, c1, 4, 5);
    printf("Distance from (4, 5) to Line 1: %.4f\n", dist);
    return 0;
}`,
      tags: ["academics", "geometry", "lines"],
      aliases: ["prog_acad_line_intersection"],
    })
  );

  // 30. Conic Sections Classifier
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.coordinate-geometry.conic-sections.prog-conic-sections",
      name: "prog_acad_conic_sections",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.coordinate-geometry.conic-sections",
      path: "academics-programming/geometry-linear-algebra/coordinate-geometry/conic-sections/prog-conic-sections",
      description: "Classifies conic equations Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0 via discriminant",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void classify_conic(double A, double B, double C, double D, double E, double F) {
    double disc = B * B - 4 * A * C;
    printf("Conic Discriminant B^2 - 4AC: %.4f\n", disc);
    if (fabs(disc) < 1e-9) {
        printf("Type: Parabola\n");
    } else if (disc < 0) {
        if (fabs(A - C) < 1e-9 && fabs(B) < 1e-9) {
            printf("Type: Circle\n");
        } else {
            printf("Type: Ellipse\n");
        }
    } else {
        printf("Type: Hyperbola\n");
    }
}

int main(void) {
    classify_conic(4, 0, 9, 0, 0, -36);
    classify_conic(1, 0, 1, 0, 0, -25);
    classify_conic(1, 0, -1, 0, 0, -1);
    return 0;
}`,
      tags: ["academics", "geometry", "conic-sections"],
      aliases: ["prog_acad_conic_sections"],
    })
  );

  // 31. 3D Planes & Lines
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.coordinate-geometry.planes-lines-3d.prog-planes-lines-3d",
      name: "prog_acad_planes_lines_3d",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.coordinate-geometry.planes-lines-3d",
      path: "academics-programming/geometry-linear-algebra/coordinate-geometry/planes-lines-3d/prog-planes-lines-3d",
      description: "Computes dihedral angle between 3D planes and direction vector of intersection line",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void analyze_planes_3d(double a1, double b1, double c1,
                       double a2, double b2, double c2) {
    double dot = a1 * a2 + b1 * b2 + c1 * c2;
    double mag1 = sqrt(a1 * a1 + b1 * b1 + c1 * c1);
    double mag2 = sqrt(a2 * a2 + b2 * b2 + c2 * c2);
    double cos_theta = dot / (mag1 * mag2);
    double theta_deg = acos(cos_theta) * (180.0 / 3.141592653589793);

    double line_dx = b1 * c2 - b2 * c1;
    double line_dy = c1 * a2 - c2 * a1;
    double line_dz = a1 * b2 - a2 * b1;

    printf("Angle between planes: %.2f degrees\n", theta_deg);
    printf("Line of intersection direction vector: (%.2f, %.2f, %.2f)\n",
           line_dx, line_dy, line_dz);
}

int main(void) {
    analyze_planes_3d(1, 1, 1, 1, -1, 1);
    return 0;
}`,
      tags: ["academics", "geometry", "3d-geometry"],
      aliases: ["prog_acad_planes_lines_3d"],
    })
  );

  // 32. Determinant & Inverse
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.matrix-analysis.determinant-inverse.prog-determinant-inverse",
      name: "prog_acad_determinant_inverse",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.matrix-analysis.determinant-inverse",
      path: "academics-programming/geometry-linear-algebra/matrix-analysis/determinant-inverse/prog-determinant-inverse",
      description: "Calculates determinant and matrix inverse using Gauss-Jordan row reduction",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

int invert_matrix(int n, const double A[n][n], double inv[n][n], double* out_det) {
    double aug[n][2 * n];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            aug[i][j] = A[i][j];
            aug[i][j + n] = (i == j) ? 1.0 : 0.0;
        }
    }
    double det = 1.0;
    for (int i = 0; i < n; i++) {
        int pivot = i;
        for (int k = i + 1; k < n; k++) {
            if (fabs(aug[k][i]) > fabs(aug[pivot][i])) pivot = k;
        }
        if (pivot != i) {
            for (int j = 0; j < 2 * n; j++) {
                double tmp = aug[i][j]; aug[i][j] = aug[pivot][j]; aug[pivot][j] = tmp;
            }
            det = -det;
        }
        if (fabs(aug[i][i]) < 1e-12) return 0;
        double diag = aug[i][i];
        det *= diag;
        for (int j = 0; j < 2 * n; j++) aug[i][j] /= diag;
        for (int k = 0; k < n; k++) {
            if (k != i) {
                double factor = aug[k][i];
                for (int j = 0; j < 2 * n; j++) aug[k][j] -= factor * aug[i][j];
            }
        }
    }
    *out_det = det;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) inv[i][j] = aug[i][j + n];
    }
    return 1;
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {1, 2, 3},
        {0, 1, 4},
        {5, 6, 0}
    };
    double inv[3][3];
    double det;
    if (invert_matrix(n, A, inv, &det)) {
        printf("Determinant: %.4f\n", det);
        printf("Inverse Matrix:\n");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) printf("%8.4f ", inv[i][j]);
            printf("\n");
        }
    }
    return 0;
}`,
      tags: ["academics", "linear-algebra", "determinant", "inverse"],
      aliases: ["prog_acad_determinant_inverse"],
    })
  );

  // 33. Matrix Arithmetic
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.matrix-analysis.matrix-arithmetic.prog-matrix-arithmetic",
      name: "prog_acad_matrix_arithmetic",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.matrix-analysis.matrix-arithmetic",
      path: "academics-programming/geometry-linear-algebra/matrix-analysis/matrix-arithmetic/prog-matrix-arithmetic",
      description: "Computes matrix multiplication C = A * B and matrix transpose",
      signature: "int main(void);",
      code: `#include <stdio.h>

void mat_mul(int r1, int c1, int c2, const double A[r1][c1], const double B[c1][c2], double C[r1][c2]) {
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            C[i][j] = 0.0;
            for (int k = 0; k < c1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

void mat_transpose(int r, int c, const double A[r][c], double T[c][r]) {
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            T[j][i] = A[i][j];
        }
    }
}

int main(void) {
    double A[2][3] = {{1, 2, 3}, {4, 5, 6}};
    double B[3][2] = {{7, 8}, {9, 1}, {2, 3}};
    double C[2][2];
    mat_mul(2, 3, 2, A, B, C);
    printf("Product Matrix C (2x2):\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) printf("%.1f ", C[i][j]);
        printf("\n");
    }
    return 0;
}`,
      tags: ["academics", "linear-algebra", "matrix-arithmetic"],
      aliases: ["prog_acad_matrix_arithmetic"],
    })
  );

  // 34. Power Method Eigenvalue
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.matrix-analysis.power-method-eigenvalue.prog-power-method",
      name: "prog_acad_power_method",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.matrix-analysis.power-method-eigenvalue",
      path: "academics-programming/geometry-linear-algebra/matrix-analysis/power-method-eigenvalue/prog-power-method",
      description: "Finds dominant eigenvalue and eigenvector using power iteration",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double solve_power_method(int n, const double A[n][n], double x[n], double tol, int max_iter) {
    double lambda_old = 0.0;
    for (int iter = 0; iter < max_iter; iter++) {
        double y[n];
        for (int i = 0; i < n; i++) {
            y[i] = 0;
            for (int j = 0; j < n; j++) y[i] += A[i][j] * x[j];
        }
        double lambda_new = fabs(y[0]);
        for (int i = 1; i < n; i++) {
            if (fabs(y[i]) > lambda_new) lambda_new = fabs(y[i]);
        }
        for (int i = 0; i < n; i++) x[i] = y[i] / lambda_new;
        if (fabs(lambda_new - lambda_old) < tol) return lambda_new;
        lambda_old = lambda_new;
    }
    return lambda_old;
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {2, -12, 0},
        {1, -5, 0},
        {0, 0, 3}
    };
    double x[3] = {1, 1, 1};
    double lambda = solve_power_method(n, A, x, 1e-6, 100);
    printf("Dominant Eigenvalue: %.4f\n", lambda);
    printf("Eigenvector: (%.4f, %.4f, %.4f)\n", x[0], x[1], x[2]);
    return 0;
}`,
      tags: ["academics", "linear-algebra", "eigenvalues", "power-method"],
      aliases: ["prog_acad_power_method"],
    })
  );

  // =========================================================================
  // TOPIC 5: DIFFERENTIAL EQUATIONS
  // =========================================================================

  // 35. Euler ODE
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.first-order-ode.euler-method.prog-euler-ode",
      name: "prog_acad_euler_ode",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.first-order-ode.euler-method",
      path: "academics-programming/differential-equations/first-order-ode/euler-method/prog-euler-ode",
      description: "Solves first order initial value problem y' = f(x, y) using Euler's method",
      signature: "int main(void);",
      code: `#include <stdio.h>

double f(double x, double y) {
    return x + y;
}

double solve_euler(double x0, double y0, double target_x, double h) {
    double x = x0, y = y0;
    while (x < target_x) {
        y += h * f(x, y);
        x += h;
    }
    return y;
}

int main(void) {
    double x0 = 0.0, y0 = 1.0, target = 1.0, h = 0.05;
    double y_target = solve_euler(x0, y0, target, h);
    printf("Euler Solution y(%.1f): %.6f\n", target, y_target);
    return 0;
}`,
      tags: ["academics", "differential-equations", "euler"],
      aliases: ["prog_acad_euler_ode"],
    })
  );

  // 36. Heun ODE
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.first-order-ode.heun-method.prog-heun-ode",
      name: "prog_acad_heun_ode",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.first-order-ode.heun-method",
      path: "academics-programming/differential-equations/first-order-ode/heun-method/prog-heun-ode",
      description: "Solves ODE using predictor-corrector Heun's modified Euler method",
      signature: "int main(void);",
      code: `#include <stdio.h>

double f(double x, double y) {
    return 2 * x * y;
}

double solve_heun(double x0, double y0, double target_x, double h) {
    double x = x0, y = y0;
    while (x < target_x) {
        double y_pred = y + h * f(x, y);
        y += (h / 2.0) * (f(x, y) + f(x + h, y_pred));
        x += h;
    }
    return y;
}

int main(void) {
    double x0 = 0.0, y0 = 1.0, target = 1.0, h = 0.1;
    printf("Heun Solution at %.1f: %.6f\n", target, solve_heun(x0, y0, target, h));
    return 0;
}`,
      tags: ["academics", "differential-equations", "heun"],
      aliases: ["prog_acad_heun_ode"],
    })
  );

  // 37. Runge Kutta 4
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.first-order-ode.runge-kutta-4.prog-runge-kutta-4",
      name: "prog_acad_runge_kutta_4",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.first-order-ode.runge-kutta-4",
      path: "academics-programming/differential-equations/first-order-ode/runge-kutta-4/prog-runge-kutta-4",
      description: "Solves first-order initial value problem via 4th-order classical Runge-Kutta scheme",
      signature: "int main(void);",
      code: `#include <stdio.h>

double f(double x, double y) {
    return x - y;
}

double solve_rk4(double x0, double y0, double target_x, double h) {
    double x = x0, y = y0;
    while (x < target_x) {
        double k1 = h * f(x, y);
        double k2 = h * f(x + 0.5 * h, y + 0.5 * k1);
        double k3 = h * f(x + 0.5 * h, y + 0.5 * k2);
        double k4 = h * f(x + h, y + k3);
        y += (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
        x += h;
    }
    return y;
}

int main(void) {
    double x0 = 0.0, y0 = 1.0, target = 2.0, h = 0.1;
    printf("RK4 Solution at %.1f: %.6f\n", target, solve_rk4(x0, y0, target, h));
    return 0;
}`,
      tags: ["academics", "differential-equations", "runge-kutta"],
      aliases: ["prog_acad_runge_kutta_4"],
    })
  );

  // 38. Harmonic Oscillator (2nd-Order RK4)
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.second-order-bvp.harmonic-oscillator-rk4.prog-harmonic-oscillator",
      name: "prog_acad_harmonic_oscillator",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.second-order-bvp.harmonic-oscillator-rk4",
      path: "academics-programming/differential-equations/second-order-bvp/harmonic-oscillator-rk4/prog-harmonic-oscillator",
      description: "Simulates 2nd-order damped harmonic oscillator y'' + 2*zeta*omega*y' + omega^2*y = 0",
      signature: "int main(void);",
      code: `#include <stdio.h>

void solve_oscillator_rk4(double m, double c, double k, double y0, double v0, double dt, int steps) {
    double t = 0.0;
    double y = y0, v = v0;
    printf("Time   | Displacement | Velocity\n");
    printf("-------+--------------+---------\n");
    for (int i = 0; i <= steps; i++) {
        if (i % 20 == 0) printf("%6.2f | %12.4f | %8.4f\n", t, y, v);
        double kv1 = (-c * v - k * y) / m;
        double ky1 = v;

        double v_mid1 = v + 0.5 * dt * kv1;
        double y_mid1 = y + 0.5 * dt * ky1;
        double kv2 = (-c * v_mid1 - k * y_mid1) / m;
        double ky2 = v_mid1;

        double v_mid2 = v + 0.5 * dt * kv2;
        double y_mid2 = y + 0.5 * dt * ky2;
        double kv3 = (-c * v_mid2 - k * y_mid2) / m;
        double ky3 = v_mid2;

        double v_end = v + dt * kv3;
        double y_end = y + dt * ky3;
        double kv4 = (-c * v_end - k * y_end) / m;
        double ky4 = v_end;

        v += (dt / 6.0) * (kv1 + 2 * kv2 + 2 * kv3 + kv4);
        y += (dt / 6.0) * (ky1 + 2 * ky2 + 2 * ky3 + ky4);
        t += dt;
    }
}

int main(void) {
    solve_oscillator_rk4(1.0, 0.5, 4.0, 1.0, 0.0, 0.05, 100);
    return 0;
}`,
      tags: ["academics", "differential-equations", "harmonic-oscillator"],
      aliases: ["prog_acad_harmonic_oscillator"],
    })
  );

  // 39. BVP Finite Difference
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.second-order-bvp.bvp-finite-difference.prog-bvp-finite-difference",
      name: "prog_acad_bvp_finite_difference",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.second-order-bvp.bvp-finite-difference",
      path: "academics-programming/differential-equations/second-order-bvp/bvp-finite-difference/prog-bvp-finite-difference",
      description: "Solves 1D boundary value problem y'' = f(x) via tridiagonal finite differences",
      signature: "int main(void);",
      code: `#include <stdio.h>

void solve_bvp_thomas(int n, double a, double b, double ya, double yb) {
    double h = (b - a) / (n + 1);
    double diag[n], rhs[n], y[n + 2];
    for (int i = 0; i < n; i++) {
        double x = a + (i + 1) * h;
        diag[i] = -2.0;
        rhs[i] = h * h * (-x);
    }
    rhs[0] -= ya;
    rhs[n - 1] -= yb;

    double c_prime[n], d_prime[n];
    c_prime[0] = 1.0 / diag[0];
    d_prime[0] = rhs[0] / diag[0];
    for (int i = 1; i < n; i++) {
        double m = 1.0 / (diag[i] - 1.0 * c_prime[i - 1]);
        c_prime[i] = 1.0 * m;
        d_prime[i] = (rhs[i] - 1.0 * d_prime[i - 1]) * m;
    }
    y[n] = d_prime[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        y[i + 1] = d_prime[i] - c_prime[i] * y[i + 2];
    }
    y[0] = ya;
    y[n + 1] = yb;
    printf("BVP Solution profile:\n");
    for (int i = 0; i <= n + 1; i++) {
        printf("x = %.2f, y = %.4f\n", a + i * h, y[i]);
    }
}

int main(void) {
    solve_bvp_thomas(4, 0.0, 1.0, 0.0, 1.0);
    return 0;
}`,
      tags: ["academics", "differential-equations", "bvp"],
      aliases: ["prog_acad_bvp_finite_difference"],
    })
  );

  // =========================================================================
  // TOPIC 6: PHYSICS
  // =========================================================================

  // 40. Projectile Motion
  components.push(
    createComponent({
      id: "academics-programming.physics.kinematics-gravity.projectile-motion.prog-projectile-motion",
      name: "prog_acad_projectile_motion",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.kinematics-gravity.projectile-motion",
      path: "academics-programming/physics/kinematics-gravity/projectile-motion/prog-projectile-motion",
      description: "Computes 2D projectile trajectory, time of flight, peak height, and range",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void compute_projectile(double v0, double theta_deg, double g) {
    double theta = theta_deg * (3.141592653589793 / 180.0);
    double vx = v0 * cos(theta);
    double vy = v0 * sin(theta);
    double t_flight = (2.0 * vy) / g;
    double max_height = (vy * vy) / (2.0 * g);
    double range = vx * t_flight;

    printf("Initial Speed:   %.2f m/s\n", v0);
    printf("Launch Angle:    %.2f degrees\n", theta_deg);
    printf("Time of Flight:  %.4f s\n", t_flight);
    printf("Max Elevation:   %.4f m\n", max_height);
    printf("Horizontal Range: %.4f m\n", range);
}

int main(void) {
    compute_projectile(50.0, 45.0, 9.81);
    return 0;
}`,
      tags: ["academics", "physics", "projectile-motion"],
      aliases: ["prog_acad_projectile_motion"],
    })
  );

  // 41. Orbital Mechanics
  components.push(
    createComponent({
      id: "academics-programming.physics.kinematics-gravity.orbital-mechanics.prog-orbital-mechanics",
      name: "prog_acad_orbital_mechanics",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.kinematics-gravity.orbital-mechanics",
      path: "academics-programming/physics/kinematics-gravity/orbital-mechanics/prog-orbital-mechanics",
      description: "Computes orbital velocity, orbital period, and escape velocity around central mass",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void compute_orbital_parameters(double M, double r) {
    double G = 6.67430e-11;
    double v_circ = sqrt(G * M / r);
    double v_esc = sqrt(2.0 * G * M / r);
    double period = 2.0 * 3.141592653589793 * sqrt((r * r * r) / (G * M));

    printf("Circular Orbital Velocity: %.2f m/s\n", v_circ);
    printf("Escape Velocity:           %.2f m/s\n", v_esc);
    printf("Orbital Period:            %.2f s (%.2f h)\n", period, period / 3600.0);
}

int main(void) {
    double M_earth = 5.972e24;
    double r_orbit = 6.371e6 + 400000.0;
    compute_orbital_parameters(M_earth, r_orbit);
    return 0;
}`,
      tags: ["academics", "physics", "orbital-mechanics"],
      aliases: ["prog_acad_orbital_mechanics"],
    })
  );

  // 42. Ideal Gas Work
  components.push(
    createComponent({
      id: "academics-programming.physics.thermodynamics.ideal-gas-work.prog-ideal-gas-work",
      name: "prog_acad_ideal_gas_work",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.thermodynamics.ideal-gas-work",
      path: "academics-programming/physics/thermodynamics/ideal-gas-work/prog-ideal-gas-work",
      description: "Calculates thermodynamic work done in isothermal and isobaric processes",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void thermodynamic_processes(double n, double T, double V1, double V2, double P_bar) {
    double R = 8.314;
    double W_isothermal = n * R * T * log(V2 / V1);
    double P_pa = P_bar * 1e5;
    double W_isobaric = P_pa * (V2 - V1);

    printf("Isothermal Work (T = %.1f K): %.2f J\n", T, W_isothermal);
    printf("Isobaric Work   (P = %.1f bar): %.2f J\n", P_bar, W_isobaric);
}

int main(void) {
    thermodynamic_processes(1.0, 300.0, 0.01, 0.02, 1.0);
    return 0;
}`,
      tags: ["academics", "physics", "thermodynamics"],
      aliases: ["prog_acad_ideal_gas_work"],
    })
  );

  // 43. 1D Heat Conduction
  components.push(
    createComponent({
      id: "academics-programming.physics.thermodynamics.heat-conduction.prog-heat-conduction",
      name: "prog_acad_heat_conduction",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.thermodynamics.heat-conduction",
      path: "academics-programming/physics/thermodynamics/heat-conduction/prog-heat-conduction",
      description: "Computes 1D steady-state heat conduction temperature profile across a rod",
      signature: "int main(void);",
      code: `#include <stdio.h>

void steady_heat_conduction(double L, double k, double T1, double T2, double A, int nodes) {
    double dx = L / (nodes - 1);
    double q_flux = -k * (T2 - T1) / L;
    double total_rate = q_flux * A;

    printf("Heat Flux: %.2f W/m^2\n", q_flux);
    printf("Total Heat Transfer Rate: %.2f W\n", total_rate);
    printf("Nodal Temperatures:\n");
    for (int i = 0; i < nodes; i++) {
        double x = i * dx;
        double T = T1 + (T2 - T1) * (x / L);
        printf("x = %.3f m: T = %.2f C\n", x, T);
    }
}

int main(void) {
    steady_heat_conduction(0.5, 45.0, 100.0, 20.0, 0.01, 6);
    return 0;
}`,
      tags: ["academics", "physics", "heat-conduction"],
      aliases: ["prog_acad_heat_conduction"],
    })
  );

  // 44. Coulomb Field
  components.push(
    createComponent({
      id: "academics-programming.physics.electromagnetism-optics.coulomb-field.prog-coulomb-field",
      name: "prog_acad_coulomb_field",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.electromagnetism-optics.coulomb-field",
      path: "academics-programming/physics/electromagnetism-optics/coulomb-field/prog-coulomb-field",
      description: "Computes net electric field vector and magnitude at test location from point charges",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void compute_electric_field(int n, const double q[], const double x[], const double y[],
                            double px, double py) {
    double ke = 8.98755e9;
    double Ex = 0.0, Ey = 0.0;
    for (int i = 0; i < n; i++) {
        double dx = px - x[i];
        double dy = py - y[i];
        double r = sqrt(dx * dx + dy * dy);
        if (r > 1e-12) {
            double E_mag = ke * q[i] / (r * r);
            Ex += E_mag * (dx / r);
            Ey += E_mag * (dy / r);
        }
    }
    double total_E = sqrt(Ex * Ex + Ey * Ey);
    printf("Electric Field at (%.2f, %.2f):\n", px, py);
    printf("Ex = %.4e N/C, Ey = %.4e N/C\n", Ex, Ey);
    printf("|E| = %.4e N/C\n", total_E);
}

int main(void) {
    int n = 2;
    double q[] = {1e-9, -1e-9};
    double x[] = {-0.05, 0.05};
    double y[] = {0.0, 0.0};
    compute_electric_field(n, q, x, y, 0.0, 0.1);
    return 0;
}`,
      tags: ["academics", "physics", "coulomb-field"],
      aliases: ["prog_acad_coulomb_field"],
    })
  );

  // 45. Optics Refraction & Thin Lens
  components.push(
    createComponent({
      id: "academics-programming.physics.electromagnetism-optics.optics-refraction.prog-optics-refraction",
      name: "prog_acad_optics_refraction",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.electromagnetism-optics.optics-refraction",
      path: "academics-programming/physics/electromagnetism-optics/optics-refraction/prog-optics-refraction",
      description: "Solves Snell's law of refraction and thin lens magnification equation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void analyze_optics(double n1, double n2, double theta1_deg, double f_lens, double d_obj) {
    double theta1 = theta1_deg * (3.141592653589793 / 180.0);
    double sin_theta2 = (n1 / n2) * sin(theta1);
    if (fabs(sin_theta2) <= 1.0) {
        double theta2_deg = asin(sin_theta2) * (180.0 / 3.141592653589793);
        printf("Snell's Law: Refraction Angle = %.2f degrees\n", theta2_deg);
    } else {
        printf("Snell's Law: Total Internal Reflection occurs\n");
    }
    double d_img = (f_lens * d_obj) / (d_obj - f_lens);
    double m = -d_img / d_obj;
    printf("Thin Lens: Image Distance = %.2f cm, Magnification = %.2f\n", d_img, m);
}

int main(void) {
    analyze_optics(1.0, 1.5, 30.0, 10.0, 15.0);
    return 0;
}`,
      tags: ["academics", "physics", "optics"],
      aliases: ["prog_acad_optics_refraction"],
    })
  );

  // =========================================================================
  // TOPIC 7: MECHANICS
  // =========================================================================

  // 46. 2D Concurrent Force Equilibrium
  components.push(
    createComponent({
      id: "academics-programming.mechanics.statics-beams.force-equilibrium.prog-force-equilibrium",
      name: "prog_acad_force_equilibrium",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.statics-beams.force-equilibrium",
      path: "academics-programming/mechanics/statics-beams/force-equilibrium/prog-force-equilibrium",
      description: "Computes resultant and equilibrant force vector for 2D concurrent forces",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void resolve_forces(int n, const double mag[], const double theta_deg[]) {
    double sum_fx = 0.0, sum_fy = 0.0;
    for (int i = 0; i < n; i++) {
        double rad = theta_deg[i] * (3.141592653589793 / 180.0);
        sum_fx += mag[i] * cos(rad);
        sum_fy += mag[i] * sin(rad);
    }
    double r_mag = sqrt(sum_fx * sum_fx + sum_fy * sum_fy);
    double r_ang = atan2(sum_fy, sum_fx) * (180.0 / 3.141592653589793);
    printf("Resultant Force: %.2f N at %.2f deg\n", r_mag, r_ang);
    printf("Equilibrant:     %.2f N at %.2f deg\n", r_mag, r_ang + 180.0);
}

int main(void) {
    int n = 3;
    double mag[] = {100, 150, 80};
    double deg[] = {0, 60, 135};
    resolve_forces(n, mag, deg);
    return 0;
}`,
      tags: ["academics", "mechanics", "statics", "forces"],
      aliases: ["prog_acad_force_equilibrium"],
    })
  );

  // 47. Simply Supported Beam Analysis
  components.push(
    createComponent({
      id: "academics-programming.mechanics.statics-beams.beam-analysis.prog-beam-analysis",
      name: "prog_acad_beam_analysis",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.statics-beams.beam-analysis",
      path: "academics-programming/mechanics/statics-beams/beam-analysis/prog-beam-analysis",
      description: "Calculates reaction forces, shear forces, and bending moments on simply supported beam",
      signature: "int main(void);",
      code: `#include <stdio.h>

void analyze_beam(double L, int n_loads, const double P[], const double a[]) {
    double moment_A = 0.0, total_load = 0.0;
    for (int i = 0; i < n_loads; i++) {
        moment_A += P[i] * a[i];
        total_load += P[i];
    }
    double R_B = moment_A / L;
    double R_A = total_load - R_B;

    printf("Reaction at A: %.2f N\n", R_A);
    printf("Reaction at B: %.2f N\n", R_B);

    double max_moment = 0.0;
    for (int i = 0; i < n_loads; i++) {
        double m = R_A * a[i];
        for (int j = 0; j < i; j++) {
            m -= P[j] * (a[i] - a[j]);
        }
        if (m > max_moment) max_moment = m;
    }
    printf("Max Bending Moment under point loads: %.2f N*m\n", max_moment);
}

int main(void) {
    double L = 10.0;
    int n = 2;
    double P[] = {20.0, 30.0};
    double a[] = {3.0, 7.0};
    analyze_beam(L, n, P, a);
    return 0;
}`,
      tags: ["academics", "mechanics", "beams"],
      aliases: ["prog_acad_beam_analysis"],
    })
  );

  // 48. Momentum Collision
  components.push(
    createComponent({
      id: "academics-programming.mechanics.dynamics-collisions.momentum-collision.prog-momentum-collision",
      name: "prog_acad_momentum_collision",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.dynamics-collisions.momentum-collision",
      path: "academics-programming/mechanics/dynamics-collisions/momentum-collision/prog-momentum-collision",
      description: "Computes 1D collision final velocities and kinetic energy loss given coefficient of restitution",
      signature: "int main(void);",
      code: `#include <stdio.h>

void simulate_collision(double m1, double u1, double m2, double u2, double e) {
    double v1 = (m1 * u1 + m2 * u2 - m2 * e * (u1 - u2)) / (m1 + m2);
    double v2 = (m1 * u1 + m2 * u2 + m1 * e * (u1 - u2)) / (m1 + m2);

    double ke_initial = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
    double ke_final = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
    double ke_loss = ke_initial - ke_final;

    printf("Post-collision v1: %.2f m/s\n", v1);
    printf("Post-collision v2: %.2f m/s\n", v2);
    printf("Initial Kinetic Energy: %.2f J\n", ke_initial);
    printf("Final Kinetic Energy:   %.2f J\n", ke_final);
    printf("Kinetic Energy Loss:    %.2f J (%.1f%%)\n", ke_loss, (ke_loss / ke_initial) * 100.0);
}

int main(void) {
    simulate_collision(2.0, 5.0, 3.0, -2.0, 0.8);
    return 0;
}`,
      tags: ["academics", "mechanics", "collisions"],
      aliases: ["prog_acad_momentum_collision"],
    })
  );

  // 49. Inclined Plane with Friction
  components.push(
    createComponent({
      id: "academics-programming.mechanics.dynamics-collisions.inclined-plane-friction.prog-inclined-plane-friction",
      name: "prog_acad_inclined_plane",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.dynamics-collisions.inclined-plane-friction",
      path: "academics-programming/mechanics/dynamics-collisions/inclined-plane-friction/prog-inclined-plane-friction",
      description: "Determines slip condition, friction force, and acceleration of a block on an inclined plane",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void analyze_inclined_plane(double m, double theta_deg, double mu_s, double mu_k, double g) {
    double theta = theta_deg * (3.141592653589793 / 180.0);
    double N = m * g * cos(theta);
    double f_down = m * g * sin(theta);
    double max_static = mu_s * N;

    printf("Downhill Force (mg sin theta): %.2f N\n", f_down);
    printf("Max Static Friction:           %.2f N\n", max_static);
    if (f_down <= max_static) {
        printf("State: Static Equilibrium (No motion, a = 0.00 m/s^2)\n");
    } else {
        double f_kinetic = mu_k * N;
        double a = (f_down - f_kinetic) / m;
        printf("State: Motion occurs\n");
        printf("Kinetic Friction Force:        %.2f N\n", f_kinetic);
        printf("Acceleration down plane:       %.4f m/s^2\n", a);
    }
}

int main(void) {
    analyze_inclined_plane(10.0, 30.0, 0.5, 0.4, 9.81);
    return 0;
}`,
      tags: ["academics", "mechanics", "friction"],
      aliases: ["prog_acad_inclined_plane"],
    })
  );

  // 50. Damped Free Vibrations
  components.push(
    createComponent({
      id: "academics-programming.mechanics.vibrations.damped-vibrations.prog-damped-vibrations",
      name: "prog_acad_damped_vibrations",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.vibrations.damped-vibrations",
      path: "academics-programming/mechanics/vibrations/damped-vibrations/prog-damped-vibrations",
      description: "Calculates undamped frequency, damping ratio, and classifies vibration regime",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void analyze_vibrations(double m, double c, double k) {
    double omega_n = sqrt(k / m);
    double c_crit = 2.0 * sqrt(k * m);
    double zeta = c / c_crit;

    printf("Natural Frequency omega_n: %.4f rad/s\n", omega_n);
    printf("Critical Damping c_c:      %.4f N*s/m\n", c_crit);
    printf("Damping Ratio zeta:        %.4f\n", zeta);

    if (fabs(zeta - 1.0) < 1e-4) {
        printf("Regime: Critically Damped\n");
    } else if (zeta < 1.0) {
        double omega_d = omega_n * sqrt(1.0 - zeta * zeta);
        printf("Regime: Underdamped (Damped Frequency omega_d = %.4f rad/s)\n", omega_d);
    } else {
        printf("Regime: Overdamped (Non-oscillatory)\n");
    }
}

int main(void) {
    analyze_vibrations(2.0, 1.5, 50.0);
    return 0;
}`,
      tags: ["academics", "mechanics", "vibrations"],
      aliases: ["prog_acad_damped_vibrations"],
    })
  );

  // =========================================================================
  // TOPIC 8: STATISTICS
  // =========================================================================

  // 51. Central Tendency & Dispersion
  components.push(
    createComponent({
      id: "academics-programming.statistics.descriptive-statistics.central-tendency-dispersion.prog-central-tendency",
      name: "prog_acad_central_tendency",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.descriptive-statistics.central-tendency-dispersion",
      path: "academics-programming/statistics/descriptive-statistics/central-tendency-dispersion/prog-central-tendency",
      description: "Computes arithmetic mean, median, sample variance, standard deviation, and IQR",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void compute_descriptive_stats(int n, double arr[]) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                double tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
            }
        }
    }
    double sum = 0.0;
    for (int i = 0; i < n; i++) sum += arr[i];
    double mean = sum / n;

    double median = (n % 2 != 0) ? arr[n / 2] : (arr[n / 2 - 1] + arr[n / 2]) / 2.0;

    double sq_diff = 0.0;
    for (int i = 0; i < n; i++) sq_diff += (arr[i] - mean) * (arr[i] - mean);
    double variance = sq_diff / (n - 1);
    double std_dev = sqrt(variance);

    double q1 = arr[n / 4];
    double q3 = arr[(3 * n) / 4];
    double iqr = q3 - q1;

    printf("Mean:               %.4f\n", mean);
    printf("Median:             %.4f\n", median);
    printf("Sample Variance:    %.4f\n", variance);
    printf("Standard Deviation: %.4f\n", std_dev);
    printf("IQR (Q3 - Q1):      %.4f\n", iqr);
}

int main(void) {
    double data[] = {12, 15, 11, 19, 22, 24, 25, 26, 29, 35};
    compute_descriptive_stats(10, data);
    return 0;
}`,
      tags: ["academics", "statistics", "mean", "variance"],
      aliases: ["prog_acad_central_tendency"],
    })
  );

  // 52. Skewness & Kurtosis
  components.push(
    createComponent({
      id: "academics-programming.statistics.descriptive-statistics.skewness-kurtosis.prog-skewness-kurtosis",
      name: "prog_acad_skewness_kurtosis",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.descriptive-statistics.skewness-kurtosis",
      path: "academics-programming/statistics/descriptive-statistics/skewness-kurtosis/prog-skewness-kurtosis",
      description: "Calculates central moments, Fisher-Pearson skewness, and excess kurtosis",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void compute_shape_moments(int n, const double arr[]) {
    double sum = 0.0;
    for (int i = 0; i < n; i++) sum += arr[i];
    double mean = sum / n;

    double m2 = 0.0, m3 = 0.0, m4 = 0.0;
    for (int i = 0; i < n; i++) {
        double d = arr[i] - mean;
        m2 += d * d;
        m3 += d * d * d;
        m4 += d * d * d * d;
    }
    m2 /= n;
    m3 /= n;
    m4 /= n;

    double skewness = m3 / pow(m2, 1.5);
    double kurtosis = (m4 / (m2 * m2)) - 3.0;

    printf("Second Central Moment m2: %.4f\n", m2);
    printf("Third Central Moment m3:  %.4f\n", m3);
    printf("Fourth Central Moment m4: %.4f\n", m4);
    printf("Fisher-Pearson Skewness:  %.4f\n", skewness);
    printf("Excess Kurtosis:          %.4f\n", kurtosis);
}

int main(void) {
    double vals[] = {10, 12, 12, 13, 15, 18, 20, 25};
    compute_shape_moments(8, vals);
    return 0;
}`,
      tags: ["academics", "statistics", "skewness", "kurtosis"],
      aliases: ["prog_acad_skewness_kurtosis"],
    })
  );

  // 53. Discrete Distributions
  components.push(
    createComponent({
      id: "academics-programming.statistics.probability-distributions.discrete-distributions.prog-discrete-distributions",
      name: "prog_acad_discrete_distributions",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.probability-distributions.discrete-distributions",
      path: "academics-programming/statistics/probability-distributions/discrete-distributions/prog-discrete-distributions",
      description: "Evaluates exact PMF and cumulative probability for Binomial and Poisson distributions",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

long long ncr(int n, int r) {
    if (r < 0 || r > n) return 0;
    if (r > n - r) r = n - r;
    long long res = 1;
    for (int i = 1; i <= r; i++) res = res * (n - i + 1) / i;
    return res;
}

double binomial_pmf(int n, int k, double p) {
    return ncr(n, k) * pow(p, k) * pow(1.0 - p, n - k);
}

double poisson_pmf(double lambda, int k) {
    double fact = 1.0;
    for (int i = 1; i <= k; i++) fact *= i;
    return (exp(-lambda) * pow(lambda, k)) / fact;
}

int main(void) {
    printf("Binomial(n=10, p=0.3, k=3): %.6f\n", binomial_pmf(10, 3, 0.3));
    printf("Poisson(lambda=2.5, k=2):   %.6f\n", poisson_pmf(2.5, 2));
    return 0;
}`,
      tags: ["academics", "statistics", "distributions", "binomial", "poisson"],
      aliases: ["prog_acad_discrete_distributions"],
    })
  );

  // 54. Normal Distribution
  components.push(
    createComponent({
      id: "academics-programming.statistics.probability-distributions.normal-distribution.prog-normal-distribution",
      name: "prog_acad_normal_distribution",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.probability-distributions.normal-distribution",
      path: "academics-programming/statistics/probability-distributions/normal-distribution/prog-normal-distribution",
      description: "Computes Gaussian probability density and standard normal cumulative CDF",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

double normal_pdf(double x, double mu, double sigma) {
    double coeff = 1.0 / (sigma * sqrt(2.0 * 3.141592653589793));
    double exp_part = exp(-0.5 * pow((x - mu) / sigma, 2.0));
    return coeff * exp_part;
}

double normal_cdf(double x, double mu, double sigma) {
    double z = (x - mu) / (sigma * sqrt(2.0));
    return 0.5 * (1.0 + erf(z));
}

int main(void) {
    double mu = 100.0, sigma = 15.0, query = 115.0;
    double z = (query - mu) / sigma;
    printf("Z-Score: %.4f\n", z);
    printf("PDF f(115): %.6f\n", normal_pdf(query, mu, sigma));
    printf("CDF P(X <= 115): %.6f\n", normal_cdf(query, mu, sigma));
    return 0;
}`,
      tags: ["academics", "statistics", "normal-distribution"],
      aliases: ["prog_acad_normal_distribution"],
    })
  );

  // 55. Linear Regression
  components.push(
    createComponent({
      id: "academics-programming.statistics.regression-hypothesis.linear-regression.prog-linear-regression",
      name: "prog_acad_linear_regression",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.regression-hypothesis.linear-regression",
      path: "academics-programming/statistics/regression-hypothesis/linear-regression/prog-linear-regression",
      description: "Computes ordinary least-squares slope, intercept, Pearson r, and prediction",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void solve_linear_regression(int n, const double x[], const double y[], double query_x) {
    double sum_x = 0, sum_y = 0, sum_xy = 0, sum_x2 = 0, sum_y2 = 0;
    for (int i = 0; i < n; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += x[i] * y[i];
        sum_x2 += x[i] * x[i];
        sum_y2 += y[i] * y[i];
    }
    double m = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x);
    double c = (sum_y - m * sum_x) / n;
    double num_r = (n * sum_xy - sum_x * sum_y);
    double den_r = sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));
    double r = num_r / den_r;
    double r2 = r * r;
    double pred_y = m * query_x + c;

    printf("Slope (m):                     %.4f\n", m);
    printf("Intercept (c):                 %.4f\n", c);
    printf("Regression Equation:           y = %.4fx + %.4f\n", m, c);
    printf("Pearson Correlation (r):       %.4f\n", r);
    printf("R-Squared (r^2):               %.4f\n", r2);
    printf("Prediction at x = %.2f:       y = %.4f\n", query_x, pred_y);
}

int main(void) {
    int n = 5;
    double x[] = {1, 2, 3, 4, 5};
    double y[] = {2, 3, 5, 6, 8};
    solve_linear_regression(n, x, y, 6.0);
    return 0;
}`,
      tags: ["academics", "statistics", "regression"],
      aliases: ["prog_acad_linear_regression"],
    })
  );

  // 56. Student's t-Test
  components.push(
    createComponent({
      id: "academics-programming.statistics.regression-hypothesis.students-t-test.prog-students-t-test",
      name: "prog_acad_students_t_test",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.regression-hypothesis.students-t-test",
      path: "academics-programming/statistics/regression-hypothesis/students-t-test/prog-students-t-test",
      description: "Computes one-sample Student's t-statistic and degrees of freedom",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

void perform_t_test(int n, double sample_mean, double sample_std, double mu0) {
    double se = sample_std / sqrt((double)n);
    double t_stat = (sample_mean - mu0) / se;
    int df = n - 1;

    printf("Sample Mean:        %.4f\n", sample_mean);
    printf("Hypothesized Mean:  %.4f\n", mu0);
    printf("Standard Error:     %.4f\n", se);
    printf("t-Statistic:        %.4f\n", t_stat);
    printf("Degrees of Freedom: %d\n", df);
}

int main(void) {
    int n = 25;
    double x_bar = 104.2;
    double s = 8.5;
    double mu0 = 100.0;
    perform_t_test(n, x_bar, s, mu0);
    return 0;
}`,
      tags: ["academics", "statistics", "hypothesis-testing", "t-test"],
      aliases: ["prog_acad_students_t_test"],
    })
  );

  return components;
}
