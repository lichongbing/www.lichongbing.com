---
title: 采用jekyll +gitee+jenkins构建求职简历
abbrlink: 530
date: 2020-03-25 14:22:40
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
# 采用jekyll +gitee+jenkins+jekyll-minimal-resume构建求职简历
## 前言
>疫情快要结束了，在家沉炼技术一段时间，为了找好工作，简历花时间精心设计制作一番。本次采用jekyll +gitee+jenkins+jekyll-minimal-resume构建自己的求职简历。
## 搭建思路
* 本地提交博客 Markdown 文件 到 gitee 源文件 repository
* gitee 触发 jenkins 执行自动编译
* jenkins 编译后 push 静态文件到 gitee 静态文件 repository
* 由于resume与jenkins处于同一台服务器，采用nginx搭建。

## 本地和部署服务器均安装jekyll 命令工具
> jekyll是一个简单的免费的Blog生成工具，类似WordPress。但是和WordPress又有很大的不同，原因是jekyll只是一个生成静态网页的工具，不需要数据库支持。但是可以配合第三方服务,例如Disqus。最关键的是jekyll可以免费部署在Github上，而且可以绑定自己的域名。
本地我用Mac，安装比较简单
### 服务器是Ubuntu安装比较繁琐

我们将首先将所有系统软件包更新到最新版本，然后继续安装Jekyll：
```
$ sudo apt-get update
$ sudo apt-get upgrade
```
Jekyll需要一个包含库的Ruby开发环境，使用以下命令安装Jekyll和必需的构建工具：
```
$ sudo apt-get install make build-essential
```
安装Ruby包和开发工具：

```
$ sudo apt-get install ruby ruby-dev
```
参考：在Ubuntu 18.04 LTS系统上安装Ruby的方法。
我们现在需要指示Ruby的gem包管理器将gem放在登录用户的主目录中，在~/.bashrc或~/.zshrc下添加以下行，具体取决于你的shell：
```
export GEM_HOME=$HOME/gems
export PATH=$HOME/gems/bin:$PATH
```
现在来源.bashrc|.zshrc文件以使更改生效：
```
$ source ~/.bashrc
$ source ~/.zshrc
```
完成此操作后，将使用gem安装Jekyll和Bundler，这是一个用于管理Gem依赖项的工具：
```
$ gem install bundler
```

安装Jekyll：
```
$ gem install jekyll
```
## 服务器安装自动化部署工具jenkins
> Jenkins是一个开源的、提供友好操作界面的持续集成(CI)工具，起源于Hudson（Hudson是商用的），主要用于持续、自动的构建/测试软件项目、监控外部任务的运行（这个比较抽象，暂且写上，不做解释）。Jenkins用Java语言编写，可在Tomcat等流行的servlet容器中运行，也可独立运行。通常与版本管理工具(SCM)、构建工具结合使用。常用的版本控制工具有SVN、GIT，构建工具有Maven、Ant、Gradle。



### ubuntu 安装 Jenkins

>安装前提是安装java和maven

```

wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins

```
### linux中Jenkins启动/重启/停止命令

启动
```
service jenkins start
```
重启
```
service jenkins restart
```
停止
```
service jenkins stop
```
### 解决服务器内存不足问题
创建swap文件
首先，选择你swap文件要放置的位置，比如直接在根目录/ 下创建或者选择一个目录，如/opt。比如我直接在根目录下创建，然后设置swap分区的名称为swapfile:

定义swap的大小及位置
```
# dd if=/dev/zero of=/swapfile bs=1k count=2048000
```
上面swapfile为你创建swap文件分区的名称，你可以根据需要改成你自己的名称;bs 即blocksizes，每个块大小为1k;count=2048000,总大小为2G的文件。因为建立swap分区大小的标准一般为物理内存的两倍，而我的内存是1G，所以我选择swap文件大小为2G，当然，也要考虑你硬盘剩余容量的大小。我的硬盘还剩15G，所以再划分2G给swap文件绰绰有余。如果你的内存是0.5G，那么count大小可以选择1024000(1G)。

建立swap

```
# mkswap /swapfile
``` 
启动swap
```
# swapon /swapfile
``` 
检查是否正确
```
# free -m 

total        used        free      shared  buff/cache   available Mem:           1838         600          65           2        1172        1043 Swap:          1999           0        1999
```

或者使用swapon -s 命令查看:
```
# swapon -s 

```

### 配置Nginx及Https服务
安装nginx
```
sudo apt-get install nginx
```

配置https服务

安装上传证书
```
/home/resume.lichongbing.com/3641955_resume
```


创建resume.lichongbing.com.conf

```
server {
    listen    80;
    server_name resume.lichongbing.com;
    rewrite ^(.*)$  https://$host$1 permanent;
}

server {
                listen 443 ssl;
                server_name resume.lichongbing.com;

                ssl_certificate "/home/resume.lichongbing.com/3641955_resume/3641955_resume.lichongbing.com.pem";
                ssl_certificate_key "/home/resume.lichongbing.com/3641955_resume/3641955_resume.lichongbing.com.key";

                index index.html index.html;
                root  /www/gfr_doc/_book;
                access_log  /var/log/resume.lichongbing.com.log;
                     
                               
}
```
启动https


```
service nginx restart
````

### 简历安装测试
#### 功能和特点

* 简单、优雅、极简的设计
* 桌面和移动友好，但桌面上的效果会更好
* 支持输出 PDF 并且打印机友好
* 简单的扩展方式

#### 安装和使用

#### 本地模式

1. 克隆（可以先 fork）

    ```shell
    git clone https://github.com/lichongbing/resume.git
    ```

2. 安装 Jekyll

    ```shell
    gem install jekyll
    ```

3. 配置简历数据

   首先在 `_config.yml` 中配置 `baseurl`，如果需要部署在网站的话。在 `_data/resume.yml` 中填写教育（education）、技能（skills）、工作经验（experience）和项目（projects）。

4. 运行和预览

    ```shell
    jekyll serve
    ```

5. 构建

    ```shell
    jekyll build
    ```

#### Gem 模式

1. 创建 `Gemfile`

  ```
  source "https://rubygems.org"

  gem "jekyll-theme-minimal-resume"
  ```

并执行，

  ```shell
  bundle install
  ```

2. 初始化 `_config.yml`

    ```yaml
    title: Résumé Title
    baseurl: "/resume/"
    theme: "jekyll-theme-minimal-resume"
    ```

3. 创建 `index.html`

    ```yaml
    ---
    layout: resume
    ---
    ```

4. 创建 `_data/resume.yml` 并填写你的简历数据。[

### 数据格式

#### 联系信息

```yaml
contact:
  - icon: fa-envelope
    text: youremail@example.com
  - icon: fa-phone-square
    text: your-phone-num
  - icon: fa-globe
    text: your-website.com
    link: https://lichongbing.github.io/resume/resume.html
```

模板内置了 FontAwesome 图标字体，请使用`fa-`开头的类名作为图标。`link`是可选项，如果需要在 Web 或 PDF 版中支持链接，请填写此项。

#### 颜色

模板内置了一些主题配色，可以通过 `_config.yml` 中的 `color` 进行修改。默认是灰色 Gray。

```yaml
color: gray
```


- red
- pink
- grape
- violet
- indigo
- blue
- cyan
- teal
- green
- lime
- yellow
- orange



- nord


#### 扩展简历内容

1. 在 `_data/resume.yml` 中增加段落，比如增加显示你的语言水平：

  ```yaml
  languages:
    - name: 英语
      proficiency: 工作熟练
    - name: 中文
      proficiency: 母语
  ```

2. 把读取代码加入 `_layouts/resume.html`:

  ```html
  <section id="languages">
    <div class="section-title">
      Language
    </div>
    <div class="section-content">
      {% for lang in site.data.resume.languages %}
      <div class="block">
        <div class="block-title">
          {{ lang.name }}
        </div>
        <div class="block-content">
          {{ lang.proficiency }}
        </div>
      </div>
      {% endfor %}
    </div>
  </section>
  ```
## 简历web更新方法
### web 输出语言格式
在文件根目录修改index.html
中文版渲染
```
--- 
layout: resume_zh_cn 
---

```
英文版渲染
```
--- 
layout: resume
---
```
数据修改
在_data文件夹_
```
├── resume.yml # 英文简历
└── resume_zhcn.yml # 中文简历
```

编译
```
bundle exec jekyll build
```
输出
```
cp -r _site/ site 
```
提交部署
```
git add .
git commit
git push
```
经过以上步骤完成自动化部署简历。
以下是我的简历
[https://resume.lichongbing.com](https://resume.lichongbing.com)

