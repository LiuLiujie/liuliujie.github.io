---
category: Computer Science, Programming Language
tag:
- Java
- Java IO
---

# Java Non-blocking IO (BIO)

NIO 主要有**两个核心部分组成**：

- **Buffer 缓冲区**
- **Channel 通道**

在 NIO 中，并不是以流的方式来处理数据的，而是以 buffer 缓冲区和 Channel 通道**配合使用**来处理数据的。Channel 不与数据打交道，它只负责运输数据。与数据打交道的是 Buffer 缓冲区。相对于传统 IO 而言，**流是单向的**。对于 NIO 而言，有了 Channel 通道这个概念，我们的**读写都是双向**的。



### Buffer类

Buffer 是缓冲区的抽象类，其中 ByteBuffer 是**用得最多的实现类**(在通道中读写字节数据)。缓冲区的核心方法就是 put 和 get。

![img](https://pics.yujieliu.com/blog/2023/11/d57d18ec1a0497e81df285b3997fc87d.png)

Buffer 类维护了 4 个核心变量来提供**关于其所包含的数组信息**。它们是：

- 容量 Capacity **缓冲区能够容纳的数据元素的最大数量**。容量在缓冲区创建时被设定，并且永远不能被改变。(不能被改变的原因也很简单，底层是数组嘛)
- 上界 Limit **缓冲区里的数据的总数**，代表了当前缓冲区中一共有多少数据。
- 位置 Position **下一个要被读或写的元素的位置**。Position 会自动由相应的 `get()`和 `put()`函数更新。
- 标记 Mark 一个备忘位置。**用于记录上一次读写的位置**。



#### 创建和写入数据

```java
// 创建一个缓冲区
ByteBuffer byteBuffer = ByteBuffer.allocate(1024);

// 看一下初始时4个核心变量的值
System.out.println("初始时-->limit--->"+byteBuffer.limit());
System.out.println("初始时-->position--->"+byteBuffer.position());
System.out.println("初始时-->capacity--->"+byteBuffer.capacity());
System.out.println("初始时-->mark--->" + byteBuffer.mark());

System.out.println("--------------------------------------");

// 添加一些数据到缓冲区中
String s = "沉默王二";//UTF-8 编码，一个汉字占 3 个字节，共有 4 个汉字，占用 12 个字节
byteBuffer.put(s.getBytes());

// 看一下初始时4个核心变量的值
System.out.println("put完之后-->limit--->"+byteBuffer.limit());
System.out.println("put完之后-->position--->"+byteBuffer.position());
System.out.println("put完之后-->capacity--->"+byteBuffer.capacity());
System.out.println("put完之后-->mark--->" + byteBuffer.mark());

```

```
初始时-->limit--->1024
初始时-->position--->0
初始时-->capacity--->1024
初始时-->mark--->java.nio.HeapByteBuffer[pos=0 lim=1024 cap=1024]
--------------------------------------
put完之后-->limit--->1024
put完之后-->position--->12
put完之后-->capacity--->1024
put完之后-->mark--->java.nio.HeapByteBuffer[pos=12 lim=1024 cap=1024]
```



#### 读取数据

当要获取数据时，NIO 给了我们一个`flip()`方法。这个方法可以**改动 position 和 limit 的位置**，将buffer设置为读模式。

```java
// flip()方法
byteBuffer.flip();
System.out.println("flip()方法之后-->limit--->"+byteBuffer.limit());
System.out.println("flip()方法之后-->position--->"+byteBuffer.position());
System.out.println("flip()方法之后-->capacity--->"+byteBuffer.capacity());
System.out.println("flip()方法之后-->mark--->" + byteBuffer.mark());
```

![img](https://pics.yujieliu.com/blog/2023/11/e06848882987dda3b5b1226e1892f7cc.png)

在调用 `flip()` 之后，limit 变为当前 position 的值（12），position 重置为 0。这意味着你可以从缓冲区的开始位置读取刚刚写入的数据，直到 limit 指定的位置。capacity 保持不变（1024）。

```java
// 创建一个limit()大小的字节数组(因为就只有limit这么多个数据可读)
byte[] bytes = new byte[byteBuffer.limit()];
// 将读取的数据装进我们的字节数组中
byteBuffer.get(bytes);
// 输出数据
System.out.println(new String(bytes, 0, bytes.length));
```

#### 清除数据

`flip()`之后，position和limit均为12，表示读取完成了。如果要清除buffer中的数据，可以调用`clear()`



### Channel 通道

Channel 通道**只负责传输数据、不直接操作数据**。通常，通道可以分为两大类：文件通道和套接字通道。

- FileChannel：用于文件 I/O 的通道，支持文件的读、写和追加操作。FileChannel 允许在文件的任意位置进行数据传输，支持文件锁定以及内存映射文件等高级功能。FileChannel 无法设置为非阻塞模式，因此它**只适用于阻塞式文件操作**。
- SocketChannel：用于 TCP 套接字 I/O 的通道。SocketChannel 支持非阻塞模式，可以与 Selector 一起使用，实现高效的网络通信。SocketChannel 允许连接到远程主机，进行数据传输。

- 与之匹配的有ServerSocketChannel：用于监听 TCP 套接字连接的通道。与 SocketChannel 类似，ServerSocketChannel 也支持非阻塞模式，并可以与 Selector 一起使用。ServerSocketChannel 负责监听新的连接请求，接收到连接请求后，可以创建一个新的 SocketChannel 以处理数据传输。

- DatagramChannel：用于 UDP 套接字 I/O 的通道。DatagramChannel 支持非阻塞模式，可以发送和接收数据报包，适用于无连接的、不可靠的网络通信。



### 与传统 IO 相比的典型场景

#### 操作文件

JDK 1.4 中，`java.nio.*包`引入新的 Java I/O 库，其目的是**提高速度**。实际上，“旧”的 I/O 包已经使用 NIO**重新实现过，即使我们不显式的使用 NIO 编程，也能从中受益**。在文件操作中，性能差距并不显著。

```java
public class SimpleFileTransferTest {

    // 使用传统的 I/O 方法传输文件
    private long transferFile(File source, File des) throws IOException {
        long startTime = System.currentTimeMillis();

        if (!des.exists())
            des.createNewFile();

        // 创建输入输出流
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(source));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(des));

        // 使用数组传输数据
        byte[] bytes = new byte[1024 * 1024];
        int len;
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
        }

        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }

    // 使用 NIO 方法传输文件
    private long transferFileWithNIO(File source, File des) throws IOException {
        long startTime = System.currentTimeMillis();

        if (!des.exists())
            des.createNewFile();

        // 创建随机存取文件对象
        RandomAccessFile read = new RandomAccessFile(source, "rw");
        RandomAccessFile write = new RandomAccessFile(des, "rw");

        // 获取文件通道
        FileChannel readChannel = read.getChannel();
        FileChannel writeChannel = write.getChannel();

        // 创建并使用 ByteBuffer 传输数据
        ByteBuffer byteBuffer = ByteBuffer.allocate(1024 * 1024);
        while (readChannel.read(byteBuffer) > 0) {
            byteBuffer.flip();
            writeChannel.write(byteBuffer);
            byteBuffer.clear();
        }

        // 关闭文件通道
        writeChannel.close();
        readChannel.close();
        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }

    public static void main(String[] args) throws IOException {
        SimpleFileTransferTest simpleFileTransferTest = new SimpleFileTransferTest();
        File sourse = new File("xxxxxx.rmvb");
        File des = new File("io.rmvb");
        File nio = new File("nio.rmvb");

        // 比较传统的 I/O 和 NIO 传输文件的时间
        long time = simpleFileTransferTest.transferFile(sourse, des);
        System.out.println(time + "：普通字节流时间");

        long timeNio = simpleFileTransferTest.transferFileWithNIO(sourse, nio);
        System.out.println(timeNio + "：NIO时间");
    }
}

```

#### 网络传输

 NIO 在网络传输中优于传统 I/O 的原因：

1. NIO 支持非阻塞 I/O，这意味着在执行 I/O 操作时，线程不会被阻塞。这使得在网络传输中可以有效地管理大量并发连接（数千甚至数百万）。而在操作文件时，这个优势没有那么明显，因为文件读写通常不涉及大量并发操作。

2. NIO 支持 I/O 多路复用，这意味着一个线程可以同时监视多个通道（如套接字），并在 I/O 事件（如可读、可写）准备好时处理它们。这大大提高了网络传输中的性能，因为单个线程可以高效地管理多个并发连接。操作文件时这个优势也无法提现出来。

3. NIO 提供了 ByteBuffer 类，可以高效地管理缓冲区。这在网络传输中很重要，因为数据通常是以字节流的形式传输。操作文件的时候，虽然也有缓冲区，但优势仍然不够明显。



**IO操作：套接字**

```java
public class IOServer {
    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(8080);
		
            while (true) {//while 循环监听客户端
                Socket client = serverSocket.accept();
                InputStream in = client.getInputStream();
                OutputStream out = client.getOutputStream();

                byte[] buffer = new byte[1024];
                int bytesRead = in.read(buffer);
                out.write(buffer, 0, bytesRead);

                in.close();
                out.close();
                client.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

Socket 和 ServerSocket 是传统的阻塞式 I/O 编程方式，用于建立和管理 TCP 连接。

- Socket：表示客户端套接字，负责与服务器端建立连接并进行数据的读写。
- ServerSocket：表示服务器端套接字，负责监听客户端连接请求。当有新的连接请求时，ServerSocket 会创建一个新的 Socket 实例，用于与客户端进行通信。

在传统阻塞式 I/O 编程中，每个连接都需要一个单独的线程进行处理，这导致了在高并发场景下的性能问题。



**NIO操作：通道与选择器**

为了解决传统阻塞式 I/O 的性能问题，Java NIO 引入了 ServerSocketChannel 和 SocketChannel。它们是非阻塞 I/O，可以在单个线程中处理多个连接。

- ServerSocketChannel：类似于 ServerSocket，表示服务器端套接字通道。它负责监听客户端连接请求，并可以设置为非阻塞模式，这意味着在等待客户端连接请求时不会阻塞线程。
- SocketChannel：类似于 Socket，表示客户端套接字通道。它负责与服务器端建立连接并进行数据的读写。SocketChannel 也可以设置为非阻塞模式，在读写数据时不会阻塞线程。

Selector 是 Java NIO 中的一个关键组件，用于实现 I/O 多路复用。它允许在单个线程中同时监控多个 ServerSocketChannel 和 SocketChannel，并通过 SelectionKey 标识关注的事件。当某个事件发生时，Selector 会将对应的 SelectionKey 添加到已选择的键集合中。通过使用 Selector，可以在单个线程中同时处理多个连接，从而有效地提高 I/O 操作的性能，特别是在高并发场景下。

```java
public class NIOServer {
    public static void main(String[] args) {
        try {
            // 创建 ServerSocketChannel
            ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
            // 绑定端口
            serverSocketChannel.bind(new InetSocketAddress(8081));
            // 设置为非阻塞模式
            serverSocketChannel.configureBlocking(false);

            // 创建 Selector
            Selector selector = Selector.open();
            // 将 ServerSocketChannel 注册到 Selector，关注 OP_ACCEPT 事件
            serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

            // 无限循环，处理事件
            while (true) {
                // 阻塞直到有事件发生
                selector.select();
                // 获取发生事件的 SelectionKey
                Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
                while (iterator.hasNext()) {
                    SelectionKey key = iterator.next();
                    // 处理完后，从 selectedKeys 集合中移除
                    iterator.remove();

                    // 判断事件类型
                    if (key.isAcceptable()) {
                        // 有新的连接请求
                        ServerSocketChannel server = (ServerSocketChannel) key.channel();
                        // 接受连接
                        SocketChannel client = server.accept();
                        // 设置为非阻塞模式
                        client.configureBlocking(false);
                        // 将新的 SocketChannel 注册到 Selector，关注 OP_READ 事件
                        client.register(selector, SelectionKey.OP_READ);
                    } else if (key.isReadable()) {
                        // 有数据可读
                        SocketChannel client = (SocketChannel) key.channel();
                        // 创建 ByteBuffer 缓冲区
                        ByteBuffer buffer = ByteBuffer.allocate(1024);
                        // 从 SocketChannel 中读取数据并写入 ByteBuffer
                        client.read(buffer);
                        // 翻转 ByteBuffer，准备读取
                        buffer.flip();
                        // 将数据从 ByteBuffer 写回到 SocketChannel
                        client.write(buffer);
                        // 关闭连接
                        client.close();
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

#### 小结

- 传统 I/O 采用阻塞式模型，线程在 I/O 操作期间无法执行其他任务。NIO 使用非阻塞模型，允许线程在等待 I/O 时执行其他任务，通过选择器（Selector）监控多个通道（Channel）上的 I/O 事件，提高性能和可伸缩性。
- 传统 I/O 使用基于字节流或字符流的类（如 FileInputStream、BufferedReader 等）进行文件读写。NIO 使用通道（Channel）和缓冲区（Buffer）进行文件操作，NIO 在性能上的优势并不大。
- 传统 I/O 使用 Socket 和 ServerSocket 进行网络传输，存在阻塞问题。NIO 提供了 SocketChannel 和 ServerSocketChannel，支持非阻塞网络传输，提高了并发处理能力。

