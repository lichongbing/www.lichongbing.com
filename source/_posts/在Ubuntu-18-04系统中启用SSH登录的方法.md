---
title: 在Ubuntu 18.04系统中启用SSH登录的方法
abbrlink: 52597
date: 2019-12-04 17:23:44
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
Secure Shell（SSH）是Linux系统管理中的经常要用到的一种远程访问技术。在Ubuntu 18.04系统仓库中，已经收录了同为开源的OpenSSH，我们可以用它来为系统开启SSH访问功能。

**一、打开终端，输入以下命令安装OpenSSH服务**：

sudo apt-get install openssh-server

**二、步骤一是在当前系统增加SSH服务**，
如果需要对SSH服务修改设置，可以用字处理工具编辑其配置文件，位于“ `/etc/ssh/sshd_config`”，比如用vim修改的命令就是：

`sudo vim /etc/ssh/sshd_config`

三、安装后，查看SSH有没有运行；

`ps -ef|grep sshd`

`sudo service ssh status`

如果有运行，如果上述结果中没有sshd出现，那么可能就是你的server端程序没有安装（Ubuntu 18.04 默认没有安装ssh server，只安装了ssh client），或者sshd服务没有启动
可以用server命令来启动

`sudo service ssh start`

**四、安装完成之后，就可以在客户端用系统用户来远程登录了。**

如果出现ssh无法远程连接ubuntu系统，提示

`System is booting up. See pam_nologin(8)`

`Connection closing... Socket close.`

无法远程登录！但是本地可以正常登录。

修改文件： /etc/pam.d/sshd

本地登陆
`vim /etc/pam.d/sshd`
注释account  required pam_nologin.so。即在这一行前边加#。保存即可

或者本地登录后，注释掉 pam_nologin.so 行，命令如下：

`sudo sed -i -r 's/^(.*pam_nologin.so)/#\1/' /etc/pam.d/sshd`



