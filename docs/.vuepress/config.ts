import { defineConfig } from "vuepress/config";
import nav from "./nav/nav";

export default defineConfig({
    title: "Googuy's blog",
    description: "Googuy's blog",
    themeConfig:{
        nav: nav,
        sidebarDepth: 2,
        repo: "https://github.com/LiuLiujie/liuliujie.github.io"
    },
    markdown: {
        lineNumbers: true
    }
});