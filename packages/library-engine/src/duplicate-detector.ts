import { Component } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  reason?: string;
}

export class DuplicateDetector {
  private logger = defaultLogger.child("DuplicateDetector");

  /**
   * Checks whether a function with the given name is already declared or defined in the source.
   */
  public hasFunction(source: string, functionName: string): boolean {
    if (!source || !functionName) return false;
    // Regex matches function definitions or prototypes like: `int functionName(...)`
    const regex = new RegExp(`\\b${functionName}\\s*\\(`, "m");
    return regex.test(source);
  }

  /**
   * Checks whether a struct with the given name is already defined.
   */
  public hasStruct(source: string, structName: string): boolean {
    if (!source || !structName) return false;
    const regex = new RegExp(`\\bstruct\\s+${structName}\\b`, "m");
    return regex.test(source);
  }

  /**
   * Checks whether a typedef with the given name is already defined.
   */
  public hasTypedef(source: string, typeName: string): boolean {
    if (!source || !typeName) return false;
    const regex = new RegExp(`\\btypedef\\b[^;]*\\b${typeName}\\s*;`, "m");
    return regex.test(source);
  }

  /**
   * Checks whether a component is already present in the source text.
   */
  public checkComponent(source: string, component: Component): DuplicateCheckResult {
    if (!source || source.trim().length === 0) {
      return { isDuplicate: false };
    }

    // Check by function name if component represents a function
    if (this.hasFunction(source, component.name)) {
      return {
        isDuplicate: true,
        reason: `Function "${component.name}" is already declared/defined in the file.`,
      };
    }

    // Check by struct name if component is a struct definition
    if (component.category === "structures" || component.code.includes("struct " + component.name)) {
      if (this.hasStruct(source, component.name)) {
        return {
          isDuplicate: true,
          reason: `Struct "${component.name}" is already defined in the file.`,
        };
      }
    }

    // Check if the entire signature exists in source
    const normalizedSig = component.signature.trim().replace(/\s+/g, " ");
    const normalizedSource = source.replace(/\s+/g, " ");
    if (normalizedSource.includes(normalizedSig)) {
      return {
        isDuplicate: true,
        reason: `Signature "${component.signature}" already exists in the file.`,
      };
    }

    return { isDuplicate: false };
  }

  /**
   * Filters a list of components, excluding any that already exist in the source code.
   */
  public filterNonDuplicates(
    source: string,
    components: Component[]
  ): {
    toInsert: Component[];
    skipped: Array<{ component: Component; reason: string }>;
  } {
    const toInsert: Component[] = [];
    const skipped: Array<{ component: Component; reason: string }> = [];

    // Track newly inserted functions/structs across the batch
    let simulatedSource = source;

    for (const comp of components) {
      const check = this.checkComponent(simulatedSource, comp);
      if (check.isDuplicate) {
        skipped.push({ component: comp, reason: check.reason! });
        this.logger.info(`Skipping duplicate component "${comp.name}": ${check.reason}`);
      } else {
        toInsert.push(comp);
        simulatedSource += "\n" + comp.code;
      }
    }

    return { toInsert, skipped };
  }
}
