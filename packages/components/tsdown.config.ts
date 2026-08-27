import { copyFileSync } from 'node:fs'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  platform: 'neutral',
  // React and the sibling design-system packages stay external so consumers
  // dedupe them instead of shipping two copies.
  deps: { neverBundle: ['react', 'react-dom', /^@meridian\//] },
  hooks: {
    // The stylesheet is hand-authored, not bundled — publish it alongside dist.
    'build:done': () => {
      copyFileSync('src/styles.css', 'dist/styles.css')
    },
  },
})
