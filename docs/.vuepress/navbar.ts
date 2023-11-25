import { navbar } from "vuepress-theme-hope";
import { projectNavbar } from "../projects/project-navbar";
import { lifeNavbar } from "../life/life-navbar";
import { catelog } from "../blogs/catelog";

export const navbarConfig = navbar([
  { text: "My Knowledge Base", prefix: '/blogs/', children: catelog},
  { text: "Projects", prefix:'/projects/', children: projectNavbar},
  { text: "Life", prefix: "/life", children: lifeNavbar}
]);
