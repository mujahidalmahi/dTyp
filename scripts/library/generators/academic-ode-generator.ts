import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAcademicOdeComponents(): Component[] {
  const components: Component[] = [];

  // 35. Euler's Method for ODEs
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.first-order-ode.euler-method.prog-euler-ode",
      name: "prog_acad_euler_ode",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.first-order-ode.euler-method",
      path: "academics-programming/differential-equations/first-order-ode/euler-method/prog-euler-ode",
      description: "Interactive Euler's method ODE solver with step-by-step table, step-halving error analysis, and exact analytical comparison",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double ode1(double x, double y) { (void)x; return y; }
static double exact1(double x) { return exp(x); }

static double ode2(double x, double y) { return x + y; }
static double exact2(double x) { return 2.0 * exp(x) - x - 1.0; }

static double ode3(double x, double y) { return -2.0 * x * y; }
static double exact3(double x) { return exp(-x * x); }

static void run_euler(double (*f)(double, double), double (*exact)(double), double x0, double y0, double h, double target_x) {
    int steps = (int)round((target_x - x0) / h);
    printf("\\nEuler's Method Integration (h = %.4f, steps = %d):\\n", h, steps);
    printf("----------------------------------------------------------------------\\n");
    printf(" Step |    x_n    |   y_Euler   |   y_Exact   |  Abs Error  | Rel Err%%\\n");
    printf("----------------------------------------------------------------------\\n");

    double x = x0;
    double y = y0;
    printf(" %4d | %9.4f | %11.6f | %11.6f | %11.4e |   0.00%%\\n",
           0, x, y, exact(x), fabs(y - exact(x)));

    for (int i = 1; i <= steps; i++) {
        y += h * f(x, y);
        x = x0 + i * h;
        double ex = exact(x);
        double err = fabs(y - ex);
        double rel_err = (fabs(ex) > 1e-12) ? (err / fabs(ex)) * 100.0 : 0.0;

        printf(" %4d | %9.4f | %11.6f | %11.6f | %11.4e | %6.2f%%\\n",
               i, x, y, ex, err, rel_err);
    }
    printf("----------------------------------------------------------------------\\n");
}

int main(void) {
    int choice;
    do {
        printf("\\n================ EULER METHOD (FIRST ORDER ODE) ================\\n");
        printf("1. Solve y' = y, y(0) = 1 (Exact: y = e^x)\\n");
        printf("2. Solve y' = x + y, y(0) = 1 (Exact: y = 2e^x - x - 1)\\n");
        printf("3. Solve y' = -2xy, y(0) = 1 (Exact: y = e^(-x^2))\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double, double) = (choice == 1) ? ode1 : (choice == 2) ? ode2 : ode3;
            double (*ex)(double) = (choice == 1) ? exact1 : (choice == 2) ? exact2 : exact3;

            double x0 = 0.0, y0 = 1.0, h = 0.1, target_x = 1.0;
            printf("Enter step size h (e.g. 0.1, 0.05): ");
            if (scanf("%lf", &h) != 1 || h <= 0.0) h = 0.1;
            printf("Enter target x (e.g. 1.0): ");
            if (scanf("%lf", &target_x) != 1 || target_x <= x0) target_x = 1.0;

            run_euler(f, ex, x0, y0, h, target_x);
        } else if (choice == 0) {
            printf("Exiting Euler Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "differential-equations", "ode", "euler-method"],
      aliases: ["prog_acad_euler_ode"],
    })
  );

  // 36. Heun's Method (Modified Euler / Predictor-Corrector)
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.first-order-ode.heun-method.prog-heun-ode",
      name: "prog_acad_heun_ode",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.first-order-ode.heun-method",
      path: "academics-programming/differential-equations/first-order-ode/heun-method/prog-heun-ode",
      description: "Interactive Heun's predictor-corrector ODE solver with O(h^2) second-order convergence table",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double ode1(double x, double y) { return x + y; }
static double exact1(double x) { return 2.0 * exp(x) - x - 1.0; }

static double ode2(double x, double y) { return 2.0 - exp(-4.0 * x) - 2.0 * y; }

static void run_heun(double (*f)(double, double), double (*exact)(double), double x0, double y0, double h, double target_x) {
    int steps = (int)round((target_x - x0) / h);
    printf("\\nHeun's Predictor-Corrector Method (h = %.4f, %d steps):\\n", h, steps);
    printf("------------------------------------------------------------------------\\n");
    printf(" Step |    x_n    |   y_Predict |   y_Heun    |   y_Exact   | Abs Error\\n");
    printf("------------------------------------------------------------------------\\n");

    double x = x0;
    double y = y0;
    printf(" %4d | %9.4f | %11.6f | %11.6f | %11.6f | %9.2e\\n",
           0, x, y, y, (exact ? exact(x) : 0.0), (exact ? fabs(y - exact(x)) : 0.0));

    for (int i = 1; i <= steps; i++) {
        double y_pred = y + h * f(x, y);
        double x_next = x0 + i * h;
        double y_corr = y + 0.5 * h * (f(x, y) + f(x_next, y_pred));

        double ex = exact ? exact(x_next) : 0.0;
        double err = exact ? fabs(y_corr - ex) : 0.0;

        printf(" %4d | %9.4f | %11.6f | %11.6f | %11.6f | %9.2e\\n",
               i, x_next, y_pred, y_corr, ex, err);

        x = x_next;
        y = y_corr;
    }
    printf("------------------------------------------------------------------------\\n");
}

int main(void) {
    int choice;
    do {
        printf("\\n================ HEUN'S PREDICTOR-CORRECTOR WORKBENCH ================\\n");
        printf("1. Solve y' = x + y, y(0) = 1 (Exact: y = 2e^x - x - 1)\\n");
        printf("2. Solve y' = 2 - e^(-4x) - 2y, y(0) = 1\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1 || choice == 2) {
            double (*f)(double, double) = (choice == 1) ? ode1 : ode2;
            double (*ex)(double) = (choice == 1) ? exact1 : NULL;

            double h = 0.1, target_x = 1.0;
            printf("Enter step size h (e.g. 0.1): ");
            if (scanf("%lf", &h) != 1 || h <= 0.0) h = 0.1;
            printf("Enter target x (e.g. 1.0): ");
            if (scanf("%lf", &target_x) != 1 || target_x <= 0.0) target_x = 1.0;

            run_heun(f, ex, 0.0, 1.0, h, target_x);
        } else if (choice == 0) {
            printf("Exiting Heun Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "differential-equations", "ode", "heun-method"],
      aliases: ["prog_acad_heun_ode"],
    })
  );

  // 37. Classical 4th-Order Runge-Kutta (RK4)
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.first-order-ode.runge-kutta-4.prog-runge-kutta-4",
      name: "prog_acad_runge_kutta_4",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.first-order-ode.runge-kutta-4",
      path: "academics-programming/differential-equations/first-order-ode/runge-kutta-4/prog-runge-kutta-4",
      description: "Interactive classical 4th-order Runge-Kutta solver with multi-method comparison (Euler vs Heun vs RK4)",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double ode1(double x, double y) { return x + y; }
static double exact1(double x) { return 2.0 * exp(x) - x - 1.0; }

static double ode2(double x, double y) { return y - x * x + 1.0; }
static double exact2(double x) { return (x + 1.0) * (x + 1.0) - 0.5 * exp(x); }

static void run_rk4(double (*f)(double, double), double (*exact)(double), double x0, double y0, double h, double target_x) {
    int steps = (int)round((target_x - x0) / h);
    printf("\\nClassical 4th-Order Runge-Kutta (RK4) [O(h^4) accuracy]:\\n");
    printf("---------------------------------------------------------------------------------\\n");
    printf(" Step |    x_n    |    k1     |    k2     |    k3     |    k4     |   y_RK4   | Abs Err\\n");
    printf("---------------------------------------------------------------------------------\\n");

    double x = x0;
    double y = y0;
    printf(" %4d | %9.4f |     -     |     -     |     -     |     -     | %9.5f | %7.2e\\n",
           0, x, y, (exact ? fabs(y - exact(x)) : 0.0));

    for (int i = 1; i <= steps; i++) {
        double k1 = f(x, y);
        double k2 = f(x + 0.5 * h, y + 0.5 * h * k1);
        double k3 = f(x + 0.5 * h, y + 0.5 * h * k2);
        double k4 = f(x + h, y + h * k3);

        y += (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
        x = x0 + i * h;

        double ex = exact ? exact(x) : 0.0;
        double err = exact ? fabs(y - ex) : 0.0;

        printf(" %4d | %9.4f | %9.4f | %9.4f | %9.4f | %9.4f | %9.5f | %7.2e\\n",
               i, x, k1, k2, k3, k4, y, err);
    }
    printf("---------------------------------------------------------------------------------\\n");
}

static void compare_methods(double (*f)(double, double), double (*exact)(double), double x0, double y0, double h, double target_x) {
    int steps = (int)round((target_x - x0) / h);
    double y_euler = y0;
    double y_heun = y0;
    double y_rk4 = y0;
    double x = x0;

    printf("\\nMulti-Method Numerical Comparison at h = %.4f:\\n", h);
    printf("--------------------------------------------------------------------------\\n");
    printf("    x    |  Euler Err (O(h)) |  Heun Err (O(h^2)) |   RK4 Err (O(h^4))\\n");
    printf("--------------------------------------------------------------------------\\n");

    for (int i = 1; i <= steps; i++) {
        double f_curr = f(x, y_euler);
        y_euler += h * f_curr;

        double y_pred = y_heun + h * f(x, y_heun);
        y_heun += 0.5 * h * (f(x, y_heun) + f(x + h, y_pred));

        double k1 = f(x, y_rk4);
        double k2 = f(x + 0.5 * h, y_rk4 + 0.5 * h * k1);
        double k3 = f(x + 0.5 * h, y_rk4 + 0.5 * h * k2);
        double k4 = f(x + h, y_rk4 + h * k3);
        y_rk4 += (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);

        x = x0 + i * h;
        double ex = exact(x);

        printf(" %7.4f |     %11.4e    |     %11.4e     |     %11.4e\\n",
               x, fabs(y_euler - ex), fabs(y_heun - ex), fabs(y_rk4 - ex));
    }
    printf("--------------------------------------------------------------------------\\n");
}

int main(void) {
    int choice;
    do {
        printf("\\n================ RUNGE-KUTTA 4TH-ORDER (RK4) WORKBENCH ================\\n");
        printf("1. Solve y' = x + y, y(0) = 1 (RK4 Step-by-Step Table)\\n");
        printf("2. Solve y' = y - x^2 + 1, y(0) = 0.5 (RK4 Step-by-Step Table)\\n");
        printf("3. Grand Multi-Method Comparison: Euler vs Heun vs RK4\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1 || choice == 2) {
            double (*f)(double, double) = (choice == 1) ? ode1 : ode2;
            double (*ex)(double) = (choice == 1) ? exact1 : exact2;
            double y0 = (choice == 1) ? 1.0 : 0.5;

            double h = 0.1, target_x = 1.0;
            printf("Enter step size h (e.g. 0.1): ");
            if (scanf("%lf", &h) != 1 || h <= 0.0) h = 0.1;
            printf("Enter target x (e.g. 1.0): ");
            if (scanf("%lf", &target_x) != 1 || target_x <= 0.0) target_x = 1.0;

            run_rk4(f, ex, 0.0, y0, h, target_x);
        } else if (choice == 3) {
            compare_methods(ode1, exact1, 0.0, 1.0, 0.1, 1.0);
        } else if (choice == 0) {
            printf("Exiting RK4 Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "differential-equations", "ode", "runge-kutta", "rk4"],
      aliases: ["prog_acad_runge_kutta_4"],
    })
  );

  // 38. Harmonic Oscillator (2nd-Order ODE via RK4)
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.second-order-bvp.harmonic-oscillator-rk4.prog-harmonic-oscillator",
      name: "prog_acad_harmonic_oscillator",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.second-order-bvp.harmonic-oscillator-rk4",
      path: "academics-programming/differential-equations/second-order-bvp/harmonic-oscillator-rk4/prog-harmonic-oscillator",
      description: "Interactive damped harmonic oscillator simulator (m x'' + c x' + k x = 0) solved as a 2D first-order system using vector RK4",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void derivatives(double t, double x, double v, double m, double c_damp, double k, double* dx_dt, double* dv_dt) {
    (void)t;
    *dx_dt = v;
    *dv_dt = (-c_damp * v - k * x) / m;
}

static void simulate_oscillator(double m, double c_damp, double k, double x0, double v0, double t_end, double dt) {
    double omega_n = sqrt(k / m);
    double c_crit = 2.0 * sqrt(k * m);
    double zeta = c_damp / c_crit;

    printf("\\n--- Oscillator Characteristics ---\\n");
    printf("Mass m:                %10.4f kg\\n", m);
    printf("Damping c:             %10.4f N*s/m\\n", c_damp);
    printf("Spring constant k:     %10.4f N/m\\n", k);
    printf("Natural Frequency w_n: %10.4f rad/s\\n", omega_n);
    printf("Damping Ratio zeta:    %10.4f\\n", zeta);
    if (zeta < 1.0) printf("Regime: UNDERDAMPED (Oscillatory decay)\\n");
    else if (fabs(zeta - 1.0) < 1e-4) printf("Regime: CRITICALLY DAMPED\\n");
    else printf("Regime: OVERDAMPED (Non-oscillatory)\\n");

    int steps = (int)round(t_end / dt);
    printf("\\nVector RK4 Simulation Table (dt = %.4f):\\n", dt);
    printf("------------------------------------------------------------------\\n");
    printf(" Time t (s) |  Position x (m) |  Velocity v (m/s) | Total Energy (J)\\n");
    printf("------------------------------------------------------------------\\n");

    double t = 0.0;
    double x = x0;
    double v = v0;

    for (int step = 0; step <= steps; step++) {
        if (step % (steps / 20 > 0 ? steps / 20 : 1) == 0 || step == steps) {
            double E = 0.5 * m * v * v + 0.5 * k * x * x;
            printf(" %10.3f | %15.6f | %17.6f | %16.6f\\n", t, x, v, E);
        }

        double k1_x, k1_v;
        derivatives(t, x, v, m, c_damp, k, &k1_x, &k1_v);

        double k2_x, k2_v;
        derivatives(t + 0.5 * dt, x + 0.5 * dt * k1_x, v + 0.5 * dt * k1_v, m, c_damp, k, &k2_x, &k2_v);

        double k3_x, k3_v;
        derivatives(t + 0.5 * dt, x + 0.5 * dt * k2_x, v + 0.5 * dt * k2_v, m, c_damp, k, &k3_x, &k3_v);

        double k4_x, k4_v;
        derivatives(t + dt, x + dt * k3_x, v + dt * k3_v, m, c_damp, k, &k4_x, &k4_v);

        x += (dt / 6.0) * (k1_x + 2.0 * k2_x + 2.0 * k3_x + k4_x);
        v += (dt / 6.0) * (k1_v + 2.0 * k2_v + 2.0 * k3_v + k4_v);
        t += dt;
    }
    printf("------------------------------------------------------------------\\n");
}

int main(void) {
    int choice;
    do {
        printf("\\n================ DAMPED HARMONIC OSCILLATOR WORKBENCH ================\\n");
        printf("1. Simulate Underdamped Oscillator (m=1.0, c=0.5, k=10.0)\\n");
        printf("2. Simulate Critically Damped Oscillator\\n");
        printf("3. Custom Parameters (m, c, k, x0, v0)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                simulate_oscillator(1.0, 0.5, 10.0, 1.0, 0.0, 5.0, 0.01);
                break;
            case 2:
                simulate_oscillator(1.0, 2.0 * sqrt(10.0), 10.0, 1.0, 0.0, 3.0, 0.01);
                break;
            case 3: {
                double m, c, k, x0, v0, t_end;
                printf("Enter m (kg), c (N*s/m), k (N/m): ");
                if (scanf("%lf %lf %lf", &m, &c, &k) != 3) { clear_input(); break; }
                printf("Enter initial displacement x0 (m) and velocity v0 (m/s): ");
                if (scanf("%lf %lf", &x0, &v0) != 2) { clear_input(); break; }
                printf("Enter simulation duration t_end (s): ");
                if (scanf("%lf", &t_end) != 1) t_end = 5.0;
                simulate_oscillator(m, c, k, x0, v0, t_end, 0.01);
                break;
            }
            case 0:
                printf("Exiting Harmonic Oscillator.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "differential-equations", "harmonic-oscillator", "rk4"],
      aliases: ["prog_acad_harmonic_oscillator"],
    })
  );

  // 39. Boundary Value Problem (Finite Difference Method)
  components.push(
    createComponent({
      id: "academics-programming.differential-equations.second-order-bvp.bvp-finite-difference.prog-bvp-finite-difference",
      name: "prog_acad_bvp_finite_difference",
      type: "program",
      category: "academics-programming",
      subcategory: "differential-equations",
      categoryId: "academics-programming.differential-equations.second-order-bvp.bvp-finite-difference",
      path: "academics-programming/differential-equations/second-order-bvp/bvp-finite-difference/prog-bvp-finite-difference",
      description: "Interactive 1D linear boundary value problem solver using finite differences and the Thomas tridiagonal algorithm",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_NODES 50

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void solve_bvp_fd(double a, double b, double alpha, double beta, int n) {
    double h = (b - a) / (n + 1);
    double sub[MAX_NODES], diag[MAX_NODES], sup[MAX_NODES], rhs[MAX_NODES];
    double x[MAX_NODES];

    for (int i = 0; i < n; i++) {
        x[i] = a + (i + 1) * h;
        diag[i] = -2.0;
        sub[i] = 1.0;
        sup[i] = 1.0;
        rhs[i] = h * h * x[i];
    }
    rhs[0] -= alpha;
    rhs[n - 1] -= beta;

    for (int i = 1; i < n; i++) {
        double m = sub[i] / diag[i - 1];
        diag[i] -= m * sup[i - 1];
        rhs[i] -= m * rhs[i - 1];
    }

    double y[MAX_NODES];
    y[n - 1] = rhs[n - 1] / diag[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        y[i] = (rhs[i] - sup[i] * y[i + 1]) / diag[i];
    }

    printf("\\nFinite Difference Solution for y'' = x, y(%.2f) = %.2f, y(%.2f) = %.2f (h = %.4f):\\n",
           a, alpha, b, beta, h);
    printf("----------------------------------------------------------------------\\n");
    printf(" Node |     x_i     |   Numerical y_i |   Exact y(x_i)  | Absolute Error\\n");
    printf("----------------------------------------------------------------------\\n");

    printf(" %4d | %11.4f | %15.6f | %15.6f |       0.00\\n", 0, a, alpha, alpha);

    for (int i = 0; i < n; i++) {
        double ex = (x[i] * x[i] * x[i]) / 6.0 + (beta - alpha - 1.0 / 6.0) * x[i] + alpha;
        printf(" %4d | %11.4f | %15.6f | %15.6f | %14.4e\\n",
               i + 1, x[i], y[i], ex, fabs(y[i] - ex));
    }

    printf(" %4d | %11.4f | %15.6f | %15.6f |       0.00\\n", n + 1, b, beta, beta);
    printf("----------------------------------------------------------------------\\n");
}

int main(void) {
    int choice;
    do {
        printf("\\n================ BOUNDARY VALUE PROBLEM (FINITE DIFFERENCE) ================\\n");
        printf("1. Solve y'' = x on [0, 1] with y(0) = 0, y(1) = 0\\n");
        printf("2. Custom Boundary Values on [a, b]\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                solve_bvp_fd(0.0, 1.0, 0.0, 0.0, 9);
                break;
            case 2: {
                double a, b, alpha, beta;
                int n;
                printf("Enter interval bounds [a, b]: ");
                if (scanf("%lf %lf", &a, &b) != 2) { clear_input(); break; }
                printf("Enter Dirichlet boundary conditions y(a) and y(b): ");
                if (scanf("%lf %lf", &alpha, &beta) != 2) { clear_input(); break; }
                printf("Enter number of interior nodes N (5 to 30): ");
                if (scanf("%d", &n) != 1 || n < 3 || n > 30) n = 9;
                solve_bvp_fd(a, b, alpha, beta, n);
                break;
            }
            case 0:
                printf("Exiting BVP Workbench.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "differential-equations", "bvp", "finite-difference"],
      aliases: ["prog_acad_bvp_finite_difference"],
    })
  );

  return components;
}
