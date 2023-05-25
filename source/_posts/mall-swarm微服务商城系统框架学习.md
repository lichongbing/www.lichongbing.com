---
title: mall-swarm微服务商城系统框架学习
abbrlink: 61457
date: 2019-12-25 00:29:47
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---

# mall-swarm微服务商城系统框架
项目介绍
----

`mall-swarm`是一套微服务商城系统，采用了 Spring Cloud Greenwich、Spring Boot 2、MyBatis、Docker、Elasticsearch等核心技术，同时提供了基于Vue的管理后台方便快速搭建系统。`mall-swarm`在电商业务的基础集成了注册中心、配置中心、监控中心、网关等系统功能。

系统架构图
-----

![系统架构图](https://user-gold-cdn.xitu.io/2019/12/1/16ec1ac4d3247551?imageView2/0/w/1280/h/960/ignore-error/1)

组织结构
----

    mall
    ├── mall-common -- 工具类及通用代码模块
    ├── mall-mbg -- MyBatisGenerator生成的数据库操作代码模块
    ├── mall-security -- 封装SpringSecurity+JWT的安全认证的模块
    ├── mall-registry -- 基于Eureka的微服务注册中心
    ├── mall-config -- 基于Spring Cloud Config的微服务配置中心
    ├── mall-gateway -- 基于Spring Cloud Gateway的微服务API网关服务
    ├── mall-monitor -- 基于Spring Boot Admin的微服务监控中心
    ├── mall-admin -- 后台管理系统服务
    ├── mall-search -- 基于Elasticsearch的商品搜索系统服务
    ├── mall-portal -- 移动端商城系统服务
    └── mall-demo -- 微服务远程调用测试服务
    复制代码

项目文档
----

*   项目文档`mall`系列教程：[www.macrozheng.com](https://macrozheng.github.io/mall-learning)
*   配套`Spring Cloud`系列教程：[github.com/macrozheng/…](https://github.com/macrozheng/springcloud-learning)

项目演示
----

*   后台管理系统： [www.macrozheng.com/admin/index…](http://www.macrozheng.com/admin/index.html)
*   移动端商城系统：[www.macrozheng.com/app/index.h…](http://www.macrozheng.com/app/index.html)

技术选型
----

### 后端技术

|  技术 | 说明 |
|  ----  | ----  |
|  Spring Cloud | 微服务框架 |
|  Spring Boot | 容器+MVC框架 |
|  Spring Security | 认证和授权框架 |
|  MyBatis | ORM框架 |
|  MyBatisGenerator | 数据层代码生成 |
|  PageHelper | MyBatis物理分页插件 |
|  Swagger-UI | 文档生产工具 |
|  Elasticsearch | 搜索引擎 |
|  RabbitMq | 消息队列 |
|  Redis | 分布式缓存 |
|  MongoDb | NoSql数据库 |
|  Docker | 应用容器引擎 |
|  Druid | 数据库连接池 |
|  OSS | 对象存储 |
|  JWT | JWT登录支持 |
|  LogStash | 日志收集 |
|  Lombok | 简化对象封装工具 |
|  Seata | 全局事务管理框架 |

### 前端技术

|  技术 | 说明 |
|  ----  | ----  |
|  Vue | 前端框架 |
|  Vue-router | 路由框架 |
|  Vuex | 全局状态管理框架 |
|  Element | 前端UI框架 |
|  Axios | 前端HTTP框架 |
|  v-charts | 基于Echarts的图表框架 |


环境搭建
----

### 开发环境搭建

> `mall-swarm`中使用到的环境和`mall`项目中大致相同，具体可以查看[mall在Windows环境下的部署](https://mp.weixin.qq.com/s/Q9ybpfq8IEdbZmvlaMXJdg)。

简易环境搭建流程：

*   安装IDEA并导入项目源码；
*   安装MySql，创建一个`mall`数据库，并导入`/document/sql/mall.sql`文件；
*   安装Redis、Elasticsearch、MongoDB、RabbitMQ等环境。

### 项目部署

> `mall-swarm`项目启动有先后顺序，大家要按照以下顺序启动。

#### 启动注册中心`mall-registry`

*   直接运行com.macro.mall.MallRegistryApplication的main函数即可；
*   运行完成后可以通过注册中心控制台查看：[http://localhost:8001](http://localhost:8001)

#### 启动配置中心`mall-config`

*   直接运行com.macro.mall.MallConfigApplication的main函数即可；
*   访问以下接口获取mall-admin在dev环境下的配置信息：[http://localhost:8301/master/admin-dev.yml](http://localhost:8301/master/admin-dev.yml)

#### 启动监控中心`mall-monitor`

*   直接运行com.macro.mall.MallMonitorApplication的main函数即可；
*   运行完成后可以通过监控中心控制台查看：[http://localhost:8101](http://localhost:8101)
*   输入账号密码`macro:123456`可以登录查看。

#### 启动网关服务`mall-gateway`

*   直接运行com.macro.mall.MallGatewayApplication的main函数即可；
*   访问以下接口获取动态路由规则：[http://localhost:8201/actuator/gateway/routes](http://localhost:8201/actuator/gateway/routes)

#### 启动后台管理服务`mall-admin`

*   直接运行com.macro.mall.MallAdminApplication的main函数即可；
*   通过`mall-gateway`网关服务访问接口文档：[http://localhost:8201/mall-admin/swagger-ui.html](http://localhost:8201/mall-admin/swagger-ui.html)

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec1ac4d709ef3a?imageView2/0/w/1280/h/960/ignore-error/1)

*   登录接口地址：[http://localhost:8201/mall-admin/admin/login](http://localhost:8201/mall-admin/admin/login)
*   访问登录接口获取到token后放入认证的头信息即可正常访问其他需要登录的接口：

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec1ac4d7561624?imageView2/0/w/1280/h/960/ignore-error/1)

#### 启动前台服务`mall-portal`

*   直接运行com.macro.mall.portal.MallPortalApplication的main函数即可；
*   通过`mall-gateway`网关服务访问接口文档：[http://localhost:8201/mall-portal/swagger-ui.html](http://localhost:8201/mall-portal/swagger-ui.html)

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec1ac4d935433e?imageView2/0/w/1280/h/960/ignore-error/1)

*   登录接口地址：[http://localhost:8201/mall-portal/sso/login](http://localhost:8201/mall-portal/sso/login)
*   调用需要登录的接口方式同`mall-admin`。

#### 启动搜索服务`mall-search`

*   直接运行com.macro.mall.search.MallSearchApplication的main函数即可；
*   通过`mall-gateway`网关服务访问接口文档：[http://localhost:8201/mall-search/swagger-ui.html](http://localhost:8201/mall-search/swagger-ui.html)

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec1ac4d94d31fc?imageView2/0/w/1280/h/960/ignore-error/1)

#### 启动测试服务`mall-demo`

*   直接运行com.macro.mall.MallAdminApplication的main函数即可；
*   通过`mall-gateway`网关服务访问接口文档：[http://localhost:8201/mall-demo/swagger-ui.html](http://localhost:8201/mall-demo/swagger-ui.html)

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec1ac4dab3086a?imageView2/0/w/1280/h/960/ignore-error/1)

*   可以通过调用FeignAdminController、FeignPortalController、FeignSearchController来测试使用Feign的远程调用功能。

### 效果展示

*   注册中心服务信息：

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec1ac50a9ac036?imageView2/0/w/1280/h/960/ignore-error/1)

*   监控中心服务概览信息：

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec1ac5111c02f6?imageView2/0/w/1280/h/960/ignore-error/1)

![16ec1ac5113f9534.png](http://lcbupayun.test.upcdn.net/static/2b45ff5a92e032f239a1713ff77608f4.png)

*   监控中心单应用详情信息：

![16ec1ac50e4c9c28.png](http://lcbupayun.test.upcdn.net/static/ba8ae3f051adcc045792b4076c03341c.png)


![16ec1ac5121991a0.png](http://lcbupayun.test.upcdn.net/static/ad370cf79bb91ef0afe102ac747ed589.png)

扩展解决方案
------

*   如果想使用`Consul`作为注册及配置中心的话请参考：[Spring Cloud Consul：服务治理与配置中心](https://juejin.im/post/5db05582f265da4d4c20180f)
*   如果想使用`Nacos`作为注册及配置中心的话请参考：[Spring Cloud Alibaba：Nacos 作为注册中心和配置中心使用](https://juejin.im/post/5dcbf7bc5188250d1f5a78ea)
*   `分布式事务`解决方案请参考：[使用Seata彻底解决Spring Cloud中的分布式事务问题！](https://juejin.im/post/5dd53a9d5188255d35425a08)
*   `ELK`日志收集系统的搭建请参考：[SpringBoot应用整合ELK实现日志收集](https://juejin.im/post/5d2738a2f265da1bac404299)。

项目地址
----

> 开源不易，觉得本项目有帮助的朋友可以`点个Star`支持下！

[github.com/macrozheng/…](https://github.com/macrozheng/mall-swarm)

