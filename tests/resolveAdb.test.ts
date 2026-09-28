import { chmodSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { resolveAdbExecutable } from '../src/main/services/adb/resolveAdb'

let root: string
beforeEach(() => { root = mkdtempSync(join(tmpdir(), 'logvue-macos-adb-')) })
afterEach(() => rmSync(root, { recursive: true, force: true }))

function executable(path: string): string {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, '#!/bin/sh\nexit 0\n')
  chmodSync(path, 0o755)
  return path
}

describe('macOS ADB discovery', () => {
  it('finds the Android Studio SDK when Finder has no development tools on PATH', () => {
    const path = executable(join(root, 'Library/Android/sdk/platform-tools/adb'))
    expect(resolveAdbExecutable(null, { platform: 'darwin', home: root, env: { PATH: '/usr/bin:/bin' } })).toBe(path)
  })

  it('prefers the existing PATH installation to the default SDK', () => {
    const path = executable(join(root, 'chosen tools', 'adb'))
    executable(join(root, 'Library/Android/sdk/platform-tools/adb'))
    expect(resolveAdbExecutable(null, { platform: 'darwin', home: root, env: { PATH: dirname(path) } })).toBe(path)
  })

  it('honors an explicit executable containing spaces', () => {
    const path = executable(join(root, 'Android Tools', 'adb'))
    expect(resolveAdbExecutable(path)).toBe(path)
  })

  it('does not silently fall back when the saved executable is invalid', () => {
    const fallback = executable(join(root, 'bin', 'adb'))
    expect(() => resolveAdbExecutable(join(root, 'missing'), { env: { PATH: dirname(fallback) } })).toThrow(/missing or not executable/)
  })

  it('rejects a non-executable file', () => {
    const path = executable(join(root, 'adb'))
    chmodSync(path, 0o644)
    expect(() => resolveAdbExecutable(path)).toThrow(/not executable/)
  })

  it('finds a custom Android SDK from ANDROID_HOME', () => {
    const path = executable(join(root, 'sdk', 'platform-tools', 'adb'))
    expect(resolveAdbExecutable(null, { env: { PATH: '', ANDROID_HOME: join(root, 'sdk') } })).toBe(path)
  })
})
