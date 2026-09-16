import * as vscode from "vscode";
import { DefaultLibraryEngine } from "@dtyp/library-engine";

export class DTypHoverProvider implements vscode.HoverProvider {
  constructor(private libraryEngine: DefaultLibraryEngine) {}

  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Hover | null> {
    const range = document.getWordRangeAtPosition(position);
    if (!range) return null;

    const word = document.getText(range);
    const searchResults = await this.libraryEngine.search(word);
    const exactMatch = searchResults.find((c) => c.name === word);

    if (!exactMatch) return null;

    const md = new vscode.MarkdownString();
    md.appendMarkdown(`### dTyp: \`${exactMatch.name}()\`\n\n`);
    md.appendMarkdown(`${exactMatch.description}\n\n`);
    md.appendCodeblock(exactMatch.signature, "c");
    md.appendMarkdown(`\n- **Category**: \`${exactMatch.category}\`\n`);
    md.appendMarkdown(`- **Time Complexity**: \`${exactMatch.complexity.time}\`\n`);
    md.appendMarkdown(`- **Space Complexity**: \`${exactMatch.complexity.space}\`\n`);

    if (exactMatch.dependencies.length > 0) {
      md.appendMarkdown(`- **Dependencies**: ${exactMatch.dependencies.map((d) => `\`${d}\``).join(", ")}\n`);
    } else {
      md.appendMarkdown(`- **Dependencies**: None\n`);
    }

    return new vscode.Hover(md, range);
  }
}
