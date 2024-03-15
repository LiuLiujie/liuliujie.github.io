import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as l,c as u,a as n,e as a,w as i,b as s,d as o}from"./app-9e8a13db.js";const r={},d=n("h1",{id:"priorityqueue-优先队列",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#priorityqueue-优先队列","aria-hidden":"true"},"#"),s(" PriorityQueue 优先队列")],-1),v=n("p",null,[s("PriorityQueue 是 Java 中的一个基于"),n("strong",null,"优先级堆"),s("的优先队列实现，它能够在 "),n("strong",null,"O(log n) 的时间复杂度"),s("内实现元素的插入和删除操作，并且能够自动维护队列中元素的优先级顺序。")],-1),k=n("p",null,"通俗来说，PriorityQueue 就是一个队列，但是它不是先进先出的，而是按照元素优先级进行排序的。当你往 PriorityQueue 中插入一个元素时，它会自动根据元素的优先级将其插入到合适的位置。当你从 PriorityQueue 中删除一个元素时，它会自动将优先级最高的元素出队。",-1),m=o(`<h2 id="常用函数" tabindex="-1"><a class="header-anchor" href="#常用函数" aria-hidden="true">#</a> 常用函数</h2><ul><li><code>offer()</code>: 插入一个元素</li><li><code>add(E e)</code>: 和<code>offer(E e)</code>的语义相同，都是向优先队列中插入元素，只是<code>Queue</code>接口规定二者对插入失败时的处理不同，前者在插入失败时抛出异常，后则则会返回<code>false</code>。对于<em>PriorityQueue</em>这两个方法其实没什么差别。</li><li><code>poll()</code>: 获取队头元素并出队</li><li><code>element()</code>和<code>peek()</code>的语义完全相同，都是获取但不删除队首元素，也就是队列中权值最小的那个元素，二者唯一的区别是当方法失败时前者抛出异常，后者返回<code>null</code>。根据小顶堆的性质，堆顶那个元素就是全局最小的那个；由于堆用数组表示，根据下标关系，<code>0</code>下标处的那个元素既是堆顶元素。所以<strong>直接返回数组<code>0</code>下标处的那个元素即可</strong>。</li></ul><h3 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码" aria-hidden="true">#</a> 示例代码</h3><p>默认为从小到大升序排列</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 创建 PriorityQueue 对象</span>
<span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> priorityQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加元素到 PriorityQueue</span>
priorityQueue<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span><span class="token string">&quot;AAA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
priorityQueue<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span><span class="token string">&quot;BBB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
priorityQueue<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span><span class="token string">&quot;CCC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 打印 PriorityQueue 中的元素</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>priorityQueue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>priorityQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//Results: AAA BBB CCC</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义排列顺序" tabindex="-1"><a class="header-anchor" href="#自定义排列顺序" aria-hidden="true">#</a> 自定义排列顺序</h2><p>有两种方式来自定义排列顺序</p>`,7),b=n("li",null,[s("向队列传入"),n("code",null,"Comparator"),s("对象")],-1),g=n("li",null,[s("自身元素实现"),n("code",null,"Comparable"),s("接口")],-1),h=o(`<h3 id="_1-使用comparator提供的静态方法为降序排列" tabindex="-1"><a class="header-anchor" href="#_1-使用comparator提供的静态方法为降序排列" aria-hidden="true">#</a> 1. 使用<code>Comparator</code>提供的静态方法为降序排列</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> priorityQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">reverseOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-自定义comparator规则" tabindex="-1"><a class="header-anchor" href="#_2-自定义comparator规则" aria-hidden="true">#</a> 2. 自定义<code>Comparator</code>规则</h3><ul><li>返回值如果<strong>小于0</strong>，说明前者要小于后者</li><li>如果相等，则二者相等</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">&gt;</span></span> cmp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> n1<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> n2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n1<span class="token punctuation">.</span>val <span class="token operator">-</span> n2<span class="token punctuation">.</span>val<span class="token punctuation">;</span><span class="token comment">//依旧是从小到大</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">&gt;</span></span> prique <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>cmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-元素实现comparable接口" tabindex="-1"><a class="header-anchor" href="#_3-元素实现comparable接口" aria-hidden="true">#</a> 3. 元素实现<code>Comparable</code>接口</h3><ul><li>返回值如果<strong>小于0</strong>，说明本身要小于后者</li><li>如果相等，则二者相等</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
  
  <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTO</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">-</span> person<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="元素插入图解源码" tabindex="-1"><a class="header-anchor" href="#元素插入图解源码" aria-hidden="true">#</a> 元素插入图解源码</h2><p>假设有如下的一个优先队列</p><img src="https://pics.yujieliu.com/blog/2023/11/0caacfabbbbd35a902c86a429edc71ff.png" alt="img" style="zoom:50%;"><p>比如我们要插入4，可以看到由于新元素小于其父节点，因此需要需要把元素上移两次。</p><img src="https://pics.yujieliu.com/blog/2023/11/6c1a07e3358a2d877c69d1fc5113a2d4.png" alt="img" style="zoom:50%;"><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//offer(E e)</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">offer</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token comment">//不允许放入null元素</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    modCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> size<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;=</span> queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
        <span class="token function">grow</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//自动扩容</span>
    size <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token comment">//队列原来为空，这是插入的第一个元素</span>
        queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token function">siftUp</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//调整</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中，扩容函数<code>grow()</code>类似于<code>ArrayList</code>里的<code>grow()</code>函数，就是再申请一个更大的数组，并将原数组的元素复制过去，这里不再赘述。需要注意的是<code>siftUp(int k, E x)</code>方法，该方法用于插入元素<code>x</code>并维持堆的特性。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>//siftUp()
private void siftUp(int k, E x) {
    while (k &gt; 0) {
        int parent = (k - 1) &gt;&gt;&gt; 1;//parentNo = (nodeNo-1)/2
        Object e = queue[parent];
        if (comparator.compare(x, (E) e) &gt;= 0)//调用比较器的比较方法
            break;
        queue[k] = e;
        k = parent;
    }
    queue[k] = x;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调整的过程为：<strong>从<code>k</code>指定的位置开始，将<code>x</code>逐层与当前点的<code>parent</code>进行比较并交换，直到满足<code>x &gt;= queue[parent]</code>为止</strong>。注意这里的比较可以是元素的自然顺序，也可以是依靠比较器的顺序。</p><h2 id="元素删除图解源码" tabindex="-1"><a class="header-anchor" href="#元素删除图解源码" aria-hidden="true">#</a> 元素删除图解源码</h2><h3 id="poll" tabindex="-1"><a class="header-anchor" href="#poll" aria-hidden="true">#</a> poll()</h3><p><code>remove()</code>和<code>poll()</code>方法的语义也完全相同，都是获取并删除队首元素，区别是当方法失败时前者抛出异常，后者返回<code>null</code>。由于删除操作会改变队列的结构，为维护小顶堆的性质，需要进行必要的调整。</p><img src="https://pics.yujieliu.com/blog/2023/11/d23f94f7b5aae49cc3e33e048ab669ca.png" alt="PriorityQueue_poll.png" style="zoom:50%;"><p>代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>public E poll() {
    if (size == 0)
        return null;
    int s = --size;
    modCount++;
    E result = (E) queue[0];//0下标处的那个元素就是最小的那个
    E x = (E) queue[s];
    queue[s] = null;
    if (s != 0)
        siftDown(0, x);//调整
    return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码首先记录<code>0</code>下标处的元素，并用最后一个元素替换<code>0</code>下标位置的元素，之后调用<code>siftDown()</code>方法对堆进行调整，最后返回原来<code>0</code>下标处的那个元素（也就是最小的那个元素）。重点是<code>siftDown(int k, E x)</code>方法，该方法的作用是<strong>从<code>k</code>指定的位置开始，将<code>x</code>逐层向下与当前点的左右孩子中较小的那个交换，直到<code>x</code>小于或等于左右孩子中的任何一个为止</strong>。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>//siftDown()
private void siftDown(int k, E x) {
    int half = size &gt;&gt;&gt; 1;
    while (k &lt; half) {
      //首先找到左右孩子中较小的那个，记录到c里，并用child记录其下标
        int child = (k &lt;&lt; 1) + 1;//leftNo = parentNo*2+1
        Object c = queue[child];
        int right = child + 1;
        if (right &lt; size &amp;&amp;
            comparator.compare((E) c, (E) queue[right]) &gt; 0)
            c = queue[child = right];
        if (comparator.compare(x, (E) c) &lt;= 0)
            break;
        queue[k] = c;//然后用c取代原来的值
        k = child;
    }
    queue[k] = x;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="remove" tabindex="-1"><a class="header-anchor" href="#remove" aria-hidden="true">#</a> remove()</h3><p><code>remove(Object o)</code>方法用于删除队列中跟<code>o</code>相等的某一个元素（如果有多个相等，只删除一个），该方法不是<em>Queue</em>接口内的方法，而是<em>Collection</em>接口的方法。由于删除操作会改变队列结构，所以要进行调整；又由于删除元素的位置可能是任意的，所以调整过程比其它方法稍加繁琐。</p><p>具体来说，<code>remove(Object o)</code>可以分为 2 种情况：</p><ol><li>删除的是最后一个元素。直接删除即可，不需要调整。</li><li>删除的不是最后一个元素，从删除点开始以最后一个元素为参照调用一次<code>siftDown()</code>即可。此处不再赘述。</li></ol><img src="https://pics.yujieliu.com/blog/2023/11/6267899139da55e611f81291fe8200df.png" alt="img" style="zoom:50%;"><p>具体代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>//remove(Object o)
public boolean remove(Object o) {
  //通过遍历数组的方式找到第一个满足o.equals(queue[i])元素的下标
    int i = indexOf(o);
    if (i == -1)
        return false;
    int s = --size;
    if (s == i) //情况1
        queue[i] = null;
    else {
        E moved = (E) queue[s];
        queue[s] = null;
        siftDown(i, moved);//情况2
        ......
    }
    return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32),f={href:"https://javabetter.cn/collection/PriorityQueue.html",target:"_blank",rel:"noopener noreferrer"};function y(w,x){const e=t("RouterLink"),c=t("ExternalLinkIcon");return l(),u("div",null,[d,v,k,n("ul",null,[n("li",null,[a(e,{to:"/blogs/algorithm/sorting/heapsort.html"},{default:i(()=>[s("堆排序")]),_:1}),s(" 介绍")])]),m,n("ul",null,[b,g,n("li",null,[s("详细可以参考 "),a(e,{to:"/blogs/java/java-collection/comparator-comparable-interface.html"},{default:i(()=>[s("Comparator 和 Comparable 接口")]),_:1})])]),h,n("p",null,[s("参考："),n("a",f,[s("Reference"),a(c)])])])}const j=p(r,[["render",y],["__file","priority-queue.html.vue"]]);export{j as default};
