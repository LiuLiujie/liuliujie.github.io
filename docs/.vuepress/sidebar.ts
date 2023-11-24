import { sidebar } from "vuepress-theme-hope";
import { javaSideBar } from "../article/article-sidebar";

export const sidebarConfig = sidebar({
    "/article/":[
        { text: "All articles", link:""},
        {
            text: "计算机基础",
            children:[]
        },
        {
            text: "前端",
            children:[

            ]
        },
        {
            text: "后端",
            children: [
                "java/"
            ]
        },
        {
            text: "DevOps",
            prefix:"devops/",
            children: [

            ]
        },
        {
            text: "高性能计算",
            prefix: "gpgpu/",
            children:[
                {text: "CUDA 教程", link: "cuda-tutorial-chinese/"},
                {text: "OpenMPI", link: "MPI.md"}
            ]
        },
    ],
    "/article/java/": javaSideBar
});