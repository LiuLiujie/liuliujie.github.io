---
category:
- Computer Science
- DevOps
- Data Storage

tag: 
- SQL
- MySQL
---



# MySQL



### [Window functions](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html)

A window function performs an aggregate-like operation on a set of query rows. However, whereas an aggregate operation groups query rows into a single result row, a window function produces a result for each query row:

- The row for which function evaluation occurs is called the current row.
- The query rows related to the current row over which function evaluation occurs comprise the window for the current row.

与聚合函数不同，聚合函数在所有查询后返回一个结果，窗口函数为每个查询创建一个结果。

Exercises
- [rank-scores](./sql-exercises.md#t178-rank-scores) (`DENCE_RANK()` function)

