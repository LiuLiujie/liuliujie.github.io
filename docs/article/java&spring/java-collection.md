---
category: Computer Science
tag:
- Backend
- Java
---

# Java Collection

## Introduction 
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

## Collection Interface

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



### Set Interface

No extra method definitions are added to `Set` Interface.

The `add()` will return `false` when trying to add a repeated element into a set.

### List Interface

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



### Queue Interface

FIFO container, using `offer()` to insert an element to the last and using `poll()` to get the first element

#### New methods: peek and poll

| Modifier and Type | Method          | Description                                |
| ----------------- | --------------- | ------------------------------------------ |
| boolean           | offer(Object o) | Insert an element to the last of the queue |
| Object            | peek()          | Get but NOT remove the first element       |
| Object            | poll()          | Get and remove the first element           |



## Map Interface

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



