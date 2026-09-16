import * as path from "node:path";
import * as fs from "node:fs";
import { Component, Category } from "@dtyp/types";
import { defaultLogger, ensureDirectoryExists, safeReadJsonFile } from "@dtyp/utilities";

import { generateBoilerPlateComponents } from "./boiler-plate-generator.js";
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
  logger.info("Starting library generation across all 12 domains...");

  const domains: { name: string; fn: () => Component[] }[] = [
    { name: "boiler-plate", fn: generateBoilerPlateComponents },
    { name: "data-structures", fn: generateDataStructuresComponents },
    { name: "algorithms", fn: generateAlgorithmsComponents },
    { name: "numerical-methods", fn: generateNumericalMethodsComponents },
    { name: "competitive-programming", fn: generateCompetitiveProgrammingComponents },
    { name: "programming-patterns", fn: generatePatternsComponents },
    { name: "utilities", fn: generateUtilitiesComponents },
    { name: "c-basics", fn: generateCBasicsComponents },
    { name: "c-intermediate", fn: generateCIntermediateComponents },
    { name: "c-advanced", fn: generateCAdvancedComponents },
    { name: "academic-programming", fn: generateAcademicProgrammingComponents },
    { name: "projects", fn: generateProjectsComponents },
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

    for (const comp of domainComps) {
      if (seenIds.has(comp.id)) {
        duplicateIds.push(comp.id);
      } else {
        seenIds.add(comp.id);
      }
    }

    const domainFile = path.join(outDir, `${domain.name}.json`);
    fs.writeFileSync(domainFile, JSON.stringify(domainComps), "utf-8");

    allComponents.push(...domainComps);
  }

  const allFile = path.resolve(process.cwd(), "library-source", "all-components.json");
  ensureDirectoryExists(path.dirname(allFile));
  fs.writeFileSync(allFile, JSON.stringify(allComponents), "utf-8");

  const durationMs = Date.now() - startTime;
  const report: GenerationReport = {
    totalComponents: allComponents.length,
    domainCounts,
    duplicateIds,
    invalidCategories: [],
    durationMs,
  };

  logger.info(`Library generation complete! Total: ${allComponents.length.toLocaleString()} components in ${durationMs}ms`);
  return { components: allComponents, report };
}

if (process.argv[1] && process.argv[1].includes("generate-all")) {
  const { report } = generateAllComponents();
  console.log("\n================ GENERATION SUMMARY ================");
  console.log(`Total Components : ${report.totalComponents.toLocaleString()}`);
  console.log(`Duplicate IDs    : ${report.duplicateIds.length}`);
  console.log(`Duration         : ${report.durationMs}ms`);
  console.log("----------------- DOMAIN BREAKDOWN -----------------");
  for (const [dom, count] of Object.entries(report.domainCounts)) {
    console.log(`  ${dom.padEnd(25)}: ${count.toLocaleString()}`);
  }
  console.log("====================================================\n");
}