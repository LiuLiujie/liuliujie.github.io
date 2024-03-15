# JVM监控

首先使用top命令获取需要监控的或异常java线程的pid

## jstat

获取jvm的基本信息，如GC，内存等

- 获取GC信息：`jstat -gc <pid>`
  - YGC和YGCT是young GC次数和时间
  - FGC和FGCT是full GC的次数和时间

```
    S0C         S1C         S0U         S1U          EC           EU           OC           OU          MC         MU       CCSC      CCSU     YGC     YGCT     FGC    FGCT     CGC    CGCT       GCT   
        0,0      4096,0         0,0      3193,3      45056,0      24576,0      49152,0      20021,5    36416,0    36022,4    5248,0    5050,4      7     0,017     0     0,000     4     0,002     0,020
```



## jmap

Jmap是打印堆中信息常用：一般在内存不足，GC异常等情况下，我们会去怀疑内存泄漏，这个时候就会去打印堆Dump。

- 查看堆中对象和内存大小：`jmap -histo <pid>`

```
 num     #instances         #bytes  class name (module)
-------------------------------------------------------
   1:        123101       18162456  [B (java.base@17.0.9)
   2:         13959        8537656  [I (java.base@17.0.9)
   3:         88472        2123328  java.lang.String (java.base@17.0.9)
   4:         19122        1682736  java.lang.reflect.Method (java.base@17.0.9)
   5:          9949        1176896  java.lang.Class (java.base@17.0.9)
   6:         45671         996520  [Ljava.lang.Class; (java.base@17.0.9)
```

