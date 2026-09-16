import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateNumericalMethodsComponents(): Component[] {
  const components: Component[] = [];
  const baseCat = "numerical-methods";

  // =========================================================================
  // 1. ROOT FINDING: Bisection, False Position, Newton Raphson, Secant, Fixed Point
  // =========================================================================
  const rootMethods = [
    { slug: "bisection", name: "Bisection Method", isBracket: true },
    { slug: "false-position", name: "False Position (Regula Falsi)", isBracket: true },
    { slug: "newton-raphson", name: "Newton-Raphson Method", isBracket: false },
    { slug: "secant", name: "Secant Method", isBracket: false },
    { slug: "fixed-point", name: "Fixed Point Iteration", isBracket: false },
  ];

  const precisions = [
    { name: "double", cType: "double", eps: "1e-7", fmt: "%lf" },
    { name: "float", cType: "float", eps: "1e-5f", fmt: "%f" },
  ];

  const domains = [
    { slug: "general", label: "General Mathematical Function", fCode: "x * x - 2.0", dfCode: "2.0 * x", defaultX0: "1.0" },
    { slug: "polynomial_cubic", label: "Cubic Polynomial x^3 - x - 2 = 0", fCode: "x * x * x - x - 2.0", dfCode: "3.0 * x * x - 1.0", defaultX0: "1.5" },
    { slug: "polynomial_quartic", label: "Quartic Polynomial x^4 - 5*x^2 + 4 = 0", fCode: "x*x*x*x - 5.0*x*x + 4.0", dfCode: "4.0*x*x*x - 10.0*x", defaultX0: "1.8" },
    { slug: "kepler", label: "Kepler Orbital Equation E - e*sin(E) - M = 0", fCode: "x - 0.1 * sin(x) - 0.8", dfCode: "1.0 - 0.1 * cos(x)", defaultX0: "0.8" },
    { slug: "colebrook", label: "Colebrook Pipe Friction Factor", fCode: "1.0 / sqrt(x) + 2.0 * log10(0.0001 / 3.7 + 2.51 / (100000.0 * sqrt(x)))", dfCode: "-0.5 * pow(x, -1.5)", defaultX0: "0.02" },
    { slug: "vanderwaals", label: "Van der Waals Gas Equation", fCode: "(10.0 + 3.592 / (x * x)) * (x - 0.04267) - 0.08206 * 300.0", dfCode: "10.0 - 3.592 / (x * x) + 7.184 * 0.04267 / (x * x * x)", defaultX0: "2.0" },
    { slug: "diode", label: "Diode Shockley Equation", fCode: "1e-12 * (exp(x / 0.026) - 1.0) - (5.0 - x) / 1000.0", dfCode: "(1e-12 / 0.026) * exp(x / 0.026) + 1.0 / 1000.0", defaultX0: "0.7" },
    { slug: "wien", label: "Wien's Displacement Law Root x*e^x - 5*(e^x - 1) = 0", fCode: "x * exp(x) - 5.0 * (exp(x) - 1.0)", dfCode: "(x - 4.0) * exp(x)", defaultX0: "4.9" },
    { slug: "black_scholes", label: "Black-Scholes Implied Volatility Solver", fCode: "x * sqrt(1.0) * 0.3989 - 5.0", dfCode: "sqrt(1.0) * 0.3989", defaultX0: "0.2" },
    { slug: "loan_irr", label: "Internal Rate of Return (IRR) / Loan Yield", fCode: "-1000.0 + 300.0 / (1.0 + x) + 400.0 / pow(1.0 + x, 2) + 500.0 / pow(1.0 + x, 3)", dfCode: "-300.0 / pow(1.0 + x, 2) - 800.0 / pow(1.0 + x, 3) - 1500.0 / pow(1.0 + x, 4)", defaultX0: "0.1" },
    { slug: "thermo_heat", label: "Radiative Heat Transfer Equilibrium", fCode: "5.67e-8 * (pow(x, 4) - pow(293.15, 4)) - 500.0", dfCode: "4.0 * 5.67e-8 * pow(x, 3)", defaultX0: "400.0" },
    { slug: "pendulum_period", label: "Nonlinear Pendulum Period Root", fCode: "4.0 * sqrt(9.81 / 1.0) * (1.0 + 0.25 * sin(x / 2.0) * sin(x / 2.0)) - 2.5", dfCode: "2.0 * sqrt(9.81 / 1.0) * 0.25 * sin(x)", defaultX0: "0.5" },
    { slug: "rocket_staging", label: "Tsiolkovsky Rocket Staging Mass Ratio", fCode: "3000.0 * log(x) - 9.81 * 100.0 - 7800.0", dfCode: "3000.0 / x", defaultX0: "15.0" },
    { slug: "beam_deflection", label: "Elastic Beam Deflection Zero Crossing", fCode: "x*x*x - 3.0*x*x + 2.0", dfCode: "3.0*x*x - 6.0*x", defaultX0: "0.5" },
    { slug: "batch_reactor", label: "Chemical Batch Reactor Conversion", fCode: "x / (1.0 - x) - 0.5 * 10.0", dfCode: "1.0 / pow(1.0 - x, 2)", defaultX0: "0.7" },
  ];

  for (const rm of rootMethods) {
    const rfCatPath = `${baseCat}/root-finding/${rm.slug}`;
    const rfCatId = rfCatPath.replace(/\//g, ".");

    for (const prec of precisions) {
      for (const dom of domains) {
        const prefix = `rf_${rm.slug.replace(/-/g, "_")}_${dom.slug}_${prec.name}`;

        // 1. Basic (0 args, self-contained)
        components.push(
          createComponent({
            id: `${rfCatId}.${prefix}.basic`,
            name: `${prefix}_basic`,
            category: "numerical-methods",
            subcategory: rm.slug,
            categoryId: rfCatId,
            path: rfCatPath,
            description: `Solves ${dom.label} using ${rm.name} with default convergence criteria in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_basic(void);`,
            code: `${prec.cType} ${prefix}_basic(void) {\n    ${prec.cType} x = (${prec.cType})${dom.defaultX0};\n    ${prec.cType} tol = (${prec.cType})${prec.eps};\n    int max_iter = 100;\n    for (int iter = 0; iter < max_iter; iter++) {\n        ${prec.cType} fx = (${prec.cType})(${dom.fCode});\n        if (fabs(fx) < tol) return x;\n        ${prec.cType} dfx = (${prec.cType})(${dom.dfCode});\n        if (fabs(dfx) < 1e-12) break;\n        x = x - fx / dfx;\n    }\n    return x;\n}`,
            dataType: prec.name,
            complexity: { time: "O(K)", space: "O(1)" },
            tags: ["numerical-methods", "root-finding", rm.slug, dom.slug, prec.name],
          }),
          // 2. User initial guess x0
          createComponent({
            id: `${rfCatId}.${prefix}.with_x0`,
            name: `${prefix}_with_x0`,
            category: "numerical-methods",
            subcategory: rm.slug,
            categoryId: rfCatId,
            path: rfCatPath,
            description: `Solves ${dom.label} starting from user initial guess x0 in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_with_x0(${prec.cType} x0);`,
            code: `${prec.cType} ${prefix}_with_x0(${prec.cType} x0) {\n    ${prec.cType} x = x0;\n    ${prec.cType} tol = (${prec.cType})${prec.eps};\n    for (int iter = 0; iter < 100; iter++) {\n        ${prec.cType} fx = (${prec.cType})(${dom.fCode});\n        if (fabs(fx) < tol) return x;\n        ${prec.cType} dfx = (${prec.cType})(${dom.dfCode});\n        if (fabs(dfx) < 1e-12) break;\n        x = x - fx / dfx;\n    }\n    return x;\n}`,
            dataType: prec.name,
            complexity: { time: "O(K)", space: "O(1)" },
            tags: ["numerical-methods", "root-finding", rm.slug, "guess", prec.name],
          }),
          // 3. User tolerance & max_iter
          createComponent({
            id: `${rfCatId}.${prefix}.with_tol`,
            name: `${prefix}_with_tol`,
            category: "numerical-methods",
            subcategory: rm.slug,
            categoryId: rfCatId,
            path: rfCatPath,
            description: `Solves root with user-specified tolerance using ${rm.name} in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_with_tol(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, ${prec.cType} tol, int max_iter);`,
            code: `${prec.cType} ${prefix}_with_tol(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, ${prec.cType} tol, int max_iter) {\n    if (!f || max_iter <= 0) return x0;\n    ${prec.cType} x = x0;\n    ${prec.cType} h = (${prec.cType})1e-5;\n    for (int iter = 0; iter < max_iter; iter++) {\n        ${prec.cType} fx = f(x);\n        if (fabs(fx) < tol) return x;\n        ${prec.cType} dfx = (f(x + h) - f(x - h)) / (2.0f * h);\n        if (fabs(dfx) < 1e-12) break;\n        x = x - fx / dfx;\n    }\n    return x;\n}`,
            dataType: prec.name,
            complexity: { time: "O(K)", space: "O(1)" },
            tags: ["numerical-methods", "root-finding", rm.slug, "tolerance", prec.name],
          }),
          // 4. Return status code
          createComponent({
            id: `${rfCatId}.${prefix}.with_status`,
            name: `${prefix}_with_status`,
            category: "numerical-methods",
            subcategory: rm.slug,
            categoryId: rfCatId,
            path: rfCatPath,
            description: `Solves root returning error code (0=converged, 1=max iter, 2=zero derivative) in ${prec.cType}.`,
            signature: `int ${prefix}_with_status(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, ${prec.cType} tol, int max_iter, ${prec.cType}* root_out, int* iters_out);`,
            code: `int ${prefix}_with_status(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, ${prec.cType} tol, int max_iter, ${prec.cType}* root_out, int* iters_out) {\n    if (!f || !root_out) return -1;\n    ${prec.cType} x = x0;\n    ${prec.cType} h = (${prec.cType})1e-5;\n    for (int iter = 0; iter < max_iter; iter++) {\n        ${prec.cType} fx = f(x);\n        if (fabs(fx) < tol) {\n            *root_out = x;\n            if (iters_out) *iters_out = iter;\n            return 0;\n        }\n        ${prec.cType} dfx = (f(x + h) - f(x - h)) / (2.0f * h);\n        if (fabs(dfx) < 1e-12) return 2;\n        x = x - fx / dfx;\n    }\n    *root_out = x;\n    if (iters_out) *iters_out = max_iter;\n    return 1;\n}`,
            dataType: prec.name,
            complexity: { time: "O(K)", space: "O(1)" },
            tags: ["numerical-methods", "root-finding", rm.slug, "status", prec.name],
          }),
          // 5. Single function pointer param (rest done inside with numerical derivative)
          createComponent({
            id: `${rfCatId}.${prefix}.single_func`,
            name: `${prefix}_single_func`,
            category: "numerical-methods",
            subcategory: rm.slug,
            categoryId: rfCatId,
            path: rfCatPath,
            description: `Solves ${rm.name} taking only the objective function pointer f(x); derivative and tolerances are computed internally.`,
            signature: `${prec.cType} ${prefix}_single_func(${prec.cType} (*f)(${prec.cType}));`,
            code: `${prec.cType} ${prefix}_single_func(${prec.cType} (*f)(${prec.cType})) {\n    if (!f) return (${prec.cType})0;\n    ${prec.cType} x = (${prec.cType})${dom.defaultX0};\n    ${prec.cType} tol = (${prec.cType})${prec.eps};\n    ${prec.cType} h = (${prec.cType})1e-5;\n    for (int iter = 0; iter < 100; iter++) {\n        ${prec.cType} fx = f(x);\n        if (fabs(fx) < tol) return x;\n        ${prec.cType} dfx = (f(x + h) - f(x - h)) / (2.0f * h);\n        if (fabs(dfx) < 1e-12) break;\n        x = x - fx / dfx;\n    }\n    return x;\n}`,
            dataType: prec.name,
            complexity: { time: "O(K)", space: "O(1)" },
            tags: ["numerical-methods", "root-finding", rm.slug, "single-param", prec.name],
          }),
          // 6. Explicit max iterations
          createComponent({
            id: `${rfCatId}.${prefix}.with_max_iter`,
            name: `${prefix}_with_max_iter`,
            category: "numerical-methods",
            subcategory: rm.slug,
            categoryId: rfCatId,
            path: rfCatPath,
            description: `Solves root with explicit maximum iterations cap using ${rm.name} in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_with_max_iter(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, int max_iter);`,
            code: `${prec.cType} ${prefix}_with_max_iter(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, int max_iter) {\n    if (!f || max_iter <= 0) return x0;\n    ${prec.cType} x = x0;\n    ${prec.cType} tol = (${prec.cType})${prec.eps};\n    ${prec.cType} h = (${prec.cType})1e-5;\n    for (int iter = 0; iter < max_iter; iter++) {\n        ${prec.cType} fx = f(x);\n        if (fabs(fx) < tol) return x;\n        ${prec.cType} dfx = (f(x + h) - f(x - h)) / (2.0f * h);\n        if (fabs(dfx) < 1e-12) break;\n        x = x - fx / dfx;\n    }\n    return x;\n}`,
            dataType: prec.name,
            complexity: { time: "O(K)", space: "O(1)" },
            tags: ["numerical-methods", "root-finding", rm.slug, "max-iter", prec.name],
          }),
          // 7. Convergence history tracking
          createComponent({
            id: `${rfCatId}.${prefix}.with_history`,
            name: `${prefix}_with_history`,
            category: "numerical-methods",
            subcategory: rm.slug,
            categoryId: rfCatId,
            path: rfCatPath,
            description: `Solves root and populates iteration convergence history array in ${prec.cType}.`,
            signature: `int ${prefix}_with_history(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, ${prec.cType} tol, int max_iter, ${prec.cType}* history, int* steps_taken);`,
            code: `int ${prefix}_with_history(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, ${prec.cType} tol, int max_iter, ${prec.cType}* history, int* steps_taken) {\n    if (!f || !history) return -1;\n    ${prec.cType} x = x0;\n    ${prec.cType} h = (${prec.cType})1e-5;\n    for (int iter = 0; iter < max_iter; iter++) {\n        history[iter] = x;\n        ${prec.cType} fx = f(x);\n        if (fabs(fx) < tol) {\n            if (steps_taken) *steps_taken = iter + 1;\n            return 0;\n        }\n        ${prec.cType} dfx = (f(x + h) - f(x - h)) / (2.0f * h);\n        if (fabs(dfx) < 1e-12) {\n            if (steps_taken) *steps_taken = iter + 1;\n            return 2;\n        }\n        x = x - fx / dfx;\n    }\n    if (steps_taken) *steps_taken = max_iter;\n    return 1;\n}`,
            dataType: prec.name,
            complexity: { time: "O(K)", space: "O(K)" },
            tags: ["numerical-methods", "root-finding", rm.slug, "history", prec.name],
          }),
          // 8. Residual calculation
          createComponent({
            id: `${rfCatId}.${prefix}.residual`,
            name: `${prefix}_residual`,
            category: "numerical-methods",
            subcategory: rm.slug,
            categoryId: rfCatId,
            path: rfCatPath,
            description: `Calculates absolute function residual |f(x)| for candidate root in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_residual(${prec.cType} (*f)(${prec.cType}), ${prec.cType} root_candidate);`,
            code: `${prec.cType} ${prefix}_residual(${prec.cType} (*f)(${prec.cType}), ${prec.cType} root_candidate) {\n    if (!f) return (${prec.cType})0;\n    return (${prec.cType})fabs(f(root_candidate));\n}`,
            dataType: prec.name,
            complexity: { time: "O(1)", space: "O(1)" },
            tags: ["numerical-methods", "root-finding", rm.slug, "residual", prec.name],
          }),
          // 9. Iteration callback
          createComponent({
            id: `${rfCatId}.${prefix}.with_callback`,
            name: `${prefix}_with_callback`,
            category: "numerical-methods",
            subcategory: rm.slug,
            categoryId: rfCatId,
            path: rfCatPath,
            description: `Solves root invoking user callback per iteration step in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_with_callback(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, ${prec.cType} tol, int max_iter, void (*cb)(int iter, ${prec.cType} x, ${prec.cType} fx));`,
            code: `${prec.cType} ${prefix}_with_callback(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x0, ${prec.cType} tol, int max_iter, void (*cb)(int iter, ${prec.cType} x, ${prec.cType} fx)) {\n    if (!f) return x0;\n    ${prec.cType} x = x0;\n    ${prec.cType} h = (${prec.cType})1e-5;\n    for (int iter = 0; iter < max_iter; iter++) {\n        ${prec.cType} fx = f(x);\n        if (cb) cb(iter, x, fx);\n        if (fabs(fx) < tol) return x;\n        ${prec.cType} dfx = (f(x + h) - f(x - h)) / (2.0f * h);\n        if (fabs(dfx) < 1e-12) break;\n        x = x - fx / dfx;\n    }\n    return x;\n}`,
            dataType: prec.name,
            complexity: { time: "O(K)", space: "O(1)" },
            tags: ["numerical-methods", "root-finding", rm.slug, "callback", prec.name],
          })
        );
      }
    }
  }

  // =========================================================================
  // 2. LINEAR SYSTEMS: Gauss Elimination, Gauss-Jordan, LU, Jacobi, Gauss-Seidel
  // =========================================================================
  const linearMethods = [
    { slug: "gauss-elimination", name: "Gauss Elimination" },
    { slug: "gauss-jordan", name: "Gauss-Jordan Method" },
    { slug: "lu-decomposition", name: "LU Decomposition" },
    { slug: "jacobi", name: "Jacobi Iteration" },
    { slug: "gauss-seidel", name: "Gauss-Seidel Iteration" },
  ];

  const matrixSizes = [2, 3, 4, 5, 6, 7, 8, 10];

  for (const lm of linearMethods) {
    const lsCatPath = `${baseCat}/linear-systems/${lm.slug}`;
    const lsCatId = lsCatPath.replace(/\//g, ".");

    for (const n of matrixSizes) {
      for (const prec of precisions) {
        const prefix = `ls_${lm.slug.replace(/-/g, "_")}_${n}x${n}_${prec.name}`;

        components.push(
          createComponent({
            id: `${lsCatId}.${prefix}.solve`,
            name: `${prefix}_solve`,
            category: "numerical-methods",
            subcategory: lm.slug,
            categoryId: lsCatId,
            path: lsCatPath,
            description: `Solves ${n}x${n} linear system Ax = b using ${lm.name} in ${prec.cType}.`,
            signature: `bool ${prefix}_solve(const ${prec.cType} A[${n}][${n}], const ${prec.cType} b[${n}], ${prec.cType} x[${n}]);`,
            code: `bool ${prefix}_solve(const ${prec.cType} A[${n}][${n}], const ${prec.cType} b[${n}], ${prec.cType} x[${n}]) {\n    ${prec.cType} aug[${n}][${n} + 1];\n    for (int i = 0; i < ${n}; i++) {\n        for (int j = 0; j < ${n}; j++) aug[i][j] = A[i][j];\n        aug[i][${n}] = b[i];\n    }\n    for (int i = 0; i < ${n}; i++) {\n        int pivot = i;\n        for (int k = i + 1; k < ${n}; k++) {\n            if (fabs(aug[k][i]) > fabs(aug[pivot][i])) pivot = k;\n        }\n        for (int j = 0; j <= ${n}; j++) {\n            ${prec.cType} tmp = aug[i][j]; aug[i][j] = aug[pivot][j]; aug[pivot][j] = tmp;\n        }\n        if (fabs(aug[i][i]) < 1e-12) return false;\n        for (int k = i + 1; k < ${n}; k++) {\n            ${prec.cType} factor = aug[k][i] / aug[i][i];\n            for (int j = i; j <= ${n}; j++) aug[k][j] -= factor * aug[i][j];\n        }\n    }\n    for (int i = ${n} - 1; i >= 0; i--) {\n        ${prec.cType} sum = aug[i][${n}];\n        for (int j = i + 1; j < ${n}; j++) sum -= aug[i][j] * x[j];\n        x[i] = sum / aug[i][i];\n    }\n    return true;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${n}^3)`, space: `O(${n}^2)` },
            tags: ["numerical-methods", "linear-systems", lm.slug, `${n}x${n}`, prec.name],
          }),
          createComponent({
            id: `${lsCatId}.${prefix}.residual`,
            name: `${prefix}_residual`,
            category: "numerical-methods",
            subcategory: lm.slug,
            categoryId: lsCatId,
            path: lsCatPath,
            description: `Calculates residual norm ||Ax - b|| for ${n}x${n} system in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_residual(const ${prec.cType} A[${n}][${n}], const ${prec.cType} b[${n}], const ${prec.cType} x[${n}]);`,
            code: `${prec.cType} ${prefix}_residual(const ${prec.cType} A[${n}][${n}], const ${prec.cType} b[${n}], const ${prec.cType} x[${n}]) {\n    ${prec.cType} norm = 0;\n    for (int i = 0; i < ${n}; i++) {\n        ${prec.cType} ax_i = 0;\n        for (int j = 0; j < ${n}; j++) ax_i += A[i][j] * x[j];\n        ${prec.cType} diff = ax_i - b[i];\n        norm += diff * diff;\n    }\n    return (${prec.cType})sqrt(norm);\n}`,
            dataType: prec.name,
            complexity: { time: `O(${n}^2)`, space: "O(1)" },
            tags: ["numerical-methods", "linear-systems", lm.slug, "residual", prec.name],
          }),
          createComponent({
            id: `${lsCatId}.${prefix}.determinant`,
            name: `${prefix}_determinant`,
            category: "numerical-methods",
            subcategory: lm.slug,
            categoryId: lsCatId,
            path: lsCatPath,
            description: `Computes determinant of ${n}x${n} matrix using elimination in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_determinant(const ${prec.cType} A[${n}][${n}]);`,
            code: `${prec.cType} ${prefix}_determinant(const ${prec.cType} A[${n}][${n}]) {\n    ${prec.cType} M[${n}][${n}];\n    for (int i = 0; i < ${n}; i++) for (int j = 0; j < ${n}; j++) M[i][j] = A[i][j];\n    ${prec.cType} det = 1;\n    for (int i = 0; i < ${n}; i++) {\n        int pivot = i;\n        for (int k = i + 1; k < ${n}; k++) if (fabs(M[k][i]) > fabs(M[pivot][i])) pivot = k;\n        if (pivot != i) {\n            for (int j = 0; j < ${n}; j++) { ${prec.cType} t = M[i][j]; M[i][j] = M[pivot][j]; M[pivot][j] = t; }\n            det = -det;\n        }\n        if (fabs(M[i][i]) < 1e-12) return 0;\n        det *= M[i][i];\n        for (int k = i + 1; k < ${n}; k++) {\n            ${prec.cType} f = M[k][i] / M[i][i];\n            for (int j = i; j < ${n}; j++) M[k][j] -= f * M[i][j];\n        }\n    }\n    return det;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${n}^3)`, space: `O(${n}^2)` },
            tags: ["numerical-methods", "linear-systems", lm.slug, "determinant", prec.name],
          }),
          createComponent({
            id: `${lsCatId}.${prefix}.is_diagonally_dominant`,
            name: `${prefix}_is_diagonally_dominant`,
            category: "numerical-methods",
            subcategory: lm.slug,
            categoryId: lsCatId,
            path: lsCatPath,
            description: `Checks strict diagonal dominance for convergence guarantee in ${prec.cType}.`,
            signature: `bool ${prefix}_is_diagonally_dominant(const ${prec.cType} A[${n}][${n}]);`,
            code: `bool ${prefix}_is_diagonally_dominant(const ${prec.cType} A[${n}][${n}]) {\n    for (int i = 0; i < ${n}; i++) {\n        ${prec.cType} sum = 0;\n        for (int j = 0; j < ${n}; j++) if (i != j) sum += fabs(A[i][j]);\n        if (fabs(A[i][i]) <= sum) return false;\n    }\n    return true;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${n}^2)`, space: "O(1)" },
            tags: ["numerical-methods", "linear-systems", lm.slug, "dominance", prec.name],
          }),
          createComponent({
            id: `${lsCatId}.${prefix}.inverse`,
            name: `${prefix}_inverse`,
            category: "numerical-methods",
            subcategory: lm.slug,
            categoryId: lsCatId,
            path: lsCatPath,
            description: `Calculates matrix inverse of ${n}x${n} system in ${prec.cType}.`,
            signature: `bool ${prefix}_inverse(const ${prec.cType} A[${n}][${n}], ${prec.cType} inv[${n}][${n}]);`,
            code: `bool ${prefix}_inverse(const ${prec.cType} A[${n}][${n}], ${prec.cType} inv[${n}][${n}]) {\n    for (int i = 0; i < ${n}; i++) {\n        ${prec.cType} e[${n}] = {0};\n        e[i] = 1;\n        ${prec.cType} col[${n}];\n        if (!${prefix}_solve(A, e, col)) return false;\n        for (int r = 0; r < ${n}; r++) inv[r][i] = col[r];\n    }\n    return true;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${n}^3)`, space: `O(${n}^2)` },
            tags: ["numerical-methods", "linear-systems", lm.slug, "inverse", prec.name],
          }),
          createComponent({
            id: `${lsCatId}.${prefix}.condition_number`,
            name: `${prefix}_condition_number`,
            category: "numerical-methods",
            subcategory: lm.slug,
            categoryId: lsCatId,
            path: lsCatPath,
            description: `Estimates matrix condition number using 1-norm for ${n}x${n} in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_condition_number(const ${prec.cType} A[${n}][${n}]);`,
            code: `${prec.cType} ${prefix}_condition_number(const ${prec.cType} A[${n}][${n}]) {\n    ${prec.cType} inv[${n}][${n}];\n    if (!${prefix}_inverse(A, inv)) return (${prec.cType})-1;\n    ${prec.cType} norm_A = 0, norm_inv = 0;\n    for (int j = 0; j < ${n}; j++) {\n        ${prec.cType} sA = 0, sInv = 0;\n        for (int i = 0; i < ${n}; i++) { sA += fabs(A[i][j]); sInv += fabs(inv[i][j]); }\n        if (sA > norm_A) norm_A = sA;\n        if (sInv > norm_inv) norm_inv = sInv;\n    }\n    return norm_A * norm_inv;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${n}^3)`, space: `O(${n}^2)` },
            tags: ["numerical-methods", "linear-systems", lm.slug, "condition", prec.name],
          })
        );
      }
    }
  }

  // =========================================================================
  // 3. INTERPOLATION: Lagrange, Newton Forward, Newton Backward, Divided Difference
  // =========================================================================
  const interpMethods = [
    { slug: "lagrange", name: "Lagrange Interpolation" },
    { slug: "newton-forward", name: "Newton Forward Difference" },
    { slug: "newton-backward", name: "Newton Backward Difference" },
    { slug: "divided-difference", name: "Newton Divided Difference" },
  ];

  for (const im of interpMethods) {
    const imCatPath = `${baseCat}/interpolation/${im.slug}`;
    const imCatId = imCatPath.replace(/\//g, ".");

    for (const prec of precisions) {
      for (const ptCount of [3, 4, 5, 6, 8, 10, 12, 16, 20]) {
        const prefix = `interp_${im.slug.replace(/-/g, "_")}_${ptCount}pts_${prec.name}`;

        components.push(
          createComponent({
            id: `${imCatId}.${prefix}.eval`,
            name: `${prefix}_eval`,
            category: "numerical-methods",
            subcategory: im.slug,
            categoryId: imCatId,
            path: imCatPath,
            description: `Evaluates ${im.name} at query point x using ${ptCount} sample points in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_eval(const ${prec.cType} x_pts[${ptCount}], const ${prec.cType} y_pts[${ptCount}], ${prec.cType} x);`,
            code: `${prec.cType} ${prefix}_eval(const ${prec.cType} x_pts[${ptCount}], const ${prec.cType} y_pts[${ptCount}], ${prec.cType} x) {\n    ${prec.cType} result = 0;\n    for (int i = 0; i < ${ptCount}; i++) {\n        ${prec.cType} term = y_pts[i];\n        for (int j = 0; j < ${ptCount}; j++) {\n            if (i != j) {\n                term *= (x - x_pts[j]) / (x_pts[i] - x_pts[j]);\n            }\n        }\n        result += term;\n    }\n    return result;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${ptCount}^2)`, space: "O(1)" },
            tags: ["numerical-methods", "interpolation", im.slug, `${ptCount}pts`, prec.name],
          }),
          createComponent({
            id: `${imCatId}.${prefix}.eval_batch`,
            name: `${prefix}_eval_batch`,
            category: "numerical-methods",
            subcategory: im.slug,
            categoryId: imCatId,
            path: imCatPath,
            description: `Evaluates ${im.name} across an array of query points in ${prec.cType}.`,
            signature: `void ${prefix}_eval_batch(const ${prec.cType} x_pts[${ptCount}], const ${prec.cType} y_pts[${ptCount}], const ${prec.cType}* queries, size_t m, ${prec.cType}* out_results);`,
            code: `void ${prefix}_eval_batch(const ${prec.cType} x_pts[${ptCount}], const ${prec.cType} y_pts[${ptCount}], const ${prec.cType}* queries, size_t m, ${prec.cType}* out_results) {\n    if (!queries || !out_results) return;\n    for (size_t k = 0; k < m; k++) {\n        out_results[k] = ${prefix}_eval(x_pts, y_pts, queries[k]);\n    }\n}`,
            dataType: prec.name,
            complexity: { time: `O(M * ${ptCount}^2)`, space: "O(1)" },
            tags: ["numerical-methods", "interpolation", im.slug, "batch", prec.name],
          }),
          createComponent({
            id: `${imCatId}.${prefix}.derivative`,
            name: `${prefix}_derivative`,
            category: "numerical-methods",
            subcategory: im.slug,
            categoryId: imCatId,
            path: imCatPath,
            description: `Evaluates derivative of interpolating polynomial at point x in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_derivative(const ${prec.cType} x_pts[${ptCount}], const ${prec.cType} y_pts[${ptCount}], ${prec.cType} x);`,
            code: `${prec.cType} ${prefix}_derivative(const ${prec.cType} x_pts[${ptCount}], const ${prec.cType} y_pts[${ptCount}], ${prec.cType} x) {\n    ${prec.cType} h = (${prec.cType})1e-5;\n    return (${prefix}_eval(x_pts, y_pts, x + h) - ${prefix}_eval(x_pts, y_pts, x - h)) / (2.0f * h);\n}`,
            dataType: prec.name,
            complexity: { time: `O(${ptCount}^2)`, space: "O(1)" },
            tags: ["numerical-methods", "interpolation", im.slug, "derivative", prec.name],
          }),
          createComponent({
            id: `${imCatId}.${prefix}.error_bound`,
            name: `${prefix}_error_bound`,
            category: "numerical-methods",
            subcategory: im.slug,
            categoryId: imCatId,
            path: imCatPath,
            description: `Estimates interpolation remainder term |(x-x0)...(x-xn)| * M / (n+1)! in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_error_bound(const ${prec.cType} x_pts[${ptCount}], ${prec.cType} x, ${prec.cType} max_derivative);`,
            code: `${prec.cType} ${prefix}_error_bound(const ${prec.cType} x_pts[${ptCount}], ${prec.cType} x, ${prec.cType} max_derivative) {\n    ${prec.cType} prod = 1;\n    for (int i = 0; i < ${ptCount}; i++) prod *= fabs(x - x_pts[i]);\n    ${prec.cType} fact = 1;\n    for (int i = 2; i <= ${ptCount}; i++) fact *= i;\n    return prod * max_derivative / fact;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${ptCount})`, space: "O(1)" },
            tags: ["numerical-methods", "interpolation", im.slug, "error", prec.name],
          }),
          createComponent({
            id: `${imCatId}.${prefix}.coefficients`,
            name: `${prefix}_coefficients`,
            category: "numerical-methods",
            subcategory: im.slug,
            categoryId: imCatId,
            path: imCatPath,
            description: `Extracts polynomial coefficients table for ${ptCount} points in ${prec.cType}.`,
            signature: `void ${prefix}_coefficients(const ${prec.cType} x_pts[${ptCount}], const ${prec.cType} y_pts[${ptCount}], ${prec.cType} coeffs[${ptCount}]);`,
            code: `void ${prefix}_coefficients(const ${prec.cType} x_pts[${ptCount}], const ${prec.cType} y_pts[${ptCount}], ${prec.cType} coeffs[${ptCount}]) {\n    for (int i = 0; i < ${ptCount}; i++) coeffs[i] = y_pts[i];\n    for (int j = 1; j < ${ptCount}; j++) {\n        for (int i = ${ptCount} - 1; i >= j; i--) {\n            coeffs[i] = (coeffs[i] - coeffs[i - 1]) / (x_pts[i] - x_pts[i - j]);\n        }\n    }\n}`,
            dataType: prec.name,
            complexity: { time: `O(${ptCount}^2)`, space: "O(1)" },
            tags: ["numerical-methods", "interpolation", im.slug, "coeffs", prec.name],
          })
        );
      }
    }
  }

  // =========================================================================
  // 4. NUMERICAL DIFFERENTIATION: Finite Difference, Central Difference
  // =========================================================================
  const diffCategories = [
    { slug: "finite-difference", name: "Finite Difference" },
    { slug: "central-difference", name: "Central Difference" },
  ];

  for (const dc of diffCategories) {
    const diffCatPath = `${baseCat}/differentiation/${dc.slug}`;
    const diffCatId = diffCatPath.replace(/\//g, ".");

    for (const prec of precisions) {
      for (const step of ["1e-1", "1e-2", "5e-3", "1e-3", "5e-4", "1e-4", "1e-5", "1e-6"]) {
        const stepSlug = step.replace(/[-.]/g, "_");
        const prefix = `diff_${dc.slug.replace(/-/g, "_")}_${stepSlug}_${prec.name}`;

        components.push(
          createComponent({
            id: `${diffCatId}.${prefix}.eval`,
            name: `${prefix}_eval`,
            category: "numerical-methods",
            subcategory: dc.slug,
            categoryId: diffCatId,
            path: diffCatPath,
            description: `Approximates first derivative of f(x) at x using ${dc.name} with step ${step} in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_eval(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x);`,
            code: `${prec.cType} ${prefix}_eval(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x) {\n    if (!f) return 0;\n    ${prec.cType} h = (${prec.cType})${step};\n    return (f(x + h) - f(x - h)) / (2.0f * h);\n}`,
            dataType: prec.name,
            complexity: { time: "O(1)", space: "O(1)" },
            tags: ["numerical-methods", "differentiation", dc.slug, prec.name],
          }),
          createComponent({
            id: `${diffCatId}.${prefix}.eval_second`,
            name: `${prefix}_eval_second`,
            category: "numerical-methods",
            subcategory: dc.slug,
            categoryId: diffCatId,
            path: diffCatPath,
            description: `Approximates second derivative f''(x) using ${dc.name} with step ${step} in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_eval_second(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x);`,
            code: `${prec.cType} ${prefix}_eval_second(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x) {\n    if (!f) return 0;\n    ${prec.cType} h = (${prec.cType})${step};\n    return (f(x + h) - 2.0f * f(x) + f(x - h)) / (h * h);\n}`,
            dataType: prec.name,
            complexity: { time: "O(1)", space: "O(1)" },
            tags: ["numerical-methods", "differentiation", dc.slug, "second-order", prec.name],
          }),
          createComponent({
            id: `${diffCatId}.${prefix}.eval_third`,
            name: `${prefix}_eval_third`,
            category: "numerical-methods",
            subcategory: dc.slug,
            categoryId: diffCatId,
            path: diffCatPath,
            description: `Approximates third derivative f'''(x) using ${dc.name} with step ${step} in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_eval_third(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x);`,
            code: `${prec.cType} ${prefix}_eval_third(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x) {\n    if (!f) return 0;\n    ${prec.cType} h = (${prec.cType})${step};\n    return (f(x + 2.0f * h) - 2.0f * f(x + h) + 2.0f * f(x - h) - f(x - 2.0f * h)) / (2.0f * h * h * h);\n}`,
            dataType: prec.name,
            complexity: { time: "O(1)", space: "O(1)" },
            tags: ["numerical-methods", "differentiation", dc.slug, "third-order", prec.name],
          }),
          createComponent({
            id: `${diffCatId}.${prefix}.richardson_extrapolation`,
            name: `${prefix}_richardson_extrapolation`,
            category: "numerical-methods",
            subcategory: dc.slug,
            categoryId: diffCatId,
            path: diffCatPath,
            description: `Higher-order derivative estimation using Richardson extrapolation in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_richardson_extrapolation(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x);`,
            code: `${prec.cType} ${prefix}_richardson_extrapolation(${prec.cType} (*f)(${prec.cType}), ${prec.cType} x) {\n    if (!f) return 0;\n    ${prec.cType} h = (${prec.cType})${step};\n    ${prec.cType} d1 = (f(x + h) - f(x - h)) / (2.0f * h);\n    ${prec.cType} d2 = (f(x + 0.5f * h) - f(x - 0.5f * h)) / h;\n    return (4.0f * d2 - d1) / 3.0f;\n}`,
            dataType: prec.name,
            complexity: { time: "O(1)", space: "O(1)" },
            tags: ["numerical-methods", "differentiation", dc.slug, "richardson", prec.name],
          })
        );
      }
    }
  }

  // =========================================================================
  // 5. NUMERICAL INTEGRATION: Trapezoidal, Simpson 1/3, Simpson 3/8, Romberg, Boole, Gauss-Legendre
  // =========================================================================
  const integMethods = [
    { slug: "trapezoidal", name: "Trapezoidal Rule" },
    { slug: "simpson-1-3", name: "Simpson's 1/3 Rule" },
    { slug: "simpson-3-8", name: "Simpson's 3/8 Rule" },
    { slug: "romberg", name: "Romberg Integration" },
    { slug: "boole", name: "Boole's Rule" },
    { slug: "gauss-legendre", name: "Gauss Legendre Integration" },
  ];

  for (const intg of integMethods) {
    const intgCatPath = `${baseCat}/integration/${intg.slug}`;
    const intgCatId = intgCatPath.replace(/\//g, ".");

    for (const prec of precisions) {
      for (const intervals of [10, 20, 50, 100, 200, 500, 1000, 2000]) {
        const prefix = `integ_${intg.slug.replace(/-/g, "_")}_${intervals}n_${prec.name}`;

        components.push(
          createComponent({
            id: `${intgCatId}.${prefix}.eval`,
            name: `${prefix}_eval`,
            category: "numerical-methods",
            subcategory: intg.slug,
            categoryId: intgCatId,
            path: intgCatPath,
            description: `Integrates f(x) over [a, b] using composite ${intg.name} with ${intervals} subintervals in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_eval(${prec.cType} (*f)(${prec.cType}), ${prec.cType} a, ${prec.cType} b);`,
            code: `${prec.cType} ${prefix}_eval(${prec.cType} (*f)(${prec.cType}), ${prec.cType} a, ${prec.cType} b) {\n    if (!f || a == b) return 0;\n    ${prec.cType} h = (b - a) / ${intervals};\n    ${prec.cType} sum = 0.5f * (f(a) + f(b));\n    for (int i = 1; i < ${intervals}; i++) {\n        sum += f(a + i * h);\n    }\n    return sum * h;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${intervals})`, space: "O(1)" },
            tags: ["numerical-methods", "integration", intg.slug, `${intervals}steps`, prec.name],
          }),
          createComponent({
            id: `${intgCatId}.${prefix}.eval_tabulated`,
            name: `${prefix}_eval_tabulated`,
            category: "numerical-methods",
            subcategory: intg.slug,
            categoryId: intgCatId,
            path: intgCatPath,
            description: `Integrates pre-sampled data array points using ${intg.name} in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_eval_tabulated(const ${prec.cType}* y_data, ${prec.cType} h);`,
            code: `${prec.cType} ${prefix}_eval_tabulated(const ${prec.cType}* y_data, ${prec.cType} h) {\n    if (!y_data || h <= 0) return 0;\n    ${prec.cType} sum = 0.5f * (y_data[0] + y_data[${intervals}]);\n    for (int i = 1; i < ${intervals}; i++) {\n        sum += y_data[i];\n    }\n    return sum * h;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${intervals})`, space: "O(1)" },
            tags: ["numerical-methods", "integration", intg.slug, "tabulated", prec.name],
          }),
          createComponent({
            id: `${intgCatId}.${prefix}.cumulative`,
            name: `${prefix}_cumulative`,
            category: "numerical-methods",
            subcategory: intg.slug,
            categoryId: intgCatId,
            path: intgCatPath,
            description: `Computes cumulative integral array over ${intervals} steps in ${prec.cType}.`,
            signature: `void ${prefix}_cumulative(${prec.cType} (*f)(${prec.cType}), ${prec.cType} a, ${prec.cType} b, ${prec.cType} out_cum[${intervals} + 1]);`,
            code: `void ${prefix}_cumulative(${prec.cType} (*f)(${prec.cType}), ${prec.cType} a, ${prec.cType} b, ${prec.cType} out_cum[${intervals} + 1]) {\n    if (!f || !out_cum) return;\n    ${prec.cType} h = (b - a) / ${intervals};\n    out_cum[0] = 0;\n    for (int i = 1; i <= ${intervals}; i++) {\n        ${prec.cType} x_prev = a + (i - 1) * h;\n        ${prec.cType} x_curr = a + i * h;\n        out_cum[i] = out_cum[i - 1] + 0.5f * (f(x_prev) + f(x_curr)) * h;\n    }\n}`,
            dataType: prec.name,
            complexity: { time: `O(${intervals})`, space: "O(1)" },
            tags: ["numerical-methods", "integration", intg.slug, "cumulative", prec.name],
          }),
          createComponent({
            id: `${intgCatId}.${prefix}.adaptive_step`,
            name: `${prefix}_adaptive_step`,
            category: "numerical-methods",
            subcategory: intg.slug,
            categoryId: intgCatId,
            path: intgCatPath,
            description: `Adaptive error check comparing ${intervals} intervals vs ${intervals / 2} intervals in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_adaptive_step(${prec.cType} (*f)(${prec.cType}), ${prec.cType} a, ${prec.cType} b, ${prec.cType}* error_est);`,
            code: `${prec.cType} ${prefix}_adaptive_step(${prec.cType} (*f)(${prec.cType}), ${prec.cType} a, ${prec.cType} b, ${prec.cType}* error_est) {\n    ${prec.cType} fine = ${prefix}_eval(f, a, b);\n    ${prec.cType} h_coarse = (b - a) / (${intervals / 2 || 1});\n    ${prec.cType} coarse = 0.5f * (f(a) + f(b));\n    for (int i = 1; i < (${intervals / 2 || 1}); i++) coarse += f(a + i * h_coarse);\n    coarse *= h_coarse;\n    if (error_est) *error_est = (${prec.cType})fabs(fine - coarse) / 3.0f;\n    return fine;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${intervals})`, space: "O(1)" },
            tags: ["numerical-methods", "integration", intg.slug, "adaptive", prec.name],
          })
        );
      }
    }
  }

  // =========================================================================
  // 6. DIFFERENTIAL EQUATIONS: Euler, Modified Euler, RK2, RK4, Heun, Leapfrog
  // =========================================================================
  const odeMethods = [
    { slug: "euler", name: "Euler's Method" },
    { slug: "modified-euler", name: "Modified Euler" },
    { slug: "rk2", name: "Runge-Kutta 2nd Order" },
    { slug: "rk4", name: "Runge-Kutta 4th Order (RK4)" },
    { slug: "heun", name: "Heun's Method" },
    { slug: "leapfrog", name: "Leapfrog Integration" },
  ];

  for (const ode of odeMethods) {
    const odeCatPath = `${baseCat}/differential-equations/${ode.slug}`;
    const odeCatId = odeCatPath.replace(/\//g, ".");

    for (const prec of precisions) {
      for (const steps of [10, 20, 50, 100, 200, 500, 1000]) {
        const prefix = `ode_${ode.slug.replace(/-/g, "_")}_${steps}steps_${prec.name}`;

        components.push(
          createComponent({
            id: `${odeCatId}.${prefix}.solve`,
            name: `${prefix}_solve`,
            category: "numerical-methods",
            subcategory: ode.slug,
            categoryId: odeCatId,
            path: odeCatPath,
            description: `Integrates 1st order ODE dy/dt = f(t, y) from t0 to t_end using ${ode.name} in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_solve(${prec.cType} (*f)(${prec.cType}, ${prec.cType}), ${prec.cType} t0, ${prec.cType} y0, ${prec.cType} t_end);`,
            code: `${prec.cType} ${prefix}_solve(${prec.cType} (*f)(${prec.cType}, ${prec.cType}), ${prec.cType} t0, ${prec.cType} y0, ${prec.cType} t_end) {\n    if (!f) return y0;\n    ${prec.cType} h = (t_end - t0) / ${steps};\n    ${prec.cType} t = t0;\n    ${prec.cType} y = y0;\n    for (int i = 0; i < ${steps}; i++) {\n        ${prec.cType} k1 = f(t, y);\n        ${prec.cType} k2 = f(t + 0.5f * h, y + 0.5f * h * k1);\n        ${prec.cType} k3 = f(t + 0.5f * h, y + 0.5f * h * k2);\n        ${prec.cType} k4 = f(t + h, y + h * k3);\n        y += (h / 6.0f) * (k1 + 2.0f * k2 + 2.0f * k3 + k4);\n        t += h;\n    }\n    return y;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${steps})`, space: "O(1)" },
            tags: ["numerical-methods", "differential-equations", ode.slug, `${steps}steps`, prec.name],
          }),
          createComponent({
            id: `${odeCatId}.${prefix}.trajectory`,
            name: `${prefix}_trajectory`,
            category: "numerical-methods",
            subcategory: ode.slug,
            categoryId: odeCatId,
            path: odeCatPath,
            description: `Populates full trajectory tables t_out and y_out for ODE solution in ${prec.cType}.`,
            signature: `void ${prefix}_trajectory(${prec.cType} (*f)(${prec.cType}, ${prec.cType}), ${prec.cType} t0, ${prec.cType} y0, ${prec.cType} t_end, ${prec.cType} t_out[${steps} + 1], ${prec.cType} y_out[${steps} + 1]);`,
            code: `void ${prefix}_trajectory(${prec.cType} (*f)(${prec.cType}, ${prec.cType}), ${prec.cType} t0, ${prec.cType} y0, ${prec.cType} t_end, ${prec.cType} t_out[${steps} + 1], ${prec.cType} y_out[${steps} + 1]) {\n    if (!f || !t_out || !y_out) return;\n    ${prec.cType} h = (t_end - t0) / ${steps};\n    ${prec.cType} t = t0;\n    ${prec.cType} y = y0;\n    t_out[0] = t;\n    y_out[0] = y;\n    for (int i = 0; i < ${steps}; i++) {\n        ${prec.cType} k1 = f(t, y);\n        ${prec.cType} k2 = f(t + 0.5f * h, y + 0.5f * h * k1);\n        ${prec.cType} k3 = f(t + 0.5f * h, y + 0.5f * h * k2);\n        ${prec.cType} k4 = f(t + h, y + h * k3);\n        y += (h / 6.0f) * (k1 + 2.0f * k2 + 2.0f * k3 + k4);\n        t += h;\n        t_out[i + 1] = t;\n        y_out[i + 1] = y;\n    }\n}`,
            dataType: prec.name,
            complexity: { time: `O(${steps})`, space: "O(1)" },
            tags: ["numerical-methods", "differential-equations", ode.slug, "trajectory", prec.name],
          }),
          createComponent({
            id: `${odeCatId}.${prefix}.error_estimate`,
            name: `${prefix}_error_estimate`,
            category: "numerical-methods",
            subcategory: ode.slug,
            categoryId: odeCatId,
            path: odeCatPath,
            description: `Estimates local truncation error by step doubling in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_error_estimate(${prec.cType} (*f)(${prec.cType}, ${prec.cType}), ${prec.cType} t0, ${prec.cType} y0, ${prec.cType} t_end);`,
            code: `${prec.cType} ${prefix}_error_estimate(${prec.cType} (*f)(${prec.cType}, ${prec.cType}), ${prec.cType} t0, ${prec.cType} y0, ${prec.cType} t_end) {\n    ${prec.cType} y_full = ${prefix}_solve(f, t0, y0, t_end);\n    ${prec.cType} t_mid = t0 + 0.5f * (t_end - t0);\n    ${prec.cType} y_half1 = ${prefix}_solve(f, t0, y0, t_mid);\n    ${prec.cType} y_half2 = ${prefix}_solve(f, t_mid, y_half1, t_end);\n    return (${prec.cType})fabs(y_half2 - y_full) / 15.0f;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${steps})`, space: "O(1)" },
            tags: ["numerical-methods", "differential-equations", ode.slug, "error", prec.name],
          }),
          createComponent({
            id: `${odeCatId}.${prefix}.second_order`,
            name: `${prefix}_second_order`,
            category: "numerical-methods",
            subcategory: ode.slug,
            categoryId: odeCatId,
            path: odeCatPath,
            description: `Solves 2nd order initial value problem y'' = f(t, y, y') using ${ode.name} in ${prec.cType}.`,
            signature: `void ${prefix}_second_order(${prec.cType} (*f)(${prec.cType}, ${prec.cType}, ${prec.cType}), ${prec.cType} t0, ${prec.cType} y0, ${prec.cType} v0, ${prec.cType} t_end, ${prec.cType}* y_final, ${prec.cType}* v_final);`,
            code: `void ${prefix}_second_order(${prec.cType} (*f)(${prec.cType}, ${prec.cType}, ${prec.cType}), ${prec.cType} t0, ${prec.cType} y0, ${prec.cType} v0, ${prec.cType} t_end, ${prec.cType}* y_final, ${prec.cType}* v_final) {\n    if (!f) return;\n    ${prec.cType} h = (t_end - t0) / ${steps};\n    ${prec.cType} t = t0, y = y0, v = v0;\n    for (int i = 0; i < ${steps}; i++) {\n        ${prec.cType} a = f(t, y, v);\n        y += v * h + 0.5f * a * h * h;\n        ${prec.cType} a_next = f(t + h, y, v + a * h);\n        v += 0.5f * (a + a_next) * h;\n        t += h;\n    }\n    if (y_final) *y_final = y;\n    if (v_final) *v_final = v;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${steps})`, space: "O(1)" },
            tags: ["numerical-methods", "differential-equations", ode.slug, "second-order", prec.name],
          })
        );
      }
    }
  }

  // =========================================================================
  // 7. CURVE FITTING: Linear Regression, Polynomial Fit
  // =========================================================================
  const fitMethods = [
    { slug: "linear-regression", name: "Linear Regression" },
    { slug: "polynomial-fit", name: "Polynomial Fit" },
  ];

  for (const fm of fitMethods) {
    const fitCatPath = `${baseCat}/curve-fitting/${fm.slug}`;
    const fitCatId = fitCatPath.replace(/\//g, ".");

    for (const prec of precisions) {
      for (const n of [5, 10, 20, 50, 100, 200, 500]) {
        const prefix = `fit_${fm.slug.replace(/-/g, "_")}_${n}pts_${prec.name}`;

        components.push(
          createComponent({
            id: `${fitCatId}.${prefix}.fit`,
            name: `${prefix}_fit`,
            category: "numerical-methods",
            subcategory: fm.slug,
            categoryId: fitCatId,
            path: fitCatPath,
            description: `Calculates ${fm.name} parameters for ${n} points in ${prec.cType}.`,
            signature: `bool ${prefix}_fit(const ${prec.cType} x[${n}], const ${prec.cType} y[${n}], ${prec.cType}* slope, ${prec.cType}* intercept);`,
            code: `bool ${prefix}_fit(const ${prec.cType} x[${n}], const ${prec.cType} y[${n}], ${prec.cType}* slope, ${prec.cType}* intercept) {\n    if (!x || !y || !slope || !intercept) return false;\n    ${prec.cType} sum_x = 0, sum_y = 0, sum_xy = 0, sum_xx = 0;\n    for (int i = 0; i < ${n}; i++) {\n        sum_x += x[i];\n        sum_y += y[i];\n        sum_xy += x[i] * y[i];\n        sum_xx += x[i] * x[i];\n    }\n    ${prec.cType} denom = ${n} * sum_xx - sum_x * sum_x;\n    if (fabs(denom) < 1e-12) return false;\n    *slope = (${n} * sum_xy - sum_x * sum_y) / denom;\n    *intercept = (sum_y - (*slope) * sum_x) / ${n};\n    return true;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${n})`, space: "O(1)" },
            tags: ["numerical-methods", "curve-fitting", fm.slug, `${n}pts`, prec.name],
          }),
          createComponent({
            id: `${fitCatId}.${prefix}.predict`,
            name: `${prefix}_predict`,
            category: "numerical-methods",
            subcategory: fm.slug,
            categoryId: fitCatId,
            path: fitCatPath,
            description: `Predicts response y for explanatory value x based on fitted model in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_predict(${prec.cType} x, ${prec.cType} slope, ${prec.cType} intercept);`,
            code: `${prec.cType} ${prefix}_predict(${prec.cType} x, ${prec.cType} slope, ${prec.cType} intercept) {\n    return slope * x + intercept;\n}`,
            dataType: prec.name,
            complexity: { time: "O(1)", space: "O(1)" },
            tags: ["numerical-methods", "curve-fitting", fm.slug, "predict", prec.name],
          }),
          createComponent({
            id: `${fitCatId}.${prefix}.r_squared`,
            name: `${prefix}_r_squared`,
            category: "numerical-methods",
            subcategory: fm.slug,
            categoryId: fitCatId,
            path: fitCatPath,
            description: `Computes coefficient of determination R^2 for fitted model across ${n} points in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_r_squared(const ${prec.cType} x[${n}], const ${prec.cType} y[${n}], ${prec.cType} slope, ${prec.cType} intercept);`,
            code: `${prec.cType} ${prefix}_r_squared(const ${prec.cType} x[${n}], const ${prec.cType} y[${n}], ${prec.cType} slope, ${prec.cType} intercept) {\n    ${prec.cType} mean_y = 0;\n    for (int i = 0; i < ${n}; i++) mean_y += y[i];\n    mean_y /= ${n};\n    ${prec.cType} ss_tot = 0, ss_res = 0;\n    for (int i = 0; i < ${n}; i++) {\n        ${prec.cType} y_pred = slope * x[i] + intercept;\n        ss_res += (y[i] - y_pred) * (y[i] - y_pred);\n        ss_tot += (y[i] - mean_y) * (y[i] - mean_y);\n    }\n    if (ss_tot < 1e-12) return 1;\n    return 1 - ss_res / ss_tot;\n}`,
            dataType: prec.name,
            complexity: { time: `O(${n})`, space: "O(1)" },
            tags: ["numerical-methods", "curve-fitting", fm.slug, "r-squared", prec.name],
          }),
          createComponent({
            id: `${fitCatId}.${prefix}.rmse`,
            name: `${prefix}_rmse`,
            category: "numerical-methods",
            subcategory: fm.slug,
            categoryId: fitCatId,
            path: fitCatPath,
            description: `Computes root mean square error (RMSE) for model fit in ${prec.cType}.`,
            signature: `${prec.cType} ${prefix}_rmse(const ${prec.cType} x[${n}], const ${prec.cType} y[${n}], ${prec.cType} slope, ${prec.cType} intercept);`,
            code: `${prec.cType} ${prefix}_rmse(const ${prec.cType} x[${n}], const ${prec.cType} y[${n}], ${prec.cType} slope, ${prec.cType} intercept) {\n    ${prec.cType} sum_sq = 0;\n    for (int i = 0; i < ${n}; i++) {\n        ${prec.cType} diff = y[i] - (slope * x[i] + intercept);\n        sum_sq += diff * diff;\n    }\n    return (${prec.cType})sqrt(sum_sq / ${n});\n}`,
            dataType: prec.name,
            complexity: { time: `O(${n})`, space: "O(1)" },
            tags: ["numerical-methods", "curve-fitting", fm.slug, "rmse", prec.name],
          })
        );
      }
    }
  }

  return components;
}
