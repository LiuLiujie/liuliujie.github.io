# Java 继承和多态



## 继承

子类会隐式调用父类的构造函数

```java
public class Solution {
    public Solution(){
        System.out.println("MainClass");
    }
  
  	public static void main(String[] args) {
    		SubClass subClass = new SubClass();
		}
}

public class SubClass extends Solution{
    public SubClass(){
        System.out.println("SubClass");
    }
}
```

输出为：

```
MainClass
SubClass
```

