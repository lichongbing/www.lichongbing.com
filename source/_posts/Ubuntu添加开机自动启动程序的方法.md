---
title: Ubuntu添加开机自动启动程序的方法
abbrlink: 2042
date: 2019-12-03 19:58:01
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---
**1. 开机启动时自动运行程序**

Linux加载后, 它将初始化硬件和设备驱动, 然后运行第一个进程init。init根据配置文件继续引导过程，启动其它进程。通常情况下，修改放置在

`/etc/rc或`

`/etc/rc.d 或`

`/etc/rc?.d`

目录下的脚本文件，可以使init自动启动其它程序。例如：编辑/etc/rc.d/rc.local 文件(该文件通常是系统最后启动的脚本)，在文件最末加上一行“xinit”或“startx”，可以在开机启动后直接进入X－Window。

**2. 登录时自动运行程序**

用户登录时，bash先自动执行系统管理员建立的全局登录script ：

`/ect/profile`

然后bash在用户起始目录下按顺序查找三个特殊文件中的一个：

`/.bash_profile、`

`/.bash_login、`

`/.profile，`

但只执行最先找到的一个。因此，只需根据实际需要在上述文件中加入命令就可以实现用户登录时自动运行某些程序（类似于DOS下的Autoexec.bat）。

**3. 退出登录时自动运行程序**

退出登录时，bash自动执行个人的退出登录脚本

`/.bash_logout`。

例如，在/.bash_logout中加入命令“tar －cvzf c.source.tgz ＊.c”，则在每次退出登录时自动执行 “tar” 命令备份 ＊.c 文件。

**4. 定期自动运行程序**

Linux有一个称为crond的守护程序，主要功能是周期性地检查 /var/spool/cron目录下的一组命令文件的内容，并在设定的时间执行这些文件中的命令。用户可以通过crontab 命令来建立、修改、删除这些命令文件。

例如，建立文件crondFile，内容为“00 9 23 Jan ＊ HappyBirthday”，运行“crontabcronFile”命令后，每当元月23日上午9:00系统自动执行“HappyBirthday”的程序（“＊”表示不管当天是星期几）。

**5. 定时自动运行程序一次**

定时执行命令at 与crond 类似（但它只执行一次）：命令在给定的时间执行，但不自动重复。at命令的一般格式为：`at [ －f file ] time` ，在指定的时间执行file文件中所给出的所有命令。也可直接从键盘输入命令：

`＄ at 12:00`

`at>mailto Roger －s ″Have a lunch″ < plan.txt`

`at>Ctr－D`

`Job 1 at 2000－11－09 12:00`

2000－11－09 12:00时候自动发一标题为“Have a lunch”，内容为plan.txt文件内容的邮件给Roger.





#Ubuntu下添加开机启动脚本

Ubuntu开机之后会执行/etc/rc.local文件中的脚本，所以我们可以直接在/etc/rc.local中添加启动脚本。

当然要添加到语句：exit 0 前面才行。

如：

`sudo vi /etc/rc.local`

然后在 exit 0 前面添加好脚本代码。

后续有空再研究下添加一个Ubuntu的开机启动服务看看。

如果要添加为开机启动执行的脚本文件，可先将脚本复制或者软连接到/etc/init.d/目录下，然后用：`update-rc.d xxx defaults NN`命令(NN为启动顺序)，将脚本添加到初始化执行的队列中去。

注意如果脚本需要用到网络，则NN需设置一个比较大的数字，如98 。





**二、ubuntu下设置程序开机自启动的几种方法**


1、方法一：

这种也是最常用的一种 rcconf：

`sudo apt-get install rcconf`

root下运行: `rcconf`



功能更全的：`sysv-rc-conf`

`sudo apt-get install sysv-rc-conf`

运行：`sysv-rc-conf`

这个改起来很简单，自己试一下就知道了.



2、方法二：

直接改/etc/rc0.d ~ /etc/rc6.d和/etc/rcS.d下的东西，S开头的表示启动，K开头的表示不启动，例如：想关闭vsftpd的开机自动启动，只需sudo mv /etc/rc2.d/S20vsftpd /etc/rc2.d/K20vsftpd就可以了。

这条命令的用意就是利用mv的重命名功能。



3、方法三：

chkconfig,这种方法在redhat,Debian里面比较常用,在fedora和ubuntu里面用方法1比较简单,但是学习一下这种方法也是不错的。

但在ubuntu下这个命令没有redhat好用,老是出错.

算了,还是直接看一下redhat里面chkconfig的用法吧.

（1）`chkconfig --level [0123456] [service name] [on|off]`

chkconfig --level 23 dhcp3-server off ----设定dhcp server服务在level2,3下关闭.

（2）chkconfig --list 查看服务的自动开启状态

（3）chkconfig --add 增加一个服务给chkconfig来管理,但是该服务必须在/etc/init.d内。
