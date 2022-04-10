---
title: 【Linux】显示you are in emergency mode解决方法
date: 2019-12-06 22:29:45
tags:
---
物理机Ubuntu开机显示有一个fail to mount，然后下面显示you are in emergency mode……

原因是因为磁盘挂载时，显示物理坏道，没法使用，于是我取下来，结果每次开机都自动挂载，挂载不上，所以报错
解决方法：
输入vim /etc/fstab ，删除未被mount上的磁盘（即删掉.host:/dev/sdd1 /home/disksdd1  defaults 0 0这句话），然后reboot重启即可
