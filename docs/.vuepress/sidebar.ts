import { SidebarConfig4Multiple } from 'vuepress/config'
import {sidebarStudy} from "../study/sidebar.study";
import {sidebarProjects} from "../projects/sidebar.projects";
import {sidebarStudy4ZH} from "../zh/study/sidebar.study";
import {sidebarProjects4ZH} from "../zh/projects/sidebar.projects";
import {sidebarLife} from "../life/sidebar.life";
import {sidebarLife4ZH} from "../zh/aboutme/sidebar.life";

export const Sidebar4EN: SidebarConfig4Multiple = {

    '/study/': sidebarStudy,
    '/projects/': sidebarProjects,
    '/life': sidebarLife
}

export const Sidebar4ZH: SidebarConfig4Multiple = {

    '/zh/study/': sidebarStudy4ZH,
    '/zh/projects/': sidebarProjects4ZH,
    '/zh/life': sidebarLife4ZH
}