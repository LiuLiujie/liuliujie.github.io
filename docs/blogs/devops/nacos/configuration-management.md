---
category:
- Computer Science
- MicroService
- Service Discovery
- Configuration Management

tag: 
- Nacos
---
# Nacos 进行配置管理

Nacos支持多种配置管理模式，当已经启动一个nacos实例后，访问[http://localhost:8848/nacos](http://localhost:8848/nacos)就能访问nacos的Dashboard，可以看到有以下支持。

比如，我的一个Springboot项目中就用到了下面这种配置方式，主要用到的就是properties和YAML两种

<img src="https://pics.yujieliu.com/blog/2023/12/62beff5a51a74ea950df549034cc83cf.png" alt="Screenshot 2023-12-06 at 21.02.25" style="zoom:50%;" />





## 使用Java SDK进行配置

官方文档在[这里](https://nacos.io/zh-cn/docs/guide/user/sdk)，我的需求主要只是获取相关的配置而不是发布，因此只实现了获取相关配置的接口。可以看到这种方式需要进行Bean的注册通过调用Bean的方式进行实现

```java
@Log4j2
@Service
public class NacosConfigService implements ConfigService {

    @Value("${api-monitor.config.nacos.server}")
    private String nacosServer;
    @Value("${api-monitor.config.nacos.username}")
    private String nacosUsername = "";
    @Value("${api-monitor.config.nacos.password}")
    private String nacosPassword = "";
    @Value("${api-monitor.config.nacos.group}")
    private String nacosGroup;
    @Value("${api-monitor.config.nacos.data-id}")
    private String nacosDataId;
    private final Properties request = new Properties();
    private final Properties properties = new Properties();

    @Override
    public String getProperty(String key) {
        try {
            String property = this.getContext();
            if (StringUtils.hasText(property)) {
                properties.load(new StringReader(property));
            }
        } catch (Exception e) {
            log.error("Nacos error:{}", ExceptionUtils.getStackTrace(e));
        }
        String property = properties.getProperty(key);
        return property != null? property : "";
    }

    private String getContext() {
        String context = null;
        try {
            request.put(PropertyKeyConst.SERVER_ADDR, nacosServer);
            if (nacosUsername != null && !nacosUsername.isBlank()){
                request.put(PropertyKeyConst.USERNAME, nacosUsername);
                request.put(PropertyKeyConst.PASSWORD, nacosPassword);
            }
            context = NacosFactory.createConfigService(request)
                    .getConfig(nacosDataId, nacosGroup, 5000);
        } catch (NacosException e) {
            log.error("Nacos error:{}", ExceptionUtils.getStackTrace(e));
        }
        return context;
    }
}
```



## 使用Springboot原生注解

[官方文档](https://nacos.io/zh-cn/docs/ecology/use-nacos-with-spring-boot)

使用原生注解有一个问题，就是@Conditionalxxxxx这样的注解是在新版中才支持注入的，这主要是和Bean的生命周期有关需要Nacos在Bean更早的生命阶段进行获取配置然后条件注入Bean。





## 使用SpringCloud原生注解

[官方文档](https://nacos.io/zh-cn/docs/ecology/use-nacos-with-spring-cloud)