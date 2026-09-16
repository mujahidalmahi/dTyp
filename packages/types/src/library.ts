export type ComponentType =
  | "function"
  | "struct"
  | "typedef"
  | "enum"
  | "macro"
  | "snippet"
  | "template"
  | "program"
  | "project"
  | "utility";

export interface ComponentComplexity {
  time: string;
  space: string;
}

export interface Category {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  path: string;
  depth: number;
  type: string;
  description?: string;
  sortOrder?: number;
}

export interface Component {
  id: string;
  name: string;
  language: string;
  type?: ComponentType;
  categoryId: string;
  category: string;
  subcategory?: string;
  path: string;
  description: string;
  signature: string;
  code: string;
  complexity: ComponentComplexity;
  inputType?: string;
  outputType?: string;
  dataType?: string;
  representation?: string;
  implementationType?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  documentation?: string;
  version: string;
  dependencies: string[];
  tags: string[];
  aliases?: string[];
  snippet?: string;
  template?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Snippet {
  id: string;
  component_id?: string;
  prefix: string;
  body: string;
  description?: string;
  category?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  body: string;
  description?: string;
}

export interface Tag {
  id?: number;
  name: string;
}

export interface Dependency {
  component_id: string;
  dependency_id: string;
  relationship_type?: string;
}

export interface Relationship {
  sourceId: string;
  targetId: string;
  relationshipType: "depends_on" | "related_to" | "alternative_to" | "extends" | "implements";
}

export interface Alias {
  id?: number;
  componentId: string;
  alias: string;
}

export interface ParsedCommand {
  raw: string;
  segments: string[];
  category: string;
  component: string;
  arguments: string[];
  isCategoryPath: boolean;
}

export interface LibraryEngine {
  findComponent(id: string): Promise<Component | null>;
  resolveAlias(alias: string): Promise<Component | null>;
  search(query: string, limit?: number): Promise<Component[]>;
  getByCategory(category: string): Promise<Component[]>;
  getByCategoryId(categoryId: string): Promise<Component[]>;
  getChildren(parentId?: string | null): Promise<Category[]>;
  findCategoryByPath(path: string): Promise<Category | null>;
  getDependencies(id: string): Promise<Component[]>;
  getSnippet(id: string): Promise<Snippet | null>;
  getTemplate(id: string): Promise<Template | null>;
  getCategories(): Promise<string[]>;
  getAllComponents(limit?: number, offset?: number): Promise<Component[]>;
  count(): Promise<number>;
}
