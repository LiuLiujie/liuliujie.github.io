---
category: Computer Science, Programming Language
tag:
- Java
- Java IO
---

# Java IO体系（BIO、NIO、AIO）

分为BIO，NIO，AIO三种



## Java 传统IO (Blocking IO)

传统 IO 基于字节流或字符流（如 FileInputStream、BufferedReader 等）进行文件读写，以及使用Socket 和 ServerSocket 进行网络传输。

传统 IO 采用阻塞式模型，对于每个连接，都需要创建一个独立的线程来处理读写操作。当一个线程在等待 I/O 操作时，无法执行其他任务。这会导致大量线程的创建和销毁，以及上下文切换，降低了系统性能。

因此传统IO也被称为BIO（Blocking IO）。

BIO适用于`连接数比较小且固定`的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4 之前唯一的选择，程序较为简单容易理解。

[阅读详情](java-io.md)



## Java NIO (Non-blocking IO)

NIO 使用通道（Channel）和缓冲区（Buffer）进行文件操作，以及使用 SocketChannel 和 ServerSocketChannel 进行网络传输。

NIO 使用非阻塞模型，允许线程在等待 I/O 时执行其他任务。这种模式通过使用选择器（Selector）来监控多个通道（Channel）上的 I/O 事件，当Selector轮询到有 I/O 请求就会进行处理，实现了更高的性能和可伸缩性。

NIO 方式适用于`连接数目多且连接比较短`的架构，比如聊天服务器，弹幕系统，服务器间通讯等，编程比较复杂，JDK1.4 开始支持。

![diff](https://pics.yujieliu.com/blog/2023/11/e35879ce1f97920e35f5d2ca026a5a5a.png)

[阅读详情](java-nio.md)



## Java AIO (Asynchronous IO)

在NIO的基础上，AIO 引入了异步通道的概念，采用了 Proactor 模式，简化了程序编写，有效的请求才启动线程，它的特点是先由操作系统完成后才通知服务端程序启动线程去处理，一般适用于连接数较多且连接时间较长的应用。

AIO 方式适用于`连接数目多且连接比较长`的架构，比如相册服务器，充分调用 OS 参与并发操作，变成比较复杂，JDK7 开始支持。

[阅读详情](java-aio.md)

