# rat_in_maze_solve
> **Domain:** `algorithms` | **Subcategory:** `backtracking` | **Type:** `function`
## Overview
Finds path through 2D obstacle grid using backtracking

## Signature
```c
int rat_in_maze_solve(int maze[][8], int x, int y, int sol[][8], int n);
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
int rat_in_maze_solve(int maze[][8], int x, int y, int sol[][8], int n) {
    if (x == n - 1 && y == n - 1 && maze[x][y] == 1) {
        sol[x][y] = 1;
        return 1;
    }
    if (x >= 0 && x < n && y >= 0 && y < n && maze[x][y] == 1) {
        if (sol[x][y] == 1) return 0;
        sol[x][y] = 1;
        if (rat_in_maze_solve(maze, x + 1, y, sol, n)) return 1;
        if (rat_in_maze_solve(maze, x, y + 1, sol, n)) return 1;
        sol[x][y] = 0;
        return 0;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `rat_in_maze_solve`, `algorithms.separate-components.backtracking.maze-solver.solve`, `algorithms>rat_in_maze_solve()`, `algorithms>separate-components>backtracking>maze-solver>solve>rat_in_maze_solve()`, `ratInMaze`
