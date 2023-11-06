---
category: Computer Science, Programming Language
tag:
- Java
- Java Collection
---

# Java Collection

## 1. Introduction 
The Java collection can be roughly divided into four systems: Set, List, Queue and Map
- `Set`: unordered and unrepeatable; 无序，不可重复
- `List`: ordered and repetable sets; 有序，可重复
- `Map`: collections with mapping relations; 两个具有映射关系的集合
- `Queue`: First in first out list(Java 5) FIFO队列

A Java collection is like a container that can "throw" multiple objects (actually references to objects, but they are customarily called objects) into the container. After the addition of generics in Java 5, the Java collection can remember the data types of objects in the container, making the encoding more concise and robust.

### Collection v.s. Array
1. Length: Array is a fixed length basic data type, and Collection is a dynamic class instance.
2. Data type: Array can be used for both basic type and instance, but Collection is only used for instance. 

### Inheritance relationship

Java's collection classes are mainly derived from two interfaces. 

- **Collection Interface**

![collection-inheritance](https://pics.yujieliu.com/blog/2023/10/81368654af90ecf3bab1da679082ac0f.png)

- **Map Interface**

Every element in the implementation of Map is a **key-value** pair, which the key is unrepetable and identify the data.

![map-interface](https://pics.yujieliu.com/blog/2023/10/a5988f11f5ea5b454b1254bd213c6a51.png)

## 2. Collection Interface

The function definitions can refer to [here](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html).

#### Use Iterator to iterate the collection

Collection Interface is inherent from Iterator Interface, and Iterator Interface defines two function

- `hasNext()`: if the collection has the next element, return `true`
- `next()`: return the **value** of the next element

```java
public class IteratorExample {
    public static void main(String[] args){
        //Create the collection
        Collection<Day> days = new ArrayList<Day>();
        for(int i =0;i<10;i++){
            Day day = new Day(i,i*60,i*3600);
            days.add(day);
        }
        
      	//Get the iterator
        Iterator<Day> iterator = days.iterator();
      	
      	//Iterate the collection
        while(iterator.hasNext()){// Check if the collection has the next element
            Day next = iterator.next();//Get the element
            .....
        }
    }
}
```

**Note:** The iterator **returns the value instead of the reference** to the caller, so changing the value of the interacting variable will NOT change the corresponding element of the collection.

**注意：**当使用Iterator对集合元素进行迭代时，Iterator并不是把集合元素本身传给了迭代变量，而是把集合元素的**值**传给了迭代变量（就如同参数传递是值传递，基本数据类型传递的是值，引用类型传递的仅仅是对象的引用变量），所以修改迭代变量的值对集合元素本身没有任何影响。

```java
public class IteratorExample {
    public static void main(String[] args){
        List<String> list =Arrays.asList("Java","C","C++");
        Iterator<String> iterator = list.iterator();
        while(iterator.hasNext()){
            String next = iterator.next();
            next ="Python"; // Will NOT change the element of the collection
            System.out.println(next);//Python, Python, Python
        }
        System.out.println(list);//Java, C, C++
    }

}
```



### 2.1. Set Interface

No extra method definitions are added to `Set` Interface.

The `add()` will return `false` when trying to add a repeated element into a set.

### 2.2. List Interface

#### New methods: CRUD to specific position

| Modifier and Type | Method                              | Description                                                  |
| ----------------- | ----------------------------------- | ------------------------------------------------------------ |
| void              | add(int index, Object element)      | Add an element at the specific position                      |
| Object            | get(int index)                      | Get the element at the specific position                     |
| int               | indexOf(Object o)                   | Get the first position of the element                        |
| int               | lastIndexOf(Object o)               | Get the last position of the element                         |
| Object            | remove(int index)                   | Remove the element at the specific position                  |
| Object            | set(int index, Object element)      | Replace the element at the specific position with the new element |
| List              | subList(int fromIndex, int toIndex) | Return the sublist from `fromIndex` (included) to `toIndex` (not included) |
| void              | replaceAll(UnaryOperator operator)  | (Java 8) Operator the list with the defined rules from operator |
| void              | sort(Comparator c)                  | (Java 8) Compare the elements using the comparator           |



### 2.3. Queue Interface

FIFO container, using `offer()` to insert an element to the last and using `poll()` to get the first element

#### New methods: peek and poll

| Modifier and Type | Method          | Description                                |
| ----------------- | --------------- | ------------------------------------------ |
| boolean           | offer(Object o) | Insert an element to the last of the queue |
| Object            | peek()          | Get but NOT remove the first element       |
| Object            | poll()          | Get and remove the first element           |



## 3. Map Interface

The function definitions can refer to [here](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html).

### Typical functions

| Modifier and Type | Method                  | Description                                                  |
| ----------------- | ----------------------- | ------------------------------------------------------------ |
| V                 | put(K key, V value)     | Associates the value with the key                            |
| V                 | get(Object key)         | Returns the value to which the key is mapped                 |
| V                 | Remove(Object key)      | Removes the mapping for the key                              |
| default V         | Replace(K key, V value) | Replaces the value for the key only if it existed.           |
| Set\<K\>          | keySet()                | Returns all the keys                                         |
| boolean           | containsKey(Object key) | Returns `true` if this map contains a mapping for the specified key. |



## 4. Set Implementation

### 4.1. HashSet

#### Features

- Do NOT preserve the insertion order
- NOT Thread-safe
- Nullable
- Using `equals()` and `hashCode()` to identify a object

#### Equals() and hashCode()

- `equals()`
  - If the class does NOT have an override `equals()` function, then we compare the two addresses of the objects are the same or not. Equivalent to `==`
  - If the class override the `equals()` function, then we use this function.
- `hashCode()`: an `int` to locate the index of the object in the hash table
  - If the class does NOT have an override `hashCode` function, then we compare the two addresses of the objects are the same or not. Equivalent to `==`
  - If the class override the `hashCode()` function, then we use this function.

| Two objects            | Same equal results         | Different equal results                                      |
| ---------------------- | -------------------------- | ------------------------------------------------------------ |
| **Same hashCode**      | Not allowed to put         | Save in the same position using a linked list (slow down the perf) |
| **Different hashCode** | Save in different position | Save in different position                                   |

#### LinkedHashSet

The elements in a linkedHashSet is storage in **sequence** so it will have lower performance in insertion but better iteration performance.



### 4.2. TreeSet

TreeSet is the implementation of `SortedSet` Interface, and it can make sure that all the elements in the set is sorted.

- NOT thread-safe

#### New methods

- comparator():返回对此 set 中的元素进行排序的比较器；如果此 set 使用其元素的自然顺序，则返回null。
- first():返回此 set 中当前第一个（最低）元素。
- last(): 返回此 set 中当前最后一个（最高）元素。
- lower(E e):返回此 set 中严格小于给定元素的最大元素；如果不存在这样的元素，则返回 null。
- higher(E e):返回此 set 中严格大于给定元素的最小元素；如果不存在这样的元素，则返回 null。
- subSet(E fromElement, E toElement):返回此 set 的部分视图，其元素从 fromElement（包括）到 toElement（不包括）。
- headSet(E toElement):返回此 set 的部分视图，其元素小于toElement。
- tailSet(E fromElement):返回此 set 的部分视图，其元素大于等于 fromElement。

#### Sorting and Comparable interface

The interface defines a `compareTo(Object obj)`method which any class can override this method to make a comparison between two instances. For example, if `obj1.compareTo(obj2)` return 0, it means two objects are equal; if it returns a positive number, it means the `obj1` is bigger than `obj2`.

The element of a treeSet **needs to have** a defined `compareTo()` method, and the treeSet will use this method to sort the elements. Default is ascending. (升序，从小到大)

We can also pass a comparator when initialising the treeSet. For example:

```java
public static void main(String[] args){
        Person p1 = new Person();
        p1.age =20;
        Person p2 =new Person();
        p2.age = 30;
        Comparator<Person> comparator = new Comparator<Person>(){

            @Override
            public int compare(Person o1, Person o2) {
                //decending age 年龄越小越靠后
                if(o1.age<o2.age){
                    return 1;
                }else if(o1.age>o2.age){
                    return -1;
                }else{
                    return 0;
                }
                
            }
        };
        TreeSet<Person> set = new TreeSet<Person>(comparator);
        set.add(p1);
        set.add(p2);
        System.out.println(set);
}

//Result: [Person[age=30], Person[age=20]]
```

**Note: Changing an inserted element will NOT change the position of the element. So it is a best practice that do not change the value after insertion**



### 4.3. EnumSet

EnumSet is designed for enum type. All the elements in a enumSet must be a value of the same enum type. The elements in a enumSet is also sorted by the definition order in the enum class.

- Non-Null
- NOT Thread-safe



### 4.4 Performance comparison

**EnumSet>HashSet>LinkedHashSet>TreeSet**

#### Usage Recommandation

- TreeSet: Need a sorted set 当需要一个特定排序的集合时
- ENumSet: Need to save enum values 当需要保存枚举类的枚举值时
- HashSet: More insertion and query ops: 当经常使用添加、查询操作时
- LinkedHashSet: Insertion sorting or more deletion and iteration 当经常插入排序或使用删除、插入及遍历操作时。



## 5. List Implementation

### 5.1 ArrayList and Vector

#### Initialisation and dynamic scaling

ArrayList initialisation (JDK 1.8):

```java
//动态Object数组，用来保存加入到ArrayList的元素
Object[] elementData;

//ArrayList的构造函数，传入参数为数组大小
public ArrayList(int initialCapacity) {
   if (initialCapacity > 0) {
        //创建一个对应大小的数组对象
       this.elementData = new Object[initialCapacity];
   } else if (initialCapacity == 0) {
       //传入数字为0，将elementData 指定为一个静态类型的空数组
       this.elementData = EMPTY_ELEMENTDATA;
   } else {
       throw new IllegalArgumentException(...);
   }
}

//不指定初始大小，为10
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
```

When adding an element into an arrayList: the `ensureCapacityInternal` is called to make sure that there are enough space for it. If not enough, it will copy the old and allocate a new array with enough space

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // 数组的大小增加1
    elementData[size++] = e;
    return true;
}

private void grow(int minCapacity) {
    //生成大小合适的newCapacity
  	...
    //下面这行就是进行了数组扩容
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

Two methods can be used to change the size of an arrayList:

- **void ensureCapacity(int minCapacity):** 如有必要，增加此 ArrayList 实例的容量，以确保它至少能够容纳最小容量参数所指定的元素数。
- **void trimToSize():** 将此 ArrayList 实例的容量调整为列表的当前大小。

#### Difference between ArrayList and Vector

1. ArrayList is **NOT thread-safe**，Vector is **thread-safe**.
2. The performance of Vector is lower.

#### Iteration

1. Iterator

```java
Integer value = null;
Iterator iter = list.iterator();
while (iter.hasNext()) {
    value = (Integer)iter.next();
}
```

2. Random access: ArrayList implement the RandomAccess Interface

```java
Integer value = null;
int size = list.size();
for (int i=0; i<size; i++) {
    value = (Integer)list.get(i);        
}
```

3. For-each loop

```java
Integer value = null;
for (Integer integ:list) {
    value = integ;
}
```

**Performance: Random access > For-each loop > Iterator**



### 5.2 Stack

Stack is a subclass of Vector

- Peek(): check the top element without removing it
- Pop(): check and remove the top element 
- Push(): add an element to the top of the stack

The performance of Stack is low so it is recommend to use LinkedList to implement stack.



### 5.3 LinkedList

- Lower random access performance, higher insertion & deletion performance
- Implemented `Deque` interface, can be used to implement **stack and queue**.
- NOT Thread-safe



#### New methods: xxxFirst() and xxxLast()

- **void addFirst(E e):**将指定元素插入此列表的开头。
- **void addLast(E e):** 将指定元素添加到此列表的结尾。
- **E getFirst(E e):** 返回此列表的第一个元素。
- **E getLast(E e):** 返回此列表的最后一个元素。
- **boolean offerFirst(E e):** 在此列表的开头插入指定的元素。
- **boolean offerLast(E e):** 在此列表末尾插入指定的元素。
- **E peekFirst(E e):** 获取但不移除此列表的第一个元素；如果此列表为空，则返回 null。
- **E peekLast(E e):** 获取但不移除此列表的最后一个元素；如果此列表为空，则返回 null。
- **E pollFirst(E e):** 获取并移除此列表的第一个元素；如果此列表为空，则返回 null。
- **E pollLast(E e):** 获取并移除此列表的最后一个元素；如果此列表为空，则返回 null。
- **E removeFirst(E e):** 移除并返回此列表的第一个元素。
- **E removeLast(E e):** 移除并返回此列表的最后一个元素。
- **boolean removeFirstOccurrence(Objcet o):** 从此列表中移除第一次出现的指定元素（从头部到尾部遍历列表时）。
- **boolean removeLastOccurrence(Objcet o):** 从此列表中移除最后一次出现的指定元素（从头部到尾部遍历列表时）。



#### Source code

```java
//成员变量：表头，表尾
transient Node<E> first;
transient Node<E> last;

//默认构造函数，表示创建一个空链表
public LinkedList() { }

private static class Node<E> {
    //表示集合元素的值
    E item;
    
   	//指向下个元素
    Node<E> next;
    
 		//指向上个元素
    Node<E> prev;
}

//Add ellement to the last
void linkLast(E e) {
    final Node<E> l = last;
    final Node<E> newNode = new Node<>(l, e, null);
    last = newNode;
    if (l == null)
        first = newNode;
    else
        l.next = newNode;
    size++;
    modCount++;
}

//Get element
public E get(int index) {
    checkElementIndex(index);//检查索引是否有效
    return node(index).item;
}

//Compare the index with 1/2 position
//If smaller, starting interation from head
//If bigger, starting from tail
Node<E> node(int index) {
    // assert isElementIndex(index);

    if (index < (size >> 1)) {
        Node<E> x = first;
        for (int i = 0; i < index; i++)
            x = x.next;
        return x;
    } else {
        Node<E> x = last;
        for (int i = size - 1; i > index; i--)
            x = x.prev;
        return x;
    }
}
```

### 5.4 Performance comparison

- ArrayList: Better iteration and random access performance
- LinkedList: Better insertion and deletion performance
- Need thread-safe: vector 



## 6. Queue

- FIFO, using *offer* to insert to the last and using *poll* to get the head 
- typically no random access

### 6.1 PriorityQueue

- The data in this queue are sorted using a **comparator**
- When using `peek()` or `poll()` to get the first elements, it will return the **prioritised element** instead our the first-in element.
- NOT Thread-safe, non-null

#### Sorting methods

- **Natural sorting** (the element type should implement `Comparable` interface)
- Or we can assign a **Comparator**

```java
PriorityQueue<Integer> qi = new PriorityQueue<Integer>();
     qi.add(5);
     qi.add(2);
     qi.add(1);
     qi.add(10);
     qi.add(3);
     while (!qi.isEmpty()){
       System.out.print(qi.poll() + ",");
     }
     System.out.println();
     //DESC
     Comparator<Integer> cmp = new Comparator<Integer>() {
       public int compare(Integer e1, Integer e2) {
         return e2 - e1;
       }
     };
     PriorityQueue<Integer> q2 = new PriorityQueue<Integer>(5,cmp);
     q2.add(2);
     q2.add(8);
     q2.add(9);
     q2.add(1);
     while (!q2.isEmpty()){
           System.out.print(q2.poll() + ",");
         }
```

#### Source code

- It is a dynamic array, the same as the `ArrayList`

```java
public PriorityQueue() {
    this(DEFAULT_INITIAL_CAPACITY, null);
}

public PriorityQueue(int initialCapacity) {
    this(initialCapacity, null);
}

public PriorityQueue(int initialCapacity,
                         Comparator<? super E> comparator) {
    // Note: This restriction of at least one is not actually needed,
    // but continues for 1.5 compatibility
    if (initialCapacity < 1)
        throw new IllegalArgumentException();
    this.queue = new Object[initialCapacity];
    this.comparator = comparator;
}

public boolean offer(E e) {
    if (e == null)
        throw new NullPointerException();
    modCount++;
    int i = size;
    if (i >= queue.length)
        grow(i + 1);//Extend the array if necessary
    size = i + 1;
    if (i == 0)
        queue[0] = e;
    else
        siftUp(i, e);
    return true;
}
```



### 6.2 Deque Interface and ArrayDeque Implementation

- The `LinkedList` also implement the `Deque` Interface
- Not Thread-safe, non-null
- Can be used for both Stack and Queue

​	![img](https://pics.yujieliu.com/blog/2023/10/0946f20c966a9f24055d633b59828fb8.)

​	![img](https://pics.yujieliu.com/blog/2023/10/6909f90ca3f467620696f0b36d62c363.)

#### ArrayDeque sourcecode

- An **circular array** with 16 size by default and can be dynamic scaling

Two variables, the `head` and the `tail`

```java
transient int head;
transient int tail;
```

Both `head` and `tail` are initialized to 0 index.

When adding to the front, `head--` and insert; when adding to the end, `tail++` and insert. Because this is a circular array, the head will point to the end of the array when insertion.

The following figure shows that 4 elements are inserted to the head, and 2 to the tail.

![img](https://pics.yujieliu.com/blog/2023/10/21f20ac15d923a5d3c3233da9b9c060f.)

```java
public void addFirst(E e) {
    if (e == null)
        throw new NullPointerException();
    elements[head = (head - 1) & (elements.length - 1)] = e;
    if (head == tail)
        doubleCapacity();
}
```

The `head = (head - 1) & (elements.length - 1)` makes sure that the index will not be negative.

When the `head==tail`, the array will be scaled dynamically to `2*size`.

- Allocate a double size array
- Then, copy the right part of the head (green part in the figure)
- Finally, copy the left part of the head (grey part)

![img](https://pics.yujieliu.com/blog/2023/10/e1292aa2cdfb1e5cfb08e10d700c9654.)

```java
private void doubleCapacity() {
    assert head == tail;
    int p = head;
    int n = elements.length;
    int r = n - p; // num of elements of right head
    int newCapacity = n << 1;//原空间的2倍
    if (newCapacity < 0)
        throw new IllegalStateException("Sorry, deque too big");
    Object[] a = new Object[newCapacity];
    System.arraycopy(elements, p, a, 0, r);//Copy the right part
    System.arraycopy(elements, 0, a, r, p);//Copy the left part
    elements = (E[])a;
    head = 0;
    tail = n;
}
```



## 7. Map

### 7.1 HashMap

HashMap 是一个散列表，它存储的内容是键值对(key-value) 映射(mapping)。

HashMap和Hashtable都是Map接口的经典实现类，它们之间的关系完全类似于ArrayList和Vector的关系。由于Hashtable是个古老的Map实现类，需要方法比较繁琐，不符合Map接口的规范。

#### HashMap and Hashtable

1.Hashtable是一个线程安全的Map实现，但HashMap是线程不安全的实现，所以HashMap比Hashtable的性能好一些；但如果有多个线程访问同一个Map对象时，是盗用Hashtable实现类会更好。

2.Hashtable不允许使用null作为key和value，如果试图把null值放进Hashtable中，将会引发NullPointerException异常；但是HashMap可以使用null作为key或value。



#### Recognise keys and values are equal or not

**key判断相等的标准**

类似于HashSet，HashMap与Hashtable判断两个key相等的标准是：两个key通过equals()方法比较返回true,两个key的hashCode值也相等，则认为两个key是相等的。

**注意：用作key的对象必须实现了hashCode()方法和equals()方法。并且最好两者返回的结果一致，即如果equals()返回true，hashCode()值相等。**

**另：**如果是加入HashMap的key是个可变对象，在加入到集合后又修改key的成员变量的值，可能导致hashCode()值以及equal()的比较结果发生变化，无法访问到该key。一般情况下不要修改。



**value判断相等的标准**

HashMap与Hashtable判断两个value相等的标准是：只要两个对象通过equals()方法比较返回true即可。

**注意：**HashMap中key所组成的集合元素不能重复，value所组成的集合元素可以重复。



#### Source code

```java
// 默认构造函数。
HashMap()

// 指定“容量大小”的构造函数
HashMap(int capacity)

// 指定“容量大小”和“加载因子”的构造函数
HashMap(int capacity, float loadFactor)

// 包含“子Map”的构造函数
HashMap(Map<? extends K, ? extends V> map)
```

- 容量 (capacity) 是哈希表的容量，初始容量是哈希表在创建时的容量（即`DEFAULT_INITIAL_CAPACITY = 1 << 4`）。
- 加载因子 (loadFactor) 是哈希表在其容量自动增加之前可以达到多满的一种尺度。当哈希表中的条目数超出了加载因子与当前容量的乘积时，则要对该哈希表进行 resize操作（即重建内部数据结构），从而将哈希表扩容至原来的两倍。通常，默认加载因子是 0.75(即`DEFAULT_LOAD_FACTOR = 0.75f`), 这是在时间和空间成本上寻求一种折衷。加载因子过高虽然减少了空间开销，但同时也增加了查询成本（在大多数 HashMap 类的操作中，包括 get 和 put 操作，都反映了这一点）。在设置容量时应该考虑到映射中所需的条目数及其加载因子，以便最大限度地减少 resize操作次数。如果容量大于最大条目数除以加载因子，则不会发生 rehash 操作。



#### Node

一般实现哈希表的方法采用“拉链法”，我们可以理解为“链表的数组”。如果hash(key)值相等，则都存入该hash值所对应的链表中。**所以每个数组元素代表一个链表，其中的共同点就是hash(key)相等。**

![img](https://pics.yujieliu.com/blog/2023/11/d284202c0a7e10626ea745811a1fec5c.)



#### Iteration

1.遍历HashMap的键值对

第一步：根据entrySet()获取HashMap的“键值对”的Set集合。
第二步：通过Iterator迭代器遍历“第一步”得到的集合。

2.遍历HashMap的键

第一步：根据keySet()获取HashMap的“键”的Set集合。
第二步：通过Iterator迭代器遍历“第一步”得到的集合。

3.遍历HashMap的值

第一步：根据value()获取HashMap的“值”的集合。
第二步：通过Iterator迭代器遍历“第一步”得到的集合。



### 7.2 LinkedHashMap

HashSet有一个LinkedHashSet子类，HashMap也有一个LinkedHashMap子类；LinkedHashMap使用双向链表来维护key-value对的次序。

LinkedHashMap需要维护元素的插入顺序，因此性能略低于HashMap的性能；但是因为它以链表来维护内部顺序，所以在迭代访问**Map里的全部元素时有较好的性能**。迭代输出LinkedHashMap的元素时，将会按照添加key-value对的顺序输出。

**本质上来讲，LinkedHashMap=散列表+循环双向链表**



### 7.3 TreeMap

reeMap是SortedMap接口的实现类。TreeMap 是一个**有序的key-value集合**，它是通过红黑树实现的，每个key-value对即作为红黑树的一个节点。

#### TreeMap sorting methods

TreeMap有两种排序方式，和TreeSet一样。

自然排序：TreeMap的所有key必须实现Comparable接口，而且所有的key应该是同一个类的对象，否则会抛出ClassCastException异常。

定制排序：创建TreeMap时，传入一个Comparator对象，该对象负责对TreeMap中的所有key进行排序。



#### Recognise keys and values are equal or not

类似于TreeSet中判断两个元素相等的标准，TreeMap中判断两个key相等的标准是：两个key通过compareTo()方法返回0，TreeMap即认为这两个key是相等的。

TreeMap中判断两个value相等的标准是：两个value通过equals()方法比较返回true。

**注意：**如果使用自定义类作为TreeMap的key，且想让TreeMap良好地工作，则重写该类的equals()方法和compareTo()方法时应保持一致的返回结果：两个key通过equals()方法比较返回true时，它们通过compareTo()方法比较应该返回0。如果两个方法的返回结果不一致，TreeMap与Map接口的规则就会冲突。

除此之外，与TreeSet类似，TreeMap根据排序特性，也添加了一部分新的方法，与TreeSet中的一致。



#### Nature of TreeMap — R-B Tree

R-B Tree，全称是Red-Black Tree，又称为“红黑树”，它一种特殊的二叉查找树。红黑树的每个节点上都有存储位表示节点的颜色，可以是红(Red)或黑(Black)。

红黑树的特性:
（1）每个节点或者是黑色，或者是红色。
（2）根节点是黑色。
（3）每个叶子节点（NIL）是黑色。 [注意：这里叶子节点，是指为空(NIL或NULL)的叶子节点！]
（4）如果一个节点是红色的，则它的子节点必须是黑色的。
（5）从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点。

注意：
(01) 特性(3)中的叶子节点，是只为空(NIL或null)的节点。
(02) 特性(5)，确保没有一条路径会比其他路径长出俩倍。因而，红黑树是相对是接近平衡的二叉树。

![img](https://pics.yujieliu.com/blog/2023/11/c3ec71124d533fdf0953e4ebfa5e18e4.)



#### TreeMap Iteration

遍历TreeMap的键值对

第一步：根据entrySet()获取TreeMap的“键值对”的Set集合。
第二步：通过Iterator迭代器遍历“第一步”得到的集合。

遍历TreeMap的键

第一步：根据keySet()获取TreeMap的“键”的Set集合。
第二步：通过Iterator迭代器遍历“第一步”得到的集合。

遍历TreeMap的值

第一步：根据value()获取TreeMap的“值”的集合。
第二步：通过Iterator迭代器遍历“第一步”得到的集合。



### 7.4 Benchmark

HashMap与Hashtable实现机制几乎一样，但是HashMap比Hashtable性能更好些。

LinkedHashMap比HashMap慢一点，因为它需要维护一个双向链表。

TreeMap比HashMap与Hashtable慢（尤其在插入、删除key-value时更慢），因为TreeMap底层采用红黑树来管理键值对。

**适用场景：**

- 一般的应用场景，尽可能多考虑使用HashMap，因为其为快速查询设计的。
- 如果需要特定的排序时，考虑使用TreeMap。
- 如果仅仅需要插入的顺序时，考虑使用LinkedHashMap。
