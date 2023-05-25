---
title: 'mac使用brew update无反应,更新慢解决办法'
abbrlink: 27887
date: 2019-12-05 11:36:43
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
主要是资源访问太慢的原因造成的，替换一下镜像就可以了

有点耐心，大概5分钟就可以了，刚开始的时候terminal 只有顶部的title栏会变化，最后才会出现更新结果

使用中科大的镜像
替换默认源
第一步，替换brew.git

`cd "$(brew --repo)"`

`git remote set-url origin https://mirrors.ustc.edu.cn/brew.git`

第二步：替换homebrew-core.git

`cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"`

`git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git`

最后使用

`  brew update`

进行更新，发现速度变的很快。替换镜像完成。
![2742735-fa6955d07c555130.png](http://lcbupayun.test.upcdn.net/static/a8c162d939b4e0943f11d02daa9d8f68.png)
