import { defineConfig } from "vuepress/config";
import nav from "./nav/nav";

export default defineConfig({
    themeConfig:{
        nav: nav,
        sidebarDepth: 2,
        repo: "https://github.com/LiuLiujie/liuliujie.github.io"
    }
});