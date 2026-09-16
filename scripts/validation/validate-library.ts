import * as path from "node:path";
import { Component, Snippet, Template } from "@dtyp/types";
import { safeReadJsonFile, defaultLogger } from "@dtyp/utilities";
import { validateComponent, validateSnippet, validateTemplate } from "@dtyp/validation";
import { DependencyResolver } from "@dtyp/library-engine";

const logger = defaultLogger.child("LibraryValidator");

export const validateLibrary = async (): Promise<boolean> => {
  logger.info("Starting dTyp Library Validation Pipeline...");

  const baseSourceDir = path.resolve(process.cwd(), "library-source");
  const allComponents = safeReadJsonFile<Component[]>(
    path.join(baseSourceDir, "all-components.json"),
    []
  );
  const snippets = safeReadJsonFile<Snippet[]>(
    path.join(baseSourceDir, "snippets", "snippets.json"),
    []
  );
  const templates = safeReadJsonFile<Template[]>(
    path.join(baseSourceDir, "templates", "templates.json"),
    []
  );

  logger.info(`Loaded ${allComponents.length} components, ${snippets.length} snippets, ${templates.length} templates`);

  if (allComponents.length < 1000) {
    logger.error(`Validation failed: Component count (${allComponents.length}) is below the 1,000 threshold requirement!`);
    return false;
  }

  let hasErrors = false;
  const componentMap = new Map<string, Component>();
  const idSet = new Set<string>();

  // 1. Component Schema & Syntax Validation
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

      // Check for cycles
      try {
        await resolver.resolve(comp.id, async (id) => componentMap.get(id) ?? null);
      } catch (err: any) {
        logger.error(`Cycle detected in dependency tree for "${comp.id}": ${err.message}`);
        hasErrors = true;
      }
    }
  }

  // 3. Snippet Validation
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
  }

  // 4. Template Validation
  for (const tpl of templates) {
    const res = validateTemplate(tpl);
    if (!res.valid) {
      logger.error(`Template "${tpl.id}" failed validation: ${res.errors.join("; ")}`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    logger.error("Library validation pipeline FAILED with errors!");
    return false;
  }

  logger.info("All 1,000+ components, snippets, and templates passed validation successfully!");
  return true;
};

// Execute if run directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  validateLibrary()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((err) => {
      console.error("Fatal error during validation:", err);
      process.exit(1);
    });
}
