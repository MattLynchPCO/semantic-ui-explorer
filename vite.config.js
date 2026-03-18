import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to all interfaces so the dev server is reachable from outside the
    // container (required for GitHub Codespaces port forwarding).
    host: true,
  },
  build: {
    // semantic-ui-css contains non-standard CSS that lightningcss (the default
    // CSS minifier) cannot parse. Disable CSS minification to allow the build.
    cssMinify: false,
  },
})
