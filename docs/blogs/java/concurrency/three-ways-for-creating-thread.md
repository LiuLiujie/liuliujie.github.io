# 创建并控制线程的三种方式

## 创建方式

### 1. 继承 Thread 类，重写run方法

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println("Thread: " + getName());
        }
    }
}
```



### 2. 实现 Runnable 接口，重写run方法

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try {//sleep会发生异常要显示处理
                Thread.sleep(20);//暂停20毫秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Thread: " + Thread.currentThread().getName() + i);
        }
    }
}
```



### 3. 实现 Callable 接口，重写 call 方法，通过 FutureTask 获取任务执行的返回值

```java
public class CallerTask implements Callable<String> {
    public String call() throws Exception {
        return "Hello,i am running!";
    }

    public static void main(String[] args) {
        //创建异步任务
        FutureTask<String> task=new FutureTask<String>(new CallerTask());
        //启动线程
        new Thread(task).start();
        try {
            //等待执行完成，并获取返回结果
            String result=task.get();
            System.out.println(result);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```



## 控制线程的方法

### 1. run 方法和 start 方法

- `run()`：封装线程执行的代码，直接调用相当于调用普通方法。
- `start()`：启动线程，然后由 JVM 调用此线程的 `run()` 方法。



### 2. sleep方法

- 使当前正在执行的线程暂停指定的毫秒数，也就是进入休眠的状态。

- 需要注意的是，sleep 的时候要对异常进行处理。

  ```java
  try {//sleep会发生异常要显示处理
      Thread.sleep(20);//暂停20毫秒
  } catch (InterruptedException e) {
      e.printStackTrace();
  }
  ```



### 3. join和yield方法

- join方法等待这个线程执行完才会轮到后续线程得到 cpu 的执行权，使用时需要捕获异常。
- yield方法是暂停当前正在执行的线程对象，并执行其他线程。

```java
//创建MyRunnable类
MyRunnable mr = new MyRunnable();
//创建Thread类的有参构造,并设置线程名
Thread t1 = new Thread(mr, "A");
Thread t2 = new Thread(mr, "B");
Thread t3 = new Thread(mr, "C");
//启动线程
t1.start();
try {
    t1.join(); //等待t1执行完才会轮到t2，t3抢
} catch (InterruptedException e) {
    e.printStackTrace();
}
t2.start();
t3.start();

```



### 4. setDaemon

将此线程标记为守护线程，准确来说，就是服务其他的线程，像 Java 中的垃圾回收线程，就是典型的守护线程。

如果其他线程都执行完毕，main 方法（主线程）也执行完毕，JVM 就会退出，也就是停止运行。如果 JVM 都停止运行了，守护线程自然也就停止了。

```java
//创建MyRunnable类
MyRunnable mr = new MyRunnable();
//创建Thread类的有参构造,并设置线程名
Thread t1 = new Thread(mr, "A");
Thread t2 = new Thread(mr, "B");
Thread t3 = new Thread(mr, "C");

t1.setDaemon(true);
t2.setDaemon(true);

//启动线程
t1.start();
t2.start();
t3.start();
```



## Q&A

### 1. 继承 Thread 的方法和实现 Runnable 接口的方式创建多线程，哪个好？

实现 Runable 接口好，原因有两个：

- 避免了 Java 单继承的局限性，Java 不支持多重继承，因此如果我们的类已经继承了另一个类，就不能再继承 Thread 类了。
- 适合多个相同的程序代码去处理同一资源的情况，把线程、代码和数据有效的分离，更符合面向对象的设计思想。Callable 接口与 Runnable 非常相似，但可以返回一个结果。
