import * as vscode from "vscode";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { DefaultLibraryEngine } from "@dtyp/library-engine";

export class DiagnosticsManager {
  private static outputChannel: vscode.OutputChannel | undefined;

  public static async runHealthCheck(libraryEngine: DefaultLibraryEngine, context: vscode.ExtensionContext): Promise<void> {
    if (!this.outputChannel) {
      this.outputChannel = vscode.window.createOutputChannel("dTyp Diagnostics");
    }
    this.outputChannel.clear();
    this.outputChannel.show(true);

    this.outputChannel.appendLine("=================================================");
    this.outputChannel.appendLine("           dTyp System Health Check              ");
    this.outputChannel.appendLine("=================================================");
    this.outputChannel.appendLine(`Timestamp: ${new Date().toISOString()}`);
    this.outputChannel.appendLine(`VS Code Version: ${vscode.version}`);
    this.outputChannel.appendLine(`Extension Version: ${context.extension.packageJSON.version}`);
    this.outputChannel.appendLine(`OS: ${os.type()} ${os.release()} (${os.arch()})`);
    this.outputChannel.appendLine(`Node Version: ${process.version}`);
    this.outputChannel.appendLine(`Memory Usage (RSS): ${Math.round(process.memoryUsage().rss / (1024 * 1024))} MB`);
    this.outputChannel.appendLine("-------------------------------------------------");

    // 1. Check WASM Files
    const distWasm = path.join(context.extensionPath, "dist", "sql-wasm.wasm");
    const libWasm = path.join(context.extensionPath, "library", "sql-wasm.wasm");
    const distWasmExists = fs.existsSync(distWasm);
    const libWasmExists = fs.existsSync(libWasm);

    this.outputChannel.appendLine(`WASM Asset (dist): ${distWasmExists ? "✓ OK" : "✗ MISSING"} (${distWasm})`);
    this.outputChannel.appendLine(`WASM Asset (library): ${libWasmExists ? "✓ OK" : "✗ MISSING"} (${libWasm})`);

    // 2. Query SQLite Database
    let dbStatus = "UNKNOWN";
    let componentCount = 0;
    const startMs = Date.now();
    try {
      componentCount = await libraryEngine.count();
      const elapsed = Date.now() - startMs;
      dbStatus = `✓ HEALTHY (${componentCount.toLocaleString()} components queried in ${elapsed}ms)`;
    } catch (err: any) {
      dbStatus = `✗ ERROR: ${err.message}`;
    }
    this.outputChannel.appendLine(`Database Status: ${dbStatus}`);

    // 3. Check Configuration
    const config = vscode.workspace.getConfiguration("dtyp");
    this.outputChannel.appendLine("-------------------------------------------------");
    this.outputChannel.appendLine("Configuration:");
    this.outputChannel.appendLine(`  Typing Mode: ${config.get("typingMode")}`);
    this.outputChannel.appendLine(`  Step Size (manual): ${config.get("stepSize")}`);
    this.outputChannel.appendLine(`  Typing Delay (auto): ${config.get("typingDelayMs")}ms`);
    this.outputChannel.appendLine(`  Check Duplicates: ${config.get("checkDuplicates")}`);
    this.outputChannel.appendLine(`  Auto Include Headers: ${config.get("autoIncludeHeaders")}`);
    this.outputChannel.appendLine(`  Check For Updates: ${config.get("checkForUpdates")}`);
    this.outputChannel.appendLine("=================================================");

    const isHealthy = distWasmExists && componentCount > 0;
    const reportText = `dTyp Health Check: ${isHealthy ? "All Systems Healthy" : "Issues Detected"} (${componentCount.toLocaleString()} components loaded)`;

    const choice = await vscode.window.showInformationMessage(
      reportText,
      "Copy Full Report",
      "Report Issue on GitHub"
    );

    if (choice === "Copy Full Report") {
      const fullLog = `dTyp Diagnostic Report\nOS: ${os.type()} ${os.release()} (${os.arch()})\nVS Code: ${vscode.version}\nExtension: v${context.extension.packageJSON.version}\nComponents: ${componentCount}\nWASM Dist: ${distWasmExists}\nWASM Lib: ${libWasmExists}\nMemory: ${Math.round(process.memoryUsage().rss / (1024 * 1024))}MB`;
      await vscode.env.clipboard.writeText(fullLog);
      vscode.window.showInformationMessage("Diagnostic report copied to clipboard!");
    } else if (choice === "Report Issue on GitHub") {
      this.reportIssue(context, componentCount);
    }
  }

  public static reportIssue(context: vscode.ExtensionContext, compCount = 0): void {
    const version = context.extension.packageJSON.version;
    const body = encodeURIComponent(`### Environment\n- OS: ${os.type()} ${os.release()} (${os.arch()})\n- VS Code: ${vscode.version}\n- dTyp Extension: v${version}\n- Loaded Components: ${compCount}\n\n### Describe the Issue\n[Write a concise description of what happened]\n\n### Steps to Reproduce\n1. \n2. \n\n### Expected Behavior\n\n### Actual Behavior\n`);
    const url = `https://github.com/mujahidalmahi/dTyp/issues/new?title=%5BBug%5D+&body=${body}`;
    vscode.env.openExternal(vscode.Uri.parse(url));
  }
}
