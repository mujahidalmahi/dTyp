# Frequently Asked Questions (FAQ)

### Q: Is dTyp truly 100% offline?
**A:** Yes. dTyp carries an embedded SQLite database (`dtyp.db`) compiled into WebAssembly (`sql.js`). The extension does not communicate with external servers during normal operation and never sends code or telemetry over the internet.

---

### Q: How does the Stealth Manual Typing (`Ctrl+D`) mode work?
**A:** In Manual mode (`"dtyp.typingMode": "manual"`), when you select a component or snippet to insert, dTyp loads the code into an in-memory queue. Every time you press **`Ctrl+D`**, dTyp types the next character (or token batch configured via `dtyp.stepSize`) at your cursor position. This allows you to control the exact pacing of code generation during live demonstrations, screen shares, or laboratory sessions.

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
