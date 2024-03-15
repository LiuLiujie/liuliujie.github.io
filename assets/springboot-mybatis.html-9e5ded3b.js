import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,d as t}from"./app-9e8a13db.js";const e={},p=t(`<h1 id="springboot整合mybatis" tabindex="-1"><a class="header-anchor" href="#springboot整合mybatis" aria-hidden="true">#</a> Springboot整合MyBatis</h1><h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h2><ol><li>首先引入相关依赖。注意版本2.x是对应springboot 2.0</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!-- Spring Boot Web 依赖 --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
&lt;/dependency&gt;

&lt;!-- Spring Boot Test 依赖 --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;
    &lt;scope&gt;test&lt;/scope&gt;
&lt;/dependency&gt;

&lt;!-- Spring Boot Mybatis 依赖 --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.mybatis.spring.boot&lt;/groupId&gt;
    &lt;artifactId&gt;mybatis-spring-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;\${mybatis-spring-boot}&lt;/version&gt;
&lt;/dependency&gt;

&lt;!-- MySQL 连接驱动依赖 --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;mysql&lt;/groupId&gt;
    &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
    &lt;version&gt;\${mysql-connector}&lt;/version&gt;
&lt;/dependency&gt;

&lt;!-- Junit --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;junit&lt;/groupId&gt;
    &lt;artifactId&gt;junit&lt;/artifactId&gt;
    &lt;version&gt;4.12&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>springboot配置。配置数据源和mybatis的xml mapper文件路径</li></ol><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment">## 数据源配置</span>
<span class="token key attr-name">spring.datasource.url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://localhost:3306/springbootdb?useUnicode=true&amp;characterEncoding=utf8</span>
<span class="token key attr-name">spring.datasource.username</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">spring.datasource.password</span><span class="token punctuation">=</span><span class="token value attr-value">123456</span>
<span class="token key attr-name">spring.datasource.driver-class-name</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.jdbc.Driver</span>

<span class="token comment">## Mybatis 配置</span>
<span class="token key attr-name">mybatis.typeAliasesPackage</span><span class="token punctuation">=</span><span class="token value attr-value">org.spring.springboot.domain</span>
<span class="token key attr-name">mybatis.mapperLocations</span><span class="token punctuation">=</span><span class="token value attr-value">classpath:mapper/*.xml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>mybatis的xml文件。相比spring data jpa是全自动化的orm框架，mybatis是一个半自动的orm框架。相比较于jpa在java dto class里直接声明数据库的字段，mybatis要求开发者必须手动配置一个xml文件来进行配置。 可以看到有三部分构成： <ol><li>resultMap：保存了字段和dto class中属性的映射关系</li><li>sql：要获取的数据库字段</li><li>select：对应的sql语句和搜索参数</li></ol></li></ol><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mapper</span> <span class="token name">PUBLIC</span> <span class="token string">&quot;-//mybatis.org//DTD Mapper 3.0//EN&quot;</span> <span class="token string">&quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;</span> <span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.spring.springboot.dao.CityDao<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resultMap</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>BaseResultMap<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.spring.springboot.domain.City<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>id<span class="token punctuation">&quot;</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>id<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>province_id<span class="token punctuation">&quot;</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>provinceId<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>city_name<span class="token punctuation">&quot;</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cityName<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>description<span class="token punctuation">&quot;</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>description<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resultMap</span><span class="token punctuation">&gt;</span></span>

	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sql</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Base_Column_List<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
		id, province_id, city_name, description
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sql</span><span class="token punctuation">&gt;</span></span>

	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>findByName<span class="token punctuation">&quot;</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>BaseResultMap<span class="token punctuation">&quot;</span></span> <span class="token attr-name">parameterType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>java.lang.String<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
		select
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span> <span class="token attr-name">refid</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Base_Column_List<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
		from city
		where city_name = #{cityName}
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mapper</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>DAO层：类似jpa的repository。也是一个接口。可以看到函数参数与上面的参数对应</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CityDao</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 根据城市名称，查询城市信息
     *
     * <span class="token keyword">@param</span> <span class="token parameter">cityName</span> 城市名
     */</span>
    <span class="token class-name">City</span> <span class="token function">findByName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;cityName&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> cityName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),l=[p];function i(o,c){return a(),s("div",null,l)}const d=n(e,[["render",i],["__file","springboot-mybatis.html.vue"]]);export{d as default};
