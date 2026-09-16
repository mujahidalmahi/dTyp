# dTyp Architecture Guide (v2.0)

## Overview

**dTyp (Don't Tell Your Professor)** is a production-grade VS Code extension and offline academic C programming ecosystem designed to provide instant, offline C code insertion, smart context awareness, and character-by-character editor typing simulation.

```
                                dTyp Workspace
                                      │
                                 apps/vscode
                             (VS Code Extension)
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
   Activity Bar & Views         6 Core Engines               Database & Query
  (Library Explorer,         (Cursor, Session,             (WebAssembly sql.js)
   Favorites, History,        Memory, AutoType,                    │
   Quick Controls,            Search, Snippets)         SQLite Database (dtyp.db)
   Release Notes Webview)             │                 24,478 Offline C Components
         │                            │                            │
         └────────────────────────────┼────────────────────────────┘
                                      │
                                 Shared Core
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
   typing-engine                  utilities                    validation
(CharacterQueue,             (Logger, Events,             (Component & Syntax
 Scheduler, Target)           File I/O, Jitter)            Balance Validator)
```

---

## 1. Extension Lifecycle & Initialization

When Visual Studio Code activates `dtyp-vscode`:
1. **Database & WASM Bootstrap**: `LibraryEngine` loads `sql-wasm.wasm` and opens `library/dtyp.db` via `sql.js` purely in memory. No native C++ addons are loaded, guaranteeing cross-platform compatibility across Windows, macOS, and Linux.
2. **Engine Initialization**:
   - `CursorEngine` initializes token patterns for cursor jump navigation.
   - `SessionEngine` restores insertion history and starred favorites from `ExtensionContext.globalState`.
   - `MemoryEngine` configures standard library header signatures.
   - `AutoTypeEngine` sets up status bar items, typing queues, and keybinding context flags (`dtyp.isTyping`, `dtyp.hasQueuedCharacters`).
   - `SearchEngine` primes the LRU cache and compiles category indexes.
   - `SnippetEngine` registers with `vscode.languages.registerCompletionItemProvider` for `c` and `cpp` files.
3. **Activity Bar TreeView Registration**:
   - `LibraryTreeProvider` -> `dtyp.libraryView`
   - `FavoritesTreeProvider` -> `dtyp.favoritesView`
   - `HistoryTreeProvider` -> `dtyp.historyView`
   - `QuickActionsProvider` -> `dtyp.quickActionsView`
4. **Lifecycle Hooks**:
   - Check if an extension version upgrade occurred. If so, display the interactive "What's New" Release Notes Webview.
   - If `dtyp.checkForUpdates` is true, schedule an asynchronous non-blocking GitHub release check.

---

## 2. The 6 Production Engines (`apps/vscode/src/engine/`)

### 1. `CursorEngine`
- **Target Detection**: Uses regex scanning to locate placeholder tokens (such as `/* TODO */`, `/* INSERT */`, `<type>`, `/* YOUR CODE HERE */`) in inserted snippets.
- **Auto-Selection**: Immediately positions the editor cursor and highlights the placeholder so the user can begin typing without reaching for the mouse.
- **Navigation**: Supports cycling through multiple placeholders forward and backward.

### 2. `SessionEngine`
- **State Persistence**: Serializes insertion history and starred favorite component IDs into VS Code's `globalState` store.
- **Telemetry-Free Metrics**: Tracks personal stats (components used, characters simulated) locally without sending any data over the network.
- **Favorites Management**: Offers fast toggle operations from the Command Palette or the Activity Bar context menu.

### 3. `MemoryEngine`
- **Document Context Analysis**: Parses the active editor's text to determine existing `#include` statements.
- **Header Mapping**: Maintains a dictionary mapping C symbols (e.g. `malloc` -> `<stdlib.h>`, `bool` -> `<stdbool.h>`, `sqrt` -> `<math.h>`, `uint32_t` -> `<stdint.h>`) to standard headers.
- **Non-Destructive Header Injection**: Automatically inserts missing headers at the top of the file before typing begins, avoiding duplicate includes.
- **Symbol Conflict Prevention**: Verifies that inserting a struct or function won't cause syntax collisions with existing declarations.

### 4. `AutoTypeEngine`
- **Dual Execution Modes**:
  1. **Automatic Streaming**: Simulates continuous typing using a timed scheduler with randomized human jitter.
  2. **Stealth Manual Stepping**: Pushes the text into an in-memory character queue. Each press of **`Ctrl+D`** consumes `stepSize` characters from the buffer and writes them via atomic editor transactions.
- **Context Synchronization**: Updates VS Code context keys (`dtyp.hasQueuedCharacters`, `dtyp.isTyping`) to control keybinding precedence.
- **Status Bar Integration**: Displays a live character countdown (e.g. `$(keyboard) dTyp: 184 chars [Ctrl+D to step]`).
- **Emergency Cancel**: Pressing `Escape` halts streaming immediately and flushes the queue.

### 5. `SearchEngine`
- **Ranked Fuzzy Scoring Matrix**:
  - Exact Component ID Match: `1000` pts
  - Exact Name Match: `800` pts
  - Name Prefix Match: `600` pts
  - Name Contains Query: `400` pts
  - Alias Match: `350` pts
  - Category Match: `250` pts
  - Tag / Keyword Match: `150` pts
- **Category Scoping**: Supports prefixes such as `boiler:`, `ds:`, `algo:`, `num:`, `cp:` to restrict the search domain.
- **Sub-Millisecond LRU Cache**: Caches recent search queries in memory to ensure zero keystroke lag during QuickPick typing.

### 6. `SnippetEngine`
- **Native VS Code Snippets**: Provides built-in tab-stop completions (`$1`, `$2`, `$0`) for C language constructs.
- **Fast Triggers**: `dtyp.main`, `dtyp.for`, `dtyp.malloc`, `dtyp.file.read`, `dtyp.cp.fastio`, `dtyp.test`, etc.

---

## 3. Activity Bar & UI Integration

dTyp contributes a custom container to the VS Code Activity Bar:
- **Container ID**: `dtyp-explorer`
- **Activity Bar Icon**: `images/dtyp-activitybar.svg`
- **Tree Views**:
  1. `dtyp.libraryView`: Hierarchical tree rendering the 24,478 components across domains and categories. Supports inline buttons for inserting, favoriting, and copying code.
  2. `dtyp.favoritesView`: Quick-access list of user-favorited components.
  3. `dtyp.historyView`: Chronological list of recently typed components with relative timestamps.
  4. `dtyp.quickActionsView`: Fast toggle controls for typing mode, delay settings, update checking, and diagnostics.

---

## 4. WebAssembly SQLite Storage Layer

- **Pure WebAssembly**: Powered by `sql.js` compiled from SQLite 3. Zero native Node.js binaries (`node-gyp`) are used, eliminating OS-specific compilation issues.
- **Single File Bundle**: All component data, metadata, complexity classifications, and signatures are compiled into `dtyp.db` (optimized at 47.2 MB).
- **In-Memory Querying**: The database is read once during extension startup into WebAssembly memory, enabling instant sub-millisecond query execution.

---

## 5. Automated Diagnostics & Health Check

The `dtyp.diagnostics` command runs a full system audit:
- Database availability and record count verification.
- WebAssembly heap and query latency tests.
- Validation of active configuration values (`typingMode`, `stepSize`, `typingDelayMs`).
- Editor focus and document language compatibility checks.
