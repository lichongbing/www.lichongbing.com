---
title: SpringBoot Web Https 配置
abbrlink: 22681
date: 2019-12-16 14:05:36
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---
# 前言
我最近搭建一个网盘，兴高采烈分享给身边的朋友使用，其中有朋友觉得不安全，于是我把http升级https，以增加安全性。比如目前火热的小程序，要求服务端必须支持https，苹果商店也有说http请求要修改为https。所以https将会是游戏服务器的普遍需求。

## 一，证书生成
证书可以自己使用jdk生成进行测试。但是在正常使用的时候，需要去第三方机构购买，网上也有免费的。不过有效期有限制。具体获取证书的方法这里不再详细说明了。一般拿到证书之后会得到这几个文件：

    3232526_cloud.lichongbing.com.jks	https.jks 3232526_cloud.lichongbing.com.pfx	pfx-password.txt certificate.crt	detail.txt
    private.pem	www.jks certificate.pfx	fullchain.crt	public.pem


## 二，证书格式选择与部分转化。
如果使用nginx跳转的话，上面的证书文件可以直接使用，但是在老版本tomcat中，证书的配置文件格式必须是.keystore的文件。所以需要做一下转化。以下2点参考

1、生成pkcs12格式的密钥文件：

    $ openssl pkcs12 -export -in cert.pem -inkey privkey.pem -out my.pk12 -name mykey

(注：此过程中需要输入密码：123456)

2、生成keystore：

    $ keytool -importkeystore -deststorepass 123456 -destkeypass 123456 -destkeystore my.keystore -srckeystore my.pk12 -srcstoretype PKCS12 -srcstorepass 123456 -alias shkey

成功之后会获得my.keystore文件。

3、而我选择.pfx格式文件直接使用，因为新版tomcat支持.pfx和jks。



## 三，在Spring boot web中配置https
首先是在application.yml中添加配置

    server:
         ssl:
            key-store: 3228357_www.lichongbing.com.pfx
            key-store-password: XXxxx00  #pfx-password.txt中复制出来的密码
            keyStoreType: PKCS12
            enabled: true
         port: 443
    http:
        port: 80

这样配置之后，启动服务，就可以https访问了。
## 四，同时支持http和https访问
### 1，http请求不跳转成https访问（仅供参考）
这种方式是http请求单独走一个端口，https请求单独走一个端口。但是spring boot 的appplication.properties只能配置一个端口，这就需要我们手动再添加一个Connector了。


    @Configuration
 
    public class TomcatConfig {
 
    @Bean
 
    public EmbeddedServletContainerFactory servletContainerFactory(){
 
    TomcatEmbeddedServletContainerFactory tomcatConfig = new     TomcatEmbeddedServletContainerFactory();
 
    tomcatConfig.addAdditionalTomcatConnectors(this.newHttpConnector());
 
    return tomcatConfig;
 
    }
 
    private Connector newHttpConnector() {
 
    Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
 
    connector.setScheme("http");
 
    connector.setPort(80);
 
    connector.setSecure(false);
 
    return connector;
 
    }
 
    }
　　

这样普通 的http请求，可以访问8080端口了。

### 2，将http请求强制跳转到https（仅供参考）

有时候我们的一些旧业务是使用的http，但是新业务以及将来的框架都必须强制使用https，那就需要做一下跳转，把收到的http请求强制跳转到https上面。



    @Configuration
 
    public class TomcatConfig {
 
    @Bean
 
    public EmbeddedServletContainerFactory servletContainerFactory(){
 
    TomcatEmbeddedServletContainerFactory tomcatConfig = new     TomcatEmbeddedServletContainerFactory(){
 
    @Override
 
    protected void postProcessContext(Context context) {
 
    SecurityConstraint securityConstraint = new SecurityConstraint();
 
    securityConstraint.setUserConstraint("CONFIDENTIAL");
 
    SecurityCollection collection = new SecurityCollection();
 
    // 这里不知道为什么，只能配置以/*结尾的path。这样配置表示全部请求使用安全模式，必须走https
 
    collection.addPattern("/*");
 
    //另外还可以配置哪些请求必须走https，这表示以/home/开头的请求必须走https
 
    collection.addPattern("/home/*");
 
    securityConstraint.addCollection(collection);
 
    context.addConstraint(securityConstraint);
 
    }
 
    };
 
    tomcatConfig.addAdditionalTomcatConnectors(this.newHttpConnector());
 
    return tomcatConfig;
 
    }
 
    private Connector newHttpConnector() {
 
    Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
 
    connector.setScheme("http");
 
    connector.setPort(80);
 
    connector.setSecure(false);
 
    // 如果只需要支持https访问，这里把收到的http请求跳转到https的端口
 
    connector.setRedirectPort(8446);
 
    return connector;
 
    }
 
    }
而我比较简单粗暴参考我的代码，就是在springboot主程序入口添加两个函数方法。例如我的项目

    package com.lichongbing.devreume;

    import org.apache.catalina.Context;
    import org.apache.catalina.connector.Connector;
    import org.apache.tomcat.util.descriptor.web.SecurityCollection;
    import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
    import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
    import org.springframework.context.ConfigurableApplicationContext;
    import org.springframework.context.annotation.Bean;

    @SpringBootApplication
    public class DevreumeApplication {

        public static void main(String[] args) {
           SpringApplication.run(DevreumeApplication.class, args);

        }

        @Bean
        public ServletWebServerFactory servletContainer() {
            TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
                @Override
                protected void postProcessContext(Context context) {
                    // 如果要强制使用https，请松开以下注释
                    SecurityConstraint constraint = new SecurityConstraint();
                    constraint.setUserConstraint("CONFIDENTIAL");
                    SecurityCollection collection = new SecurityCollection();
                    collection.addPattern("/*");
                    constraint.addCollection(collection);
                    context.addConstraint(constraint);
                }
            };
            tomcat.addAdditionalTomcatConnectors(createStandardConnector()); // 添加http
            return tomcat;
        }

        // 配置http
        private Connector createStandardConnector() {
            // 默认协议为org.apache.coyote.http11.Http11NioProtocol
            Connector connector = new     Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
            connector.setSecure(false);
            connector.setScheme("http");
            connector.setPort(port);
            connector.setRedirectPort(httpsPort); // 当http重定向到https时的https端口号
            return connector;
        }

            @Value("${http.port}")
            private Integer port;

            @Value("${server.port}")
            private Integer httpsPort;

        }


以上跳转也可以使用nginx实现。如果有什么问题可以评论留言或加QQ：873610008交流
