---
category:
- Computer Science
- Programming Language

tag: 
- Java
---

# 线程安全如何实现

线程安全问题的产生本质上是因为多个线程在并发条件下对同一个共享资源的争抢，因此有两种方向来保证线程安全：

1. 限制线程对资源的并发访问：这个方向的主要方式是加锁（阻塞），volatile（非阻塞）。
2. 将该资源设置为线程独占的：这个方向主要实现方式是TreadLocal。

