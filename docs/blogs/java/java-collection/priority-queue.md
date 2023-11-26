---
category:
- Computer Science
- Programming Language

tag: 
- Java
---
#  PriorityQueue 优先队列

PriorityQueue 是 Java 中的一个基于**优先级堆**的优先队列实现，它能够在 **O(log n) 的时间复杂度**内实现元素的插入和删除操作，并且能够自动维护队列中元素的优先级顺序。

通俗来说，PriorityQueue 就是一个队列，但是它不是先进先出的，而是按照元素优先级进行排序的。当你往 PriorityQueue 中插入一个元素时，它会自动根据元素的优先级将其插入到合适的位置。当你从 PriorityQueue 中删除一个元素时，它会自动将优先级最高的元素出队。

- [堆排序](../../algorithm/sorting/heapsort.md) 介绍

## 常用函数

- `offer()`: 插入一个元素
- `add(E e)`: 和`offer(E e)`的语义相同，都是向优先队列中插入元素，只是`Queue`接口规定二者对插入失败时的处理不同，前者在插入失败时抛出异常，后则则会返回`false`。对于*PriorityQueue*这两个方法其实没什么差别。
- `poll()`: 获取队头元素并出队
- `element()`和`peek()`的语义完全相同，都是获取但不删除队首元素，也就是队列中权值最小的那个元素，二者唯一的区别是当方法失败时前者抛出异常，后者返回`null`。根据小顶堆的性质，堆顶那个元素就是全局最小的那个；由于堆用数组表示，根据下标关系，`0`下标处的那个元素既是堆顶元素。所以**直接返回数组`0`下标处的那个元素即可**。

### 示例代码

默认为从小到大升序排列

```java
// 创建 PriorityQueue 对象
PriorityQueue<String> priorityQueue = new PriorityQueue<>();

// 添加元素到 PriorityQueue
priorityQueue.offer("AAA");
priorityQueue.offer("BBB");
priorityQueue.offer("CCC");

// 打印 PriorityQueue 中的元素
while (!priorityQueue.isEmpty()) {
    System.out.print(priorityQueue.poll() + " ");
}
//Results: AAA BBB CCC
```

## 自定义排列顺序

有两种方式来自定义排列顺序

- 向队列传入`Comparator`对象
- 自身元素实现`Comparable`接口
- 详细可以参考 [Comparator 和 Comparable 接口](comparator-comparable-interface.md)



### 1. 使用`Comparator`提供的静态方法为降序排列

```java
PriorityQueue<String> priorityQueue = new PriorityQueue<>(Comparator.reverseOrder());
```

### 2. 自定义`Comparator`规则

- 返回值如果**小于0**，说明前者要小于后者
- 如果相等，则二者相等

```java
static Comparator<ListNode> cmp = new Comparator<>() {
    public int compare(ListNode n1, ListNode n2) {
        return n1.val - n2.val;//依旧是从小到大
    }
};

Queue<ListNode> prique = new PriorityQueue<>(cmp);
```

### 3. 元素实现`Comparable`接口

- 返回值如果**小于0**，说明本身要小于后者
- 如果相等，则二者相等

```java
public class Person implements Comparable<Person>{
  private int age;
  
  public int getAge(){
    return this.age;
  }
  
  @Override
  public int compareTO(Person person){
    return this.age - person.getAge();
  }
}
```



## 元素插入图解源码

假设有如下的一个优先队列

<img src="https://pics.yujieliu.com/blog/2023/11/0caacfabbbbd35a902c86a429edc71ff.png" alt="img" style="zoom: 50%;" />

比如我们要插入4，可以看到由于新元素小于其父节点，因此需要需要把元素上移两次。

<img src="https://pics.yujieliu.com/blog/2023/11/6c1a07e3358a2d877c69d1fc5113a2d4.png" alt="img" style="zoom:50%;" />

```java
//offer(E e)
public boolean offer(E e) {
    if (e == null)//不允许放入null元素
        throw new NullPointerException();
    modCount++;
    int i = size;
    if (i >= queue.length)
        grow(i + 1);//自动扩容
    size = i + 1;
    if (i == 0)//队列原来为空，这是插入的第一个元素
        queue[0] = e;
    else
        siftUp(i, e);//调整
    return true;
}
```

上述代码中，扩容函数`grow()`类似于`ArrayList`里的`grow()`函数，就是再申请一个更大的数组，并将原数组的元素复制过去，这里不再赘述。需要注意的是`siftUp(int k, E x)`方法，该方法用于插入元素`x`并维持堆的特性。

```Java
//siftUp()
private void siftUp(int k, E x) {
    while (k > 0) {
        int parent = (k - 1) >>> 1;//parentNo = (nodeNo-1)/2
        Object e = queue[parent];
        if (comparator.compare(x, (E) e) >= 0)//调用比较器的比较方法
            break;
        queue[k] = e;
        k = parent;
    }
    queue[k] = x;
}
```

调整的过程为：**从`k`指定的位置开始，将`x`逐层与当前点的`parent`进行比较并交换，直到满足`x >= queue[parent]`为止**。注意这里的比较可以是元素的自然顺序，也可以是依靠比较器的顺序。

## 元素删除图解源码

### poll()

`remove()`和`poll()`方法的语义也完全相同，都是获取并删除队首元素，区别是当方法失败时前者抛出异常，后者返回`null`。由于删除操作会改变队列的结构，为维护小顶堆的性质，需要进行必要的调整。

<img src="https://pics.yujieliu.com/blog/2023/11/d23f94f7b5aae49cc3e33e048ab669ca.png" alt="PriorityQueue_poll.png" style="zoom:50%;" />

代码如下：

```Java
public E poll() {
    if (size == 0)
        return null;
    int s = --size;
    modCount++;
    E result = (E) queue[0];//0下标处的那个元素就是最小的那个
    E x = (E) queue[s];
    queue[s] = null;
    if (s != 0)
        siftDown(0, x);//调整
    return result;
}
```

上述代码首先记录`0`下标处的元素，并用最后一个元素替换`0`下标位置的元素，之后调用`siftDown()`方法对堆进行调整，最后返回原来`0`下标处的那个元素（也就是最小的那个元素）。重点是`siftDown(int k, E x)`方法，该方法的作用是**从`k`指定的位置开始，将`x`逐层向下与当前点的左右孩子中较小的那个交换，直到`x`小于或等于左右孩子中的任何一个为止**。

```Java
//siftDown()
private void siftDown(int k, E x) {
    int half = size >>> 1;
    while (k < half) {
      //首先找到左右孩子中较小的那个，记录到c里，并用child记录其下标
        int child = (k << 1) + 1;//leftNo = parentNo*2+1
        Object c = queue[child];
        int right = child + 1;
        if (right < size &&
            comparator.compare((E) c, (E) queue[right]) > 0)
            c = queue[child = right];
        if (comparator.compare(x, (E) c) <= 0)
            break;
        queue[k] = c;//然后用c取代原来的值
        k = child;
    }
    queue[k] = x;
}
```

### remove()

`remove(Object o)`方法用于删除队列中跟`o`相等的某一个元素（如果有多个相等，只删除一个），该方法不是*Queue*接口内的方法，而是*Collection*接口的方法。由于删除操作会改变队列结构，所以要进行调整；又由于删除元素的位置可能是任意的，所以调整过程比其它方法稍加繁琐。

具体来说，`remove(Object o)`可以分为 2 种情况：

1. 删除的是最后一个元素。直接删除即可，不需要调整。
2. 删除的不是最后一个元素，从删除点开始以最后一个元素为参照调用一次`siftDown()`即可。此处不再赘述。

<img src="https://pics.yujieliu.com/blog/2023/11/6267899139da55e611f81291fe8200df.png" alt="img" style="zoom:50%;" />

具体代码如下：

```Java
//remove(Object o)
public boolean remove(Object o) {
  //通过遍历数组的方式找到第一个满足o.equals(queue[i])元素的下标
    int i = indexOf(o);
    if (i == -1)
        return false;
    int s = --size;
    if (s == i) //情况1
        queue[i] = null;
    else {
        E moved = (E) queue[s];
        queue[s] = null;
        siftDown(i, moved);//情况2
        ......
    }
    return true;
}
```



参考：[Reference](https://javabetter.cn/collection/PriorityQueue.html)
