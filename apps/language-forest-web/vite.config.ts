// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "[name].[hash].[ext]",
        chunkFileNames: "[name].[hash].js",
        entryFileNames: "[name].[hash].js",
      },
    },
  },
  base: "/",
  plugins: [
    svgr({
      include: ["**/*.svg"], // 직접 지정

      svgrOptions: {
        icon: true,
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
