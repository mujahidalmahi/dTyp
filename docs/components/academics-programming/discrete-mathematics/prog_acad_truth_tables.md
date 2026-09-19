# prog_acad_truth_tables
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Interactive boolean truth table generator for 2-variable gates, 3-variable compound expressions, tautology testing, and 8-bit masks

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
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int op_and(int a, int b) { return a && b; }
static int op_or(int a, int b) { return a || b; }
static int op_xor(int a, int b) { return a ^ b; }
static int op_nand(int a, int b) { return !(a && b); }
static int op_nor(int a, int b) { return !(a || b); }
static int op_xnor(int a, int b) { return !(a ^ b); }
static int op_implies(int a, int b) { return (!a) || b; }
static int op_bicond(int a, int b) { return a == b; }

static void print_single_table(int (*op)(int, int), const char* name) {
    printf("\n--- %s Truth Table ---\n", name);
    printf(" A | B | Result\n");
    printf("---+---+-------\n");
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            printf(" %d | %d |   %d\n", a, b, op(a, b));
        }
    }
}

static void print_master_table(void) {
    printf("\n--- 2-Variable Master Logic Table ---\n");
    printf(" A | B | AND | OR | XOR | NAND | NOR | XNOR | A->B | A<->B\n");
    printf("---+---+-----+----+-----+------+-----+------+------+------\n");
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            printf(" %d | %d |  %d  |  %d |  %d  |  %d   |  %d  |  %d   |  %d   |   %d\n",
                   a, b,
                   op_and(a, b), op_or(a, b), op_xor(a, b),
                   op_nand(a, b), op_nor(a, b), op_xnor(a, b),
                   op_implies(a, b), op_bicond(a, b));
        }
    }
}

static int eval_compound_1(int a, int b, int c) {
    return (a && b) || (!c);
}

static int eval_compound_2(int a, int b, int c) {
    int p1 = op_implies(a, b);
    int p2 = op_implies(b, c);
    int conc = op_implies(a, c);
    return op_implies(p1 && p2, conc);
}

static void print_compound_table(void) {
    printf("\n--- 3-Variable Compound Proposition Tables ---\n");
    printf("Proposition 1: (A AND B) OR (NOT C)\n");
    printf(" A | B | C | Result\n");
    printf("---+---+---+-------\n");
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            for (int c = 0; c <= 1; c++) {
                printf(" %d | %d | %d |   %d\n", a, b, c, eval_compound_1(a, b, c));
            }
        }
    }

    printf("\nProposition 2: ((A -> B) AND (B -> C)) -> (A -> C) [Transitivity of Implication]\n");
    printf(" A | B | C | Result\n");
    printf("---+---+---+-------\n");
    int all_true = 1;
    for (int a = 0; a <= 1; a++) {
        for (int b = 0; b <= 1; b++) {
            for (int c = 0; c <= 1; c++) {
                int r = eval_compound_2(a, b, c);
                if (!r) all_true = 0;
                printf(" %d | %d | %d |   %d\n", a, b, c, r);
            }
        }
    }
    if (all_true) printf("Result: Proposition 2 is a TAUTOLOGY (Universally True).\n");
}

static void test_custom_bits(void) {
    unsigned int a, b;
    printf("Enter two 8-bit integers (0 to 255): ");
    if (scanf("%u %u", &a, &b) != 2) {
        clear_input();
        printf("Invalid input.\n");
        return;
    }
    a &= 0xFF;
    b &= 0xFF;
    printf("\nBitwise Logic Results for A = %u, B = %u:\n", a, b);
    printf("A & B (AND):  %u (0x%02X)\n", a & b, a & b);
    printf("A | B (OR):   %u (0x%02X)\n", a | b, a | b);
    printf("A ^ B (XOR):  %u (0x%02X)\n", a ^ b, a ^ b);
    printf("~A & 0xFF:    %u (0x%02X)\n", (~a) & 0xFF, (~a) & 0xFF);
}

int main(void) {
    int choice;
    do {
        printf("\n================ TRUTH TABLE GENERATOR ================\n");
        printf("1. Single 2-Variable Logic Gate (AND, OR, XOR, etc.)\n");
        printf("2. Master 2-Variable Logic Table (All Gates Side-by-Side)\n");
        printf("3. 3-Variable Compound Expressions & Tautology Test\n");
        printf("4. Bitwise Logic Evaluator on 8-bit Integers\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        switch (choice) {
            case 1: {
                int gate;
                printf("\nSelect Gate: 1=AND, 2=OR, 3=XOR, 4=NAND, 5=NOR, 6=XNOR, 7=A->B, 8=A<->B: ");
                if (scanf("%d", &gate) != 1) { clear_input(); break; }
                if (gate == 1) print_single_table(op_and, "AND");
                else if (gate == 2) print_single_table(op_or, "OR");
                else if (gate == 3) print_single_table(op_xor, "XOR");
                else if (gate == 4) print_single_table(op_nand, "NAND");
                else if (gate == 5) print_single_table(op_nor, "NOR");
                else if (gate == 6) print_single_table(op_xnor, "XNOR");
                else if (gate == 7) print_single_table(op_implies, "IMPLICATION (A->B)");
                else if (gate == 8) print_single_table(op_bicond, "BICONDITIONAL (A<->B)");
                else printf("Unknown gate choice.\n");
                break;
            }
            case 2:
                print_master_table();
                break;
            case 3:
                print_compound_table();
                break;
            case 4:
                test_custom_bits();
                break;
            case 0:
                printf("Exiting Truth Table Generator.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_truth_tables`, `academics-programming.discrete-mathematics.logic-set-theory.truth-tables.prog-truth-tables`, `academics-programming>prog_acad_truth_tables()`, `academics-programming>discrete-mathematics>logic-set-theory>truth-tables>prog-truth-tables>prog_acad_truth_tables()`
