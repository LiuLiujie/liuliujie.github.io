---
category:
- Computer Science
- Database

tag: 
- MySQL
---



# SQL Basic

## 1. CRUD

### SELECT

```sql
SELECT CustomerName, City FROM Customers;
SELECT * FROM Customers;
```

#### SELECT DISTINCT

The `SELECT DISTINCT` statement is used to return only distinct (different) values. (只返回不同的值)

```sql
SELECT DISTINCT Country FROM Customers;
SELECT COUNT(DISTINCT Country) FROM Customers;
```
Exercises
- [nth-highest-salary](sql-exercises.md#t177-nth-highest-salary)
- [rank-scores](./sql-exercises.md#t178-rank-scores)


#### LIMIT

Select the first 3 records of the Customers table:

```sql
SELECT * FROM Customers
LIMIT 3;
```

```sql
#SQL Server
SELECT TOP 3 * FROM Customers;

#Oracle
SELECT * FROM Customers
FETCH FIRST 3 ROWS ONLY;
```



#### OFFSET

Specify the starting row for retrieving data.

This is the number of rows to skip before starting the data retrieval.

```sql
SELECT column_list FROM table_name
WHERE condition
LIMIT number
OFFSET offset_value;
```

The LIMIT and OFFSET can be used together

- `m`: start from m (index starts from 0)
- `n`: n rows of data

```sql
SELECT column_list FROM table_name
WHERE condition
LIMIT m, n
```

注意：`LIMIT 1, 5`指的是返回2-6行

#### AS

Use a alias name instead of the column name

```sql
SELECT CustomerName AS Name
FROM Customers;

#With a Space Character
SELECT ProductName AS "My Great Products"
#SELECT ProductName AS [My Great Products]
FROM Products;

#Concatenate Columns
SELECT CustomerName, CONCAT(Address,', ',PostalCode,', ',City,', ',Country) AS Address
FROM Customers;
```

Alias for tables

```sql
SELECT o.OrderID, o.OrderDate, c.CustomerName
FROM Customers AS c, Orders AS o
WHERE c.CustomerName='Around the Horn' AND c.CustomerID=o.CustomerID;
```



### WHERE

```sql
SELECT * FROM Customers
WHERE Country='Mexico';
#WHERE CustomerID = 1;
#WHERE CustomerID > 80;
#WHERE CustomerID BETWEEN 50 AND 60;
#WHERE City LIKE 's%';
#WHERE City IN ('Paris','London');
```

**Text Fields vs. Numeric Fields**

SQL requires single quotes around text values (most database systems will also allow double quotes). 字符串要用单引号括起来，大多数数据库也支持双引号



#### LIKE

The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column.

If no wildcard is specified, the phrase has to have an exact match to return a result.

There are two wildcards often used in conjunction with the `LIKE` operator:

-  The percent sign `%` represents zero, one, or multiple characters
-  The underscore sign `_` represents one, single character

```sql
#Select all customers that starts with the letter "a":
SELECT * FROM Customers
WHERE CustomerName LIKE 'a%';

#Return all customers from a city that contains the letter 'L':
SELECT * FROM Customers
WHERE city LIKE '%L%';

#Return all customers that ends with 'a':
SELECT * FROM Customers
WHERE CustomerName LIKE '%a';

#Return all customers that starts with "b" and ends with "s":
SELECT * FROM Customers
WHERE CustomerName LIKE 'b%s';

#Return all customers from a city that starts with 'L' followed by one wildcard character, then 'nd' and then two wildcard characters:
SELECT * FROM Customers
WHERE city LIKE 'L_nd__';
```

More wildcard characters can be found later.



#### AND, OR, and NOT

The `WHERE` clause can contain one or many `AND` and `OR` operators.

These operators are used to filter records based on more than one conditions.

The `AND` operator displays a record if *all* the conditions are TRUE.

The `OR` operator displays a record if *any* of the conditions are TRUE.

The `NOT` operator is used in combination with other operators to give the opposite result, also called the negative result.

```sql
SELECT *
FROM Customers
WHERE Country = 'Spain' AND CustomerName LIKE 'G%';
#WHERE Country = 'Spain' AND (CustomerName LIKE 'G%' OR CustomerName LIKE 'R%');
#WHERE NOT Country = 'Spain';
#WHERE CustomerName NOT LIKE 'A%';
#WHERE CustomerID NOT BETWEEN 10 AND 60;
```



#### IN and BETWEEN

The `IN` operator allows you to specify multiple values in a `WHERE` clause.

```sql
SELECT * FROM Customers
WHERE Country IN ('Germany', 'France', 'UK');

SELECT * FROM Customers
WHERE CustomerID IN (SELECT CustomerID FROM Orders);
```

The `BETWEEN` operator selects values within a given range. The values can be numbers, text, or dates.

The `BETWEEN` operator is inclusive: begin and end values are included. 

```sql
SELECT * FROM Products
WHERE Price BETWEEN 10 AND 20;
#AND CategoryID IN (1,2,3);

#The following SQL statement selects all records with a ProductName alphabetically between Carnarvon Tigers and Mozzarella di Giovanni:
SELECT * FROM Products
WHERE ProductName BETWEEN 'Carnarvon Tigers' AND 'Mozzarella di Giovanni'
ORDER BY ProductName;

#BETWEEN Dates
SELECT * FROM Orders
WHERE OrderDate BETWEEN '1996-07-01' AND '1996-07-31';
```



#### NULL

It is not possible to test for NULL values with comparison operators, such as =, <, or <>.

We will have to use the `IS NULL` and `IS NOT NULL` operators instead.

```sql
SELECT column_names
FROM table_name
WHERE column_name IS NOT NULL;
```



#### EXIST

The `EXISTS` operator is used to test for the existence of any record in a subquery.

The `EXISTS` operator returns TRUE if the subquery returns one or more records.

```sql
#returns TRUE and lists the suppliers with a product price less than 20
SELECT SupplierName
FROM Suppliers
WHERE EXISTS (SELECT ProductName FROM Products WHERE Products.SupplierID = Suppliers.supplierID AND Price < 20);
```



#### ANY and ALL

The `ANY` operator:

- returns a boolean value as a result
- returns TRUE if ANY of the subquery values meet the condition

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name operator ANY
  (SELECT column_name
  FROM table_name
  WHERE condition);
```

The `ALL` operator:

- returns a boolean value as a result
- returns TRUE if ALL of the subquery values meet the condition
- is used with `SELECT`, `WHERE` and `HAVING` statements

```sql
#With SELECT
SELECT ALL column_name(s)
FROM table_name
WHERE condition;

#With WHERE or HAVING
SELECT column_name(s)
FROM table_name
WHERE column_name operator ALL
  (SELECT column_name
  FROM table_name
  WHERE condition);
```

Lists the ProductName if it finds ANY records in the OrderDetails table has Quantity equal to 10 (this will return TRUE because the Quantity column has some values of 10)

```sql
SELECT ProductName
FROM Products
WHERE ProductID = ANY
  (SELECT ProductID
  FROM OrderDetails
  WHERE Quantity = 10);
```

Lists the ProductName if ALL the records in the OrderDetails table has Quantity equal to 10. This will of course return FALSE because the Quantity column has many different values (not only the value of 10):

```sql
SELECT ProductName
FROM Products
WHERE ProductID = ALL
  (SELECT ProductID
  FROM OrderDetails
  WHERE Quantity = 10);
```



### ORDER BY

The `ORDER BY` keyword sorts the records in ascending order by default. To sort the records in descending order, use the `DESC` keyword.

For string values the `ORDER BY` keyword will order alphabetically.

For multiple columns, it means that it orders by the first one first, and then orders by the second column if the values for the first column are the same.

The `ASC` and `DESC` can be used at the same time for multiple columns.

```sql
SELECT * FROM Products
ORDER BY Price;
#ORDER BY column1, column2, ... ASC|DESC;
#ORDER BY Country ASC, CustomerName DESC;
```



### INSERT INTO

The `INSERT INTO` statement is used to insert new records in a table.

```sql
#Specify the columns, others will be null
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

#Insert to all columns
INSERT INTO table_name
VALUES (value1, value2, value3, ...);

#Insert multiple rows
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES
('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway'),
('Greasy Burger', 'Per Olsen', 'Gateveien 15', 'Sandnes', '4306', 'Norway'),
('Tasty Tee', 'Finn Egan', 'Streetroad 19B', 'Liverpool', 'L1 0AA', 'UK');
```



### UPDATE

The `UPDATE` statement is used to modify the existing records in a table.

It is the `WHERE` clause that determines how many records will be updated.

**Note: If you omit the `WHERE` clause, all records in the table will be updated!**

```sql
UPDATE Customers
SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
WHERE CustomerID = 1;
#WHERE Country='Mexico';
```



### DELETE

The `DELETE` statement is used to delete existing records in a table.

**Note: If you omit the `WHERE` clause, all records in the table will be deleted!**

```sql
DELETE FROM Customers
WHERE CustomerName='Alfreds Futterkiste';

#Delete all records in a table
DELETE FROM Customers;
```

#### DROP TABLE

To delete the table completely, use the `DROP TABLE` statement

```sql
DROP TABLE Customers;
```



## 2. Built-in functions and aggregation

### MIN() and MAX()

```sql
SELECT MIN(Price)
FROM Products;

SELECT MAX(Price)
FROM Products;

SELECT MIN(Price) AS SmallestPrice
FROM Products;
```



### COUNT()

If you specify a column instead of `(*)`, NULL values will not be counted.

```sql
SELECT COUNT(ProductID)
FROM Products
#WHERE Price > 20;

#Ignore Duplicates
SELECT COUNT(DISTINCT Price)
FROM Products;

#Use a sentence as the alias name
SELECT COUNT(*) AS [number of records]
FROM Products;
```



### SUM()

The `SUM()` function returns the total sum of a **numeric column**.

```sql
SELECT SUM(Quantity)
FROM OrderDetails;
```

#### SUM() With an Expression

```sql
SELECT SUM(Quantity * 10)
FROM OrderDetails;
```

```sql
SELECT SUM(Price * Quantity)
FROM OrderDetails
LEFT JOIN Products ON OrderDetails.ProductID = Products.ProductID;
```

### AVG()

The `AVG()` function returns the average value of a numeric column.

NULL values are ignored.

```sql
SELECT AVG(Price)
FROM Products
WHERE CategoryID = 1;
```

#### Higher Than Average

```sql
SELECT * FROM Products
WHERE price > (SELECT AVG(price) FROM Products);
```



### GROUP BY

The `GROUP BY` statement groups rows that have the same values into summary rows, like "find the number of customers in each country".

The `GROUP BY` statement is often used with aggregate functions (`COUNT()`, `MAX()`, `MIN()`, `SUM()`, `AVG()`) to group the result-set by one or more columns.

```sql
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s);
```

```sql
#the number of customers in each country, sorted high to low
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country;
ORDER BY COUNT(CustomerID) DESC;

#the number of orders sent by each shipper
SELECT Shippers.ShipperName, COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders
LEFT JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID
GROUP BY ShipperName;
```

### HAVING

The `HAVING` clause was added to SQL because the `WHERE` keyword cannot be used with aggregate functions.

```sql
#lists the number of customers in each country. Only include countries with more than 5 customers, sorted high to low
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5;
ORDER BY COUNT(CustomerID) DESC;

#lists if the employees "Davolio" or "Fuller" have registered more than 25 orders:
SELECT Employees.LastName, COUNT(Orders.OrderID) AS NumberOfOrders
FROM Orders
INNER JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
WHERE LastName = 'Davolio' OR LastName = 'Fuller'
GROUP BY LastName
HAVING COUNT(Orders.OrderID) > 25;
```



### NULL functions

```sql
#if any of the "UnitsOnOrder" values are NULL, the result will be NULL.
SELECT ProductName, UnitPrice * (UnitsInStock + UnitsOnOrder)
FROM Products;

#The MySQL IFNULL() function lets you return an alternative value if an expression is NULL:
SELECT ProductName, UnitPrice * (UnitsInStock + IFNULL(UnitsOnOrder, 0))
FROM Products

#or we can use the COALESCE() function, like this:
SELECT ProductName, UnitPrice * (UnitsInStock + COALESCE(UnitsOnOrder, 0))
FROM Products;
```





## 3. JOIN

A `JOIN` clause is used to combine rows from two or more tables, based on a related column between them.

Here are the different types of the JOINs in SQL:

- `(INNER) JOIN`: Returns records that have matching values in both tables. 两个表均有记录
- `LEFT (OUTER) JOIN`: Returns all records from the left table, and the matched records from the right table. 左表全部，右表有记录
- `RIGHT (OUTER) JOIN`: Returns all records from the right table, and the matched records from the left table. 右表全部，左表有记录
- `FULL (OUTER) JOIN`: Returns all records when there is a match in either left or right table. `FULL OUTER JOIN` and `FULL JOIN` are the same. 全部返回

![Screenshot 2023-10-21 at 12.09.37](https://pics.yujieliu.com/blog/2023/10/c9c2583b40dfd806e714fdd4f552628a.png)

### INNER JOIN (default for JOIN)

The `INNER JOIN` keyword returns only rows with a match in **both tables**. Which means that if you have a product with no CategoryID, or with a CategoryID that is not present in the Categories table, that record would not be returned in the result.

```sql
SELECT ProductID, ProductName, CategoryName
FROM Products
INNER JOIN Categories ON Products.CategoryID = Categories.CategoryID;
```



### SELF JOIN

The following SQL statement matches customers that are from the same city:

```sql
# <> means not equal to
SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2, A.City
FROM Customers A, Customers B
WHERE A.CustomerID <> B.CustomerID
AND A.City = B.City
ORDER BY A.City;
```

## 4. UNION

The `UNION` operator is used to combine the result-set of two or more `SELECT` statements.

- Every `SELECT` statement within `UNION` must have the same number of columns
- The columns must also have similar data types
- The columns in every `SELECT` statement must also be in the same order

The following SQL statement returns the cities (only distinct values) from both the "Customers" and the "Suppliers" table:

```sql
SELECT City FROM Customers
UNION
SELECT City FROM Suppliers
ORDER BY City;
```

The `UNION` operator selects only distinct values by default. To allow duplicate values, use `UNION ALL`. The following SQL statement returns the cities (duplicate values also) from both the "Customers" and the "Suppliers" table:

```sql
SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers
ORDER BY City;
```

The following SQL statement returns the German cities (only distinct values) from both the "Customers" and the "Suppliers" table:

```sql
SELECT City, Country FROM Customers
WHERE Country='Germany'
UNION
SELECT City, Country FROM Suppliers
WHERE Country='Germany'
ORDER BY City;
```

Here we have created a temporary column named "Type", that list whether the contact person is a "Customer" or a "Supplier".

```sql
SELECT 'Customer' AS Type, ContactName, City, Country
FROM Customers
UNION
SELECT 'Supplier', ContactName, City, Country
FROM Suppliers;
```



## 4. Wildcard Characters

| Symbol | Description                                                  |
| :----- | :----------------------------------------------------------- |
| %      | Represents zero or more characters                           |
| _      | Represents a single character                                |
| []     | Represents any single character within the brackets *        |
| ^      | Represents any character not in the brackets *               |
| -      | Represents any single character within the specified range * |
| {}     | Represents any escaped character **                          |

\* Not supported in PostgreSQL and MySQL databases.

** Supported only in Oracle databases.



## 5. SELECT INTO and INSERT INTO SELECT

The `SELECT INTO` statement copies data from one table into a new table.

```sql
SELECT *
#SELECT column1, column2, column3, ...
INTO newtable [IN externaldb]
FROM oldtable
WHERE condition;
```

Creates a backup copy of Customers:

```sql
SELECT * INTO CustomersBackup2017 IN 'Backup.mdb'
FROM Customers;
```



The `INSERT INTO SELECT` statement copies data from one table and inserts it into another table.

The `INSERT INTO SELECT` statement requires that the data types in source and target tables match.

**Note:** The existing records in the target table are unaffected.

```sql
#all columns
INSERT INTO table2
SELECT * FROM table1
WHERE condition;

#only some columns
INSERT INTO table2 (column1, column2, column3, ...)
SELECT column1, column2, column3, ...
```



## 6.CASE Expression

The `CASE` expression goes through conditions and returns a value when the first condition is met (like an if-then-else statement). So, once a condition is true, it will stop reading and return the result. If no conditions are true, it returns the value in the `ELSE` clause.

```sql
#Use in SELECT
SELECT OrderID, Quantity,
CASE
    WHEN Quantity > 30 THEN 'The quantity is greater than 30'
    WHEN Quantity = 30 THEN 'The quantity is 30'
    ELSE 'The quantity is under 30'
END AS QuantityText
FROM OrderDetails;

#Use in ORDER BY
SELECT CustomerName, City, Country
FROM Customers
ORDER BY
(CASE
    WHEN City IS NULL THEN Country
    ELSE City
END);
```



## 7.Stored Procedures

A stored procedure is a prepared SQL code that you can save, so the code can be reused over and over again.

So if you have an SQL query that you write over and over again, save it as a stored procedure, and then just call it to execute it.

You can also pass parameters to a stored procedure, so that the stored procedure can act based on the parameter value(s) that is passed.

```sql
#Stored Procedure Syntax
CREATE PROCEDURE procedure_name
AS
sql_statement
GO;

#Execute a Stored Procedure
EXEC procedure_name;
```

The following SQL statement creates a stored procedure named "SelectAllCustomers" that selects all records from the "Customers" table:

```sql
#A stored procedure named "SelectAllCustomers" that selects all records from the "Customers" table:
CREATE PROCEDURE SelectAllCustomers
AS
SELECT * FROM Customers
GO;

EXEC SelectAllCustomers;

#A stored procedure that selects Customers from a particular City from the "Customers" table
CREATE PROCEDURE SelectAllCustomers @City nvarchar(30)
AS
SELECT * FROM Customers WHERE City = @City
GO;

EXEC SelectAllCustomers @City = 'London';

#a stored procedure that selects Customers from a particular City with a particular PostalCode from the "Customers" table:
CREATE PROCEDURE SelectAllCustomers @City nvarchar(30), @PostalCode nvarchar(10)
AS
SELECT * FROM Customers WHERE City = @City AND PostalCode = @PostalCode
GO;

EXEC SelectAllCustomers @City = 'London', @PostalCode = 'WA1 1DP';
```





# SQL Database



