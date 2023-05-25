---
title: SpringBootAdmin微服务监控
author: lichongbing
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
top: false
toc: true
mathjax: false
essay: true
categories: Other
tags:
  - blog
  - hexo
keywords: Java springboot 谦谦君子
abbrlink: 42135
date: 2022-06-01 08:57:30
update: 2022-06-01 08:57:30
summary:
---

# 创建Server
> SpringBootAdmin通过收集actuator暴露出来的服务信息以及通过心跳检测的机制判断服务的运行状况。
* 1.引入依赖

```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-server</artifactId>
    <version>2.2.0</version>
</dependency>


```

* 2. 启动类手动装配AdminServer

```
@EnableAdminServer
@SpringBootApplication
public class MicroAdminApplication {
 
    public static void main(String[] args) {
        SpringApplication.run(MicroAdminApplication.class, args);
    }
 
}

```

* 3. 配置服务发现

### eureka

```yml
eureka:
  instance:
    prefer-ip-address: true
    lease-renewal-interval-in-seconds: 5
    lease-expiration-duration-in-seconds: 10
    instance-id: ${spring.cloud.client.ip-address}:${server.port}
  client:
    fetch-registry: true
    registry-fetch-interval-seconds: 5
    serviceUrl:
      defaultZone: http://10.2.1.5:9001/eureka/,http://10.2.1.6:9001/eureka/

```
### nacos

```yml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 192.168.174.137:8848

```

服务器端配置完毕！

* 4. 接入SpringSecurity
>保证登录安全，可以不接

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

```

指定登录页面为SpringBootAdmin

```java
@Configuration
public class SecuritySecureConfig extends WebSecurityConfigurerAdapter {
 
    private final String adminContextPath;
 
    public SecuritySecureConfig(AdminServerProperties adminServerProperties) {
        this.adminContextPath = adminServerProperties.getContextPath();
    }
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
        successHandler.setTargetUrlParameter( "redirectTo" );
 
        http.authorizeRequests()
                .antMatchers( adminContextPath + "/assets/**" ).permitAll()
                .antMatchers( adminContextPath + "/login" ).permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage( adminContextPath + "/login" ).successHandler( successHandler ).and()
                .logout().logoutUrl( adminContextPath + "/logout" ).and()
                .httpBasic().and()
                .csrf().disable();
    }
}

```

配置登录密码

```yml
spring:
  security:
    user:
      name: 'admin'
      password: 'admin'

```

# Client接入

* 1. 引入依赖

该依赖已经包含spring-boot-starter-actuator不需要重复引入

```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>2.2.0</version>
</dependency>
```

* 2. 配置暴露的端点信息

```yml
management:
  endpoints:
    web:
      exposure:
        include: '*'
  endpoint:
    health:
      show-details: ALWAYS

```

[注意] 默认会检查redis的健康状况，如果你的服务没有依赖redis，需要额外增加配置，关掉redis的健康检查。否则会报异常。

```yml
management:
  health:
    redis:
      enabled: false

```
依次启动Server和Client，浏览器登录

{port}访问springBootAdmin,此时服务已经接入成功

应用详情可查看应用具体的状况


Server端使用报警提示功能

接入邮箱报警提示

引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>

```

配置邮箱信息


```yml
spring:
  boot:
    admin:
      notify:
        mail:
          to: yuwenbo10@jd.com
          from: 18629015421@163.com
  mail:
    host: smtp.163.com
    password: '******'
    username: 18629015421@163.com
```





