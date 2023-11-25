---
category: Computer Science
tag: 
- CUDA
- GPGPU
---
# CUDA Runtime Error and Restore

There are two types of errors in CUDA Runtime: sticky and non-sticky ones.

## CUDA Error: Sticky V.S. Non-sticky

|                | Sticky                                                       | Non-Sticky                                                   |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Description    | The behavior is undefined in the event of a CUDA error which corrupts the CUDA context.<br />This type of error is evident because it is "sticky", meaning once it occurs, every single CUDA API call will return that error, until the context is destroyed. | Non-sticky errors are cleared automatically after they are returned by a cuda API call |
| Examples       | Any "crashed kernel" type error (invalid access, unspecified launch failure, etc.) | An example of a non-sticky error might be an attempt to `cudaMalloc` more data than is available in device memory. Such an operation will return an out-of-memory error. |
| How to recover | The only method to restore proper device functionality after a non-recoverable ("sticky") CUDA error is to **terminate the host process** that initiated. | The error will be cleared after being returned, and subsequent (valid) cuda API calls can complete successfully, without returning an error. |

References: [here](https://stackoverflow.com/questions/56329377/reset-cuda-context-after-exception) and [here](https://stackoverflow.com/questions/31642520/states-of-memory-data-after-cuda-exceptions/31642573#31642573).