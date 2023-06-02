---
title: 人大金仓数据库KingBase+SpringBoot+MyBatis的使用
date: 2021-05-12 16:21:42
tags:
---
### 驱动包下载

访问人大金仓[官网](https://www.kingbase.com.cn)

![IMG_2963](http://lcbupayun.test.upcdn.net/IMG_2963.JPG)

找到下载与服务中软件下载
![IMG_2964](http://lcbupayun.test.upcdn.net/IMG_2964.JPG)

选择金仓数据库管理系统
![IMG_2965](http://lcbupayun.test.upcdn.net/IMG_2965.JPG)

选择v8R3

![IMG_2966](http://lcbupayun.test.upcdn.net/IMG_2966.JPG)

下载驱动

![IMG_2967](http://lcbupayun.test.upcdn.net/IMG_2967.JPG)

## 通过IDEA导入外库依赖jar包
![IMG_2968](http://lcbupayun.test.upcdn.net/IMG_2968.JPG)

POM配置
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.lichongbing</groupId>
    <artifactId>demo2</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo2</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.4</version>
        </dependency>

        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>kingbase</groupId>
            <artifactId>kingbase8</artifactId>
            <version>8</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

application.yml

```yml
server:
  port: 8080
 
spring:
  datasource:
    username: dghy
    password: 1
    url: jdbc:kingbase:locahost:5432/dghy?zeroDateTimeBehavior=convertToNull&useUnicode=true&characterEncoding=utf-8
    driver-class-name: com.kingbase.Driver
 
mybatis:
  mapper-locations: classpath:mapping/*Mapper.xml
 
#showSql
logging:
  level:
    com:
      example:
        mapper : debug


```

mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lichongbing.demo2.mapper.FavoriteMapper">

    <resultMap id="BaseResultMap" type="com.lichongbing.demo2.entity.Favorite">
        <result column="favorite_id" jdbcType="VARCHAR" property="favorite_id" />
        <result column="resource_id" jdbcType="VARCHAR" property="resource_id" />
        <result column="wname" jdbcType="VARCHAR" property="wname" />
        <result column="wid" jdbcType="VARCHAR" property="wid" />
        <result column="collection_user_id" jdbcType="VARCHAR" property="collection_user_id" />
        <result column="create_user_id" jdbcType="VARCHAR" property="create_user_id" />
        <result column="create_date" jdbcType="DATE" property="create_date" />
        <result column="update_user_id" jdbcType="VARCHAR" property="update_user_id" />
        <result column="update_date" jdbcType="DATE" property="update_date" />
        <result column="isvalid" jdbcType="NUMERIC" property="isvalid" />
        <result column="note" jdbcType="VARCHAR" property="note" />
        <result column="iid" jdbcType="VARCHAR" property="iid" />
        <result column="class_type" jdbcType="VARCHAR" property="class_type" />
        <result column="remark" jdbcType="VARCHAR" property="remark" />
    </resultMap>

    <select id="Sel" resultType="com.lichongbing.demo2.entity.Favorite">
        select * from cf_favorite where favorite_id = #{id}
    </select>

</mapper>


```
实体类

```java
package com.lichongbing.demo2.entity;

import java.util.Date;

/**
 * @author lichongbing
 * @version 1.0.0
 * @date 2021/5/12 9:43 上午
 * @description: 收藏实体类
 */
public class Favorite {
    /**
     * 主键id
     */
    private String favoriteId;
    /**
     * 资源编号
     */
    private String resourceId;
    /**
     * 业务类型名称
     */
    private String wname;
    /**
     * 业务类型ID
     */
    private String wid;
    /**
     * 收藏人编号
     */
    private String collectionUserId;
    /**
     * 创建用户编号
     */
    private String createUserId;
    /**
     * 创建时间
     */
    private Date createDate;
    /**
     * 更新用户编号
     */
    private String updateUserId;
    /**
     * 更新时间
     */

    private Date updateDate;
    /**
     * 是否有效,默认0: 有限，1：无效
     */
    private Integer isvalid;
    /**
     * 备注
     */
    private String note;
    /**
     * 业务主键
     */
    private String iID;
    /**
     * 所属分类
     */
    private String classType;
    /**
     * 标注
     */
    private String remark;

    public String getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(String favoriteId) {
        this.favoriteId = favoriteId;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public String getWname() {
        return wname;
    }

    public void setWname(String wname) {
        this.wname = wname;
    }

    public String getWid() {
        return wid;
    }

    public void setWid(String wid) {
        this.wid = wid;
    }

    public String getCollectionUserId() {
        return collectionUserId;
    }

    public void setCollectionUserId(String collectionUserId) {
        this.collectionUserId = collectionUserId;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUpdateUserId() {
        return updateUserId;
    }

    public void setUpdateUserId(String updateUserId) {
        this.updateUserId = updateUserId;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Integer getIsvalid() {
        return isvalid;
    }

    public void setIsvalid(Integer isvalid) {
        this.isvalid = isvalid;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getiID() {
        return iID;
    }

    public void setiID(String iID) {
        this.iID = iID;
    }

    public String getClassType() {
        return classType;
    }

    public void setClassType(String classType) {
        this.classType = classType;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "Favorite{" +
                "favoriteId='" + favoriteId + '\'' +
                ", resourceId='" + resourceId + '\'' +
                ", wname='" + wname + '\'' +
                ", wid='" + wid + '\'' +
                ", collectionUserId='" + collectionUserId + '\'' +
                ", createUserId='" + createUserId + '\'' +
                ", createDate=" + createDate +
                ", updateUserId='" + updateUserId + '\'' +
                ", updateDate=" + updateDate +
                ", isvalid=" + isvalid +
                ", note='" + note + '\'' +
                ", iID='" + iID + '\'' +
                ", classType='" + classType + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}

```
数据访问层

```java
package com.lichongbing.demo2.mapper;

import com.lichongbing.demo2.entity.Favorite;
import org.springframework.stereotype.Repository;

/**
 * @author lichongbing
 * @version 1.0.0
 * @date 2021/5/12 10:03 上午
 * @description: TODO
 */
@Repository
public interface FavoriteMapper {
    Favorite Sel(String id);


}

```
业务逻辑层
```java
package com.lichongbing.demo2.service;

import com.lichongbing.demo2.entity.Favorite;
import com.lichongbing.demo2.mapper.FavoriteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author lichongbing
 * @version 1.0.0
 * @date 2021/5/12 10:02 上午
 * @description: TODO
 */
@Service
public class FavoriteService {
    @Autowired
    FavoriteMapper favoriteMapper;
    public Favorite Sel(String id){
        return favoriteMapper.Sel(id);
    }
}

```

控制访问层
```java
package com.lichongbing.demo2.controller;

import com.lichongbing.demo2.entity.Favorite;
import com.lichongbing.demo2.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author lichongbing
 * @version 1.0.0
 * @date 2021/5/12 9:59 上午
 * @description: TODO
 */
@RestController
@RequestMapping("/favorite")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;
    @RequestMapping("getFavorite/{id1}")
    public Favorite getFavorite(@PathVariable Integer id1) {
        String id = String.valueOf(id1);
        return favoriteService.Sel(id);
    }

}



```


主程序入口

```java
package com.lichongbing.demo2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages ={"com.lichongbing.demo2.mapper" })

public class Demo2Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo2Application.class, args);
    }

}

```






