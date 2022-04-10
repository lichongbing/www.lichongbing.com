---
title: Ubuntu eth0不能自动获取地址 无法上网 临时解决
date: 2019-12-03 19:46:14
tags:
---
`ifconfig之后显示eth0，但是没有显示静态IP地址，即无inet、地址、广播、掩码。`
解决办法临时
` 1. 先用sudo dhclient eth0更新IP地址

2. 然后运行sudo ifconfig eth0

3.reboot
`
