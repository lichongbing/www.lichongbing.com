---
title: Ubuntu 18.04 安装 MySQL 8.0 教程
abbrlink: 13556
date: 2021-03-20 12:44:49
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---
# Ubuntu 18.04 安装 MySQL 8.0 教程
下载MySQL配置文件，网址：https://dev.mysql.com/downloads/repo/apt/
```
wget https://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb
```

```
sudo dpkg -i  mysql-apt-config_0.8.16-1_all.deb
```
```
sudo apt update
```

```
sudo apt install mysql-server
```
输入Y同意继续安装:

设置root密码

阅读配置MySQ社区服务器，翻到末尾点使用Tab键选中按钮，击Enter键

加密方式选择Retain MySQL 5.x Compatibility

登录MySQL ：
```
mysql –u root –p
```
并输入密码
```
show variables like ‘%char%’;
```
修改数据库配置 允许其他设备访问

登录mysql服务器，执行以下命令
选择mysql数据库:
```
use mysql;
```
更改host值:
```
update user set host = '%' where user = 'root';
```
刷新:
```
flush privileges;
```
退出:
```
exit;
```
启动mysql数据库
1、使用 service 启动：
```
service mysql start
```
重启
1、使用 service 启动：
```
service mysql restart
```
