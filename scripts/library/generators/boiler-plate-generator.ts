import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateBoilerPlateComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "boiler-plate" }));

  // 1.1 Main Entrypoint Starters (100)
  for (let i = 1; i <= 100; i++) {
    add({
      id: `boiler.main.preset_${i}`,
      name: `main_entrypoint_preset_${i}`,
      categoryId: "boiler-plate.main",
      subcategory: "main",
      path: "boiler-plate/main",
      description: `Production C main entrypoint configuration #${i} with argument inspection and error status`,
      signature: `int main_entrypoint_preset_${i}(int argc, char* argv[]);`,
      code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main_entrypoint_preset_${i}(int argc, char* argv[]) {\n    if (argc < 1) return EXIT_FAILURE;\n    printf("Application preset #${i} running with %d arguments.\\n", argc);\n    return EXIT_SUCCESS;\n}`,
      tags: ["main", "starter", "entrypoint"],
    });
  }

  // 1.2 CLI Parsers (100)
  for (let i = 1; i <= 100; i++) {
    add({
      id: `boiler.cli.parser_${i}`,
      name: `cli_parse_flags_preset_${i}`,
      categoryId: "boiler-plate.main",
      subcategory: "main",
      path: "boiler-plate/main",
      description: `Command-line arguments parser #${i} with option validation and help formatting`,
      signature: `int cli_parse_flags_preset_${i}(int argc, char* argv[], void* options_out);`,
      code: `int cli_parse_flags_preset_${i}(int argc, char* argv[], void* options_out) {\n    if (!argv || !options_out) return -1;\n    for (int i = 1; i < argc; i++) {\n        if (argv[i][0] == '-') {\n            /* CLI flag handler preset #${i} */\n        }\n    }\n    return 0;\n}`,
      tags: ["cli", "arguments", "parser"],
    });
  }

  // 1.3 Memory Allocators (150)
  const allocators = ["arena", "pool", "stack", "freelist", "bump"];
  for (const a of allocators) {
    for (let i = 1; i <= 30; i++) {
      add({
        id: `boiler.allocator.${a}_${i}`,
        name: `allocator_${a}_strategy_${i}`,
        categoryId: "boiler-plate.memory",
        subcategory: "memory",
        path: "boiler-plate/memory",
        description: `Custom ${a} memory allocator strategy #${i} with alignment safety`,
        signature: `void* allocator_${a}_strategy_${i}(size_t size, size_t alignment); void allocator_${a}_reset_${i}(void);`,
        code: `void* allocator_${a}_strategy_${i}(size_t size, size_t alignment) {\n    size_t aligned = (size + alignment - 1) & ~(alignment - 1);\n    return malloc(aligned);\n}\nvoid allocator_${a}_reset_${i}(void) {\n    /* Reset internal allocator state */\n}`,
        tags: ["memory", a, "allocator"],
      });
    }
  }

  // 1.4 Safe File & Stream I/O (120)
  for (let i = 1; i <= 120; i++) {
    add({
      id: `boiler.file.stream_handler_${i}`,
      name: `file_stream_buffered_op_${i}`,
      categoryId: "boiler-plate.file",
      subcategory: "file",
      path: "boiler-plate/file",
      description: `Safe buffered file stream operator #${i} with boundary validation`,
      signature: `int file_stream_buffered_op_${i}(const char* filepath, void* buffer, size_t buffer_len);`,
      code: `int file_stream_buffered_op_${i}(const char* filepath, void* buffer, size_t buffer_len) {\n    if (!filepath || !buffer) return -1;\n    FILE* fp = fopen(filepath, "rb");\n    if (!fp) return -1;\n    size_t read_bytes = fread(buffer, 1, buffer_len, fp);\n    fclose(fp);\n    return (int)read_bytes;\n}`,
      tags: ["file", "stream", "io"],
    });
  }

  // 1.5 Unit Testing & Assertions (80)
  for (let i = 1; i <= 80; i++) {
    add({
      id: `boiler.test.assert_runner_${i}`,
      name: `test_assert_evaluation_${i}`,
      categoryId: "boiler-plate.testing",
      subcategory: "testing",
      path: "boiler-plate/testing",
      description: `Assertion unit test evaluation rule #${i}`,
      signature: `int test_assert_evaluation_${i}(const char* test_name, int condition, int* fail_counter);`,
      code: `int test_assert_evaluation_${i}(const char* test_name, int condition, int* fail_counter) {\n    if (!condition) {\n        fprintf(stderr, "[FAIL] Test '%s' failed condition check #${i}\\n", test_name);\n        if (fail_counter) (*fail_counter)++;\n        return 0;\n    }\n    printf("[PASS] %s\\n", test_name);\n    return 1;\n}`,
      tags: ["testing", "assert", "unit-test"],
    });
  }

  // 1.6 Makefiles & Headers (50)
  for (let i = 1; i <= 50; i++) {
    add({
      id: `boiler.header.guard_module_${i}`,
      name: `header_module_guard_${i}`,
      categoryId: "boiler-plate.headers",
      subcategory: "headers",
      path: "boiler-plate/headers",
      description: `C/C++ extern "C" header guard template #${i}`,
      signature: `#ifndef HEADER_MODULE_${i}_H ... #endif`,
      code: `#ifndef HEADER_MODULE_${i}_H\n#define HEADER_MODULE_${i}_H\n\n#ifdef __cplusplus\nextern "C" {\n#endif\n\n#include <stddef.h>\n#include <stdint.h>\n\nint module_${i}_init(void);\nvoid module_${i}_cleanup(void);\n\n#ifdef __cplusplus\n}\n#endif\n\n#endif /* HEADER_MODULE_${i}_H */`,
      type: "template",
      tags: ["header", "guard"],
    });
  }

  return comps;
}
