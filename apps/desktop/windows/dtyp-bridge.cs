using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;

namespace DTyp.Windows {
    class Program {
        [DllImport("user32.dll")]
        private static extern bool EnumWindows(EnumWindowsProc enumProc, IntPtr lParam);
        private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

        [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        private static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

        [DllImport("user32.dll")]
        private static extern bool IsWindowVisible(IntPtr hWnd);

        [DllImport("user32.dll")]
        private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

        [DllImport("user32.dll")]
        private static extern bool SetForegroundWindow(IntPtr hWnd);

        [DllImport("user32.dll")]
        private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        [DllImport("user32.dll")]
        private static extern uint SendInput(uint nInputs, [MarshalAs(UnmanagedType.LPArray), In] INPUT[] pInputs, int cbSize);

        [StructLayout(LayoutKind.Sequential)]
        struct INPUT {
            public uint type;
            public InputUnion u;
        }

        [StructLayout(LayoutKind.Explicit)]
        struct InputUnion {
            [FieldOffset(0)] public KEYBDINPUT ki;
        }

        [StructLayout(LayoutKind.Sequential)]
        struct KEYBDINPUT {
            public ushort wVk;
            public ushort wScan;
            public uint dwFlags;
            public uint time;
            public IntPtr dwExtraInfo;
        }

        private const uint INPUT_KEYBOARD = 1;
        private const uint KEYEVENTF_KEYUP = 0x0002;
        private const uint KEYEVENTF_UNICODE = 0x0004;
        private const int SW_RESTORE = 9;

        private const ushort VK_SHIFT = 0x10;
        private const ushort VK_CONTROL = 0x11;
        private const ushort VK_MENU = 0x12;

        static int Main(string[] args) {
            if (args.Length == 0) {
                Console.WriteLine("dTyp Windows Automation Bridge v1.0");
                return 0;
            }

            string cmd = args[0].ToLowerInvariant();
            try {
                if (cmd == "list-windows") {
                    ListWindows();
                    return 0;
                } else if (cmd == "focus" && args.Length > 1) {
                    IntPtr hwnd = ParseHwnd(args[1]);
                    bool ok = FocusWindow(hwnd);
                    Console.WriteLine(ok ? "true" : "false");
                    return ok ? 0 : 1;
                } else if (cmd == "send-char" && args.Length > 1) {
                    char c = args[1][0];
                    SendUnicodeChar(c);
                    return 0;
                } else if (cmd == "release-modifiers") {
                    ReleaseModifiers();
                    Console.WriteLine("true");
                    return 0;
                } else {
                    Console.Error.WriteLine("Unknown command: " + cmd);
                    return 1;
                }
            } catch (Exception ex) {
                Console.Error.WriteLine("Bridge error: " + ex.Message);
                return 2;
            }
        }

        static IntPtr ParseHwnd(string val) {
            if (val.StartsWith("0x", StringComparison.OrdinalIgnoreCase)) {
                return new IntPtr(Convert.ToInt64(val, 16));
            }
            return new IntPtr(Convert.ToInt64(val, 10));
        }

        static void ListWindows() {
            var list = new List<string>();
            EnumWindows((hWnd, lParam) => {
                if (!IsWindowVisible(hWnd)) return true;

                var sb = new StringBuilder(512);
                GetWindowText(hWnd, sb, 512);
                string title = sb.ToString().Trim();
                if (string.IsNullOrEmpty(title)) return true;

                uint pid;
                GetWindowThreadProcessId(hWnd, out pid);
                string procName = "unknown";
                string exePath = "";
                try {
                    var proc = Process.GetProcessById((int)pid);
                    procName = proc.ProcessName + ".exe";
                    try { exePath = proc.MainModule.FileName; } catch { }
                } catch { }

                string handleHex = "0x" + hWnd.ToInt64().ToString("X");
                string json = string.Format(
                    "{{\"handle\":\"{0}\",\"title\":\"{1}\",\"processName\":\"{2}\",\"executablePath\":\"{3}\"}}",
                    handleHex,
                    EscapeJson(title),
                    EscapeJson(procName),
                    EscapeJson(exePath)
                );
                list.Add(json);
                return true;
            }, IntPtr.Zero);

            Console.WriteLine("[" + string.Join(",", list.ToArray()) + "]");
        }

        static bool FocusWindow(IntPtr hWnd) {
            ShowWindow(hWnd, SW_RESTORE);
            return SetForegroundWindow(hWnd);
        }

        static void SendUnicodeChar(char c) {
            INPUT[] inputs = new INPUT[2];

            // Key down
            inputs[0].type = INPUT_KEYBOARD;
            inputs[0].u.ki.wVk = 0;
            inputs[0].u.ki.wScan = (ushort)c;
            inputs[0].u.ki.dwFlags = KEYEVENTF_UNICODE;

            // Key up
            inputs[1].type = INPUT_KEYBOARD;
            inputs[1].u.ki.wVk = 0;
            inputs[1].u.ki.wScan = (ushort)c;
            inputs[1].u.ki.dwFlags = KEYEVENTF_UNICODE | KEYEVENTF_KEYUP;

            SendInput(2, inputs, Marshal.SizeOf(typeof(INPUT)));
        }

        static void ReleaseModifiers() {
            INPUT[] inputs = new INPUT[3];

            inputs[0].type = INPUT_KEYBOARD;
            inputs[0].u.ki.wVk = VK_SHIFT;
            inputs[0].u.ki.dwFlags = KEYEVENTF_KEYUP;

            inputs[1].type = INPUT_KEYBOARD;
            inputs[1].u.ki.wVk = VK_CONTROL;
            inputs[1].u.ki.dwFlags = KEYEVENTF_KEYUP;

            inputs[2].type = INPUT_KEYBOARD;
            inputs[2].u.ki.wVk = VK_MENU;
            inputs[2].u.ki.dwFlags = KEYEVENTF_KEYUP;

            SendInput(3, inputs, Marshal.SizeOf(typeof(INPUT)));
        }

        static string EscapeJson(string s) {
            if (string.IsNullOrEmpty(s)) return "";
            return s.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r", "").Replace("\n", " ");
        }
    }
}
