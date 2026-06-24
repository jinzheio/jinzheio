import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jinzhe.io",
  output: "server",
  adapter: cloudflare(),
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
