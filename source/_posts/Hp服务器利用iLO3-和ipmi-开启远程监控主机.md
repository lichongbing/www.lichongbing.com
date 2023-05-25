---
title: Hp服务器利用iLO3 和ipmi 开启远程监控主机
abbrlink: 54151
date: 2019-12-05 12:22:26
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---
1） 首先，需要用一条网线连接iLO 网口和路由器，链接方式有两种：共享和专用，如下图。
![337661-20160524162913709-411927696.png](http://image.lichongbing.com/static/3dbc81b99c539bfe71dac6a93ef13271.png)
2）其次，连好之后网口灯会变亮。然后进入bios配置ip地址，可以配成静态的，也可以配成dhcp动态分配的。配置后查看ip地址方法有：
(a)如果是用dhcp可以到服务器查看ip   (b)在开机启动窗口看到    (c)进入操作系统使用ipmitool查看
这里说一下方法(c)的操作步骤：
我的服务器安装是ubuntu

`#apt-get install openipmi`

加载ipmi驱动模块

` modprobe ipmi_msghandler`
` modprobe ipmi_devintf`
` modprobe ipmi_si`
` modprobe ipmi_poweroff`
`modprobe ipmi_watchdog`
`linux下载ipmitool工具`
`wget https://downloads.sourceforge.net/project/ipmitool/ipmitool/1.8.18/ipmitool-1.8.18.tar.bz2`

`tar -jxf ipmitool-1.8.18.tar.bz2 `

`cd ipmitool-1.8.18`

`./configure --prefix=/usr/local/ipmi`

`make`

`make install`

`ln -sf /usr/local/ipmi/bin/ipmitool /usr/sbin/ipmitool`

然后查看ip等信息，使用如下命令即会显示出来。
`ipmitool lan print`

![截屏2019-12-0513.20.24.png](http://image.lichongbing.com/static/42a3206ad247240537da3fa0e1d9ce32.png)



3） 上述准备后，就可以远程访问服务器了。HP服务器默认用户名是Administrator,密码在服务器侧边的吊牌上有。如果看不到，也可以进入bios重新设置，位置在 User->Edit下。服务端配置好后以后，在远程电脑客户端也要安装ipmitool命令。
如果在局域网
`ipmitool -I lanplus -U Administrator -H 192.168.0.104 chassis status`

`password:pxxxx`

![截屏2019-12-0513.17.33.png](http://image.lichongbing.com/static/2d03fbc2d73c34c930fda67af33687b3.png)



如果在外网，要在路由器开启DMZ主机

![截屏2019-12-0513.13.57.png](http://image.lichongbing.com/static/153e8febe0c10c2b78ff83f704634cf1.png)

`ipmitool -I lanplus -U UXxxx -H 182.138.155.139 chassis status`

`password:pxxxx`

![截屏2019-12-0513.15.25.png](http://image.lichongbing.com/static/b5a1e207579ab6b422a8b30a312c361c.png)

另外，除了用ipmitool命令行的方式外，还有如下远程访问方式：

    (a) ssh访问：ssh User@{YOUR DESIRED IP}

    (b) web访问： https://{YOUR DESIRED IP}/   

    (c) 手机app远程控制： hp.com/go/ilo/mobileapp
经过实际使用，ipmitool命令最好用，推荐。    





