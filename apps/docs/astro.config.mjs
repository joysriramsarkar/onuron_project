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
            { label: "Getting Started", slug: "start-here/getting-started" },
            { label: "Ecosystem", slug: "start-here/ecosystem" },
            { label: "Glossary", slug: "start-here/glossary" },
            { label: "FAQ", slug: "start-here/faq" },
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
        {
          label: "Emulator",
          autogenerate: { directory: "emulator" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
