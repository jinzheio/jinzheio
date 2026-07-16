import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jinzhe.io",
  output: "static",
  outDir: "./dist-vps",
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
