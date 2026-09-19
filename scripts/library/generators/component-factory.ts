import { Component, ComponentType, ComponentComplexity } from "@dtyp/types";

export interface CreateComponentOptions {
  id: string;
  name: string;
  type?: ComponentType;
  category: string;
  subcategory?: string;
  categoryId: string;
  path: string;
  description: string;
  signature: string;
  code: string;
  complexity?: ComponentComplexity;
  inputType?: string;
  outputType?: string;
  dataType?: string;
  representation?: string;
  implementationType?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  documentation?: string;
  dependencies?: string[];
  tags?: string[];
  aliases?: string[];
}

export function sanitizeCStringLiterals(code: string): string {
  let result = "";
  let inString = false;
  let inChar = false;
  let i = 0;

  while (i < code.length) {
    const ch = code[i];

    if (inString) {
      if (ch === "\\") {
        result += ch;
        i++;
        if (i < code.length) {
          result += code[i];
          i++;
        }
        continue;
      } else if (ch === '"') {
        inString = false;
        result += ch;
        i++;
        continue;
      } else if (ch === "\r" && i + 1 < code.length && code[i + 1] === "\n") {
        result += "\\n";
        i += 2;
        continue;
      } else if (ch === "\n") {
        result += "\\n";
        i++;
        continue;
      } else if (ch === "\0") {
        result += "\\0";
        i++;
        continue;
      } else {
        result += ch;
        i++;
        continue;
      }
    }

    if (inChar) {
      if (ch === "\\") {
        result += ch;
        i++;
        if (i < code.length) {
          result += code[i];
          i++;
        }
        continue;
      } else if (ch === "'") {
        inChar = false;
        result += ch;
        i++;
        continue;
      } else if (ch === "\r" && i + 1 < code.length && code[i + 1] === "\n") {
        result += "\\n";
        i += 2;
        continue;
      } else if (ch === "\n") {
        result += "\\n";
        i++;
        continue;
      } else if (ch === "\0") {
        result += "\\0";
        i++;
        continue;
      } else {
        result += ch;
        i++;
        continue;
      }
    }

    // Check for comment starts
    if (ch === "/" && i + 1 < code.length && code[i + 1] === "/") {
      while (i < code.length && code[i] !== "\n") {
        result += code[i];
        i++;
      }
      continue;
    }

    if (ch === "/" && i + 1 < code.length && code[i + 1] === "*") {
      result += "/*";
      i += 2;
      while (i < code.length && !(code[i] === "*" && i + 1 < code.length && code[i + 1] === "/")) {
        result += code[i];
        i++;
      }
      if (i < code.length) {
        result += "*/";
        i += 2;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      result += ch;
      i++;
      continue;
    }

    if (ch === "'") {
      inChar = true;
      result += ch;
      i++;
      continue;
    }

    result += ch;
    i++;
  }

  return result;
}

export function createComponent(opts: CreateComponentOptions): Component {
  const complexity: ComponentComplexity = opts.complexity || {
    time: "O(1)",
    space: "O(1)",
  };

  const aliases: string[] = Array.from(
    new Set([
      opts.name,
      opts.id,
      `${opts.category}>${opts.name}()`,
      `${opts.path.replace(/\//g, ">")}>${opts.name}()`,
      ...(opts.aliases || []),
    ])
  );

  return {
    id: opts.id,
    name: opts.name,
    language: "c",
    type: opts.type || "function",
    categoryId: opts.categoryId,
    category: opts.category,
    subcategory: opts.subcategory,
    path: opts.path,
    description: opts.description,
    signature: opts.signature,
    code: sanitizeCStringLiterals(opts.code).trim(),
    complexity,
    inputType: opts.inputType,
    outputType: opts.outputType,
    dataType: opts.dataType,
    representation: opts.representation,
    implementationType: opts.implementationType,
    difficulty: opts.difficulty || "intermediate",
    documentation: opts.documentation || `### ${opts.name}\n\n${opts.description}\n\n- **Time**: \`${complexity.time}\`\n- **Space**: \`${complexity.space}\``,
    version: "1.0.0",
    dependencies: opts.dependencies || [],
    tags: opts.tags || [opts.category],
    aliases,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
