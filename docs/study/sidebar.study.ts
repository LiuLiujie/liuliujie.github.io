import {SidebarConfigArray} from "@vuepress/theme-default/lib/shared/nav";

export const sidebarStudy: SidebarConfigArray = [
    'README.md,',
    {
        text: "Frontend",
        collapsible: true,
        children: []
    },{
        text: "Backend",
        collapsible: true,
        children: []
    },{
        text: "Operation",
        collapsible: true,
        children: [
            'Docker',
            'Ubuntu',
            'KEDA'
        ]
    },{
        text: "Others",
        collapsible: true,
        children: [
            'SemanticVersioning'
        ]
    }
]

