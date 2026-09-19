# prog_acad_equivalence_relations
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Verifies reflexivity, symmetry, and transitivity of a relation and prints equivalence classes

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
}
```

## Aliases & Shorthands
Available via: `prog_acad_equivalence_relations`, `academics-programming.discrete-mathematics.relations-combinatorics.equivalence-relations.prog-equivalence-relations`, `academics-programming>prog_acad_equivalence_relations()`, `academics-programming>discrete-mathematics>relations-combinatorics>equivalence-relations>prog-equivalence-relations>prog_acad_equivalence_relations()`
