# Smart Header & Duplicate Guards

Never get compilation errors from missing headers or duplicated structs.

### Automatic Header Injection (`MemoryEngine`)
When you insert a component requiring standard library headers (such as `<stdlib.h>` for `malloc`, `<stdbool.h>` for boolean types, or `<stdio.h>`), dTyp inspects your file and automatically inserts the missing `#include` at the top of your document.

### Duplicate Definition Prevention
dTyp parses your active C source code to identify existing function signatures and struct definitions, preventing duplicated symbols that would cause compiler redefinition errors.

[Configure Header Injection](command:workbench.action.openSettings?%22dtyp.autoIncludeHeaders%22)
[Run Health Check](command:dtyp.healthCheck)
