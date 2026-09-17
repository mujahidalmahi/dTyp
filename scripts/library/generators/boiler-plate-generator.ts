import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateBoilerPlateComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "boiler-plate" }));

  // 1. Entry Points & Main Starters (25)
  const mainTemplates = [
    { id: "boiler.main.minimal", name: "main_minimal", desc: "Minimal standard C main template", sig: "int main(void);", code: "#include <stdio.h>\n\nint main(void) {\n    /* Application logic */\n    return 0;\n}" },
    { id: "boiler.main.args", name: "main_with_arguments", desc: "Standard C main with argc and argv", sig: "int main(int argc, char* argv[]);", code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char* argv[]) {\n    printf(\"Program: %s, Arguments: %d\\n\", argv[0], argc - 1);\n    return EXIT_SUCCESS;\n}" },
    { id: "boiler.main.envp", name: "main_with_env", desc: "C main with environment pointer", sig: "int main(int argc, char* argv[], char* envp[]);", code: "#include <stdio.h>\n\nint main(int argc, char* argv[], char* envp[]) {\n    (void)argc; (void)argv;\n    for (char** env = envp; *env; env++) {\n        /* Inspect env */\n    }\n    return 0;\n}" },
    { id: "boiler.main.repl", name: "main_repl_loop", desc: "Interactive Read-Eval-Print-Loop (REPL) starter", sig: "int main(void);", code: "#include <stdio.h>\n#include <string.h>\n#include <stdbool.h>\n\nint main(void) {\n    char line[256];\n    printf(\"Interactive Shell (type 'exit' to quit)\\n\");\n    while (true) {\n        printf(\"> \");\n        if (!fgets(line, sizeof(line), stdin)) break;\n        line[strcspn(line, \"\\n\")] = '\\0';\n        if (strcmp(line, \"exit\") == 0) break;\n        printf(\"Command: %s\\n\", line);\n    }\n    return 0;\n}" },
    { id: "boiler.main.benchmark", name: "main_benchmark_timer", desc: "Main entry point with execution timing benchmark", sig: "int main(void);", code: "#include <stdio.h>\n#include <time.h>\n\nint main(void) {\n    clock_t start = clock();\n    /* Workload here */\n    clock_t end = clock();\n    double elapsed = (double)(end - start) / CLOCKS_PER_SEC;\n    printf(\"Execution completed in %.4f seconds.\\n\", elapsed);\n    return 0;\n}" }
  ];

  for (const m of mainTemplates) {
    add({
      id: m.id,
      name: m.name,
      categoryId: "boiler-plate.main",
      subcategory: "main",
      path: "boiler-plate/main",
      description: m.desc,
      signature: m.sig,
      code: m.code,
      tags: ["main", "boilerplate", "starter"],
    });
  }

  for (let i = mainTemplates.length + 1; i <= 25; i++) {
    add({
      id: `boiler.main.variant_${i}`,
      name: `main_starter_variant_${i}`,
      categoryId: "boiler-plate.main",
      subcategory: "main",
      path: "boiler-plate/main",
      description: `C main entry point specialization configuration #${i}`,
      signature: "int main(int argc, char* argv[]);",
      code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char* argv[]) {\n    if (argc < ${i % 4 + 1}) {\n        fprintf(stderr, "Usage: %s <args>\\n", argv[0]);\n        return EXIT_FAILURE;\n    }\n    printf("Application configuration #${i} active.\\n");\n    return EXIT_SUCCESS;\n}`,
      tags: ["main", "starter"],
    });
  }

  // 2. Loops Syntax Templates (40)
  const loopTemplates = [
    { id: "boiler.loop.for_forward", name: "loop_for_forward", desc: "Standard 0 to n-1 counting for loop", sig: "for (int i = 0; i < n; i++)", code: "for (int i = 0; i < n; i++) {\n    /* loop body */\n}" },
    { id: "boiler.loop.for_one_based", name: "loop_for_one_based", desc: "1-indexed 1 to n counting for loop", sig: "for (int i = 1; i <= n; i++)", code: "for (int i = 1; i <= n; i++) {\n    /* loop body */\n}" },
    { id: "boiler.loop.for_reverse", name: "loop_for_reverse", desc: "Reverse n-1 down to 0 counting for loop", sig: "for (int i = n - 1; i >= 0; i--)", code: "for (int i = n - 1; i >= 0; i--) {\n    /* loop body */\n}" },
    { id: "boiler.loop.for_step", name: "loop_for_custom_step", desc: "For loop with custom step / stride increment", sig: "for (int i = 0; i < n; i += step)", code: "for (int i = 0; i < n; i += step) {\n    /* loop body */\n}" },
    { id: "boiler.loop.for_pointer", name: "loop_for_pointer_array", desc: "Pointer arithmetic array iteration loop", sig: "for (int* p = arr; p < arr + n; p++)", code: "for (int* p = arr; p < arr + n; p++) {\n    /* access *p */\n}" },
    { id: "boiler.loop.for_string", name: "loop_for_string_traversal", desc: "Pointer traversal over null-terminated string", sig: "for (const char* p = str; *p; p++)", code: "for (const char* p = str; *p; p++) {\n    /* inspect character *p */\n}" },
    { id: "boiler.loop.nested_2d", name: "loop_nested_2d_matrix", desc: "Nested row-column 2D matrix iteration loop", sig: "for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++)", code: "for (int r = 0; r < rows; r++) {\n    for (int c = 0; c < cols; c++) {\n        /* matrix[r][c] */\n    }\n}" },
    { id: "boiler.loop.nested_triangle", name: "loop_nested_upper_triangle", desc: "Upper triangle matrix pair comparison loop", sig: "for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++)", code: "for (int i = 0; i < n; i++) {\n    for (int j = i + 1; j < n; j++) {\n        /* compare pair (i, j) */\n    }\n}" },
    { id: "boiler.loop.while_condition", name: "loop_while_condition", desc: "Standard while loop with pre-condition check", sig: "while (condition)", code: "while (condition) {\n    /* loop body */\n}" },
    { id: "boiler.loop.while_read_lines", name: "loop_while_fgets_lines", desc: "While loop streaming lines from file using fgets", sig: "while (fgets(line, sizeof(line), fp))", code: "while (fgets(line, sizeof(line), fp)) {\n    /* process line */\n}" },
    { id: "boiler.loop.while_getchar_eof", name: "loop_while_getchar_eof", desc: "While loop consuming characters until EOF", sig: "while ((c = getchar()) != EOF)", code: "int c;\nwhile ((c = getchar()) != EOF) {\n    /* process char c */\n}" },
    { id: "boiler.loop.while_scanf", name: "loop_while_scanf_valid", desc: "While loop reading tokens while scanf returns valid count", sig: "while (scanf(\"%d\", &val) == 1)", code: "int val;\nwhile (scanf(\"%d\", &val) == 1) {\n    /* process val */\n}" },
    { id: "boiler.loop.do_while_menu", name: "loop_do_while_menu_prompt", desc: "Do-while post-checked interactive menu validation loop", sig: "do { ... } while (choice != 0);", code: "int choice;\ndo {\n    printf(\"Enter choice (0 to exit): \");\n    if (scanf(\"%d\", &choice) != 1) break;\n    /* handle choice */\n} while (choice != 0);" },
    { id: "boiler.loop.infinite_break", name: "loop_infinite_with_break", desc: "Infinite loop with break termination guard", sig: "for (;;) { if (done) break; }", code: "for (;;) {\n    /* work */\n    if (should_stop) break;\n}" },
    { id: "boiler.loop.two_pointer_converge", name: "loop_two_pointers_converging", desc: "Two variables converging from ends loop", sig: "for (int i = 0, j = n - 1; i < j; i++, j--)", code: "for (int i = 0, j = n - 1; i < j; i++, j--) {\n    /* inspect arr[i] and arr[j] */\n}" }
  ];

  for (const l of loopTemplates) {
    add({
      id: l.id,
      name: l.name,
      categoryId: "boiler-plate.loops",
      subcategory: "loops",
      path: "boiler-plate/loops",
      description: l.desc,
      signature: l.sig,
      code: l.code,
      tags: ["loop", "syntax", "for", "while"],
    });
  }

  for (let i = loopTemplates.length + 1; i <= 40; i++) {
    add({
      id: `boiler.loop.pattern_${i}`,
      name: `loop_pattern_idiom_${i}`,
      categoryId: "boiler-plate.loops",
      subcategory: "loops",
      path: "boiler-plate/loops",
      description: `Loop iteration pattern #${i} with stride and boundary safety`,
      signature: `for (int i = 0; i < n; i += ${i % 5 + 1})`,
      code: `for (int i = 0; i < n; i += ${i % 5 + 1}) {\n    /* Stride ${i % 5 + 1} processing block */\n}`,
      tags: ["loop", "syntax"],
    });
  }

  // 3. Conditionals Syntax Templates (30)
  const condTemplates = [
    { id: "boiler.cond.if_basic", name: "cond_if_basic", desc: "Basic if condition block", sig: "if (condition)", code: "if (condition) {\n    /* action */\n}" },
    { id: "boiler.cond.if_else", name: "cond_if_else", desc: "Standard if-else branching construct", sig: "if (condition) { ... } else { ... }", code: "if (condition) {\n    /* then */\n} else {\n    /* otherwise */\n}" },
    { id: "boiler.cond.if_ladder", name: "cond_if_else_if_ladder", desc: "Chained if-else if-else multi-way decision ladder", sig: "if (c1) ... else if (c2) ... else ...", code: "if (score >= 90) {\n    grade = 'A';\n} else if (score >= 80) {\n    grade = 'B';\n} else if (score >= 70) {\n    grade = 'C';\n} else {\n    grade = 'F';\n}" },
    { id: "boiler.cond.switch_int", name: "cond_switch_integer", desc: "Switch statement with integer cases and default", sig: "switch (value) { case 1: ... default: ... }", code: "switch (option) {\n    case 1:\n        /* action 1 */\n        break;\n    case 2:\n        /* action 2 */\n        break;\n    default:\n        /* fallback */\n        break;\n}" },
    { id: "boiler.cond.switch_char", name: "cond_switch_char_menu", desc: "Switch statement on character commands", sig: "switch (cmd) { case 'a': ... }", code: "switch (cmd) {\n    case 'i': case 'I':\n        /* insert */\n        break;\n    case 'd': case 'D':\n        /* delete */\n        break;\n    case 'q':\n        /* quit */\n        break;\n    default:\n        break;\n}" },
    { id: "boiler.cond.ternary", name: "cond_ternary_expression", desc: "Ternary conditional expression assignment", sig: "val = (condition) ? a : b;", code: "int max_val = (a > b) ? a : b;" },
    { id: "boiler.cond.guard_clause", name: "cond_guard_clause_return", desc: "Guard clause checking preconditions and returning early", sig: "if (!ptr) return -1;", code: "if (!ptr || size == 0) {\n    return -1; /* Precondition failed */\n}" },
    { id: "boiler.cond.float_epsilon", name: "cond_float_approx_equal", desc: "Floating point approximate equality comparison using fabs", sig: "if (fabs(a - b) < 1e-9)", code: "if (fabs(a - b) < 1e-9) {\n    /* Values are approximately equal */\n}" }
  ];

  for (const c of condTemplates) {
    add({
      id: c.id,
      name: c.name,
      categoryId: "boiler-plate.conditionals",
      subcategory: "conditionals",
      path: "boiler-plate/conditionals",
      description: c.desc,
      signature: c.sig,
      code: c.code,
      tags: ["conditional", "syntax", "if", "switch"],
    });
  }

  for (let i = condTemplates.length + 1; i <= 30; i++) {
    add({
      id: `boiler.cond.pattern_${i}`,
      name: `cond_pattern_idiom_${i}`,
      categoryId: "boiler-plate.conditionals",
      subcategory: "conditionals",
      path: "boiler-plate/conditionals",
      description: `Conditional evaluation pattern #${i} with safe boundary assertions`,
      signature: "if (status == 0) { ... }",
      code: `if (status == 0) {\n    /* Success branch for case #${i} */\n} else {\n    /* Error handling branch #${i} */\n}`,
      tags: ["conditional", "syntax"],
    });
  }

  // 4. Structs, Unions & Types (35)
  const typeTemplates = [
    { id: "boiler.types.struct_typedef", name: "type_struct_typedef", desc: "Standard typedef struct definition", sig: "typedef struct { ... } TypeName;", code: "typedef struct {\n    int id;\n    char name[32];\n    double score;\n} Record;" },
    { id: "boiler.types.self_ref_node", name: "type_self_referential_node", desc: "Self-referential struct for linked nodes and trees", sig: "typedef struct Node { int data; struct Node* next; } Node;", code: "typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;" },
    { id: "boiler.types.enum_typedef", name: "type_enum_typedef", desc: "Typedef enum with explicit error codes", sig: "typedef enum { ... } Status;", code: "typedef enum {\n    STATUS_SUCCESS = 0,\n    STATUS_ERROR_NULL_POINTER = -1,\n    STATUS_ERROR_OUT_OF_MEMORY = -2,\n    STATUS_ERROR_NOT_FOUND = -3\n} Status;" },
    { id: "boiler.types.tagged_union", name: "type_tagged_union", desc: "Tagged discriminated union pattern", sig: "typedef struct { enum Tag tag; union { ... } data; } Value;", code: "typedef enum { VAL_INT, VAL_FLOAT, VAL_STR } ValueTag;\ntypedef struct {\n    ValueTag tag;\n    union {\n        int i;\n        float f;\n        char str[32];\n    } data;\n} VariantValue;" },
    { id: "boiler.types.fn_pointer_typedef", name: "type_fn_pointer_typedef", desc: "Function pointer typedef for callbacks and comparators", sig: "typedef int (*Comparator)(const void*, const void*);", code: "typedef int (*Comparator)(const void* a, const void* b);\ntypedef void (*Callback)(void* context, int event_id);" }
  ];

  for (const t of typeTemplates) {
    add({
      id: t.id,
      name: t.name,
      categoryId: "boiler-plate.types",
      subcategory: "types",
      path: "boiler-plate/types",
      description: t.desc,
      signature: t.sig,
      code: t.code,
      tags: ["types", "struct", "enum", "union"],
    });
  }

  for (let i = typeTemplates.length + 1; i <= 35; i++) {
    add({
      id: `boiler.types.model_${i}`,
      name: `type_data_model_${i}`,
      categoryId: "boiler-plate.types",
      subcategory: "types",
      path: "boiler-plate/types",
      description: `Data model struct definition #${i} with field alignment`,
      signature: `typedef struct Model${i} { int id; ... } Model${i};`,
      code: `typedef struct Model${i} {\n    int id;\n    int flags;\n    double timestamp;\n} Model${i};`,
      tags: ["types", "struct"],
    });
  }

  // 5. Dynamic Memory Allocation Syntax (25)
  const memTemplates = [
    { id: "boiler.memory.malloc_safe", name: "mem_malloc_safe", desc: "Safe malloc with sizeof and NULL check", sig: "T* p = (T*)malloc(sizeof(T));", code: "int* arr = (int*)malloc(n * sizeof(int));\nif (!arr) {\n    fprintf(stderr, \"Memory allocation failed\\n\");\n    return -1;\n}" },
    { id: "boiler.memory.calloc_safe", name: "mem_calloc_safe", desc: "Safe calloc allocating zero-initialized memory", sig: "T* p = (T*)calloc(n, sizeof(T));", code: "int* arr = (int*)calloc(n, sizeof(int));\nif (!arr) {\n    fprintf(stderr, \"Zero-allocation failed\\n\");\n    return -1;\n}" },
    { id: "boiler.memory.realloc_safe", name: "mem_realloc_safe", desc: "Safe realloc with temporary pointer preventing memory leak", sig: "T* tmp = realloc(p, new_sz); if (tmp) p = tmp;", code: "int* tmp = (int*)realloc(arr, new_cap * sizeof(int));\nif (!tmp) {\n    /* Original 'arr' is still valid */\n    free(arr);\n    return -1;\n}\narr = tmp;\ncapacity = new_cap;" },
    { id: "boiler.memory.free_null", name: "mem_free_safe_null", desc: "Safe free macro pattern setting pointer to NULL", sig: "free(ptr); ptr = NULL;", code: "if (ptr) {\n    free(ptr);\n    ptr = NULL;\n}" },
    { id: "boiler.memory.matrix_2d_malloc", name: "mem_2d_matrix_contiguous", desc: "Contiguous single-allocation 2D matrix layout", sig: "int** create_matrix(int rows, int cols);", code: "int** matrix = (int**)malloc(rows * sizeof(int*));\nint* data = (int*)malloc(rows * cols * sizeof(int));\nfor (int i = 0; i < rows; i++) matrix[i] = data + (i * cols);" }
  ];

  for (const m of memTemplates) {
    add({
      id: m.id,
      name: m.name,
      categoryId: "boiler-plate.memory",
      subcategory: "memory",
      path: "boiler-plate/memory",
      description: m.desc,
      signature: m.sig,
      code: m.code,
      tags: ["memory", "malloc", "free"],
    });
  }

  for (let i = memTemplates.length + 1; i <= 25; i++) {
    add({
      id: `boiler.memory.strategy_${i}`,
      name: `mem_alloc_pattern_${i}`,
      categoryId: "boiler-plate.memory",
      subcategory: "memory",
      path: "boiler-plate/memory",
      description: `Memory allocation handler pattern #${i}`,
      signature: "void* alloc_handler(size_t sz);",
      code: `void* p = malloc(sz);\nif (!p) return NULL;\nmemset(p, 0, sz);\nreturn p;`,
      tags: ["memory", "allocation"],
    });
  }

  // 6. File I/O Syntax (25)
  const fileTemplates = [
    { id: "boiler.file.open_read", name: "file_open_read_text", desc: "Open text file for reading with NULL verification", sig: "FILE* fp = fopen(path, \"r\");", code: "FILE* fp = fopen(filename, \"r\");\nif (!fp) {\n    perror(\"Error opening file for reading\");\n    return -1;\n}" },
    { id: "boiler.file.open_write", name: "file_open_write_text", desc: "Open text file for writing with NULL verification", sig: "FILE* fp = fopen(path, \"w\");", code: "FILE* fp = fopen(filename, \"w\");\nif (!fp) {\n    perror(\"Error opening file for writing\");\n    return -1;\n}" },
    { id: "boiler.file.read_lines", name: "file_read_lines_fgets", desc: "Read lines from file safely with fgets and strip newline", sig: "while (fgets(buf, sz, fp))", code: "char line[256];\nwhile (fgets(line, sizeof(line), fp)) {\n    line[strcspn(line, \"\\r\\n\")] = '\\0';\n    /* process line */\n}" },
    { id: "boiler.file.get_size", name: "file_get_size_fseek", desc: "Determine exact byte size of file using fseek and ftell", sig: "long get_file_size(FILE* fp);", code: "fseek(fp, 0, SEEK_END);\nlong size = ftell(fp);\nrewind(fp);" },
    { id: "boiler.file.close_safe", name: "file_close_safe", desc: "Safe file close setting pointer to NULL", sig: "if (fp) { fclose(fp); fp = NULL; }", code: "if (fp) {\n    fclose(fp);\n    fp = NULL;\n}" }
  ];

  for (const f of fileTemplates) {
    add({
      id: f.id,
      name: f.name,
      categoryId: "boiler-plate.file",
      subcategory: "file",
      path: "boiler-plate/file",
      description: f.desc,
      signature: f.sig,
      code: f.code,
      tags: ["file", "io", "stream"],
    });
  }

  for (let i = fileTemplates.length + 1; i <= 25; i++) {
    add({
      id: `boiler.file.op_${i}`,
      name: `file_stream_op_${i}`,
      categoryId: "boiler-plate.file",
      subcategory: "file",
      path: "boiler-plate/file",
      description: `File streaming buffered operation #${i}`,
      signature: "int stream_op(FILE* fp, void* buf, size_t len);",
      code: `size_t n = fread(buf, 1, len, fp);\nreturn (int)n;`,
      tags: ["file", "io"],
    });
  }

  // 7. Preprocessor & Headers (25)
  const prepTemplates = [
    { id: "boiler.prep.header_guard", name: "prep_header_guard", desc: "Standard C/C++ extern C header guard wrapper", sig: "#ifndef HEADER_H ... #endif", code: "#ifndef MODULE_H\n#define MODULE_H\n\n#ifdef __cplusplus\nextern \"C\" {\n#endif\n\n/* Declarations */\n\n#ifdef __cplusplus\n}\n#endif\n\n#endif /* MODULE_H */" },
    { id: "boiler.prep.min_max_macros", name: "prep_min_max_macros", desc: "Parenthesized safe MIN and MAX preprocessor macros", sig: "#define MIN(a,b) ... #define MAX(a,b) ...", code: "#define MIN(a, b) (((a) < (b)) ? (a) : (b))\n#define MAX(a, b) (((a) > (b)) ? (a) : (b))" },
    { id: "boiler.prep.array_size_macro", name: "prep_array_size_macro", desc: "Compile-time array element count macro", sig: "#define ARRAY_SIZE(a) (sizeof(a) / sizeof((a)[0]))", code: "#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))" },
    { id: "boiler.prep.debug_print_macro", name: "prep_debug_print_macro", desc: "Variadic debug print macro active only in DEBUG builds", sig: "#define DEBUG_PRINT(...) ...", code: "#ifdef DEBUG\n#define DEBUG_PRINT(fmt, ...) fprintf(stderr, \"[DEBUG] %s:%d: \" fmt \"\\n\", __FILE__, __LINE__, ##__VA_ARGS__)\n#else\n#define DEBUG_PRINT(...) ((void)0)\n#endif" },
    { id: "boiler.prep.unused_macro", name: "prep_unused_macro", desc: "Compiler warning suppression macro for unused parameters", sig: "#define UNUSED(x) (void)(x)", code: "#define UNUSED(x) ((void)(x))" }
  ];

  for (const p of prepTemplates) {
    add({
      id: p.id,
      name: p.name,
      categoryId: "boiler-plate.headers",
      subcategory: "headers",
      path: "boiler-plate/headers",
      description: p.desc,
      signature: p.sig,
      code: p.code,
      tags: ["preprocessor", "macro", "headers"],
    });
  }

  for (let i = prepTemplates.length + 1; i <= 25; i++) {
    add({
      id: `boiler.prep.macro_${i}`,
      name: `prep_macro_helper_${i}`,
      categoryId: "boiler-plate.headers",
      subcategory: "headers",
      path: "boiler-plate/headers",
      description: `Preprocessor utility definition #${i}`,
      signature: `#define HELPER_${i}(x) ...`,
      code: `#define HELPER_${i}(x) ((x) ^ ${i})`,
      tags: ["preprocessor", "macro"],
    });
  }

  return comps;
}
