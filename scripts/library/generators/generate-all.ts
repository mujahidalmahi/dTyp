import * as path from "node:path";
import * as fs from "node:fs";
import { Component, Category } from "@dtyp/types";
import { defaultLogger, ensureDirectoryExists, safeReadJsonFile } from "@dtyp/utilities";

import { generateCBasicsComponents } from "./c-basics-generator.js";
import { generateCIntermediateComponents } from "./c-intermediate-generator.js";
import { generateCAdvancedComponents } from "./c-advanced-generator.js";
import { generateDataStructuresComponents } from "./ds-generator.js";
import { generateAlgorithmsComponents } from "./algo-generator.js";
import { generateNumericalMethodsComponents } from "./num-generator.js";
import { generatePatternsComponents } from "./patterns-generator.js";
import { generateCompetitiveProgrammingComponents } from "./cp-generator.js";
import { generateAcademicProgrammingComponents } from "./academic-generator.js";
import { generateProjectsComponents } from "./projects-generator.js";
import { generateUtilitiesComponents } from "./utilities-generator.js";

const logger = defaultLogger.child("GenerateAll");

export interface GenerationReport {
  totalComponents: number;
  domainCounts: Record<string, number>;
  duplicateIds: string[];
  invalidCategories: string[];
  durationMs: number;
}

export function generateAllComponents(): { components: Component[]; report: GenerationReport } {
  const startTime = Date.now();
  logger.info("Starting library generation across all 11 domains...");

  const domains: { name: string; fn: () => Component[] }[] = [
    { name: "c-basics", fn: generateCBasicsComponents },
    { name: "c-intermediate", fn: generateCIntermediateComponents },
    { name: "c-advanced", fn: generateCAdvancedComponents },
    { name: "data-structures", fn: generateDataStructuresComponents },
    { name: "algorithms", fn: generateAlgorithmsComponents },
    { name: "numerical-methods", fn: generateNumericalMethodsComponents },
    { name: "programming-patterns", fn: generatePatternsComponents },
    { name: "competitive-programming", fn: generateCompetitiveProgrammingComponents },
    { name: "academic-programming", fn: generateAcademicProgrammingComponents },
    { name: "projects", fn: generateProjectsComponents },
    { name: "utilities", fn: generateUtilitiesComponents },
  ];

  const allComponents: Component[] = [];
  const domainCounts: Record<string, number> = {};
  const seenIds = new Set<string>();
  const duplicateIds: string[] = [];

  const outDir = path.resolve(process.cwd(), "library-source", "components");
  ensureDirectoryExists(outDir);

  for (const domain of domains) {
    const t0 = Date.now();
    const domainComps = domain.fn();
    domainCounts[domain.name] = domainComps.length;
    logger.info(`Generated ${domain.name}: ${domainComps.length.toLocaleString()} components (${Date.now() - t0}ms)`);

    // Check for ID duplicates
    for (const comp of domainComps) {
      if (seenIds.has(comp.id)) {
        duplicateIds.push(comp.id);
      } else {
        seenIds.add(comp.id);
      }
    }

    // Write partitioned JSON file
    const domainFile = path.join(outDir, `${domain.name}.json`);
    fs.writeFileSync(domainFile, JSON.stringify(domainComps), "utf-8");

    allComponents.push(...domainComps);
  }

  // Verify against taxonomy categories
  const taxonomyFile = path.resolve(process.cwd(), "taxonomy", "all-categories.json");
  const categories = safeReadJsonFile<Category[]>(taxonomyFile, []);
  const validCategoryIds = new Set(categories.map((c) => c.id));

  const invalidCategories: string[] = [];
  for (const comp of allComponents) {
    if (!validCategoryIds.has(comp.categoryId)) {
      invalidCategories.push(`Component ${comp.id} has unknown categoryId: ${comp.categoryId}`);
    }
  }

  // Write all-components.json
  const allFile = path.resolve(process.cwd(), "library-source", "all-components.json");
  ensureDirectoryExists(path.dirname(allFile));
  fs.writeFileSync(allFile, JSON.stringify(allComponents), "utf-8");

  const durationMs = Date.now() - startTime;
  const report: GenerationReport = {
    totalComponents: allComponents.length,
    domainCounts,
    duplicateIds,
    invalidCategories: Array.from(new Set(invalidCategories)),
    durationMs,
  };

  logger.info(`Library generation complete! Total: ${allComponents.length.toLocaleString()} components in ${durationMs}ms`);
  if (duplicateIds.length > 0) {
    logger.warn(`Found ${duplicateIds.length} duplicate component IDs! First 5: ${duplicateIds.slice(0, 5).join(", ")}`);
  }
  if (report.invalidCategories.length > 0) {
    logger.warn(`Found ${report.invalidCategories.length} invalid category references! First 5: ${report.invalidCategories.slice(0, 5).join(", ")}`);
  }

  return { components: allComponents, report };
}

if (process.argv[1] && process.argv[1].includes("generate-all")) {
  const { report } = generateAllComponents();
  console.log("\n================ GENERATION SUMMARY ================");
  console.log(`Total Components : ${report.totalComponents.toLocaleString()}`);
  console.log(`Duplicate IDs    : ${report.duplicateIds.length}`);
  console.log(`Invalid Categories: ${report.invalidCategories.length}`);
  console.log(`Duration         : ${report.durationMs}ms`);
  console.log("----------------- DOMAIN BREAKDOWN -----------------");
  for (const [dom, count] of Object.entries(report.domainCounts)) {
    console.log(`  ${dom.padEnd(25)}: ${count.toLocaleString()}`);
  }
  console.log("====================================================\n");
  if (report.duplicateIds.length > 0 || report.invalidCategories.length > 0) {
    process.exit(1);
  }
}
