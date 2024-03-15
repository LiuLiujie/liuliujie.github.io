# 生产者消费者模型



## 单元素的生产者消费者模型

**生产一个，消费一个，因此生产和消费需要交叉进行**

<img src="https://pics.yujieliu.com/blog/2023/12/500069f45f64612c47e88d86d42b9f1d.png" alt="img" style="zoom:50%;" />

以下使用Lock Condition的 await/signal 机制为例。

- 消费者线程 awaitThread 先通过 `lock.lock()` 方法获取锁，成功后发现还未生产，只能调用 condition.await 方法进入等待队列；

- 另一个生产者线程 signalThread 通过 `lock.lock()` 方法获取锁成功后进行生产，然后调用 condition.signal 或者 signalAll 方法，使得消费者线程 awaitThread 能够有机会移入到同步队列中；

- 当其他线程释放 lock 后使得线程 awaitThread 能够有机会获取 lock，从而使得线程 awaitThread 能够从 await 方法中退出并执行后续操作。如果 awaitThread 获取 lock 失败会直接进入到同步队列。

```java
public class AwaitSignal {
    private static ReentrantLock lock = new ReentrantLock();
    private static Condition condition = lock.newCondition();
    private static volatile boolean flag = false;

    public static void main(String[] args) {
        Thread waiter = new Thread(new waiter());
        waiter.start();
        Thread signaler = new Thread(new signaler());
        signaler.start();
    }

    static class waiter implements Runnable {

        @Override
        public void run() {
            lock.lock();
            try {
                while (!flag) {
                    System.out.println(Thread.currentThread().getName() + "未生产，等待");
                    try {
                        condition.await();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println(Thread.currentThread().getName() + "接收到通知，开始消费");
            } finally {
                lock.unlock();
            }
        }
    }

    static class signaler implements Runnable {

        @Override
        public void run() {
            lock.lock();
            try {
              	//完成生产并通知消费者
                flag = true;
                condition.signalAll();
            } finally {
                lock.unlock();
            }
        }
    }
}

```

## 多元素的生产者消费者模型（队列）