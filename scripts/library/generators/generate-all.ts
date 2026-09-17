import * as path from "node:path";
import * as fs from "node:fs";
import { Component } from "@dtyp/types";
import { defaultLogger, ensureDirectoryExists } from "@dtyp/utilities";

import { generateBoilerPlateComponents } from "./boiler-plate-generator.js";
import { generateDataStructuresComponents } from "./ds-generator.js";
import { generateAlgorithmsComponents } from "./algo-generator.js";
import { generateCompetitiveProgrammingComponents } from "./cp-generator.js";
import { generateAcademicProgrammingComponents } from "./academic-generator.js";
import { generateProjectsComponents } from "./projects-generator.js";
import { generateDetectionComponents } from "./detection-generator.js";
import { exportSnippetsFile } from "./snippet-generator.js";
import { generateAllDocs } from "./docs-generator.js";

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
  logger.info("Starting library generation across strictly the 7 blank domains...");

  const domains: { name: string; fn: () => Component[] }[] = [
    { name: "boiler-plates", fn: generateBoilerPlateComponents },
    { name: "data-structures", fn: generateDataStructuresComponents },
    { name: "algorithms", fn: generateAlgorithmsComponents },
    { name: "competitive-programming", fn: generateCompetitiveProgrammingComponents },
    { name: "academics-programming", fn: generateAcademicProgrammingComponents },
    { name: "projects", fn: generateProjectsComponents },
    { name: "detection", fn: generateDetectionComponents },
  ];

  const allComponents: Component[] = [];
  const domainCounts: Record<string, number> = {};
  const seenIds = new Set<string>();
  const duplicateIds: string[] = [];

  const outDir = path.resolve(process.cwd(), "library-source", "components");
  ensureDirectoryExists(outDir);

  // Clean out legacy json files in outDir
  if (fs.existsSync(outDir)) {
    for (const f of fs.readdirSync(outDir)) {
      if (f.endsWith(".json")) {
        fs.unlinkSync(path.join(outDir, f));
      }
    }
  }

  for (const domain of domains) {
    const domainComps = domain.fn();
    domainCounts[domain.name] = domainComps.length;

    for (const comp of domainComps) {
      if (seenIds.has(comp.id)) {
        duplicateIds.push(comp.id);
      } else {
        seenIds.add(comp.id);
      }
    }

    const domainFile = path.join(outDir, `${domain.name}.json`);
    fs.writeFileSync(domainFile, JSON.stringify(domainComps, null, 2), "utf-8");
    allComponents.push(...domainComps);
  }

  const allFile = path.resolve(process.cwd(), "library-source", "all-components.json");
  ensureDirectoryExists(path.dirname(allFile));
  fs.writeFileSync(allFile, JSON.stringify(allComponents, null, 2), "utf-8");

  exportSnippetsFile(allComponents);
  generateAllDocs();

  const durationMs = Date.now() - startTime;
  const report: GenerationReport = {
    totalComponents: allComponents.length,
    domainCounts,
    duplicateIds,
    invalidCategories: [],
    durationMs,
  };

  logger.info(`Library generation complete! Total: ${allComponents.length} components in ${durationMs}ms`);
  return { components: allComponents, report };
}

if (process.argv[1] && process.argv[1].includes("generate-all")) {
  const { report } = generateAllComponents();
  console.log("\n================ GENERATION SUMMARY ================");
  console.log(`Total Components : ${report.totalComponents}`);
  console.log(`Duplicate IDs    : ${report.duplicateIds.length}`);
  console.log(`Duration         : ${report.durationMs}ms`);
  console.log("----------------- DOMAIN BREAKDOWN -----------------");
  for (const [dom, count] of Object.entries(report.domainCounts)) {
    console.log(`  ${dom.padEnd(25)}: ${count}`);
  }
  console.log("====================================================\n");
}
