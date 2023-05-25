---
title: 自建ngrok服务支持https访问
abbrlink: 29943
date: 2020-05-10 19:39:37
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
## 前言
最近从事第三方平台代小程序实现业务开发，很多业务交互请求需要https，本地调试开发实现不了，不可能把部署到生产服务器调试，那又很不方便。我参考网上很多教程，很多不完整，不系统。我于是整理出完整教程当备用。
## 专业术语
内网穿透,又叫NAT穿透，是计算机用语，翻译过来就是 你的电脑可以直接被你朋友访问。 通常我们的电脑是无法自己被访问的。因为我们的电脑缺少自己的独立的ip地址。现在ip稀缺，电信运营商已经不会随便分配固定ip给个人。
通常实现内网穿透，是通过路由器上端口映射来实现的。但是路由器通常不是每个人都有权限可以访问和设置,而且可能存在多级路由器较为复杂的网络结构。端口映射也无法实现。这就需要ngrok来实现了。
## 原理
ngrok 建立一个隧道,将主机A的http请求 传递给 主机B,从而实现内网穿透。
ngrok分为client端(ngrok)和服务端(ngrokd)，
![32778-0c1af0a3d5798ba6.png](http://lcbupayun.test.upcdn.net/static/f03da5fde08081c901d42a9f92759517.png)
实际使用中的部署如下：![32778-428dc58babf925c8.png](http://lcbupayun.test.upcdn.net/static/d0664248923f20d84a8dd4efb3b0296a.png)
图中内网主机上安装客户端。
公网主机 安装服务端。
client public 则代表 访问你电脑的用户或者朋友。
现在都云时代，各种服务都能找到提供商。内网穿透也是如此。ngrok服务端相当麻烦,如果你只是简单的穿透，又不是什么敏感信息，可以找到很多 服务提供商。例如https://ngrok.com/
* 下载客户端根据你的个人电脑系统下载匹配的客户端。下载地址: https://ngrok.com/download
* 启动

```
./ngrok http 4444
```


```
ngrok by @inconshreveable                                                                                                                                                                                                     (Ctrl+C to quit)

Session Status                online
Session Expires               7 hours, 59 minutes
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://ada02116.ngrok.io -> localhost:4444
Forwarding                    https://ada02116.ngrok.io -> localhost:4444

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```
如果此时访问 http://ada02116.ngrok.io 则等于访问了 localhost:4444

## 自建ngrok服务
使用别人的服务，存在一些限制。例如不稳定、安全问题，费用昂贵等。因此可能需要自己搭建ngrok服务端。
自建服务需要具备的条件：
>1、具备独立ip的服务器。例如阿里云、腾讯云等。 我个人使用的阿里云ecs

>2、需要域名。如果是国内则需要备案。我个人的域名是 xxxx.com

* ### 配置域名
增加2条A记录,指向你的服务器。这里我配置的是 ngrok.xxxx.com 和 *.ngrok.xxxx.com
![32778-2de852c725e147ef.png](http://lcbupayun.test.upcdn.net/static/48f7409e04ecb9e643ec51b0cae524fb.png)
* ### 添加安全组。
开放3个端口。这里我选择4443、4444、8081端口。
其中4443是ngrok自身通信使用。
4444 后面tcp端口转发使用。
8081 则是http请求转发使用。默认是80 但是这里80端口我分配给nginx了。
截图中少截图了4444的配置。

![32778-c5be55abf8d86869.png](http://lcbupayun.test.upcdn.net/static/de5962091a24f3d03ce23f4986343671.png)

* ### 安装go（阿里云ESC服务器）
第一次照着其他教程直接apt-get install golang安装go语言环境，结果编译的时候报错，最终使用go 1.8版本顺利通过。
*  下载go安装包并解包

 ```
  wget https://storage.googleapis.com/golang/go1.8.linux-amd64.tar.gz
 tar -zxvf go1.8.linux-amd64.tar.gz
 ```
* 配置环境变量

 ```
 sudo vim /etc/profile
# 添加以下内容
export GOROOT=/usr/local/go # 注意此处为解压后文件夹的路径
export GOPATH=$GOROOT/bin
export PATH=$PATH:$GOPATH
 ```
* 使其生效

 ```
 source /etc/profile
 ```
* 查看go版本

 ```
 go version
 ```
* ### 安装ngrok（阿里云ESC服务器）

    * 下载安装包并解压

  ```
  wget htps://coding.net/u/sfantree/p/self_use_OSS/git/raw/master/source/ngrok.tar.gz
  tar zxvf ngrok.tar.gz
  cd ngrok
  ```
    * 生成签名证书

  ```
  export NGROK_DOMAIN="ngrok.xxx.com" # 此处为公网服务器域名(我是用的阿里云ESC服务器)
  openssl genrsa -out rootCA.key 2048
  openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 5000 -out rootCA.pem
  openssl genrsa -out device.key 2048
  openssl req -new -key device.key -subj "/CN=$NGROK_DOMAIN" -out device.csr 
  openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000
  ```
ngrok目录下会生成6个新的文件
device.crt device.csr device.key
rootCA.key rootCA.pem rootCA.srl
* 替换证书

  ```
  cp rootCA.pem assets/client/tls/ngrokroot.crt
  cp device.crt assets/server/tls/snakeoil.crt
  cp device.key assets/server/tls/snakeoil.key
  ```
* 编译服务端与客户端口

  ```
  make release-server
GOOS=linux GOARCH=386 make release-client
GOOS=linux GOARCH=amd64 make release-client
GOOS=windows GOARCH=386 make release-client
GOOS=windows GOARCH=amd64 make release-client
GOOS=darwin GOARCH=386 make release-client
GOOS=darwin GOARCH=amd64 make release-client
GOOS=linux GOARCH=arm make release-client
  ```
编译成功后会在bin目录下找到ngrokd和ngrok这两个文件。其中ngrokd 是服务端程序ngrok是客户端程序。

* 运行服务端

  ```
  ./ngrokd -domain="ngrok.xxx.com"  -httpAddr=":80" -httpsAddr=":443" -tunnelAddr=":4443" 
  ```
* 将ngrok拷贝到客户端上我的是mac，下载对应darwin_amd64

  ```
  scp -P 22 -r  root@你的的ngrok服务器ip地址:/usr/local/ngrok/bin/darwin_amd64/ngrok  ./ngrok
  ```

* 并在同级文件夹下新建config.yml文件，其中内容如下：

  ```
  server_addr: "ngrok.xxxx.com:4443"
trust_host_root_certs: false
tunnels:
  webapp:
   proto:
     http: 8000
     https: 8000
   subdomain: www
  tcp12345:
    remote_port: 4444
    proto:
      tcp: 12345
  ```
* 启动客户端

  ```
  ./ngrok  -config=config.yml start-all
  ```
* 穿透成功

  ```
  ngrok                                                                                       Tunnel Status                 online                                                                                     
Version                       1.7/1.7                                                                                    
Forwarding                    https://www.open.yuelingnet.cn -> 127.0.0.1:8000                                           
Forwarding                    http://www.open.yuelingnet.cn -> 127.0.0.1:8000                                            
Web Interface                 127.0.0.1:4040                                                                             
# Conn                        6                                                                                          Avg Conn Time                 6026.71ms                                                       HTTP Requests                                                       -------------                                                         
                                                                      
                                                                                               GET /                         200 OK                                  
GET /static/fonts/element-ico 304 Not Modified                        
GET /static/img/login_center_ 304 Not Modified                        
GET /155.js                   304 Not Modified                        
GET /static/tinymce4.7.5/tiny 304 Not Modified                        
GET /app.js                   200 OK                                  
GET /                         304 Not Modified                        
GET /favicon.ico              200 OK                                  
GET /static/fonts/element-ico 200 OK  
   ```
停止服务端和客户端
* ### 网站配置SSL证书（https）,使网站可以通过https访问
我们申请的是Let's Encrypt通配符SSL证书，因为他是免费的
*  1.获取 Certbot 客户端
   下载 Certbot 客户端 ,并且添加可执行权限

   ```
   cd /usr/local/
   wget https://dl.eff.org/certbot-auto
   chmod a+x certbot-auto
   ```
* 2.申请通配符证书

客户在申请Let’s Encrypt证书的时候，需要校验域名的所有权，证明操作者有权利为该域名申请证书，目前支持三种验证方式：dns-01：给域名添加一个 DNS TXT 记录。
http-01：在域名对应的 Web 服务器下放置一个 HTTP well-known URL 资源文件。
tls-sni-01：在域名对应的 Web 服务器下放置一个 HTTPS well-known URL 资源文件
使用Certbot客户端申请证书方法非常的简单，只需如下一行命令就搞定了。

* 特别注意：

申请通配符证书，只能使用 dns-01 的方式。
xxx.com 请根据自己的域名自行更改。如果要.xxx.com xxx.com都可以使用需要配置 -d “.xxx.com” -d “xxx.com”。

   ```
./certbot-auto certonly  -d "*.ngrok.xxx.com" -d "ngrok.xxx.com" --manual --preferred-challenges dns-01  --server https://acme-v02.api.letsencrypt.org/directory
   ```
* 执行完这一步之后，就是命令行的输出，请根据提示输入相应内容：
  ![1534495467849643.png](http://lcbupayun.test.upcdn.net/static/ce2be365e6b1928d1f0e600738017e87.png)
* 执行到上图最后一步时，先暂时不要回车。申请通配符证书是要经过DNS认证的，接下来需要按照提示在域名后台添加对应的DNS TXT记录。
* 确认生效后，回车继续执行，最后会输出如下内容：
  ![1534495645970573.png](http://lcbupayun.test.upcdn.net/static/c2bfd6466e30fdb7752e0608da2dd0b8.png)
  出现这个就代表成功了

* 3.更换证书，重新编译ngrok客户端和服务端

  ```
  cd /home/ngrok/
cp /etc/letsencrypt/live/open.yuelingnet.cn/privkey.pem /home/ngrok/assets/server/tls/snakeoil.key
cp /etc/letsencrypt/live/open.yuelingnet.cn/fullchain.pem /home/ngrok/assets/server/tls/snakeoil.crt
cp /etc/letsencrypt/live/open.yuelingnet.cn/fullchain.pem /home/ngrok/assets/client/tls/ngrokroot.crt
make release-server
GOOS=linux GOARCH=386 make release-client
GOOS=linux GOARCH=amd64 make release-client
GOOS=windows GOARCH=386 make release-client
GOOS=windows GOARCH=amd64 make release-client
GOOS=darwin GOARCH=386 make release-client
GOOS=darwin GOARCH=amd64 make release-client
GOOS=linux GOARCH=arm make release-client
```
* 4.将ngrok重新拷贝到客户端上我的是mac，下载对应darwin_amd64

  ```
  scp -P 22 -r  root@你的的ngrok服务器ip地址:/usr/local/ngrok/bin/darwin_amd64/ngrok  ./ngrok
  ```

* 5.再次运行服务端

  ```
  ./ngrokd -tlsKey="/home/ngrok//assets/server/tls/snakeoil.key" -tlsCrt="/home/ngrok/assets/server/tls/snakeoil.crt" -domain="open.yuelingnet.cn" -httpAddr=":80" -httpsAddr=":443" 
  ```

*  6.启动客户端

  ```
  ./ngrok  -config=config.yml start-all
  ```

最后测试可以通过https访问。
  
  
   
   
   
  



 










