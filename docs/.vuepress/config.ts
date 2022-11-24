import { defaultTheme } from '@vuepress/theme-default'
import {NavItems4EN, NavItems4ZH} from "./nav";
import {Sidebar4EN, Sidebar4ZH} from "./sidebar";

export default {
    title: "Googuy's blog",
    description: "Googuy's blog",
    theme: defaultTheme({
        sidebarDepth: 2,
        repo: "https://github.com/LiuLiujie/liuliujie.github.io",
        locales:{
            '/':{
                navbar: NavItems4EN,
                sidebar: Sidebar4EN,
                editLink: false,
                contributors: false
            },
            '/zh/':{
                navbar: NavItems4ZH,
                sidebar: Sidebar4ZH,
                editLink: false,
                contributors: false,
                selectLanguageName: '简体中文',
                selectLanguageText: '选择语言',
                selectLanguageAriaLabel: '选择语言',
                lastUpdatedText: '上次更新',
                tip: '提示',
                warning: '注意',
                danger: '警告',
                notFound: [
                    '这里什么都没有',
                    '我们怎么到这来了？',
                    '这是一个 404 页面',
                    '看起来我们进入了错误的链接',
                ],
                backToHome: '返回首页',
                openInNewWindow: '在新窗口打开',
                toggleColorMode: '切换颜色模式',
                toggleSidebar: '切换侧边栏',
            }
        }
    }),
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
}