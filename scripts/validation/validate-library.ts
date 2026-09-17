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

  if (allComponents.length !== 500) {
    logger.error(`Validation failed: Component count (${allComponents.length}) must be exactly 500!`);
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
