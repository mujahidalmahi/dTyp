# dTyp — Don't Tell Your Professor

Production-grade VS Code extension and offline academic C programming library featuring **51,100+ components** across 297 categories, topological dependency resolution, smart duplicate detection, and automated character-by-character editor typing (never bulk clipboard paste).

---

## Architecture Overview

```
                                  dTyp
                                    │
                            VS Code Extension
                       (dtyp-vscode-1.0.0.vsix)
                                    │
            ┌───────────────────────┴───────────────────────┐
            │                                               │
      Command Parser &                             Library Engine
    Completion Provider                           (WebAssembly sql.js)
            │                                               │
            │                                     SQLite Database (dtyp.db)
            │                                     51,102 Offline C Components
            │                                               │
            └───────────────────────┬───────────────────────┘
                                    │
                          Typing Engine Core
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                Character Queue         Scheduler & Jitter
                         │
                VS Code Editor Target
            (Character-by-character typing)
```

---

## Monorepo Layout

```
dTyp/
├── apps/
│   └── vscode/                  # Offline VS Code extension
│       ├── src/                 # Extension entry, command parser, completions, typing target
│       ├── images/              # Custom high-resolution icon (256x256)
│       ├── library/             # Bundled SQLite database (dtyp.db, 178.7 MB)
│       └── dtyp-vscode-1.0.0.vsix # Production extension package (20.23 MB)
│
├── packages/
│   ├── types/                   # Domain interfaces (Component, Category, TypingOptions, LogEntry)
│   ├── utilities/               # Logger, EventEmitter, Time, File helpers
│   ├── validation/              # C component schema & syntax balance validators
│   ├── typing-engine/           # CharacterQueue, Scheduler, EditorTypingTarget
│   └── library-engine/          # SQLite client (sql.js), DependencyResolver (DAG), DuplicateDetector
│
├── database/
│   ├── schema/schema.sql        # Database schema with FTS & performance indexes
│   └── dtyp.db                  # Pre-compiled, indexed SQLite database (51,102 components)
│
├── library-source/              # Component source JSONs partitioned by domain (< 33 MB each)
│   └── components/              # 11 domain partitions (data-structures, algorithms, numerical, etc.)
│
├── taxonomy/                    # 297 hierarchical categories and metadata
│
├── scripts/
│   ├── library/generators/      # Component generators for all 11 computer science domains
│   ├── database/build-db.ts     # Compiles dtyp.db from partitioned sources (8.2s build time)
│   └── validation/validate-...  # Validates all 51,100+ components, braces, and DAG dependencies
│
└── tests/
    ├── unit/                    # Unit tests for parser, resolver, detector, and typing scheduler
    └── integration/             # End-to-end VS Code insertion & duplicate detection test flow
```

---

## Key Invariants

1. **Character-by-Character Typing**: All typing into the active VS Code editor is performed character-by-character with realistic configurable delay (`dtyp.typingDelayMs`) and human jitter. Clipboard pasting is strictly avoided.
2. **100% Offline Operation**: Zero external API calls, cloud queries, or LLM requirements. Runs from bundled WebAssembly SQLite database.
3. **Explicit Topological Dependencies**: Functions with prerequisites (e.g. `quickSort` -> `partition` -> `swap`) are topologically resolved and inserted in correct chronological order.
4. **Smart Duplicate Detection**: Scans open editor buffers to automatically omit duplicate struct or function definitions.
5. **Discrete Data Structure Variants**: Singly, Doubly, Circular Singly, and Circular Doubly Linked Lists, Trees, Stacks, Queues, Graphs each have separate, distinct components.
6. **Algorithmic Parameter Flexibility**: Numerical methods (Newton-Raphson, Bisection, etc.) support single-param function callbacks with automatic numerical derivatives, as well as explicit tolerance and iteration bounds.

---

## Command Syntax (VS Code Extension)

Type `category>component()` or fluent path drilling into your editor:

```c
// Linked Lists
ds>ll>singly>createNode()
ds>ll>singly>insertHead()
ds>ll>doubly>deleteTail()
ds>ll>circular>detectCycle()

// Searching & Sorting
algo>sort>quickSort()
algo>search>binarySearch()

// Numerical Methods
num>root>newton()
num>integral>simpson13()
num>ode>rk4()
stack>push()
queue>dequeue()
bst>insert()
graph>dijkstra()
dp>knapsack01()
```

Typing `>` after any category triggers rich autocomplete with signatures, time/space complexity, and documentation.

---

## VS Code Extension Features & Commands

- **Character-by-Character Typing**: Inserts code into the active editor character-by-character with realistic typing speed and human variance.
- **Smart Prerequisite Injection**: Automatically resolves and inserts dependent data types, structs, and helper functions ahead of the requested function.
- **Duplicate Prevention**: Scans open editor buffers to prevent re-declaring existing structs, typedefs, or function headers.
- **Deep Category Drilling**: Autocompletion supports fluent drill-down across 297 categories (e.g., `ds>ll>singly>`, `algo>sort>`, `num>root>`).
- **Interactive QuickPick Library Browser**: Search all 51,100+ components with live markdown preview.

### Extension Commands

| Command | Identifier | Description |
| :--- | :--- | :--- |
| **dTyp: Insert Component** | `dtyp.insertComponent` | Prompts for a component ID and types it character-by-character. |
| **dTyp: Browse Library** | `dtyp.browseLibrary` | Search and preview all 51,100+ offline C components. |
| **dTyp: Cancel Typing** | `dtyp.cancelTyping` | Immediately aborts any ongoing typing sequence. |

### Extension Settings

| Setting | Default | Description |
| :--- | :--- | :--- |
| `dtyp.typingDelayMs` | `15` | Typing delay in milliseconds per character (lower = faster). |
| `dtyp.checkDuplicates` | `true` | Prevent duplicate struct or function definitions from being inserted. |

---

## Quick Start & Development Instructions

### Prerequisites
- Node.js v18+ (tested on Node v22/v24)
- VS Code 1.80+

### 1. Install Dependencies
```powershell
npm install
```

### 2. Build Monorepo Packages
```powershell
npm run build
```

### 3. Run Test Suite
```powershell
npm test
```

### 4. Generate & Validate Offline Library
```powershell
npm run generate:library
npm run validate:library
npm run build:db
```

### 5. Package VS Code Extension (.vsix)
```powershell
npm run vscode:package
```
Generates `apps/vscode/dtyp-vscode-1.0.0.vsix` (20.23 MB, containing the full 178.7 MB offline SQLite database).

### 6. Install Extension Locally
```powershell
code --install-extension apps/vscode/dtyp-vscode-1.0.0.vsix
```

---

## License

MIT © [Mujahid Al Mahi](https://github.com/mujahidalmahi)

