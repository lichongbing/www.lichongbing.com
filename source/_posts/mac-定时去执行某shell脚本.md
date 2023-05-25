---
title: mac 定时去执行某shell脚本
abbrlink: 16119
date: 2019-12-16 09:24:37
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
## 方法一
进入根目录

    cd／
通过终端打开Finder的根目录

    open／
    touch test.sh
    vim test.sh

点击esc键，然后输:wq来保存退出

linux应该都有crontab，没有的话可以安装一下：

    brew install vixie-cron
    brew install crontabs：
vixie-cron软件包是cron的主程序；
crontabs软件包是用来安装、卸装、或列举用来驱动 cron 守护进程的表格的程序。

## 方法二
使用苹果的Schedule jobs using launchd设置定时任务。需要写一个plist文件，描述任务的动作、间隔的时间、日志输出等参数。

我创建一个plist文件com.hanlingzhi.cron.meican.plist，大概内容如下：

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>Disabled</key>
        <false/>
        <key>KeepAlive</key>
        <true/>
        <key>Label</key>
        <string>com.caoyujiao.crib.meican</string>
        <key>ProgramArguments</key>
        <array>
            <string>/usr/bin/php</string>
            <string>/Users/caoyujiao/Desktop/IQIYI/tvOS/my.sh</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
        <key>StandardErrorPath</key>
        <string>/Users/caoyujiao/Desktop/IQIYI/tvOS/stderr</string>
        <key>StandardOutPath</key>
        <string>/Users/caoyujiao/Desktop/IQIYI/tvOS/stdout</string>
        <key>StartCalendarInterval</key>
        <dict>
            <key>Hour</key>
            <integer>0</integer>
            <key>Minute</key>
            <integer>1</integer>
        </dict>
    </dict>
    </plist>
然后将plist文件放在/Users/hanlingzhi/Library/LaunchAgents，你的用户目录下，然后执行`launchctl load plist`就可以启动了。

    launchctl load -w com.caoyujiao.crib.meican.plist 加载
    launchctl unload -w com.caoyujiao.crib.meican.plist 卸载

加载后，终端文案会在stdout文件中显示
错误信息显示在stderr文件里面
plist脚本存放路径为`/Library/LaunchDaemons`或用户目录`/Library/LaunchAgents`，其区别是后一个路径的脚本当用户登陆系统后才会被执行，前一个只要系统启动了，哪怕用户不登陆系统也会被执行。

系统定义了几个位置来存放任务列表

`~/Library/LaunchAgents` 由用户自己定义的任务项

`/Library/LaunchAgents` 由管理员为用户定义的任务项

`/Library/LaunchDaemons` 由管理员定义的守护进程任务项

`/System/Library/LaunchAgents` 由Mac OS X为用户定义的任务项

`/System/Library/LaunchDaemons` 由Mac OS X定义的守护进程任务项

可以通过两种方式来设置脚本的执行时间。一个是使用`StartInterval`，它指定脚本每间隔多长时间（单位：秒）执行一次；另外一个使用`StartCalendarInterval`，它可以指定脚本在多少分钟、小时、天、星期几、月时间上执行，类似如crontab的中的设置。

launchctl的命令使用大家看一下帮助文档。

由于操作还是比较复杂，为了帮助快速执行，写了个shell快速拷贝新的plist并完成服务重启

总结一下

虽然plist的设置会复杂很多。但是当前在mac os还是倾向于推荐使用Plist的方法，crontab已不推荐使用。
两者的区别：

1、plist可以设置到秒，而crontab只能到分钟。

2、plist可以同时应用于Mac OS/Iphone。

3、plist对于MAC上系统交互的操作更支持(我就出现过用crontab设置，运行时出现execution error: 不允许用户交互。 (-1713)的错误)



