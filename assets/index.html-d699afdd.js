import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as l,c as s,a as e,b as t,e as i,d as r}from"./app-9e8a13db.js";const h={},d=r('<h1 id="stryker-cloud-agent" tabindex="-1"><a class="header-anchor" href="#stryker-cloud-agent" aria-hidden="true">#</a> Stryker Cloud Agent</h1><p>This project is mainly about transfer a mutation testing tool called Stryker to a cloud native one. The basic idea is using a cloud runner (an agent) to run the mutants parallel in the cloud. In this way, intuitively, if all the mutants can be run in parallel in the cloud, the whole testing process can be speed up.</p><h2 id="my-ideas-and-solutions" tabindex="-1"><a class="header-anchor" href="#my-ideas-and-solutions" aria-hidden="true">#</a> My ideas and solutions</h2><h3 id="problems-i-can-see" tabindex="-1"><a class="header-anchor" href="#problems-i-can-see" aria-hidden="true">#</a> Problems I can see</h3><p>The basic idea looks not bad, but we still need to figure out some key points to continue:</p><ol><li><p><strong>Can it actually speed up the process?</strong></p><ul><li>Uploading the project to the cloud, orchestrate the runners and divide the tasks, and collect the result from the runners will also take considerable time.</li><li>We need to think about the size of our client&#39;s projects. If it is just a small project with 10 mutants, definitely it&#39;s not worthy to upload it to a cloud. If our client is a big company with some huge projects, then it might be worthy, but for such a big company they may have some regulations to protect their own code from uploading to a risky public cloud.</li><li>So we really need to offer a way to let our customer choose whether they want to upload their project or not. Also, a way to let our customer deploy their own &#39;Stryker agent&#39; on their own machine.</li></ul></li><li><p><strong>Dependency problem</strong></p><ul><li>Some dependencies may only offer in private registry, some dependencies may be customized for the client&#39;s project.</li><li>The dependencies need to be cleaned from the runner after execution. (GitHub Actions Runners V.S. GitLab Runners)</li><li>Docker might be a possible solution for this, an image can be built for each project with executable code, then the client upload the project, and the runners are only responsible for starting a container of the image and run it.</li></ul></li><li><p><strong>Scaling of the runners</strong></p><ul><li>When there are not so much jobs, we may reduce the runners; But we may need more runners when there are so many jobs waiting there.</li><li>The orchestrator may be able to communicate with related APIs from different Cloud Service Providers.</li><li>Since we offer a way to let our clients deploy their own runners, we may probably also need to offer a way to let the customers automatically scale their own runners. In this case, build the runner implementation as a docker images and start it as containers may help to reduce the scaling work.</li><li>The admin may want to manually start, pause and close a runner.</li></ul></li></ol><h3 id="requirements-extracted" tabindex="-1"><a class="header-anchor" href="#requirements-extracted" aria-hidden="true">#</a> Requirements extracted</h3><ul><li><p>The solution should be able to be deployed by ourselves (public cloud) and our customers (private cloud), or in a hybrid format which our customers register their own private runner to our public orchestrator (hybrid cloud).</p></li><li><p>Orchestrator</p><ul><li>Communicate with the client</li><li>Divide the jobs</li><li>Keep track of the runners</li><li>Collect the results and send a feedback to the client</li></ul></li><li><p>Runner</p><ul><li>Support both dynamic and static scaling</li><li>Should support multiple computer architecture, at least x64 and ARM64</li><li>Should allow our customers deploy on their own machine and register to public orchestrator.</li></ul></li><li><p>Performance features (from Nico)</p><ul><li>Infinite loop (hit counter)</li><li>Timeout measurement</li><li>Test filtering</li><li>Mutant activation (static vs runtime)</li></ul></li></ul><h3 id="my-ideas" tabindex="-1"><a class="header-anchor" href="#my-ideas" aria-hidden="true">#</a> My ideas</h3>',9),u=e("li",null,[e("strong",null,"Build a docker image per project and use docker runner (flavor independent)"),e("ul",null,[e("li",null,"Build a docker image includes all the executable code and dependencies and upload to an image registry."),e("li",null,"The orchestrator divides the task to the runners, the runners pull the image and start a container to run corresponding jobs."),e("li",null,[t("Pros: "),e("ul",null,[e("li",null,"Flavor independent runner, easy to start a runner (only need docker installed)")])]),e("li",null,[t("Cons: "),e("ul",null,[e("li",null,"How to build the image if the customer knows nothing about docker and didn't have docker installed on their machine.")])])])],-1),c=e("strong",null,"Divide the jobs at test cases/file level instead of mutants level",-1),p={href:"https://stryker-mutator.io/docs/stryker-net/configuration/#test-case-filter-string",target:"_blank",rel:"noopener noreferrer"},m=e("li",null,"No need to modify the Striker's source code, only specify which test case/file the Stryker should run.",-1),f=e("li",null,"Cons: I forget..... Maybe hard to generate the configure files?",-1),g=r('<h2 id="the-solution-we-agree-on" tabindex="-1"><a class="header-anchor" href="#the-solution-we-agree-on" aria-hidden="true">#</a> The solution we agree on</h2><h3 id="limit-the-scope" tabindex="-1"><a class="header-anchor" href="#limit-the-scope" aria-hidden="true">#</a> Limit the scope</h3><ul><li>Forget the dependencies, uploading the whole executable project to the cloud</li><li>Focus on the orchestrator, only poc of runner and the client.</li></ul><h3 id="general-decision" tabindex="-1"><a class="header-anchor" href="#general-decision" aria-hidden="true">#</a> General decision</h3><ul><li>The whole architecture should be tool independent, which means it will not against other mutation testing tools. The orchestrator should at least be stryker flavour independent. The runner should be flavour dependent, which means different stryker flavour may have different runners.</li></ul><h3 id="client" tabindex="-1"><a class="header-anchor" href="#client" aria-hidden="true">#</a> Client</h3><ul><li>The client is responsible for install the dependencies and compile the code.</li><li>The client-side will zip the project and upload to the orchestrator.</li></ul><h3 id="orchestrator" tabindex="-1"><a class="header-anchor" href="#orchestrator" aria-hidden="true">#</a> Orchestrator</h3><ul><li>Tech stack: NestJS + Redis</li></ul><h3 id="runner" tabindex="-1"><a class="header-anchor" href="#runner" aria-hidden="true">#</a> Runner</h3><ul><li><p>Flavor dependent</p><ul><li>StrykerJS, StrykerC#, StrykerJVM....Even more system dependencies or customized environment.</li><li>If the client need more features that not supported by the public runner, they need to register the runner themselves.</li><li>Tag mechanism will be introduced to decide which runner can handle the corresponding job.</li></ul></li><li><p>Single direct message</p><ul><li>Since the runner may hide inside an internal network and hard to find by an orchestrator with public IP, in this case, typically we have two solutions: <ul><li>Long polling by the runner (GitHub Actions Runner and GitLab Runner)</li><li>Includes everything in heartbeat request and response</li></ul></li><li>We choose the heartbeat request/response solution because: <ul><li>Since the runner is flavour dependent, and we allow our customers register their own runner to our orchestrator we can image that there will be quite a lot &#39;less popular&#39; runners staying idle all the time. We don&#39;t want to let these idle runners occupie too much long polling resources.</li><li>We don&#39;t need to provide a real time feedback like what the GitHub/GitLab runner do.</li></ul></li></ul></li></ul><h2 id="my-work" tabindex="-1"><a class="header-anchor" href="#my-work" aria-hidden="true">#</a> My work</h2><h3 id="keep-track-of-the-runner" tabindex="-1"><a class="header-anchor" href="#keep-track-of-the-runner" aria-hidden="true">#</a> Keep track of the runner</h3><ul><li>Register and deregister of the runner</li><li>Store the runner</li><li>Handle the runner death</li></ul>',14),b={href:"https://github.com/ISEP-Mutator-Orchestrator/mutator-orchestrator/issues/3",target:"_blank",rel:"noopener noreferrer"},y=r('<h2 id="personal-reflection" tabindex="-1"><a class="header-anchor" href="#personal-reflection" aria-hidden="true">#</a> Personal Reflection</h2><h3 id="project-management" tabindex="-1"><a class="header-anchor" href="#project-management" aria-hidden="true">#</a> Project Management</h3><p>Honestly speaking I have no idea what I am going to do even I have enough time to work on this project. It seems we didn&#39;t make a goal or blueprint for what we are going to make. I proposed using Jira to manage the project so that we can set some epic and trace our steps towards the epic, but I got refused.</p><p>Then we are going to use GitHub workflow, but I was a little surprise we only use issue to track the project instead of the Project functions GitHub offers. The GitHub Issue is more or less a fine grain management like Jira Task or Bug, which is not suitable for setting a big goal or designing a specific function/module. This is also my fault because I didn&#39;t say anything to this. I should speak out</p><h3 id="typescript-is-good" tabindex="-1"><a class="header-anchor" href="#typescript-is-good" aria-hidden="true">#</a> Typescript is good</h3><p>This is the first time I met with Typescript, and the second time is this blog. It&#39;s nice to learn a string typing language for my frontend skill.</p>',6);function w(k,v){const n=a("ExternalLinkIcon");return l(),s("div",null,[d,e("ol",null,[u,e("li",null,[c,e("ul",null,[e("li",null,[t("Stryker has already support test case filter, see "),e("a",p,[t("here"),i(n)]),t(".")]),m,f])])]),g,e("p",null,[t("For details, see issue "),e("a",b,[t("here"),i(n)]),t(". (A private repo recently, might be OpenSource future)")]),y])}const S=o(h,[["render",w],["__file","index.html.vue"]]);export{S as default};