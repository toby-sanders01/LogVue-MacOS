# LogVue-MacOS MCP integration

This independent alpha uses `http://127.0.0.1:47832/mcp` and the MCP client name
`logvue-macos`. Its bridge lives at
`~/Library/Application Support/LogVue-MacOS/MCP/logvue-mcp.cjs`.

Keep the app running and use its MCP button to copy the exact configuration.
Use an installed Node 22+ executable to launch the bundled stdio bridge.
The app does not register itself in agent clients or alter an existing LogVue connector.

Tools: `get_status`, `list_hub_logs`, `create_session`, and `import_hub_log`.
Notes, searching, and analysis remain ordinary filesystem workflows.

The endpoint binds only to loopback. Files, credentials, and port are separate from
upstream LogVue, and no WSL network exposure is enabled in this macOS alpha.
See [macOS alpha setup](doc/macos-alpha.md) for installation, isolation, and limitations.
