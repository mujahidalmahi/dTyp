import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAcademicCalculusComponents(): Component[] {
  const components: Component[] = [];

  // 23. Numerical Derivative
  components.push(
    createComponent({
      id: "academics-programming.calculus.differential-calculus.numerical-derivative.prog-numerical-derivative",
      name: "prog_acad_numerical_derivative",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.differential-calculus.numerical-derivative",
      path: "academics-programming/calculus/differential-calculus/numerical-derivative/prog-numerical-derivative",
      description: "Interactive numerical differentiation laboratory with forward, backward, central differences, second derivatives, and Richardson extrapolation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return sin(x); }
static double df1(double x) { return cos(x); }
static double d2f1(double x) { return -sin(x); }

static double f2(double x) { return exp(x); }
static double df2(double x) { return exp(x); }
static double d2f2(double x) { return exp(x); }

static double f3(double x) { return x * x * x - 2.0 * x + 1.0; }
static double df3(double x) { return 3.0 * x * x - 2.0; }
static double d2f3(double x) { return 6.0 * x; }

static void analyze_derivatives(double (*f)(double), double (*df)(double), double (*d2f)(double), double x0, double h) {
    double forward = (f(x0 + h) - f(x0)) / h;
    double backward = (f(x0) - f(x0 - h)) / h;
    double central = (f(x0 + h) - f(x0 - h)) / (2.0 * h);
    double second_deriv = (f(x0 + h) - 2.0 * f(x0) + f(x0 - h)) / (h * h);

    double d1 = (f(x0 + h) - f(x0 - h)) / (2.0 * h);
    double d2 = (f(x0 + h / 2.0) - f(x0 - h / 2.0)) / h;
    double richardson = (4.0 * d2 - d1) / 3.0;

    double exact_1 = df(x0);
    double exact_2 = d2f(x0);

    printf("\\n--- Numerical Derivative Analysis at x0 = %.4f with step h = %.2e ---\\n", x0, h);
    printf("Exact 1st Derivative:         %16.10f\\n", exact_1);
    printf("Forward Difference O(h):      %16.10f (Error: %9.2e)\\n", forward, fabs(forward - exact_1));
    printf("Backward Difference O(h):     %16.10f (Error: %9.2e)\\n", backward, fabs(backward - exact_1));
    printf("Central Difference O(h^2):    %16.10f (Error: %9.2e)\\n", central, fabs(central - exact_1));
    printf("Richardson Extrap. O(h^4):    %16.10f (Error: %9.2e)\\n", richardson, fabs(richardson - exact_1));
    printf("Second Derivative O(h^2):     %16.10f (Exact: %16.10f, Error: %9.2e)\\n",
           second_deriv, exact_2, fabs(second_deriv - exact_2));
}

static void sweep_step_sizes(double (*f)(double), double (*df)(double), double x0) {
    double exact = df(x0);
    printf("\\n--- Step-Size Convergence Sweep at x0 = %.4f ---\\n", x0);
    printf("      h       | Central Diff | Absolute Error\\n");
    printf("--------------+--------------+---------------\\n");
    double h = 0.1;
    for (int i = 0; i < 9; i++) {
        double cd = (f(x0 + h) - f(x0 - h)) / (2.0 * h);
        printf(" %12.2e | %12.8f | %13.4e\\n", h, cd, fabs(cd - exact));
        h /= 10.0;
    }
}

int main(void) {
    int choice;
    do {
        printf("\\n================ NUMERICAL DIFFERENTIATION WORKBENCH ================\\n");
        printf("1. Differentiate f(x) = sin(x)\\n");
        printf("2. Differentiate f(x) = exp(x)\\n");
        printf("3. Differentiate f(x) = x^3 - 2x + 1\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double (*df)(double) = (choice == 1) ? df1 : (choice == 2) ? df2 : df3;
            double (*d2f)(double) = (choice == 1) ? d2f1 : (choice == 2) ? d2f2 : d2f3;

            double x0 = 1.0, h = 0.01;
            printf("Enter point x0: ");
            if (scanf("%lf", &x0) != 1) x0 = 1.0;
            printf("Enter step size h (e.g. 0.01): ");
            if (scanf("%lf", &h) != 1) h = 0.01;

            analyze_derivatives(f, df, d2f, x0, h);
            sweep_step_sizes(f, df, x0);
        } else if (choice == 0) {
            printf("Exiting Numerical Derivative Workbench.\\n");
        } else {
            printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "calculus", "derivatives", "numerical-calculus"],
      aliases: ["prog_acad_numerical_derivative"],
    })
  );

  // 24. Extrema Finder
  components.push(
    createComponent({
      id: "academics-programming.calculus.differential-calculus.extrema-finder.prog-extrema-finder",
      name: "prog_acad_extrema_finder",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.differential-calculus.extrema-finder",
      path: "academics-programming/calculus/differential-calculus/extrema-finder/prog-extrema-finder",
      description: "Interactive local and global extrema finder using critical points, numerical second-derivative test, and bisection search",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return x * x * x * x - 4.0 * x * x + 1.0; }
static double f2(double x) { return sin(x) + cos(2.0 * x); }
static double f3(double x) { return x * exp(-x); }

static double num_deriv(double (*f)(double), double x) {
    double h = 1e-5;
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

static double num_second_deriv(double (*f)(double), double x) {
    double h = 1e-4;
    return (f(x + h) - 2.0 * f(x) + f(x - h)) / (h * h);
}

static double find_critical_root(double (*f)(double), double a, double b) {
    double fa = num_deriv(f, a);
    for (int i = 0; i < 50; i++) {
        double mid = 0.5 * (a + b);
        double fmid = num_deriv(f, mid);
        if (fabs(fmid) < 1e-7) return mid;
        if (fa * fmid < 0.0) b = mid;
        else { a = mid; fa = fmid; }
    }
    return 0.5 * (a + b);
}

static void find_extrema(double (*f)(double), double a, double b, int samples) {
    printf("\\nScanning for Critical Points on [%.2f, %.2f] with %d grid steps:\\n", a, b, samples);
    double step = (b - a) / samples;
    double prev_d = num_deriv(f, a);

    double global_min_x = a, global_min_y = f(a);
    double global_max_x = a, global_max_y = f(a);

    int crit_count = 0;
    for (int i = 0; i < samples; i++) {
        double x1 = a + i * step;
        double x2 = x1 + step;
        double curr_d = num_deriv(f, x2);

        if (prev_d * curr_d <= 0.0) {
            double c = find_critical_root(f, x1, x2);
            double val = f(c);
            double d2 = num_second_deriv(f, c);

            crit_count++;
            printf("  Critical Point %d: x = %10.5f, f(x) = %10.5f, f''(x) = %10.5f -> ",
                   crit_count, c, val, d2);
            if (d2 > 1e-4) printf("LOCAL MINIMUM\\n");
            else if (d2 < -1e-4) printf("LOCAL MAXIMUM\\n");
            else printf("INFLECTION / SADDLE\\n");

            if (val < global_min_y) { global_min_y = val; global_min_x = c; }
            if (val > global_max_y) { global_max_y = val; global_max_x = c; }
        }
        prev_d = curr_d;
    }

    if (f(b) < global_min_y) { global_min_y = f(b); global_min_x = b; }
    if (f(b) > global_max_y) { global_max_y = f(b); global_max_x = b; }

    printf("\\nGlobal Extrema on [%.2f, %.2f]:\\n", a, b);
    printf("  Global Minimum: f(%.5f) = %.5f\\n", global_min_x, global_min_y);
    printf("  Global Maximum: f(%.5f) = %.5f\\n", global_max_x, global_max_y);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ EXTREMA FINDER WORKBENCH ================\\n");
        printf("1. Analyze f(x) = x^4 - 4x^2 + 1 (Double Well Potential)\\n");
        printf("2. Analyze f(x) = sin(x) + cos(2x)\\n");
        printf("3. Analyze f(x) = x * e^(-x)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a = -3.0, b = 3.0;
            printf("Enter search interval [a, b]: ");
            if (scanf("%lf %lf", &a, &b) != 2) { a = -3.0; b = 3.0; }
            find_extrema(f, a, b, 200);
        } else if (choice == 0) {
            printf("Exiting Extrema Finder.\\n");
        } else {
            printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "calculus", "extrema", "optimization"],
      aliases: ["prog_acad_extrema_finder"],
    })
  );

  // 25. Riemann Sums
  components.push(
    createComponent({
      id: "academics-programming.calculus.integral-calculus.riemann-sums.prog-riemann-sums",
      name: "prog_acad_riemann_sums",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.integral-calculus.riemann-sums",
      path: "academics-programming/calculus/integral-calculus/riemann-sums/prog-riemann-sums",
      description: "Interactive Riemann sum analyzer calculating Left, Right, Midpoint, and Trapezoidal approximations with convergence study",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return x * x; }
static double f2(double x) { return sin(x); }
static double f3(double x) { return 1.0 / x; }

static void compute_riemann_sums(double (*f)(double), double a, double b, int n) {
    double dx = (b - a) / n;
    double left_sum = 0.0;
    double right_sum = 0.0;
    double mid_sum = 0.0;

    for (int i = 0; i < n; i++) {
        double x_left = a + i * dx;
        double x_right = x_left + dx;
        double x_mid = x_left + 0.5 * dx;

        left_sum += f(x_left);
        right_sum += f(x_right);
        mid_sum += f(x_mid);
    }
    left_sum *= dx;
    right_sum *= dx;
    mid_sum *= dx;
    double trap_sum = 0.5 * (left_sum + right_sum);

    printf("Riemann Sums for N = %d (dx = %.6f):\\n", n, dx);
    printf("  Left Riemann Sum:     %16.10f\\n", left_sum);
    printf("  Right Riemann Sum:    %16.10f\\n", right_sum);
    printf("  Midpoint Riemann Sum: %16.10f\\n", mid_sum);
    printf("  Trapezoidal Average:  %16.10f\\n", trap_sum);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ RIEMANN SUMS WORKBENCH ================\\n");
        printf("1. Integrate f(x) = x^2 on [0, 2] (Exact = 8/3 = 2.666667)\\n");
        printf("2. Integrate f(x) = sin(x) on [0, pi] (Exact = 2.0)\\n");
        printf("3. Integrate f(x) = 1/x on [1, e] (Exact = 1.0)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a = 0.0, b = 2.0;
            if (choice == 1) { a = 0.0; b = 2.0; }
            else if (choice == 2) { a = 0.0; b = 3.141592653589793; }
            else { a = 1.0; b = 2.718281828459045; }

            int n = 100;
            printf("Enter number of rectangles N (e.g. 10, 100, 1000): ");
            if (scanf("%d", &n) != 1 || n < 1) n = 100;
            compute_riemann_sums(f, a, b, n);
        } else if (choice == 0) {
            printf("Exiting Riemann Sums.\\n");
        } else {
            printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "calculus", "integration", "riemann-sums"],
      aliases: ["prog_acad_riemann_sums"],
    })
  );

  // 26. Arc Length
  components.push(
    createComponent({
      id: "academics-programming.calculus.integral-calculus.arc-length.prog-arc-length",
      name: "prog_acad_arc_length",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.integral-calculus.arc-length",
      path: "academics-programming/calculus/integral-calculus/arc-length/prog-arc-length",
      description: "Interactive arc length calculator for plane curves using numerical quadrature and chordal polygon approximation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x) { return x * x; }
static double f2(double x) { return sin(x); }
static double f3(double x) { return cosh(x); }

static double arc_integrand(double (*f)(double), double x) {
    double h = 1e-5;
    double dy_dx = (f(x + h) - f(x - h)) / (2.0 * h);
    return sqrt(1.0 + dy_dx * dy_dx);
}

static double compute_arc_simpson(double (*f)(double), double a, double b, int n) {
    if (n % 2 != 0) n++;
    double h = (b - a) / n;
    double sum = arc_integrand(f, a) + arc_integrand(f, b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 2 == 1 ? 4.0 : 2.0) * arc_integrand(f, x);
    }
    return sum * (h / 3.0);
}

static double compute_chord_length(double (*f)(double), double a, double b, int n) {
    double h = (b - a) / n;
    double total = 0.0;
    double prev_x = a;
    double prev_y = f(a);
    for (int i = 1; i <= n; i++) {
        double cur_x = a + i * h;
        double cur_y = f(cur_x);
        double dx = cur_x - prev_x;
        double dy = cur_y - prev_y;
        total += sqrt(dx * dx + dy * dy);
        prev_x = cur_x;
        prev_y = cur_y;
    }
    return total;
}

int main(void) {
    int choice;
    do {
        printf("\\n================ ARC LENGTH CALCULATOR ================\\n");
        printf("1. Curve y = x^2 (Parabola) on [0, 1]\\n");
        printf("2. Curve y = sin(x) on [0, pi]\\n");
        printf("3. Curve y = cosh(x) (Catenary) on [0, 1]\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a = 0.0, b = 1.0;
            if (choice == 1) { a = 0.0; b = 1.0; }
            else if (choice == 2) { a = 0.0; b = 3.141592653589793; }
            else { a = 0.0; b = 1.0; }

            double arc_simpson = compute_arc_simpson(f, a, b, 200);
            double chord_approx = compute_chord_length(f, a, b, 200);

            printf("\\nArc Length Results on [%.2f, %.2f]:\\n", a, b);
            printf("  Numerical Quadrature (Simpson's): %16.10f\\n", arc_simpson);
            printf("  Polygonal Chord Sum (200 segments):%16.10f\\n", chord_approx);
            if (choice == 3) {
                double exact = sinh(b) - sinh(a);
                printf("  Exact Analytical (sinh(1)):      %16.10f\\n", exact);
            }
        } else if (choice == 0) {
            printf("Exiting Arc Length Workbench.\\n");
        } else {
            printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "calculus", "arc-length", "curves"],
      aliases: ["prog_acad_arc_length"],
    })
  );

  // 27. Gradient Vector
  components.push(
    createComponent({
      id: "academics-programming.calculus.multivariable-calculus.gradient-vector.prog-gradient-vector",
      name: "prog_acad_gradient_vector",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.multivariable-calculus.gradient-vector",
      path: "academics-programming/calculus/multivariable-calculus/gradient-vector/prog-gradient-vector",
      description: "Interactive 2D gradient vector calculator with partial derivatives, magnitude, direction, and directional derivatives",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x, double y) { return x * x + y * y; }
static double f2(double x, double y) { return x * x - y * y; }
static double f3(double x, double y) { return sin(x) * cos(y); }

static void compute_gradient(double (*f)(double, double), double x0, double y0, double ux, double uy) {
    double h = 1e-5;
    double df_dx = (f(x0 + h, y0) - f(x0 - h, y0)) / (2.0 * h);
    double df_dy = (f(x0, y0 + h) - f(x0, y0 - h)) / (2.0 * h);
    double mag = sqrt(df_dx * df_dx + df_dy * df_dy);
    double angle_deg = atan2(df_dy, df_dx) * (180.0 / 3.141592653589793);

    double u_len = sqrt(ux * ux + uy * uy);
    if (u_len > 1e-9) { ux /= u_len; uy /= u_len; }
    double dir_deriv = df_dx * ux + df_dy * uy;

    printf("\\nGradient Vector Analysis at Point (%.4f, %.4f):\\n", x0, y0);
    printf("  Partial df/dx:                 %12.6f\\n", df_dx);
    printf("  Partial df/dy:                 %12.6f\\n", df_dy);
    printf("  Gradient Vector grad(f):       (%10.5f, %10.5f)\\n", df_dx, df_dy);
    printf("  Magnitude ||grad(f)||:         %12.6f\\n", mag);
    printf("  Direction Angle (degrees):     %12.2f deg\\n", angle_deg);
    printf("  Directional Deriv D_u(f):      %12.6f (along unit vector <%.3f, %.3f>)\\n", dir_deriv, ux, uy);
    printf("  Steepest Ascent Direction:     <%.5f, %.5f>\\n", (mag > 0 ? df_dx / mag : 0), (mag > 0 ? df_dy / mag : 0));
    printf("  Steepest Descent Direction:    <%.5f, %.5f>\\n", (mag > 0 ? -df_dx / mag : 0), (mag > 0 ? -df_dy / mag : 0));
}

int main(void) {
    int choice;
    do {
        printf("\\n================ GRADIENT VECTOR WORKBENCH ================\\n");
        printf("1. Field f(x, y) = x^2 + y^2 (Paraboloid)\\n");
        printf("2. Field f(x, y) = x^2 - y^2 (Hyperbolic Saddle)\\n");
        printf("3. Field f(x, y) = sin(x) * cos(y)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double, double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double x0 = 1.0, y0 = 2.0;
            printf("Enter point (x0, y0): ");
            if (scanf("%lf %lf", &x0, &y0) != 2) { x0 = 1.0; y0 = 1.0; }

            double ux = 1.0, uy = 1.0;
            printf("Enter directional unit vector components (ux, uy): ");
            if (scanf("%lf %lf", &ux, &uy) != 2) { ux = 1.0; uy = 0.0; }

            compute_gradient(f, x0, y0, ux, uy);
        } else if (choice == 0) {
            printf("Exiting Gradient Vector Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "calculus", "multivariable", "gradient"],
      aliases: ["prog_acad_gradient_vector"],
    })
  );

  // 28. Double Integral
  components.push(
    createComponent({
      id: "academics-programming.calculus.multivariable-calculus.double-integral.prog-double-integral",
      name: "prog_acad_double_integral",
      type: "program",
      category: "academics-programming",
      subcategory: "calculus",
      categoryId: "academics-programming.calculus.multivariable-calculus.double-integral",
      path: "academics-programming/calculus/multivariable-calculus/double-integral/prog-double-integral",
      description: "Interactive double integral calculator over 2D rectangular domains using 2D Midpoint and Trapezoidal quadrature",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double f1(double x, double y) { return x * y; }
static double f2(double x, double y) { return x * x + y * y; }
static double f3(double x, double y) { return exp(x + y); }

static double double_integral_midpoint(double (*f)(double, double), double ax, double bx, double ay, double by, int nx, int ny) {
    double hx = (bx - ax) / nx;
    double hy = (by - ay) / ny;
    double total = 0.0;

    for (int i = 0; i < nx; i++) {
        double mx = ax + (i + 0.5) * hx;
        for (int j = 0; j < ny; j++) {
            double my = ay + (j + 0.5) * hy;
            total += f(mx, my);
        }
    }
    return total * hx * hy;
}

int main(void) {
    int choice;
    do {
        printf("\\n================ DOUBLE INTEGRAL WORKBENCH ================\\n");
        printf("1. Integrate f(x, y) = x * y on [0, 1] x [0, 1] (Exact = 0.25)\\n");
        printf("2. Integrate f(x, y) = x^2 + y^2 on [0, 1] x [0, 1] (Exact = 2/3 = 0.666667)\\n");
        printf("3. Integrate f(x, y) = e^(x + y) on [0, 1] x [0, 1] (Exact = (e - 1)^2)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double, double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double ax = 0.0, bx = 1.0, ay = 0.0, by = 1.0;
            int nx = 50, ny = 50;

            printf("Enter domain [ax, bx] and [ay, by] (e.g. 0 1 0 1): ");
            if (scanf("%lf %lf %lf %lf", &ax, &bx, &ay, &by) != 4) {
                ax = 0.0; bx = 1.0; ay = 0.0; by = 1.0;
            }

            printf("Enter grid divisions nx and ny (e.g. 50 50): ");
            if (scanf("%d %d", &nx, &ny) != 2 || nx < 2 || ny < 2) {
                nx = 50; ny = 50;
            }

            double result = double_integral_midpoint(f, ax, bx, ay, by, nx, ny);
            printf("\\nDouble Integral Result (2D Midpoint on %dx%d grid): %16.10f\\n",
                   nx, ny, result);
        } else if (choice == 0) {
            printf("Exiting Double Integral Workbench.\\n");
        } else {
            printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "calculus", "multivariable", "double-integral"],
      aliases: ["prog_acad_double_integral"],
    })
  );

  return components;
}
