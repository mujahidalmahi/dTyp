import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAcademicDiscreteComponents(): Component[] {
  const components: Component[] = [];

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
      description: "Interactive boolean truth table generator for 2-variable gates, 3-variable compound expressions, tautology testing, and 8-bit masks",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int op_and(int a, int b) { return a && b; }
static int op_or(int a, int b) { return a || b; }
static int op_xor(int a, int b) { return a ^ b; }
static int op_nand(int a, int b) { return !(a && b); }
static int op_nor(int a, int b) { return !(a || b); }
static int op_xnor(int a, int b) { return !(a ^ b); }
static int op_implies(int a, int b) { return (!a) || b; }
static int op_bicond(int a, int b) { return a == b; }

static void print_single_table(int (*op)(int, int), const char* name) {
    printf("\\n--- %s Truth Table ---\\n", name);
    printf(" A | B | Result\\n");
    printf("---+---+-------\\n");
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            printf(" %d | %d |   %d\\n", a, b, op(a, b));
        }
    }
}

static void print_master_table(void) {
    printf("\\n--- 2-Variable Master Logic Table ---\\n");
    printf(" A | B | AND | OR | XOR | NAND | NOR | XNOR | A->B | A<->B\\n");
    printf("---+---+-----+----+-----+------+-----+------+------+------\\n");
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            printf(" %d | %d |  %d  |  %d |  %d  |  %d   |  %d  |  %d   |  %d   |   %d\\n",
                   a, b,
                   op_and(a, b), op_or(a, b), op_xor(a, b),
                   op_nand(a, b), op_nor(a, b), op_xnor(a, b),
                   op_implies(a, b), op_bicond(a, b));
        }
    }
}

static int eval_compound_1(int a, int b, int c) {
    return (a && b) || (!c);
}

static int eval_compound_2(int a, int b, int c) {
    int p1 = op_implies(a, b);
    int p2 = op_implies(b, c);
    int conc = op_implies(a, c);
    return op_implies(p1 && p2, conc);
}

static void print_compound_table(void) {
    printf("\\n--- 3-Variable Compound Proposition Tables ---\\n");
    printf("Proposition 1: (A AND B) OR (NOT C)\\n");
    printf(" A | B | C | Result\\n");
    printf("---+---+---+-------\\n");
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            for (int c = 0; c <= 1; c++) {
                printf(" %d | %d | %d |   %d\\n", a, b, c, eval_compound_1(a, b, c));
            }
        }
    }

    printf("\\nProposition 2: ((A -> B) AND (B -> C)) -> (A -> C) [Transitivity of Implication]\\n");
    printf(" A | B | C | Result\\n");
    printf("---+---+---+-------\\n");
    int all_true = 1;
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            for (int c = 0; c <= 1; c++) {
                int r = eval_compound_2(a, b, c);
                if (!r) all_true = 0;
                printf(" %d | %d | %d |   %d\\n", a, b, c, r);
            }
        }
    }
    if (all_true) printf("Result: Proposition 2 is a TAUTOLOGY (Universally True).\\n");
}

static void test_custom_bits(void) {
    unsigned int a, b;
    printf("Enter two 8-bit integers (0 to 255): ");
    if (scanf("%u %u", &a, &b) != 2) {
        clear_input();
        printf("Invalid input.\\n");
        return;
    }
    a &= 0xFF;
    b &= 0xFF;
    printf("\\nBitwise Logic Results for A = %u, B = %u:\\n", a, b);
    printf("A & B (AND):  %u (0x%02X)\\n", a & b, a & b);
    printf("A | B (OR):   %u (0x%02X)\\n", a | b, a | b);
    printf("A ^ B (XOR):  %u (0x%02X)\\n", a ^ b, a ^ b);
    printf("~A & 0xFF:    %u (0x%02X)\\n", (~a) & 0xFF, (~a) & 0xFF);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ TRUTH TABLE GENERATOR ================\\n");
        printf("1. Single 2-Variable Logic Gate (AND, OR, XOR, etc.)\\n");
        printf("2. Master 2-Variable Logic Table (All Gates Side-by-Side)\\n");
        printf("3. 3-Variable Compound Expressions & Tautology Test\\n");
        printf("4. Bitwise Logic Evaluator on 8-bit Integers\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        switch (choice) {
            case 1: {
                int gate;
                printf("\\nSelect Gate: 1=AND, 2=OR, 3=XOR, 4=NAND, 5=NOR, 6=XNOR, 7=A->B, 8=A<->B: ");
                if (scanf("%d", &gate) != 1) { clear_input(); break; }
                if (gate == 1) print_single_table(op_and, "AND");
                else if (gate == 2) print_single_table(op_or, "OR");
                else if (gate == 3) print_single_table(op_xor, "XOR");
                else if (gate == 4) print_single_table(op_nand, "NAND");
                else if (gate == 5) print_single_table(op_nor, "NOR");
                else if (gate == 6) print_single_table(op_xnor, "XNOR");
                else if (gate == 7) print_single_table(op_implies, "IMPLICATION (A->B)");
                else if (gate == 8) print_single_table(op_bicond, "BICONDITIONAL (A<->B)");
                else printf("Unknown gate choice.\\n");
                break;
            }
            case 2:
                print_master_table();
                break;
            case 3:
                print_compound_table();
                break;
            case 4:
                test_custom_bits();
                break;
            case 0:
                printf("Exiting Truth Table Generator.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);
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
      description: "Interactive set calculator supporting union, intersection, difference, symmetric difference, Cartesian product, subsets, and power set",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_SET 50

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static bool set_contains(const int* set, int size, int val) {
    for (int i = 0; i < size; i++) {
        if (set[i] == val) return true;
    }
    return false;
}

static void print_set(const char* label, const int* set, int size) {
    printf("%s [size %d]: { ", label, size);
    for (int i = 0; i < size; i++) {
        printf("%d%s", set[i], (i < size - 1) ? ", " : " ");
    }
    printf("}\\n");
}

static int input_set(const char* label, int* set) {
    int n;
    printf("Enter number of elements for %s (0 to %d): ", label, MAX_SET);
    if (scanf("%d", &n) != 1 || n < 0 || n > MAX_SET) {
        clear_input();
        return 0;
    }
    int count = 0;
    if (n > 0) {
        printf("Enter %d distinct integer elements: ", n);
        for (int i = 0; i < n; i++) {
            int val;
            if (scanf("%d", &val) == 1) {
                if (!set_contains(set, count, val)) {
                    set[count++] = val;
                }
            }
        }
    }
    clear_input();
    return count;
}

static int set_union(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) out[count++] = A[i];
    for (int i = 0; i < sizeB; i++) {
        if (!set_contains(A, sizeA, B[i])) out[count++] = B[i];
    }
    return count;
}

static int set_intersection(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    return count;
}

static int set_difference(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (!set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    return count;
}

static int set_sym_difference(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (!set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    for (int i = 0; i < sizeB; i++) {
        if (!set_contains(A, sizeA, B[i])) out[count++] = B[i];
    }
    return count;
}

static void set_cartesian(const int* A, int sizeA, const int* B, int sizeB) {
    printf("A x B [cardinality %d]: { ", sizeA * sizeB);
    for (int i = 0; i < sizeA; i++) {
        for (int j = 0; j < sizeB; j++) {
            printf("(%d, %d)%s", A[i], B[j], (i == sizeA - 1 && j == sizeB - 1) ? " " : ", ");
        }
    }
    printf("}\\n");
}

static void check_relationships(const int* A, int sizeA, const int* B, int sizeB) {
    bool a_sub_b = true;
    for (int i = 0; i < sizeA; i++) {
        if (!set_contains(B, sizeB, A[i])) { a_sub_b = false; break; }
    }
    bool b_sub_a = true;
    for (int i = 0; i < sizeB; i++) {
        if (!set_contains(A, sizeA, B[i])) { b_sub_a = false; break; }
    }
    bool disjoint = true;
    for (int i = 0; i < sizeA; i++) {
        if (set_contains(B, sizeB, A[i])) { disjoint = false; break; }
    }

    printf("\\nSet Relationship Analysis:\\n");
    printf("A is subset of B (A <= B): %s\\n", a_sub_b ? "YES" : "NO");
    printf("B is subset of A (B <= A): %s\\n", b_sub_a ? "YES" : "NO");
    printf("A equals B (A == B):       %s\\n", (a_sub_b && b_sub_a) ? "YES" : "NO");
    printf("A and B are Disjoint:      %s\\n", disjoint ? "YES" : "NO");
}

static void generate_powerset(const int* A, int size) {
    if (size > 10) {
        printf("Set too large for terminal power set (max 10 elements).\\n");
        return;
    }
    int total = 1 << size;
    printf("\\nPower Set P(A) [total 2^%d = %d subsets]:\\n", size, total);
    for (int mask = 0; mask < total; mask++) {
        printf("  { ");
        bool first = true;
        for (int i = 0; i < size; i++) {
            if (mask & (1 << i)) {
                if (!first) printf(", ");
                printf("%d", A[i]);
                first = false;
            }
        }
        printf(" }\\n");
    }
}

int main(void) {
    int setA[MAX_SET], setB[MAX_SET], result[MAX_SET * 2];
    int sizeA = 0, sizeB = 0;
    int choice;

    do {
        printf("\\n================ SET THEORY WORKBENCH ================\\n");
        printf("1. Input Set A\\n");
        printf("2. Input Set B\\n");
        printf("3. Display Set A and Set B\\n");
        printf("4. Set Union (A U B)\\n");
        printf("5. Set Intersection (A ^ B)\\n");
        printf("6. Set Difference (A - B and B - A)\\n");
        printf("7. Symmetric Difference (A XOR B)\\n");
        printf("8. Cartesian Product (A x B)\\n");
        printf("9. Subset, Equality & Disjoint Verification\\n");
        printf("10. Power Set P(A)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                sizeA = input_set("Set A", setA);
                print_set("Set A", setA, sizeA);
                break;
            case 2:
                sizeB = input_set("Set B", setB);
                print_set("Set B", setB, sizeB);
                break;
            case 3:
                print_set("Set A", setA, sizeA);
                print_set("Set B", setB, sizeB);
                break;
            case 4: {
                int res_len = set_union(setA, sizeA, setB, sizeB, result);
                print_set("Union (A U B)", result, res_len);
                break;
            }
            case 5: {
                int res_len = set_intersection(setA, sizeA, setB, sizeB, result);
                print_set("Intersection (A ^ B)", result, res_len);
                break;
            }
            case 6: {
                int diffA = set_difference(setA, sizeA, setB, sizeB, result);
                print_set("Difference (A - B)", result, diffA);
                int diffB = set_difference(setB, sizeB, setA, sizeA, result);
                print_set("Difference (B - A)", result, diffB);
                break;
            }
            case 7: {
                int sym_len = set_sym_difference(setA, sizeA, setB, sizeB, result);
                print_set("Symmetric Difference (A XOR B)", result, sym_len);
                break;
            }
            case 8:
                set_cartesian(setA, sizeA, setB, sizeB);
                break;
            case 9:
                check_relationships(setA, sizeA, setB, sizeB);
                break;
            case 10:
                generate_powerset(setA, sizeA);
                break;
            case 0:
                printf("Exiting Set Operations.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "sets", "set-operations"],
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
      description: "Interactive binary relation analyzer verifying reflexivity, symmetry, transitivity, antisymmetry, equivalence classes, and Warshall transitive closure",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_NODES 20

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_matrix(int n, const int mat[MAX_NODES][MAX_NODES]) {
    printf("   ");
    for (int j = 0; j < n; j++) printf("%2d ", j + 1);
    printf("\\n---");
    for (int j = 0; j < n; j++) printf("---");
    printf("\\n");
    for (int i = 0; i < n; i++) {
        printf("%2d|", i + 1);
        for (int j = 0; j < n; j++) {
            printf("%2d ", mat[i][j]);
        }
        printf("\\n");
    }
}

static void print_pairs(int n, const int mat[MAX_NODES][MAX_NODES]) {
    printf("R = { ");
    bool first = true;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (mat[i][j]) {
                if (!first) printf(", ");
                printf("(%d, %d)", i + 1, j + 1);
                first = false;
            }
        }
    }
    printf(" }\\n");
}

static bool is_reflexive(int n, const int mat[MAX_NODES][MAX_NODES]) {
    for (int i = 0; i < n; i++) {
        if (!mat[i][i]) return false;
    }
    return true;
}

static bool is_symmetric(int n, const int mat[MAX_NODES][MAX_NODES]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (mat[i][j] != mat[j][i]) return false;
        }
    }
    return true;
}

static bool is_antisymmetric(int n, const int mat[MAX_NODES][MAX_NODES]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i != j && mat[i][j] && mat[j][i]) return false;
        }
    }
    return true;
}

static bool is_transitive(int n, const int mat[MAX_NODES][MAX_NODES]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (mat[i][j]) {
                for (int k = 0; k < n; k++) {
                    if (mat[j][k] && !mat[i][k]) return false;
                }
            }
        }
    }
    return true;
}

static void find_equivalence_classes(int n, const int mat[MAX_NODES][MAX_NODES]) {
    bool visited[MAX_NODES] = {false};
    printf("\\nEquivalence Classes (Partitions of Universe {1..%d}):\\n", n);
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            printf("[%d] = { ", i + 1);
            bool first = true;
            for (int j = 0; j < n; j++) {
                if (mat[i][j]) {
                    visited[j] = true;
                    if (!first) printf(", ");
                    printf("%d", j + 1);
                    first = false;
                }
            }
            printf(" }\\n");
        }
    }
}

static void compute_transitive_closure(int n, int mat[MAX_NODES][MAX_NODES]) {
    int closure[MAX_NODES][MAX_NODES];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) closure[i][j] = mat[i][j];
    }
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                closure[i][j] = closure[i][j] || (closure[i][k] && closure[k][j]);
            }
        }
    }
    printf("\\nTransitive Closure R+ (Warshall's Algorithm):\\n");
    print_matrix(n, closure);
    print_pairs(n, closure);
}

int main(void) {
    int n = 4;
    int rel[MAX_NODES][MAX_NODES] = {0};
    rel[0][0] = 1; rel[1][1] = 1; rel[2][2] = 1; rel[3][3] = 1;
    rel[0][1] = 1; rel[1][0] = 1;

    int choice;
    do {
        printf("\\n================ EQUIVALENCE RELATIONS ANALYZER ================\\n");
        printf("1. Set Universe Size N and Enter Relation Pairs\\n");
        printf("2. Display Relation Matrix and Pairs\\n");
        printf("3. Check Reflexivity, Symmetry, Antisymmetry, Transitivity\\n");
        printf("4. Verify Equivalence Relation & Compute Equivalence Classes\\n");
        printf("5. Verify Partial Order Relation (Poset)\\n");
        printf("6. Compute Transitive Closure (Warshall's Algorithm)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter universe size N (1 to %d): ", MAX_NODES);
                if (scanf("%d", &n) != 1 || n < 1 || n > MAX_NODES) {
                    clear_input();
                    n = 4;
                    printf("Invalid size.\\n");
                    break;
                }
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) rel[i][j] = 0;
                }
                int pairs;
                printf("Enter number of ordered pairs to insert: ");
                if (scanf("%d", &pairs) != 1 || pairs < 0) { clear_input(); break; }
                printf("Enter %d pairs as 'u v' (1-based indices):\\n", pairs);
                for (int p = 0; p < pairs; p++) {
                    int u, v;
                    if (scanf("%d %d", &u, &v) == 2) {
                        if (u >= 1 && u <= n && v >= 1 && v <= n) {
                            rel[u - 1][v - 1] = 1;
                        }
                    }
                }
                clear_input();
                break;
            }
            case 2:
                printf("\\nUniverse size: %d\\n", n);
                print_matrix(n, rel);
                print_pairs(n, rel);
                break;
            case 3: {
                bool ref = is_reflexive(n, rel);
                bool sym = is_symmetric(n, rel);
                bool anti = is_antisymmetric(n, rel);
                bool trans = is_transitive(n, rel);
                printf("\\nRelation Properties:\\n");
                printf("Reflexive:     %s\\n", ref ? "YES" : "NO");
                printf("Symmetric:     %s\\n", sym ? "YES" : "NO");
                printf("Antisymmetric: %s\\n", anti ? "YES" : "NO");
                printf("Transitive:    %s\\n", trans ? "YES" : "NO");
                break;
            }
            case 4: {
                bool ref = is_reflexive(n, rel);
                bool sym = is_symmetric(n, rel);
                bool trans = is_transitive(n, rel);
                if (ref && sym && trans) {
                    printf("\\nResult: R IS an Equivalence Relation!\\n");
                    find_equivalence_classes(n, rel);
                } else {
                    printf("\\nResult: R is NOT an equivalence relation.\\n");
                    if (!ref) printf("  - Violates Reflexivity\\n");
                    if (!sym) printf("  - Violates Symmetry\\n");
                    if (!trans) printf("  - Violates Transitivity\\n");
                }
                break;
            }
            case 5: {
                bool ref = is_reflexive(n, rel);
                bool anti = is_antisymmetric(n, rel);
                bool trans = is_transitive(n, rel);
                if (ref && anti && trans) {
                    printf("\\nResult: R IS a Partial Order (POSET)!\\n");
                } else {
                    printf("\\nResult: R is NOT a poset.\\n");
                }
                break;
            }
            case 6:
                compute_transitive_closure(n, rel);
                break;
            case 0:
                printf("Exiting Relations Analyzer.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "relations", "equivalence-relations"],
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
      description: "Interactive combinatorics laboratory computing nPr, nCr, repetitions, permutation generation, and Pascal triangle",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static unsigned long long compute_factorial(int n) {
    if (n <= 1) return 1ULL;
    unsigned long long res = 1ULL;
    for (int i = 2; i <= n; i++) res *= (unsigned long long)i;
    return res;
}

static unsigned long long compute_npr(int n, int r) {
    if (r < 0 || r > n) return 0ULL;
    unsigned long long res = 1ULL;
    for (int i = 0; i < r; i++) {
        res *= (unsigned long long)(n - i);
    }
    return res;
}

static unsigned long long compute_ncr(int n, int r) {
    if (r < 0 || r > n) return 0ULL;
    if (r > n - r) r = n - r;
    unsigned long long res = 1ULL;
    for (int i = 1; i <= r; i++) {
        res = res * (unsigned long long)(n - i + 1) / (unsigned long long)i;
    }
    return res;
}

static void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

static void generate_permutations_rec(int* arr, int l, int r, int* count) {
    if (l == r) {
        printf("  %3d: [ ", ++(*count));
        for (int i = 0; i <= r; i++) printf("%d%s", arr[i], (i < r) ? ", " : " ");
        printf("]\\n");
        return;
    }
    for (int i = l; i <= r; i++) {
        swap(&arr[l], &arr[i]);
        generate_permutations_rec(arr, l + 1, r, count);
        swap(&arr[l], &arr[i]);
    }
}

static void print_pascal_triangle(int rows) {
    if (rows > 20) rows = 20;
    printf("\\n--- Pascal's Triangle (First %d Rows) ---\\n", rows);
    for (int n = 0; n < rows; n++) {
        for (int s = 0; s < rows - n - 1; s++) printf("  ");
        for (int k = 0; k <= n; k++) {
            printf("%4llu", compute_ncr(n, k));
        }
        printf("\\n");
    }
}

int main(void) {
    int choice;
    do {
        printf("\\n================ COMBINATORICS WORKBENCH ================\\n");
        printf("1. Compute nPr (Permutations) & nCr (Combinations)\\n");
        printf("2. Compute Factorial (n!)\\n");
        printf("3. Permutations with Repetition (n^r) & Combinations with Repetition (C(n+r-1, r))\\n");
        printf("4. Generate All Permutations of an Array of Size N (N <= 6)\\n");
        printf("5. Print Pascal's Triangle\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int n, r;
                printf("Enter n and r (non-negative integers): ");
                if (scanf("%d %d", &n, &r) == 2 && n >= 0 && r >= 0) {
                    printf("P(%d, %d) = %llu\\n", n, r, compute_npr(n, r));
                    printf("C(%d, %d) = %llu\\n", n, r, compute_ncr(n, r));
                } else {
                    printf("Invalid input.\\n");
                    clear_input();
                }
                break;
            }
            case 2: {
                int n;
                printf("Enter n (0 to 20): ");
                if (scanf("%d", &n) == 1 && n >= 0 && n <= 20) {
                    printf("%d! = %llu\\n", n, compute_factorial(n));
                } else {
                    printf("Out of range or invalid.\\n");
                    clear_input();
                }
                break;
            }
            case 3: {
                int n, r;
                printf("Enter n (distinct items) and r (selections): ");
                if (scanf("%d %d", &n, &r) == 2 && n >= 1 && r >= 0) {
                    unsigned long long n_pow_r = 1ULL;
                    for (int i = 0; i < r; i++) n_pow_r *= (unsigned long long)n;
                    unsigned long long comb_rep = compute_ncr(n + r - 1, r);
                    printf("Permutations with Repetition (n^r)         = %llu\\n", n_pow_r);
                    printf("Combinations with Repetition (C(n+r-1, r)) = %llu\\n", comb_rep);
                } else {
                    printf("Invalid input.\\n");
                    clear_input();
                }
                break;
            }
            case 4: {
                int n;
                printf("Enter array size N (1 to 6): ");
                if (scanf("%d", &n) == 1 && n >= 1 && n <= 6) {
                    int arr[6];
                    for (int i = 0; i < n; i++) arr[i] = i + 1;
                    int count = 0;
                    printf("\\nAll %llu Permutations of {1..%d}:\\n", compute_factorial(n), n);
                    generate_permutations_rec(arr, 0, n - 1, &count);
                } else {
                    printf("Invalid N (limit 6 to prevent terminal overflow).\\n");
                    clear_input();
                }
                break;
            }
            case 5: {
                int rows;
                printf("Enter number of rows (1 to 15): ");
                if (scanf("%d", &rows) == 1 && rows >= 1 && rows <= 15) {
                    print_pascal_triangle(rows);
                } else {
                    printf("Invalid input.\\n");
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting Combinatorics Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "combinatorics", "permutations"],
      aliases: ["prog_acad_permutations_combinations"],
    })
  );

  // 5. Vertex Degrees & Handshaking Lemma
  components.push(
    createComponent({
      id: "academics-programming.discrete-mathematics.graph-theory.vertex-degrees.prog-vertex-degrees",
      name: "prog_acad_vertex_degrees",
      type: "program",
      category: "academics-programming",
      subcategory: "discrete-mathematics",
      categoryId: "academics-programming.discrete-mathematics.graph-theory.vertex-degrees",
      path: "academics-programming/discrete-mathematics/graph-theory/vertex-degrees/prog-vertex-degrees",
      description: "Interactive graph degree analyzer with Handshaking Lemma verification, degree sequence sorting, and Eulerian feasibility test",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_VERTICES 30

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void sort_array_desc(int* arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] < arr[j + 1]) {
                int tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
            }
        }
    }
}

int main(void) {
    int V = 4;
    int adj[MAX_VERTICES][MAX_VERTICES] = {0};
    adj[0][1] = adj[1][0] = 1;
    adj[1][2] = adj[2][1] = 1;
    adj[2][3] = adj[3][2] = 1;
    adj[3][0] = adj[0][3] = 1;

    int choice;
    do {
        printf("\\n================ GRAPH VERTEX DEGREES ANALYZER ================\\n");
        printf("1. Enter Graph (Vertices V and Edge List)\\n");
        printf("2. Display Degrees of All Vertices\\n");
        printf("3. Verify Handshaking Lemma (Sum deg(v) = 2*|E|)\\n");
        printf("4. Display Sorted Degree Sequence & Regular Graph Check\\n");
        printf("5. Check Eulerian Path / Circuit Feasibility\\n");
        printf("6. Identify Isolated & Pendent (Leaf) Vertices\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of vertices V (1 to %d): ", MAX_VERTICES);
                if (scanf("%d", &V) != 1 || V < 1 || V > MAX_VERTICES) {
                    clear_input();
                    V = 4;
                    printf("Invalid V.\\n");
                    break;
                }
                for (int i = 0; i < V; i++) {
                    for (int j = 0; j < V; j++) adj[i][j] = 0;
                }
                int E;
                printf("Enter number of undirected edges E: ");
                if (scanf("%d", &E) != 1 || E < 0) { clear_input(); break; }
                printf("Enter %d edges as 'u v' (1-based indices):\\n", E);
                for (int e = 0; e < E; e++) {
                    int u, v;
                    if (scanf("%d %d", &u, &v) == 2) {
                        if (u >= 1 && u <= V && v >= 1 && v <= V && u != v) {
                            adj[u - 1][v - 1] = 1;
                            adj[v - 1][u - 1] = 1;
                        }
                    }
                }
                clear_input();
                break;
            }
            case 2: {
                printf("\\nVertex Degrees (V = %d):\\n", V);
                for (int i = 0; i < V; i++) {
                    int deg = 0;
                    for (int j = 0; j < V; j++) deg += adj[i][j];
                    printf("  deg(v%d) = %d\\n", i + 1, deg);
                }
                break;
            }
            case 3: {
                int sum_deg = 0;
                int total_edges = 0;
                for (int i = 0; i < V; i++) {
                    int deg = 0;
                    for (int j = 0; j < V; j++) {
                        deg += adj[i][j];
                        if (j > i && adj[i][j]) total_edges++;
                    }
                    sum_deg += deg;
                }
                printf("\\nHandshaking Lemma Verification:\\n");
                printf("Total Edges |E|        = %d\\n", total_edges);
                printf("Sum of Degrees Sum(deg) = %d\\n", sum_deg);
                printf("2 * |E|                = %d\\n", 2 * total_edges);
                if (sum_deg == 2 * total_edges) {
                    printf("VERIFIED: Sum of degrees equals twice the edge count.\\n");
                }
                break;
            }
            case 4: {
                int degrees[MAX_VERTICES];
                for (int i = 0; i < V; i++) {
                    degrees[i] = 0;
                    for (int j = 0; j < V; j++) degrees[i] += adj[i][j];
                }
                sort_array_desc(degrees, V);
                printf("\\nSorted Degree Sequence: [ ");
                for (int i = 0; i < V; i++) printf("%d%s", degrees[i], (i < V - 1) ? ", " : " ");
                printf("]\\n");

                bool regular = true;
                for (int i = 1; i < V; i++) {
                    if (degrees[i] != degrees[0]) { regular = false; break; }
                }
                if (regular) printf("Graph is %d-REGULAR (all vertices have equal degree).\\n", degrees[0]);
                else printf("Graph is NOT regular.\\n");
                break;
            }
            case 5: {
                int odd_count = 0;
                for (int i = 0; i < V; i++) {
                    int deg = 0;
                    for (int j = 0; j < V; j++) deg += adj[i][j];
                    if (deg % 2 != 0) odd_count++;
                }
                printf("\\nEulerian Feasibility Analysis:\\n");
                printf("Vertices with ODD degree: %d\\n", odd_count);
                if (odd_count == 0) {
                    printf("Result: EULERIAN CIRCUIT exists (traverses every edge and returns to start).\\n");
                } else if (odd_count == 2) {
                    printf("Result: EULERIAN TRAIL exists (traverses every edge without returning).\\n");
                } else {
                    printf("Result: NOT Eulerian (no Eulerian circuit or trail exists).\\n");
                }
                break;
            }
            case 6: {
                printf("\\nIsolated and Pendent Vertices:\\n");
                int iso = 0, pend = 0;
                for (int i = 0; i < V; i++) {
                    int deg = 0;
                    for (int j = 0; j < V; j++) deg += adj[i][j];
                    if (deg == 0) { printf("  v%d is ISOLATED (deg 0)\\n", i + 1); iso++; }
                    else if (deg == 1) { printf("  v%d is PENDENT/LEAF (deg 1)\\n", i + 1); pend++; }
                }
                if (iso == 0) printf("No isolated vertices.\\n");
                if (pend == 0) printf("No pendent vertices.\\n");
                break;
            }
            case 0:
                printf("Exiting Vertex Degrees Analyzer.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "graph-theory", "degrees"],
      aliases: ["prog_acad_vertex_degrees"],
    })
  );

  // 6. Planar Euler Characteristic
  components.push(
    createComponent({
      id: "academics-programming.discrete-mathematics.graph-theory.planar-euler.prog-planar-euler",
      name: "prog_acad_planar_euler",
      type: "program",
      category: "academics-programming",
      subcategory: "discrete-mathematics",
      categoryId: "academics-programming.discrete-mathematics.graph-theory.planar-euler",
      path: "academics-programming/discrete-mathematics/graph-theory/planar-euler/prog-planar-euler",
      description: "Interactive planar graph and polyhedra Euler characteristic verifier with Kuratowski bounds and Platonic solids",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void test_platonic_solids(void) {
    printf("\\n--- Regular Platonic Solids Verification (V - E + F = 2) ---\\n");
    printf("Solid          | Vertices (V) | Edges (E) | Faces (F) | V - E + F\\n");
    printf("---------------+--------------+-----------+-----------+----------\\n");
    printf("Tetrahedron    |       4      |     6     |     4     |     %d\\n", 4 - 6 + 4);
    printf("Cube / Hexa    |       8      |    12     |     6     |     %d\\n", 8 - 12 + 6);
    printf("Octahedron     |       6      |    12     |     8     |     %d\\n", 6 - 12 + 8);
    printf("Dodecahedron   |      20      |    30     |    12     |     %d\\n", 20 - 30 + 12);
    printf("Icosahedron    |      12      |    30     |    20     |     %d\\n", 12 - 30 + 20);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ PLANAR EULER CHARACTERISTIC WORKBENCH ================\\n");
        printf("1. Verify Euler's Formula (V - E + F = 2)\\n");
        printf("2. Calculate Unknown Parameter (Solve for F, E, or V)\\n");
        printf("3. Planarity Necessary Bounds Test (E <= 3V - 6 and E <= 2V - 4)\\n");
        printf("4. Display Regular Platonic Solids\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int v, e, f;
                printf("Enter Vertices V, Edges E, Faces F: ");
                if (scanf("%d %d %d", &v, &e, &f) == 3) {
                    int chi = v - e + f;
                    printf("Euler Characteristic chi = V - E + F = %d - %d + %d = %d\\n", v, e, f, chi);
                    if (chi == 2) printf("VERIFIED: Satisfies Euler's formula for planar graphs/convex polyhedra.\\n");
                    else printf("VIOLATION: chi != 2. Not a simple planar connected graph or genus-0 surface.\\n");
                } else {
                    printf("Invalid input.\\n");
                    clear_input();
                }
                break;
            }
            case 2: {
                int mode;
                printf("Select unknown: 1=Solve for Faces F, 2=Solve for Edges E, 3=Solve for Vertices V: ");
                if (scanf("%d", &mode) != 1) { clear_input(); break; }
                if (mode == 1) {
                    int v, e;
                    printf("Enter V and E: ");
                    if (scanf("%d %d", &v, &e) == 2) printf("Calculated Faces F = 2 - V + E = %d\\n", 2 - v + e);
                } else if (mode == 2) {
                    int v, f;
                    printf("Enter V and F: ");
                    if (scanf("%d %d", &v, &f) == 2) printf("Calculated Edges E = V + F - 2 = %d\\n", v + f - 2);
                } else if (mode == 3) {
                    int e, f;
                    printf("Enter E and F: ");
                    if (scanf("%d %d", &e, &f) == 2) printf("Calculated Vertices V = 2 + E - F = %d\\n", 2 + e - f);
                } else {
                    printf("Unknown selection.\\n");
                }
                break;
            }
            case 3: {
                int v, e;
                printf("Enter Vertices V (>= 3) and Edges E: ");
                if (scanf("%d %d", &v, &e) == 2 && v >= 3) {
                    int max_edges_general = 3 * v - 6;
                    int max_edges_bipartite = 2 * v - 4;
                    printf("General Planar Max Edges (3V - 6):        %d\\n", max_edges_general);
                    printf("Triangle-Free / Bipartite Max (2V - 4):    %d\\n", max_edges_bipartite);
                    if (e <= max_edges_general) {
                        printf("PASSES: E <= 3V - 6 (Satisfies general planar necessary condition).\\n");
                    } else {
                        printf("FAILS: E > 3V - 6 (CANNOT be planar: too many edges).\\n");
                    }
                    if (e <= max_edges_bipartite) {
                        printf("PASSES: E <= 2V - 4 (Compatible with triangle-free planar graph).\\n");
                    }
                } else {
                    printf("Invalid input.\\n");
                    clear_input();
                }
                break;
            }
            case 4:
                test_platonic_solids();
                break;
            case 0:
                printf("Exiting Planar Euler Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "discrete-mathematics", "graph-theory", "planar-graphs"],
      aliases: ["prog_acad_planar_euler"],
    })
  );

  return components;
}
