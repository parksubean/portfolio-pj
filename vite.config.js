import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
   base: "/portfolio/",
   plugins: [react()],
   test: {
      environment: "jsdom",
      globals: true,
      transformMode: {
         web: [/\.jsx$/],
      },
   },
   esbuild: {
      jsx: "react",
   },
});
