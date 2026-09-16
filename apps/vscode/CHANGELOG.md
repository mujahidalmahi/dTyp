# Change Log

All notable changes to the "dtyp-vscode" extension will be documented in this file.

## [2.0.0] - 2026-09-17

### Major Architecture & Engine Overhaul
- **Dual Typing Modes**: Added Stealth Manual Mode with `Ctrl+D` step-per-press typing alongside Automatic continuous typing mode.
- **6 Production Engines**:
  - **CursorEngine**: Automatic jump to first placeholder (`/* TODO */`, `<type>`) and placeholder navigation.
  - **SessionEngine**: Insertion history tracking, favorites list, and session statistics.
  - **MemoryEngine**: Document context analysis with automatic `#include` header injection.
  - **SearchEngine**: Fuzzy trigram search with relevance score ranking and category scoping.
  - **AutoTypeEngine**: Manages dual automatic and manual step queues.
  - **SnippetEngine**: Live snippet provider with tab-stops (`$1`, `$2`, `$0`) and instant completion.
- **Clean 24,000+ Component Library**: Replaced bloated artificial variants with rich parameter and algorithmic variations.
- **New Primary Category**: Added `Boiler Plate` category with main starters, header guards, Makefiles, allocators, and testing harnesses.
- **73% Database Size Reduction**: Optimized SQLite database from 178.7 MB to 47.2 MB.
- **New Visual Identity**: Integrated new modern `dTyp_` monochrome logo.

## [1.0.0] - 2026-09-16

- Initial production release.
- Added 1,090 validated academic C programming components across 24 categories.
- Offline SQLite database integration (`dtyp.db`).
- Character-by-character editor insertion via queue scheduler.
- Autocomplete provider with `category>component()` syntax.
- DAG dependency resolver with cycle detection.
- Duplicate detection preventing re-insertion of existing functions and structs.
