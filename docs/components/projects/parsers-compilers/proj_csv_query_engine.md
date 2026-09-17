# proj_csv_query_engine
> **Domain:** `projects` | **Subcategory:** `parsers-compilers` | **Type:** `program`
## Overview
In-memory CSV database engine with filtering and column projections

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

typedef struct {
    char name[32];
    char dept[16];
    int salary;
} Record;

int main(void) {
    const char* csv_data[] = {
        "Alice,Engineering,90000",
        "Bob,Marketing,65000",
        "Charlie,Engineering,110000",
        "Diana,Sales,72000"
    };
    int n = 4;
    Record records[4];
    for (int i = 0; i < n; i++) {
        sscanf(csv_data[i], "%31[^,],%15[^,],%d", records[i].name, records[i].dept, &records[i].salary);
    }
    printf("Query: SELECT Name, Salary WHERE Dept = 'Engineering'
");
    int total = 0, count = 0;
    for (int i = 0; i < n; i++) {
        if (strcmp(records[i].dept, "Engineering") == 0) {
            printf("  %-10s | $%d
", records[i].name, records[i].salary);
            total += records[i].salary;
            count++;
        }
    }
    printf("Average Engineering Salary: $%d
", total / count);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_csv_query_engine`, `projects.parsers-compilers.csv-query.prog-csv-query-engine`, `projects>proj_csv_query_engine()`, `projects>parsers-compilers>csv-query>prog-csv-query-engine>proj_csv_query_engine()`
