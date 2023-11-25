---
category: Computer Science
tag: 
- CUDA
- GPGPU
---
# Init the GPGPU server (Anaconda, CUDA ...)

## Install Anaconda
[Guide](https://docs.anaconda.com/free/anaconda/install/linux/)

## CUDA tool kit installation on Ubuntu

Step 1. (Optional) Follow the [Installation Guide](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html) from NVIDIA to check the pre-condition.

Step 2. Download cuda from [here](https://developer.nvidia.com/cuda-downloads?target_os=Linux).

Step 3. **Reboot your server!!!!**

Step 4. [Post Installation](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#post-installation-actions) to configure the environment.

Note: Do NOT install the driver and the cuda-tool-kit on the save machine, this will cause problem like failing to load driver. If this does happen, please refer to [here](https://forums.developer.nvidia.com/t/nvidia-smi-has-failed-because-it-couldnt-communicate-with-the-nvidia-driver-make-sure-that-the-latest-nvidia-driver-is-installed-and-running/197141/5).