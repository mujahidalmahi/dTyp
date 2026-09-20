import * as vscode from "vscode";
import * as path from "node:path";
import * as fs from "node:fs";
import { defaultLogger } from "@dtyp/utilities";

export class CompilerRunner implements vscode.CodeLensProvider {
  private static terminal: vscode.Terminal | null = null;
  private logger = defaultLogger.child("CompilerRunner");

  /**
   * Compiles and executes the active or provided C/C++ file in the VS Code terminal.
   */
  public static async compileAndRun(doc?: vscode.TextDocument): Promise<void> {
    const document = doc ?? vscode.window.activeTextEditor?.document;
    if (!document) {
      vscode.window.showWarningMessage("dTyp: Open a C or C++ file to compile and run.");
      return;
    }

    if (document.languageId !== "c" && document.languageId !== "cpp") {
      vscode.window.showWarningMessage("dTyp: Active document is not a C/C++ source file.");
      return;
    }

    // Save dirty files before compiling
    if (document.isDirty) {
      await document.save();
    }

    const filePath = document.uri.fsPath;
    const fileDir = path.dirname(filePath);
    const fileExt = path.extname(filePath).toLowerCase();
    const fileNameWithoutExt = path.basename(filePath, fileExt);
    const isCpp = document.languageId === "cpp" || fileExt === ".cpp" || fileExt === ".cc" || fileExt === ".cxx";

    const isWindows = process.platform === "win32";
    const exeName = isWindows ? `${fileNameWithoutExt}.exe` : fileNameWithoutExt;
    const exePath = path.join(fileDir, exeName);

    // Choose compiler and standard flags
    const compiler = isCpp ? "g++" : "gcc";
    const stdFlag = isCpp ? "-std=c++17" : "-std=c11";
    const compileFlags = `-Wall -Wextra ${stdFlag} -O2`;

    // Format cross-platform compilation & execution command line
    let commandLine = "";
    if (isWindows) {
      // Handles both PowerShell and CMD in VS Code Windows
      commandLine = `${compiler} ${compileFlags} "${filePath}" -o "${exePath}"; if ($LASTEXITCODE -eq 0) { & "${exePath}" }`;
    } else {
      commandLine = `${compiler} ${compileFlags} "${filePath}" -o "${exePath}" && "${exePath}"`;
    }

    // Get or create dedicated terminal
    if (!CompilerRunner.terminal || CompilerRunner.terminal.exitStatus !== undefined) {
      CompilerRunner.terminal = vscode.window.createTerminal({
        name: "dTyp C/C++ Runner",
        iconPath: new vscode.ThemeIcon("play"),
      });
    }

    CompilerRunner.terminal.show(true);
    CompilerRunner.terminal.sendText(commandLine);
    vscode.window.setStatusBarMessage(`$(play) dTyp: Running ${fileNameWithoutExt} (${compiler})...`, 3500);
  }

  /**
   * CodeLens Provider: Adds a "Run with GCC / G++" action directly above main()
   */
  public provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
    if (document.languageId !== "c" && document.languageId !== "cpp") {
      return [];
    }

    const codeLenses: vscode.CodeLens[] = [];
    const mainRegex = /\b(?:int|void)\s+main\s*\([^)]*\)/;

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const match = mainRegex.exec(line.text);
      if (match) {
        const position = new vscode.Position(i, match.index);
        const range = new vscode.Range(position, position);

        const isCpp = document.languageId === "cpp";
        const compilerName = isCpp ? "G++" : "GCC";

        codeLenses.push(
          new vscode.CodeLens(range, {
            title: `$(play) Run with ${compilerName} (Ctrl+F5)`,
            command: "dtyp.compileAndRun",
            arguments: [document],
            tooltip: `Compile with ${compilerName} -Wall -Wextra and execute in integrated terminal`,
          })
        );
        break; // Only one main()
      }
    }

    return codeLenses;
  }
}
