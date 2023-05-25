---
title: Tomcat热加载的配置方式
abbrlink: 48976
date: 2019-12-03 09:07:16
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---

# 一、Tomcat热加载配置
在工程管理目录找到自己的server下的server.xml修改部署项目
`<Context docBase="XXAPP" path="/XXAPP" reloadable="false" crossContext="true" source="org.eclipse.jst.jee.server:XXAPP"/></Host> `
如上代码，设置reloadable="false" crossContext="true"，那么就可实现每次保存文件的时候，自动部署到服务器中，并且不会重新启动。

热加载的方式必须保证eclipse以debug模式启动项目才可以用！
