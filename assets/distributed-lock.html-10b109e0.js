import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c as r,a as n,b as s,e as a,d as t}from"./app-9e8a13db.js";const c={},p=n("h1",{id:"redis-distributed-lock-实现分布式锁",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#redis-distributed-lock-实现分布式锁","aria-hidden":"true"},"#"),s(" Redis Distributed Lock 实现分布式锁")],-1),d={href:"https://redis.io/commands/set/",target:"_blank",rel:"noopener noreferrer"},u=t(`<p>分布式锁是用于分布式环境下并发控制的一种机制，用于控制某个资源在同一时刻只能被一个应用所使用。如下图所示：</p><p><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/redis/八股文/分布式锁.jpg" alt="img"></p><p>Redis 本身可以被多个客户端共享访问，正好就是一个共享存储系统，可以用来保存分布式锁，而且 Redis 的读写性能高，可以应对高并发的锁操作场景。</p><h2 id="实现方式" tabindex="-1"><a class="header-anchor" href="#实现方式" aria-hidden="true">#</a> 实现方式</h2><h3 id="加锁" tabindex="-1"><a class="header-anchor" href="#加锁" aria-hidden="true">#</a> 加锁</h3><p>Redis 的 SET 命令有个 <strong>NX 参数</strong> 的作用是 <strong>key不存在才插入</strong>，所以可以用它来实现分布式锁：</p><ul><li>如果 key 不存在，则显示插入成功，可以用来表示加锁成功；</li><li>如果 key 存在，则会显示插入失败，可以用来表示加锁失败。</li></ul><p>基于 Redis 节点实现分布式锁时，对于加锁操作，我们需要满足三个条件。</p><ul><li>加锁包括了读取锁变量、检查锁变量值和设置锁变量值三个操作，但需要以原子操作的方式完成，所以，我们使用 SET 命令带上 NX 选项来实现加锁；</li><li>锁变量需要<strong>设置过期时间</strong>，以免客户端拿到锁后发生异常，导致锁一直无法释放，所以，我们在 SET 命令执行时加上 EX/PX 选项，设置其过期时间；</li><li>锁变量的值需要能区分来自不同客户端的加锁操作，以免在释放锁时，出现误释放操作，所以，我们使用 SET 命令设置锁变量值时，每个<strong>客户端设置的值是一个唯一值</strong>，用于标识客户端；</li></ul><p>满足这三个条件的分布式命令如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>SET lock_key unique_value NX PX <span class="token number">10000</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>lock_key 就是 key 键；</li><li>unique_value 是客户端生成的唯一的标识，区分来自不同客户端的锁操作；</li><li>NX 代表只在 lock_key 不存在时，才对 lock_key 进行设置操作；</li><li>PX 10000 表示设置 lock_key 的过期时间为 10s，这是为了避免客户端发生异常而无法释放锁。</li></ul><h3 id="解锁" tabindex="-1"><a class="header-anchor" href="#解锁" aria-hidden="true">#</a> 解锁</h3><p>而解锁的过程就是将 lock_key 键删除（del lock_key），但不能乱删，要保证执行操作的客户端就是加锁的客户端。所以，解锁的时候，我们要先判断锁的 unique_value 是否为加锁客户端，是的话，才将 lock_key 键删除。</p><p>可以看到，解锁是有两个操作，这时就<strong>需要 Lua 脚本来保证解锁</strong>的原子性，因为 Redis 在执行 Lua 脚本时，可以以原子性的方式执行，保证了锁释放操作的原子性。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">// 释放锁时，先比较 unique_value 是否相等，避免锁的误释放</span>
<span class="token keyword">if</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> then
    <span class="token keyword">return</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">&quot;del&quot;</span><span class="token punctuation">,</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">else</span>
    <span class="token keyword">return</span> <span class="token number">0</span>
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来，就通过使用 SET 命令和 Lua 脚本在 Redis 单节点上完成了分布式锁的加锁和解锁。</p><h2 id="命令行实战" tabindex="-1"><a class="header-anchor" href="#命令行实战" aria-hidden="true">#</a> 命令行实战</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#&gt;redis-cli</span>
<span class="token comment">#加锁，锁上100秒便于看效果</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SET lock_for_resource_1 server_1 NX PX <span class="token number">100000</span>
OK

<span class="token comment">#查看这个key是否存在，以及加上这个key（即加上这个锁的应用）是谁</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> GET lock_for_resource_1
<span class="token string">&quot;server_1&quot;</span>

<span class="token comment">#如果是自身，则删除这个key</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> DEL lock_for_resource_1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token comment">#在实际应用上，以上检查是否是自身并删除key的操作需要原子运行，因此可以使用LUA脚本，注意需要把引号转义</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> EVAL <span class="token string">&quot;if redis.call(<span class="token entity" title="\\&quot;">\\&quot;</span>get<span class="token entity" title="\\&quot;">\\&quot;</span>, KEYS[1]) == ARGV[1] then return redis.call(<span class="token entity" title="\\&quot;">\\&quot;</span>del<span class="token entity" title="\\&quot;">\\&quot;</span>, KEYS[1]) else return 0 end&quot;</span> <span class="token number">1</span> lock_for_resource_1 server_1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token comment">#手欠重新试一下别的服务器尝试获取锁，返回0，获取失败</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> EVAL <span class="token string">&quot;if redis.call(<span class="token entity" title="\\&quot;">\\&quot;</span>get<span class="token entity" title="\\&quot;">\\&quot;</span>, KEYS[1]) == ARGV[1] then return redis.call(<span class="token entity" title="\\&quot;">\\&quot;</span>del<span class="token entity" title="\\&quot;">\\&quot;</span>, KEYS[1]) else return 0 end&quot;</span> <span class="token number">1</span> lock_for_resource_1 server_2
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span>exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点</h2><p>基于 Redis 实现分布式锁的<strong>优点</strong>：</p><ol><li>性能高效（这是选择缓存实现分布式锁最核心的出发点）。</li><li>实现方便。很多研发工程师选择使用 Redis 来实现分布式锁，很大成分上是因为 Redis 提供了 setnx 方法，实现分布式锁很方便。</li><li>避免单点故障（因为 Redis 是跨集群部署的，自然就避免了单点故障）。</li></ol><p>基于 Redis 实现分布式锁的<strong>缺点</strong>：</p>`,23),k=n("p",null,[n("strong",null,"超时时间不好设置")],-1),m=n("p",null,"如果锁的超时时间设置过长，会影响性能，如果设置的超时时间过短会保护不到共享资源。比如在有些场景中，一个线程 A 获取到了锁之后，由于业务代码执行时间可能比较长，导致超过了锁的超时时间，自动失效，注意 A 线程没执行完，后续线程 B 又意外的持有了锁，意味着可以操作共享资源，那么两个线程之间的共享资源就没办法进行保护了。",-1),h=n("li",null,[n("strong",null,"那么如何合理设置超时时间呢？"),s(" 我们可以基于续约的方式设置超时时间：先给锁设置一个超时时间，然后启动一个守护线程，让守护线程在一段时间后，重新设置这个锁的超时时间。实现方式就是：写一个守护线程，然后去判断锁的情况，当锁快失效的时候，再次进行"),n("strong",null,"续约加锁"),s("，当主线程执行完成后，销毁续约锁即可，不过这种方式实现起来相对复杂。")],-1),v={href:"https://www.cnblogs.com/keeya/p/14332131.html",target:"_blank",rel:"noopener noreferrer"},_=n("p",null,[n("strong",null,"Redis 主从复制模式中的数据是异步复制的，这样导致分布式锁的不可靠性"),s("。如果在 Redis 主节点获取到锁后，在没有同步到其他节点时，Redis 主节点宕机了，此时新的 Redis 主节点依然可以获取锁，所以多个应用服务就可以同时获取到锁。")],-1),b=n("li",null,[s("解决方案"),n("a",{href:"#Redis-%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E9%9B%86%E7%BE%A4%E6%83%85%E5%86%B5%E4%B8%8B%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81%E7%9A%84%E5%8F%AF%E9%9D%A0%E6%80%A7%EF%BC%9F"},"见下"),s("。")],-1),g={href:"https://github.com/redisson/redisson/wiki/8.-%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81%E5%92%8C%E5%90%8C%E6%AD%A5%E5%99%A8#84-%E7%BA%A2%E9%94%81redlock",target:"_blank",rel:"noopener noreferrer"},E=n("p",null,[n("strong",null,"无法重入"),s("。若后续同一线程内继续加锁，将会加锁失败。如果想将 Redis 分布式锁改造成可重入的分布式锁，有两种方案：")],-1),R=n("li",null,"本地应用使用 ThreadLocal 进行重入次数计数，加锁时加 1，解锁时减 1，当计数变为 0 释放锁",-1),f=n("li",null,"第二种，使用 Redis Hash 表存储可重入次数，使用 Lua 脚本加锁/解锁",-1),q={href:"https://github.com/redisson/redisson/wiki/8.-%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81%E5%92%8C%E5%90%8C%E6%AD%A5%E5%99%A8#81-%E5%8F%AF%E9%87%8D%E5%85%A5%E9%94%81reentrant-lock",target:"_blank",rel:"noopener noreferrer"},y=t('<h2 id="redis-如何解决集群情况下分布式锁的可靠性" tabindex="-1"><a class="header-anchor" href="#redis-如何解决集群情况下分布式锁的可靠性" aria-hidden="true">#</a> Redis 如何解决集群情况下分布式锁的可靠性？</h2><p>为了保证集群环境下分布式锁的可靠性，Redis 官方已经设计了一个分布式锁算法 Redlock（红锁）。</p><p>它是基于<strong>多个 Redis 节点</strong>的分布式锁，即使有节点发生了故障，锁变量仍然是存在的，客户端还是可以完成锁操作。官方推荐是至少部署 5 个 Redis 节点，而且都是主节点，它们之间没有任何关系，都是一个个孤立的节点。</p><p>Redlock 算法的基本思路，<strong>是让客户端和多个独立的 Redis 节点依次请求申请加锁，如果客户端能够和半数以上的节点成功地完成加锁操作，那么我们就认为，客户端成功地获得分布式锁，否则加锁失败</strong>。</p><p>这样一来，即使有某个 Redis 节点发生故障，因为锁的数据在其他节点上也有保存，所以客户端仍然可以正常地进行锁操作，锁的数据也不会丢失。</p><p>Redlock 算法加锁三个过程：</p><ul><li>第一步是，客户端获取当前时间（t1）。</li><li>第二步是，客户端按顺序依次向 N 个 Redis 节点执行加锁操作： <ul><li>加锁操作使用 SET 命令，带上 NX，EX/PX 选项，以及带上客户端的唯一标识。</li><li>如果某个 Redis 节点发生故障了，为了保证在这种情况下，Redlock 算法能够继续运行，我们需要给「加锁操作」设置一个超时时间（不是对「锁」设置超时时间，而是对「加锁操作」设置超时时间），加锁操作的超时时间需要远远地小于锁的过期时间，一般也就是设置为几十毫秒。</li></ul></li><li>第三步是，一旦客户端从超过半数（大于等于 N/2+1）的 Redis 节点上成功获取到了锁，就再次获取当前时间（t2），然后计算计算整个加锁过程的总耗时（t2-t1）。如果 t2-t1 &lt; 锁的过期时间，此时，认为客户端加锁成功，否则认为加锁失败。</li></ul><p>可以看到，加锁成功要同时满足两个条件（<em>简述：如果有超过半数的 Redis 节点成功的获取到了锁，并且总耗时没有超过锁的有效时间，那么就是加锁成功</em>）：</p><ul><li>条件一：客户端从超过半数（大于等于 N/2+1）的 Redis 节点上成功获取到了锁；</li><li>条件二：客户端从大多数节点获取锁的总耗时（t2-t1）小于锁设置的过期时间。</li></ul><p>加锁成功后，客户端需要重新计算这把锁的有效时间，计算的结果是「锁最初设置的过期时间」减去「客户端从大多数节点获取锁的总耗时（t2-t1）」。如果计算的结果已经来不及完成共享数据的操作了，我们可以释放锁，以免出现还没完成数据操作，锁就过期了的情况。</p><p>加锁失败后，客户端向<strong>所有 Redis 节点发起释放锁的操作</strong>，释放锁的操作和在单节点上释放锁的操作一样，只要执行释放锁的 Lua 脚本就可以了。</p>',11);function A(x,B){const e=i("ExternalLinkIcon");return o(),r("div",null,[p,n("p",null,[s("这种方法在Redis的"),n("a",d,[s("官方文档"),a(e)]),s("中作为案例提供。")]),u,n("ul",null,[n("li",null,[k,m,n("ul",null,[h,n("li",null,[s("开箱即用的Java下解决方案框架有 "),n("a",v,[s("Redisson watchdog"),a(e)]),s("。")])])]),n("li",null,[_,n("ul",null,[b,n("li",null,[s("Java可以使用"),n("a",g,[s("Redission Redlock"),a(e)]),s("。")])])]),n("li",null,[E,n("ul",null,[R,f,n("li",null,[s("Java 可以使用 "),n("a",q,[s("Redission ReentrantLock"),a(e)]),s(".")])])])]),y])}const N=l(c,[["render",A],["__file","distributed-lock.html.vue"]]);export{N as default};