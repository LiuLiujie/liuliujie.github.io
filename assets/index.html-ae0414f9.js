import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as h,c as o,a as e,b as a,e as l,w as r,d}from"./app-9e8a13db.js";const s={},p=e("h1",{id:"mysql",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#mysql","aria-hidden":"true"},"#"),a(" MySQL")],-1),c={id:"事务",tabindex:"-1"},u=e("a",{class:"header-anchor",href:"#事务","aria-hidden":"true"},"#",-1),_=d('<h3 id="事务的四个条件-acid" tabindex="-1"><a class="header-anchor" href="#事务的四个条件-acid" aria-hidden="true">#</a> 事务的四个条件（ACID）</h3><ul><li><p>原子性（<strong>A</strong>tomicity）</p><p>一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。</p></li><li><p>一致性（<strong>C</strong>onsistency）：</p><p>在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。</p></li><li><p>隔离性（<strong>I</strong>solation，又称独立性）：</p><p>数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。</p><p>事务隔离级别包括读未提交（Read uncommitted）、读提交（Read committed）、可重复读（Repeatable read）和串行化（Serializable）。<strong>MySQL 默认为可重复度 Repeatable read。</strong></p></li><li><p>持久性（<strong>D</strong>urability）：</p><p>事务提交后数据修改是持久的。</p></li></ul><h3 id="事务隔离级别" tabindex="-1"><a class="header-anchor" href="#事务隔离级别" aria-hidden="true">#</a> 事务隔离级别</h3><p>讨论隔离级别的场景，主要是在<strong>多个事务并发</strong>的情况下</p><ul><li><p>可能出现的问题：</p><ul><li><p>脏读</p><p>事务B可能读取了事务A尚未提交的数据</p></li><li><p>不可重复读</p><p>事务A事先读取了数据，事务B紧接了更新了数据，并提交了事务，而事务A再次读取该数据时，数据已经发生了改变。</p></li><li><p>幻读</p><p>事务A读取一次后，事务B插入一行满足事物A的新数据，当事物A再次进行相同的条件查询会看见事物A插入的新数据。</p></li></ul></li><li><p>隔离级别解决的问题</p><ul><li><p>读提交：脏读</p><p>事务A不能读取事务B已修改但是尚未提交的数据值。(SQL Server , Oracle)</p></li><li><p>重复读 (MySQL)：不可重复读</p><p>事务A开始读取后，事务B不能对该记录进行修改 (MySQL)</p></li><li><p>序列化：幻读</p><p>在A事务完成之前，事务B不能向事务A已读取的范围<strong>插入新行</strong></p></li></ul></li></ul><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2><h3 id="常用索引类型" tabindex="-1"><a class="header-anchor" href="#常用索引类型" aria-hidden="true">#</a> 常用索引类型</h3>',7),b=e("p",null,[a("所有数据存储在叶子节点，复杂度为"),e("code",null,"O(logn)"),a("，适合范围查询。")],-1),m=d("<li><p>哈希索引</p><p>适合等值查询，检索效率高，一次到位。不支持范围查询，模糊查询，<code>order by</code>和最左前缀原则</p></li><li><p>全文索引 FULLTEXT</p><p><code>MyISAM</code>和<code>InnoDB</code>中都支持使用全文索引，一般在文本类型<code>char, text, varchar</code>类型上创建。</p></li>",2),f=d('<h3 id="索引优缺点" tabindex="-1"><a class="header-anchor" href="#索引优缺点" aria-hidden="true">#</a> 索引优缺点</h3><ul><li>优点：加速查询，保证唯一性</li></ul><p>​ 索引可以加快数据查询速度，减少查询时间，唯一索引可以保证数据库表中每一行的数据的唯一性</p><ul><li>缺点：创建和维护耗费时间，占用空间</li></ul><p>​ 创建索引和维护索引要耗费时间；索引需要占物理空间，除了数据表占用数据空间之外，每一个索引还要占用一定的物理空间；以表中的数据进行增、删、改的时候，索引也要动态的维护。</p><h3 id="不适用场景" tabindex="-1"><a class="header-anchor" href="#不适用场景" aria-hidden="true">#</a> 不适用场景</h3><ul><li><p>数据量少</p></li><li><p>更新比较频繁</p></li><li><p>区分度低（如性别）</p></li><li><p>不会被<code>where、group by、order by</code>使用到的字段</p></li><li><p>已经有冗余的索引的情况</p><p>比如已经有<code>a,b</code>的联合索引，不需要再单独建立<code>a</code>索引</p></li></ul><h3 id="联合索引" tabindex="-1"><a class="header-anchor" href="#联合索引" aria-hidden="true">#</a> 联合索引</h3><h3 id="索引失效" tabindex="-1"><a class="header-anchor" href="#索引失效" aria-hidden="true">#</a> 索引失效</h3><h2 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h2><h2 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h2><h2 id="主从备份" tabindex="-1"><a class="header-anchor" href="#主从备份" aria-hidden="true">#</a> 主从备份</h2><h2 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化" aria-hidden="true">#</a> 性能优化</h2><h2 id="redis和mysql数据一致性" tabindex="-1"><a class="header-anchor" href="#redis和mysql数据一致性" aria-hidden="true">#</a> Redis和MySQL数据一致性</h2><h2 id="引擎" tabindex="-1"><a class="header-anchor" href="#引擎" aria-hidden="true">#</a> 引擎</h2>',15),y=e("p",null,"InnoDB：MySQL 5.1 后默认的存储引擎，支持事务、支持外键、支持崩溃修复和自增列，数据读写效率一般。",-1),x=e("p",null,"MyISAM：MySQL 5.1 之前默认的数据库引擎，读取效率较高，占用数据空间较少，但不支持事务、不支持行级锁、不支持外键等特性，因此插入时使用表锁，效率较低",-1),g=e("p",null,"MEMORY：读写性能很高，但 MySQL 服务重启之后数据会丢失，它不支持事务和外键",-1);function A(M,S){const i=n("RouterLink");return h(),o("div",null,[p,e("h2",c,[u,a(),l(i,{to:"/blogs/devops/mysql/mysql-transaction.html"},{default:r(()=>[a("事务")]),_:1})]),_,e("ul",null,[e("li",null,[e("p",null,[l(i,{to:"/blogs/devops/mysql/mysql-btree.html"},{default:r(()=>[a("B+树索引 BTREE")]),_:1})]),b]),m]),f,e("ul",null,[e("li",null,[e("p",null,[l(i,{to:"/blogs/devops/mysql/mysql-engines.html"},{default:r(()=>[a("MySQL 引擎")]),_:1})]),y,x,g])])])}const q=t(s,[["render",A],["__file","index.html.vue"]]);export{q as default};