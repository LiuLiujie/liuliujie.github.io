import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as l,c,a as i,b as e,e as a,d as s}from"./app-9e8a13db.js";const o={},t=s(`<h1 id="memory-fence" tabindex="-1"><a class="header-anchor" href="#memory-fence" aria-hidden="true">#</a> Memory Fence</h1><h2 id="问题产生" tabindex="-1"><a class="header-anchor" href="#问题产生" aria-hidden="true">#</a> 问题产生</h2><p>提问：以下代码每个函数各由一个线程运行，AB有几种组合？</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>__device__ int X = 1, Y = 2;

__device__ void writeXY()
{
    X = 10;
    Y = 20;
}

__device__ void readXY()
{
    int B = Y;
    int A = X;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答案是不确定。而且和GPU硬件调度有关。由于X和Y是声明在全局内存（Global Memory）中，如果这两个线程在同一个warp内，则warp本身的机制保证了warp内的线程对全局内存和共享内存的读写立即可见，因此只有(A=1, B=2)，(A=10, B=2)，(A=10,B=20)三种可能，(A=1, B=20)不可能的原因在于如果Y=20被执行完成了，则X=10也必定执行完成了，而warp保证了这种内存修改必定立即可见。</p><p>但如果两个线程不在同一个block或者warp内，则结果就比较微妙了，这也与CUDA对全局内存的读写机制有关。线程在读取全局内存是可以被阻塞的，然后warp schedular会调度执行其他warp；但当线程写入全局内存时，线程会继续执行，而非保证对全局内存的写入一定完成。因此即使单个线程中的代码执行顺序是顺序执行，即X的赋值操作必定在Y之前，但由于对内存写入操作的不确定性，X=10的内存操作可能在Y=20的内存操作之后才完成，因此对XY的读值也不能保证。</p><h2 id="fence函数" tabindex="-1"><a class="header-anchor" href="#fence函数" aria-hidden="true">#</a> Fence函数</h2><p>Memory fence函数不是线程同步函数，其并不保证所有线程会运行到相同的位置，它只确保呼叫函数的线程生产的数据能被其他线程正确地消费，即确保线程的访问顺序：对其他线程而言，该线程的在fence函数前的所有的写操作必定在fence函数后的写操作前完成，因此，其经常用于以下计算模型：</p><ol><li>对内存进行数据写入</li><li>fence函数调用</li><li>对某个标志进行原子操作，说明前面的数据写入研究完成。</li></ol><p>这保证了，当别的线程看到flag时，也能正确地读到第1步中写入内存的数据。</p><p>CUDA一共有三种fence函数：</p><ul><li>void __threadfence_block()：对同一个block内的其他线程保证顺序可见性</li><li>void __threadfence()：对同一个device的线程保证可见行（即不同block）</li><li>void __threadfence_system()：对多个deivce的线程保证可见性</li></ul><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h2><p>两个线程分别执行两个函数，只有以下三种可能：</p><ol><li>B=2时，fence函数不一定执行了，因此X既可能是1，也可能是10，因此有(A=1, B=2)(A=10, B=2)两种可能</li><li>B=20时，说明fence函数一定执行了，因此X必定为10，只有(A=10,B=20)这一种可能。</li></ol><p>而如果没有fence函数，则AB可以有四种组合。</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>__device__ int X = 1, Y = 2;

__device__ void writeXY()
{
    X = 10;
    __threadfence();
    Y = 20;
}

__device__ void readXY()
{
    int B = Y;
    __threadfence();
    int A = X;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="与同步函数的区别" tabindex="-1"><a class="header-anchor" href="#与同步函数的区别" aria-hidden="true">#</a> 与同步函数的区别</h2><p>Fence函数只保证了某个线程对内存的写入顺序，但并不保证该线程的写入一定会被其他函数可见，而同步函数比如<code>__syncthreads()</code>则能保证这种可见性。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2><ol><li>同一个warp内的线程，对全局和共享内存的读写立即可见</li><li>同一个block不同warp的线程，对全局和共享内存的读写必须用<code>__syncthreads()</code>或者<code>__threadfence_block()</code>来保证可见性</li><li>同一个grid不同warp的线程，对全局和共享内存的读写必须用<code>__threadfence</code>来保证可见性。</li><li>原子操作总是立即可见</li></ol>`,21),v={href:"https://blog.csdn.net/yutianzuijin/article/details/8507355",target:"_blank",rel:"noopener noreferrer"},_={href:"https://stackoverflow.com/questions/5232689/what-is-the-purpose-of-the-threadfence-intrinsic-in-cuda",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#programming-interface",target:"_blank",rel:"noopener noreferrer"};function m(u,b){const n=r("ExternalLinkIcon");return l(),c("div",null,[t,i("p",null,[e("参考:"),i("a",v,[e("1"),a(n)]),e(", "),i("a",_,[e("2"),a(n)]),e(", "),i("a",h,[e("3"),a(n)])])])}const g=d(o,[["render",m],["__file","memory-fence.html.vue"]]);export{g as default};
