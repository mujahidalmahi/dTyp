import { ParsedCommand } from "@dtyp/types";

const CATEGORY_ALIASES: Record<string, string> = {
  linkedlist: "linked-list",
  linked_list: "linked-list",
  ll: "linked-list",
  sorting: "sorting",
  sort: "sorting",
  searching: "searching",
  search: "searching",
  dp: "dynamic-programming",
  dynamicprogramming: "dynamic-programming",
  num: "numerical-methods",
  numerical: "numerical-methods",
  ds: "data-structures",
  datastructures: "data-structures",
  stack: "stack",
  stacks: "stack",
  queue: "queue",
  queues: "queue",
  tree: "tree",
  trees: "tree",
  graph: "graph",
  graphs: "graph",
  cp: "competitive-programming",
  patterns: "programming-patterns",
  academic: "academic-programming",
  projects: "projects",
  utilities: "utilities",
  basics: "c-basics",
  intermediate: "c-intermediate",
  advanced: "c-advanced",
  fundamentals: "fundamentals",
  math: "fundamentals",
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
