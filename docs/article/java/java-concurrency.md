# Java Concurrency 

## Java 多线程入门

- 进程，是对运行时程序的封装，是系统进行资源调度和分配的基本单位，实现了操作系统的并发。
- 线程，是进程的子任务，是 CPU 调度和分派的基本单位，实现了进程内部的并发。
### 创建多线程的三种方式
1. 继承 Thread 类，重写run方法
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

2. 实现 Runnable 接口，重写run方法

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

3. 实现 Callable 接口，重写 call 方法，通过 FutureTask 获取任务执行的返回值

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



### 控制线程的方法

#### 1. run 方法和 start 方法

- `run()`：封装线程执行的代码，直接调用相当于调用普通方法。
- `start()`：启动线程，然后由 JVM 调用此线程的 `run()` 方法。

#### 2.sleep方法

- 使当前正在执行的线程暂停指定的毫秒数，也就是进入休眠的状态。

- 需要注意的是，sleep 的时候要对异常进行处理。

  ```java
  try {//sleep会发生异常要显示处理
      Thread.sleep(20);//暂停20毫秒
  } catch (InterruptedException e) {
      e.printStackTrace();
  }
  ```

#### 3. join和yield方法

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

#### 4. setDaemon

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



### Q&A

#### 1. 继承 Thread 的方法和实现 Runnable 接口的方式创建多线程，哪个好？

实现 Runable 接口好，原因有两个：

- 避免了 Java 单继承的局限性，Java 不支持多重继承，因此如果我们的类已经继承了另一个类，就不能再继承 Thread 类了。
- 适合多个相同的程序代码去处理同一资源的情况，把线程、代码和数据有效的分离，更符合面向对象的设计思想。Callable 接口与 Runnable 非常相似，但可以返回一个结果。



## 获取线程的执行结果

创建线程有 3 种方式，一种是直接继承 Thread，一种是实现 Runnable 接口，另外一种是实现 Callable 接口。前 2 种方式都有一个缺陷：在执行完任务之后无法获取执行结果。

如果需要获取执行结果，就必须通过共享变量或者线程通信的方式来达到目的，这样使用起来就比较麻烦。

Java 1.5 提供了 Callable、Future、FutureTask，它们可以在任务执行完后得到执行结果。



### Callable接口

Callable接口定义了一个 `call()` 方法，返回的类型是一个 V 类型的范型。在之前的例子中，我们使用String来作为范型的具体类型。



## 线程的声明周期与状态

![life-cycle](https://pics.yujieliu.com/blog/2023/11/e1caf2e894899bac082eb725816a7295.png)





## 多线程带来的问题

### 线程死锁

两个或两个以上的进程（线程）在执行过程中，由于竞争资源或者由于彼此通信而造成的一种阻塞的现象。



#### 形成死锁的四个必要条件

##### 1. 互斥条件

线程(进程)对于所分配到的资源具有排它性，即一个资源只能被一个线程(进程)占用，直到被该线程(进程)释放

##### 2. 请求与保持条件

一个线程(进程)因请求被占用资源而发生阻塞时，对已获得的资源保持不放。

##### 3. 不剥夺条件

线程(进程)已获得的资源在末使用完之前不能被其他线程强行剥夺，只有自己使用完毕后才释放资源。

##### 4. 循环等待条件

当发生死锁时，所等待的线程(进程)必定会形成一个环路（类似于死循环），造成永久阻塞



#### 避免线程死锁——破坏其一条件

我们只要破坏产生死锁的四个条件中的其中一个就可以了。

1. **破坏互斥条件**

​	这个条件我们没有办法破坏，因为我们用锁本来就是想让他们互斥的（临界资源需要互斥访问）。

2. **破坏请求与保持条件**

​	一次性申请所有的资源。

3. **破坏不剥夺条件**

​	占用部分资源的线程进一步申请其他资源时，如果申请不到，可以主动释放它占有的资源。

4. **破坏循环等待条件**

​	靠按序申请资源来预防。按某一顺序申请资源，释放资源则反序释放。破坏循环等待条件。



### 线程安全：确保多线程数据一致性

为了确保多线程环境下数据的一致性，可以采取以下几种方法：

#### 1. 使用同步机制

通过使用锁、互斥量、信号量等同步机制，可以保证在同一时间只有一个线程能够访问和修改共享数据，从而避免数据竞争和冲突。

#### 2. 使用原子操作

原子操作是指不可中断的操作，可以保证在执行期间不会被其他线程中断。通过使用原子操作，可以避免多线程环境下的数据竞争和冲突。

#### 3. 使用线程安全的数据结构

线程安全的数据结构是指在多线程环境下能够保证数据操作的正确性和一致性的数据结构。例如，使用线程安全的队列、哈希表等数据结构可以避免数据竞争和冲突。

#### 4. 使用同步工具

同步工具是指用于协调和同步多个线程之间操作的工具。例如，使用信号量、条件变量等同步工具可以确保多线程环境下数据的一致性。
