import * as path from "node:path";
import * as fs from "node:fs";
import { Component, Snippet } from "@dtyp/types";
import { safeWriteJsonFile, defaultLogger } from "@dtyp/utilities";

const logger = defaultLogger.child("SnippetGenerator");

const DOMAIN_PREFIX_MAP: Record<string, string> = {
  "boiler-plates": "bp",
  "data-structures": "ds",
  "algorithms": "algo",
  "competitive-programming": "cp",
  "academics-programming": "acad",
  "projects": "proj",
  "detection": "detect",
};

export function extractParamNames(signature: string): string[] {
  const match = signature.match(/\(([^)]*)\)/);
  if (!match) return [];
  const rawParams = match[1].trim();
  if (!rawParams || rawParams === "void") return [];

  const parts = rawParams.split(",").map((p) => p.trim());
  const paramNames: string[] = [];

  for (const part of parts) {
    const nameMatch = part.match(/([a-zA-Z_][a-zA-Z0-9_]*)(?:\[[^\]]*\])*\s*$/);
    if (nameMatch) {
      paramNames.push(nameMatch[1]);
    } else {
      paramNames.push("arg");
    }
  }

  return paramNames;
}

export function buildHierarchicalPrefix(comp: Component): string {
  const domainCode = DOMAIN_PREFIX_MAP[comp.category] || comp.category;
  const kind = comp.type === "struct" ? "component" : comp.type === "program" ? "program" : "component";
  const pathParts = comp.path.split("/").filter(Boolean);

  const subparts = pathParts.slice(1).map((p) =>
    p.replace(/[^a-zA-Z0-9_]/g, "_").replace(/^_+|_+$/g, "")
  );

  return `dtyp.${domainCode}.${kind}.${subparts.join(".")}`;
}

export function buildSnippetBody(comp: Component): { body: string; tabStops: string[] } {
  const tabStops: string[] = [];

  if (comp.type === "struct" || comp.type === "typedef") {
    const varName = comp.name.toLowerCase();
    tabStops.push(`\${1:${varName}}`);
    return {
      body: `${comp.name} \${1:${varName}};$0`,
      tabStops,
    };
  }

  const params = extractParamNames(comp.signature);
  if (params.length === 0) {
    return {
      body: `${comp.name}()$0`,
      tabStops: ["$0"],
    };
  }

  const tabstopArgs = params.map((p, idx) => {
    const ts = `\${${idx + 1}:${p}}`;
    tabStops.push(ts);
    return ts;
  });

  return {
    body: `${comp.name}(${tabstopArgs.join(", ")})$0`,
    tabStops,
  };
}

export function generateAllSnippets(components: Component[]): Snippet[] {
  const snippets: Snippet[] = [];
  const seenPrefixes = new Set<string>();

  for (const comp of components) {
    const hierarchicalPrefix = buildHierarchicalPrefix(comp);
    const { body, tabStops } = buildSnippetBody(comp);

    // 1. Primary Hierarchical Invocation Snippet (e.g. dtyp.ds.component.linkedList.singly.create_node)
    snippets.push({
      id: `snip.invoke.${comp.id}`,
      component_id: comp.id,
      prefix: hierarchicalPrefix,
      body,
      description: `${comp.description} [${comp.name} call]`,
      category: comp.category,
      tabStops,
      scope: "c,cpp",
    });
    seenPrefixes.add(hierarchicalPrefix);

    // 2. Short Name Alias Snippet (e.g. dtyp.quick_sort)
    const shortPrefix = `dtyp.${comp.name}`;
    if (!seenPrefixes.has(shortPrefix)) {
      snippets.push({
        id: `snip.short.${comp.id}`,
        component_id: comp.id,
        prefix: shortPrefix,
        body,
        description: `${comp.description} [${comp.name}]`,
        category: comp.category,
        tabStops,
        scope: "c,cpp",
      });
      seenPrefixes.add(shortPrefix);
    }

    // 3. Full Implementation Code Snippet (e.g. prefix.code)
    const defPrefix = `${hierarchicalPrefix}.code`;
    snippets.push({
      id: `snip.def.${comp.id}`,
      component_id: comp.id,
      prefix: defPrefix,
      body: comp.code,
      description: `Complete clean C implementation of ${comp.name}`,
      category: comp.category,
      tabStops: ["$0"],
      scope: "c,cpp",
    });
  }

  return snippets;
}

export function exportSnippetsFile(components: Component[]): Snippet[] {
  const snippets = generateAllSnippets(components);
  const targetDir = path.resolve(process.cwd(), "library-source", "snippets");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetFile = path.join(targetDir, "snippets.json");
  safeWriteJsonFile(targetFile, snippets);
  logger.info(`Exported ${snippets.length} snippets to ${targetFile}`);
  return snippets;
}

if (process.argv[1] && process.argv[1].includes("snippet-generator")) {
  const compsFile = path.resolve(process.cwd(), "library-source", "all-components.json");
  if (fs.existsSync(compsFile)) {
    const comps = JSON.parse(fs.readFileSync(compsFile, "utf8"));
    exportSnippetsFile(comps);
  } else {
    console.error("all-components.json not found, run generate-all first");
  }
}
