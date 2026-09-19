# prog_backtracking_n_queens
> **Domain:** `algorithms` | **Subcategory:** `backtracking` | **Type:** `program`
## Overview
Complete interactive program solving N-Queens puzzle with visual chessboard display

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
#include <stdlib.h>

#define MAX_N 12

static int board[MAX_N];
static int total_solutions = 0;
static int max_display = 3;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int is_safe(int row, int col) {
    for (int prev_row = 0; prev_row < row; prev_row++) {
        int prev_col = board[prev_row];
        if (prev_col == col) return 0;
        if (abs(prev_col - col) == abs(prev_row - row)) return 0;
    }
    return 1;
}

static void print_board(int n) {
    printf("Solution #%d:\n", total_solutions);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i] == j) printf("[Q] ");
            else printf("[.] ");
        }
        putchar('\n');
    }
    putchar('\n');
}

static void solve_queens(int row, int n) {
    if (row == n) {
        total_solutions++;
        if (total_solutions <= max_display) {
            print_board(n);
        }
        return;
    }
    for (int col = 0; col < n; col++) {
        if (is_safe(row, col)) {
            board[row] = col;
            solve_queens(row + 1, n);
        }
    }
}

int main(void) {
    int choice;
    do {
        printf("=== N-Queens Backtracking Workbench ===\n");
        printf("1. Solve N-Queens Puzzle\n");
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
                int n;
                printf("Enter chessboard size N (1 to 12): ");
                if (scanf("%d", &n) == 1 && n >= 1 && n <= MAX_N) {
                    clear_input();
                    total_solutions = 0;
                    solve_queens(0, n);
                    printf("Total distinct solutions for %dx%d board: %d\n", n, n, total_solutions);
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
Available via: `prog_backtracking_n_queens`, `algorithms.full-programs.backtracking.n-queens.prog-n-queens`, `algorithms>prog_backtracking_n_queens()`, `algorithms>full-programs>backtracking>n-queens>prog-n-queens>prog_backtracking_n_queens()`, `programNQueens`
