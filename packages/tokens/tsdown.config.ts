import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  platform: 'neutral',
  // dist/tokens.css and dist/*.json are emitted by scripts/build-tokens.mjs,
  // which runs before this build — so don't wipe dist here.
  clean: false,
})
