export const JavaSideBar = [
    { text: "<< Catelog 目录", link: "/blogs/"},
    { text: "《Java Roadmap 学习路线》", link: "/blogs/java/"},
    {
        text: "Java Basic",
        collapsible: true,
        children:[
            {text: "OOP Basic 面向对象基础", link:"oop-basic.md"},
            //{text: "Java 实例方法，静态方法与抽象方法"},
            {text: "Java Inher & Poly 继承和多态", link:"java-inheritance-polymorphism.md"},
            //{text: "Java 方法重写和重载"},
            {text: "Java Abstract Class 抽象类", link: "java-abstract-class.md"},
            {text: "Java Interface 接口", link: "interface.md"},
            //{text: "Java 内部类"},
            //{text: "Java 可变参数方法"},
            {text: "Java finally 关键字", link: "finally.md"},
            //{text: "Java this 和 super 关键字"},
            {text: "Java static 关键字", link: "static.md"},
            //{text: "Java final 关键字"},
            {text: "Java instanceof 关键字", link :"java-instanceof.md"}
        ]
    },{
        text: "Java String 字符串",
        collapsible: true,
        children:[
            
        ]
    },{
        text: "Java IO",
        prefix: "JavaIO/",
        collapsible: true,
        children:[
            {text: "Java IO Structure 体系简介",link:"README.md"},
            {text: "Java IO (BIO)", link: "java-io.md"},
            {text: "Java NIO", link: "java-nio.md"},
            {text: "Java AIO", link: "java-aio.md"}
        ]
    },{
        text: "Java Collection 集合框架",
        collapsible: true,
        children:[
            "java-collection.md"
        ]
    },{
        text: "Java Concurrency 并发编程",
        collapsible: true,
        children:[
            "java-concurrency.md"
        ]
    },
    {
        text: "Java Utils 工具类",
        collapsible: true,
        prefix: "utils/",
        children: [
            "integer-hexconvert.md"
        ]
    },{
        text: "Java Reflection & AOP 反射与面向切面编程",
        collapsible: true,
        children:[

        ]
    }
]

export const HPCSideBar = [
    {text: "<< Catelog 目录", link: "/blogs/"},
    {text: "CUDA Tutorial 教程", link: "cuda-tutorial-chinese/"},
    {text: "OpenMPI", link: "MPI.md"},
    {text: "Interviews 面试题收集", link: "hpc-cpp-interview.md"}
]

export const AlgorithmSideBar = [
    {text: "<< Catelog 目录", link: "/blogs/"},
    {text: "Data Structure 数据结构", children:[
        "data-structure.md",
        "binary-tree.md",
        "linked-list.md"
    ]},
    {text: "Algorithms 算法", children:[
        "dichotomy.md",
        "backtracking.md",
        "dp.md",
        "two-pointers.md"
    ]}
]

export const DevOpsSiadebar = [
    {text: "<< Catelog 目录", link: "/blogs/"},
    {text: "SQL & MySQL", prefix: "mysql/", collapsible: true, children:[
        {text: "SQL Basic 基础", link:"sql.md"},
        {text: "MySQL 学习路线", link:"README.md"},
        "mysql-engines.md",
        "mysql-btree.md",
        {text: "SQL Leetcode Exercise 练习题", link: "sql-exercises.md"},
    ]},
    {text: "Redis", prefix: "redis/", collapsible: true, children:[
        "README.md",
        "data-structure.md",
        "stream-message-queue.md",
        "distributed-lock.md",
    ]}
]