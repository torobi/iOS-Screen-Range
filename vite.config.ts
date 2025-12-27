import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/iOS-Screen-Range/',
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
});
