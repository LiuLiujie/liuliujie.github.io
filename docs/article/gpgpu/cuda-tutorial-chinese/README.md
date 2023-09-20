---
category: Computer Science
tag: 
- CUDA
- GPGPU
---
# CUDA Tutorial Chinese

## 内核启动

在CUDA中，启动内核函数时可以传递以下参数：

1. 网格维度（Grid Dimension）：指定了在GPU上启动的线程块的数量和排列方式。使用`dim3`类型的变量来表示，可以指定三个维度（x、y和z）。例如，`dim3 gridDim(16, 8, 1);`表示启动了一个大小为16x8的二维线程块网格。
2. 块维度（Block Dimension）：指定了每个线程块中的线程数量和排列方式。同样，使用`dim3`类型的变量来表示。例如，`dim3 blockDim(256, 1, 1);`表示每个线程块中有256个线程。
3. 动态共享内存大小（Dynamic Shared Memory）：在启动内核时，可以为每个线程块分配一定大小的动态共享内存。通过在内核函数调用中使用`<<<...>>>`语法来指定共享内存的大小。例如，`myKernel<<<gridDim, blockDim, sharedMemSize>>>();`表示为每个线程块分配了`sharedMemSize`字节的动态共享内存。
4. 流（Stream）：可选参数，用于指定内核执行的流。流可以用于控制内核的执行顺序和并发性。默认情况下，使用默认流。可以使用`cudaStream_t`类型的变量来表示流。

## 内存模型
1. [Shared Memory Bank](shared-memory-bank.md)
2. [Memory Fence](memory-fence.md)
## Q&A

### What's the difference of `__syncthreads()` and `cudaDeviceSynchronize()` ?

`__syncthreads()`和`cudaDeviceSynchronize()`是CUDA编程中用于同步线程和设备的函数，它们在功能和使用上有一些区别。

`__syncthreads()`是在CUDA线程块 (thread block) 内部使用的同步函数，是一个**设备函数**（`__decive__`函数）。它的作用是让线程块内的所有线程在执行到该函数时等待（thread barrier），直到线程块内的所有线程都执行完毕后才会继续执行后面的指令。它用于确保线程块内的线程之间的同步，常用于处理共享内存的数据一致性和协同工作（arrange shared memory to avoid data race）。需要注意的是，`__syncthreads()`只能在同一个线程块内使用，不能跨线程块同步。

`cudaDeviceSynchronize()`是在CUDA设备上使用的同步函数，是一个**主机函数**（`__host__`函数）。它的作用是阻塞主机线程直到设备上的所有（异步）任务都执行完成，比如内核调用（kernel calls）和异步内存辅助（async memory copies）。

**需要注意的点有：**

1. 由于`cudaDeviceSynchronize()`是主机函数，因此常在main函数或者主机主机函数中调用，而无法在全局函数（`__global__`函数）中调用。
2. 当没有指定内核运行的流时，即使用默认流（default stream），`cudaDeviceSynchronize()`会在内核启动前和完成后被隐式调用。