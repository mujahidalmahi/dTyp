import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateBoilerPlateCorePrograms(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.basic-templates.prog-hello-world",
      name: "prog_hello_world",
      type: "program",
      category: "boiler-plates",
      subcategory: "basic-templates",
      categoryId: "boiler-plates.full-programs.basic-templates",
      path: "boiler-plates/full-programs/basic-templates/prog-hello-world",
      description: "Interactive greeting terminal application with custom banner and system info",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    char name[64];
    char lang[32];
    int choice;

    do {
        printf("\\n=== HELLO WORLD INTERACTIVE SUITE ===\\n");
        printf("1. Standard Hello World\\n");
        printf("2. Personalized Greeting\\n");
        printf("3. Programming Language Banner\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("\\nHello, World! Welcome to C programming.\\n");
        } else if (choice == 2) {
            printf("Enter your name: ");
            if (fgets(name, sizeof(name), stdin)) {
                name[strcspn(name, "\\r\\n")] = '\\0';
                printf("Hello, %s! Have a productive coding session.\\n", name);
            }
        } else if (choice == 3) {
            printf("Enter your preferred programming language: ");
            if (fgets(lang, sizeof(lang), stdin)) {
                lang[strcspn(lang, "\\r\\n")] = '\\0';
                printf("****************************************\\n");
                printf("* Hello from the %-18s world! *\\n", lang);
                printf("****************************************\\n");
            }
        } else if (choice != 0) {
            printf("Invalid choice. Try again.\\n");
        }
    } while (choice != 0);

    printf("Goodbye!\\n");
    return 0;
}`,
      tags: ["program", "hello-world", "starter", "interactive"],
      aliases: ["prog_hello_world", "helloWorldProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.basic-templates.prog-cli-echo",
      name: "prog_cli_echo",
      type: "program",
      category: "boiler-plates",
      subcategory: "basic-templates",
      categoryId: "boiler-plates.full-programs.basic-templates",
      path: "boiler-plates/full-programs/basic-templates/prog-cli-echo",
      description: "Interactive CLI echo and string transformation terminal utility",
      signature: "int main(int argc, char* argv[]);",
      code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void echo_upper(const char* s) {
    printf("UPPERCASE: ");
    for (int i = 0; s[i] != '\\0'; i++) {
        putchar(toupper((unsigned char)s[i]));
    }
    putchar('\\n');
}

static void echo_reversed(const char* s) {
    int len = (int)strlen(s);
    printf("REVERSED : ");
    for (int i = len - 1; i >= 0; i--) {
        putchar(s[i]);
    }
    putchar('\\n');
}

static void echo_stats(const char* s) {
    int chars = 0, words = 0, in_word = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        chars++;
        if (isspace((unsigned char)s[i])) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            words++;
        }
    }
    printf("Length: %d chars | Words: %d words\\n", chars, words);
}

int main(int argc, char* argv[]) {
    char buffer[256];
    int choice;

    if (argc > 1) {
        printf("Command line arguments received (%d total):\\n", argc - 1);
        for (int i = 1; i < argc; i++) {
            printf("  argv[%d] = %s\\n", i, argv[i]);
        }
    }

    do {
        printf("\\n=== CLI ECHO & TRANSFORM TOOL ===\\n");
        printf("1. Echo to Uppercase\\n");
        printf("2. Echo Reversed\\n");
        printf("3. Character & Word Statistics\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice >= 1 && choice <= 3) {
            printf("Enter text line: ");
            if (fgets(buffer, sizeof(buffer), stdin)) {
                buffer[strcspn(buffer, "\\r\\n")] = '\\0';
                if (choice == 1) echo_upper(buffer);
                else if (choice == 2) echo_reversed(buffer);
                else if (choice == 3) echo_stats(buffer);
            }
        } else if (choice != 0) {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "cli", "echo", "interactive"],
      aliases: ["prog_cli_echo", "cliEchoProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.conditionals.prog-grade-evaluator",
      name: "prog_grade_evaluator",
      type: "program",
      category: "boiler-plates",
      subcategory: "conditionals",
      categoryId: "boiler-plates.full-programs.conditionals",
      path: "boiler-plates/full-programs/conditionals/prog-grade-evaluator",
      description: "Interactive score-to-letter grade and GPA point evaluation program",
      signature: "int main(void);",
      code: `#include <stdio.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
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
        printf("\\n=== GRADE & GPA EVALUATOR ===\\n");
        printf("1. Evaluate Single Score\\n");
        printf("2. Evaluate Score Batch\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            printf("Enter numeric score (0 - 100): ");
            if (scanf("%lf", &score) == 1) {
                if (score < 0.0 || score > 100.0) {
                    printf("Error: Score out of valid range [0, 100].\\n");
                } else {
                    char g = score_to_grade(score);
                    double pts = grade_to_points(g);
                    printf("Score: %.2f => Grade: %c | Grade Points: %.1f | Status: %s\\n",
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
                        printf("  #%d: %.1f -> %c\\n", i + 1, s, g);
                        sum += s;
                    }
                }
                printf("Class Average: %.2f -> Average Grade: %c\\n",
                       sum / n, score_to_grade(sum / n));
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "conditionals", "grade", "interactive"],
      aliases: ["prog_grade_evaluator", "gradeEvaluatorProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.conditionals.prog-leap-year",
      name: "prog_leap_year",
      type: "program",
      category: "boiler-plates",
      subcategory: "conditionals",
      categoryId: "boiler-plates.full-programs.conditionals",
      path: "boiler-plates/full-programs/conditionals/prog-leap-year",
      description: "Interactive Gregorian leap year checker and date verification tool",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static bool is_leap_year(int year) {
    if (year % 400 == 0) return true;
    if (year % 100 == 0) return false;
    return (year % 4 == 0);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== LEAP YEAR & CALENDAR EXPLORER ===\\n");
        printf("1. Check Specific Year\\n");
        printf("2. List Leap Years in Range\\n");
        printf("3. Days in February\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int y;
            printf("Enter year (e.g. 2024): ");
            if (scanf("%d", &y) == 1) {
                if (is_leap_year(y)) {
                    printf("%d is a LEAP YEAR (366 days, Feb has 29 days).\\n", y);
                } else {
                    printf("%d is a COMMON YEAR (365 days, Feb has 28 days).\\n", y);
                }
            }
        } else if (choice == 2) {
            int start, end, count = 0;
            printf("Enter start year and end year: ");
            if (scanf("%d %d", &start, &end) == 2 && start <= end) {
                printf("Leap years between %d and %d:\\n", start, end);
                for (int y = start; y <= end; y++) {
                    if (is_leap_year(y)) {
                        printf("%6d", y);
                        count++;
                        if (count % 8 == 0) printf("\\n");
                    }
                }
                if (count % 8 != 0) printf("\\n");
                printf("Total leap years found: %d\\n", count);
            }
        } else if (choice == 3) {
            int y;
            printf("Enter year: ");
            if (scanf("%d", &y) == 1) {
                printf("February %d has %d days.\\n", y, is_leap_year(y) ? 29 : 28);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "conditionals", "leap-year", "calendar"],
      aliases: ["prog_leap_year", "leapYearProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.loops.prog-multiplication-table",
      name: "prog_multiplication_table",
      type: "program",
      category: "boiler-plates",
      subcategory: "loops",
      categoryId: "boiler-plates.full-programs.loops",
      path: "boiler-plates/full-programs/loops/prog-multiplication-table",
      description: "Interactive arithmetic multiplication table and grid generator",
      signature: "int main(void);",
      code: `#include <stdio.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== MULTIPLICATION TABLE SUITE ===\\n");
        printf("1. Single Number Table\\n");
        printf("2. 2D Multiplication Grid\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int num, limit;
            printf("Enter base number and limit (e.g. 7 12): ");
            if (scanf("%d %d", &num, &limit) == 2 && limit > 0 && limit <= 100) {
                printf("\\nMultiplication Table for %d:\\n", num);
                for (int i = 1; i <= limit; i++) {
                    printf("  %2d x %2d = %4d\\n", num, i, num * i);
                }
            }
        } else if (choice == 2) {
            int rows, cols;
            printf("Enter grid dimensions rows cols (1-15): ");
            if (scanf("%d %d", &rows, &cols) == 2 && rows > 0 && rows <= 15 && cols > 0 && cols <= 15) {
                printf("\\n      ");
                for (int c = 1; c <= cols; c++) printf("%5d", c);
                printf("\\n      ");
                for (int c = 1; c <= cols; c++) printf("-----");
                printf("\\n");
                for (int r = 1; r <= rows; r++) {
                    printf("%4d |", r);
                    for (int c = 1; c <= cols; c++) {
                        printf("%5d", r * c);
                    }
                    printf("\\n");
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "loops", "multiplication", "table"],
      aliases: ["prog_multiplication_table", "multiplicationTableProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.loops.prog-collatz-sequence",
      name: "prog_collatz_sequence",
      type: "program",
      category: "boiler-plates",
      subcategory: "loops",
      categoryId: "boiler-plates.full-programs.loops",
      path: "boiler-plates/full-programs/loops/prog-collatz-sequence",
      description: "Interactive 3n+1 Collatz sequence analyzer with peak and step telemetry",
      signature: "int main(void);",
      code: `#include <stdio.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== COLLATZ 3N+1 CONJECTURE ANALYZER ===\\n");
        printf("1. Trace Single Number\\n");
        printf("2. Compare Sequence Lengths in Range\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            long long n;
            printf("Enter positive starting integer: ");
            if (scanf("%lld", &n) == 1 && n > 0) {
                int steps = 0;
                long long peak = n;
                printf("Sequence: %lld", n);
                while (n != 1) {
                    if (n % 2 == 0) {
                        n = n / 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    if (n > peak) peak = n;
                    printf(" -> %lld", n);
                    steps++;
                    if (steps % 10 == 0) printf("\\n         ");
                }
                printf("\\nFinished in %d steps! Peak value reached: %lld\\n", steps, peak);
            }
        } else if (choice == 2) {
            int start, end;
            printf("Enter range start and end (1 to 10000): ");
            if (scanf("%d %d", &start, &end) == 2 && start > 0 && start <= end) {
                int max_steps = 0;
                int champion = start;
                for (int i = start; i <= end; i++) {
                    long long curr = i;
                    int st = 0;
                    while (curr != 1) {
                        curr = (curr % 2 == 0) ? curr / 2 : 3 * curr + 1;
                        st++;
                    }
                    if (st > max_steps) {
                        max_steps = st;
                        champion = i;
                    }
                }
                printf("Longest trajectory between %d and %d: Number %d with %d steps!\\n",
                       start, end, champion, max_steps);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "loops", "collatz", "math"],
      aliases: ["prog_collatz_sequence", "collatzSequenceProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.patterns.prog-star-pyramid",
      name: "prog_star_pyramid",
      type: "program",
      category: "boiler-plates",
      subcategory: "patterns",
      categoryId: "boiler-plates.full-programs.patterns",
      path: "boiler-plates/full-programs/patterns/prog-star-pyramid",
      description: "Interactive terminal star pyramid and pattern generator",
      signature: "int main(void);",
      code: `#include <stdio.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== STAR PYRAMID GENERATOR ===\\n");
        printf("1. Solid Centered Pyramid\\n");
        printf("2. Inverted Pyramid\\n");
        printf("3. Hollow Pyramid\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            int h;
            printf("Enter height (1 to 20): ");
            if (scanf("%d", &h) == 1 && h > 0 && h <= 20) {
                printf("\\n");
                if (choice == 1) {
                    for (int i = 0; i < h; i++) {
                        for (int j = 0; j < h - i - 1; j++) putchar(' ');
                        for (int j = 0; j < 2 * i + 1; j++) putchar('*');
                        putchar('\\n');
                    }
                } else if (choice == 2) {
                    for (int i = h - 1; i >= 0; i--) {
                        for (int j = 0; j < h - i - 1; j++) putchar(' ');
                        for (int j = 0; j < 2 * i + 1; j++) putchar('*');
                        putchar('\\n');
                    }
                } else if (choice == 3) {
                    for (int i = 0; i < h; i++) {
                        for (int j = 0; j < h - i - 1; j++) putchar(' ');
                        for (int j = 0; j < 2 * i + 1; j++) {
                            if (i == h - 1 || j == 0 || j == 2 * i) putchar('*');
                            else putchar(' ');
                        }
                        putchar('\\n');
                    }
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "patterns", "pyramid", "stars"],
      aliases: ["prog_star_pyramid", "starPyramidProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.patterns.prog-diamond-pattern",
      name: "prog_diamond_pattern",
      type: "program",
      category: "boiler-plates",
      subcategory: "patterns",
      categoryId: "boiler-plates.full-programs.patterns",
      path: "boiler-plates/full-programs/patterns/prog-diamond-pattern",
      description: "Interactive diamond and geometric ASCII pattern generator",
      signature: "int main(void);",
      code: `#include <stdio.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== DIAMOND PATTERN GENERATOR ===\\n");
        printf("1. Solid Star Diamond\\n");
        printf("2. Hollow Star Diamond\\n");
        printf("3. Alphabet Diamond\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            int n;
            printf("Enter radius n (1 to 15): ");
            if (scanf("%d", &n) == 1 && n > 0 && n <= 15) {
                printf("\\n");
                if (choice == 1) {
                    for (int i = 1; i <= n; i++) {
                        for (int s = 1; s <= n - i; s++) putchar(' ');
                        for (int k = 1; k <= 2 * i - 1; k++) putchar('*');
                        putchar('\\n');
                    }
                    for (int i = n - 1; i >= 1; i--) {
                        for (int s = 1; s <= n - i; s++) putchar(' ');
                        for (int k = 1; k <= 2 * i - 1; k++) putchar('*');
                        putchar('\\n');
                    }
                } else if (choice == 2) {
                    for (int i = 1; i <= n; i++) {
                        for (int s = 1; s <= n - i; s++) putchar(' ');
                        for (int k = 1; k <= 2 * i - 1; k++) {
                            if (k == 1 || k == 2 * i - 1) putchar('*');
                            else putchar(' ');
                        }
                        putchar('\\n');
                    }
                    for (int i = n - 1; i >= 1; i--) {
                        for (int s = 1; s <= n - i; s++) putchar(' ');
                        for (int k = 1; k <= 2 * i - 1; k++) {
                            if (k == 1 || k == 2 * i - 1) putchar('*');
                            else putchar(' ');
                        }
                        putchar('\\n');
                    }
                } else if (choice == 3) {
                    for (int i = 0; i < n; i++) {
                        for (int s = 0; s < n - i - 1; s++) putchar(' ');
                        for (int k = 0; k <= i; k++) putchar('A' + k);
                        for (int k = i - 1; k >= 0; k--) putchar('A' + k);
                        putchar('\\n');
                    }
                    for (int i = n - 2; i >= 0; i--) {
                        for (int s = 0; s < n - i - 1; s++) putchar(' ');
                        for (int k = 0; k <= i; k++) putchar('A' + k);
                        for (int k = i - 1; k >= 0; k--) putchar('A' + k);
                        putchar('\\n');
                    }
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "patterns", "diamond", "ascii"],
      aliases: ["prog_diamond_pattern", "diamondPatternProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.functions.prog-calculator-dispatch",
      name: "prog_calculator_dispatch",
      type: "program",
      category: "boiler-plates",
      subcategory: "functions",
      categoryId: "boiler-plates.full-programs.functions",
      path: "boiler-plates/full-programs/functions/prog-calculator-dispatch",
      description: "Interactive arithmetic calculator using function pointer dispatch table",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

typedef double (*BinaryOp)(double, double);

static double op_add(double a, double b) { return a + b; }
static double op_sub(double a, double b) { return a - b; }
static double op_mul(double a, double b) { return a * b; }
static double op_div(double a, double b) { return (b != 0.0) ? a / b : 0.0; }
static double op_pow(double a, double b) { return pow(a, b); }

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    static const BinaryOp ops[] = { op_add, op_sub, op_mul, op_div, op_pow };
    static const char* op_names[] = { "Add (+)", "Subtract (-)", "Multiply (*)", "Divide (/)", "Power (^)" };
    int choice;
    double x, y;

    do {
        printf("\\n=== DISPATCH TABLE CALCULATOR ===\\n");
        for (int i = 0; i < 5; i++) {
            printf("%d. %s\\n", i + 1, op_names[i]);
        }
        printf("0. Exit\\n");
        printf("Select operation: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 5) {
            printf("Enter operands X and Y: ");
            if (scanf("%lf %lf", &x, &y) == 2) {
                if (choice == 4 && y == 0.0) {
                    printf("Error: Division by zero is undefined!\\n");
                } else {
                    double result = ops[choice - 1](x, y);
                    printf("Result: %.4f\\n", result);
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "functions", "function-pointers", "dispatch"],
      aliases: ["prog_calculator_dispatch", "calculatorDispatchProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.functions.prog-array-map-callback",
      name: "prog_array_map_callback",
      type: "program",
      category: "boiler-plates",
      subcategory: "functions",
      categoryId: "boiler-plates.full-programs.functions",
      path: "boiler-plates/full-programs/functions/prog-array-map-callback",
      description: "Interactive array transformation pipeline using function pointer callbacks",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef int (*TransformFunc)(int);

static int fn_square(int x) { return x * x; }
static int fn_double(int x) { return x * 2; }
static int fn_abs(int x) { return abs(x); }
static int fn_negate(int x) { return -x; }

static void apply_transform(int arr[], int n, TransformFunc fn) {
    for (int i = 0; i < n; i++) {
        arr[i] = fn(arr[i]);
    }
}

static void print_array(const int arr[], int n) {
    printf("[ ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\\n");
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int arr[32];
    int n = 0;
    int choice;

    printf("=== ARRAY MAP CALLBACK PIPELINE ===\\n");
    printf("Enter number of initial elements (1 to 32): ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > 32) n = 5;
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &arr[i]) != 1) arr[i] = i + 1;
    }
    clear_input();

    do {
        printf("\\nCurrent Array: ");
        print_array(arr, n);
        printf("1. Square Elements\\n");
        printf("2. Double Elements\\n");
        printf("3. Absolute Value\\n");
        printf("4. Negate Elements\\n");
        printf("5. Reset Array\\n");
        printf("0. Exit\\n");
        printf("Select transform: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) apply_transform(arr, n, fn_square);
        else if (choice == 2) apply_transform(arr, n, fn_double);
        else if (choice == 3) apply_transform(arr, n, fn_abs);
        else if (choice == 4) apply_transform(arr, n, fn_negate);
        else if (choice == 5) {
            printf("Enter %d new integers: ", n);
            for (int i = 0; i < n; i++) {
                if (scanf("%d", &arr[i]) != 1) arr[i] = i + 1;
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "functions", "callback", "map"],
      aliases: ["prog_array_map_callback", "arrayMapCallbackProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.recursion.prog-tower-of-hanoi",
      name: "prog_tower_of_hanoi",
      type: "program",
      category: "boiler-plates",
      subcategory: "recursion",
      categoryId: "boiler-plates.full-programs.recursion",
      path: "boiler-plates/full-programs/recursion/prog-tower-of-hanoi",
      description: "Interactive Tower of Hanoi recursive solver with step tracking",
      signature: "int main(void);",
      code: `#include <stdio.h>

static int move_count = 0;

static void solve_hanoi(int n, char from, char to, char aux) {
    if (n <= 0) return;
    solve_hanoi(n - 1, from, aux, to);
    move_count++;
    printf("  Step %3d: Move disk %d from Peg %c to Peg %c\\n", move_count, n, from, to);
    solve_hanoi(n - 1, aux, to, from);
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== TOWER OF HANOI SOLVER ===\\n");
        printf("1. Solve Puzzle\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int disks;
            printf("Enter number of disks (1 to 10): ");
            if (scanf("%d", &disks) == 1 && disks > 0 && disks <= 10) {
                move_count = 0;
                printf("\\nSolving for %d disks:\\n", disks);
                solve_hanoi(disks, 'A', 'C', 'B');
                printf("Total moves required: %d (formula: 2^n - 1 = %d)\\n",
                       move_count, (1 << disks) - 1);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "recursion", "hanoi", "puzzle"],
      aliases: ["prog_tower_of_hanoi", "towerOfHanoiProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.recursion.prog-fibonacci-memoized",
      name: "prog_fibonacci_memoized",
      type: "program",
      category: "boiler-plates",
      subcategory: "recursion",
      categoryId: "boiler-plates.full-programs.recursion",
      path: "boiler-plates/full-programs/recursion/prog-fibonacci-memoized",
      description: "Interactive Fibonacci recursion workbench comparing memoized vs iterative computation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

static unsigned long long memo[93];
static long long recursive_calls = 0;

static unsigned long long fib_memo(int n) {
    recursive_calls++;
    if (n <= 0) return 0;
    if (n == 1) return 1;
    if (memo[n] != 0) return memo[n];
    memo[n] = fib_memo(n - 1) + fib_memo(n - 2);
    return memo[n];
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== MEMOIZED FIBONACCI CALCULATOR ===\\n");
        printf("1. Calculate Fibonacci(N) [1 to 90]\\n");
        printf("2. Print Fibonacci Sequence up to N\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int n;
            printf("Enter N (0 to 90): ");
            if (scanf("%d", &n) == 1 && n >= 0 && n <= 90) {
                memset(memo, 0, sizeof(memo));
                recursive_calls = 0;
                unsigned long long result = fib_memo(n);
                printf("Fibonacci(%d) = %llu\\n", n, result);
                printf("Memoized recursive calls made: %lld\\n", recursive_calls);
            }
        } else if (choice == 2) {
            int limit;
            printf("Enter limit N (1 to 45): ");
            if (scanf("%d", &limit) == 1 && limit > 0 && limit <= 45) {
                memset(memo, 0, sizeof(memo));
                printf("Sequence: ");
                for (int i = 0; i <= limit; i++) {
                    printf("%llu ", fib_memo(i));
                }
                printf("\\n");
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "recursion", "fibonacci", "memoization"],
      aliases: ["prog_fibonacci_memoized", "fibonacciMemoizedProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.pointers.prog-string-reversal",
      name: "prog_string_reversal",
      type: "program",
      category: "boiler-plates",
      subcategory: "pointers",
      categoryId: "boiler-plates.full-programs.pointers",
      path: "boiler-plates/full-programs/pointers/prog-string-reversal",
      description: "Interactive in-place pointer-based string reversal and palindrome verification",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

static void reverse_in_place(char* start, char* end) {
    while (start < end) {
        char tmp = *start;
        *start++ = *end;
        *end-- = tmp;
    }
}

static int is_palindrome(const char* s) {
    const char* left = s;
    const char* right = s + strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum((unsigned char)*left)) left++;
        while (left < right && !isalnum((unsigned char)*right)) right--;
        if (tolower((unsigned char)*left) != tolower((unsigned char)*right)) return 0;
        left++;
        right--;
    }
    return 1;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    char buffer[256];
    int choice;

    do {
        printf("\\n=== POINTER STRING WORKBENCH ===\\n");
        printf("1. Reverse String In-Place\\n");
        printf("2. Check Alphanumeric Palindrome\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter text to reverse: ");
            if (fgets(buffer, sizeof(buffer), stdin)) {
                buffer[strcspn(buffer, "\\r\\n")] = '\\0';
                int len = (int)strlen(buffer);
                if (len > 0) {
                    reverse_in_place(buffer, buffer + len - 1);
                    printf("Reversed: %s\\n", buffer);
                }
            }
        } else if (choice == 2) {
            printf("Enter text to test: ");
            if (fgets(buffer, sizeof(buffer), stdin)) {
                buffer[strcspn(buffer, "\\r\\n")] = '\\0';
                printf("Result: \\"%s\\" is %s\\n",
                       buffer, is_palindrome(buffer) ? "a VALID PALINDROME" : "NOT a palindrome");
            }
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "pointers", "string", "reversal"],
      aliases: ["prog_string_reversal", "stringReversalProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.pointers.prog-pointer-arithmetic",
      name: "prog_pointer_arithmetic",
      type: "program",
      category: "boiler-plates",
      subcategory: "pointers",
      categoryId: "boiler-plates.full-programs.pointers",
      path: "boiler-plates/full-programs/pointers/prog-pointer-arithmetic",
      description: "Interactive pointer arithmetic memory walk and address inspection tool",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stddef.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int data[16];
    int n = 0;
    int choice;

    printf("=== POINTER ARITHMETIC WORKSHOP ===\\n");
    printf("Enter number of elements (3 to 16): ");
    if (scanf("%d", &n) != 1 || n < 3 || n > 16) n = 6;
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &data[i]) != 1) data[i] = (i + 1) * 10;
    }
    clear_input();

    do {
        printf("\\n=== MENU ===\\n");
        printf("1. Walk Forward via Pointers\\n");
        printf("2. Walk Reverse via Pointers\\n");
        printf("3. Calculate Pointer Difference (Subscript Offset)\\n");
        printf("4. Inspect Memory Addresses and Byte Offsets\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int* ptr = data;
            int* end = data + n;
            printf("Forward: ");
            while (ptr < end) {
                printf("%d ", *ptr++);
            }
            printf("\\n");
        } else if (choice == 2) {
            int* ptr = data + n - 1;
            printf("Reverse: ");
            while (ptr >= data) {
                printf("%d ", *ptr--);
            }
            printf("\\n");
        } else if (choice == 3) {
            int idx1, idx2;
            printf("Enter two indices between 0 and %d: ", n - 1);
            if (scanf("%d %d", &idx1, &idx2) == 2 && idx1 >= 0 && idx1 < n && idx2 >= 0 && idx2 < n) {
                int* p1 = &data[idx1];
                int* p2 = &data[idx2];
                ptrdiff_t diff = p2 - p1;
                printf("Address p1: %p | Val: %d\\n", (void*)p1, *p1);
                printf("Address p2: %p | Val: %d\\n", (void*)p2, *p2);
                printf("Pointer difference (p2 - p1) = %td elements (%td bytes)\\n",
                       diff, diff * (ptrdiff_t)sizeof(int));
            }
        } else if (choice == 4) {
            printf("Array Base Address: %p\\n", (void*)data);
            for (int i = 0; i < n; i++) {
                int* p = data + i;
                printf("  data[%2d] @ %p | val: %4d | byte offset: +%zu\\n",
                       i, (void*)p, *p, (size_t)((char*)p - (char*)data));
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "pointers", "pointer-arithmetic", "memory"],
      aliases: ["prog_pointer_arithmetic", "pointerArithmeticProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.dynamic-memory.prog-dynamic-array-stats",
      name: "prog_dynamic_array_stats",
      type: "program",
      category: "boiler-plates",
      subcategory: "dynamic-memory",
      categoryId: "boiler-plates.full-programs.dynamic-memory",
      path: "boiler-plates/full-programs/dynamic-memory/prog-dynamic-array-stats",
      description: "Interactive dynamic heap memory allocation and statistical analyzer",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    double* arr = NULL;
    int size = 0;
    int choice;

    do {
        printf("\\n=== DYNAMIC HEAP ARRAY STATS ===\\n");
        printf("1. Allocate & Input Array\\n");
        printf("2. Compute Statistics (Mean, Min, Max, StdDev)\\n");
        printf("3. Free Memory\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            if (arr) { free(arr); arr = NULL; }
            printf("Enter number of elements (1 to 1000): ");
            if (scanf("%d", &size) == 1 && size > 0 && size <= 1000) {
                arr = (double*)malloc((size_t)size * sizeof(double));
                if (!arr) {
                    printf("Memory allocation failed!\\n");
                    size = 0;
                } else {
                    printf("Enter %d double values: ", size);
                    for (int i = 0; i < size; i++) {
                        if (scanf("%lf", &arr[i]) != 1) arr[i] = 0.0;
                    }
                    printf("Successfully allocated and stored %d elements.\\n", size);
                }
            }
        } else if (choice == 2) {
            if (!arr || size == 0) {
                printf("No active array allocated!\\n");
            } else {
                double sum = 0.0, min_val = arr[0], max_val = arr[0];
                for (int i = 0; i < size; i++) {
                    sum += arr[i];
                    if (arr[i] < min_val) min_val = arr[i];
                    if (arr[i] > max_val) max_val = arr[i];
                }
                double mean = sum / size;
                double var_sum = 0.0;
                for (int i = 0; i < size; i++) {
                    var_sum += (arr[i] - mean) * (arr[i] - mean);
                }
                double stddev = sqrt(var_sum / size);
                printf("Count  : %d\\n", size);
                printf("Sum    : %.4f\\n", sum);
                printf("Mean   : %.4f\\n", mean);
                printf("Minimum: %.4f\\n", min_val);
                printf("Maximum: %.4f\\n", max_val);
                printf("Std Dev: %.4f\\n", stddev);
            }
        } else if (choice == 3) {
            if (arr) {
                free(arr);
                arr = NULL;
                size = 0;
                printf("Memory successfully freed.\\n");
            } else {
                printf("Memory is already free.\\n");
            }
        }
        clear_input();
    } while (choice != 0);

    if (arr) free(arr);
    return 0;
}`,
      tags: ["program", "dynamic-memory", "malloc", "stats"],
      aliases: ["prog_dynamic_array_stats", "dynamicArrayStatsProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.dynamic-memory.prog-dynamic-buffer-growth",
      name: "prog_dynamic_buffer_growth",
      type: "program",
      category: "boiler-plates",
      subcategory: "dynamic-memory",
      categoryId: "boiler-plates.full-programs.dynamic-memory",
      path: "boiler-plates/full-programs/dynamic-memory/prog-dynamic-buffer-growth",
      description: "Interactive dynamic vector buffer growth with reallocation policies",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* data;
    size_t size;
    size_t capacity;
} Vector;

static void vec_init(Vector* v) {
    v->capacity = 2;
    v->size = 0;
    v->data = (int*)malloc(v->capacity * sizeof(int));
}

static void vec_push(Vector* v, int val) {
    if (v->size >= v->capacity) {
        size_t new_cap = v->capacity * 2;
        int* next = (int*)realloc(v->data, new_cap * sizeof(int));
        if (!next) return;
        v->data = next;
        v->capacity = new_cap;
        printf("Buffer expanded: new capacity = %zu\\n", v->capacity);
    }
    v->data[v->size++] = val;
}

static void vec_pop(Vector* v) {
    if (v->size > 0) {
        int popped = v->data[--v->size];
        printf("Popped: %d (current size: %zu)\\n", popped, v->size);
    } else {
        printf("Vector is empty!\\n");
    }
}

static void vec_display(const Vector* v) {
    printf("Vector [size=%zu, capacity=%zu]: [ ", v->size, v->capacity);
    for (size_t i = 0; i < v->size; i++) {
        printf("%d ", v->data[i]);
    }
    printf("]\\n");
}

static void vec_free(Vector* v) {
    if (v->data) {
        free(v->data);
        v->data = NULL;
    }
    v->size = 0;
    v->capacity = 0;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    Vector v;
    vec_init(&v);
    int choice;

    do {
        printf("\\n=== RESIZABLE VECTOR BUFFER (REALLOC) ===\\n");
        printf("1. Push Element\\n");
        printf("2. Pop Element\\n");
        printf("3. Display Buffer State\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int val;
            printf("Enter integer value to push: ");
            if (scanf("%d", &val) == 1) {
                vec_push(&v, val);
            }
        } else if (choice == 2) {
            vec_pop(&v);
        } else if (choice == 3) {
            vec_display(&v);
        }
        clear_input();
    } while (choice != 0);

    vec_free(&v);
    return 0;
}`,
      tags: ["program", "dynamic-memory", "realloc", "vector"],
      aliases: ["prog_dynamic_buffer_growth", "dynamicBufferGrowthProgram"],
    })
  );

  return components;
}
