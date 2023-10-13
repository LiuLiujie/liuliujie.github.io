import { navbar } from "vuepress-theme-hope";
import { articleNavbar } from "../article/article-navbar";
import { projectNavbar } from "../projects/project-navbar";
import { lifeNavbar } from "../life/life-navbar";

export const navbarConfig = navbar([
  { text: "Home", link: '/'},
  { text: "Category", prefix:"/category/", children: [
    { text: "All categories", link: "" },
    { text: "My notes", children: [
      { text: "Paper reading notes", link: "paper-reading-notes/"},
      //{ text: "Book reading notes", link: "book-reading-notes/"}
    ]}
  ]},
  { text: "Articles", prefix: '/article/', children: articleNavbar},
  { text: "Projects", prefix:'/projects/', children: projectNavbar},
  { text: "Life", prefix: "/life", children: lifeNavbar}
]);
