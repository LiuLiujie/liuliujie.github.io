---
category:
- Computer Science
- MicroService
- Service Discovery
- Configuration Management

tag: 
- Nacos
---
# 启动一个Nacos单机项目

Nacos官方有相关的[教程](https://nacos.io/zh-cn/docs/quickstart/quick-start/)

由于我是arm的电脑，而标准版nacos docker部署不支持arm，因此使用`nacos-slim`这个包：

```yml
version: "2"
services:
  nacos:
    image: nacos/nacos-server:v2.2.3-slim
```

