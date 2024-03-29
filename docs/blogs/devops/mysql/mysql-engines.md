---
category:
- Computer Science
- Database

tag: 
- MySQL
---

# MySQL 引擎 (Engines)

MySQL 中最常见的存储引擎有：InnoDB、MyISAM 和 MEMORY，其中 InnoDB 是 MySQL 5.1 之后默认的存储引擎，它支持事务、支持外键、支持崩溃修复和自增列，它的特点是稳定（能保证业务的完整性），但数据的读写效率一般。

- MyISAM 是 MySQL 5.1 之前默认的数据库引擎，读取效率较高，占用数据空间较少，但不支持事务、不支持行级锁、不支持外键等特性。因为不支持行级锁，因此在添加和修改操作时，会执行锁表操作，所以它的写入效率较低。
- MEMORY 读写性能很高，但 MySQL 服务重启之后数据会丢失，它不支持事务和外键。适用场景是读写效率要求高，但对数据丢失不敏感的业务场景。

## 性能对比

- MyISAM 引擎保存了单独的索引文件 .myi，且它的索引是直接定位到 OFFSET 的，而 InnoDB 没有单独的物理索引存储文件，且 InnoDB 索引寻址是先定位到块数据，再定位到行数据，所以 MyISAM 的查询效率是比 InnoDB 的查询效率要高。
- MEMORY 读写性能很高，但 MySQL 服务重启之后数据会丢失，它不支持事务和外键。适用场景是读写效率要求高，但对数据丢失不敏感的业务场景。

