---
category:
- Computer Science
- Backend Development

tag: 
- Springboot
---

# @Resource和@Autowired与@Qualifier

- @Resource和@Autowired都是做bean的注入时使用

- @Resource不是Spring中的注解，但是Spring支持该注解，而@Autowired是Spring的注解

- **@Autowired**是按照**类型(byType)**来装配Bean的，不会去匹配name，默认情况下他要求依赖对象必须存在，如果需允许null，可以设置它的required属性为false，如果想让@Autowired按照名称（byName）来装配，则需要配合**@Qualifier**一起使用，Bean的实例名称由@qualifier注解的value参数指定
- **@Resource**则**同时有name、type**属性，Spring将name属性解析为Bean实例名称，将type属性解析为Bean的梳理类型。Spring先按照Bean实例名称装配，如果不能装配，则按照Bean的类型进行装配，如果都不能匹配，抛出NoSuchBeanDefinitionException异常。