import { sidebar } from "vuepress-theme-hope";
import { AlgorithmSideBar, DevOpsSiadebar, HPCSideBar, JavaSideBar } from "../blogs/blogs-sidebar";
import { catelog } from "../blogs/catelog";
import { ApiMonitorSideBar } from "../projects/api-monitor/api-monitor-sidebar";

export const sidebarConfig = sidebar({
    "/blogs/": catelog,
    "/blogs/front-end": "structure",
    "/blogs/algorithm/": AlgorithmSideBar,
    "/blogs/java/": JavaSideBar,
    "/blogs/hpc/": HPCSideBar,
    "/blogs/devops/": DevOpsSiadebar,
    "/projects/stryker-cloud-agent/":"structure",
    "/projects/api-monitor": ApiMonitorSideBar
});