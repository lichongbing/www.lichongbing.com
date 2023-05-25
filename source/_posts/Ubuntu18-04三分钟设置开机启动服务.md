---
title: Ubuntu18.04三分钟设置开机启动服务
abbrlink: 34848
date: 2019-12-03 21:08:57
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
本文链接：https://blog.csdn.net/idiot_qi/article/details/86527052
之前没接触过ubuntu，设置开机启动服务找了n多例子，都达到想要实现的效果，后来才发现是入了坑

先直接来一波标准的操作

**1. 复制命令（设置启动参数) **

`vi /lib/systemd/system/rc.local.service `

1.1. 复制代码（下面代码按ESC再 :wq 回车）

`[Unit]`

`Description=/etc/rc.local Compatibility`

`Documentation=man:systemd-rc-local-generator(8)`

`ConditionFileIsExecutable=/etc/rc.local`

`After=syslog.target network.target remote-fs.target nss-lookup.target`

`[Service]`

`Type=forking`

`ExecStart=/etc/rc.local start`

`TimeoutSec=0`

`RemainAfterExit=no`

`GuessMainPID=no`

`#这一段原文件没有，需要自己添加`

`[Install]`

`WantedBy=multi-user.target`

`Alias=rc-local.service`

**2. 复制命令（设置软连接，开机启动回去/etc/……这个目录下去找文件）**

`ln -s /lib/systemd/system/rc.local.service /etc/systemd/system/rc.local.service`

**3.  复制命令（本身是没有rc.local文件的，后来上帝说要有它，就有了**）

`vi /etc/rc.local`

3.1. 复制代码（要开机启动的脚本、服务或者其他的操作都把命令写入这个脚本）

`#!/bin/bash
echo "hello" > /etc/test.log
/etc/init.d/webserver start
exit 0
4. reboot`

以上就是ubuntu18.04三分钟速成开机自启动，暂无其他详解，想知道更多详细的步骤请点此链接

开头说掉坑是关于ubuntu18.04图形界面的，ubuntu18.04开机需要使用非root用户登录，然而部署环境的时候全都是用root装的，登录的用户毛都没有，服务需要用到一些插件命令，然后死活都启动不了（这和不仔细真的一点关系都没有），当时被这个开机启动服务搞的晕头转向，才知道是每个用户之间有区别，这个坑掉的两辈子都难忘，以后

弃坑
