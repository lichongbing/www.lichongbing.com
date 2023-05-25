---
title: Vue.js 脚手架环境搭建
abbrlink: 4084
date: 2021-05-13 10:14:43
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
#### npm镜像源设置
```bash
sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
```

#### 安装Yarn

```bash
sudo npm i yarn -g -verbose
```
#### Yarn镜像源设置
```
yarn config set registry https://registry.npm.taobao.org
```


#### 安装webpack
```
sudo cnpm install webpack -g
```

#### 安装vue-cli

```
sudo cnpm install -g vue-cli -g
```

#### 创建项目

```
sudo vue init webpack blog-ui
```
#### 项目结构

```
.
├── README.md
├── build
├── config
├── index.html
├── node_modules
├── package.json
├── src
├── static
├── test
└── yarn.lock
```
#### 安装依赖

```
cd blog-ui
yarn install
```
安装成功如下

 ```
 yarn install v1.22.10
[1/5] ?  Validating package.json...
[2/5] ?  Resolving packages...
success Already up-to-date.
✨  Done in 0.59s.
```
项目结构如下
```
.
├── README.md
├── build
├── config
├── index.html
├── node_modules
├── package.json
├── src
├── static
├── test
└── yarn.lock
```


#### 启动运行

```
cnpm run dev
```

启动成功显示如下

```
 DONE  Compiled successfully in 2405ms                                                                      上
午10:07:45

 I  Your application is running here: http://localhost:8080
 ```

访问地址
[http://localhost:8080](http://localhost:8080)

显示如下表示项目脚手架搭建成功

![IMG_2970](http://lcbupayun.test.upcdn.net/IMG_2970.JPG)

#### 依赖包异常问题

![IMG_2991](http://lcbupayun.test.upcdn.net/IMG_2991.JPG)

 ```bash
 rm -rf node_modules
 rm package-lock.json
 npm cache clear --force
 npm install
 cnpm run serve
 ```
 







