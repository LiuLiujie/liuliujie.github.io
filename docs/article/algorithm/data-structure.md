---
category: Computer Science
tag:
- Algorithms
- Data Structure
---

# Data Structure Basic

## The storage of data

There are only two ways to storage the data, the ***Array*** and the ***Linked list***. All the other data structures are developed based on them.

Arrays, due to their compact and contiguous storage, allow for random access, enabling quick retrieval of elements by index. Moreover, they are relatively space-efficient. However, because of their contiguous storage, memory space must be allocated all at once. This means that if you want to expand an array, you need to reallocate a larger block of memory and copy all the data to it, resulting in a time complexity of O(N). Additionally, if you want to insert or delete elements in the middle of an array, you must shift all the data behind it to maintain continuity, also resulting in a time complexity of O(N).

数组由于是紧凑连续存储,可以随机访问，通过索引快速找到对应元素，而且相对节约存储空间。但正因为连续存储，内存空间必须一次性分配够，所以说数组如果要扩容，需要重新分配一块更大的空间，再把数据全部复制过去，时间复杂度 O(N)；而且你如果想在数组中间进行插入和删除，每次必须搬移后面的所有数据以保持连续，时间复杂度 O(N)。

Linked lists, on the other hand, do not suffer from array's resizing issue. Since elements are not stored contiguously but are instead connected by pointers to the next element, there's no need for resizing. If you know the predecessor and successor of a specific element, you can manipulate the pointers to delete or insert a new element, resulting in a time complexity of O(1). However, because the storage space is not contiguous, you cannot calculate the address of a specific element based on its index, making random access impossible. Additionally, because each element must store pointers to its previous and next elements, it consumes relatively more storage space.

链表因为元素不连续，而是靠指针指向下一个元素的位置，所以不存在数组的扩容问题；如果知道某一元素的前驱和后驱，操作指针即可删除该元素或者插入新元素，时间复杂度 O(1)。但是正因为存储空间不连续，你无法根据一个索引算出对应元素的地址，所以不能随机访问；而且由于每个元素必须存储指向前后元素位置的指针，会消耗相对更多的储存空间。



|                      | Array                                         | Linked list                     |
| -------------------- | --------------------------------------------- | ------------------------------- |
| Storage              | Sequence                                      | Discrete                        |
| Locating             | Index                                         | Pointer point to next node      |
| Expansion            | Create a new array and then copy              | Directly create new nodes       |
| Iterating            | Allow random access                           | Don't allow random access       |
| Insertion & deletion | Need to move all the following elements, O(n) | Directly insert or remove, O(1) |

## Data Access

There are two types of accession to the date structure, **Linear** and **Nonlinear**.

- Linear: for/while loop, iteration
- Nonlinear: recursion

1. Traverse the **array** using linear way: for/while loop

```java
void traverse(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        // access arr[i]
    }
}
```

2. Traverse the **linked list** with both linear and nonlinear ways:

```java
class ListNode {
    int val;
    ListNode next;
}

void traverse(ListNode head) {
		// Iterate the linked list, linear
    for (ListNode p = head; p != null; p = p.next) {
        // access val
    }
}

void traverse(ListNode head) {
    // Recursive the linked list, non-linear
    traverse(head.next);
}

```

3. **Binary tree**: non-linear recursion

```java
class TreeNode {
    int val;
    TreeNode left, right;
}

void traverse(TreeNode root) {
  	//Pre-order
    traverse(root.left);
  	//In-order
    traverse(root.right);
  	//Post-order
}
```

Which can be expanded to **N-tree**

```java
class TreeNode {
    int val;
    TreeNode[] children;
}

void traverse(TreeNode root) {
    for (TreeNode child : root.children)
        traverse(child);
}
```

Which can also be expanded  to **graph**.

