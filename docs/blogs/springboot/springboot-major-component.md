---
category:
- Computer Science
- Backend Development

tag: 
- Springboot
---

# Springboot 四大组件

四大组件分别是：Starter， AutoConfigurator, CLI 以及 Actuator.



## Starters

- 官方提供的starter是这样的：`spring-boot-starter-xxx`
- 非官方的starter是这样的：`xxx-spring-boot-starter`

通过在pom表引入starter，我们同时引入了其所需的相关依赖和自动配置的文件，同时我们也可以通过yml文件对其进行配置。



## Autoconfigure

autoconfigure是与starter同时引入的，是starter中提到的依赖的自动配置的具体实现，负责指导Spring配置Bean实例到Spring容器。

- 官方的包的autoconfigure通常会包括在`spring-boot-autoconfigure`里
- 非官方的比如nacos会有单独的starter和autoconfigure的包



## CLI

在官网上的介绍都只有一句话：用于初始化Springboot项目和设置密码



## Actuator

Spring Boot的监控插件，本身提供了很多接口可以用于在生产环境下获取当前项目的各项运行状态指标。

它提供了一系列的端点endpoints供开发者选择性的开启暴露相关信息出来供监控使用，我们可以使用rest API来访问这些端点获取信息。