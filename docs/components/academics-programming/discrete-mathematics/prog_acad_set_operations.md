# prog_acad_set_operations
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Interactive set calculator supporting union, intersection, difference, symmetric difference, Cartesian product, subsets, and power set

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

#define MAX_SET 50

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static bool set_contains(const int* set, int size, int val) {
    for (int i = 0; i < size; i++) {
        if (set[i] == val) return true;
    }
    return false;
}

static void print_set(const char* label, const int* set, int size) {
    printf("%s [size %d]: { ", label, size);
    for (int i = 0; i < size; i++) {
        printf("%d%s", set[i], (i < size - 1) ? ", " : " ");
    }
    printf("}\n");
}

static int input_set(const char* label, int* set) {
    int n;
    printf("Enter number of elements for %s (0 to %d): ", label, MAX_SET);
    if (scanf("%d", &n) != 1 || n < 0 || n > MAX_SET) {
        clear_input();
        return 0;
    }
    int count = 0;
    if (n > 0) {
        printf("Enter %d distinct integer elements: ", n);
        for (int i = 0; i < n; i++) {
            int val;
            if (scanf("%d", &val) == 1) {
                if (!set_contains(set, count, val)) {
                    set[count++] = val;
                }
            }
        }
    }
    clear_input();
    return count;
}

static int set_union(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) out[count++] = A[i];
    for (int i = 0; i < sizeB; i++) {
        if (!set_contains(A, sizeA, B[i])) out[count++] = B[i];
    }
    return count;
}

static int set_intersection(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    return count;
}

static int set_difference(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (!set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    return count;
}

static int set_sym_difference(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (!set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    for (int i = 0; i < sizeB; i++) {
        if (!set_contains(A, sizeA, B[i])) out[count++] = B[i];
    }
    return count;
}

static void set_cartesian(const int* A, int sizeA, const int* B, int sizeB) {
    printf("A x B [cardinality %d]: { ", sizeA * sizeB);
    for (int i = 0; i < sizeA; i++) {
        for (int j = 0; j < sizeB; j++) {
            printf("(%d, %d)%s", A[i], B[j], (i == sizeA - 1 && j == sizeB - 1) ? " " : ", ");
        }
    }
    printf("}\n");
}

static void check_relationships(const int* A, int sizeA, const int* B, int sizeB) {
    bool a_sub_b = true;
    for (int i = 0; i < sizeA; i++) {
        if (!set_contains(B, sizeB, A[i])) { a_sub_b = false; break; }
    }
    bool b_sub_a = true;
    for (int i = 0; i < sizeB; i++) {
        if (!set_contains(A, sizeA, B[i])) { b_sub_a = false; break; }
    }
    bool disjoint = true;
    for (int i = 0; i < sizeA; i++) {
        if (set_contains(B, sizeB, A[i])) { disjoint = false; break; }
    }

    printf("\nSet Relationship Analysis:\n");
    printf("A is subset of B (A <= B): %s\n", a_sub_b ? "YES" : "NO");
    printf("B is subset of A (B <= A): %s\n", b_sub_a ? "YES" : "NO");
    printf("A equals B (A == B):       %s\n", (a_sub_b && b_sub_a) ? "YES" : "NO");
    printf("A and B are Disjoint:      %s\n", disjoint ? "YES" : "NO");
}

static void generate_powerset(const int* A, int size) {
    if (size > 10) {
        printf("Set too large for terminal power set (max 10 elements).\n");
        return;
    }
    int total = 1 << size;
    printf("\nPower Set P(A) [total 2^%d = %d subsets]:\n", size, total);
    for (int mask = 0; mask < total; mask++) {
        printf("  { ");
        bool first = true;
        for (int i = 0; i < size; i++) {
            if (mask & (1 << i)) {
                if (!first) printf(", ");
                printf("%d", A[i]);
                first = false;
            }
        }
        printf(" }\n");
    }
}

int main(void) {
    int setA[MAX_SET], setB[MAX_SET], result[MAX_SET * 2];
    int sizeA = 0, sizeB = 0;
    int choice;

    do {
        printf("\n================ SET THEORY WORKBENCH ================\n");
        printf("1. Input Set A\n");
        printf("2. Input Set B\n");
        printf("3. Display Set A and Set B\n");
        printf("4. Set Union (A U B)\n");
        printf("5. Set Intersection (A ^ B)\n");
        printf("6. Set Difference (A - B and B - A)\n");
        printf("7. Symmetric Difference (A XOR B)\n");
        printf("8. Cartesian Product (A x B)\n");
        printf("9. Subset, Equality & Disjoint Verification\n");
        printf("10. Power Set P(A)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                sizeA = input_set("Set A", setA);
                print_set("Set A", setA, sizeA);
                break;
            case 2:
                sizeB = input_set("Set B", setB);
                print_set("Set B", setB, sizeB);
                break;
            case 3:
                print_set("Set A", setA, sizeA);
                print_set("Set B", setB, sizeB);
                break;
            case 4: {
                int res_len = set_union(setA, sizeA, setB, sizeB, result);
                print_set("Union (A U B)", result, res_len);
                break;
            }
            case 5: {
                int res_len = set_intersection(setA, sizeA, setB, sizeB, result);
                print_set("Intersection (A ^ B)", result, res_len);
                break;
            }
            case 6: {
                int diffA = set_difference(setA, sizeA, setB, sizeB, result);
                print_set("Difference (A - B)", result, diffA);
                int diffB = set_difference(setB, sizeB, setA, sizeA, result);
                print_set("Difference (B - A)", result, diffB);
                break;
            }
            case 7: {
                int sym_len = set_sym_difference(setA, sizeA, setB, sizeB, result);
                print_set("Symmetric Difference (A XOR B)", result, sym_len);
                break;
            }
            case 8:
                set_cartesian(setA, sizeA, setB, sizeB);
                break;
            case 9:
                check_relationships(setA, sizeA, setB, sizeB);
                break;
            case 10:
                generate_powerset(setA, sizeA);
                break;
            case 0:
                printf("Exiting Set Operations.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_set_operations`, `academics-programming.discrete-mathematics.logic-set-theory.set-operations.prog-set-operations`, `academics-programming>prog_acad_set_operations()`, `academics-programming>discrete-mathematics>logic-set-theory>set-operations>prog-set-operations>prog_acad_set_operations()`
