# LogVue-MacOS agent notes

This is an independent macOS alpha fork. Use Node 22+ and the macOS Node installation.
Keep changes in this fork; do not push to melonbotics/LogVue or open upstream issues/PRs.
The upstream remote has its push URL set to DISABLED.

Run `npm ci`, `npm run typecheck`, and `npm test`. For development, run
`npm run rebuild` before `npm run dev` to compile better-sqlite3 for Electron.
For distributables, use `npm run package:mac:arm64` or `npm run package:mac:x64`;
electron-builder rebuilds native dependencies for its target architecture.
Use a fresh alpha library for smoke tests, never an existing user's archive.
Do not change the isolated app identity, MCP port/client name, or index directory.
Builds are ad hoc signed and not notarized; there is no automatic release publishing.
