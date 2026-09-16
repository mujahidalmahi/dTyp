import React, { useEffect, useState } from "react";
import {
  Session,
  WindowInfo,
  AppConfig,
  AppStatus,
  LogEntry,
  TypingStatistics,
} from "@dtyp/types";

type Tab = "dashboard" | "sessions" | "targets" | "settings" | "logs" | "about";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [status, setStatus] = useState<AppStatus | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [windows, setWindows] = useState<WindowInfo[]>([]);
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [logFilter, setLogFilter] = useState<string>("all");
  const [typingStats, setTypingStats] = useState<TypingStatistics | null>(null);

  // New/Edit Session Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [inputType, setInputType] = useState<"text" | "file">("text");
  const [inputContent, setInputContent] = useState("");
  const [inputFilePath, setInputFilePath] = useState("");
  const [selectedTargetHandle, setSelectedTargetHandle] = useState("");
  const [selectedTargetTitle, setSelectedTargetTitle] = useState("");
  const [sessionDelayMs, setSessionDelayMs] = useState(25);

  const dtyp = window.dtyp;

  const refreshAll = async () => {
    if (!dtyp) return;
    try {
      const [sStatus, sSessions, sWindows, sConfig, sLogs] = await Promise.all([
        dtyp.getStatus(),
        dtyp.listSessions(),
        dtyp.listTargets(),
        dtyp.getConfig(),
        dtyp.getLogs(),
      ]);
      setStatus(sStatus);
      setSessions(sSessions);
      setWindows(sWindows);
      setConfig(sConfig);
      setLogs(sLogs);

      if (sStatus.activeSessionId) {
        const found = sSessions.find((s) => s.id === sStatus.activeSessionId);
        setActiveSession(found ?? null);
      } else {
        setActiveSession(null);
      }
    } catch (err) {
      console.error("Failed to refresh state:", err);
    }
  };

  useEffect(() => {
    refreshAll();

    if (!dtyp) return;

    const unsubs = [
      dtyp.onSessionStateChanged((sess) => {
        refreshAll();
      }),
      dtyp.onTypingProgress((stats) => {
        setTypingStats(stats);
      }),
      dtyp.onTypingCompleted(() => {
        setTypingStats(null);
        refreshAll();
      }),
      dtyp.onLogEntry((entry) => {
        setLogs((prev) => [...prev.slice(-499), entry]);
      }),
    ];

    const timer = setInterval(() => {
      dtyp.getStatus().then(setStatus).catch(() => {});
    }, 2000);

    return () => {
      unsubs.forEach((u) => u());
      clearInterval(timer);
    };
  }, []);

  const handleActivate = async (id: string) => {
    if (!dtyp) return;
    await dtyp.activateSession(id);
    refreshAll();
  };

  const handleTerminate = async (id: string) => {
    if (!dtyp) return;
    await dtyp.terminateSession(id);
    refreshAll();
  };

  const handleRenew = async (id: string) => {
    if (!dtyp) return;
    await dtyp.renewSession(id);
    refreshAll();
  };

  const handleDelete = async (id: string) => {
    if (!dtyp) return;
    if (confirm("Are you sure you want to delete this session?")) {
      await dtyp.deleteSession(id);
      refreshAll();
    }
  };

  const handleSaveSession = async () => {
    if (!dtyp || !sessionName.trim()) return;

    const targetWin = windows.find((w) => w.handle === selectedTargetHandle);
    await dtyp.createSession({
      name: sessionName,
      mappings: [
        {
          id: "m_1",
          name: "Default Mapping",
          input:
            inputType === "text"
              ? { type: "text", content: inputContent }
              : { type: "file", path: inputFilePath },
          output: {
            windowHandle: selectedTargetHandle,
            windowTitle: targetWin ? targetWin.title : selectedTargetTitle,
            processName: targetWin ? targetWin.processName : undefined,
            executablePath: targetWin ? targetWin.executablePath : undefined,
          },
        },
      ],
      typing: {
        delayMs: sessionDelayMs,
        mode: "character",
        preserveNewlines: true,
        preserveTabs: true,
      },
    });

    setIsModalOpen(false);
    setSessionName("");
    setInputContent("");
    setInputFilePath("");
    refreshAll();
  };

  const handleTestFocus = async (handle: string) => {
    if (!dtyp) return;
    await dtyp.testTargetFocus(handle);
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          backgroundColor: "var(--bg-secondary)",
          borderRight: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "20px 16px", borderBottom: "1px solid var(--border-color)" }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.5px" }}>
            <span style={{ color: "var(--accent-cyan)" }}>d</span>Typ
          </h1>
          <p style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
            Don't Tell Your Professor
          </p>
        </div>

        <nav style={{ padding: "12px 8px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {(
            [
              ["dashboard", "Dashboard"],
              ["sessions", "Sessions"],
              ["targets", "Windows / Targets"],
              ["settings", "Settings"],
              ["logs", "Activity Logs"],
              ["about", "About dTyp"],
            ] as const
          ).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                textAlign: "left",
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                backgroundColor: activeTab === tab ? "var(--bg-tertiary)" : "transparent",
                color: activeTab === tab ? "var(--accent-cyan)" : "var(--text-primary)",
                fontWeight: activeTab === tab ? 600 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Global Hotkey Status Badge */}
        <div
          style={{
            padding: 14,
            borderTop: "1px solid var(--border-color)",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: status?.isHotkeyRegistered ? "var(--accent-green)" : "var(--border-color)",
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {status?.isHotkeyRegistered ? "Hotkey Active" : "Hotkey Inactive"}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            Shortcut: <span style={{ color: "var(--text-primary)" }}>Ctrl+D</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Header */}
        <header
          style={{
            height: 52,
            borderBottom: "1px solid var(--border-color)",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 15, textTransform: "capitalize" }}>
              {activeTab}
            </span>
            {activeSession && (
              <span
                style={{
                  fontSize: 12,
                  padding: "2px 8px",
                  borderRadius: 12,
                  backgroundColor: "rgba(63, 185, 80, 0.15)",
                  color: "var(--accent-green)",
                  border: "1px solid rgba(63, 185, 80, 0.3)",
                }}
              >
                Active: {activeSession.name}
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {typingStats && (
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-amber)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>Typing...</span>
                <span>
                  {typingStats.charactersTyped} / {typingStats.charactersTotal}
                </span>
                <span style={{ color: "var(--text-secondary)" }}>
                  ({typingStats.averageSpeedCps} cps)
                </span>
              </div>
            )}

            {activeSession && (
              <button
                className="btn-danger"
                onClick={() => handleTerminate(activeSession.id)}
                style={{ fontSize: 12, padding: "4px 10px" }}
              >
                Terminate Session
              </button>
            )}
          </div>
        </header>

        {/* Tab Body */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Active Session Card */}
              <div
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 8,
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 600 }}>
                      {activeSession ? activeSession.name : "No Active Session"}
                    </h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>
                      {activeSession
                        ? "Ready to type. Focus your target window and press Ctrl+D."
                        : "Activate an existing session or create a new one to begin."}
                    </p>
                  </div>
                  {activeSession ? (
                    <button className="btn-danger" onClick={() => handleTerminate(activeSession.id)}>
                      Terminate (Release Ctrl+D)
                    </button>
                  ) : (
                    <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                      + Create Session
                    </button>
                  )}
                </div>

                {activeSession && (
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: "1px solid var(--border-color)",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Target Window</div>
                      <div style={{ fontWeight: 500, marginTop: 2 }}>
                        {activeSession.mappings[0]?.output.windowTitle || "Not configured"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Typing Speed</div>
                      <div style={{ fontWeight: 500, marginTop: 2 }}>
                        {activeSession.typing.delayMs} ms / character
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Shortcut</div>
                      <div style={{ fontWeight: 500, marginTop: 2, fontFamily: "var(--font-mono)" }}>
                        Ctrl+D
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Session Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Total Sessions</div>
                  <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>{sessions.length}</div>
                </div>
                <div
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Detected Windows</div>
                  <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>{windows.length}</div>
                </div>
                <div
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Uptime</div>
                  <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
                    {status ? `${status.uptimeSeconds}s` : "0s"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SESSIONS */}
          {activeTab === "sessions" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600 }}>Saved Sessions</h2>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                  + New Session
                </button>
              </div>

              {sessions.length === 0 ? (
                <div
                  style={{
                    padding: 40,
                    textAlign: "center",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: 8,
                    border: "1px solid var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                >
                  No sessions created yet. Click "+ New Session" to create your first mapping.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {sessions.map((sess) => (
                    <div
                      key={sess.id}
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        border: `1px solid ${
                          sess.state === "active" ? "var(--accent-green)" : "var(--border-color)"
                        }`,
                        borderRadius: 8,
                        padding: 16,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontWeight: 600, fontSize: 15 }}>{sess.name}</span>
                          <span
                            style={{
                              fontSize: 10,
                              textTransform: "uppercase",
                              padding: "2px 6px",
                              borderRadius: 4,
                              backgroundColor:
                                sess.state === "active"
                                  ? "rgba(63, 185, 80, 0.2)"
                                  : sess.state === "terminated"
                                  ? "rgba(248, 81, 73, 0.2)"
                                  : "var(--bg-tertiary)",
                              color:
                                sess.state === "active"
                                  ? "var(--accent-green)"
                                  : sess.state === "terminated"
                                  ? "var(--accent-red)"
                                  : "var(--text-secondary)",
                            }}
                          >
                            {sess.state}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                          Target: {sess.mappings[0]?.output.windowTitle || "None"} | Speed:{" "}
                          {sess.typing.delayMs}ms/char
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 8 }}>
                        {sess.state === "active" ? (
                          <button className="btn-danger" onClick={() => handleTerminate(sess.id)}>
                            Terminate
                          </button>
                        ) : (
                          <>
                            <button className="btn-primary" onClick={() => handleActivate(sess.id)}>
                              Activate
                            </button>
                            <button onClick={() => handleRenew(sess.id)}>Renew Target</button>
                          </>
                        )}
                        <button onClick={() => handleDelete(sess.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TARGETS / WINDOWS */}
          {activeTab === "targets" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 600 }}>Detected Windows</h2>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    Top-level windows available for character-by-character typing.
                  </p>
                </div>
                <button onClick={refreshAll}>Refresh List</button>
              </div>

              <div
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: 8,
                  border: "1px solid var(--border-color)",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-tertiary)" }}>
                      <th style={{ padding: "10px 14px", fontSize: 12 }}>Window Title</th>
                      <th style={{ padding: "10px 14px", fontSize: 12 }}>Process</th>
                      <th style={{ padding: "10px 14px", fontSize: 12 }}>Handle</th>
                      <th style={{ padding: "10px 14px", fontSize: 12, textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {windows.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: 20, textAlign: "center", color: "var(--text-secondary)" }}>
                          No windows detected. Click Refresh List.
                        </td>
                      </tr>
                    ) : (
                      windows.map((w) => (
                        <tr key={w.handle} style={{ borderBottom: "1px solid var(--border-color)" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 500 }}>{w.title}</td>
                          <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>{w.processName}</td>
                          <td style={{ padding: "10px 14px", fontFamily: "var(--font-mono)", fontSize: 12 }}>
                            {w.handle}
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "right" }}>
                            <button
                              onClick={() => handleTestFocus(w.handle)}
                              style={{ padding: "4px 10px", fontSize: 12 }}
                            >
                              Test Focus
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && config && (
            <div style={{ maxWidth: 600 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Application Settings</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>
                    Default Typing Delay: {config.defaultTypingDelayMs} ms / character
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={config.defaultTypingDelayMs}
                    onChange={async (e) => {
                      const val = parseInt(e.target.value);
                      if (dtyp) {
                        const updated = await dtyp.updateConfig({ defaultTypingDelayMs: val });
                        setConfig(updated);
                      }
                    }}
                    style={{ width: "100%" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input
                    type="checkbox"
                    id="minimizeToTray"
                    checked={config.minimizeToTray}
                    onChange={async (e) => {
                      if (dtyp) {
                        const updated = await dtyp.updateConfig({ minimizeToTray: e.target.checked });
                        setConfig(updated);
                      }
                    }}
                  />
                  <label htmlFor="minimizeToTray" style={{ fontSize: 13 }}>
                    Minimize to System Tray when closing window
                  </label>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input
                    type="checkbox"
                    id="showNotifications"
                    checked={config.showNotifications}
                    onChange={async (e) => {
                      if (dtyp) {
                        const updated = await dtyp.updateConfig({ showNotifications: e.target.checked });
                        setConfig(updated);
                      }
                    }}
                  />
                  <label htmlFor="showNotifications" style={{ fontSize: 13 }}>
                    Show system notifications on typing start/completion
                  </label>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>
                    Global Hotkey
                  </label>
                  <input
                    type="text"
                    value={config.globalShortcut}
                    disabled
                    style={{ fontFamily: "var(--font-mono)", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* LOGS */}
          {activeTab === "logs" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600 }}>Structured Logs</h2>
                <div style={{ display: "flex", gap: 8 }}>
                  <select value={logFilter} onChange={(e) => setLogFilter(e.target.value)}>
                    <option value="all">All Levels</option>
                    <option value="info">Info</option>
                    <option value="warn">Warn</option>
                    <option value="error">Error</option>
                  </select>
                  <button onClick={() => setLogs([])}>Clear</button>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 8,
                  padding: 12,
                  height: 480,
                  overflowY: "auto",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
              >
                {logs
                  .filter((l) => logFilter === "all" || l.level === logFilter)
                  .map((log, idx) => (
                    <div key={idx} style={{ marginBottom: 4 }}>
                      <span style={{ color: "var(--text-secondary)" }}>[{log.timestamp.substring(11, 19)}]</span>{" "}
                      <span
                        style={{
                          color:
                            log.level === "error"
                              ? "var(--accent-red)"
                              : log.level === "warn"
                              ? "var(--accent-amber)"
                              : "var(--accent-cyan)",
                          fontWeight: 600,
                        }}
                      >
                        [{log.level.toUpperCase()}]
                      </span>{" "}
                      <span>{log.message}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ABOUT */}
          {activeTab === "about" && (
            <div style={{ maxWidth: 650, display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>About dTyp</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                dTyp (Don't Tell Your Professor) is a production Windows desktop automation application and offline
                VS Code extension ecosystem built with local-first, character-by-character keyboard emulation.
              </p>

              <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Guarantees & Architecture</h3>
                <ul style={{ paddingLeft: 20, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                  <li>All typing is simulated strictly character-by-character (never bulk paste).</li>
                  <li>Global Ctrl+D is unregistered immediately on session termination or exit.</li>
                  <li>100% offline operation: No cloud telemetry, no LLM APIs, zero network dependencies.</li>
                  <li>Academic C library containing 1,000+ indexed components backed by SQLite.</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE SESSION MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: 8,
              width: 550,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Create New Session</h3>

            <div>
              <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--text-secondary)" }}>
                Session Name
              </label>
              <input
                type="text"
                placeholder="e.g. C Programming Lab 3"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--text-secondary)" }}>
                Target Window
              </label>
              <select
                value={selectedTargetHandle}
                onChange={(e) => {
                  setSelectedTargetHandle(e.target.value);
                  const found = windows.find((w) => w.handle === e.target.value);
                  if (found) setSelectedTargetTitle(found.title);
                }}
                style={{ width: "100%" }}
              >
                <option value="">-- Select Active Window --</option>
                {windows.map((w) => (
                  <option key={w.handle} value={w.handle}>
                    {w.title} ({w.processName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--text-secondary)" }}>
                Input Source Type
              </label>
              <div style={{ display: "flex", gap: 16 }}>
                <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="radio"
                    name="inputType"
                    checked={inputType === "text"}
                    onChange={() => setInputType("text")}
                  />
                  Direct Text Code
                </label>
                <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="radio"
                    name="inputType"
                    checked={inputType === "file"}
                    onChange={() => setInputType("file")}
                  />
                  File on Disk
                </label>
              </div>
            </div>

            {inputType === "text" ? (
              <div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--text-secondary)" }}>
                  Content to Type
                </label>
                <textarea
                  className="code-editor"
                  rows={6}
                  placeholder="// Paste or write C code here..."
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            ) : (
              <div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--text-secondary)" }}>
                  File Absolute Path
                </label>
                <input
                  type="text"
                  placeholder="C:\code\solution.c"
                  value={inputFilePath}
                  onChange={(e) => setInputFilePath(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--text-secondary)" }}>
                Typing Speed: {sessionDelayMs} ms / char
              </label>
              <input
                type="range"
                min="5"
                max="80"
                value={sessionDelayMs}
                onChange={(e) => setSessionDelayMs(parseInt(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveSession}>
                Save Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
