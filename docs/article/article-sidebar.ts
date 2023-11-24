export const javaSideBar = [
    { text: "<<返回所有文章", link: "/article/"},
    { text: "《Java学习路线(长期更新)》", link: "/article/java/"},
    {
        text: "一、Java 基础",
        collapsible: true,
        children:[
            {text: "1.1 面向对象基础", link:"oop-basic.md"},
            "interface.md"
        ]
    },{
        text: "二、Java IO",
        prefix: "JavaIO/",
        collapsible: true,
        children:[
            {text: "2.1 Java IO 体系简介",link:"README.md"},
            {text: "2.2 Java 传统IO (BIO)", link: "java-io.md"},
            {text: "2.3 Java NIO", link: "java-nio.md"},
            {text: "2.4 Java AIO", link: "java-aio.md"}
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