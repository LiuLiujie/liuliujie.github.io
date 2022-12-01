# Kernel Tuner Testing Research

**Goal**: how existing test theory can be used and adapted to the specific use case of GPU kernels.

- What would be useful coverage criteria to estimate the quality of test suites
- The generation of test cases based on either code inspection or user-defined properties.

**My inspiration**: use mutation testing to estimate the quality of test suites. Basic of mutation testing: change a bit in the source code and see if the mutants can survive.

**My concerns**:

- Abstraction level for the mutation testing tool
  - Directly written in C/C++: had better not
  - As a 'plugin' for kernel tuner: 
    - The process is like:
      - Define [mutators](https://stryker-mutator.io/docs/mutation-testing-elements/supported-mutators/) and patterns for CUDA/OpenCL
      - A dry run is needed to see if the code can be compiled and started successfully.
      - Run all the mutants and give a report.
    - Pros: 
      - Can be done under Kernel Tuner's architecture for dry run and testing framework.
      - Higher abstraction level: interact with Kernel Tuner and PyCUDA/PYOpenCL.
      - Partially use python's sophisticated testing tools is possible
  - An independent tool focus on CUDA/OpenCL mutators
    - A whole (mutation) testing framework is much more work (must sharply limit the scope)
    - More freedom in implementation.

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



## Testing GPU code

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

## [book] The CUDA Handbook
