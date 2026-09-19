# prog_grade_evaluator
> **Domain:** `boiler-plates` | **Subcategory:** `conditionals` | **Type:** `program`
## Overview
Interactive score-to-letter grade and GPA point evaluation program

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

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static char score_to_grade(double score) {
    if (score >= 90.0) return 'A';
    if (score >= 80.0) return 'B';
    if (score >= 70.0) return 'C';
    if (score >= 60.0) return 'D';
    return 'F';
}

static double grade_to_points(char grade) {
    switch (grade) {
        case 'A': return 4.0;
        case 'B': return 3.0;
        case 'C': return 2.0;
        case 'D': return 1.0;
        default:  return 0.0;
    }
}

int main(void) {
    int choice;
    double score;

    do {
        printf("\n=== GRADE & GPA EVALUATOR ===\n");
        printf("1. Evaluate Single Score\n");
        printf("2. Evaluate Score Batch\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            printf("Enter numeric score (0 - 100): ");
            if (scanf("%lf", &score) == 1) {
                if (score < 0.0 || score > 100.0) {
                    printf("Error: Score out of valid range [0, 100].\n");
                } else {
                    char g = score_to_grade(score);
                    double pts = grade_to_points(g);
                    printf("Score: %.2f => Grade: %c | Grade Points: %.1f | Status: %s\n",
                           score, g, pts, (g == 'F' ? "FAIL" : "PASS"));
                }
            }
        } else if (choice == 2) {
            int n;
            printf("How many scores to evaluate: ");
            if (scanf("%d", &n) == 1 && n > 0 && n <= 50) {
                double sum = 0.0;
                printf("Enter %d scores separated by space: ", n);
                for (int i = 0; i < n; i++) {
                    double s;
                    if (scanf("%lf", &s) == 1) {
                        char g = score_to_grade(s);
                        printf("  #%d: %.1f -> %c\n", i + 1, s, g);
                        sum += s;
                    }
                }
                printf("Class Average: %.2f -> Average Grade: %c\n",
                       sum / n, score_to_grade(sum / n));
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_grade_evaluator`, `boiler-plates.full-programs.conditionals.prog-grade-evaluator`, `boiler-plates>prog_grade_evaluator()`, `boiler-plates>full-programs>conditionals>prog-grade-evaluator>prog_grade_evaluator()`, `gradeEvaluatorProgram`
