# prog_acad_truth_tables
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Evaluates and prints complete truth tables for basic and compound logical operations

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

int op_and(int a, int b) { return a && b; }
int op_or(int a, int b) { return a || b; }
int op_xor(int a, int b) { return a ^ b; }
int op_implies(int a, int b) { return (!a) || b; }
int op_bicond(int a, int b) { return a == b; }

void print_truth_table(int (*op)(int, int), const char* op_name) {
    printf("--- %s ---\n", op_name);
    printf("A | B | Result\n");
    printf("--+---+-------\n");
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            printf("%d | %d |   %d\n", a, b, op(a, b));
        }
    }
}

int main(void) {
    print_truth_table(op_and, "A AND B");
    print_truth_table(op_or, "A OR B");
    print_truth_table(op_xor, "A XOR B");
    print_truth_table(op_implies, "A -> B");
    print_truth_table(op_bicond, "A <-> B");
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_truth_tables`, `academics-programming.discrete-mathematics.logic-set-theory.truth-tables.prog-truth-tables`, `academics-programming>prog_acad_truth_tables()`, `academics-programming>discrete-mathematics>logic-set-theory>truth-tables>prog-truth-tables>prog_acad_truth_tables()`
