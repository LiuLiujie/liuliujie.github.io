import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as s,c as i,a as e,b as a,e as n,d as h}from"./app-9e8a13db.js";const d={},l=h('<h1 id="cuda-shared-memory-bank" tabindex="-1"><a class="header-anchor" href="#cuda-shared-memory-bank" aria-hidden="true">#</a> CUDA Shared Memory Bank</h1><p>注：本文中内存在硬件上指的是显存。</p><h2 id="memory-bank性质" tabindex="-1"><a class="header-anchor" href="#memory-bank性质" aria-hidden="true">#</a> Memory Bank性质</h2><p>为了提高内存并发利用率，共享内存（Shared Memory）被抽象划分为一个个相同大小的“内存模块”，该“内存模块”具有以下性质：</p><ul><li>单个“内存模块”内的内存只能被内核（Kernel）内同一个Warp中的线程序列化访问（一次一个线程访问一个地址）；</li><li>不同“内存模块”的内存可以被内核同时访问。</li></ul><p>这个“内存模块”被称为Memory Bank（以下Bank）。因此，如果有n个内存地址指向n个不同的Bank，则这n个地址可以被同时访问，理论上带宽利用率也就是访问单个Bank的n倍。</p><p>但是，如果一个Warp内多个线程试图访问同一个Bank的<strong>多个内存地址</strong>，则该访问会被CUDA自动串行化以避免访问冲突，内存带宽利用率自然也就降低。例外是当同一个Warp中的线程访问同一个Bank内的<strong>同一个内存地址</strong>时，该访问会导致广播（Broadcast），多个广播会被聚合为一个多播（Multicast）从共享内存返回至内核线程。</p><h2 id="memory-bank映射" tabindex="-1"><a class="header-anchor" href="#memory-bank映射" aria-hidden="true">#</a> Memory Bank映射</h2>',8),m={href:"https://leimao.github.io/blog/CUDA-Shared-Memory-Bank/",target:"_blank",rel:"noopener noreferrer"},c=e("h2",{id:"memory-bank冲突",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#memory-bank冲突","aria-hidden":"true"},"#"),a(" Memory Bank冲突")],-1),k=e("p",null,[a("用户可能需要设置Memory Bank避免同一个Warp中的线程冲突访问Bank造成带宽效率降低。比如，假设数据类型为32bit的数构成的一个32列的矩阵，Bank的数目也为32个，则恰好每一列都会处于同一个Bank中，如此当一个Wrap中现成进行矩阵"),e("strong",null,"列读取"),a("时则不得不顺序进行，大大降低了读取效率。")],-1),p={href:"https://leimao.github.io/blog/CUDA-Shared-Memory-Bank/",target:"_blank",rel:"noopener noreferrer"};function B(_,b){const r=t("ExternalLinkIcon");return s(),i("div",null,[l,e("p",null,[a("不同GPU架构采用不同的映射方式，在计算能力（Compute Capability）为5.x或更新的设备上，每个Bank每个时钟周期的带宽为32位，因此连续的32-bit的内存被分配给连续的Bank。（即第一个32bit给Bank 0，第二个32bit给Bank 1）Warp的大小为32个线程，Bank的数量也是32个，因此Warp中的任何线程之间都可能发生Bank访问冲突。一个Bank内存映射例子（1D和2D）可以见"),e("a",m,[a("这篇文章"),n(r)]),a("。")]),c,k,e("p",null,[a("引用："),e("a",p,[a("here"),n(r)])])])}const f=o(d,[["render",B],["__file","shared-memory-bank.html.vue"]]);export{f as default};
