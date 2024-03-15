# Springboot整合MyBatis

## 基本使用

1. 首先引入相关依赖。注意版本2.x是对应springboot 2.0

```
<!-- Spring Boot Web 依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Boot Test 依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

<!-- Spring Boot Mybatis 依赖 -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>${mybatis-spring-boot}</version>
</dependency>

<!-- MySQL 连接驱动依赖 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${mysql-connector}</version>
</dependency>

<!-- Junit -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
```

2. springboot配置。配置数据源和mybatis的xml mapper文件路径

```properties
## 数据源配置
spring.datasource.url=jdbc:mysql://localhost:3306/springbootdb?useUnicode=true&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.jdbc.Driver

## Mybatis 配置
mybatis.typeAliasesPackage=org.spring.springboot.domain
mybatis.mapperLocations=classpath:mapper/*.xml
```

3. mybatis的xml文件。相比spring data jpa是全自动化的orm框架，mybatis是一个半自动的orm框架。相比较于jpa在java dto class里直接声明数据库的字段，mybatis要求开发者必须手动配置一个xml文件来进行配置。
   可以看到有三部分构成：
   1. resultMap：保存了字段和dto class中属性的映射关系
   2. sql：要获取的数据库字段
   3. select：对应的sql语句和搜索参数

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="org.spring.springboot.dao.CityDao">
	<resultMap id="BaseResultMap" type="org.spring.springboot.domain.City">
		<result column="id" property="id" />
		<result column="province_id" property="provinceId" />
		<result column="city_name" property="cityName" />
		<result column="description" property="description" />
	</resultMap>

	<sql id="Base_Column_List">
		id, province_id, city_name, description
	</sql>

	<select id="findByName" resultMap="BaseResultMap" parameterType="java.lang.String">
		select
		<include refid="Base_Column_List" />
		from city
		where city_name = #{cityName}
	</select>

</mapper>
```

4. DAO层：类似jpa的repository。也是一个接口。可以看到函数参数与上面的参数对应

```java
public interface CityDao {

    /**
     * 根据城市名称，查询城市信息
     *
     * @param cityName 城市名
     */
    City findByName(@Param("cityName") String cityName);
}
```

