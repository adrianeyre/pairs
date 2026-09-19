import { defineConfig } from 'vite';

// The site is published to https://pairs.adrianeyre.co.uk, a custom domain
// served from the root, so asset URLs must be root-relative. Setting a base of
// '/pairs/' here (as was needed for the old adrianeyre.github.io/pairs/ URL)
// makes the browser request /pairs/assets/*.js and /pairs/assets/*.css, which
// do not exist on the custom domain and 404.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
