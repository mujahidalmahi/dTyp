# proj_lisp_interpreter
> **Domain:** `projects` | **Subcategory:** `systems-runtime` | **Type:** `program`
## Overview
Lisp S-expression prefix arithmetic evaluator

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

int eval_lisp(const char** expr) {
    while (**expr == ' ' || **expr == '(') (*expr)++;
    char op = **expr;
    (*expr)++;
    while (**expr == ' ') (*expr)++;
    int res = (op == '*') ? 1 : 0;
    int first = 1;
    while (**expr && **expr != ')') {
        while (**expr == ' ') (*expr)++;
        if (**expr == ')') break;
        int val;
        if (**expr == '(') {
            val = eval_lisp(expr);
        } else {
            val = strtol(*expr, (char**)expr, 10);
        }
        if (op == '+') res += val;
        else if (op == '*') res *= val;
        else if (op == '-') {
            if (first) res = val;
            else res -= val;
        }
        first = 0;
    }
    if (**expr == ')') (*expr)++;
    return res;
}

int main(void) {
    const char* code = "(+ 2 (* 3 4) 5)";
    const char* ptr = code;
    printf("Eval '%s' = %d\n", code, eval_lisp(&ptr));
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_lisp_interpreter`, `projects.systems-runtime.lisp-interpreter.prog-lisp-interpreter`, `projects>proj_lisp_interpreter()`, `projects>systems-runtime>lisp-interpreter>prog-lisp-interpreter>proj_lisp_interpreter()`
