# proj_csv_query_engine
> **Domain:** `projects` | **Subcategory:** `parsers-compilers` | **Type:** `program`
## Overview
Interactive in-memory CSV query engine supporting column selection and filtering

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
#include <stdlib.h>

#define MAX_ROWS 50

typedef struct {
    int id;
    char name[32];
    int score;
} CsvRow;

static CsvRow table[MAX_ROWS];
static int total_rows = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void load_sample_csv(void) {
    table[0] = (CsvRow){1, "Alice", 95};
    table[1] = (CsvRow){2, "Bob", 72};
    table[2] = (CsvRow){3, "Charlie", 88};
    table[3] = (CsvRow){4, "David", 64};
    table[4] = (CsvRow){5, "Emma", 91};
    total_rows = 5;
    printf("Loaded 5 CSV rows into memory.\n");
}

static void select_all(void) {
    printf("%-4s | %-16s | %-6s\n", "ID", "Name", "Score");
    printf("------------------------------\n");
    for (int i = 0; i < total_rows; i++) {
        printf("%-4d | %-16s | %-6d\n", table[i].id, table[i].name, table[i].score);
    }
}

static void filter_score_gt(void) {
    int min_s;
    printf("Enter minimum score threshold: ");
    if (scanf("%d", &min_s) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Rows with score >= %d:\n", min_s);
    for (int i = 0; i < total_rows; i++) {
        if (table[i].score >= min_s) {
            printf("ID %d: %s -> %d\n", table[i].id, table[i].name, table[i].score);
        }
    }
}

int main(void) {
    load_sample_csv();
    int choice;
    do {
        printf("=== In-Memory CSV Query Engine ===\n");
        printf("1. SELECT * FROM Table\n");
        printf("2. SELECT * WHERE Score >= Threshold\n");
        printf("3. Add Row to Table\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                select_all();
                break;
            case 2:
                filter_score_gt();
                break;
            case 3: {
                if (total_rows >= MAX_ROWS) {
                    printf("Table full.\n");
                    break;
                }
                CsvRow r;
                printf("Enter ID Name Score: ");
                if (scanf("%d %31s %d", &r.id, r.name, &r.score) == 3) {
                    clear_input();
                    table[total_rows++] = r;
                    printf("Row added.\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting query engine.\n");
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
Available via: `proj_csv_query_engine`, `projects.parsers-compilers.csv-query.prog-csv-query-engine`, `projects>proj_csv_query_engine()`, `projects>parsers-compilers>csv-query>prog-csv-query-engine>proj_csv_query_engine()`
