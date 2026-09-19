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
- Flush all remaining queued code instantly with `dtyp.flushRemaining`.
- Cancel queue anytime with <kbd>Escape</kbd>.

[Configure Typing Mode](command:workbench.action.openSettings?%22dtyp.typingMode%22)
[Toggle Typing Mode Now](command:dtyp.toggleTypingMode)
