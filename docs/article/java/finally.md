---
category:
- Computer Science
- Programming Language

tag: 
- Java
---
# Finally 关键字

Java 中的 Finally 关键一般与try一起使用，在程序进入try块之后，无论程序是因为异常而中止或其它方式返回终止的，finally块的内容一定会被执行 。因此我们可以在 finally 代码块中执行关闭连接、关闭文件和释放线程的的操作。

```java
public class Solution {
    public int testFinally() {
        int i=0;
        try {
            return i++;//先返回再加，因此返回0
        } finally {
            ++i;//try中已经加了，这里再加一次
            System.out.println("Finally: " + i);
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println("Main: "+solution.testFinally());
    }
}
```

以上程序输出为

```
Finally: 2
Main: 0
```



## Finally 不执行的情况

###  1. System.exit 函数

```
try {
    System.out.println("Inside try");
    System.exit(1);
} finally {
    System.out.println("Inside finally");
}
```

输出：

```
Inside try
```



### 2. halt 函数

```java
try {
    System.out.println("Inside try");
    Runtime.getRuntime().halt(1);
} finally {
    System.out.println("Inside finally");
}
```

输出：

```
Inside try
```



### 3. 守护线程

如果守护线程刚开始执行到 finally 代码块，此时没有任何其他非守护线程，那么虚拟机将退出，此时 JVM 不会等待守护线程的 finally 代码块执行完成。

```java
Runnable runnable = () -> {
    try {
        System.out.println("Inside try");
    } finally {
        try {
            Thread.sleep(1000);
            System.out.println("Inside finally");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
};
Thread regular = new Thread(runnable);
Thread daemon = new Thread(runnable);
daemon.setDaemon(true);
regular.start();
Thread.sleep(300);
daemon.start();
```

输出：

```
Inside try Inside try Inside finally
```



### 4. Try中无限循环

```java
try {
    System.out.println("Inside try");
    while (true) {
    }
} finally {
    System.out.println("Inside finally");
}
```



## Finally 中返回或抛出会导致try和catch被忽略

Finally中进行返回或抛出异常，会导致try和catch中抛出的异常或返回被忽略

```java
try {
    System.out.println("Inside try");
    throw new RuntimeException();//被忽略
} finally {
    System.out.println("Inside finally");
    return "from finally";
}

try {
    System.out.println("Inside try");
    return "from try";//不会被执行
} finally {
    System.out.println("Inside finally");
    return "from finally";
}

try {
    System.out.println("Inside try");
    return "from try";
} finally {
    throw new RuntimeException();//永远都在抛出异常
}
```



[Reference](https://juejin.cn/post/6844904039402962958)