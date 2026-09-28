import { app } from 'electron'
import { join, resolve } from 'node:path'

// Run before importing services that read settings at module initialization.
app.setName('LogVue-MacOS')
app.setPath(
  'userData',
  process.env.LOGVUE_MACOS_DATA_DIR
    ? resolve(process.env.LOGVUE_MACOS_DATA_DIR)
    : join(app.getPath('appData'), 'LogVue-MacOS')
)
