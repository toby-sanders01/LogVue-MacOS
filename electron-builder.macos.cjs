const { build } = require('./package.json')
const { join } = require('node:path')
const { signAsync } = require('@electron/osx-sign')

module.exports = {
  ...build,
  appId: 'com.tobysanders.logvue-macos',
  productName: 'LogVue-MacOS',
  publish: null,
  asarUnpack: ['node_modules/better-sqlite3/**/*'],
  // Builder 26 cannot resolve '-' through the keychain. Sign explicitly with a
  // local ad hoc identity, without discovering or using any personal certificate.
  afterPack: async (context) => {
    await signAsync({
      app: join(context.appOutDir, `${context.packager.appInfo.productFilename}.app`),
      platform: 'darwin',
      identity: '-',
      identityValidation: false,
      preAutoEntitlements: false,
      preEmbedProvisioningProfile: false,
      optionsForFile: () => ({ hardenedRuntime: false, timestamp: 'none' })
    })
  },
  mac: {
    category: 'public.app-category.developer-tools',
    icon: 'src/renderer/assets/logvue-icon.png',
    target: ['dmg', 'zip'],
    artifactName: '${productName}-${version}-${arch}.${ext}',
    identity: null,
    hardenedRuntime: false,
    gatekeeperAssess: false,
    notarize: false
  }
}
