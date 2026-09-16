# Native Snippets & Interactive Tab-Stops

dTyp integrates directly into VS Code's C/C++ autocompletion engine with full tab-stop support (`$1`, `$2`, `$0`).

### How to Trigger:
1. Open any `.c` or `.cpp` file.
2. Type `dtyp.` to view all available boilerplate expansions:
   - `dtyp.main` &rarr; Standard `main(int argc, char* argv[])` with return status.
   - `dtyp.header` &rarr; Robust header guard with C++ `extern "C"` linkage.
   - `dtyp.for` &rarr; Optimized indexed loop with size boundary.
   - `dtyp.malloc` &rarr; Safe heap allocation with `NULL` verification.
   - `dtyp.struct` &rarr; Typedef struct definition.
   - `dtyp.file.read` &rarr; File reader with resource cleanup.
   - `dtyp.cp.fastio` &rarr; Competitive programming fast I/O setup.

[Insert Snippet...](command:dtyp.insertSnippet)
