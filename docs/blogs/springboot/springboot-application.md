# SpringBootApplication注解

查看@SpringBootApplication的源码，可以发现其中有三个核心注解：

- @SpringBootConfiguration：这个等于是@Configuration的重命名，是为了确保全局只有一个这样的注解
- @EnableAutoConfiguration：启动自动配置，让框架去自动配置 Bean 到 Spring 容器
- @ComponentScan：

![img](https://pics.yujieliu.com/blog/2023/11/314785d7262c3f8d0b49ef5ef55796d5.png)

## Configuration

