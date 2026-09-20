# ⌨️ dTyp Official Keyboard Shortcuts & Master Cheatsheet

Welcome to the definitive reference for **dTyp** commands and keyboard shortcuts. All shortcuts are natively integrated into VS Code with smart contextual `when`-clauses so they never interfere with regular editing.

---

## 🛸 Flight Deck, Status Bar & Control Navigation

| Shortcut | Command ID | Action & Behavior |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>C</kbd> | `dtyp.openControlCenter` | **Open Control Center Flight Deck**: Opens the unified dashboard with live metrics, quick mode switches, and full shortcuts reference. |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd> | `dtyp.openStatusBarMenu` | **Open Quick Status Bar Menu**: Interactive launcher providing 1-click access to all 20+ commands, visualizers, and tools. |

[Open Control Center](command:dtyp.openControlCenter) &bull; [Open Status Bar Menu](command:dtyp.openStatusBarMenu)

---

## 🚀 Live Stepping & Chameleon Ghost-Typing

| Shortcut | Command ID | Action & Behavior |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> | `dtyp.typeNextCharacter` | **Step Next Character**: In Manual Mode, advances typing by 1 character (or configurable `dtyp.stepSize`). |
| <kbd>Alt</kbd> + <kbd>C</kbd> | `dtyp.toggleChameleonMode` | **Toggle Chameleon Ghost-Typing**: When ON, pressing **ANY physical key** on your keyboard outputs the exact next character from the queued algorithm. |
| <kbd>Alt</kbd> + <kbd>P</kbd> | `dtyp.togglePauseTyping` | **Pause / Resume**: Instantly freezes or unfreezes automated typing without losing head memory. |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> | `dtyp.renewQueue` | **Renew & Unblock**: Clears any blockage, resets cursor memory, and restarts typing from character 0. |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd> | `dtyp.rewindStep` | **Rewind Step**: Undo the last character typed in manual stepping mode. |
| <kbd>Escape</kbd> | `dtyp.cancelTyping` | **Cancel / Stop**: Immediately halts active typing and clears the pending buffer. |

[Toggle Chameleon Mode](command:dtyp.toggleChameleonMode) &bull; [Step Character](command:dtyp.typeNextCharacter) &bull; [Renew Queue](command:dtyp.renewQueue)

---

## ⚡ In-Flight Speed Scrubbing

| Shortcut | Command ID | Action & Behavior |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>]</kbd> | `dtyp.speedUpTyping` | **Speed Up (+25%)**: Dynamically accelerates typing speed multiplier (up to 5.0x) without restarting. |
| <kbd>Ctrl</kbd> + <kbd>[</kbd> | `dtyp.slowDownTyping` | **Slow Down (-20%)**: Dynamically decelerates typing speed multiplier (down to 0.25x). |

[Speed Up Typing](command:dtyp.speedUpTyping) &bull; [Slow Down Typing](command:dtyp.slowDownTyping)

---

## 🩺 Academic Code Doctor, Formatter & Quality Guard

| Shortcut | Command ID | Action & Behavior |
| :--- | :--- | :--- |
| <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> | `dtyp.formatAcademic` | **Academic Pure Tab Formatter**: Enforces strict university standards with pure tabs (`\t`), spaces around binary operators, and K&R/Allman brace formatting. |
| <kbd>Ctrl</kbd> + <kbd>F8</kbd> | `dtyp.auditCode` | **Academic Code Doctor Audit**: Audits AST for missing return statements in non-void functions, uninitialized wild pointers, and unreachable dead code. |
| *QuickFix (Lightbulb)* | `dtyp.doctorQuickFix` | **1-Click QuickFix**: Automatically initializes pointers to `NULL` and remedies academic code issues. |

[Format Code with Pure Tabs](command:dtyp.formatAcademic) &bull; [Audit Code Defects](command:dtyp.auditCode)

---

## 🏆 Competitive Programming Arena & Stress Tester

| Shortcut | Command ID | Action & Behavior |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>F9</kbd> | `dtyp.scaffoldContest` | **Scaffold Contest Arena**: 1-Click boilerplate picker for Fast I/O (`getchar_unlocked`), 64MB Static Bump Arena, or Automated Differential Stress Tester. |
| *Command Palette* | `dtyp.scaffoldContest` &rarr; Fast I/O | **Fast I/O Template**: High-speed integer parser (~5x faster than `scanf`) avoiding I/O bottlenecks. |
| *Command Palette* | `dtyp.scaffoldContest` &rarr; Arena | **Static Bump Arena**: 64MB zero-overhead pool allocation with `arena_alloc()` for O(1) memory management. |
| *Command Palette* | `dtyp.scaffoldContest` &rarr; Stress Test | **Automated Stress Tester**: Runs thousands of randomized trials comparing `solve_brute()` against `solve_optimized()`. |

[Scaffold Contest Arena](command:dtyp.scaffoldContest)

---

## 🛠️ Compiling, Sandboxing & Memory Leak Profilers

| Shortcut | Command ID | Action & Behavior |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>F5</kbd> | `dtyp.compileAndRun` | **1-Click Compile & Run**: Auto-detects GCC/Clang, saves file, compiles with `-Wall -Wextra -std=c11 -O2`, and executes in integrated terminal. |
| <kbd>Ctrl</kbd> + <kbd>F6</kbd> | `dtyp.runTestCases` | **Multi-Test Sandbox**: Opens side-by-side test runner panel with stdin/stdout diffs, timeout guard, and preset algorithm suites. |
| <kbd>Ctrl</kbd> + <kbd>F7</kbd> | `dtyp.runSanitizer` | **AddressSanitizer & UB Guard**: Compiles with `-fsanitize=address,undefined` and translates cryptic ASan traces into human-friendly explanations. |
| *Command Palette* | `dtyp.runValgrind` | **Valgrind Deep Leak Profiler**: Runs `valgrind --leak-check=full` with debug symbols, parsing definitely and indirectly lost bytes with allocation stack traces. |

[Compile & Run](command:dtyp.compileAndRun) &bull; [Run Multi-Test Sandbox](command:dtyp.runTestCases) &bull; [Run AddressSanitizer](command:dtyp.runSanitizer) &bull; [Run Valgrind Profiler](command:dtyp.runValgrind)

---

## 🎨 Interactive Visualizers & Drill Arenas

| Shortcut | Command ID | Action & Behavior |
| :--- | :--- | :--- |
| *Command Palette* | `dtyp.visualizeRecursion` | **Live Recursion Tree Visualizer**: Interactive SVG recursion tree showing call stack frames, execution step scrubbers, and duplicate subproblem highlights. |
| *Command Palette* | `dtyp.openTypingDrill` | **C Typing Speed Drill Arena**: Gamified "TypeRacer for C" drill with real-time character accuracy, WPM/CPM gauges, and high score tracking. |
| *Command Palette* | `dtyp.visualizeComponent` | **Data Structure & Memory Visualizer**: Interactive SVG diagrams of linked lists, binary trees, heaps, and pointer topologies. |
| *Command Palette* | `dtyp.openFlashcards` | **Exam Flashcards**: Interactive 3D flip-card deck covering Recurrences, Master Theorem, Pointers, and Bitwise tricks. |
| *Command Palette* | `dtyp.toggleSteppingHud` | **Stepping HUD**: Mini-player overlay widget with scrubber, CPS meter, and pure WebAudio mechanical switch synthesizer. |

[Open Recursion Tree](command:dtyp.visualizeRecursion) &bull; [Open Typing Drill Arena](command:dtyp.openTypingDrill) &bull; [Open Stepping HUD](command:dtyp.toggleSteppingHud) &bull; [Open Flashcards](command:dtyp.openFlashcards)

---

## 📚 Library, Search & Code Modularization

| Shortcut | Command ID | Action & Behavior |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>D</kbd> | `dtyp.browseLibrary` | **Browse Offline Library**: Hierarchical quickpick of 665+ C algorithms, data structures, and POSIX routines. |
| <kbd>Alt</kbd> + <kbd>↓</kbd> | `dtyp.jumpToNextPlaceholder` | **Next Placeholder**: Jumps cursor to the next `TODO` or `<#placeholder#>`. |
| <kbd>Alt</kbd> + <kbd>↑</kbd> | `dtyp.jumpToPrevPlaceholder` | **Previous Placeholder**: Jumps cursor to the preceding placeholder. |
| *Command Palette* | `dtyp.modularize` | **Academic Modularize**: Splits single `.c` file into `module.h`, `module.c`, `main.c`, and a university `Makefile` with pure tabs (`\t`). |
| *Command Palette* | `dtyp.benchmarkComponent` | **Empirical Complexity Benchmarker**: Times execution across multiple N input sizes and mathematically fits asymptotic Big-O curve. |

[Browse Library](command:dtyp.browseLibrary) &bull; [Modularize Code](command:dtyp.modularize) &bull; [Benchmark Complexity](command:dtyp.benchmarkComponent)
