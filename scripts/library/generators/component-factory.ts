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
    code: opts.code.trim(),
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
