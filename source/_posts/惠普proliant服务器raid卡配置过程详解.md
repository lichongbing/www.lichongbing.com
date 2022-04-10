---
title: 惠普proliant服务器raid卡配置过程详解
date: 2019-12-03 16:08:03
tags:
---
#惠普ProLiant服务器Raid卡配置过程详解
Raid(Redundant Array of Independent Disk)独立冗余磁盘阵列，就是将多个硬盘通过Raid控制器整合成虚拟的单个大容量的硬盘。Raid是服务器数据容错模式中采用最普遍的一种，通常都是通过外加Raid卡的方式来实现。Raid的级别有很多种，而各种级别所涉及的原理也不尽相同，在此不再赘述，本文将以惠普642 raid卡为例，详细介绍阵列卡的配置过程。
1.开机自检，我们可以读到Raid卡的相关信息:Smart Array 642 Controller，缓存为64MB
![截屏2019-12-0316.57.15.png](http://image.lichongbing.com/static/7c6faeb5d74af464c55ee3736aea62fb.png)
2.上面提示信息说明，需要按 F8 进入阵列卡的配置程序。可以看到机器阵列卡的配置程序有4个初始选项:
![截屏2019-12-0316.57.27.png](http://image.lichongbing.com/static/68a3041f2c12f46380307892875bf2b1.png)
Create Logical Drive 创建阵列
View Logical Driver 查看阵列
Delete Logical Driver 删除阵列
Select as Boot Controller 将阵列卡设置为机器的第一个引导设备
注意:最后一个选项将阵列卡设置为机器的第一个引导设备。这样设置后，重新启动机器，就会没有该选项。
3. 选择"Select as Boot Controller",出现红色的警告信息。若选择此选项，服务器的第一个引导设备就会变为阵列卡(SmartArray 642)，按"F8"进行确认。
   ![截屏2019-12-0316.57.39.png](http://image.lichongbing.com/static/482a6e4dcfc9b79646e41b1cc943db7f.png)
4. 按完"F8"，确认之后，提示:必须重新启动服务器，才会生效。
   ![截屏2019-12-0316.57.48.png](http://image.lichongbing.com/static/810e9ec6c028108b1ed15235a98faa8a.png)
5. 按"ESC"之后，返回到主界面，只有三个选项。
   ![截屏2019-12-0316.57.59.png](http://image.lichongbing.com/static/36ab1c425975a9ef67b6da81cfe9a5bc.png)
6. 进入"Create Logical Drive"的界面,可以看到4部分的信息。
   Available Physical Drives 列出来连接在此阵列卡上的硬盘。图示的硬盘在SCSI PORT 2， ID为0，硬盘的容量为 36.4 GB。
   Raid Configurations 有3种选择 RAID 5，RAID 1 (1+0)，RAID 0。图示的机器只有一个硬盘，默认为RAID 0。
   Spare 把所选择的硬盘作为热备的硬盘(占用一个硬盘的空间)
   Maximum Boot partition 最大引导分区的设置，可以有两个选项，Disable (4G maximum) 默认和 Enable (8G maxiumu)。(现在一般选8G)
   ![截屏2019-12-0317.06.35.png](http://image.lichongbing.com/static/f647baace2f0a0d181be14f07c890af2.png)
7. 按回车进行确认，提示已经创建一个RAID 0的阵列，逻辑盘的大小为
   33.9GB，按 F8 进行保存即可。
   ![截屏2019-12-0316.58.25.png](http://image.lichongbing.com/static/4ecf0b0fc1ebb710e36a17a23ef3ede2.png)
8. 按"F8"进行保存。
   ![截屏2019-12-0316.58.35.png](http://image.lichongbing.com/static/4a171d48eeef759706dacb3787ccd4a2.png)
9. 提示配置已经保存，按回车。
   ![截屏2019-12-0316.58.46.png](http://image.lichongbing.com/static/f757a2504368ff12a51935a5a2e12049.png)
10. 进入"View Logical Drive" 界面，可以看到刚才配置的阵列,状态是
    "OK"，RAID 的级别是 RAID 0 ，大小为 33.9 GB。
    ![截屏2019-12-0316.58.57.png](http://image.lichongbing.com/static/740a99731b97c83e4f59f520ab631233.png)
11. 按回车，查看详细信息。
    ![截屏2019-12-0316.59.12.png](http://image.lichongbing.com/static/1a8d64481810f32d2f986ad7fb67fce6.png)
    12.选择第三个选项"Delete Logical Drive"，进入删除阵列的界面。
    ![截屏2019-12-0316.59.23.png](http://image.lichongbing.com/static/b0f41cf274b60e8cd48b3ea67b93b03e.png)
13. 按"F8"，把刚才设置的阵列删除掉。出现红色警告提示信息，提示: 删除该阵列，将把阵列上的所有数据都删掉。
    注意:如果有数据，一定要先备份数据，再去删掉阵列。
    ![截屏2019-12-0317.07.10.png](http://image.lichongbing.com/static/9a96bdbe22e20868433b4280b960102c.png)
14. 按"F3"，进行确认即可，提示保存配置。
    ![截屏2019-12-0316.59.41.png](http://image.lichongbing.com/static/512c886e35f33f87978de0eb6629190b.png)
15. 提示已经保存。
    ![截屏2019-12-0316.59.49.png](http://image.lichongbing.com/static/12ea5a4c88d833a4fe4aaa1cfb7f39a6.png)
16. 再次进入"View Logical Drive" ,提示没有可用的逻辑盘。
    ![截屏2019-12-0316.59.57.png](http://image.lichongbing.com/static/0324d9a672a16356f03b500541862089.png)

