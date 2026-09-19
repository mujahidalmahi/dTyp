# prog_graph_dsu
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `program`
## Overview
Interactive Disjoint Set Union (DSU) program with path compression and union by rank

## Signature
```c
int main(void)
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
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

typedef struct DSU {
    int* parent;
    int* rank;
    int n;
} DSU;

DSU* dsu_create(int n) {
    DSU* d = (DSU*)malloc(sizeof(DSU));
    d->n = n;
    d->parent = (int*)malloc(n * sizeof(int));
    d->rank = (int*)calloc(n, sizeof(int));
    for (int i = 0; i < n; i++) d->parent[i] = i;
    return d;
}

int dsu_find(DSU* d, int i) {
    if (d->parent[i] == i) return i;
    return d->parent[i] = dsu_find(d, d->parent[i]);
}

bool dsu_union(DSU* d, int i, int j) {
    int root_i = dsu_find(d, i);
    int root_j = dsu_find(d, j);
    if (root_i == root_j) return false;
    if (d->rank[root_i] < d->rank[root_j]) d->parent[root_i] = root_j;
    else if (d->rank[root_i] > d->rank[root_j]) d->parent[root_j] = root_i;
    else {
        d->parent[root_j] = root_i;
        d->rank[root_i]++;
    }
    return true;
}

void dsu_free(DSU* d) {
    if (d) {
        free(d->parent);
        free(d->rank);
        free(d);
    }
}

int main(void) {
    int n = 8;
    DSU* d = dsu_create(n);
    int choice;

    do {
        printf("\n=== Disjoint Set Union (DSU) Menu (Elements: 0-%d) ===\n", n - 1);
        printf("1. Union Sets (u, v)\n");
        printf("2. Find Set Representative of x\n");
        printf("3. Check Connected (Are u and v in same set?)\n");
        printf("4. Display All Element Representatives\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int u, v;
                printf("Enter pair (u v): ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    if (dsu_union(d, u, v)) printf("Merged set containing %d and set containing %d.\n", u, v);
                    else printf("%d and %d were already in the same set.\n", u, v);
                } else clear_input();
                break;
            }
            case 2: {
                int x;
                printf("Enter element x (0-%d): ", n - 1);
                if (scanf("%d", &x) == 1 && x >= 0 && x < n) {
                    printf("Representative (Leader) of %d is %d.\n", x, dsu_find(d, x));
                } else clear_input();
                break;
            }
            case 3: {
                int u, v;
                printf("Enter pair to check (u v): ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    printf("Are %d and %d connected? %s\n", u, v, dsu_find(d, u) == dsu_find(d, v) ? "YES" : "NO");
                } else clear_input();
                break;
            }
            case 4:
                printf("Element -> Leader: ");
                for (int i = 0; i < n; i++) printf("[%d -> %d] ", i, dsu_find(d, i));
                printf("\n");
                break;
            case 0:
                printf("Exiting DSU Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    dsu_free(d);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_dsu`, `data-structures.full-programs.graphs.dsu.prog-graph-dsu`, `data-structures>prog_graph_dsu()`, `data-structures>full-programs>graphs>dsu>prog-graph-dsu>prog_graph_dsu()`, `programGraphDSU`
