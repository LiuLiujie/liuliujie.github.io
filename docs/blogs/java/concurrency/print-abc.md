---
category:
- Computer Science
- Programming Language

tag: 
- Java
---

# 实战：多线程打印ABC

主要方向有两种：一是自旋，二是阻塞（加锁或信号量）

## 1. 使用volatile关键字进行自旋

三个方法各自死循环，直到计数器对 3 取余是相应的数字。为了避免浪费资源，在自旋失败时让出 CPU 时间

```java
public class PrintABC {
    private volatile int counter = 0;

    public void printA() {
        while (true) {
            while (counter % 3 != 0) {
                Thread.yield();
            }
            System.out.print("A");
            counter++;
        }
    }

    public void printB() {
        while (true) {
            while (counter % 3 != 1) {
                Thread.yield();
            }
            System.out.print("B");
            counter++;
        }
    }

    public void printC() {
        while (true) {
            while (counter % 3 != 2) {
                Thread.yield();
            }
            System.out.print("C");
            counter++;
        }
    }

    public static void main(String[] args) {
        PrintABC printABC = new PrintABC();
        new Thread(()-> printABC.printA()).start();
        new Thread(()-> printABC.printB()).start();
        new Thread(()-> printABC.printC()).start();
    }
}
```

## 2. synchronized上锁

使用同一把锁（synchronized 修饰同一个对象）和一个计数器。

当计数器对 3 取余是相应的数字时，打印字母，否则线程休眠（释放锁）。

此时解锁时通知的粒度更大，只能通知到所有其他的线程

```java
private final Object o = new Object();
private int counter = 0;

public void printA() throws InterruptedException {
    while (true) {
        synchronized (o) {
            while (counter % 3 != 0) {
                o.wait();
            }
            System.out.print("A");
            counter++;
            o.notifyAll();
        }
    }
}

public void printB() throws InterruptedException {
    while (true) {
        synchronized (o) {
            while (counter % 3 != 1) {
                o.wait();
            }
            System.out.print("B");
            counter++;
            o.notifyAll();
        }
    }
}

public void printC() throws InterruptedException {
    while (true) {
        synchronized (o) {
            while (counter % 3 != 2) {
                o.wait();
            }
            System.out.print("C");
            counter++;
            o.notifyAll();
        }
    }
}
```

## 3. Lock

通过 Condition 降低了锁的粒度，因此唤醒其他线程时，不是全体唤醒，而是精准唤醒。

```java
private final Lock lock = new ReentrantLock();
private final Condition condition1 = lock.newCondition();
private final Condition condition2 = lock.newCondition();
private final Condition condition3 = lock.newCondition();
private volatile int counter = 0;

public void printA() throws InterruptedException {
    while (true) {
        lock.lock();
        try {
            while (counter % 3 != 0) {
                condition1.await();
            }
            System.out.print("A");
            counter++;
            condition2.signal();
        } finally {
            lock.unlock();
        }
    }
}

public void printB() throws InterruptedException {
    while (true) {
        lock.lock();
        try {
            while (counter % 3 != 1) {
                condition2.await();
            }
            System.out.print("B");
            counter++;
            condition3.signal();
        } finally {
            lock.unlock();
        }
    }
}

public void printC() throws InterruptedException {
    while (true) {
        lock.lock();
        try {
            while (counter % 3 != 2) {
                condition3.await();
            }
            System.out.print("C");
            counter++;
            condition1.signal();
        } finally {
            lock.unlock();
        }
    }
}
```