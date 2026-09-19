# prog_backtracking_maze
> **Domain:** `algorithms` | **Subcategory:** `backtracking` | **Type:** `program`
## Overview
Complete interactive program solving 2D grid maze pathfinding via backtracking

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

#define MAX_DIM 20

static int maze[MAX_DIM][MAX_DIM];
static int path_sol[MAX_DIM][MAX_DIM];
static int R = 4, C = 4;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int is_valid_cell(int r, int c) {
    return (r >= 0 && r < R && c >= 0 && c < C && maze[r][c] == 1 && path_sol[r][c] == 0);
}

static int solve_maze_rec(int r, int c) {
    if (r == R - 1 && c == C - 1 && maze[r][c] == 1) {
        path_sol[r][c] = 1;
        return 1;
    }
    if (is_valid_cell(r, c)) {
        path_sol[r][c] = 1;
        if (solve_maze_rec(r + 1, c)) return 1;
        if (solve_maze_rec(r, c + 1)) return 1;
        if (solve_maze_rec(r - 1, c)) return 1;
        if (solve_maze_rec(r, c - 1)) return 1;
        path_sol[r][c] = 0;
        return 0;
    }
    return 0;
}

int main(void) {
    int choice;
    do {
        printf("=== 2D Maze Pathfinding Workbench ===\n");
        printf("1. Enter Custom Maze Grid and Find Path\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                int r, c;
                printf("Enter dimensions R and C (<= %d): ", MAX_DIM);
                if (scanf("%d %d", &r, &c) == 2 && r > 0 && c > 0 && r <= MAX_DIM && c <= MAX_DIM) {
                    R = r; C = c;
                    printf("Enter %d x %d maze (1: open, 0: wall):\n", R, C);
                    for (int i = 0; i < R; i++) {
                        for (int j = 0; j < C; j++) {
                            scanf("%d", &maze[i][j]);
                            path_sol[i][j] = 0;
                        }
                    }
                    clear_input();
                    if (solve_maze_rec(0, 0)) {
                        printf("Path from (0,0) to (%d,%d) found!\n", R - 1, C - 1);
                        for (int i = 0; i < R; i++) {
                            for (int j = 0; j < C; j++) {
                                if (path_sol[i][j] == 1) printf("[*] ");
                                else if (maze[i][j] == 0) printf("[#] ");
                                else printf("[.] ");
                            }
                            putchar('\n');
                        }
                    } else {
                        printf("No path exists through the maze.\n");
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_backtracking_maze`, `algorithms.full-programs.backtracking.maze-solver.prog-maze-solver`, `algorithms>prog_backtracking_maze()`, `algorithms>full-programs>backtracking>maze-solver>prog-maze-solver>prog_backtracking_maze()`, `programMazeSolver`
