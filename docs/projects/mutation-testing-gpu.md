---
tag:
- Testing
- Mutation Testing
- CUDA
category: Computer Science
---
# Testing and Mutation Testing on GPU kernels

**Goal**: How existing test theory can be used and adapted to the specific use case of GPU kernels.

Two directions

- What would be useful **coverage criteria** to estimate the quality of test suites. ✅
- The **generation of test cases** based on either code inspection or user-defined properties.

**My inspiration**:

Use mutation testing to estimate the quality of test suites.

Basic of mutation testing: change a bit in the source code and see if the mutants can survive.

**My concerns**:

- Is it really feasible/meaningful to introduce mutation testing into GPU programming

  - From [here](#blog-testing-gpu-code) we may need to figure out if the mutants will pass/fail the test cases too easy. In other words, in which application scenario the mutation testing is useful in GPU programming.

- Abstraction level for the mutation testing tool

  1. Directly written in C/C++: Had better not....

  2. As a 'plugin' for kernel tuner:  

     The process is like:

     - Design/define [mutators](https://stryker-mutator.io/docs/mutation-testing-elements/supported-mutators/) and patterns for CUDA/OpenCL 

     - A dry run is needed to see if the code can be compiled and started successfully.

     - Run all the mutants and give a report.

     - Pros: 
       - Can be done under Kernel Tuner's architecture for dry run and testing framework.
       - Higher abstraction level: interact with Kernel Tuner and PyCUDA/PYOpenCL.
       - Partially use python's sophisticated testing tools is possible.
     - Cons:
       - Highly depends on the Kernel Tuner, which may limit the development and usage

  3. An independent tool focus on CUDA/OpenCL mutators. A [paper](#paper-applying-mutation-testing-to-gpu-programs) from TUD.

     - A whole (mutation) testing framework is much more work (must sharply limit the scope)
       - limit the mutators, limit the language. (CUDA/OpenCL)

     - More freedom in implementation.

- How to measure survival/kill

  - The output of the program
  - The performance of the execution. 
    - Test cases for performance?
    - The [paper](#[Paper] Applying Mutation Testing to GPU Programs) also find this problem.

# Literature review


## [Paper] Kernel Tuner: A search-optimizing GPU code auto-tuner

### 1. Introduction

In brief: An auto tuner for tuning GPU programming parameters

Problems: 

- Different parameters for OpenCL/CUDA kernel yield different performance on a same application
-  These parameter values are application specific
- An auto tuner is needed to find the 

Feature of the tool:

- Find optimized parameters for 
- TDD

Methods:

- Random
- Global optimization Algorithm
- Several strategies support

### 2. Related work

Two main research directions:

- this research focus on user-defined code parameterization

Two techniques

- Performance model
  - ML based
  - static and predictive analysis
  - Cons: no performance guarantees for general usages
- Empirical performance measurement
  - Cons:
    - tunning process itself can be time-consuming and input specific
    - random search sometimes is more effective than algorithms

What the author do based on above:

- A mashup of algorithms support

### 3. Design and implementation

#### 3.1 User interface

Two important function

- run_kernel: run a specific kernel config
- tune_kernel: user defines init values for parameters 

One important arguments

- Kernel_name: code in string or in a file

#### 3.2 Strategies

1. Strategies
   - Random sample
   - Minimize
   - Basin hopping (BH)
   - ...
2. Problem: Algorithm continuous space -> Configuration discrete space
   1. Snap variable to nearest kernel configuration, check user-defined restrictions
   2. (except DE, GA and SA strategies) Normalize to [0, 1]
   3. Cache measured execution time of evaluated configurations. Avoid measuring again for the one 'mapping' to the same configuration.
3. Strategy parameters: use a default one, allowing user changes

#### 3.3 Runners and backends

Sequential runner & Noodles parallel runner 

PyCUDA & PyOpenCL: An interface to access CUDA/OpenCL APIs

### 4 TDD support

User's jobs

- Write the CUDA/OpenCL code
- Write the test cases in Python
- Trigger run_kernel to execute the test cases



## [Blog]Testing GPU code

Steps without framework:

1. Decide on some input data

2. Compile the GPU code (if not compiled already)

3. Allocate GPU memory

4. Copy input data to the GPU

5. Setup thread block and grid dimensions

6. Call the kernel

7. Copy data back to host memory

8. Free GPU memory

9. Check the behavior of the system under test

Kernel Tuner can do 2-8 steps.

*[Testing device functions](https://blog.esciencecenter.nl/writing-testable-gpu-code-23bbda3a5d62)? What is device functions? [Answer](https://stackoverflow.com/questions/12373940/difference-between-global-and-device-functions). How to test? Maybe need to figure out later.

### Design test case

The range of input data may influence the output. We really need to consider whether it will make the test useless when mutation happens. 

- All mutants will easily fail the test, but there might still a lot of bugs in the code.
- All mutants will pass the test, it may because the output variance is not sufficient.

## [Paper] Applying Mutation Testing to GPU Programs

### Introduction

| Comparation   | CPU                                                          | GPU                                                          |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Computing     | Focus on correctness and efficiency of singel thread, leave the thread collaboration to libraries | Manage the threads explicitly                                |
| Memory access | Transparant to programmers                                   | Explicitly manage different type of memory (shared mem, global mem, host mem) |

### Contribution

- 9 new GPU-specfic mutation operators and 5 conventional mutation operators
- MUTGPU

  - Architecture of MUTGPU from the paper

    <img src="https://objectstorage.eu-frankfurt-1.oraclecloud.com/n/fripr8xktyle/b/bucket1/o/1669968695500.png" alt="Architecture of MUTGPU" style="zoom:67%;" />


### GPU-Specifc Mutation Operators

Three directions, nine mutation operators

Memory Management

- Execution configuration

  - Operators

  	  ```c
     origin: 					add<<<4096, 256>>>(N, a, b, c);
  	alloc_swap:				add<<<256, 4096>>>(N, a, b, c);
     alloc_increment:	add<<<4096+1, 256>>>(N, a, b, c);
     alloc_decrement:	add<<<4096-1, 256>>>(N, a, b, c);
     ```

  - 

- Shared Memory

  ​	The shared memory management is the main cause of data races and [bank conflicts](https://stackoverflow.com/questions/3841877/what-is-a-bank-conflict-doing-cuda-opencl-programming).

  - Operators

    ```c
    origin:					__shared__ float cache[N];
    share_removal:	float cache[N];
    ```

  - 

Thread Management

- GPU indexing

  ​	GPU programming introduce a new indexing mechanism to iterate the data and thread, using built-in variables such as `tgreadId.x` and `blockIdx.x`.

  - Operators

    ```c
    origin:									int tid = blockIdx.x;
    gpu_index_replacement:	int tid = threadIdx.x;
    gpu_index_increment: 		int tid = blockIdx.x + 1;
    gpu_index_decrement:		int tid = blockIdx.x + 1;
    ```

  - Discussion

    - qute a lot of mutants in their results
- Synchronisation functions

  ​		Used to coordinate communications between threads in a specfic block

  - Operators

    ```c
    origin:					__syncthreads();
    sync_removal:		//__syncthreads();
    ```
  - 

Atomic operations

​	Guranteed to be performed without interference from other threads.

- Operators

  ```c
  origin:					atomicAdd(&(histo[buffer[i]]), i);
  atom_removal:		histo[buffer[i]] += 1		
  ```

- Discussion
  - Only one mutant: subject systems do not contains much atomic operations

### Problems they find/ Limitations

1. Most tests from the six projects do not target unit-level: invoke a series of functions and examine the final results
   - Their solution: add more test cases
2. A samll change in the program (a mutant) do not propagete to the result.
   - Their idea: split the functions or refactor to non-void, but it is too complicate so thay just leave aside.
3. Many functions cannot be accessed from the test suites.
   - Test cases are located at **host** level, which invoke functions in **device/host** and examine the results.
     - Workaround: wrap `__device__` functions with `__global__` function.
   - Static and inline functions
     - remove static and inline
4. Mutants not affecting the result of the kernel functions but the GPU performance.



### My thinking

#### 1. Test-driven development:

​		 I can image that quite a lot of GPU project is not under the guideline of test-driven development. This is because unlike CPU programming, which is bussiness-oriented and having a clear workflow, the GPGPU programming is much research-oriented and testing for each unit is quite costly. They can just redesign and run their code again and again, or they even don't care/know what's the expected output of a single function.

​		To introudce TDD/ mutation testing into this area, an out-of-box and easy way to perform testing is needed. From the paper we know that writing a test at host level to kill a mutant is much easy, but writing a test for a device function is much harder and need further investigation on the context of the code. So I think there are two directions to :

1. An out-of-box way to design and implement a test case for GPU functions?
   - A testing framework for CUDA/OpenCL is necessary?
2. A test cases generation tool for GPU fucntions?



#### 2. Mutation testing or a lint?

​		Some running examples in the paper that be detected by mutation testing may also be detected by a lint. So is it necessary to use mutation testing for these defect? This is because comparing to the statistic analysis, the mutation testing is definetly costly.

1. alloc_increment, alloc_decrement

   ```c
   alloc_increment:	add<<<4096+1, 256>>>(N, a, b, c);
   alloc_decrement:	add<<<4096-1, 256>>>(N, a, b, c);
   ```

   I find a fix pattern in the beginer [tutorial](https://developer.nvidia.com/blog/easy-introduction-cuda-c-and-c/): For cases where the number of elements in the arrays is not evenly divisible by the thread block size, the kernel code must check for out-of-bounds memory accesses.

2. some synchronisation functions

   List 18 of the paper: "The code fragment in Listing 18 does not contain write operations to the shared array *sum* and *sum2*, thereby, there is no need for a synchronisation function (*cg::sync(cta)*) in the end to guarantee that all of those writes to the shared arrays complete before anyone tries to read from the buffers."

   ```c
   if (tid == 0){
       beta  = 0;beta2 = 0;
       for (int i = 0; i < blockDim.x; i += VEC) {
           beta  += sum[i];beta2 += sum2[i];}
       __TOptionValue t  = {beta, beta2};
       *d_CallValue = t;}
   cg::sync(cta)
   ```

   Can a lint find this defect through statistic code analysis? 

​	   Searching for lint patterns and see if it can be used as mutation operators may also be useful.

#### 3. Performance testing

In the paper they discard the mutants that influence the performance, but they also offer another idea that "using performance requirement to be part of the definition of a test case passing or failing".





**One more thing**: a small bug in the paper? :P

In listing 2 line 13 they try to pass an integer array to a float type array parameters, and my compiler doesn't feel happy about this when I try to replicate this demo.



## [Paper] CLTestCheck: Measuring Test Effectiveness for GPU Kernels

In this paper the author presents a mutation [testing tool](https://github.com/chao-peng/CLTestCheck) for OpenCL written in C++, using [only traditional mutators](https://github.com/chao-peng/CLTestCheck/blob/master/clmt/src/Utils.cpp#L166). 

### How this tool works?

- Based on a tool Clang LibTooling, a parser for C/C++
- It rewrites the source code with the mutation operators.
- Then it compiles and execute the mutants.
- A reference result file needs to be provided to compare it with the output. (Only when the output file and the reference file are exactly the same)

### My thinking

1. Something we need to consider in our research
   1. Kernel code coverage
      - Line coverage
      - Branch coverage: executed by at least one thread".
      - Loop Boundary Coverage
      - Barrier coverage: 
   2. Hit counter and timeout mechanism
      - Some mutants may timeout when they go to invalid loop or deadlock
      - `#pragma unroll` might be influenced in mutation testing? (need further investigate)

# Week 1 Retrospective

## What I did this week

1. Configure an environment for CUDA/OpenCL programming based on Jupyter Lab with both NVIDIA/AMD GPUs. Test it with some demos. (Sadly Apple doesn't support OpenCL anymore on arm64)
2. Read the paper "Applying Mutation Testing to GPU Programs" carefully. Go [here](#paper-applying-mutation-testing-to-gpu-programs).
3. Write a draft for my study plan.

## Research Plan

After reading the paper, I soon notices that the learning curve in GPGPU is quite steep. To tackle the problem I firstly need a researchplan to define 1) What I need to study 2)How deep I need to go? 3) Time schedule.

### Scope of this research

1. Limit to CUDA, C/C++, Python first. Then extend to OpenCL if time permitted.

### Plan

Three directions to go. Concrete schedule is not decided yet but it should be done before Jan 20th so that I can have at least 2 weeks for my proposal.

1. CUDA programming

   1. Goal: 
      - Understand what the typical CUDA programs are going to do.
      - Can write test cases for CUDA programs
   2. Todos:
      - [x] [Done] Config the experiment environment for it.
      - [x] [Started at Nov. 26th] Basic idea of the architecture of CPU/GPU model and CUDA: read the book "The CUDA Handbook"
      - [x] A [basic tutorial](https://cuda-tutorial.readthedocs.io/en/latest/tutorials/tutorial01/) of CUDA programming and [programming guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html) from NVIDIA.
      - [ ] Research on testing for CUDA programs

2. Kernel Tuner

   1. Goal:
      - Understand how this tool work (no need to dive into concrete patterns and optmization algorithms, but how the tuner process work)
      - Can write a module/component for the tool
   2. Todos:
    - [x] Trying the basic demo in kernel Tuner GitHub projects
    - [x] Try the [examples](https://github.com/KernelTuner/kernel_tuner/tree/master/examples) and tutorials in kernel Tuner GitHub projects
    - [ ] Source code reading, focus on
       - [x] Tuner: especially how the parameters is changed and how the performance of kernel is measured.
       - [ ] Testing interface
       - [ ] Figure out if it is possible to support/going to support:
          - [ ] Test device function
          - [ ] Design and execute test cases about performance.

3. Testing/ Mutation testing

   - [x] Try to search and read papers in this area related mutation testing and GPU
     - [x] GPU related: fault injection GPU, CUDA testing framework, test and coverage measurement GPU
     - [x] Mutation operators: C/C++ mutation operators
     - [x] Performance: How to write a test case to measure performance 

     - [x] Run the `replicate_package` of the paper

# Week 2 Retrospective

## What I did this one and a half week

1. Following the above study plan
   - Read, try to understand and reproduce most of the examples in Kernel Tuner's tutorial.
   - Read some CUDA tutorials and books, reporduce some demos.
   - Search on mutation testing, CUDA testing framework, test and coverage measurement in GPU and performance
2. A paper CLTestCheck: Measuring Test Effectiveness for GPU Kernels

## Things to discuss

1. How to test CUDA code?

   1. NVIDIA's [document](https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/index.html#reference-comparison).

      - Reference Comparison (at least Integration level)
      - Unit test: recommended to execute on CPU instead of GPU
        - Write our CUDA kernels as a collection of many short `__device__` functions rather than one large monolithic `__global__` function and test before hooking them all together.
        - Defined functions as `__host__ __device__` rather than just `__device__` functions, then these functions can be tested on both the CPU and the GPU.

      Kernel Tuner has already offer a [way](https://kerneltuner.github.io/kernel_tuner/stable/correctness.html) to perform Reference Comparison. In this research we will mainly focus on the unit test. 

   2. Unit test using features of Kernel Tuner

      - Necessary: Mutation testing is mostly used at unit test level.
      - I noticed that all CUDA demos I met are only containing **one device/global function**, so does the examples in the Kernel Tuner's tutorial. So I have a question about this: In medium or large size project, which may contains **many device/global** functions that need to be parameter-optimized, how we optimize them? Or precisely, what's the typical scenario of using Kernel Tuner in these kind of projects? Should we tune per function, or only use if for the entry function (main function) and it will do some magic to optimize the entire project?
      - 【Direction 1】A module built in Kernel Tuner, and the user only need to call something like `kernel_tuner.mut_kernel` once. After that this module will generate the mutants from the kernel and execute them and compare the result with user inputs from the parameters `answer=reference, verify=verify_partial_reduce` that Kernel Tuner has already support.
        - Testing level depends on the level of the kernel. 
          - If the kernel is a single function, it will be a unit test.
          - If the kernel is a complicated function calling a lot of other functions, it may be a integration test.

   3. Unit test using CPU: C/C++ testing framework available/compatible?

      Since CUDA can work with C/C++, is it possible to test it in a C/C++ compatible way?

      - E.g. GoogleTest: seems mostly compatible with CUDA, some branch situations need to further investigate. 

      - Test cases can/need be written in C/C++. The users have much more freedom to choose which functions they want to test.

      - 【Direction 2】Modify the Kernel Tuner to make it easy to execute C/C++ test cases that are written in C/C++ in the source code of kernel, with some help of C/C++ testing framework; It will be nice if this framework also support mutation testing. If it is not the case, another C/C++ mutation testing framework may also be included.

   4. Conclusion:

      1. **【Direction 1】** is at a higher level, using the functionality of Kernel Tuner and the test cases can/need to be written in Python (to verify the result that the Kernel Tuner returns).
         - Personally prefer this one since it is closer to the topic of this research.
      2. **【Direction 2】** is at a lower level, giving more freedom to the user since they can define the test cases in their own style, the Kernel Tuner is only responsible for executing these test cases for (mutation) testing.
         - Much more ambitious. Need to precisely decide where to put your additions

2. Mutation operators for CUDA/OpenCL

   We will refer and conclude the operators we are going to use in this research from the following sources. Open to new operators during the process.

   1. [This paper](https://link.springer.com/chapter/10.1007/978-3-030-16722-6_19) offer some mutation operators for OpenCL. 
   2. [This paper](https://pure.tudelft.nl/ws/portalfiles/portal/124438843/09159103.pdf) we have already read in week 1 offer some mutation operators for CUDA.
   3. [This docs](https://stryker-mutator.io/docs/stryker-net/mutations/) offer quite a lot of mutation operators for JavaScript, Java and C# that we can refer to.

3. Coverage:

   - Coverage is important in this research since it is necessary when doing result evaluation. e.g. "The test suites make it 95% xxx coverage but only 30% mutation score".

   - Need to consider how to introduce 'coverage' to kernel using Kernel Tuner.

   - I found some from [the paper](#paper-cltestcheck-measuring-test-effectiveness-for-gpu-kernels), some coverage idicators need further investigate.

4. Performance measurement: 

   - Kernel tuner offer [a way to measure performance]( https://kerneltuner.github.io/kernel_tuner/stable/metrics.html) using metrics and customized objectives. 
   - Examples are using execution time or metrics "GFLOP/s", but this may very from GPU devices.
   - Haven't found a good way to "test performance", but comparing the performance with the previous executions or letting the user set a baseline for performance can be an idea.

# Week 3 Retrospective

This week I mainly focus on literature review. I also have started writing the proposal. 

## What Zhu et al. do 

The source code is included in the replicate_package.

They create a dictionary include all the mutation operators and scan the code in CUDA `.cu` file. If the tool find the key of the dict in the source code, they replace the key with the value.

```python
conditional_boundary_replacement = {'<':'<=','<=':'<','>':'>=','>=':'>'}
negate_conditional_replacement = {'==':'!=','!=':'==','<=':'>','>=':'<','<':'>=','>':'<='}
math_replacement = {'+':'-','-':'+','*':'/','/':'*','%':'*','&':'|','|':'&','^':'&','<<':'>>','>>':'<<'}
increment_replacement = {'++':'--','--':'++'}
logical_replacement = {'&&':'||','||':'&&'}
gpu_index_replacement = {'threadIdx.x':'blockIdx.x','blockIdx.x':'threadIdx.x',\
                         'threadIdx.y':'blockIdx.y','blockIdx.y':'threadIdx.y',\
                         'threadIdx.z':'blockIdx.z','blockIdx.z':'threadIdx.'}
gpu_index_replacement2 = {'threadIdx.x':'threadIdx.y','threadIdx.y':'threadIdx.x','blockIdx.x':'blockIdx.y',\
                           'blockIdx.y':'blockIdx.x','gridDim.x':'gridDim.y','gridDim.y':'gridDim.x'}
share_removal = {'__shared__':''}
sync_removal = {'__syncthreads()':'//__syncthreads()','cg::sync(cta)':'//cg::sync(cta)'}
```

## Research goals & questions

I tried different ways but can only found two paper related to this area, one for CUDA and one for OpenCL. (We have discussed them in the last two update.) They are both empirical studies, developing correspoind tools and use them in some benchmarking projects. This means they implicitly assume that mutation testing can be theoretically applied in GPU programming, then use their tools to prove it. So in this reseach, besides tool development, I think doing some theoretical research on how existing mutation testing theories can be applied to GPU can also be meaningful.

##### Based on this, I made the following questions and have a literature review on mutation testing.

```
\item \textbf{G1}: A comprehensive theoretical research on how existing mutation testing theories and techniques can be used in GPU programming, and what can be the new bedrock and inspirations in this area.

\item \textbf{G2}: Create an open-source mutation testing tool for GPU kernel development, performing an empirical study to evaluate the conclusions in goal \textbf{G1} and for kernel developer's usage.
```

    \item \textbf{RQ1}: What and how existing mutation testing theories can be applied in GPU programming? 
    (sub-questions)
    \item \textbf{RQ2}: What can be new mutation testing theories and techniques specific to GPU kernel?
    \item \textbf{RQ3}: How to develop the mutation testing tool?
    \item \textbf{RQ4}: How to use the tool developed in answering \textbf{RQ3} to evaluate the conclusions we made in the research of \textbf{RQ1} and \textbf{RQ2} if necessary.

## Mutation testing literature review

I found a comprehensive review and some papers regarding the studies about mutation testing. 

### Theory of mutation testing

**Two fundamental hypotheses**

- Competent Programmer Hypothesis (CPH)		
  - Programmers tend to develop programs close to the correct version,  so we assume that these faults are merely a few simple faults which can be corrected by a few small syntactical changes.
- Coupling Effect 
  - Simple test cases that can distinguish one sime error can also distinguish more complex error.

Quite a lot of papers are written to prove these hypotheses, in both empirical and theorical ways. 

**The Problems of Mutation Analysis**

- Cost optimization
- Equivalant mutant

**Cost optimization techniques**

- Mutant reduction
  - Reduce the number of mutant in some ways without (dramatically) influence the mutation score.
  - Methods
    - Mutant Sampling: randomly or use some algotrithm
    - Mutant Clustering: (I haven't figure it out yet :P )
    - **Selective Mutation**: some mutation operators are more important, omit the less importnat ones
  - We can also conduct some methods above, like Mutant Sampling, Selective Mutation can be intuitively easier to evaluate.
- Execution Cost Reduction 
  - Strong, weak and firm mutation
    - Strong Mutation: traditional one, check the output of the function/module
    - Weak Mutation: check immediately after the mutant execution.
    - Non-deterministic behaviors may strongly influence the effectiveness of week mutation
    - Firm mutation: provide a continuum of intermediate possibilities. (No tools has implemented this method)
  - Runtime Optimization
    - Interpreter-Based: mutate the code in the interpreter level, not suitable in this reasearch
    - Compiler-Based: mutate the code in the compiler level, not suitable in this research
    - Bytecode Translation Technique: mutate the code in the compiled object 
- Run the mutants in parallel
  - I am currently doing a similar project, running all the mutants in parallel in the cloud.
  - Intuitively possible, since GPU is good at parallel computing.
    - Currently we need to get the result of one mutant exection back to CPU and then run the next mutant.
    - In this scenerio, one bottleneck of GPU program is GPU-CPU commucation.
    - Trasfer all the mutants to the GPU in some ways, and execute only once in parallel and get all the results once.
  - Maybe possible. Do the check in GPU, a python lib offer a way to check this.
  - Not that easy, maybe left it for another master project or my possible Phd.

**Equivalant mutant detection**

- Equivalant mutants refer to the mutants that can never be killed because they always produce the same output as the original program.
- In research of Zhu el al., they manually discover the equivalant mutants.
- We will have face this problem in our research bacause the mutants have the same output but have different execution time or resource usage are equivalant mutant, and GPU programming is good at producing this kind of results.
- Thanksfully, Kernel Tuner seems good at dealing with this kind of problem and I will try to figure out a solution to deal with it.

## What should include in this research?

At least at this peraration stage, I plan to include the following study into this research.

- [ ] Proof of fundamental hypotheses. I intuitively guess the theoretical proof won't be that different between CPU and GPU programming, so the empirical proof may be more persuasive. 
- [ ] Cost optimization: 
  - [ ] Selective Mutation. Benchmarking the mutation operators we used and figure out the 'core operator list' and 'full operator list', offer it as a function of our mutation testing tool if possible.
  - [ ] Run the mutants in parallel
- [ ] Equivalant mutant detection: We try to kill the mutants that have the same output but have different execution time or resource usage.

## Next sprint

- [x] Continue to read the papers mentioned in above literature review. 

Goal of reading: figure out if and how their prove/methodology/techqiue can be (partially) migrated/used in GPU programming.

- [x] Focusing on the studies mentioned above
- [x] Search and read papers about quality assurance techniques that used in GPU programming.
- [x] Continue writing the proposal.
- [x] Plan for: Collect the tests/benchmarking projects.
- [x] Code Coverage



# Week 4 Retrospective

## Code coverage

I find some papers about verifier/testing tools for GPU kernel but I don't have enough knowledge-base to dig into them. So at the first step, I mainly focus on how they measure the code coverage in these papers.

GKLEE is the only tool that provides support for code coverage for CUDA GPU kernels.（from a paper first pub in 2019）

The coverage concepts we can use in GPU

- Line/statement coverage: almost the same but has some difference, details below
- Branch coverage
- Loop Boundary Coverage
  - Calculate the following cases seperately (sum up to 100%):
    - No loop:
      - E.g: There is a for loop but the execution never goes into it
      - num of no loop loops / totol loops
    - Exactly one loop
    - More than one loop
    - Boundary value is reached
- Barrier Coverage **GPU-verify**
  - Barrier is a synchronisation mechanism for threads within a thread block/work-group and is used to prevent intra block/work-group data race errors.
  - Barrier divergence occurs when the number of threads within a work-group executing a barrier is not the same as the total number of threads in that work-group.
  - Covered barrier: a correct execution of a barrier without barrier divergence
  - Coverage = covered barriers / total barriers

## Coverage in multi-thread

However, some papers concern about "Given that a kernel is usually executed by a large number of threads, there is a real danger, especially with complex/large kernels, **that multiple threads may end up covering some line/branch while no threads visit other lines/branches"**

Their solution: "we keep track of whether some feature (line or branch) is covered by all the threads at least once, or some thread at least once."

So intuitively we can have three different kind of "coverage":

- Avg. Covt: measures the number of lines/statements covered by threads across the whole program, averaged over the threads
- Min. Covt: measures the minimum by any thread
- Max. Covt: measures the maximum by any thread

```
# We have 3 thread
if (thread.id <= 1){
	# 3 lines of code
	# 2 threads go here
}else{
	# 27 lines of code
	# 1 threads go here
}

30 lines in total
Avg. Covt: (2 * 3/30 + 1 * 27/30) / 3 = 36.7%
Min. Covt: 3/30 = 10%
Max. Covt: 27/30 = 90%
```

## Fundamental hypotheses: coupling effect

### Evolution of coupling effect

[Paper] Hints on Test Data Selection: Help for the Practicing Programmer

- The coupling effect: Test data that distinguishes all programs differing from a correct one by only simple errors is so sensitive that it also implicitly distinguishes more complex errors.
- It's an empirical principle. No hope of proving the coupling effect.
- They use a test suite that can kill all the 1-order mutant and see if this suite also work fro higher-order mutants
- Impressive Result: They selected more than 22,000 higher-order mutants, and all are all killed.
- （Conclusion: Hey! We find a phenomenon!)

[Paper] Investigations of the Software Testing Coupling Effect

- More formal and sophisticated definitions. The author suspect the impressive result of the previous paper.
- Definition of simple/complex fault: A simple fault is a fault that can be fixed by making a single change to a source statement. A complex fault is a fault that cannot be fixed by making a single change to a source statement.
- Mutation Coupling Effect: Complex mutants are coupled to simple mutants in such a way that a test data set that detects all simple mutants in a program will detect a large percentage of the complex mutants.
  - Complex mutants can represent the complex faults.
  - Complex faults are easier to detect than complex mutants.
  
- Operators:
  - 26 operators from another paper
  - Hint: Use **ALL** operators you can find, since we need to cover as many as possible 'complex faults'.

- Result: 
  - Test data for 1-order mutants are also sucessful in 2-order and 3-order mutants, although still some higher-order mutants alive.
  - They can only say the two 'Effect' are likely, but they didn't find evidence to go further.

- Conclusion: 
  - Mutation testing can only fucus on 1-order mutants and ignore n-order mutants.




### Our research

One empirical research: our tool should allow to generate higher-order mutants (2-order and 3-order) and see if a sufficient test case for 1-order mutants can also kill most of the higher order mutants.

Impotant remarks

- Sufficient test case for 1-order mutants: at least 95% mutatation score
- Use all the operators we find.

## Possible benchmark projects

From the papers I read I found the following benchmark proejcts they used. I will proof read them and figure out how they can be used in kernel tuner, creating our own benchmarks.

- [CUDA-Sample](https://github.com/nvidia/cuda-samples) from NVIDIA CUDA SDK
- [parboil](https://github.com/yuhc/gpu-parboil) includes many benchmark projects, from University of Illinois
- [Rodinia](https://www.cs.virginia.edu/~skadron/Papers/rodinia_iiswc09.pdf) benckmarks, from University of Virginia (kernel tuner has some)
- [PolyBench/GPU](https://github.com/sgrauerg/polybenchGpu), from University of Delaware

## Plan for next sprint

- [ ] Mutation testing: Continue dig into the mutation testing theories we find in week 3 and see what we can do in our research
- [ ] Coverage: find out if we need coverage in our mutation testing research, and which can be the suitable one/ones
- [ ] Benchmark project
- [ ] Enrich the outline of the proposal based on what we find.
- [ ] Related work and some experiment we will conduct in this reasearch.
- [ ] GPU-verify
