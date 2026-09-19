# Native Snippets & Interactive Tab-Stops

dTyp provides **1,492 structured snippets** integrated directly into VS Code's C/C++ autocompletion engine with full tab-stop support (`$1`, `$2`, `$0`).

### How to Trigger:
1. Open any `.c` or `.cpp` file.
2. Type `dtyp.` to browse all hierarchical and alias snippets:
   - **Hierarchical**: `dtyp.<domain>.<category>.<subtopic>.<name>`
     - e.g. `dtyp.ds.component.separate_components.linked_lists.singly.create_node`
     - e.g. `dtyp.acad.program.numerical_methods.gauss_jordan_elimination`
   - **Short Aliases**: `dtyp.<name>`
     - `dtyp.create_node` &rarr; Singly linked list node creator
     - `dtyp.quick_sort` &rarr; In-place divide-and-conquer quick sort
     - `dtyp.binary_search` &rarr; Logarithmic binary search
     - `dtyp.fast_io` &rarr; Competitive programming fast I/O setup
   - **Full Code Blocks**: `<prefix>.code` &rarr; Injects complete implementation

### Custom Components:
You can also insert any component from your **Own Library** with full auto-typing and header checks:

[Browse & Insert Snippet (1,492)...](command:dtyp.insertSnippet)
[Create Custom Component](command:dtyp.createOwnComponent)
