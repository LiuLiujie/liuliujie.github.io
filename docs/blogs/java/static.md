# Static 关键字

### 静态代码块，构造函数和main函数的执行顺序

静态代码块先执行，然后是main函数，最后是构造函数

```java
public class Solution {

    static {
        System.out.println("AAA");
    }

    static {
        System.out.println("BBB");
    }

    public Solution(){
        System.out.println("MainClass");
    }

    public static void main(String[] args) {
        System.out.println("CCC");
        Solution solution = new Solution();
    }
}
```

运行结果

```java
AAA
BBB
CCC
MainClass
```

