import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as s,c as a,a as e,b as n,e as o,d as c}from"./app-9e8a13db.js";const l={},d=e("p",null,"They evaluate the effectiveness of concurrency coverage over eight existing metrics. They find that the metrics are moderate to strong predictors of testing effectiveness varies across programs, and can be used for test generation targets.",-1),h={href:"https://doi.org/10.1002/stvr.1539",target:"_blank",rel:"noopener noreferrer"},u=c('<h1 id="paper-summary" tabindex="-1"><a class="header-anchor" href="#paper-summary" aria-hidden="true">#</a> Paper Summary</h1><ul><li><p>Motivation: The effectiveness of concurrency coverage metrics remains largely unexamined.</p></li><li><p>Contribution:</p><ul><li>Explore the impact of concurrency coverage metrics on testing effectiveness.</li><li>Examine the relationship between coverage, fault detection, and test suite size.</li></ul></li><li><p>Target:</p><ul><li>Eight existing concurrency coverage.</li><li>Six new metrics formed by combining complementary metrics.</li></ul></li><li><p>Experiment：</p><ul><li>Use metrics to guide the generation of test cases. Compare these test cases with equal size random test cases. Use mutation testing and real world faults to evaluate the fault detection ability of these test cases.</li></ul></li><li><p>Result:</p><ul><li>The metrics are moderate to strong predictors of testing effectiveness.</li><li>The metrics are effective at providing test generation targets.</li><li>Metric effectiveness varies across programs.</li></ul></li></ul><h1 id="highlights-for-me" tabindex="-1"><a class="header-anchor" href="#highlights-for-me" aria-hidden="true">#</a> Highlights for me</h1><table><thead><tr><th>What they mentioned</th><th>What we can react</th></tr></thead><tbody><tr><td>Several techniques for detecting concurrency faults</td><td>Have a research on them</td></tr><tr><td>Test requirements typically enumerate a set of possible <strong>interleavings of synchronization</strong> operations or <strong>shared variable accesses</strong>.</td><td>We need to consider these two when designing and discussing my test suite.</td></tr><tr><td>In sharp contrast to work on sequential coverage metrics and the intent of the concurrency metrics, however, the <strong>metrics’ results vary across programs</strong>.</td><td>We need to consider the results of each metric may very across kernels when we apply testing coverage to GPUs</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></tbody></table><h1 id="word-by-word" tabindex="-1"><a class="header-anchor" href="#word-by-word" aria-hidden="true">#</a> Word by word</h1><h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><ol><li>Terms</li></ol><ul><li><strong>Structural coverage metrics</strong>: a rough estimate of how well testing has covered a program’s structure</li><li><strong>Concurrency coverage metrics</strong>: estimate how well they have exercised concurrent program behaviours.</li></ul><ol start="2"><li><p>Problems</p><ul><li><p>Does improving concurrency coverage directly lead to a more effective testing process, or is it merely a by-product of increasing test suite size? 越高的并发覆盖率会使得测试更有效吗？</p></li><li><p>If yes, what practical gains in testing effectiveness can we expect? 如果有效，有什么好处？</p></li><li><p>Steps of test case generation techniques for concurrency coverage metrics? 根据测试效果，应该采取什么测试用例生成过程</p></li></ul></li><li><p>Their method:</p><ul><li>They apply these 8 metrics to 12 different app.</li><li>Generate test cases for each metric-app pair.</li><li>Measurement： <ul><li>The relationships between percentage of test requirements satisfied, the number of test executions, and the fault detection ability of test suites via correlation and linear regression. 检查测试执行满足了多少测试需求</li><li>Compared test suites generated to achieve high coverage against random test suites of equal size. 比较相同大小的高覆盖的用例和随机用例 （为什么这么做）</li><li>Examined the value of combining complimentary concurrency coverage metrics 把几个指标结合使用</li><li>Examined the impact of difficult-to-cover requirements on the testing process. 检查难以覆盖的需求</li><li>We measured fault detection ability using both mutation analysis (systematically seeding concurrency faults) and real-world faults. 用变异测试和真实错误来检验错误发现能力</li></ul></li></ul></li><li><p>Results</p><ul><li>Has value in predicting concurrency testing effectiveness and as a target for test case generation. 作为测试用例生成的指标是有效的</li><li>In sharp contrast to work on sequential coverage metrics and the intent of the concurrency metrics, however, the metrics’ results vary across programs. 但与串行化的不同，结果随着程序的不同而不同。</li><li>In particular, we found that the correlation between concurrency coverage and fault detection, while often moderate to strong (i.e., 0.4 to 0.8) and stronger than the relationship between test suite size and fault detection, is occasionally low to non-existent. 并发指标作为测试用例生成，至少比仅用测试用例数量作为指标好。</li><li>In some cases, the results were no better than random testing. 但有时并发指标并不一定有效。</li><li>Combining proposed coverage metrics can alleviate issues involving inconsistency across objects。同时使用多个指标可以缓解随程序而不同的问题</li><li>There still appear to be other factors unaccounted for by the metrics (e.g., configurations of test case generation techniques such as random noise injection probability and length).依旧有其他因素在影响</li></ul></li></ol><h2 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h2><ol><li>Satisfying a test requirement for a concurrent program requires engineers not only to execute specific code elements (generally synchronization and/or shared data access operations) but also to satisfy constraints on thread interactions.</li></ol>',11);function g(m,f){const t=i("ExternalLinkIcon");return s(),a("div",null,[d,e("p",null,[e("a",h,[n("Paper"),o(t)])]),u])}const y=r(l,[["render",g],["__file","Are concurrency coverage metrics effective for testing_ a comprehensive empirical investigation.html.vue"]]);export{y as default};
