export const JavaSideBar = [
    { text: "<<返回目录", link: "/blogs/"},
    { text: "《Java学习路线(长期更新)》", link: "/article/java/"},
    {
        text: "Java 基础",
        collapsible: true,
        children:[
            {text: "面向对象基础", link:"oop-basic.md"},
            //{text: "Java 实例方法，静态方法与抽象方法"},
            {text: "Java 继承和多态", link:"java-inheritance-polymorphism.md"},
            //{text: "Java 方法重写和重载"},
            {text: "Java 抽象类", link: "java-abstract-class.md"},
            {text: "Java 接口", link: "interface.md"},
            //{text: "Java 内部类"},
            //{text: "Java 可变参数方法"},
            {text: "Java finally 关键字", link: "finally.md"},
            //{text: "Java this 和 super 关键字"},
            {text: "Java static 关键字", link: "static.md"},
            //{text: "Java final 关键字"},
            {text: "Java instanceof 关键字", link :"java-instanceof.md"}
        ]
    },{
        text: "Java 字符串",
        collapsible: true,
        children:[
            
        ]
    },{
        text: "Java IO",
        prefix: "JavaIO/",
        collapsible: true,
        children:[
            {text: "Java IO 体系简介",link:"README.md"},
            {text: "Java 传统IO (BIO)", link: "java-io.md"},
            {text: "Java NIO", link: "java-nio.md"},
            {text: "Java AIO", link: "java-aio.md"}
        ]
    },{
        text: "Java Collection (集合框架)",
        collapsible: true,
        children:[
            "java-collection.md"
        ]
    },{
        text: "Java Concurrency (并发编程)",
        collapsible: true,
        children:[
            "java-concurrency.md"
        ]
    },{
        text: "Java 反射与面向切面编程",
        collapsible: true,
        children:[

        ]
    }
]

export const HPCSideBar = [
    {text: "<<返回目录", link: "/blogs/"},
    {text: "CUDA 教程", link: "cuda-tutorial-chinese/"},
    {text: "OpenMPI", link: "MPI.md"},
    {text: "面试题收集", link: "hpc-cpp-interview.md"}
]

export const AlgorithmSideBar = [
    {text: "<<返回目录", link: "/blogs/"},
    {text: "数据结构", children:[
        "data-structure.md",
        "binary-tree.md",
        "linked-list.md"
    ]},
    {text: "算法", children:[
        "dichotomy.md",
        "backtracking.md",
        "dp.md",
        "two-pointers.md"
    ]}
]