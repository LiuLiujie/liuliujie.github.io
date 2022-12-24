# Daily Retrospective

Sometimes I notice that I may spend a 'busy' day 'without doing anything'. I guess I need something to mark down the tiny hints.

## 2022-12-06 

- I have an idea to make an all-in-one application for Synology nas, including Download, Chat, Video and Photos. Not sure if it is feasible or not.
- I need to computing platform to perform my research
  - My requirement is
    - Can be access through website or remote desktop
    - Have a CLI
    - Run CUDA C, or use CUDA in python easily
  - Options
    - Self-host jupyter, but the plugins are poor mantled and the CLI is not well support
    - Google Colab is good but the syntax checker is relatively bad
  - My plan
    - Two docker container, one for jupyter and one for an ubuntu, sharing a shared folder storing the projects. All of them have simulated GPU. Using jupyter to run python related and use ubuntu to execute C code

## 2022-12-07

Is it possible that when the number of elements in the arrays is not evenly divisible by the thread block size, the performance will be influence