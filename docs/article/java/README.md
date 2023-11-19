---
category:
- Computer Science
- Programming Language

tag: 
- Java
---

# Java 学习路线(长期更新)
<iframe
  :src="$withBase('/markmap/Java-roadmap.html')"
  width="100%"
  height="800"
  frameborder="0"
  scrolling="No"
  leftmargin="0"
  topmargin="0"
/>


## Java 基础
### 面向对象编程

- 基本原则 (SOLID)
  
  ​	单一功能SRP：一个类应该只负责一个职责
  
  ​	开闭原则OCP：对扩展开放，对修改封闭
  
  ​	替换原则LSP：子类应当可以替换父类并出现在父类能够出现的任何地方
  
  ​	接口隔离ISP：客户端不应该依赖那些它不需要的接口
  
  ​	依赖反转DIP：要针对接口编程，而不是针对实现编程
  
- 封装，继承和多态
  
  ​	封装：把客观事物封装成抽象的类，并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。
  
  ​	继承：让某个类型的对象获得父类型的对象的属性的方法。
  
- 实例方法，静态方法与抽象方法

- 方法重写和重载

- 抽象类

- 内部类

- 可变参数方法

- 重要关键字

  - [finally](finally.md): 除直接退出虚拟机外，finally块的内容一定会被执行；finally中返回和异常抛出会导致try或catch中的返回和异常被忽略。

  - this和super

  - static

  - final
  
  - instanceof
  

### Java字符串

- 常用方法

- 不可变性

- StringBuilder与StringBuffer

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