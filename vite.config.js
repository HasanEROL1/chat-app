import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Sadece localhost değil, her yerden gelen isteği kabul et
    port: 5173,
    strictPort: true,
    allowedHosts: true // Ngrok linkinin engellenmesini tamamen kaldırır
  }
});
