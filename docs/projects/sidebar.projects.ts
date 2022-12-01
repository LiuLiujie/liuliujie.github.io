import {SidebarConfigArray} from "@vuepress/theme-default/lib/shared/nav";

export const sidebarProjects: SidebarConfigArray = [
    'README.md',
    {
        text: "CI/CD",
        collapsible: true,
        children: [
            'DockerImageBuilder'
        ]
    },
    {
        text: "Cloud native",
        collapsible: true,
        children: [
            'StrykerCloudAgent',
            'CloudOptimisation'
        ]
    },
    {
        text: "Web service",
        collapsible: true,
        children: []
    },{
        text: "Date Science",
        collapsible: true,
        children: [
            'KernelTunerTesting'
        ]
    },
]

