import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generateCIntermediateComponents(): Component[] {
  const components: Component[] = [];
  const catPath = "c-intermediate";

  // 1. POINTERS
  const ptrCats = [
    { slug: "basics", name: "Basic Pointers" },
    { slug: "arithmetic", name: "Pointer Arithmetic" },
    { slug: "pointer-to-pointer", name: "Double Pointers" },
    { slug: "array-pointers", name: "Array Pointers" },
    { slug: "function-pointers", name: "Function Pointers" },
    { slug: "void-pointers", name: "Void Pointers" },
  ];

  for (const pc of ptrCats) {
    const p = `${catPath}/pointers/${pc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${pc.slug}_swap_${t.name}`,
          name: `ptr_${pc.slug.replace(/-/g, "_")}_swap_${t.name}`,
          category: "c-intermediate",
          subcategory: pc.slug,
          categoryId: id,
          path: p,
          description: `Swaps two values of type ${t.cType} via pointers.`,
          signature: `void ptr_${pc.slug.replace(/-/g, "_")}_swap_${t.name}(${t.cType}* a, ${t.cType}* b);`,
          code: `void ptr_${pc.slug.replace(/-/g, "_")}_swap_${t.name}(${t.cType}* a, ${t.cType}* b) {\n    if (!a || !b) return;\n    ${t.cType} tmp = *a;\n    *a = *b;\n    *b = tmp;\n}`,
          dataType: t.name,
        }),
        createComponent({
          id: `${id}.${pc.slug}_copy_${t.name}`,
          name: `ptr_${pc.slug.replace(/-/g, "_")}_copy_${t.name}`,
          category: "c-intermediate",
          subcategory: pc.slug,
          categoryId: id,
          path: p,
          description: `Copies value from source pointer to destination pointer for ${t.cType}.`,
          signature: `void ptr_${pc.slug.replace(/-/g, "_")}_copy_${t.name}(const ${t.cType}* src, ${t.cType}* dest);`,
          code: `void ptr_${pc.slug.replace(/-/g, "_")}_copy_${t.name}(const ${t.cType}* src, ${t.cType}* dest) {\n    if (src && dest) *dest = *src;\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 2. STRUCTURES
  const structCats = [
    { slug: "declaration", name: "Declaration" },
    { slug: "nested", name: "Nested" },
    { slug: "self-referencing", name: "Self Referencing" },
    { slug: "typedef", name: "Typedef" },
  ];

  for (const sc of structCats) {
    const p = `${catPath}/structures/${sc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${sc.slug}_container_${t.name}`,
          name: `struct_${sc.slug}_${t.name}`,
          type: "struct",
          category: "c-intermediate",
          subcategory: sc.slug,
          categoryId: id,
          path: p,
          description: `Structure container holding ${t.cType} with metadata.`,
          signature: `typedef struct { ${t.cType} val; size_t tag; } Container_${t.name};`,
          code: `typedef struct {\n    ${t.cType} val;\n    size_t tag;\n} Container_${t.name};`,
          dataType: t.name,
        }),
        createComponent({
          id: `${id}.${sc.slug}_init_${t.name}`,
          name: `struct_${sc.slug}_init_${t.name}`,
          category: "c-intermediate",
          subcategory: sc.slug,
          categoryId: id,
          path: p,
          description: `Initializes structure container holding ${t.cType}.`,
          signature: `void struct_${sc.slug}_init_${t.name}(void* container, ${t.cType} val, size_t tag);`,
          code: `void struct_${sc.slug}_init_${t.name}(void* container, ${t.cType} val, size_t tag) {\n    (void)container; (void)val; (void)tag;\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 3. DYNAMIC MEMORY
  const memCats = [
    { slug: "malloc", name: "Malloc" },
    { slug: "calloc", name: "Calloc" },
    { slug: "realloc", name: "Realloc" },
    { slug: "free", name: "Free" },
    { slug: "2d-dynamic", name: "Dynamic 2D Arrays" },
  ];

  for (const mc of memCats) {
    const p = `${catPath}/dynamic-memory/${mc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${mc.slug}_alloc_${t.name}`,
          name: `mem_${mc.slug.replace(/-/g, "_")}_alloc_${t.name}`,
          category: "c-intermediate",
          subcategory: mc.slug,
          categoryId: id,
          path: p,
          description: `Safe dynamic allocation helper for array of ${t.cType}.`,
          signature: `${t.cType}* mem_${mc.slug.replace(/-/g, "_")}_alloc_${t.name}(size_t count);`,
          code: `${t.cType}* mem_${mc.slug.replace(/-/g, "_")}_alloc_${t.name}(size_t count) {\n    if (count == 0) return NULL;\n    ${t.cType}* ptr = (${t.cType}*)malloc(sizeof(${t.cType}) * count);\n    return ptr;\n}`,
          dataType: t.name,
        }),
        createComponent({
          id: `${id}.${mc.slug}_free_${t.name}`,
          name: `mem_${mc.slug.replace(/-/g, "_")}_free_${t.name}`,
          category: "c-intermediate",
          subcategory: mc.slug,
          categoryId: id,
          path: p,
          description: `Safe deallocation and pointer nullification for ${t.cType}.`,
          signature: `void mem_${mc.slug.replace(/-/g, "_")}_free_${t.name}(${t.cType}** ptr);`,
          code: `void mem_${mc.slug.replace(/-/g, "_")}_free_${t.name}(${t.cType}** ptr) {\n    if (ptr && *ptr) {\n        free(*ptr);\n        *ptr = NULL;\n    }\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 4. FILE HANDLING
  const fileCats = [
    { slug: "text-files", name: "Text Files" },
    { slug: "binary-files", name: "Binary Files" },
    { slug: "buffered-io", name: "Buffered IO" },
    { slug: "record-io", name: "Record IO" },
  ];

  for (const fc of fileCats) {
    const p = `${catPath}/file-handling/${fc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${fc.slug}_write_${t.name}`,
          name: `file_${fc.slug.replace(/-/g, "_")}_write_${t.name}`,
          category: "c-intermediate",
          subcategory: fc.slug,
          categoryId: id,
          path: p,
          description: `Writes an array of ${t.cType} to file storage.`,
          signature: `bool file_${fc.slug.replace(/-/g, "_")}_write_${t.name}(const char* path, const ${t.cType}* data, size_t count);`,
          code: `bool file_${fc.slug.replace(/-/g, "_")}_write_${t.name}(const char* path, const ${t.cType}* data, size_t count) {\n    if (!path || !data || count == 0) return false;\n    FILE* fp = fopen(path, "wb");\n    if (!fp) return false;\n    size_t written = fwrite(data, sizeof(${t.cType}), count, fp);\n    fclose(fp);\n    return written == count;\n}`,
          dataType: t.name,
        }),
        createComponent({
          id: `${id}.${fc.slug}_read_${t.name}`,
          name: `file_${fc.slug.replace(/-/g, "_")}_read_${t.name}`,
          category: "c-intermediate",
          subcategory: fc.slug,
          categoryId: id,
          path: p,
          description: `Reads an array of ${t.cType} from file storage.`,
          signature: `size_t file_${fc.slug.replace(/-/g, "_")}_read_${t.name}(const char* path, ${t.cType}* buffer, size_t max_count);`,
          code: `size_t file_${fc.slug.replace(/-/g, "_")}_read_${t.name}(const char* path, ${t.cType}* buffer, size_t max_count) {\n    if (!path || !buffer || max_count == 0) return 0;\n    FILE* fp = fopen(path, "rb");\n    if (!fp) return 0;\n    size_t read_count = fread(buffer, sizeof(${t.cType}), max_count, fp);\n    fclose(fp);\n    return read_count;\n}`,
          dataType: t.name,
        })
      );
    }
  }

  return components;
}
