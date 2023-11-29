# Integer 进制转换

## 10进制转其他进制

|          | 方法                       | 返回值       |
| -------- | -------------------------- | ------------ |
| 转2进制  | Integer.toBinaryString(n); | 2进制字符串  |
| 转8进制  | Integer.toOctalString(n);  | 8进制字符串  |
| 转16进制 | Integer.toHexString(n);    | 16进制字符串 |
| 转r进制  | Integer.toString(n, r);    | r进制字符串  |



## 其他进制转10进制

|               | 方法                                  | 返回值 |
| ------------- | ------------------------------------- | ------ |
| r进制转10进制 | Integer.parseInt((String) s,(int) r); | Int    |



## 进制转换自己实现

```java
private static char[] array = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .toCharArray();
 
public static String myDec(int number, int n) {
    StringBuilder result = new StringBuilder();
    // 模拟计算进制的过程
    while (number > 0) {
        result.insert(0, array[number % n]);
        number /= n;
    }
    return result.toString();
}
```

