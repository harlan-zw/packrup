/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      'zhead': resolve(__dirname, 'packages/zhead/src/index.ts'),
      '@zhead/schema': resolve(__dirname, 'packages/schema/src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: 'dot',
    isolate: true,
  },
})
