const e=JSON.parse(`{"key":"v-68a1b65c","path":"/projects/mutation-testing-gpu.html","title":"Testing and Mutation Testing on GPU kernels","lang":"en-US","frontmatter":{"tag":["Testing","Mutation Testing","CUDA"],"category":"Computer Science","description":"Testing and Mutation Testing on GPU kernels Goal: How existing test theory can be used and adapted to the specific use case of GPU kernels. Two directions What would be useful coverage criteria to estimate the quality of test suites. ✅ The generation of test cases based on either code inspection or user-defined properties.","head":[["meta",{"property":"og:url","content":"https://blog.yujieliu.com/projects/mutation-testing-gpu.html"}],["meta",{"property":"og:site_name","content":"Yujie's blog"}],["meta",{"property":"og:title","content":"Testing and Mutation Testing on GPU kernels"}],["meta",{"property":"og:description","content":"Testing and Mutation Testing on GPU kernels Goal: How existing test theory can be used and adapted to the specific use case of GPU kernels. Two directions What would be useful coverage criteria to estimate the quality of test suites. ✅ The generation of test cases based on either code inspection or user-defined properties."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-09-20T09:24:03.000Z"}],["meta",{"property":"article:author","content":"Yujie Liu"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:tag","content":"Mutation Testing"}],["meta",{"property":"article:tag","content":"CUDA"}],["meta",{"property":"article:modified_time","content":"2023-09-20T09:24:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Testing and Mutation Testing on GPU kernels\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-20T09:24:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yujie Liu\\",\\"url\\":\\"https://blog.yujieliu.com/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"[Paper] Kernel Tuner: A search-optimizing GPU code auto-tuner","slug":"paper-kernel-tuner-a-search-optimizing-gpu-code-auto-tuner","link":"#paper-kernel-tuner-a-search-optimizing-gpu-code-auto-tuner","children":[{"level":3,"title":"1. Introduction","slug":"_1-introduction","link":"#_1-introduction","children":[]},{"level":3,"title":"2. Related work","slug":"_2-related-work","link":"#_2-related-work","children":[]},{"level":3,"title":"3. Design and implementation","slug":"_3-design-and-implementation","link":"#_3-design-and-implementation","children":[]},{"level":3,"title":"4 TDD support","slug":"_4-tdd-support","link":"#_4-tdd-support","children":[]}]},{"level":2,"title":"[Blog]Testing GPU code","slug":"blog-testing-gpu-code","link":"#blog-testing-gpu-code","children":[{"level":3,"title":"Design test case","slug":"design-test-case","link":"#design-test-case","children":[]}]},{"level":2,"title":"[Paper] Applying Mutation Testing to GPU Programs","slug":"paper-applying-mutation-testing-to-gpu-programs","link":"#paper-applying-mutation-testing-to-gpu-programs","children":[{"level":3,"title":"Introduction","slug":"introduction","link":"#introduction","children":[]},{"level":3,"title":"Contribution","slug":"contribution","link":"#contribution","children":[]},{"level":3,"title":"GPU-Specifc Mutation Operators","slug":"gpu-specifc-mutation-operators","link":"#gpu-specifc-mutation-operators","children":[]},{"level":3,"title":"Problems they find/ Limitations","slug":"problems-they-find-limitations","link":"#problems-they-find-limitations","children":[]},{"level":3,"title":"My thinking","slug":"my-thinking","link":"#my-thinking","children":[]}]},{"level":2,"title":"[Paper] CLTestCheck: Measuring Test Effectiveness for GPU Kernels","slug":"paper-cltestcheck-measuring-test-effectiveness-for-gpu-kernels","link":"#paper-cltestcheck-measuring-test-effectiveness-for-gpu-kernels","children":[{"level":3,"title":"How this tool works?","slug":"how-this-tool-works","link":"#how-this-tool-works","children":[]},{"level":3,"title":"My thinking","slug":"my-thinking-1","link":"#my-thinking-1","children":[]}]},{"level":2,"title":"What I did this week","slug":"what-i-did-this-week","link":"#what-i-did-this-week","children":[]},{"level":2,"title":"Research Plan","slug":"research-plan","link":"#research-plan","children":[{"level":3,"title":"Scope of this research","slug":"scope-of-this-research","link":"#scope-of-this-research","children":[]},{"level":3,"title":"Plan","slug":"plan","link":"#plan","children":[]}]},{"level":2,"title":"What I did this one and a half week","slug":"what-i-did-this-one-and-a-half-week","link":"#what-i-did-this-one-and-a-half-week","children":[]},{"level":2,"title":"Things to discuss","slug":"things-to-discuss","link":"#things-to-discuss","children":[]},{"level":2,"title":"What Zhu et al. do","slug":"what-zhu-et-al-do","link":"#what-zhu-et-al-do","children":[]},{"level":2,"title":"Research goals & questions","slug":"research-goals-questions","link":"#research-goals-questions","children":[]},{"level":2,"title":"Mutation testing literature review","slug":"mutation-testing-literature-review","link":"#mutation-testing-literature-review","children":[{"level":3,"title":"Theory of mutation testing","slug":"theory-of-mutation-testing","link":"#theory-of-mutation-testing","children":[]}]},{"level":2,"title":"What should include in this research?","slug":"what-should-include-in-this-research","link":"#what-should-include-in-this-research","children":[]},{"level":2,"title":"Next sprint","slug":"next-sprint","link":"#next-sprint","children":[]},{"level":2,"title":"Code coverage","slug":"code-coverage","link":"#code-coverage","children":[]},{"level":2,"title":"Coverage in multi-thread","slug":"coverage-in-multi-thread","link":"#coverage-in-multi-thread","children":[]},{"level":2,"title":"Fundamental hypotheses: coupling effect","slug":"fundamental-hypotheses-coupling-effect","link":"#fundamental-hypotheses-coupling-effect","children":[{"level":3,"title":"Evolution of coupling effect","slug":"evolution-of-coupling-effect","link":"#evolution-of-coupling-effect","children":[]},{"level":3,"title":"Our research","slug":"our-research","link":"#our-research","children":[]}]},{"level":2,"title":"Possible benchmark projects","slug":"possible-benchmark-projects","link":"#possible-benchmark-projects","children":[]},{"level":2,"title":"Plan for next sprint","slug":"plan-for-next-sprint","link":"#plan-for-next-sprint","children":[]}],"git":{"createdTime":1695201843000,"updatedTime":1695201843000,"contributors":[{"name":"Yujie","email":"yujie.liu.public@gmail.com","commits":1}]},"readingTime":{"minutes":16.46,"words":4938},"filePathRelative":"projects/mutation-testing-gpu.md","localizedDate":"September 20, 2023","excerpt":"<h1> Testing and Mutation Testing on GPU kernels</h1>\\n<p><strong>Goal</strong>: How existing test theory can be used and adapted to the specific use case of GPU kernels.</p>\\n<p>Two directions</p>\\n<ul>\\n<li>What would be useful <strong>coverage criteria</strong> to estimate the quality of test suites. ✅</li>\\n<li>The <strong>generation of test cases</strong> based on either code inspection or user-defined properties.</li>\\n</ul>","autoDesc":true}`);export{e as data};
