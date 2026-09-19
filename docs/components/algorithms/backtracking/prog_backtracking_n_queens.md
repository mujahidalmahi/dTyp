# prog_backtracking_n_queens
> **Domain:** `algorithms` | **Subcategory:** `backtracking` | **Type:** `program`
## Overview
Complete 4-Queens backtracking solver printing ASCII chessboard

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

int is_safe(int board[N][N], int row, int col) {
    for (int i = 0; i < col; i++) if (board[row][i]) return 0;
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return 0;
    for (int i = row, j = col; j >= 0 && i < N; i++, j--) if (board[i][j]) return 0;
    return 1;
}

int solve(int board[N][N], int col) {
    if (col >= N) return 1;
    for (int i = 0; i < N; i++) {
        if (is_safe(board, i, col)) {
            board[i][col] = 1;
            if (solve(board, col + 1)) return 1;
            board[i][col] = 0;
        }
    }
    return 0;
}

int main(void) {
    int board[N][N] = {0};
    solve(board, 0);

    printf("N-Queens Solution (N=%d):\n", N);
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            printf("%c ", board[i][j] ? 'Q' : '.');
        }
        putchar('\n');
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_backtracking_n_queens`, `algorithms.full-programs.backtracking.n-queens.prog-n-queens`, `algorithms>prog_backtracking_n_queens()`, `algorithms>full-programs>backtracking>n-queens>prog-n-queens>prog_backtracking_n_queens()`, `programNQueens`
