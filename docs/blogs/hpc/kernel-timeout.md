---
category: Computer Science
tag: 
- CUDA
- GPGPU
---
# How to stop a running CUDA kernel (when timeout)

When we start a CUDA kernel, it just runs like the Rud Bull racing car and can never be stopped before the kernel finishes.  However, we need a timeout machenism to stop the kernel when the the kernel goes to an infinite loop or deadlock. However, the NVIDIA doesn't offer a way to stop the kernel in a decent way, which is especially required when I am doing mutation testing on CUDA kernel. 

This article will record the steps I tried to reach the final result. Some of the directions or methods work, some doesn't, and some works but not work that good.

I come up with **2 directions** and try to deal with this problem.

 ## Direction 1: Let the kernel kill itself when timeout

Automatically generating an interruptions mechanism in kernel code to let the kernel kill itself (e.g. calling CUDA runtime API [`cudaDeviceReset()`](https://docs.nvidia.com/cuda/cuda-runtime-api/group__CUDART__DEVICE.html#group__CUDART__DEVICE_1gef69dd5c6d0206c2b8d099abac61f217)  when timeout).

### App 1: Copy a `interrupt` flag to the running kernel in runtime when timeout.

This method was hinted by a Stackoverflow [answer](https://stackoverflow.com/questions/12505750/how-can-a-global-function-return-a-value-or-break-out-like-c-c-does/12506030#12506030) and the hint from my supervisor.  We can try to send a boolean value to the device memory when the timer expires. Just like the kernel code below.

```c
//Use volatile here to avoid compiler optimization and make sure that the threads in the while loop will always read the interrupt parameter for each iteration.
__global___ void kernel(volatile bool *interrupt) 
{
    while (true) {
			if (*interrupt){
        return; // or directly asm("trap;");
      }
    }
}
```

The idea looks nice, but to achieve this we need to solve two problems.

#### P1: How to copy the interrupt flag from host to device in the runtime?

1. Single Stream ❌:  Both sync call `cudaMemcpy()`  and async call  `cudaMemcpyAsync()` cannot pass the flag successfully because the CUDA will implicitly synchronize before the kernel start (force the async call finish), and all the copy jobs after the kernel starts will not be sent to the kennel.

   ```c
   cudaMemcpy(d_x, x, N*sizeof(float), cudaMemcpyHostToDevice);
   cudaMemcpy(d_y, y, N*sizeof(float), cudaMemcpyHostToDevice);
   
   //Set the interrupt flag to false so that the kernel can run
   cudaMemcpyAsync(d_z, z, sizeof(bool), cudaMemcpyHostToDevice);
   
   //An implicit sycronization call happens here
   
   //Start the kernel
   saxpy<<<(N+255)/256, 256>>>(N, 2.0f, d_x, d_y, d_z);
   
   // Copy the interrupt flag, this will not be done before the kernel finish.
   cudaMemcpyAsync(d_z, z, sizeof(bool), cudaMemcpyHostToDevice); 
   ```

2. Multiple Stream ✅: 


   * I also tried this using CUDA-C.

     * **In miltiple stream.** If we do want to set a stream’s device memory in another stream, like the code below, where the killer kernel try to change the value of the flag in device memory. However, this will make the whole stream goes into a dead lock and the kernels cannot be stoped.

       ```c
       __global__ void killer(volatile bool *interrupt) {
           //It takes about 2s to run in my RTX3050
           if (threadIdx.x == 0) {
               for (int i = 0; i < 10000000;) {
                   if (!interrupt[0]) {
                       i=i+1;
                   }
               }
               interrupt[0] = 1;
           }
       }
       
       cudaMemcpyAsync(d_x, x, N*sizeof(float), cudaMemcpyHostToDevice, stream[0]);
       cudaMemcpyAsync(d_y, y, N*sizeof(float), cudaMemcpyHostToDevice, stream[0]);
       cudaMemcpyAsync(d_z, z, sizeof(bool), cudaMemcpyHostToDevice, stream[0]);
       saxpy<<<(N+255)/256, 256, 0, stream[0]>>>(N, 2.0f, d_x, d_y, d_z);
       
       cudaMemcpyAsync(d_z, z, sizeof(bool), cudaMemcpyHostToDevice, stream[1]);// Trigger dead lock
       killer<<<1, 1, 0, stream[1]>>>(d_z);
       
       cudaMemcpyAsync(z, d_z, sizeof(bool), cudaMemcpyDeviceToHost, stream[1]);
       ```

2. Use **pagelocked memory**, which will lock the part of host memory and prevent it from be swapped out. At this case we always know the address of memory and can copy from it to GPU.

3. **Unified memory** (managed memory) : the CUDA driver will do most of the memory allocation and copy job. As a programmer it looks like the CPU and GPU directly share a memory.

   At first I thought it not work because the CUDA guidance says it is not allowed to modify the unified memory on host side during the kernel runtime, the kernel will directly crash. However, later I found that on Pascal and later GPUs, the CPU and the GPU can simultaneously access managed memory. 



#### P2: How to make sure that all threads will `return`, or at least one thread will go to the `trap`?

There are 2 situation need to consider:

- All threads were trapped into the same infinite loop or different infinite loops (if any): The interrupt `if` statement need to be inserted into every `while` and `for` loop to make sure that at least one thread will reach the statement.

- At least one thread can break the loop and go to the end of the kernel, and we need that thread to wait there until 1) we reach the threshold and we interrupt, or 2) all threads can come to end properly and we make a return.

### App 2: Set a timer for each thread and let the thread trap the kernel when reaching the timeout threshold

*  I just come up with this idea and do some Google search, but I didn't try it.
*  There is no timer on GPUs like the one on CPUs. The running time needs to be calculated based on the frequency of the GPU using a runtime API called `clock()`
*  We still need to make sure that all threads will go to return or at least one thread will go to the trap. So the the `clock()` also needs to be set up in every loop.
*  It is not that decent because you need to check the clock many times and will slow down the exection. The `clock()` also return a `long long` type which is big but still have overflow possibility when the kernel execution time is also long.

## Direction 2: Kill the host side process to let the GPU driver kill the corresponding device process

When killing the python process, the corresponding GPU process will also be killed by the GPU driver and the occupied CUDA resources will also be released.

I managed to achieve this direction.

* Firstly I try to using thread instead of process because thread is lighter than process. However, killing a thread will not cause the kernel stop becuase the kernel is binded with the process. Then I have to use child process and it works
* All the kernel context (pycuda context in our case) need to be initialized within the child process

```python
class TerminableMutantRunner(multiprocessing.Process):
  # A new process is started for each mutant with all the test cases. Which means:
  #		1. The mutant will be compiled only once. (The most time comsuming job)
 	#			 If the compilation fail the process will return een error.		
  #   2. We interate the test cases and update the GPU arguments
  #   3. We return resutls for all the test cases to main process and verify the results there,
  # 		 or the killer will be started when a test case timeout and this process itself will be killed
  
  
	def __init__(self, kernel_builder: TestingKernelBuilder, mutant: Mutant, test_cases: list[TestCase],
                  result_queue, exception_queue): 
  
  def terminate(self, exception_cls, repeat_sec=2.0):
      if self.is_alive() is False:
          return True
      killer = MutantRunnerKiller(self, exception_cls, repeat_sec=repeat_sec)
      killer.start()

class MutantRunnerKiller(threading.Thread):
  # This is called by the process itself when the mutant execution timeout and 

  def run(self):
        while self.target_process.is_alive():
            os.kill(self.target_process.pid, signal.SIGKILL)
            self.target_process.join(self.repeat_sec)
```
