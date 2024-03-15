import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,d as n}from"./app-9e8a13db.js";const s={},l=n(`<h1 id="jvm监控" tabindex="-1"><a class="header-anchor" href="#jvm监控" aria-hidden="true">#</a> JVM监控</h1><p>首先使用top命令获取需要监控的或异常java线程的pid</p><h2 id="jstat" tabindex="-1"><a class="header-anchor" href="#jstat" aria-hidden="true">#</a> jstat</h2><p>获取jvm的基本信息，如GC，内存等</p><ul><li>获取GC信息：<code>jstat -gc &lt;pid&gt;</code><ul><li>YGC和YGCT是young GC次数和时间</li><li>FGC和FGCT是full GC的次数和时间</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    S0C         S1C         S0U         S1U          EC           EU           OC           OU          MC         MU       CCSC      CCSU     YGC     YGCT     FGC    FGCT     CGC    CGCT       GCT   
        0,0      4096,0         0,0      3193,3      45056,0      24576,0      49152,0      20021,5    36416,0    36022,4    5248,0    5050,4      7     0,017     0     0,000     4     0,002     0,020
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jmap" tabindex="-1"><a class="header-anchor" href="#jmap" aria-hidden="true">#</a> jmap</h2><p>Jmap是打印堆中信息常用：一般在内存不足，GC异常等情况下，我们会去怀疑内存泄漏，这个时候就会去打印堆Dump。</p><ul><li>查看堆中对象和内存大小：<code>jmap -histo &lt;pid&gt;</code></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> num     #instances         #bytes  class name (module)
-------------------------------------------------------
   1:        123101       18162456  [B (java.base@17.0.9)
   2:         13959        8537656  [I (java.base@17.0.9)
   3:         88472        2123328  java.lang.String (java.base@17.0.9)
   4:         19122        1682736  java.lang.reflect.Method (java.base@17.0.9)
   5:          9949        1176896  java.lang.Class (java.base@17.0.9)
   6:         45671         996520  [Ljava.lang.Class; (java.base@17.0.9)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),d=[l];function t(r,c){return e(),i("div",null,d)}const m=a(s,[["render",t],["__file","jvm-monitor.html.vue"]]);export{m as default};
