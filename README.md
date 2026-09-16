# dTyp — Don't Tell Your Professor

Production-grade Windows desktop application and VS Code extension ecosystem featuring a shared character-by-character typing engine, an offline SQLite academic C programming library (1,000+ components), and background session automation with global `Ctrl+D` coordination.

---

## Architecture Overview

```
                                  dTyp
                                    │
             ┌──────────────────────┴──────────────────────┐
             │                                             │
      Electron Desktop                              VS Code Extension
             │                                             │
       ┌─────┴──────┐                                ┌─────┴──────┐
       │            │                                │            │
   Sessions     Windows                           Parser      Library
       │         Layer                               │          Engine
       │            │                                │            │
       │       Hotkey/Input                          │         SQLite
       │            │                                │            │
       └──────┬─────┘                                └─────┬──────┘
              │                                            │
              └─────────────────────┬──────────────────────┘
                                    │
                               Shared Core
                                    │
                          ┌─────────┴─────────┐
                          │                   │
                     Typing Engine        Shared Types
                          │
                   Character Scheduler
                          │
               Keyboard/Editor Target Adapter
```

---

## Monorepo Layout

```
dTyp/
├── apps/
│   ├── desktop/                 # Windows Electron + React application
│   │   ├── electron/            # Main process, preload, IPC router, tray, Windows targets
│   │   ├── renderer/            # React + Vite desktop UI
│   │   └── windows/             # Win32 automation bridge (dtyp-bridge.exe)
│   │
│   └── vscode/                  # Offline VS Code extension
│       ├── src/                 # Extension entry, command parser, completions, typing target
│       └── library/             # Bundled SQLite database (dtyp.db)
│
├── packages/
│   ├── types/                   # Shared TypeScript interfaces (Session, Typing, Library, IPC)
│   ├── utilities/               # Logger, EventEmitter, Time, File helpers
│   ├── validation/              # Schemas and validators for components and sessions
│   ├── storage/                 # Local persistence service (%APPDATA%/dTyp/)
│   ├── typing-engine/           # Queue, Scheduler, KeyboardMapper, DefaultTypingEngine
│   ├── session-engine/          # SessionManager, TargetRecovery, StateMachine
│   ├── library-engine/          # SQLite client (sql.js), DependencyResolver (DAG), DuplicateDetector
│   └── core/                    # Unified orchestrator
│
├── database/
│   ├── schema/schema.sql        # Database schema with performance indexes
│   └── dtyp.db                  # Pre-compiled, indexed SQLite database (1,090 components)
│
├── library-source/              # Maintainable JSON sources for all 24 categories
│
├── scripts/
│   ├── database/build-db.ts     # Compiles dtyp.db from validated library sources
│   ├── library/generate-...     # Generates 1,000+ academic C components
│   ├── validation/validate-...  # Validates syntax, schemas, and dependency graphs
│   └── build/compile-bridge.ps1 # Compiles Windows C# automation bridge via csc.exe
│
└── tests/
    ├── unit/                    # Unit tests for core packages
    └── integration/             # Integration tests for Desktop & VS Code flows
```

---

## Key Invariants

1. **Character-by-Character Typing**: All typing is performed character-by-character through the queue scheduler with realistic configurable delays. Bulk paste is strictly avoided.
2. **Hotkey Safety**: `Ctrl+D` is registered **only** while a session is active. Terminating the session, deactivating, or closing dTyp immediately unregisters `Ctrl+D`.
3. **Offline Operation**: The C library runs 100% offline from the bundled `dtyp.db` database. No external servers or LLM APIs required.
4. **Explicit Dependencies**: Functions with prerequisites (e.g. `quickSort` -> `partition` -> `swap`) are automatically topologically resolved and inserted in correct order.
5. **Duplicate Detection**: The extension inspects open files to prevent duplicate struct and function declarations from being inserted.

---

## Command Syntax (VS Code Extension)

Type `category>component()` into your editor:

```c
linkedList>createNode()
linkedList>insertAtBeginning()
sorting>quickSort()
stack>push()
queue>dequeue()
bst>insert()
graph>dijkstra()
dp>knapsack01()
numerical>bisectionMethod()
```

Typing `>` after any category triggers rich autocomplete with signatures, time/space complexity, and documentation.

---

## Desktop Application Features

- **Dashboard**: Live active session status, speed slider, and quick termination button.
- **Sessions**: Create, save, activate, renew, and delete multi-mapping sessions.
- **Targets**: Live detection and enumeration of top-level Windows application windows (Notepad, Word, VS Code, browsers, terminals).
- **System Tray**: Runs unobtrusively in the background with quick access to session controls.
- **Logging**: Structured, real-time log viewer.

---

## Quick Start & Build Instructions

### Prerequisites
- Node.js v18+ (tested on Node v22/24)
- Windows x64

### 1. Install Dependencies
```powershell
npm install
```

### 2. Build Core Packages
```powershell
npm run build
```

### 3. Run Test Suite
```powershell
npm test
```

### 4. Build Database & Win32 Bridge
```powershell
npm run generate:library
npm run validate:library
npm run build:db
npm run build:bridge
```

### 5. Launch Desktop App in Development Mode
```powershell
npm run desktop:dev
```

---

## Packaging

- **Desktop Installer**:
  ```powershell
  npm --workspace=@dtyp/desktop run package
  ```
  Generates `release/dTyp-Setup-1.0.0-x64.exe`.

- **VS Code Extension VSIX**:
  ```powershell
  npx @vscode/vsce package --no-dependencies
  ```
  Generates `dtyp-vscode-1.0.0.vsix`.

---

## License

MIT License. Designed and engineered for high-reliability Windows automation and offline academic C programming.
