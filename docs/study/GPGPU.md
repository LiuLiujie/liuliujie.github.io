# General-Purpose computing on Graphics Processing Units

## Concepts

### Tread block

A group of threads that can be executed serially or in parallel. Threads in the same block can communicate with each other.

Multiple blocks are combined to form a grid. All the blocks in the same grid contain the same number of threads.

See wiki [here](https://en.wikipedia.org/wiki/Thread_block_(CUDA_programming)).