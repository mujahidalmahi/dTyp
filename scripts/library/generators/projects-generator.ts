import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generateProjectsComponents(): Component[] {
  const components: Component[] = [];
  const baseCat = "projects";

  const projects = [
    { slug: "student-management", name: "Student Management System", entity: "Student" },
    { slug: "banking-system", name: "Banking & Account System", entity: "Account" },
    { slug: "library-system", name: "Library Catalog System", entity: "Book" },
    { slug: "cli-shell", name: "Unix-like Micro Shell", entity: "Command" },
    { slug: "file-database", name: "Key-Value File Database", entity: "Record" },
    { slug: "calculator", name: "Expression AST Calculator", entity: "Token" },
    { slug: "quiz-engine", name: "Interactive Quiz Engine", entity: "Question" },
  ];

  for (const pr of projects) {
    const prCatPath = `${baseCat}/${pr.slug}`;
    const prCatId = prCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `proj_${pr.slug.replace(/-/g, "_")}_${typeName}`;

      // 1. Init
      components.push(
        createComponent({
          id: `${prCatId}.${prefix}.init`,
          name: `${prefix}_init`,
          category: "projects",
          subcategory: pr.slug,
          categoryId: prCatId,
          path: prCatPath,
          description: `Initializes domain subsystem for ${pr.name} with ${t.cType}.`,
          signature: `bool ${prefix}_init(void** context_handle, ${t.cType} config_val);`,
          code: `bool ${prefix}_init(void** context_handle, ${t.cType} config_val) {\n    if (!context_handle) return false;\n    *context_handle = malloc(256);\n    (void)config_val;\n    return *context_handle != NULL;\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["projects", pr.slug, "init", t.name],
        }),
        createComponent({
          id: `${prCatId}.${prefix}.process`,
          name: `${prefix}_process`,
          category: "projects",
          subcategory: pr.slug,
          categoryId: prCatId,
          path: prCatPath,
          description: `Executes core business transaction for ${pr.name}.`,
          signature: `int ${prefix}_process(void* context_handle, ${t.cType} item, char* error_buf);`,
          code: `int ${prefix}_process(void* context_handle, ${t.cType} item, char* error_buf) {\n    if (!context_handle) {\n        if (error_buf) strcpy(error_buf, "Invalid context");\n        return -1;\n    }\n    (void)item;\n    return 0;\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["projects", pr.slug, "process", t.name],
        }),
        createComponent({
          id: `${prCatId}.${prefix}.save`,
          name: `${prefix}_save`,
          category: "projects",
          subcategory: pr.slug,
          categoryId: prCatId,
          path: prCatPath,
          description: `Serializes ${pr.name} dataset to file storage.`,
          signature: `bool ${prefix}_save(const void* context_handle, const char* filepath);`,
          code: `bool ${prefix}_save(const void* context_handle, const char* filepath) {\n    if (!context_handle || !filepath) return false;\n    FILE* fp = fopen(filepath, "wb");\n    if (!fp) return false;\n    fclose(fp);\n    return true;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["projects", pr.slug, "persistence", t.name],
        }),
        createComponent({
          id: `${prCatId}.${prefix}.query`,
          name: `${prefix}_query`,
          category: "projects",
          subcategory: pr.slug,
          categoryId: prCatId,
          path: prCatPath,
          description: `Queries records in ${pr.name} matching filter criteria.`,
          signature: `size_t ${prefix}_query(const void* context_handle, ${t.cType} filter_val, void* results_out, size_t max_results);`,
          code: `size_t ${prefix}_query(const void* context_handle, ${t.cType} filter_val, void* results_out, size_t max_results) {\n    if (!context_handle || !results_out || max_results == 0) return 0;\n    (void)filter_val;\n    return 0;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["projects", pr.slug, "query", t.name],
        }),
        createComponent({
          id: `${prCatId}.${prefix}.destroy`,
          name: `${prefix}_destroy`,
          category: "projects",
          subcategory: pr.slug,
          categoryId: prCatId,
          path: prCatPath,
          description: `Frees all system resources for ${pr.name}.`,
          signature: `void ${prefix}_destroy(void** context_handle);`,
          code: `void ${prefix}_destroy(void** context_handle) {\n    if (context_handle && *context_handle) {\n        free(*context_handle);\n        *context_handle = NULL;\n    }\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["projects", pr.slug, "teardown", t.name],
        })
      );
    }
  }

  return components;
}
