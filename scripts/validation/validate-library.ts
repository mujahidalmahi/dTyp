import * as path from "node:path";
import * as fs from "node:fs";
import { Component, Snippet, Category } from "@dtyp/types";
import { safeReadJsonFile, defaultLogger } from "@dtyp/utilities";
import { validateComponent, validateSnippet } from "@dtyp/validation";
import { DependencyResolver } from "@dtyp/library-engine";

const logger = defaultLogger.child("LibraryValidator");

export const validateLibrary = async (): Promise<boolean> => {
  logger.info("Starting dTyp Production Library Validation Pipeline...");

  const baseSourceDir = path.resolve(process.cwd(), "library-source");
  const taxonomyDir = path.resolve(process.cwd(), "taxonomy");

  let allComponents: Component[] = [];
  const componentsDir = path.join(baseSourceDir, "components");
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const list = safeReadJsonFile<Component[]>(path.join(componentsDir, file), []);
      allComponents.push(...list);
    }
  }
  if (allComponents.length === 0) {
    allComponents = safeReadJsonFile<Component[]>(
      path.join(baseSourceDir, "all-components.json"),
      []
    );
  }

  const snippets = safeReadJsonFile<Snippet[]>(
    path.join(baseSourceDir, "snippets", "snippets.json"),
    []
  );

  const categories = safeReadJsonFile<Category[]>(
    path.join(taxonomyDir, "all-categories.json"),
    []
  );

  logger.info(`Loaded ${allComponents.length} components, ${snippets.length} snippets, ${categories.length} categories`);

  if (allComponents.length < 500) {
    logger.error(`Validation failed: Component count (${allComponents.length}) must be at least 500!`);
    return false;
  }

  if (categories.length !== 361) {
    logger.error(`Validation failed: Category count (${categories.length}) must be exactly 361!`);
    return false;
  }

  let hasErrors = false;
  const componentMap = new Map<string, Component>();
  const idSet = new Set<string>();

  // 1. Component Schema, Syntax & Zero-Comment Invariant
  for (const comp of allComponents) {
    if (idSet.has(comp.id)) {
      logger.error(`Duplicate component ID: ${comp.id}`);
      hasErrors = true;
    }
    idSet.add(comp.id);
    componentMap.set(comp.id, comp);

    const res = validateComponent(comp);
    if (!res.valid) {
      logger.error(`Component "${comp.id}" failed validation: ${res.errors.join("; ")}`);
      hasErrors = true;
    }

    // Zero-comments verification
    const lines = comp.code.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim();
      if (l.startsWith("//") || l.startsWith("/*") || l.includes("/*")) {
        logger.error(`Comment detected in component ${comp.id} on line ${i + 1}: ${l}`);
        hasErrors = true;
      }
      if (l.includes("//") && !l.includes("://")) {
        logger.error(`Inline comment detected in component ${comp.id} on line ${i + 1}: ${l}`);
        hasErrors = true;
      }
    }
  }

  // 2. Dependency Graph & Cycle Validation
  const resolver = new DependencyResolver();
  for (const comp of allComponents) {
    if (comp.dependencies && comp.dependencies.length > 0) {
      for (const depId of comp.dependencies) {
        if (!componentMap.has(depId)) {
          logger.error(`Component "${comp.id}" references non-existent dependency "${depId}"`);
          hasErrors = true;
        }
      }

      try {
        await resolver.resolve(comp.id, async (id) => componentMap.get(id) ?? null);
      } catch (err: any) {
        logger.error(`Cycle detected in dependency tree for "${comp.id}": ${err.message}`);
        hasErrors = true;
      }
    }
  }

  // 3. Snippet Validation
  const snippetPrefixSet = new Set<string>();
  for (const snip of snippets) {
    const res = validateSnippet(snip);
    if (!res.valid) {
      logger.error(`Snippet "${snip.id}" failed validation: ${res.errors.join("; ")}`);
      hasErrors = true;
    }
    if (snip.component_id && !componentMap.has(snip.component_id)) {
      logger.error(`Snippet "${snip.id}" references non-existent component "${snip.component_id}"`);
      hasErrors = true;
    }
    snippetPrefixSet.add(snip.prefix);
  }

  // 4. Taxonomy Parent-Child Integrity
  const catMap = new Map<string, Category>();
  for (const cat of categories) {
    catMap.set(cat.id, cat);
  }
  for (const cat of categories) {
    if (cat.parentId && !catMap.has(cat.parentId)) {
      logger.error(`Category "${cat.id}" references invalid parentId "${cat.parentId}"`);
      hasErrors = true;
    }
  }

  // 5. C Syntax Verification with GCC (if GCC is available)
  let hasGcc = false;
  try {
    const { execSync } = await import("node:child_process");
    execSync("gcc --version", { stdio: "ignore" });
    hasGcc = true;
  } catch {
    logger.warn("GCC compiler not found in PATH; skipping C syntax verification.");
  }

  if (hasGcc) {
    const { execSync } = await import("node:child_process");
    const os = await import("node:os");
    logger.info("Executing C syntax verification (gcc -fsyntax-only) across all components...");
    const headers = [
      "#include <stdio.h>",
      "#include <stdlib.h>",
      "#include <string.h>",
      "#include <stdbool.h>",
      "#include <stdint.h>",
      "#include <limits.h>",
      "#include <math.h>",
      "",
    ].join("\n");
    const tempFile = path.join(os.tmpdir(), `dtyp_syntax_check_${Date.now()}.c`);

    const resolveDeps = (comp: Component, visited = new Set<string>(), result: Component[] = []): Component[] => {
      if (!comp.dependencies) return result;
      for (const depId of comp.dependencies) {
        if (!visited.has(depId)) {
          visited.add(depId);
          const dep = componentMap.get(depId);
          if (dep) {
            resolveDeps(dep, visited, result);
            result.push(dep);
          }
        }
      }
      return result;
    };

    let syntaxErrors = 0;
    for (const comp of allComponents) {
      let code = "";
      if (comp.type === "program") {
        code = comp.code;
      } else {
        code = headers;
        const deps = resolveDeps(comp);
        for (const dep of deps) {
          if (dep.type !== "program") {
            code += dep.code + "\n";
          }
        }
        if (comp.type === "snippet") {
          if (comp.id.includes("main-") || comp.id.includes("common-headers")) {
            code += comp.code + "\n";
          } else {
            code += "int dummy_wrapper_fn(void) {\n    int a = 0, b = 0, c = 0, n = 10, count = 10, option = 1, condition = 1, score = 95, grade = 0, value = 0;\n" + comp.code + "\n    return 0;\n}\n";
          }
        } else {
          code += comp.code + "\n";
        }
      }

      fs.writeFileSync(tempFile, code);
      try {
        execSync(`gcc -fsyntax-only "${tempFile}"`, { stdio: "pipe" });
      } catch (err: any) {
        syntaxErrors++;
        hasErrors = true;
        logger.error(`C syntax check failed for ${comp.id} (${comp.type}): ${err.stderr?.toString().split("\\n").slice(0, 2).join(" ")}`);
      }
    }

    try {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    } catch {}

    if (syntaxErrors > 0) {
      logger.error(`GCC syntax verification failed on ${syntaxErrors} component(s)!`);
    } else {
      logger.info(`All ${allComponents.length} components passed GCC C-syntax validation with 0 errors!`);
    }
  }

  if (hasErrors) {
    logger.error("Library validation pipeline FAILED with errors!");
    return false;
  }

  logger.info(`All ${allComponents.length} components, ${snippets.length} snippets, and ${categories.length} categories passed validation successfully!`);
  return true;
};

if (process.argv[1] && process.argv[1].includes("validate-library")) {
  validateLibrary()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((err) => {
      console.error("Fatal error during validation:", err);
      process.exit(1);
    });
}
