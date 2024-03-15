const e=JSON.parse(`{"key":"v-15cd8f88","path":"/blogs/devops/mysql/","title":"MySQL","lang":"en-US","frontmatter":{"category":["Computer Science","Database"],"tag":["MySQL"],"description":"MySQL 事务 事务的四个条件（ACID） 原子性（Atomicity） 一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。 一致性（Consistency）： 在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。 隔离性（Isolation，又称独立性）： 数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。 事务隔离级别包括读未提交（Read uncommitted）、读提交（Read committed）、可重复读（Repeatable read）和串行化（Serializable）。MySQL 默认为可重复度 Repeatable read。 持久性（Durability）： 事务提交后数据修改是持久的。","head":[["meta",{"property":"og:url","content":"https://blog.yujieliu.com/blogs/devops/mysql/"}],["meta",{"property":"og:site_name","content":"Yujie's blog"}],["meta",{"property":"og:title","content":"MySQL"}],["meta",{"property":"og:description","content":"MySQL 事务 事务的四个条件（ACID） 原子性（Atomicity） 一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。 一致性（Consistency）： 在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。 隔离性（Isolation，又称独立性）： 数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。 事务隔离级别包括读未提交（Read uncommitted）、读提交（Read committed）、可重复读（Repeatable read）和串行化（Serializable）。MySQL 默认为可重复度 Repeatable read。 持久性（Durability）： 事务提交后数据修改是持久的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-11-26T04:52:13.000Z"}],["meta",{"property":"article:author","content":"Yujie Liu"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:modified_time","content":"2023-11-26T04:52:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-26T04:52:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yujie Liu\\",\\"url\\":\\"https://blog.yujieliu.com/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"事务","slug":"事务","link":"#事务","children":[{"level":3,"title":"事务的四个条件（ACID）","slug":"事务的四个条件-acid","link":"#事务的四个条件-acid","children":[]},{"level":3,"title":"事务隔离级别","slug":"事务隔离级别","link":"#事务隔离级别","children":[]}]},{"level":2,"title":"索引","slug":"索引","link":"#索引","children":[{"level":3,"title":"常用索引类型","slug":"常用索引类型","link":"#常用索引类型","children":[]},{"level":3,"title":"索引优缺点","slug":"索引优缺点","link":"#索引优缺点","children":[]},{"level":3,"title":"不适用场景","slug":"不适用场景","link":"#不适用场景","children":[]},{"level":3,"title":"联合索引","slug":"联合索引","link":"#联合索引","children":[]},{"level":3,"title":"索引失效","slug":"索引失效","link":"#索引失效","children":[]}]},{"level":2,"title":"锁","slug":"锁","link":"#锁","children":[]},{"level":2,"title":"日志","slug":"日志","link":"#日志","children":[]},{"level":2,"title":"主从备份","slug":"主从备份","link":"#主从备份","children":[]},{"level":2,"title":"性能优化","slug":"性能优化","link":"#性能优化","children":[]},{"level":2,"title":"Redis和MySQL数据一致性","slug":"redis和mysql数据一致性","link":"#redis和mysql数据一致性","children":[]},{"level":2,"title":"引擎","slug":"引擎","link":"#引擎","children":[]}],"git":{"createdTime":1700904375000,"updatedTime":1700974333000,"contributors":[{"name":"Yujie","email":"yujie.liu.public@gmail.com","commits":2}]},"readingTime":{"minutes":3.54,"words":1062},"filePathRelative":"blogs/devops/mysql/README.md","localizedDate":"November 25, 2023","excerpt":"<h1> MySQL</h1>\\n<h2> <a href=\\"/blogs/devops/mysql/mysql-transaction.html\\" target=\\"blank\\">事务</a></h2>\\n<h3> 事务的四个条件（ACID）</h3>\\n<ul>\\n<li>\\n<p>原子性（<strong>A</strong>tomicity）</p>\\n<p>一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。</p>\\n</li>\\n<li>\\n<p>一致性（<strong>C</strong>onsistency）：</p>\\n<p>在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。</p>\\n</li>\\n<li>\\n<p>隔离性（<strong>I</strong>solation，又称独立性）：</p>\\n<p>数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。</p>\\n<p>事务隔离级别包括读未提交（Read uncommitted）、读提交（Read committed）、可重复读（Repeatable read）和串行化（Serializable）。<strong>MySQL 默认为可重复度 Repeatable read。</strong></p>\\n</li>\\n<li>\\n<p>持久性（<strong>D</strong>urability）：</p>\\n<p>事务提交后数据修改是持久的。</p>\\n</li>\\n</ul>","autoDesc":true}`);export{e as data};