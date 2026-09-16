import * as vscode from "vscode";
import { Snippet, LibraryEngine } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";

export class SnippetEngine implements vscode.CompletionItemProvider {
  private logger = defaultLogger.child("SnippetEngine");
  private snippets: Snippet[] = [];

  constructor(private libraryEngine: LibraryEngine) {}

  public async loadSnippets(): Promise<void> {
    try {
      this.snippets = await this.libraryEngine.getSnippets();
      this.logger.info(`Loaded ${this.snippets.length} snippets into snippet engine`);
    } catch (err: any) {
      this.logger.warn(`Failed to load snippets from library engine: ${err.message}`);
    }
  }

  public async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Promise<vscode.CompletionItem[]> {
    const linePrefix = document.lineAt(position).text.substring(0, position.character);
    const wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_.]+/);
    const currentWord = wordRange ? document.getText(wordRange) : "";

    if (!linePrefix.includes("dtyp.") && !currentWord.startsWith("dtyp")) {
      return [];
    }

    if (this.snippets.length === 0) {
      await this.loadSnippets();
    }

    return this.snippets.map((snip) => {
      const item = new vscode.CompletionItem(snip.prefix, vscode.CompletionItemKind.Snippet);
      item.detail = `dTyp Snippet: ${snip.description || snip.prefix}`;
      item.documentation = new vscode.MarkdownString(
        `### ${snip.description || snip.prefix}\n\nCategory: \`${snip.category || "general"}\`\n\n\`\`\`c\n${snip.body}\n\`\`\``
      );
      item.insertText = new vscode.SnippetString(snip.body);
      item.sortText = `0_${snip.prefix}`;
      return item;
    });
  }

  public getSnippets(): Snippet[] {
    return this.snippets;
  }
}
