---
title: 'ssh 登录报错 packet_write_wait: Connection to x port 22: Broken pipe'
abbrlink: 30212
date: 2019-12-04 22:12:09
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---

问题现象：

用 ssh 命令连接服务器之后，如果一段时间不操作，再次进入 Terminal 时会有一段时间没有响应，然后就出现错误提示：

`Write failed: Broken pipe`

只能重新用 ssh 命令进行连接。

解决方法

方法一：如果您有多台服务器，不想在每台服务器上设置，只需在客户端的 ~/.ssh/ 文件夹中添加 config 文件，并添加下面的配置：

`ServerAliveInterval 60`

方法二：如果您有多台个人管理服务器，不想在每个客户端进行设置，只需在服务器的 /etc/ssh/sshd_config 中添加如下的配置：

`ClientAliveInterval 60`

方法三：如果您只想让当前的 ssh 保持连接，可以使用以下的命令：

`$ ssh -o ServerAliveInterval=60 user@sshserver`

