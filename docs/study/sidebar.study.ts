import { SidebarConfigArray } from "vuepress/config"

export const sidebarStudy: SidebarConfigArray = [
    '',
    {
        title: "Frontend",
        collapsable: true,
        children: []
    },{
        title: "Backend",
        collapsable: true,
        children: []
    },{
        title: "Operation",
        collapsable: true,
        children: [
            'docker',
            'ubuntu'
        ]
    }
]

