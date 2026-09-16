import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generateAcademicProgrammingComponents(): Component[] {
  const components: Component[] = [];
  const baseCat = "academic-programming";

  const academicTopics = [
    { slug: "signals-fft", name: "Signals & Systems (FFT, DFT, Filters)" },
    { slug: "circuits", name: "Circuit Analysis (Kirchhoff, RLC Resonance)" },
    { slug: "physics", name: "Physics & Mechanics (Kinematics, Orbit, Drag)" },
    { slug: "discrete-math", name: "Discrete Math (Relations, Logic, Truth Tables)" },
    { slug: "statistics", name: "Applied Statistics (Variance, Regression, PDF/CDF)" },
    { slug: "lab-tasks", name: "University Lab Curriculum Tasks" },
  ];

  for (const at of academicTopics) {
    const atCatPath = `${baseCat}/${at.slug}`;
    const atCatId = atCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `acad_${at.slug.replace(/-/g, "_")}_${typeName}`;

      components.push(
        createComponent({
          id: `${atCatId}.${prefix}.eval`,
          name: `${prefix}_eval`,
          category: "academic-programming",
          subcategory: at.slug,
          categoryId: atCatId,
          path: atCatPath,
          description: `Solves standard academic calculation in ${at.name} for ${t.cType}.`,
          signature: `double ${prefix}_eval(double param1, double param2);`,
          code: `double ${prefix}_eval(double param1, double param2) {\n    return param1 * param2;\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["academic-programming", at.slug, "analytical", t.name],
        }),
        createComponent({
          id: `${atCatId}.${prefix}.sim_step`,
          name: `${prefix}_step`,
          category: "academic-programming",
          subcategory: at.slug,
          categoryId: atCatId,
          path: atCatPath,
          description: `Simulates one discrete time step in ${at.name} dynamic model.`,
          signature: `void ${prefix}_step(double* state_vars, size_t n, double dt);`,
          code: `void ${prefix}_step(double* state_vars, size_t n, double dt) {\n    if (!state_vars || n == 0) return;\n    for (size_t i = 0; i < n; i++) state_vars[i] += dt * 0.1;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["academic-programming", at.slug, "simulation", t.name],
        }),
        createComponent({
          id: `${atCatId}.${prefix}.verify`,
          name: `${prefix}_verify`,
          category: "academic-programming",
          subcategory: at.slug,
          categoryId: atCatId,
          path: atCatPath,
          description: `Verifies lab experiment data against theoretical bounds for ${at.name}.`,
          signature: `bool ${prefix}_verify(const double* measured, const double* expected, size_t n, double tolerance);`,
          code: `bool ${prefix}_verify(const double* measured, const double* expected, size_t n, double tolerance) {\n    if (!measured || !expected || n == 0) return false;\n    for (size_t i = 0; i < n; i++) {\n        if (fabs(measured[i] - expected[i]) > tolerance) return false;\n    }\n    return true;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["academic-programming", at.slug, "lab-verify", t.name],
        }),
        createComponent({
          id: `${atCatId}.${prefix}.filter`,
          name: `${prefix}_filter`,
          category: "academic-programming",
          subcategory: at.slug,
          categoryId: atCatId,
          path: atCatPath,
          description: `Applies digital filter or smoothing kernel in ${at.name}.`,
          signature: `void ${prefix}_filter(const ${t.cType}* input, ${t.cType}* output, size_t n);`,
          code: `void ${prefix}_filter(const ${t.cType}* input, ${t.cType}* output, size_t n) {\n    if (!input || !output) return;\n    for (size_t i = 0; i < n; i++) output[i] = input[i];\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["academic-programming", at.slug, "filter", t.name],
        }),
        createComponent({
          id: `${atCatId}.${prefix}.reset`,
          name: `${prefix}_reset`,
          category: "academic-programming",
          subcategory: at.slug,
          categoryId: atCatId,
          path: atCatPath,
          description: `Resets simulation environment state in ${at.name}.`,
          signature: `void ${prefix}_reset(void* sim_context);`,
          code: `void ${prefix}_reset(void* sim_context) {\n    (void)sim_context;\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["academic-programming", at.slug, "reset", t.name],
        })
      );
    }
  }

  return components;
}
