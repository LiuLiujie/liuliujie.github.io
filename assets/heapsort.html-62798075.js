import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as l,c as s,a as e,b as i,e as r,w as t,d as c}from"./app-9e8a13db.js";const u={},v=e("h1",{id:"heapsort-堆排序",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#heapsort-堆排序","aria-hidden":"true"},"#"),i(" Heapsort 堆排序")],-1),o=e("p",null,"堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。堆排序可以说是一种利用堆的概念来排序的选择排序。分为两种方法：",-1),m=e("ol",null,[e("li",null,"大顶堆：每个节点的值都大于或等于其子节点的值，在堆排序算法中用于升序排列；"),e("li",null,"小顶堆：每个节点的值都小于或等于其子节点的值，在堆排序算法中用于降序排列；")],-1),p=e("p",null,"堆排序的平均时间复杂度为 Ο(nlogn)。",-1),h=c(`<h2 id="完全二叉树表示堆" tabindex="-1"><a class="header-anchor" href="#完全二叉树表示堆" aria-hidden="true">#</a> 完全二叉树表示堆</h2><p>完全二叉树（Complete Binary Tree）是一种二叉树，其中除了最后一层，其他层的节点数都是满的，最后一层的节点都靠左对齐。下面是一个完全二叉树的示意图：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>        1
      /   \\
     2     3
    / \\   /
   4   5 6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>堆是一种完全二叉树，堆的特点是根节点的值最小（小顶堆）或最大（大顶堆），并且任意非根节点i的值都不大于（或不小于）其父节点的值。</p><p>这是一颗包含整数 1, 2, 3, 4, 5, 6, 7 的小顶堆：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>      1
     / \\
    2   3
   / \\ / \\
  4  5 6  7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一颗大顶堆。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>            8
          /   \\
         7     5
        / \\   / \\
       6   4 2   1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组存储堆元素" tabindex="-1"><a class="header-anchor" href="#数组存储堆元素" aria-hidden="true">#</a> 数组存储堆元素</h2><p>因为完全二叉树的结构比较规则，所以可以使用数组来存储堆的元素，而不需要使用指针等额外的空间。</p><p>在堆中，每个节点的下标和其在数组中的下标是一一对应的，假设节点下标为i，则有</p><ul><li>父节点下标为i/2</li><li>左子节点下标为2i，</li><li>右子节点下标为2i+1。</li></ul><h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h3><p>假设有一个数组arr=[10, 20, 15, 30, 40]，现在要将其转化为一个小顶堆。</p><p>首先，我们将数组按照完全二叉树的形式排列，如下图所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>      10
     /  \\
   20    15
  /  \\
30   40
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上往下、从左往右依次给每个节点编号，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>      1
     / \\
    2   3
   / \\
  4   5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们按照上述公式，依次确定每个节点在数组中的位置。例如，节点1的父节点下标为1/2=0，左子节点下标为2*1=2，右子节点下标为2*1+1=3，因此节点1在数组中的位置为0，节点2在数组中的位置为2，节点3在数组中的位置为3。</p><p>对应的数组为[10, 20, 15, 30, 40]，符合小顶堆的定义，即每个节点的值都小于或等于其子节点的值。</p>`,20);function b(x,_){const n=d("RouterLink");return l(),s("div",null,[v,o,m,p,e("ul",null,[e("li",null,[i("Java 的 "),r(n,{to:"/blogs/java/java-collection/priority-queue.html"},{default:t(()=>[i("PriorityQueue")]),_:1}),i(" 的实现方式就是堆排序。")])]),h])}const k=a(u,[["render",b],["__file","heapsort.html.vue"]]);export{k as default};
