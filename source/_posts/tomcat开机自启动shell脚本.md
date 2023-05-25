---
title: tomcat开机自启动shell脚本
abbrlink: 59295
date: 2019-12-06 22:58:12
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
1.你电脑必须安装成功tomcat
①编写tomcat.service文件

在/usr/lib/systemd/system路径下添加tomcat.service文件，内容如下：

`[Unit]`

`Description=Tomcat`
`After=syslog.target network.target remote-fs.target nss-lookup.target`

`[Service]`

`Type=forking`

`PIDFile=/opt/tomcat/tomcat.pid`

`ExecStart=/opt/tomcat/bin/startup.sh`

`ExecReload=/bin/kill -s HUP $MAINPID`

`ExecStop=/bin/kill -s QUIT $MAINPID`

`PrivateTmp=true`

`[Install]`

`WantedBy=multi-user.target`

`[unit]配置了服务的描述，规定了在network启动之后执行`

`[service]配置服务的pid，服务的启动，停止，重启`

`[install]配置了使用用户`

②然后保存退出 赋权限

`chmod 754 tomcat.service`

③重载系统服务列表

`systemctl daemon-reload`

④在第99行加入如下代码

`export JAVA_HOME=/data/server/jdk1.8.0_144`

`export JRE_HOME=/data/serverjdk1.8.0_144/jre`

⑤保存退出后，通过下面命令将tomcat.service加入到开机自启动

`systemctl enable tomcat.service `

⑥启动tomcat8服务

`systemctl start tomcat8`

然后再重启

`reboot `

重启好了
`ps aux | grep tomcat `

有服务的话就代表成功了 没有的话就是你有地方出错了
好好研究吧 ！
