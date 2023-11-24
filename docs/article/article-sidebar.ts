export const javaSideBar = [
    { text: "<<返回所有文章", link: "/article/"},
    { text: "《Java学习路线(长期更新)》", link: "/article/java/"},
    {
        text: "一、Java 基础",
        collapsible: true,
        children:[
            "interface.md"
        ]
    },{
        text: "二、Java IO",
        prefix: "JavaIO/",
        collapsible: true,
        children:[
            "",
            "java-io.md",
            "java-nio.md",
            "java-aio.md"
        ]
    },{
        text: "三、Java Collection (集合框架)",
        collapsible: true,
        children:[

        ]
    },{
        text: "四、Java Concurrency (并发编程)",
        collapsible: true,
        children:[

        ]
    },{
        text: "五、Java 反射与面向切面编程",
        collapsible: true,
        children:[

        ]
    }
]