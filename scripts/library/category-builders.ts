import { Component, Snippet, Template } from "@dtyp/types";

export interface ComponentDef {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  signature: string;
  code: string;
  time: string;
  space: string;
  dependencies?: string[];
  tags?: string[];
}

export const createComponent = (def: ComponentDef): Component => ({
  id: def.id,
  name: def.name,
  language: "c",
  category: def.category,
  subcategory: def.subcategory ?? def.category,
  description: def.description,
  signature: def.signature,
  code: def.code.trim(),
  complexity: {
    time: def.time,
    space: def.space,
  },
  dependencies: def.dependencies ?? [],
  tags: def.tags ?? [def.category],
  version: "1.0.0",
});

export const createSnippet = (
  id: string,
  prefix: string,
  body: string,
  description: string,
  category: string,
  componentId?: string
): Snippet => ({
  id,
  component_id: componentId,
  prefix,
  body,
  description,
  category,
});

export const createTemplate = (
  id: string,
  name: string,
  category: string,
  body: string,
  description: string
): Template => ({
  id,
  name,
  category,
  body,
  description,
});
