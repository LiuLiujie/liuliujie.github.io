const n=JSON.parse(`{"key":"v-752da00e","path":"/blogs/devops/mysql/mysql-transaction.html","title":"MySQL 事务 (Transaction)","lang":"en-US","frontmatter":{"category":["Computer Science","Database"],"tag":["MySQL"],"description":"MySQL 事务 (Transaction) 基本条件和语法 事务的四个条件（ACID）： 原子性（Atomicity） 一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。 一致性（Consistency）： 在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。 隔离性（Isolation，又称独立性）： 数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。 事务隔离级别包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。 持久性（Durability）： 事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。 事务控制语句： BEGIN 或 START TRANSACTION 显式地开启一个事务； COMMIT 也可以使用 COMMIT WORK，不过二者是等价的。COMMIT 会提交事务，并使已对数据库进行的所有修改成为永久性的； ROLLBACK 也可以使用 ROLLBACK WORK，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改； SAVEPOINT identifier，SAVEPOINT 允许在事务中创建一个保存点，一个事务中可以有多个 SAVEPOINT； RELEASE SAVEPOINT identifier 删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常； ROLLBACK TO identifier 把事务回滚到标记点； SET TRANSACTION 用来设置事务的隔离级别。InnoDB 存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ 和 SERIALIZABLE。 MYSQL 事务处理的两种方法： 用 BEGIN, ROLLBACK, COMMIT来实现 BEGIN 开始一个事务，ROLLBACK 事务回滚，COMMIT 事务确认 直接用 SET 来改变 MySQL 的自动提交模式: SET AUTOCOMMIT=0 禁止自动提交， SET AUTOCOMMIT=1 开启自动提交 例子","head":[["meta",{"property":"og:url","content":"https://blog.yujieliu.com/blogs/devops/mysql/mysql-transaction.html"}],["meta",{"property":"og:site_name","content":"Yujie's blog"}],["meta",{"property":"og:title","content":"MySQL 事务 (Transaction)"}],["meta",{"property":"og:description","content":"MySQL 事务 (Transaction) 基本条件和语法 事务的四个条件（ACID）： 原子性（Atomicity） 一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。 一致性（Consistency）： 在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。 隔离性（Isolation，又称独立性）： 数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。 事务隔离级别包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。 持久性（Durability）： 事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。 事务控制语句： BEGIN 或 START TRANSACTION 显式地开启一个事务； COMMIT 也可以使用 COMMIT WORK，不过二者是等价的。COMMIT 会提交事务，并使已对数据库进行的所有修改成为永久性的； ROLLBACK 也可以使用 ROLLBACK WORK，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改； SAVEPOINT identifier，SAVEPOINT 允许在事务中创建一个保存点，一个事务中可以有多个 SAVEPOINT； RELEASE SAVEPOINT identifier 删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常； ROLLBACK TO identifier 把事务回滚到标记点； SET TRANSACTION 用来设置事务的隔离级别。InnoDB 存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ 和 SERIALIZABLE。 MYSQL 事务处理的两种方法： 用 BEGIN, ROLLBACK, COMMIT来实现 BEGIN 开始一个事务，ROLLBACK 事务回滚，COMMIT 事务确认 直接用 SET 来改变 MySQL 的自动提交模式: SET AUTOCOMMIT=0 禁止自动提交， SET AUTOCOMMIT=1 开启自动提交 例子"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-11-26T04:52:13.000Z"}],["meta",{"property":"article:author","content":"Yujie Liu"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:modified_time","content":"2023-11-26T04:52:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 事务 (Transaction)\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-26T04:52:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yujie Liu\\",\\"url\\":\\"https://blog.yujieliu.com/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"基本条件和语法","slug":"基本条件和语法","link":"#基本条件和语法","children":[]},{"level":2,"title":"隔离级别","slug":"隔离级别","link":"#隔离级别","children":[]}],"git":{"createdTime":1700904375000,"updatedTime":1700974333000,"contributors":[{"name":"Yujie","email":"yujie.liu.public@gmail.com","commits":2}]},"readingTime":{"minutes":3.62,"words":1086},"filePathRelative":"blogs/devops/mysql/mysql-transaction.md","localizedDate":"November 25, 2023","excerpt":"<h1> MySQL 事务 (Transaction)</h1>\\n<h2> 基本条件和语法</h2>\\n<ul>\\n<li>\\n<p>事务的四个条件（ACID）：</p>\\n<ul>\\n<li>\\n<p>原子性（<strong>A</strong>tomicity）</p>\\n<p>一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。</p>\\n</li>\\n<li>\\n<p>一致性（<strong>C</strong>onsistency）：</p>\\n<p>在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。</p>\\n</li>\\n<li>\\n<p>隔离性（<strong>I</strong>solation，又称独立性）：</p>\\n<p>数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。</p>\\n<p>事务隔离级别包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。</p>\\n</li>\\n<li>\\n<p>持久性（<strong>D</strong>urability）：</p>\\n<p>事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。</p>\\n</li>\\n</ul>\\n</li>\\n<li>\\n<p>事务控制语句：</p>\\n<ul>\\n<li>\\n<p>BEGIN 或 START TRANSACTION 显式地开启一个事务；</p>\\n</li>\\n<li>\\n<p>COMMIT 也可以使用 COMMIT WORK，不过二者是等价的。COMMIT 会提交事务，并使已对数据库进行的所有修改成为永久性的；</p>\\n</li>\\n<li>\\n<p>ROLLBACK 也可以使用 ROLLBACK WORK，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；</p>\\n</li>\\n<li>\\n<p>SAVEPOINT identifier，SAVEPOINT 允许在事务中创建一个保存点，一个事务中可以有多个 SAVEPOINT；</p>\\n</li>\\n<li>\\n<p>RELEASE SAVEPOINT identifier 删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；</p>\\n</li>\\n<li>\\n<p>ROLLBACK TO identifier 把事务回滚到标记点；</p>\\n</li>\\n<li>\\n<p>SET TRANSACTION 用来设置事务的隔离级别。InnoDB 存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ 和 SERIALIZABLE。</p>\\n</li>\\n</ul>\\n</li>\\n<li>\\n<p>MYSQL 事务处理的两种方法：</p>\\n<ul>\\n<li>\\n<p>用 BEGIN, ROLLBACK, COMMIT来实现</p>\\n<p><strong>BEGIN</strong> 开始一个事务，<strong>ROLLBACK</strong> 事务回滚，<strong>COMMIT</strong> 事务确认</p>\\n</li>\\n<li>\\n<p>直接用 SET 来改变 MySQL 的自动提交模式:</p>\\n<p><strong>SET AUTOCOMMIT=0</strong> 禁止自动提交， <strong>SET AUTOCOMMIT=1</strong> 开启自动提交</p>\\n</li>\\n</ul>\\n</li>\\n<li>\\n<p>例子</p>\\n</li>\\n</ul>","autoDesc":true}`);export{n as data};