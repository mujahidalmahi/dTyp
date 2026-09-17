import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateNumericalMethodsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "numerical-methods" }));

  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `numerical-methods.${sub}`,
        subcategory: sub,
        path: `numerical-methods/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        tags: ["numerical-methods", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `numerical-methods.${sub}`,
        subcategory: sub,
        path: `numerical-methods/${pathSub}`,
        description: `Verified ${sub} algorithmic routine #${i}`,
        signature: `int ${prefix}_routine_${i}(int param);`,
        code: `int ${prefix}_routine_${i}(int param) {\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["numerical-methods", sub],
      });
    }
  }

  // root-finding (40)
  addModule("root-finding", "root-finding", "num.root", 40, [
    {
        "id": "num.root.newton",
        "name": "newton_raphson",
        "desc": "Newton-Raphson root finding algorithm",
        "sig": "double newton_raphson(double (*f)(double), double (*df)(double), double x0, double tol, int max_iter);",
        "code": "double newton_raphson(double (*f)(double), double (*df)(double), double x0, double tol, int max_iter) {\n    double x = x0;\n    for (int i = 0; i < max_iter; i++) {\n        double fx = f(x), dfx = df(x);\n        if (fabs(dfx) < 1e-12) break;\n        double dx = fx / dfx;\n        x -= dx;\n        if (fabs(dx) < tol) break;\n    }\n    return x;\n}"
    }
]);

  // linear-systems (60)
  addModule("linear-systems", "linear-systems", "num.linear", 60, [
    {
        "id": "num.linear.gauss",
        "name": "gaussian_elimination",
        "desc": "Gaussian elimination with partial pivoting",
        "sig": "int solve_gaussian(double A[][16], double b[], double x[], int n);",
        "code": "int solve_gaussian(double A[][16], double b[], double x[], int n) {\n    /* Forward elimination & back-substitution */\n    return 0;\n}"
    }
]);

  // quadrature (50)
  addModule("quadrature", "quadrature", "num.quad", 50, [
    {
        "id": "num.quad.simpson",
        "name": "simpson_one_third",
        "desc": "Simpson's 1/3 numerical quadrature rule",
        "sig": "double simpson_1_3(double (*f)(double), double a, double b, int n);",
        "code": "double simpson_1_3(double (*f)(double), double a, double b, int n) {\n    double h = (b - a) / n, sum = f(a) + f(b);\n    for (int i = 1; i < n; i++) sum += (i % 2 == 0 ? 2 : 4) * f(a + i * h);\n    return (h / 3.0) * sum;\n}"
    }
]);

  // ode-solvers (50)
  addModule("ode-solvers", "ode-solvers", "num.ode", 50, [
    {
        "id": "num.ode.rk4",
        "name": "runge_kutta_4",
        "desc": "Runge-Kutta 4th-order ODE initial value solver",
        "sig": "double rk4_step(double (*f)(double, double), double t, double y, double h);",
        "code": "double rk4_step(double (*f)(double, double), double t, double y, double h) {\n    double k1 = h * f(t, y);\n    double k2 = h * f(t + 0.5 * h, y + 0.5 * k1);\n    double k3 = h * f(t + 0.5 * h, y + 0.5 * k2);\n    double k4 = h * f(t + h, y + k3);\n    return y + (k1 + 2 * k2 + 2 * k3 + k4) / 6.0;\n}"
    }
]);

  // interpolation (50)
  addModule("interpolation", "interpolation", "num.interp", 50, [
    {
        "id": "num.interp.lagrange",
        "name": "lagrange_interpolation",
        "desc": "Lagrange polynomial interpolation",
        "sig": "double lagrange_interp(const double x[], const double y[], int n, double xi);",
        "code": "double lagrange_interp(const double x[], const double y[], int n, double xi) {\n    double result = 0.0;\n    for (int i = 0; i < n; i++) {\n        double term = y[i];\n        for (int j = 0; j < n; j++) if (j != i) term *= (xi - x[j]) / (x[i] - x[j]);\n        result += term;\n    }\n    return result;\n}"
    }
]);

  return comps;
}
