import { defineConfig } from "vite";

export default defineConfig({
  root: "./Week11", // กำหนดให้โฟลเดอร์ Week11 เป็น root
  server: {
    port: 5173,
    open: true
  }
});
