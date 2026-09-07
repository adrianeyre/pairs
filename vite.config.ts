import { defineConfig } from 'vite';

// The site is published to https://adrianeyre.github.io/pairs/, so every asset
// URL has to carry the repository name. Without this the built bundle is
// requested from the domain root and GitHub Pages serves a blank page.
export default defineConfig({
  base: '/pairs/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
