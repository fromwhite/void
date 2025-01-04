import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: '/void/',
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Cross-Origin-Embedder-Policy": "unsafe-none",
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
    proxy: {
      "/api": {
        target: "https://api.mapbox.com",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "3d-tiles-renderer/plugins": "/node_modules/3d-tiles-renderer/src/plugins",
    },
  },
});
