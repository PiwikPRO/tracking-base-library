import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist',
      sourceMap: true,
      exclude: ['**/*.test.ts', 'src/test-utils/**'],
    }),
  ],
  build: {
    sourcemap: true,
    minify: false,
    lib: {
      entry: './src/index.ts',
      name: 'tracking-base-library',
      fileName: 'index',
    },
  },
})
