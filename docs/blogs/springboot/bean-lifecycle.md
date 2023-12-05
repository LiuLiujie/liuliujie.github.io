---
category:
- Computer Science
- Backend Development

tag: 
- Springboot
---

# Bean的声明周期

Bean 的生命周期概括起来就是 **4 个阶段**：

1. 实例化（Instantiation）：第 1 步，实例化一个 bean 对象；

2. 属性赋值（Populate）：第 2 步，为 bean 设置相关属性和依赖；

3. 初始化（Initialization）：第 3~7 步，步骤较多，其中第 5、6 步为初始化操作，第 3、4 步为在初始化前执行，第 7 步在初始化后执行，该阶段结束，才能被用户使用；

4. 销毁（Destruction）：第 8~10步，第8步不是真正意义上的销毁（还没使用呢），而是先在使用前注册了销毁的相关调用接口，为了后面第9、10步真正销毁 bean 时再执行相应的方法。

![image-20231124202408750](https://pics.yujieliu.com/blog/2023/11/7c374cad4812be70e763e4001088c9b6.png)

这里有个[小项目](https://github.com/LiuLiujie/bean-life-cycle)来演示生命周期的流程，建议配合观看。



### 1.示例化

可以通过@Component注解开始进行示例化；

也可以xml进行示例化，在Application的main上标注`@ImportResource("classpath:xxx.xml")`，然后把文件放在resources里。



### 2.属性赋值

根据xml里的配置对属性进行setter赋值



### 3.Aware接口

若 Spring 检测到 bean 实现了 Aware 接口，则会为其注入相应的依赖。所以**通过让bean 实现 Aware 接口，则能在 bean 中获得相应的 Spring 容器资源**。

Spring 中提供的 Aware 接口有，以下按顺序进行执行：

#### 3.1 BeanNameAware

注入当前 bean 对应 beanName；

#### 3.2 BeanClassLoaderAware

注入加载当前 bean 的 ClassLoader，让bean知道其父是谁（双亲委派机制）

#### 3.3 BeanFactoryAware

注入当前 BeanFactory 容器的引用，是哪个工厂初始化的bean。



### 4. 和 7. BeanPostProcesser前后置处理

我们可以实现下面的两个方法来做到第4步和第7步。

注意这两个方法是会被所有的bean都用到的，因此相比前面的Aware接口是仅仅对那个类进行处理，这个方法的实现是针对所有的Bean。

```java
public interface BeanPostProcessor {

	// 初始化前置处理
	default Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}

	// 初始化后置处理
	default Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}
  
}
```



### `@Postconstruct`注解在此时进行



### 5.和 6. InitializingBean 和 init-method

InitializingBean 和 init-method 是 Spring 为 **bean 初始化**提供的扩展点，两个基本差不多，区别有：

- 前一个通过实现`InitializingBean`接口的`void afterPropertiesSet()`方法进行处理
- 而后者则需要通过xml文件进行配置来调用



### `@PreDestroy注解`在此时进行



### 8. DestructionAwareBeanPostProcessor接口

和前面的一样，通过实现下面的方法来对**所有**bean的销毁进行处理

```java
public interface DestructionAwareBeanPostProcessor extends BeanPostProcessor {
  
	void postProcessBeforeDestruction(Object bean, String beanName) throws BeansException;
  ...
}
```



### 9. 和 10. 实现DisposableBean和destroy-method

DisposableBean和destroy-method都是针对某个bean进行的自定义的销毁方法

- 前一个通过实现DisposableBean接口的`void destroy()`方法进行处理
- 而后者则需要通过xml文件进行配置来调用