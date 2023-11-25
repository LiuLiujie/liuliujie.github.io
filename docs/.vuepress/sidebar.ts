import { sidebar } from "vuepress-theme-hope";
import { AlgorithmSideBar, HPCSideBar, JavaSideBar } from "../blogs/blogs-sidebar";
import { catelog } from "../blogs/catelog";

export const sidebarConfig = sidebar({
    "/blogs/": catelog,
    "/blogs/algorithm/": AlgorithmSideBar,
    "/blogs/java/": JavaSideBar,
    "/blogs/hpc/": HPCSideBar,
});