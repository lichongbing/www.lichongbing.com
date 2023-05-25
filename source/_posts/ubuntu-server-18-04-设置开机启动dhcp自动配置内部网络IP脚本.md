---
title: ubuntu-server-18.04 设置开机启动dhcp自动配置内部网络IP脚本
abbrlink: 32345
date: 2019-12-06 22:09:34
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
systemd 默认读取 /etc/systemd/system 下的配置文件，该目录下的文件会链接/lib/systemd/system/下的文件。执行 ls /lib/systemd/system 你可以看到有很多启动脚本，其中就有我们需要的 rc.local.service
打开脚本内容

`cat /lib/systemd/system/rc.local.service`

`#  This file is part of systemd.`

`#`

`#  systemd is free software; you can redistribute it and/or modify it`

`#  under the terms of the GNU Lesser General Public License as published by`

`#  the Free Software Foundation; either version 2.1 of the License, or`

`#  (at your option) any later version.`

`# This unit gets pulled automatically into multi-user.target by`

`# systemd-rc-local-generator if /etc/rc.local is executable.`

`[Unit]`

`Description=/etc/rc.local Compatibility`

`ConditionFileIsExecutable=/etc/rc.local`

`After=network.target`

`[Service]`

`Type=forking`

`ExecStart=/etc/rc.local start`

`TimeoutSec=0`

`RemainAfterExit=yes`

一般正常的启动文件主要分成三部分
`[Unit]` 段: 启动顺序与依赖关系
`[Service] `段: 启动行为,如何启动，启动类型
`[Install]` 段: 定义如何安装这个配置文件，即怎样做到开机启动
可以看出，/etc/rc.local 的启动顺序是在网络后面，但是显然它少了 Install 段，也就没有定义如何做到开机启动，所以显然这样配置是无效的。 因此我们就需要在后面帮他加上 `[Install]` 段:

`[Install]  `

`WantedBy=multi-user.target`

`Alias=rc-local.service`
`
这里需要注意一下，ubuntu-18.04 默认是没有 /etc/rc.local 这个文件的，需要自己创建，并且给该文件赋予可执行权限（否则文件不能执行，即开机不能运行，即开机自动启动会不成功）

`sudo touch /etc/rc.local`

`chmod 755 /etc/rc.local `

编辑rc.local，添加需要开机启动的任务（这里需要注意，一定要有#!/bin/bash，即指定解释此脚本的解释器shell的路径，否则未指定解释器会执行不成功）

#! /bin/sh

OUTGOING=`ping -c1 192.168.0.1 |grep 192.168.0.1 |grep -c ttl`

`if [ $OUTGOING -eq 0 ]`

`then`

`dhclient enp3s0f0 >/tmp/enp3s0f0.log 2>&1`

`dhclient enp4s0f1 >/tmp/enp4s0f1.log 2>&1`

`fi`

PS:惠普服务器有四个网卡，我只用了两个，于是启动两个。网卡名称用ifconfig便可以查询，/tmp/enp4s0f1.log 2>&1 是记录运行日志，以便分析问题。
以下方法不推荐不靠谱。

1,新建个脚本文件new_service.sh

`#!/bin/bash`

`# command content`

`exit 0`

2,设置权限

`sudo chmod 755 new_service.sh`

3,把脚本放置到启动目录下

`sudo mv new_service.sh /etc/init.d/`

4,将脚本添加到启动脚本

执行如下指令，在这里90表明一个优先级，越高表示执行的越晚

`cd /etc/init.d/`

`sudo update-rc.d new_service.sh defaults 90`

移除Ubuntu开机脚本

`sudo update-rc.d -f new_service.sh remove`

参考技术资料链接
[http://bbs.chinaunix.net/thread-1442726-1-1.html](http://bbs.chinaunix.net/thread-1442726-1-1.html)
[https://www.jianshu.com/p/ba6d38ce9c1e](https://www.jianshu.com/p/ba6d38ce9c1e)







