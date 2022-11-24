import {SidebarConfigArray} from "@vuepress/theme-default/lib/shared/nav";


export const sidebarStudy4ZH: SidebarConfigArray = [
    'README.md',
    {
        text: "前端",
        collapsible: true,
        children: []
    },{
        text: "后端",
        collapsible: true,
        children: []
    },{
        text: "运维",
        collapsible: true,
        children: [
            'docker'
        ]
    }
]

