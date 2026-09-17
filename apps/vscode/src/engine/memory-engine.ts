import * as vscode from "vscode";
import { defaultLogger } from "@dtyp/utilities";

export interface AllocationInfo {
  variableName: string;
  allocationType: "malloc" | "calloc" | "realloc";
  line: number;
  hasMatchingFree: boolean;
  isUnsafeRealloc?: boolean;
}

export class MemoryEngine implements vscode.Disposable, vscode.CodeActionProvider {
  private logger = defaultLogger.child("MemoryEngine");
  private disposables: vscode.Disposable[] = [];
  private diagnosticCollection: vscode.DiagnosticCollection;

  constructor() {
    this.diagnosticCollection = vscode.languages.createDiagnosticCollection("dtyp-memory");
    this.disposables.push(this.diagnosticCollection);
    this.logger.info("MemoryEngine initialized with diagnostic collection");
  }

  public getDiagnosticCollection(): vscode.DiagnosticCollection {
    return this.diagnosticCollection;
  }

  /**
   * Tracks an active VS Code disposable for safe teardown.
   */
  public registerDisposable(d: vscode.Disposable): void {
    this.disposables.push(d);
  }

  /**
   * Analyzes an open text document and updates VS Code diagnostic squiggles.
   */
  public updateDiagnostics(document: vscode.TextDocument): void {
    if (document.languageId !== "c" && document.languageId !== "cpp") {
      this.diagnosticCollection.delete(document.uri);
      return;
    }

    const config = vscode.workspace.getConfiguration("dtyp");
    const enabled = config.get<boolean>("analyzeMemoryAllocations", true);
    if (!enabled) {
      this.diagnosticCollection.delete(document.uri);
      return;
    }

    const code = document.getText();
    const allocations = MemoryEngine.analyzeAllocations(code);
    const diagnostics: vscode.Diagnostic[] = [];

    for (const alloc of allocations) {
      if (!alloc.hasMatchingFree) {
        const lineIdx = Math.max(0, alloc.line - 1);
        const line = document.lineAt(lineIdx);
        const colStart = Math.max(0, line.text.indexOf(alloc.variableName));
        const colEnd = colStart + alloc.variableName.length;
        const range = new vscode.Range(lineIdx, colStart, lineIdx, colEnd);

        const diag = new vscode.Diagnostic(
          range,
          `dTyp: Potential memory leak! Pointer '${alloc.variableName}' allocated via ${alloc.allocationType}() without corresponding free().`,
          vscode.DiagnosticSeverity.Warning
        );
        diag.source = "dTyp Memory Guard";
        diag.code = "dtyp.memory.leak";
        diagnostics.push(diag);
      }

      if (alloc.isUnsafeRealloc) {
        const lineIdx = Math.max(0, alloc.line - 1);
        const line = document.lineAt(lineIdx);
        const range = line.range;

        const diag = new vscode.Diagnostic(
          range,
          `dTyp: Unsafe realloc reassignment on '${alloc.variableName}'. If realloc() fails, original memory address is leaked. Use a temporary pointer.`,
          vscode.DiagnosticSeverity.Information
        );
        diag.source = "dTyp Memory Guard";
        diag.code = "dtyp.memory.unsafe_realloc";
        diagnostics.push(diag);
      }
    }

    this.diagnosticCollection.set(document.uri, diagnostics);
  }

  /**
   * Provides Quick Fix code actions for memory diagnostics.
   */
  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
    context: vscode.CodeActionContext
  ): vscode.CodeAction[] {
    const actions: vscode.CodeAction[] = [];

    for (const diag of context.diagnostics) {
      if (diag.code === "dtyp.memory.leak") {
        const varMatch = /Pointer '(\w+)'/.exec(diag.message);
        const varName = varMatch ? varMatch[1] : null;
        if (varName) {
          const fix = new vscode.CodeAction(
            `dTyp: Insert safe free(${varName}) deallocation`,
            vscode.CodeActionKind.QuickFix
          );
          fix.diagnostics = [diag];
          fix.isPreferred = true;

          // Locate nearest return or end of function to place free
          const docText = document.getText();
          const returnRegex = new RegExp(`\\breturn\\b`, "g");
          let match: RegExpExecArray | null;
          let targetLine = document.lineCount - 1;

          while ((match = returnRegex.exec(docText)) !== null) {
            const pos = document.positionAt(match.index);
            if (pos.line > range.start.line) {
              targetLine = pos.line;
              break;
            }
          }

          const insertPos = new vscode.Position(targetLine, 0);
          const snippet = `    if (${varName} != NULL) {\n        free(${varName});\n        ${varName} = NULL;\n    }\n`;
          fix.edit = new vscode.WorkspaceEdit();
          fix.edit.insert(document.uri, insertPos, snippet);
          actions.push(fix);
        }
      }
    }

    return actions;
  }

  /**
   * Scans C code for dynamic heap allocations and identifies whether corresponding free() exists.
   */
  public static analyzeAllocations(code: string): AllocationInfo[] {
    const lines = code.split("\n");
    const allocations: AllocationInfo[] = [];

    const allocRegex = /(?:(\w+)\s*=\s*(?:\([^)]+\)\s*)?|(?:\w+\s*\*\s*)(\w+)\s*=\s*(?:\([^)]+\)\s*)?)(malloc|calloc|realloc)\s*\(/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(allocRegex);
      if (match) {
        const varName = match[1] || match[2];
        const allocType = match[3] as "malloc" | "calloc" | "realloc";
        if (varName) {
          const freeRegex = new RegExp(`\\bfree\\s*\\(\\s*${varName}\\s*\\)`);
          const hasMatchingFree = freeRegex.test(code);

          // Check if unsafe direct realloc assignment: ptr = realloc(ptr, ...)
          const isUnsafeRealloc =
            allocType === "realloc" &&
            new RegExp(`\\b${varName}\\s*=\\s*(?:\\([^)]+\\)\\s*)?realloc\\s*\\(\\s*${varName}\\b`).test(line);

          allocations.push({
            variableName: varName,
            allocationType: allocType,
            line: i + 1,
            hasMatchingFree,
            isUnsafeRealloc,
          });
        }
      }
    }

    return allocations;
  }

  /**
   * Generates a safe pointer deallocation snippet.
   */
  public static generateFreeSnippet(varName: string): string {
    return `if (${varName} != NULL) {\n    free(${varName});\n    ${varName} = NULL;\n}`;
  }

  public dispose(): void {
    this.logger.info(`Disposing ${this.disposables.length} tracked resources in MemoryEngine`);
    this.diagnosticCollection.clear();
    for (const d of this.disposables) {
      try {
        d.dispose();
      } catch (err) {
        // ignore
      }
    }
    this.disposables = [];
  }
}
