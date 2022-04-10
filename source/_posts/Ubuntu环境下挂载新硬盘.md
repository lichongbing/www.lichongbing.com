---
title: Ubuntu环境下挂载新硬盘
date: 2019-12-03 17:57:40
tags:
---
**一、硬盘分区 | Hard disk add new partition**

1、显示硬盘及所属分区情况。在终端窗口中输入如下命令：

`sudo fdisk -l`

显示当前的硬盘及所属分区的情况。如下图所示：
系统提示：DIsk /dev/sdb doesn't contain a valid partition table。

![1522291142953258.gif.jpeg](http://image.lichongbing.com/static/137dc9e6b4c186bdaea45cbba0cf3236.jpeg)

２、对硬盘进行分区。在终端窗口中输入如下命令：

`sudo fdisk /dev/sdb`

如下图所示：
在Command (m for help)提示符后面输入m显示一个帮助菜单。

![1522291150631562.gif.jpeg](http://image.lichongbing.com/static/537abe5a42c7d259452e0d8784504bc2.jpeg)

在Command (m for help)提示符后面输入n，执行 add a new partition 指令给硬盘增加一个新分区。
出现Command action时，输入e，指定分区为扩展分区（extended）。
出现Partition number(1-4)时，输入１表示只分一个区。
后续指定起启柱面（cylinder）号完成分区。

![1522291159502739.gif.jpeg](http://image.lichongbing.com/static/e3a77b51a7baa6b1ed39592e8539f8db.jpeg)

在Command (m for help)提示符后面输入p，显示分区表。
系统提示如下：
`Device Boot                 Start                End                   Blocks          Id             System
/dev/sdb1                           1            26108           209712478+           5          Extended`

![1522291166220638.gif.jpeg](http://image.lichongbing.com/static/77514de8b947bc61afe9b482d895828c.jpeg)

在Command (m for help)提示符后面输入w，保存分区表。
系统提示：The partition table has been altered!

![1522291175167083.gif.jpeg](http://image.lichongbing.com/static/9fa7f55a36d671e3f5aab55b4838a32c.jpeg)

在终端窗口中输入如下命令：

`sudo fdisk -l`

如下图所示：
系统已经识别了硬盘 /dev/sdb 的分区。

![1522291184648789.gif.jpeg](http://image.lichongbing.com/static/e0e7bf6c99b2d4e5850ae8fed6aec18d.jpeg)



**二、硬盘格式化 | Format hard disk**

1、显示硬盘及所属分区情况。在终端窗口中输入如下命令：

`sudo mkfs -t ext4 /dev/sdb`

说明：
-t ext4 表示将分区格式化成ext4文件系统类型。

![1522284674305157.png.jpeg](http://image.lichongbing.com/static/54abf081c9aee474c625f89c35f510ef.jpeg)



**三、挂载硬盘分区 | Mount hard disk partition**

1、显示硬盘挂载情况。在终端窗口中输入如下命令：

`df -l`

新硬盘分区没有挂载，无法进入和查看。

在终端窗口中输入如下命令：

`sudo mount -t ext4 /dev/sdb /devdata`

再次在终端窗口中输入如下命令：

`df -l`

新硬盘分区已经挂载，如下图最下面的红色方框内容。

![1522284851211104.png.jpeg](http://image.lichongbing.com/static/c8fedd9dae230f52be8bc11c01acc26f.jpeg)
２、配置硬盘在系统启动自动挂载。在文件 /etc/fstab 中加入如下配置：

/dev/sdb     /devdata    ext4     defaults       0 0

![1522306284208399.png](http://image.lichongbing.com/static/89239a3695713ff977e1051bd62d06d6.png)

至此ubuntu硬盘的挂载就完成了

