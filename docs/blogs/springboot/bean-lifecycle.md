---
category:
- Computer Science
- Backend Development

tag: 
- Springboot
---

# Bean的声明周期

Bean 的生命周期概括起来就是 **4 个阶段**：

1. 实例化（Instantiation）
2. 属性赋值（Populate）
3. 初始化（Initialization）
4. 销毁（Destruction）![image-20231124202408750](https://pics.yujieliu.com/blog/2023/11/7c374cad4812be70e763e4001088c9b6.png)

5. 实例化：第 1 步，实例化一个 bean 对象；

6. 属性赋值：第 2 步，为 bean 设置相关属性和依赖；

7. 初始化：第 3~7 步，步骤较多，其中第 5、6 步为初始化操作，第 3、4 步为在初始化前执行，第 7 步在初始化后执行，该阶段结束，才能被用户使用；

8. 销毁：第 8~10步，第8步不是真正意义上的销毁（还没使用呢），而是先在使用前注册了销毁的相关调用接口，为了后面第9、10步真正销毁 bean 时再执行相应的方法。

### Aware接口

若 Spring 检测到 bean 实现了 Aware 接口，则会为其注入相应的依赖。所以**通过让bean 实现 Aware 接口，则能在 bean 中获得相应的 Spring 容器资源**。

Spring 中提供的 Aware 接口有：

1. BeanNameAware：注入当前 bean 对应 beanName；
2. BeanClassLoaderAware：注入加载当前 bean 的 ClassLoader；
3. BeanFactoryAware：注入当前 BeanFactory 容器的引用。



### BeanPostProcesser前后置处理

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



### InitializingBean 和 init-method

InitializingBean 和 init-method 是 Spring 为 **bean 初始化**提供的扩展点