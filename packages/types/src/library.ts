export interface ComponentComplexity {
  time: string;
  space: string;
}

export interface Component {
  id: string;
  name: string;
  language: string;
  category: string;
  subcategory?: string;
  description: string;
  signature: string;
  code: string;
  complexity: ComponentComplexity;
  documentation?: string;
  version: string;
  dependencies: string[];
  tags: string[];
  snippet?: string;
  template?: string;
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
}

export interface ParsedCommand {
  category: string;
  component: string;
  arguments: string[];
}

export interface LibraryEngine {
  findComponent(id: string): Promise<Component | null>;
  search(query: string): Promise<Component[]>;
  getByCategory(category: string): Promise<Component[]>;
  getDependencies(id: string): Promise<Component[]>;
  getSnippet(id: string): Promise<Snippet | null>;
  getTemplate(id: string): Promise<Template | null>;
  getCategories(): Promise<string[]>;
  getAllComponents(limit?: number, offset?: number): Promise<Component[]>;
  count(): Promise<number>;
}
