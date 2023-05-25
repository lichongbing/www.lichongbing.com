---
title: gitlab部署教程
abbrlink: 26447
date: 2021-03-21 15:19:27
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
#  gitlab 部署
```
apt-get update
apt-get install -y curl openssh-server ca-certificates
apt-get install -y postfix
```

```
https://packages.gitlab.com/gitlab
```

```
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
```

```
sudo apt install gitlab-ee
```


```
sudo vim /etc/gitlab/gitlab.rb
external_url 'https://192.168.3.9' #修改gitlab页面访问的地址
sudo gitlab-ctl reconfigure #重新加载配置文件 
sudo gitlab-ctl restart #重启服务
sudo gitlab-ctl status #查看状态
```

## 修改nginx端口
sudo vi /etc/gitlab/gitlab.rb
```
nginx['listen_port'] = 8081
```
sudo vi /var/opt/gitlab/nginx/conf/gitlab-http.conf

```
server {
    listen *:8081;
```

## 修改unicorn端口

sudo vi /etc/gitlab/gitlab.rb
```
unicorn['port'] = 8092
```
## 保存配置，重启
```
sudo gitlab-ctl reconfigure
sudo gitlab-ctl restart
sudo gitlab-ctl status
```
## 查看日志
```
sudo gitlab-ctl tail
```


