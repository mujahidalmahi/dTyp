import { Component, Snippet } from "@dtyp/types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

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

  // Basic C syntax check: balanced braces and parentheses (ignoring strings, chars, and comments)
  if (c.code) {
    let openBraces = 0;
    let openParens = 0;
    let inString = false;
    let inChar = false;
    let inLineComment = false;
    let inBlockComment = false;
    let escaped = false;

    for (let i = 0; i < c.code.length; i++) {
      const char = c.code[i];
      const nextChar = i + 1 < c.code.length ? c.code[i + 1] : "";

      if (inLineComment) {
        if (char === "\n") inLineComment = false;
        continue;
      }

      if (inBlockComment) {
        if (char === "*" && nextChar === "/") {
          inBlockComment = false;
          i++; // skip closing /
        }
        continue;
      }

      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (inString) {
        if (char === '"') inString = false;
        continue;
      }

      if (inChar) {
        if (char === "'") inChar = false;
        continue;
      }

      // Check start of comments
      if (char === "/" && nextChar === "/") {
        inLineComment = true;
        i++;
        continue;
      }

      if (char === "/" && nextChar === "*") {
        inBlockComment = true;
        i++;
        continue;
      }

      if (char === '"') {
        inString = true;
        continue;
      }

      if (char === "'") {
        inChar = true;
        continue;
      }

      if (char === "{") openBraces++;
      else if (char === "}") openBraces--;
      else if (char === "(") openParens++;
      else if (char === ")") openParens--;
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
