import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,d as s}from"./app-9e8a13db.js";const l={},t=s(`<h1 id="mysql-事务-transaction" tabindex="-1"><a class="header-anchor" href="#mysql-事务-transaction" aria-hidden="true">#</a> MySQL 事务 (Transaction)</h1><h2 id="基本条件和语法" tabindex="-1"><a class="header-anchor" href="#基本条件和语法" aria-hidden="true">#</a> 基本条件和语法</h2><ul><li><p>事务的四个条件（ACID）：</p><ul><li><p>原子性（<strong>A</strong>tomicity）</p><p>一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。</p></li><li><p>一致性（<strong>C</strong>onsistency）：</p><p>在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。</p></li><li><p>隔离性（<strong>I</strong>solation，又称独立性）：</p><p>数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。</p><p>事务隔离级别包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。</p></li><li><p>持久性（<strong>D</strong>urability）：</p><p>事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。</p></li></ul></li><li><p>事务控制语句：</p><ul><li><p>BEGIN 或 START TRANSACTION 显式地开启一个事务；</p></li><li><p>COMMIT 也可以使用 COMMIT WORK，不过二者是等价的。COMMIT 会提交事务，并使已对数据库进行的所有修改成为永久性的；</p></li><li><p>ROLLBACK 也可以使用 ROLLBACK WORK，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；</p></li><li><p>SAVEPOINT identifier，SAVEPOINT 允许在事务中创建一个保存点，一个事务中可以有多个 SAVEPOINT；</p></li><li><p>RELEASE SAVEPOINT identifier 删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；</p></li><li><p>ROLLBACK TO identifier 把事务回滚到标记点；</p></li><li><p>SET TRANSACTION 用来设置事务的隔离级别。InnoDB 存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ 和 SERIALIZABLE。</p></li></ul></li><li><p>MYSQL 事务处理的两种方法：</p><ul><li><p>用 BEGIN, ROLLBACK, COMMIT来实现</p><p><strong>BEGIN</strong> 开始一个事务，<strong>ROLLBACK</strong> 事务回滚，<strong>COMMIT</strong> 事务确认</p></li><li><p>直接用 SET 来改变 MySQL 的自动提交模式:</p><p><strong>SET AUTOCOMMIT=0</strong> 禁止自动提交， <strong>SET AUTOCOMMIT=1</strong> 开启自动提交</p></li></ul></li><li><p>例子</p></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#成功提交事务
mysql&gt; begin;  # 开始事务
Query OK, 0 rows affected (0.00 sec)
 
mysql&gt; insert into runoob_transaction_test value(5);
Query OK, 1 rows affected (0.01 sec)
 
mysql&gt; insert into runoob_transaction_test value(6);
Query OK, 1 rows affected (0.00 sec)
 
mysql&gt; commit; # 提交事务
Query OK, 0 rows affected (0.01 sec)
 
mysql&gt;  select * from runoob_transaction_test;
+------+
| id   |
+------+
| 5    |
| 6    |
+------+
2 rows in set (0.01 sec)

#回滚事务
mysql&gt; begin;    # 开始事务
Query OK, 0 rows affected (0.00 sec)
 
mysql&gt;  insert into runoob_transaction_test values(7);
Query OK, 1 rows affected (0.00 sec)
 
mysql&gt; rollback;   # 回滚
Query OK, 0 rows affected (0.00 sec)
 
mysql&gt;   select * from runoob_transaction_test;   # 因为回滚所以数据没有插入
+------+
| id   |
+------+
| 5    |
| 6    |
+------+
2 rows in set (0.01 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="隔离级别" tabindex="-1"><a class="header-anchor" href="#隔离级别" aria-hidden="true">#</a> 隔离级别</h2><p>事务隔离级别包括读未提交（Read uncommitted）、读提交（Read committed）、可重复读（Repeatable read）和串行化（Serializable）。<strong>MySQL 默认为可重复度 Repeatable read。</strong></p><p>讨论隔离级别的场景，主要是在<strong>多个事务并发</strong>的情况下</p><p>可能出现的问题：</p><ul><li>脏读：事务B可能读取了事务A尚未提交的数据</li><li>不可重复读：事务A事先读取了数据，事务B紧接了更新了数据，并提交了事务，而事务A再次读取该数据时，数据已经发生了改变。</li><li>幻读：事务A读取一次后，事务B插入一行满足事物A的新数据，当事物A再次进行相同的条件查询会看见事物A插入的新数据。</li></ul><table><thead><tr><th>隔离级别</th><th>可以解决的问题</th><th>默认采用的数据库</th></tr></thead><tbody><tr><td>读未提交 Read Uncommitted</td><td>-</td><td>-</td></tr><tr><td>读提交 Read Committed<br>事务A不能读取事务B已修改但是尚未提交的数据值。</td><td>脏读</td><td>SQL Server , Oracle</td></tr><tr><td>重复读 Repeatable Read<br>事务A开始读取后，事务B不能对该记录进行修改</td><td>脏毒<br>不可重复读</td><td>MySQL</td></tr><tr><td>序列化 Serializable<br>在A事务完成之前，事务B不能向事务A已读取的范围<strong>插入新行</strong></td><td>脏毒<br>不可重复读<br>幻读</td><td></td></tr></tbody></table>`,10),d=[t];function r(a,c){return e(),n("div",null,d)}const m=i(l,[["render",r],["__file","mysql-transaction.html.vue"]]);export{m as default};
