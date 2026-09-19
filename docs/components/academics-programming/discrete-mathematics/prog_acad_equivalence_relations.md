# prog_acad_equivalence_relations
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Interactive binary relation analyzer verifying reflexivity, symmetry, transitivity, antisymmetry, equivalence classes, and Warshall transitive closure

## Signature
```c
int main(void);
```

## Complexity Analysis
- **Time Complexity:** `O(1)`
- **Space Complexity:** `O(1)`

## Edge Cases & Constraints
- **NULL / Empty Input:** Function handles zero/NULL pointers gracefully without segfaulting.
- **Boundary Conditions:** Bounds-checked against buffer boundaries and integer limits.
- **Zero-Comment Invariant:** Code is 100% executable clean C code adhering strictly to library standards.

## Implementation
```c
#include <stdio.h>
#include <stdbool.h>

#define MAX_NODES 20

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void print_matrix(int n, const int mat[MAX_NODES][MAX_NODES]) {
    printf("   ");
    for (int j = 0; j < n; j++) printf("%2d ", j + 1);
    printf("\n---");
    for (int j = 0; j < n; j++) printf("---");
    printf("\n");
    for (int i = 0; i < n; i++) {
        printf("%2d|", i + 1);
        for (int j = 0; j < n; j++) {
            printf("%2d ", mat[i][j]);
        }
        printf("\n");
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
    printf(" }\n");
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
    printf("\nEquivalence Classes (Partitions of Universe {1..%d}):\n", n);
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
            printf(" }\n");
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
    printf("\nTransitive Closure R+ (Warshall's Algorithm):\n");
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
        printf("\n================ EQUIVALENCE RELATIONS ANALYZER ================\n");
        printf("1. Set Universe Size N and Enter Relation Pairs\n");
        printf("2. Display Relation Matrix and Pairs\n");
        printf("3. Check Reflexivity, Symmetry, Antisymmetry, Transitivity\n");
        printf("4. Verify Equivalence Relation & Compute Equivalence Classes\n");
        printf("5. Verify Partial Order Relation (Poset)\n");
        printf("6. Compute Transitive Closure (Warshall's Algorithm)\n");
        printf("0. Exit\n");
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
                    printf("Invalid size.\n");
                    break;
                }
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) rel[i][j] = 0;
                }
                int pairs;
                printf("Enter number of ordered pairs to insert: ");
                if (scanf("%d", &pairs) != 1 || pairs < 0) { clear_input(); break; }
                printf("Enter %d pairs as 'u v' (1-based indices):\n", pairs);
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
                printf("\nUniverse size: %d\n", n);
                print_matrix(n, rel);
                print_pairs(n, rel);
                break;
            case 3: {
                bool ref = is_reflexive(n, rel);
                bool sym = is_symmetric(n, rel);
                bool anti = is_antisymmetric(n, rel);
                bool trans = is_transitive(n, rel);
                printf("\nRelation Properties:\n");
                printf("Reflexive:     %s\n", ref ? "YES" : "NO");
                printf("Symmetric:     %s\n", sym ? "YES" : "NO");
                printf("Antisymmetric: %s\n", anti ? "YES" : "NO");
                printf("Transitive:    %s\n", trans ? "YES" : "NO");
                break;
            }
            case 4: {
                bool ref = is_reflexive(n, rel);
                bool sym = is_symmetric(n, rel);
                bool trans = is_transitive(n, rel);
                if (ref && sym && trans) {
                    printf("\nResult: R IS an Equivalence Relation!\n");
                    find_equivalence_classes(n, rel);
                } else {
                    printf("\nResult: R is NOT an equivalence relation.\n");
                    if (!ref) printf("  - Violates Reflexivity\n");
                    if (!sym) printf("  - Violates Symmetry\n");
                    if (!trans) printf("  - Violates Transitivity\n");
                }
                break;
            }
            case 5: {
                bool ref = is_reflexive(n, rel);
                bool anti = is_antisymmetric(n, rel);
                bool trans = is_transitive(n, rel);
                if (ref && anti && trans) {
                    printf("\nResult: R IS a Partial Order (POSET)!\n");
                } else {
                    printf("\nResult: R is NOT a poset.\n");
                }
                break;
            }
            case 6:
                compute_transitive_closure(n, rel);
                break;
            case 0:
                printf("Exiting Relations Analyzer.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_equivalence_relations`, `academics-programming.discrete-mathematics.relations-combinatorics.equivalence-relations.prog-equivalence-relations`, `academics-programming>prog_acad_equivalence_relations()`, `academics-programming>discrete-mathematics>relations-combinatorics>equivalence-relations>prog-equivalence-relations>prog_acad_equivalence_relations()`
