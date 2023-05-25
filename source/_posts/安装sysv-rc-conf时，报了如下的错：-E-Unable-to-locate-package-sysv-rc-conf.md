---
title: '安装sysv-rc-conf时，报了如下的错： E: Unable to locate package sysv-rc-conf'
abbrlink: 60839
date: 2019-12-06 11:37:56
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---
这里我使用的是ubuntu-18.04.1版本，当我安装sysv-rc-conf时，报了如下的错：
E: Unable to locate package sysv-rc-conf（无法定位sysv-rc-conf包）
![截屏2019-12-0612.24.43.png](http://image.lichongbing.com/static/d8df428d5ccc41e2c1a411e972a7eca0.png)
提供一个解决办法，如下：
第一步在软件源列表sources.list（该文本的位置在/etc/apt/sources.list）文件中的末尾添加如下内容：

`deb http://cn.archive.ubuntu.com/ubuntu/ trusty main universe restricted multiverse`

`sudo vi /etc/apt/sources.list`

![截屏2019-12-0612.28.40.png](http://image.lichongbing.com/static/ee75213ec051a4462fa4ffcf748479a9.png)
第二步更新 apt-get update

`sudo apt-get update`

第三步更新 apt-get install sysv-rc-conf

`apt-get install sysv-rc-conf`


![截屏2019-12-0612.33.11.png](http://image.lichongbing.com/static/4aa85d4f9ed41eeaa21b79a5d4ca7d65.png)


