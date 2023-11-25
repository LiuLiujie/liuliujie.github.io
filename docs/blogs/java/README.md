---
category:
- Computer Science
- Programming Language

tag: 
- Java
---

# Java 学习路线(长期更新)


### Java字符串

- 常用方法

- 不可变性

   final修饰，每次修改都创建新字符串到常量池，相当于值引用

- StringBuilder与StringBuffer

  Buffer加了synchronized锁，因此常用Builder，并在并发下配合ThreadLocal

- 字符串常量池
  
  `String s = new String("ABC");`: 先在字符串常量池中创建对象“ABC”，然后再在堆上创建对象“ABC”

## [Java IO](JavaIO/README.md)

### [Java 传统IO (BIO)](JavaIO/java-io.md)

### [Java NIO](JavaIO/java-nio.md)

### [Java AIO](Java-IO/java-aio.md)

## Java 集合框架 (Collections)

### Set & List

- ArrayList 和 LinkedList

- ArrayList 详解

- LinkedList 详解

- 范型

- Iterator和Iterable

- For Loop循环

### Map

- HashMap详解

- LinkedHashMap详解

### Collections & Arrays 工具类

## [Java 并发编程 (Concurrency)](java-concurrency.md)

### 线程与进程

- 操作系统的线程与进程
- Java的线程与进程
- Java线程的6种状态与转移
- 线程组与线程优先级
- 多线程带来的问题
- 协程

### Java内存模型

- volatile 关键字

### 锁

- syncronized 关键字与锁升级
- 偏向锁
- 乐观锁 CAS
- 抽象队列同步器 AQS
- 锁分类和 JUC 包
- 重入锁

### 并发容器

- ConcurrentHashMap

### 线程池



## Java 反射与面向切面编程