import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,d as n}from"./app-9e8a13db.js";const t={},d=n('<h1 id="大端字节序-big-endian-和小端字节序-little-endian" tabindex="-1"><a class="header-anchor" href="#大端字节序-big-endian-和小端字节序-little-endian" aria-hidden="true">#</a> 大端字节序（Big Endian）和小端字节序（Little Endian）</h1><ul><li>大端字节序（Big Endian）：最高有效位存于最低内存地址处，最低有效位存于最高内存处；</li><li>小端字节序（Little Endian）：最高有效位存于最高内存地址，最低有效位存于最低内存处。</li></ul><p><img src="https://pics.yujieliu.com/blog/2023/12/f9cce6d4306b55fdbdaaea4c29648ac4.png" alt="endian"></p><h2 id="网络字节序" tabindex="-1"><a class="header-anchor" href="#网络字节序" aria-hidden="true">#</a> 网络字节序</h2><p>在进行网络传输的时候，先传递哪个字节？也就是说，当接收端收到第一个字节的时候，它将这个字节作为高位字节还是低位字节处理？</p><ul><li>UDP/TCP/IP协议规定：把接收到的第一个字节当作高位字节看待（大端字节序）</li></ul>',6),l=[d];function c(r,o){return i(),a("div",null,l)}const _=e(t,[["render",c],["__file","endian.html.vue"]]);export{_ as default};