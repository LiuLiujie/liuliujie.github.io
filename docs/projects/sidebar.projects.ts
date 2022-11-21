import { SidebarConfigArray } from "vuepress/config"

export const sidebarProjects: SidebarConfigArray = [
    '',
    {
        title: "CI/CD",
        collapsable: true,
        children: [
            'DockerImageBuilder.md'
        ]
    },
    {
        title: "Cloud native",
        collapsable: true,
        children: []
    },
    {
        title: "Web service",
        collapsable: true,
        children: []
    },{
        title: "Semantic web",
        collapsable: true,
        children: []
    },
]

