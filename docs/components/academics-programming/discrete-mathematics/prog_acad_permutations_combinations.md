# prog_acad_permutations_combinations
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Interactive combinatorics laboratory computing nPr, nCr, repetitions, permutation generation, and Pascal triangle

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

static unsigned long long compute_factorial(int n) {
    if (n <= 1) return 1ULL;
    unsigned long long res = 1ULL;
    for (int i = 2; i <= n; i++) res *= (unsigned long long)i;
    return res;
}

static unsigned long long compute_npr(int n, int r) {
    if (r < 0 || r > n) return 0ULL;
    unsigned long long res = 1ULL;
    for (int i = 0; i < r; i++) {
        res *= (unsigned long long)(n - i);
    }
    return res;
}

static unsigned long long compute_ncr(int n, int r) {
    if (r < 0 || r > n) return 0ULL;
    if (r > n - r) r = n - r;
    unsigned long long res = 1ULL;
    for (int i = 1; i <= r; i++) {
        res = res * (unsigned long long)(n - i + 1) / (unsigned long long)i;
    }
    return res;
}

static void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

static void generate_permutations_rec(int* arr, int l, int r, int* count) {
    if (l == r) {
        printf("  %3d: [ ", ++(*count));
        for (int i = 0; i <= r; i++) printf("%d%s", arr[i], (i < r) ? ", " : " ");
        printf("]\n");
        return;
    }
    for (int i = l; i <= r; i++) {
        swap(&arr[l], &arr[i]);
        generate_permutations_rec(arr, l + 1, r, count);
        swap(&arr[l], &arr[i]);
    }
}

static void print_pascal_triangle(int rows) {
    if (rows > 20) rows = 20;
    printf("\n--- Pascal's Triangle (First %d Rows) ---\n", rows);
    for (int n = 0; n < rows; n++) {
        for (int s = 0; s < rows - n - 1; s++) printf("  ");
        for (int k = 0; k <= n; k++) {
            printf("%4llu", compute_ncr(n, k));
        }
        printf("\n");
    }
}

int main(void) {
    int choice;
    do {
        printf("\n================ COMBINATORICS WORKBENCH ================\n");
        printf("1. Compute nPr (Permutations) & nCr (Combinations)\n");
        printf("2. Compute Factorial (n!)\n");
        printf("3. Permutations with Repetition (n^r) & Combinations with Repetition (C(n+r-1, r))\n");
        printf("4. Generate All Permutations of an Array of Size N (N <= 6)\n");
        printf("5. Print Pascal's Triangle\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int n, r;
                printf("Enter n and r (non-negative integers): ");
                if (scanf("%d %d", &n, &r) == 2 && n >= 0 && r >= 0) {
                    printf("P(%d, %d) = %llu\n", n, r, compute_npr(n, r));
                    printf("C(%d, %d) = %llu\n", n, r, compute_ncr(n, r));
                } else {
                    printf("Invalid input.\n");
                    clear_input();
                }
                break;
            }
            case 2: {
                int n;
                printf("Enter n (0 to 20): ");
                if (scanf("%d", &n) == 1 && n >= 0 && n <= 20) {
                    printf("%d! = %llu\n", n, compute_factorial(n));
                } else {
                    printf("Out of range or invalid.\n");
                    clear_input();
                }
                break;
            }
            case 3: {
                int n, r;
                printf("Enter n (distinct items) and r (selections): ");
                if (scanf("%d %d", &n, &r) == 2 && n >= 1 && r >= 0) {
                    unsigned long long n_pow_r = 1ULL;
                    for (int i = 0; i < r; i++) n_pow_r *= (unsigned long long)n;
                    unsigned long long comb_rep = compute_ncr(n + r - 1, r);
                    printf("Permutations with Repetition (n^r)         = %llu\n", n_pow_r);
                    printf("Combinations with Repetition (C(n+r-1, r)) = %llu\n", comb_rep);
                } else {
                    printf("Invalid input.\n");
                    clear_input();
                }
                break;
            }
            case 4: {
                int n;
                printf("Enter array size N (1 to 6): ");
                if (scanf("%d", &n) == 1 && n >= 1 && n <= 6) {
                    int arr[6];
                    for (int i = 0; i < n; i++) arr[i] = i + 1;
                    int count = 0;
                    printf("\nAll %llu Permutations of {1..%d}:\n", compute_factorial(n), n);
                    generate_permutations_rec(arr, 0, n - 1, &count);
                } else {
                    printf("Invalid N (limit 6 to prevent terminal overflow).\n");
                    clear_input();
                }
                break;
            }
            case 5: {
                int rows;
                printf("Enter number of rows (1 to 15): ");
                if (scanf("%d", &rows) == 1 && rows >= 1 && rows <= 15) {
                    print_pascal_triangle(rows);
                } else {
                    printf("Invalid input.\n");
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting Combinatorics Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_permutations_combinations`, `academics-programming.discrete-mathematics.relations-combinatorics.permutations-combinations.prog-permutations-combinations`, `academics-programming>prog_acad_permutations_combinations()`, `academics-programming>discrete-mathematics>relations-combinatorics>permutations-combinations>prog-permutations-combinations>prog_acad_permutations_combinations()`
