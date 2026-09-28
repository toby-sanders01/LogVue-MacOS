# LogVue-MacOS alpha

This fork adds macOS support to LogVue while preserving the original archive format
and BSD 3-Clause attribution. It is an independent alpha, not an official upstream release.

## Approach and isolation

The Electron/React UI and log-processing services are reused. Changes focus on macOS
packaging, native menus, ADB discovery, and coexistence with upstream installations.

| Resource | LogVue-MacOS alpha |
| --- | --- |
| App name | `LogVue-MacOS` |
| Bundle identifier | `com.tobysanders.logvue-macos` |
| Settings and MCP files | `~/Library/Application Support/LogVue-MacOS/` |
| Archive index | `<chosen library>/.logvue-macos/index.sqlite` |
| MCP endpoint | `http://127.0.0.1:47832/mcp` |
| MCP client registration | `logvue-macos` |

The upstream `.logvue` index, legacy `index.sqlite`, settings, and MCP registration
are not migrated or overwritten. The upstream Git remote has push disabled.
The build workflow is manual, has read-only repository permissions, and uploads
build artifacts without publishing releases. This work does not alter the upstream
repository, its collaborators, configuration, or release process.

**Choose a new alpha library or a copy of an existing archive.** Settings start empty.
Session edits, notes, imports, and deletions operate on the library you explicitly
choose. The shared `session.json`/`notes.md` format means opening a shared live
archive would make those edits visible to its other users. Separate app settings
and indexes do not make a shared archive read-only.

## Build and run

Use macOS, Node 22+, and Xcode Command Line Tools for native SQLite compilation.

```sh
npm ci
npm run typecheck
npm test
npm run package:mac:arm64  # Apple Silicon
# or on an Intel Mac:
npm run package:mac:x64
```

Artifacts are written to `release/`: a `.app`, DMG, and ZIP. Packaging automatically
rebuilds `better-sqlite3` for the Electron runtime and target architecture.
For development, run `npm run rebuild`, then `npm run dev`.
Reinstall dependencies with `npm ci` to restore the Node SQLite ABI if needed.

The alpha uses local ad hoc signing, **not Developer ID signing or Apple
notarization**. A downloaded copy may need approval in System Settings → Privacy
& Security after the first attempted launch. No signing credentials are requested
or bundled. A public production release needs signing and notarization.

## First use without a Control Hub

1. Launch LogVue-MacOS and choose a new library folder.
2. In Settings, select **Folder Import** and choose a folder containing `.rlog` files.
3. Create a session and import logs from the Hub view.
4. Add tags or notes, search the library, and reopen the app to check persistence.

Logs are copied into the selected library; source logs retain their original names
and contents. Folder mode works without ADB, internet, or a physical Control Hub.

## Control Hub and ADB

Install Android SDK Platform Tools from Android Studio or
[Android's official download](https://developer.android.com/tools/releases/platform-tools).
The app checks PATH, `ANDROID_HOME`, `ANDROID_SDK_ROOT`, the default macOS Android
Studio SDK, `/opt/homebrew/bin`, and `/usr/local/bin`. It does not change your shell
configuration or install ADB automatically.

For another installation, Settings → **Control Hub** → **ADB executable** → Choose,
then select the `adb` file inside `platform-tools`. Spaces in paths are supported;
commands use argument arrays without a host shell. **Use automatic** clears the override.

Authorize USB debugging on your device, or join the Control Hub's Wi-Fi and use the
wireless address in Settings (default `192.168.43.1:5555`), then Connect.
Existing ADB behavior is retained: the app does not issue `kill-server`, `start-server`,
device log deletion, or device log renaming commands. Device imports use `adb pull`.
A physical Control Hub and its USB/Wi-Fi behavior still require hardware validation.

## MCP

Keep the app open, then use the **MCP** button to copy its configuration. The bridge
is installed at:

```text
~/Library/Application Support/LogVue-MacOS/MCP/logvue-mcp.cjs
```

Configure a stdio MCP server named `logvue-macos`, using an installed Node 22+
executable and that bridge path as the sole argument. Use an absolute Node path if
your agent client does not inherit Terminal's PATH. The app never changes agent
client settings automatically. Its HTTP endpoint binds only to loopback on port
47832, allowing the original LogVue endpoint on 47831 to coexist.

MCP supports status, log listing, session creation, and log imports. Notes and archive
analysis remain ordinary filesystem workflows. The alpha cannot service WSL clients
over a non-loopback address.

## Alpha limits

- Local Apple Silicon builds are validated separately from Intel builds; the manual
  workflow includes both architectures. An Intel package still needs an Intel launch check.
- No Developer ID signature, notarization, auto-update, or Mac App Store submission.
- Original dependencies are retained to minimize unrelated changes. Their long-term
  upgrades, including the Electron version, remain future maintenance work.
- Control Hub USB/Wi-Fi and live FTCScout syncing need real-device/network checks.
- Avoid having two apps edit the same archive at once; use a separate alpha copy.
