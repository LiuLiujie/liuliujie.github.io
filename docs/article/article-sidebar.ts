export const javaSideBar = [
    { text: "<<返回所有文章", link: "/article/"},
    { text: "《Java学习路线(长期更新)》", link: "/article/java/"},
    {
        text: "一、Java 基础",
        collapsible: true,
        children:[
            {text: "面向对象基础", link:"oop-basic.md"},
            {text: "Java 实例方法，静态方法与抽象方法"},
            {text: "Java 继承和多态", link:"java-inheritance-polymorphism.md"},
            {text: "Java 方法重写和重载"},
            {text: "Java 抽象类"},
            {text: "Java 接口", link: "interface.md"},
            {text: "Java 内部类"},
            {text: "Java 可变参数方法"},
            {text: "Java finally 关键字", link: "finally.md"},
            {text: "Java this 和 super 关键字"},
            {text: "Java static 关键字", link: "static.md"},
            {text: "Java final 关键字"},
            {text: "Java instanceof 关键字"}
        ]
    },{
        text: "二、Java IO",
        prefix: "JavaIO/",
        collapsible: true,
        children:[
            {text: "Java IO 体系简介",link:"README.md"},
            {text: "Java 传统IO (BIO)", link: "java-io.md"},
            {text: "Java NIO", link: "java-nio.md"},
            {text: "Java AIO", link: "java-aio.md"}
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