---
category:
- Computer Science
- Database

tag: 
- MySQL
---



# SQL Exercises

## T177 [Nth Highest Salary](https://leetcode.cn/problems/nth-highest-salary/)

Table: `Employee`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key (column with unique values) for this table.
Each row of this table contains information about the salary of an employee.
```

Write a solution to find the `nth` highest salary from the `Employee` table. If there is no `nth` highest salary, return `null`.

The result format is in the following example.



**Example 1:**

```
Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
n = 2
Output: 
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| 200                    |
+------------------------+
```

**Example 2:**

```
Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
n = 2
Output: 
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| null                   |
+------------------------+
```



### Solution

- DISTINCT is necessary to make sure that if there is the same salary

```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
DECLARE M INT; 
    SET M = N-1;
  RETURN (
      # Write your MySQL query statement below.
        SELECT DISTINCT salary
        FROM Employee
        ORDER BY salary DESC
        LIMIT 1
        OFFSET M
  );
END
```





## T178. [Rank Scores](https://leetcode.cn/problems/rank-scores/)

Table: `Scores`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| score       | decimal |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table contains the score of a game. Score is a floating point value with two decimal places.
```

Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:

- The scores should be ranked from the highest to the lowest.
- If there is a tie between two scores, both should have the same ranking.
- After a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no holes between ranks.

Return the result table ordered by `score` in descending order.

The result format is in the following example.

 

**Example 1:**

```
Input: 
Scores table:
+----+-------+
| id | score |
+----+-------+
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |
+----+-------+
Output: 
+-------+------+
| score | rank |
+-------+------+
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |
+-------+------+
```

### Solution

Using `COUNT(DISTINCT s2.score)` to calculate how many records are there bigger than `s1.score`

```sql
SELECT s1.score,
(
        SELECT COUNT(DISTINCT s2.score)
        FROM Scores s2
        WHERE s2.score >= s1.score
) AS 'rank'
FROM Scores s1
ORDER BY s1.score DESC
```

Another way is to use [window functions](mysql-functions.md#Window-functions-窗口函数)

`DENSE_RANK()`返回当前行在其分区中的排名，没有间隙。对等项被视为并列并获得相同的排名。此函数为对等组分配连续的排名；结果是大于一的组不产生不连续的排名号码。

```sql
SELECT
  S.score,
  DENSE_RANK() OVER (
    ORDER BY
      S.score DESC
  ) AS 'rank'
FROM
  Scores S;
```

