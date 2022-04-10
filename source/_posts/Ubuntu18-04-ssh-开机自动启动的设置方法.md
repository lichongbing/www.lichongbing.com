---
title: Ubuntu18.04 ssh 开机自动启动的设置方法
date: 2019-12-06 22:47:39
tags:
---

Ubuntu18.04 ssh 开机自动启动的设置方法如下：

`# 开机自动启动ssh命令`

`sudo systemctl enable ssh`

`# 关闭ssh开机自动启动命令`

`sudo systemctl disable ssh`

`# 单次开启ssh`

`sudo systemctl start ssh`

`# 单次关闭ssh`

`sudo systemctl stop ssh`

`# 设置好后重启系统`

`reboot`

#查看ssh是否启动，看到Active: active (running)即表示成功

`sudo systemctl status ssh`

资料参考[https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-18-04/](https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-18-04/)
