import { ParsedCommand } from "@dtyp/types";

const CATEGORY_ALIASES: Record<string, string> = {
  linkedlist: "linked-list",
  linked_list: "linked-list",
  ll: "linked-list",
  dp: "dynamic-programming",
  dynamicprogramming: "dynamic-programming",
  num: "numerical-methods",
  numerical: "numerical-methods",
  math: "fundamentals",
  fundamental: "fundamentals",
  sort: "sorting",
  search: "searching",
  backtrack: "recursion-backtracking",
  backtracking: "recursion-backtracking",
  tree: "tree",
  trees: "tree",
  graph: "graph",
  graphs: "graph",
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
   * Parses command syntax: `category>component(arg1, arg2)`
   */
  public static parse(input: string): ParsedCommand | null {
    const trimmed = input.trim();
    if (!trimmed.includes(">")) {
      return null;
    }

    const parts = trimmed.split(">");
    if (parts.length < 2) return null;

    const rawCategory = parts[0].trim();
    const rest = parts.slice(1).join(">").trim();

    if (!rawCategory || !rest) return null;

    const parenOpen = rest.indexOf("(");
    let component = rest;
    const args: string[] = [];

    if (parenOpen !== -1) {
      component = rest.substring(0, parenOpen).trim();
      const parenClose = rest.lastIndexOf(")");
      if (parenClose !== -1 && parenClose > parenOpen) {
        const argString = rest.substring(parenOpen + 1, parenClose).trim();
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
      category: this.normalizeCategory(rawCategory),
      component,
      arguments: args,
    };
  }
}
