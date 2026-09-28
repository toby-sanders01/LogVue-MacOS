# LogVue-MacOS alpha

Independent macOS fork of [melonbotics/LogVue](https://github.com/melonbotics/LogVue).
Version `0.1.1-macos.alpha.1`. The original project's copyright and BSD 3-Clause
license are preserved. This alpha is maintained separately from the original project.

- macOS `.app`, DMG, and ZIP packaging for Apple Silicon and Intel.
- Finder-compatible ADB detection plus a native executable picker in Settings.
- Folder imports, session library, notes, search, and local MCP tools.
- Independent settings, SQLite index, MCP port, and MCP client registration.
- Manual build workflow; no automatic release publishing or upstream changes.

See [macOS alpha setup and limitations](doc/macos-alpha.md).

```sh
npm ci
npm run package:mac:arm64  # Apple Silicon
npm run package:mac:x64    # Intel (prefer building on an Intel Mac)
```

Build outputs appear in `release/`. For development, run `npm run rebuild` and
then `npm run dev`. Start with a **new alpha library** or a copy of your archive.

---

The upstream README follows.

# LogVue

LogVue is a desktop app for organising and reviewing FTC Control Hub RLOG files. It turns a folder of raw logs into a searchable library of sessions, with match metadata, notes, and links back to the exact logs involved. It is also designed for agentic workflows: the archive stays readable through ordinary filesystem tools, while MCP handles live Control Hub operations.

<p align="center">
  <img src="docs/images/log-import-suggested-matches.png" width="1200" alt="Log import with suggested matches">
</p>

## What it does

- Imports logs from a Control Hub over ADB or from a local folder.
- Suggests logs for a match using their recorded timestamps.
- Organises sessions into libraries, events, matches, and child sessions.
- Supports searching by op-mode, alliance, tags, filenames, and other session details.
- Adds match metadata, tags, and rich-text notes to sessions.
- Links notes directly to logs so an observation can highlight the relevant file.
- Syncs event and match data from FTCScout.
- Keeps session metadata and notes in filesystem-readable `session.json` and `notes.md` sidecars for agentic browsing.
- Provides MCP tools for live Control Hub status, log discovery, session creation, and managed importing.

## Agentic support

Agents can browse the archive through the filesystem and use MCP for live Control Hub operations and RLOG importing.

## Workflows

### Import logs

When a match has been created, LogVue compares the match time with available Control Hub logs and suggests the most likely files. Select the logs to import and LogVue copies them into the session while preserving their metadata.

### Browse the Control Hub

The Control Hub view lists available RLOG files with op-mode, timestamp, size, import status, and filename. Logs can be imported individually, in batches, or into a new session.

<p align="center">
  <img src="docs/images/control-hub-log-browser.png" width="1200" alt="Control Hub log browser">
</p>

### Highlight logs from notes

Mention a log from the Notes editor with `@`. Selecting the mention brings the matching log into focus, making it easy to move from an observation to the evidence behind it.

<p align="center">
  <img src="docs/images/notes-log-highlight.png" width="1200" alt="Log highlighted from a note">
</p>

## Development

```sh
npm install
npm run dev
```

Run the type checks with:

```sh
npm run typecheck
```

LogVue is released under the BSD 3-Clause License. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt).
