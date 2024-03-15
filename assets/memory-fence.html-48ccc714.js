const e=JSON.parse(`{"key":"v-0752b054","path":"/blogs/hpc/cuda-tutorial-chinese/memory-fence.html","title":"Memory Fence","lang":"en-US","frontmatter":{"category":"Computer Science","tag":["CUDA","GPGPU"],"description":"Memory Fence 问题产生 提问：以下代码每个函数各由一个线程运行，AB有几种组合？ __device__ int X = 1, Y = 2; __device__ void writeXY() { X = 10; Y = 20; } __device__ void readXY() { int B = Y; int A = X; }","head":[["meta",{"property":"og:url","content":"https://blog.yujieliu.com/blogs/hpc/cuda-tutorial-chinese/memory-fence.html"}],["meta",{"property":"og:site_name","content":"Yujie's blog"}],["meta",{"property":"og:title","content":"Memory Fence"}],["meta",{"property":"og:description","content":"Memory Fence 问题产生 提问：以下代码每个函数各由一个线程运行，AB有几种组合？ __device__ int X = 1, Y = 2; __device__ void writeXY() { X = 10; Y = 20; } __device__ void readXY() { int B = Y; int A = X; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-11-25T09:26:15.000Z"}],["meta",{"property":"article:author","content":"Yujie Liu"}],["meta",{"property":"article:tag","content":"CUDA"}],["meta",{"property":"article:tag","content":"GPGPU"}],["meta",{"property":"article:modified_time","content":"2023-11-25T09:26:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Memory Fence\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-25T09:26:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yujie Liu\\",\\"url\\":\\"https://blog.yujieliu.com/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"问题产生","slug":"问题产生","link":"#问题产生","children":[]},{"level":2,"title":"Fence函数","slug":"fence函数","link":"#fence函数","children":[]},{"level":2,"title":"例子","slug":"例子","link":"#例子","children":[]},{"level":2,"title":"与同步函数的区别","slug":"与同步函数的区别","link":"#与同步函数的区别","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1700904375000,"updatedTime":1700904375000,"contributors":[{"name":"Yujie","email":"yujie.liu.public@gmail.com","commits":1}]},"readingTime":{"minutes":3.26,"words":978},"filePathRelative":"blogs/hpc/cuda-tutorial-chinese/memory-fence.md","localizedDate":"November 25, 2023","excerpt":"<h1> Memory Fence</h1>\\n<h2> 问题产生</h2>\\n<p>提问：以下代码每个函数各由一个线程运行，AB有几种组合？</p>\\n<div class=\\"language-C line-numbers-mode\\" data-ext=\\"C\\"><pre class=\\"language-C\\"><code>__device__ int X = 1, Y = 2;\\n\\n__device__ void writeXY()\\n{\\n    X = 10;\\n    Y = 20;\\n}\\n\\n__device__ void readXY()\\n{\\n    int B = Y;\\n    int A = X;\\n}\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{e as data};
