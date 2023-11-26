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

## 常用函数

- `offer()`: 插入一个元素
- `poll()` 获取队头元素并出队

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

