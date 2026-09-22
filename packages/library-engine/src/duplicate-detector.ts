import { Component } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  reason?: string;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export class DuplicateDetector {
  private logger = defaultLogger.child("DuplicateDetector");

  /**
   * Checks whether a function with the given name is declared or defined in the source.
   */
  public hasFunction(source: string, functionName: string): boolean {
    if (!source || !functionName) return false;
    const safeName = escapeRegex(functionName);
    const regex = new RegExp(`\\b${safeName}\\s*\\(`, "m");
    return regex.test(source);
  }

  /**
   * Checks whether a function definition with body { ... } already exists in the source.
   */
  public hasFunctionDefinition(source: string, functionName: string): boolean {
    if (!source || !functionName) return false;
    const safeName = escapeRegex(functionName);
    const regex = new RegExp(`\\b${safeName}\\s*\\([^;{]*\\)\\s*\\{`, "m");
    return regex.test(source);
  }

  /**
   * Checks whether a struct with the given name is already defined.
   */
  public hasStruct(source: string, structName: string): boolean {
    if (!source || !structName) return false;
    const safeName = escapeRegex(structName);
    const regex = new RegExp(`\\bstruct\\s+${safeName}\\b`, "m");
    return regex.test(source);
  }

  /**
   * Checks whether a typedef with the given name is already defined.
   */
  public hasTypedef(source: string, typeName: string): boolean {
    if (!source || !typeName) return false;
    const safeName = escapeRegex(typeName);
    const regex = new RegExp(`\\btypedef\\b[^;]*\\b${safeName}\\s*;`, "m");
    return regex.test(source);
  }

  /**
   * Checks whether a macro with the given name is already defined.
   */
  public hasMacro(source: string, macroName: string): boolean {
    if (!source || !macroName) return false;
    const safeName = escapeRegex(macroName);
    const regex = new RegExp(`^\\s*#\\s*define\\s+${safeName}\\b`, "m");
    return regex.test(source);
  }

  /**
   * Checks whether an enum with the given name is already defined.
   */
  public hasEnum(source: string, enumName: string): boolean {
    if (!source || !enumName) return false;
    const safeName = escapeRegex(enumName);
    const regex = new RegExp(`\\benum\\s+${safeName}\\b`, "m");
    return regex.test(source);
  }

  /**
   * Checks whether a component is already present in the source text.
   */
  public checkComponent(source: string, component: Component): DuplicateCheckResult {
    if (!source || source.trim().length === 0) {
      return { isDuplicate: false };
    }

    // Custom user components from Own Library should never be suppressed
    if (component.isCustom) {
      return { isDuplicate: false };
    }

    // Check by function definition if component contains a function body
    const isDefinition = component.code.includes("{");
    if (isDefinition && this.hasFunctionDefinition(source, component.name)) {
      return {
        isDuplicate: true,
        reason: `Function definition for "${component.name}" already exists in the file.`,
      };
    } else if (!isDefinition && this.hasFunction(source, component.name)) {
      return {
        isDuplicate: true,
        reason: `Function "${component.name}" is already declared/defined in the file.`,
      };
    }

    // Check macros
    if (component.type === "macro" || component.code.startsWith("#define")) {
      if (this.hasMacro(source, component.name)) {
        return {
          isDuplicate: true,
          reason: `Macro "#define ${component.name}" is already defined in the file.`,
        };
      }
    }

    // Check enums
    if (component.type === "enum" || component.code.includes("enum " + component.name)) {
      if (this.hasEnum(source, component.name)) {
        return {
          isDuplicate: true,
          reason: `Enum "${component.name}" is already defined in the file.`,
        };
      }
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
      // If the component is a function definition and only a prototype declaration exists, allow it
      const isFunction = component.signature.includes("(");
      if (isFunction && isDefinition && !this.hasFunctionDefinition(source, component.name)) {
        // Prototype declaration exists, but definition is missing -> allow insertion
      } else {
        return {
          isDuplicate: true,
          reason: `Signature "${component.signature}" already exists in the file.`,
        };
      }
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
