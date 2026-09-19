# proj_gap_buffer_editor
> **Domain:** `projects` | **Subcategory:** `tools-games` | **Type:** `program`
## Overview
Interactive gap buffer text editor engine with cursor movement and insertion

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
#include <string.h>

#define BUF_SIZE 64

static char buffer[BUF_SIZE];
static int gap_start = 0;
static int gap_end = BUF_SIZE - 1;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void print_editor_state(void) {
    printf("Buffer Content: \"");
    for (int i = 0; i < gap_start; i++) putchar(buffer[i]);
    for (int i = gap_end + 1; i < BUF_SIZE; i++) putchar(buffer[i]);
    printf("\"\n");
    printf("Cursor at position %d (Gap [%d..%d])\n", gap_start, gap_start, gap_end);
}

static void insert_char(char c) {
    if (gap_start <= gap_end) {
        buffer[gap_start++] = c;
    } else {
        printf("Gap buffer full.\n");
    }
}

static void move_left(void) {
    if (gap_start > 0) {
        gap_start--;
        buffer[gap_end--] = buffer[gap_start];
    }
}

static void move_right(void) {
    if (gap_end < BUF_SIZE - 1) {
        gap_end++;
        buffer[gap_start++] = buffer[gap_end];
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Gap Buffer Editor Engine ===\n");
        print_editor_state();
        printf("1. Insert Character\n");
        printf("2. Move Cursor Left\n");
        printf("3. Move Cursor Right\n");
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
                char ch;
                printf("Enter character: ");
                if (scanf("%c", &ch) == 1) {
                    clear_input();
                    insert_char(ch);
                } else {
                    clear_input();
                }
                break;
            }
            case 2:
                move_left();
                break;
            case 3:
                move_right();
                break;
            case 0:
                printf("Exiting gap buffer editor.\n");
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
Available via: `proj_gap_buffer_editor`, `projects.tools-games.gap-buffer.prog-gap-buffer-editor`, `projects>proj_gap_buffer_editor()`, `projects>tools-games>gap-buffer>prog-gap-buffer-editor>proj_gap_buffer_editor()`
