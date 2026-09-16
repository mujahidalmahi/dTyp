# dTyp Architecture Guide

## Overview

**dTyp (Don't Tell Your Professor)** is a production-grade VS Code extension and offline academic C programming ecosystem designed to provide instant, offline C code insertion and character-by-character editor typing simulation.

```
                            dTyp Workspace
                                  │
                             apps/vscode
                         (VS Code Extension)
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
                             Shared Core
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
    typing-engine             utilities               validation
 (CharacterQueue,        (Logger, Events,        (Component & Syntax
 Scheduler, Target)      File I/O, Jitter)        Balance Validator)
```

---

## 1. Subsystems

### A. VS Code Extension (`apps/vscode/`)
- **Activation Events**: Activated on `c`, `cpp` files and `dtyp.*` commands.
- **`CommandParser`**: Parses input command syntax (`category>component()` or fluent path drilling `ds>ll>singly>insertHead()`).
- **`DTypCompletionProvider`**: Rich autocomplete triggered by `>` with deep hierarchical category exploration, type signatures, and documentation markdown previews.
- **`VSCodeTypingTarget`**: Implements `TypingTarget` interface, writing character-by-character into `vscode.window.activeTextEditor` with realistic simulated typing delay.
- **Publisher ID**: `1da7b1e6-01f1-6f58-9ef3-d95516c5e875`
- **Bundled Database**: Contains `dtyp.db` (178.7 MB SQLite database, packaged inside a 20.23 MB `.vsix`).

### B. Library Engine (`packages/library-engine/`)
- **`SqliteClient`**: In-memory SQLite querying using WebAssembly `sql.js`. Zero native C++ Node addons, guaranteeing cross-platform extension host execution.
- **`DependencyResolver`**: Directed Acyclic Graph (DAG) topological sorter that orders prerequisites (e.g. structs, nodes, helper functions) before inserting the requested component.
- **`DuplicateDetector`**: Regex and AST-based scanner that inspects active editor text to prevent inserting existing structs, typedefs, or function declarations.
- **Hierarchical Path & Alias Matching**: Resolves abbreviations (`ll` -> `linked-list`, `num` -> `numerical-methods`, `ds` -> `data-structures`).

### C. Typing Engine (`packages/typing-engine/`)
- **`CharacterQueue`**: Normalizes line endings (`\r\n` -> `\n`) and manages character streams.
- **`TypingScheduler`**: Asynchronous non-blocking queue scheduling characters with configurable delay (`dtyp.typingDelayMs`), human-like randomized jitter, pause/resume, and safe cancellation.

---

## 2. Invariants

1. **Character-by-Character Typing**: All code insertion occurs character-by-character through the queue scheduler with realistic configurable delays. Bulk paste is strictly avoided.
2. **100% Offline Operation**: Local-first runtime. Bundled SQLite database (`dtyp.db`) requires zero network access, external servers, or LLM APIs.
3. **Topological Dependency Resolution**: Prerequisites are resolved in topological order with cycle detection (`DependencyCycleError`).
4. **Duplicate Prevention**: Existing signatures and structs in target documents are detected and deduplicated before insertion.
5. **Discrete Data Structure Variants**: Every linked list type (Singly, Doubly, Circular Singly, Circular Doubly) and data structure has dedicated components.
6. **Configurable Complexity**: Numerical methods support single-parameter callbacks with automated internal derivatives as well as explicit bounds.
