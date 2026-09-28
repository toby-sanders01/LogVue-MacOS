import { accessSync, constants, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

interface Environment {
  platform?: NodeJS.Platform
  home?: string
  env?: NodeJS.ProcessEnv
}

/** Resolve ADB without changing PATH or launching a shell. Finder has a minimal PATH. */
export function resolveAdbExecutable(configuredPath?: string | null, options: Environment = {}): string {
  const platform = options.platform ?? process.platform
  const home = options.home ?? homedir()
  const env = options.env ?? process.env
  const executable = platform === 'win32' ? 'adb.exe' : 'adb'

  function usable(path: string): boolean {
    try {
      accessSync(path, platform === 'win32' ? constants.F_OK : constants.X_OK)
      return statSync(path).isFile()
    } catch {
      return false
    }
  }

  // A saved override is authoritative: never silently connect using a different installation.
  if (configuredPath) {
    if (!usable(configuredPath)) throw new Error(`ADB executable is missing or not executable: ${configuredPath}`)
    return configuredPath
  }

  const candidates = (env.PATH ?? '').split(platform === 'win32' ? ';' : ':')
    .filter(Boolean).map((dir) => join(dir, executable))
  for (const sdkRoot of [env.ANDROID_HOME, env.ANDROID_SDK_ROOT]) {
    if (sdkRoot) candidates.push(join(sdkRoot, 'platform-tools', executable))
  }
  if (platform === 'darwin') {
    candidates.push(
      join(home, 'Library', 'Android', 'sdk', 'platform-tools', 'adb'),
      '/opt/homebrew/bin/adb',
      '/usr/local/bin/adb'
    )
  }
  const found = candidates.find(usable)
  if (found) return found
  const error = new Error('ADB was not found. Install Android Platform Tools or choose its executable in Settings.')
  Object.assign(error, { code: 'ENOENT' })
  throw error
}
