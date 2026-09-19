export interface CFunctionBlock {
  name: string;
  signature: string;
  body: string;
  returnStatement?: string;
  bodyBeforeReturn?: string;
  hasAllocCleanupPair?: boolean;
  allocStatement?: string;
  cleanupStatement?: string;
  bodyBetweenAlloc?: string;
  fullText: string;
}

export interface CMainBlock {
  signature: string;
  driverStatements: string;
  returnStatement: string;
  hasAllocCleanupPair?: boolean;
  allocStatement?: string;
  cleanupStatement?: string;
  fullText: string;
}

export interface CDecomposedProgram {
  headers: string[];
  macros: string[];
  types: string[];
  helperFunctions: CFunctionBlock[];
  mainFunction: CMainBlock | null;
  rawPreamble: string;
  isFullProgram: boolean;
  isSingleFunction?: boolean;
  primaryFunction?: CFunctionBlock;
}

export class CStructuralDecomposer {
  /**
   * Decomposes C source code into semantic authoring blocks.
   */
  public static decompose(source: string): CDecomposedProgram {
    const trimmed = source.trim();
    const headers: string[] = [];
    const macros: string[] = [];
    const types: string[] = [];
    const helperFunctions: CFunctionBlock[] = [];
    let mainFunction: CMainBlock | null = null;
    let rawPreamble = "";

    // Normalize newlines
    const lines = trimmed.split(/\r?\n/);
    let i = 0;

    // 1. Extract Headers and Macros at top of file
    while (i < lines.length) {
      const line = lines[i].trim();
      if (line.startsWith("#include")) {
        headers.push(line);
        i++;
      } else if (line.startsWith("#define")) {
        macros.push(line);
        i++;
      } else if (line === "" || line.startsWith("//") || line.startsWith("/*")) {
        // Comment or blank line at the top
        if (headers.length === 0 && macros.length === 0) {
          rawPreamble += lines[i] + "\n";
        }
        i++;
      } else {
        break;
      }
    }

    // 2. Scan remaining code for Structs/Typedefs and Functions
    const remainingText = lines.slice(i).join("\n").trim();
    if (remainingText.length > 0) {
      const blocks = this.extractTopLevelBlocks(remainingText);

      for (const block of blocks) {
        if (this.isTypeDefinition(block)) {
          types.push(block.trim());
        } else if (this.isFunction(block)) {
          const fn = this.parseFunction(block);
          if (fn) {
            if (fn.name === "main") {
              mainFunction = this.parseMainFunction(fn);
            } else {
              helperFunctions.push(fn);
            }
          } else {
            types.push(block.trim());
          }
        } else {
          types.push(block.trim());
        }
      }
    }

    const isFullProgram = mainFunction !== null && (headers.length > 0 || helperFunctions.length > 0);
    const isSingleFunction = mainFunction === null && helperFunctions.length === 1;
    const primaryFunction = isSingleFunction ? helperFunctions[0] : (helperFunctions.length > 0 ? helperFunctions[helperFunctions.length - 1] : undefined);

    return {
      headers,
      macros,
      types,
      helperFunctions,
      mainFunction,
      rawPreamble: rawPreamble.trim(),
      isFullProgram,
      isSingleFunction,
      primaryFunction,
    };
  }

  private static isTypeDefinition(block: string): boolean {
    const trimmed = block.trim();
    return (
      trimmed.startsWith("typedef struct") ||
      trimmed.startsWith("struct ") ||
      trimmed.startsWith("typedef enum") ||
      trimmed.startsWith("enum ") ||
      trimmed.startsWith("typedef union") ||
      trimmed.startsWith("union ")
    );
  }

  private static isFunction(block: string): boolean {
    const trimmed = block.trim();
    const openBrace = trimmed.indexOf("{");
    if (openBrace === -1) return false;
    const header = trimmed.slice(0, openBrace);
    // Functions have '(' and ')' in the signature before '{'
    return header.includes("(") && header.includes(")");
  }

  private static parseFunction(block: string): CFunctionBlock | null {
    const trimmed = block.trim();
    const openBrace = trimmed.indexOf("{");
    if (openBrace === -1) return null;

    const signature = trimmed.slice(0, openBrace).trim();
    // Extract function name before '('
    const parenIdx = signature.indexOf("(");
    if (parenIdx === -1) return null;
    const preParen = signature.slice(0, parenIdx).trim();
    const nameMatch = preParen.match(/([a-zA-Z0-9_]+)$/);
    const name = nameMatch ? nameMatch[1] : "unknown";

    // Extract body between outermost { and }
    const closeBrace = trimmed.lastIndexOf("}");
    const body = closeBrace > openBrace ? trimmed.slice(openBrace + 1, closeBrace) : "";

    // Parse return statement and preceding body
    const bodyLines = body.split(/\r?\n/);
    let returnStmt: string | undefined;
    let bodyBeforeReturn: string | undefined;

    for (let i = bodyLines.length - 1; i >= 0; i--) {
      const line = bodyLines[i].trim();
      if (line.startsWith("return ") || line === "return;" || line.startsWith("return(")) {
        returnStmt = line;
        const preceding = bodyLines.slice(0, i).filter((l) => l.trim().length > 0);
        if (preceding.length > 0) {
          bodyBeforeReturn = bodyLines.slice(0, i).join("\n");
        }
        break;
      }
    }

    // Check for malloc/calloc and free pairs
    let hasAllocCleanupPair = false;
    let allocStatement: string | undefined;
    let cleanupStatement: string | undefined;
    let bodyBetweenAlloc: string | undefined;

    let allocLineIdx = -1;
    let cleanupLineIdx = -1;
    for (let i = 0; i < bodyLines.length; i++) {
      const line = bodyLines[i].trim();
      if (allocLineIdx === -1 && (line.includes("malloc(") || line.includes("calloc(") || line.includes("fopen("))) {
        allocLineIdx = i;
        allocStatement = line;
      }
      if (line.startsWith("free(") || line.startsWith("fclose(")) {
        cleanupLineIdx = i;
        cleanupStatement = line;
      }
    }

    if (allocLineIdx !== -1 && cleanupLineIdx > allocLineIdx) {
      hasAllocCleanupPair = true;
      const between = bodyLines.slice(allocLineIdx + 1, cleanupLineIdx);
      if (between.some((l) => l.trim().length > 0)) {
        bodyBetweenAlloc = between.join("\n");
      }
    }

    return {
      name,
      signature,
      body,
      returnStatement: returnStmt,
      bodyBeforeReturn,
      hasAllocCleanupPair,
      allocStatement,
      cleanupStatement,
      bodyBetweenAlloc,
      fullText: trimmed,
    };
  }

  private static parseMainFunction(fn: CFunctionBlock): CMainBlock {
    const bodyLines = fn.body.split(/\r?\n/);
    const driverLines: string[] = [];
    let returnStmt = "return 0;";

    for (let i = bodyLines.length - 1; i >= 0; i--) {
      const line = bodyLines[i].trim();
      if (line.startsWith("return ") || line === "return;" || line.startsWith("return(")) {
        returnStmt = line;
        driverLines.unshift(...bodyLines.slice(0, i));
        break;
      }
    }

    if (driverLines.length === 0 && !fn.body.includes("return")) {
      driverLines.push(fn.body);
    }

    return {
      signature: fn.signature,
      driverStatements: driverLines.join("\n"),
      returnStatement: returnStmt,
      hasAllocCleanupPair: fn.hasAllocCleanupPair,
      allocStatement: fn.allocStatement,
      cleanupStatement: fn.cleanupStatement,
      fullText: fn.fullText,
    };
  }

  /**
   * Splits top-level C constructs handling nested curly braces and strings.
   */
  private static extractTopLevelBlocks(code: string): string[] {
    const blocks: string[] = [];
    let depth = 0;
    let inString = false;
    let inChar = false;
    let escaped = false;
    let blockStart = 0;

    for (let i = 0; i < code.length; i++) {
      const c = code[i];

      if (escaped) {
        escaped = false;
        continue;
      }
      if (c === "\\") {
        escaped = true;
        continue;
      }
      if (c === '"' && !inChar) {
        inString = !inString;
        continue;
      }
      if (c === "'" && !inString) {
        inChar = !inChar;
        continue;
      }
      if (inString || inChar) continue;

      if (c === "{") {
        depth++;
      } else if (c === "}") {
        depth--;
        if (depth === 0) {
          // Check if followed by typedef name or semicolon (e.g. `} Node;`)
          let end = i + 1;
          while (end < code.length && code[end] !== "\n" && code[end] !== ";") {
            end++;
          }
          if (end < code.length && code[end] === ";") {
            end++;
          }
          const block = code.slice(blockStart, end).trim();
          if (block) {
            blocks.push(block);
          }
          i = end;
          blockStart = i + 1;
        }
      }
    }

    const tail = code.slice(blockStart).trim();
    if (tail) {
      blocks.push(tail);
    }

    return blocks;
  }
}
