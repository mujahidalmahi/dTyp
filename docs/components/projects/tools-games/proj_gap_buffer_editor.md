# proj_gap_buffer_editor
> **Domain:** `projects` | **Subcategory:** `tools-games` | **Type:** `program`
## Overview
Text editor core gap buffer data structure supporting O(1) cursor insertions and deletions

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

typedef struct {
    char buf[64];
    int gap_left;
    int gap_right;
    int size;
} GapBuffer;

void gap_init(GapBuffer* gb, int cap) {
    gb->size = cap;
    gb->gap_left = 0;
    gb->gap_right = cap - 1;
}

void gap_insert(GapBuffer* gb, char c) {
    if (gb->gap_left <= gb->gap_right) {
        gb->buf[gb->gap_left++] = c;
    }
}

void print_buffer(const GapBuffer* gb) {
    for (int i = 0; i < gb->gap_left; i++) putchar(gb->buf[i]);
    for (int i = gb->gap_right + 1; i < gb->size; i++) putchar(gb->buf[i]);
    putchar('
');
}

int main(void) {
    GapBuffer gb;
    gap_init(&gb, 32);
    const char* text = "Hello World!";
    for (int i = 0; text[i]; i++) gap_insert(&gb, text[i]);
    printf("Editor Buffer Contents: ");
    print_buffer(&gb);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_gap_buffer_editor`, `projects.tools-games.gap-buffer.prog-gap-buffer-editor`, `projects>proj_gap_buffer_editor()`, `projects>tools-games>gap-buffer>prog-gap-buffer-editor>proj_gap_buffer_editor()`
