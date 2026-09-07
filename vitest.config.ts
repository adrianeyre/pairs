import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Canvas, Deck and Game all reach for `document` and `screen` in their
    // constructors, so the suite needs a DOM even though nothing here renders.
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
    },
  },
});
