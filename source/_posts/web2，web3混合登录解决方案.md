---
title: web2，web3混合登录解决方案
author: lichongbing
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
top: false
toc: true
mathjax: false
essay: true
categories: Other
tags:
  - blog
  - hexo
keywords: Java springboot 谦谦君子
summary: 开发一个ios swiftUi 登录组件，实现web3登录和web2登录
abbrlink: 34043
date: 2022-08-07 13:43:14
update: 2022-08-07 13:43:14
---

# 概述
## 登录入口
> 把传统的OAuth2.0协议登录升级成 web3.0 登录，以后只要拥有钱包地址就可以作为web3的通行凭证，访问web3和web2的OAuth2.0协议应用。
## web3登录
目前采用区块链2.0技术，基于主流的以太坊生态体系，网页钱包登录MetaMask，移动端walletconnect钱包登录解决方案。
[metaMask网页登录对接文档](https://eth-dev-docs.readthedocs.io/en/latest/begin/index.html)
[walletconnect对接文档](https://docs.walletconnect.com) 解决移动端登录问题。
## Dapp 案例参考
* [OpenSea](https://opensea.io) 这个只是实现web3登录，没有向下兼容传统登录。

* [OpenSea相关源码和文档](https://github.com/ProjectOpenSea)

## walletconnect案例

[rainbow](https://learn.rainbow.me)

## 科学上网

以上dapp需要科学上网，需要海外的苹果id 到苹果商店下载美国地区应用，国内相关缺乏相关demo，以及落地项目，需要自行阅读英文教程探索摸索。

