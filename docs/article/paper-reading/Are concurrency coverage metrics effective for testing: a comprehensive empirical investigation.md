---
title: "[Paper Reading]Are concurrency coverage metrics effective for testing：a comprehensive empirical investigation"
description: ""
date: 2023-09-21
category: Paper Reading Notes
tag:
- Testing
- Testing Coverage
- Concurrency 
---

They evaluate the effectiveness of concurrency coverage over eight existing metrics. They find that the metrics are moderate to strong predictors of testing effectiveness varies across programs, and can be used for test generation targets.

[Paper](https://doi.org/10.1002/stvr.1539)

# Paper Summary

- Motivation: The effectiveness of concurrency coverage metrics remains largely unexamined.
- Contribution: 
  - Explore the impact of concurrency coverage metrics on testing effectiveness.
  - Examine the relationship between coverage, fault detection, and test suite size.
- Target: 
  - Eight existing concurrency coverage.
  - Six new metrics formed by combining complementary metrics.
- Experiment：
  - Use metrics to guide the generation of test cases. Compare these test cases with equal size random test cases. Use mutation testing and real world faults to evaluate the fault detection ability of these test cases.

- Result: 
  - The metrics are moderate to strong predictors of testing effectiveness.
  - The metrics are effective at providing test generation targets.
  - Metric effectiveness varies across programs.





# Highlights for me

| What they mentioned                                          | What we can react                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Several techniques for detecting concurrency faults          | Have a research on them                                      |
| Test requirements typically enumerate a set of possible **interleavings of synchronization** operations or **shared variable accesses**. | We need to consider these two when designing and discussing my test suite. |
| In sharp contrast to work on sequential coverage metrics and the intent of the concurrency metrics, however, the **metrics’ results vary across programs**. | We need to consider the results of each metric may very across kernels when we apply testing coverage to GPUs |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |





# Word by word

## Introduction

1. Terms
  - **Structural coverage metrics**: a rough estimate of how well testing has covered a program’s structure
  - **Concurrency coverage metrics**: estimate how well they have exercised concurrent program behaviours.

2. Problems

   - Does improving concurrency coverage directly lead to a more effective testing process, or is it merely a by-product of increasing test suite size? 越高的并发覆盖率会使得测试更有效吗？

   - If yes, what practical gains in testing effectiveness can we expect? 如果有效，有什么好处？

   - Steps of test case generation techniques for concurrency coverage metrics? 根据测试效果，应该采取什么测试用例生成过程

3. Their method: 
   - They apply these 8 metrics to 12 different app.
   - Generate test cases for each metric-app pair.
   - Measurement：
     - The relationships between percentage of test requirements satisfied, the number of test executions, and the fault detection ability of test suites via correlation and linear regression. 检查测试执行满足了多少测试需求
     - Compared test suites generated to achieve high coverage against random test suites of equal size. 比较相同大小的高覆盖的用例和随机用例 （为什么这么做）
     - Examined the value of combining complimentary concurrency coverage metrics 把几个指标结合使用
     - Examined the impact of difficult-to-cover requirements on the testing process. 检查难以覆盖的需求
     - We measured fault detection ability using both mutation analysis (systematically seeding concurrency faults) and real-world faults. 用变异测试和真实错误来检验错误发现能力
4. Results
   - Has value in predicting concurrency testing effectiveness and as a target for test case generation. 作为测试用例生成的指标是有效的
   - In sharp contrast to work on sequential coverage metrics and the intent of the concurrency metrics, however, the metrics’ results vary across programs.  但与串行化的不同，结果随着程序的不同而不同。
   - In particular, we found that the correlation between concurrency coverage and fault detection, while often moderate to strong (i.e., 0.4 to 0.8) and stronger than the relationship between test suite size and fault detection, is occasionally low to non-existent. 并发指标作为测试用例生成，至少比仅用测试用例数量作为指标好。
   - In some cases, the results were no better than random testing. 但有时并发指标并不一定有效。
   - Combining proposed coverage metrics can alleviate issues involving inconsistency across objects。同时使用多个指标可以缓解随程序而不同的问题
   - There still appear to be other factors unaccounted for by the metrics (e.g., configurations of test case generation techniques such as random noise injection probability and length).依旧有其他因素在影响

## Background

1. Satisfying a test requirement for a concurrent program requires engineers not only to execute specific code elements (generally synchronization and/or shared data access operations) but also to satisfy constraints on thread interactions.

















