---
sidebarDepth: 2
---
# Stryker Cloud Agent
This project is mainly about transfer a mutation testing tool called Stryker to a cloud native one. The basic idea is using a cloud runner (an agent) to run the mutants parallel in the cloud. In this way, intuitively, if all the mutants can be run in parallel in the cloud, the whole testing process can be speed up.

## My ideas and solutions
### Problems I can see
The basic idea looks not bad, but we still need to figure out some key points to continue:
1. **Can it actually speed up the process?**

     - Uploading the project to the cloud, orchestrate the runners and divide the tasks, and collect the result from the runners will also take considerable time.  
     - We need to think about the size of our client's projects. If it is just a small project with 10 mutants, definitely it's not worthy to upload it to a cloud. If our client is a big company with some huge projects, then it might be worthy, but for such a big company they may have some regulations to protect their own code from uploading to a risky public cloud. 
     - So we really need to offer a way to let our customer choose whether they want to upload their project or not. Also, a way to let our customer deploy their own 'Stryker agent' on their own machine.
2. **Dependency problem**
   - Some dependencies may only offer in private registry, some dependencies may be customized for the client's project.
   - The dependencies need to be cleaned from the runner after execution. (GitHub Actions Runners V.S. GitLab Runners)
   - Docker might be a possible solution for this, an image can be built for each project with executable code, then the client upload the project, and the runners are only responsible for starting a container of the image and run it.
3. **Scaling of the runners**
   - When there are not so much jobs, we may reduce the runners; But we may need more runners when there are so many jobs waiting there.
   - The orchestrator may be able to communicate with related APIs from different Cloud Service Providers.
   - Since we offer a way to let our clients deploy their own runners, we may probably also need to offer a way to let the customers automatically scale their own runners. In this case, build the runner implementation as a docker images and start it as containers may help to reduce the scaling work.  
   - The admin may want to manually start, pause and close a runner.
### Requirements extracted

- The solution should be able to be deployed by ourselves (public cloud) and our customers (private cloud), or in a hybrid format which the company register their own private runner to our public orchestrator (hybrid cloud).

- Orchestrator
  - Communicate with the client
  - Divide the jobs
  - Keep track of the runners
  - Collect the results and send a feedback to the client
- Runner
  - 

### My ideas

1. **Build a docker image per project and use docker runner (flavor independent)**
   - Build a docker image includes all the executable code and dependencies and upload to an image registry.
   - The orchestrator divides the task to the runners, the runners pull the image and start a container to run corresponding jobs.
   - Pros:
     - Flavor independent runner, easy to start a runner (only need docker installed)
   - Cons:
     -  How to build the image if the customer knows nothing about docker and didn't have docker installed on their machine.
2. **Divide the jobs at test cases/file level instead of mutants level**
   - Stryker has already support test case filter, see [here](https://stryker-mutator.io/docs/stryker-net/configuration/#test-case-filter-string).
   - No need to modify the Striker's source code, only specify which test case/file the Stryker should run.
   - Cons: I forget..... Maybe hard to generate the configure files?

## The solution we finally choose

### Limit the scope

- Forget the dependencies, uploading the whole executable project to the cloud
- Focus on the orchestrator, only poc of runner and the client.

### Orchestrator

### Runner

- Flavor dependent
  - If the client need more features that not supported by the public runner, they need to register the runner themselves.


## My jobs

### Keep track of the runner 