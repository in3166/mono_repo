import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const testFiles = ['./src/**/*.test.{js,jsx,ts,tsx}'];

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      // fastRefresh: false,
    }),
  ],
  resolve: {
    alias: {
      '@lib': path.resolve(import.meta.dirname, 'src/lib'),
    },
  },
  cacheDir: '../../.cache/vitest/ui-lib',
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './config/test/setupVitest.ts',
    passWithNoTests: true,
    /*
    deps: {
      experimentalOptimizer: {
        enabled: true,
      },
    }, */
    coverage: {
      provider: 'v8',
      reporter: ['text', 'clover'],
      extension: ['js', 'jsx', 'ts', 'tsx'],
      all: true,
    },
    // To mimic Jest behaviour regarding mocks.
    // @link https://vitest.dev/config/#clearmocks
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    include: testFiles,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
});
