import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react", // Emotion 사용을 위한 설정
    }),
  ],
  server: {
    port: 3000,
  },
});
