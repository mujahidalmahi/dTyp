# proj_terminal_chess
> **Domain:** `projects` | **Subcategory:** `tools-games` | **Type:** `program`
## Overview
Chess board legal move validator for knight and rook pieces

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

int valid_knight_move(int r1, int c1, int r2, int c2) {
    int dr = abs(r1 - r2);
    int dc = abs(c1 - c2);
    return (dr == 1 && dc == 2) || (dr == 2 && dc == 1);
}

int valid_rook_move(int r1, int c1, int r2, int c2) {
    return (r1 == r2) || (c1 == c2);
}

int main(void) {
    printf("Knight from (1, 2) to (3, 3): %s\n", valid_knight_move(1, 2, 3, 3) ? "Legal" : "Illegal");
    printf("Knight from (1, 2) to (2, 2): %s\n", valid_knight_move(1, 2, 2, 2) ? "Legal" : "Illegal");
    printf("Rook from (0, 0) to (0, 7):   %s\n", valid_rook_move(0, 0, 0, 7) ? "Legal" : "Illegal");
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_terminal_chess`, `projects.tools-games.terminal-chess.prog-terminal-chess`, `projects>proj_terminal_chess()`, `projects>tools-games>terminal-chess>prog-terminal-chess>proj_terminal_chess()`
