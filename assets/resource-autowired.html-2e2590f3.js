import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as r,c as i,d as o}from"./app-9e8a13db.js";const n={},t=o('<h1 id="resource和-autowired与-qualifier" tabindex="-1"><a class="header-anchor" href="#resource和-autowired与-qualifier" aria-hidden="true">#</a> @Resource和@Autowired与@Qualifier</h1><ul><li><p>@Resource和@Autowired都是做bean的注入时使用</p></li><li><p>@Resource不是Spring中的注解，但是Spring支持该注解，而@Autowired是Spring的注解</p></li><li><p><strong>@Autowired</strong>是按照<strong>类型(byType)<strong>来装配Bean的，不会去匹配name，默认情况下他要求依赖对象必须存在，如果需允许null，可以设置它的required属性为false，如果想让@Autowired按照名称（byName）来装配，则需要配合</strong>@Qualifier</strong>一起使用，Bean的实例名称由@qualifier注解的value参数指定</p></li><li><p><strong>@Resource</strong>则<strong>同时有name、type</strong>属性，Spring将name属性解析为Bean实例名称，将type属性解析为Bean的梳理类型。Spring先按照Bean实例名称装配，如果不能装配，则按照Bean的类型进行装配，如果都不能匹配，抛出NoSuchBeanDefinitionException异常。</p></li></ul>',2),a=[t];function s(u,c){return r(),i("div",null,a)}const p=e(n,[["render",s],["__file","resource-autowired.html.vue"]]);export{p as default};