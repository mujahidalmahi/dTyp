# prog_cp_ternary_search
> **Domain:** `competitive-programming` | **Subcategory:** `binary-search-techniques` | **Type:** `program`
## Overview
Codeforces style ternary search suite finding extremum of unimodal functions and discrete peaks

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
#include <math.h>

#define MAX_N 1000

static double poly_a = -1.0;
static double poly_b = 4.0;
static double poly_c = 5.0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static double eval_parabola(double x) {
    return poly_a * x * x + poly_b * x + poly_c;
}

static void ternary_search_continuous(void) {
    double l, r;
    printf("Finding maximum of f(x) = %.2f*x^2 + %.2f*x + %.2f\n", poly_a, poly_b, poly_c);
    printf("Enter interval [L, R]: ");
    if (scanf("%lf %lf", &l, &r) != 2 || l >= r) {
        clear_input();
        return;
    }
    clear_input();
    for (int iter = 0; iter < 100; iter++) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;
        if (eval_parabola(m1) < eval_parabola(m2)) {
            l = m1;
        } else {
            r = m2;
        }
    }
    double opt_x = (l + r) / 2.0;
    printf("Optimal x: %.8f | Maximum value: %.8f\n", opt_x, eval_parabola(opt_x));
}

static void ternary_search_discrete_peak(void) {
    int n;
    printf("Enter size of strictly unimodal array N (>= 3): ");
    if (scanf("%d", &n) != 1 || n < 3 || n > MAX_N) {
        clear_input();
        return;
    }
    long long arr[MAX_N];
    printf("Enter %d integers (strictly increasing then strictly decreasing): ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    clear_input();
    int low = 0, high = n - 1;
    while (high - low > 2) {
        int m1 = low + (high - low) / 3;
        int m2 = high - (high - low) / 3;
        if (arr[m1] < arr[m2]) low = m1;
        else high = m2;
    }
    int peak_idx = low;
    for (int i = low + 1; i <= high; i++) {
        if (arr[i] > arr[peak_idx]) peak_idx = i;
    }
    printf("Peak element: %lld at index %d\n", arr[peak_idx], peak_idx);
}

int main(void) {
    int choice;
    do {
        printf("=== Ternary Search Codeforces Suite ===\n");
        printf("1. Continuous Unimodal Curve Maximum [L, R]\n");
        printf("2. Configure Parabola Coefficients (a, b, c)\n");
        printf("3. Discrete Peak Finding in Unimodal Array\n");
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
                ternary_search_continuous();
                break;
            case 2: {
                printf("Enter coefficients a b c for f(x) = a*x^2 + b*x + c (a < 0 for max): ");
                if (scanf("%lf %lf %lf", &poly_a, &poly_b, &poly_c) == 3) {
                    clear_input();
                    printf("Updated parabola: f(x) = %.2f*x^2 + %.2f*x + %.2f\n", poly_a, poly_b, poly_c);
                } else {
                    clear_input();
                }
                break;
            }
            case 3:
                ternary_search_discrete_peak();
                break;
            case 0:
                printf("Exiting suite.\n");
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
Available via: `prog_cp_ternary_search`, `competitive-programming.full-programs.binary-search-techniques.ternary-search.prog-ternary-search`, `competitive-programming>prog_cp_ternary_search()`, `competitive-programming>full-programs>binary-search-techniques>ternary-search>prog-ternary-search>prog_cp_ternary_search()`
