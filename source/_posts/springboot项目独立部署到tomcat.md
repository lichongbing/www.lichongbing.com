---
title: springboot项目独立部署到tomcat
date: 2019-12-03 14:56:41
tags:
---

springboot内置了tomcat，所以springboot项目在开发环境中一般直接以jar包的形式进行运行，但在生产环境中还是建议使用tomcat来进行部署，独立部署到tomcat中需要注意以下几个事项：

* 1.设置打包形式为war包：

`<packaging>war</packaging>`


* 2.配置springboot内嵌tomcat的scope属性为provide：

`<dependency>`

`<groupId>org.springframework.boot</groupId>`

`<artifactId>spring-boot-starter-tomcat</artifactId>`

`<scope>provided</scope>`

`</dependency>`


* 3.添加tomcat依赖：

`<dependency>`

`<groupId>org.apache.tomcat.embed</groupId>`

`<artifactId>tomcat-embed-core</artifactId>`

`</dependency>`
`

* 4.改造启动类：

主要继承SpringBootServletInitializer且覆写configure方法，如下：

`@SpringBootApplication

public class SpringbootApplcation extends SpringBootServletInitializer {



public static void main(String[] args) {

SpringApplication.run(SpringbootApplcation.class,args) ;

}`



`@Override

protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {

// 注意这里要指向原先用main方法执行的Application启动类

return builder.sources(SpringbootApplcation.class);

}`



}


* 5.打包发布，在项目根目录执行maven命令：

`mvn clean package`


* 6.将war包发布到tomcat即可。

* 7.tomcat多个springboot项目启动失败
  信息报错
  `Caused by: org.springframework.jmx.export.UnableToRegisterMBeanException: Unable to register MBean [com.alibaba.druid.filter.stat.StatFilter@4178572] with key 'statFilter`

解决办法

除了第一个springboot项目以外，需要在其他springboot项目的application.properties配置文件中 加上下面这句配置

`spring.jmx.enabled=false`
* 8.建议在本地部署调试完，删除webapps下war包，tomcat整个文件传输到服务器发布。

