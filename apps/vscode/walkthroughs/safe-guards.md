# Smart Header, Memory & Duplicate Guards

Never get compilation errors from missing headers, memory leaks, or duplicated structs.

### Automatic Header Injection (`HeaderEngine`)
When you insert a component requiring standard library headers (such as `<stdlib.h>` for `malloc`, `<stdbool.h>` for boolean types, or `<stdio.h>`), dTyp inspects your file and automatically inserts the missing `#include` at the top of your document without duplicates.

### Dynamic Memory Allocation & Leak Analysis (`MemoryEngine`)
dTyp scans your C code for dynamic allocations (`malloc`, `calloc`, `realloc`) and verifies that each allocated pointer has a corresponding `free()` call, warning you of unmanaged pointers and memory leaks.

### Duplicate Definition Prevention
dTyp parses your active C source code to identify existing function signatures and struct definitions, preventing duplicated symbols that would cause compiler redefinition errors.

[Configure Header Injection](command:workbench.action.openSettings?%22dtyp.autoIncludeHeaders%22)
[Run Memory Analysis](command:dtyp.analyzeMemory)
[Run Diagnostics Health Check](command:dtyp.healthCheck)
