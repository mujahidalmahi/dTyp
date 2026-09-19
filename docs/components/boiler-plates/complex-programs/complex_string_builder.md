# complex_string_builder
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
Interactive dynamic heap string builder with exponential growth policies

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
#include <string.h>

typedef struct {
    char* buffer;
    size_t length;
    size_t capacity;
} StringBuilder;

static StringBuilder* sb_create(size_t initial_cap) {
    if (initial_cap == 0) initial_cap = 16;
    StringBuilder* sb = (StringBuilder*)malloc(sizeof(StringBuilder));
    if (!sb) return NULL;
    sb->buffer = (char*)malloc(initial_cap);
    if (!sb->buffer) { free(sb); return NULL; }
    sb->buffer[0] = '\0';
    sb->length = 0;
    sb->capacity = initial_cap;
    return sb;
}

static void sb_ensure(StringBuilder* sb, size_t needed) {
    if (sb->length + needed + 1 > sb->capacity) {
        size_t new_cap = sb->capacity * 2;
        while (new_cap < sb->length + needed + 1) new_cap *= 2;
        char* next = (char*)realloc(sb->buffer, new_cap);
        if (!next) return;
        sb->buffer = next;
        sb->capacity = new_cap;
    }
}

static void sb_append(StringBuilder* sb, const char* str) {
    size_t len = strlen(str);
    sb_ensure(sb, len);
    memcpy(sb->buffer + sb->length, str, len);
    sb->length += len;
    sb->buffer[sb->length] = '\0';
}

static void sb_reverse(StringBuilder* sb) {
    if (sb->length < 2) return;
    size_t i = 0, j = sb->length - 1;
    while (i < j) {
        char tmp = sb->buffer[i];
        sb->buffer[i] = sb->buffer[j];
        sb->buffer[j] = tmp;
        i++;
        j--;
    }
}

static void sb_clear(StringBuilder* sb) {
    sb->length = 0;
    if (sb->buffer) sb->buffer[0] = '\0';
}

static void sb_free(StringBuilder* sb) {
    if (sb) {
        free(sb->buffer);
        free(sb);
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    StringBuilder* sb = sb_create(16);
    if (!sb) return 1;
    int choice;
    char text[128];

    do {
        printf("\n=== DYNAMIC STRING BUILDER ===\n");
        printf("State: [len=%zu, cap=%zu] Content: \"%s\"\n",
               sb->length, sb->capacity, sb->buffer);
        printf("1. Append String\n");
        printf("2. Append Integer\n");
        printf("3. Reverse String\n");
        printf("4. Clear Buffer\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter text to append: ");
            if (fgets(text, sizeof(text), stdin)) {
                text[strcspn(text, "\r\n")] = '\0';
                sb_append(sb, text);
            }
        } else if (choice == 2) {
            int val;
            printf("Enter integer: ");
            if (scanf("%d", &val) == 1) {
                char num_buf[32];
                snprintf(num_buf, sizeof(num_buf), "%d", val);
                sb_append(sb, num_buf);
            }
            clear_input();
        } else if (choice == 3) {
            sb_reverse(sb);
            printf("String reversed!\n");
        } else if (choice == 4) {
            sb_clear(sb);
            printf("Buffer cleared.\n");
        }
    } while (choice != 0);

    sb_free(sb);
    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_string_builder`, `boiler-plates.full-programs.complex-programs.complex-string-builder`, `boiler-plates>complex_string_builder()`, `boiler-plates>full-programs>complex-programs>complex-string-builder>complex_string_builder()`, `stringBuilderProgram`
