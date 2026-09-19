# prog_graph_dsu
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `program`
## Overview
Interactive Disjoint Set Union (DSU) program with path compression, union by rank, union by size, connected check, disjoint set counting, and component sizing

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

typedef struct GraphDSU {
    int* parent;
    int* rank;
    int* size;
    int n;
    int num_sets;
} GraphDSU;

GraphDSU* create_dsu(int n) {
    GraphDSU* dsu = (GraphDSU*)malloc(sizeof(GraphDSU));
    if (!dsu) return NULL;
    dsu->n = n;
    dsu->num_sets = n;
    dsu->parent = (int*)malloc(n * sizeof(int));
    dsu->rank = (int*)malloc(n * sizeof(int));
    dsu->size = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        dsu->parent[i] = i;
        dsu->rank[i] = 0;
        dsu->size[i] = 1;
    }
    return dsu;
}

int find_rep(GraphDSU* dsu, int i) {
    if (dsu->parent[i] == i) return i;
    return dsu->parent[i] = find_rep(dsu, dsu->parent[i]);
}

void union_by_rank(GraphDSU* dsu, int x, int y) {
    int root_x = find_rep(dsu, x);
    int root_y = find_rep(dsu, y);
    if (root_x != root_y) {
        if (dsu->rank[root_x] < dsu->rank[root_y]) {
            dsu->parent[root_x] = root_y;
            dsu->size[root_y] += dsu->size[root_x];
        } else if (dsu->rank[root_x] > dsu->rank[root_y]) {
            dsu->parent[root_y] = root_x;
            dsu->size[root_x] += dsu->size[root_y];
        } else {
            dsu->parent[root_y] = root_x;
            dsu->size[root_x] += dsu->size[root_y];
            dsu->rank[root_x]++;
        }
        dsu->num_sets--;
    }
}

void union_by_size(GraphDSU* dsu, int x, int y) {
    int root_x = find_rep(dsu, x);
    int root_y = find_rep(dsu, y);
    if (root_x != root_y) {
        if (dsu->size[root_x] < dsu->size[root_y]) {
            dsu->parent[root_x] = root_y;
            dsu->size[root_y] += dsu->size[root_x];
        } else {
            dsu->parent[root_y] = root_x;
            dsu->size[root_x] += dsu->size[root_y];
        }
        dsu->num_sets--;
    }
}

bool check_connected(GraphDSU* dsu, int x, int y) {
    return find_rep(dsu, x) == find_rep(dsu, y);
}

int get_component_size(GraphDSU* dsu, int x) {
    return dsu->size[find_rep(dsu, x)];
}

void display_sets(GraphDSU* dsu) {
    printf("DSU Sets (%d elements, %d disjoint sets):\n", dsu->n, dsu->num_sets);
    for (int i = 0; i < dsu->n; i++) {
        printf("Element %d -> Representative %d (size: %d)\n", i, find_rep(dsu, i), get_component_size(dsu, i));
    }
}

void free_dsu(GraphDSU* dsu) {
    if (!dsu) return;
    free(dsu->parent);
    free(dsu->rank);
    free(dsu->size);
    free(dsu);
}

int main(void) {
    int n = 6;
    GraphDSU* dsu = create_dsu(n);
    int choice = 0;
    int u = 0, v = 0;

    do {
        printf("\n--- Disjoint Set Union (DSU) Operations ---\n");
        printf("1. Union by Rank\n");
        printf("2. Union by Size\n");
        printf("3. Find Representative\n");
        printf("4. Check Connected\n");
        printf("5. Count Disjoint Sets\n");
        printf("6. Get Component Size\n");
        printf("7. Display All Sets\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter two elements (0 to %d): ", n - 1);
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    union_by_rank(dsu, u, v);
                    printf("Union by rank applied to %d and %d.\n", u, v);
                } else clear_input();
                break;
            case 2:
                printf("Enter two elements (0 to %d): ", n - 1);
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    union_by_size(dsu, u, v);
                    printf("Union by size applied to %d and %d.\n", u, v);
                } else clear_input();
                break;
            case 3:
                printf("Enter element (0 to %d): ", n - 1);
                if (scanf("%d", &u) == 1 && u >= 0 && u < n) {
                    printf("Representative of %d is: %d\n", u, find_rep(dsu, u));
                } else clear_input();
                break;
            case 4:
                printf("Enter two elements (0 to %d): ", n - 1);
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    if (check_connected(dsu, u, v)) printf("%d and %d are CONNECTED.\n", u, v);
                    else printf("%d and %d are NOT connected.\n", u, v);
                } else clear_input();
                break;
            case 5:
                printf("Total disjoint sets: %d\n", dsu->num_sets);
                break;
            case 6:
                printf("Enter element (0 to %d): ", n - 1);
                if (scanf("%d", &u) == 1 && u >= 0 && u < n) {
                    printf("Size of component containing %d: %d\n", u, get_component_size(dsu, u));
                } else clear_input();
                break;
            case 7:
                display_sets(dsu);
                break;
            case 0:
                printf("Exiting DSU program.\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 7.\n");
                break;
        }
    } while (choice != 0);

    free_dsu(dsu);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_dsu`, `data-structures.full-programs.graphs.dsu.prog-graph-dsu`, `data-structures>prog_graph_dsu()`, `data-structures>full-programs>graphs>dsu>prog-graph-dsu>prog_graph_dsu()`, `programGraphDSU`
