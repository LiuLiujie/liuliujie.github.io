# HashMap详解

## 1.7与1.8的数据结构



## Put过程

### 主要流程

1. 计算哈希值

2. 根据取模运算，获取对应的桶的位置

3. 插入值到桶中，需要考虑哈希冲突

   - 如果桶为空，直接插入

   - 如果桶不为空，则检查桶对应的链表或红黑树是否有相同key，若相同则替换value，否则插入新node。如果是插入链表，插入完成后检查是否需要树化（默认8）。

4. 检查是否需要扩容（默认16）

