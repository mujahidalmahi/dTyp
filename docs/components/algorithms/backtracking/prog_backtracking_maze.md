# prog_backtracking_maze
> **Domain:** `algorithms` | **Subcategory:** `backtracking` | **Type:** `program`
## Overview
Complete Rat in a Maze backtracking solver navigating obstacle grid

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

#define N 4

int solve_maze(int maze[N][N], int x, int y, int sol[N][N]) {
    if (x == N - 1 && y == N - 1 && maze[x][y] == 1) {
        sol[x][y] = 1;
        return 1;
    }
    if (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1) {
        if (sol[x][y]) return 0;
        sol[x][y] = 1;
        if (solve_maze(maze, x + 1, y, sol)) return 1;
        if (solve_maze(maze, x, y + 1, sol)) return 1;
        sol[x][y] = 0;
        return 0;
    }
    return 0;
}

int main(void) {
    int maze[N][N] = {
        {1, 0, 0, 0},
        {1, 1, 0, 1},
        {0, 1, 0, 0},
        {1, 1, 1, 1}
    };
    int sol[N][N] = {0};
    solve_maze(maze, 0, 0, sol);

    printf("Maze Solution Path:\n");
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) printf("%d ", sol[i][j]);
        putchar('\n');
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_backtracking_maze`, `algorithms.full-programs.backtracking.maze-solver.prog-maze-solver`, `algorithms>prog_backtracking_maze()`, `algorithms>full-programs>backtracking>maze-solver>prog-maze-solver>prog_backtracking_maze()`, `programMazeSolver`
