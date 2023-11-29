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