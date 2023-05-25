---
title: Ubuntu 18.04系统中不能ssh外网远程
abbrlink: 24976
date: 2019-12-15 22:28:51
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---

## 前言
今天我不小心动了电插板，导致服务器断电，用远程命令开机，居然很长时间没反应，索性就亲自按电源键重启。服务器正常开机启动，ssh可以内网访问，远程命令内网有效果，就是外网不行。经过分析排查，是不是服务器开启防火墙，导致外网不能访问，继续排查路由器是不是映射出现问题，经过最后排除是ssh出现问题。

## 在Ubuntu 18.04系统中不能ssh远程
Ubuntu默认安装了openssh-client，没有安装openssh-server,因此想远程SSH登陆Ubuntu，需要先在Ubuntu上安装openssh-server。

1.命令行输入：

    lcbroot@lichongbing:~$ ps -e|grep ssh
     4343 ?        00:00:00 sshd
     5057 ?        00:00:00 sshd
     5179 ?        00:00:00 sshd
2.输入以下命令安装OpenSSH服务：

    lcbroot@lichongbing:~$ sudo apt-get install openssh-server
3.修改“ /etc/ssh/sshd_config”:

    lcbroot@lichongbing:~$ sudo vim /etc/ssh/sshd_config

添加PermitRootLogin yes （默认为#PermitRootLogin prohibit-password）
4.重启SSH:

    lcbroot@lichongbing:~$ sudo service ssh restart
5.有ssh服务启动后，即可登陆，登陆命令格式为：ssh username@IP， 外网可以访问。
