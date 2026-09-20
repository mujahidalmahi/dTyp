import { TypingActionLandmark } from "@dtyp/types";
import { CDecomposedProgram, CFunctionBlock } from "./c-structural-decomposer.js";

export interface AuthoringStep {
  kind:
    | "headers"
    | "main_scaffold"
    | "types"
    | "helper_function"
    | "main_driver"
    | "function_scaffold"
    | "function_body"
    | "raw";
  code: string;
  cursorMoveBefore?: { lineOffset: number; column?: number; landmark?: TypingActionLandmark };
  pauseBeforeMs?: number;
  pauseAfterMs?: number;
  description: string;
}

export class NonlinearAuthoringPlanner {
  /**
   * Plans the realistic step-by-step authoring sequence for a C program or component.
   */
  public static plan(decomposed: CDecomposedProgram, rawSource: string): AuthoringStep[] {
    // 1. Full program with main()
    if (decomposed.isFullProgram && decomposed.mainFunction) {
      return this.planFullProgram(decomposed);
    }

    // 2. Single function component with return statement
    if (decomposed.isSingleFunction && decomposed.primaryFunction) {
      const fn = decomposed.primaryFunction;
      if (fn.returnStatement && fn.bodyBeforeReturn && fn.bodyBeforeReturn.trim().length > 0) {
        return this.planSingleFunction(decomposed, fn);
      }
    }

    // 3. Multi-function component without main()
    if (decomposed.helperFunctions.length > 1 && !decomposed.mainFunction) {
      return this.planMultiFunctionComponent(decomposed);
    }

    // Default: author directly
    return [
      {
        kind: "raw",
        code: rawSource,
        pauseBeforeMs: 100,
        pauseAfterMs: 300,
        description: "author component",
      },
    ];
  }

  private static planFullProgram(decomposed: CDecomposedProgram): AuthoringStep[] {
    const main = decomposed.mainFunction;
    if (!main) return [];

    const steps: AuthoringStep[] = [];

    // 1. Phase 1: Headers and Preprocessor Directives
    const allHeaders = [...decomposed.headers, ...decomposed.macros];
    let headerCode = "";
    if (allHeaders.length > 0) {
      headerCode = allHeaders.join("\n") + "\n\n";
    }

    // 2. Phase 1b: Scaffold minimal main() skeleton
    const returnLine = main.returnStatement.trim() || "return 0;";
    const mainScaffoldCode = `${main.signature} {\n\t${returnLine}\n}\n`;

    const initialCode = headerCode + mainScaffoldCode;

    steps.push({
      kind: "main_scaffold",
      code: initialCode,
      pauseBeforeMs: 150,
      pauseAfterMs: 650, // Cognitive break after writing basic template
      description: "author initial template (headers and main skeleton)",
    });

    // Count lines in main scaffold to calculate jump offset above main()
    const scaffoldLines = mainScaffoldCode.trim().split("\n").length; // e.g. 3 lines

    // 3. Phase 2: Structs and Type Definitions (if any)
    let hasMovedAboveMain = false;

    if (decomposed.types.length > 0) {
      const typeCode = decomposed.types.join("\n\n") + "\n\n";
      steps.push({
        kind: "types",
        code: typeCode,
        // Move cursor from end of scaffold up to above `int main(...)`
        cursorMoveBefore: { lineOffset: -(scaffoldLines + 1), column: 0, landmark: "above_main" },
        pauseBeforeMs: 400,
        pauseAfterMs: 500,
        description: "move above main() to declare structs and types",
      });
      hasMovedAboveMain = true;
    }

    // 4. Phase 3: Helper Functions (Step by Step)
    for (let i = 0; i < decomposed.helperFunctions.length; i++) {
      const fn: CFunctionBlock = decomposed.helperFunctions[i];
      const fnCode = fn.fullText + "\n\n";

      // If we haven't jumped above main yet, jump now
      const moveBefore: AuthoringStep["cursorMoveBefore"] = !hasMovedAboveMain
        ? { lineOffset: -(scaffoldLines + 1), column: 0, landmark: "above_main" }
        : undefined;
      hasMovedAboveMain = true;

      steps.push({
        kind: "helper_function",
        code: fnCode,
        cursorMoveBefore: moveBefore,
        pauseBeforeMs: 350,
        pauseAfterMs: 700, // Post-function thinking/sanity pause
        description: `implement helper function ${fn.name}() above main()`,
      });
    }

    // 5. Phase 4: Driver Logic Inside main()
    const driver = this.normalizeBodyIndentation(main.driverStatements);
    if (driver.length > 0) {
      const driverCode = driver + "\n";
      steps.push({
        kind: "main_driver",
        code: driverCode,
        cursorMoveBefore: { lineOffset: 1, column: 0, landmark: "inside_main" },
        pauseBeforeMs: 500,
        pauseAfterMs: 400,
        description: "move inside main() to author driver logic, function calls, and printfs",
      });
    }

    return steps;
  }

  private static planSingleFunction(decomposed: CDecomposedProgram, fn: CFunctionBlock): AuthoringStep[] {
    const steps: AuthoringStep[] = [];

    // 1. Headers / Macros (if any)
    const allHeaders = [...decomposed.headers, ...decomposed.macros];
    let headerCode = "";
    if (allHeaders.length > 0) {
      headerCode = allHeaders.join("\n") + "\n\n";
    }

    // 2. Scaffold function signature + return statement + closing brace
    const returnLine = fn.returnStatement?.trim() || "return 0;";
    const fnScaffoldCode = `${fn.signature} {\n\t${returnLine}\n}\n`;
    const initialCode = headerCode + fnScaffoldCode;

    steps.push({
      kind: "function_scaffold",
      code: initialCode,
      pauseBeforeMs: 120,
      pauseAfterMs: 450,
      description: `scaffold ${fn.name}() skeleton with return anchor`,
    });

    const scaffoldLines = fnScaffoldCode.trim().split("\n").length;

    // 3. Types / Structs (if any) - written above the function
    let hasMovedAbove = false;
    if (decomposed.types.length > 0) {
      const typeCode = decomposed.types.join("\n\n") + "\n\n";
      steps.push({
        kind: "types",
        code: typeCode,
        cursorMoveBefore: { lineOffset: -(scaffoldLines + 1), column: 0, landmark: "above_main" },
        pauseBeforeMs: 300,
        pauseAfterMs: 400,
        description: `declare types and structs above ${fn.name}()`,
      });
      hasMovedAbove = true;
    }

    // 4. Fill function body above return statement
    const bodyCode = this.normalizeBodyIndentation(fn.bodyBeforeReturn || fn.body || "");
    if (bodyCode.length > 0) {
      steps.push({
        kind: "function_body",
        code: bodyCode + "\n",
        cursorMoveBefore: hasMovedAbove
          ? { lineOffset: 1, column: 0, landmark: "above_return" }
          : { lineOffset: -2, column: 0, landmark: "above_return" },
        pauseBeforeMs: 350,
        pauseAfterMs: 300,
        description: `implement ${fn.name}() algorithm logic above return`,
      });
    }

    return steps;
  }

  private static planMultiFunctionComponent(decomposed: CDecomposedProgram): AuthoringStep[] {
    const steps: AuthoringStep[] = [];
    const entryFn = decomposed.helperFunctions[decomposed.helperFunctions.length - 1];
    const helpers = decomposed.helperFunctions.slice(0, -1);

    // 1. Headers / Macros
    const allHeaders = [...decomposed.headers, ...decomposed.macros];
    let headerCode = "";
    if (allHeaders.length > 0) {
      headerCode = allHeaders.join("\n") + "\n\n";
    }

    // 2. Scaffold entry function
    const returnLine = entryFn.returnStatement?.trim() || "";
    const entryScaffoldCode = returnLine
      ? `${entryFn.signature} {\n\t${returnLine}\n}\n`
      : `${entryFn.signature} {\n}\n`;

    const initialCode = headerCode + entryScaffoldCode;

    steps.push({
      kind: "function_scaffold",
      code: initialCode,
      pauseBeforeMs: 150,
      pauseAfterMs: 550,
      description: `scaffold entry function ${entryFn.name}() skeleton`,
    });

    const scaffoldLines = entryScaffoldCode.trim().split("\n").length;
    let hasMovedAbove = false;

    // 3. Types (if any)
    if (decomposed.types.length > 0) {
      const typeCode = decomposed.types.join("\n\n") + "\n\n";
      steps.push({
        kind: "types",
        code: typeCode,
        cursorMoveBefore: { lineOffset: -(scaffoldLines + 1), column: 0, landmark: "above_main" },
        pauseBeforeMs: 350,
        pauseAfterMs: 450,
        description: "declare types above functions",
      });
      hasMovedAbove = true;
    }

    // 4. Helper functions above entry function
    for (let i = 0; i < helpers.length; i++) {
      const h = helpers[i];
      const moveBefore = !hasMovedAbove
        ? { lineOffset: -(scaffoldLines + 1), column: 0, landmark: "above_main" as const }
        : undefined;
      hasMovedAbove = true;

      steps.push({
        kind: "helper_function",
        code: h.fullText + "\n\n",
        cursorMoveBefore: moveBefore,
        pauseBeforeMs: 300,
        pauseAfterMs: 600,
        description: `implement helper function ${h.name}() above ${entryFn.name}()`,
      });
    }

    // 5. Fill entry function body
    const bodyCode = this.normalizeBodyIndentation(entryFn.bodyBeforeReturn || entryFn.body || "");
    if (bodyCode.length > 0) {
      steps.push({
        kind: "function_body",
        code: bodyCode + "\n",
        cursorMoveBefore: {
          lineOffset: 1,
          column: 0,
          landmark: entryFn.returnStatement ? "above_return" : "inside_main",
        },
        pauseBeforeMs: 400,
        pauseAfterMs: 350,
        description: `implement ${entryFn.name}() logic`,
      });
    }

    return steps;
  }

  private static normalizeBodyIndentation(rawBody: string): string {
    const rawLines = rawBody.split(/\r?\n/);
    while (rawLines.length > 0 && rawLines[0].trim() === "") rawLines.shift();
    while (rawLines.length > 0 && rawLines[rawLines.length - 1].trim() === "") rawLines.pop();

    if (rawLines.length === 0) return "";

    let minIndent = Infinity;
    for (const line of rawLines) {
      if (line.trim().length > 0) {
        const match = line.match(/^[ \t]*/);
        const indentLen = match ? match[0].length : 0;
        if (indentLen < minIndent) minIndent = indentLen;
      }
    }
    if (minIndent === Infinity) minIndent = 0;

    return rawLines
      .map((line) => {
        if (line.trim().length === 0) return "";
        const stripped = line.slice(minIndent);
        // Normalize any internal nested leading indentation from spaces to tabs
        const leadingMatch = stripped.match(/^[ \t]*/);
        const leading = leadingMatch ? leadingMatch[0] : "";
        const rest = stripped.slice(leading.length);
        const tabCount = Math.floor(leading.replace(/\t/g, "    ").length / 4);
        return "\t" + "\t".repeat(tabCount) + rest;
      })
      .join("\n");
  }
}
