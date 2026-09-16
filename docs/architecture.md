# dTyp Architecture Guide

## Overview

**dTyp (Don't Tell Your Professor)** is an offline desktop automation application and VS Code extension ecosystem designed to provide academic C code insertion and cross-application automated typing.

```
                           dTyp Workspace
                                 │
         ┌───────────────────────┴───────────────────────┐
         │                                               │
   apps/desktop                                     apps/vscode
 (Electron + React)                             (VS Code Extension)
         │                                               │
         └───────────────────────┬───────────────────────┘
                                 │
                            Shared Core
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
   typing-engine          session-engine          library-engine
(CharacterQueue,        (SessionManager,        (SQLite, DAG Resolver,
Scheduler, Target)      TargetRecovery)          DuplicateDetector)
         │                       │                       │
         └───────────────────────┴───────────────────────┘
```

---

## 1. Electron Desktop Architecture

### Process Separation

1. **Main Process (`apps/desktop/electron/main.ts`)**:
   - Manages application lifecycle and native OS integration.
   - Manages global shortcut `Ctrl+D` using `electron.globalShortcut`.
   - Manages background system tray (`DTypTray`).
   - Executes native Windows automation via `WindowsBridgeService`.
   - Coordinates sessions via `SessionManager`.
   - Handles IPC communications via typed handlers (`ipc.ts`).

2. **Renderer Process (`apps/desktop/renderer/`)**:
   - Modern React single-page UI built with Vite.
   - Strictly isolated from Node.js runtime (`contextIsolation: true`, `sandbox: true`).
   - Communicates exclusively via `window.dtyp` exposed by the preload script.

3. **Preload Script (`apps/desktop/electron/preload.ts`)**:
   - Exposes safe, validated API functions and event subscriptions.
   - Eliminates direct Node module access from renderer.

### Windows Win32 Bridge (`dtyp-bridge.exe`)

To guarantee 100% stability without fragile native C++ npm addons or Electron ABI mismatches across versions:
- `dtyp-bridge.cs` is compiled via Windows's standard C# compiler (`csc.exe`).
- Implements:
  - `list-windows`: Enumerates active top-level windows via `EnumWindows`, extracting HWND, process name, and window title.
  - `focus <hwnd>`: Restores and focuses target window via `ShowWindow(SW_RESTORE)` and `SetForegroundWindow`.
  - `send-char <char>`: Injects hardware-level keyboard input via Win32 `SendInput` with `KEYEVENTF_UNICODE`.
  - `release-modifiers`: Releases `VK_SHIFT`, `VK_CONTROL`, `VK_MENU` (Alt) keys to prevent stuck keys on cancellation.

---

## 2. Invariants

1. **Character-by-Character Typing**: All code insertion occurs character-by-character through the queue scheduler with realistic configurable delays. Bulk paste is strictly avoided.
2. **Hotkey Safety**: `Ctrl+D` is registered ONLY while a session is in the `active` state. Deactivating, terminating, or exiting dTyp releases `Ctrl+D` immediately.
3. **Offline Operation**: 100% local-first. Bundled SQLite database (`dtyp.db`) is read-only during runtime. No cloud dependencies.
4. **Dependency Resolution**: Prerequisites are resolved in topological order with cycle detection (`DependencyCycleError`).
5. **Duplicate Prevention**: Existing signatures and structs in target documents are detected and deduplicated before insertion.
