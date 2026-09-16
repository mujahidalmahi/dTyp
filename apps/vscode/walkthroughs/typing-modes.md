# Master Dual Typing Modes

dTyp features two distinct typing modes designed for academic simulation and workflow control:

### 1. Automatic Mode (Default)
Simulates human-like character insertion with a configurable delay (default: 15ms) and natural jitter.
- Adjust speed via `dtyp.typingDelayMs`.

### 2. Stealth Manual Mode (`Ctrl+D`)
Queues the selected component in the background and types character-by-character per press of **Ctrl+D**.
- Press <kbd>Ctrl+D</kbd> as many times as needed to step through the code stealthily.
- Configure characters typed per press with `dtyp.stepSize`.
- Cancel anytime with <kbd>Escape</kbd>.

[Configure Typing Mode](command:workbench.action.openSettings?%22dtyp.typingMode%22)
[Toggle Typing Mode Now](command:dtyp.toggleTypingMode)
