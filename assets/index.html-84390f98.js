const e=JSON.parse(`{"key":"v-f2cd4b5e","path":"/blogs/java/JavaIO/","title":"Java IO体系（BIO、NIO、AIO）","lang":"en-US","frontmatter":{"category":"Computer Science, Programming Language","tag":["Java","Java IO"],"description":"Java IO体系（BIO、NIO、AIO） 分为BIO，NIO，AIO三种 Java 传统IO (Blocking IO) 传统 IO 基于字节流或字符流（如 FileInputStream、BufferedReader 等）进行文件读写，以及使用Socket 和 ServerSocket 进行网络传输。 传统 IO 采用阻塞式模型，对于每个连接，都需要创建一个独立的线程来处理读写操作。当一个线程在等待 I/O 操作时，无法执行其他任务。这会导致大量线程的创建和销毁，以及上下文切换，降低了系统性能。 因此传统IO也被称为BIO（Blocking IO）。","head":[["meta",{"property":"og:url","content":"https://blog.yujieliu.com/blogs/java/JavaIO/"}],["meta",{"property":"og:site_name","content":"Yujie's blog"}],["meta",{"property":"og:title","content":"Java IO体系（BIO、NIO、AIO）"}],["meta",{"property":"og:description","content":"Java IO体系（BIO、NIO、AIO） 分为BIO，NIO，AIO三种 Java 传统IO (Blocking IO) 传统 IO 基于字节流或字符流（如 FileInputStream、BufferedReader 等）进行文件读写，以及使用Socket 和 ServerSocket 进行网络传输。 传统 IO 采用阻塞式模型，对于每个连接，都需要创建一个独立的线程来处理读写操作。当一个线程在等待 I/O 操作时，无法执行其他任务。这会导致大量线程的创建和销毁，以及上下文切换，降低了系统性能。 因此传统IO也被称为BIO（Blocking IO）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-11-25T09:26:15.000Z"}],["meta",{"property":"article:author","content":"Yujie Liu"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Java IO"}],["meta",{"property":"article:modified_time","content":"2023-11-25T09:26:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java IO体系（BIO、NIO、AIO）\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-25T09:26:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yujie Liu\\",\\"url\\":\\"https://blog.yujieliu.com/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"Java 传统IO (Blocking IO)","slug":"java-传统io-blocking-io","link":"#java-传统io-blocking-io","children":[]},{"level":2,"title":"Java NIO (Non-blocking IO)","slug":"java-nio-non-blocking-io","link":"#java-nio-non-blocking-io","children":[]},{"level":2,"title":"Java AIO (Asynchronous IO)","slug":"java-aio-asynchronous-io","link":"#java-aio-asynchronous-io","children":[]}],"git":{"createdTime":1700904375000,"updatedTime":1700904375000,"contributors":[{"name":"Yujie","email":"yujie.liu.public@gmail.com","commits":1}]},"readingTime":{"minutes":1.8,"words":539},"filePathRelative":"blogs/java/JavaIO/README.md","localizedDate":"November 25, 2023","excerpt":"<h1> Java IO体系（BIO、NIO、AIO）</h1>\\n<p>分为BIO，NIO，AIO三种</p>\\n<h2> Java 传统IO (Blocking IO)</h2>\\n<p>传统 IO 基于字节流或字符流（如 FileInputStream、BufferedReader 等）进行文件读写，以及使用Socket 和 ServerSocket 进行网络传输。</p>\\n<p>传统 IO 采用阻塞式模型，对于每个连接，都需要创建一个独立的线程来处理读写操作。当一个线程在等待 I/O 操作时，无法执行其他任务。这会导致大量线程的创建和销毁，以及上下文切换，降低了系统性能。</p>\\n<p>因此传统IO也被称为BIO（Blocking IO）。</p>","autoDesc":true}`);export{e as data};
