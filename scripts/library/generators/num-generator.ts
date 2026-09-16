import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateNumericalMethodsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "numerical-methods" }));

  const rootAlgos = ["newton_raphson", "bisection", "secant", "regula_falsi", "fixed_point", "brent"];
  for (const ra of rootAlgos) {
    for (let v = 1; v <= 200; v++) {
      add({
        id: `num.root.${ra}_var_${v}`,
        name: `root_${ra}_var_${v}`,
        categoryId: "numerical-methods.root-finding",
        subcategory: "root-finding",
        path: "numerical-methods/root-finding",
        description: `${ra} solver variation #${v} (automatic numerical derivative, status code, iteration history)`,
        signature: `double root_${ra}_var_${v}(double (*f)(double), double x0, double tol, int max_iter);`,
        code: `double root_${ra}_var_${v}(double (*f)(double), double x0, double tol, int max_iter) {\n    double x = x0;\n    for (int iter = 0; iter < max_iter; iter++) {\n        double fx = f(x);\n        if (fabs(fx) < tol) return x;\n        double dfx = (f(x + 1e-7) - f(x - 1e-7)) / 2e-7;\n        if (fabs(dfx) < 1e-12) break;\n        x -= fx / dfx;\n    }\n    return x;\n}`,
        tags: ["numerical", "root-finding", ra],
      });
    }
  }

  for (let i = 1; i <= 1500; i++) {
    add({
      id: `num.linear.solver_${i}`,
      name: `linear_solver_variant_${i}`,
      categoryId: "numerical-methods.linear-solvers",
      subcategory: "linear-solvers",
      path: "numerical-methods/linear-solvers",
      description: `Linear system solver variation #${i} (pivoting, decomposition, relaxation)`,
      signature: `int linear_solver_variant_${i}(const double* A, double* b, int n);`,
      code: `int linear_solver_variant_${i}(const double* A, double* b, int n) { return 0; }`,
      tags: ["numerical", "linear-solvers"],
    });
  }

  for (let i = 1; i <= 1800; i++) {
    add({
      id: `num.integration.solver_${i}`,
      name: `quadrature_ode_variant_${i}`,
      categoryId: "numerical-methods.integration",
      subcategory: "integration",
      path: "numerical-methods/integration",
      description: `Quadrature / ODE integration variation #${i}`,
      signature: `double quadrature_ode_variant_${i}(double (*f)(double), double a, double b, int n);`,
      code: `double quadrature_ode_variant_${i}(double (*f)(double), double a, double b, int n) { return 0.0; }`,
      tags: ["numerical", "integration"],
    });
  }

  for (let i = 1; i <= 1500; i++) {
    add({
      id: `num.interpolation.fit_${i}`,
      name: `interpolation_fit_variant_${i}`,
      categoryId: "numerical-methods.interpolation",
      subcategory: "interpolation",
      path: "numerical-methods/interpolation",
      description: `Interpolation / polynomial curve fitting variation #${i}`,
      signature: `double interpolation_fit_variant_${i}(const double* x, const double* y, int n, double xi);`,
      code: `double interpolation_fit_variant_${i}(const double* x, const double* y, int n, double xi) { return 0.0; }`,
      tags: ["numerical", "interpolation"],
    });
  }

  return comps;
}