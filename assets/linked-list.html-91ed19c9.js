import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c as i,a as n,b as s,e,w as u,d as a}from"./app-9e8a13db.js";const d={},r=a(`<h1 id="linked-list-链表" tabindex="-1"><a class="header-anchor" href="#linked-list-链表" aria-hidden="true">#</a> Linked List 链表</h1><p>单项链表实现</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ListNode</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> val<span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> next<span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val<span class="token punctuation">;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),k={id:"t206-反转链表",tabindex:"-1"},v=n("a",{class:"header-anchor",href:"#t206-反转链表","aria-hidden":"true"},"#",-1),m={href:"https://leetcode.cn/problems/reverse-linked-list/",target:"_blank",rel:"noopener noreferrer"},b=a(`<p>给你单链表的头节点 <code>head</code> ，请你反转链表，并返回反转后的链表。</p><p><strong>示例 1：</strong></p><p><img src="https://pics.yujieliu.com/blog/2023/11/8b0649aa598ae8cd0c216dadf10dcacb.jpg" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><p><img src="https://pics.yujieliu.com/blog/2023/11/1375575844c5915d9933eb80dcac79ed.jpg" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：head = [1,2]
输出：[2,1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：head = []
输出：[]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li>链表中节点的数目范围是 <code>[0, 5000]</code></li><li><code>-5000 &lt;= Node.val &lt;= 5000</code></li></ul><p>**进阶：**链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？</p><h4 id="solution-迭代" tabindex="-1"><a class="header-anchor" href="#solution-迭代" aria-hidden="true">#</a> Solution：迭代</h4><p>使用三个pre，cur，next指针，分别记录上一个节点，本节点，下一个节点。</p><p>迭代每一个节点：先用next指向cur的下一个节点，然后把cur的下一个节点指向pre，最后再把pre指向cur，cur指向next。</p><p>当cur到null时，表明已经是末尾了，返回pre即为最后（也是翻转后的第一个）节点</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> pre <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> cur <span class="token operator">=</span> head<span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> next <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> pre<span class="token punctuation">;</span>
            pre <span class="token operator">=</span> cur<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> pre<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-递归" tabindex="-1"><a class="header-anchor" href="#solution-递归" aria-hidden="true">#</a> Solution：递归</h4><p>递归也有两种解法：</p><ul><li><p>一种是返回翻转后链表的新的头部，然后把自身的后继节点的指针指向自己，自己指向空来完成翻转，再继续返回头部。</p></li><li><p>一种是返回翻转后链表的新的尾部，不停返回新链表的尾部，再把自身插入尾部构成新的尾部，这样需要一个额外的递归参数来保存新的头部。</p></li></ul><h5 id="第一种-返回新链表的头部" tabindex="-1"><a class="header-anchor" href="#第一种-返回新链表的头部" aria-hidden="true">#</a> 第一种：返回新链表的头部</h5><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ListNode</span> newHead <span class="token operator">=</span> <span class="token function">recurison</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> newHead<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">ListNode</span> <span class="token function">recurison</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> cur<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cur<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> cur<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//获取到新的头部</span>
        <span class="token class-name">ListNode</span> newHead <span class="token operator">=</span> <span class="token function">recurison</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//把自身后继节点的指针指向自己，完成翻转</span>
        <span class="token class-name">ListNode</span> nextNode <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        nextNode<span class="token punctuation">.</span>next <span class="token operator">=</span> cur<span class="token punctuation">;</span>

        <span class="token comment">//再把自身的指针删掉</span>
        cur<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> newHead<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="第二种-返回新链表的尾部" tabindex="-1"><a class="header-anchor" href="#第二种-返回新链表的尾部" aria-hidden="true">#</a> 第二种：返回新链表的尾部</h5><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ListNode</span> newHead <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> newTail <span class="token operator">=</span> <span class="token function">recurison</span><span class="token punctuation">(</span>head<span class="token punctuation">,</span> newHead<span class="token punctuation">)</span><span class="token punctuation">;</span>
        newTail<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token comment">//新链表尾部要指向空，否则会形成环</span>
        <span class="token keyword">return</span> newHead<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">ListNode</span> <span class="token function">recurison</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> node<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> newHead<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            newHead<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
            <span class="token keyword">return</span> node<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ListNode</span> nextNode <span class="token operator">=</span> <span class="token function">recurison</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>next<span class="token punctuation">,</span> newHead<span class="token punctuation">)</span><span class="token punctuation">;</span>
      	
      	<span class="token comment">//把新的尾部指向自己，这样自己就是新的尾部</span>
        nextNode<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">return</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),h={id:"t25-k-个一组翻转链表",tabindex:"-1"},g=n("a",{class:"header-anchor",href:"#t25-k-个一组翻转链表","aria-hidden":"true"},"#",-1),w={href:"https://leetcode.cn/problems/reverse-nodes-in-k-group/",target:"_blank",rel:"noopener noreferrer"},x=a(`<p>给你链表的头节点 <code>head</code> ，每 <code>k</code> 个节点一组进行翻转，请你返回修改后的链表。</p><p><code>k</code> 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 <code>k</code> 的整数倍，那么请将最后剩余的节点保持原有顺序。</p><p>你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。</p><p><strong>示例 1：</strong></p><p><img src="https://pics.yujieliu.com/blog/2023/11/eb95af95ec2282c1bb1d508cdb67adea.jpg" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><p><img src="https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li>链表中的节点数目为 <code>n</code></li><li><code>1 &lt;= k &lt;= n &lt;= 5000</code></li><li><code>0 &lt;= Node.val &lt;= 1000</code></li></ul><p>**进阶：**你可以设计一个只用 <code>O(1)</code> 额外内存空间的算法解决此问题吗？</p><h4 id="solution" tabindex="-1"><a class="header-anchor" href="#solution" aria-hidden="true">#</a> Solution</h4><p>我们可以对每k个小的片段复用上面题目所设计的翻转链表，然后连起来即可</p><p>因此需要保留的数据有</p><ul><li>上一个片段的最后一个元素<code>lastSegEnd</code>，用于连接本片段翻转后的第一个元素</li><li>下一个片段的第一个元素<code>nextSegStart</code>，用于本片段最后一个元素连接下一个片段</li></ul><p>由于第一个片段不存在 <code>lastSegEnd</code>因此设计一个 <code>dummyLastSegEnd</code>指向这个片段</p><p>循环结束的条件是，不存在下一个片段了，或者下一个片段没有k个node</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseKGroup</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummyLastSegEnd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ListNode</span> lastSegEnd <span class="token operator">=</span> dummyLastSegEnd<span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> start <span class="token operator">=</span> lastSegEnd<span class="token punctuation">.</span>next<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>start<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> end <span class="token operator">=</span> lastSegEnd<span class="token punctuation">;</span>
        <span class="token comment">//Move the end pointer to the end of the segment</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>end<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">//When reach the end of the linked list, return</span>
                <span class="token keyword">return</span> dummyLastSegEnd<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            end <span class="token operator">=</span> end<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//Record the head of the next segment</span>
        <span class="token class-name">ListNode</span> nextSegStart <span class="token operator">=</span> end<span class="token punctuation">.</span>next<span class="token punctuation">;</span>

        <span class="token comment">//Reverse the segment</span>
        end<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> newStart <span class="token operator">=</span> <span class="token function">reverseList</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">;</span>
      	<span class="token class-name">ListNode</span> newEnd <span class="token operator">=</span> start<span class="token punctuation">;</span>

        <span class="token comment">//Connect the two segment</span>
        lastSegEnd<span class="token punctuation">.</span>next <span class="token operator">=</span> newStart<span class="token punctuation">;</span> <span class="token comment">// This seg to pre seg</span>
        newEnd<span class="token punctuation">.</span>next <span class="token operator">=</span> nextSegStart<span class="token punctuation">;</span> <span class="token comment">// This seg to next seg</span>

        <span class="token comment">//Move to the nextSegment</span>
        lastSegEnd <span class="token operator">=</span> newEnd<span class="token punctuation">;</span>
        start <span class="token operator">=</span> nextSegStart<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummyLastSegEnd<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> pre <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> cur <span class="token operator">=</span> head<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> next <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        cur<span class="token punctuation">.</span>next <span class="token operator">=</span> pre<span class="token punctuation">;</span>
        pre <span class="token operator">=</span> cur<span class="token punctuation">;</span>
        cur <span class="token operator">=</span> next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> pre<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),y={id:"t23-合并-k-个升序链表",tabindex:"-1"},f=n("a",{class:"header-anchor",href:"#t23-合并-k-个升序链表","aria-hidden":"true"},"#",-1),L={href:"https://leetcode.cn/problems/merge-k-sorted-lists/",target:"_blank",rel:"noopener noreferrer"},N=a(`<p>给你一个链表数组，每个链表都已经按升序排列。</p><p>请你将所有链表合并到一个升序链表中，返回合并后的链表。</p><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1-&gt;4-&gt;5,
  1-&gt;3-&gt;4,
  2-&gt;6
]
将它们合并到一个有序链表中得到。
1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：lists = []
输出：[]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：lists = [[]]
输出：[]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>k == lists.length</code></li><li><code>0 &lt;= k &lt;= 10^4</code></li><li><code>0 &lt;= lists[i].length &lt;= 500</code></li><li><code>-10^4 &lt;= lists[i][j] &lt;= 10^4</code></li><li><code>lists[i]</code> 按 <strong>升序</strong> 排列</li><li><code>lists[i].length</code> 的总和不超过 <code>10^4</code></li></ul><h4 id="solution-1" tabindex="-1"><a class="header-anchor" href="#solution-1" aria-hidden="true">#</a> Solution</h4>`,11),_=a(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">&gt;</span></span> cmp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> n1<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> n2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> n1<span class="token punctuation">.</span>val <span class="token operator">-</span> n2<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">mergeKLists</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span><span class="token punctuation">[</span><span class="token punctuation">]</span> lists<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">&gt;</span></span> prique <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>cmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> k <span class="token operator">=</span> lists<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token comment">//检查为空的情况</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>k<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//把每一个链表的非空头节点入队, 并检查是否有可能是空链表</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>lists<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                prique<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>lists<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>prique<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//记录首个节点</span>
        <span class="token class-name">ListNode</span> head <span class="token operator">=</span> prique<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            prique<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//出队最大节点，再将该节点的下一个非空节点入队，重复直到队列为空</span>
        <span class="token class-name">ListNode</span> temp <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>prique<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> cur <span class="token operator">=</span> prique<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            temp<span class="token punctuation">.</span>next <span class="token operator">=</span> cur<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>cur<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                prique<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            temp <span class="token operator">=</span> cur<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function S(j,E){const t=p("ExternalLinkIcon"),o=p("RouterLink");return l(),i("div",null,[r,n("h3",k,[v,s(" T206. "),n("a",m,[s("反转链表"),e(t)])]),b,n("h3",h,[g,s(" T25. "),n("a",w,[s("K 个一组翻转链表"),e(t)])]),x,n("h3",y,[f,s(" T23. "),n("a",L,[s("合并 K 个升序链表"),e(t)])]),N,n("p",null,[s("采用 "),e(o,{to:"/blogs/java/java-collection/priority-queue.html"},{default:u(()=>[s("优先队列")]),_:1}),s(" 来解题：每次将最小元素出队，然后把该元素链接的下一元素入队。")]),_])}const T=c(d,[["render",S],["__file","linked-list.html.vue"]]);export{T as default};
