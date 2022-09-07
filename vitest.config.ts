/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      packrup: resolve(__dirname, 'src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: 'dot',
    isolate: true,
  },
})
