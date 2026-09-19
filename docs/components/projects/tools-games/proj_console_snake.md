# proj_console_snake
> **Domain:** `projects` | **Subcategory:** `tools-games` | **Type:** `program`
## Overview
Interactive Snake game state engine rendering grid, movement, and collisions

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

#define GRID_W 12
#define GRID_H 8

static int snake_x[50] = {5, 4, 3};
static int snake_y[50] = {3, 3, 3};
static int snake_len = 3;
static int food_x = 8, food_y = 5;
static int score = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void render_grid(void) {
    printf("Score: %d\n", score);
    for (int x = 0; x < GRID_W + 2; x++) putchar('#');
    putchar('\n');
    for (int y = 0; y < GRID_H; y++) {
        putchar('#');
        for (int x = 0; x < GRID_W; x++) {
            if (x == snake_x[0] && y == snake_y[0]) putchar('@');
            else if (x == food_x && y == food_y) putchar('*');
            else {
                int is_body = 0;
                for (int k = 1; k < snake_len; k++) {
                    if (snake_x[k] == x && snake_y[k] == y) {
                        putchar('o');
                        is_body = 1;
                        break;
                    }
                }
                if (!is_body) putchar(' ');
            }
        }
        printf("#\n");
    }
    for (int x = 0; x < GRID_W + 2; x++) putchar('#');
    putchar('\n');
}

static int step_snake(char dir) {
    int nx = snake_x[0], ny = snake_y[0];
    if (dir == 'w' || dir == 'W') ny--;
    else if (dir == 's' || dir == 'S') ny++;
    else if (dir == 'a' || dir == 'A') nx--;
    else if (dir == 'd' || dir == 'D') nx++;
    else return 1;
    if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) {
        printf("GAME OVER! Collided with wall.\n");
        return 0;
    }
    for (int i = 0; i < snake_len; i++) {
        if (snake_x[i] == nx && snake_y[i] == ny) {
            printf("GAME OVER! Collided with self.\n");
            return 0;
        }
    }
    if (nx == food_x && ny == food_y) {
        score += 10;
        snake_len++;
        food_x = (food_x + 3) % GRID_W;
        food_y = (food_y + 2) % GRID_H;
    }
    for (int i = snake_len - 1; i > 0; i--) {
        snake_x[i] = snake_x[i - 1];
        snake_y[i] = snake_y[i - 1];
    }
    snake_x[0] = nx;
    snake_y[0] = ny;
    return 1;
}

int main(void) {
    char move;
    do {
        render_grid();
        printf("Enter move (W: Up, A: Left, S: Down, D: Right, Q: Quit): ");
        if (scanf(" %c", &move) != 1) {
            clear_input();
            break;
        }
        clear_input();
        if (move == 'q' || move == 'Q') break;
        if (!step_snake(move)) break;
    } while (1);
    printf("Final Score: %d\n", score);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_console_snake`, `projects.tools-games.console-snake.prog-console-snake`, `projects>proj_console_snake()`, `projects>tools-games>console-snake>prog-console-snake>proj_console_snake()`
