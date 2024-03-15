const t=JSON.parse(`{"key":"v-1c80c14f","path":"/blogs/java/jvm/jvm-monitor.html","title":"JVM监控","lang":"en-US","frontmatter":{"description":"JVM监控 首先使用top命令获取需要监控的或异常java线程的pid jstat 获取jvm的基本信息，如GC，内存等 获取GC信息：jstat -gc &lt;pid&gt; YGC和YGCT是young GC次数和时间 FGC和FGCT是full GC的次数和时间 S0C S1C S0U S1U EC EU OC OU MC MU CCSC CCSU YGC YGCT FGC FGCT CGC CGCT GCT 0,0 4096,0 0,0 3193,3 45056,0 24576,0 49152,0 20021,5 36416,0 36022,4 5248,0 5050,4 7 0,017 0 0,000 4 0,002 0,020","head":[["meta",{"property":"og:url","content":"https://blog.yujieliu.com/blogs/java/jvm/jvm-monitor.html"}],["meta",{"property":"og:site_name","content":"Yujie's blog"}],["meta",{"property":"og:title","content":"JVM监控"}],["meta",{"property":"og:description","content":"JVM监控 首先使用top命令获取需要监控的或异常java线程的pid jstat 获取jvm的基本信息，如GC，内存等 获取GC信息：jstat -gc &lt;pid&gt; YGC和YGCT是young GC次数和时间 FGC和FGCT是full GC的次数和时间 S0C S1C S0U S1U EC EU OC OU MC MU CCSC CCSU YGC YGCT FGC FGCT CGC CGCT GCT 0,0 4096,0 0,0 3193,3 45056,0 24576,0 49152,0 20021,5 36416,0 36022,4 5248,0 5050,4 7 0,017 0 0,000 4 0,002 0,020"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-03-15T17:45:22.000Z"}],["meta",{"property":"article:author","content":"Yujie Liu"}],["meta",{"property":"article:modified_time","content":"2024-03-15T17:45:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JVM监控\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-15T17:45:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yujie Liu\\",\\"url\\":\\"https://blog.yujieliu.com/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"jstat","slug":"jstat","link":"#jstat","children":[]},{"level":2,"title":"jmap","slug":"jmap","link":"#jmap","children":[]}],"git":{"createdTime":1710524722000,"updatedTime":1710524722000,"contributors":[{"name":"Jeff Liu","email":"47711081+LiuLiujie@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":0.73,"words":220},"filePathRelative":"blogs/java/jvm/jvm-monitor.md","localizedDate":"March 15, 2024","excerpt":"<h1> JVM监控</h1>\\n<p>首先使用top命令获取需要监控的或异常java线程的pid</p>\\n<h2> jstat</h2>\\n<p>获取jvm的基本信息，如GC，内存等</p>\\n<ul>\\n<li>获取GC信息：<code>jstat -gc &lt;pid&gt;</code>\\n<ul>\\n<li>YGC和YGCT是young GC次数和时间</li>\\n<li>FGC和FGCT是full GC的次数和时间</li>\\n</ul>\\n</li>\\n</ul>\\n<div class=\\"language-text line-numbers-mode\\" data-ext=\\"text\\"><pre class=\\"language-text\\"><code>    S0C         S1C         S0U         S1U          EC           EU           OC           OU          MC         MU       CCSC      CCSU     YGC     YGCT     FGC    FGCT     CGC    CGCT       GCT   \\n        0,0      4096,0         0,0      3193,3      45056,0      24576,0      49152,0      20021,5    36416,0    36022,4    5248,0    5050,4      7     0,017     0     0,000     4     0,002     0,020\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{t as data};
