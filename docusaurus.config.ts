import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "XR",
  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",
  organizationName: "Hadi",
  projectName: "XR",
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
      title: "",
      logo: {
        alt: "Sharif University Logo",
        src: "https://www.sharif.ir/documents/20124/0/logo-fa-IR.png/4d9b72bc-494b-ed5a-d3bb-e7dfd319aec8?t=1609608338755",
        srcDark:
          "https://www.sharif.ir/documents/20124/0/logo-fa-IR.png/4d9b72bc-494b-ed5a-d3bb-e7dfd319aec8?t=1609608338755",
        href: "/",
      },
      items: [
        {
          type: "dropdown",
          label: " بخش‌های آموزشی",
          position: "left",
          items: [
            {
              label: "شروع کار",
              to: "/docs/intro",
            },
            {
              label: "واقعیت مجازی (VR)",
              to: "/docs/category/vr",
            },
            {
              label: "واقعیت افزوده (AR)",
              to: "/docs/category/ar",
            },
          ],
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
