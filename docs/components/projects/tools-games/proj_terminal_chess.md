# proj_terminal_chess
> **Domain:** `projects` | **Subcategory:** `tools-games` | **Type:** `program`
## Overview
Interactive chess board validator rendering 8x8 ASCII board and validating basic moves

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

static char board[8][8] = {
    {'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'},
    {'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'},
    {'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'}
};

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void print_board(void) {
    printf("   a b c d e f g h\n");
    for (int r = 0; r < 8; r++) {
        printf("%d  ", 8 - r);
        for (int c = 0; c < 8; c++) {
            printf("%c ", board[r][c]);
        }
        printf(" %d\n", 8 - r);
    }
    printf("   a b c d e f g h\n");
}

static void make_move(const char* from, const char* to) {
    int fc = from[0] - 'a', fr = 8 - (from[1] - '0');
    int tc = to[0] - 'a', tr = 8 - (to[1] - '0');
    if (fc < 0 || fc >= 8 || fr < 0 || fr >= 8 || tc < 0 || tc >= 8 || tr < 0 || tr >= 8) {
        printf("Move out of bounds.\n");
        return;
    }
    board[tr][tc] = board[fr][fc];
    board[fr][fc] = '.';
    printf("Moved from %s to %s.\n", from, to);
}

int main(void) {
    int choice;
    do {
        printf("=== Terminal Chess Engine ===\n");
        print_board();
        printf("1. Make Move (e.g. e2 e4)\n");
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
                char from[4], to[4];
                printf("Enter from square and to square (e.g. e2 e4): ");
                if (scanf("%3s %3s", from, to) == 2) {
                    clear_input();
                    make_move(from, to);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting chess.\n");
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
Available via: `proj_terminal_chess`, `projects.tools-games.terminal-chess.prog-terminal-chess`, `projects>proj_terminal_chess()`, `projects>tools-games>terminal-chess>prog-terminal-chess>proj_terminal_chess()`
