import { sidebar } from "vuepress-theme-hope";
import { AlgorithmSideBar, HPCSideBar, JavaSideBar } from "../blogs/blogs-sidebar";
import { catelog } from "../blogs/catelog";
import { ApiMonitorSideBar } from "../projects/api-monitor/api-monitor-sidebar";

export const sidebarConfig = sidebar({
    "/blogs/": catelog,
    "/blogs/algorithm/": AlgorithmSideBar,
    "/blogs/java/": JavaSideBar,
    "/blogs/hpc/": HPCSideBar,
    "/projects/api-monitor": ApiMonitorSideBar
});