import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "en-US",
  title: "Yujie's blog",
  description: "Mirrors of mime",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
