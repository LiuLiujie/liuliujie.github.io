---
category: Computer Science
tag:
- Backend
- Java
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

