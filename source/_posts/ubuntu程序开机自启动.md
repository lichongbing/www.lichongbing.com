---
title: ubuntu程序开机自启动
date: 2019-12-03 21:52:27
tags:
---
## ubuntu程序开机自启动，嵌入到系统启动导引中
**ubuntu开机自启动思路**
ubuntu操作系统有很多运行级别，默认情况下runlevel为2，进入runlevel2时，会按照优先级执行/etc/rc2.d/目录下的所有可执行文件。操作系统的运行级别可以用过命令runlevel查看。如下：
`li@li:~$ runlevel`

`N 2`
# 开机自启动的具体解决方法为：
**1. 创建固定格式的的启动脚本并修改权限；**
`your_bash.sh格式如下,其中，setsid ./your_bin &中的setsid 和& 符号是打开一个窗口让程序后台运行。`

`#!/bin/sh`

`### BEGIN INIT INFO`

`# Provides:          HMI.sh`

`# Required-start:    $local_fs $remote_fs $network $syslog`

`# Required-Stop:     $local_fs $remote_fs $network $syslog`

`# Default-Start:     2 3 4 5`

`# Default-Stop:      0 1 6`

`# Short-Description: starts the HMI.sh daemon`

`# Description:       starts HMI.sh using start-stop-daemon`

`### END INIT INFO`

`#this is the command that you write to start your app`

`cd /home/your_file/`

`setsid ./your_bin &`

`exit 0`

**修改your_bash.sh的权限：**

`chmod a+x your_bash.sh`

**2. 将脚本移动到/etc/init.d/目录下**；

`sudo cp your_bash /etc/init.d/`

**3. 运行runlevel查看系统运行级别，默认情况下为2;**

`$ runlevel`

`N 2`

**4. 进入对应的 /etc/rcx.d/文件夹**

`$ cd /etc/rc2.d/`

**5. 创建软连接，使进入这一runlevel时，自动运行脚本。**
`sudo ln -vsf /etc/init.d/your_bash S90your_binStart`
**6. 查看是否创建成功.**
若有返回则正常，可以sudo reboot，查看启动系统时程序是否自动运行。

`ls -alh | grep S90your_binStart`

软连接的命令有特定的要求，开头必须时’S’,后接2位数字，其值为5-99,表示程序的启动优先级，99为最后启动；最后是命令的字符串，可任意。
**7. 重启后，使用以下命令查看可执行文件是否正在运行。若有打印出进程信息，则OK 。**

`ps -aux | grep your_bin | grep -v grep`















