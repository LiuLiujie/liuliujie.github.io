const e=JSON.parse(`{"key":"v-30e3d57b","path":"/blogs/hpc/cuda-tutorial-chinese/shared-memory-bank.html","title":"CUDA Shared Memory Bank","lang":"en-US","frontmatter":{"category":"Computer Science","tag":["CUDA","GPGPU"],"description":"CUDA Shared Memory Bank 注：本文中内存在硬件上指的是显存。 Memory Bank性质 为了提高内存并发利用率，共享内存（Shared Memory）被抽象划分为一个个相同大小的“内存模块”，该“内存模块”具有以下性质： 单个“内存模块”内的内存只能被内核（Kernel）内同一个Warp中的线程序列化访问（一次一个线程访问一个地址）； 不同“内存模块”的内存可以被内核同时访问。 这个“内存模块”被称为Memory Bank（以下Bank）。因此，如果有n个内存地址指向n个不同的Bank，则这n个地址可以被同时访问，理论上带宽利用率也就是访问单个Bank的n倍。","head":[["meta",{"property":"og:url","content":"https://blog.yujieliu.com/blogs/hpc/cuda-tutorial-chinese/shared-memory-bank.html"}],["meta",{"property":"og:site_name","content":"Yujie's blog"}],["meta",{"property":"og:title","content":"CUDA Shared Memory Bank"}],["meta",{"property":"og:description","content":"CUDA Shared Memory Bank 注：本文中内存在硬件上指的是显存。 Memory Bank性质 为了提高内存并发利用率，共享内存（Shared Memory）被抽象划分为一个个相同大小的“内存模块”，该“内存模块”具有以下性质： 单个“内存模块”内的内存只能被内核（Kernel）内同一个Warp中的线程序列化访问（一次一个线程访问一个地址）； 不同“内存模块”的内存可以被内核同时访问。 这个“内存模块”被称为Memory Bank（以下Bank）。因此，如果有n个内存地址指向n个不同的Bank，则这n个地址可以被同时访问，理论上带宽利用率也就是访问单个Bank的n倍。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-11-25T09:26:15.000Z"}],["meta",{"property":"article:author","content":"Yujie Liu"}],["meta",{"property":"article:tag","content":"CUDA"}],["meta",{"property":"article:tag","content":"GPGPU"}],["meta",{"property":"article:modified_time","content":"2023-11-25T09:26:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CUDA Shared Memory Bank\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-25T09:26:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yujie Liu\\",\\"url\\":\\"https://blog.yujieliu.com/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"Memory Bank性质","slug":"memory-bank性质","link":"#memory-bank性质","children":[]},{"level":2,"title":"Memory Bank映射","slug":"memory-bank映射","link":"#memory-bank映射","children":[]},{"level":2,"title":"Memory Bank冲突","slug":"memory-bank冲突","link":"#memory-bank冲突","children":[]}],"git":{"createdTime":1700904375000,"updatedTime":1700904375000,"contributors":[{"name":"Yujie","email":"yujie.liu.public@gmail.com","commits":1}]},"readingTime":{"minutes":1.97,"words":590},"filePathRelative":"blogs/hpc/cuda-tutorial-chinese/shared-memory-bank.md","localizedDate":"November 25, 2023","excerpt":"<h1> CUDA Shared Memory Bank</h1>\\n<p>注：本文中内存在硬件上指的是显存。</p>\\n<h2> Memory Bank性质</h2>\\n<p>为了提高内存并发利用率，共享内存（Shared Memory）被抽象划分为一个个相同大小的“内存模块”，该“内存模块”具有以下性质：</p>\\n<ul>\\n<li>单个“内存模块”内的内存只能被内核（Kernel）内同一个Warp中的线程序列化访问（一次一个线程访问一个地址）；</li>\\n<li>不同“内存模块”的内存可以被内核同时访问。</li>\\n</ul>\\n<p>这个“内存模块”被称为Memory Bank（以下Bank）。因此，如果有n个内存地址指向n个不同的Bank，则这n个地址可以被同时访问，理论上带宽利用率也就是访问单个Bank的n倍。</p>","autoDesc":true}`);export{e as data};