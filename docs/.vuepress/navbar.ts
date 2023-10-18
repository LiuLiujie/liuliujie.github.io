import { navbar } from "vuepress-theme-hope";
import { articleNavbar, devopsNavbar } from "../article/article-navbar";
import { projectNavbar } from "../projects/project-navbar";
import { lifeNavbar } from "../life/life-navbar";

export const navbarConfig = navbar([
  { text: "Home", link: '/'},
  { text: "Articles", prefix: '/article/', children: articleNavbar},
  { text: "DevOps", prefix: '/article/devops/', children: devopsNavbar},
  { text: "Projects", prefix:'/projects/', children: projectNavbar},
  { text: "Life", prefix: "/life", children: lifeNavbar}
]);
