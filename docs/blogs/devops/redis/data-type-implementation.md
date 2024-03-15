---
category:
- Computer Science
- Cache

tag: 
- Redis
---

# Redis Type Implementation 数据类型实现

![img](https://pics.yujieliu.com/blog/2023/12/53fc7fbed63e9ed95f1b5ac373d86df1.png)

## String类型

Redis使用C自行实现了一个简单动态字符串（SDS）作为String类型的底层实现。其源码可以见[这](https://github.com/redis/redis/blob/unstable/src/sds.h)。

redis提供了`sdshdr5` ,`sdshdr8`, `sdshdr16`, `sdshdr32`, `sdshdr64`这几种sds的实现，其中除了`sdshdr5`比较特殊外，其他几种`sdshdr`差不只在于两个字段的类型差别。

截取一段源代码可以看出来Redis把内存省到了极致。

- 使用 `__attribute__ ((__packed__)) ` 声明结构体的作用：让编译器以 `紧凑模式 `来分配内存，如果不声明该属性，编译器可能会为结构体成员做内存对齐优化，在其中填充空字符。这样就不能保证结构体成员在内存上是紧凑相邻的，也不能通过 buf 向低地址偏移一个字节来获取 flags 字段的值。

- **len**：表示sds当前sds的长度(单位是字节)，不包括'0'终止符。**通过len直接获取字符串长度，复杂度为O(1)，相比之下其他C的字符串需要通过扫描整个扫一遍string，复杂度为O(n)，这就是封装sds的理由之一**。

- **alloc**：表示当前为sds分配的大小(单位是字节)(3.2以前的版本用的free是表示还剩free字节可用空间)，不包括'0'终止符。

- **flags**：表示当前sdshdr的类型，声明为char 一共有1个字节(8位)，仅用低三位就可以表示所有5种sdshdr类型(详见上文代码注释)。 要判断一个sds属于什么类型的sdshdr，只需 flags&SDS_TYPE_MASK和SDS_TYPE_n比较即可(之所以需要SDS_TYPE_MASK是因为有sdshdr5这个特例，它的高5位不一定为0）。

- **char buf[]**：一个没有指定长度的字符数组，这是 C 语言定义字符数组的一种特殊写法，称为 flexible array member，只能定义在一个结构体的最后一个成员。buf 起标记作用，表示在 flags 字段后面就是一个字符数组，程序在为 sdshdr 分配内存时，它并不占用内存空间。

  还有，要说明之所以sizeof(struct sdshdr8)的大小是len+alloc+flags 是因为这个struct拥有一个柔性数组成员 buf，柔性数组成员是C99之后引入的一个新feature，这里可以通过sizeof整个struct给出buf变量的偏移量，从而确定buf的位置。

```c
struct __attribute__ ((__packed__)) sdshdr8 {
    uint8_t len; /* used */
    uint8_t alloc; /* excluding the header and null terminator */
    unsigned char flags; /* 3 lsb of type, 5 unused bits */
    char buf[];
};
struct __attribute__ ((__packed__)) sdshdr16 {
    uint16_t len; /* used */
    uint16_t alloc; /* excluding the header and null terminator */
    unsigned char flags; /* 3 lsb of type, 5 unused bits */
    char buf[];
};
```



### 使用方法详解

注意到sds直接指向了buf[]字符串，这样就可以兼容C的原生字符串了

1. 获取`len, alloc, flags`：方式就是通过buf[]的地址向前计算。

2. 获取数据类型：就是对00000111进行求与操作，获取对应的类型。

3. 然后再根据类型进行操作

```c
#define SDS_TYPE_5  0
#define SDS_TYPE_8  1
#define SDS_TYPE_16 2
#define SDS_TYPE_32 3
#define SDS_TYPE_64 4
#define SDS_TYPE_MASK 7

static inline size_t sdslen(const sds s) {
    unsigned char flags = s[-1];
    switch(flags&SDS_TYPE_MASK) {
        case SDS_TYPE_5:
            return SDS_TYPE_5_LEN(flags);
        case SDS_TYPE_8:
            return SDS_HDR(8,s)->len;
        case SDS_TYPE_16:
            return SDS_HDR(16,s)->len;
        case SDS_TYPE_32:
            return SDS_HDR(32,s)->len;
        case SDS_TYPE_64:
            return SDS_HDR(64,s)->len;
    }
    return 0;
}
```



### 扩容机制

Redis也采用动态扩容机制，扩容大小先指数再线性。在1024*1024大小之前都是指数扩容，再这之后则是线性扩容。

不同的地方在于redis不仅要考虑buf[]大小的变化，还要考虑sdshdr类型的变化。

```c
#define SDS_MAX_PREALLOC (1024*1024)

//大小变化
if (newlen < SDS_MAX_PREALLOC)
        newlen *= 2;
    else
        newlen += SDS_MAX_PREALLOC;

//类型变化
type = sdsReqType(newlen);
if (oldtype==type) {
        newsh = s_realloc_usable(sh, hdrlen+newlen+1, &usable);
        if (newsh == NULL) return NULL;
        s = (char*)newsh+hdrlen;
    } else {
        /* Since the header size changes, need to move the string forward,
         * and can't use realloc */
        newsh = s_malloc_usable(hdrlen+newlen+1, &usable);
        if (newsh == NULL) return NULL;
        memcpy((char*)newsh+hdrlen, s, len+1);
        s_free(sh);
        s = (char*)newsh+hdrlen;
        s[-1] = type;//这个地方改变了类型
        sdssetlen(s, len);
    }
```



### 总结：相比C原生字符串优势

- **SDS 不仅可以保存文本数据，还可以保存二进制数据**。因为 SDS 使用 len 属性的值而不是空字符来判断字符串是否结束，并且 SDS 的所有 API 都会以处理二进制的方式来处理 SDS 存放在 buf[] 数组里的数据。所以 SDS 不光能存放文本数据，而且能保存图片、音频、视频、压缩文件这样的二进制数据。
- **SDS 获取字符串长度的时间复杂度是 O(1)**。因为 C 语言的字符串并不记录自身长度，所以获取长度的复杂度为 O(n)；而 SDS 结构里用 len 属性记录了字符串长度，所以复杂度为 O(1)。
- **Redis 的 SDS API 是安全的，拼接字符串不会造成缓冲区溢出**。因为 SDS 在拼接字符串之前会检查 SDS 空间是否满足要求，如果空间不够会自动扩容，所以不会导致缓冲区溢出的问题。



## List类型

源代码：[Quicklist](https://github.com/redis/redis/blob/unstable/src/quicklist.h)

由于双向链表的指针内存开销比较大（64位系统需要两个8byte），因此在3.2版本后使用quicklist替代了双向链表。

![img](https://pics.yujieliu.com/blog/2023/12/698980d504d9381d3f448a2f8aa5f6cb.png)

Quicklist 实际上是 ZipList 和 LinkedList 的混合体，它将 LinkedList 按段切分，每一段使用 ZipList 来紧凑存储，多个 ZipList 之间使用双向指针串接起来。

```c
/* quicklistNode is a 32 byte struct describing a listpack for a quicklist.
 * We use bit fields keep the quicklistNode at 32 bytes.
 * count: 16 bits, max 65536 (max lp bytes is 65k, so max count actually < 32k).
 * encoding: 2 bits, RAW=1, LZF=2.
 * container: 2 bits, PLAIN=1 (a single item as char array), PACKED=2 (listpack with multiple items).
 * recompress: 1 bit, bool, true if node is temporary decompressed for usage.
 * attempted_compress: 1 bit, boolean, used for verifying during testing.
 * extra: 10 bits, free for future use; pads out the remainder of 32 bits */

typedef struct quicklistNode {
    struct quicklistNode *prev;
    struct quicklistNode *next;
    unsigned char *entry;
    size_t sz;             /* entry size in bytes */
    unsigned int count : 16;     /* count of items in listpack */
    unsigned int encoding : 2;   /* RAW==1 or LZF==2 */
    unsigned int container : 2;  /* PLAIN==1 or PACKED==2 */
    unsigned int recompress : 1; /* was this node previous compressed? */
    unsigned int attempted_compress : 1; /* node can't compress; too small */
    unsigned int dont_compress : 1; /* prevent compression of entry that will be used later */
    unsigned int extra : 9; /* more bits to steal for future usage */
} quicklistNode;
```

- prev: 指向链表前一个节点的指针。
- next: 指向链表后一个节点的指针。
- entry: 数据指针。如果当前节点的数据没有压缩，那么它指向一个ziplist结构；否则，它指向一个quicklist LZF结构。
- sz: 表示zl指向的ziplist的总大小（包括`zlbytes`, `zltail`, `zllen`, `zlend`和各个数据项）。需要注意的是：如果ziplist被压缩了，那么这个sz的值仍然是压缩前的ziplist大小。
- count: 表示ziplist里面包含的数据项个数。这个字段只有16bit。
- encoding: 表示ziplist是否压缩了（以及用了哪个压缩算法）。目前只有两种取值：2表示被压缩了（而且用的是LZF压缩算法），1表示没有压缩。
- container: 是一个预留字段。本来设计是用来表明一个quicklist节点下面是直接存数据，还是使用ziplist存数据，或者用其它的结构来存数据（用作一个数据容器，所以叫container）。但是，在目前的实现中，这个值是一个固定的值2，表示使用ziplist作为数据容器。
- recompress: 当我们使用类似lindex这样的命令查看了某一项本来压缩的数据时，需要把数据暂时解压，这时就设置recompress=1做一个标记，等有机会再把数据重新压缩。
- attempted_compress: 这个值只对Redis的自动化测试程序有用。我们不用管它。
- dont_compress: 阻止对entry进行压缩
- extra: 其它扩展字段。目前Redis的实现里也没用上。

### 插入及扩容机制

1. **头部或者尾部进行插入**( `quicklistPushHead` 和 `quicklistPushTail` )，包含两种情况：

   - 如果头节点（或尾节点）上ziplist大小没有超过限制（即`_quicklistNodeAllowInsert`返回1），那么新数据被直接插入到ziplist中（调用`ziplistPush`）。

   - 如果头节点（或尾节点）上ziplist太大了，那么新创建一个quicklistNode节点（对应地也会新创建一个ziplist），然后把这个新创建的节点插入到quicklist双向链表中。

2. **从任意指定的位置插入**。`quicklistInsertAfter`和`quicklistInsertBefore`就是分别在指定位置后面和前面插入数据项。这种在任意指定位置插入数据的操作，要比在头部和尾部的进行插入要复杂一些。

   - 当插入位置所在的ziplist大小没有超过限制时，直接插入到ziplist中就好了；

   - 当插入位置所在的ziplist大小超过了限制，但插入的位置位于ziplist两端，并且相邻的quicklist链表节点的ziplist大小没有超过限制，那么就转而插入到相邻的那个quicklist链表节点的ziplist中；

   - 当插入位置所在的ziplist大小超过了限制，但插入的位置位于ziplist两端，并且相邻的quicklist链表节点的ziplist大小也超过限制，这时需要新创建一个quicklist链表节点插入。

   - 对于插入位置所在的ziplist大小超过了限制的其它情况（主要对应于在ziplist中间插入数据的情况），则需要把当前ziplist分裂为两个节点，然后再其中一个节点上插入数据。

### 查找

list的查找操作主要是对index的我们的quicklist的节点是由一个一个的ziplist构成的每个ziplist都有大小。所以我们就只需要先根据我们每个node的个数，从而找到对应的ziplist，调用ziplist的index就能成功找到。

### 删除

区间元素删除的函数是 `quicklistDelRange`

Quicklist 在区间删除时，会先找到 start 所在的 quicklistNode，计算删除的元素是否小于要删除的 count，如果不满足删除的个数，则会移动至下一个 quicklistNode 继续删除，依次循环直到删除完成为止。

`quicklistDelRange` 函数的返回值为 int 类型，当返回 1 时表示成功的删除了指定区间的元素，返回 0 时表示没有删除任何元素。



## Hash类型

