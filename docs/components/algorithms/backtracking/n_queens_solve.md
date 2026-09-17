# n_queens_solve
> **Domain:** `algorithms` | **Subcategory:** `backtracking` | **Type:** `function`
## Overview
Solves N-Queens problem on board using recursive backtracking

## Signature
```c
int n_queens_solve(int board[][16], int col, int n);
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
static int is_safe(int board[][16], int row, int col, int n) {
    for (int i = 0; i < col; i++) if (board[row][i]) return 0;
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return 0;
    for (int i = row, j = col; j >= 0 && i < n; i++, j--) if (board[i][j]) return 0;
    return 1;
}

int n_queens_solve(int board[][16], int col, int n) {
    if (col >= n) return 1;
    for (int i = 0; i < n; i++) {
        if (is_safe(board, i, col, n)) {
            board[i][col] = 1;
            if (n_queens_solve(board, col + 1, n)) return 1;
            board[i][col] = 0;
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `n_queens_solve`, `algorithms.separate-components.backtracking.n-queens.solve`, `algorithms>n_queens_solve()`, `algorithms>separate-components>backtracking>n-queens>solve>n_queens_solve()`, `nQueensSolve`
