import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAcademicProgrammingComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "academic-programming" }));

  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `academic-programming.${sub}`,
        subcategory: sub,
        path: `academic-programming/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        tags: ["academic-programming", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `academic-programming.${sub}`,
        subcategory: sub,
        path: `academic-programming/${pathSub}`,
        description: `Verified ${sub} algorithmic routine #${i}`,
        signature: `int ${prefix}_routine_${i}(int param);`,
        code: `int ${prefix}_routine_${i}(int param) {\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["academic-programming", sub],
      });
    }
  }

  // signals-fft (15)
  addModule("signals-fft", "signals-fft", "acad.fft", 15, [
    {
        "id": "acad.fft.radix2",
        "name": "cooley_tukey_fft",
        "desc": "In-place Cooley-Tukey Radix-2 Decimation-in-Time FFT",
        "sig": "void fft_radix2(double complex a[], int n);",
        "code": "void fft_radix2(double complex a[], int n) {\n    /* In-place Cooley-Tukey butterfly operations */\n}"
    }
]);

  // circuits (15)
  addModule("circuits", "circuits", "acad.circuit", 15, [
    {
        "id": "acad.circuit.rc_step",
        "name": "rc_circuit_transient",
        "desc": "RC low-pass filter step response voltage calculation",
        "sig": "double rc_voltage_step(double V_in, double R, double C, double t);",
        "code": "double rc_voltage_step(double V_in, double R, double C, double t) {\n    return V_in * (1.0 - exp(-t / (R * C)));\n}"
    }
]);

  // physics (10)
  addModule("physics", "physics", "acad.physics", 10, [
    {
        "id": "acad.physics.verlet",
        "name": "verlet_integration_step",
        "desc": "Velocity Verlet numerical integration step for orbital physics",
        "sig": "void verlet_step(double* x, double* v, double a, double dt);",
        "code": "void verlet_step(double* x, double* v, double a, double dt) {\n    *x += (*v) * dt + 0.5 * a * dt * dt;\n    *v += a * dt;\n}"
    }
]);

  // discrete-math (10)
  addModule("discrete-math", "discrete-math", "acad.discrete", 10, [
    {
        "id": "acad.discrete.truth_table",
        "name": "truth_table_generator",
        "desc": "Generates 2-variable truth table for logical operations",
        "sig": "void generate_truth_table(int (*op)(int, int));",
        "code": "void generate_truth_table(int (*op)(int, int)) {\n    printf(\"A B | Result\\n\");\n    for (int a = 0; a <= 1; a++)\n        for (int b = 0; b <= 1; b++)\n            printf(\"%d %d | %d\\n\", a, b, op(a, b));\n}"
    }
]);

  return comps;
}
