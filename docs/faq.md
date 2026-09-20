# Frequently Asked Questions (FAQ)

### Q: Is dTyp truly 100% offline?
**A:** Yes. dTyp carries an embedded SQLite database (`dtyp.db`) compiled into WebAssembly (`sql.js`). The extension does not communicate with external servers during normal operation and never sends code or telemetry over the internet.

---

### Q: How does the Humanized Natural Typing Engine work?
**A:** The engine simulates real human typing behavior in modern IDEs:
1. **Smart Block Auto-Expansion**: When you type `{` at the end of a block header (like `int main(void) {`), pressing Enter expands a 3-line scaffold with the cursor placed at column 4 on line 2, and the closing brace on line 3—exactly mimicking VS Code's `onEnterRules`.
2. **Universal Non-Sequential Coding**: Drafts skeleton return statements and allocation cleanups first, then navigates back up (`above_return`, `above_free`) to author inner algorithms and logic.
3. **Intelligent Delimiter Pairing**: Detects editor-inserted closing partners and smoothly steps over them instead of typing duplicate tokens.
4. **Muscle Memory Bursts**: 35%–60% faster typing on 55+ common C keywords (`int`, `return`, `printf`, `struct`, `sizeof`, `typedef`, etc.).
5. **Delayed-Recognition Typo Bursts**: Keystrokes occasionally overshoot by 1–2 characters before human realization, followed by a double backspace and correction.
6. **Cognitive Hesitations & Operator Whitespace Rhythm**: Natural pauses before block openers, after statements, across binary operators, and after commas.

---

### Q: How does the Stealth Manual Typing (`Ctrl+Shift+D`) mode work?
**A:** In Manual mode (`"dtyp.typingMode": "manual"`), when you select a component or snippet to insert, dTyp tokenizes and loads the humanized actions into an in-memory queue. Every time you press **`Ctrl+Shift+D`**, dTyp executes the next humanized action (including delimiter step-over, block expansion, and typo backspacing). This provides complete, realistic stealth during live demonstrations or evaluations.

---

### Q: What is the "Own Library" and how do I create custom components?
**A:** The **Own Library** allows you to save and manage your private C/C++ algorithms, lab solutions, and custom boilerplates directly inside VS Code:
- Open the **Own Library** tree view in the Activity Bar or run **`dTyp: Create Custom Component`** (`Ctrl+Shift+P`).
- Fill in the native 10-field editor form (Name, Sub-domain, Topic, Sub-topic, Description, Signature, Code, Language, Input Type, Output Type). Only Code is required.
- Saved components persist in your local VS Code global storage directory (`own-library.json`).
- You can insert custom components using the full Humanized Typing Engine, Non-Sequential Coding, Header Auto-Injection, and Memory Leak Analysis.
- Export or import your entire library at any time via `dtyp.exportOwnLibrary` and `dtyp.importOwnLibrary`.

---

### Q: How do I adjust the typing delay and undo behavior?
**A:** Open VS Code settings (`Ctrl+,`) and search for `dtyp`:
- **`dtyp.typingDelayMs`**: Configurable from 1ms up to **1000ms** per character.
- **`dtyp.undoChunkSize`**: Groups edits into 2–3 character chunks (1 to 10 max) so pressing `Ctrl+Z` undoes a few characters at a time rather than reverting the entire file.

---

### Q: Can I use dTyp with C++ files?
**A:** Yes! dTyp is activated for both `.c` and `.cpp` files. All C components are compatible with modern C++ compilers (`g++`, `clang++`, and MSVC).

---

### Q: How does dTyp avoid duplicate struct or function definitions?
**A:** dTyp includes a `DuplicateDetector` engine. Before inserting dependent components (for example, inserting a linked-list search function that depends on a `Node` struct), dTyp scans your active document. If the `Node` struct is already defined in your file, dTyp automatically skips inserting the redundant definition.

---

### Q: How do I trigger snippets with interactive tab stops?
**A:** Open any C/C++ file and type `dtyp.` to trigger VS Code's intellisense autocompletion. Available shortcuts include:
- `dtyp.main` &rarr; Standard `main()` with return status.
- `dtyp.header` &rarr; Header guard with `extern "C"` linkage.
- `dtyp.for` &rarr; Loop with tab-stops for index and limit.
- `dtyp.malloc` &rarr; Safe allocation check.
- `dtyp.test` &rarr; Lightweight assertion test runner.

---

### Q: How can I update dTyp when a new release is available?
**A:** dTyp includes an integrated **Update Engine**. By default, it checks the public GitHub releases API in the background. When a new version is released, a notification with an **"Update Extension"** button will appear, downloading and applying the update automatically. You can also run **`dTyp: Check for Updates...`** from the Command Palette anytime.

---

### Q: What is the Control Center Flight Deck?
**A:** Press **`Ctrl+Alt+C`** or run `dTyp: Open Control Center Flight Deck` to launch a full-screen, dark-mode command center. It offers real-time session telemetry, live 1-click typing mode switching, a searchable keyboard shortcuts cheatsheet, and quick launcher buttons for every diagnostic and visualization tool in dTyp.

---

### Q: What is Chameleon Ghost-Typing Mode?
**A:** Press **`Alt+C`** (`dtyp.toggleChameleonMode`). While Chameleon Mode is active, pressing any physical key on your keyboard outputs the exact next character from the queued algorithm. This allows you to type naturally and rhythmically on your physical keyboard during live examinations or technical interviews without having to memorize character positions.

---

### Q: How does the Code Doctor Automated Linter work?
**A:** Press **`Ctrl+Shift+L`** or run `dTyp: Academic Code Doctor: Diagnose & Auto-Fix`. Code Doctor scans your active C source code for 7 common academic bugs (uninitialized pointers, buffer overflows, format string mismatches, memory leaks, missing return types) and provides 1-click QuickFixes right in the editor.

---

### Q: How many components are available in dTyp v4.0?
**A:** dTyp v4.0 includes **665 production-grade, compilable C components** across 7 primary computer science domains (103 Boiler Plates, 178 Data Structures, 164 Algorithms, 70 Competitive Programming, 56 Academics Programming, 30 Projects, 64 Detection), plus 1,492 native snippets and unlimited custom components in your **Own Library**.
