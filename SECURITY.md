# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Local-First & Zero-Cloud Privacy Guarantee

**dTyp** is built around a **100% offline, local-first architecture**:
- **No Remote Code Execution**: All 2,500 C components run from an embedded local SQLite WebAssembly database.
- **Zero Telemetry / Zero Tracking**: dTyp collects no user data, no keystroke metrics, no IP addresses, and no analytics.
- **No Background Network Traffic**: The extension makes zero network requests during normal operation (except for the optional GitHub release check which queries public GitHub API endpoints if enabled).

## Reporting a Vulnerability

If you discover a security vulnerability within dTyp, please do not file a public issue. Instead, report it directly to:

- **Email**: [mujahidalmahi@users.noreply.github.com](mailto:mujahidalmahi@users.noreply.github.com)
- **Subject**: `[SECURITY VULNERABILITY] dTyp - <brief description>`

Please include:
1. Steps to reproduce the issue.
2. Proof-of-concept code or demonstration.
3. Impact assessment.

We take security vulnerabilities seriously and will acknowledge receipt within 48 hours and work with you on a responsible disclosure timeline.
