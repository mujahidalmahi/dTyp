# dTyp Roadmap & Vision

This document outlines the strategic roadmap for the **dTyp** developer ecosystem.

---

## 🚀 Released: Version 3.0.0 (Current Production Release)

- [x] **Humanized Natural Typing Engine**:
  - Intelligent auto-closing delimiter step-over (`overtypeCharacter`).
  - Muscle-memory keyword burst acceleration (35%–60% faster on 55+ C keywords).
  - Cognitive hesitations at structural junctions (`{`, `\n`, `;`, `,`).
  - Physical QWERTY layout proximity typo simulation with immediate 4-step self-correction.
  - Seamless dual-mode: humanized actions in both Automatic Streaming and Stealth Manual (`Ctrl+D`) stepping.
- [x] **500 Compilable C Components across 7 Ordered Domains**:
  - `boiler-plates` (64), `data-structures` (126), `algorithms` (120), `competitive-programming` (50), `academics-programming` (46), `projects` (30), `detection` (64).
  - **Strict Zero-Comments Invariant**: 100% verified across all 500 components.
- [x] **8 Specialized Production Engines**:
  - `AutoTypeEngine`, `HeaderEngine`, `MemoryEngine`, `CursorEngine`, `SnippetEngine`, `SessionEngine`, `SearchEngine`, `UpdateEngine`.
- [x] **Real-World Edge Case Guards**:
  - 1ms to 1000ms delay range (`dtyp.typingDelayMs`).
  - Granular undo chunking (default: 3 chars per `Ctrl+Z`).
  - Cursor relocation detection & tab-switch guard.
- [x] **Modernized UI/UX**:
  - Preloaded QuickPick with action buttons (View Docs, Favorite, Copy Code).
  - Themed domain browser with custom icons and component action buttons.
  - Interactive hover tooltips with complexity metrics and clickable command links.
  - 1,492 structured snippets & 500 Markdown documentation pages.
- [x] **Templates Completely Eradicated**: Full removal of legacy templates per requirements.

---

## 🚀 Released: Version 2.0.0

- [x] Multi-engine modularization.
- [x] SQLite WebAssembly optimization with `sql.js`.
- [x] Activity Bar & 4 Sidebar TreeViews.
- [x] Interactive release notes webview dashboard.
- [x] Automated background GitHub release update checker.

---

## 🚀 Released: Version 1.0.0

- [x] Initial core architecture and offline database prototype.

---

## 🎯 Upcoming: Version 3.1.0

- [ ] **Custom Component Importer**: Allow users to save their own custom C functions/structs directly into the local SQLite library.
- [ ] **Typing Profiles**: Presets for typing speed (Slow / Realistic / Fast / Stealth / Instant).
- [ ] **Multi-File Project Scaffolding**: One-click generation of complete multi-file academic C projects with Makefiles, headers, and test harnesses.
