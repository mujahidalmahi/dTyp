import * as vscode from "vscode";

export interface PlaceholderMatch {
  range: vscode.Range;
  placeholder: string;
}

export class CursorEngine {
  private static readonly PLACEHOLDER_PATTERNS = [
    /\/\*\s*TODO[^*]*\*\//g,
    /\/\*\s*INSERT[^*]*\*\//g,
    /<[a-zA-Z_][a-zA-Z0-9_]*>/g,
  ];

  public static jumpToFirstPlaceholder(editor: vscode.TextEditor, range: vscode.Range): boolean {
    const document = editor.document;
    const text = document.getText(range);

    for (const pattern of this.PLACEHOLDER_PATTERNS) {
      pattern.lastIndex = 0;
      const match = pattern.exec(text);
      if (match) {
        const startOffset = document.offsetAt(range.start) + match.index;
        const endOffset = startOffset + match[0].length;
        const targetRange = new vscode.Range(
          document.positionAt(startOffset),
          document.positionAt(endOffset)
        );

        editor.selection = new vscode.Selection(targetRange.start, targetRange.end);
        editor.revealRange(targetRange, vscode.TextEditorRevealType.InCenter);
        return true;
      }
    }

    editor.selection = new vscode.Selection(range.end, range.end);
    editor.revealRange(new vscode.Range(range.end, range.end), vscode.TextEditorRevealType.Default);
    return false;
  }

  public static findAllPlaceholders(document: vscode.TextDocument): PlaceholderMatch[] {
    const text = document.getText();
    const results: PlaceholderMatch[] = [];

    for (const pattern of this.PLACEHOLDER_PATTERNS) {
      pattern.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(text)) !== null) {
        const start = document.positionAt(match.index);
        const end = document.positionAt(match.index + match[0].length);
        results.push({
          range: new vscode.Range(start, end),
          placeholder: match[0],
        });
      }
    }

    return results.sort((a, b) => a.range.start.compareTo(b.range.start));
  }

  public static jumpToNextPlaceholder(editor: vscode.TextEditor): boolean {
    const placeholders = this.findAllPlaceholders(editor.document);
    if (placeholders.length === 0) return false;

    const currentPos = editor.selection.active;
    const next = placeholders.find((p) => p.range.start.isAfter(currentPos)) || placeholders[0];

    editor.selection = new vscode.Selection(next.range.start, next.range.end);
    editor.revealRange(next.range, vscode.TextEditorRevealType.InCenter);
    return true;
  }
}
