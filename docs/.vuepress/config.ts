import { defineConfig } from "vuepress/config";
import {NavItems4EN, NavItems4ZH} from "./nav";

export default defineConfig({
    title: "Googuy's blog",
    description: "Googuy's blog",
    themeConfig:{
        sidebarDepth: 2,
        repo: "https://github.com/LiuLiujie/liuliujie.github.io",
        locales:{
            '/':{
                label: 'English',
                selectText: 'Languages',
                ariaLabel: 'Select language',
                lastUpdated: 'Last Updated',
                nav: NavItems4EN,
            },
            '/zh/':{
                label: '简体中文',
                selectText: '选择语言',
                ariaLabel: '选择语言',
                lastUpdated: '上次更新',
                nav: NavItems4ZH,
            }
        }
    },
    markdown: {
        lineNumbers: true
    },
    locales:{
        '/':{
            lang: 'en-US',
            title: "Googuy's blog",
            description: "Googuy's blog"
        },
        '/zh/':{
            lang: 'zh-CN',
            title: 'Googuy 的博客',
            description: 'Googuy 的博客'
        }
    }
});