# 大端字节序（Big Endian）和小端字节序（Little Endian）

- 大端字节序（Big Endian）：最高有效位存于最低内存地址处，最低有效位存于最高内存处；
- 小端字节序（Little Endian）：最高有效位存于最高内存地址，最低有效位存于最低内存处。

![endian](https://pics.yujieliu.com/blog/2023/12/f9cce6d4306b55fdbdaaea4c29648ac4.png)

## 网络字节序

在进行网络传输的时候，先传递哪个字节？也就是说，当接收端收到第一个字节的时候，它将这个字节作为高位字节还是低位字节处理？

- UDP/TCP/IP协议规定：把接收到的第一个字节当作高位字节看待（大端字节序）