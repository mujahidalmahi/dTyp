# Frequently Asked Questions (FAQ)

### Q: Is dTyp truly 100% offline?
**A:** Yes. dTyp carries an embedded SQLite database (`dtyp.db`) compiled into WebAssembly (`sql.js`). The extension does not communicate with external servers during normal operation and never sends code or telemetry over the internet.

---

### Q: How does the Humanized Natural Typing Engine work?
**A:** The engine simulates real human typing behavior in modern IDEs:
1. **Intelligent Delimiter Pairing**: When you type `{` or `(`, VS Code auto-creates the closing partner. dTyp detects this and steps over the closing delimiter instead of typing a duplicate token.
2. **Muscle Memory Bursts**: 35%–60% faster typing on 55+ common C keywords (`int`, `return`, `printf`, `struct`, `sizeof`, `typedef`, etc.).
3. **Cognitive Hesitations**: Natural pauses before block openers (`{`), after statement ends (`;`), at line breaks (`\n`), and after parameter commas (`,`).
4. **Physical QWERTY Typos**: Occasional realistic keystroke slips to adjacent keys with an immediate 4-step self-correction sequence: stroke &rarr; pause &rarr; backspace &rarr; correct stroke.

---

### Q: How does the Stealth Manual Typing (`Ctrl+D`) mode work?
**A:** In Manual mode (`"dtyp.typingMode": "manual"`), when you select a component or snippet to insert, dTyp tokenizes and loads the humanized actions into an in-memory queue. Every time you press **`Ctrl+D`**, dTyp executes the next humanized keystroke (including delimiter step-over and typo backspacing). This provides complete, realistic stealth during live demonstrations or evaluations.

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
