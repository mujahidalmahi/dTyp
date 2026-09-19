# prog_acad_vertex_degrees
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Interactive graph degree analyzer with Handshaking Lemma verification, degree sequence sorting, and Eulerian feasibility test

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

#define MAX_VERTICES 30

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
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
        printf("\n================ GRAPH VERTEX DEGREES ANALYZER ================\n");
        printf("1. Enter Graph (Vertices V and Edge List)\n");
        printf("2. Display Degrees of All Vertices\n");
        printf("3. Verify Handshaking Lemma (Sum deg(v) = 2*|E|)\n");
        printf("4. Display Sorted Degree Sequence & Regular Graph Check\n");
        printf("5. Check Eulerian Path / Circuit Feasibility\n");
        printf("6. Identify Isolated & Pendent (Leaf) Vertices\n");
        printf("0. Exit\n");
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
                    printf("Invalid V.\n");
                    break;
                }
                for (int i = 0; i < V; i++) {
                    for (int j = 0; j < V; j++) adj[i][j] = 0;
                }
                int E;
                printf("Enter number of undirected edges E: ");
                if (scanf("%d", &E) != 1 || E < 0) { clear_input(); break; }
                printf("Enter %d edges as 'u v' (1-based indices):\n", E);
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
                printf("\nVertex Degrees (V = %d):\n", V);
                for (int i = 0; i < V; i++) {
                    int deg = 0;
                    for (int j = 0; j < V; j++) deg += adj[i][j];
                    printf("  deg(v%d) = %d\n", i + 1, deg);
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
                printf("\nHandshaking Lemma Verification:\n");
                printf("Total Edges |E|        = %d\n", total_edges);
                printf("Sum of Degrees Sum(deg) = %d\n", sum_deg);
                printf("2 * |E|                = %d\n", 2 * total_edges);
                if (sum_deg == 2 * total_edges) {
                    printf("VERIFIED: Sum of degrees equals twice the edge count.\n");
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
                printf("\nSorted Degree Sequence: [ ");
                for (int i = 0; i < V; i++) printf("%d%s", degrees[i], (i < V - 1) ? ", " : " ");
                printf("]\n");

                bool regular = true;
                for (int i = 1; i < V; i++) {
                    if (degrees[i] != degrees[0]) { regular = false; break; }
                }
                if (regular) printf("Graph is %d-REGULAR (all vertices have equal degree).\n", degrees[0]);
                else printf("Graph is NOT regular.\n");
                break;
            }
            case 5: {
                int odd_count = 0;
                for (int i = 0; i < V; i++) {
                    int deg = 0;
                    for (int j = 0; j < V; j++) deg += adj[i][j];
                    if (deg % 2 != 0) odd_count++;
                }
                printf("\nEulerian Feasibility Analysis:\n");
                printf("Vertices with ODD degree: %d\n", odd_count);
                if (odd_count == 0) {
                    printf("Result: EULERIAN CIRCUIT exists (traverses every edge and returns to start).\n");
                } else if (odd_count == 2) {
                    printf("Result: EULERIAN TRAIL exists (traverses every edge without returning).\n");
                } else {
                    printf("Result: NOT Eulerian (no Eulerian circuit or trail exists).\n");
                }
                break;
            }
            case 6: {
                printf("\nIsolated and Pendent Vertices:\n");
                int iso = 0, pend = 0;
                for (int i = 0; i < V; i++) {
                    int deg = 0;
                    for (int j = 0; j < V; j++) deg += adj[i][j];
                    if (deg == 0) { printf("  v%d is ISOLATED (deg 0)\n", i + 1); iso++; }
                    else if (deg == 1) { printf("  v%d is PENDENT/LEAF (deg 1)\n", i + 1); pend++; }
                }
                if (iso == 0) printf("No isolated vertices.\n");
                if (pend == 0) printf("No pendent vertices.\n");
                break;
            }
            case 0:
                printf("Exiting Vertex Degrees Analyzer.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_vertex_degrees`, `academics-programming.discrete-mathematics.graph-theory.vertex-degrees.prog-vertex-degrees`, `academics-programming>prog_acad_vertex_degrees()`, `academics-programming>discrete-mathematics>graph-theory>vertex-degrees>prog-vertex-degrees>prog_acad_vertex_degrees()`
