import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import removeConsole from "vite-plugin-remove-console";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), removeConsole()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base:"/kakao/",
  server: {
    host: "0.0.0.0", // 외부에서 접근 가능하도록 설정
    port: 4100, // 개발 서버 포트
    strictPort: true, // 포트가 사용 중일 경우 에러 발생
    hmr: {
      protocol: "ws", // WebSocket을 통해 HMR(Hot Module Replacement) 활성화
      host: "localhost",
      port: 4100,
    },
  },
});
