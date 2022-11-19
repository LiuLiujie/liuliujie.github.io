import { NavItem } from "vuepress/config";
import study from "../study/study";
import study_zh from "../zh/study/study"

export const NavItems4EN: NavItem[] = [
    { text: "Home", link: '/' },
    { text: "Study", link: '/study/', items: study},
    { text: "Projects", link: '/projects/'},
    { text: "Life", link: '/life/'},
    { text: "About me", link: '/aboutme/'}
];

export const NavItems4ZH: NavItem[] = [
    { text: "首页", link: '/zh/' },
    { text: "学习", link: '/zh/study/', items: study_zh},
    { text: "项目", link: '/zh/projects/'},
    { text: "生活", link: '/zh/life/'},
    { text: "关于我", link: '/zh/aboutme/'}
];