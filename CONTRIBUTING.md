# Contributing to dTyp

First off, thank you for considering contributing to **dTyp**! It is contributions like yours that make dTyp a premier academic C programming ecosystem.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **Git** with **Git LFS** installed (`git lfs install`)
- **VS Code**: v1.80.0 or higher

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mujahidalmahi/dTyp.git
   cd dTyp
   git lfs pull
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Build the workspace packages**:
   ```bash
   npm run build
   ```

4. **Run the test suite**:
   ```bash
   npm test
   ```

5. **Package the VS Code extension**:
   ```bash
   npm run vscode:package
   ```

---

## How to Contribute

### 1. Contributing C Components
All C components in dTyp adhere to strict quality invariants:
- **Zero Comments Invariant**: Components must contain 0 comments (no `//` or `/* */`).
- **Zero External Dependencies**: Must compile on standard `gcc -Wall -Wextra -std=c11` without third-party libraries.
- **Self-Contained Structures**: Any struct types required (e.g. `Node`, `Stack`, `Matrix`) must declare their typedefs and dependencies cleanly.
- **Memory Safety**: Any function that performs dynamic memory allocation (`malloc`) must check for allocation failure (`NULL`) and provide a corresponding free/destroy companion function.
- **Clear Documentation & Complexity**: Every component must specify its time and space complexity (e.g. `O(n log n)`, `O(1)`) and a descriptive summary.

### 2. Adding / Modifying Engines & Storage
The VS Code extension core is partitioned into modular engines and storage providers located under `apps/vscode/src/engine/` and `apps/vscode/src/storage/`:
- `auto-type-engine.ts`: Dual-mode typing (automatic streaming vs manual `Ctrl+Shift+D` stepping) with human cadence, Smart Block Auto-Expansion (`enter_block`), delimiter overtyping, and delayed-recognition typo correction.
- `header-engine.ts`: Document header scanning and duplicate-free auto-injection.
- `memory-engine.ts`: Heap allocation leak detection and disposable resource tracking.
- `cursor-engine.ts`: Placeholder detection and cursor navigation.
- `snippet-engine.ts`: Native completion provider with interactive tab-stops.
- `session-engine.ts`: Insertion history and favorites management.
- `search-engine.ts`: Scored fuzzy search with category filters.
- `update-engine.ts`: Background GitHub release checking and one-click VSIX update.
- `own-library-storage.ts`: Persistent local storage and JSON export/import for custom user components.

All engine logic must remain modular and covered by unit tests in `tests/unit/`.

---

## Submitting Pull Requests

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feat/my-new-feature
   ```
2. Ensure full type-checking passes:
   ```bash
   npm run build
   ```
3. Ensure all tests pass:
   ```bash
   npm test
   ```
4. Commit your changes with conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation updates
   - `refactor:` for code refactoring
5. Push to your fork and submit a Pull Request against `main`.
