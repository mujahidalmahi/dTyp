import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAcademicNumericalComponents(): Component[] {
  const components: Component[] = [];

  // 7. Bisection Method
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.bisection-method.prog-bisection",
      name: "prog_acad_bisection",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.bisection-method",
      path: "academics-programming/numerical-methods/root-finding/bisection-method/prog-bisection",
      description: "Interactive bisection root solver with convergence table, function selection, and error bounds",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return x * x * x - x - 2.0; }
static double f2(double x) { return cos(x) - x; }
static double f3(double x) { return exp(x) - 3.0 * x; }

static void run_bisection(double (*f)(double), double a, double b, double tol, int max_iter) {
    double fa = f(a);
    double fb = f(b);

    if (fa * fb >= 0.0) {
        printf("Error: f(a) and f(b) must have opposite signs. f(%.4f)=%.4f, f(%.4f)=%.4f\\n", a, fa, b, fb);
        return;
    }

    int expected_n = (int)ceil((log(fabs(b - a)) - log(tol)) / log(2.0));
    printf("\\nTheoretical iterations required: N >= %d\\n", expected_n);
    printf("----------------------------------------------------------------------\\n");
    printf(" Iter |      a       |      b       |      c       |    f(c)     |  Error\\n");
    printf("----------------------------------------------------------------------\\n");

    double c = a;
    for (int iter = 1; iter <= max_iter; iter++) {
        c = 0.5 * (a + b);
        double fc = f(c);
        double err = 0.5 * fabs(b - a);

        printf(" %4d | %12.6f | %12.6f | %12.6f | %11.4e | %10.4e\\n",
               iter, a, b, c, fc, err);

        if (fabs(fc) < 1e-12 || err < tol) {
            printf("----------------------------------------------------------------------\\n");
            printf("Convergence reached in %d iterations!\\n", iter);
            printf("Root estimate x* = %.10f with f(x*) = %.4e\\n", c, fc);
            return;
        }

        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }
    }
    printf("----------------------------------------------------------------------\\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\\n", max_iter, c);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ BISECTION ROOT-FINDING WORKBENCH ================\\n");
        printf("1. Solve f(x) = x^3 - x - 2 = 0\\n");
        printf("2. Solve f(x) = cos(x) - x = 0\\n");
        printf("3. Solve f(x) = exp(x) - 3x = 0\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a, b, tol;
            int max_iter;
            printf("Enter interval [a, b] (e.g. 1.0 2.0): ");
            if (scanf("%lf %lf", &a, &b) != 2) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_bisection(f, a, b, tol, max_iter);
        } else if (choice == 0) {
            printf("Exiting Bisection Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "root-finding", "bisection"],
      aliases: ["prog_acad_bisection"],
    })
  );

  // 8. False Position (Regula Falsi)
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.false-position.prog-false-position",
      name: "prog_acad_false_position",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.false-position",
      path: "academics-programming/numerical-methods/root-finding/false-position/prog-false-position",
      description: "Interactive Regula Falsi root-finding solver with convergence table and Illinois acceleration option",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return x * x * x - 2.0 * x - 5.0; }
static double f2(double x) { return x * exp(x) - 1.0; }

static void run_false_position(double (*f)(double), double a, double b, double tol, int max_iter, bool illinois) {
    double fa = f(a);
    double fb = f(b);

    if (fa * fb >= 0.0) {
        printf("Error: f(a) and f(b) must have opposite signs. f(%.4f)=%.4f, f(%.4f)=%.4f\\n", a, fa, b, fb);
        return;
    }

    printf("\\nMethod: %s\\n", illinois ? "Illinois Accelerated False Position" : "Standard Regula Falsi");
    printf("----------------------------------------------------------------------\\n");
    printf(" Iter |      a       |      b       |      c       |    f(c)     |  |f(c)|\\n");
    printf("----------------------------------------------------------------------\\n");

    double c = a;
    int side = 0;
    for (int iter = 1; iter <= max_iter; iter++) {
        c = (a * fb - b * fa) / (fb - fa);
        double fc = f(c);

        printf(" %4d | %12.6f | %12.6f | %12.6f | %11.4e | %10.4e\\n",
               iter, a, b, c, fc, fabs(fc));

        if (fabs(fc) < tol) {
            printf("----------------------------------------------------------------------\\n");
            printf("Convergence reached in %d iterations! Root estimate x* = %.10f\\n", iter, c);
            return;
        }

        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
            if (side == -1 && illinois) fa *= 0.5;
            side = -1;
        } else {
            a = c;
            fa = fc;
            if (side == 1 && illinois) fb *= 0.5;
            side = 1;
        }
    }
    printf("----------------------------------------------------------------------\\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\\n", max_iter, c);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ REGULA FALSI (FALSE POSITION) WORKBENCH ================\\n");
        printf("1. Standard Regula Falsi: f(x) = x^3 - 2x - 5 = 0\\n");
        printf("2. Illinois Accelerated: f(x) = x^3 - 2x - 5 = 0\\n");
        printf("3. Standard Regula Falsi: f(x) = x*e^x - 1 = 0\\n");
        printf("4. Illinois Accelerated: f(x) = x*e^x - 1 = 0\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 4) {
            double (*f)(double) = (choice <= 2) ? f1 : f2;
            bool illinois = (choice == 2 || choice == 4);
            double a, b, tol;
            int max_iter;
            printf("Enter bracket [a, b]: ");
            if (scanf("%lf %lf", &a, &b) != 2) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_false_position(f, a, b, tol, max_iter, illinois);
        } else if (choice == 0) {
            printf("Exiting Regula Falsi Workbench.\\n");
        } else {
            printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "root-finding", "false-position"],
      aliases: ["prog_acad_false_position"],
    })
  );

  // 9. Fixed Point Iteration
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.fixed-point.prog-fixed-point",
      name: "prog_acad_fixed_point",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.fixed-point",
      path: "academics-programming/numerical-methods/root-finding/fixed-point/prog-fixed-point",
      description: "Interactive fixed-point iteration solver (x = g(x)) with divergence detection and error tracking",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double g1(double x) { return cbrt(x + 2.0); }
static double g2(double x) { return cos(x); }
static double g3(double x) { return exp(-x); }

static void run_fixed_point(double (*g)(double), double x0, double tol, int max_iter) {
    printf("\\n--------------------------------------------------------------\\n");
    printf(" Iter |      x_k      |     g(x_k)    |  |x_{k+1} - x_k|\\n");
    printf("--------------------------------------------------------------\\n");

    double x = x0;
    for (int iter = 1; iter <= max_iter; iter++) {
        double x_next = g(x);
        double diff = fabs(x_next - x);

        printf(" %4d | %13.7f | %13.7f | %14.6e\\n", iter, x, x_next, diff);

        if (diff < tol) {
            printf("--------------------------------------------------------------\\n");
            printf("Convergence reached in %d iterations! Fixed point x* = %.10f\\n", iter, x_next);
            return;
        }

        if (diff > 1e8 || isnan(x_next) || isinf(x_next)) {
            printf("--------------------------------------------------------------\\n");
            printf("Divergence detected (|g'(x)| >= 1). Sequence cannot converge.\\n");
            return;
        }

        x = x_next;
    }
    printf("--------------------------------------------------------------\\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\\n", max_iter, x);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ FIXED POINT ITERATION WORKBENCH ================\\n");
        printf("1. Solve x = (x + 2)^(1/3) [f(x) = x^3 - x - 2]\\n");
        printf("2. Solve x = cos(x) [Dottie Number]\\n");
        printf("3. Solve x = e^(-x)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*g)(double) = (choice == 1) ? g1 : (choice == 2) ? g2 : g3;
            double x0, tol;
            int max_iter;
            printf("Enter initial guess x0: ");
            if (scanf("%lf", &x0) != 1) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_fixed_point(g, x0, tol, max_iter);
        } else if (choice == 0) {
            printf("Exiting Fixed Point Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "root-finding", "fixed-point"],
      aliases: ["prog_acad_fixed_point"],
    })
  );

  // 10. Newton-Raphson Method
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.newton-raphson.prog-newton-raphson",
      name: "prog_acad_newton_raphson",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.newton-raphson",
      path: "academics-programming/numerical-methods/root-finding/newton-raphson/prog-newton-raphson",
      description: "Interactive Newton-Raphson root solver with quadratic convergence check and derivative protection",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return x * x * x - x - 2.0; }
static double df1(double x) { return 3.0 * x * x - 1.0; }

static double f2(double x) { return cos(x) - x; }
static double df2(double x) { return -sin(x) - 1.0; }

static double f3(double x) { return x * exp(x) - 1.0; }
static double df3(double x) { return exp(x) * (1.0 + x); }

static void run_newton_raphson(double (*f)(double), double (*df)(double), double x0, double tol, int max_iter) {
    printf("\\n--------------------------------------------------------------------------\\n");
    printf(" Iter |      x_k      |     f(x_k)    |    f'(x_k)    |  Delta x   | Error\\n");
    printf("--------------------------------------------------------------------------\\n");

    double x = x0;
    for (int iter = 1; iter <= max_iter; iter++) {
        double fx = f(x);
        double dfx = df(x);

        if (fabs(dfx) < 1e-14) {
            printf("--------------------------------------------------------------------------\\n");
            printf("Error: Derivative f'(x) is zero or near zero at x = %.8f. Cannot proceed.\\n", x);
            return;
        }

        double dx = -fx / dfx;
        double x_next = x + dx;
        double err = fabs(dx);

        printf(" %4d | %13.7f | %13.4e | %13.4e | %10.2e | %10.2e\\n",
               iter, x, fx, dfx, dx, err);

        if (fabs(fx) < tol || err < tol) {
            printf("--------------------------------------------------------------------------\\n");
            printf("Convergence reached in %d iterations (Quadratic Order)!\\n", iter);
            printf("Root estimate x* = %.10f with f(x*) = %.4e\\n", x_next, f(x_next));
            return;
        }

        x = x_next;
    }
    printf("--------------------------------------------------------------------------\\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\\n", max_iter, x);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ NEWTON-RAPHSON ROOT-FINDING WORKBENCH ================\\n");
        printf("1. Solve f(x) = x^3 - x - 2 = 0\\n");
        printf("2. Solve f(x) = cos(x) - x = 0\\n");
        printf("3. Solve f(x) = x*e^x - 1 = 0\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double (*df)(double) = (choice == 1) ? df1 : (choice == 2) ? df2 : df3;
            double x0, tol;
            int max_iter;
            printf("Enter initial guess x0: ");
            if (scanf("%lf", &x0) != 1) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_newton_raphson(f, df, x0, tol, max_iter);
        } else if (choice == 0) {
            printf("Exiting Newton-Raphson Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "root-finding", "newton-raphson"],
      aliases: ["prog_acad_newton_raphson"],
    })
  );

  // 11. Secant Method
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.root-finding.secant-method.prog-secant",
      name: "prog_acad_secant",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.root-finding.secant-method",
      path: "academics-programming/numerical-methods/root-finding/secant-method/prog-secant",
      description: "Interactive Secant root solver with superlinear convergence table and zero-denominator protection",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return x * x * x - 2.0 * x - 5.0; }
static double f2(double x) { return cos(x) - x; }

static void run_secant(double (*f)(double), double x0, double x1, double tol, int max_iter) {
    printf("\\n--------------------------------------------------------------------------\\n");
    printf(" Iter |     x_{k-1}   |      x_k      |    x_{k+1}    |    f(x_{k+1}) | Error\\n");
    printf("--------------------------------------------------------------------------\\n");

    for (int iter = 1; iter <= max_iter; iter++) {
        double f0 = f(x0);
        double f1_val = f(x1);

        if (fabs(f1_val - f0) < 1e-15) {
            printf("--------------------------------------------------------------------------\\n");
            printf("Error: Division by zero in Secant denominator at iter %d.\\n", iter);
            return;
        }

        double x_next = x1 - f1_val * (x1 - x0) / (f1_val - f0);
        double fn = f(x_next);
        double err = fabs(x_next - x1);

        printf(" %4d | %13.7f | %13.7f | %13.7f | %14.4e | %10.2e\\n",
               iter, x0, x1, x_next, fn, err);

        if (fabs(fn) < tol || err < tol) {
            printf("--------------------------------------------------------------------------\\n");
            printf("Convergence reached in %d iterations (Order ~ 1.618)!\\n", iter);
            printf("Root estimate x* = %.10f with f(x*) = %.4e\\n", x_next, fn);
            return;
        }

        x0 = x1;
        x1 = x_next;
    }
    printf("--------------------------------------------------------------------------\\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\\n", max_iter, x1);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ SECANT METHOD ROOT-FINDING WORKBENCH ================\\n");
        printf("1. Solve f(x) = x^3 - 2x - 5 = 0\\n");
        printf("2. Solve f(x) = cos(x) - x = 0\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1 || choice == 2) {
            double (*f)(double) = (choice == 1) ? f1 : f2;
            double x0, x1, tol;
            int max_iter;
            printf("Enter two initial guesses x0 and x1: ");
            if (scanf("%lf %lf", &x0, &x1) != 2) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_secant(f, x0, x1, tol, max_iter);
        } else if (choice == 0) {
            printf("Exiting Secant Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "root-finding", "secant-method"],
      aliases: ["prog_acad_secant"],
    })
  );

  // 12. Naive Gaussian Elimination
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.naive-gauss.prog-naive-gauss",
      name: "prog_acad_naive_gauss",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.naive-gauss",
      path: "academics-programming/numerical-methods/elimination-methods/naive-gauss/prog-naive-gauss",
      description: "Interactive naive Gaussian elimination linear solver with step-by-step augmented tableau and residual calculation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DIM 10

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_augmented(int n, double a[MAX_DIM][MAX_DIM + 1]) {
    for (int i = 0; i < n; i++) {
        printf(" | ");
        for (int j = 0; j < n; j++) printf("%10.4f ", a[i][j]);
        printf("| %10.4f |\\n", a[i][n]);
    }
    printf("\\n");
}

static void solve_naive_gauss(int n, double a[MAX_DIM][MAX_DIM + 1]) {
    printf("\\nInitial Augmented Matrix [A | b]:\\n");
    print_augmented(n, a);

    double orig_a[MAX_DIM][MAX_DIM];
    double orig_b[MAX_DIM];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) orig_a[i][j] = a[i][j];
        orig_b[i] = a[i][n];
    }

    for (int k = 0; k < n - 1; k++) {
        if (fabs(a[k][k]) < 1e-12) {
            printf("Error: Pivot A[%d][%d] is zero or near-zero. Naive elimination fails without pivoting.\\n", k, k);
            return;
        }
        for (int i = k + 1; i < n; i++) {
            double factor = a[i][k] / a[k][k];
            for (int j = k; j <= n; j++) {
                a[i][j] -= factor * a[k][j];
            }
        }
        printf("After eliminating column %d:\\n", k + 1);
        print_augmented(n, a);
    }

    double x[MAX_DIM];
    for (int i = n - 1; i >= 0; i--) {
        double sum = a[i][n];
        for (int j = i + 1; j < n; j++) {
            sum -= a[i][j] * x[j];
        }
        x[i] = sum / a[i][i];
    }

    printf("Solution Vector x:\\n");
    for (int i = 0; i < n; i++) printf("  x[%d] = %12.6f\\n", i + 1, x[i]);

    printf("\\nResidual Check (r = Ax - b):\\n");
    double max_res = 0.0;
    for (int i = 0; i < n; i++) {
        double ax = 0.0;
        for (int j = 0; j < n; j++) ax += orig_a[i][j] * x[j];
        double res = fabs(ax - orig_b[i]);
        if (res > max_res) max_res = res;
        printf("  Equation %d: Ax = %.6f, b = %.6f, error = %.2e\\n", i + 1, ax, orig_b[i], res);
    }
    printf("Infinity Norm ||r||_inf = %.2e\\n", max_res);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM + 1] = {
        {2.0, 1.0, -1.0, 8.0},
        {-3.0, -1.0, 2.0, -11.0},
        {-2.0, 1.0, 2.0, -3.0}
    };

    int choice;
    do {
        printf("\\n================ NAIVE GAUSSIAN ELIMINATION WORKBENCH ================\\n");
        printf("1. Enter System of Linear Equations (Dimension N and Coefficients)\\n");
        printf("2. Solve System via Forward Elimination & Back Substitution\\n");
        printf("3. Load Default 3x3 Test System\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter system dimension N (2 to %d): ", MAX_DIM);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) {
                    clear_input();
                    n = 3;
                    printf("Invalid dimension.\\n");
                    break;
                }
                printf("Enter augmented matrix row by row (each row has %d coefficients followed by RHS b):\\n", n);
                for (int i = 0; i < n; i++) {
                    printf("Row %d: ", i + 1);
                    for (int j = 0; j <= n; j++) {
                        if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
                solve_naive_gauss(n, a);
                break;
            case 3:
                n = 3;
                a[0][0] = 2.0;  a[0][1] = 1.0;  a[0][2] = -1.0; a[0][3] = 8.0;
                a[1][0] = -3.0; a[1][1] = -1.0; a[1][2] = 2.0;  a[1][3] = -11.0;
                a[2][0] = -2.0; a[2][1] = 1.0;  a[2][2] = 2.0;  a[2][3] = -3.0;
                printf("Loaded default 3x3 system.\\n");
                print_augmented(n, a);
                break;
            case 0:
                printf("Exiting Naive Gauss Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "elimination", "gaussian-elimination"],
      aliases: ["prog_acad_naive_gauss"],
    })
  );

  // 13. Gauss Elimination with Partial Pivoting
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.gauss-pivoting.prog-gauss-pivoting",
      name: "prog_acad_gauss_pivoting",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.gauss-pivoting",
      path: "academics-programming/numerical-methods/elimination-methods/gauss-pivoting/prog-gauss-pivoting",
      description: "Interactive Gaussian elimination with partial pivoting, row-swap logging, and determinant computation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DIM 10

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_augmented(int n, double a[MAX_DIM][MAX_DIM + 1]) {
    for (int i = 0; i < n; i++) {
        printf(" | ");
        for (int j = 0; j < n; j++) printf("%10.4f ", a[i][j]);
        printf("| %10.4f |\\n", a[i][n]);
    }
    printf("\\n");
}

static void solve_gauss_pivoting(int n, double a[MAX_DIM][MAX_DIM + 1]) {
    printf("\\nInitial Augmented Matrix:\\n");
    print_augmented(n, a);

    int swap_count = 0;
    for (int k = 0; k < n; k++) {
        int max_row = k;
        double max_val = fabs(a[k][k]);
        for (int i = k + 1; i < n; i++) {
            if (fabs(a[i][k]) > max_val) {
                max_val = fabs(a[i][k]);
                max_row = i;
            }
        }

        if (max_val < 1e-14) {
            printf("Error: Matrix is singular or near-singular at column %d.\\n", k);
            return;
        }

        if (max_row != k) {
            for (int j = k; j <= n; j++) {
                double tmp = a[k][j];
                a[k][j] = a[max_row][j];
                a[max_row][j] = tmp;
            }
            swap_count++;
            printf("Swapped Row %d with Row %d (pivot magnitude = %.4f):\\n", k + 1, max_row + 1, max_val);
            print_augmented(n, a);
        }

        for (int i = k + 1; i < n; i++) {
            double factor = a[i][k] / a[k][k];
            for (int j = k; j <= n; j++) {
                a[i][j] -= factor * a[k][j];
            }
        }
    }

    double det = (swap_count % 2 == 1) ? -1.0 : 1.0;
    for (int i = 0; i < n; i++) det *= a[i][i];
    printf("Matrix Determinant det(A) = %.6f\\n\\n", det);

    double x[MAX_DIM];
    for (int i = n - 1; i >= 0; i--) {
        double sum = a[i][n];
        for (int j = i + 1; j < n; j++) {
            sum -= a[i][j] * x[j];
        }
        x[i] = sum / a[i][i];
    }

    printf("Solution Vector x:\\n");
    for (int i = 0; i < n; i++) printf("  x[%d] = %12.6f\\n", i + 1, x[i]);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM + 1] = {
        {0.001, 2.0, 3.0, 5.0},
        {1.0, 1.0, 1.0, 3.0},
        {2.0, -1.0, 4.0, 5.0}
    };

    int choice;
    do {
        printf("\\n================ GAUSS ELIMINATION WITH PARTIAL PIVOTING ================\\n");
        printf("1. Enter System of Linear Equations\\n");
        printf("2. Solve System with Partial Pivoting & Display Determinant\\n");
        printf("3. Load Small-Pivot Test Case (0.001 near-zero pivot)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter dimension N (2 to %d): ", MAX_DIM);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) {
                    clear_input();
                    n = 3;
                    printf("Invalid dimension.\\n");
                    break;
                }
                printf("Enter augmented rows (%d coeffs + 1 RHS per row):\\n", n);
                for (int i = 0; i < n; i++) {
                    printf("Row %d: ", i + 1);
                    for (int j = 0; j <= n; j++) {
                        if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
                solve_gauss_pivoting(n, a);
                break;
            case 3:
                n = 3;
                a[0][0] = 0.001; a[0][1] = 2.0;  a[0][2] = 3.0; a[0][3] = 5.0;
                a[1][0] = 1.0;   a[1][1] = 1.0;  a[1][2] = 1.0; a[1][3] = 3.0;
                a[2][0] = 2.0;   a[2][1] = -1.0; a[2][2] = 4.0; a[2][3] = 5.0;
                printf("Loaded near-zero pivot test case.\\n");
                print_augmented(n, a);
                break;
            case 0:
                printf("Exiting Pivoting Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "elimination", "partial-pivoting"],
      aliases: ["prog_acad_gauss_pivoting"],
    })
  );

  // 14. Gauss-Jordan Elimination & Inversion
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.gauss-jordan.prog-gauss-jordan",
      name: "prog_acad_gauss_jordan",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.gauss-jordan",
      path: "academics-programming/numerical-methods/elimination-methods/gauss-jordan/prog-gauss-jordan",
      description: "Interactive Gauss-Jordan elimination for solving linear systems to RREF and full matrix inversion",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DIM 8

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_matrix_2n(int n, double a[MAX_DIM][MAX_DIM * 2]) {
    for (int i = 0; i < n; i++) {
        printf(" | ");
        for (int j = 0; j < n; j++) printf("%8.3f ", a[i][j]);
        printf("| ");
        for (int j = n; j < 2 * n; j++) printf("%8.3f ", a[i][j]);
        printf("|\\n");
    }
    printf("\\n");
}

static void invert_matrix(int n, double a[MAX_DIM][MAX_DIM]) {
    double aug[MAX_DIM][MAX_DIM * 2];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) aug[i][j] = a[i][j];
        for (int j = n; j < 2 * n; j++) aug[i][j] = (j - n == i) ? 1.0 : 0.0;
    }

    printf("\\nInitial Augmented Matrix [A | I]:\\n");
    print_matrix_2n(n, aug);

    for (int i = 0; i < n; i++) {
        int pivot = i;
        for (int k = i + 1; k < n; k++) {
            if (fabs(aug[k][i]) > fabs(aug[pivot][i])) pivot = k;
        }

        if (fabs(aug[pivot][i]) < 1e-12) {
            printf("Error: Matrix is singular. Inversion impossible.\\n");
            return;
        }

        if (pivot != i) {
            for (int j = 0; j < 2 * n; j++) {
                double tmp = aug[i][j];
                aug[i][j] = aug[pivot][j];
                aug[pivot][j] = tmp;
            }
        }

        double diag = aug[i][i];
        for (int j = 0; j < 2 * n; j++) aug[i][j] /= diag;

        for (int k = 0; k < n; k++) {
            if (k != i) {
                double factor = aug[k][i];
                for (int j = 0; j < 2 * n; j++) {
                    aug[k][j] -= factor * aug[i][j];
                }
            }
        }
    }

    printf("Reduced Row Echelon Form [I | A^-1]:\\n");
    print_matrix_2n(n, aug);

    printf("Inverted Matrix A^-1:\\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) printf("%10.5f ", aug[i][j + n]);
        printf("\\n");
    }
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM] = {
        {2.0, 1.0, 1.0},
        {1.0, 3.0, 2.0},
        {1.0, 0.0, 0.0}
    };

    int choice;
    do {
        printf("\\n================ GAUSS-JORDAN ELIMINATION & INVERSION ================\\n");
        printf("1. Enter Square Matrix A\\n");
        printf("2. Compute Matrix Inverse A^-1 via [A | I] -> [I | A^-1]\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter matrix dimension N (2 to %d): ", MAX_DIM);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) {
                    clear_input();
                    n = 3;
                    break;
                }
                printf("Enter %d x %d matrix entries:\\n", n, n);
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
                invert_matrix(n, a);
                break;
            case 0:
                printf("Exiting Gauss-Jordan Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "elimination", "gauss-jordan", "inversion"],
      aliases: ["prog_acad_gauss_jordan"],
    })
  );

  // 15. LU Decomposition
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.lu-decomposition.prog-lu-decomposition",
      name: "prog_acad_lu_decomposition",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.lu-decomposition",
      path: "academics-programming/numerical-methods/elimination-methods/lu-decomposition/prog-lu-decomposition",
      description: "Interactive Doolittle LU matrix decomposition and two-step triangular linear system solver",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DIM 8

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_matrix(const char* name, int n, double mat[MAX_DIM][MAX_DIM]) {
    printf("%s:\\n", name);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) printf("%10.4f ", mat[i][j]);
        printf("\\n");
    }
    printf("\\n");
}

static bool doolittle_lu(int n, double a[MAX_DIM][MAX_DIM], double l[MAX_DIM][MAX_DIM], double u[MAX_DIM][MAX_DIM]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            l[i][j] = (i == j) ? 1.0 : 0.0;
            u[i][j] = 0.0;
        }
    }

    for (int i = 0; i < n; i++) {
        for (int k = i; k < n; k++) {
            double sum = 0.0;
            for (int j = 0; j < i; j++) sum += l[i][j] * u[j][k];
            u[i][k] = a[i][k] - sum;
        }

        if (fabs(u[i][i]) < 1e-12) return false;

        for (int k = i + 1; k < n; k++) {
            double sum = 0.0;
            for (int j = 0; j < i; j++) sum += l[k][j] * u[j][i];
            l[k][i] = (a[k][i] - sum) / u[i][i];
        }
    }
    return true;
}

static void solve_lu_system(int n, double l[MAX_DIM][MAX_DIM], double u[MAX_DIM][MAX_DIM], double b[MAX_DIM]) {
    double y[MAX_DIM];
    for (int i = 0; i < n; i++) {
        double sum = 0.0;
        for (int j = 0; j < i; j++) sum += l[i][j] * y[j];
        y[i] = b[i] - sum;
    }

    double x[MAX_DIM];
    for (int i = n - 1; i >= 0; i--) {
        double sum = 0.0;
        for (int j = i + 1; j < n; j++) sum += u[i][j] * x[j];
        x[i] = (y[i] - sum) / u[i][i];
    }

    printf("Forward substitution Ly = b:\\n");
    for (int i = 0; i < n; i++) printf("  y[%d] = %10.4f\\n", i + 1, y[i]);

    printf("\\nBackward substitution Ux = y:\\n");
    for (int i = 0; i < n; i++) printf("  x[%d] = %10.4f\\n", i + 1, x[i]);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM] = {
        {2.0, -1.0, -2.0},
        {-4.0, 6.0, 3.0},
        {-4.0, -2.8, 4.0}
    };
    double b[MAX_DIM] = {1.0, 2.0, 3.0};
    double l[MAX_DIM][MAX_DIM], u[MAX_DIM][MAX_DIM];

    int choice;
    do {
        printf("\\n================ LU DECOMPOSITION WORKBENCH (DOOLITTLE) ================\\n");
        printf("1. Enter Matrix A and RHS Vector b\\n");
        printf("2. Compute LU Factorization (Display L and U)\\n");
        printf("3. Solve Ax = b via Ly = b and Ux = y\\n");
        printf("4. Display Matrix Determinant from U Diagonal\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter matrix dimension N (2 to %d): ", MAX_DIM);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) {
                    clear_input();
                    n = 3;
                    break;
                }
                printf("Enter %d x %d matrix entries:\\n", n, n);
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                    }
                }
                printf("Enter RHS vector b (%d values): ", n);
                for (int i = 0; i < n; i++) {
                    if (scanf("%lf", &b[i]) != 1) b[i] = 0.0;
                }
                clear_input();
                break;
            }
            case 2:
                if (doolittle_lu(n, a, l, u)) {
                    print_matrix("Lower Triangular L", n, l);
                    print_matrix("Upper Triangular U", n, u);
                } else {
                    printf("Error: LU factorization failed (zero pivot encountered).\\n");
                }
                break;
            case 3:
                if (doolittle_lu(n, a, l, u)) {
                    solve_lu_system(n, l, u, b);
                } else {
                    printf("LU factorization failed.\\n");
                }
                break;
            case 4:
                if (doolittle_lu(n, a, l, u)) {
                    double det = 1.0;
                    for (int i = 0; i < n; i++) det *= u[i][i];
                    printf("Determinant det(A) = Product(U_ii) = %.6f\\n", det);
                }
                break;
            case 0:
                printf("Exiting LU Decomposition Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "elimination", "lu-decomposition"],
      aliases: ["prog_acad_lu_decomposition"],
    })
  );

  // 16. Jacobi Iteration
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.jacobi-iteration.prog-jacobi-iteration",
      name: "prog_acad_jacobi_iteration",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.jacobi-iteration",
      path: "academics-programming/numerical-methods/elimination-methods/jacobi-iteration/prog-jacobi-iteration",
      description: "Interactive Jacobi iterative linear solver with strict diagonal dominance verification and convergence tracking",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DIM 10

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static bool check_diagonal_dominance(int n, double a[MAX_DIM][MAX_DIM]) {
    bool strictly_dominant = true;
    printf("\\nChecking Strict Diagonal Dominance (|A_ii| > Sum_{j != i} |A_ij|):\\n");
    for (int i = 0; i < n; i++) {
        double diag = fabs(a[i][i]);
        double sum = 0.0;
        for (int j = 0; j < n; j++) {
            if (i != j) sum += fabs(a[i][j]);
        }
        printf("  Row %d: |A[%d][%d]| = %.4f, Sum off-diagonals = %.4f -> %s\\n",
               i + 1, i + 1, i + 1, diag, sum, (diag > sum) ? "PASS" : "FAIL");
        if (diag <= sum) strictly_dominant = false;
    }
    return strictly_dominant;
}

static void solve_jacobi(int n, double a[MAX_DIM][MAX_DIM], double b[MAX_DIM], double tol, int max_iter) {
    check_diagonal_dominance(n, a);

    double x[MAX_DIM] = {0.0};
    double x_new[MAX_DIM];

    printf("\\nIterative Convergence Table (Jacobi Method):\\n");
    printf("-------------------------------------------------------------\\n");
    printf(" Iter |  x[1]   |  x[2]   |  x[3]   | Max ||x_new - x||_inf\\n");
    printf("-------------------------------------------------------------\\n");

    for (int iter = 1; iter <= max_iter; iter++) {
        double max_diff = 0.0;
        for (int i = 0; i < n; i++) {
            double sum = 0.0;
            for (int j = 0; j < n; j++) {
                if (i != j) sum += a[i][j] * x[j];
            }
            x_new[i] = (b[i] - sum) / a[i][i];
            double diff = fabs(x_new[i] - x[i]);
            if (diff > max_diff) max_diff = diff;
        }

        printf(" %4d |", iter);
        for (int i = 0; i < ((n < 3) ? n : 3); i++) printf(" %7.4f |", x_new[i]);
        printf(" %22.4e\\n", max_diff);

        for (int i = 0; i < n; i++) x[i] = x_new[i];

        if (max_diff < tol) {
            printf("-------------------------------------------------------------\\n");
            printf("Convergence reached in %d iterations!\\n", iter);
            for (int i = 0; i < n; i++) printf("  x[%d] = %12.6f\\n", i + 1, x[i]);
            return;
        }
    }
    printf("-------------------------------------------------------------\\n");
    printf("Reached max iterations (%d).\\n", max_iter);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM] = {
        {10.0, -1.0, 2.0},
        {-1.0, 11.0, -1.0},
        {2.0, -1.0, 10.0}
    };
    double b[MAX_DIM] = {6.0, 25.0, -11.0};

    int choice;
    do {
        printf("\\n================ JACOBI ITERATION WORKBENCH ================\\n");
        printf("1. Enter Linear System A and b\\n");
        printf("2. Solve System via Jacobi Relaxation\\n");
        printf("3. Load Default Diagonally Dominant 3x3 System\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter dimension N (2 to %d): ", MAX_DIM);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) {
                    clear_input();
                    n = 3;
                    break;
                }
                printf("Enter %d x %d matrix entries:\\n", n, n);
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                    }
                }
                printf("Enter RHS vector b (%d values): ", n);
                for (int i = 0; i < n; i++) {
                    if (scanf("%lf", &b[i]) != 1) b[i] = 0.0;
                }
                clear_input();
                break;
            }
            case 2: {
                double tol = 1e-6;
                int max_iter = 50;
                printf("Enter tolerance (e.g. 1e-6): ");
                if (scanf("%lf", &tol) != 1) tol = 1e-6;
                printf("Enter max iterations (e.g. 50): ");
                if (scanf("%d", &max_iter) != 1) max_iter = 50;
                clear_input();
                solve_jacobi(n, a, b, tol, max_iter);
                break;
            }
            case 3:
                n = 3;
                a[0][0] = 10.0; a[0][1] = -1.0; a[0][2] = 2.0;
                a[1][0] = -1.0; a[1][1] = 11.0; a[1][2] = -1.0;
                a[2][0] = 2.0;  a[2][1] = -1.0; a[2][2] = 10.0;
                b[0] = 6.0; b[1] = 25.0; b[2] = -11.0;
                printf("Loaded default 3x3 system.\\n");
                break;
            case 0:
                printf("Exiting Jacobi Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "elimination", "jacobi"],
      aliases: ["prog_acad_jacobi_iteration"],
    })
  );

  // 17. Gauss-Seidel & SOR Iteration
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.gauss-seidel.prog-gauss-seidel",
      name: "prog_acad_gauss_seidel",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.gauss-seidel",
      path: "academics-programming/numerical-methods/elimination-methods/gauss-seidel/prog-gauss-seidel",
      description: "Interactive Gauss-Seidel and Successive Over-Relaxation (SOR) iterative solver with parameter tuning",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DIM 10

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void solve_gauss_seidel(int n, double a[MAX_DIM][MAX_DIM], double b[MAX_DIM], double omega, double tol, int max_iter) {
    double x[MAX_DIM] = {0.0};

    printf("\\nGauss-Seidel / SOR Iteration (omega = %.2f):\\n", omega);
    printf("-------------------------------------------------------------\\n");
    printf(" Iter |  x[1]   |  x[2]   |  x[3]   | Max ||dx||_inf\\n");
    printf("-------------------------------------------------------------\\n");

    for (int iter = 1; iter <= max_iter; iter++) {
        double max_diff = 0.0;
        for (int i = 0; i < n; i++) {
            double sum = 0.0;
            for (int j = 0; j < n; j++) {
                if (i != j) sum += a[i][j] * x[j];
            }
            double x_target = (b[i] - sum) / a[i][i];
            double x_new = (1.0 - omega) * x[i] + omega * x_target;
            double diff = fabs(x_new - x[i]);
            if (diff > max_diff) max_diff = diff;
            x[i] = x_new;
        }

        printf(" %4d |", iter);
        for (int i = 0; i < ((n < 3) ? n : 3); i++) printf(" %7.4f |", x[i]);
        printf(" %15.4e\\n", max_diff);

        if (max_diff < tol) {
            printf("-------------------------------------------------------------\\n");
            printf("Convergence reached in %d iterations!\\n", iter);
            for (int i = 0; i < n; i++) printf("  x[%d] = %12.6f\\n", i + 1, x[i]);
            return;
        }
    }
    printf("-------------------------------------------------------------\\n");
    printf("Reached max iterations (%d).\\n", max_iter);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM] = {
        {4.0, 1.0, 1.0},
        {1.0, 5.0, 2.0},
        {1.0, 2.0, 4.0}
    };
    double b[MAX_DIM] = {7.0, -8.0, 6.0};

    int choice;
    do {
        printf("\\n================ GAUSS-SEIDEL & SOR WORKBENCH ================\\n");
        printf("1. Standard Gauss-Seidel (omega = 1.0)\\n");
        printf("2. Successive Over-Relaxation (SOR, user-specified omega)\\n");
        printf("3. Enter Custom System\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1 || choice == 2) {
            double omega = 1.0;
            if (choice == 2) {
                printf("Enter relaxation factor omega (e.g. 1.15): ");
                if (scanf("%lf", &omega) != 1 || omega <= 0.0 || omega >= 2.0) omega = 1.0;
            }
            solve_gauss_seidel(n, a, b, omega, 1e-6, 50);
        } else if (choice == 3) {
            printf("Enter dimension N (2 to %d): ", MAX_DIM);
            if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) n = 3;
            for (int i = 0; i < n; i++) {
                printf("Row %d: ", i + 1);
                for (int j = 0; j < n; j++) {
                    if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                }
            }
            printf("Enter RHS b: ");
            for (int i = 0; i < n; i++) {
                if (scanf("%lf", &b[i]) != 1) b[i] = 0.0;
            }
            clear_input();
        } else if (choice == 0) {
            printf("Exiting Gauss-Seidel Workbench.\\n");
        } else {
            printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "elimination", "gauss-seidel", "sor"],
      aliases: ["prog_acad_gauss_seidel"],
    })
  );

  // 18. Elimination Pitfalls & Conditioning
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.elimination-methods.elimination-pitfalls.prog-elimination-pitfalls",
      name: "prog_acad_elimination_pitfalls",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.elimination-methods.elimination-pitfalls",
      path: "academics-programming/numerical-methods/elimination-methods/elimination-pitfalls/prog-elimination-pitfalls",
      description: "Interactive demonstrator of linear system ill-conditioning, near-zero pivots, and condition numbers",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void test_near_zero_pivot(void) {
    printf("\\n--- Small Pivot Pitfall (Catastrophic Precision Loss) ---\\n");
    printf("System: [eps   1.0 | 1.0]\\n");
    printf("        [1.0   1.0 | 2.0]\\n\\n");

    double eps_values[] = {1e-3, 1e-6, 1e-12, 1e-16};
    for (int i = 0; i < 4; i++) {
        double eps = eps_values[i];
        double x2 = (2.0 - 1.0 / eps) / (1.0 - 1.0 / eps);
        double x1 = (1.0 - x2) / eps;
        printf("  eps = %1.0e -> x1 = %15.8f, x2 = %15.8f\\n", eps, x1, x2);
    }
    printf("Note: As eps -> 0, float subtraction (1.0 - 1.0/eps) completely wipes out the significant digits.\\n");
}

static void test_ill_conditioned_system(void) {
    printf("\\n--- Ill-Conditioned System Sensitivity (Wilson Matrix) ---\\n");
    printf("Original System:          Perturbed RHS by 0.01:\\n");
    printf("10x1 +  7x2 = 32          10x1 +  7x2 = 32.01\\n");
    printf(" 7x1 +  5x2 = 23           7x1 +  5x2 = 22.99\\n");

    double det = 10.0 * 5.0 - 7.0 * 7.0;
    double x1_orig = (32.0 * 5.0 - 7.0 * 23.0) / det;
    double x2_orig = (10.0 * 23.0 - 32.0 * 7.0) / det;

    double x1_pert = (32.01 * 5.0 - 7.0 * 22.99) / det;
    double x2_pert = (10.0 * 22.99 - 32.01 * 7.0) / det;

    printf("Original Solution:  x1 = %.4f, x2 = %.4f\\n", x1_orig, x2_orig);
    printf("Perturbed Solution: x1 = %.4f, x2 = %.4f\\n", x1_pert, x2_pert);
    printf("Determinant: %.4f (very close to zero compared to entry magnitudes)\\n", det);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ ELIMINATION PITFALLS WORKBENCH ================\\n");
        printf("1. Demonstrate Near-Zero Pivot Catastrophic Roundoff\\n");
        printf("2. Demonstrate Ill-Conditioned System Perturbation Sensitivity\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: test_near_zero_pivot(); break;
            case 2: test_ill_conditioned_system(); break;
            case 0: printf("Exiting Elimination Pitfalls.\\n"); break;
            default: printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "elimination", "conditioning", "stability"],
      aliases: ["prog_acad_elimination_pitfalls"],
    })
  );

  // 19. Lagrange Interpolation
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.interpolation.lagrange-interpolation.prog-lagrange-interpolation",
      name: "prog_acad_lagrange_interpolation",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.interpolation.lagrange-interpolation",
      path: "academics-programming/numerical-methods/interpolation/lagrange-interpolation/prog-lagrange-interpolation",
      description: "Interactive Lagrange polynomial interpolator with basis polynomials evaluation and query solver",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_PTS 20

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double eval_lagrange(int n, const double x[], const double y[], double q) {
    double result = 0.0;
    printf("\\nLagrange Basis Polynomials at x = %.4f:\\n", q);
    for (int i = 0; i < n; i++) {
        double term = 1.0;
        for (int j = 0; j < n; j++) {
            if (i != j) {
                term *= (q - x[j]) / (x[i] - x[j]);
            }
        }
        printf("  L_%d(%.4f) = %10.6f (weighted: y_%d * L_%d = %10.6f)\\n",
               i, q, term, i, i, y[i] * term);
        result += y[i] * term;
    }
    return result;
}

int main(void) {
    int n = 4;
    double x[MAX_PTS] = {0.0, 1.0, 2.0, 3.0};
    double y[MAX_PTS] = {1.0, 2.0, 9.0, 28.0};

    int choice;
    do {
        printf("\\n================ LAGRANGE INTERPOLATION WORKBENCH ================\\n");
        printf("1. Enter Data Points (x_i, y_i)\\n");
        printf("2. Display Current Data Points\\n");
        printf("3. Interpolate at Query Point x\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of points N (2 to %d): ", MAX_PTS);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_PTS) {
                    clear_input();
                    n = 4;
                    break;
                }
                printf("Enter %d pairs of (x y):\\n", n);
                for (int i = 0; i < n; i++) {
                    printf("Point %d: ", i + 1);
                    if (scanf("%lf %lf", &x[i], &y[i]) != 2) {
                        x[i] = (double)i; y[i] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
                printf("\\nCurrent Points:\\n");
                for (int i = 0; i < n; i++) printf("  P%d: (%.4f, %.4f)\\n", i + 1, x[i], y[i]);
                break;
            case 3: {
                double q;
                printf("Enter query value x: ");
                if (scanf("%lf", &q) == 1) {
                    double val = eval_lagrange(n, x, y, q);
                    printf("Interpolated Value P(%.4f) = %.6f\\n", q, val);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting Lagrange Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "interpolation", "lagrange"],
      aliases: ["prog_acad_lagrange_interpolation"],
    })
  );

  // 20. Newton Forward Difference Interpolation
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.interpolation.newton-forward.prog-newton-forward",
      name: "prog_acad_newton_forward",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.interpolation.newton-forward",
      path: "academics-programming/numerical-methods/interpolation/newton-forward/prog-newton-forward",
      description: "Interactive Newton forward difference interpolation with 2D difference table and polynomial evaluation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_DIFF 15

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_diff_table(int n, const double x[], double diff[MAX_DIFF][MAX_DIFF]) {
    printf("\\nNewton Forward Difference Table:\\n");
    printf("   x    |   y    |");
    for (int i = 1; i < n; i++) printf("  D^%d y  |", i);
    printf("\\n--------+--------+");
    for (int i = 1; i < n; i++) printf("---------+");
    printf("\\n");

    for (int i = 0; i < n; i++) {
        printf("%7.2f |%7.2f |", x[i], diff[i][0]);
        for (int j = 1; j < n - i; j++) {
            printf("%8.3f |", diff[i][j]);
        }
        printf("\\n");
    }
}

static double eval_newton_forward(int n, const double x[], double diff[MAX_DIFF][MAX_DIFF], double q) {
    double h = x[1] - x[0];
    double u = (q - x[0]) / h;

    double result = diff[0][0];
    double u_term = 1.0;
    double fact = 1.0;

    for (int i = 1; i < n; i++) {
        u_term *= (u - (i - 1));
        fact *= i;
        result += (u_term / fact) * diff[0][i];
    }
    return result;
}

int main(void) {
    int n = 5;
    double x[MAX_DIFF] = {10.0, 20.0, 30.0, 40.0, 50.0};
    double y[MAX_DIFF] = {0.1736, 0.3420, 0.5000, 0.6428, 0.7660};
    double diff[MAX_DIFF][MAX_DIFF];

    int choice;
    do {
        for (int i = 0; i < n; i++) diff[i][0] = y[i];
        for (int j = 1; j < n; j++) {
            for (int i = 0; i < n - j; i++) {
                diff[i][j] = diff[i + 1][j - 1] - diff[i][j - 1];
            }
        }

        printf("\\n================ NEWTON FORWARD DIFFERENCE WORKBENCH ================\\n");
        printf("1. Display Forward Difference Table\\n");
        printf("2. Interpolate at Query Point x\\n");
        printf("3. Enter Equispaced Data Points\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                print_diff_table(n, x, diff);
                break;
            case 2: {
                double q;
                printf("Enter query value x: ");
                if (scanf("%lf", &q) == 1) {
                    double ans = eval_newton_forward(n, x, diff, q);
                    printf("Interpolated Value P(%.4f) = %.6f\\n", q, ans);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                printf("Enter number of points N (3 to %d): ", MAX_DIFF);
                if (scanf("%d", &n) != 1 || n < 3 || n > MAX_DIFF) {
                    clear_input();
                    n = 5;
                    break;
                }
                printf("Enter %d x-values (equispaced): ", n);
                for (int i = 0; i < n; i++) if (scanf("%lf", &x[i]) != 1) x[i] = i;
                printf("Enter %d y-values: ", n);
                for (int i = 0; i < n; i++) if (scanf("%lf", &y[i]) != 1) y[i] = 0;
                clear_input();
                break;
            }
            case 0:
                printf("Exiting Newton Forward Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "interpolation", "newton-forward"],
      aliases: ["prog_acad_newton_forward"],
    })
  );

  // 21. Trapezoidal Rule
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.numerical-integration.trapezoidal-rule.prog-trapezoidal-rule",
      name: "prog_acad_trapezoidal_rule",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.numerical-integration.trapezoidal-rule",
      path: "academics-programming/numerical-methods/numerical-integration/trapezoidal-rule/prog-trapezoidal-rule",
      description: "Interactive composite trapezoidal numerical integration with step size convergence and error bounds",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return sin(x); }
static double f2(double x) { return exp(-x * x); }
static double f3(double x) { return 1.0 / (1.0 + x * x); }

static double composite_trapezoidal(double (*f)(double), double a, double b, int n) {
    double h = (b - a) / n;
    double sum = 0.5 * (f(a) + f(b));
    for (int i = 1; i < n; i++) {
        sum += f(a + i * h);
    }
    return sum * h;
}

int main(void) {
    int choice;
    do {
        printf("\\n================ TRAPEZOIDAL INTEGRATION WORKBENCH ================\\n");
        printf("1. Integrate f(x) = sin(x) on [0, pi] (Exact = 2.0)\\n");
        printf("2. Integrate f(x) = e^(-x^2) [Gaussian]\\n");
        printf("3. Integrate f(x) = 1 / (1 + x^2) on [0, 1] (Exact = pi/4)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a = 0.0, b = 1.0;
            if (choice == 1) { a = 0.0; b = 3.141592653589793; }
            else if (choice == 3) { a = 0.0; b = 1.0; }
            else {
                printf("Enter interval [a, b]: ");
                if (scanf("%lf %lf", &a, &b) != 2) { clear_input(); continue; }
            }

            printf("\\nTrapezoidal Convergence Table across Subintervals n:\\n");
            printf("--------------------------------------------------\\n");
            printf("      n |      Step h      | Numerical Integral\\n");
            printf("--------------------------------------------------\\n");
            int n_vals[] = {2, 4, 8, 16, 32, 64, 128, 256, 512, 1024};
            for (int k = 0; k < 10; k++) {
                int n = n_vals[k];
                double val = composite_trapezoidal(f, a, b, n);
                printf(" %6d | %16.8f | %18.10f\\n", n, (b - a) / n, val);
            }
            printf("--------------------------------------------------\\n");
        } else if (choice == 0) {
            printf("Exiting Trapezoidal Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "integration", "trapezoidal"],
      aliases: ["prog_acad_trapezoidal_rule"],
    })
  );

  // 22. Simpson's Rules (1/3 and 3/8)
  components.push(
    createComponent({
      id: "academics-programming.numerical-methods.numerical-integration.simpsons-rules.prog-simpsons-rules",
      name: "prog_acad_simpsons_rules",
      type: "program",
      category: "academics-programming",
      subcategory: "numerical-methods",
      categoryId: "academics-programming.numerical-methods.numerical-integration.simpsons-rules",
      path: "academics-programming/numerical-methods/numerical-integration/simpsons-rules/prog-simpsons-rules",
      description: "Interactive numerical integration comparing Simpson's 1/3 and 3/8 rules against analytical exact values",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return sin(x); }
static double f2(double x) { return 1.0 / (1.0 + x * x); }
static double f3(double x) { return exp(x); }

static double simpson_1_3(double (*f)(double), double a, double b, int n) {
    if (n % 2 != 0) n++;
    double h = (b - a) / n;
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 2 == 1 ? 4.0 : 2.0) * f(x);
    }
    return sum * (h / 3.0);
}

static double simpson_3_8(double (*f)(double), double a, double b, int n) {
    while (n % 3 != 0) n++;
    double h = (b - a) / n;
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 3 == 0 ? 2.0 : 3.0) * f(x);
    }
    return sum * (3.0 * h / 8.0);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ SIMPSON'S RULES (1/3 & 3/8) WORKBENCH ================\\n");
        printf("1. Integrate f(x) = sin(x) on [0, pi]\\n");
        printf("2. Integrate f(x) = 1 / (1 + x^2) on [0, 1]\\n");
        printf("3. Integrate f(x) = e^x on [0, 2]\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a = 0.0, b = 1.0;
            if (choice == 1) { a = 0.0; b = 3.141592653589793; }
            else if (choice == 2) { a = 0.0; b = 1.0; }
            else { a = 0.0; b = 2.0; }

            int n = 12;
            printf("Enter number of subintervals n (e.g. 12): ");
            if (scanf("%d", &n) != 1 || n < 6) n = 12;

            double res_13 = simpson_1_3(f, a, b, n);
            double res_38 = simpson_3_8(f, a, b, n);

            printf("\\nIntegration Results for n = %d:\\n", n);
            printf("Simpson's 1/3 Rule (O(h^4)): %16.10f\\n", res_13);
            printf("Simpson's 3/8 Rule (O(h^4)): %16.10f\\n", res_38);
            if (choice == 1) {
                printf("Exact Analytical Integral:  %16.10f\\n", 2.0);
                printf("Error 1/3: %.2e, Error 3/8: %.2e\\n", fabs(res_13 - 2.0), fabs(res_38 - 2.0));
            } else if (choice == 2) {
                double exact = 3.141592653589793 / 4.0;
                printf("Exact Analytical Integral:  %16.10f\\n", exact);
                printf("Error 1/3: %.2e, Error 3/8: %.2e\\n", fabs(res_13 - exact), fabs(res_38 - exact));
            }
        } else if (choice == 0) {
            printf("Exiting Simpson's Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "numerical-methods", "integration", "simpsons-rule"],
      aliases: ["prog_acad_simpsons_rules"],
    })
  );

  return components;
}
