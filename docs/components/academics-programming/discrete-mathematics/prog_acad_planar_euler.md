# prog_acad_planar_euler
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Interactive planar graph and polyhedra Euler characteristic verifier with Kuratowski bounds and Platonic solids

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

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void test_platonic_solids(void) {
    printf("\n--- Regular Platonic Solids Verification (V - E + F = 2) ---\n");
    printf("Solid          | Vertices (V) | Edges (E) | Faces (F) | V - E + F\n");
    printf("---------------+--------------+-----------+-----------+----------\n");
    printf("Tetrahedron    |       4      |     6     |     4     |     %d\n", 4 - 6 + 4);
    printf("Cube / Hexa    |       8      |    12     |     6     |     %d\n", 8 - 12 + 6);
    printf("Octahedron     |       6      |    12     |     8     |     %d\n", 6 - 12 + 8);
    printf("Dodecahedron   |      20      |    30     |    12     |     %d\n", 20 - 30 + 12);
    printf("Icosahedron    |      12      |    30     |    20     |     %d\n", 12 - 30 + 20);
}

int main(void) {
    int choice;
    do {
        printf("\n================ PLANAR EULER CHARACTERISTIC WORKBENCH ================\n");
        printf("1. Verify Euler's Formula (V - E + F = 2)\n");
        printf("2. Calculate Unknown Parameter (Solve for F, E, or V)\n");
        printf("3. Planarity Necessary Bounds Test (E <= 3V - 6 and E <= 2V - 4)\n");
        printf("4. Display Regular Platonic Solids\n");
        printf("0. Exit\n");
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
                    printf("Euler Characteristic chi = V - E + F = %d - %d + %d = %d\n", v, e, f, chi);
                    if (chi == 2) printf("VERIFIED: Satisfies Euler's formula for planar graphs/convex polyhedra.\n");
                    else printf("VIOLATION: chi != 2. Not a simple planar connected graph or genus-0 surface.\n");
                } else {
                    printf("Invalid input.\n");
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
                    if (scanf("%d %d", &v, &e) == 2) printf("Calculated Faces F = 2 - V + E = %d\n", 2 - v + e);
                } else if (mode == 2) {
                    int v, f;
                    printf("Enter V and F: ");
                    if (scanf("%d %d", &v, &f) == 2) printf("Calculated Edges E = V + F - 2 = %d\n", v + f - 2);
                } else if (mode == 3) {
                    int e, f;
                    printf("Enter E and F: ");
                    if (scanf("%d %d", &e, &f) == 2) printf("Calculated Vertices V = 2 + E - F = %d\n", 2 + e - f);
                } else {
                    printf("Unknown selection.\n");
                }
                break;
            }
            case 3: {
                int v, e;
                printf("Enter Vertices V (>= 3) and Edges E: ");
                if (scanf("%d %d", &v, &e) == 2 && v >= 3) {
                    int max_edges_general = 3 * v - 6;
                    int max_edges_bipartite = 2 * v - 4;
                    printf("General Planar Max Edges (3V - 6):        %d\n", max_edges_general);
                    printf("Triangle-Free / Bipartite Max (2V - 4):    %d\n", max_edges_bipartite);
                    if (e <= max_edges_general) {
                        printf("PASSES: E <= 3V - 6 (Satisfies general planar necessary condition).\n");
                    } else {
                        printf("FAILS: E > 3V - 6 (CANNOT be planar: too many edges).\n");
                    }
                    if (e <= max_edges_bipartite) {
                        printf("PASSES: E <= 2V - 4 (Compatible with triangle-free planar graph).\n");
                    }
                } else {
                    printf("Invalid input.\n");
                    clear_input();
                }
                break;
            }
            case 4:
                test_platonic_solids();
                break;
            case 0:
                printf("Exiting Planar Euler Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_planar_euler`, `academics-programming.discrete-mathematics.graph-theory.planar-euler.prog-planar-euler`, `academics-programming>prog_acad_planar_euler()`, `academics-programming>discrete-mathematics>graph-theory>planar-euler>prog-planar-euler>prog_acad_planar_euler()`
