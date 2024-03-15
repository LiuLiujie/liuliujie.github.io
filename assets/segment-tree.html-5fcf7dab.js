import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as r,d as s}from"./app-9e8a13db.js";const a={},i=s('<h1 id="segment-tree-线段树" tabindex="-1"><a class="header-anchor" href="#segment-tree-线段树" aria-hidden="true">#</a> Segment Tree 线段树</h1><p><strong>线段树解决的是「区间和」的问题，且该「区间」会被修改</strong></p><p>一个区间的例子是对于 <code>nums = [1, 2, 3, 4, 5]</code> 多次求某些区间的和，是不是首先想到了利用「前缀和」。</p><p>但是如果 nums 会被修改呢？比如：</p><ul><li>把第 i 个元素修改成 x</li><li>把第 i 个元素增加 x</li><li>把区间 [i, j] 内的元素都增加 x</li></ul><p>此时，如果我们再使用「前缀和」，就没那么高效了。因为每一次更新，前缀和数组必须也随之更新，时间复杂度为 O(n)。</p><p>既然「前缀和」在这种场景下没那么高效了，所以就有了今天要介绍的「线段树」</p><h2 id="线段树" tabindex="-1"><a class="header-anchor" href="#线段树" aria-hidden="true">#</a> 线段树</h2><p><code>nums = [1, 2, 3, 4, 5]</code> 对应的线段树如下所示：</p><p><img src="https://pics.yujieliu.com/blog/2023/12/82f9d0abdfd33a6d190c5b27b2985507.svg" alt="1.svg"></p>',10),n=[i];function c(o,d){return t(),r("div",null,n)}const h=e(a,[["render",c],["__file","segment-tree.html.vue"]]);export{h as default};