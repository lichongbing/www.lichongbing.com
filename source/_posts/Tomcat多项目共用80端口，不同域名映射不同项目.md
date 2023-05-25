---
title: Tomcat多项目共用80端口，不同域名映射不同项目
abbrlink: 32006
date: 2019-12-03 15:23:10
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
#tomcat多项目共用80端口，不同域名映射不同项目
准备工作：

* jdk1.8（配好环境变量）
* tomcat8
  在tomcat中添加项目

在webapps中添加3个项目，这3个都是很简单的项目，只有index.html和web.xml。

index.html只有一个h1标签，里面写了web1、web2和web3用于区分3个项目

![20180509111548344.png](http://lcbupayun.test.upcdn.net/static/2438a33a80233c4984e0e7cb1ff4e830.png)

**index.html**
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ok</title>
</head>
<body>
<h1>web1</h1>
</body>
</html>

`
**web.xml**
`<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
version="3.1"
metadata-complete="true">

</web-app>

`
**配置tomcat**

打开tomcat_home/conf/server.xml，修改端口为80，添加3个host映射。

这里需要注意的是，tomcat原来有一个host，新添加host要放在该host的前面。为方便查看，已删除掉无用注释。
`<?xml version="1.0" encoding="UTF-8"?>
<Server port="8005" shutdown="SHUTDOWN">
<Listener className="org.apache.catalina.startup.VersionLoggerListener" />
<Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
<Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
<Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
<Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />
<GlobalNamingResources>
<Resource name="UserDatabase" auth="Container"
type="org.apache.catalina.UserDatabase"
description="User database that can be updated and saved"
factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
pathname="conf/tomcat-users.xml" />
</GlobalNamingResources>
<Service name="Catalina">
<!-- 修改端口 -->
<Connector port="80" protocol="HTTP/1.1"
connectionTimeout="20000"
redirectPort="8443" />

    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />    
    <Engine name="Catalina" defaultHost="localhost">
      <Realm className="org.apache.catalina.realm.LockOutRealm">
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>
		<!--  添加3个域名映射 -->
		<Host name="web1.com" appBase="webapps" unpackWARs="true" autoDeploy="true">
			<Context path="" docBase="web1" />
		</Host>
		<Host name="web2.com" appBase="webapps" unpackWARs="true" autoDeploy="true">
			<Context path="" docBase="web2" />
		</Host>
		<Host name="web3.com" appBase="webapps" unpackWARs="true" autoDeploy="true">
			<Context path="" docBase="web3" />
		</Host>
		<Host name="localhost"  appBase="webapps" unpackWARs="true" autoDeploy="true">
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t "%r" %s %b" />
      </Host>
    </Engine>
  </Service>
</Server>

`
**配置host**
##本地测时配置

`vi /etc/hosts`

在后面添加3个域名
`127.0.0.1 web1.com
127.0.0.1 web2.com
127.0.0.1 web3.com`
启动项目后测试
![20180509113611431.png](http://lcbupayun.test.upcdn.net/static/e312a6018dd952237f1e7c4e506b5ca8.png)

![20180509113553425.png](http://lcbupayun.test.upcdn.net/static/88b695c8f2c4ddd9a16b020d3340e0d3.png)

![2018050911363035.png](http://lcbupayun.test.upcdn.net/static/7561e3df4c4d65d81a3a70348c7b6428.png)
##服务器时配置

`127.0.0.1 xxxx`

xxx是服务器名称

