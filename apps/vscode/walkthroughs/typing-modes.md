# Master Dual Typing Modes & Edge-Case Guards

dTyp features two distinct typing modes designed for academic simulation and full workflow control:

### 1. Automatic Mode (Default)
Simulates human-like character insertion with a configurable delay from 1ms up to **1000ms** (`dtyp.typingDelayMs`) and realistic human jitter (`dtyp.typingJitterMs`).
- **Smart Block Auto-Expansion**: Inserts 3-line indented scaffolds at opening braces with cursor at col 4, exactly like pressing Enter in VS Code.
- **Universal Non-Sequential Coding**: Drafts skeletons first (`above_return`), allocation-cleanup pairs (`above_free`), then fills inner logic.
- **Delayed-Recognition Typo Bursts**: Models real human overshoot &rarr; pause &rarr; double backspace &rarr; correct typing.
- **Cursor Relocation Guard**: If the cursor is manually moved during typing, dTyp pauses with an interactive prompt to resume or realign.
- **Tab-Switch Guard**: Automatically pauses if you switch editor tabs or files.
- **Granular Undo**: Steps back 2–3 characters at a time (`Ctrl+Z`) rather than deleting the entire block.

### 2. Stealth Manual Mode (`Ctrl+Shift+D`)
Queues the selected component in the background and types characters per press of **Ctrl+Shift+D**.
- Step through code at your own pace with `dtyp.stepSize` (1 to 50 chars per press).
- Delimiter step-overs, block expansion, and typo backspaces are all executed through the manual buffer.
- **Instant Pause & Resume (`Alt+P`)**: Press <kbd>Alt+P</kbd> or click the status bar item to instantly pause or resume typing.
- **Renew Queue (`Ctrl+Shift+R`)**: Reset the current or completed session back to character 0.
- **Rewind Step (`Ctrl+Shift+U`)**: Undo the last character typed in manual mode.
- **Cancel Anytime (`Escape`)**: Cancel automated typing or clear the manual buffer.

### 3. Chameleon Ghost-Typing Mode (`Alt+C`)
When active, press **any physical key** on your keyboard to emit the exact next character from the queued algorithm. Enables flawless typing during live evaluations or interviews while your hands type freely.
- **Biomechanical Cadence**: Models finger reach, hand alternation, and QWERTY proximity.
- **False Starts & Rethinking (`dtyp.enableFalseStarts`)**: Realistically drafts 2–4 alternative characters, hesitates, backspaces, and writes the correct code.

[Configure Typing Mode](command:workbench.action.openSettings?%22dtyp.typingMode%22)
[Toggle Typing Mode Now](command:dtyp.toggleTypingMode)
[Toggle Chameleon Mode](command:dtyp.toggleChameleonMode)
