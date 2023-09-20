import { navbar } from "vuepress-theme-hope";
import { articleNavbar } from "../article/article-navbar";
import { projectNavbar } from "../projects/project-navbar";
import { lifeNavbar } from "../life/life-navbar";

export const navbarConfig = navbar([
  { text: "Home", link: '/'},
  { text: "Category", link:'/category/'},
  { text: "Articles", prefix: '/article/', children: articleNavbar},
  { text: "Projects", prefix:'/projects/', children: projectNavbar},
  { text: "Life", prefix: "/life", children: lifeNavbar}
]);
