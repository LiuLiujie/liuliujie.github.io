import { NavItem } from "vuepress/config";
import study from "./study";

export default <Array<NavItem>>[
    { text: "Home", link: "/" },
    { text: "Study", link: "/study", items: study},
    { text: "Projects", link: "/projects"},
    { text: "Life", link: "/life"},
    { text: "About me", link: "/aboutme"}
];