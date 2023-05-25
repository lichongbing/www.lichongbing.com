---
title: >-
  ipmitool使用报错处理  Could not open device at /dev/ipmi0 or /dev/ipmi/0 or
  /dev/ipmidev/0: No such file or directory
abbrlink: 63319
date: 2019-12-08 09:52:28
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---
解决办法：需要加载相关模块

查看先关模块是否加载（可以看出模块未加载）

`#lsmod |grep ^ipmi`



加载以下模块

`# modprobe ipmi_watchdog`

`# modprobe ipmi_poweroff`

`# modprobe ipmi_devintf`

`# modprobe ipmi_si  加载该模块如果没有不影响ipmi的使用（与系统版本有关）`

`# modprobe ipmi_msghandler  加载该模块如果没有不影响ipmi的使用`


之后就可以正常使用了：

`ipmitool lan print `  查看本机IPMI地址等信息
