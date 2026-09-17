import * as vscode from "vscode";
import { defaultLogger } from "@dtyp/utilities";

export interface AllocationInfo {
  variableName: string;
  allocationType: "malloc" | "calloc" | "realloc";
  line: number;
  hasMatchingFree: boolean;
}

export class MemoryEngine implements vscode.Disposable {
  private logger = defaultLogger.child("MemoryEngine");
  private disposables: vscode.Disposable[] = [];

  constructor() {
    this.logger.info("MemoryEngine initialized");
  }

  /**
   * Tracks an active VS Code disposable for safe teardown.
   */
  public registerDisposable(d: vscode.Disposable): void {
    this.disposables.push(d);
  }

  /**
   * Scans C code for dynamic heap allocations and identifies whether corresponding free() exists.
   */
  public static analyzeAllocations(code: string): AllocationInfo[] {
    const lines = code.split("\n");
    const allocations: AllocationInfo[] = [];

    // Match patterns like: ptr = (Type*)malloc(...) or Type* ptr = malloc(...)
    const allocRegex = /(?:(\w+)\s*=\s*(?:\([^)]+\)\s*)?|(?:\w+\s*\*\s*)(\w+)\s*=\s*(?:\([^)]+\)\s*)?)(malloc|calloc|realloc)\s*\(/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(allocRegex);
      if (match) {
        const varName = match[1] || match[2];
        const allocType = match[3] as "malloc" | "calloc" | "realloc";
        if (varName) {
          // Check if free(varName) exists anywhere in code
          const freeRegex = new RegExp(`\\bfree\\s*\\(\\s*${varName}\\s*\\)`);
          const hasMatchingFree = freeRegex.test(code);
          allocations.push({
            variableName: varName,
            allocationType: allocType,
            line: i + 1,
            hasMatchingFree,
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
    return `if (${varName} != NULL) {\\n    free(${varName});\\n    ${varName} = NULL;\\n}`;
  }

  public dispose(): void {
    this.logger.info(`Disposing ${this.disposables.length} tracked resources in MemoryEngine`);
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
