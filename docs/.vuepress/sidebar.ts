import { sidebar } from "vuepress-theme-hope";
import { javaSideBar } from "../article/article-sidebar";

export const sidebarConfig = sidebar({
    "/article/":[
        { text: "All articles", link:""},
        {
            text: "Java",
            prefix:"java/",
            collapsible: true,
            children:[

            ]
        },
        {
            text: "DevOps",
            prefix:"devops/",
            collapsible: true,
            children: [

            ]
        }
    ],
    "/article/java/": javaSideBar
});