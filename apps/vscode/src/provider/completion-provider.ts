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

    // Look for category> pattern
    const lastWord = linePrefix.trim().split(/\s+/).pop() || "";
    if (!lastWord.includes(">")) {
      return [];
    }

    const parts = lastWord.split(">");
    const rawCat = parts[0];
    const normalizedCat = CommandParser.normalizeCategory(rawCat);

    const components = await this.libraryEngine.getByCategory(normalizedCat);
    if (!components || components.length === 0) {
      return [];
    }

    return components.map((comp) => {
      const item = new vscode.CompletionItem(
        `${comp.name}()`,
        vscode.CompletionItemKind.Function
      );

      item.detail = comp.signature;
      item.documentation = new vscode.MarkdownString(
        `**${comp.description}**\n\n` +
        `\`\`\`c\n${comp.signature}\n\`\`\`\n\n` +
        `- **Time Complexity**: \`${comp.complexity.time}\`\n` +
        `- **Space Complexity**: \`${comp.complexity.space}\`\n` +
        `- **Dependencies**: ${comp.dependencies.length > 0 ? comp.dependencies.join(", ") : "None"}`
      );

      // Trigger character-by-character typing insertion command
      item.command = {
        command: "dtyp.insertComponent",
        title: "Insert Component Character-by-Character",
        arguments: [comp.id],
      };

      // Range to replace the prefix `category>`
      const startChar = position.character - (lastWord.length - (lastWord.indexOf(">") + 1));
      item.range = new vscode.Range(position.line, startChar, position.line, position.character);

      return item;
    });
  }
}
