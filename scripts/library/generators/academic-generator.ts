import { Component } from "@dtyp/types";
import { generateAcademicDiscreteComponents } from "./academic-discrete-generator.js";
import { generateAcademicNumericalComponents } from "./academic-numerical-generator.js";
import { generateAcademicCalculusComponents } from "./academic-calculus-generator.js";
import { generateAcademicLinearAlgebraComponents } from "./academic-linear-algebra-generator.js";
import { generateAcademicOdeComponents } from "./academic-ode-generator.js";
import { generateAcademicPhysicsMechanicsComponents } from "./academic-physics-mechanics-generator.js";
import { generateAcademicStatisticsComponents } from "./academic-statistics-generator.js";

export function generateAcademicProgrammingComponents(): Component[] {
  const components: Component[] = [];

  // Discrete Mathematics (Topics 1 - 6)
  components.push(...generateAcademicDiscreteComponents());

  // Numerical Methods (Topics 7 - 22)
  components.push(...generateAcademicNumericalComponents());

  // Calculus (Topics 23 - 28)
  components.push(...generateAcademicCalculusComponents());

  // Coordinate Geometry & Linear Algebra (Topics 29 - 34)
  components.push(...generateAcademicLinearAlgebraComponents());

  // Differential Equations (Topics 35 - 39)
  components.push(...generateAcademicOdeComponents());

  // Physics & Mechanics (Topics 40 - 50)
  components.push(...generateAcademicPhysicsMechanicsComponents());

  // Statistics (Topics 51 - 56)
  components.push(...generateAcademicStatisticsComponents());

  return components;
}
