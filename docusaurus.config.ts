import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "واقعیت مجازی",
  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",
  organizationName: "Hadi",
  projectName: "واقعیت مجازی",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en"],
  //   path: "i18n",
  // },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "واقعیت مجازی",
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "right",
          label: "داکیومنت",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
