const n=JSON.parse(`{"key":"v-d0b8cb32","path":"/blogs/java/concurrency/three-ways-for-creating-thread.html","title":"创建并控制线程的三种方式","lang":"en-US","frontmatter":{"description":"创建并控制线程的三种方式 创建方式 1. 继承 Thread 类，重写run方法 public class MyThread extends Thread { @Override public void run() { for (int i = 0; i &lt; 100; i++) { System.out.println(\\"Thread: \\" + getName()); } } }","head":[["meta",{"property":"og:url","content":"https://blog.yujieliu.com/blogs/java/concurrency/three-ways-for-creating-thread.html"}],["meta",{"property":"og:site_name","content":"Yujie's blog"}],["meta",{"property":"og:title","content":"创建并控制线程的三种方式"}],["meta",{"property":"og:description","content":"创建并控制线程的三种方式 创建方式 1. 继承 Thread 类，重写run方法 public class MyThread extends Thread { @Override public void run() { for (int i = 0; i &lt; 100; i++) { System.out.println(\\"Thread: \\" + getName()); } } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-03-15T17:45:22.000Z"}],["meta",{"property":"article:author","content":"Yujie Liu"}],["meta",{"property":"article:modified_time","content":"2024-03-15T17:45:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"创建并控制线程的三种方式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-15T17:45:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yujie Liu\\",\\"url\\":\\"https://blog.yujieliu.com/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"创建方式","slug":"创建方式","link":"#创建方式","children":[{"level":3,"title":"1. 继承 Thread 类，重写run方法","slug":"_1-继承-thread-类-重写run方法","link":"#_1-继承-thread-类-重写run方法","children":[]},{"level":3,"title":"2. 实现 Runnable 接口，重写run方法","slug":"_2-实现-runnable-接口-重写run方法","link":"#_2-实现-runnable-接口-重写run方法","children":[]},{"level":3,"title":"3. 实现 Callable 接口，重写 call 方法，通过 FutureTask 获取任务执行的返回值","slug":"_3-实现-callable-接口-重写-call-方法-通过-futuretask-获取任务执行的返回值","link":"#_3-实现-callable-接口-重写-call-方法-通过-futuretask-获取任务执行的返回值","children":[]}]},{"level":2,"title":"控制线程的方法","slug":"控制线程的方法","link":"#控制线程的方法","children":[{"level":3,"title":"1. run 方法和 start 方法","slug":"_1-run-方法和-start-方法","link":"#_1-run-方法和-start-方法","children":[]},{"level":3,"title":"2. sleep方法","slug":"_2-sleep方法","link":"#_2-sleep方法","children":[]},{"level":3,"title":"3. join和yield方法","slug":"_3-join和yield方法","link":"#_3-join和yield方法","children":[]},{"level":3,"title":"4. setDaemon","slug":"_4-setdaemon","link":"#_4-setdaemon","children":[]}]},{"level":2,"title":"Q&A","slug":"q-a","link":"#q-a","children":[{"level":3,"title":"1. 继承 Thread 的方法和实现 Runnable 接口的方式创建多线程，哪个好？","slug":"_1-继承-thread-的方法和实现-runnable-接口的方式创建多线程-哪个好","link":"#_1-继承-thread-的方法和实现-runnable-接口的方式创建多线程-哪个好","children":[]}]}],"git":{"createdTime":1710524722000,"updatedTime":1710524722000,"contributors":[{"name":"Jeff Liu","email":"47711081+LiuLiujie@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.57,"words":772},"filePathRelative":"blogs/java/concurrency/three-ways-for-creating-thread.md","localizedDate":"March 15, 2024","excerpt":"<h1> 创建并控制线程的三种方式</h1>\\n<h2> 创建方式</h2>\\n<h3> 1. 继承 Thread 类，重写run方法</h3>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">MyThread</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Thread</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token annotation punctuation\\">@Override</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">run</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">100</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Thread: \\"</span> <span class=\\"token operator\\">+</span> <span class=\\"token function\\">getName</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};