import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ['src/**/*.ts'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  dts: true,
  minify: true,
  clean: true,
  ...options
}));
