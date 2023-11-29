---
tag:
- Cloud Native
- Testing
- Mutation testing
category: Computer Science
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

- The solution should be able to be deployed by ourselves (public cloud) and our customers (private cloud), or in a hybrid format which our customers register their own private runner to our public orchestrator (hybrid cloud).

- Orchestrator
  - Communicate with the client
  - Divide the jobs
  - Keep track of the runners
  - Collect the results and send a feedback to the client
- Runner
  - Support both dynamic and static scaling
  - Should support multiple computer architecture, at least x64 and ARM64
  - Should allow our customers deploy on their own machine and register to public orchestrator.
- Performance features (from Nico)
  - Infinite loop (hit counter)
  - Timeout measurement
  - Test filtering
  - Mutant activation (static vs runtime)


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

## The solution we agree on

### Limit the scope

- Forget the dependencies, uploading the whole executable project to the cloud
- Focus on the orchestrator, only poc of runner and the client.

### General decision

- The whole architecture should be tool independent, which means it will not against other mutation testing tools. The orchestrator should at least be stryker flavour independent. The runner should be flavour dependent, which means different stryker flavour may have different runners.

### Client

- The client is responsible for install the dependencies and compile the code.
- The client-side will zip the project and upload to the orchestrator.

### Orchestrator

- Tech stack: NestJS + Redis

### Runner

- Flavor dependent
  - StrykerJS, StrykerC#, StrykerJVM....Even more system dependencies or customized environment.
  - If the client need more features that not supported by the public runner, they need to register the runner themselves.
  - Tag mechanism will be introduced to decide which runner can handle the corresponding job.
  
- Single direct message
  - Since the runner may hide inside an internal network and hard to find by an orchestrator with public IP, in this case, typically we have two solutions:
    - Long polling by the runner (GitHub Actions Runner and GitLab Runner)
    - Includes everything in heartbeat request and response
  - We choose the heartbeat request/response solution because:
    - Since the runner is flavour dependent, and we allow our customers register their own runner to our orchestrator we can image that there will be quite a lot 'less popular' runners staying idle all the time. We don't want to let these idle runners occupie too much long polling resources.
    - We don't need to provide a real time feedback like what the GitHub/GitLab runner do.
    



## My work

### Keep track of the runner 

- Register and deregister of the runner
- Store the runner
- Handle the runner death

For details, see issue [here](https://github.com/ISEP-Mutator-Orchestrator/mutator-orchestrator/issues/3). (A private repo recently, might be OpenSource future)



## Personal Reflection

### Project Management

Honestly speaking I have no idea what I am going to do even I have enough time to work on this project. It seems we didn't make a goal or blueprint for what we are going to make. I proposed using Jira to manage the project so that we can set some epic and trace our steps towards the epic, but I got refused. 

Then we are going to use GitHub workflow, but I was a little surprise we only use issue to track the project instead of the Project functions GitHub offers. The GitHub Issue is more or less a fine grain management like Jira Task or Bug, which is not suitable for setting a big goal or designing a specific function/module. This is also my fault because I didn't say anything to this. I should speak out 

### Typescript is good

This is the first time I met with Typescript, and the second time is this blog. It's nice to learn a string typing language for my frontend skill.

