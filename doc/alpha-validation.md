# Alpha validation — 28 September 2026

Based on upstream commit `5ea9e167a6dcccd5c1db5c8d585f9096ea67146f`.
Validated locally on an Apple Silicon Mac with Node 22.22.3 and Electron 31.7.7.

| Check | Result |
| --- | --- |
| Main/preload/shared and renderer TypeScript checks | Passed |
| Vitest | 168 tests passed across 22 files |
| ARM64 native SQLite rebuild and macOS DMG/ZIP packaging | Passed |
| Packaged app launch and native library picker | Passed |
| Ad hoc signature, `codesign --verify --deep --strict` | Passed |
| Electron renderer → preload → IPC | Passed |
| Folder log import and source-file preservation | Passed |
| Duplicate detection, notes, tags, SQLite search | Passed |
| MCP stdio bridge → app status/create/import | Passed |
| Settings, index, notes, folder source after full process restart | Passed |
| Upstream and legacy index preservation | Passed with sentinel files |

Smoke tests used temporary local libraries and synthetic log files. No Control Hub,
existing user archive, upstream repository write, or upstream client registration
was involved. Tests for ADB executable discovery cover Finder's minimal PATH,
the default Android SDK, SDK environment variables, explicit paths with spaces,
and invalid/non-executable overrides.

The runtime smoke test used a temporary locally signed Electron runtime matching
the packaged app. The packaged ARM64 app was also launched directly and created
its isolated native SQLite index through the library picker.

Still unverified: physical Control Hub USB/Wi-Fi imports, live FTCScout access,
Intel execution, and downloaded-app Gatekeeper approval. The alpha is ad hoc
signed and not notarized. The manual CI matrix is supplied but has not been run.
