import * as vscode from "vscode";
import { DefaultLibraryEngine } from "@dtyp/library-engine";
import { CommandParser } from "../parser/command-parser.js";

export class DTypCompletionProvider implements vscode.CompletionItemProvider {
  constructor(private libraryEngine: DefaultLibraryEngine) {}

  public async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): Promise<vscode.CompletionItem[]> {
    const linePrefix = document.lineAt(position).text.substring(0, position.character);

    // Look for path with >
    const lastWord = linePrefix.trim().split(/\s+/).pop() || "";
    if (!lastWord.includes(">")) {
      return [];
    }

    const segments = lastWord.split(">");
    const hasTrailingGt = lastWord.endsWith(">");
    
    // Category path is everything before the final segment (or all segments if ends with >)
    const catSegments = hasTrailingGt ? segments.slice(0, -1) : segments.slice(0, -1);
    const filterQuery = hasTrailingGt ? "" : segments[segments.length - 1].toLowerCase();

    const rawCategory = catSegments.join("/");
    const normalizedCat = CommandParser.normalizeCategory(rawCategory);

    const items: vscode.CompletionItem[] = [];

    // 1. Check for child subcategories to allow fluent hierarchical drilling
    const matchedCategory = await this.libraryEngine.findCategoryByPath(normalizedCat);
    if (matchedCategory) {
      const childCategories = await this.libraryEngine.getChildren(matchedCategory.id);
      for (const child of childCategories) {
        if (!filterQuery || child.slug.toLowerCase().includes(filterQuery) || child.name.toLowerCase().includes(filterQuery)) {
          const catItem = new vscode.CompletionItem(
            `${child.slug}>`,
            vscode.CompletionItemKind.Folder
          );
          catItem.detail = `Category: ${child.name}`;
          catItem.documentation = new vscode.MarkdownString(`Browse components in **${child.name}**\n\nPath: \`${child.path}\``);
          catItem.sortText = `0_${child.slug}`;
          items.push(catItem);
        }
      }
    }

    // 2. Fetch components matching this category or path
    let components = await this.libraryEngine.getByCategory(normalizedCat);
    if (components.length === 0 && matchedCategory) {
      components = await this.libraryEngine.getByCategoryId(matchedCategory.id);
    }
    if (components.length === 0) {
      // Try searching by path prefix
      components = await this.libraryEngine.search(normalizedCat, 100);
    }

    // Filter by query if present
    const filteredComponents = filterQuery
      ? components.filter((c) => c.name.toLowerCase().includes(filterQuery) || c.id.toLowerCase().includes(filterQuery))
      : components;

    for (const comp of filteredComponents.slice(0, 50)) {
      const item = new vscode.CompletionItem(
        `${comp.name}()`,
        vscode.CompletionItemKind.Function
      );

      item.detail = comp.signature;
      item.documentation = new vscode.MarkdownString(
        `### ${comp.name}\n\n` +
        `**${comp.description}**\n\n` +
        `\`\`\`c\n${comp.signature}\n\`\`\`\n\n` +
        `- **Path**: \`${comp.path}\`\n` +
        `- **Time Complexity**: \`${comp.complexity.time}\`\n` +
        `- **Space Complexity**: \`${comp.complexity.space}\`\n` +
        `- **Data Type**: \`${comp.dataType || "c"}\`\n` +
        `- **Dependencies**: ${comp.dependencies.length > 0 ? comp.dependencies.join(", ") : "None"}`
      );

      // Trigger character-by-character typing insertion pipeline
      item.command = {
        command: "dtyp.insertComponent",
        title: "Insert Component Character-by-Character",
        arguments: [comp.id],
      };

      // Range replacement
      const startChar = position.character - (hasTrailingGt ? 0 : filterQuery.length);
      item.range = new vscode.Range(position.line, startChar, position.line, position.character);
      item.sortText = `1_${comp.name}`;

      items.push(item);
    }

    return items;
  }
}
