import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as l,c as i,a as s,b as n,e,w as u,d as t}from"./app-9e8a13db.js";const r={},d=s("h1",{id:"dichotomy-二分法",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#dichotomy-二分法","aria-hidden":"true"},"#"),n(" Dichotomy 二分法")],-1),k={id:"t2300-咒语和药水的成功对数",tabindex:"-1"},v=s("a",{class:"header-anchor",href:"#t2300-咒语和药水的成功对数","aria-hidden":"true"},"#",-1),m={href:"https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/",target:"_blank",rel:"noopener noreferrer"},b=t(`<p>给你两个正整数数组 <code>spells</code> 和 <code>potions</code> ，长度分别为 <code>n</code> 和 <code>m</code> ，其中 <code>spells[i]</code> 表示第 <code>i</code> 个咒语的能量强度，<code>potions[j]</code> 表示第 <code>j</code> 瓶药水的能量强度。</p><p>同时给你一个整数 <code>success</code> 。一个咒语和药水的能量强度 <strong>相乘</strong> 如果 <strong>大于等于</strong> <code>success</code> ，那么它们视为一对 <strong>成功</strong> 的组合。</p><p>请你返回一个长度为 <code>n</code> 的整数数组 <code>pairs</code>，其中 <code>pairs[i]</code> 是能跟第 <code>i</code> 个咒语成功组合的 <strong>药水</strong> 数目。</p><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：spells = [5,1,3], potions = [1,2,3,4,5], success = 7
输出：[4,0,3]
解释：
- 第 0 个咒语：5 * [1,2,3,4,5] = [5,10,15,20,25] 。总共 4 个成功组合。
- 第 1 个咒语：1 * [1,2,3,4,5] = [1,2,3,4,5] 。总共 0 个成功组合。
- 第 2 个咒语：3 * [1,2,3,4,5] = [3,6,9,12,15] 。总共 3 个成功组合。
所以返回 [4,0,3] 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：spells = [3,1,2], potions = [8,5,8], success = 16
输出：[2,0,2]
解释：
- 第 0 个咒语：3 * [8,5,8] = [24,15,24] 。总共 2 个成功组合。
- 第 1 个咒语：1 * [8,5,8] = [8,5,8] 。总共 0 个成功组合。
- 第 2 个咒语：2 * [8,5,8] = [16,10,16] 。总共 2 个成功组合。
所以返回 [2,0,2] 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>n == spells.length</code></li><li><code>m == potions.length</code></li><li><code>1 &lt;= n, m &lt;= 105</code></li><li><code>1 &lt;= spells[i], potions[i] &lt;= 105</code></li><li><code>1 &lt;= success &lt;= 1010</code></li></ul><h4 id="我的答案" tabindex="-1"><a class="header-anchor" href="#我的答案" aria-hidden="true">#</a> 我的答案</h4><p>看题目规模乘出来是超过int的大小的，因此得用long。</p><p>也可以用除法，先把药水排序，然后根据<code>success</code>和咒语相除找出一个满足药水的最小值，然后用二分法从药水中找到位置。</p>`,12),h=t(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">successfulPairs</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> spells<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> potions<span class="token punctuation">,</span> <span class="token keyword">long</span> success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> n <span class="token operator">=</span> spells<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">int</span> m <span class="token operator">=</span> potions<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>potions<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> results <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">long</span> threadshold <span class="token operator">=</span> <span class="token punctuation">(</span>success <span class="token operator">+</span> spells<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> spells<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
            results<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> m <span class="token operator">-</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span>potions<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> m<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> threadshold<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> results<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//Find the number that is larger than the threadshold</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> potions<span class="token punctuation">,</span> <span class="token keyword">int</span> low<span class="token punctuation">,</span> <span class="token keyword">int</span> high<span class="token punctuation">,</span> <span class="token keyword">long</span> threadshold<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> res <span class="token operator">=</span> high <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>low <span class="token operator">&lt;=</span> high<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> low <span class="token operator">+</span> <span class="token punctuation">(</span>high<span class="token operator">-</span>low<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>potions<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&gt;</span> threadshold<span class="token punctuation">)</span><span class="token punctuation">{</span>
                res <span class="token operator">=</span> mid<span class="token punctuation">;</span>
                high <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                low <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function g(w,y){const o=a("ExternalLinkIcon"),p=a("RouterLink");return l(),i("div",null,[d,s("h3",k,[v,n(" T2300. "),s("a",m,[n("咒语和药水的成功对数"),e(o)])]),b,s("p",null,[n("这题也可以用"),e(p,{to:"/blogs/algorithm/two-pointers.html"},{default:u(()=>[n("双指针")]),_:1}),n("的方法来解。")]),h])}const x=c(r,[["render",g],["__file","dichotomy.html.vue"]]);export{x as default};
