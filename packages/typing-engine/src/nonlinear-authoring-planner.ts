import { CDecomposedProgram, CFunctionBlock } from "./c-structural-decomposer.js";

export interface AuthoringStep {
  kind: "headers" | "main_scaffold" | "types" | "helper_function" | "main_driver" | "raw";
  code: string;
  cursorMoveBefore?: { lineOffset: number; column?: number; landmark?: "above_main" | "inside_main" };
  pauseBeforeMs?: number;
  pauseAfterMs?: number;
  description: string;
}

export class NonlinearAuthoringPlanner {
  /**
   * Plans the realistic step-by-step authoring sequence for a C program or component.
   */
  public static plan(decomposed: CDecomposedProgram, rawSource: string): AuthoringStep[] {
    if (!decomposed.isFullProgram || !decomposed.mainFunction) {
      // If not a full program with main(), author directly
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

    const steps: AuthoringStep[] = [];
    const main = decomposed.mainFunction;

    // 1. Phase 1: Headers and Preprocessor Directives
    const allHeaders = [...decomposed.headers, ...decomposed.macros];
    let headerCode = "";
    if (allHeaders.length > 0) {
      headerCode = allHeaders.join("\n") + "\n\n";
    }

    // 2. Phase 1b: Scaffold minimal main() skeleton
    const returnLine = main.returnStatement.trim() || "return 0;";
    const mainScaffoldCode = `${main.signature} {\n    ${returnLine}\n}\n`;

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
    const driver = main.driverStatements.trim();
    if (driver.length > 0) {
      const driverCode = driver + "\n";
      steps.push({
        kind: "main_driver",
        code: driverCode,
        cursorMoveBefore: { lineOffset: 1, column: 4, landmark: "inside_main" },
        pauseBeforeMs: 500,
        pauseAfterMs: 400,
        description: "move inside main() to author driver logic, function calls, and printfs",
      });
    }

    return steps;
  }
}
