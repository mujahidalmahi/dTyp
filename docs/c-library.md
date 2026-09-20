# dTyp Academic C Library & Database Guide (v4.0)

## 1. Overview

The dTyp C Library is an offline-first collection of **665 production-grade academic C components** and 1,492 structured snippets spanning 7 canonical computer science domains and 361 categories, augmented in v4.0 by user-defined components in the **Own Library**.

Every built-in component strictly enforces the **Zero-Comments Invariant** (100% verified, 0 comments) for clean, academic-grade code.

The library is compiled into an indexed SQLite WebAssembly database (`dtyp.db`) located in:
- `database/dtyp.db`
- `apps/vscode/library/dtyp.db`

---

## 2. Primary Domains (7 Domains + Own Library)

| Domain | Category Code | Component Count | Highlights |
|---|---|---|---|
| **Boiler Plates** | `boiler-plates` | 103 | Standard entry points, argument parsers (`getopt`), REPL shells, file I/O, arenas, test runners |
| **Data Structures** | `data-structures` | 178 | Singly, doubly, circular linked lists; stacks; queues; deques; BST, AVL, segment trees; binary heaps; hash tables |
| **Algorithms** | `algorithms` | 164 | Sorting (Quick, Merge, Heap, Tim), searching, graph traversals (BFS, DFS, Dijkstra, Prim), dynamic programming |
| **Competitive Programming** | `competitive-programming` | 70 | Fast I/O buffers (`getchar_unlocked`), modular arithmetic, prime sieves, Fenwick trees (BIT), LCA binary lifting |
| **Academics Programming** | `academics-programming` | 56 | Discrete truth tables, numerical methods (Gauss-Jordan, LU, Newton-Raphson, Runge-Kutta RK4/RK45), physics |
| **Projects** | `projects` | 30 | Standalone compilable systems: micro UNIX shell, HTTP parser, event loop, JSON parser, custom allocator, key-value store |
| **Detection** | `detection` | 64 | Algorithmic detection: Floyd's/Brent's cycle detection, graph cycles, palindromes, bipartiteness, overflow, endianness |
| **Own Library** | `own-library` | User-defined | Private code snippets, lab solutions, and custom algorithms with full typing and header support |

---

## 3. SQLite Schema Reference

```sql
CREATE TABLE components (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'c',
    type TEXT NOT NULL DEFAULT 'function',
    category_id TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    path TEXT NOT NULL,
    description TEXT NOT NULL,
    signature TEXT NOT NULL,
    code TEXT NOT NULL,
    input_type TEXT,
    output_type TEXT,
    data_type TEXT,
    representation TEXT,
    implementation_type TEXT,
    difficulty TEXT,
    time_complexity TEXT NOT NULL DEFAULT 'O(1)',
    space_complexity TEXT NOT NULL DEFAULT 'O(1)',
    documentation TEXT,
    version TEXT NOT NULL DEFAULT '1.0.0',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    parent_id TEXT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    path TEXT NOT NULL,
    depth INTEGER NOT NULL DEFAULT 0,
    type TEXT NOT NULL DEFAULT 'category',
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY(parent_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE snippets (
    id TEXT PRIMARY KEY,
    component_id TEXT,
    prefix TEXT NOT NULL,
    body TEXT NOT NULL,
    description TEXT,
    category TEXT,
    tab_stops TEXT,
    scope TEXT DEFAULT 'c,cpp',
    FOREIGN KEY(component_id) REFERENCES components(id) ON DELETE CASCADE
);
```

---

## 4. Own Library Schema & Local Persistence

Custom components authored by users are stored locally in the VS Code global storage directory (`globalStorageUri/own-library.json`):

```typescript
interface OwnComponent {
  id: string;               // Unique UUID/timestamp identifier
  name: string;             // Component name (defaults to "custom_component")
  subdomain?: string;       // Sub-domain categorization (e.g. "Lab Solutions")
  topic?: string;           // Topic grouping (e.g. "Graph Algorithms")
  subtopic?: string;        // Sub-topic grouping (e.g. "Shortest Path")
  description?: string;     // Purpose & usage description
  signature?: string;       // C function or struct signature
  code: string;             // Mandatory: component source code
  language: string;         // Programming language ("c" or "cpp")
  inputType?: string;       // Input parameters type/description
  outputType?: string;      // Return type/description
  createdAt: string;        // ISO 8601 creation timestamp
  updatedAt: string;        // ISO 8601 last modified timestamp
}
```

Own Library components are fully integrated with:
- `AutoTypeEngine` (Humanized character-by-character typing or stealth `Ctrl+Shift+D` stepping)
- `NonlinearAuthoringPlanner` (Universal non-sequential skeleton-first drafting)
- `HeaderEngine` (Missing standard header scanning and auto-injection)
- `MemoryEngine` (Heap allocation leak analysis)
- `SearchEngine` (Ranked fuzzy search with `own:` prefix)
