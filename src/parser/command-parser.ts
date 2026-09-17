export interface ParsedCommand {
  category: string;
  component: string;
  arguments: string[];
  raw?: string;
  segments?: string[];
  isCategoryPath?: boolean;
}

const CATEGORY_ALIASES: Record<string, string> = {
  boiler: "boiler-plates",
  boilerplate: "boiler-plates",
  boilerplates: "boiler-plates",
  "boiler-plate": "boiler-plates",
  "boiler-plates": "boiler-plates",
  linkedlist: "data-structures",
  linked_list: "data-structures",
  "linked-list": "data-structures",
  ll: "data-structures",
  ds: "data-structures",
  datastructures: "data-structures",
  "data-structures": "data-structures",
  stack: "data-structures",
  stacks: "data-structures",
  queue: "data-structures",
  queues: "data-structures",
  tree: "data-structures",
  trees: "data-structures",
  sorting: "algorithms",
  sort: "algorithms",
  searching: "algorithms",
  search: "algorithms",
  dp: "algorithms",
  dynamicprogramming: "algorithms",
  "dynamic-programming": "algorithms",
  algo: "algorithms",
  algorithms: "algorithms",
  cp: "competitive-programming",
  "competitive-programming": "competitive-programming",
  academic: "academics-programming",
  academics: "academics-programming",
  "academic-programming": "academics-programming",
  project: "projects",
  projects: "projects",
  detect: "detection",
  detection: "detection",
  detections: "detection",
};

export class CommandParser {
  /**
   * Normalizes category name according to known aliases.
   */
  public static normalizeCategory(rawCategory: string): string {
    const key = rawCategory.trim().toLowerCase();
    return CATEGORY_ALIASES[key] ?? key;
  }

  /**
   * Parses command syntax: `category>component(arg1, arg2)` or `cat>subcat>func()`
   */
  public static parse(input: string): ParsedCommand | null {
    const trimmed = input.trim();
    if (!trimmed.includes(">")) {
      return null;
    }

    const segments = trimmed.split(">");
    if (segments.length < 2) return null;

    const lastPart = segments[segments.length - 1].trim();
    const categoryParts = segments.slice(0, segments.length - 1).map((s) => s.trim()).filter(Boolean);

    if (categoryParts.length === 0 || !lastPart) return null;

    const rawCategory = categoryParts.length === 1 ? categoryParts[0] : categoryParts.join("/");
    const parenOpen = lastPart.indexOf("(");
    let component = lastPart;
    const args: string[] = [];

    if (parenOpen !== -1) {
      component = lastPart.substring(0, parenOpen).trim();
      const parenClose = lastPart.lastIndexOf(")");
      if (parenClose !== -1 && parenClose > parenOpen) {
        const argString = lastPart.substring(parenOpen + 1, parenClose).trim();
        if (argString) {
          argString.split(",").forEach((a) => {
            const clean = a.trim();
            if (clean) args.push(clean);
          });
        }
      }
    }

    if (!component) return null;

    return {
      raw: trimmed,
      segments: categoryParts.concat(component),
      category: this.normalizeCategory(rawCategory),
      component,
      arguments: args,
      isCategoryPath: categoryParts.length > 1,
    };
  }
}
