import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://docs.onuron.org",
  server: { port: 4326 },
  integrations: [
    starlight({
      title: "Onuron Docs",
      social: {
        github: "https://github.com/joysriramsarkar",
      },
      sidebar: [
        {
          label: "Start Here",
          items: [
            { label: "Overview", slug: "index" },
            { label: "System Architecture", slug: "architecture" },
          ],
        },
        {
          label: "onuronOS",
          autogenerate: { directory: "os" },
        },
        {
          label: "nilLang",
          autogenerate: { directory: "nil" },
        },
        {
          label: "alap-framework",
          autogenerate: { directory: "alap" },
        },
        {
          label: "App Store & Registry",
          autogenerate: { directory: "store" },
        },
      ],
    }),
  ],
});
