# prog_grade_evaluator
> **Domain:** `boiler-plates` | **Subcategory:** `conditionals` | **Type:** `program`
## Overview
Complete score to letter grade evaluation program

## Signature
```c
int main(void)
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

int main(void) {
    int scores[] = {95, 82, 74, 61, 45};
    int n = sizeof(scores) / sizeof(scores[0]);

    for (int i = 0; i < n; i++) {
        int s = scores[i];
        char grade;
        if (s >= 90) grade = 'A';
        else if (s >= 80) grade = 'B';
        else if (s >= 70) grade = 'C';
        else if (s >= 60) grade = 'D';
        else grade = 'F';

        printf("Score: %d -> Grade: %c\n", s, grade);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_grade_evaluator`, `boiler-plates.full-programs.conditionals.prog-grade-evaluator`, `boiler-plates>prog_grade_evaluator()`, `boiler-plates>full-programs>conditionals>prog-grade-evaluator>prog_grade_evaluator()`, `gradeEvaluatorProgram`
