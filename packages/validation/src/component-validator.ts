import { Component, Snippet, Template } from "@dtyp/types";
import { ValidationResult } from "./session-validator.js";

export const validateComponent = (component: unknown): ValidationResult => {
  const errors: string[] = [];
  if (!component || typeof component !== "object") {
    return { valid: false, errors: ["Component must be an object"] };
  }

  const c = component as Partial<Component>;
  if (!c.id || typeof c.id !== "string" || !c.id.includes(".")) {
    errors.push("Component id must be namespaced (e.g., 'category.name')");
  }
  if (!c.name || typeof c.name !== "string") {
    errors.push("Component requires a valid name");
  }
  if (!c.category || typeof c.category !== "string") {
    errors.push("Component requires a valid category");
  }
  if (!c.signature || typeof c.signature !== "string") {
    errors.push("Component requires a valid signature");
  }
  if (!c.code || typeof c.code !== "string" || c.code.trim().length === 0) {
    errors.push("Component requires non-empty C code");
  }

  // Basic C syntax check: balanced braces and parentheses
  if (c.code) {
    let openBraces = 0;
    let openParens = 0;
    for (const char of c.code) {
      if (char === "{") openBraces++;
      if (char === "}") openBraces--;
      if (char === "(") openParens++;
      if (char === ")") openParens--;
    }
    if (openBraces !== 0) {
      errors.push(`Unbalanced curly braces in component code (delta: ${openBraces})`);
    }
    if (openParens !== 0) {
      errors.push(`Unbalanced parentheses in component code (delta: ${openParens})`);
    }
  }

  if (!c.complexity || typeof c.complexity !== "object") {
    errors.push("Component requires complexity metadata (time and space)");
  } else {
    if (!c.complexity.time) errors.push("Missing time complexity");
    if (!c.complexity.space) errors.push("Missing space complexity");
  }

  if (!Array.isArray(c.dependencies)) {
    errors.push("Component dependencies must be an array");
  }

  return { valid: errors.length === 0, errors };
};

export const validateSnippet = (snippet: unknown): ValidationResult => {
  const errors: string[] = [];
  if (!snippet || typeof snippet !== "object") {
    return { valid: false, errors: ["Snippet must be an object"] };
  }

  const s = snippet as Partial<Snippet>;
  if (!s.id || typeof s.id !== "string") errors.push("Snippet requires an id");
  if (!s.prefix || typeof s.prefix !== "string") errors.push("Snippet requires a prefix");
  if (!s.body || typeof s.body !== "string") errors.push("Snippet requires a body");

  return { valid: errors.length === 0, errors };
};

export const validateTemplate = (template: unknown): ValidationResult => {
  const errors: string[] = [];
  if (!template || typeof template !== "object") {
    return { valid: false, errors: ["Template must be an object"] };
  }

  const t = template as Partial<Template>;
  if (!t.id || typeof t.id !== "string") errors.push("Template requires an id");
  if (!t.name || typeof t.name !== "string") errors.push("Template requires a name");
  if (!t.category || typeof t.category !== "string") errors.push("Template requires a category");
  if (!t.body || typeof t.body !== "string") errors.push("Template requires a body");

  return { valid: errors.length === 0, errors };
};
