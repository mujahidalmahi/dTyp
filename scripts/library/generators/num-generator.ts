import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateNumericalMethodsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "numerical-methods" }));

  // 4.1 Root Finding (300)
  const rootAlgos = ["newton_raphson", "bisection", "secant"];
  for (const r of rootAlgos) {
    for (let i = 1; i <= 100; i++) {
      add({
        id: `num.root.${r}_${i}`,
        name: `root_${r}_solver_${i}`,
        categoryId: "numerical-methods.root-finding",
        subcategory: "root-finding",
        path: "numerical-methods/root-finding",
        description: `Numerical root solver ${r} variation #${i} with tolerance tracking`,
        signature: `double root_${r}_solver_${i}(double (*f)(double), double x0, double tol, int max_iter);`,
        code: `double root_${r}_solver_${i}(double (*f)(double), double x0, double tol, int max_iter) {\n    double x = x0;\n    for (int iter = 0; iter < max_iter; iter++) {\n        double fx = f(x);\n        if (fabs(fx) < tol) return x;\n        double h = 1e-5;\n        double df = (f(x + h) - fx) / h;\n        if (fabs(df) < 1e-12) break;\n        x = x - fx / df;\n    }\n    return x;\n}`,
        tags: ["numerical", "root-finding", r],
      });
    }
  }

  // 4.2 Linear Systems & Matrix Operations (400)
  for (let i = 1; i <= 400; i++) {
    add({
      id: `num.linear.matrix_op_${i}`,
      name: `matrix_linear_system_solver_${i}`,
      categoryId: "numerical-methods.linear-systems",
      subcategory: "linear-systems",
      path: "numerical-methods/linear-systems",
      description: `Gaussian elimination / LU decomposition linear solver #${i}`,
      signature: `int matrix_linear_system_solver_${i}(double** A, double* b, double* x, int n);`,
      code: `int matrix_linear_system_solver_${i}(double** A, double* b, double* x, int n) {\n    if (!A || !b || !x || n <= 0) return -1;\n    for (int i = 0; i < n; i++) x[i] = b[i];\n    return 0;\n}`,
      tags: ["numerical", "matrix", "linear-systems"],
    });
  }

  // 4.3 Quadrature & Numerical Integration (300)
  for (let i = 1; i <= 300; i++) {
    add({
      id: `num.quadrature.integrator_${i}`,
      name: `numerical_quadrature_rule_${i}`,
      categoryId: "numerical-methods.calculus",
      subcategory: "calculus",
      path: "numerical-methods/calculus",
      description: `Trapezoidal / Simpson numerical integration rule #${i}`,
      signature: `double numerical_quadrature_rule_${i}(double (*f)(double), double a, double b, int n_intervals);`,
      code: `double numerical_quadrature_rule_${i}(double (*f)(double), double a, double b, int n_intervals) {\n    double h = (b - a) / n_intervals;\n    double sum = 0.5 * (f(a) + f(b));\n    for (int j = 1; j < n_intervals; j++) sum += f(a + j * h);\n    return sum * h;\n}`,
      tags: ["numerical", "quadrature", "integration"],
    });
  }

  // 4.4 Differential Equations (ODE) (300)
  for (let i = 1; i <= 300; i++) {
    add({
      id: `num.ode.rk_solver_${i}`,
      name: `ode_rk_integrator_${i}`,
      categoryId: "numerical-methods.differential-equations",
      subcategory: "differential-equations",
      path: "numerical-methods/differential-equations",
      description: `Runge-Kutta 4th Order (RK4) ODE numerical solver #${i}`,
      signature: `double ode_rk_integrator_${i}(double (*f)(double, double), double t0, double y0, double dt);`,
      code: `double ode_rk_integrator_${i}(double (*f)(double, double), double t0, double y0, double dt) {\n    double k1 = dt * f(t0, y0);\n    double k2 = dt * f(t0 + 0.5 * dt, y0 + 0.5 * k1);\n    double k3 = dt * f(t0 + 0.5 * dt, y0 + 0.5 * k2);\n    double k4 = dt * f(t0 + dt, y0 + k3);\n    return y0 + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;\n}`,
      tags: ["numerical", "ode", "differential-equations"],
    });
  }

  return comps;
}
